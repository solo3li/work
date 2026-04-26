import React, { createContext, useState, useContext, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }
      return [...currentItems, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === id);
      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        if (updatedItems[existingItemIndex].quantity > 1) {
          updatedItems[existingItemIndex].quantity -= 1;
        } else {
          updatedItems.splice(existingItemIndex, 1);
        }
        return updatedItems;
      }
      return currentItems;
    });
  };

  const clearCart = () => setItems([]);

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalAmount, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
