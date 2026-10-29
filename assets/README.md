# assets

## FIRST logo
Download the current mark from FIRST's brand/media pages and save it here,
then set `firstLogo` in `config.js` to the path (`assets/first-logo.svg`).
It renders beside the wordmark in the nav on both pages, linked to
`firstUrl`. It is a trademark with usage rules, so use their official file
rather than a redrawn copy. Empty means nothing renders and the bar keeps
its three-column layout.

## Sponsor logos
`assets/sponsors/`. Point each sponsor's `logo` in `config.js` at the file.
SVG is best; otherwise a transparent PNG at least 600px wide. Logos render on
a light plate so dark marks stay legible, and scale to fit.

## Team portraits
`assets/team/`. Set `photo` on the member in `config.js`. A member without one
gets a generated plate instead, so a half-filled roster still looks composed.

## Build and outreach photos
`assets/build/` for the workshop gallery, `assets/outreach/` for the outreach
gallery. Every empty slot on the build page prints the filename it wants:

    assets/build/     chassis.jpg  cad.jpg  drivetrain.jpg
                      wiring.jpg   testing.jpg  workspace.jpg
    assets/outreach/  lotushacks.jpg  schools.jpg  workshop.jpg

Save the photo under that name, then set `src` on the matching entry in
`config.js` to the same path. The `suggest` field is only the label, so
nothing is requested and nothing 404s while a slot is empty.

The galleries are masonry columns, so photos keep their own proportions.
Portrait and landscape both work and neither gets cropped. Add or remove
entries freely; the columns rebalance.
