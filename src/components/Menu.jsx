import { useState } from "react";
import { useCart } from "../context/CartContext";
import { menuData } from "../data/menuData.js";

const CATEGORIES = [
    { key: "pizza", label: "🍕 Pizza", desc: "27 varieties" },
    { key: "sandwich", label: "🥪 Sandwich", desc: "12 varieties" },
    { key: "burger", label: "🍔 Burger", desc: "7 varieties" },
    { key: "shakes", label: "🥤 Shakes", desc: "7 varieties" },
    { key: "coffee", label: "☕ Coffee", desc: "2 varieties" },
    { key: "garlic_bread", label: "🥖 Garlic Bread", desc: "3 varieties" },
];

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState("pizza");
    const [search, setSearch] = useState("");
    const { addToCart, cart, updateQty } = useCart();

    const getCartItem = (id) => cart.find((i) => i.id === id);

    const filteredItems = (menuData[activeCategory] || []).filter((item) =>
        search === "" || item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section style={styles.section}>
            <style>{css}</style>

            <div style={styles.mainHeader}>
                <p style={styles.tag}>🍽️ Our Menu</p>
                <h2 style={styles.title}>All Our <span style={styles.accent}>Delicious</span> Items</h2>
                <p style={styles.sub}>100% Vegetarian · Fresh Daily · Made with Love</p>

                <div style={styles.searchWrap}>
                    <input
                        style={styles.search}
                        placeholder="🔍 Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Category tabs */}
            <div className="menu-cat-tabs">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.key}
                        className={`menu-cat-tab ${activeCategory === cat.key ? "menu-cat-active" : ""}`}
                        onClick={() => { setActiveCategory(cat.key); setSearch(""); }}
                    >
                        <span>{cat.label}</span>
                        <small>{cat.desc}</small>
                    </button>
                ))}
            </div>

            {/* Items */}
            {filteredItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--card-desc-color)" }}>
                    <div style={{ fontSize: 64 }}>🍕</div>
                    <p style={{ fontSize: 18, fontWeight: 700, marginTop: 16 }}>No items found</p>
                    <p style={{ fontSize: 14, marginTop: 8 }}>Try a different search or category</p>
                </div>
            ) : (
                <div className="menu-grid">
                    {filteredItems.map((item) => {
                        const cartItem = getCartItem(item.id);
                        return (
                            <div key={item.id} className="m-card">
                                <div className="m-card-img">
                                    <span style={{ fontSize: 72 }}>{item.emoji}</span>
                                    <span className="m-tag">{item.tag}</span>
                                    {item.rating >= 4.8 && <span className="m-hot">🔥 Hot</span>}
                                </div>
                                <div className="m-body">
                                    <h3 className="m-name">{item.name}</h3>
                                    <p className="m-desc">{item.desc}</p>
                                    <p className="m-cal">{item.cal}</p>
                                    <div className="m-footer">
                                        <span className="m-price">{item.price}</span>
                                        {cartItem ? (
                                            <div className="m-qty">
                                                <button className="m-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                                                <span className="m-qty-num">{cartItem.qty}</span>
                                                <button className="m-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                                            </div>
                                        ) : (
                                            <button className="m-add" onClick={() => addToCart(item)}>+ Add</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

const styles = {
    section: { padding: "48px 48px 80px", background: "var(--background-color)", color: "var(--text-color)", minHeight: "80vh", fontFamily: "'Nunito', sans-serif" },
    mainHeader: { textAlign: "center", marginBottom: 36 },
    tag: { color: "var(--primary-color)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 },
    title: { fontSize: 42, fontWeight: 900, letterSpacing: -0.5, color: "var(--text-color)", marginBottom: 8 },
    accent: { color: "var(--primary-color)" },
    sub: { fontSize: 15, color: "var(--card-desc-color)", marginBottom: 20 },
    searchWrap: { display: "flex", justifyContent: "center" },
    search: {
        background: "var(--card-background)", border: "2px solid var(--card-border)",
        color: "var(--text-color)", borderRadius: 12, padding: "12px 20px",
        fontSize: 15, width: "100%", maxWidth: 400, fontFamily: "'Nunito', sans-serif",
        outline: "none", transition: "border-color 0.2s",
    },
};

const css = `
.menu-cat-tabs {
  display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
  margin-bottom: 40px;
}
.menu-cat-tab {
  background: var(--cat-chip-bg); border: 2px solid var(--cat-chip-border);
  color: var(--cat-chip-text); border-radius: 14px; padding: 10px 22px;
  font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 14px;
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  transition: all 0.2s; min-width: 120px;
}
.menu-cat-tab small { font-size: 11px; opacity: 0.7; font-weight: 600; }
.menu-cat-tab:hover { border-color: var(--primary-color); color: var(--primary-color); }
.menu-cat-active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
.menu-cat-active small { opacity: 0.85; }

.menu-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px;
}
.m-card {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 18px; overflow: hidden; transition: transform 0.25s, box-shadow 0.25s;
}
.m-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(255,107,0,0.15); }
.m-card-img {
  background: linear-gradient(135deg, var(--section-background-alt), rgba(255,107,0,0.08));
  height: 155px; display: flex; align-items: center; justify-content: center;
  position: relative;
}
.m-tag { position: absolute; top: 10px; right: 10px; background: var(--primary-color); color: #fff; border-radius: 6px; padding: 3px 9px; font-size: 11px; font-weight: 700; }
.m-hot { position: absolute; top: 10px; left: 10px; background: #ef4444; color: #fff; border-radius: 6px; padding: 3px 9px; font-size: 11px; font-weight: 700; }
.m-body { padding: 14px 16px 16px; }
.m-name { font-size: 16px; font-weight: 800; color: var(--card-text-color); margin-bottom: 5px; }
.m-desc { color: var(--card-desc-color); font-size: 13px; line-height: 1.5; margin-bottom: 5px; }
.m-cal { color: var(--card-cal-color); font-size: 12px; margin-bottom: 12px; }
.m-footer { display: flex; justify-content: space-between; align-items: center; }
.m-price { font-size: 20px; font-weight: 900; color: var(--primary-color); }
.m-add {
  background: var(--primary-color); color: #fff; border: none; border-radius: 10px;
  padding: 8px 18px; font-weight: 700; font-size: 14px; font-family: 'Nunito', sans-serif;
  transition: background 0.2s, transform 0.15s;
}
.m-add:hover { background: var(--secondary-color); transform: scale(1.05); }
.m-qty {
  display: flex; align-items: center; gap: 6px;
  background: var(--section-background-alt); border-radius: 10px;
  border: 2px solid var(--primary-color); padding: 2px 4px;
}
.m-qty-btn {
  width: 30px; height: 30px; border-radius: 8px; background: var(--primary-color);
  border: none; color: #fff; font-size: 18px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Nunito', sans-serif;
}
.m-qty-btn:hover { background: var(--secondary-color); }
.m-qty-num { font-weight: 900; font-size: 15px; min-width: 24px; text-align: center; color: var(--text-color); }

@media (max-width: 768px) {
  .menu-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
  .menu-cat-tab { min-width: auto; padding: 8px 14px; font-size: 13px; }
}
@media (max-width: 480px) {
  .menu-grid { grid-template-columns: 1fr; }
}
`;