import { Link } from "react-router-dom";
import { locations } from "../data/menuData";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const wa = locations[0].whatsapp;
  const { theme } = useTheme(); // Use theme context to potentially adjust logo or other elements
  return (
    <footer style={s.footer}>
      {/* Stats banner */}
      <div style={s.statsBanner}>
        {[["1M+", "Orders Delivered"], ["4.9⭐", "Avg Rating"], ["30 min", "Avg Delivery"], ["4", "Locations"], ["10+", "Years of Love"]].map(([v, l]) => ( // Keep consistent
          <div key={l} style={s.stat}>
            <div style={s.statV}>{v}</div>
            <div style={s.statL}>{l}</div>
          </div>
        ))}
      </div>

      <div style={s.main}>
        {/* Brand */}
        <div style={s.col}>
          <Link to="/" style={s.logoWrap}>
            <img src={theme === 'dark' ? "/images/logo-dark.png" : "/images/logo-light.png"} alt="logo" style={{ width: 36 }} />
            <span style={s.logoTxt}>Hot<span style={{ color: "var(--primary-color)" }}>Pizza</span></span>
          </Link>
          <p style={s.tagline}>Better food for more people.<br />For over a decade, we've enabled our customers to discover new tastes, delivered right to their doorstep.</p>
          <div style={s.social}>
            {[
              { icon: "📘", label: "Facebook", href: "https://facebook.com" },
              { icon: "📸", label: "Instagram", href: "https://instagram.com" },
              { icon: "🐦", label: "Twitter", href: "https://twitter.com" },
              { icon: "▶️", label: "YouTube", href: "https://youtube.com" },
            ].map((s_) => (
              <a key={s_.label} href={s_.href} target="_blank" rel="noopener noreferrer" style={s.socialBtn} title={s_.label}>
                {s_.icon}
              </a>
            ))}
          </div>
          <a href={`https://wa.me/${wa}?text=Hi! I'd like to order from HotPizza`} target="_blank" rel="noopener noreferrer" style={s.waBtn}>
            <span style={{ fontSize: 18 }}>💬</span> Chat on WhatsApp
          </a>
        </div>

        {/* Links */}
        <div style={s.col}>
          <h4 style={s.colTitle}>Quick Links</h4>
          {[["Home", "/"], ["Menu", "/menu"], ["About Us", "/about"], ["Contact", "/contact"], ["Track Order", "/checkout"]].map(([l, p]) => (
            <Link key={l} to={p} style={s.footerLink}>{l}</Link>
          ))}
        </div>

        {/* Locations */}
        <div style={s.col}>
          <h4 style={s.colTitle}>Our Locations</h4>
          {locations.map((loc) => (
            <div key={loc.id} style={{ marginBottom: 12 }}>
              <p style={{ fontWeight: 700, color: "#eee", fontSize: 13 }}>📍 {loc.name}</p>
              <p style={{ color: "#777", fontSize: 12, lineHeight: 1.5 }}>{loc.address}</p>
              <a href={`https://wa.me/${loc.whatsapp}?text=Hi HotPizza ${loc.name}!`} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontSize: 12, fontWeight: 600 }}>WhatsApp →</a>
            </div>
          ))}
        </div>

        {/* App Download */}
        <div style={s.col}>
          <h4 style={s.colTitle}>Download the App Now!</h4>
          <p style={{ color: "var(--card-desc-color)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>Experience seamless online ordering only on the HotPizza app. Exclusive app-only deals!</p>
          <div style={s.qrBox}>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://hotpizza.app&color=FF6B00&bgcolor=141414" alt="QR Code" style={{ width: 90, height: 90, borderRadius: 8 }} />
            <div>
              <p style={{ color: "#aaa", fontSize: 11, marginBottom: 8 }}>Scan to Download</p>
              <a href="#" style={s.appBtn}>🍎 App Store</a>
              <a href="#" style={{ ...s.appBtn, marginTop: 6 }}>🤖 Google Play</a>
            </div>
          </div>
        </div>
      </div>

      <div style={s.bottom}> {/* Keep consistent */}
        <p style={{ color: "var(--footer-bottom-text-color)", fontSize: 13 }}>© 2026 HotPizza. All rights reserved. Made with ❤️ & 🍕 in Bengaluru</p>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" style={s.smallLink}>Privacy Policy</a>
          <a href="#" style={s.smallLink}>Terms of Service</a>
          <a href="#" style={s.smallLink}>Refund Policy</a>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap'); body { background: var(--background-color); color: var(--text-color); }`}</style>
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
  logoWrap: { display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 14 },
  logoTxt: { fontSize: 22, fontWeight: 900, color: "#fff" },
  tagline: { color: "#777", fontSize: 13, lineHeight: 1.7, marginBottom: 20 },
  social: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" },
  socialBtn: { width: 38, height: 38, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, textDecoration: "none" },
  waBtn: { display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "var(--button-primary-text)", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 13, textDecoration: "none", width: "fit-content" },
  colTitle: { fontSize: 15, fontWeight: 800, color: "var(--footer-col-title-color)", marginBottom: 16, letterSpacing: 0.5 },
  footerLink: { color: "var(--footer-link-color)", textDecoration: "none", fontSize: 14, marginBottom: 10, transition: "color .2s" },
  qrBox: { display: "flex", gap: 14, alignItems: "flex-start", background: "var(--footer-qr-box-bg)", border: "1px solid var(--footer-qr-box-border)", borderRadius: 12, padding: 14 },
  appBtn: { display: "block", background: "var(--footer-app-btn-bg)", border: "1px solid var(--footer-app-btn-border)", color: "var(--footer-app-btn-text)", borderRadius: 8, padding: "8px 12px", fontSize: 12, textDecoration: "none", fontWeight: 600 },
  bottom: { borderTop: "1px solid var(--footer-border)", padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 },
  smallLink: { color: "var(--footer-small-link-color)", textDecoration: "none", fontSize: 12 },
};
