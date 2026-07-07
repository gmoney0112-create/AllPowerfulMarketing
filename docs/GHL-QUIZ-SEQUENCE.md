# GHL Follow-Up Sequence — Lead Leak Quiz

**Trigger:** Inbound webhook from the Lead Leak Quiz on the homepage (`source: "lead-leak-quiz"`).
**Webhook payload fields:** `name`, `phone`, `band`, `total_score`, `max_score`, `answers[]` (category, score, service), `submitted_at`.

---

## Step 0 — On Webhook Receipt: Tag the Contact

Apply all of the following tags automatically from the payload:

- `quiz-lead`
- Band tag (one of): `leak-sealed-tight` · `leak-slow-drip` · `leak-active-leak` · `leak-open-faucet`
- Category tags for every answer where score = 2: `leak-missed-calls` · `leak-speed-to-lead` · `leak-follow-up` · `leak-reviews` · `leak-website` · `leak-social` · `leak-booking` · `leak-tracking`

**Custom fields to map from payload:**
- `Quiz Band` → `{{band}}`
- `Quiz Score` → `{{total_score}}`
- `Top Leak Category` → first category where score = 2 (highest priority leak)

**Add to pipeline:** "Quiz Leads" → stage: `New`

---

## Message 1 — Immediate (0 min) · SMS

Send to all leads regardless of band.

> Hey {{name}} — your All Powerful Marketing Leak Score just came back. You scored a **{{band}}** ({{total_score}}/16). I'll text you your top leaks and what fixes them. — Terrance, APM

*Confirms the phone number is live and sets expectation for follow-up texts.*

Advance pipeline to `Contacted`.

---

## Message 2 — Top Leak Hit (30 min) · SMS

Branch on the highest-scoring category (score = 2). Send only ONE message.

**`leak-missed-calls`**
> {{name}}, your biggest leak: missed calls. 85% of callers who hit voicemail call the next result instead of leaving a message. We fix this with a missed-call text-back that fires in under 60 seconds — takes one afternoon to set up. Want to see it?

**`leak-speed-to-lead`**
> {{name}}, your biggest leak: speed to lead. A form submitted at 8pm that waits until morning has already lost the job — that lead booked someone else by 9am. AI follow-up that works 24/7 is the fix. Want to see how it works?

**`leak-follow-up`**
> {{name}}, your biggest leak: follow-up. Most sales happen after the 5th contact — most businesses stop after one. An automated SMS + email sequence that runs for 30 days on every unsold quote is the fix. It books jobs while you sleep. Want to see ours?

**`leak-reviews`**
> {{name}}, your biggest leak: review collection. If you're not asking every customer, your best marketing is walking out the door unrecorded. An auto review request after every job — no one slips through. Takes 20 minutes to turn on. Want to see it?

**`leak-website`**
> {{name}}, your biggest leak: your website on mobile. 70%+ of your traffic is a stressed homeowner on a phone. Every extra tap loses you to whoever made it easier. A sticky tap-to-call bar and a 3-field form is the fix. Want to see an example?

**`leak-social`**
> {{name}}, your biggest leak: social presence. A page silent for months reads as "maybe out of business" to anyone who checks before calling. Done-for-you content keeps it active without you touching it. Want to see what a month of content looks like?

**`leak-booking`**
> {{name}}, your biggest leak: booking friction. Phone tag kills jobs. Customers book whoever lets them pick a slot at 10pm from the couch. Online booking synced to your real calendar with automated reminders is the fix. Want to see it in action?

**`leak-tracking`**
> {{name}}, your biggest leak: you don't know where your customers are coming from. That means you're paying for things that don't work and don't know it. One pipeline that tags every lead source fixes this. Want a walkthrough?

---

## Message 3 — Band-Specific Push (Day 2 · 10am) · SMS

Branch on the band tag.

**`leak-sealed-tight` (score 0–3)**
> {{name}} — your systems are genuinely ahead of most businesses in San Antonio. The next lever isn't fixing leaks, it's more volume into what's already working. If you're ready to scale leads, I'd love to show you what that looks like. Free 30-min call — no pitch, just a plan. Reply YES and I'll send a link.

**`leak-slow-drip` (score 4–8)**
> {{name}} — a slow drip feels fine until you do the math. If 3 extra jobs a month slip through, that's $5–15K/year depending on your ticket. The fixes for your top leaks are usually same-week. Want to walk through your numbers on a quick call?

**`leak-active-leak` (score 9–12)**
> {{name}} — the good news about an Active Leak score: it's the fastest to fix. These are automation gaps, not strategy gaps. Most of what's leaking for you gets sealed in the first 30 days. Free audit call — I'll show you exactly what the fix looks like for your business. Reply YES.

**`leak-open-faucet` (score 13–16)**
> {{name}} — an Open Faucet score means you're likely paying to get leads and losing most of them before they book. Sealing the top two leaks alone would change your next 30 days. I want to show you specifically what that looks like. Can I call you this week?

---

## Message 4 — Service Bridge (Day 4 · 11am) · SMS

Map the top leak category to the relevant service page URL and send:

| Top Leak Category | Service Slug |
|---|---|
| `leak-missed-calls` | `/services/ai-automations` |
| `leak-speed-to-lead` | `/services/ai-automations` |
| `leak-follow-up` | `/services/ai-lead-generation` |
| `leak-reviews` | `/services/ai-automations` |
| `leak-website` | `/services/web-creation` |
| `leak-social` | `/services/social-media` |
| `leak-booking` | `/services/ai-automations` |
| `leak-tracking` | `/services/ai-lead-generation` |

> {{name}} — quick follow-up. Here's the full breakdown of what we do to fix [**the specific leak**]: allpowerfulmarketing.com/services/[slug]
>
> No pressure — just want you to see exactly what the fix looks like before we talk.

---

## Message 5 — Final Ask (Day 7 · 9am) · SMS

Send to all leads who have not booked or replied.

> {{name}}, last follow-up from me on this. Your Leak Score was {{band}} — {{total_score}}/16. If you want to close those gaps, I'll do a free 30-minute audit, walk your actual numbers, and leave you with a specific plan whether you work with us or not.
>
> Book here: allpowerfulmarketing.com/contact — or just reply and I'll reach out directly.

---

## Workflow Rules

| Event | Action |
|---|---|
| Any inbound reply | Stop sequence · Move pipeline to `Replied` · Notify Terrance |
| Contact books a call | Stop sequence · Move pipeline to `Booked` |
| Day 7 message sent, no reply | Move pipeline to `Cold` · Enroll in 30-day nurture by service tag |
| Score = 0 (all Sealed Tight) | Skip Messages 2–4 · Send band-specific Message 3 only |

**30-day nurture after Day 7:** Use the `leak-[category]` tags to enroll unbooked leads in the matching service nurture campaign if you have one. This keeps APM top-of-mind without manual follow-up.
