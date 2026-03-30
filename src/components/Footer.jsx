import { Link } from "react-router-dom";
import { locations } from "../data/menuData";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const wa = locations[0].whatsapp;
  const { theme } = useTheme();

  return (
    <footer style={s.footer}>
      <div style={s.statsBanner}>
        {[["1M+", "Orders Delivered"], ["4.9⭐", "Avg Rating"], ["30 min", "Avg Delivery"], ["4", "Locations"], ["10+", "Years"]].map(([v, l]) => (
          <div key={l} style={s.stat}>
            <div style={s.statV}>{v}</div>
            <div style={s.statL}>{l}</div>
          </div>
        ))}
      </div>

      <div style={s.main}>
        <div style={s.col}>
          <Link to="/" style={s.logoWrap}>
            <span style={{ fontSize: 28 }}>🍕</span>
            <span style={s.logoTxt}>Hot<span style={{ color: "var(--primary-color)" }}>Pizza</span></span>
          </Link>
          <p style={s.tagline}>Better food for more people. Serving Rajasthan with love since 2014 across 4 cities.</p>
          <div style={s.social}>
            {[
              { icon: "📘", label: "Facebook", href: "https://facebook.com" },
              { icon: "📸", label: "Instagram", href: "https://instagram.com" },
              { icon: "🐦", label: "Twitter", href: "https://twitter.com" },
            ].map((s_) => (
              <a key={s_.label} href={s_.href} target="_blank" rel="noopener noreferrer" style={s.socialBtn} title={s_.label}>{s_.icon}</a>
            ))}
          </div>
          <a href={`https://wa.me/${wa}?text=Hi! I'd like to order from HotPizza`} target="_blank" rel="noopener noreferrer" style={s.waBtn}>
            <span style={{ fontSize: 18 }}>💬</span> Chat on WhatsApp
          </a>
        </div>

        <div style={s.col}>
          <h4 style={s.colTitle}>Quick Links</h4>
          {[["Home", "/"], ["Menu", "/menu"], ["About Us", "/about"], ["Contact", "/contact"], ["Checkout", "/checkout"]].map(([l, p]) => (
            <Link key={l} to={p} style={s.footerLink}>{l}</Link>
          ))}
        </div>

        <div style={s.col}>
          <h4 style={s.colTitle}>Our Locations</h4>
          {locations.map((loc) => (
            <div key={loc.id} style={{ marginBottom: 14 }}>
              <p style={{ fontWeight: 700, color: "#eee", fontSize: 13 }}>{loc.emoji} {loc.name}</p>
              <p style={{ color: "#666", fontSize: 12, lineHeight: 1.5 }}>{loc.address.substring(0, 60)}...</p>
              <a href={`https://wa.me/${loc.whatsapp}?text=Hi HotPizza ${loc.name}!`} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontSize: 12, fontWeight: 600 }}>WhatsApp →</a>
            </div>
          ))}
        </div>

        <div style={s.col}>
          <h4 style={s.colTitle}>Deals & Offers</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { code: "HOTPIZZA", off: "30% OFF", desc: "First Order" },
              { code: "PIZZA40", off: "40% OFF", desc: "Weekend Special" },
              { code: "SPICY20", off: "20% OFF", desc: "Spicy Lovers" },
            ].map((c) => (
              <div key={c.code} style={s.couponCard}>
                <div style={{ fontWeight: 900, fontSize: 13, color: "var(--primary-color)" }}>{c.code}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{c.desc}</div>
                <div style={{ background: "var(--primary-color)", color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 800, alignSelf: "flex-start", marginTop: 4 }}>{c.off}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={s.bottom}>
        <p style={{ color: "var(--footer-bottom-text-color)", fontSize: 13 }}>© 2026 HotPizza. All rights reserved. Made with ❤️ & 🍕 in Rajasthan</p>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" style={s.smallLink}>Privacy Policy</a>
          <a href="#" style={s.smallLink}>Terms of Service</a>
          <a href="#" style={s.smallLink}>Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}

const s = {
  footer: { background: "var(--footer-bg)", borderTop: "1px solid var(--footer-border)", fontFamily: "'Nunito',sans-serif" },
  statsBanner: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 12, background: "var(--footer-stats-banner-bg)", borderBottom: "1px solid var(--footer-border)", padding: "24px 32px" },
  stat: { textAlign: "center", padding: "4px 16px" },
  statV: { fontSize: 26, fontWeight: 900, color: "var(--primary-color)" },
  statL: { fontSize: 12, color: "var(--footer-stat-label-color)" },
  main: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, padding: "48px 32px 32px" },
  col: { display: "flex", flexDirection: "column" },
  logoWrap: { display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 14 },
  logoTxt: { fontSize: 22, fontWeight: 900, color: "#fff" },
  tagline: { color: "#666", fontSize: 13, lineHeight: 1.7, marginBottom: 20 },
  social: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" },
  socialBtn: { width: 38, height: 38, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, textDecoration: "none" },
  waBtn: { display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none", width: "fit-content" },
  colTitle: { fontSize: 15, fontWeight: 800, color: "var(--footer-col-title-color)", marginBottom: 16 },
  footerLink: { color: "var(--footer-link-color)", textDecoration: "none", fontSize: 14, marginBottom: 10 },
  couponCard: { background: "#1a1a1a", border: "1px dashed var(--primary-color)", borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column" },
  bottom: { borderTop: "1px solid var(--footer-border)", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },
  smallLink: { color: "var(--footer-small-link-color)", textDecoration: "none", fontSize: 12 },
};