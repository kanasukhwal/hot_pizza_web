import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Notification from "./components/Notification.jsx"; // This was already uncommented
import Home from "./components/HotPizzaLanding.jsx";
import Menu from "./components/Menu.jsx";
import About from "./components/About.jsx";
import Checkout from "./components/Checkout.jsx";
import "./index.css";

// import Home from "./pages";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
        <Footer />
        <Chatbot />
        <Notification />
      </BrowserRouter>
    </CartProvider>
  );
}
