import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cart, total, subtotal, discountAmount, coupon, selectedLocation, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", phone: "", address: "" });
    const [ordered, setOrdered] = useState(false);

    const handlePlaceOrder = () => {
        if (!form.name || !form.phone || !form.address) return;
        setOrdered(true);
        setTimeout(() => { clearCart(); navigate("/"); }, 3000);
    };

    if (ordered) {
        return (
            <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-color)", fontFamily: "'Nunito', sans-serif" }}>
                <div style={{ textAlign: "center", padding: 40 }}>
                    <div style={{ fontSize: 80 }}>🎉</div>
                    <h2 style={{ fontSize: 32, fontWeight: 900, color: "var(--primary-color)", margin: "16px 0 10px" }}>Order Placed!</h2>
                    <p style={{ fontSize: 16, color: "var(--card-desc-color)" }}>Your hot pizza is being prepared. Delivery in 30 min!</p>
                    {selectedLocation && <p style={{ fontSize: 14, color: "var(--card-desc-color)", marginTop: 8 }}>From {selectedLocation.name}</p>}
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: "var(--background-color)", color: "var(--text-color)", minHeight: "100vh", padding: "48px 32px", fontFamily: "'Nunito', sans-serif" }}>
            <style>{css}</style>
            <h1 className="co-title">Checkout</h1>

            <div className="co-grid">
                {/* Order Summary */}
                <div className="co-summary">
                    <h2 className="co-box-title">Order Summary</h2>
                    {cart.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center" }}>
                            <div style={{ fontSize: 48 }}>🍕</div>
                            <p style={{ color: "var(--card-desc-color)", marginTop: 12 }}>No items in cart</p>
                            <button className="co-back-btn" onClick={() => navigate("/menu")}>Browse Menu</button>
                        </div>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div key={item.id} className="co-item">
                                    <span className="co-item-emoji">{item.emoji || "🍕"}</span>
                                    <div className="co-item-info">
                                        <p className="co-item-name">{item.name}</p>
                                        <p className="co-item-price">{item.price} × {item.qty}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="co-totals">
                                <div className="co-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
                                {coupon && (
                                    <div className="co-row" style={{ color: "#22c55e" }}>
                                        <span>Discount ({coupon.label})</span>
                                        <span>−₹{discountAmount}</span>
                                    </div>
                                )}
                                <div className="co-row"><span>Delivery</span><span style={{ color: "#22c55e" }}>FREE</span></div>
                                <div className="co-row co-total-row">
                                    <span>Total</span>
                                    <span style={{ color: "var(--primary-color)", fontSize: 22, fontWeight: 900 }}>₹{total}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Delivery Form */}
                <div className="co-form-box">
                    <h2 className="co-box-title">Delivery Details</h2>
                    {selectedLocation && (
                        <div className="co-loc-badge">
                            📍 Delivering from <strong>{selectedLocation.name}</strong>
                        </div>
                    )}

                    <div className="co-form">
                        <div className="co-field">
                            <label className="co-label">Full Name *</label>
                            <input className="co-input" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Phone Number *</label>
                            <input className="co-input" placeholder="Your phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div className="co-field">
                            <label className="co-label">Delivery Address *</label>
                            <textarea className="co-input co-textarea" placeholder="Your full delivery address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                        </div>

                        <div className="co-payment-title">Payment Method</div>
                        <div className="co-payment-opts">
                            {["💵 Cash on Delivery", "📱 UPI", "💳 Card"].map((m) => (
                                <div key={m} className="co-payment-opt">{m}</div>
                            ))}
                        </div>

                        <button
                            className="co-submit"
                            onClick={handlePlaceOrder}
                            disabled={cart.length === 0}
                        >
                            🍕 Place Order — ₹{total}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const css = `
.co-title { font-size: 36px; font-weight: 900; color: var(--text-color); margin-bottom: 32px; }
.co-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.co-summary, .co-form-box {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 20px; padding: 28px;
}
.co-box-title { font-size: 20px; font-weight: 800; color: var(--text-color); margin-bottom: 20px; }
.co-item { display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--card-border); }
.co-item-emoji { font-size: 32px; flex-shrink: 0; }
.co-item-info { flex: 1; }
.co-item-name { font-weight: 700; font-size: 14px; color: var(--card-text-color); margin-bottom: 4px; }
.co-item-price { font-size: 13px; color: var(--primary-color); font-weight: 700; }

.co-totals { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }
.co-row { display: flex; justify-content: space-between; font-size: 14px; font-weight: 600; color: var(--card-text-color); }
.co-total-row { border-top: 2px solid var(--card-border); padding-top: 12px; margin-top: 4px; font-size: 16px; font-weight: 800; }

.co-back-btn { background: var(--primary-color); color: #fff; border: none; border-radius: 10px; padding: 10px 20px; font-weight: 700; font-family: 'Nunito', sans-serif; margin-top: 16px; }

.co-loc-badge { background: rgba(255,107,0,0.1); border: 1px solid rgba(255,107,0,0.3); border-radius: 10px; padding: 10px 14px; font-size: 13px; color: var(--text-color); margin-bottom: 20px; }

.co-form { display: flex; flex-direction: column; gap: 16px; }
.co-field { display: flex; flex-direction: column; gap: 6px; }
.co-label { font-size: 13px; font-weight: 700; color: var(--card-text-color); }
.co-input {
  background: var(--section-background-alt); border: 2px solid var(--card-border);
  color: var(--text-color); border-radius: 12px; padding: 12px 16px;
  font-size: 14px; font-family: 'Nunito', sans-serif; outline: none;
}
.co-input:focus { border-color: var(--primary-color); }
.co-textarea { resize: vertical; min-height: 80px; }

.co-payment-title { font-weight: 800; font-size: 14px; color: var(--card-text-color); }
.co-payment-opts { display: flex; gap: 10px; flex-wrap: wrap; }
.co-payment-opt {
  background: var(--section-background-alt); border: 2px solid var(--card-border);
  border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 700; color: var(--card-text-color);
}
.co-submit {
  background: var(--primary-color); color: #fff; border: none; border-radius: 14px;
  padding: 16px; font-weight: 800; font-size: 17px; font-family: 'Nunito', sans-serif;
  transition: background 0.2s, transform 0.15s; margin-top: 8px;
}
.co-submit:hover:not(:disabled) { background: var(--secondary-color); transform: translateY(-2px); }
.co-submit:disabled { opacity: 0.5; }

@media (max-width: 768px) {
  .co-grid { grid-template-columns: 1fr; }
}
`;