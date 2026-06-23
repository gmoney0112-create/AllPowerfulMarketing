import React, { useState, useEffect } from 'react';
import {
  Menu, X, Mail, MapPin, Phone,
  TrendingUp, Users, Video, Globe,
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

// TODO: Replace with your Formspree form ID from https://formspree.io
const CONTACT_FORM_ID = 'YOUR_FORM_ID';

export default function ElevateSA() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentService, setCurrentService] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const hashPageMap = { '#about': 'about', '#contact': 'contact', '#services': 'services', '#privacy': 'privacy', '#terms': 'terms' };
    const page = hashPageMap[window.location.hash];
    if (page) setCurrentPage(page);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setCurrentService(null);
    const hashMap = { home: '', about: '#about', services: '#services', contact: '#contact', privacy: '#privacy', terms: '#terms' };
    window.location.hash = hashMap[page] ?? '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const openService = (id) => {
    setCurrentService(id);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeService = () => {
    setCurrentService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${CONTACT_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _replyto: formData.email }),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const services = [
    {
      id: 'lead-generation',
      icon: TrendingUp,
      title: 'Lead Generation',
      short: 'Fill your pipeline with qualified prospects who are ready to buy.',
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      accent: 'text-amber-600',
      border: 'border-amber-200',
    },
    {
      id: 'social-media',
      icon: Users,
      title: 'Social Media Management',
      short: 'Consistent, engaging content that builds your brand and grows your audience.',
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      accent: 'text-blue-600',
      border: 'border-blue-200',
    },
    {
      id: 'video-creation',
      icon: Video,
      title: 'Video Creation',
      short: 'Professional video content that captures attention and drives results.',
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
  ];

  const servicePages = {
    'lead-generation': {
      title: 'Lead Generation',
      tagline: 'More leads. Better leads. Real results.',
      hero: 'Stop waiting for customers to find you. All Powerful Marketing builds targeted lead generation systems that consistently deliver qualified prospects straight into your pipeline so you can focus on closing deals, not chasing them.',
      intro: 'Most businesses struggle not because their product is bad, but because they do not have a reliable, scalable way to find and attract new customers. We build that system for you. Through a combination of paid advertising, outreach campaigns, landing page optimization, and data-driven targeting, we create a steady, predictable flow of prospects who are already interested in what you offer.',
      includes: [
        'Targeted paid ad campaigns (Google, Meta, LinkedIn)',
        'Custom landing pages optimized for conversion',
        'Email and SMS outreach sequences',
        'CRM setup and lead tracking integration',
        'Audience research and buyer persona development',
        'A/B testing to continuously improve results',
        'Monthly performance reporting with clear ROI metrics',
        'Retargeting campaigns to re-engage warm prospects',
      ],
      useCases: ['Local service businesses needing a steady client pipeline', 'B2B companies targeting decision-makers', 'Real estate agents and brokers', 'Healthcare and medical practices', 'Home services contractors', 'Any business tired of relying on referrals alone'],
      why: 'We do not just run ads and hope for the best. Every campaign we build is tied to a clear conversion goal, tracked with precision, and continuously optimized. You will always know where your leads are coming from and exactly what they cost.',
    },
    'social-media': {
      title: 'Social Media Management',
      tagline: 'Your brand, active and engaging every single day.',
      hero: 'Your customers are on social media right now. The question is whether they are seeing you or your competitors. All Powerful Marketing manages your social presence so you stay top of mind, build trust, and turn followers into paying customers.',
      intro: 'Posting inconsistently, recycling the same content, or going silent for weeks kills your credibility and your algorithm reach. Our team creates and schedules professional, on-brand content tailored to each platform so your social media works around the clock even when you are focused on running your business.',
      includes: [
        'Custom content calendar (30-day planned in advance)',
        'Professional graphic design and copywriting',
        'Platform management: Facebook, Instagram, LinkedIn, TikTok',
        'Community management (comments, DMs, reviews)',
        'Hashtag research and SEO-optimized captions',
        'Story and reel creation',
        'Monthly analytics report with engagement insights',
        'Paid social ad management (optional add-on)',
      ],
      useCases: ['Business owners who have no time to manage their own accounts', 'Brands that need a professional, consistent presence', 'Companies launching into a new market or demographic', 'Restaurants, retailers, and service businesses', 'Professionals building a personal brand', 'Any business whose social media has gone dormant'],
      why: 'We do not use cookie-cutter templates. Every post we create is designed for your brand, your audience, and your goals. We write in your voice, reflect your values, and always post with a purpose, not just to fill a calendar.',
    },
    'video-creation': {
      title: 'Video Creation',
      tagline: 'Content that stops the scroll and starts the conversation.',
      hero: 'Video is the highest-performing content format on every major platform. All Powerful Marketing creates professional, eye-catching video content that builds your brand, showcases your services, and converts viewers into clients.',
      intro: 'People buy from brands they trust, and video builds that trust faster than any other medium. Whether you need short-form reels for social media, explainer videos for your website, testimonial clips, or promotional content for ads, our creative team handles everything from concept to final edit, delivering polished video your audience will actually watch.',
      includes: [
        'Short-form reels and TikToks (15-60 seconds)',
        'Long-form promotional and brand videos',
        'Service or product explainer videos',
        'Client testimonial video production',
        'Video ads optimized for paid campaigns',
        'Scriptwriting and storyboarding',
        'Professional editing, color grading, and captioning',
        'Platform-specific formatting (vertical, square, landscape)',
      ],
      useCases: ['Businesses launching a new product or service', 'Companies running paid video ad campaigns', 'Service businesses that want to showcase their work', 'Brands looking to grow on Instagram Reels or TikTok', 'Professionals building authority through video content', 'Any business that wants to stand out in a crowded feed'],
      why: 'Great video is not just about looking good. It is about saying the right thing to the right audience at the right moment. We combine creative storytelling with strategic thinking to produce video content that does not just get views, it gets results.',
    },
    'web-creation': {
      title: 'Website & Webpage Creation',
      tagline: 'Your 24/7 salesperson. Built to convert.',
      hero: 'Your website is your most powerful marketing tool or your biggest missed opportunity. All Powerful Marketing builds fast, professional, conversion-focused websites and landing pages that make an immediate impression and turn visitors into customers.',
      intro: 'A slow, outdated, or confusing website sends potential customers straight to your competitors. We design and build sites that look great on every device, load fast, rank on Google, and guide visitors toward taking action, whether that is calling you, filling out a form, or making a purchase. We handle everything from design to launch and beyond.',
      includes: [
        'Custom website design (desktop + mobile responsive)',
        'Conversion-optimized landing pages',
        'SEO foundation setup (meta tags, structured data, site speed)',
        'Contact forms and lead capture integration',
        'Google Analytics and tracking setup',
        'Content writing and copyediting',
        'Blog and content management system setup',
        'Ongoing maintenance and update packages available',
      ],
      useCases: ['Businesses with an outdated or non-existent website', 'Companies launching a new brand or rebrand', 'Businesses running ad campaigns that need dedicated landing pages', 'Service providers who need a site that actually generates leads', 'E-commerce brands needing a high-converting storefront', 'Professionals who want a site they are proud to share'],
      why: 'We do not hand you a template and walk away. Every site we build starts with your goals, your audience, and your brand. We design with intention and build with performance in mind, and we stick around to make sure it keeps working for you.',
    },
  };

  const testimonials = [
    { name: 'Maria L.', business: 'San Antonio Real Estate', quote: 'All Powerful Marketing completely transformed our lead pipeline. Within 60 days we had more qualified leads than we knew what to do with.', stars: 5 },
    { name: 'James T.', business: 'Local HVAC Company', quote: 'Our social media was non-existent before All Powerful Marketing. Now we get calls from Instagram every week. Night and day difference.', stars: 5 },
    { name: 'Rachel M.', business: 'Boutique Fitness Studio', quote: 'The website they built for us is stunning and actually converts. Our online bookings tripled in the first month.', stars: 5 },
  ];

  const stats = [
    { value: '150+', label: 'Clients Served' },
    { value: '3.2M+', label: 'Leads Generated' },
    { value: '98%', label: 'Client Retention' },
    { value: '5 Stars', label: 'Average Rating' },
  ];

  const Navbar = () => (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-900 shadow-lg shadow-black/20' : 'bg-slate-900/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
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
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">All Powerful Marketing</span>
            </button>
            <p className="text-sm leading-relaxed max-w-sm">
              San Antonio's marketing partner for businesses ready to grow. We deliver leads, content, video, and web solutions that actually move the needle.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"><FacebookIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"><InstagramIcon /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors"><LinkedInIcon /></a>
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
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-amber-400 flex-shrink-0" /><span>spimarketingteamtx@gmail.com</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400 flex-shrink-0" /><span>(210) 213-0913</span></div>
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
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <input name="name" value={formData.name} onChange={handleFormChange} required
          placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors" />
        <input name="email" type="email" value={formData.email} onChange={handleFormChange} required
          placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors" />
        <input name="phone" type="tel" value={formData.phone} onChange={handleFormChange}
          placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors" />
        <select name="service" value={formData.service} onChange={handleFormChange}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500 transition-colors">
          <option value="">Service of Interest</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          <option value="all">All Services / Not Sure</option>
        </select>
        <textarea name="message" value={formData.message} onChange={handleFormChange}
          placeholder="Tell us about your business and goals..." rows={compact ? 3 : 4}
          className={`px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors resize-none ${compact ? '' : 'sm:col-span-2'}`} />
      </div>
      <button type="submit" disabled={formStatus === 'sending'}
        className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60">
        {formStatus === 'sending' ? 'Sending...' : (
          <span className="flex items-center gap-2">Get My Free Strategy Call <ArrowRight className="w-4 h-4" /></span>
        )}
      </button>
      {formStatus === 'success' && <p className="mt-3 text-center text-emerald-400 text-sm">Thank you! We will be in touch within 1 business day.</p>}
      {formStatus === 'error' && <p className="mt-3 text-center text-red-400 text-sm">Something went wrong. Please email us at spimarketingteamtx@gmail.com</p>}
    </form>
  );

  if (currentService && servicePages[currentService]) {
    const svc = services.find(s => s.id === currentService);
    const page = servicePages[currentService];
    const Icon = svc.icon;
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className={`bg-gradient-to-br ${svc.color} py-16 px-4`}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-6">
                <Icon className="w-4 h-4" />{svc.title}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">{page.tagline}</h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">{page.hero}</p>
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
                <p className="text-slate-600 leading-relaxed mb-8">{page.intro}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {page.includes.map((item, i) => (
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
                    {page.useCases.map((uc, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                        <ChevronRight className={`w-4 h-4 ${svc.accent} flex-shrink-0 mt-0.5`} />{uc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Why All Powerful Marketing</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{page.why}</p>
                  <button onClick={() => navigateTo('contact')}
                    className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center gap-2">
                    Request a Free Quote <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <button onClick={closeService} className="text-slate-500 hover:text-slate-700 text-sm underline">Back to All Services</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: June 2025</p>
          <div className="text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>All Powerful Marketing is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or use our services.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Information We Collect</h2>
            <p>We collect information you voluntarily provide, including your name, email address, phone number, and any details you share via our contact form. We may also collect usage data through analytics tools such as Google Analytics.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">How We Use Your Information</h2>
            <p>We use your information to respond to inquiries, provide our services, send relevant communications (with your consent), and improve our website and offerings. We do not sell or share your personal information with third parties for their marketing purposes.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Data Security</h2>
            <p>We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, email us at spimarketingteamtx@gmail.com.</p>
          </div>
          <button onClick={() => navigateTo('home')} className="mt-10 text-amber-600 hover:text-amber-700 text-sm font-medium">Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'terms') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: June 2025</p>
          <div className="text-slate-700 space-y-6 text-sm leading-relaxed">
            <p>By using All Powerful Marketing's website or services, you agree to these Terms of Service. Please read them carefully.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Services</h2>
            <p>All Powerful Marketing provides digital marketing services including lead generation, social media management, video creation, and website development. The scope of services is defined in individual client agreements or proposals.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Payment</h2>
            <p>Payment terms are outlined in your service agreement. We reserve the right to suspend services for accounts with outstanding balances.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Intellectual Property</h2>
            <p>Content created by All Powerful Marketing on behalf of a client becomes the client's property upon full payment. All Powerful Marketing retains the right to display work in our portfolio unless otherwise agreed in writing.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Limitation of Liability</h2>
            <p>All Powerful Marketing is not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for the specific service in question.</p>
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Contact</h2>
            <p>Questions? Email spimarketingteamtx@gmail.com.</p>
          </div>
          <button onClick={() => navigateTo('home')} className="mt-10 text-amber-600 hover:text-amber-700 text-sm font-medium">Back to Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">About <span className="text-amber-400">All Powerful Marketing</span></h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">A San Antonio-rooted marketing agency built on one belief: your business deserves marketing that actually works.</p>
          </div>
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
                <p className="text-slate-600 leading-relaxed mb-4">All Powerful Marketing was founded by marketers and entrepreneurs who got tired of seeing great local businesses lose to competitors with bigger ad budgets and mediocre products. We built All Powerful Marketing to level the playing field.</p>
                <p className="text-slate-600 leading-relaxed mb-4">We are a full-service digital marketing agency based in San Antonio, Texas, serving businesses across the city and beyond. Our team specializes in four core areas: lead generation, social media management, video creation, and website development.</p>
                <p className="text-slate-600 leading-relaxed">We do not believe in one-size-fits-all marketing. Every strategy we build starts with your goals, your audience, and your budget and it is built to deliver measurable, real-world results.</p>
              </div>
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-amber-700 mb-2">Our Mission</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">To help San Antonio businesses grow through smart, strategic, and results-driven digital marketing without the agency bloat, the jargon, or the empty promises.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Our Values</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {['Transparency in pricing and reporting', 'Accountability to measurable results', 'Speed - we move as fast as your business needs', 'Partnership - your growth is our growth'].map((v, i) => (
                      <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6">
                  <div className="text-3xl font-black text-amber-400 mb-1">{s.value}</div>
                  <div className="text-slate-400 text-xs font-medium uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to grow?</h2>
              <p className="text-slate-600 mb-6">Let us talk about your business and put together a plan that makes sense for you.</p>
              <button onClick={() => navigateTo('contact')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center gap-2">
                Get a Free Strategy Call <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
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
                        <Mail className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">Email</p>
                        <a href="mailto:spimarketingteamtx@gmail.com" className="text-amber-600 hover:text-amber-700 text-sm">spimarketingteamtx@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">Phone</p>
                        <a href="tel:2102130913" className="text-amber-600 hover:text-amber-700 text-sm">(210) 213-0913</a>
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
      </div>
    );
  }

  if (currentPage === 'services') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Our <span className="text-amber-400">Services</span></h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">Four high-impact marketing services built to grow San Antonio businesses.</p>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #f59e0b 0%, transparent 60%), radial-gradient(circle at 80% 20%, #f97316 0%, transparent 50%)' }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20 mb-10">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3d8AQWQPPK8?si=D6DkZqU_AWe8AsKk"
                title="All Powerful Marketing"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <Star className="w-3.5 h-3.5 fill-amber-400" /> San Antonio's Growth Marketing Agency
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Marketing That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Actually Grows</span> Your Business
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Lead generation. Social media. Video. Websites. All Powerful Marketing delivers the marketing your San Antonio business needs to attract customers, build trust, and scale all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigateTo('contact')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-xl text-lg hover:from-amber-400 hover:to-orange-400 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25">
              Get a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigateTo('services')}
              className="border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors inline-flex items-center justify-center gap-2">
              See Our Services
            </button>
          </div>
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-amber-400">{s.value}</div>
                <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Everything Your Business Needs to <span className="text-amber-500">Grow Online</span></h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Four focused services, one trusted partner. No bloated agency retainers just real work that gets real results.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">Why San Antonio Businesses Choose <span className="text-amber-500">All Powerful Marketing</span></h2>
              <div className="space-y-5">
                {[
                  { title: 'Results, Not Reports', desc: 'Every strategy we build is tied to a measurable outcome. You will always know what is working and what it is delivering.' },
                  { title: 'Local Market Knowledge', desc: 'We know San Antonio. We understand the audiences, the competition, and what it takes to stand out in this market.' },
                  { title: 'One Agency, Full Stack', desc: 'Stop managing five vendors. We handle leads, social, video, and websites under one roof with one point of contact.' },
                  { title: 'No Lock-In Contracts', desc: 'We earn your business every month. Our results speak for themselves, and we do not need contracts to keep you around.' },
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
              <h3 className="text-xl font-bold text-white mb-6">Get Your Free Strategy Call</h3>
              <ContactForm compact={true} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-slate-600">Real results from real San Antonio businesses.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">Ready to Power Up Your Business?</h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">Get a free 30-minute strategy call. No pressure, no commitment just a clear plan to grow your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigateTo('contact')}
              className="bg-white text-slate-900 font-bold px-8 py-4 rounded-xl text-lg hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-2">
              Book My Free Call <ArrowRight className="w-5 h-5" />
            </button>
            <a href="mailto:spimarketingteamtx@gmail.com"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
