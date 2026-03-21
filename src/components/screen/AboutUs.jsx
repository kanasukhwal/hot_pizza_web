import { useState, useEffect } from "react";

const team = [
  { name: "Arjun Mehta", role: "Founder & Head Chef", emoji: "👨‍🍳", desc: "20 years of pizza mastery from Naples to Mumbai." },
  { name: "Sneha Patel", role: "Operations Director", emoji: "👩‍💼", desc: "Keeps every delivery hot, fast, and perfect." },
  { name: "Rohan Das", role: "Chief Tasting Officer", emoji: "🧑‍🍽️", desc: "Approves every recipe before it hits the menu." },
  { name: "Priya Nair", role: "Customer Happiness Lead", emoji: "👩‍💻", desc: "Ensures every customer leaves smiling." },
];

const milestones = [
  { year: "2018", title: "Founded", desc: "Started with one oven, big dreams, and a secret dough recipe." },
  { year: "2020", title: "50K Orders", desc: "Crossed 50,000 deliveries during the pandemic era." },
  { year: "2022", title: "5 Outlets", desc: "Expanded to 5 locations across Bengaluru." },
  { year: "2024", title: "#1 Rated", desc: "Voted the city's best pizza delivery 2 years in a row." },
  { year: "2026", title: "Going National", desc: "Launching in 10 new cities across India." },
];

