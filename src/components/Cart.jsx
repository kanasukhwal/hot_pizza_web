import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ onClose }) {
  const {
    cart, updateQty, removeFromCart, total, subtotal, discountAmount,
    clearCart, selectedLocation, coupon, couponError, applyCoupon, removeCoupon, COUPONS
  } = useCart();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);

  const handleOrder = () => {
    if (!selectedLocation) {
      alert("Please select a delivery location first!");
      return;
    }
    onClose();
    navigate("/checkout");
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponInput);
    setCouponInput("");
  };

  return (
    <>
      <div style={s.overlay} onClick={onClose} />
      <div style={s.drawer}>
        <div style={s.header}>
          <h2 style={s.title}>🛒 Your Cart</h2>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div style={s.empty}>
            <div style={{ fontSize: 64 }}>🍕</div>
            <p style={{ color: "var(--card-desc-color)", marginTop: 12, fontWeight: 600 }}>Your cart is empty</p>
            <p style={{ color: "var(--card-cal-color)", fontSize: 13, marginTop: 6 }}>Add some delicious items!</p>
            <button style={s.browseBtn} onClick={onClose}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div style={s.items}>
              {cart.map((item) => (
                <div key={item.id} style={s.item}>
                  <div style={s.itemEmoji}>{item.emoji || "🍕"}</div>
                  <div style={s.itemInfo}>
                    <p style={s.itemName}>{item.name}</p>
                    <p style={s.itemPrice}>{item.price}</p>
                  </div>
                  <div style={s.qtyRow}>
                    <button style={s.qtyBtn} onClick={() => updateQty(item.id, -1)}>−</button>
                    <span style={s.qty}>{item.qty}</span>
                    <button style={s.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <button style={s.removeBtn} onClick={() => removeFromCart(item.id)}>🗑</button>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div style={s.couponSection}>
              <div style={s.couponHeader} onClick={() => setShowCoupons(!showCoupons)}>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--primary-color)" }}>
                  🎟️ Have a coupon?
                </span>
                <span style={{ fontSize: 12, color: "var(--card-desc-color)" }}>
                  {showCoupons ? "▲ Hide" : "▼ View Offers"}
                </span>
              </div>

              {showCoupons && (
                <div style={s.couponList}>
                  {Object.entries(COUPONS).map(([code, info]) => (
                    <div key={code} style={s.couponCard} onClick={() => {
                      applyCoupon(code);
                      setShowCoupons(false);
                    }}>
                      <div>
                        <span style={s.couponCode}>{code}</span>
                        <p style={s.couponDesc}>{info.desc}</p>
                      </div>
                      <span style={s.couponBadge}>{info.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {!coupon ? (
                <div style={s.couponInputRow}>
                  <input
                    style={s.couponInput}
                    placeholder="Enter coupon code..."
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleApplyCoupon()}
                  />
                  <button style={s.applyBtn} onClick={handleApplyCoupon}>Apply</button>
                </div>
              ) : (
                <div style={s.couponApplied}>
                  <span>✅ <b>{coupon.code}</b> — {coupon.label} applied!</span>
                  <button style={s.removeCoBtn} onClick={removeCoupon}>✕</button>
                </div>
              )}
              {couponError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>{couponError}</p>}
            </div>

            <div style={s.footer}>
              <div style={s.totalRow}>
                <span style={{ color: "var(--card-desc-color)" }}>Subtotal</span>
                <span style={{ fontWeight: 700, color: "var(--text-color)" }}>₹{subtotal}</span>
              </div>
              {coupon && (
                <div style={s.totalRow}>
                  <span style={{ color: "#22c55e" }}>Discount ({coupon.discount}%)</span>
                  <span style={{ fontWeight: 700, color: "#22c55e" }}>−₹{discountAmount}</span>
                </div>
              )}
              <div style={s.totalRow}>
                <span style={{ color: "var(--card-desc-color)" }}>Delivery</span>
                <span style={{ color: "#22c55e", fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{ ...s.totalRow, borderTop: "1px solid var(--drawer-border)", paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 17, color: "var(--text-color)" }}>Total</span>
                <span style={{ fontWeight: 900, color: "var(--primary-color)", fontSize: 22 }}>₹{total}</span>
              </div>
              <button style={s.orderBtn} onClick={handleOrder}>Place Order →</button>
              <button style={s.clearBtn} onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

const s = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, backdropFilter: "blur(4px)" },
  drawer: {
    position: "fixed", top: 0, right: 0, bottom: 0,
    width: "min(440px, 100vw)", background: "var(--drawer-bg)",
    borderLeft: "1px solid var(--drawer-border)", zIndex: 301,
    display: "flex", flexDirection: "column",
    fontFamily: "'Nunito',sans-serif", color: "var(--text-color)",
    overflowY: "hidden",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "18px 20px", borderBottom: "1px solid var(--drawer-border)",
    flexShrink: 0,
  },
  title: { fontSize: 20, fontWeight: 900, color: "var(--text-color)" },
  closeBtn: {
    background: "var(--navbar-cart-btn-bg)", border: "1px solid var(--navbar-cart-btn-border)",
    color: "var(--text-color)", borderRadius: 8, width: 34, height: 34, fontSize: 16,
  },
  empty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 },
  browseBtn: {
    marginTop: 16, background: "var(--primary-color)", color: "#fff",
    border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 700,
    fontFamily: "'Nunito',sans-serif",
  },
  items: { flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 },
  item: {
    display: "flex", alignItems: "center", gap: 10,
    background: "var(--drawer-item-bg)", borderRadius: 14, padding: "12px 14px",
    border: "1px solid var(--drawer-border)",
  },
  itemEmoji: { fontSize: 36, flexShrink: 0 },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontWeight: 700, fontSize: 14, color: "var(--drawer-item-name-color)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  itemPrice: { color: "var(--primary-color)", fontWeight: 800, fontSize: 14 },
  qtyRow: { display: "flex", alignItems: "center", gap: 6, flexShrink: 0 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 8, background: "var(--drawer-qty-btn-bg)",
    border: "1px solid var(--drawer-border)", color: "var(--drawer-qty-color)",
    fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700,
  },
  qty: { fontWeight: 800, fontSize: 15, minWidth: 22, textAlign: "center", color: "var(--drawer-qty-color)" },
  removeBtn: { background: "none", border: "none", fontSize: 16, opacity: 0.6, color: "var(--text-color)", flexShrink: 0 },

  // Coupon
  couponSection: { borderTop: "1px solid var(--drawer-border)", padding: "12px 16px", flexShrink: 0 },
  couponHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, cursor: "pointer" },
  couponList: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 },
  couponCard: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "var(--section-background-alt)", borderRadius: 10, padding: "10px 14px",
    border: "1px dashed var(--primary-color)", cursor: "pointer",
    transition: "background 0.2s",
  },
  couponCode: { fontWeight: 800, fontSize: 14, color: "var(--primary-color)", display: "block" },
  couponDesc: { fontSize: 12, color: "var(--card-desc-color)", marginTop: 2 },
  couponBadge: { background: "var(--primary-color)", color: "#fff", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 800 },
  couponInputRow: { display: "flex", gap: 8 },
  couponInput: {
    flex: 1, background: "var(--drawer-item-bg)", border: "1px solid var(--drawer-border)",
    borderRadius: 10, padding: "10px 14px", color: "var(--text-color)", fontSize: 14,
    fontFamily: "'Nunito',sans-serif", outline: "none",
  },
  applyBtn: {
    background: "var(--primary-color)", color: "#fff", border: "none", borderRadius: 10,
    padding: "10px 16px", fontWeight: 700, fontSize: 14, fontFamily: "'Nunito',sans-serif",
  },
  couponApplied: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(34,197,94,0.12)", border: "1px solid #22c55e",
    borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#22c55e",
  },
  removeCoBtn: { background: "none", border: "none", color: "#ef4444", fontSize: 16, fontWeight: 700 },

  footer: { padding: "14px 18px", borderTop: "1px solid var(--drawer-border)", display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  orderBtn: {
    background: "var(--primary-color)", color: "#fff", border: "none", borderRadius: 14,
    padding: "14px", fontWeight: 800, fontSize: 16, fontFamily: "'Nunito',sans-serif",
  },
  clearBtn: {
    background: "transparent", color: "var(--drawer-clear-btn-color)",
    border: "1px solid var(--drawer-clear-btn-border)", borderRadius: 10, padding: "10px",
    fontWeight: 600, fontSize: 13, fontFamily: "'Nunito',sans-serif",
  },
};