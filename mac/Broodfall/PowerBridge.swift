import WebKit
import IOKit.ps

/// Reports the Mac's power source to the game and keeps it current.
///
/// Unplugged couch play is the point of the macOS build (Bronson, 2026-07-30),
/// and WebKit demotes energy-hungry pages to ~30Hz on battery. The game can't
/// see the power source from inside the web view — this bridge can. On battery
/// the game tightens its pixel budget so it stays under WebKit's demotion
/// radar and sips the battery; on AC it climbs back to full sharpness.
///
/// Same pattern as StoreBridge: push into `window.BFPower._update(...)`,
/// guarded so a page that hasn't defined it yet just ignores the call.
final class PowerBridge {
    weak var webView: WKWebView?
    private var runLoopSource: CFRunLoopSource?

    func start() {
        let context = Unmanaged.passUnretained(self).toOpaque()
        let callback: IOPowerSourceCallbackType = { ctx in
            guard let ctx = ctx else { return }
            Unmanaged<PowerBridge>.fromOpaque(ctx).takeUnretainedValue().push()
        }
        if let source = IOPSNotificationCreateRunLoopSource(callback, context)?.takeRetainedValue() {
            runLoopSource = source
            CFRunLoopAddSource(CFRunLoopGetMain(), source, .defaultMode)
        }
        push()
    }

    var onBattery: Bool {
        guard let blob = IOPSCopyPowerSourcesInfo()?.takeRetainedValue(),
              let type = IOPSGetProvidingPowerSourceType(blob)?.takeRetainedValue() as String? else {
            return false   // unknown reads as AC: never degrade on a desktop Mac
        }
        return type == (kIOPMBatteryPowerKey as String)
    }

    func push() {
        let js = "window.BFPower && window.BFPower._update(\(onBattery ? "true" : "false"))"
        DispatchQueue.main.async {
            self.webView?.evaluateJavaScript(js, completionHandler: nil)
        }
    }
}
