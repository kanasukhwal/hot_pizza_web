import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { menuData } from "../data/menuData.js";
import { locations } from "../data/menuData.js";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

// Category tabs
const CATEGORIES = [
    { key: "pizza", label: "🍕 Pizza" },
    { key: "sandwich", label: "🥪 Sandwich" },
    { key: "burger", label: "🍔 Burger" },
    { key: "shakes", label: "🥤 Shakes" },
    { key: "coffee", label: "☕ Coffee" },
    { key: "garlic_bread", label: "🥖 Garlic Bread" },
];

export default function Home() {
    const [visible, setVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState("pizza");
    const { addToCart, setSelectedLocation, selectedLocation, cart, updateQty } = useCart();
    const [heroRef, heroIn] = useInView(0.1);
    const [menuRef, menuIn] = useInView(0.1);
    const [howRef, howIn] = useInView(0.1);
    const [reviewRef, reviewIn] = useInView(0.1);

    useEffect(() => {
        setTimeout(() => setVisible(true), 80);
    }, []);

    const getCartItem = (id) => cart.find((i) => i.id === id);

    const handleAdd = (item) => addToCart(item);
    const handleInc = (id) => updateQty(id, 1);
    const handleDec = (id) => updateQty(id, -1);

    const currentItems = menuData[activeCategory] || [];

    const steps = [
        { icon: "📍", num: "01", title: "Choose Location", desc: "Select from our 4 Rajasthan locations" },
        { icon: "🍕", num: "02", title: "Pick Your Pizza", desc: "Browse our full delicious menu" },
        { icon: "🎟️", num: "03", title: "Apply Coupon", desc: "Get up to 40% off with our deals" },
        { icon: "🚀", num: "04", title: "Fast Delivery", desc: "Hot at your door in 30 minutes" },
    ];

    const reviews = [
        { name: "Ananya S.", stars: 5, text: "Best pizza in Rajasthan! Crispy crust, loads of toppings. Always on time!", avatar: "A" },
        { name: "Rahul M.", stars: 5, text: "The Cheese Burst is absolutely insane. Hot, cheesy, perfect every time.", avatar: "R" },
        { name: "Priya K.", stars: 4, text: "Love the paneer tikka pizza! Fast delivery and amazing flavors. 10/10!", avatar: "P" },
        { name: "Deepak J.", stars: 5, text: "Ordered from Udaipur location, delivered in 25 minutes! Freshest pizza.", avatar: "D" },
    ];

    return (
        <div style={{ background: "var(--background-color)", color: "var(--text-color)", minHeight: "100vh" }}>
            <style>{css}</style>

            {/* ───── LOCATION PICKER ───── */}
            <div className="loc-bar">
                <span className="loc-label">📍 Deliver to:</span>
                <select
                    className="loc-select"
                    value={selectedLocation?.id || ""}
                    onChange={(e) => {
                        const found = locations.find((l) => l.id === e.target.value);
                        setSelectedLocation(found || null);
                    }}
                >
                    <option value="">-- Select Location --</option>
                    {locations.map((l) => (
                        <option key={l.id} value={l.id}>{l.emoji} {l.name}</option>
                    ))}
                </select>
                {selectedLocation && (
                    <span className="loc-badge">✅ {selectedLocation.name}</span>
                )}
            </div>

            {/* ───── SELECTED LOCATION CARD (only 1 at a time) ───── */}
            {selectedLocation && (
                <section className="sel-loc-section animate-in" key={selectedLocation.id}>
                    <div className="sel-loc-card">
                        <div className="sel-loc-top">
                            <div>
                                <p className="sel-loc-pre">Your Selected Branch</p>
                                <h2 className="sel-loc-name">{selectedLocation.emoji} {selectedLocation.name}</h2>
                                <p className="sel-loc-about">{selectedLocation.about}</p>
                            </div>
                            <div className="sel-loc-meta">
                                <div className="sel-loc-meta-row"><span>📍</span><span>{selectedLocation.address}</span></div>
                                <div className="sel-loc-meta-row"><span>🕐</span><span>{selectedLocation.hours}</span></div>
                                <div className="sel-loc-meta-row"><span>💰</span><span>{selectedLocation.priceRange}</span></div>
                                <div className="sel-loc-meta-row"><span>⭐</span><span>{selectedLocation.specialties}</span></div>
                                <div className="sel-loc-meta-row">
                                    <span>📞</span>
                                    <a href={`tel:${selectedLocation.phone}`} style={{ color: "var(--primary-color)", fontWeight: 700 }}>{selectedLocation.phone}</a>
                                </div>
                            </div>
                        </div>

                        {/* Mini menu */}
                        <div className="sel-loc-menu">
                            <h3 className="sel-loc-menu-title">Popular at {selectedLocation.name}</h3>
                            <div className="sel-loc-menu-grid">
                                {selectedLocation.menu.map((item, idx) => (
                                    <div key={idx} className="sel-loc-menu-item">
                                        <span>{item.name}</span>
                                        <span style={{ color: "var(--primary-color)", fontWeight: 800 }}>₹{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Real Map via Google Maps Embed */}
                        <div className="sel-loc-map">
                            <iframe
                                title={`Map - ${selectedLocation.name}`}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation.address)}&output=embed&z=15`}
                                width="100%"
                                height="260"
                                style={{ border: 0, borderRadius: 14, display: "block" }}
                                allowFullScreen=""
                                loading="lazy"
                            />
                            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                                <a href={selectedLocation.mapLink} target="_blank" rel="noopener noreferrer" className="map-open-btn">
                                    🗺️ Open in Google Maps
                                </a>
                                <a href={`https://wa.me/${selectedLocation.whatsapp}?text=Hi! I'd like to order from HotPizza ${selectedLocation.name}`}
                                    target="_blank" rel="noopener noreferrer" className="wa-open-btn">
                                    💬 WhatsApp Order
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ───── HERO ───── */}
            <section
                ref={heroRef}
                className={`hero ${heroIn ? "hero-visible" : ""}`}
            >
                <div className="hero-left">
                    <div className="hero-badge">🔥 Fast Delivery in 30 Minutes</div>
                    <h1 className="hero-title">
                        Craving <span className="accent">Hot Pizza</span>?<br />
                        We Got You Covered!
                    </h1>
                    <p className="hero-desc">
                        Freshly baked, loaded with toppings, delivered blazing hot to your doorstep.
                        Serving Chittorgarh, Nimbahera, Bhilwara & Udaipur!
                    </p>
                    <div className="hero-actions">
                        <Link to="/menu" className="btn-primary">Order Now →</Link>
                        <Link to="/about" className="btn-ghost">Our Locations</Link>
                    </div>
                    <div className="stats-row">
                        {[["1M+", "Orders"], ["4.9⭐", "Rating"], ["30 min", "Delivery"], ["4", "Cities"]].map(([v, l]) => (
                            <div key={l} className="stat-chip">
                                <span className="stat-v">{v}</span>
                                <span className="stat-l">{l}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero-right">
                    <div className="pizza-stage">
                        <div className="ring ring-lg" />
                        <div className="ring ring-sm" />
                        <div className="pizza-center">
                            <span style={{ fontSize: 120, display: "block", animation: "floatPizza 4s ease-in-out infinite" }}>🍕</span>
                        </div>
                        <div className="float-card float-card-1">⚡ Delivered in 30 min</div>
                        <div className="float-card float-card-2">🧀 Fresh Ingredients</div>
                    </div>
                </div>
            </section>

            {/* ───── MENU SECTION ───── */}
            <section ref={menuRef} className={`menu-section ${menuIn ? "animate-in" : ""}`}>
                <div className="section-header">
                    <span className="section-tag">🍽️ Our Menu</span>
                    <h2 className="section-title">Delicious <span className="accent">Items</span></h2>
                    <p className="section-sub">100% vegetarian. Made fresh. Every single day.</p>
                </div>

                {/* Category Tabs */}
                <div className="cat-tabs">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            className={`cat-tab ${activeCategory === cat.key ? "cat-tab-active" : ""}`}
                            onClick={() => setActiveCategory(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="food-grid">
                    {currentItems.map((item) => {
                        const cartItem = getCartItem(item.id);
                        return (
                            <div key={item.id} className="food-card">
                                <div className="food-card-img">
                                    <span style={{ fontSize: 72 }}>{item.emoji}</span>
                                    <span className="food-tag">{item.tag}</span>
                                </div>
                                <div className="food-body">
                                    <h3 className="food-name">{item.name}</h3>
                                    <p className="food-desc">{item.desc}</p>
                                    <p className="food-cal">{item.cal}</p>
                                    <div className="food-footer">
                                        <span className="food-price">{item.price}</span>
                                        {cartItem ? (
                                            <div className="qty-ctrl">
                                                <button className="qty-btn" onClick={() => handleDec(item.id)}>−</button>
                                                <span className="qty-num">{cartItem.qty}</span>
                                                <button className="qty-btn" onClick={() => handleInc(item.id)}>+</button>
                                            </div>
                                        ) : (
                                            <button className="add-btn" onClick={() => handleAdd(item)}>+ Add</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: "center", marginTop: 40 }}>
                    <Link to="/menu" className="btn-primary">View Full Menu →</Link>
                </div>
            </section>

            {/* ───── HOW IT WORKS ───── */}
            <section ref={howRef} className={`how-section ${howIn ? "animate-in" : ""}`}>
                <div className="section-header">
                    <span className="section-tag">⚡ How It Works</span>
                    <h2 className="section-title">Order in <span className="accent">4 Easy Steps</span></h2>
                </div>
                <div className="steps-grid">
                    {steps.map((step, i) => (
                        <div key={i} className="step-card" style={{ animationDelay: `${i * 0.1}s` }}>
                            <div className="step-num">{step.num}</div>
                            <div className="step-icon">{step.icon}</div>
                            <h4 className="step-title">{step.title}</h4>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ───── PROMO BANNER ───── */}
            <section className="promo-wrap">
                <div className="promo-banner">
                    <div className="promo-left">
                        <h2 className="promo-title">Get 30% OFF on Your First Order! 🎉</h2>
                        <p className="promo-sub">Use code <span className="promo-code">HOTPIZZA</span> at checkout</p>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
                            <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700 }}>PIZZA40 — 40% OFF</span>
                            <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700 }}>SPICY20 — 20% OFF</span>
                        </div>
                        <Link to="/menu" className="promo-btn" style={{ marginTop: 20, display: "inline-block" }}>Order Now →</Link>
                    </div>
                    <div className="promo-emoji">🍕</div>
                </div>
            </section>

            {/* ───── REVIEWS ───── */}
            <section ref={reviewRef} className={`reviews-section ${reviewIn ? "animate-in" : ""}`}>
                <div className="section-header">
                    <span className="section-tag">💬 Reviews</span>
                    <h2 className="section-title">What Our <span className="accent">Customers</span> Say</h2>
                </div>
                <div className="reviews-grid">
                    {reviews.map((r, i) => (
                        <div key={i} className="review-card">
                            <div className="review-stars">{"⭐".repeat(r.stars)}</div>
                            <p className="review-text">"{r.text}"</p>
                            <div className="review-author">
                                <div className="review-avatar">{r.avatar}</div>
                                <span className="review-name">{r.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

const css = `
/* Location bar */
.loc-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  background: var(--loc-bar-bg);
  border-bottom: 1px solid var(--loc-bar-border);
  flex-wrap: wrap;
  font-family: 'Nunito', sans-serif;
}
.loc-label { font-weight: 700; font-size: 14px; color: var(--text-color); white-space: nowrap; }
.loc-select {
  background: var(--loc-select-bg);
  border: 2px solid var(--loc-select-border);
  color: var(--loc-select-text);
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  outline: none;
  min-width: 200px;
}
.loc-badge {
  background: rgba(34,197,94,0.15);
  color: #22c55e;
  border: 1px solid #22c55e;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 700;
}

/* Selected location section */
.sel-loc-section {
  padding: 24px 24px 0;
}
.sel-loc-card {
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  overflow: hidden;
  padding: 28px;
}
.sel-loc-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}
.sel-loc-pre { font-size: 12px; font-weight: 700; color: var(--primary-color); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 6px; }
.sel-loc-name { font-size: 30px; font-weight: 900; color: var(--text-color); margin-bottom: 10px; }
.sel-loc-about { font-size: 14px; color: var(--card-desc-color); line-height: 1.7; }
.sel-loc-meta { display: flex; flex-direction: column; gap: 10px; }
.sel-loc-meta-row { display: flex; gap: 10px; font-size: 13px; color: var(--card-desc-color); align-items: flex-start; }
.sel-loc-meta-row span:first-child { flex-shrink: 0; width: 20px; }

.sel-loc-menu { border-top: 1px solid var(--card-border); padding-top: 20px; margin-bottom: 24px; }
.sel-loc-menu-title { font-size: 18px; font-weight: 800; color: var(--text-color); margin-bottom: 14px; }
.sel-loc-menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.sel-loc-menu-item {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--section-background-alt); border-radius: 10px;
  padding: 10px 14px; font-size: 13px; font-weight: 600;
  color: var(--card-text-color); border: 1px solid var(--card-border);
}

.sel-loc-map { border-top: 1px solid var(--card-border); padding-top: 20px; }
.map-open-btn {
  background: var(--primary-color); color: #fff; border-radius: 10px;
  padding: 9px 16px; font-size: 13px; font-weight: 700;
  text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
}
.wa-open-btn {
  background: #25D366; color: #fff; border-radius: 10px;
  padding: 9px 16px; font-size: 13px; font-weight: 700;
  text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
}

/* Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 48px;
  min-height: 520px;
  gap: 40px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.9s cubic-bezier(.4,0,.2,1);
  font-family: 'Nunito', sans-serif;
}
.hero-visible { opacity: 1; transform: translateY(0); }
.hero-left { flex: 1; max-width: 560px; }
.hero-badge {
  display: inline-block; background: rgba(255,107,0,0.15);
  color: var(--primary-color); border: 1px solid rgba(255,107,0,0.3);
  border-radius: 30px; padding: 8px 18px; font-size: 13px; font-weight: 700;
  margin-bottom: 20px; letter-spacing: 0.5px;
}
.hero-title {
  font-size: 52px; font-weight: 900; line-height: 1.15;
  color: var(--text-color); margin-bottom: 18px; letter-spacing: -1px;
}
.accent { color: var(--primary-color); }
.hero-desc {
  font-size: 17px; color: var(--card-desc-color); line-height: 1.7;
  margin-bottom: 28px; max-width: 480px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 32px; }
.btn-primary {
  background: var(--primary-color); color: #fff; border: none; border-radius: 12px;
  padding: 14px 28px; font-weight: 800; font-size: 16px; text-decoration: none;
  transition: background 0.2s, transform 0.15s; display: inline-block;
  font-family: 'Nunito', sans-serif;
}
.btn-primary:hover { background: var(--secondary-color); transform: translateY(-2px); color: #fff; }
.btn-ghost {
  background: transparent; color: var(--text-color); border: 2px solid var(--button-ghost-border);
  border-radius: 12px; padding: 12px 24px; font-weight: 700; font-size: 15px;
  text-decoration: none; display: inline-block; transition: all 0.2s;
  font-family: 'Nunito', sans-serif;
}
.btn-ghost:hover { border-color: var(--primary-color); color: var(--primary-color); }

.stats-row { display: flex; gap: 20px; flex-wrap: wrap; }
.stat-chip { display: flex; flex-direction: column; align-items: center; }
.stat-v { font-size: 22px; font-weight: 900; color: var(--primary-color); }
.stat-l { font-size: 12px; color: var(--card-desc-color); font-weight: 600; }

/* Hero right */
.hero-right { flex-shrink: 0; display: flex; justify-content: center; }
.pizza-stage {
  position: relative; width: 400px; height: 400px;
  display: flex; align-items: center; justify-content: center;
}
.ring {
  position: absolute; border-radius: 50%;
  border: 2px solid rgba(255,107,0,0.2);
}
.ring-lg { width: 360px; height: 360px; }
.ring-sm { width: 270px; height: 270px; }
.pizza-center { position: relative; z-index: 2; }
.float-card {
  position: absolute; border-radius: 14px; padding: 10px 16px;
  font-size: 13px; display: flex; gap: 8px; align-items: center;
  white-space: nowrap; font-weight: 700; z-index: 3;
}
.float-card-1 {
  top: 10%; right: -10px; background: var(--card-background);
  border: 1px solid var(--card-border); color: var(--card-text-color);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  animation: floatPizza 3s ease-in-out infinite 0.5s;
}
.float-card-2 {
  bottom: 10%; left: -10px; background: var(--primary-color); color: #fff;
  box-shadow: 0 8px 24px rgba(255,107,0,0.4);
  animation: floatPizza 3.5s ease-in-out infinite 1s;
}

/* Menu section */
.menu-section {
  padding: 64px 48px;
  background: var(--background-color);
}
.section-header { text-align: center; margin-bottom: 36px; }
.section-tag { color: var(--primary-color); font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 10px; }
.section-title { font-size: 40px; font-weight: 900; letter-spacing: -0.5px; color: var(--text-color); margin-bottom: 8px; }
.section-sub { font-size: 15px; color: var(--card-desc-color); }

/* Category tabs */
.cat-tabs {
  display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 36px;
}
.cat-tab {
  background: var(--cat-chip-bg); border: 2px solid var(--cat-chip-border);
  color: var(--cat-chip-text); border-radius: 50px; padding: 10px 22px;
  font-size: 14px; font-weight: 700; font-family: 'Nunito', sans-serif;
  transition: all 0.2s;
}
.cat-tab:hover { border-color: var(--primary-color); color: var(--primary-color); }
.cat-tab-active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }

/* Food grid */
.food-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px;
}
.food-card {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 18px; overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
}
.food-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(255,107,0,0.15); }
.food-card-img {
  background: linear-gradient(135deg, var(--section-background-alt), rgba(255,107,0,0.08));
  height: 160px; display: flex; align-items: center; justify-content: center;
  position: relative;
}
.food-tag {
  position: absolute; top: 10px; right: 10px; background: var(--primary-color);
  color: #fff; border-radius: 6px; padding: 3px 9px; font-size: 11px; font-weight: 700;
}
.food-body { padding: 14px 16px 16px; }
.food-name { font-size: 16px; font-weight: 800; color: var(--card-text-color); margin-bottom: 5px; }
.food-desc { color: var(--card-desc-color); font-size: 13px; line-height: 1.5; margin-bottom: 5px; }
.food-cal { color: var(--card-cal-color); font-size: 12px; margin-bottom: 12px; }
.food-footer { display: flex; justify-content: space-between; align-items: center; }
.food-price { font-size: 20px; font-weight: 900; color: var(--primary-color); }
.add-btn {
  background: var(--primary-color); color: #fff; border: none; border-radius: 10px;
  padding: 8px 18px; font-weight: 700; font-size: 14px; font-family: 'Nunito', sans-serif;
  transition: background 0.2s, transform 0.15s;
}
.add-btn:hover { background: var(--secondary-color); transform: scale(1.05); }
.qty-ctrl {
  display: flex; align-items: center; gap: 6px;
  background: var(--section-background-alt); border-radius: 10px;
  border: 2px solid var(--primary-color); padding: 2px 4px;
}
.qty-btn {
  width: 30px; height: 30px; border-radius: 8px; background: var(--primary-color);
  border: none; color: #fff; font-size: 18px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Nunito', sans-serif; transition: background 0.2s;
}
.qty-btn:hover { background: var(--secondary-color); }
.qty-num { font-weight: 900; font-size: 15px; min-width: 24px; text-align: center; color: var(--text-color); }

/* How it works */
.how-section {
  padding: 64px 48px;
  background: var(--section-background-alt);
}
.steps-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px;
}
.step-card {
  text-align: center; padding: 28px 20px;
  background: var(--card-background); border-radius: 18px;
  border: 1px solid var(--card-border); transition: all 0.3s;
}
.step-card:hover { transform: translateY(-8px); box-shadow: 0 16px 40px rgba(255,107,0,0.12); }
.step-num { font-size: 48px; font-weight: 900; color: rgba(255,107,0,0.15); line-height: 1; margin-bottom: 8px; }
.step-icon { font-size: 36px; margin-bottom: 8px; }
.step-title { font-size: 17px; font-weight: 800; color: var(--card-text-color); margin-bottom: 8px; }
.step-desc { font-size: 13px; color: var(--card-desc-color); line-height: 1.6; }

/* Promo */
.promo-wrap { padding: 0 48px 64px; }
.promo-banner {
  background: linear-gradient(135deg, #FF6B00, #cc3d00);
  border-radius: 22px; padding: 56px 48px;
  display: flex; justify-content: space-between; align-items: center;
  color: #fff; position: relative; overflow: hidden; gap: 20px;
}
.promo-left { flex: 1; }
.promo-title { font-size: 34px; font-weight: 900; margin-bottom: 12px; line-height: 1.2; }
.promo-sub { font-size: 16px; color: rgba(255,255,255,0.85); margin-bottom: 8px; }
.promo-code { background: rgba(255,255,255,0.25); padding: 3px 10px; border-radius: 6px; font-weight: 900; }
.promo-btn {
  background: #fff; color: #FF6B00; border-radius: 12px; padding: 12px 28px;
  font-weight: 800; font-size: 15px; text-decoration: none;
  transition: transform 0.2s;
}
.promo-btn:hover { transform: scale(1.05); color: #FF6B00; }
.promo-emoji { font-size: 100px; opacity: 0.25; flex-shrink: 0; }

/* Reviews */
.reviews-section { padding: 64px 48px; background: var(--background-color); }
.reviews-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 22px;
}
.review-card {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 18px; padding: 26px; transition: all 0.25s;
}
.review-card:hover { border-color: rgba(255,107,0,0.4); box-shadow: 0 8px 32px rgba(255,107,0,0.1); }
.review-stars { font-size: 18px; margin-bottom: 14px; }
.review-text { color: var(--review-text-color); font-size: 14px; line-height: 1.7; font-style: italic; margin-bottom: 18px; }
.review-author { display: flex; align-items: center; gap: 12px; }
.review-avatar {
  width: 40px; height: 40px; border-radius: 50%; background: var(--primary-color);
  color: #fff; font-weight: 800; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.review-name { font-weight: 700; font-size: 14px; color: var(--card-text-color); }

/* Animate in */
.animate-in { animation: fadeInUp 0.7s ease forwards; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floatPizza {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-16px) rotate(4deg); }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero { padding: 48px 32px; }
  .hero-title { font-size: 42px; }
  .pizza-stage { width: 320px; height: 320px; }
  .ring-lg { width: 280px; height: 280px; }
  .ring-sm { width: 210px; height: 210px; }
  .menu-section, .how-section, .reviews-section { padding: 48px 32px; }
  .promo-wrap { padding: 0 32px 48px; }
  .sel-loc-section { padding: 20px 32px 0; }
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column; padding: 36px 20px 48px;
    min-height: auto; text-align: center; gap: 36px;
  }
  .hero-left { max-width: 100%; }
  .hero-title { font-size: 34px; }
  .hero-badge, .hero-actions, .stats-row { justify-content: center; }
  .hero-desc { max-width: 100%; }
  .pizza-stage { width: 280px; height: 280px; }
  .ring-lg { width: 230px; height: 230px; }
  .ring-sm { width: 170px; height: 170px; }
  .float-card { font-size: 12px; padding: 8px 12px; }
  .float-card-1 { right: 0; }
  .float-card-2 { left: 0; }
  .sel-loc-top { grid-template-columns: 1fr; }
  .sel-loc-section { padding: 16px 16px 0; }
  .sel-loc-card { padding: 20px; }
  .menu-section, .how-section, .reviews-section { padding: 40px 20px; }
  .section-title { font-size: 30px; }
  .promo-wrap { padding: 0 20px 40px; }
  .promo-banner { flex-direction: column; text-align: center; padding: 36px 24px; }
  .promo-title { font-size: 26px; }
  .promo-emoji { font-size: 60px; }
  .food-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
  .steps-grid { grid-template-columns: 1fr 1fr; }
  .cat-tabs { gap: 8px; }
  .cat-tab { padding: 8px 16px; font-size: 13px; }
  .loc-bar { padding: 10px 16px; gap: 8px; }
  .loc-select { min-width: 160px; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 28px; }
  .btn-primary, .btn-ghost { width: 100%; text-align: center; }
  .stats-row { justify-content: space-around; }
  .food-grid { grid-template-columns: 1fr; }
  .steps-grid { grid-template-columns: 1fr; }
  .reviews-grid { grid-template-columns: 1fr; }
  .sel-loc-menu-grid { grid-template-columns: 1fr; }
  .pizza-stage { width: 240px; height: 240px; }
  .ring-lg { width: 190px; height: 190px; }
  .ring-sm { width: 140px; height: 140px; }
}
`;