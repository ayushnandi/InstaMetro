# SEO_PLAN — lyne-web

Strategy and execution log for getting lyne. ranking for Delhi Metro searches, built from the methodology in `E:\Apps\SEO.txt` (a two-part transcript: a general SEO/AI-search framework, and a practical case study on winning local search with programmatic "location pages" built via Claude Code).

Domain: **lynemetro.com** (not yet DNS-live — see "Domain go-live checklist" below).

## v2 — India-wide expansion (blog, other metro cities, fare calculator)

**Expectation-setting, stated plainly**: outranking DMRC, BMRCL, or any other government transit-authority site — or Google Maps/Wikipedia — for bare brand-navigational queries ("delhi metro", "bangalore metro", "namma metro map") is **not a realistic target**. Those queries are won by domain authority, government-entity trust signals, and the direct-answer intent Google already satisfies with Maps/Knowledge Panels. A marketing site with zero backlink history cannot out-rank that. The winnable target — same thesis as v1, now applied India-wide — is the long tail: station/route pages (Delhi, already built), tool-based queries with no good existing calculator ("X to Y metro fare"), informational gaps official sites leave (outdated PDFs, no single clean-answer page — "how many stations does namma metro have"), and freshness (the blog) beating static government pages that don't update.

**What's built this pass:**

| Page | Path | Count | Notes |
|---|---|---|---|
| Metro systems index | `/metro-systems` | 1 | Card grid of every operational Indian metro system, `ItemList` JSON-LD |
| Metro system hub pages | `/metro-systems/[slug]` | 19 | Informational overview per non-Delhi city (Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Pune, Kochi, Nagpur, Lucknow, Ahmedabad, Jaipur, Kanpur, Noida, Navi Mumbai, Gurugram, Agra, Indore, Bhopal, Patna) — lines, stations, length, opened year, operator, official link, all WebSearch-verified with a `verifiedAt` date. Explicit in-copy disclaimer that lyne.'s app only supports full routing for Delhi. No fabricated fares/calculators for these cities. `BreadcrumbList` + `Article` JSON-LD (schema.org has no "transit system" type — not invented). Delhi itself is not duplicated here; its card on the index links straight into the real `/stations` system. |
| Blog / metro news | `/blog` | 1, ISR (hourly) | Live feed from two metro-rail publications' own RSS (`themetrorailguy.com`, `metrorailtoday.com`) — headline, source, date, short excerpt, and an outbound "read more" link. No full article text stored or rendered. Deliberately **not** using Google News' RSS: its feed's own copyright notice restricts use to "personal, non-commercial" feed readers, which a public marketing site isn't — publisher-direct feeds carry no such restriction since it's their own content offered for syndication. `ItemList` JSON-LD (not `Article`/`BlogPosting` per item, since lyne. didn't author the content). |
| Fare & distance calculator | `/fare-calculator` | 1 | Interactive station-pair picker, Delhi only, reusing the exact same `computeRoute`/fare engine already powering all 210 route pages — no new routing logic. Other cities get a "coming soon, no verified network data" note on their hub page instead of fabricated numbers. |
| Homepage | `/` | — | Two new sections: "Every metro system in India" (top 9 systems) and "Metro news" (latest 4 headlines), inserted after Popular stations/routes, before the trust-building sections. |

