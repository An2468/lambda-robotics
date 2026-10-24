# Lambda Robotics — FTC #36789

Cinematic, single-page, responsive Lambda website built as a **deployable static site**.

## Preview
Open `index.html` locally. For best results, serve the folder with a static HTTP server:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy to Vercel
1. Upload this folder to a GitHub repository, or import the folder using Vercel CLI.
2. On Vercel, choose **Other** framework (static site), and set the root to the folder holding `index.html`.
3. Leave the build command blank. Publish, then connect your existing domain under Project Settings → Domains.

## Homepage (WebGL)
The hero runs a machined gear train built in Three.js (`script.js`, bottom block): three meshing gears whose tooth profiles, bores and lightening holes are generated from maths, extruded with bevelled edges. They turn at the correct ratios, reverse direction mesh to mesh, snap in on load, spin faster when you fling them with a drag, and recede as you scroll.

Deliberately generic — it shows no part of the real robot, so nothing about the team's design can be copied from the site. Change `POP` at the top of the block to re-accent the anodised gear. Metal needs something to reflect, so the block builds a small studio environment from a canvas gradient; tone mapping is linear rather than ACES, which otherwise desaturates the anodised orange to cream. It degrades to a plain hero if WebGL is unavailable.

## Section mechanics
The page is four sections plus a dialog. Each presents itself differently on purpose: WebGL robot (hero), a manifesto whose words light up word-by-word as you scroll (about), a grid of generated ID plates, every member the same size (team), a stepped timeline plus the taped prints, merged into one build section,  and a cumulative funding ladder (sponsors) where picking a tier charges every rung beneath it and marks which benefits are inherited from the tiers below. Milestones come from `config.js` as before; `status: 'ACTIVE'` gives a milestone the dark pulsing pill.

## Member plates
Nobody has a portrait yet, so each member's tile draws a plate generated from their name — gear rings, bolt circles, traces and hatching, seeded by a hash so the same name always produces the same plate. Set `photo` on a member in `config.js` and the photo covers the plate instead; you can mix the two while photos trickle in. Every cell is identical in size on purpose — ten equals, no feature tile.

## Partner wall
With five or fewer entries in `sponsors`, the wall renders a row of large plates instead of a marquee — a ticker of three just loops the same names. Above 820px the wall is sticky, so the partners stay on screen while the tier ladder is read. Past five sponsors it falls back to the scrolling marquee.

## Partner dialog
The contact form is a modal rather than a section. Anything pointing at `#contact` opens it — the nav button, the hero CTA, and each tier's "Talk about X", which also prefills the tier field. Escape, the close button and the backdrop all dismiss it; focus moves into the form on open, is trapped while it is up, and returns to whatever opened it. The newsletter signup moved to the footer.

## Customizing
Edit `config.js` to add team member names and photos, Instagram/TikTok URLs, events, sponsor tier amounts, and your email address. Photos should be stored in an `assets/` directory. Replace `robotImage` with the path to your robot photo when ready. A true interactive robot 3D asset can later replace the placeholder cube.

## Gallery and sponsor logos
`config.js` holds a `gallery` array and a `sponsors` array. Both render as auto-scrolling strips that pause on hover.

- Gallery: put photos in `assets/` and set `src` on each entry (`caption` is the overlay label). An empty `src` renders a styled placeholder tile, so the section looks finished before the photos exist.
- Sponsors: set `logo` to a path in `assets/` and `url` to the sponsor's site. An empty `logo` renders a placeholder wordmark. Three placeholders ship by default — the strip repeats itself to fill wide screens, so any number of sponsors loops seamlessly.

## Sponsor form
The form **does not pretend** to deliver messages without a backend. With `inquiryEndpoint: ''`, it opens an email draft. Set `email` in `config.js` first. To collect submissions directly, connect a verified HTTPS endpoint and set `inquiryEndpoint`. The endpoint should validate input, rate-limit requests, and securely store or email submissions. Never expose private API keys in `config.js`.

## Newsletter and multilingual support
Newsletter is a visible placeholder until a `newsletterEndpoint` is connected. English copy is fully included; Vietnamese localization is intentionally a second-phase feature and the language control transparently states that. Do not describe the incomplete features as live in sponsorship outreach.

## Accessibility
Includes keyboard navigation, reduced-motion CSS fallback, live form status, semantic sections, and responsive layouts. Run additional cross-browser and accessibility checks before launch.

The separate Robot showcase section and the hero cube were both removed. Page layout is full-bleed — sections center their own content, so there are no letterbox bars on ultra-wide displays.
