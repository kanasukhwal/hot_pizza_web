import { useState } from "react";
import { locations } from "../data/locations";

const About = () => {
    const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);
    const selectedLocation = locations.find((loc) => loc.id === selectedLocationId);

    return (
        <>
            <style>{aboutCSS}</style>

            <div className="about-container">
                {/* Header */}
                <section className="about-header">
                    <h1 className="about-title">About <span className="accent">Hot Pizza</span></h1>
                    <p className="about-subtitle">
                        Discover our locations and experience authentic, delicious pizzas across multiple cities.
                    </p>
                </section>

                {/* Location Selector */}
                <section className="location-selector-section">
                    <h2 className="section-title">Choose Your Location</h2>
                    <div className="location-buttons">
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                className={`location-btn ${selectedLocationId === loc.id ? "active" : ""}`}
                                onClick={() => setSelectedLocationId(loc.id)}
                            >
                                📍 {loc.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Selected Location Details */}
                {selectedLocation && (
                    <section className="location-details">
                        <div className="location-header">
                            <h2 className="location-name">{selectedLocation.name}</h2>
                            <p className="location-about">{selectedLocation.about}</p>
                        </div>

                        <div className="location-info-grid">
                            {/* Address */}
                            <div className="info-card">
                                <div className="info-icon">📍</div>
                                <div className="info-content">
                                    <h3>Address</h3>
                                    <p>{selectedLocation.address}</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="info-card">
                                <div className="info-icon">🕐</div>
                                <div className="info-content">
                                    <h3>Hours</h3>
                                    <p>{selectedLocation.hours}</p>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="info-card">
                                <div className="info-icon">💰</div>
                                <div className="info-content">
                                    <h3>Price Range</h3>
                                    <p>{selectedLocation.priceRange}</p>
                                </div>
                            </div>

                            {/* Specialties */}
                            <div className="info-card">
                                <div className="info-icon">⭐</div>
                                <div className="info-content">
                                    <h3>Specialties</h3>
                                    <p>{selectedLocation.specialties}</p>
                                </div>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="menu-section">
                            <h3 className="menu-title">Menu at {selectedLocation.name}</h3>
                            <div className="menu-items">
                                {selectedLocation.menu.map((item, idx) => (
                                    <div key={idx} className="menu-item">
                                        <span className="item-name">{item.name}</span>
                                        <span className="item-price">₹{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="map-section">
                            <h3 className="map-title">Find Us On Map</h3>
                            <iframe
                                src={selectedLocation.map}
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: "12px" }}
                                allowFullScreen=""
                                loading="lazy"
                                title={selectedLocation.name + " map"}
                            ></iframe>
                        </div>
                    </section>
                )}

                {/* Why Choose Us */}
                <section className="why-us-section">
                    <h2 className="section-title">Why Choose <span className="accent">Hot Pizza</span>?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔥</div>
                            <h4>Fresh & Hot</h4>
                            <p>Always served blazing hot straight from our ovens</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h4>Fast Delivery</h4>
                            <p>30-minute delivery guarantee or free next order</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h4>Quality Ingredients</h4>
                            <p>Premium toppings and fresh cheese in every bite</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💚</div>
                            <h4>Customer Service</h4>
                            <p>Available 24/7 to fulfill your pizza cravings</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;

const aboutCSS = `
:root {
  --primary-color: #FF6B00;
  --text-color: #333;
  --background-color: #f0f2f5;
  --card-background: #fff;
  --card-border: #e0e0e0;
  --card-text-color: #333;
  --card-desc-color: #666;
}

html.dark-theme {
  --primary-color: #FF6B00;
  --text-color: #fff;
  --background-color: #0f0f0f;
  --card-background: #141414;
  --card-border: #222;
  --card-text-color: #fff;
  --card-desc-color: #aaa;
}

.accent { color: var(--primary-color); }

.about-container {
  background: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
}

/* Header */
.about-header {
  text-align: center;
  padding: 80px 48px 60px;
  background: linear-gradient(135deg, rgba(255,107,0,0.1), rgba(255,107,0,0.05));
}

.about-title {
  font-size: 56px;
  font-weight: 900;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.about-subtitle {
  font-size: 18px;
  color: var(--card-desc-color);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Location Selector */
.location-selector-section {
  padding: 60px 48px;
  text-align: center;
}

.section-title {
  font-size: 38px;
  font-weight: 900;
  margin-bottom: 40px;
  letter-spacing: -0.5px;
}

.location-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.location-btn {
  background: var(--card-background);
  border: 2px solid var(--card-border);
  color: var(--card-text-color);
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
  font-family: 'Nunito', sans-serif;
  transition: all 0.3s;
}

.location-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.location-btn.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

/* Location Details */
.location-details {
  padding: 60px 48px;
  background: var(--card-background);
  margin: 0 48px 60px;
  border-radius: 20px;
  border: 1px solid var(--card-border);
}

.location-header {
  margin-bottom: 50px;
  text-align: center;
}

.location-name {
  font-size: 42px;
  font-weight: 900;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.location-about {
  font-size: 16px;
  line-height: 1.8;
  color: var(--card-desc-color);
  max-width: 700px;
  margin: 0 auto;
}

/* Info Grid */
.location-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 50px;
}

.info-card {
  background: var(--background-color);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  gap: 16px;
  transition: all 0.3s;
}

.info-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(255,107,0,0.1);
}

.info-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--card-text-color);
}

.info-content p {
  font-size: 14px;
  color: var(--card-desc-color);
  line-height: 1.6;
}

/* Menu Section */
.menu-section {
  margin-bottom: 50px;
  padding-top: 40px;
  border-top: 1px solid var(--card-border);
}

.menu-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--card-text-color);
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.menu-item {
  background: var(--background-color);
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--card-border);
}

.item-name {
  font-weight: 700;
  font-size: 15px;
  color: var(--card-text-color);
}

.item-price {
  font-weight: 800;
  font-size: 18px;
  color: var(--primary-color);
}

/* Map Section */
.map-section {
  margin-bottom: 50px;
  padding-top: 40px;
  border-top: 1px solid var(--card-border);
}

.map-title {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--card-text-color);
}

/* Why Us Section */
.why-us-section {
  padding: 60px 48px;
  background: linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,107,0,0.03));
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  background: var(--card-background);
  border-radius: 16px;
  border: 1px solid var(--card-border);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(255,107,0,0.12);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h4 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 12px;
  color: var(--card-text-color);
}

.feature-card p {
  font-size: 14px;
  color: var(--card-desc-color);
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .about-header { padding: 60px 20px 40px; }
  .about-title { font-size: 42px; }
  .about-subtitle { font-size: 15px; }
  .location-selector-section { padding: 40px 20px; }
  .location-details { margin: 0 20px 40px; padding: 40px 20px; }
  .location-name { font-size: 36px; }
  .location-about { font-size: 14px; }
  .info-grid { gap: 16px; }
  .menu-items { grid-template-columns: 1fr; }
  .why-us-section { padding: 40px 20px; }
}

@media (max-width: 480px) {
  .about-title { font-size: 32px; }
  .section-title { font-size: 28px; }
  .location-buttons { gap: 8px; }
  .location-btn { padding: 10px 18px; font-size: 13px; }
  .location-name { font-size: 28px; }
  .location-info-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; gap: 16px; }
}
`;