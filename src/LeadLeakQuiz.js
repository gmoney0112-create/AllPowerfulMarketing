import { useState, useMemo } from "react";
import { Phone, ArrowRight, ArrowLeft, Droplets, CheckCircle2, AlertTriangle, TrendingDown } from "lucide-react";

// GHL WIRING: replace GHL_WEBHOOK_URL with your inbound webhook from a GHL
// workflow trigger. Payload includes name, phone, total score, and per-category
// scores so the workflow can tag + route the lead automatically.
const GHL_WEBHOOK_URL = ""; // TODO: paste GHL inbound webhook URL

const QUESTIONS = [
  {
    id: "missed_calls",
    category: "Missed Calls",
    question: "When you miss a call from a new number, what happens?",
    service: "AI Automations",
    leakCopy:
      "Missed calls are the #1 leak for local businesses. 85% of callers who hit voicemail don't call back — they call the next result on Google.",
    fix: "Missed-call text-back fires an instant SMS so the lead talks to you, not your competitor.",
    options: [
      { label: "We text them back automatically within a minute", score: 0 },
      { label: "We call back when we get a chance", score: 1 },
      { label: "They get voicemail — we hope they leave a message", score: 2 },
    ],
  },
  {
    id: "speed_to_lead",
    category: "Speed to Lead",
    question: "A lead fills out your website form at 8pm. When do they hear from you?",
    service: "AI Automations",
    leakCopy:
      "Leads contacted within 5 minutes are far more likely to convert than leads contacted after 30. After-hours leads that wait until morning usually already booked someone else.",
    fix: "Automated instant reply + AI qualification works the lead the second the form is submitted — 24/7.",
    options: [
      { label: "Within 5 minutes, automatically — any hour", score: 0 },
      { label: "Same day, usually", score: 1 },
      { label: "Next business day, when we check messages", score: 2 },
    ],
  },
  {
    id: "follow_up",
    category: "Follow-Up",
    question: "A lead says 'let me think about it.' What does your follow-up look like?",
    service: "AI Lead Generation",
    leakCopy:
      "Most sales happen after the 5th touch — and most businesses stop after one. 'Thinking about it' leads are money sitting in your CRM.",
    fix: "Automated SMS + email sequences keep working every quote until it books or says no.",
    options: [
      { label: "They enter an automated sequence that follows up for weeks", score: 0 },
      { label: "We try to remember to check in once or twice", score: 1 },
      { label: "If they don't call back, that's the end of it", score: 2 },
    ],
  },
  {
    id: "reviews",
    category: "Reviews",
    question: "How do you collect Google reviews after a job?",
    service: "AI Automations",
    leakCopy:
      "Review count is the tiebreaker when a customer compares you to two competitors. If you're not asking every customer, your best marketing is walking out the door unrecorded.",
    fix: "An automatic review request goes out after every completed job — set it once, it never forgets.",
    options: [
      { label: "Every customer gets an automatic review request", score: 0 },
      { label: "We ask when we remember, or only happy customers", score: 1 },
      { label: "We don't really ask — reviews come in on their own", score: 2 },
    ],
  },
  {
    id: "website",
    category: "Website Conversion",
    question: "On your phone right now — can a visitor call or book from your site in one tap?",
    service: "Website & Webpage Creation",
    leakCopy:
      "70%+ of local traffic is a stressed customer on a phone. Every extra tap, pinch, or long form between them and a call loses jobs to whoever made it easier.",
    fix: "A mobile-first rebuild with a sticky click-to-call bar and a 3-field quote form turns traffic into booked calls.",
    options: [
      { label: "Yes — tap-to-call and booking are front and center", score: 0 },
      { label: "It's there, but you have to scroll or hunt for it", score: 1 },
      { label: "Honestly, our site is hard to use on a phone (or we don't have one)", score: 2 },
    ],
  },
  {
    id: "social",
    category: "Social Presence",
    question: "When was your last Facebook or Instagram post?",
    service: "Social Media & Ad Campaigns",
    leakCopy:
      "Customers check your social before they call — a page that's been silent for months reads as 'maybe out of business.' It's a trust check you're failing invisibly.",
    fix: "Done-for-you content keeps your pages active and converting without you touching them.",
    options: [
      { label: "This week — we post consistently", score: 0 },
      { label: "Sometime in the last month or two", score: 1 },
      { label: "Can't remember / we don't post", score: 2 },
    ],
  },
  {
    id: "booking",
    category: "Booking",
    question: "How does a customer actually get on your schedule?",
    service: "AI Automations",
    leakCopy:
      "Every 'call us to schedule' step is a leak — phone tag kills bookings. Customers increasingly book whoever lets them pick a time slot at 10pm from their couch.",
    fix: "Online booking synced to your real calendar, with automated reminders that cut no-shows.",
    options: [
      { label: "They book online, any time, and it hits our calendar", score: 0 },
      { label: "Back-and-forth by phone or text until we find a time", score: 1 },
      { label: "It's whoever answers the phone, with a paper calendar or memory", score: 2 },
    ],
  },
  {
    id: "tracking",
    category: "Tracking",
    question: "Do you know exactly where last month's customers came from?",
    service: "AI Lead Generation",
    leakCopy:
      "If you can't name what's producing customers, you can't stop paying for what isn't. Untracked marketing spend is the quietest leak of all.",
    fix: "One pipeline that tags every lead's source, so your monthly report shows what earned its keep.",
    options: [
      { label: "Yes — every lead is tracked to its source", score: 0 },
      { label: "We have a rough idea from asking people", score: 1 },
      { label: "No clue — we just know the phone rings or it doesn't", score: 2 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 2;

function scoreBand(total) {
  const pct = total / MAX_SCORE;
  if (pct <= 0.2)
    return {
      label: "Sealed Tight",
      color: "text-emerald-400",
      bar: "bg-emerald-400",
      summary:
        "Your systems are ahead of most local businesses. The gains left are optimization — sharper ads, better creative, more volume into a machine that already works.",
    };
  if (pct <= 0.5)
    return {
      label: "Slow Drip",
      color: "text-amber-400",
      bar: "bg-amber-400",
      summary:
        "You're winning some and quietly losing some. A few targeted fixes would stop the drip — and you'd feel it in booked jobs within the first month.",
    };
  if (pct <= 0.75)
    return {
      label: "Active Leak",
      color: "text-orange-400",
      bar: "bg-orange-400",
      summary:
        "Real money is leaving through gaps you can't see day-to-day. The good news: these are the exact leaks automation fixes fastest.",
    };
  return {
    label: "Open Faucet",
    color: "text-red-400",
    bar: "bg-red-400",
    summary:
      "You're likely paying to generate leads and losing most of them after the click or the ring. Sealing even the top two leaks would change your month.",
  };
}

export default function LeadLeakQuiz() {
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 questions, n capture, n+1 results
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const total = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers]
  );

  const topLeaks = useMemo(() => {
    return QUESTIONS.map((q) => ({ ...q, score: answers[q.id] ?? 0 }))
      .filter((q) => q.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers]);

  const band = scoreBand(total);

  const pick = (qId, score) => {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const submitLead = async () => {
    if (!lead.name.trim() || lead.phone.replace(/\D/g, "").length < 10) {
      setSubmitError("Enter your name and a 10-digit phone number so we can send your results.");
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    const payload = {
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      source: "lead-leak-quiz",
      total_score: total,
      max_score: MAX_SCORE,
      band: band.label,
      answers: QUESTIONS.map((q) => ({
        category: q.category,
        score: answers[q.id] ?? 0,
        service: q.service,
      })),
      submitted_at: new Date().toISOString(),
    };
    try {
      if (GHL_WEBHOOK_URL) {
        await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        console.log("Lead Leak Quiz payload (no webhook configured):", payload);
      }
      setStep(QUESTIONS.length + 1);
    } catch (e) {
      // Never block the user from their results because of a network hiccup
      console.error("Webhook failed:", e);
      setStep(QUESTIONS.length + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const Shell = ({ children }) => (
    <section className="bg-slate-900 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {children}
        </div>
        <p className="text-slate-500 text-xs text-center mt-4">
          Takes about 90 seconds. No email required.
        </p>
      </div>
    </section>
  );

  // Intro
  if (step === -1) {
    return (
      <Shell>
        <div className="p-8 sm:p-10 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-700/50 text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
            <Droplets size={14} /> Free 90-second assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Where Is Your Business{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Leaking Leads?
            </span>
          </h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">
            8 quick questions about how your business handles calls, leads, and
            follow-up. Get your Leak Score and the exact spots where jobs are
            slipping away.
          </p>
          <button
            onClick={() => setStep(0)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-black text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
            style={{ minHeight: "44px" }}
          >
            Find My Leaks <ArrowRight size={20} />
          </button>
        </div>
      </Shell>
    );
  }

  // Questions
  if (step < QUESTIONS.length) {
    const q = QUESTIONS[step];
    return (
      <Shell>
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-1.5 mb-2">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < step
                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                    : i === step
                    ? "bg-slate-500"
                    : "bg-slate-700"
                }`}
              />
            ))}
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-6">
            {step + 1} of {QUESTIONS.length} · {q.category}
          </p>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
            {q.question}
          </h3>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => pick(q.id, opt.score)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-colors font-medium ${
                  answers[q.id] === opt.score
                    ? "border-amber-400 bg-slate-700 text-white"
                    : "border-slate-600 bg-slate-800 text-slate-200 hover:border-amber-400/60 hover:bg-slate-700/60"
                }`}
                style={{ minHeight: "44px" }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 inline-flex items-center gap-1 text-slate-400 text-sm hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
      </Shell>
    );
  }

  // Lead capture
  if (step === QUESTIONS.length) {
    return (
      <Shell>
        <div className="p-6 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold mb-3">
              <CheckCircle2 size={20} /> Assessment complete
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Your Leak Score is ready.
            </h3>
            <p className="text-slate-300">
              Where should we text your results and fixes?
            </p>
          </div>

          <div className="space-y-4 max-w-sm mx-auto">
            <div>
              <label htmlFor="llq-name" className="block text-slate-400 text-sm font-bold mb-1.5">
                First name
              </label>
              <input
                id="llq-name"
                type="text"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-amber-400 focus:outline-none"
                style={{ minHeight: "44px" }}
                placeholder="Terry"
              />
            </div>
            <div>
              <label htmlFor="llq-phone" className="block text-slate-400 text-sm font-bold mb-1.5">
                Mobile number
              </label>
              <input
                id="llq-phone"
                type="tel"
                inputMode="tel"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-amber-400 focus:outline-none"
                style={{ minHeight: "44px" }}
                placeholder="(210) 555-0147"
              />
            </div>

            {submitError && (
              <p className="text-red-400 text-sm">{submitError}</p>
            )}

            <button
              onClick={submitLead}
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 font-black text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ minHeight: "44px" }}
            >
              {submitting ? "Scoring..." : "Show My Leak Score"}
              {!submitting && <ArrowRight size={20} />}
            </button>
            <p className="text-slate-500 text-xs text-center">
              We'll text your score and top fixes. No spam, no daily blasts.
            </p>
          </div>
        </div>
      </Shell>
    );
  }

  // Results
  return (
    <Shell>
      <div className="p-6 sm:p-10">
        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider text-center mb-2">
          {lead.name ? `${lead.name}, your` : "Your"} Leak Score
        </p>

        <div className="text-center mb-2">
          <span className={`text-6xl font-black ${band.color}`}>{total}</span>
          <span className="text-slate-500 text-2xl font-black"> / {MAX_SCORE}</span>
        </div>
        <p className={`text-center text-xl font-black mb-4 ${band.color}`}>
          {band.label}
        </p>

        <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mb-6 max-w-sm mx-auto">
          <div
            className={`h-full ${band.bar} rounded-full transition-all`}
            style={{ width: `${Math.max(6, (total / MAX_SCORE) * 100)}%` }}
          />
        </div>

        <p className="text-slate-300 text-center max-w-md mx-auto mb-8">
          {band.summary}
        </p>

        {topLeaks.length > 0 && (
          <div className="space-y-4 mb-8">
            <p className="text-white font-black text-lg flex items-center gap-2">
              <TrendingDown size={20} className="text-orange-400" />
              Your biggest leaks
            </p>
            {topLeaks.map((leak) => (
              <div
                key={leak.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle
                    size={16}
                    className={leak.score === 2 ? "text-red-400" : "text-amber-400"}
                  />
                  <span className="text-white font-black">{leak.category}</span>
                  <span className="ml-auto text-xs font-bold text-slate-500 uppercase">
                    {leak.score === 2 ? "Major leak" : "Slow drip"}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-2">{leak.leakCopy}</p>
                <p className="text-slate-200 text-sm">
                  <span className="text-amber-400 font-bold">The fix: </span>
                  {leak.fix}
                </p>
              </div>
            ))}
          </div>
        )}

        {topLeaks.length === 0 && (
          <div className="bg-slate-900 border border-emerald-400/30 rounded-xl p-5 mb-8 text-center">
            <p className="text-emerald-400 font-black mb-1">No active leaks found.</p>
            <p className="text-slate-400 text-sm">
              Your systems are solid — the next lever is more volume into them.
            </p>
          </div>
        )}

        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl p-6 text-center">
          <p className="text-slate-900 font-black text-xl mb-1">
            Want these leaks sealed?
          </p>
          <p className="text-slate-800 text-sm mb-4">
            Get a free 30-minute audit — we'll walk your exact numbers and show
            you what each fix looks like. No pressure, no contract.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+12102130913"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-black px-6 py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
              style={{ minHeight: "44px" }}
            >
              <Phone size={18} /> Call (210) 213-0913
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/90 text-slate-900 font-black px-6 py-3.5 rounded-xl hover:bg-white transition-colors"
              style={{ minHeight: "44px" }}
            >
              Book My Free Audit <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            setStep(-1);
            setAnswers({});
            setLead({ name: "", phone: "" });
          }}
          className="block mx-auto mt-6 text-slate-500 text-sm hover:text-white transition-colors"
        >
          Retake the quiz
        </button>
      </div>
    </Shell>
  );
}
