'use client';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (product, quantity) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product._id === product._id);
            if (existing) {
                return prev.map((i) =>
                    i.product._id === product._id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [...prev, { product, quantity }];
        });
    };

    const removeItem = (productId) => {
        setItems((prev) => prev.filter((i) => i.product._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeItem(productId);
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.product._id === productId ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => {
        const price = i.product.salePrice || i.product.price;
        return sum + price * i.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);