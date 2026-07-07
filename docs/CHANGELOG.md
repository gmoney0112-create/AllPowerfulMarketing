# Changelog

## [2.0.0] — 2026-07-07 (SEO & Compliance Pass)

### Added
- `react-helmet-async` for per-route `<head>` management (unique title, description, canonical, OG tags)
- JSON-LD schemas: `LocalBusiness` (MarketingAgency) on every page; `Service` + `FAQPage` on each service detail page
- `react-snap` prerendering: `postbuild` script crawls all 11 routes and emits pre-rendered HTML with populated `<head>` and body content
- `public/404.html` — GitHub Pages SPA redirect fallback for path-based URLs
- `public/sitemap.xml` — 9 indexable routes with priorities and change frequencies
- `public/robots.txt` — crawl directives; `/privacy` and `/terms` set to `Disallow`
- Sticky mobile call bar (fixed bottom, hidden on `md+` screens) linking to `tel:+12102130913`
- FAQ section on each service detail page with structured `<dl>` markup
- Industries section on home page targeting home-service verticals
- AI Growth System package section on home page

### Changed
- Routing converted from hash-based (`/#/about`) to path-based (`/about`) using react-router-dom BrowserRouter
- `src/index.js` updated to use `hydrateRoot` / `createRoot` pattern for React 19 + react-snap hydration compatibility
- Contact form simplified from 5 fields to 3 fields: name, phone, service
- Service ID `lead-generation` renamed to `ai-lead-generation` to match URL routes
- Navbar phone number and CTAs updated to `(210) 213-0913`

### Removed
- Fabricated statistics bar (150+ clients, 3.2M+ leads, 98% retention) — FTC compliance
- Fake testimonials section (Maria L., James T., Rachel M.) — FTC compliance
- `spimarketingteamtx@gmail.com` from footer, contact page, and all form error messages

### Fixed
- Service detail pages now prerender with correct per-page title and meta tags
- `useParams()` `serviceId` key mismatch between `services` array and `servicePages` object resolved
