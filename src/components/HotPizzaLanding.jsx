import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';


const pizzas = [
  {
    id: 1,
    name: "Margherita Classic",
    desc: "Fresh tomato, mozzarella, basil",
    price: "$12.99",
    tag: "Bestseller",
    emoji: "🍕",
    cal: "820 kcal",
  },
  {
    id: 2,
    name: "Pepperoni Feast",
    desc: "Double pepperoni, cheddar, oregano",
    price: "$15.99",
    tag: "Spicy",
    emoji: "🔥",
    cal: "960 kcal",
  },
  {
    id: 3,
    name: "BBQ Chicken",
    desc: "Grilled chicken, BBQ sauce, onions",
    price: "$14.99",
    tag: "New",
    emoji: "🍗",
    cal: "890 kcal",
  },
  {
    id: 4,
    name: "Veggie Supreme",
    desc: "Bell peppers, mushrooms, olives",
    price: "$13.49",
    tag: "Veg",
    emoji: "🥦",
    cal: "750 kcal",
  },
];

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

export default function HotPizzaLanding() {
  const { setCartCount } = useCart();
  const [visible, setVisible] = useState(false);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  const addToCart = (id) => {
    setCartCount((c) => c + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 800);
  };
  return (
    <>
      {/* HERO */}
      <section
        style={{
          ...styles.hero,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div style={styles.heroLeft}>
          <div style={styles.heroBadge}>🔥 Fast Delivery in 30 Minutes</div>
          <h1 style={styles.heroTitle}>
            Craving <span style={styles.heroAccent}>Hot Pizza</span>?<br />
            We Got You!
          </h1>
          <p style={styles.heroDesc}>
            Freshly baked, loaded with toppings, and delivered blazing hot to your doorstep. The best pizza experience in the city.
          </p>
          <div style={styles.heroActions}>
            <button style={styles.primaryBtn}>Order Now →</button>
            <button style={styles.ghostBtn}>▶ Watch Video</button>
          </div>
          <div style={styles.statsRow}>
            {[["50K+", "Happy Customers"], ["4.9★", "Avg Rating"], ["30min", "Delivery Time"]].map(([val, label]) => (
              <div key={label} style={styles.statItem}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.pizzaCircle}>
            <div style={styles.pizzaEmoji}>🍕</div>
            <div style={styles.orbit1}>🧀</div>
            <div style={styles.orbit2}>🍅</div>
            <div style={styles.orbit3}>🌿</div>
          </div>
          <div style={styles.floatCard1}>
            <span>⏱</span> Delivery in <b>28 min</b>
          </div>
          <div style={styles.floatCard2}>
            <span>⭐</span> <b>4.9</b> Rating
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTag}>Our Categories</p>
          <h2 style={styles.sectionTitle}>What Are You <span style={styles.heroAccent}>Craving?</span></h2>
        </div>
        <div style={styles.categoryRow}>
          {["🍕 Classic", "🔥 Spicy", "🥦 Veggie", "🍗 BBQ", "🧀 Cheesy", "🌶 Fiery"].map((cat) => (
            <button key={cat} style={styles.catChip}>{cat}</button>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTag}>🍕 Our Menu</p>
          <h2 style={styles.sectionTitle}>
            Popular <span style={styles.heroAccent}>Picks</span>
          </h2>
        </div>
        <div style={styles.menuGrid}>
          {pizzas.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardImgWrap}>
                <div style={styles.cardEmoji}>{p.emoji}</div>
                <span style={styles.cardTag}>{p.tag}</span>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.cardName}>{p.name}</h3>
                <p style={styles.cardDesc}>{p.desc}</p>
                <p style={styles.cardCal}>{p.cal}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>{p.price}</span>
                  <button
                    style={{
                      ...styles.addBtn,
                      background: addedId === p.id ? "#22c55e" : "#FF6B00",
                    }}
                    onClick={() => addToCart(p.id)}
                  >
                    {addedId === p.id ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...styles.section, background: "#161616", borderRadius: 24, padding: "60px 40px", margin: "0 40px 80px" }}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTag}>Simple Process</p>
          <h2 style={styles.sectionTitle}>How It <span style={styles.heroAccent}>Works</span></h2>
        </div>
        <div style={styles.stepsRow}>
          {steps.map((s, i) => (
            <div key={i} style={styles.stepCard}>
              <div style={styles.stepIcon}>{s.icon}</div>
              <div style={styles.stepNum}>0{i + 1}</div>
              <h4 style={styles.stepTitle}>{s.title}</h4>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section style={styles.promoBanner}>
        <div style={styles.promoLeft}>
          <p style={styles.sectionTag}>Limited Time Offer</p>
          <h2 style={{ ...styles.sectionTitle, fontSize: 36 }}>
            Get <span style={styles.heroAccent}>30% OFF</span> Your First Order!
          </h2>
          <p style={{ color: "#aaa", marginBottom: 24 }}>Use code <b style={{ color: "#FF6B00" }}>HOTPIZZA30</b> at checkout</p>
          <button style={styles.primaryBtn}>Claim Offer →</button>
        </div>
        <div style={styles.promoRight}>🍕🔥🍕</div>
      </section>

      {/* REVIEWS */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTag}>Testimonials</p>
          <h2 style={styles.sectionTitle}>What Our <span style={styles.heroAccent}>Fans</span> Say</h2>
        </div>
        <div style={styles.reviewsRow}>
          {reviews.map((r, i) => (
            <div key={i} style={styles.reviewCard}>
              <div style={styles.reviewStars}>{"⭐".repeat(r.stars)}</div>
              <p style={styles.reviewText}>"{r.text}"</p>
              <div style={styles.reviewAuthor}>
                <div style={styles.reviewAvatar}>{r.avatar}</div>
                <span style={styles.reviewName}>{r.name}</span>
              </div>
            </div>
          ))}
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
    padding: "80px 48px 60px",
    minHeight: "88vh",
    gap: 40,
    background: "radial-gradient(ellipse at 70% 50%, rgba(255,107,0,0.12) 0%, transparent 60%)",
  },
  heroLeft: { flex: 1, maxWidth: 560 },
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
    fontSize: 58,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: 20,
    letterSpacing: -1,
  },
  heroAccent: { color: "#FF6B00" },
  heroDesc: {
    color: "#aaa",
    fontSize: 17,
    lineHeight: 1.7,
    marginBottom: 36,
    maxWidth: 460,
  },
  heroActions: { display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" },
  primaryBtn: {
    background: "#FF6B00",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    transition: "transform 0.2s",
  },
  ghostBtn: {
    background: "transparent",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
  statsRow: { display: "flex", gap: 40 },
  statItem: { display: "flex", flexDirection: "column", gap: 2 },
  statVal: { fontSize: 28, fontWeight: 900, color: "#FF6B00" },
  statLabel: { fontSize: 13, color: "#888" },
  heroRight: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 400 },
  pizzaCircle: {
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "radial-gradient(circle, #1e1e1e 60%, #FF6B00 100%)",
    border: "3px solid rgba(255,107,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    animation: "pulse 3s infinite",
    boxShadow: "0 0 80px rgba(255,107,0,0.25)",
  },
  pizzaEmoji: { fontSize: 110, animation: "float 4s ease-in-out infinite" },
  orbit1: { position: "absolute", fontSize: 26, animation: "orbit1 8s linear infinite", top: "50%", left: "50%", marginTop: -13, marginLeft: -13 },
  orbit2: { position: "absolute", fontSize: 26, animation: "orbit2 8s linear infinite", top: "50%", left: "50%", marginTop: -13, marginLeft: -13 },
  orbit3: { position: "absolute", fontSize: 26, animation: "orbit3 8s linear infinite", top: "50%", left: "50%", marginTop: -13, marginLeft: -13 },
  floatCard1: {
    position: "absolute",
    top: "10%",
    right: "5%",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: 12,
    padding: "12px 18px",
    fontSize: 14,
    color: "#ccc",
    display: "flex",
    gap: 8,
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  floatCard2: {
    position: "absolute",
    bottom: "12%",
    left: "2%",
    background: "#FF6B00",
    borderRadius: 12,
    padding: "12px 18px",
    fontSize: 14,
    color: "#fff",
    fontWeight: 700,
    display: "flex",
    gap: 8,
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(255,107,0,0.4)",
  },
  section: { padding: "60px 48px 80px" },
  sectionHeader: { marginBottom: 40, textAlign: "center" },
  sectionTag: { color: "#FF6B00", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 },
  sectionTitle: { fontSize: 42, fontWeight: 900, letterSpacing: -0.5 },
  categoryRow: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  catChip: {
    background: "#1a1a1a",
    border: "1px solid #333",
    color: "#ccc",
    borderRadius: 50,
    padding: "10px 22px",
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 600,
    transition: "all 0.2s",
  },
  menuGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 },
  card: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 18,
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardImgWrap: {
    background: "linear-gradient(135deg, #1e1e1e, #2a1500)",
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardEmoji: { fontSize: 80 },
  cardTag: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "#FF6B00",
    color: "#fff",
    borderRadius: 6,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
  },
  cardBody: { padding: "16px 18px 18px" },
  cardName: { fontSize: 18, fontWeight: 800, marginBottom: 6 },
  cardDesc: { color: "#888", fontSize: 13, marginBottom: 8, lineHeight: 1.5 },
  cardCal: { color: "#555", fontSize: 12, marginBottom: 14 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardPrice: { fontSize: 22, fontWeight: 900, color: "#FF6B00" },
  addBtn: {
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    transition: "background 0.3s",
  },
  stepsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 24 },
  stepCard: { textAlign: "center", padding: 24 },
  stepIcon: { fontSize: 40, marginBottom: 8 },
  stepNum: { fontSize: 48, fontWeight: 900, color: "rgba(255,107,0,0.15)", lineHeight: 1, marginBottom: 8 },
  stepTitle: { fontSize: 18, fontWeight: 800, marginBottom: 6, color: "#fff" },
  stepDesc: { color: "#888", fontSize: 14, lineHeight: 1.6 },
  promoBanner: {
    margin: "0 48px 80px",
    background: "linear-gradient(135deg, #FF6B00, #e63900)",
    borderRadius: 24,
    padding: "60px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoLeft: { flex: 1 },
  promoRight: { fontSize: 100, opacity: 0.3 },
  reviewsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 },
  reviewCard: {
    background: "#141414",
    border: "1px solid #222",
    borderRadius: 18,
    padding: 28,
  },
  reviewStars: { fontSize: 18, marginBottom: 14 },
  reviewText: { color: "#bbb", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" },
  reviewAuthor: { display: "flex", alignItems: "center", gap: 12 },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#FF6B00",
    color: "#fff",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  reviewName: { fontWeight: 700, fontSize: 15 },
};
