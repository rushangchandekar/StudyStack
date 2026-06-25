import React, { useEffect, useState } from 'react';
import { 
  Sparkles, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Check, Layout, BookOpen, 
  Users, Tag, Star, Layers, FolderOpen, Search, Clock, BarChart3,
  UploadCloud, Shield, Zap, Database, Bookmark, FileText,
  Globe, Plus, TrendingUp
} from 'lucide-react';

// Inline Github Icon to avoid version export discrepancies in lucide-react
function Github({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Inline Twitter Icon
function Twitter({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

// Inline Linkedin Icon
function Linkedin({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// Inline Youtube Icon
function Youtube({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <polygon points="10 15 15 12 10 9" />
    </svg>
  );
}

// Inline Facebook Icon
function Facebook({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// Inline Instagram Icon
function Instagram({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Inline Sun Icon
function Sun({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

// Inline Moon Icon
function Moon({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}



function TestimonialCarousel() {
  const [active, setActive] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const timerRef = React.useRef(null);

  const testimonials = [
    {
      text: "StudyStack completely transformed how I prepare for placements. All my Striver and Babbar sheets are now one click away. Everything is centralized and easy to track.",
      name: "Rahul Sharma",
      role: "B.Tech CSE · NIT Trichy",
      avatar: "R",
      color: "#a78bfa",
      rating: 5.0,
    },
    {
      text: "The analytics dashboard is a game changer. It made my study process faster and more organized. I can see exactly what I've completed and what's pending.",
      name: "Ananya Patel",
      role: "M.Sc Data Science · IIT Delhi",
      avatar: "A",
      color: "#f472b6",
      rating: 5.0,
    },
    {
      text: "I love how clean and intuitive the dashboard is. It saves me so much time every day. I used to waste 20 minutes finding links — now everything is tagged and sorted.",
      name: "Emily Wong",
      role: "B.E. IT · BITS Pilani",
      avatar: "E",
      color: "#34d399",
      rating: 5.0,
    },
    {
      text: "The creator tracking feature is genius. I can see all Gate Smashers content in one place. Highly recommend to every student preparing for competitive exams!",
      name: "Siddharth Jain",
      role: "B.Tech ECE · IIT Bombay",
      avatar: "S",
      color: "#fbbf24",
      rating: 5.0,
    },
    {
      text: "StudyStack helped me organize over 200 resources across 8 subjects. The fuzzy search is incredibly fast. Best study tool I've used in my entire college life.",
      name: "Priya Mehta",
      role: "MCA · Delhi University",
      avatar: "P",
      color: "#60a5fa",
      rating: 5.0,
    },
  ];

  const total = testimonials.length;

  const goTo = React.useCallback((index) => {
    let next = index;
    if (next < 0) next = total - 1;
    if (next >= total) next = 0;
    setActive(next);
  }, [total]);

  // Auto-advance
  React.useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Pause on hover
  const pauseTimer = () => clearInterval(timerRef.current);
  const resumeTimer = () => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % total);
    }, 3500);
  };

  // Drag/swipe
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    pauseTimer();
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? active + 1 : active - 1);
    }
    setIsDragging(false);
    resumeTimer();
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    pauseTimer();
  };

  const handleTouchEnd = (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? active + 1 : active - 1);
    }
    resumeTimer();
  };

  // Get position relative to active
  const getPos = (i) => {
    let diff = i - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="ss-testi-carousel-wrap"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { setIsDragging(false); resumeTimer(); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ss-testi-carousel">
        {testimonials.map((t, i) => {
          const pos = getPos(i);
          const isActive = pos === 0;
          const isAdjacent = Math.abs(pos) === 1;
          const isHidden = Math.abs(pos) > 1;

          return (
            <div
              key={i}
              className={`ss-testi-card 
                ${isActive ? 'ss-testi-active' : ''} 
                ${isAdjacent ? 'ss-testi-adjacent' : ''}
                ${isHidden ? 'ss-testi-hidden' : ''}
              `}
              style={{
                transform: `translateX(calc(${pos * 105}%)) scale(${isActive ? 1 : 0.88})`,
                opacity: isHidden ? 0 : isAdjacent ? 0.55 : 1,
                zIndex: isActive ? 3 : isAdjacent ? 2 : 1,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
              onClick={() => !isActive && goTo(i)}
            >
              {/* Quote icon */}
              <div className="ss-testi-quote">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#7c3aed" opacity="0.6">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </div>

              <p className="ss-testi-text">"{t.text}"</p>

              <div className="ss-testi-footer">
                <div className="ss-testi-author-row">
                  <div className="ss-testi-av" style={{background: t.color}}>
                    {t.avatar}
                  </div>
                  <div className="ss-testi-info">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
                <div className="ss-testi-rating">
                  <div className="ss-testi-stars">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={12} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className="ss-testi-score">{t.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot pagination */}
      <div className="ss-testi-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`ss-testi-dot ${i === active ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage({ isMockMode, isLoaded, isSignedIn, setView, isDarkMode, setIsDarkMode }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [activeShowcase, setActiveShowcase] = useState(0);

  useEffect(() => {
    const root = document.querySelector('.ss-landing');
    if (root) {
      if (isDarkMode) {
        root.classList.add('ss-dark');
      } else {
        root.classList.remove('ss-dark');
      }
    }
  }, [isDarkMode]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.anim-fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll-linked feature highlight
  useEffect(() => {
    const featEls = document.querySelectorAll('.ss-showcase-feat');
    if (!featEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-feat-index'), 10);
            if (!isNaN(index)) {
              setActiveShowcase(index);
            }
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    featEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCTA = () => {
    if (!isMockMode && isLoaded && isSignedIn) setView('dashboard');
    else setView('signin');
  };

  const isAuthed = !isMockMode && isLoaded && isSignedIn;

  const faqs = [
    { q: "Is StudyStack easy to use?", a: "Yes! StudyStack is designed with a clean and intuitive interface, making it easy for students to get started without a steep learning curve. Just sign up and start organizing in minutes." },
    { q: "Can I save resources from any platform?", a: "Absolutely. Save links from Google Drive, YouTube, websites, GitHub, and more. You can also upload PDF and DOCX files directly to your vault." },
    { q: "Is my data secure?", a: "Yes. We use enterprise-grade authentication via Clerk and encrypted cloud storage. Only you can access your personal vault." },
    { q: "Can I try it for free?", a: "Yes — StudyStack has a generous free tier that includes unlimited resources, tagging, and creator tracking. No credit card required." },
    { q: "Does StudyStack support large libraries?", a: "Definitely. Our infrastructure is built to handle thousands of resources per user with instant fuzzy search." },
    { q: "Can I integrate with other tools?", a: "We're working on integrations with Notion, Obsidian, and Google Drive sync. Stay tuned for updates!" }
  ];

  return (
    <div className={`ss-landing ${isDarkMode ? 'ss-dark' : ''}`}>
      {/* ============ NAVBAR ============ */}
      <header className="ss-navbar">
        <div className="ss-nav-inner">
          <div className="ss-nav-brand">
            <div className="ss-logo"><img src="/logo_symbol.png" alt="StudyStack" className="ss-logo-img" /></div>
            <span className="ss-logo-text">StudyStack</span>
          </div>
          <nav className="ss-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="ss-nav-actions">
            <button 
              className="ss-theme-toggle" 
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {!isAuthed && (
              <button className="ss-btn-ghost" onClick={() => setView('signin')}>Login</button>
            )}
            <button className="ss-btn-primary-sm" onClick={handleCTA}>
              {isAuthed ? 'Dashboard' : 'Get Started'}
            </button>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="ss-hero">
        <div className="ss-hero-bg-dots"></div>
        <div className="ss-hero-glow"></div>
        
        <div className="ss-hero-inner">
          <div className="ss-hero-tag">
            <span className="ss-dot-pulse"></span>
            All-in-one study solution
          </div>

          <h1 className="ss-hero-title">
            All Your Study Stuff.<br />
            In <span className="ss-gradient-text">One Clean Vault.</span>
          </h1>

          <p className="ss-hero-sub">
            As students, we collect notes, placement sheets, drive folders, and video links 
            from content creators. StudyStack groups, tags, and stores them securely in one 
            powerful dashboard.
          </p>

          <div className="ss-hero-ctas">
            <button className="ss-btn-primary-lg" onClick={handleCTA}>
              Get Started Free
            </button>
            <a href="#how-it-works" className="ss-btn-outline-lg">Learn More</a>
          </div>
        </div>

        {/* Full-width floating mockup */}
        <div className="ss-hero-mockup-wrap">
          <div className="ss-mockup-float">
            {/* Browser chrome */}
            <div className="ss-mockup-bar">
              <div className="ss-mockup-dots">
                <span className="dot-r"></span>
                <span className="dot-y"></span>
                <span className="dot-g"></span>
              </div>
              <div className="ss-mockup-addr">studystack.app/dashboard</div>
              <div style={{width: 70}}></div>
            </div>

            {/* Dashboard body */}
            <div className="ss-dash-body">
              {/* Sidebar */}
              <aside className="ss-dash-sidebar">
                <div className="ss-dash-brand">
                  <div className="ss-logo-mini"><img src="/logo_symbol.png" alt="StudyStack" className="ss-logo-img-mini" /></div>
                  <span>StudyStack</span>
                </div>
                <div className="ss-dash-nav active">
                  <Layout size={12} /> Dashboard
                </div>
                <div className="ss-dash-nav">
                  <BarChart3 size={12} /> Analytics
                </div>
                <div className="ss-dash-nav">
                  <Users size={12} /> Creators
                </div>
                <div className="ss-dash-nav">
                  <BookOpen size={12} /> Materials
                </div>
                <div className="ss-dash-nav">
                  <Tag size={12} /> Tags
                </div>
                <div className="ss-dash-nav">
                  <Shield size={12} /> Settings
                </div>
              </aside>

              {/* Main content */}
              <main className="ss-dash-main">
                {/* Top bar */}
                <div className="ss-dash-topbar">
                  <div className="ss-dash-topbar-left">
                    <span className="ss-dash-page-title">Dashboard</span>
                  </div>
                  <div className="ss-dash-topbar-right">
                    <div className="ss-dash-search">
                      <Search size={11} /> Quick Search...
                    </div>
                    <div className="ss-dash-avatars">
                      <span style={{background:'#a78bfa'}}></span>
                      <span style={{background:'#f472b6'}}></span>
                      <span style={{background:'#34d399'}}></span>
                    </div>
                    <div className="ss-dash-invite-btn">
                      <Plus size={10} /> Invite
                    </div>
                    <div className="ss-dash-unlock-btn">
                      <Zap size={10} /> Unlock Pro
                    </div>
                  </div>
                </div>

                {/* Welcome row */}
                <div className="ss-dash-welcome-row">
                  <div className="ss-dash-welcome-text">
                    <h3>Hi, Welcome Back Rushang 👋</h3>
                  </div>
                  <div className="ss-dash-date-badge">
                    <span>📅 Jan - Mar 2026</span>
                  </div>
                  <div className="ss-dash-export-btn">
                    <TrendingUp size={10} /> Export Data
                  </div>
                </div>

                {/* Stat cards */}
                <div className="ss-dash-stats">
                  <div className="ss-dash-stat-card">
                    <div className="ss-dash-stat-top">
                      <span className="ss-dash-stat-label">Total Resources</span>
                      <span className="ss-dash-stat-more">•••</span>
                    </div>
                    <div className="ss-dash-stat-sub">Target: 200 Resources</div>
                    <div className="ss-dash-stat-main">128</div>
                    <div className="ss-dash-stat-bar-wrap">
                      <div className="ss-dash-stat-bar-track">
                        <div className="ss-dash-stat-bar-fill purple" style={{width:'64%'}}></div>
                      </div>
                    </div>
                    <div className="ss-dash-stat-chips">
                      <span className="ss-chip green">48 <span>Drive Links</span></span>
                      <span className="ss-chip yellow">80 <span>Videos</span></span>
                    </div>
                  </div>

                  <div className="ss-dash-stat-card">
                    <div className="ss-dash-stat-top">
                      <span className="ss-dash-stat-label">New This Week</span>
                      <span className="ss-dash-stat-more">•••</span>
                    </div>
                    <div className="ss-dash-stat-sub">Target: 20 per week</div>
                    <div className="ss-dash-stat-main">12 <span className="ss-dash-up">↑+3</span></div>
                    <div className="ss-dash-stat-bar-wrap">
                      <div className="ss-dash-stat-bar-track">
                        <div className="ss-dash-stat-bar-fill blue" style={{width:'60%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="ss-dash-stat-card">
                    <div className="ss-dash-stat-top">
                      <span className="ss-dash-stat-label">Completion Rate</span>
                      <span className="ss-dash-stat-more">•••</span>
                    </div>
                    <div className="ss-dash-stat-sub">Since Last Month</div>
                    <div className="ss-dash-stat-main">87% <span className="ss-dash-down">↓-11%</span></div>
                  </div>

                  <div className="ss-dash-stat-card">
                    <div className="ss-dash-stat-top">
                      <span className="ss-dash-stat-label">Active Creators</span>
                      <span className="ss-dash-stat-more">•••</span>
                    </div>
                    <div className="ss-dash-stat-sub">Since Last Month</div>
                    <div className="ss-dash-stat-main">23 <span className="ss-dash-up">↑+5 new</span></div>
                  </div>
                </div>

                {/* Bottom charts row */}
                <div className="ss-dash-charts-row">
                  {/* Bar chart */}
                  <div className="ss-dash-chart-card">
                    <div className="ss-dash-chart-head">
                      <span>Resource Distribution</span>
                      <div className="ss-dash-chart-tabs">
                        <span className="active">Weekly</span>
                        <span>Monthly</span>
                      </div>
                    </div>
                    <div className="ss-dash-chart-area">
                      {/* Y axis labels */}
                      <div className="ss-chart-y-axis">
                        {['80%','60%','40%','20%','10%'].map(l => (
                          <span key={l}>{l}</span>
                        ))}
                      </div>
                      <div className="ss-chart-bars-area">
                        <div className="ss-chart-grid-lines">
                          {[0,1,2,3,4].map(i => <div key={i} className="ss-grid-line"></div>)}
                        </div>
                        {[
                          {h:60, active: false},
                          {h:80, active: false},
                          {h:45, active: false},
                          {h:90, active: true},
                          {h:55, active: false},
                          {h:75, active: false},
                          {h:65, active: false},
                        ].map((b, i) => (
                          <div key={i} className="ss-chart-col">
                            <div 
                              className={`ss-chart-bar ${b.active ? 'active' : ''}`}
                              style={{height: `${b.h}%`}}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Line/attendance chart */}
                  <div className="ss-dash-chart-card">
                    <div className="ss-dash-chart-head">
                      <span>Study Activity</span>
                      <div className="ss-dash-chart-tabs">
                        <span className="active">May, 2026</span>
                      </div>
                    </div>
                    <div className="ss-dash-line-area">
                      <svg viewBox="0 0 220 80" className="ss-line-svg">
                        <defs>
                          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M0,60 L30,50 L60,55 L90,30 L120,40 L150,20 L180,35 L220,15" 
                          stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        <path d="M0,60 L30,50 L60,55 L90,30 L120,40 L150,20 L180,35 L220,15 L220,80 L0,80 Z" 
                          fill="url(#lineGrad)"/>
                        {/* Tooltip point */}
                        <circle cx="150" cy="20" r="3" fill="#7c3aed"/>
                        <rect x="120" y="2" width="60" height="32" rx="4" fill="white" 
                          stroke="#e5e7eb" strokeWidth="0.5"/>
                        <text x="130" y="14" fontSize="5" fill="#374151" fontWeight="600">May, 2026</text>
                        <text x="130" y="22" fontSize="4.5" fill="#6b7280">• 45% active</text>
                        <text x="130" y="28" fontSize="4.5" fill="#6b7280">• 18 hrs</text>
                      </svg>
                      <div className="ss-line-legend">
                        <span><i style={{background:'#7c3aed'}}></i> Active Sessions</span>
                        <span><i style={{background:'#a78bfa'}}></i> Resources Added</span>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUSTED BY ============ */}
      <section className="ss-trusted">
        <p className="ss-trusted-label">
          <span className="ss-trusted-purple">Trusted by</span>
          <span><strong>10,000+</strong> students worldwide</span>
        </p>
        <div className="ss-marquee-wrapper">
          <div className="ss-marquee-track">
            {/* Render twice for seamless loop */}
            {[...Array(2)].map((_, outerIdx) => (
              <div key={outerIdx} className="ss-marquee-set">
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                      stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Acme Corp</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#7c3aed" strokeWidth="2"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#7c3aed" strokeWidth="2"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#7c3aed" strokeWidth="2"/>
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="#7c3aed" strokeWidth="2"/>
                  </svg>
                  <span>Biosynthesis</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <polyline points="16 18 22 12 16 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                    <polyline points="8 6 2 12 8 18" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Codecraft</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="2"/>
                    <path d="M8 12 Q12 6 16 12 Q12 18 8 12Z" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
                  </svg>
                  <span>Curvegenius</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>NoteHub</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                      stroke="#7c3aed" strokeWidth="2"/>
                    <path d="M2 12H22M12 2C9 7 9 17 12 22M12 2C15 7 15 17 12 22" 
                      stroke="#7c3aed" strokeWidth="1.5"/>
                  </svg>
                  <span>SyllabusPro</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" 
                      stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Convergence</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9L12 2L21 9V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9Z" 
                      stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>StudyBase</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="#7c3aed" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Findable</span>
                </div>
                <div className="ss-marquee-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke="#7c3aed" strokeWidth="2"/>
                    <path d="M8 21H16M12 17V21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>ExamReady</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM SECTION ============ */}
      <section className="ss-section">
        <div className="ss-section-head anim-fade-up">
          <h2 className="ss-h2">Studying shouldn't be<br />this complicated</h2>
          <p className="ss-h2-sub">Students often deal with scattered resources, inefficient planning, and disjointed tools—making it harder to study effectively.</p>
        </div>
        <div className="ss-problem-grid">
          
          {/* Card 1: Scattered Study Resources */}
          <div className="ss-problem-card anim-fade-up">
            <div className="ss-problem-icon"><BookOpen size={18} /></div>
            <h3>Scattered Study Resources</h3>
            <p>Syllabus links, PDFs, and tutorials are spread across Drive, bookmarks, and chats, making them impossible to track in one place.</p>
            <div className="ss-problem-visual">
              <div className="ss-prob-table-mock">
                <div className="ss-prob-table-top">
                  <div className="ss-prob-table-actions">
                    <div className="ss-prob-table-btn">+ Filter by Subject</div>
                    <div className="ss-prob-table-btn">Subject: All</div>
                    <div className="ss-prob-table-search">
                      <Search size={8} />
                      <span>Search Resources...</span>
                    </div>
                  </div>
                </div>
                <div className="ss-prob-table-body">
                  <div className="ss-prob-table-row header">
                    <span>Resource</span>
                    <span>Type</span>
                    <span>Subject</span>
                    <span>Status</span>
                    <span>Source</span>
                    <span>Rating</span>
                  </div>
                  <div className="ss-prob-table-row">
                    <span className="emp-name">Striver SDE Sheet</span>
                    <span>Sheet</span>
                    <span>DSA</span>
                    <span className="status-badge interview">In Progress</span>
                    <span>takeuforward.org</span>
                    <span className="perf-bar"><i style={{width: '90%'}}></i></span>
                  </div>
                  <div className="ss-prob-table-row">
                    <span className="emp-name">OS Semaphores</span>
                    <span>Video</span>
                    <span>OS</span>
                    <span className="status-badge active">Completed</span>
                    <span>YouTube</span>
                    <span className="perf-bar"><i style={{width: '85%'}}></i></span>
                  </div>
                  <div className="ss-prob-table-row">
                    <span className="emp-name">DBMS Lecture Notes</span>
                    <span>PDF</span>
                    <span>DBMS</span>
                    <span className="status-badge inactive">Not Started</span>
                    <span>Google Drive</span>
                    <span className="perf-bar"><i style={{width: '60%'}}></i></span>
                  </div>
                  <div className="ss-prob-table-row">
                    <span className="emp-name">CN Cheat Sheet</span>
                    <span>Doc</span>
                    <span>Networks</span>
                    <span className="status-badge interview">In Progress</span>
                    <span>Notion</span>
                    <span className="perf-bar"><i style={{width: '75%'}}></i></span>
                  </div>
                  <div className="ss-prob-table-row">
                    <span className="emp-name">LeetCode Top 150</span>
                    <span>Practice</span>
                    <span>DSA</span>
                    <span className="status-badge offered">Scheduled</span>
                    <span>leetcode.com</span>
                    <span className="perf-bar"><i style={{width: '80%'}}></i></span>
                  </div>
                  <div className="ss-prob-table-row">
                    <span className="emp-name">System Design Intro</span>
                    <span>Article</span>
                    <span>SysDesign</span>
                    <span className="status-badge active">Completed</span>
                    <span>Medium</span>
                    <span className="perf-bar"><i style={{width: '45%'}}></i></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Time-Consuming Search */}
          <div className="ss-problem-card anim-fade-up anim-delay-1">
            <div className="ss-problem-icon"><Clock size={18} /></div>
            <h3>Time-Consuming Search</h3>
            <p>Searching through folders, bookmarks, and chat histories interrupts your flow and wastes hours of valuable study time.</p>
            <div className="ss-problem-visual">
              <div className="ss-prob-process-mock">
                <div className="ss-prob-process-card card-left">
                  <div className="ss-prob-card-title">Focus Time Wasted</div>
                  <div className="ss-prob-chart-wrap">
                    <svg viewBox="0 0 160 50" className="ss-prob-line-chart">
                      <path d="M0,45 Q20,30 40,35 T80,15 T120,25 T160,10" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
                      <path d="M0,45 Q20,30 40,35 T80,15 T120,25 T160,10 L160,50 L0,50 Z" fill="rgba(124, 58, 237, 0.06)" />
                      <circle cx="80" cy="15" r="2.5" fill="#7c3aed" />
                      <line x1="80" y1="15" x2="80" y2="50" stroke="#7c3aed" strokeWidth="0.5" strokeDasharray="2,2" />
                    </svg>
                    <div className="ss-prob-chart-tooltip">
                      <span>Search: 45 min</span>
                      <span>Organizing: 25 min</span>
                      <span>Actual Study: 20 min</span>
                    </div>
                  </div>
                </div>
                
                <div className="ss-prob-process-card card-right">
                  <div className="ss-prob-card-title">Today's Session</div>
                  <div className="ss-prob-process-grid">
                    <div className="ss-prob-proc-stat">
                      <span>Wasted Time</span>
                      <strong className="orange">70m</strong>
                    </div>
                    <div className="ss-prob-proc-stat">
                      <span>Sessions</span>
                      <strong className="purple">4</strong>
                    </div>
                    <div className="ss-prob-proc-stat">
                      <span>Distractions</span>
                      <strong className="green">12</strong>
                    </div>
                    <div className="ss-prob-proc-stat">
                      <span>Searches</span>
                      <strong className="blue">38</strong>
                    </div>
                  </div>
                  <div className="ss-prob-process-alert">
                    <span>⚠ 70% of time spent locating links</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Lack of Clear Progress */}
          <div className="ss-problem-card anim-fade-up">
            <div className="ss-problem-icon"><BarChart3 size={18} /></div>
            <h3>Lack of Clear Progress</h3>
            <p>Without structured syllabus mapping, it is difficult to know what portions you have finished, what is pending, and if you are ready for exams.</p>
            <div className="ss-problem-visual">
              <div className="ss-prob-insights-mock">
                <div className="ss-prob-insights-head">
                  <span className="title">Syllabus Progress Tracker</span>
                  <div className="ss-prob-insights-tabs">
                    <span className="active">Semester</span>
                    <span>Monthly</span>
                  </div>
                </div>
                <div className="ss-prob-insights-chart">
                  <svg viewBox="0 0 350 110" className="ss-insights-svg">
                    <g stroke="rgba(0,0,0,0.03)" strokeWidth="0.5">
                      <line x1="0" y1="20" x2="350" y2="20" />
                      <line x1="0" y1="50" x2="350" y2="50" />
                      <line x1="0" y1="80" x2="350" y2="80" />
                    </g>
                    <path d="M0,80 Q50,60 100,75 T200,40 T300,55 T350,25" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                    <path d="M0,80 Q50,60 100,75 T200,40 T300,55 T350,25 L350,110 L0,110 Z" fill="rgba(124, 58, 237, 0.08)" />
                    <circle cx="200" cy="40" r="3.5" fill="#7c3aed" />
                    <line x1="200" y1="40" x2="200" y2="110" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="3,3" />
                  </svg>
                  <div className="ss-prob-insights-tooltip">
                    <strong>May, 2026</strong>
                    <span>• Completed: 87%</span>
                    <span>• Syllabus Left: 13%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Inefficient Study Workflow */}
          <div className="ss-problem-card anim-fade-up anim-delay-1">
            <div className="ss-problem-icon"><Layers size={18} /></div>
            <h3>Inefficient Study Workflow</h3>
            <p>Moving topics through study phases, planning revision intervals, and practicing questions gets chaotic across multiple tools.</p>
            <div className="ss-problem-visual">
              <div className="ss-prob-recruitment-mock">
                <div className="ss-prob-kanban-cols">
                  <div className="ss-prob-kanban-col">
                    <span className="col-title">To Study</span>
                    <div className="ss-prob-kanban-card">
                      <strong>System Design</strong>
                      <span>Notion Links</span>
                      <div className="card-footer">
                        <span className="stars">⭐⭐⭐⭐</span>
                        <span className="date">3 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="ss-prob-kanban-col">
                    <span className="col-title">In Progress</span>
                    <div className="ss-prob-kanban-card">
                      <strong>OS Semaphores</strong>
                      <span>YouTube Video</span>
                      <div className="card-footer">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <span className="date">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="ss-prob-kanban-col">
                    <span className="col-title">Revision</span>
                    <div className="ss-prob-kanban-card">
                      <strong>DBMS Normalization</strong>
                      <span>Google Drive PDF</span>
                      <div className="card-footer">
                        <span className="stars">⭐⭐⭐⭐</span>
                        <span className="date">1 day ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="ss-prob-kanban-col">
                    <span className="col-title">Mastered</span>
                    <div className="ss-prob-kanban-card">
                      <strong>Array Slid. Window</strong>
                      <span>LeetCode Practice</span>
                      <div className="card-footer">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <span className="date">Today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============ EVERYTHING YOU NEED ============ */}
      <section className="ss-section ss-section-alt">
        <div className="ss-showcase-header anim-fade-up">
          <div className="ss-showcase-header-left">
            <h2 className="ss-h2">
              Everything you need to<br />
              <span className="ss-gradient-text">organize your study in one place</span>
            </h2>
            <p className="ss-showcase-sub">
              StudyStack brings all your study processes into a single intuitive platform — helping you save time, reduce complexity, and learn smarter.
            </p>
          </div>
          <div className="ss-showcase-arrows">
            <button 
              className="ss-showcase-arrow-btn" 
              onClick={() => {
                const prevIndex = (activeShowcase - 1 + 6) % 6;
                setActiveShowcase(prevIndex);
                document.getElementById(`feat-${prevIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
              aria-label="Previous feature"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              className="ss-showcase-arrow-btn" 
              onClick={() => {
                const nextIndex = (activeShowcase + 1) % 6;
                setActiveShowcase(nextIndex);
                document.getElementById(`feat-${nextIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
              aria-label="Next feature"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="ss-showcase-layout anim-fade-up">
          {/* LEFT — Sticky Mockup */}
          <div className="ss-showcase-mockup-wrap">
            <div className="ss-showcase-browser">
              <div className="ss-mockup-bar">
                <div className="ss-mockup-dots">
                  <span className="dot-r"></span>
                  <span className="dot-y"></span>
                  <span className="dot-g"></span>
                </div>
                <div className="ss-mockup-addr">studystack.app</div>
                <div style={{width: 60}}></div>
              </div>

              <div className="ss-showcase-dash">
                <aside className="ss-showcase-sidebar">
                  <div className="ss-dash-brand">
                    <div className="ss-logo-mini"><img src="/logo_symbol.png" alt="StudyStack" className="ss-logo-img-mini" /></div>
                    <span>StudyStack</span>
                  </div>
                  <div className="ss-dash-nav active"><Layout size={11} /> Dashboard</div>
                  <div className="ss-dash-nav"><BookOpen size={11} /> Materials</div>
                  <div className="ss-dash-nav"><Users size={11} /> Creators</div>
                  <div className="ss-dash-nav"><Tag size={11} /> Tags</div>
                  <div className="ss-dash-nav"><BarChart3 size={11} /> Analytics</div>
                  <div className="ss-dash-nav"><Database size={11} /> Subjects</div>
                  <div className="ss-dash-nav"><Shield size={11} /> Settings</div>
                </aside>

                <main className="ss-showcase-content">
                  <div className="ss-showcase-topbar">
                    <span className="ss-dash-page-title">Dashboard</span>
                    <div className="ss-dash-topbar-right">
                      <div className="ss-dash-search"><Search size={10} /> Quick Search...</div>
                      <div className="ss-dash-avatars">
                        <span style={{background:'#a78bfa'}}></span>
                        <span style={{background:'#f472b6'}}></span>
                        <span style={{background:'#34d399'}}></span>
                      </div>
                      <div className="ss-dash-invite-btn"><Plus size={9}/> Invite</div>
                      <div className="ss-dash-unlock-btn"><Zap size={9}/> Unlock Pro</div>
                    </div>
                  </div>

                  <div className="ss-showcase-welcome">
                    <h4>Hi, Welcome Back Rushang 👋</h4>
                    <div className="ss-dash-topbar-right">
                      <div className="ss-dash-date-badge">📅 Jan - Mar 2026</div>
                      <div className="ss-dash-export-btn"><TrendingUp size={9}/> Export Data</div>
                    </div>
                  </div>

                  <div className="ss-showcase-stats">
                    <div className="ss-showcase-stat">
                      <div className="ss-dash-stat-top">
                        <span className="ss-dash-stat-label">Total Resources ···</span>
                      </div>
                      <div className="ss-dash-stat-sub">Target: 200 Resources &nbsp; 34%</div>
                      <div className="ss-dash-stat-main">128</div>
                      <div className="ss-dash-stat-bar-wrap">
                        <div className="ss-dash-stat-bar-track">
                          <div className="ss-dash-stat-bar-fill purple" style={{width:'64%'}}></div>
                        </div>
                      </div>
                      <div className="ss-dash-stat-chips">
                        <span className="ss-chip green">48 <span>Drive</span></span>
                        <span className="ss-chip yellow">80 <span>Videos</span></span>
                      </div>
                    </div>

                    <div className="ss-showcase-stat">
                      <div className="ss-dash-stat-top">
                        <span className="ss-dash-stat-label">New This Week ···</span>
                      </div>
                      <div className="ss-dash-stat-sub">Target: 20 per week</div>
                      <div className="ss-dash-stat-main">12 <span className="ss-dash-up">↑+3</span></div>
                      <div className="ss-dash-stat-bar-wrap">
                        <div className="ss-dash-stat-bar-track">
                          <div className="ss-dash-stat-bar-fill blue" style={{width:'60%'}}></div>
                        </div>
                      </div>
                    </div>

                    <div className="ss-showcase-stat">
                      <div className="ss-dash-stat-top">
                        <span className="ss-dash-stat-label">Completion Rate ···</span>
                      </div>
                      <div className="ss-dash-stat-sub">Since Last Month</div>
                      <div className="ss-dash-stat-main">87% <span className="ss-dash-down">↓-11%</span></div>
                    </div>

                    <div className="ss-showcase-stat">
                      <div className="ss-dash-stat-top">
                        <span className="ss-dash-stat-label">Active Creators ···</span>
                      </div>
                      <div className="ss-dash-stat-sub">Since Last Month</div>
                      <div className="ss-dash-stat-main">23 <span className="ss-dash-up">↑+5</span></div>
                    </div>
                  </div>

                  <div className="ss-showcase-charts">
                    <div className="ss-showcase-chart">
                      <div className="ss-dash-chart-head">
                        <span>Resource Distribution</span>
                        <div className="ss-dash-chart-tabs">
                          <span className="active">Weekly</span>
                          <span>Monthly</span>
                        </div>
                      </div>
                      <div className="ss-dash-chart-area">
                        <div className="ss-chart-y-axis">
                          {['80%','60%','40%','20%','10%'].map(l=>(
                            <span key={l}>{l}</span>
                          ))}
                        </div>
                        <div className="ss-chart-bars-area">
                          <div className="ss-chart-grid-lines">
                            {[0,1,2,3,4].map(i=><div key={i} className="ss-grid-line"></div>)}
                          </div>
                          {[{h:60},{h:80},{h:45},{h:90,active:true},{h:55},{h:75},{h:65}].map((b,i)=>(
                            <div key={i} className="ss-chart-col">
                              <div className={`ss-chart-bar ${b.active?'active':''}`} 
                                style={{height:`${b.h}%`}}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ss-showcase-chart">
                      <div className="ss-dash-chart-head">
                        <span>Study Activity</span>
                        <div className="ss-dash-chart-tabs">
                          <span className="active">May, 2026</span>
                        </div>
                      </div>
                      <div className="ss-dash-line-area">
                        <svg viewBox="0 0 220 80" className="ss-line-svg">
                          <defs>
                            <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25"/>
                              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                            </linearGradient>
                          </defs>
                          <path d="M0,60 L30,50 L60,55 L90,30 L120,40 L150,20 L180,35 L220,15"
                            stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round"/>
                          <path d="M0,60 L30,50 L60,55 L90,30 L120,40 L150,20 L180,35 L220,15 L220,80 L0,80 Z"
                            fill="url(#lg2)"/>
                          <circle cx="150" cy="20" r="3" fill="#7c3aed"/>
                          <rect x="118" y="1" width="62" height="36" rx="4"
                            fill="white" stroke="#e5e7eb" strokeWidth="0.5"/>
                          <text x="128" y="12" fontSize="5" fill="#374151" fontWeight="600">May, 2026</text>
                          <text x="128" y="20" fontSize="4.5" fill="#6b7280">• 45% active</text>
                          <text x="128" y="27" fontSize="4.5" fill="#6b7280">• 18 hrs</text>
                          <text x="128" y="34" fontSize="4.5" fill="#6b7280">• 6 absent</text>
                        </svg>
                        <div className="ss-line-legend">
                          <span><i style={{background:'#7c3aed'}}></i> Active Sessions</span>
                          <span><i style={{background:'#a78bfa'}}></i> Resources Added</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>

          {/* RIGHT — Scrollable feature list */}
          <div className="ss-showcase-features" id="showcase-features">
            {[
              {
                icon: <Database size={18} />,
                title: 'Centralized Data',
                desc: 'All your resources, progress, and creators tracked in one organized dashboard.',
                id: 'feat-0'
              },
              {
                icon: <Zap size={18} />,
                title: 'Streamlined Workflows',
                desc: 'Automate tagging, organize by subject, and find anything instantly.',
                id: 'feat-1'
              },
              {
                icon: <BarChart3 size={18} />,
                title: 'Smart Analytics',
                desc: 'Visual progress tracking and completion rates across all subjects.',
                id: 'feat-2'
              },
              {
                icon: <Shield size={18} />,
                title: 'Security & Privacy',
                desc: 'Enterprise-grade auth keeps your personal vault completely private.',
                id: 'feat-3'
              },
              {
                icon: <Tag size={18} />,
                title: 'Smart Tagging',
                desc: 'Add custom tags and find any resource instantly using fuzzy search.',
                id: 'feat-4'
              },
              {
                icon: <Users size={18} />,
                title: 'Creator Tracking',
                desc: 'Group all materials by content creator for instant discovery.',
                id: 'feat-5'
              }
            ].map((feat, i) => (
              <div 
                key={feat.id} 
                className="anim-fade-up" 
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div
                  className={`ss-showcase-feat ${activeShowcase === i ? 'active' : ''}`}
                  data-feat-index={i}
                  id={feat.id}
                  onClick={() => setActiveShowcase(i)}
                >
                  <div className={`ss-showcase-feat-icon ${activeShowcase !== i ? 'inactive' : ''}`}>
                    {feat.icon}
                  </div>
                  <div className="ss-showcase-feat-text">
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES GRID ============ */}
      <section id="features" className="ss-section">
        <div className="ss-section-head anim-fade-up">
          <h2 className="ss-h2">Everything you need to<br />manage your study</h2>
          <p className="ss-h2-sub">From resource tracking to progress analytics, StudyStack brings it all into one seamless experience.</p>
        </div>
        <div className="ss-features-grid">
          <div className="ss-feature anim-fade-up">
            <div className="ss-feature-icon"><Layers size={20} /></div>
            <h4>Unified Vault</h4>
            <p>Save Drive links, YouTube videos, PDFs, and websites in one secure cloud database.</p>
          </div>
          <div className="ss-feature ss-feature-primary anim-fade-up anim-delay-1">
            <div className="ss-feature-icon"><Users size={20} /></div>
            <h4>Creator Tracking</h4>
            <p>Group resources by creators like Striver, Babbar, or Gate Smashers. Find them instantly.</p>
          </div>
          <div className="ss-feature anim-fade-up anim-delay-2">
            <div className="ss-feature-icon"><BarChart3 size={20} /></div>
            <h4>Analytics Dashboard</h4>
            <p>Visual insights into your study progress, completion rates, and content distribution.</p>
          </div>
          <div className="ss-feature anim-fade-up">
            <div className="ss-feature-icon"><Tag size={20} /></div>
            <h4>Smart Tagging</h4>
            <p>Custom tags and fuzzy search help you find any resource within seconds.</p>
          </div>
          <div className="ss-feature anim-fade-up anim-delay-1">
            <div className="ss-feature-icon"><UploadCloud size={20} /></div>
            <h4>File Uploads</h4>
            <p>Upload PDFs and DOCX files directly. Keep important documents safe in the cloud.</p>
          </div>
          <div className="ss-feature anim-fade-up anim-delay-2">
            <div className="ss-feature-icon"><Shield size={20} /></div>
            <h4>Secure & Private</h4>
            <p>Enterprise-grade auth via Clerk. Only you can access your personal vault.</p>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — STEPS ============ */}
      <section id="how-it-works" className="ss-section ss-section-alt">
        <div className="ss-section-head anim-fade-up">
          <h2 className="ss-h2">Get started in just<br />a few steps</h2>
          <p className="ss-h2-sub">
            From setup to insights, streamline your entire HR workflow with an intuitive process.
          </p>
        </div>

        <div className="ss-steps-wrapper">
          {/* Track SVG behind cards */}
          <svg className="ss-steps-track" viewBox="0 0 1100 700" fill="none" preserveAspectRatio="none">
            {/* The main solid track line */}
            <path 
              d="M 0,175 L 750,175 Q 1050,175 1050,350 Q 1050,525 750,525 L 0,525" 
              stroke="#7c3aed" 
              strokeWidth="6" 
              strokeLinecap="round" 
              fill="none"
            />
          </svg>

          {/* Endpoint icons on left */}
          <div className="ss-track-marker ss-track-marker-top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'white'}}>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
          </div>
          <div className="ss-track-marker ss-track-marker-bottom">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color: 'white'}}>
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
              <line x1="4" y1="22" x2="4" y2="15"/>
              <path d="M4 5h4v4H4z" fill="currentColor"/>
              <path d="M12 5h4v4h-4z" fill="currentColor"/>
              <path d="M8 9h4v4H8z" fill="currentColor"/>
            </svg>
          </div>

          <div className="ss-steps-2x2">

            {/* Step 1 (Sign Up Free) */}
            <div className="ss-step2 anim-fade-up">
              <div className="ss-step2-top">
                <div className="ss-step2-num">1</div>
                <h4>Sign Up Free</h4>
                <p>Create your account in seconds. No credit card required.</p>
              </div>
              <div className="ss-step2-visual">
                <div className="ss-step2-screen">
                  <div className="ss-hr-dash-mock">
                    <div className="ss-hr-dash-side">
                      <div className="ss-hr-dash-logo"></div>
                      <div className="ss-hr-dash-nav">
                        <div className="ss-hr-dash-nav-item active"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                      </div>
                    </div>
                    <div className="ss-hr-dash-main">
                      <div className="ss-hr-dash-head">
                        <span>Authentication</span>
                        <div className="ss-hr-dash-head-actions">
                          <div className="ss-hr-dash-avatar"></div>
                        </div>
                      </div>
                      <div className="ss-hr-dash-content" style={{ padding: '8px 12px', justifyContent: 'center' }}>
                        <div style={{ maxWidth: '160px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '0.55rem', fontWeight: '700', textAlign: 'center', color: 'inherit' }}>Create your account</span>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                            <span style={{ fontSize: '0.45rem', fontWeight: '600', color: '#64748b' }}>EMAIL ADDRESS</span>
                            <div className="ss-prob-table-search" style={{ height: '11px', background: 'white', border: '1px solid var(--ss-border)', borderRadius: '3px', fontSize: '0.45rem', padding: '0 3px', display: 'flex', alignItems: 'center', color: '#0f172a' }}>rushang@studystack.app</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                            <span style={{ fontSize: '0.45rem', fontWeight: '600', color: '#64748b' }}>PASSWORD</span>
                            <div className="ss-prob-table-search" style={{ height: '11px', background: 'white', border: '1px solid var(--ss-border)', borderRadius: '3px', fontSize: '0.45rem', padding: '0 3px', display: 'flex', alignItems: 'center', color: '#0f172a', letterSpacing: '1.5px' }}>••••••••</div>
                          </div>
                          <div style={{ height: '12px', background: '#7c3aed', color: 'white', borderRadius: '3px', fontSize: '0.48rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginTop: '2px' }}>Get Started Free</div>
                          <div style={{ fontSize: '0.42rem', color: '#64748b', textAlign: 'center', margin: '1px 0' }}>or continue with</div>
                          <div className="ss-prob-table-search" style={{ height: '11px', background: 'white', border: '1px solid var(--ss-border)', borderRadius: '3px', fontSize: '0.45rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', color: '#1e293b' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ea4335' }}></span> Google
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 (Add Resources) */}
            <div className="ss-step2 anim-fade-up anim-delay-1">
              <div className="ss-step2-top">
                <div className="ss-step2-num">2</div>
                <h4>Add Resources</h4>
                <p>Paste links, upload files, tag by subject and creator.</p>
              </div>
              <div className="ss-step2-visual">
                <div className="ss-step2-screen">
                  <div className="ss-hr-dash-mock">
                    <div className="ss-hr-dash-side">
                      <div className="ss-hr-dash-logo"></div>
                      <div className="ss-hr-dash-nav">
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item active"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                      </div>
                    </div>
                    <div className="ss-hr-dash-main">
                      <div className="ss-hr-dash-head">
                        <span>My Materials</span>
                        <div className="ss-hr-dash-head-actions">
                          <div className="ss-hr-dash-search"></div>
                          <div className="ss-hr-dash-avatar"></div>
                        </div>
                      </div>
                      <div className="ss-hr-dash-content">
                        <div className="ss-hr-stats-row">
                          <div className="ss-hr-stat-box">
                            <span className="ss-hr-stat-label">Total</span>
                            <div className="ss-hr-stat-val">128</div>
                          </div>
                          <div className="ss-hr-stat-box">
                            <span className="ss-hr-stat-label">Completed</span>
                            <div className="ss-hr-stat-val">111</div>
                          </div>
                          <div className="ss-hr-stat-box">
                            <span className="ss-hr-stat-label">In Progress</span>
                            <div className="ss-hr-stat-val">12</div>
                          </div>
                          <div className="ss-hr-stat-box">
                            <span className="ss-hr-stat-label">Pending</span>
                            <div className="ss-hr-stat-val">5</div>
                          </div>
                        </div>
                        <div className="ss-hr-table">
                          <div className="ss-hr-table-row header">
                            <span>Title</span>
                            <span>Type</span>
                            <span>Status</span>
                          </div>
                          <div className="ss-hr-table-row">
                            <div className="ss-hr-emp">
                              <div className="ss-hr-emp-av purple">N</div>
                              <span className="ss-hr-emp-name">Operating Systems Notes.pdf</span>
                            </div>
                            <span className="ss-hr-emp-dept">PDF</span>
                            <span className="ss-hr-status-tag active">Complete</span>
                          </div>
                          <div className="ss-hr-table-row">
                            <div className="ss-hr-emp">
                              <div className="ss-hr-emp-av blue">D</div>
                              <span className="ss-hr-emp-name">DSA Sheet - Striver</span>
                            </div>
                            <span className="ss-hr-emp-dept">Drive</span>
                            <span className="ss-hr-status-tag active" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>In Progress</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 (Ace Your Exams) - Bottom Left */}
            <div className="ss-step2 anim-fade-up">
              <div className="ss-step2-top">
                <div className="ss-step2-num">4</div>
                <h4>Ace Your Exams</h4>
                <p>Search instantly. Track progress. Never lose a resource.</p>
              </div>
              <div className="ss-step2-visual">
                <div className="ss-step2-screen">
                  <div className="ss-hr-dash-mock">
                    <div className="ss-hr-dash-side">
                      <div className="ss-hr-dash-logo"></div>
                      <div className="ss-hr-dash-nav">
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item active"></div>
                      </div>
                    </div>
                    <div className="ss-hr-dash-main">
                      <div className="ss-hr-dash-head">
                        <span>Study Progress</span>
                        <div className="ss-hr-dash-head-actions">
                          <div className="ss-hr-dash-search"></div>
                          <div className="ss-hr-dash-avatar"></div>
                        </div>
                      </div>
                      <div className="ss-hr-dash-content">
                        <div className="ss-hr-performance-main">
                          <div className="ss-hr-perf-chart">
                            <span className="ss-hr-chart-header">Study Hours</span>
                            <svg viewBox="0 0 100 45" style={{ width: '100%', height: '100%' }}>
                              <path d="M0,35 Q20,15 40,25 T80,10" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
                              <path d="M0,35 Q20,15 40,25 T80,10 L80,45 L0,45 Z" fill="rgba(124, 58, 237, 0.1)" />
                            </svg>
                          </div>
                          <div className="ss-hr-perf-leaderboard">
                            <span className="ss-hr-chart-header">Top Subjects</span>
                            <div className="ss-hr-perf-row">
                              <span className="name">Data Structures (DSA)</span>
                              <span className="score">95%</span>
                            </div>
                            <div className="ss-hr-perf-row">
                              <span className="name">Operating Systems (OS)</span>
                              <span className="score">92%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 (Organize & Tag) - Bottom Right */}
            <div className="ss-step2 anim-fade-up anim-delay-1">
              <div className="ss-step2-top">
                <div className="ss-step2-num">3</div>
                <h4>Organize & Tag</h4>
                <p>Categorize by subject. Add custom tags for instant filtering.</p>
              </div>
              <div className="ss-step2-visual">
                <div className="ss-step2-screen">
                  <div className="ss-hr-dash-mock">
                    <div className="ss-hr-dash-side">
                      <div className="ss-hr-dash-logo"></div>
                      <div className="ss-hr-dash-nav">
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                        <div className="ss-hr-dash-nav-item active"></div>
                        <div className="ss-hr-dash-nav-item"></div>
                      </div>
                    </div>
                    <div className="ss-hr-dash-main">
                      <div className="ss-hr-dash-head">
                        <span>Subject Kanban</span>
                        <div className="ss-hr-dash-head-actions">
                          <div className="ss-hr-dash-search"></div>
                          <div className="ss-hr-dash-avatar"></div>
                        </div>
                      </div>
                      <div className="ss-hr-dash-content">
                        <div className="ss-hr-kanban">
                          <div className="ss-hr-kanban-col">
                            <span className="ss-hr-kanban-title">DSA</span>
                            <div className="ss-hr-kanban-card">
                              <span className="ss-hr-kanban-name">LeetCode Premium</span>
                              <span className="ss-hr-kanban-role">Practice</span>
                            </div>
                          </div>
                          <div className="ss-hr-kanban-col">
                            <span className="ss-hr-kanban-title">OS</span>
                            <div className="ss-hr-kanban-card">
                              <span className="ss-hr-kanban-name">Galvin PDF Book</span>
                              <span className="ss-hr-kanban-role">Reading</span>
                            </div>
                          </div>
                          <div className="ss-hr-kanban-col">
                            <span className="ss-hr-kanban-title">DBMS</span>
                            <div className="ss-hr-kanban-card">
                              <span className="ss-hr-kanban-name">Sanchit Lectures</span>
                              <span className="ss-hr-kanban-role">Videos</span>
                            </div>
                          </div>
                          <div className="ss-hr-kanban-col">
                            <span className="ss-hr-kanban-title">Web Dev</span>
                            <div className="ss-hr-kanban-card">
                              <span className="ss-hr-kanban-name">React Sandbox</span>
                              <span className="ss-hr-kanban-role">Project</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="ss-section ss-section-alt" id="testimonials">
        <div className="ss-section-head anim-fade-up">
          <h2 className="ss-h2">Loved by students worldwide</h2>
          <p className="ss-h2-sub">See how StudyStack helps students from top colleges study smarter.</p>
        </div>
        <TestimonialCarousel />
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="ss-section">
        <div className="ss-section-head anim-fade-up">
          <h2 className="ss-h2">Simple, transparent pricing</h2>
          <p className="ss-h2-sub">Start for free and organize your studies with ease. Upgrade for advanced tracking.</p>
          <div className="ss-billing-toggle-new">
            <span className={`ss-billing-label ${billingCycle === 'monthly' ? 'active' : ''}`}>Monthly / Yearly</span>
            <button 
              className={`ss-billing-switch ${billingCycle === 'yearly' ? 'active' : ''}`} 
              onClick={() => setBillingCycle(billingCycle === 'yearly' ? 'monthly' : 'yearly')}
              aria-label="Toggle billing cycle"
            >
              <span className="ss-billing-handle"></span>
            </button>
            <span className={`ss-billing-label ${billingCycle === 'yearly' ? 'active' : ''}`}>
              Yearly <span className="ss-billing-save">(Save 20%)</span>
            </span>
          </div>
        </div>
        <div className="ss-pricing-grid">
          <div className="ss-price-card anim-fade-up">
            <div className="ss-price-amount">
              <span className="ss-price-currency">$</span>
              <span className="ss-price-num">0</span>
              <span className="ss-price-period">/ month</span>
            </div>
            <div className="ss-price-name">Starter Plan</div>
            <p className="ss-price-desc">individual student</p>
            <div className="ss-features-title">Included features:</div>
            <ul className="ss-price-features">
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Up to 20 resources
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Basic resource tagging
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Study schedule planner
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Community support
              </li>
            </ul>
            <button className="ss-btn-solid-lavender" onClick={handleCTA}>Get Started</button>
            <div className="ss-price-footer">
              <span className="ss-price-footer-cross">✖</span> No hidden charge included
            </div>
          </div>

          <div className="ss-price-card ss-price-featured anim-fade-up anim-delay-1">
            <div className="ss-price-badge-right">Most Popular</div>
            <div className="ss-price-amount">
              <span className="ss-price-currency">$</span>
              <span className="ss-price-num">{billingCycle === 'yearly' ? '29' : '35'}</span>
              <span className="ss-price-period">/ month</span>
            </div>
            <div className="ss-price-name">Pro Plan</div>
            <p className="ss-price-desc">dedicated learner</p>
            <div className="ss-features-title">Included features:</div>
            <ul className="ss-price-features">
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Up to 500 resources
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Syllabus Kanban board
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Study session analytics
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Priority support
              </li>
            </ul>
            <button className="ss-btn-white-full" onClick={handleCTA}>Start Free Trial</button>
            <div className="ss-price-footer">
              <span className="ss-price-footer-cross">✖</span> No hidden charge included
            </div>
          </div>

          <div className="ss-price-card anim-fade-up anim-delay-2">
            <div className="ss-price-amount">
              <span className="ss-price-custom-pricing">Custom Pricing</span>
            </div>
            <div className="ss-price-name">Enterprise</div>
            <p className="ss-price-desc">study groups / schools</p>
            <div className="ss-features-title">Included features:</div>
            <ul className="ss-price-features">
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Unlimited resources
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Advanced progress insights
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Custom cloud sync & API
              </li>
              <li>
                <div className="ss-check-circle"><Check size={10} strokeWidth={3} /></div>
                Dedicated 1-on-1 support
              </li>
            </ul>
            <button className="ss-btn-solid-lavender" onClick={handleCTA}>Contact Sales</button>
            <div className="ss-price-footer">
              <span className="ss-price-footer-cross">✖</span> No hidden charge included
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="ss-section">
        <div className="ss-faq-layout">
          <div className="ss-faq-left anim-fade-up">
            <h2 className="ss-h2 ss-text-left">Frequently asked questions</h2>
            <p className="ss-h2-sub ss-text-left">Find answers to common questions about StudyStack and how it works.</p>
            <button className="ss-btn-primary-lg" onClick={handleCTA}>Still have questions?</button>
          </div>
          <div className="ss-faq-right">
            {faqs.map((faq, i) => (
              <div key={i} className="anim-fade-up">
                <div 
                  className={`ss-faq-item ${openFaq === i ? 'open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <div className="ss-faq-q">
                    <span className="ss-faq-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ss-faq-text">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {openFaq === i && <div className="ss-faq-a">{faq.a}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="ss-cta-section">
        <div className="ss-cta-card anim-fade-up">
          {/* Subtle light background glow orbs */}
          <div className="ss-cta-glow-orb ss-cta-glow-1"></div>
          <div className="ss-cta-glow-orb ss-cta-glow-2"></div>
          
          {/* Floating mockup 1 (Study Progress) */}
          <div className="ss-cta-mockup ss-cta-mockup-goals">
            <div className="ss-mock-card-header">
              <span className="ss-mock-card-title">Study Progress</span>
              <div className="ss-mock-dots"><span></span><span></span><span></span></div>
            </div>
            <div className="ss-mock-card-body">
              <div className="ss-mock-progress-row">
                <div className="ss-mock-row-label">Completed</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill purple" style={{ width: '70%' }}></div>
                </div>
                <div className="ss-mock-row-val">70%</div>
              </div>
              <div className="ss-mock-progress-row">
                <div className="ss-mock-row-label">Scheduled</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill blue" style={{ width: '20%' }}></div>
                </div>
                <div className="ss-mock-row-val">20%</div>
              </div>
              <div className="ss-mock-progress-row">
                <div className="ss-mock-row-label">Backlog</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill orange" style={{ width: '10%' }}></div>
                </div>
                <div className="ss-mock-row-val">10%</div>
              </div>
            </div>
          </div>

          {/* Floating mockup 2 (Resource Tracker) */}
          <div className="ss-cta-mockup ss-cta-mockup-pipeline">
            <div className="ss-mock-card-header">
              <div>
                <span className="ss-mock-card-title">Resource Tracker</span>
                <div className="ss-mock-card-subtitle">68 Saved Items</div>
              </div>
              <div className="ss-mock-dots"><span></span><span></span><span></span></div>
            </div>
            <div className="ss-mock-card-body">
              <div className="ss-mock-pipeline-row">
                <div className="ss-mock-row-label">Notes</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill purple" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="ss-mock-pipeline-row">
                <div className="ss-mock-row-label">Videos</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill blue" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="ss-mock-pipeline-row">
                <div className="ss-mock-row-label">Sheets</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill cyan" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="ss-mock-pipeline-row">
                <div className="ss-mock-row-label">Exams</div>
                <div className="ss-mock-bar-container">
                  <div className="ss-mock-bar-fill green" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mockup 3 (Top Contributors) */}
          <div className="ss-cta-mockup ss-cta-mockup-performers">
            <div className="ss-mock-card-header">
              <span className="ss-mock-card-title">Top Contributors</span>
              <div className="ss-mock-dots"><span></span><span></span><span></span></div>
            </div>
            <div className="ss-mock-card-body">
              <div className="ss-mock-user-row">
                <div className="ss-mock-user-avatar purple">SL</div>
                <div className="ss-mock-user-details">
                  <div className="ss-mock-user-name">Sarah Lee</div>
                  <div className="ss-mock-user-tag green">15 Shared</div>
                </div>
                <div className="ss-mock-user-rating">★ 4.9</div>
              </div>
              <div className="ss-mock-user-row">
                <div className="ss-mock-user-avatar pink">AC</div>
                <div className="ss-mock-user-details">
                  <div className="ss-mock-user-name">Alex Carter</div>
                  <div className="ss-mock-user-tag green">12 Shared</div>
                </div>
                <div className="ss-mock-user-rating">★ 4.8</div>
              </div>
              <div className="ss-mock-user-row">
                <div className="ss-mock-user-avatar green">DK</div>
                <div className="ss-mock-user-details">
                  <div className="ss-mock-user-name">David Kim</div>
                  <div className="ss-mock-user-tag orange">8 Shared</div>
                </div>
                <div className="ss-mock-user-rating">★ 4.7</div>
              </div>
              <div className="ss-mock-user-row">
                <div className="ss-mock-user-avatar orange">EW</div>
                <div className="ss-mock-user-details">
                  <div className="ss-mock-user-name">Emily Watson</div>
                  <div className="ss-mock-user-tag green">10 Shared</div>
                </div>
                <div className="ss-mock-user-rating">★ 4.8</div>
              </div>
            </div>
          </div>

          {/* CTA Content */}
          <div className="ss-cta-content">
            <h2>Start organizing your<br />study life today</h2>
            <p>Join thousands of students who've ditched messy bookmarks for a clean, searchable vault.</p>
            
            <div className="ss-cta-label-top">Try for Free</div>
            
            <div className="ss-cta-actions">
              <button className="ss-btn-cta-purple" onClick={handleCTA}>Get Started</button>
              <button className="ss-btn-cta-outline" onClick={handleCTA}>Book a Demo</button>
            </div>
            <p className="ss-cta-trust">Trusted by 10,000+ students • No credit card required</p>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="ss-footer">
        <div className="ss-footer-header">
          <div className="ss-footer-brand-col ss-footer-brand-side">
            <div className="ss-nav-brand">
              <div className="ss-logo"><img src="/logo_symbol.png" alt="StudyStack" className="ss-logo-img" /></div>
              <span className="ss-logo-text">StudyStack</span>
            </div>
            <p className="ss-footer-desc">An all-in-one study platform to organize files, track resources, and boost learning with ease.</p>
          </div>
          <div className="ss-footer-subscribe-side">
            <h4>Subscribe To Our Newsletter</h4>
            <p>Get The Latest Product Updates, Sales Insights, And Growth Tips Delivered To Your Inbox.</p>
            <form className="ss-footer-sub-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter Your Email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="ss-footer-links-grid">
          <div className="ss-footer-col">
            <h5>Product</h5>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#">Integrations</a>
            <a href="#">Update</a>
          </div>
          <div className="ss-footer-col">
            <h5>Company</h5>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
            <a href="#">Blog</a>
          </div>
          <div className="ss-footer-col">
            <h5>Resources</h5>
            <a href="#">Documentation</a>
            <a href="#">Help Center</a>
            <a href="#">Guides</a>
            <a href="#">API</a>
          </div>
          <div className="ss-footer-col">
            <h5>Legal</h5>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
          </div>
        </div>

        <div className="ss-footer-divider"></div>

        <div className="ss-footer-bottom">
          <div className="ss-footer-social-icons">
            <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
          </div>
          <div className="ss-footer-bottom-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
          <p className="ss-footer-copyright">© 2028 StudyStack. All rights reserved.</p>
        </div>
        <div className="ss-footer-bigtext">StudyStack</div>
      </footer>
    </div>
  );
}