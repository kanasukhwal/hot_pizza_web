import { useState, useEffect, useRef } from "react";
import { locations } from "../data/menuData.js";

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const About = () => {
  const [selectedId, setSelectedId] = useState(locations[0].id);
  const [heroRef, heroIn] = useInView();
  const [whyRef, whyIn] = useInView();
  const selected = locations.find((l) => l.id === selectedId);

  return (
    <div style={{ background: "var(--background-color)", color: "var(--text-color)", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>
      <style>{css}</style>

      <section ref={heroRef} className={`about-header ${heroIn ? "fade-in" : ""}`}>
        <h1 className="about-title">About <span className="acc">Hot Pizza</span></h1>
        <p className="about-sub">
          Proudly serving Rajasthan since 2014. Four locations, one passion — the best vegetarian pizza in the region.
        </p>
        <div className="about-stats">
          {[["10+", "Years"], ["4", "Cities"], ["1M+", "Orders"], ["4.9⭐", "Rating"]].map(([v, l]) => (
            <div key={l} className="about-stat">
              <span className="about-stat-v">{v}</span>
              <span className="about-stat-l">{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="loc-selector-sec">
        <h2 className="sec-title">Choose a <span className="acc">Location</span></h2>
        <div className="loc-tabs">
          {locations.map((loc) => (
            <button
              key={loc.id}
              className={`loc-tab ${selectedId === loc.id ? "loc-tab-active" : ""}`}
              onClick={() => setSelectedId(loc.id)}
              style={selectedId === loc.id ? { borderColor: loc.color, background: loc.color + "1a" } : {}}
            >
              <span className="loc-tab-emoji">{loc.emoji}</span>
              <span className="loc-tab-name">{loc.name}</span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section className="loc-detail-sec" key={selected.id}>
          <div className="loc-detail-card animate-in">
            <div className="loc-detail-top">
              <div className="loc-detail-left">
                <div className="loc-detail-emoji">{selected.emoji}</div>
                <h2 className="loc-detail-name" style={{ color: selected.color }}>{selected.name}</h2>
                <p className="loc-detail-about">{selected.about}</p>
                <div className="loc-info-grid">
                  <div className="loc-info-item">
                    <span className="loc-info-icon">📍</span>
                    <div><strong>Address</strong><p>{selected.address}</p></div>
                  </div>
                  <div className="loc-info-item">
                    <span className="loc-info-icon">🕐</span>
                    <div><strong>Hours</strong><p>{selected.hours}</p></div>
                  </div>
                  <div className="loc-info-item">
                    <span className="loc-info-icon">💰</span>
                    <div><strong>Price Range</strong><p>{selected.priceRange}</p></div>
                  </div>
                  <div className="loc-info-item">
                    <span className="loc-info-icon">⭐</span>
                    <div><strong>Specialties</strong><p>{selected.specialties}</p></div>
                  </div>
                  <div className="loc-info-item">
                    <span className="loc-info-icon">📞</span>
                    <div>
                      <strong>Phone</strong>
                      <a href={`tel:${selected.phone}`} style={{ color: "var(--primary-color)", fontWeight: 700 }}>{selected.phone}</a>
                    </div>
                  </div>
                  <div className="loc-info-item">
                    <span className="loc-info-icon">✉️</span>
                    <div>
                      <strong>Email</strong>
                      <a href={`mailto:${selected.email}`} style={{ color: "var(--primary-color)", fontWeight: 700 }}>{selected.email}</a>
                    </div>
                  </div>
                </div>
                <div className="loc-cta">
                  <a href={`https://wa.me/${selected.whatsapp}?text=Hi! I'd like to order from HotPizza ${selected.name}`}
                    target="_blank" rel="noopener noreferrer" className="wa-cta-btn">
                    💬 WhatsApp Order
                  </a>
                  <a href={`tel:${selected.phone}`} className="call-btn">📞 Call Now</a>
                </div>
              </div>

              <div className="loc-detail-right">
                <div className="loc-menu-box">
                  <h3 className="loc-menu-title">Popular Items</h3>
                  <div className="loc-menu-list">
                    {(selected.menu || []).map((item, i) => (
                      <div key={i} className="loc-menu-row">
                        <span className="loc-menu-name">{item.name}</span>
                        <span className="loc-menu-price">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="loc-map-wrap">
              <h3 className="loc-map-title">Find Us on the Map</h3>
              <div className="loc-map-frame">
                <iframe
                  title={`Map - ${selected.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(selected.address)}&output=embed&z=15`}
                  width="100%"
                  height="380"
                  style={{ border: 0, borderRadius: 14, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
              <div className="loc-map-actions">
                <a href={selected.mapLink} target="_blank" rel="noopener noreferrer" className="map-action-btn">
                  🗺️ Open in Google Maps
                </a>
                <a href={`https://wa.me/${selected.whatsapp}?text=Hi! I need directions to HotPizza ${selected.name}`}
                  target="_blank" rel="noopener noreferrer" className="wa-dir-btn">
                  💬 Get Directions via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="all-locs-sec">
        <h2 className="sec-title">All <span className="acc">4 Locations</span></h2>
        <div className="all-locs-grid">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className={`all-loc-card ${selectedId === loc.id ? "all-loc-active" : ""}`}
              onClick={() => setSelectedId(loc.id)}
              style={selectedId === loc.id ? { borderColor: loc.color } : {}}
            >
              <div className="all-loc-emoji">{loc.emoji}</div>
              <h3 className="all-loc-name" style={{ color: selectedId === loc.id ? loc.color : "var(--card-text-color)" }}>{loc.name}</h3>
              <p className="all-loc-addr">{loc.address}</p>
              <div className="all-loc-meta">
                <span>🕐 {loc.hours}</span>
                <span>💰 {loc.priceRange}</span>
              </div>
              <div className="all-loc-contacts">
                <a href={`https://wa.me/${loc.whatsapp}`} target="_blank" rel="noopener noreferrer" className="all-loc-wa" onClick={e => e.stopPropagation()}>
                  💬 WhatsApp
                </a>
                <a href={`tel:${loc.phone}`} className="all-loc-call" onClick={e => e.stopPropagation()}>
                  📞 Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={whyRef} className={`why-sec ${whyIn ? "fade-in" : ""}`}>
        <h2 className="sec-title">Why Choose <span className="acc">Hot Pizza</span>?</h2>
        <div className="why-grid">
          {[
            { icon: "🔥", title: "Fresh & Hot", desc: "Always served blazing hot straight from our ovens" },
            { icon: "⚡", title: "Fast Delivery", desc: "30-minute delivery guarantee or your next order is free" },
            { icon: "🎯", title: "Quality Ingredients", desc: "Premium toppings and fresh cheese in every single bite" },
            { icon: "💚", title: "24/7 Support", desc: "Available 24/7 to fulfill your pizza cravings anytime" },
            { icon: "🎟️", title: "Best Deals", desc: "Exclusive coupons and offers for our loyal customers" },
            { icon: "🌿", title: "100% Vegetarian", desc: "Proudly serving only pure vegetarian food since day one" },
          ].map((f, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{f.icon}</div>
              <h4 className="why-title">{f.title}</h4>
              <p className="why-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;

const css = `
.acc { color: var(--primary-color); }
.about-header {
  text-align: center; padding: 80px 48px 60px;
  background: linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,107,0,0.03));
  opacity: 0; transition: all 0.8s ease;
}
.about-header.fade-in { opacity: 1; }
.about-title { font-size: 54px; font-weight: 900; margin-bottom: 16px; letter-spacing: -1px; color: var(--text-color); }
.about-sub { font-size: 17px; color: var(--card-desc-color); max-width: 600px; margin: 0 auto 32px; line-height: 1.7; }
.about-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
.about-stat { text-align: center; }
.about-stat-v { font-size: 30px; font-weight: 900; color: var(--primary-color); display: block; }
.about-stat-l { font-size: 13px; color: var(--card-desc-color); font-weight: 600; }
.loc-selector-sec { padding: 56px 48px 32px; text-align: center; }
.sec-title { font-size: 38px; font-weight: 900; margin-bottom: 32px; color: var(--text-color); }
.loc-tabs { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
.loc-tab {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: var(--card-background); border: 2px solid var(--card-border);
  border-radius: 16px; padding: 16px 24px; min-width: 120px;
  font-family: 'Nunito', sans-serif; transition: all 0.3s;
}
.loc-tab:hover { border-color: var(--primary-color); transform: translateY(-4px); }
.loc-tab-active { box-shadow: 0 8px 24px rgba(255,107,0,0.2); transform: translateY(-4px); }
.loc-tab-emoji { font-size: 28px; }
.loc-tab-name { font-weight: 800; font-size: 14px; color: var(--card-text-color); }
.loc-detail-sec { padding: 0 48px 48px; }
.loc-detail-card {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 24px; padding: 36px; overflow: hidden;
}
.animate-in { animation: slideUp 0.6s ease forwards; }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.loc-detail-top { display: grid; grid-template-columns: 1fr 380px; gap: 32px; margin-bottom: 32px; }
.loc-detail-emoji { font-size: 56px; margin-bottom: 8px; }
.loc-detail-name { font-size: 36px; font-weight: 900; margin-bottom: 14px; }
.loc-detail-about { font-size: 14px; line-height: 1.8; color: var(--card-desc-color); margin-bottom: 24px; }
.loc-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
.loc-info-item { display: flex; gap: 12px; align-items: flex-start; background: var(--section-background-alt); border-radius: 12px; padding: 14px; border: 1px solid var(--card-border); }
.loc-info-icon { font-size: 22px; flex-shrink: 0; }
.loc-info-item strong { display: block; font-size: 12px; font-weight: 800; color: var(--primary-color); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.loc-info-item p, .loc-info-item a { font-size: 13px; color: var(--card-desc-color); line-height: 1.5; }
.loc-cta { display: flex; gap: 12px; flex-wrap: wrap; }
.wa-cta-btn { background: #25D366; color: #fff; border-radius: 12px; padding: 12px 20px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.call-btn { background: var(--primary-color); color: #fff; border-radius: 12px; padding: 12px 20px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
.loc-menu-box { background: var(--section-background-alt); border: 1px solid var(--card-border); border-radius: 18px; padding: 24px; height: fit-content; }
.loc-menu-title { font-size: 20px; font-weight: 800; color: var(--card-text-color); margin-bottom: 16px; }
.loc-menu-list { display: flex; flex-direction: column; gap: 10px; }
.loc-menu-row { display: flex; justify-content: space-between; align-items: center; background: var(--card-background); border-radius: 10px; padding: 12px 16px; border: 1px solid var(--card-border); }
.loc-menu-name { font-weight: 600; font-size: 14px; color: var(--card-text-color); }
.loc-menu-price { font-weight: 900; font-size: 16px; color: var(--primary-color); }
.loc-map-wrap { border-top: 1px solid var(--card-border); padding-top: 28px; }
.loc-map-title { font-size: 22px; font-weight: 800; color: var(--card-text-color); margin-bottom: 16px; }
.loc-map-frame { border-radius: 14px; overflow: hidden; margin-bottom: 14px; }
.loc-map-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.map-action-btn { background: var(--primary-color); color: #fff; border-radius: 10px; padding: 10px 18px; font-size: 13px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.wa-dir-btn { background: #25D366; color: #fff; border-radius: 10px; padding: 10px 18px; font-size: 13px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
.all-locs-sec { padding: 48px; background: var(--section-background-alt); }
.all-locs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.all-loc-card { background: var(--card-background); border: 2px solid var(--card-border); border-radius: 18px; padding: 24px; transition: all 0.3s; cursor: pointer; }
.all-loc-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(255,107,0,0.12); border-color: var(--primary-color); }
.all-loc-active { box-shadow: 0 16px 40px rgba(255,107,0,0.15); transform: translateY(-4px); }
.all-loc-emoji { font-size: 40px; margin-bottom: 10px; }
.all-loc-name { font-size: 20px; font-weight: 900; margin-bottom: 8px; }
.all-loc-addr { font-size: 13px; color: var(--card-desc-color); line-height: 1.6; margin-bottom: 12px; }
.all-loc-meta { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
.all-loc-meta span { font-size: 12px; color: var(--card-desc-color); }
.all-loc-contacts { display: flex; gap: 10px; }
.all-loc-wa { flex: 1; background: #25D366; color: #fff; border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 700; text-decoration: none; text-align: center; }
.all-loc-call { flex: 1; background: var(--primary-color); color: #fff; border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 700; text-decoration: none; text-align: center; }
.why-sec { padding: 64px 48px; background: linear-gradient(135deg, rgba(255,107,0,0.06), transparent); opacity: 0; transition: all 0.8s ease; }
.why-sec.fade-in { opacity: 1; }
.why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
.why-card { background: var(--card-background); border: 1px solid var(--card-border); border-radius: 18px; padding: 28px; text-align: center; transition: all 0.3s; }
.why-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(255,107,0,0.12); }
.why-icon { font-size: 44px; margin-bottom: 14px; }
.why-title { font-size: 18px; font-weight: 800; color: var(--card-text-color); margin-bottom: 10px; }
.why-desc { font-size: 14px; color: var(--card-desc-color); line-height: 1.7; }
.fade-in { opacity: 1 !important; }
@media (max-width: 1024px) {
  .about-header, .loc-selector-sec, .all-locs-sec, .why-sec { padding-left: 32px; padding-right: 32px; }
  .loc-detail-sec { padding: 0 32px 40px; }
  .loc-detail-top { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .about-title { font-size: 36px; }
  .sec-title { font-size: 28px; }
  .about-header { padding: 56px 20px 40px; }
  .loc-selector-sec, .all-locs-sec, .why-sec { padding: 40px 20px; }
  .loc-detail-sec { padding: 0 20px 32px; }
  .loc-detail-card { padding: 20px; }
  .loc-detail-name { font-size: 28px; }
  .loc-info-grid { grid-template-columns: 1fr; }
  .all-locs-grid { grid-template-columns: 1fr 1fr; }
  .why-grid { grid-template-columns: 1fr 1fr; }
  .loc-tabs { gap: 10px; }
  .loc-tab { min-width: 90px; padding: 12px 16px; }
}
@media (max-width: 480px) {
  .about-title { font-size: 28px; }
  .about-stats { gap: 20px; }
  .all-locs-grid { grid-template-columns: 1fr; }
  .why-grid { grid-template-columns: 1fr; }
  .loc-detail-top { grid-template-columns: 1fr; }
  .loc-map-actions { flex-direction: column; }
  .loc-cta { flex-direction: column; }
}
`;