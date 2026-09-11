from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import numpy as np
import json

root=Path('/private/tmp');order=[1,2,3,5,4,6,7,8]
tv={1:2,3:2,4:2,5:2,6:2,7:2,8:2};rv={6:2,7:2,8:2};dv={1:2,4:2}
names=['STATIC']+[f'WALK {i}' for i in range(1,9)]+[f'DEATH {i}' for i in range(1,5)]
reds=[root/'broodfall-rocket-red-preview-v1.png']+[root/f'broodfall-rocket-walk{i}-red-preview-v{rv.get(i,1)}.png' for i in order]+[root/f'broodfall-rocket-death{i}-red-preview-v{dv.get(i,1)}.png' for i in range(1,5)]
teals=[root/'broodfall-rocket-teal-preview-v3.png']+[root/f'broodfall-rocket-walk{i}-teal-preview-v{tv.get(i,1)}.png' for i in order]+[root/f'broodfall-rocket-death{i}-teal-preview-v{3 if i==4 else 1}.png' for i in range(1,5)]
R=[Image.open(p).convert('RGBA') for p in reds];T=[Image.open(p).convert('RGBA') for p in teals]
font=lambda n:ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',n)
bg=(18,27,30,255);fg=(235,241,240);red=(244,106,95);aqua=(110,222,212)
def terrain(w,h):
    im=Image.new('RGBA',(w,h),(35,48,40,255));d=ImageDraw.Draw(im)
    for y in range(0,h,14):
        for x in range(0,w,14):
            if (x//14+y//14)%2:d.rectangle((x,y,x+13,y+13),fill=(40,53,44,255))
    return im
metrics=[]
for name,r,t,rp,tp in zip(names,R,T,reds,teals):
    assert r.size==t.size==(256,256)
    ra=np.asarray(r)[:,:,3];ta=np.asarray(t)[:,:,3];rm=ra>16;tm=ta>16
    border=int(max(ra[0].max(),ra[-1].max(),ra[:,0].max(),ra[:,-1].max()));assert border==0
    sm=np.asarray(r.resize((30,30),Image.Resampling.LANCZOS)).astype(float)
    redpx=int(((sm[:,:,3]>16)&(sm[:,:,0]>sm[:,:,1]*1.18)&(sm[:,:,0]>sm[:,:,2]*1.18)&(sm[:,:,0]>78)).sum())
    metrics.append(dict(name=name,red_path=str(rp),teal_path=str(tp),red_bbox=r.getchannel('A').getbbox(),teal_bbox=t.getchannel('A').getbbox(),red_area=float(ra.sum()/255),area_ratio=float(ra.sum()/ta.sum()),mask_iou=float((rm&tm).sum()/(rm|tm).sum()),edge_alpha=border,red30=redpx))
board=Image.new('RGBA',(1960,1080),bg);d=ImageDraw.Draw(board)
d.text((26,20),'ROCKET TROOPER RED — COMPLETE MOTION PREVIEW',font=font(32),fill=fg)
d.text((26,66),'Matched to approved aqua poses | body and launcher aligned | preview only',font=font(19),fill=aqua)
for i,(name,im,m) in enumerate(zip(names,R,metrics)):
    x=16+(i%7)*277;y=110+(i//7)*475
    d.text((x+16,y),name,font=font(20),fill=red)
    panel=Image.new('RGBA',(260,260),(33,45,49,255));panel.alpha_composite(im,(2,2));board.alpha_composite(panel,(x,y+33))
    field=terrain(260,142);sm=im.resize((30,30),Image.Resampling.LANCZOS);field.alpha_composite(sm,(30,54));field.alpha_composite(sm.resize((120,120),Image.Resampling.NEAREST),(109,6));board.alpha_composite(field,(x,y+306))
    d.text((x+12,y+450),'30 px actual + 4×',font=font(16),fill=fg)
board.convert('RGB').save(root/'broodfall-rocket-red-family-contact-v1.png')
def sync(indices,kind,durations):
    frames=[]
    for index in indices:
        canvas=Image.new('RGBA',(960,425),bg);d=ImageDraw.Draw(canvas)
        d.text((24,20),f'ROCKET TROOPER AQUA / RED · {names[index]}',font=font(26),fill=fg)
        for j,im in enumerate((T[index],R[index])):
            x=20+j*480;d.text((x+10,69),'AQUA' if j==0 else 'RED',font=font(22),fill=aqua if j==0 else red)
            field=terrain(440,290)
            for yy,size in ((48,30),(160,32)):
                sm=im.resize((size,size),Image.Resampling.LANCZOS);field.alpha_composite(sm,(28,yy));ImageDraw.Draw(field).text((70,yy),f'{size} px',font=font(15),fill=fg)
            sm=im.resize((30,30),Image.Resampling.LANCZOS);field.alpha_composite(sm.resize((210,210),Image.Resampling.NEAREST),(185,26));canvas.alpha_composite(field,(x,110))
        frames.append(canvas.convert('RGB').quantize(colors=256))
    frames[0].save(root/f'broodfall-rocket-teal-red-{kind}-sync-v1.gif',save_all=True,append_images=frames[1:],duration=durations,loop=0,disposal=2)
sync(list(range(1,9)),'walk',115)
sync([0,9,10,11,12],'death',[600,160,160,160,1200])
areas=np.array([m['red_area'] for m in metrics[1:9]])
data=dict(playback_original_indices=order,frames=metrics,walk_area_cv=float(areas.std()/areas.mean()))
(root/'broodfall-rocket-red-family-metrics-v1.json').write_text(json.dumps(data,indent=2))
print(json.dumps(data,indent=2))
