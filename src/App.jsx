import { Routes, Route } from "react-router-dom";
import HotPizzaLanding from "./components/HotPizzaLanding";
import AboutUs from "./components/screen/AboutUs";
import Layout from "./components/Layout";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

function App() {
  return (
    <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
      <CartProvider> {/* Wrap with CartProvider */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HotPizzaLanding />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;