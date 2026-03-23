import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import { Link } from "react-router-dom"; // Import Link for navigation
import { menuCategories } from "../components/menuData.js";


// Removed the old 'pizzas' array as it's replaced by menuCategories
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
  const { addToCart } = useCart(); // Get addToCart from CartContext
  const handleAddToCart = (item) => { // Renamed to avoid conflict with context's addToCart
    addToCart(item); // Call the context's addToCart
    setAddedId(item.id); // Set the ID of the item just added
    setTimeout(() => setAddedId(null), 800);
  };
  // Logic to select a few items for the landing page display
  const selectedItems = [];

  // Get 2 pizzas
  const pizzaCategory = menuCategories.find(cat => cat.category === "Pizza Menu");
  if (pizzaCategory && pizzaCategory.items.length >= 2) {
    selectedItems.push(pizzaCategory.items[0]);
    selectedItems.push(pizzaCategory.items[1]);
  }

  // Get 1 sandwich
  const sandwichCategory = menuCategories.find(cat => cat.category === "Sandwich Menu (Regular)");
  if (sandwichCategory && sandwichCategory.items.length >= 1) {
    selectedItems.push(sandwichCategory.items[0]);
  }

  // Get 1 cold coffee/shake
  const beveragesCategory = menuCategories.find(cat => cat.category === "Extra Shakes / Beverages");
  if (beveragesCategory && beveragesCategory.items.length >= 1) {
    selectedItems.push(beveragesCategory.items[0]);
  } else {
    // Fallback if 'Extra Shakes / Beverages' is empty, try 'Sandwich Menu (Regular)' for cold coffee
    const coldCoffee = sandwichCategory?.items.find(item => item.name.includes("Cold Coffee"));
    if (coldCoffee) {
      selectedItems.push(coldCoffee);
    }
  }
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
            Freshly baked, loaded with toppings, and delivered blazing hot to your doorstep. The best pizza experience in the city. {/* Keep consistent */}
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
            <span>⭐</span> <b>4.9</b> Rating {/* Keep consistent */}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTag}>Our Categories</p>
          <h2 style={styles.sectionTitle}>What Are You <span style={styles.heroAccent}>Craving?</span></h2>
        </div>
        <div style={styles.categoryRow}> {/* Use CSS variables for catChip */}
          {["🍕 Classic", "🔥 Spicy", "🥦 Veggie", "🍗 BBQ", "🧀 Cheesy", "🌶 Fiery"].map((cat) => (
            <button key={cat} style={styles.catChip}>{cat}</button>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTag}>😋 What Are You Craving?</p>
          <h2 style={styles.sectionTitle}>
            Our <span style={styles.heroAccent}>Popular</span> Picks
          </h2>
        </div>
        <div style={styles.menuGrid}>
          {selectedItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardImgWrap}>
                <div style={styles.cardEmoji}>{item.emoji}</div>
                <span style={styles.cardTag}>{item.tag}</span>
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.cardName}>{item.name}</h3>
                <p style={item.desc ? styles.cardDesc : { ...styles.cardDesc, fontStyle: 'italic', color: '#aaa' }}>
                  {item.desc || "No description available."}
                </p>
                <p style={styles.cardCal}>{item.cal}</p>
                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>{item.price}</span>
                  <button
                    style={{
                      ...styles.addBtn,
                      background: addedId === item.id ? "#22c55e" : "#FF6B00",
                    }}
                    onClick={() => handleAddToCart(item)} // Pass the full item object
                  >
                    {addedId === item.id ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.viewAllContainer}>
          <Link to="/menu" style={styles.viewAllButton}>
            View All Menu Items

          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...styles.section, background: "var(--section-background-alt)", borderRadius: 24, padding: "60px 40px", margin: "0 40px 80px" }}> {/* Use CSS variable */}
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
      <section style={{ ...styles.promoBanner, background: `linear-gradient(135deg, var(--promo-bg-start), var(--promo-bg-end))` }}>
        <div style={styles.promoLeft}>
          <p style={styles.sectionTag}>Limited Time Offer</p>
          <h2 style={{ ...styles.sectionTitle, fontSize: 36, color: "var(--promo-text-color)" }}>
            Get <span style={{ ...styles.heroAccent, color: "var(--promo-accent-color)" }}>30% OFF</span> Your First Order!
          </h2>
          <p style={{ color: "var(--promo-text-color)", marginBottom: 24 }}>Use code <b style={{ color: "var(--promo-accent-color)" }}>HOTPIZZA30</b> at checkout</p>
          <button style={{ ...styles.primaryBtn, background: "var(--promo-button-bg)", color: "var(--promo-button-text)" }}>Claim Offer →</button>
        </div>
        <div style={{ ...styles.promoRight, color: "var(--promo-text-color)" }}>🍕🔥🍕</div>
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
              <div style={styles.reviewStars}>{"⭐".repeat(r.stars)}</div> {/* Keep consistent */}
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
    display: "flex", // Keep consistent
    alignItems: "center", // Keep consistent
    justifyContent: "space-between", // Keep consistent
    padding: "80px 48px 60px", // Keep consistent
    minHeight: "88vh", // Keep consistent
    gap: 40, // Keep consistent
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
    fontWeight: 600, // Keep consistent
    color: "#FF6B00",
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 58,
    fontWeight: 900,
    lineHeight: 1.1,
    marginBottom: 20,
    letterSpacing: -1, // Keep consistent
  },
  heroAccent: { color: "var(--primary-color)" }, // Use CSS variable
  heroDesc: {
    color: "var(--card-desc-color)", // Use a variable for description text
    fontSize: 17,
    lineHeight: 1.7,
    marginBottom: 36, // Keep layout consistent
    maxWidth: 460,
  },
  heroActions: { display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" }, // Keep consistent
  primaryBtn: { // Use CSS variables
    background: "var(--button-primary-bg)",
    color: "var(--button-primary-text)",
    border: "none", // Keep consistent
    borderRadius: 12,
    padding: "14px 32px",
    fontWeight: 800,
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    transition: "transform 0.2s",
  },
  ghostBtn: { // Use CSS variables
    background: "var(--button-ghost-bg)",
    color: "var(--button-ghost-text)",
    border: "1px solid var(--button-ghost-border)", // Keep consistent
    borderRadius: 12,
    padding: "14px 28px",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
  },
  statsRow: { display: "flex", gap: 40 }, // Keep consistent
  statItem: { display: "flex", flexDirection: "column", gap: 2 },
  statVal: { fontSize: 28, fontWeight: 900, color: "var(--primary-color)" },
  statLabel: { fontSize: 13, color: "var(--card-desc-color)" },
  heroRight: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 400 },
  pizzaCircle: {
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: "radial-gradient(circle, var(--card-background) 60%, var(--primary-color) 100%)",
    border: "3px solid rgba(255,107,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    animation: "pulse 3s infinite",
    boxShadow: "0 0 80px var(--primary-color-alpha-15)", // Use CSS variable
  },
  pizzaEmoji: { fontSize: 110, animation: "float 4s ease-in-out infinite" },
  orbit1: { position: "absolute", fontSize: 26, animation: "orbit1 8s linear infinite", top: "50%", left: "50%", marginTop: -13, marginLeft: -13 },
  orbit2: { position: "absolute", fontSize: 26, animation: "orbit2 8s linear infinite", top: "50%", left: "50%", marginTop: -13, marginLeft: -13 },
  orbit3: { position: "absolute", fontSize: 26, animation: "orbit3 8s linear infinite", top: "50%", left: "50%", marginTop: -13, marginLeft: -13 },
  floatCard1: {
    position: "absolute",
    top: "10%",
    right: "5%",
    background: "var(--card-background)",
    border: "1px solid var(--card-border)",
    borderRadius: 12,
    padding: "12px 18px", // Keep font size consistent
    fontSize: 14, // Keep font size consistent
    color: "var(--card-text-color)", // Use card text color
    display: "flex",
    gap: 8, // Keep consistent
    alignItems: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  },
  floatCard2: {
    position: "absolute",
    bottom: "12%",
    left: "2%",
    background: "var(--primary-color)", // Use CSS variable
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
  sectionTag: { color: "var(--primary-color)", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }, // Use CSS variable
  sectionTitle: { fontSize: 42, fontWeight: 900, letterSpacing: -0.5, color: "var(--text-color)" }, // Use CSS variable
  categoryRow: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }, // Keep consistent
  catChip: {
    background: "var(--cat-chip-bg)", // Use CSS variable
    border: "1px solid var(--cat-chip-border)", // Use CSS variable
    color: "var(--cat-chip-text)", // Use CSS variable
    borderRadius: 50,
    padding: "10px 22px",
    fontSize: 15,
    cursor: "pointer",
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 600,
    transition: "all 0.2s",
  },
  menuGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }, // Keep consistent
  card: {
    background: "var(--card-background)", // Use CSS variable
    border: "1px solid var(--card-border)", // Use CSS variable
    borderRadius: 18,
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
  }, // Keep consistent
  cardImgWrap: {
    background: "linear-gradient(135deg, #1e1e1e, #2a1500)",
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardEmoji: { fontSize: 80 }, // Keep consistent
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
  cardCal: { color: "var(--card-cal-color)", fontSize: 12, marginBottom: 14 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardPrice: { fontSize: 22, fontWeight: 900, color: "var(--primary-color)" },
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
  stepCard: { textAlign: "center", padding: 24, background: "var(--card-background)", borderRadius: 18, border: "1px solid var(--card-border)" }, // Use CSS variables
  stepIcon: { fontSize: 40, marginBottom: 8, color: "var(--primary-color)" }, // Use CSS variable
  stepNum: { fontSize: 48, fontWeight: 900, color: "var(--primary-color-alpha-15)", lineHeight: 1, marginBottom: 8 }, // Use CSS variable
  stepTitle: { fontSize: 18, fontWeight: 800, marginBottom: 6, color: "var(--card-text-color)" }, // Use CSS variable
  stepDesc: { color: "var(--card-desc-color)", fontSize: 14, lineHeight: 1.6 }, // Use CSS variable
  promoBanner: {
    margin: "0 48px 80px", // Keep consistent
    // Background is now set inline in the component
    borderRadius: 24,
    padding: "60px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoLeft: { flex: 1 },
  promoRight: { fontSize: 100, opacity: 0.3 },
  reviewsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 },
  reviewCard: { // Use CSS variables
    background: "var(--review-card-background)",
    border: "1px solid var(--review-card-border)",
    borderRadius: 18,
    padding: 28,
  },
  reviewStars: { fontSize: 18, marginBottom: 14, color: "var(--primary-color)" }, // Use CSS variable
  reviewText: { color: "var(--review-text-color)", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }, // Use CSS variable
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
  }, // Keep consistent
  reviewName: { fontWeight: 700, fontSize: 15 },
  viewAllContainer: { // Added styles for the View All button
    textAlign: "center",
    marginTop: 40,
  },
  viewAllButton: {
    display: "inline-block",
    background: "#FF6B00",
    color: "#fff",
    padding: "12px 25px", // Keep consistent
    borderRadius: 8, // Keep consistent
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 16,
    transition: "background 0.3s",
    "&:hover": { // Note: Inline styles don't support pseudo-classes directly like this.
      background: "#e65c00",
    }
  },

  // Responsive styles for HotPizzaLanding
  "@media (max-width: 768px)": {
    hero: {
      flexDirection: "column",
      padding: "40px 20px",
      minHeight: "auto",
      gap: 20,
    },
    heroLeft: { textAlign: "center", maxWidth: "100%" },
    heroTitle: { fontSize: 42 },
    heroDesc: { maxWidth: "100%", margin: "0 auto 24px auto" },
    heroActions: { justifyContent: "center" },
    statsRow: { justifyContent: "center", gap: 20 },
    heroRight: { minHeight: 300, width: "100%" },
    pizzaCircle: { width: 200, height: 200 },
    pizzaEmoji: { fontSize: 80 },
    orbit1: { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
    orbit2: { transform: "rotate(120deg) translateX(80px) rotate(-120deg)" },
    orbit3: { transform: "rotate(240deg) translateX(80px) rotate(-240deg)" },
    floatCard1: { top: "5%", right: "2%", padding: "8px 12px", fontSize: 12 },
    floatCard2: { bottom: "5%", left: "2%", padding: "8px 12px", fontSize: 12 },
    section: { padding: "40px 20px" },
    promoBanner: { flexDirection: "column", margin: "0 20px 40px", padding: "40px 20px", textAlign: "center" },
    promoLeft: { marginBottom: 20 },
    promoRight: { fontSize: 80 },
    reviewsRow: { gridTemplateColumns: "1fr" },
    stepsRow: { gridTemplateColumns: "1fr" },
  },
  "@media (max-width: 480px)": {
    heroTitle: { fontSize: 36 },
    heroActions: { flexDirection: "column", gap: 10 },
    primaryBtn: { width: "100%" },
    ghostBtn: { width: "100%" },
    statsRow: { flexDirection: "column", gap: 15 },
    pizzaCircle: { width: 180, height: 180 },
    pizzaEmoji: { fontSize: 70 },
    orbit1: { transform: "rotate(0deg) translateX(70px) rotate(0deg)" },
    orbit2: { transform: "rotate(120deg) translateX(70px) rotate(-120deg)" },
    orbit3: { transform: "rotate(240deg) translateX(70px) rotate(-240deg)" },
    floatCard1: { fontSize: 10 },
    floatCard2: { fontSize: 10 },
    catChip: { padding: "8px 15px", fontSize: 13 },
    menuGrid: { gridTemplateColumns: "1fr" },
    cardBody: { padding: "12px 15px" },
    cardName: { fontSize: 16 },
    cardDesc: { fontSize: 12 },
    cardCal: { fontSize: 11 },
    cardPrice: { fontSize: 18 },
    addBtn: { padding: "6px 12px", fontSize: 12 },
    stepCard: { padding: 15 },
    stepIcon: { fontSize: 30 },
    stepNum: { fontSize: 40 },
    stepTitle: { fontSize: 16 },
    stepDesc: { fontSize: 13 },
    promoLeft: { fontSize: 14 },
    promoRight: { fontSize: 60 },
  },
};
