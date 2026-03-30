import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "./Cart.jsx";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const loc = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav style={s.nav}>
        <Link to="/" style={s.logo} onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="logo" style={{ width: 40, height: 40, borderRadius: "50%" }} />
          <span style={s.logoTxt}>
            Hot<span style={{ color: "var(--primary-color)" }}>Pizza</span>
          </span>
        </Link>

        <div style={s.links} className="nav-links-desktop">
          {navItems.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              style={{
                ...s.link,
                color: loc.pathname === n.path ? "var(--primary-color)" : "var(--navbar-link-color)",
                borderBottom: loc.pathname === n.path ? "2px solid var(--primary-color)" : "2px solid transparent",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div style={s.right}>
          <button style={s.themeToggleBtn} onClick={toggleTheme} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button style={s.cartBtn} onClick={() => setCartOpen(true)} title="Open cart">
            🛒
            {count > 0 && <span style={s.badge}>{count}</span>}
          </button>
          <Link to="/menu" style={s.orderBtn} className="order-btn-desktop">
            Order Now
          </Link>
          <button
            style={s.burger}
            className="burger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            title="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={s.mobileMenu} className="mobile-menu-open">
          {navItems.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              style={{
                ...s.mobileLink,
                color: loc.pathname === n.path ? "var(--primary-color)" : "var(--navbar-mobile-link-color)",
                background: loc.pathname === n.path ? "var(--primary-color-alpha-15)" : "transparent",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/menu"
            style={{ ...s.orderBtnMobile }}
            onClick={() => setMenuOpen(false)}
          >
            🍕 Order Now
          </Link>
        </div>
      )}

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--background-color); color: var(--text-color); }

        @media (min-width: 769px) {
          .nav-links-desktop { display: flex !important; }
          .burger-btn { display: none !important; }
          .order-btn-desktop { display: inline-block !important; }
          .mobile-menu-open { display: none !important; }
        }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: block !important; }
          .order-btn-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}

const s = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "var(--navbar-bg)",
    position: "sticky",
    top: 0,
    zIndex: 150,
    borderBottom: "1px solid var(--navbar-border)",
    backdropFilter: "blur(12px)",
    fontFamily: "'Nunito', sans-serif",
    gap: 12,
    flexWrap: "nowrap",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "var(--text-color)",
    flexShrink: 0,
  },
  logoEmoji: { fontSize: 28 },
  logoTxt: {
    fontSize: 22,
    fontWeight: 900,
    color: "var(--text-color)",
    letterSpacing: "-0.5px",
  },
  links: {
    display: "flex",
    gap: 4,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
    padding: "6px 14px",
    transition: "color 0.2s, border-color 0.2s",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  themeToggleBtn: {
    background: "var(--navbar-cart-btn-bg)",
    border: "1px solid var(--navbar-cart-btn-border)",
    color: "var(--text-color)",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 16,
    fontFamily: "'Nunito', sans-serif",
    transition: "background 0.2s",
  },
  cartBtn: {
    background: "var(--navbar-cart-btn-bg)",
    border: "1px solid var(--navbar-cart-btn-border)",
    color: "var(--text-color)",
    borderRadius: 10,
    padding: "8px 14px",
    fontSize: 16,
    position: "relative",
    fontFamily: "'Nunito', sans-serif",
    transition: "background 0.2s",
  },
  badge: {
    background: "var(--primary-color)",
    color: "#fff",
    borderRadius: "50%",
    fontSize: 10,
    padding: "2px 6px",
    marginLeft: 3,
    fontWeight: 700,
    position: "absolute",
    top: -8,
    right: -8,
    minWidth: 18,
    textAlign: "center",
  },
  orderBtn: {
    background: "var(--primary-color)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "9px 18px",
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    fontFamily: "'Nunito', sans-serif",
    transition: "background 0.2s, transform 0.15s",
  },
  burger: {
    background: "none",
    border: "none",
    color: "var(--text-color)",
    fontSize: 24,
    fontFamily: "'Nunito', sans-serif",
    padding: "4px 8px",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    background: "var(--navbar-mobile-menu-bg)",
    borderBottom: "1px solid var(--navbar-mobile-menu-border)",
    padding: "12px 16px 20px",
    gap: 0,
    fontFamily: "'Nunito', sans-serif",
    position: "absolute",
    top: 65,
    left: 0,
    right: 0,
    zIndex: 140,
    width: "100%",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
  },
  mobileLink: {
    color: "var(--navbar-mobile-link-color)",
    textDecoration: "none",
    fontSize: 16,
    fontWeight: 700,
    padding: "14px 16px",
    borderBottom: "1px solid var(--navbar-mobile-link-border)",
    display: "block",
    borderRadius: 8,
    margin: "2px 0",
    transition: "color 0.2s, background 0.2s",
  },
  orderBtnMobile: {
    background: "var(--primary-color)",
    color: "#fff",
    borderRadius: 12,
    padding: "12px 16px",
    fontWeight: 800,
    fontSize: 16,
    textDecoration: "none",
    textAlign: "center",
    marginTop: 12,
    display: "block",
    fontFamily: "'Nunito', sans-serif",
  },
};