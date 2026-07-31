import WebKit

/// Native 60Hz tick into the game, because WKWebView's requestAnimationFrame
/// gets throttled to ~20-30Hz on battery and no page-side code can escape
/// that (Bronson's Air: 21fps at the resolution floor with the sim idle,
/// unplugged). The game's `__extFrame` only does work when its own rAF is
/// starving — with rAF healthy these calls are no-ops, and the game's 10ms
/// draw gate prevents double-drawing when both clocks fire.
final class FrameDriver {
    weak var webView: WKWebView?
    private var timer: DispatchSourceTimer?

    func start() {
        let t = DispatchSource.makeTimerSource(queue: .main)
        t.schedule(deadline: .now(), repeating: .milliseconds(16), leeway: .milliseconds(2))
        t.setEventHandler { [weak self] in
            self?.webView?.evaluateJavaScript("window.__extFrame && __extFrame()", completionHandler: nil)
        }
        t.resume()
        timer = t
    }
}
