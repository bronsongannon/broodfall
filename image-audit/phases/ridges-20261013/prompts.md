# Built-in ImageGen prompts

## Installed long ridge — approved overhead bedrock

```text
Use case: stylized-concept
Asset type: transparent RTS terrain overlay / obstacle sprite
Primary request: a long exposed seam of dark weathered bedrock embedded almost flush in dry steppe soil, viewed from directly overhead. This is a natural ridge footprint, a low rough rock spine with fractured surface and buried ends, not an above-ground wall.
Composition/framing: map-plan view, camera 90 degrees straight down, no perspective or visible vertical faces. One horizontally elongated irregular formation approximately 5 times as long as it is wide; it occupies the center of a wide transparent canvas, complete silhouette visible. The formation will be rotated diagonally on a map and scaled to 440 x 90 game pixels.
Style/medium: subdued realistic game terrain paint, low relief, integrated material, no object-catalog isolation.
Color palette: dark warm gray-brown and olive earth, moderately lighter than dark brown terrain but not beige or white.
Materials/textures: weathered bedrock plates and sediment cracks seen on the TOP SURFACE ONLY, uneven fragmented edges with a little dark dirt visible between plates, dust fading out at the ends.
Lighting/mood: diffuse straight-down light, very shallow soft contact shadows only.
Constraints: truly transparent alpha outside the formation; no rectangular ground tile, text, vegetation, road, buildings, or creatures.
Avoid: side-view ledges, stacked boulder towers, raised cliff face, masonry wall, pale stone, continuous log shape, repeating geometric slabs, strong drop shadow, exaggerated relief.
```

Generated with built-in ImageGen and a transparent background, without image references. The original 2170×725 output was alpha-cropped from `(49,182)` through `(2116,554)` and normalized to 1024×214 for the production file.

## Raised Trade Road lookouts — installed

Two transparent ImageGen outputs were approved after the narrow circular rim read too flat. They depict small, top-down weathered-stone lookout hills with an open ramp on opposite sides, an elevated earth-and-rock slope, and enough apparent width for a vehicle with infantry alongside. The east-ramp source is `assets/sprites/source/lookout_trade_east_source.png`; the upper-left-ramp source is `assets/sprites/source/lookout_trade_northwest_source.png`. The 1280×1280 sources were compactly feather-masked around their hill silhouettes, scaled to 570×460, and color-matched with brightness 0.76 and saturation 0.82 in the local gameplay preview. Those baked results are the corresponding production sprites. The sources were kept unchanged so the approved look can be reprocessed without regeneration.

## Circular rim — superseded preview, not installed

```text
Use case: stylized-concept
Asset type: transparent circular cliff-rim sprite for Broodfall RTS terrain
Input images: Image 1 is the approved dark bedrock ridge material reference; Image 2 is the current Trade Road gameplay context reference for overhead camera and muted steppe palette only. Do not reproduce the map or UI.
Primary request: a single natural roughly circular rocky escarpment edge surrounding a hollow elevated plateau. The circular rim is a narrow, irregular band of exposed fractured bedrock and rubble, NOT a pile of separate boulders. It must visually belong to the same dark low-relief bedrock family as Image 1.
Composition/framing: strict straight-down orthographic map view, centered circular/oval ring, complete loop with a clearly transparent hollow center and transparent outside. Uneven radial edge and width, not mathematically perfect. The band should be about 12–15% of the ring diameter so it remains legible at 250 game pixels across. No perspective tilt or visible side wall.
Style/medium: grounded painted game terrain, restrained detail, natural embedded stone and earth. Soft shallow contact shade at the outer foot, slight value change on inner crest, no dramatic shadows.
Color palette: dark weathered warm gray-brown and dusty olive matching the Trade Road soil, modest contrast, no teal, blue-green, pale limestone, or bright rim lighting.
Constraints: actual transparent alpha in both center and exterior; no solid disc, trees, road, structures, units, text, watermark. This is artwork only, not a gameplay mask.
Avoid: stone-circle monument, doughnut, ring of individual polygon slabs, fantasy portal, moat, crater hole, raised tower, side-on wall.
```

Generated with built-in ImageGen from `assets/sprites/ridge_bedrock.png` (material reference) and the installed-ridge gameplay capture (camera/palette reference). No narrow circular-rim production art was placed in the repository; the raised-lookout direction above superseded it.