const locations = [
  { name: "Koramangala", address: "12, 5th Block, Koramangala, Bengaluru - 560095", phone: "+91 98765 43210", hours: "11 AM – 11 PM", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.617936707157!2d77.6262!3d12.9352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU2JzA2LjciTiA3N8KwMzcnMzQuMyJF!5e0!3m2!1sen!2sin!4v1620000000000" },
  { name: "Indiranagar", address: "45, 100 Feet Road, Indiranagar, Bengaluru - 560038", phone: "+91 98765 43211", hours: "11 AM – 11 PM", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9!2d77.6412!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzgnMjkuNSJF!5e0!3m2!1sen!2sin!4v1620000000000" },
  { name: "Whitefield", address: "8, ITPL Main Road, Whitefield, Bengaluru - 560066", phone: "+91 98765 43212", hours: "11 AM – 11 PM", mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d77.7480!3d12.9698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzExLjMiTiA3N8KwNDQnNTIuOCJF!5e0!3m2!1sen!2sin!4v1620000000000" },
];

const values = [
  { icon: "🌶️", title: "Bold Flavors", desc: "We never compromise on ingredients. Every topping is fresh, every sauce homemade." },
  { icon: "⚡", title: "Lightning Fast", desc: "30 minutes or your next order is on us. Speed is part of our recipe." },
  { icon: "💚", title: "Made with Love", desc: "Each pizza is hand-stretched and oven-baked by people who genuinely love food." },
  { icon: "🌍", title: "Community First", desc: "We source locally, hire locally, and give back to the neighborhoods we serve." },
];

export default function AboutUs() {
  const [visible, setVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(255,107,0,0.15) !important; }
        .loc-btn:hover { background: #FF6B00 !important; color: #fff !important; }
        .team-card:hover { border-color: #FF6B00 !important; }
        .val-card:hover { background: #1e1200 !important; border-color: rgba(255,107,0,0.4) !important; }
      `}</style>

      {/* HERO */}
      <section
        style={{
          ...styles.hero,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div style={styles.heroBg} />
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>🍕 Our Story</span>
          <h1 style={styles.heroTitle}>
            Crafted with <span style={{ color: "#FF6B00" }}>Passion,</span>
            <br />Delivered with <span style={{ color: "#FF6B00" }}>Fire</span>
          </h1>
          <p style={styles.heroDesc}>
            Hot Pizza started as a one-oven dream in a small Bengaluru kitchen. Today we're the city's most loved pizza brand — still using the same secret dough recipe, still obsessed with making every bite unforgettable.
          </p>
          <div style={styles.heroBadges}>
            {["🏆 #1 Rated in Bengaluru", "🚀 30-Min Delivery", "💯 Fresh Ingredients"].map((b) => (
              <span key={b} style={styles.badge}>{b}</span>
            ))}
          </div>
        </div>
        <div style={styles.heroVisual}>
          <div style={styles.bigEmoji}>🍕</div>
          <div style={styles.glowRing} />
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        {[["50K+", "Happy Customers"], ["4.9⭐", "Avg Rating"], ["30 min", "Avg Delivery"], ["5", "Outlets"], ["2018", "Founded"]].map(([val, label]) => (
          <div key={label} style={styles.statBox}>
            <div style={styles.statVal}>{val}</div>
            <div style={styles.statLabel}>{label}</div>
          </div>
        ))}
      </section>

      {/* OUR STORY */}
      <section style={styles.section}>
        <div style={styles.storyGrid}>
          <div style={styles.storyLeft}>
            <p style={styles.tag}>Who We Are</p>
            <h2 style={styles.sectionTitle}>More Than Just <span style={{ color: "#FF6B00" }}>Pizza</span></h2>
            <p style={styles.bodyText}>
              It started in 2018 when our founder Arjun Mehta, after training in Naples and working in Michelin-starred kitchens, decided to bring authentic wood-fired pizza to Bengaluru's fast-paced food scene.
            </p>
            <p style={{ ...styles.bodyText, marginTop: 16 }}>
              We believe great pizza is about three things: exceptional dough, the freshest toppings, and the love you pour into making it. Every pizza that leaves our kitchen carries that belief.
            </p>
            <p style={{ ...styles.bodyText, marginTop: 16 }}>
              From a single outlet in Koramangala to 5 locations across the city — and counting — Hot Pizza has become more than a food brand. We're a community of pizza lovers.
            </p>
          </div>
          <div style={styles.storyRight}>
            <div style={styles.storyCard}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>🔥</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Our Secret?</h3>
              <p style={{ color: "#aaa", lineHeight: 1.7, fontSize: 15 }}>
                72-hour cold-fermented dough, San Marzano tomato sauce, and toppings sourced fresh every single morning. No shortcuts. Ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ ...styles.section, background: "#0a0a0a", padding: "70px 48px" }}>
        <div style={styles.centerHeader}>
          <p style={styles.tag}>What Drives Us</p>
          <h2 style={styles.sectionTitle}>Our <span style={{ color: "#FF6B00" }}>Values</span></h2>
        </div>
        <div style={styles.valGrid}>
          {values.map((v, i) => (
            <div key={i} className="val-card" style={styles.valCard}>
              <div style={styles.valIcon}>{v.icon}</div>
              <h3 style={styles.valTitle}>{v.title}</h3>
              <p style={styles.valDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section style={styles.section}>
        <div style={styles.centerHeader}>
          <p style={styles.tag}>Our Journey</p>
          <h2 style={styles.sectionTitle}>From Oven to <span style={{ color: "#FF6B00" }}>Empire</span></h2>
        </div>
        <div style={styles.timeline}>
          {milestones.map((m, i) => (
            <div key={i} style={{ ...styles.timelineItem, flexDirection: i % 2 === 0 ? "row" : "row-reverse" }}>
              <div style={styles.timelineContent}>
                <div style={styles.timelineYear}>{m.year}</div>
                <h3 style={styles.timelineTitle}>{m.title}</h3>
                <p style={styles.timelineDesc}>{m.desc}</p>
              </div>
              <div style={styles.timelineDot}>
                <div style={styles.timelineDotInner} />
              </div>
              <div style={{ flex: 1 }} />
            </div>
          ))}
          <div style={styles.timelineLine} />
        </div>
      </section>

      {/* TEAM */}
      <section style={{ ...styles.section, background: "#0a0a0a", padding: "70px 48px" }}>
        <div style={styles.centerHeader}>
          <p style={styles.tag}>The People</p>
          <h2 style={styles.sectionTitle}>Meet the <span style={{ color: "#FF6B00" }}>Team</span></h2>
        </div>
        <div style={styles.teamGrid}>
          {team.map((t, i) => (
            <div key={i} className="team-card card-hover" style={styles.teamCard}>
              <div style={styles.teamEmoji}>{t.emoji}</div>
              <h3 style={styles.teamName}>{t.name}</h3>
              <p style={styles.teamRole}>{t.role}</p>
              <p style={styles.teamDesc}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section style={styles.section} id="locations">
        <div style={styles.centerHeader}>
          <p style={styles.tag}>Find Us</p>
          <h2 style={styles.sectionTitle}>Our <span style={{ color: "#FF6B00" }}>Locations</span></h2>
          <p style={{ color: "#888", marginTop: 10, fontSize: 15 }}>Walk in or order — we're always close by</p>
        </div>

        {/* Location Tabs */}
        <div style={styles.locTabs}>
          {locations.map((loc, i) => (
            <button
              key={i}
              className="loc-btn"
              onClick={() => setActiveLocation(i)}
              style={{
                ...styles.locTab,
                background: activeLocation === i ? "#FF6B00" : "#1a1a1a",
                color: activeLocation === i ? "#fff" : "#aaa",
                border: activeLocation === i ? "1px solid #FF6B00" : "1px solid #333",
              }}
            >
              📍 {loc.name}
            </button>
          ))}
        </div>

        {/* Map + Info */}
        <div style={styles.mapContainer}>
          {/* Map Embed */}
          <div style={styles.mapWrap}>
            <iframe
              title={`${locations[activeLocation].name} map`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(locations[activeLocation].address)}&output=embed`}
              style={styles.mapIframe}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div style={styles.mapOverlayBadge}>
              📍 {locations[activeLocation].name}
            </div>
          </div>

          {/* Info Panel */}
          <div style={styles.infoPanel}>
            <div style={styles.infoPanelHeader}>
              <span style={{ fontSize: 36 }}>🏪</span>
              <div>
                <h3 style={styles.infoBranch}>{locations[activeLocation].name} Branch</h3>
                <span style={styles.infoOpen}>● Open Now</span>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📍</span>
              <div>
                <p style={styles.infoLabel}>Address</p>
                <p style={styles.infoValue}>{locations[activeLocation].address}</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📞</span>
              <div>
                <p style={styles.infoLabel}>Phone</p>
                <p style={styles.infoValue}>{locations[activeLocation].phone}</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>🕐</span>
              <div>
                <p style={styles.infoLabel}>Hours</p>
                <p style={styles.infoValue}>{locations[activeLocation].hours} · All Days</p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>🛵</span>
              <div>
                <p style={styles.infoLabel}>Delivery Radius</p>
                <p style={styles.infoValue}>Up to 8 km from this outlet</p>
              </div>
            </div>

            <div style={styles.mapActions}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locations[activeLocation].address)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.dirBtn}
              >
                🗺️ Get Directions
              </a>
              <a href={`tel:${locations[activeLocation].phone}`} style={styles.callBtn}>
                📞 Call Us
              </a>
            </div>
          </div>
        </div>

        {/* All locations mini cards */}
        <div style={styles.allLocRow}>
          {locations.map((loc, i) => (
            <div
              key={i}
              className="card-hover"
              onClick={() => setActiveLocation(i)}
              style={{
                ...styles.miniLocCard,
                border: activeLocation === i ? "1px solid #FF6B00" : "1px solid #222",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 22 }}>📍</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{loc.name}</p>
                <p style={{ color: "#888", fontSize: 12 }}>{loc.hours}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <div style={styles.ctaBg} />
        <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 14, position: "relative" }}>
          Ready for the <span style={{ color: "#FF6B00" }}>Best Pizza</span> of Your Life?
        </h2>
        <p style={{ color: "#ddd", fontSize: 17, marginBottom: 32, position: "relative" }}>
          Order online or walk into any of our outlets. Hot, fresh, always perfect.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", position: "relative" }}>
          <a href="/" style={styles.ctaBtn}>Order Online →</a>
          <a href="#locations" style={styles.ctaGhost}>Find Nearest Outlet</a>
        </div>
      </section>
    </>
  );
}

const styles = {
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "80px 48px 70px",
    minHeight: "75vh",
    position: "relative",
    overflow: "hidden",
    gap: 40,
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.13) 0%, transparent 65%)",
    pointerEvents: "none",
  },
  heroContent: { flex: 1, maxWidth: 580, position: "relative" },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,107,0,0.15)",
    border: "1px solid rgba(255,107,0,0.3)",
    borderRadius: 50,
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 600,
    color: "#FF6B00",
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 54,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: 20,
    letterSpacing: -1,
  },
  heroDesc: {
    color: "#aaa",
    fontSize: 17,
    lineHeight: 1.75,
    marginBottom: 32,
    maxWidth: 500,
  },
  heroBadges: { display: "flex", gap: 10, flexWrap: "wrap" },
  badge: {
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 50,
    padding: "7px 16px",
    fontSize: 13,
    fontWeight: 600,
    color: "#ccc",
  },
  heroVisual: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bigEmoji: {
    fontSize: 140,
    animation: "float 4s ease-in-out infinite",
    filter: "drop-shadow(0 0 40px rgba(255,107,0,0.4))",
    position: "relative",
    zIndex: 2,
  },
  glowRing: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: "50%",
    border: "2px solid rgba(255,107,0,0.25)",
    boxShadow: "0 0 60px rgba(255,107,0,0.15)",
  },
  statsSection: {
    display: "flex",
    justifyContent: "space-around",
    background: "#141414",
    borderTop: "1px solid #1e1e1e",
    borderBottom: "1px solid #1e1e1e",
    padding: "30px 48px",
    flexWrap: "wrap",
    gap: 20,
  },
  statBox: { textAlign: "center", padding: "8px 20px" },
  statVal: { fontSize: 32, fontWeight: 900, color: "#FF6B00" },
  statLabel: { fontSize: 13, color: "#888", marginTop: 2 },
  section: { padding: "70px 48px" },
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 60,
    alignItems: "center",
  },
  storyLeft: {},
  storyRight: { display: "flex", justifyContent: "center" },
  storyCard: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 20,
    padding: 40,
    textAlign: "center",
    maxWidth: 320,
    boxShadow: "0 0 60px rgba(255,107,0,0.08)",
  },
  tag: {
    color: "#FF6B00",
    fontWeight: 700,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 38, fontWeight: 900, letterSpacing: -0.5, marginBottom: 20 },
  bodyText: { color: "#aaa", fontSize: 16, lineHeight: 1.8 },
  centerHeader: { textAlign: "center", marginBottom: 48 },
  valGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 24,
  },
  valCard: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 16,
    padding: 28,
    transition: "all 0.25s",
  },
  valIcon: { fontSize: 36, marginBottom: 14 },
  valTitle: { fontSize: 18, fontWeight: 800, marginBottom: 8 },
  valDesc: { color: "#888", fontSize: 14, lineHeight: 1.7 },
  timeline: {
    position: "relative",
    maxWidth: 700,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  timelineLine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    background: "linear-gradient(to bottom, #FF6B00, transparent)",
    transform: "translateX(-50%)",
    zIndex: 0,
  },
  timelineItem: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    position: "relative",
    zIndex: 1,
    marginBottom: 32,
  },
  timelineContent: {
    flex: 1,
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 14,
    padding: "20px 24px",
    margin: "0 24px",
  },
  timelineYear: { color: "#FF6B00", fontWeight: 900, fontSize: 22, marginBottom: 4 },
  timelineTitle: { fontSize: 17, fontWeight: 800, marginBottom: 6 },
  timelineDesc: { color: "#888", fontSize: 14, lineHeight: 1.6 },
  timelineDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "3px solid #FF6B00",
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  timelineDotInner: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#FF6B00",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 24,
  },
  teamCard: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 18,
    padding: "32px 24px",
    textAlign: "center",
    transition: "all 0.25s",
  },
  teamEmoji: { fontSize: 56, marginBottom: 16 },
  teamName: { fontSize: 18, fontWeight: 800, marginBottom: 4 },
  teamRole: { color: "#FF6B00", fontSize: 13, fontWeight: 700, marginBottom: 10 },
  teamDesc: { color: "#888", fontSize: 13, lineHeight: 1.6 },
  locTabs: { display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" },
  locTab: {
    borderRadius: 50,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    transition: "all 0.2s",
  },
  mapContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    gap: 28,
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 28,
  },
  mapWrap: { position: "relative", minHeight: 420 },
  mapIframe: {
    width: "100%",
    height: "100%",
    minHeight: 420,
    border: "none",
    display: "block",
    filter: "brightness(0.85) contrast(1.1) saturate(0.9)",
  },
  mapOverlayBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    background: "rgba(15,15,15,0.9)",
    border: "1px solid #333",
    borderRadius: 10,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 700,
    color: "#FF6B00",
    backdropFilter: "blur(8px)",
  },
  infoPanel: { padding: "36px 32px", display: "flex", flexDirection: "column", gap: 20 },
  infoPanelHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 8 },
  infoBranch: { fontSize: 20, fontWeight: 900 },
  infoOpen: { color: "#22c55e", fontSize: 13, fontWeight: 700 },
  infoRow: { display: "flex", gap: 16, alignItems: "flex-start" },
  infoIcon: { fontSize: 20, flexShrink: 0, marginTop: 2 },
  infoLabel: { color: "#888", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 },
  infoValue: { color: "#eee", fontSize: 15, fontWeight: 600, lineHeight: 1.5 },
  mapActions: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" },
  dirBtn: {
    flex: 1,
    background: "#FF6B00",
    color: "#fff",
    borderRadius: 10,
    padding: "12px 18px",
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    textAlign: "center",
    display: "block",
  },
  callBtn: {
    flex: 1,
    background: "#1a1a1a",
    border: "1px solid #333",
    color: "#ccc",
    borderRadius: 10,
    padding: "12px 18px",
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    textAlign: "center",
    display: "block",
  },
  allLocRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  miniLocCard: {
    flex: 1,
    minWidth: 180,
    background: "#141414",
    borderRadius: 14,
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    transition: "all 0.2s",
  },
  cta: {
    textAlign: "center",
    padding: "80px 48px",
    position: "relative",
    overflow: "hidden",
    background: "#0a0a0a",
  },
  ctaBg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse at 50% 50%, rgba(255,107,0,0.12) 0%, transparent 65%)",
    pointerEvents: "none",
  },
  ctaBtn: {
    background: "#FF6B00",
    color: "#fff",
    borderRadius: 12,
    padding: "14px 32px",
    fontWeight: 800,
    fontSize: 16,
    textDecoration: "none",
  },
  ctaGhost: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 16,
    textDecoration: "none",
  },
};
