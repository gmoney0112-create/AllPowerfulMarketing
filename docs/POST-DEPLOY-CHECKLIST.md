# Post-Deploy Checklist

After merging to main and the GitHub Actions workflow completes (usually 3–5 minutes):

## DNS / Routing
- [ ] `curl -I https://allpowerfulmarketing.com/` returns `200 OK`
- [ ] `curl -I https://allpowerfulmarketing.com/about` returns `200 OK` (not 404)
- [ ] `curl -I https://allpowerfulmarketing.com/services/ai-lead-generation` returns `200 OK`

## Prerendering
- [ ] `curl -s https://allpowerfulmarketing.com/ | grep '<title>'` shows home page title
- [ ] `curl -s https://allpowerfulmarketing.com/about | grep '<title>'` shows About title
- [ ] `curl -s https://allpowerfulmarketing.com/services/ai-lead-generation | grep '<title>'` shows service-specific title

## SEO Head Tags
- [ ] Each page has a unique `<title>` (verified with curl above)
- [ ] Each page has a `<meta name="description">` with unique content
- [ ] Each page has a `<link rel="canonical">` pointing to its own URL
- [ ] Service pages include `<script type="application/ld+json">` with Service and FAQPage schemas

## FTC / Compliance
- [ ] No fabricated statistics appear on any page
- [ ] No named testimonials from unverifiable sources
- [ ] `spimarketingteamtx@gmail.com` does not appear anywhere on the site

## Mobile
- [ ] Sticky call bar is visible at bottom of screen on mobile
- [ ] Contact form shows 3 fields: name, phone, service dropdown

## Contact Form
- [ ] Submit the form with test data → verify Formspree receives submission at `mqeveyqo`

## Sitemap / Robots
- [ ] `https://allpowerfulmarketing.com/sitemap.xml` loads and contains all 9 routes
- [ ] `https://allpowerfulmarketing.com/robots.txt` loads and contains `Sitemap:` directive
