import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */

const BRAND_CARDS = [
  {
    name: "Khatri Bandhu Ice Cream",
    category: "D2C · Meta Ads · Social Media",
    result: "3.2× ROAS",
    detail: "Went from zero paid ads to ₹8L/month revenue in under 90 days. Full Meta funnel + UGC content engine.",
    year: "2024", emoji: "🍦",
  },
  {
    name: "Maa Kesar Saffron",
    category: "Shopify · SEO · Influencer",
    result: "₹4L+ monthly",
    detail: "Rebuilt the Shopify store, drove organic SEO traffic, and activated a micro-influencer network across Instagram.",
    year: "2024", emoji: "🌸",
  },
  {
    name: "Roommate Products",
    category: "Web Dev · Performance",
    result: "Audit 58→91",
    detail: "Full Shopify rebuild, Shopify Markets setup, and social creatives driving a 40% improvement in conversion rate.",
    year: "2025", emoji: "🛏️",
  },
  {
    name: "Sarada Landmark",
    category: "Real Estate · Branding · Web",
    result: "₹2Cr+ bookings",
    detail: "Dark-gold luxury brand identity, React.js website, and a pitch deck that closed ₹2Cr+ in bookings.",
    year: "2025", emoji: "🏛️",
  },
  {
    name: "PCSPL Kiosks",
    category: "LinkedIn · B2B · Lead Gen",
    result: "14 MNC meetings",
    detail: "Activated a LinkedIn outreach machine targeting Fortune 500 procurement heads in 60 days.",
    year: "2025", emoji: "🖥️",
  },
];

const TIMELINE = [
  { phase: "₹0 → ₹1L", label: "Month 1–2: Foundation", icon: "◎",
    steps: ["Brand identity & positioning locked", "Website / Shopify store live", "First 3 content pieces published", "Google My Business + SEO foundation"] },
  { phase: "₹1L → ₹10L", label: "Month 3–5: Ignition", icon: "◈",
    steps: ["Meta Ads first campaign (₹500/day)", "UGC creator seeding (5–10 creators)", "Instagram & YouTube reels engine", "Email / WhatsApp retention loop"] },
  { phase: "₹10L → ₹50L", label: "Month 6–9: Scale", icon: "◆",
    steps: ["Performance creative testing (50+ ads)", "Influencer mid-tier collaborations", "Google Shopping + SEO traffic", "D2C retention: loyalty & referral"] },
  { phase: "₹50L → ₹1Cr", label: "Month 10–14: Authority", icon: "⬡",
    steps: ["PR & earned media placements", "Category SEO dominance", "Cross-platform omnipresence", "B2B / wholesale channel activation"] },
  { phase: "₹1Cr → ₹10Cr+", label: "Month 15–24: Domination", icon: "★",
    steps: ["National TV / OTT media buy", "Celebrity / macro-influencer anchors", "Mobile app + subscription product", "Series A fundraise narrative ready"] },
];

const SERVICES_LIST = [
  { n: "01", title: "Video Production", sub: "Cinematic reels, brand films, product shoots" },
  { n: "02", title: "UGC & Influencer", sub: "100K+ IG community. Seed, scale, convert" },
  { n: "03", title: "D2C Marketing", sub: "Full-funnel Meta, Google, WhatsApp growth" },
  { n: "04", title: "Lead Generation", sub: "LinkedIn B2B pipelines & expert positioning" },
  { n: "05", title: "Social Media", sub: "IG · FB · YT · LinkedIn owned & operated" },
  { n: "06", title: "SEO & Google", sub: "Rank #1. Own your category organically" },
  { n: "07", title: "Shopify & E-commerce", sub: "Stores that convert. Migrations that stick" },
  { n: "08", title: "App & Web Dev", sub: "Mobile apps, SaaS, full-stack delivery" },
];

const INFLUENCER_TIERS = [
  { tier: "Nano", range: "1K – 10K", icon: "◎",
    desc: "You're building something real. We help you monetise early with brand deals that fit your niche perfectly.",
    perks: ["Brand deal matching", "Content brief support", "Early access campaigns"] },
  { tier: "Micro", range: "10K – 100K", icon: "◈",
    desc: "You have traction. We scale your income through consistent partnerships, exclusives, and long-term retainers.",
    perks: ["Retainer brand deals", "Campaign strategy", "Collab network access"] },
  { tier: "Macro", range: "100K – 1M+", icon: "★",
    desc: "You're a category leader. We build brand equity, negotiate equity deals, and run your collabs like a business.",
    perks: ["Equity & rev-share deals", "PR & press placements", "Cross-platform strategy"] },
];

