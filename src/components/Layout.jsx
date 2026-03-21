import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
];

export default function Layout() {
    const [cartCount, setCartCount] = useState(0);

    return (
        <div style={styles.root}>
            <nav style={styles.nav}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={styles.navLogo}>
                        <span style={styles.logoIcon}>🍕</span>
                        <span style={styles.logoText}>
                            Hot<span style={styles.logoAccent}>Pizza</span>
                        </span>
                    </div>
                </Link>
                <div style={styles.navLinks}>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            style={({ isActive }) => ({
                                ...styles.navLink,
                                color: isActive ? "#FF6B00" : "#ccc",
                                borderBottom: isActive
                                    ? "2px solid #FF6B00"
                                    : "2px solid transparent",
                            })}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <div style={styles.navRight}>
                    <button style={styles.cartBtn}>
                        🛒 <span style={styles.cartBadge}>{cartCount}</span>
                    </button>
                    <button style={styles.orderNowBtn}>Order Now</button>
                </div>
            </nav>

            <main>
                <Outlet context={{ setCartCount }} />
            </main>

            <footer style={styles.footer}>
                <div style={styles.footerTop}>
                    <div>
                        <div style={styles.navLogo}>
                            <span style={styles.logoIcon}>🍕</span>
                            <span style={styles.logoText}>
                                Hot<span style={styles.logoAccent}>Pizza</span>
                            </span>
                        </div>
                        <p
                            style={{
                                color: "#888",
                                maxWidth: 260,
                                marginTop: 12,
                                fontSize: 14,
                            }}
                        >
                            Hot, fresh, and delivered fast. The city's favorite pizza brand
                            since 2018.
                        </p>
                    </div>
                    <div style={styles.footerLinks}>
                        {["Menu", "About Us", "Careers", "Blog"].map((l) => (
                            <button key={l} style={styles.footerLink}>
                                {l}
                            </button>
                        ))}
                    </div>
                    <div style={styles.footerLinks}>
                        {["Help Center", "Privacy", "Terms", "Contact"].map((l) => (
                            <button key={l} style={styles.footerLink}>
                                {l}
                            </button>
                        ))}
                    </div>
                    <div>
                        <p style={{ color: "#888", fontSize: 13, marginBottom: 10 }}>
                            Download App
                        </p>
                        <button style={styles.appBtn}>🍎 App Store</button>
                        <button style={{ ...styles.appBtn, marginTop: 8 }}>
                            🤖 Google Play
                        </button>
                    </div>
                </div>
                <div style={styles.footerBottom}>
                    <p>© 2026 HotPizza. All rights reserved.</p>
                    <p>Made with ❤️ & 🍕</p>
                </div>
            </footer>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f0f; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(5deg); } }
        @keyframes orbit1 { 0% { transform: rotate(0deg) translateX(110px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); } }
        @keyframes orbit2 { 0% { transform: rotate(120deg) translateX(110px) rotate(-120deg); } 100% { transform: rotate(480deg) translateX(110px) rotate(-480deg); } }
        @keyframes orbit3 { 0% { transform: rotate(240deg) translateX(110px) rotate(-240deg); } 100% { transform: rotate(600deg) translateX(110px) rotate(-600deg); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,107,0,0.4); } 50% { box-shadow: 0 0 0 20px rgba(255,107,0,0); } }
      `}</style>
        </div>
    );
}

const styles = {
    root: {
        fontFamily: "'Nunito', sans-serif",
        background: "#0f0f0f",
        color: "#fff",
        minHeight: "100vh",
    },
    nav: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 48px",
        background: "rgba(15,15,15,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid #222",
        backdropFilter: "blur(12px)",
    },
    navLogo: { display: "flex", alignItems: "center", gap: 10 },
    logoIcon: { fontSize: 28 },
    logoText: { fontSize: 24, fontWeight: 900, letterSpacing: 1 },
    logoAccent: { color: "#FF6B00" },
    navLinks: { display: "flex", gap: 4 },
    navLink: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 15,
        fontWeight: 600,
        padding: "6px 16px",
        fontFamily: "'Nunito', sans-serif",
        transition: "color 0.2s",
        textDecoration: "none",
    },
    navRight: { display: "flex", alignItems: "center", gap: 14 },
    cartBtn: {
        background: "#1a1a1a",
        border: "1px solid #333",
        color: "#fff",
        borderRadius: 10,
        padding: "8px 16px",
        fontSize: 16,
        cursor: "pointer",
        position: "relative",
        fontFamily: "'Nunito', sans-serif",
    },
    cartBadge: {
        background: "#FF6B00",
        color: "#fff",
        borderRadius: "50%",
        fontSize: 11,
        padding: "1px 6px",
        marginLeft: 4,
        fontWeight: 700,
    },
    orderNowBtn: {
        background: "#FF6B00",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "10px 22px",
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
        fontFamily: "'Nunito', sans-serif",
    },
    footer: {
        background: "#0a0a0a",
        borderTop: "1px solid #1a1a1a",
        padding: "60px 48px 28px",
    },
    footerTop: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
        gap: 40,
        marginBottom: 48,
    },
    footerLinks: { display: "flex", flexDirection: "column", gap: 10 },
    footerLink: {
        background: "none",
        border: "none",
        color: "#888",
        cursor: "pointer",
        fontSize: 14,
        textAlign: "left",
        fontFamily: "'Nunito', sans-serif",
        transition: "color 0.2s",
    },
    appBtn: {
        display: "block",
        width: "100%",
        background: "#1a1a1a",
        border: "1px solid #333",
        color: "#ccc",
        borderRadius: 10,
        padding: "10px 16px",
        fontSize: 13,
        cursor: "pointer",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 600,
        textAlign: "left",
    },
    footerBottom: {
        borderTop: "1px solid #1a1a1a",
        paddingTop: 24,
        display: "flex",
        justifyContent: "space-between",
        color: "#555",
        fontSize: 13,
    },
};