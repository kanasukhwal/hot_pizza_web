import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { menuData } from "../data/menuData.js";

export default function Menu() {
    const [addedId, setAddedId] = useState(null);
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 800);
    };

    // Define categories that map to menuData keys
    const categoriesForDisplay = [
        { category: "Pizza Menu", emoji: "🍕", key: "pizza" },
        { category: "Sandwich Menu", emoji: "🥪", key: "sandwich" },
        { category: "Shakes & Beverages", emoji: "🥤", key: "shakes" },
        { category: "Coffee Menu", emoji: "☕", key: "coffee" },
        { category: "Desserts", emoji: "🍰", key: "desserts" },
        { category: "Sides & Appetizers", emoji: "🍟", key: "sides" },
    ]
        .map((catMap) => ({
            ...catMap,
            items: menuData[catMap.key] || [],
        }))
        .filter((cat) => cat.items.length > 0);

    return (
        <section style={styles.section}>
            {/* Main Section Header */}
            <div style={styles.mainSectionHeader}>
                <p style={styles.sectionTag}>🍽️ Our Menu</p>
                <h2 style={styles.sectionTitle}>
                    All Our Delicious <span style={styles.heroAccent}>Items</span>
                </h2>
            </div>

            {/* Iterate through categories */}
            {categoriesForDisplay.map((categoryData) => (
                <div key={categoryData.key}>
                    <div style={styles.categoryHeader}>
                        <h3 style={styles.categoryTitle}>
                            {categoryData.emoji} {categoryData.category}
                        </h3>
                    </div>
                    <div style={styles.menuGrid}>
                        {categoryData.items.map((item) => (
                            <div key={item.id} style={styles.card}>
                                <div style={styles.cardImgWrap}>
                                    <div style={styles.cardEmoji}>{item.emoji}</div>
                                    <span style={styles.cardTag}>{item.tag}</span>
                                </div>
                                <div style={styles.cardBody}>
                                    <h3 style={styles.cardName}>{item.name}</h3>
                                    <p style={styles.cardDesc}>{item.desc}</p>
                                    <p style={styles.cardCal}>{item.cal}</p>
                                    <div style={styles.cardFooter}>
                                        <span style={styles.cardPrice}>{item.price}</span>
                                        <button
                                            style={{
                                                ...styles.addBtn,
                                                background: addedId === item.id ? "#22c55e" : "#FF6B00",
                                            }}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            {addedId === item.id ? "✓ Added" : "+ Add"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

const styles = {
    section: {
        padding: "60px 48px 80px",
        background: "var(--background-color)",
        color: "var(--text-color)",
    },
    mainSectionHeader: {
        marginBottom: 40,
        textAlign: "center",
        color: "var(--text-color)",
    },
    sectionTag: {
        color: "var(--primary-color)",
        fontWeight: 700,
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 42,
        fontWeight: 900,
        letterSpacing: -0.5,
        color: "var(--text-color)",
    },
    heroAccent: {
        color: "var(--primary-color)",
    },
    menuGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 24,
    },
    card: {
        background: "var(--card-background)",
        border: "1px solid var(--card-border)",
        borderRadius: 18,
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        color: "var(--card-text-color)",
        cursor: "pointer",
    },
    cardImgWrap: {
        background: "linear-gradient(135deg, var(--card-background), rgba(255,107,0,0.1))",
        height: 160,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    cardEmoji: {
        fontSize: 80,
    },
    cardTag: {
        position: "absolute",
        top: 12,
        right: 12,
        background: "var(--primary-color)",
        color: "var(--button-primary-text)",
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 11,
        fontWeight: 700,
    },
    cardBody: {
        padding: "16px 18px 18px",
    },
    cardName: {
        fontSize: 18,
        fontWeight: 800,
        marginBottom: 6,
        color: "var(--card-text-color)",
    },
    cardDesc: {
        color: "var(--card-desc-color)",
        fontSize: 13,
        marginBottom: 8,
        lineHeight: 1.5,
    },
    cardCal: {
        color: "var(--card-cal-color)",
        fontSize: 12,
        marginBottom: 14,
    },
    cardFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardPrice: {
        fontSize: 22,
        fontWeight: 900,
        color: "var(--primary-color)",
    },
    addBtn: {
        color: "var(--button-primary-text)",
        border: "none",
        borderRadius: 8,
        padding: "8px 18px",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        fontFamily: "'Nunito', sans-serif",
        transition: "background 0.3s",
    },
    categoryHeader: {
        textAlign: "center",
        marginTop: 60,
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 32,
        fontWeight: 800,
        color: "var(--primary-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
};