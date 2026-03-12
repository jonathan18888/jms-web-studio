import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const useCountUp = (target, inView, duration = 1800) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};

const BLUE = "#2563ff";
const BLUE_GLOW = "rgba(37,99,255,0.25)";
const BLUE_DIM = "rgba(37,99,255,0.08)";

const projects = [
  {
    name: "Peak Plumbing Co",
    niche: "Plumbing",
    location: "Austin, TX",
    accent: "#e85d04",
    icon: "🔧",
    tagline: "Austin's Most Trusted Plumber",
    initials: "PP"
  },
  {
    name: "Ember Kitchen",
    niche: "Restaurant",
    location: "Austin, TX",
    accent: "#d4820a",
    icon: "🔥",
    tagline: "Where Every Meal Tells a Story",
    initials: "EK"
  },
  {
    name: "Apex Fitness",
    niche: "Gym",
    location: "Austin, TX",
    accent: "#e01b1b",
    icon: "⚡",
    tagline: "No Excuses. Just Results.",
    initials: "AF"
  },
  {
    name: "Sharp Cuts",
    niche: "Barbershop",
    location: "Austin, TX",
    accent: "#c9a84c",
    icon: "✂️",
    tagline: "Look Sharp. Feel Sharp.",
    initials: "SC"
  },
  {
    name: "GreenScape",
    niche: "Landscaping",
    location: "Austin, TX",
    accent: "#4caf50",
    icon: "🌿",
    tagline: "Austin's Most Trusted Landscaping",
    initials: "GS"
  },
  {
    name: "New Hard Wood Flooring",
    niche: "Flooring",
    location: "Vail Valley, CO",
    accent: "#8b6914",
    icon: "🏠",
    tagline: "Craftsmanship You Can Walk On",
    initials: "NHF",
    real: true
  },
];

const services = [
  {
    icon: "◻",
    title: "Website Design",
    desc: "Fast, clean, mobile-friendly websites that make your business look professional and get customers calling.",
    price: "$500 – $1,500",
    feature: "Delivered in 7 days"
  },
  {
    icon: "◎",
    title: "Google Business Profile",
    desc: "We set up and optimize your Google Business Profile so customers in your area find you instantly.",
    price: "$150 – $300",
    feature: "More local visibility"
  },
  {
    icon: "↻",
    title: "Monthly Maintenance",
    desc: "We keep your site fast, secure, and up to date every month so you never have to think about it.",
    price: "$75 – $100/mo",
    feature: "Peace of mind"
  },
];

const faqs = [
  ["How much does a website cost?", "Our websites start at $500 and go up to $1,500 depending on size and features. You get a clear upfront quote before any work begins — no surprises."],
  ["How long does it take?", "Most websites are designed, built, and live within 7 days of our first consultation."],
  ["Do I own my website?", "Yes — completely. Once the project is paid you own everything including the domain and all content."],
  ["Do you offer ongoing support?", "Yes. Monthly maintenance plans start at $75/month covering updates, security, and hosting."],
  ["What if I don't have a domain?", "No problem. We help you purchase and set up your domain as part of the project process."],
  ["What areas do you serve?", "We're based in Gypsum, Colorado and serve the Vail Valley, Western Slope, and businesses remotely across the entire US."],
];

const niches = ["Plumbers", "Restaurants", "Gyms", "Barbershops", "Landscapers", "Contractors", "Dentists", "Salons", "Flooring", "Auto Shops"];

const LogoCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        background: "#0d0d0d",
        border: `1px solid ${hovered ? project.accent : "#1e1e1e"}`,
        boxShadow: hovered ? `0 20px 50px ${project.accent}33` : "0 2px 12px rgba(0,0,0,0.3)",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        cursor: "pointer",
        position: "relative"
      }}
    >
      {/* Logo area */}
      <div style={{
        height: "180px",
        background: `linear-gradient(135deg, #111 0%, ${project.accent}22 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Glow orb */}
        <div style={{
          position: "absolute",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${project.accent}33 0%, transparent 70%)`,
          transition: "opacity 0.3s",
          opacity: hovered ? 1 : 0.5
        }} />
        {/* Logo circle */}
        <div style={{
          width: "72px",
          height: "72px",
          borderRadius: "16px",
          background: project.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
          boxShadow: `0 8px 24px ${project.accent}55`,
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.3s ease",
          zIndex: 1
        }}>
          <span style={{ fontSize: "28px" }}>{project.icon}</span>
        </div>
        <span style={{
          fontSize: "13px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#555",
          letterSpacing: "1px",
          zIndex: 1,
          fontStyle: "italic"
        }}>"{project.tagline}"</span>

        {/* Hover overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}>
          <span style={{
            color: "#fff",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "1px",
            border: `1px solid ${project.accent}`,
            padding: "8px 20px",
            borderRadius: "100px"
          }}>View Project →</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 800,
            fontSize: "16px",
            color: "#fff"
          }}>{project.name}</span>
          {project.real && (
            <span style={{
              fontSize: "9px",
              background: BLUE,
              color: "#fff",
              padding: "3px 8px",
              borderRadius: "100px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.5px"
            }}>REAL CLIENT</span>
          )}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{
            fontSize: "11px",
            background: `${project.accent}22`,
            color: project.accent,
            padding: "3px 10px",
            borderRadius: "100px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600
          }}>{project.niche}</span>
          <span style={{ fontSize: "12px", color: "#555", fontFamily: "'DM Sans', sans-serif" }}>{project.location}</span>
        </div>
      </div>
    </div>
  );
};

export default function JMSWebStudio() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [statsRef, statsInView] = useInView(0.3);
  const stat1 = useCountUp(6, statsInView);
  const stat2 = useCountUp(7, statsInView);
  const stat3 = useCountUp(100, statsInView);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 100); }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#080808", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .marquee-track { display: flex; gap: 48px; animation: marquee 25s linear infinite; white-space: nowrap; }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #2563ff !important; }
        .cta-btn { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; border: none; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,255,0.45) !important; }
        .outline-btn { transition: background 0.2s, color 0.2s; cursor: pointer; }
        .outline-btn:hover { background: #fff !important; color: #080808 !important; }
        .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(37,99,255,0.2) !important; border-color: #2563ff !important; }
        .service-card:hover .svc-icon { transform: scale(1.15) rotate(-5deg); }
        .svc-icon { transition: transform 0.3s ease; display: inline-block; }
        .faq-row { cursor: pointer; transition: background 0.2s; border-bottom: 1px solid #1a1a1a; }
        .faq-row:hover { background: #0f0f0f; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #2563ff; border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes gridFade { from{opacity:0} to{opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>

      {/* Top Bar */}
      <div style={{ background: BLUE, padding: "9px 24px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: "12px", fontWeight: 500, letterSpacing: "0.5px" }}>
          ✦ Now accepting new clients for April 2026 · Free consultation included ✦
        </p>
      </div>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(8,8,8,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #1a1a1a",
        padding: "0 48px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: "64px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "14px" }}>J</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "16px", color: "#fff", letterSpacing: "-0.3px" }}>JMS <span style={{ color: BLUE }}>Web Studio</span></span>
        </div>
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {["work", "services", "about", "contact"].map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l)} style={{ fontSize: "14px", color: "#666", fontWeight: 500, textTransform: "capitalize" }}>{l}</span>
          ))}
          <button className="cta-btn" onClick={() => scrollTo("contact")} style={{
            background: BLUE, color: "#fff",
            padding: "10px 22px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 700
          }}>Get a Free Quote</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px 60px", position: "relative", overflow: "hidden" }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `linear-gradient(rgba(37,99,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)"
        }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: "10%", left: "55%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${BLUE_GLOW} 0%, transparent 65%)`, pointerEvents: "none", animation: "float 6s ease-in-out infinite" }} />

        <div style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(16px)", transition: "all 0.7s ease 0.1s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: BLUE_DIM, border: `1px solid ${BLUE}44`, borderRadius: "100px", padding: "7px 18px", marginBottom: "36px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: BLUE, display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "13px", color: BLUE, fontWeight: 600 }}>Available for new projects · Gypsum, CO</span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(50px)", transition: "all 0.9s ease 0.3s" }}>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(56px, 8.5vw, 110px)", lineHeight: 1.0, letterSpacing: "-3px", color: "#fff", marginBottom: "32px" }}>
              We Build<br />
              <span style={{ color: BLUE, fontStyle: "italic" }}>Websites</span><br />
              That Win.
            </h1>
          </div>

          {/* Sub */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s ease 0.5s" }}>
            <p style={{ fontSize: "19px", color: "#777", lineHeight: 1.75, maxWidth: "500px", marginBottom: "44px", fontWeight: 400 }}>
              Web design for local Colorado businesses. Fast, modern, and built to convert visitors into paying customers.
            </p>
          </div>

          {/* Buttons */}
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s ease 0.65s", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button className="cta-btn" onClick={() => scrollTo("work")} style={{ background: BLUE, color: "#fff", padding: "17px 40px", borderRadius: "8px", fontSize: "16px", fontWeight: 700 }}>
              See Our Work →
            </button>
            <button className="outline-btn" onClick={() => scrollTo("contact")} style={{ background: "transparent", color: "#fff", border: "2px solid #333", padding: "15px 40px", borderRadius: "8px", fontSize: "16px", fontWeight: 700 }}>
              Get a Free Quote
            </button>
          </div>

          {/* Trust */}
          <div style={{ opacity: heroVisible ? 1 : 0, transition: "opacity 0.9s ease 0.85s", display: "flex", gap: "32px", marginTop: "60px", flexWrap: "wrap" }}>
            {["✓ Free Consultation", "✓ Delivered in 7 Days", "✓ No Cookie-Cutter Templates"].map(t => (
              <span key={t} style={{ fontSize: "14px", color: "#444", fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "16px 0", overflow: "hidden", display: "flex" }}>
        <div className="marquee-track">
          {[...niches, ...niches, ...niches, ...niches].map((n, i) => (
            <span key={i} style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: i % 2 === 0 ? BLUE : "#333" }}>{n}</span>
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <section id="work" style={{ padding: "110px 48px", background: "#080808" }}>
        <FadeIn>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "16px" }}>Portfolio</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-2px", color: "#fff", marginBottom: "16px" }}>Our Work</h2>
          <p style={{ fontSize: "17px", color: "#555", marginBottom: "64px", maxWidth: "460px", lineHeight: 1.7 }}>Real websites built for real local businesses across Colorado and beyond.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {projects.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.07}>
              <LogoCard project={p} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "110px 48px", background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
        <FadeIn>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "16px" }}>What We Offer</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-2px", color: "#fff", marginBottom: "64px" }}>Services</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="service-card" style={{ background: "#0d0d0d", borderRadius: "16px", padding: "44px 36px", border: "1px solid #1e1e1e", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${BLUE}, #60a5fa)` }} />
                <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "120px", height: "120px", borderRadius: "50%", background: BLUE_DIM }} />
                <div className="svc-icon" style={{ width: "54px", height: "54px", borderRadius: "14px", background: BLUE_DIM, border: `1px solid ${BLUE}33`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>
                  <span style={{ fontSize: "22px", color: BLUE }}>{s.icon}</span>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{s.title}</h3>
                <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.75, marginBottom: "32px" }}>{s.desc}</p>
                <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: 800, color: BLUE }}>{s.price}</span>
                  <span style={{ fontSize: "12px", color: "#444", fontWeight: 600 }}>{s.feature}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "110px 48px", background: "#080808", borderTop: "1px solid #1a1a1a" }}>
        <FadeIn>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "16px" }}>Process</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-2px", color: "#fff", marginBottom: "72px" }}>How It Works</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", position: "relative" }}>
          <div style={{ position: "absolute", top: "27px", left: "calc(16.66% + 16px)", right: "calc(16.66% + 16px)", height: "1px", background: `linear-gradient(90deg, ${BLUE}, #60a5fa, ${BLUE})` }} />
          {[
            { n: "01", title: "Free Consultation", desc: "We talk through your goals and what you need. No pressure, no commitment whatsoever." },
            { n: "02", title: "We Build Your Site", desc: "We design and build your complete website in 7 days. You approve everything before launch." },
            { n: "03", title: "You Go Live", desc: "Your site goes live, customers find you, and you start getting more calls and bookings." },
          ].map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.15}>
              <div style={{ textAlign: "center", padding: "0 48px", position: "relative", zIndex: 1 }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: `0 0 32px ${BLUE_GLOW}` }}>
                  <span style={{ color: "#fff", fontFamily: "'DM Serif Display', serif", fontSize: "16px" }}>{step.n}</span>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "14px" }}>{step.title}</h3>
                <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{ textAlign: "center", marginTop: "64px" }}>
            <button className="cta-btn" onClick={() => scrollTo("contact")} style={{ background: BLUE, color: "#fff", padding: "16px 44px", borderRadius: "8px", fontSize: "16px", fontWeight: 700 }}>
              Start Your Project →
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Stats */}
      <div ref={statsRef} style={{ background: `linear-gradient(135deg, #0d0d0d, #080808)`, borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", padding: "80px 48px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {[
          { value: stat1, suffix: "+", label: "Sites Built" },
          { value: stat2, suffix: " Days", label: "Average Delivery" },
          { value: stat3, suffix: "%", label: "Satisfaction Rate" },
        ].map((s, i) => (
          <div key={s.label} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid #1a1a1a" : "none", padding: "20px" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(52px, 7vw, 80px)", color: BLUE, letterSpacing: "-3px", lineHeight: 1, textShadow: `0 0 40px ${BLUE_GLOW}` }}>
              {s.value}{s.suffix}
            </div>
            <p style={{ fontSize: "13px", color: "#444", marginTop: "14px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* About */}
      <section id="about" style={{ padding: "110px 48px", background: "#080808" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ background: "#0d0d0d", borderRadius: "20px", height: "440px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #1e1e1e", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 50%, ${BLUE_DIM} 0%, transparent 70%)` }} />
              <div style={{ textAlign: "center", zIndex: 1 }}>
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: BLUE, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 50px ${BLUE_GLOW}` }}>
                  <span style={{ color: "#fff", fontFamily: "'DM Serif Display', serif", fontSize: "44px" }}>J</span>
                </div>
                <p style={{ color: "#444", fontSize: "14px", fontWeight: 500 }}>Add your photo here</p>
              </div>
              <div style={{ position: "absolute", bottom: "20px", right: "20px", background: BLUE, borderRadius: "10px", padding: "12px 20px" }}>
                <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700 }}>📍 Gypsum, Colorado</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "16px" }}>About</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(34px, 4vw, 54px)", letterSpacing: "-1.5px", color: "#fff", marginBottom: "28px" }}>JMS Web Studio</h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.85, marginBottom: "20px" }}>
              JMS Web Studio is a Colorado-based web design agency helping local businesses build a professional online presence. We specialize in fast, affordable websites for the businesses that keep our community running.
            </p>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.85, marginBottom: "44px" }}>
              No corporate pricing, no confusing contracts — just clean, modern websites delivered fast with a personal touch. Based in Gypsum, serving the Vail Valley and beyond.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {[["6+", "Sites Built"], ["7 Days", "Avg Delivery"], ["Gypsum, CO", "Based Here"], ["100%", "Satisfaction"]].map(([v, l]) => (
                <div key={l} style={{ background: "#0d0d0d", borderRadius: "12px", padding: "20px", border: "1px solid #1e1e1e" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: BLUE }}>{v}</div>
                  <div style={{ fontSize: "13px", color: "#444", marginTop: "4px", fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ padding: "110px 48px", background: "#0a0a0a", borderTop: "1px solid #1a1a1a" }}>
        <FadeIn>
          <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "52px" }}>What Clients Say</p>
            <div style={{ background: "#0d0d0d", borderRadius: "20px", padding: "56px 64px", border: "1px solid #1e1e1e", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${BLUE}, transparent)` }} />
              <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: BLUE_DIM }} />
              <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "32px" }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: BLUE, fontSize: "20px" }}>★</span>)}
              </div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#ccc", lineHeight: 1.75, fontStyle: "italic", marginBottom: "36px", position: "relative", zIndex: 1 }}>
                "JMS Web Studio completely transformed our online presence. Our new site looks incredibly professional and we've already seen more customers finding us online. Highly recommend to any local business owner."
              </p>
              <div>
                <p style={{ fontWeight: 800, color: "#fff", fontSize: "17px" }}>Melvin S.</p>
                <p style={{ color: "#555", fontSize: "14px", marginTop: "6px" }}>New Hard Wood Flooring · Vail Valley, Colorado · <span style={{ color: BLUE }}>Real Client</span></p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section style={{ padding: "110px 48px", background: "#080808", borderTop: "1px solid #1a1a1a" }}>
        <FadeIn>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "16px" }}>FAQ</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(38px, 5vw, 64px)", letterSpacing: "-2px", color: "#fff", marginBottom: "60px" }}>Common Questions</h2>
        </FadeIn>
        <div style={{ maxWidth: "740px" }}>
          {faqs.map(([q, a], i) => (
            <FadeIn key={q} delay={i * 0.06}>
              <div className="faq-row" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: "26px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "17px", fontWeight: 700, color: "#fff" }}>{q}</span>
                  <span style={{ color: BLUE, fontSize: "24px", fontWeight: 300, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)", display: "inline-block", marginLeft: "16px", flexShrink: 0 }}>+</span>
                </div>
                <div style={{ overflow: "hidden", maxHeight: openFaq === i ? "200px" : "0", transition: "max-height 0.4s ease", marginTop: openFaq === i ? "16px" : "0" }}>
                  <p style={{ fontSize: "15px", color: "#666", lineHeight: 1.8 }}>{a}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" style={{ padding: "130px 48px", background: "#080808", borderTop: "1px solid #1a1a1a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", borderRadius: "50%", background: `radial-gradient(circle, ${BLUE_GLOW} 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(37,99,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,255,0.04) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <FadeIn>
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: BLUE, marginBottom: "24px" }}>Let's Work Together</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(44px, 7vw, 88px)", letterSpacing: "-3px", color: "#fff", marginBottom: "24px", lineHeight: 1.0 }}>
              Ready To Get a<br />
              Website <span style={{ color: BLUE, fontStyle: "italic" }}>That Works?</span>
            </h2>
            <p style={{ fontSize: "18px", color: "#555", marginBottom: "52px", fontWeight: 400 }}>Free consultation. Delivered in 7 days. No contracts.</p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
              <a href="mailto:jonathan@jmswebstudios.com" style={{ textDecoration: "none" }}>
                <button className="cta-btn" style={{ background: BLUE, color: "#fff", padding: "18px 48px", borderRadius: "8px", fontSize: "17px", fontWeight: 700 }}>
                  Get Your Free Quote →
                </button>
              </a>
              <a href="tel:+19703760216" style={{ textDecoration: "none" }}>
                <button className="outline-btn" style={{ background: "transparent", color: "#fff", border: "2px solid #333", padding: "16px 48px", borderRadius: "8px", fontSize: "17px", fontWeight: 700 }}>
                  Call (970) 376-0216
                </button>
              </a>
            </div>
            <p style={{ color: "#333", fontSize: "14px" }}>jonathan@jmswebstudios.com · (970) 376-0216 · Gypsum, Colorado</p>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer style={{ background: "#050505", borderTop: "1px solid #1a1a1a", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "12px" }}>J</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: "15px", color: "#fff" }}>JMS <span style={{ color: BLUE }}>Web Studio</span></span>
        </div>
        <p style={{ color: "#333", fontSize: "13px" }}>© 2026 JMS Web Studio · Gypsum, Colorado</p>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Work", "Services", "About", "Contact"].map(l => (
            <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())} style={{ fontSize: "13px", color: "#444", cursor: "pointer", fontWeight: 500 }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
