# assets

Drop sponsor logos here, then point `config.js` at them:

```js
sponsors: [
  {name:'Acme Robotics', logo:'assets/acme.svg', url:'https://acme.example'},
]
```

SVG is best (sharp at any size). Otherwise PNG with a transparent background,
at least 600px wide. Logos are shown on a light plate so dark marks stay legible,
and scaled to fit — no need to pre-size them.

Behind-the-scenes and outreach photos live here too:

- `assets/build/` — build-season photos for THE PRINTS on the build page
- `assets/outreach/` — one photo per outreach entry for THE FIELD
- `assets/team/` — member portraits

Each empty slot on the site prints the filename it is waiting for. Save the
photo to that path, then set `src` (gallery) or `photo` (outreach) in
`config.js` to the same path. Landscape crops work best; they are cropped to
fill, so keep the subject centred.
