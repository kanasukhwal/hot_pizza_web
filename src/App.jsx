import { Routes, Route } from "react-router-dom";
import HotPizzaLanding from "./components/HotPizzaLanding";
import AboutUs from "./components/screen/AboutUs";
import Layout from "./components/Layout";
import Menu from "./components/Menu";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HotPizzaLanding />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;