import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Menu, X, MapPin, Phone,
  TrendingUp, Users, Video, Globe, Zap,
  ChevronRight, ArrowRight, CheckCircle, Star
} from 'lucide-react';

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const CONTACT_FORM_ID = 'mqeveyqo';
const SITE_URL = 'https://allpowerfulmarketing.com';
const OG_IMAGE = `${SITE_URL}/apm-logo.png`;
const PHONE_DISPLAY = '(210) 213-0913';
const PHONE_HREF = 'tel:+12102130913';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'MarketingAgency',
  name: 'All Powerful Marketing',
  url: SITE_URL,
  telephone: '+1-210-213-0913',
  areaServed: { '@type': 'City', name: 'San Antonio', containedIn: 'Texas, USA' },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61590598517520',
    'https://www.instagram.com/allpowerfulmarketing',
    'https://www.linkedin.com/in/all-powerful-marketing-328400419',
  ],
};

export default function ElevateSA({ page }) {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const currentPage = page;
  const currentService = serviceId || null;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentService]);

  const navigateTo = (p) => {
    const pathMap = { home: '/', about: '/about', services: '/services', contact: '/contact', privacy: '/privacy', terms: '/terms' };
    navigate(pathMap[p] ?? '/');
    setMobileMenuOpen(false);
  };

  const openService = (id) => navigate(`/services/${id}`);
  const closeService = () => navigate('/services');

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${CONTACT_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', service: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const services = [
    {
      id: 'ai-lead-generation',
      icon: TrendingUp,
      title: 'AI Lead Generation',
      short: 'Complete AI-powered systems that capture, qualify, and convert leads automatically — not just ads.',
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      accent: 'text-amber-600',
      border: 'border-amber-200',
    },
    {
      id: 'social-media',
      icon: Users,
      title: 'Social Media & Ad Campaigns',
      short: 'AI-assisted content, video ads, and targeted campaigns across Facebook, Instagram, and Google.',
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      accent: 'text-blue-600',
      border: 'border-blue-200',
    },
    {
      id: 'video-creation',
      icon: Video,
      title: 'Video Creation',
      short: 'AI-powered Reels, video ads, and spokesperson content that captures attention and drives results.',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      accent: 'text-purple-600',
      border: 'border-purple-200',
    },
    {
      id: 'web-creation',
      icon: Globe,
      title: 'Website & Webpage Creation',
      short: 'Beautiful, conversion-focused websites that work as hard as you do.',
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-emerald-50',
      accent: 'text-emerald-600',
      border: 'border-emerald-200',
    },
    {
      id: 'ai-automations',
      icon: Zap,
      title: 'AI Automations',
      short: 'Intelligent workflows that qualify leads, send follow-ups, and book appointments automatically — 24/7.',
      color: 'from-cyan-500 to-blue-600',
      bg: 'bg-cyan-50',
      accent: 'text-cyan-600',
      border: 'border-cyan-200',
    },
  ];

  const servicePages = {
    'ai-lead-generation': {
      title: 'AI Lead Generation',
      tagline: 'More leads. Better leads. Real results.',
      hero: 'Stop waiting for customers to find you. All Powerful Marketing builds complete AI-powered lead generation systems that consistently deliver qualified prospects straight into your pipeline — so you can focus on closing deals, not chasing them.',
      intro: 'Most businesses struggle not because their product is bad, but because they do not have a reliable, scalable way to find and attract new customers. We build that complete system for you. We go beyond just running ads — we deploy an AI-assisted pipeline that captures leads, qualifies them instantly with AI chatbots, follows up automatically via SMS and email, and books appointments on your calendar. The result is a predictable, hands-free lead flow that works even when you are not.',
      includes: [
        'Targeted paid ad campaigns (Google, Meta, LinkedIn)',
        'AI-optimized landing pages built to convert',
        'AI chatbot for instant 24/7 lead qualification',
        'Automated SMS and email follow-up sequences',
        'Appointment booking and calendar integration',
        'Missed-call text-back automation',
        'Review request workflows',
        'CRM setup and lead pipeline management',
        'A/B testing to continuously improve performance',
        'Monthly reporting with clear ROI metrics',
        'Retargeting campaigns to re-engage warm prospects',
      ],
      useCases: [
        'Roofing, HVAC, plumbing, and home service businesses',
        'Real estate agents and brokers',
        'Law firms and legal practices',
        'Medical, dental, and wellness practices',
        'Local service businesses needing a steady client pipeline',
        'B2B companies targeting decision-makers',
        'Any business tired of relying on referrals alone',
      ],
      why: 'We do not just run ads and hope for the best. Every lead generation system we build is a complete pipeline — from the first click to a booked appointment. AI handles qualification and follow-up instantly, so no lead goes cold. You will always know where your leads are coming from, what they cost, and how your pipeline is performing.',
      meta: {
        title: 'AI Lead Generation for San Antonio Businesses | APM',
        description: 'AI systems that capture, qualify, and convert leads automatically — chatbots, missed-call text-back, and follow-up that never sleeps.',
        canonical: `${SITE_URL}/services/ai-lead-generation`,
      },
      faqs: [
        { q: 'What does AI lead generation cost?', a: 'Setup typically ranges from $1,000 to $3,000. Monthly management runs $750 to $2,500 depending on ad spend and system complexity.' },
        { q: 'How long before I see results?', a: 'Most clients see their first qualified leads within 7 to 14 days. Full optimization takes 60 to 90 days.' },
        { q: 'Do you require long-term contracts?', a: 'No. All services are month-to-month. We earn your business with results, not contracts.' },
        { q: 'What areas do you serve?', a: 'We primarily serve San Antonio, TX and surrounding Bexar County. We also work with Texas businesses remotely.' },
      ],
    },
    'social-media': {
      title: 'Social Media & Ad Campaigns',
      tagline: 'Your brand, active and converting every single day.',
      hero: 'Your customers are on social media right now. The question is whether they are seeing you or your competitors. All Powerful Marketing manages your social presence and runs targeted ad campaigns using AI-powered creative tools — so you stay top of mind, build trust, and turn followers into paying customers.',
      intro: 'Posting inconsistently or running generic ads kills your credibility and your reach. Our team uses industry-leading AI tools — including AdCreative.ai, Creatify, Canva Pro, and ChatGPT — to produce high-performing content and ad creatives at scale. We plan and schedule 30 days of content in advance, produce 4 to 8 video ads per month, and run active campaigns across Facebook, Instagram, and Google — all tailored to your brand and your audience.',
      includes: [
        'Custom content calendar (30 days planned in advance)',
        '4 to 8 video ads per month (Reels, Stories, and feed)',
        'Facebook and Instagram campaign management',
        'Google Display ad creatives',
        'AI-assisted graphic design and professional copywriting',
        'Platform management: Facebook, Instagram, LinkedIn, TikTok',
        'Community management (comments, DMs, reviews)',
        'Hashtag research and SEO-optimized captions',
        'Story and Reel creation',
        'Monthly analytics report with engagement and ad performance insights',
        'Paid social ad management (optional add-on)',
      ],
      useCases: [
        'Business owners who have no time to manage their own accounts',
        'Brands that need professional, consistent content at scale',
        'Companies launching into a new market or demographic',
        'Restaurants, retailers, and service businesses',
        'Businesses running paid campaigns that need strong creatives',
        'Professionals building a personal brand',
        'Any business whose social presence has gone dormant',
      ],
      why: 'We do not use cookie-cutter templates. We combine AI-powered creative tools with human strategy to produce content that performs — not just content that fills a calendar. Every post, ad, and video is built for your brand, your audience, and a specific conversion goal.',
      meta: {
        title: 'Social Media & Ad Campaigns | San Antonio | APM',
        description: 'Done-for-you Facebook, Instagram, and Google campaigns with AI-assisted content for San Antonio local businesses.',
        canonical: `${SITE_URL}/services/social-media`,
      },
      faqs: [
        { q: 'What does social media management cost?', a: 'Packages start at $750 per month for content management. Ad campaign management is priced based on ad spend.' },
        { q: 'How many posts do you create per month?', a: 'We plan and schedule 30 days of content in advance, plus 4 to 8 video ads per month depending on your package.' },
        { q: 'Do you require long-term contracts?', a: 'No long-term contracts. All services are month-to-month.' },
        { q: 'What platforms do you manage?', a: 'Facebook, Instagram, LinkedIn, TikTok, and Google Display campaigns.' },
      ],
    },
    'video-creation': {
      title: 'Video Creation',
      tagline: 'Content that stops the scroll and starts the conversation.',
      hero: 'Video is the highest-performing content format on every major platform. All Powerful Marketing creates professional, eye-catching video content using AI-powered production tools — so you get polished, high-converting video faster and at a fraction of traditional production costs.',
      intro: 'People buy from brands they trust, and video builds that trust faster than any other medium. We use tools like Creatify, HeyGen, and Canva Pro to produce high-quality video ads, AI spokesperson videos, short-form Reels, and branded promotional content — all tailored to your business. Whether you need scroll-stopping social content or high-converting video ads for paid campaigns, our team handles everything from concept to final delivery.',
      includes: [
        'Short-form Reels and TikToks (15 to 60 seconds)',
        'Video ads optimized for Facebook, Instagram, and Google',
        'AI spokesperson and talking-head videos',
        'Long-form promotional and brand videos',
        'Service and product explainer videos',
        'Client testimonial video production',
        'Scriptwriting and storyboarding',
        'Professional editing, color grading, and captioning',
        'Platform-specific formatting (vertical, square, landscape)',
      ],
      useCases: [
        'Businesses launching a new product or service',
        'Companies running paid video ad campaigns',
        'Service businesses that want to showcase their work',
        'Brands looking to grow on Instagram Reels or TikTok',
        'Businesses that need spokesperson or explainer content without hiring on-camera talent',
        'Any business that wants to stand out in a crowded feed',
      ],
      why: 'Great video is not just about looking good. It is about saying the right thing to the right audience at the right moment. We combine AI-powered production with strategic creative direction to produce video content that does not just get views — it gets results.',
      meta: {
        title: 'Video Creation & Video Ads | San Antonio | APM',
        description: 'Scroll-stopping Reels, video ads, and AI spokesperson content built for local service businesses in San Antonio.',
        canonical: `${SITE_URL}/services/video-creation`,
      },
      faqs: [
        { q: 'What does video production cost?', a: 'Video packages are priced based on volume and complexity. Contact us for a custom quote.' },
        { q: 'How long does video production take?', a: 'Most projects are delivered within 5 to 10 business days from approval of the brief.' },
        { q: 'Do I own the videos?', a: 'Yes. All video content becomes your property upon full payment.' },
        { q: 'Do you require contracts?', a: 'No long-term contracts. Services are month-to-month.' },
      ],
    },
    'web-creation': {
      title: 'Website & Webpage Creation',
      tagline: 'Your 24/7 salesperson. Built to convert.',
      hero: 'Your website is your most powerful marketing tool or your biggest missed opportunity. All Powerful Marketing builds fast, professional, conversion-focused websites and landing pages that make an immediate impression and turn visitors into customers.',
      intro: 'A slow, outdated, or confusing website sends potential customers straight to your competitors. We design and build sites that look great on every device, load fast, rank on Google, and guide visitors toward taking action, whether that is calling you, filling out a form, or making a purchase. We handle everything from design to launch and beyond.',
      includes: [
        'Custom website design (desktop and mobile responsive)',
        'Conversion-optimized landing pages',
        'SEO foundation setup (meta tags, structured data, site speed)',
        'Contact forms and lead capture integration',
        'Google Analytics and tracking setup',
        'Content writing and copyediting',
        'Blog and content management system setup',
        'Ongoing maintenance and update packages available',
      ],
      useCases: [
        'Businesses with an outdated or non-existent website',
        'Companies launching a new brand or rebrand',
        'Businesses running ad campaigns that need dedicated landing pages',
        'Service providers who need a site that actually generates leads',
        'E-commerce brands needing a high-converting storefront',
        'Professionals who want a site they are proud to share',
      ],
      why: 'We do not hand you a template and walk away. Every site we build starts with your goals, your audience, and your brand. We design with intention and build with performance in mind, and we stick around to make sure it keeps working for you.',
      meta: {
        title: 'Website Design for Local Businesses | San Antonio | APM',
        description: 'Conversion-focused websites for San Antonio service businesses — mobile-first, click-to-call, built to book jobs.',
        canonical: `${SITE_URL}/services/web-creation`,
      },
      faqs: [
        { q: 'What does a website cost?', a: 'Custom websites typically range from $1,500 to $5,000 depending on scope. Landing pages start at $500.' },
        { q: 'How long does it take to build a website?', a: 'Most sites are delivered in 2 to 4 weeks from kickoff.' },
        { q: 'Do you offer ongoing maintenance?', a: 'Yes. We offer monthly maintenance and update packages after launch.' },
        { q: 'Will my site rank on Google?', a: 'Every site we build includes SEO foundation setup — meta tags, structured data, mobile-first design, and fast load times.' },
      ],
    },
    'ai-automations': {
      title: 'AI Automations',
      tagline: 'Stop doing manually what AI can do automatically.',
      hero: 'Most local businesses waste hours every week on repetitive tasks — following up with leads, answering the same questions, scheduling appointments. All Powerful Marketing builds custom AI automation systems that handle these workflows for you, 24 hours a day, 7 days a week, so your team can focus on the work that actually grows your business.',
      intro: 'AI automation is the highest-leverage service we offer. Using platforms like GoHighLevel, Make.com, and n8n, we build multi-step workflows that connect your lead sources, CRM, calendar, SMS, email, and communication tools into one seamless system. When a new lead comes in, your automation immediately qualifies them, sends a personalized response, books an appointment, notifies your team, and follows up — without anyone lifting a finger.',
      includes: [
        'Custom AI chatbot for 24/7 lead qualification and FAQ handling',
        'AI receptionist for after-hours call and message coverage',
        'Automated SMS and email follow-up sequences',
        'Appointment booking and calendar automation',
        'Missed-call text-back workflows',
        'CRM integration and automated pipeline management',
        'Review request and reputation management automation',
        'Multi-step workflow builds (GoHighLevel, Make.com, n8n)',
        'Industry-specific automation blueprints',
        'Monthly automation performance reporting',
      ],
      useCases: [
        'HVAC companies that need instant lead response and technician dispatch',
        'Law firms that want AI to qualify cases and schedule consultations 24/7',
        'Real estate agents who need instant follow-up on Facebook and Zillow leads',
        'Medical and dental practices reducing no-shows with automated reminders',
        'Home service businesses managing high lead volume without adding staff',
        'Any business spending hours on tasks that should run automatically',
      ],
      why: 'This is where we differentiate ourselves from traditional marketing agencies. We do not just bring you leads — we build the system that catches, qualifies, and converts them automatically. One new client from a single automated workflow can pay for months of our service. That is the ROI of AI automation done right.',
      meta: {
        title: 'AI Automations for Local Businesses | San Antonio | APM',
        description: 'Automate follow-ups, booking, reviews, and missed-call text-back with AI workflows built for San Antonio businesses.',
        canonical: `${SITE_URL}/services/ai-automations`,
      },
      faqs: [
        { q: 'What does AI automation cost?', a: 'Automation systems start at $750 per month for management. Setup fees vary based on complexity.' },
        { q: 'What platforms do you use?', a: 'We build on GoHighLevel, Make.com, and n8n depending on your needs and existing tools.' },
        { q: 'Do you require long-term contracts?', a: 'No long-term contracts. All services are month-to-month.' },
        { q: 'How long does setup take?', a: 'Most automation systems are live within 7 to 14 days of kickoff.' },
      ],
    },
  };

  const StickyCallBar = () => (
    <a href={PHONE_HREF}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-base shadow-lg transition-colors"
      style={{ minHeight: '56px' }}>
      <Phone className="w-5 h-5" /> Call {PHONE_DISPLAY}
    </a>
  );

  const Navbar = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900 shadow-lg shadow-black/20' : 'bg-slate-900/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2">
            <img src="/apm-logo.png" alt="All Powerful Marketing" className="h-10 w-10 rounded-lg bg-white object-contain p-0.5" />
            <span className="text-white font-bold text-xl tracking-tight">All Powerful Marketing</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {['home', 'services', 'about', 'contact'].map(p => (
              <button key={p} onClick={() => navigateTo(p)}
                className={`capitalize text-sm font-medium transition-colors ${
                  currentPage === p ? 'text-amber-400' : 'text-slate-300 hover:text-white'
                }`}>
                {p}
              </button>
            ))}
            <a href={PHONE_HREF} className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium transition-colors">
              <Phone className="w-4 h-4 text-amber-400" />{PHONE_DISPLAY}
            </a>
            <button onClick={() => navigateTo('contact')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-amber-400 hover:to-orange-400 transition-all">
              Get a Free Quote
            </button>
          </div>
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 py-3 space-y-1">
            {['home', 'services', 'about', 'contact'].map(p => (
              <button key={p} onClick={() => navigateTo(p)}
                className={`block w-full text-left px-3 py-2 rounded-lg capitalize text-sm font-medium transition-colors ${
                  currentPage === p ? 'bg-amber-500/10 text-amber-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}>
                {p}
              </button>
            ))}
            <a href={PHONE_HREF} className="flex items-center gap-2 px-3 py-2 text-amber-400 font-semibold text-sm">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
            <button onClick={() => navigateTo('contact')}
              className="block w-full text-center mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Get a Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className="bg-slate-950 text-slate-400 pb-14 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 mb-4">
              <img src="/apm-logo.png" alt="All Powerful Marketing" className="h-10 w-10 rounded-lg bg-white object-contain p-0.5" />
              <span className="text-white font-bold text-xl tracking-tight">All Powerful Marketing</span>
            </button>
            <p className="text-sm leading-relaxed max-w-sm">
              San Antonio's AI-powered marketing partner for home-service and local businesses ready to grow. Leads, content, video, and automation — all in one place.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/profile.php?id=61590598517520" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"><FacebookIcon /></a>
              <a href="https://www.instagram.com/allpowerfulmarketing" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"><InstagramIcon /></a>
              <a href="https://www.linkedin.com/in/all-powerful-marketing-328400419" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"><LinkedInIcon /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map(s => (
                <li key={s.id}>
                  <button onClick={() => openService(s.id)} className="hover:text-amber-400 transition-colors text-left">{s.title}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors">About Us</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors">Contact</button></li>
              <li><button onClick={() => navigateTo('privacy')} className="hover:text-amber-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => navigateTo('terms')} className="hover:text-amber-400 transition-colors">Terms of Service</button></li>
            </ul>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" /><span>San Antonio, TX</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400 flex-shrink-0" /><a href={PHONE_HREF} className="hover:text-amber-400 transition-colors">{PHONE_DISPLAY}</a></div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} All Powerful Marketing. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );

  const ContactForm = ({ compact = false }) => (
    <form onSubmit={handleFormSubmit}>
      <div className="grid gap-4">
        <input name="name" value={formData.name} onChange={handleFormChange} required
          placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors" />
        <input name="phone" type="tel" value={formData.phone} onChange={handleFormChange} required
          placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors" />
        <select name="service" value={formData.service} onChange={handleFormChange}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors">
          <option value="">Service of Interest</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          <option value="all">All Services / Not Sure</option>
        </select>
      </div>
      <button type="submit" disabled={formStatus === 'sending'}
        className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ minHeight: '48px' }}>
        {formStatus === 'sending' ? 'Sending...' : (
          <span className="flex items-center gap-2">Get My Free Strategy Call <ArrowRight className="w-4 h-4" /></span>
        )}
      </button>
      {formStatus === 'success' && <p className="mt-3 text-center text-emerald-400 text-sm">Thank you! We will be in touch within 1 business day.</p>}
      {formStatus === 'error' && <p className="mt-3 text-center text-red-400 text-sm">Something went wrong. Please call us at {PHONE_DISPLAY}</p>}
    </form>
  );

  // ── Service detail page ──────────────────────────────────────────────────────
  if (currentPage === 'service' && currentService && servicePages[currentService]) {
    const svc = services.find(s => s.id === currentService);
    const pg = servicePages[currentService];
    const Icon = svc.icon;
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pg.title,
      provider: { '@type': 'MarketingAgency', name: 'All Powerful Marketing', url: SITE_URL },
      areaServed: 'San Antonio, TX',
      description: pg.meta.description,
    };
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pg.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>{pg.meta.title}</title>
          <meta name="description" content={pg.meta.description} />
          <link rel="canonical" href={pg.meta.canonical} />
          <meta property="og:title" content={pg.meta.title} />
          <meta property="og:description" content={pg.meta.description} />
          <meta property="og:url" content={pg.meta.canonical} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
        <Navbar />
        <div className="pt-16 pb-14 md:pb-0">
          <div className={`bg-gradient-to-br ${svc.color} py-16 px-4`}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Icon className="w-4 h-4" />{svc.title}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">{pg.tagline}</h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">{pg.hero}</p>
              <button onClick={() => navigateTo('contact')}
                className="mt-8 bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Do</h2>
                <p className="text-slate-600 leading-relaxed mb-8">{pg.intro}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {pg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 ${svc.accent} flex-shrink-0 mt-0.5`} />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={`${svc.bg} ${svc.border} border rounded-2xl p-6 mb-6`}>
                  <h3 className={`text-lg font-bold ${svc.accent} mb-4`}>Who This Is For</h3>
                  <ul className="space-y-2">
                    {pg.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <ChevronRight className={`w-4 h-4 ${svc.accent} flex-shrink-0 mt-0.5`} />{uc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Why All Powerful Marketing</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{pg.why}</p>
                  <button onClick={() => navigateTo('contact')}
                    className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center gap-2">
                    Request a Free Quote <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
              <dl className="space-y-5">
                {pg.faqs.map((faq, i) => (
                  <div key={i}>
                    <dt className="font-semibold text-slate-800 mb-1">{faq.q}</dt>
                    <dd className="text-slate-600 text-sm leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-12 text-center">
              <button onClick={closeService} className="text-slate-500 hover:text-slate-700 text-sm underline">Back to All Services</button>
            </div>
          </div>
        </div>
        <Footer />
        <StickyCallBar />
      </div>
    );
  }

  // ── Privacy ──────────────────────────────────────────────────────────────────
  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>Privacy Policy | All Powerful Marketing</title>
          <meta name="robots" content="noindex,follow" />
          <link rel="canonical" href={`${SITE_URL}/privacy`} />
        </Helmet>
        <Navbar />
        <div className="pt-16 pb-14 md:pb-0 max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: June 2025</p>
          <div className="text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>All Powerful Marketing is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or use our services.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Information We Collect</h2>
            <p>We collect information you voluntarily provide, including your name, phone number, and any details you share via our contact form. We may also collect usage data through analytics tools such as Google Analytics.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">How We Use Your Information</h2>
            <p>We use your information to respond to inquiries, provide our services, send relevant communications (with your consent), and improve our website and offerings. We do not sell or share your personal information with third parties for their marketing purposes.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Data Security</h2>
            <p>We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, call us at <a href={PHONE_HREF} className="text-amber-600 hover:text-amber-700">{PHONE_DISPLAY}</a>.</p>
          </div>
          <button onClick={() => navigateTo('home')} className="mt-10 text-amber-600 hover:text-amber-700 text-sm font-medium">Back to Home</button>
        </div>
        <Footer />
        <StickyCallBar />
      </div>
    );
  }

  // ── Terms ────────────────────────────────────────────────────────────────────
  if (currentPage === 'terms') {
    return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>Terms of Service | All Powerful Marketing</title>
          <meta name="robots" content="noindex,follow" />
          <link rel="canonical" href={`${SITE_URL}/terms`} />
        </Helmet>
        <Navbar />
        <div className="pt-16 pb-14 md:pb-0 max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: June 2025</p>
          <div className="text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>By using All Powerful Marketing's website or services, you agree to these Terms of Service. Please read them carefully.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Services</h2>
            <p>All Powerful Marketing provides digital marketing services including AI lead generation, social media management, video creation, website development, and AI automation. The scope of services is defined in individual client agreements or proposals.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Payment</h2>
            <p>Payment terms are outlined in your service agreement. We reserve the right to suspend services for accounts with outstanding balances.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Intellectual Property</h2>
            <p>Content created by All Powerful Marketing on behalf of a client becomes the client's property upon full payment. All Powerful Marketing retains the right to display work in our portfolio unless otherwise agreed in writing.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Limitation of Liability</h2>
            <p>All Powerful Marketing is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Contact</h2>
            <p>Questions? Call <a href={PHONE_HREF} className="text-amber-600 hover:text-amber-700">{PHONE_DISPLAY}</a>.</p>
          </div>
          <button onClick={() => navigateTo('home')} className="mt-10 text-amber-600 hover:text-amber-700 text-sm font-medium">Back to Home</button>
        </div>
        <Footer />
        <StickyCallBar />
      </div>
    );
  }

  // ── About ────────────────────────────────────────────────────────────────────
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>About All Powerful Marketing | San Antonio, TX</title>
          <meta name="description" content="Meet the San Antonio agency behind AI-driven growth systems for local service businesses. Real results, month-to-month, no contracts." />
          <link rel="canonical" href={`${SITE_URL}/about`} />
          <meta property="og:title" content="About All Powerful Marketing | San Antonio, TX" />
          <meta property="og:description" content="Meet the San Antonio agency behind AI-driven growth systems for local service businesses. Real results, month-to-month, no contracts." />
          <meta property="og:url" content={`${SITE_URL}/about`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        </Helmet>
        <Navbar />
        <div className="pt-16 pb-14 md:pb-0">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4 text-center">
            <img src="/apm-logo.png" alt="All Powerful Marketing" className="h-24 w-24 rounded-2xl bg-white object-contain p-1 mx-auto mb-6 shadow-lg" />
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">About <span className="text-amber-400">All Powerful Marketing</span></h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">A San Antonio-rooted marketing agency built on one belief: your business deserves marketing that actually works.</p>
          </div>
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
                <p className="text-slate-600 leading-relaxed mb-4">All Powerful Marketing was founded by marketers and entrepreneurs who got tired of seeing great local businesses lose to competitors with bigger ad budgets and mediocre products. We built All Powerful Marketing to level the playing field.</p>
                <p className="text-slate-600 leading-relaxed mb-4">We are a full-service AI-powered digital marketing agency based in San Antonio, Texas, serving local service businesses and home-service trades across the city and beyond. Our team specializes in five core areas: AI lead generation, social media management and ad campaigns, video creation, website development, and AI automation systems.</p>
                <p className="text-slate-600 leading-relaxed mb-6">We do not believe in one-size-fits-all marketing. Every strategy we build starts with your goals, your audience, and your budget — and it is built to deliver measurable, real-world results.</p>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-4">
                  <h3 className="text-lg font-bold text-amber-700 mb-2">Our Mission</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">To help San Antonio home-service and local businesses grow through smart, AI-powered digital marketing — without the agency bloat, the jargon, or the empty promises.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Our Values</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {['Transparency in pricing and reporting', 'Accountability to measurable results', 'Speed — we move as fast as your business needs', 'Month-to-month agreements — no lock-in contracts'].map((v, i) => (
                      <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <img src="/apm-team.png" alt="All Powerful Marketing Team" className="w-full rounded-2xl shadow-xl" />
              </div>
            </div>
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to grow?</h2>
              <p className="text-slate-600 mb-6">Let us talk about your business and put together a plan that makes sense for you.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => navigateTo('contact')}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center gap-2">
                  Get a Free Strategy Call <ArrowRight className="w-4 h-4" />
                </button>
                <a href={PHONE_HREF}
                  className="border border-slate-300 text-slate-700 font-semibold px-8 py-3 rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4 text-amber-500" /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <StickyCallBar />
      </div>
    );
  }

  // ── Contact ──────────────────────────────────────────────────────────────────
  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>Get a Free Strategy Call | All Powerful Marketing</title>
          <meta name="description" content="Book a free 30-minute strategy call with a San Antonio marketing team. Call (210) 213-0913 or send the form — same-day response." />
          <link rel="canonical" href={`${SITE_URL}/contact`} />
          <meta property="og:title" content="Get a Free Strategy Call | All Powerful Marketing" />
          <meta property="og:description" content="Book a free 30-minute strategy call with a San Antonio marketing team. Call (210) 213-0913 or send the form — same-day response." />
          <meta property="og:url" content={`${SITE_URL}/contact`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        </Helmet>
        <Navbar />
        <div className="pt-16 pb-14 md:pb-0">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Let's <span className="text-amber-400">Talk</span></h1>
            <p className="text-slate-300 text-lg max-w-xl mx-auto">Tell us about your business. We will put together a free strategy and quote within 1 business day.</p>
          </div>
          <div className="max-w-5xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 bg-slate-900 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Get Your Free Strategy Call</h2>
                <ContactForm />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">Location</p>
                        <p className="text-slate-600 text-sm">San Antonio, TX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">Phone</p>
                        <a href={PHONE_HREF} className="text-amber-600 hover:text-amber-700 text-sm font-semibold">{PHONE_DISPLAY}</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <h4 className="font-bold text-amber-800 text-sm mb-2">What happens next?</h4>
                  <ol className="space-y-2 text-xs text-amber-900">
                    <li className="flex gap-2"><span className="font-bold">1.</span> We review your submission within 1 business day.</li>
                    <li className="flex gap-2"><span className="font-bold">2.</span> We schedule a free 30-minute strategy call.</li>
                    <li className="flex gap-2"><span className="font-bold">3.</span> You receive a custom proposal with pricing.</li>
                    <li className="flex gap-2"><span className="font-bold">4.</span> We get to work.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <StickyCallBar />
      </div>
    );
  }

  // ── Services listing ─────────────────────────────────────────────────────────
  if (currentPage === 'services') {
    return (
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>Marketing Services for San Antonio Businesses | APM</title>
          <meta name="description" content="AI lead generation, social & ad campaigns, video creation, websites, and AI automations — full-stack growth for local San Antonio businesses." />
          <link rel="canonical" href={`${SITE_URL}/services`} />
          <meta property="og:title" content="Marketing Services for San Antonio Businesses | APM" />
          <meta property="og:description" content="AI lead generation, social & ad campaigns, video creation, websites, and AI automations — full-stack growth for local San Antonio businesses." />
          <meta property="og:url" content={`${SITE_URL}/services`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={OG_IMAGE} />
          <meta name="twitter:card" content="summary_large_image" />
          <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        </Helmet>
        <Navbar />
        <div className="pt-16 pb-14 md:pb-0">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Our <span className="text-amber-400">Services</span></h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Five AI-powered marketing services built to grow San Antonio businesses.</p>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid sm:grid-cols-2 gap-8">
              {services.map(svc => {
                const Icon = svc.icon;
                return (
                  <div key={svc.id} className={`${svc.bg} ${svc.border} border rounded-2xl p-8 hover:shadow-lg transition-shadow`}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${svc.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{svc.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{servicePages[svc.id].intro.substring(0, 180)}...</p>
                    <button onClick={() => openService(svc.id)}
                      className={`inline-flex items-center gap-2 ${svc.accent} font-semibold text-sm hover:gap-3 transition-all`}>
                      Learn More <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-black text-white mb-3">Not sure which service you need?</h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">Tell us about your business goals and we will recommend the right combination of services to get you there.</p>
              <button onClick={() => navigateTo('contact')}
                className="bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <Footer />
        <StickyCallBar />
      </div>
    );
  }

  // ── Home ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AI Marketing Agency in San Antonio | All Powerful Marketing</title>
        <meta name="description" content="AI-powered lead generation, ads, video, and websites for San Antonio home-service businesses. One team, one monthly fee, no lock-in contracts." />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:title" content="AI Marketing Agency in San Antonio | All Powerful Marketing" />
        <meta property="og:description" content="AI-powered lead generation, ads, video, and websites for San Antonio home-service businesses. One team, one monthly fee, no lock-in contracts." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f59e0b 0%, transparent 60%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 50%)' }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20 mb-10">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3d8AQWQPPK8?si=D6DkZqU_AWe8AsKk"
                title="All Powerful Marketing — San Antonio AI Marketing Agency"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> San Antonio's AI Growth Marketing Agency
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Marketing That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Actually Grows</span> Your Business
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered lead generation, social media, video, and websites for San Antonio home-service and local businesses. One team, one monthly fee, no lock-in contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigateTo('contact')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-xl text-lg hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25"
              style={{ minHeight: '56px' }}>
              Get a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </button>
            <a href={PHONE_HREF}
              className="border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-flex items-center justify-center gap-2"
              style={{ minHeight: '56px' }}>
              <Phone className="w-5 h-5 text-amber-400" /> {PHONE_DISPLAY}
            </a>
          </div>
          {/* Trust strip — replaces fabricated stats */}
          <div className="mt-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-5 max-w-3xl mx-auto">
            <p className="text-amber-300 text-center font-semibold text-sm uppercase tracking-wider">
              Trusted by San Antonio Home-Service Businesses
            </p>
            <p className="text-slate-400 text-center text-sm mt-1">
              Tree service &middot; Residential cleaning &middot; HVAC &middot; Roofing &middot; Property management &middot; Landscaping
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Everything Your Business Needs to <span className="text-amber-500">Grow Online</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Five AI-powered services, one trusted partner. No bloated agency retainers — real work that gets real results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(svc => {
              const Icon = svc.icon;
              return (
                <button key={svc.id} onClick={() => openService(svc.id)}
                  className="group text-left bg-white border border-slate-200 hover:border-transparent hover:shadow-xl rounded-2xl p-6 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${svc.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{svc.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc.short}</p>
                  <div className={`flex items-center gap-1 mt-4 text-sm font-semibold ${svc.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Growth System */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" /> All-In-One Growth Package
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">The AI Growth System — <span className="text-amber-400">Everything in One Place</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Instead of managing multiple vendors, get a complete AI-powered marketing and automation system under one roof — one team, one point of contact, one monthly fee.</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Facebook & Instagram Ads', 'Google Ads', 'AI Chatbot & Receptionist',
                'Automated SMS Campaigns', 'Email Marketing Sequences', 'CRM & Pipeline Management',
                'Appointment Booking', 'Review Generation', 'Social Media Content (30 days)',
                'Video Ad Creatives', 'Missed-Call Text-Back', 'Monthly Performance Reporting',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-slate-400 text-sm">Starting at</p>
                <p className="text-3xl font-black text-white">$1,500 <span className="text-lg font-normal text-slate-400">/ month</span></p>
                <p className="text-slate-500 text-xs mt-1">Custom packages available based on your business goals</p>
              </div>
              <button onClick={() => navigateTo('contact')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center gap-2 whitespace-nowrap">
                Get a Custom Quote <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">Why San Antonio Home-Service Businesses Choose <span className="text-amber-500">All Powerful Marketing</span></h2>
              <div className="space-y-5">
                {[
                  { title: 'Results, Not Reports', desc: 'Every strategy we build is tied to a measurable outcome. You will always know what is working and what it is delivering.' },
                  { title: 'Local Market Knowledge', desc: 'We know San Antonio. We understand the audiences, the competition, and what it takes to stand out in this market.' },
                  { title: 'One Agency, Full Stack', desc: 'Stop managing multiple vendors. We handle leads, social, video, websites, and automation under one roof — one point of contact.' },
                  { title: 'No Lock-In Contracts', desc: 'All services are month-to-month. We earn your business every month with results, not paperwork.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-2">Get Your Free Strategy Call</h3>
              <p className="text-slate-400 text-sm mb-6">Or call us directly: <a href={PHONE_HREF} className="text-amber-400 font-semibold hover:text-amber-300">{PHONE_DISPLAY}</a></p>
              <ContactForm compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Your Vision section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Your Vision. Our Strategy. <span className="text-amber-500">Powerful Results.</span></h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">We help San Antonio home-service and local businesses grow with powerful AI-driven marketing solutions designed to attract, engage, and convert. Based in San Antonio, TX — built for businesses ready to dominate.</p>
              <button onClick={() => navigateTo('contact')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center gap-2">
                Get a Free 30-Min Consultation <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div>
              <img src="/apm-team.png" alt="All Powerful Marketing Team in San Antonio" className="w-full rounded-2xl shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Built for <span className="text-amber-500">Local Service Businesses</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We specialize in industries where one new customer justifies a full marketing retainer — and where speed of follow-up wins the job.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              'Tree Service', 'Residential Cleaning', 'HVAC', 'Roofing & Plumbing',
              'Property Management', 'Landscaping', 'General Contractors', 'Auto Repair',
            ].map((industry, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 text-center hover:border-amber-300 hover:shadow-md transition-all cursor-default">
                <p className="text-slate-800 font-semibold text-sm">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Ready to Power Up Your Business?</h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">Get a free 30-minute strategy call. No pressure, no commitment — just a clear plan to grow your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigateTo('contact')}
              className="bg-white text-slate-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-2"
              style={{ minHeight: '56px' }}>
              Book My Free Call <ArrowRight className="w-5 h-5" />
            </button>
            <a href={PHONE_HREF}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              style={{ minHeight: '56px' }}>
              <Phone className="w-5 h-5" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCallBar />
    </div>
  );
}
