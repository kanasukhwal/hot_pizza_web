import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [notification, setNotification] = useState(null);

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

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, i) => sum + parseFloat(i.price.replace("$", "")) * i.qty, 0);
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, count, selectedLocation, setSelectedLocation, notification, showNotification }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