**Data source discipline**: every fact in `src/data/indianMetroSystems.ts` was verified via web search on 2026-07-13 (see each entry's `verifiedAt`) against Wikipedia's city-metro pages and operator sites, cross-checked where sources disagreed (e.g. Mumbai's total length is genuinely volatile — several lines opened within months of each other — so its entry carries a hedge note rather than a falsely precise number). Optional fields (`totalStations`, `totalLengthKm`, `dailyRidership`, line colors) are omitted wherever a confident current figure wasn't available, rather than guessed.

**Nav/Footer**: `Nav.tsx`'s flat link array was extended (Stations, Routes, Metro Systems, Fare Calculator, Blog, FAQ, About, Features — 8 items) rather than adding dropdown UI — flat `<Link>`s are equally crawlable and a smaller, lower-risk change. The breakpoint for the mobile hamburger moved from `md` to `lg` to avoid a dead zone where neither the full nav nor the hamburger would show at medium widths.

**Roadmap / pending verification**: none of the 19 city facts are flagged as unconfirmed as of this writing, but several systems (Mumbai, Bangalore, Indore, Bhopal, Patna, Agra) are mid-expansion — station/length counts will drift within months and should be re-verified periodically rather than trusted indefinitely. Not built this pass: Tier-2 landmark enrichment for non-Delhi cities, backlinks, GSC verification, and the original v1 roadmap items below remain open.

---

## Strategy summary

- **Search intent** (SEO.txt ch. 2): station names are informational/navigational ("rajiv chowk metro station"), station-to-station queries are commercial/transactional ("rajiv chowk to kashmere gate metro fare"). Page types below map directly to intent.
- **Keyword sweet spot** (demand × fit × intent × difficulty, ch. 3): a metro app can't win "delhi metro app" cold, but hundreds of long-tail station/route queries have real demand, clear fit, and low competition — this is where the traffic is.
- **Programmatic local-SEO pages** (ch. 3, and the trucking-company case study): the single biggest lever. One page per station, one page per popular route — the transit-app equivalent of "one page per city+service."
- **Topical authority / internal linking** (ch. 3): station pages link to adjacent stations and routes touching them; route pages link back to both endpoint stations; homepage links into a curated "Popular stations/routes" section.
- **On-page checklist** (ch. 5): title <60 chars w/ keyword front-loaded, meta description 150-160 chars, H1/H2 hierarchy, descriptive URLs, internal linking, image alt text.
- **AI search / GEO** (ch. 8): same fundamentals — comprehensive real data per page, clear structure, FAQPage schema, an `llm.txt` allow-file. No separate trick; good SEO is what gets cited.

## What's built (this pass)

| Page | Path | Count | Notes |
|---|---|---|---|
| Homepage | `/` | 1 | Metadata overhaul, `SoftwareApplication` JSON-LD, new "Popular stations/routes" section |
| Station pages | `/stations/[slug]` | 263 | Generated via `generateStaticParams`, real CSV-sourced data (line, interchange, opened date, adjacent stations), `TrainStation` + `BreadcrumbList` JSON-LD |
| Route pages | `/routes/[slug]` | 210 (curated) | Real Dijkstra-computed path/fare/interchanges (ported from the RN app, not guessed), `BreadcrumbList` + `HowTo` JSON-LD. Selection uses a per-station quota (8 routes/station, shortest-journey-first), not a flat cap — an earlier flat cap sorted alphabetically and starved late-alphabet stations (Rajiv Chowk had 1 route instead of ~20) |
| Station/route index | `/stations`, `/routes` | 2 | Directory hub pages |
| FAQ | `/faq` | 1 | `FAQPage` JSON-LD — general product Q&A, distinct from the support FAQ on `/contact` |
| Careers | `/careers` | 1 | **Placeholder copy — needs your real input.** Currently says "not hiring, but reach out." |
| Legal/contact | `/contact`, `/privacy-policy`, `/terms-of-use` | 3 | Canonical URLs + cleaned-up titles added (existing content untouched) |
| Guides (content cluster) | `/guides`, `/guides/fare-guide`, `/guides/smart-card-vs-qr-ticket`, `/guides/metro-timings` | 4 | Top-of-funnel evergreen content feeding station/route money pages, `Article` JSON-LD. Deliberately hedges on volatile facts (exact hours, discount %) instead of asserting numbers that could go stale or be wrong — see note below. |
| 404 | `not-found.tsx` | 1 | Custom page with links to Stations/Routes/Home instead of a dead end |

**Technical foundation**: `metadataBase`/title template/OG/Twitter cards in `layout.tsx`, `opengraph-image.tsx` (generated via `next/og`, no new image asset), favicon + apple-icon (reused from the RN app's `assets/icon.png`), `manifest.ts`, `llm.txt`, `sitemap.ts` (all pages), `robots.ts`, `Organization` JSON-LD site-wide.

**Structured data, second pass**: `HowTo` schema on every route page (the step-by-step directions map directly onto `HowToStep`s — real rich-result candidate), `ItemList` schema on `/stations` and `/routes` index pages, `Article` schema on guides.

**Deeper internal linking, second pass** (ch. 3's "every piece feeds the one below it and links to related posts"): station pages now show a "Popular routes from here" section (via `getRoutesForStation`); route pages show "Other routes from [both endpoints]"; route pages link to the fare guide; the FAQ page links to all three guides. This closes loops that were previously one-directional (route → station only).

**Data pipeline**: `src/data/dmrc.ts` is a direct copy of the RN app's station/line/topology data (the actual source of truth — re-deriving it from the raw CSV would have duplicated hand-tuned branch/interchange logic that already exists there). `scripts/generate-metro-extra.mjs` merges in the fields the RN app doesn't carry (opening date, platform layout, interchange line names) from `Delhi_Metro_Complete_303.csv`. Routing/fare logic (`graph.ts`, `dijkstra.ts`, `fare.ts`, `platformDirection.ts`) is ported verbatim from `lyne/lib/routing` — it's pure TS/data with zero React Native dependency.

**Also fixed in passing**: `lib/tokens.ts` was missing the Orange (Airport Express) and Grey line colors, and had "amber" mislabeled as "Airport Express" instead of Yellow Line — corrected, since the new pages needed all 10 lines to render correctly.

**A deliberate honesty call on the guides**: the transcript's case study leans on Claude injecting confident local detail (landmarks, context) into location pages. For Delhi Metro, some of that detail is genuinely volatile — exact first/last train times, smart-card discount percentages — and I don't have verified live figures for either. Rather than asserting specific numbers that could be stale or wrong (which would undermine trust worse than not having the page at all), the guides state the structural facts I'm confident in (how the fare slabs work, why timings vary by station position, why interchanges don't add cost) and explicitly point to DMRC's official channels for the volatile numbers. This is the same standard applied to the security audit and station data earlier — real facts only, hedged where genuinely uncertain.

**Verified**: `npm run build` — 494 pages, 0 errors. `npx tsc --noEmit` — clean. `npm run lint` — no new issues (4 pre-existing errors in untouched files: `Integrations.tsx`, `Hero.tsx`, `NetworkSVG.tsx`, `ThemeToggle.tsx`, unrelated to this work). Spot-checked Kashmere Gate (correct 3-line interchange + 2002 opening date), a multi-interchange route (correct DMRC-slab fare, correct `HowTo` steps), `ItemList` item counts, and cross-link sections rendering on both station and route pages — including catching and fixing the Rajiv Chowk coverage bug above via a real screenshot, not just code review.

## Roadmap (not built)

1. **Tier-2 landmark enrichment** — real nearby-landmark context for the ~20 seed stations (tourist/business hubs), sourced via actual research (not guessed) before publishing, added as an extra content section on those station pages.
2. **Backlinks** — journalist-query platforms (Source of Sources), the fare-lookup as a linkable tool once promoted.
3. **Google Search Console + verification** — account-level, needs to be done by you.
4. **Careers page real content** — replace the placeholder copy once you know what you actually want it to say.
5. **Verified volatile facts in the guides** — once you have an authoritative current source, the `metro-timings` and `smart-card-vs-qr-ticket` guides can state exact hours/discounts instead of deferring to DMRC's site.

## Domain go-live checklist

1. Point `lynemetro.com` DNS at Vercel (A/CNAME per Vercel's instructions).
2. Add the domain in the Vercel project settings and set it as primary.
3. Confirm `instametro.vercel.app` redirects to `lynemetro.com` (Vercel does this automatically once a custom domain is primary).
4. Submit `https://lynemetro.com/sitemap.xml` to Google Search Console.

If the domain changes, everything routes through `SITE_URL` in `src/lib/seo/config.ts` — one line to update.
