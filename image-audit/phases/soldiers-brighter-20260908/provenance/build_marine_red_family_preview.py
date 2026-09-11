from pathlib import Path
import math
import random
from PIL import Image, ImageDraw, ImageFont


TMP = Path("/private/tmp")
RED_STATIC = TMP / "broodfall-marine-red-preview-v1.png"
TEAL_STATIC = TMP / "broodfall-marine-teal-preview-v2.png"
RED_WALK = [TMP / f"broodfall-marine-walk{i}-red-preview-v1.png" for i in range(1, 9)]
TEAL_WALK = [TMP / f"broodfall-marine-walk{i}-teal-preview-v2.png" for i in range(1, 9)]
RED_DEATH = [TMP / f"broodfall-marine-death{i}-red-preview-v1.png" for i in range(1, 5)]
TEAL_DEATH = [TMP / f"broodfall-marine-death{i}-teal-preview-v2.png" for i in range(1, 5)]
RED_HUNKER = TMP / "broodfall-marine-hunker-red-preview-v1.png"
TEAL_HUNKER = TMP / "broodfall-marine-hunker-teal-preview-v2.png"
BOARD = TMP / "broodfall-marine-red-family-contact-v1.png"
WALK_GIF = TMP / "broodfall-marine-red-walk-preview-v1.gif"
DEATH_GIF = TMP / "broodfall-marine-red-death-preview-v1.gif"
WALK_SYNC_GIF = TMP / "broodfall-marine-teal-red-walk-sync-v1.gif"
DEATH_SYNC_GIF = TMP / "broodfall-marine-teal-red-death-sync-v1.gif"

PHASES = ["LEFT CONTACT", "LEFT COMPRESS", "RIGHT PASSING", "RIGHT ADVANCE", "RIGHT CONTACT", "RIGHT COMPRESS", "LEFT PASSING", "LEFT ADVANCE"]
DEATH_LABELS = ["HIT / STAGGER", "KNEES BUCKLE", "ACTIVE FALL", "PRONE / STILL"]


