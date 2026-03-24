import { useState } from "react";

const faq = [
  { q: "What are your delivery timings?", a: "We deliver 7 days a week, 11 AM to 11 PM from all 4 locations!" },
  { q: "Do you offer veg options?", a: "Yes! We have a full vegetarian menu including Veggie Supreme Pizza, Paneer Tikka Wrap, and more 🌿" },
  { q: "How long is delivery?", a: "Average delivery time is 25–35 minutes depending on your location and distance." },
  { q: "What payment methods do you accept?", a: "We accept UPI, credit/debit cards, net banking, and cash on delivery!" },
  { q: "Do you have offers?", a: "Yes! First order gets 30% OFF with code HOTPIZZA. Check our menu for more deals 🎉" },
  { q: "Which locations do you serve?", a: "We currently serve Bhilwara, Chittorgargh, Nimbhara, Udaipur." },
  { q: "How to track my order?", a: "You'll receive an SMS with a live tracking link once your order is confirmed!" },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! 🍕 Welcome to HotPizza! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const match = faq.find(f => f.q.toLowerCase().includes(input.toLowerCase()) || input.toLowerCase().includes(f.q.toLowerCase().split(" ")[2]));
    const botReply = { from: "bot", text: match ? match.a : "I'm not sure about that! Please call us or WhatsApp us for quick help. Our team is always ready! 😊" };
    setMessages(prev => [...prev, userMsg, botReply]);
    setInput("");
  };

  return (
    <>
      <button style={s.fab} onClick={() => setOpen(!open)} title="Chat with us">
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div style={s.window}>
          <div style={s.header}>
            <img src="https://img.icons8.com/color/48/pizza.png" alt="" style={{ width: 32, height: 32 }} />
            <div>
              <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>HotPizza Assistant</p>
              <p style={{ color: "#22c55e", fontSize: 11, margin: 0 }}>● Online</p>
            </div>
          </div>

          <div style={s.suggestions}>
            {faq.slice(0, 3).map((f, i) => (
              <button key={i} style={s.suggest} onClick={() => {
                setMessages(prev => [...prev, { from: "user", text: f.q }, { from: "bot", text: f.a }]);
              }}>{f.q}</button>
            ))}
          </div>

          <div style={s.msgs}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                <div style={m.from === "bot" ? s.botMsg : s.userMsg}>{m.text}</div>
              </div>
            ))}
          </div>

          <div style={s.inputRow}>
            <input style={s.input} placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} />
            <button style={s.sendBtn} onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&display=swap');`}</style>
    </>
  );
}

const s = {
  fab: { position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: "var(--chatbot-fab-bg)", border: "none", color: "var(--button-primary-text)", fontSize: 24, cursor: "pointer", zIndex: 400, boxShadow: "0 4px 20px rgba(255,107,0,0.5)", fontFamily: "'Nunito',sans-serif" },
  window: { position: "fixed", bottom: 92, right: 24, width: "min(360px, calc(100vw - 48px))", background: "var(--chatbot-window-bg)", border: "1px solid var(--chatbot-window-border)", borderRadius: 18, zIndex: 400, display: "flex", flexDirection: "column", boxShadow: "0 16px 60px rgba(0,0,0,0.6)", fontFamily: "'Nunito',sans-serif", overflow: "hidden", color: "var(--text-color)" },
  header: { background: "var(--chatbot-header-bg)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--chatbot-header-border)" },
  suggestions: { padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 6, borderBottom: "1px solid #1a1a1a" },
  suggest: { background: "var(--chatbot-suggest-bg)", border: "1px solid var(--chatbot-suggest-border)", color: "var(--chatbot-suggest-text)", borderRadius: 20, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: "'Nunito',sans-serif", whiteSpace: "nowrap" },
  msgs: { flex: 1, overflowY: "auto", padding: "12px", maxHeight: 240, minHeight: 120 },
  botMsg: { background: "var(--chatbot-bot-msg-bg)", color: "var(--chatbot-bot-msg-text)", borderRadius: "16px 16px 16px 4px", padding: "10px 14px", maxWidth: "80%", fontSize: 13, lineHeight: 1.5 },
  userMsg: { background: "var(--chatbot-user-msg-bg)", color: "var(--chatbot-user-msg-text)", borderRadius: "16px 16px 4px 16px", padding: "10px 14px", maxWidth: "80%", fontSize: 13, lineHeight: 1.5 },
  inputRow: { display: "flex", gap: 8, padding: "10px 12px", borderTop: "1px solid var(--chatbot-window-border)" },
  input: { flex: 1, background: "var(--chatbot-input-bg)", border: "1px solid var(--chatbot-input-border)", borderRadius: 10, padding: "10px 14px", color: "var(--chatbot-input-text)", fontSize: 13, fontFamily: "'Nunito',sans-serif", outline: "none" },
  sendBtn: { background: "var(--chatbot-send-btn-bg)", border: "none", borderRadius: 10, width: 40, height: 40, color: "var(--button-primary-text)", fontSize: 16, cursor: "pointer" },
};
