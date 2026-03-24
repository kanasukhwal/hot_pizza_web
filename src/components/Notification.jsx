import { useCart } from "../context/CartContext";

export default function Notification() {
  const { notification } = useCart();
  if (!notification) return null;
  return (
    <div style={{ // Keep consistent
      position: "fixed", bottom: 90, right: 24, background: notification.type === "success" ? "var(--success-bg)" : "var(--error-bg)",
      border: `1px solid ${notification.type === "success" ? "#22c55e" : "#ef4444"}`,
      color: "var(--button-primary-text)", borderRadius: 12, padding: "14px 20px", zIndex: 500, fontFamily: "'Nunito',sans-serif",
      fontWeight: 700, fontSize: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      animation: "slideIn .3s ease", display: "flex", alignItems: "center", gap: 10, maxWidth: 320
    }}>
      <span style={{ fontSize: 20 }}>{notification.type === "success" ? "✅" : "❌"}</span>
      {notification.msg}
      <style>{`@keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>
    </div>
  );
}
