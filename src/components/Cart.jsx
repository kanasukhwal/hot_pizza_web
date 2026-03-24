import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ onClose }) {
  const { cart, updateQty, removeFromCart, total, clearCart, selectedLocation } = useCart();
  const navigate = useNavigate();

  const handleOrder = () => {
    if (!selectedLocation) {
      alert("Please select a delivery location first!");
      return;
    }
    onClose();
    navigate("/checkout");
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
            <div style={{ fontSize: 60 }}>🍕</div>
            <p style={{ color: "#888", marginTop: 12 }}>Your cart is empty</p>
            <button style={s.browseBtn} onClick={onClose}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div style={s.items}>
              {cart.map((item) => (
                <div key={item.id} style={s.item}>
                  <img src={item.img} alt={item.name} style={s.itemImg} />
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

            <div style={s.footer}>
              <div style={s.totalRow}>
                <span style={{ color: "#aaa" }}>Subtotal</span>
                <span style={{ fontWeight: 800, color: "#FF6B00", fontSize: 20 }}>${total.toFixed(2)}</span>
              </div>
              <div style={s.totalRow}>
                <span style={{ color: "#aaa" }}>Delivery</span>
                <span style={{ color: "#22c55e", fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{ ...s.totalRow, borderTop: "1px solid #222", paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 17 }}>Total</span>
                <span style={{ fontWeight: 900, color: "#FF6B00", fontSize: 22 }}>${total.toFixed(2)}</span>
              </div>
              <button style={s.orderBtn} onClick={handleOrder}>Place Order →</button>
              <button style={s.clearBtn} onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap');`}</style>
    </>
  );
}

const s = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, backdropFilter: "blur(4px)" },
  drawer: { position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px, 100vw)", background: "var(--drawer-bg)", borderLeft: "1px solid var(--drawer-border)", zIndex: 301, display: "flex", flexDirection: "column", fontFamily: "'Nunito',sans-serif", color: "var(--text-color)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--drawer-border)" },
  title: { fontSize: 20, fontWeight: 900, color: "var(--text-color)" },
  closeBtn: { background: "var(--navbar-cart-btn-bg)", border: "1px solid var(--navbar-cart-btn-border)", color: "var(--text-color)", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 16 },
  empty: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 },
  browseBtn: { marginTop: 16, background: "var(--primary-color)", color: "var(--button-primary-text)", border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito',sans-serif" },
  items: { flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 },
  item: { display: "flex", alignItems: "center", gap: 12, background: "var(--drawer-item-bg)", borderRadius: 12, padding: 12 },
  itemImg: { width: 56, height: 56, borderRadius: 8, objectFit: "cover" },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: 700, fontSize: 14, color: "var(--drawer-item-name-color)", marginBottom: 2 },
  itemPrice: { color: "var(--primary-color)", fontWeight: 700, fontSize: 13 },
  qtyRow: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: { width: 28, height: 28, borderRadius: 6, background: "var(--drawer-qty-btn-bg)", border: "none", color: "var(--drawer-qty-color)", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  qty: { fontWeight: 800, fontSize: 15, minWidth: 20, textAlign: "center", color: "var(--drawer-qty-color)" },
  removeBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, opacity: 0.6, color: "var(--text-color)" },
  footer: { padding: "16px 20px", borderTop: "1px solid var(--drawer-border)", display: "flex", flexDirection: "column", gap: 10 },
  totalRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  orderBtn: { background: "var(--primary-color)", color: "var(--button-primary-text)", border: "none", borderRadius: 12, padding: "14px", fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito',sans-serif" },
  clearBtn: { background: "transparent", color: "var(--drawer-clear-btn-color)", border: "1px solid var(--drawer-clear-btn-border)", borderRadius: 10, padding: "10px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito',sans-serif" },
};
