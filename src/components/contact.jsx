import { useState } from "react";
import { locations } from "../data/menuData.js";

export default function Contact() {
    const [selectedId, setSelectedId] = useState(locations[0].id);
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const [sent, setSent] = useState(false);

    const selected = locations.find((l) => l.id === selectedId);

    const handleSubmit = () => {
        if (!form.name || !form.phone) return;
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setForm({ name: "", phone: "", message: "" });
    };

    return (
        <div style={{ background: "var(--background-color)", color: "var(--text-color)", minHeight: "100vh", fontFamily: "'Nunito', sans-serif" }}>
            <style>{css}</style>

            <section className="contact-header">
                <h1 className="contact-title">Contact <span style={{ color: "var(--primary-color)" }}>Us</span></h1>
                <p className="contact-sub">Choose a location and get in touch directly with our team!</p>
            </section>

            {/* Location picker */}
            <section className="contact-loc-sec">
                <h2 className="contact-sec-title">Select Location</h2>
                <div className="contact-loc-tabs">
                    {locations.map((loc) => (
                        <button
                            key={loc.id}
                            className={`contact-loc-tab ${selectedId === loc.id ? "contact-loc-active" : ""}`}
                            onClick={() => setSelectedId(loc.id)}
                            style={selectedId === loc.id ? { borderColor: loc.color, background: loc.color + "18" } : {}}
                        >
                            <span>{loc.emoji}</span>
                            <span style={{ fontWeight: 800, fontSize: 14 }}>{loc.name}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Contact cards for selected location */}
            {selected && (
                <section className="contact-detail-sec" key={selected.id}>
                    <div className="contact-grid">
                        {/* Info side */}
                        <div className="contact-info-box">
                            <h2 className="contact-loc-name" style={{ color: selected.color }}>{selected.emoji} {selected.name}</h2>
                            <p className="contact-loc-about">{selected.about}</p>

                            <div className="contact-cards">
                                <div className="contact-card">
                                    <span className="contact-card-icon">📍</span>
                                    <div>
                                        <strong>Address</strong>
                                        <p>{selected.address}</p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <span className="contact-card-icon">🕐</span>
                                    <div>
                                        <strong>Hours</strong>
                                        <p>{selected.hours}</p>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <span className="contact-card-icon">📞</span>
                                    <div>
                                        <strong>Phone</strong>
                                        <a href={`tel:${selected.phone}`} style={{ color: "var(--primary-color)", fontWeight: 700 }}>{selected.phone}</a>
                                    </div>
                                </div>
                                <div className="contact-card">
                                    <span className="contact-card-icon">✉️</span>
                                    <div>
                                        <strong>Email</strong>
                                        <a href={`mailto:${selected.email}`} style={{ color: "var(--primary-color)", fontWeight: 700 }}>{selected.email}</a>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-cta-row">
                                <a
                                    href={`https://wa.me/${selected.whatsapp}?text=Hi! I want to contact HotPizza ${selected.name}`}
                                    target="_blank" rel="noopener noreferrer" className="wa-contact-btn"
                                >
                                    💬 WhatsApp
                                </a>
                                <a href={`tel:${selected.phone}`} className="call-contact-btn">📞 Call Now</a>
                                <a href={selected.mapLink} target="_blank" rel="noopener noreferrer" className="map-contact-btn">🗺️ Directions</a>
                            </div>
                        </div>

                        {/* Form side */}
                        <div className="contact-form-box">
                            <h3 className="contact-form-title">Send us a Message</h3>
                            <p className="contact-form-sub">We'll get back to you within 30 minutes!</p>

                            {sent ? (
                                <div className="contact-success">
                                    <div style={{ fontSize: 48 }}>✅</div>
                                    <h3>Message Sent!</h3>
                                    <p>We'll contact you shortly on {form.phone || "your number"}. Thank you!</p>
                                </div>
                            ) : (
                                <div className="contact-form">
                                    <div className="form-field">
                                        <label className="form-label">Your Name *</label>
                                        <input
                                            className="form-input"
                                            placeholder="Enter your name"
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="form-label">Phone Number *</label>
                                        <input
                                            className="form-input"
                                            placeholder="Enter your phone number"
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            className="form-input form-textarea"
                                            placeholder="Your message or order query..."
                                            value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })}
                                        />
                                    </div>
                                    <button className="form-submit" onClick={handleSubmit}>
                                        Send Message →
                                    </button>
                                    <p className="form-note">Or reach us directly on WhatsApp for instant replies</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Map */}
                    <div className="contact-map">
                        <h3 className="contact-map-title">📍 {selected.name} on the Map</h3>
                        <iframe
                            title={`Contact Map - ${selected.name}`}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(selected.address)}&output=embed&z=16`}
                            width="100%"
                            height="340"
                            style={{ border: 0, borderRadius: 16, display: "block" }}
                            allowFullScreen=""
                            loading="lazy"
                        />
                    </div>
                </section>
            )}
        </div>
    );
}

const css = `
.contact-header {
  text-align: center; padding: 72px 48px 48px;
  background: linear-gradient(135deg, rgba(255,107,0,0.08), transparent);
}
.contact-title { font-size: 50px; font-weight: 900; margin-bottom: 14px; color: var(--text-color); letter-spacing: -1px; }
.contact-sub { font-size: 16px; color: var(--card-desc-color); max-width: 500px; margin: 0 auto; }

.contact-loc-sec { padding: 40px 48px 20px; text-align: center; }
.contact-sec-title { font-size: 28px; font-weight: 800; color: var(--text-color); margin-bottom: 20px; }
.contact-loc-tabs { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.contact-loc-tab {
  display: flex; align-items: center; gap: 8px;
  background: var(--card-background); border: 2px solid var(--card-border);
  border-radius: 14px; padding: 12px 22px; font-family: 'Nunito', sans-serif;
  transition: all 0.3s; font-size: 18px;
}
.contact-loc-tab:hover { transform: translateY(-3px); border-color: var(--primary-color); }
.contact-loc-active { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(255,107,0,0.15); }

.contact-detail-sec { padding: 20px 48px 60px; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 32px; }

.contact-info-box {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 20px; padding: 28px;
}
.contact-loc-name { font-size: 28px; font-weight: 900; margin-bottom: 12px; }
.contact-loc-about { font-size: 13px; color: var(--card-desc-color); line-height: 1.7; margin-bottom: 24px; }

.contact-cards { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.contact-card {
  display: flex; gap: 14px; align-items: flex-start;
  background: var(--section-background-alt); border-radius: 12px;
  padding: 14px; border: 1px solid var(--card-border);
}
.contact-card-icon { font-size: 22px; flex-shrink: 0; }
.contact-card strong { font-size: 12px; font-weight: 800; color: var(--primary-color); text-transform: uppercase; display: block; margin-bottom: 4px; }
.contact-card p, .contact-card a { font-size: 13px; color: var(--card-desc-color); }

.contact-cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
.wa-contact-btn { background: #25D366; color: #fff; border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 700; text-decoration: none; }
.call-contact-btn { background: var(--primary-color); color: #fff; border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 700; text-decoration: none; }
.map-contact-btn { background: var(--section-background-alt); color: var(--text-color); border: 1px solid var(--card-border); border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 700; text-decoration: none; }

.contact-form-box {
  background: var(--card-background); border: 1px solid var(--card-border);
  border-radius: 20px; padding: 28px;
}
.contact-form-title { font-size: 22px; font-weight: 800; color: var(--text-color); margin-bottom: 6px; }
.contact-form-sub { font-size: 13px; color: var(--card-desc-color); margin-bottom: 24px; }

.contact-form { display: flex; flex-direction: column; gap: 16px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 13px; font-weight: 700; color: var(--card-text-color); }
.form-input {
  background: var(--section-background-alt); border: 2px solid var(--card-border);
  color: var(--text-color); border-radius: 12px; padding: 12px 16px;
  font-size: 14px; font-family: 'Nunito', sans-serif; outline: none;
  transition: border-color 0.2s;
}
.form-input:focus { border-color: var(--primary-color); }
.form-textarea { resize: vertical; min-height: 100px; }
.form-submit {
  background: var(--primary-color); color: #fff; border: none; border-radius: 12px;
  padding: 14px; font-weight: 800; font-size: 16px; font-family: 'Nunito', sans-serif;
  transition: background 0.2s, transform 0.15s; margin-top: 4px;
}
.form-submit:hover { background: var(--secondary-color); transform: translateY(-2px); }
.form-note { font-size: 12px; color: var(--card-desc-color); text-align: center; }

.contact-success {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 40px; gap: 12px; text-align: center;
}
.contact-success h3 { font-size: 22px; font-weight: 800; color: #22c55e; }
.contact-success p { font-size: 14px; color: var(--card-desc-color); }

.contact-map { background: var(--card-background); border: 1px solid var(--card-border); border-radius: 20px; padding: 24px; }
.contact-map-title { font-size: 20px; font-weight: 800; color: var(--text-color); margin-bottom: 16px; }

@media (max-width: 768px) {
  .contact-header { padding: 48px 20px 32px; }
  .contact-title { font-size: 36px; }
  .contact-loc-sec { padding: 28px 20px 16px; }
  .contact-detail-sec { padding: 16px 20px 40px; }
  .contact-grid { grid-template-columns: 1fr; }
  .contact-cta-row { flex-direction: column; }
}
@media (max-width: 480px) {
  .contact-title { font-size: 28px; }
  .contact-loc-tabs { gap: 8px; }
  .contact-loc-tab { padding: 10px 14px; }
}
`;