/* ─────────────────────────── HOOKS ─────────────────────────── */
function useTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const u = () => setT(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }));
    u(); const id = setInterval(u, 1000); return () => clearInterval(id);
  }, []);
  return t;
}

function useInView(ref, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

/* ─────────────────────────── SMALL COMPONENTS ─────────────────────────── */

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const v = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.75s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.75s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SectionLabel({ n, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#000", flexShrink: 0 }}>{n}</div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "4px 14px" }}>{text}</div>
    </div>
  );
}

const Arrow = ({ size = 14, color = "currentColor", rotate = 0, style: s = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: `rotate(${rotate}deg)`, transition: "transform 0.4s cubic-bezier(0.25,0.1,0.25,1)", flexShrink: 0, ...s }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function Btn({ children, invert = false, onClick, href, style: s = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    borderRadius: 999, padding: "12px 26px", fontSize: 14, fontWeight: 700,
    cursor: "pointer", border: "none", textDecoration: "none",
    letterSpacing: "0.005em", fontFamily: "'DM Sans',sans-serif",
    transition: "background 0.25s, color 0.25s, opacity 0.25s",
    ...s,
  };
  const themed = invert
    ? { ...base, background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }
    : { ...base, background: "#fff", color: "#000" };
  if (href) return <a href={href} style={themed}>{children}</a>;
  return <button style={themed} onClick={onClick}>{children}</button>;
}

function Marquee({ items, speed = 22 }) {
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-block", animation: `marquee ${speed}s linear infinite` }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ marginRight: 40, fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
            {item}<span style={{ marginLeft: 40, color: "rgba(255,255,255,0.1)" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── ROTATING CARDS ─────────────────────────── */
function RotatingCards() {
  const [active, setActive] = useState(0);
  const total = BRAND_CARDS.length;

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % total), 3400);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 460, height: 380, margin: "0 auto" }}>
      {BRAND_CARDS.map((card, i) => {
        const offset = (i - active + total) % total;
        const isTop = offset === 0;
        const configs = [
          { rotate: 0, ty: 0, tx: 0, scale: 1, z: total, opacity: 1 },
          { rotate: -6, ty: 22, tx: -16, scale: 0.965, z: total - 1, opacity: 1 },
          { rotate: -11, ty: 38, tx: -28, scale: 0.93, z: total - 2, opacity: 1 },
          { rotate: -15, ty: 50, tx: -37, scale: 0.9, z: total - 3, opacity: 0.6 },
          { rotate: -18, ty: 58, tx: -44, scale: 0.87, z: total - 4, opacity: 0 },
        ];
        const cfg = configs[Math.min(offset, 4)];

        return (
          <div key={i} onClick={() => setActive(i)} style={{
            position: "absolute", inset: 0,
            background: "#151515",
            border: isTop ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.05)",
            borderRadius: 22,
            padding: "30px 26px",
            cursor: isTop ? "default" : "pointer",
            zIndex: cfg.z,
            opacity: cfg.opacity,
            transform: `translateX(${cfg.tx}px) translateY(${cfg.ty}px) rotate(${cfg.rotate}deg) scale(${cfg.scale})`,
            transition: "transform 0.6s cubic-bezier(0.34,1.15,0.64,1), opacity 0.4s, border-color 0.3s",
            boxShadow: isTop ? "0 24px 70px rgba(0,0,0,0.7)" : "none",
            userSelect: "none",
          }}>
            {isTop && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                  <span style={{ fontSize: 34 }}>{card.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "4px 12px" }}>{card.year}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>{card.category}</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 21, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>{card.name}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, marginBottom: 22 }}>{card.detail}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", color: "#000", borderRadius: 999, padding: "7px 16px", fontSize: 13, fontWeight: 700 }}>
                  {card.result}
                  <Arrow size={11} color="#000" />
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Dots */}
      <div style={{ position: "absolute", bottom: -36, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
        {BRAND_CARDS.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{
            width: active === i ? 22 : 6, height: 6, borderRadius: 3,
            background: active === i ? "#fff" : "rgba(255,255,255,0.18)",
            cursor: "pointer", transition: "width 0.35s, background 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── HOME PAGE ─────────────────────────── */
function HomePage() {
  const scrollY = useScrollY();

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden", background: "#080808" }}>
        {/* Noise */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />
        {/* Parallax wordmark */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", transform: `translateY(${scrollY * 0.28}px)` }}>
          <div style={{ fontSize: "clamp(100px,22vw,300px)", fontWeight: 900, fontFamily: "'Syne',sans-serif", color: "rgba(255,255,255,0.022)", letterSpacing: "-0.06em", whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>MOSAMBI</div>
        </div>
        {/* Radial glow */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 35% at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1440, margin: "0 auto", width: "100%", padding: "0 clamp(20px,5vw,80px) clamp(60px,8vh,100px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(20px,3.5vh,36px)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block", animation: "pulseW 2.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>Pune's Gen Z Digital Agency</span>
          </div>

          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.8rem,9vw,8rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.045em", marginBottom: "clamp(24px,3.5vh,44px)" }}>
            We don't<br />
            just market.<br />
            <em style={{ color: "rgba(255,255,255,0.2)", fontStyle: "italic", fontWeight: 700 }}>We dominate.</em>
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <Btn href="#"><span>Start a Project</span><Arrow color="#000" rotate={-45} /></Btn>
            <Btn href="#" invert><span>View Our Work</span><Arrow color="#fff" /></Btn>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
              <div style={{ display: "flex" }}>
                {["MS","SB","KR"].map((ini,i) => (
                  <div key={i} style={{ width:30, height:30, borderRadius:"50%", background:`hsl(${i*30+210},8%,${14+i*7}%)`, border:"2px solid #080808", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.5)", marginLeft:i>0?-10:0, position:"relative", zIndex:3-i }}>{ini}</div>
                ))}
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>50+ brands scaled</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:28, right:40, zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:6, color:"rgba(255,255,255,0.18)" }}>
          <div style={{ width:1, height:56, background:"linear-gradient(to bottom, transparent, rgba(255,255,255,0.28))", animation:"lineGrow 2s ease-in-out infinite" }} />
          <span style={{ fontSize:9, letterSpacing:"0.15em", textTransform:"uppercase", writingMode:"vertical-rl" }}>scroll</span>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"15px 0", background:"#0c0c0c" }}>
        <Marquee items={["Video Production","UGC Shoots","Influencer Marketing","D2C Growth","Meta Ads","SEO","Shopify Dev","Mobile Apps","LinkedIn Leads","Social Media"]} />
      </div>

      {/* BRAND STORIES — ROTATING CARDS */}
      <section style={{ background:"#080808", padding:"clamp(80px,10vh,140px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"64px 80px", alignItems:"center" }}>

            {/* Left */}
            <div style={{ flex:"1 1 340px", minWidth:0 }}>
              <FadeUp><SectionLabel n="01" text="Brand Stories" /></FadeUp>
              <FadeUp delay={0.08}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,5vw,4rem)", fontWeight:900, letterSpacing:"-0.045em", lineHeight:1.02, marginBottom:18 }}>
                  Brands we<br /><em style={{ color:"rgba(255,255,255,0.2)", fontStyle:"italic", fontWeight:700 }}>took to the top.</em>
                </h2>
              </FadeUp>
              <FadeUp delay={0.14}>
                <p style={{ fontSize:15, color:"rgba(255,255,255,0.42)", lineHeight:1.75, maxWidth:400, marginBottom:30, fontWeight:300 }}>
                  From ice cream shops in Pune to luxury real estate in Karad — we've scaled brands across every category with strategy, content, and obsessive execution.
                </p>
                <Btn href="#"><span>See All Work</span><Arrow color="#000" /></Btn>
              </FadeUp>
              <FadeUp delay={0.22} style={{ marginTop:48 }}>
                <div style={{ display:"flex", gap:36 }}>
                  {[["50+","Brands"],["100K+","IG Followers"],["5+","Years"]].map(([n,l]) => (
                    <div key={l}>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:900, letterSpacing:"-0.04em" }}>{n}</div>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.27)", marginTop:4, letterSpacing:"0.04em" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: cards */}
            <div style={{ flex:"1 1 360px", minWidth:0, paddingBottom:52 }}>
              <RotatingCards />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background:"#0c0c0c", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"clamp(80px,10vh,140px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:24, marginBottom:52 }}>
            <div>
              <FadeUp><SectionLabel n="02" text="What We Do" /></FadeUp>
              <FadeUp delay={0.08}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:900, letterSpacing:"-0.045em", lineHeight:1.02 }}>
                  One studio.<br /><em style={{ color:"rgba(255,255,255,0.2)", fontStyle:"italic", fontWeight:700 }}>Every weapon.</em>
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}><Btn href="#" invert>Get a Free Audit <Arrow color="#fff" /></Btn></FadeUp>
          </div>
          {SERVICES_LIST.map((s, i) => <FadeUp key={i} delay={i * 0.04}><ServiceRow {...s} /></FadeUp>)}
        </div>
      </section>

      {/* TIMELINE */}
      <TimelineSection />

      {/* BOTTOM CTA */}
      <section style={{ background:"#fff", color:"#000", padding:"clamp(80px,10vh,120px) clamp(20px,5vw,80px)", textAlign:"center" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <div style={{ fontSize:11, letterSpacing:"0.12em", color:"rgba(0,0,0,0.3)", textTransform:"uppercase", fontWeight:700, marginBottom:18 }}>Ready to scale?</div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.2rem,6vw,4.5rem)", fontWeight:900, letterSpacing:"-0.045em", lineHeight:1.02, marginBottom:32, color:"#000" }}>
            Let's build something<br />unforgettable.
          </h2>
          <div style={{ display:"flex", flexWrap:"wrap", gap:14, justifyContent:"center" }}>
            <Btn href="#" style={{ background:"#000", color:"#fff" }}>Book a Strategy Call <Arrow color="#fff" rotate={-45} /></Btn>
            <Btn href="#" style={{ background:"transparent", color:"#000", border:"1px solid rgba(0,0,0,0.18)" }}>WhatsApp Us <Arrow color="#000" /></Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* SERVICE ROW */
function ServiceRow({ n, title, sub }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", cursor:"pointer", transition:"padding-left 0.35s", paddingLeft:hov?14:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:22, flex:1 }}>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.22)", fontWeight:600, minWidth:22 }}>{n}</span>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1rem,2.5vw,1.55rem)", letterSpacing:"-0.025em", color:hov?"#fff":"rgba(255,255,255,0.82)", transition:"color 0.25s" }}>{title}</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.28)", marginTop:3 }}>{sub}</div>
        </div>
      </div>
      <div style={{ width:34, height:34, borderRadius:"50%", background:hov?"#fff":"transparent", border:"1px solid rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.3s", flexShrink:0 }}>
        <Arrow color={hov?"#000":"rgba(255,255,255,0.28)"} size={12} rotate={-45} />
      </div>
    </div>
  );
}

/* TIMELINE */
function TimelineSection() {
  const ref = useRef(null);
  const v = useInView(ref, 0.05);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!v) return;
    const id = setInterval(() => setActive(s => (s + 1) % TIMELINE.length), 3000);
    return () => clearInterval(id);
  }, [v]);

  return (
    <section ref={ref} style={{ background:"#080808", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"clamp(80px,10vh,140px) clamp(20px,5vw,80px)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-40, top:"50%", transform:"translateY(-50%)", fontFamily:"'Syne',sans-serif", fontSize:"clamp(180px,28vw,400px)", fontWeight:900, color:"rgba(255,255,255,0.018)", letterSpacing:"-0.08em", pointerEvents:"none", userSelect:"none", lineHeight:1, zIndex:0 }}>10Cr</div>

      <div style={{ maxWidth:1440, margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeUp><SectionLabel n="03" text="The Growth Blueprint" /></FadeUp>
        <FadeUp delay={0.08}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:900, letterSpacing:"-0.045em", lineHeight:1.02, marginBottom:12 }}>₹0 to ₹10 Crore.</h2>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.38)", lineHeight:1.75, maxWidth:520, marginBottom:60, fontWeight:300 }}>
            Our proven playbook — deployed across 50+ brands. Every phase has a clear deliverable, a metric, and a deadline.
          </p>
        </FadeUp>

        <div style={{ display:"flex", flexWrap:"wrap", gap:"44px 72px" }}>

          {/* Phase selector */}
          <div style={{ flex:"0 0 auto", display:"flex", flexDirection:"column", gap:4, minWidth:210 }}>
            {TIMELINE.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                all:"unset", cursor:"pointer",
                display:"flex", alignItems:"center", gap:14,
                padding:"15px 18px", borderRadius:12,
                background: active===i ? "rgba(255,255,255,0.07)" : "transparent",
                transition:"background 0.3s",
              }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:active===i?"#fff":"transparent", border:active===i?"2px solid #fff":"2px solid rgba(255,255,255,0.14)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:active===i?"#000":"rgba(255,255,255,0.28)", transition:"all 0.3s", flexShrink:0 }}>{t.icon}</div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, color:active===i?"#fff":"rgba(255,255,255,0.32)", letterSpacing:"-0.02em", transition:"color 0.3s" }}>{t.phase}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.2)", marginTop:2 }}>{t.label.split(":")[0]}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width:1, background:"rgba(255,255,255,0.07)", alignSelf:"stretch", flexShrink:0 }} />

          {/* Active detail */}
          <div style={{ flex:"1 1 300px", position:"relative", minHeight:300 }}>
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ opacity:active===i?1:0, transform:active===i?"translateX(0)":"translateX(18px)", transition:"opacity 0.4s, transform 0.4s", position:active===i?"relative":"absolute", pointerEvents:active===i?"all":"none", top:0, left:0, width:"100%" }}>
                {active===i && (
                  <>
                    <div style={{ display:"flex", alignItems:"baseline", gap:14, marginBottom:28 }}>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,4.5vw,3.2rem)", fontWeight:900, letterSpacing:"-0.04em" }}>{t.phase}</div>
                      <div style={{ fontSize:13, color:"rgba(255,255,255,0.3)" }}>{t.label}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                      {t.steps.map((step, si) => (
                        <div key={si} style={{ display:"flex", alignItems:"flex-start", gap:14, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"16px 18px", animation:`fadeInStep 0.4s ease ${si*0.08}s both` }}>
                          <div style={{ width:20, height:20, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.45)", flexShrink:0, marginTop:1 }}>{si+1}</div>
                          <span style={{ fontSize:14, color:"rgba(255,255,255,0.72)", lineHeight:1.5 }}>{step}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:28 }}>
                      <Btn href="#"><span>Get This Playbook</span><Arrow color="#000" rotate={-45} /></Btn>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeInStep{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
}

/* ─────────────────────────── INFLUENCER PAGE ─────────────────────────── */
function InfluencerPage() {
  const [form, setForm] = useState({ name:"", handle:"", platform:"Instagram", followers:"", niche:"", email:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => { if (form.name && form.email) setSubmitted(true); };

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight:"80vh", display:"flex", alignItems:"flex-end", background:"#080808", position:"relative", overflow:"hidden", padding:"120px clamp(20px,5vw,80px) clamp(60px,8vh,100px)" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />
        <div style={{ position:"absolute", top:"15%", right:"3%", fontFamily:"'Syne',sans-serif", fontSize:"clamp(100px,20vw,260px)", fontWeight:900, color:"rgba(255,255,255,0.02)", letterSpacing:"-0.06em", userSelect:"none", lineHeight:1, zIndex:0 }}>COLLAB</div>
        <div style={{ position:"relative", zIndex:1, maxWidth:1440, margin:"0 auto", width:"100%" }}>
          <FadeUp>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#fff", animation:"pulseW 2.5s ease-in-out infinite" }} />
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.38)", letterSpacing:"0.12em", textTransform:"uppercase" }}>For Creators & Influencers</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.6rem,8vw,7rem)", fontWeight:900, lineHeight:0.95, letterSpacing:"-0.045em", marginBottom:26 }}>
              Let's create<br /><em style={{ color:"rgba(255,255,255,0.2)", fontStyle:"italic", fontWeight:700 }}>together.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p style={{ fontSize:17, color:"rgba(255,255,255,0.42)", maxWidth:540, lineHeight:1.7, fontWeight:300 }}>
              Mosambi Studios connects creators with India's fastest-growing D2C brands. Whether you're at 1K or 1M+ followers, we have a partnership that makes you money and builds your brand.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Ticker */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"14px 0", background:"#0c0c0c" }}>
        <Marquee items={["Brand Deals","Retainer Contracts","Equity Collabs","Product Seeding","Paid Campaigns","Long-term Partnerships","Exclusive Launches"]} speed={28} />
      </div>

      {/* Tiers */}
      <section style={{ background:"#080808", padding:"clamp(80px,10vh,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <FadeUp><SectionLabel n="01" text="Find Your Tier" /></FadeUp>
          <FadeUp delay={0.08}>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,4.5vw,3.5rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:1.04, marginBottom:52 }}>
              We work with every level.<br /><em style={{ color:"rgba(255,255,255,0.2)", fontStyle:"italic", fontWeight:700 }}>From emerging to established.</em>
            </h2>
          </FadeUp>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:14 }}>
            {INFLUENCER_TIERS.map((t, i) => <FadeUp key={i} delay={i*0.1}><TierCard tier={t} /></FadeUp>)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ background:"#0c0c0c", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"clamp(80px,10vh,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <FadeUp><SectionLabel n="02" text="How It Works" /></FadeUp>
          <FadeUp delay={0.08}>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,4.5vw,3.5rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:1.04, marginBottom:52 }}>Simple. Fast. Profitable.</h2>
          </FadeUp>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(230px, 1fr))", gap:2 }}>
            {[
              { n:"01", title:"Apply Below", desc:"Fill out the form. Takes 2 minutes. Tell us your niche, audience, and what kind of deals you want." },
              { n:"02", title:"We Match You", desc:"Our team reviews your profile and matches you to brands actively seeking your type of creator." },
              { n:"03", title:"Deal Negotiation", desc:"We negotiate rates, deliverables, and timelines on your behalf. You just create — we handle business." },
              { n:"04", title:"Get Paid, Build Brand", desc:"Execute the collab, get paid on time, and grow your portfolio with premium brand associations." },
            ].map((step, i) => (
              <FadeUp key={i} delay={i*0.08}>
                <div style={{ background:"#141414", border:"1px solid rgba(255,255,255,0.06)", borderRadius:20, padding:"28px 22px" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:900, color:"rgba(255,255,255,0.06)", letterSpacing:"-0.05em", marginBottom:18, lineHeight:1 }}>{step.n}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:800, marginBottom:10, letterSpacing:"-0.02em" }}>{step.title}</div>
                  <div style={{ fontSize:14, color:"rgba(255,255,255,0.38)", lineHeight:1.65 }}>{step.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background:"#080808", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"clamp(80px,10vh,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth:720, margin:"0 auto" }}>
          <FadeUp><SectionLabel n="03" text="Apply Now" /></FadeUp>
          <FadeUp delay={0.08}>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,4.5vw,3.5rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:1.04, marginBottom:8 }}>Join the network.</h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.38)", marginBottom:44, lineHeight:1.7, fontWeight:300 }}>We onboard new creators every week. Our collab team will reach out within 48 hours.</p>
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div style={{ background:"#fff", color:"#000", borderRadius:22, padding:"52px 36px", textAlign:"center" }}>
                <div style={{ fontSize:44, marginBottom:18 }}>✦</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:900, marginBottom:10, letterSpacing:"-0.03em" }}>You're in the queue.</div>
                <div style={{ fontSize:15, color:"rgba(0,0,0,0.5)", lineHeight:1.7 }}>Our collab team will reach out to <strong>{form.email}</strong> within 48 hours.</div>
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.1}>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <FormField label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                  <FormField label="Email *" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" type="email" />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <FormField label="IG / YT Handle" name="handle" value={form.handle} onChange={handleChange} placeholder="@yourhandle" />
                  <div>
                    <label style={{ fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:8, fontWeight:700 }}>Primary Platform</label>
                    <select name="platform" value={form.platform} onChange={handleChange} style={{ width:"100%", background:"#141414", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"13px 15px", color:"#fff", fontSize:14, outline:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                      {["Instagram","YouTube","LinkedIn","Twitter/X","Multiple"].map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <FormField label="Follower Count" name="followers" value={form.followers} onChange={handleChange} placeholder="e.g. 45,000" />
                  <FormField label="Your Niche" name="niche" value={form.niche} onChange={handleChange} placeholder="e.g. Food, Fitness, Tech" />
                </div>
                <div>
                  <label style={{ fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:8, fontWeight:700 }}>Anything else?</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us what kind of brand partnerships you're looking for..." style={{ width:"100%", background:"#141414", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"13px 15px", color:"#fff", fontSize:14, outline:"none", resize:"vertical", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box" }} />
                </div>
                <div style={{ marginTop:6 }}>
                  <Btn onClick={handleSubmit} style={{ fontSize:15, padding:"15px 34px" }}>Submit Application <Arrow color="#000" rotate={-45} /></Btn>
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </section>
    </div>
  );
}

function TierCard({ tier: t }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background:hov?"#fff":"#141414", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"28px 24px", transition:"background 0.35s, transform 0.35s, box-shadow 0.35s", transform:hov?"translateY(-6px)":"none", boxShadow:hov?"0 28px 72px rgba(0,0,0,0.5)":"none", height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div style={{ fontSize:26, color:hov?"#000":"#fff" }}>{t.icon}</div>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"0.08em", color:hov?"rgba(0,0,0,0.38)":"rgba(255,255,255,0.28)", textTransform:"uppercase", border:`1px solid ${hov?"rgba(0,0,0,0.14)":"rgba(255,255,255,0.1)"}`, borderRadius:999, padding:"4px 11px" }}>{t.range}</div>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:900, color:hov?"#000":"#fff", letterSpacing:"-0.03em", marginBottom:10 }}>{t.tier} Creator</div>
      <p style={{ fontSize:14, color:hov?"rgba(0,0,0,0.52)":"rgba(255,255,255,0.38)", lineHeight:1.65, marginBottom:20 }}>{t.desc}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {t.perks.map((p,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
            <div style={{ width:4, height:4, borderRadius:"50%", background:hov?"#000":"#fff", flexShrink:0 }} />
            <span style={{ fontSize:13, color:hov?"rgba(0,0,0,0.62)":"rgba(255,255,255,0.45)" }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormField({ label, name, value, onChange, placeholder, type="text" }) {
  return (
    <div>
      <label style={{ fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:8, fontWeight:700 }}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} style={{ width:"100%", background:"#141414", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"13px 15px", color:"#fff", fontSize:14, outline:"none", fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box", transition:"border-color 0.25s" }}
        onFocus={e => e.target.style.borderColor="rgba(255,255,255,0.32)"}
        onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.1)"} />
    </div>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ background:"#040404", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"56px clamp(20px,5vw,80px) 32px" }}>
      <div style={{ maxWidth:1440, margin:"0 auto" }}>
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:"36px 60px", marginBottom:52 }}>
          <div style={{ flex:"1 1 260px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:34, height:34, borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:11, color:"#000" }}>MS</div>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:15, letterSpacing:"-0.02em" }}>Mosambi Studios</span>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.28)", lineHeight:1.7, maxWidth:260, marginBottom:22 }}>Pune's Gen Z digital agency. Video, social, web, and performance marketing — all under one roof.</p>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.18)" }}>Made with ✦ in Pune, Maharashtra</div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"28px 56px" }}>
            {[
              { heading:"Services", links:["Video Production","UGC & Influencer","D2C Marketing","SEO & Google","Social Media","Shopify Dev"] },
              { heading:"Company", links:["About Us","Our Work","Influencer Program","Blog","Contact"] },
              { heading:"Connect", links:["Instagram","YouTube","LinkedIn","WhatsApp"] },
            ].map(col => (
              <div key={col.heading}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.18)", marginBottom:16 }}>{col.heading}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom:11 }}>
                    <a href="#" onClick={l==="Influencer Program"?(e)=>{e.preventDefault();setPage("influencer");window.scrollTo(0,0);}:undefined}
                      style={{ fontSize:13, color:"rgba(255,255,255,0.35)", textDecoration:"none", transition:"color 0.2s" }}
                      onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:22, display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:10 }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.18)" }}>© 2026 Mosambi Studios Pvt. Ltd. · Pune, Maharashtra</span>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.18)" }}>CIN: U74999MH2026PTC000000</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── ROOT APP ─────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollY();
  const time = useTime();
  const navScrolled = scrollY > 60;
  const navTo = p => { setPage(p); setMenuOpen(false); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <div style={{ fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif", background:"#080808", color:"#f0efe9", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Syne:wght@700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        @keyframes pulseW{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(0.7)}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes lineGrow{0%,100%{opacity:0.2}50%{opacity:0.55}}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.18);}
        select option{background:#141414;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#080808;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:3px;}
        .hide-m{display:flex;} .show-m{display:none;}
        @media(max-width:767px){.hide-m{display:none!important}.show-m{display:flex!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0 clamp(20px,5vw,80px)", background:navScrolled?"rgba(8,8,8,0.9)":"transparent", backdropFilter:navScrolled?"blur(20px)":"none", borderBottom:navScrolled?"1px solid rgba(255,255,255,0.06)":"1px solid transparent", transition:"background 0.4s, backdrop-filter 0.4s, border-color 0.4s" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", display:"flex", alignItems:"center", height:66, gap:28 }}>
          <button onClick={() => navTo("home")} style={{ all:"unset", cursor:"pointer", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:10, color:"#000" }}>MS</div>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:14, letterSpacing:"-0.02em" }}>Mosambi</span>
          </button>

          <div className="hide-m" style={{ display:"flex", gap:24, marginLeft:12 }}>
            {[{label:"Work",p:"home"},{label:"Services",p:"home"},{label:"Influencers",p:"influencer"},{label:"Connect",p:"home"}].map(item => (
              <button key={item.label} onClick={() => navTo(item.p)} style={{ all:"unset", cursor:"pointer", fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.42)", transition:"color 0.25s", letterSpacing:"0.01em" }}
                onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.42)"}>{item.label}</button>
            ))}
          </div>

          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:14 }}>
            <span className="hide-m" style={{ fontSize:12, color:"rgba(255,255,255,0.22)", letterSpacing:"0.04em" }}>{time} IST</span>
            <Btn href="#" style={{ padding:"9px 20px", fontSize:13 }} className="hide-m">Start a Project</Btn>
            <button onClick={() => setMenuOpen(!menuOpen)} className="show-m" style={{ width:36, height:36, borderRadius:"50%", background:menuOpen?"rgba(255,255,255,0.08)":"#fff", border:"none", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:menuOpen?"#fff":"#000", transition:"background 0.3s, color 0.3s" }}>
              {menuOpen
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div style={{ position:"fixed", inset:0, zIndex:90, background:"rgba(0,0,0,0.78)", backdropFilter:"blur(10px)", opacity:menuOpen?1:0, pointerEvents:menuOpen?"all":"none", transition:"opacity 0.3s" }} onClick={() => setMenuOpen(false)} />
      <div style={{ position:"fixed", left:0, right:0, bottom:0, zIndex:95, background:"#111", borderRadius:"20px 20px 0 0", padding:"26px 22px 44px", border:"1px solid rgba(255,255,255,0.08)", transform:menuOpen?"translateY(0)":"translateY(100%)", transition:"transform 0.45s cubic-bezier(0.32,0.72,0,1)" }}>
        <div style={{ width:30, height:3, background:"rgba(255,255,255,0.14)", borderRadius:2, margin:"0 auto 28px" }} />
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.22)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:18 }}>{time} IST · Pune</div>
        {[{label:"Work",p:"home"},{label:"Services",p:"home"},{label:"Influencers",p:"influencer"},{label:"Connect",p:"home"}].map(item => (
          <div key={item.label} style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"13px 0" }}>
            <button onClick={() => navTo(item.p)} style={{ all:"unset", cursor:"pointer", fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>{item.label}</button>
          </div>
        ))}
        <Btn onClick={() => navTo("home")} style={{ background:"#fff", color:"#000", marginTop:22, width:"100%", justifyContent:"center" }}>Start a Project <Arrow color="#000" rotate={-45} /></Btn>
      </div>

      {/* PAGE RENDER */}
      {page === "home" && <HomePage />}
      {page === "influencer" && <InfluencerPage />}

      <Footer setPage={setPage} />
    </div>
  );
}
