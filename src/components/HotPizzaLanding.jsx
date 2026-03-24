import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { menuData } from "../data/menuData.js";
import { locations } from "../data/locations.js";

export default function Home() {
    const [visible, setVisible] = useState(false);
    const [addedId, setAddedId] = useState(null);
    const { theme } = useTheme();
    const [angle, setAngle] = useState(0);
    const { addToCart, setSelectedLocation, selectedLocation } = useCart();

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
        const interval = setInterval(() => setAngle((a) => (a + 0.6) % 360), 30);
        return () => clearInterval(interval);
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 800);
    };

    const steps = [
        { icon: "📍", title: "Choose Location", desc: "Enter your delivery address" },
        { icon: "🍕", title: "Pick Your Pizza", desc: "Browse our delicious menu" },
        { icon: "💳", title: "Quick Payment", desc: "Pay securely in seconds" },
        { icon: "🚀", title: "Fast Delivery", desc: "Hot at your door in 30 min" },
    ];

    const reviews = [
        { name: "Ananya S.", stars: 5, text: "Best pizza in town! Crispy crust, loads of toppings. Always on time!", avatar: "A" },
        { name: "Rahul M.", stars: 5, text: "Pepperoni Feast is absolutely insane. Hot, cheesy, perfect every time.", avatar: "R" },
        { name: "Priya K.", stars: 4, text: "Love the app, love the pizza. Fast delivery and amazing flavors!", avatar: "P" },
    ];

    const selectedItems = [];
    if (menuData.pizza && menuData.pizza.length >= 2) {
        selectedItems.push(menuData.pizza[0]);
        selectedItems.push(menuData.pizza[1]);
    }
    if (menuData.sandwich && menuData.sandwich.length >= 1) {
        selectedItems.push(menuData.sandwich[0]);
    }
    if (menuData.shakes && menuData.shakes.length >= 1) {
        selectedItems.push(menuData.shakes[0]);
    }

    return (
        <>
            <style>{globalCSS}</style>

            {/* LOCATION PICKER */}
            <div className="loc-bar" style={{ background: "var(--background-color)", color: "var(--text-color)" }}>
                <span className="loc-label">📍 Deliver to:</span>
                <select
                    className="loc-select"
                    value={selectedLocation?.id || ""}
                    onChange={(e) =>
                        setSelectedLocation(locations.find((l) => l.id === e.target.value) || null)
                    }
                >
                    <option value="">Select your location</option>
                    {locations.map((l) => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </select>
                {selectedLocation && (
                    <span className="loc-badge">✅ {selectedLocation.name}</span>
                )}
            </div>

            {/* SHOW ONLY SELECTED LOCATION INFO */}
            {selectedLocation && (
                <section className="section" style={{ background: "var(--card-background)", margin: "32px 0", borderRadius: 16, boxShadow: "0 2px 16px #0001" }}>
                    <h2 style={{ color: "var(--primary-color)" }}>{selectedLocation.name}</h2>
                    <p style={{ margin: "8px 0 12px" }}>{selectedLocation.about}</p>
                    <div><b>Address:</b> {selectedLocation.address}</div>
                    <div><b>Specialties:</b> {selectedLocation.specialties}</div>
                    <div><b>Price Range:</b> {selectedLocation.priceRange}</div>
                    <div><b>Hours:</b> {selectedLocation.hours}</div>
                    <h3 style={{ marginTop: 18 }}>Menu</h3>
                    <ul>
                        {selectedLocation.menu.map(item => (
                            <li key={item.id}>{item.name} - ₹{item.price}</li>
                        ))}
                    </ul>
                    <div style={{ marginTop: 16 }}>
                        <iframe
                            src={selectedLocation.map}
                            width="300"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title={selectedLocation.name + " map"}
                        ></iframe>
                    </div>
                </section>
            )}

            {/* HERO */}
            <section
                className="hero"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
                }}
            >
                <div className="hero-left">
                    <div className="hero-badge">🔥 Fast Delivery in 30 Minutes</div>
                    <div className="hero-logo-row">
                        <img
                            src={theme === 'dark' ? "/images/logo-dark.png" : "/images/logo-light.png"}
                            alt="HotPizza Logo"
                            className="hero-logo"
                            onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <h1 className="hero-title">
                            Craving <span className="accent">Hot Pizza</span>?<br />
                            We Got You!
                        </h1>
                    </div>
                    <p className="hero-desc">
                        Freshly baked, loaded with toppings, and delivered blazing hot to your doorstep.
                        The best pizza experience in Bengaluru — now in 4 locations!
                    </p>
                    <div className="hero-actions">
                        <Link to="/menu" className="btn-primary">Order Now →</Link>
                        <Link to="/about" className="btn-ghost">Our Story</Link>
                    </div>
                    <div className="stats-row">
                        {[["50K+", "Happy Customers"], ["4.9★", "Avg Rating"], ["30min", "Delivery Time"]].map(([val, label]) => (
                            <div key={label} className="stat-item">
                                <span className="stat-val">{val}</span>
                                <span className="stat-label">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animated Pizza */}
                <div className="hero-right">
                    <div className="pizza-stage">
                        {[
                            { emoji: "🧀", r: 145, speed: 1.0, offset: 0 },
                            { emoji: "🍅", r: 145, speed: 1.0, offset: 90 },
                            { emoji: "🌿", r: 145, speed: 1.0, offset: 180 },
                            { emoji: "🌶️", r: 145, speed: 1.0, offset: 270 },
                            { emoji: "🍕", r: 205, speed: 0.4, offset: 45 },
                            { emoji: "⭐", r: 205, speed: 0.4, offset: 135 },
                            { emoji: "🔥", r: 205, speed: 0.4, offset: 225 },
                            { emoji: "🍗", r: 205, speed: 0.4, offset: 315 },
                        ].map((item, i) => {
                            const rad = ((angle * item.speed + item.offset) * Math.PI) / 180;
                            return (
                                <div key={i} style={{
                                    position: "absolute", left: "50%", top: "50%",
                                    fontSize: i < 4 ? 26 : 20,
                                    transform: `translate(calc(-50% + ${Math.cos(rad) * item.r}px), calc(-50% + ${Math.sin(rad) * item.r}px))`,
                                    pointerEvents: "none", zIndex: 3,
                                }}>
                                    {item.emoji}
                                </div>
                            );
                        })}
                        <div className="ring ring-lg" />
                        <div className="ring ring-sm" />
                        <div className="pizza-img-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=85"
                                alt="Hot Pizza"
                                className="pizza-img"
                            />
                        </div>
                    </div>
                    <div className="float-card float-card-1">
                        <span>⏱</span> Delivery in <b style={{ color: "#FF6B00" }}>28 min</b>
                    </div>
                    <div className="float-card float-card-2">
                        <span>⭐</span> <b>4.9</b> Rating
                    </div>
                </div>
            </section>

            {/* SHOP IMAGE */}
            <section className="shop-section" style={{ background: "var(--background-color)" }}>
                <div className="shop-inner">
                    <img
                        src="/images/myshop.jpg"
                        alt="Our Shop"
                        className="shop-img"
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                    <div className="shop-text">
                        <p className="section-tag">Come Visit Us</p>
                        <h2 className="section-title">
                            Our <span className="accent">Kitchen</span> & Stores
                        </h2>
                        <p style={{ color: "#aaa", fontSize: 15, lineHeight: 1.7, marginTop: 12 }}>
                            Walk in or order online — every pizza is made fresh in our open kitchen.
                            Come see where the magic happens!
                        </p>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="section" style={{ background: "var(--background-color)" }}>
                <div className="section-header">
                    <p className="section-tag">Our Categories</p>
                    <h2 className="section-title">What Are You <span className="accent">Craving?</span></h2>
                </div>
                <div className="cat-row">
                    {[
                        { label: "🍕 Classic", path: "/menu?cat=pizza" },
                        { label: "🔥 Spicy", path: "/menu?cat=pizza" },
                        { label: "🥦 Veggie", path: "/menu?cat=pizza" },
                        { label: "🧀 Cheesy", path: "/menu?cat=pizza" },
                        { label: "🥤 Shakes", path: "/menu?cat=shakes" },
                        { label: "☕ Coffee", path: "/menu?cat=coffee" },
                    ].map((cat) => (
                        <Link key={cat.label} to={cat.path} className="cat-chip">{cat.label}</Link>
                    ))}
                </div>
            </section>

            {/* POPULAR PICKS */}
            <section className="section section-alt" style={{ background: "var(--section-background-alt)" }}>
                <div className="section-header">
                    <p className="section-tag">😋 What Are You Craving?</p>
                    <h2 className="section-title">Our <span className="accent">Popular</span> Picks</h2>
                </div>
                <div className="menu-grid">
                    {selectedItems.map((item) => (
                        <div key={item.id} className="food-card">
                            <div className="card-img-wrap">
                                <img src={item.img} alt={item.name} className="card-img" />
                                <span className="card-tag">{item.tag}</span>
                                <span className="card-rating">⭐ {item.rating}</span>
                            </div>
                            <div className="card-body">
                                <h3 className="card-name">{item.name}</h3>
                                <p className="card-desc">{item.desc || "No description available."}</p>
                                <p className="card-cal">{item.cal}</p>
                                <div className="card-footer">
                                    <span className="card-price">{item.price}</span>
                                    <button
                                        className="add-btn"
                                        style={{ background: addedId === item.id ? "#22c55e" : "#FF6B00" }}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        {addedId === item.id ? "✓ Added" : "+ Add"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="view-all-wrap">
                    <Link to="/menu" className="btn-primary">View Full Menu →</Link>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section how-section" style={{ background: "var(--section-background-alt)" }}>
                <div className="section-header">
                    <p className="section-tag">Simple Process</p>
                    <h2 className="section-title">How It <span className="accent">Works</span></h2>
                </div>
                <div className="steps-row">
                    {steps.map((s, i) => (
                        <div key={i} className="step-card">
                            <div className="step-icon">{s.icon}</div>
                            <div className="step-num">0{i + 1}</div>
                            <h4 className="step-title">{s.title}</h4>
                            <p className="step-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PROMO BANNER */}
            <section className="promo-banner" style={{ background: `linear-gradient(135deg, var(--promo-bg-start), var(--promo-bg-end))` }}>
                <div className="promo-left">
                    <p className="section-tag" style={{ color: "#ffcc99" }}>Limited Time Offer</p>
                    <h2 className="promo-title">
                        Get <span style={{ color: "#FFD700" }}>30% OFF</span> Your First Order!
                    </h2>
                    <p className="promo-sub">
                        Use code <b className="promo-code">HOTPIZZA</b> at checkout
                    </p>
                    <Link to="/menu" className="btn-white" style={{ background: "var(--promo-button-bg)", color: "var(--promo-button-text)" }}>Claim Offer →</Link>
                </div>
                <div className="promo-emoji" style={{ color: "var(--promo-text-color)" }}>🍕🔥🍕</div>
            </section>

            {/* LOCATIONS */}
            <section className="section">
                <div className="section-header">
                    <p className="section-tag">Find Us</p>
                    <h2 className="section-title">4 <span className="accent">Locations</span> Near You</h2>
                </div>
                <div className="loc-grid">
                    {locations.map((loc) => (
                        <div key={loc.id} className="loc-card">
                            <p className="loc-name">📍 {loc.name}</p>
                            <p className="loc-addr">{loc.address}</p>
                            <p className="loc-meta">🕐 {loc.hours} &nbsp;|&nbsp; 📞 {loc.phone}</p>
                            <a
                                href={`https://wa.me/${loc.whatsapp}?text=Hi! I'd like to order from HotPizza ${loc.name}`}
                                target="_blank" rel="noopener noreferrer"
                                className="wa-btn"
                            >
                                💬 WhatsApp Order
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section className="section section-alt" style={{ background: "var(--section-background-alt)" }}>
                <div className="section-header">
                    <p className="section-tag">Testimonials</p>
                    <h2 className="section-title">What Our <span className="accent">Fans</span> Say</h2>
                </div>
                <div className="reviews-row">
                    {reviews.map((r, i) => (
                        <div key={i} className="review-card">
                            <div className="review-stars">{"⭐".repeat(r.stars)}</div>
                            <p className="review-text">"{r.text}"</p>
                            <div className="review-author">
                                <div className="review-avatar" style={{ background: "var(--primary-color)" }}>{r.avatar}</div>
                                <span className="review-name">{r.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

const globalCSS = `
:root {
  --primary-color: #FF6B00;
  --text-color: #333;
  --background-color: #f0f2f5;
  --section-background-alt: #fff;
  --card-background: #fff;
  --card-border: #e0e0e0;
  --card-text-color: #333;
  --card-desc-color: #666;
  --card-cal-color: #999;
  --button-primary-bg: #FF6B00;
  --button-primary-text: #fff;
  --button-ghost-bg: transparent;
  --button-ghost-text: #FF6B00;
  --button-ghost-border: #FF6B00;
  --cat-chip-bg: #f0f0f0;
  --cat-chip-border: #ddd;
  --cat-chip-text: #555;
  --promo-bg-start: #FF6B00;
  --promo-bg-end: #cc3d00;
  --promo-text-color: #fff;
  --promo-accent-color: #FFD700;
  --promo-button-bg: #fff;
  --promo-button-text: #FF6B00;
  --review-card-background: #fff;
  --review-card-border: #e0e0e0;
  --review-text-color: #444;
  --navbar-bg: rgba(255,255,255,0.97);
  --navbar-border: #e0e0e0;
  --navbar-link-color: #555;
  --navbar-cart-btn-bg: #f0f0f0;
  --navbar-cart-btn-border: #ddd;
  --navbar-mobile-menu-bg: #fff;
  --navbar-mobile-menu-border: #e0e0e0;
  --navbar-mobile-link-color: #555;
  --navbar-mobile-link-border: #f0f0f0;
  --drawer-bg: #fff;
  --drawer-border: #e0e0e0;
  --drawer-header-bg: #f5f5f5;
  --drawer-item-bg: #f0f0f0;
  --drawer-item-border: #e0e0e0;
  --drawer-item-name-color: #333;
  --drawer-qty-btn-bg: #ddd;
  --drawer-qty-color: #333;
  --drawer-total-color: #666;
  --drawer-clear-btn-color: #888;
  --drawer-clear-btn-border: #ccc;
  --chatbot-fab-bg: #FF6B00;
  --chatbot-window-bg: #fff;
  --chatbot-window-border: #e0e0e0;
  --chatbot-header-bg: #f5f5f5;
  --chatbot-header-border: #e0e0e0;
  --chatbot-suggest-bg: #f0f0f0;
  --chatbot-suggest-border: #ddd;
  --chatbot-suggest-text: #555;
  --chatbot-bot-msg-bg: #e0e0e0;
  --chatbot-bot-msg-text: #333;
  --chatbot-user-msg-bg: #FF6B00;
  --chatbot-user-msg-text: #fff;
  --chatbot-input-bg: #f0f0f0;
  --chatbot-input-border: #ddd;
  --chatbot-input-text: #333;
  --chatbot-send-btn-bg: #FF6B00;
  --footer-bg: #f8f8f8;
  --footer-border: #e0e0e0;
  --footer-stats-banner-bg: #f0f0f0;
  --footer-stat-label-color: #666;
  --footer-tagline-color: #555;
  --footer-social-btn-bg: #e0e0e0;
  --footer-social-btn-border: #ccc;
  --footer-col-title-color: #333;
  --footer-link-color: #666;
  --footer-qr-box-bg: #f0f0f0;
  --footer-qr-box-border: #e0e0e0;
  --footer-app-btn-bg: #ddd;
  --footer-app-btn-border: #ccc;
  --footer-app-btn-text: #555;
  --footer-bottom-text-color: #777;
  --footer-small-link-color: #777;
}

html.dark-theme {
  --primary-color: #FF6B00;
  --text-color: #fff;
  --background-color: #0f0f0f;
  --section-background-alt: #0a0a0a;
  --card-background: #141414;
  --card-border: #222;
  --card-text-color: #fff;
  --card-desc-color: #aaa;
  --card-cal-color: #888;
  --button-primary-bg: #FF6B00;
  --button-primary-text: #fff;
  --button-ghost-bg: transparent;
  --button-ghost-text: #fff;
  --button-ghost-border: #555;
  --cat-chip-bg: #1a1a1a;
  --cat-chip-border: #333;
  --cat-chip-text: #ccc;
  --promo-bg-start: #FF6B00;
  --promo-bg-end: #cc3d00;
  --promo-text-color: #fff;
  --promo-accent-color: #FFD700;
  --promo-button-bg: #fff;
  --promo-button-text: #FF6B00;
  --review-card-background: #141414;
  --review-card-border: #222;
  --review-text-color: #bbb;
  --navbar-bg: rgba(15,15,15,0.97);
  --navbar-border: #222;
  --navbar-link-color: #ccc;
  --navbar-cart-btn-bg: #1a1a1a;
  --navbar-cart-btn-border: #333;
  --navbar-mobile-menu-bg: #0f0f0f;
  --navbar-mobile-menu-border: #222;
  --navbar-mobile-link-color: #ccc;
  --navbar-mobile-link-border: #1a1a1a;
  --drawer-bg: #111;
  --drawer-border: #222;
  --drawer-header-bg: #1a1a1a;
  --drawer-item-bg: #1a1a1a;
  --drawer-item-border: #222;
  --drawer-item-name-color: #fff;
  --drawer-qty-btn-bg: #333;
  --drawer-qty-color: #fff;
  --drawer-total-color: #aaa;
  --drawer-clear-btn-color: #666;
  --drawer-clear-btn-border: #333;
  --chatbot-fab-bg: #FF6B00;
  --chatbot-window-bg: #141414;
  --chatbot-window-border: #222;
  --chatbot-header-bg: #1a1a1a;
  --chatbot-header-border: #222;
  --chatbot-suggest-bg: #222;
  --chatbot-suggest-border: #333;
  --chatbot-suggest-text: #ccc;
  --chatbot-bot-msg-bg: #222;
  --chatbot-bot-msg-text: #eee;
  --chatbot-user-msg-bg: #FF6B00;
  --chatbot-user-msg-text: #fff;
  --chatbot-input-bg: #222;
  --chatbot-input-border: #333;
  --chatbot-input-text: #fff;
  --chatbot-send-btn-bg: #FF6B00;
  --footer-bg: #0a0a0a;
  --footer-border: #1a1a1a;
  --footer-stats-banner-bg: #111;
  --footer-stat-label-color: #888;
  --footer-tagline-color: #777;
  --footer-social-btn-bg: #1a1a1a;
  --footer-social-btn-border: #333;
  --footer-col-title-color: #fff;
  --footer-link-color: #777;
  --footer-qr-box-bg: #141414;
  --footer-qr-box-border: #222;
  --footer-app-btn-bg: #222;
  --footer-app-btn-border: #333;
  --footer-app-btn-text: #ccc;
  --footer-bottom-text-color: #555;
  --footer-small-link-color: #555;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
.accent { color: var(--primary-color); }

.loc-bar { display:flex; align-items:center; gap:12px; flex-wrap:wrap; background:#111; border-bottom:1px solid #1a1a1a; padding:10px 32px; }
.loc-label { color:#aaa; font-size:14px; }
.loc-select { background:#1a1a1a; border:1px solid #333; color:#fff; border-radius:8px; padding:7px 12px; font-size:14px; cursor:pointer; font-family:'Nunito',sans-serif; }
.loc-badge { background:rgba(34,197,94,0.15); border:1px solid #22c55e; color:#22c55e; border-radius:20px; padding:4px 12px; font-size:12px; font-weight:700; }

.hero { display:flex; align-items:center; justify-content:space-between; padding:70px 48px 60px; min-height:88vh; gap:40px; background:radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.12) 0%, transparent 60%); position:relative; overflow:hidden; }
.hero-left { flex:1; max-width:560px; }
.hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(255,107,0,0.15); border:1px solid rgba(255,107,0,0.3); border-radius:50px; padding:8px 18px; font-size:14px; font-weight:600; color:#FF6B00; margin-bottom:22px; }
.hero-logo-row { display:flex; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:18px; }
.hero-logo { width:90px; height:90px; object-fit:contain; }
.hero-title { font-size:54px; font-weight:900; line-height:1.1; letter-spacing:-1px; }
.hero-desc { color:#aaa; font-size:17px; line-height:1.75; margin-bottom:32px; max-width:480px; }
.hero-actions { display:flex; gap:14px; margin-bottom:40px; flex-wrap:wrap; }
.stats-row { display:flex; gap:32px; flex-wrap:wrap; }
.stat-item { display:flex; flex-direction:column; gap:2px; color:var(--text-color); }
.stat-val { font-size:26px; font-weight:900; color:#FF6B00; }
.stat-label { font-size:12px; color:#888; }

.btn-primary { background:#FF6B00; color:#fff; border:none; border-radius:12px; padding:13px 28px; font-weight:800; font-size:15px; cursor:pointer; text-decoration:none; display:inline-block; font-family:'Nunito',sans-serif; transition:background .2s,transform .15s; }
.btn-primary:hover { background:#e05a00; transform:translateY(-1px); }
.btn-ghost { background:transparent; color:#fff; border:1px solid #555; border-radius:12px; padding:13px 24px; font-weight:700; font-size:15px; cursor:pointer; text-decoration:none; display:inline-block; font-family:'Nunito',sans-serif; transition:border-color .2s,color .2s; }
.btn-ghost:hover { border-color:var(--primary-color); color:var(--primary-color); }
.btn-white { background:var(--promo-button-bg); color:var(--promo-button-text); border:none; border-radius:12px; padding:13px 28px; font-weight:800; font-size:15px; cursor:pointer; text-decoration:none; display:inline-block; font-family:'Nunito',sans-serif; }
.btn-white:hover { background:#ffe8d6; }
body { background:var(--background-color); color:var(--text-color); }

.hero-right { flex:1; display:flex; justify-content:center; align-items:center; position:relative; min-height:460px; }
.pizza-stage { position:relative; width:460px; height:460px; display:flex; align-items:center; justify-content:center; }
.ring { position:absolute; border-radius:50%; border:2px solid rgba(255,107,0,0.25); top:50%; left:50%; transform:translate(-50%,-50%); }
.ring-lg { width:360px; height:360px; opacity:.15; }
.ring-sm { width:270px; height:270px; opacity:.25; }
.pizza-img-wrap { width:200px; height:200px; border-radius:50%; overflow:hidden; border:4px solid rgba(255,107,0,0.5); box-shadow:0 0 60px rgba(255,107,0,0.35); position:relative; z-index:2; animation:floatPizza 4s ease-in-out infinite; }
.pizza-img { width:100%; height:100%; object-fit:cover; }
@keyframes floatPizza { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(4deg)} }
.float-card { position:absolute; border-radius:12px; padding:11px 16px; font-size:13px; display:flex; gap:8px; align-items:center; white-space:nowrap; font-weight:600; }
.float-card-1 { top:8%; right:0; background:var(--card-background); border:1px solid var(--card-border); color:var(--card-desc-color); box-shadow:0 8px 24px rgba(0,0,0,0.4); }
.float-card-2 { bottom:10%; left:0; background:var(--primary-color); color:var(--button-primary-text); box-shadow:0 8px 24px rgba(255,107,0,0.4); }

.shop-section { padding:0 48px 60px; }
.shop-inner { display:grid; grid-template-columns:1fr 1fr; gap:0; align-items:center; background:var(--card-background); border:1px solid var(--card-border); border-radius:20px; overflow:hidden; }
.shop-img { width:100%; height:320px; object-fit:cover; display:block; }
.shop-text { padding:36px; }

.section { padding:60px 48px 70px; background:var(--background-color); color:var(--text-color); }
.section-alt { background:var(--section-background-alt); }
.how-section { background:var(--section-background-alt); border-radius:24px; margin:0 48px 70px; padding:60px 40px; }
.section-header { text-align:center; margin-bottom:40px; color:var(--text-color); }
.section-tag { color:var(--primary-color); font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:2px; margin-bottom:10px; display:block; }
.section-title { font-size:38px; font-weight:900; letter-spacing:-0.5px; color:var(--text-color); }

.cat-row { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
.cat-chip { background:var(--cat-chip-bg); border:1px solid var(--cat-chip-border); color:var(--cat-chip-text); border-radius:50px; padding:10px 22px; font-size:14px; cursor:pointer; font-family:'Nunito',sans-serif; font-weight:600; text-decoration:none; transition:all .2s; }
.cat-chip:hover { background:var(--primary-color); color:var(--button-primary-text); border-color:var(--primary-color); }

.menu-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:22px; }
.food-card { background:#141414; border:1px solid #222; border-radius:18px; overflow:hidden; transition:transform .25s,box-shadow .25s; }
.food-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(255,107,0,0.18); }
.card-img-wrap { height:165px; overflow:hidden; position:relative; }
.card-img { width:100%; height:100%; object-fit:cover; transition:transform .3s; }
.food-card:hover .card-img { transform:scale(1.05); }
.card-tag { position:absolute; top:10px; left:10px; background:var(--primary-color); color:var(--button-primary-text); border-radius:6px; padding:3px 9px; font-size:11px; font-weight:700; }
.card-rating { position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.65); color:#FFD700; border-radius:6px; padding:3px 9px; font-size:11px; font-weight:700; }
.card-body { padding:14px 16px 16px; color:var(--card-text-color); }
.card-name { font-size:16px; font-weight:800; margin-bottom:5px; color:var(--card-text-color); }
.card-desc { color:var(--card-desc-color); font-size:13px; line-height:1.5; margin-bottom:5px; }
.card-cal { color:var(--card-cal-color); font-size:11px; margin-bottom:12px; }
.card-footer { display:flex; justify-content:space-between; align-items:center; color:var(--card-text-color); }
.card-price { font-size:20px; font-weight:900; color:var(--primary-color); }
.add-btn { color:var(--button-primary-text); border:none; border-radius:8px; padding:8px 16px; font-weight:700; font-size:13px; cursor:pointer; font-family:'Nunito',sans-serif; transition:background .3s,transform .15s; }
.add-btn:hover { transform:scale(1.05); }
.view-all-wrap { text-align:center; margin-top:36px; }

.steps-row { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:22px; }
.step-card { text-align:center; padding:24px; background:var(--card-background); border-radius:16px; border:1px solid var(--card-border); color:var(--card-text-color); }
.step-icon { font-size:38px; margin-bottom:8px; }
.step-num { font-size:46px; font-weight:900; line-height:1; margin-bottom:8px; color:var(--primary-color); }
.step-title { font-size:17px; font-weight:800; margin-bottom:6px; color:var(--card-text-color); }
.step-desc { color:var(--card-desc-color); font-size:13px; line-height:1.6; }

.promo-banner { margin:0 48px 70px; background:linear-gradient(135deg,#FF6B00,#cc3d00); border-radius:22px; padding:56px 48px; display:flex; justify-content:space-between; align-items:center; color:#fff; position:relative; overflow:hidden; gap:20px; }
.promo-banner::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 80% 50%,rgba(255,255,255,0.08),transparent); pointer-events:none; }
.promo-left { flex:1; position:relative; }
.promo-title { font-size:36px; font-weight:900; margin-bottom:12px; line-height:1.2; }
.promo-sub { font-size:15px; color:#ffcc99; margin-bottom:24px; }
.promo-code { background:rgba(255,255,255,0.2); padding:3px 10px; border-radius:6px; color:#fff; font-weight:800; }
.promo-emoji { font-size:90px; opacity:.25; position:relative; }

.loc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:18px; }
.loc-card { background:var(--card-background); border:1px solid var(--card-border); border-radius:16px; padding:20px; transition:all .25s; color:var(--card-text-color); }
.loc-card:hover { border-color:var(--primary-color); transform:translateY(-3px); }
.loc-name { font-weight:800; font-size:15px; margin-bottom:6px; color:var(--card-text-color); }
.loc-addr { color:var(--card-desc-color); font-size:13px; line-height:1.55; margin-bottom:8px; }
.loc-meta { color:var(--card-desc-color); font-size:12px; margin-bottom:14px; }
.wa-btn { display:inline-flex; align-items:center; gap:7px; background:#25D366; color:#fff; border-radius:10px; padding:9px 14px; font-size:13px; font-weight:700; text-decoration:none; transition:background .2s; }
.wa-btn:hover { background:#1dab54; }

.reviews-row { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:20px; }
.review-card { background:#141414; border:1px solid #222; border-radius:16px; padding:24px; transition:all .25s; }
.review-card:hover { border-color:rgba(255,107,0,0.4); }
.review-stars { font-size:17px; margin-bottom:12px; }
.review-text { color:#bbb; font-size:14px; line-height:1.7; font-style:italic; margin-bottom:18px; }
.review-author { display:flex; align-items:center; gap:10px; }
.review-avatar { width:38px; height:38px; border-radius:50%; background:var(--primary-color); color:#fff; font-weight:800; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.review-name { font-weight:700; font-size:14px; }

@media (max-width:1024px) {
  .hero { padding:60px 32px; }
  .hero-title { font-size:44px; }
  .pizza-stage { width:380px; height:380px; }
  .ring-lg { width:300px; height:300px; }
  .ring-sm { width:220px; height:220px; }
  .section { padding:50px 32px 60px; }
  .how-section { margin:0 32px 60px; }
  .promo-banner { margin:0 32px 60px; padding:44px 36px; }
  .shop-section { padding:0 32px 50px; }
}

@media (max-width:768px) {
  .hero { flex-direction:column; padding:36px 20px 40px; min-height:auto; text-align:center; }
  .hero-left { max-width:100%; }
  .hero-title { font-size:34px; }
  .hero-badge, .hero-logo-row, .hero-actions, .stats-row { justify-content:center; }
  .hero-logo { width:60px; height:60px; }
  .hero-desc { max-width:100%; margin-left:auto; margin-right:auto; }
  .hero-right { min-height:320px; width:100%; }
  .pizza-stage { width:300px; height:300px; }
  .ring-lg { width:240px; height:240px; }
  .ring-sm { width:175px; height:175px; }
  .pizza-img-wrap { width:140px; height:140px; }
  .float-card { padding:8px 12px; font-size:12px; }
  .float-card-1 { top:5%; right:0; }
  .float-card-2 { bottom:5%; left:0; }
  .shop-inner { grid-template-columns:1fr; }
  .shop-img { height:220px; }
  .shop-text { padding:24px 20px; }
  .shop-section { padding:0 20px 40px; }
  .section { padding:40px 20px 50px; }
  .section-title { font-size:26px; }
  .how-section { margin:0 20px 50px; padding:40px 20px; }
  .menu-grid { grid-template-columns:1fr 1fr; }
  .steps-row { grid-template-columns:1fr 1fr; }
  .promo-banner { flex-direction:column; text-align:center; margin:0 20px 50px; padding:36px 24px; }
  .promo-title { font-size:26px; }
  .promo-emoji { font-size:60px; }
  .loc-grid { grid-template-columns:1fr 1fr; }
  .reviews-row { grid-template-columns:1fr; }
}

@media (max-width:480px) {
  .hero-title { font-size:28px; }
  .btn-primary, .btn-ghost { width:100%; text-align:center; }
  .stats-row { flex-direction:column; align-items:center; gap:14px; }
  .pizza-stage { width:240px; height:240px; }
  .ring-lg { width:185px; height:185px; }
  .ring-sm { width:135px; height:135px; }
  .pizza-img-wrap { width:110px; height:110px; }
  .steps-row { grid-template-columns:1fr; }
  .loc-grid { grid-template-columns:1fr; }
  .menu-grid { grid-template-columns:1fr; }
  .cat-chip { padding:8px 16px; font-size:13px; }
}
`;