def font(size, bold=False):
    candidates = [
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


BG = (13, 20, 23, 255)
PANEL = (24, 35, 40, 255)
CARD = (31, 45, 49, 255)
INK = (231, 240, 239, 255)
MUTED = (146, 169, 169, 255)
RED = (245, 79, 70, 255)
AQUA = (85, 229, 220, 255)


def checker(size, tile=10):
    image = Image.new("RGBA", size, (39, 52, 56, 255))
    draw = ImageDraw.Draw(image)
    colors = ((39, 52, 56, 255), (51, 66, 70, 255))
    for y in range(0, size[1], tile):
        for x in range(0, size[0], tile):
            draw.rectangle((x, y, min(x+tile-1,size[0]-1), min(y+tile-1,size[1]-1)), fill=colors[(x//tile+y//tile)%2])
    return image


def terrain(size, seed=2027):
    rng = random.Random(seed)
    image = Image.new("RGBA", size, (34,45,38,255))
    draw = ImageDraw.Draw(image)
    for _ in range(size[0]*size[1]//18):
        x,y = rng.randrange(size[0]),rng.randrange(size[1])
        radius=rng.choice((1,1,2,3)); offset=rng.randrange(-12,15)
        draw.ellipse((x-radius,y-radius,x+radius,y+radius),fill=(max(12,37+offset),max(20,49+offset),max(16,40+offset//2),rng.randrange(30,90)))
    for x in range(0,size[0],32): draw.line((x,0,x,size[1]),fill=(91,116,99,30))
    for y in range(0,size[1],32): draw.line((0,y,size[0],y),fill=(91,116,99,30))
    return image


def fit(path, size, padding=10):
    source=Image.open(path).convert("RGBA")
    bbox=source.getchannel("A").getbbox(); crop=source.crop(bbox)
    scale=min((size[0]-2*padding)/crop.width,(size[1]-2*padding)/crop.height)
    sprite=crop.resize((round(crop.width*scale),round(crop.height*scale)),Image.Resampling.LANCZOS)
    stage=checker(size)
    stage.alpha_composite(sprite,((size[0]-sprite.width)//2,(size[1]-sprite.height)//2))
    return stage


def metric(red_path, teal_path):
    red=Image.open(red_path).convert("RGBA"); teal=Image.open(teal_path).convert("RGBA")
    ar=red.getchannel("A"); at=teal.getchannel("A")
    mr=[v>16 for v in ar.getdata()]; mt=[v>16 for v in at.getdata()]
    inter=sum(a and b for a,b in zip(mr,mt)); union=sum(a or b for a,b in zip(mr,mt))
    rgb=red.convert("RGB")
    visible=[0.2126*r+0.7152*g+0.0722*b for (r,g,b),a in zip(rgb.getdata(),ar.getdata()) if a>16]
    small=red.resize((32,32),Image.Resampling.LANCZOS)
    red32=sum(1 for r,g,b,a in small.getdata() if a>16 and r>g*1.3 and r>b*1.2 and r>72)
    teal32=sum(1 for r,g,b,a in small.getdata() if a>16 and g>r*1.12 and b>r*1.08 and g>72)
    return {"bbox":ar.getbbox(),"iou":inter/union,"luma":sum(visible)/len(visible),"red32":red32,"teal32":teal32,"area":sum(mr)}


all_paths=[RED_STATIC,*RED_WALK,*RED_DEATH,RED_HUNKER]
missing=[str(p) for p in all_paths if not p.exists()]
if missing: raise SystemExit("Missing:\n"+"\n".join(missing))

# Comprehensive red-family contact sheet.
canvas=Image.new("RGBA",(2200,1170),BG); draw=ImageDraw.Draw(canvas)
draw.text((55,34),"MARINE RED FAMILY — MOTION APPROVAL",font=font(40,True),fill=INK)
draw.text((55,84),"Exact counterparts of the approved teal poses • preview only",font=font(17),fill=MUTED)

draw.rounded_rectangle((42,125,2158,570),radius=22,fill=PANEL)
draw.text((70,150),"EIGHT-FRAME WALK CYCLE",font=font(22,True),fill=INK)
walk_slots=[("STATIC",RED_STATIC)]+[(str(i+1),p) for i,p in enumerate(RED_WALK)]+[("STATIC",RED_STATIC)]
slot_w=207
for index,(name,path) in enumerate(walk_slots):
    x=66+index*slot_w
    draw.rounded_rectangle((x,190,x+184,535),radius=14,fill=CARD)
    canvas.alpha_composite(fit(path,(160,255)),(x+12,224))
    label="STATIC" if name=="STATIC" else f"FRAME {name}"
    box=draw.textbbox((0,0),label,font=font(16,True)); draw.text((x+92-(box[2]-box[0])/2,198),label,font=font(16,True),fill=RED if name!="STATIC" else MUTED)
    if name!="STATIC":
        phase=PHASES[int(name)-1]; box=draw.textbbox((0,0),phase,font=font(13)); draw.text((x+92-(box[2]-box[0])/2,508),phase,font=font(13),fill=MUTED)

draw.rounded_rectangle((42,600,2158,1128),radius=22,fill=PANEL)
draw.text((70,625),"DEATH SEQUENCE + HUNKER — SOURCE AND 32×32 GAME READ",font=font(22,True),fill=INK)
lower=[("STATIC",RED_STATIC,TEAL_STATIC)]+[(DEATH_LABELS[i],RED_DEATH[i],TEAL_DEATH[i]) for i in range(4)]+[("HUNKER",RED_HUNKER,TEAL_HUNKER)]
lower_w=342
for index,(label,path,teal_path) in enumerate(lower):
    x=68+index*lower_w
    draw.rounded_rectangle((x,670,x+306,1095),radius=14,fill=CARD)
    canvas.alpha_composite(fit(path,(270,260)),(x+18,708))
    box=draw.textbbox((0,0),label,font=font(16,True)); draw.text((x+153-(box[2]-box[0])/2,680),label,font=font(16,True),fill=RED if index else MUTED)
    sprite=Image.open(path).convert("RGBA").resize((32,32),Image.Resampling.LANCZOS)
    enlarged=sprite.resize((128,128),Image.Resampling.NEAREST); stage=terrain((128,128)); stage.alpha_composite(enlarged)
    canvas.alpha_composite(stage,(x+18,952))
    m=metric(path,teal_path)
    detail="approved static" if index==0 else f"{m['red32']} red px  •  pose IoU {m['iou']:.3f}"
    draw.text((x+160,993),detail,font=font(13),fill=RED if index else MUTED)

canvas.convert("RGB").save(BOARD,quality=95)


def make_gif(paths, labels, durations, output):
    frames=[]
    for path,label in zip(paths,labels):
        sheet=Image.new("RGBA",(760,390),BG); d=ImageDraw.Draw(sheet)
        d.text((28,22),f"MARINE RED  •  {label}",font=font(25,True),fill=INK)
        d.rounded_rectangle((25,72,345,360),radius=18,fill=PANEL); d.rounded_rectangle((375,72,735,360),radius=18,fill=PANEL)
        d.text((47,91),"ACTUAL 32×32",font=font(17,True),fill=RED); d.text((397,91),"8× PIXEL VIEW",font=font(17,True),fill=RED)
        small=Image.open(path).convert("RGBA").resize((32,32),Image.Resampling.LANCZOS)
        field=terrain((280,220)); field.alpha_composite(small,((280-32)//2,(220-32)//2)); sheet.alpha_composite(field,(45,125))
        big=small.resize((256,256),Image.Resampling.NEAREST); inspect=terrain((320,220)); inspect.alpha_composite(big,((320-256)//2,(220-256)//2)); sheet.alpha_composite(inspect,(395,125))
        frames.append(sheet.convert("P",palette=Image.Palette.ADAPTIVE,colors=255))
    frames[0].save(output,save_all=True,append_images=frames[1:],duration=durations,loop=0,disposal=2)


make_gif(RED_WALK,[f"WALK {i+1}/8  •  {PHASES[i]}" for i in range(8)],[115]*8,WALK_GIF)
make_gif([RED_STATIC,*RED_DEATH],["STATIC",*DEATH_LABELS],[420,135,145,175,800],DEATH_GIF)


def make_sync_gif(teal_paths, red_paths, labels, durations, output):
    frames=[]
    for teal_path,red_path,label in zip(teal_paths,red_paths,labels):
        sheet=Image.new("RGBA",(980,430),BG); d=ImageDraw.Draw(sheet)
        d.text((28,20),f"MARINE TEAL ↔ RED  •  {label}",font=font(25,True),fill=INK)
        for index,(name,path,accent) in enumerate((("TEAL",teal_path,AQUA),("RED",red_path,RED))):
            x=25+index*475
            d.rounded_rectangle((x,68,x+455,402),radius=18,fill=PANEL)
            d.text((x+22,87),f"{name}  •  ACTUAL 32×32 + 8×",font=font(17,True),fill=accent)
            small=Image.open(path).convert("RGBA").resize((32,32),Image.Resampling.LANCZOS)
            field=terrain((120,250)); field.alpha_composite(small,((120-32)//2,(250-32)//2)); sheet.alpha_composite(field,(x+20,130))
            big=small.resize((256,256),Image.Resampling.NEAREST); inspect=terrain((270,250)); inspect.alpha_composite(big,((270-256)//2,(250-256)//2)); sheet.alpha_composite(inspect,(x+160,130))
        frames.append(sheet.convert("P",palette=Image.Palette.ADAPTIVE,colors=255))
    frames[0].save(output,save_all=True,append_images=frames[1:],duration=durations,loop=0,disposal=2)


make_sync_gif(TEAL_WALK,RED_WALK,[f"WALK {i+1}/8  •  {PHASES[i]}" for i in range(8)],[115]*8,WALK_SYNC_GIF)
make_sync_gif([TEAL_STATIC,*TEAL_DEATH],[RED_STATIC,*RED_DEATH],["STATIC",*DEATH_LABELS],[420,135,145,175,800],DEATH_SYNC_GIF)

print(f"BOARD={BOARD}\nWALK_GIF={WALK_GIF}\nDEATH_GIF={DEATH_GIF}\nWALK_SYNC_GIF={WALK_SYNC_GIF}\nDEATH_SYNC_GIF={DEATH_SYNC_GIF}")
walk_metrics=[metric(r,t) for r,t in zip(RED_WALK,TEAL_WALK)]
for i,m in enumerate(walk_metrics,1): print(f"W{i} bbox={m['bbox']} IoU={m['iou']:.4f} luma={m['luma']:.1f} red32={m['red32']} teal_left32={m['teal32']}")
for i,(r,t) in enumerate(zip(RED_DEATH,TEAL_DEATH),1):
    m=metric(r,t); print(f"D{i} bbox={m['bbox']} IoU={m['iou']:.4f} luma={m['luma']:.1f} red32={m['red32']} teal_left32={m['teal32']}")
m=metric(RED_HUNKER,TEAL_HUNKER); print(f"H bbox={m['bbox']} IoU={m['iou']:.4f} luma={m['luma']:.1f} red32={m['red32']} teal_left32={m['teal32']}")
areas=[m['area'] for m in walk_metrics]; mean=sum(areas)/len(areas); cv=math.sqrt(sum((a-mean)**2 for a in areas)/len(areas))/mean
print(f"RED_WALK_AREA_CV={cv:.4f}")
