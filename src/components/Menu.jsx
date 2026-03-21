import { useState } from "react";
import { useOutletContext } from "react-router-dom";

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

export default function Menu() {
    const { setCartCount } = useOutletContext();
    const [addedId, setAddedId] = useState(null);

    const addToCart = (id) => {
        setCartCount((c) => c + 1);
        setAddedId(id);
        setTimeout(() => setAddedId(null), 800);
    };

    return (
        <section style={styles.section}>
            <div style={styles.sectionHeader}>
                <p style={styles.sectionTag}>🍕 Our Menu</p>
                <h2 style={styles.sectionTitle}>
                    All Our Delicious <span style={styles.heroAccent}>Pizzas</span>
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
    );
}

const styles = {
    section: { padding: "60px 48px 80px" },
    sectionHeader: { marginBottom: 40, textAlign: "center" },
    sectionTag: { color: "#FF6B00", fontWeight: 700, fontSize: 14, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 },
    sectionTitle: { fontSize: 42, fontWeight: 900, letterSpacing: -0.5 },
    heroAccent: { color: "#FF6B00" },
    menuGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 },
    card: { background: "#141414", border: "1px solid #222", borderRadius: 18, overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s" },
    cardImgWrap: { background: "linear-gradient(135deg, #1e1e1e, #2a1500)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
    cardEmoji: { fontSize: 80 },
    cardTag: { position: "absolute", top: 12, right: 12, background: "#FF6B00", color: "#fff", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 },
    cardBody: { padding: "16px 18px 18px" },
    cardName: { fontSize: 18, fontWeight: 800, marginBottom: 6 },
    cardDesc: { color: "#888", fontSize: 13, marginBottom: 8, lineHeight: 1.5 },
    cardCal: { color: "#555", fontSize: 12, marginBottom: 14 },
    cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    cardPrice: { fontSize: 22, fontWeight: 900, color: "#FF6B00" },
    addBtn: { color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Nunito', sans-serif", transition: "background 0.3s" },
};