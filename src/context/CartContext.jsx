import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Dummy coupons - replace with API later
const COUPONS = {
    HOTPIZZA: { discount: 30, label: "30% OFF", desc: "Welcome offer for new users" },
    PIZZA40: { discount: 40, label: "40% OFF", desc: "Special weekend deal" },
    SPICY20: { discount: 20, label: "20% OFF", desc: "Spicy lover's discount" },
    FIRSTBITE: { discount: 15, label: "15% OFF", desc: "First order discount" },
};

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [notification, setNotification] = useState(null);
    const [coupon, setCoupon] = useState(null);
    const [couponError, setCouponError] = useState("");

    const showNotification = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
        showNotification(`${item.name} added to cart! 🍕`);
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQty = (id, delta) => {
        setCart((prev) =>
            prev
                .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
                .filter((i) => i.qty > 0)
        );
    };

    const clearCart = () => {
        setCart([]);
        setCoupon(null);
        setCouponError("");
    };

    const applyCoupon = (code) => {
        const upper = code.trim().toUpperCase();
        if (COUPONS[upper]) {
            setCoupon({ code: upper, ...COUPONS[upper] });
            setCouponError("");
            showNotification(`Coupon ${upper} applied! ${COUPONS[upper].label} 🎉`);
            return true;
        } else {
            setCouponError("Invalid coupon code. Try HOTPIZZA or PIZZA40");
            return false;
        }
    };

    const removeCoupon = () => {
        setCoupon(null);
        setCouponError("");
    };

    const parsePrice = (price) => {
        if (typeof price === "number") return price;
        return parseFloat(String(price).replace(/[₹$,]/g, "")) || 0;
    };

    const subtotal = cart.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);
    const discountAmount = coupon ? Math.round(subtotal * coupon.discount / 100) : 0;
    const total = subtotal - discountAmount;
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQty, clearCart,
            total, subtotal, discountAmount, count,
            selectedLocation, setSelectedLocation,
            notification, showNotification,
            coupon, couponError, applyCoupon, removeCoupon,
            COUPONS,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);