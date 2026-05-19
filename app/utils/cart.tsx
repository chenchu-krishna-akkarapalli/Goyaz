"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  imageSrc: string;
  quantity: number;
};

export type AddToCartInput = {
  id: string;
  title: string;
  price: string;
  imageSrc: string;
};

type CartTotals = {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
};

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (input: AddToCartInput) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  totals: CartTotals;
};

const CartContext = createContext<CartContextValue | null>(null);

export function parsePriceINR(s: string): number {
  const match = s.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10) || 0;
}

export function formatINR(value: number): string {
  return `INR ${value.toLocaleString("en-IN")}/-`;
}

const DISCOUNT_RATE = 0.1; // 10% loyalty discount
const TAX_RATE = 0.03;     // 3% GST

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((input: AddToCartInput) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === input.id);
      if (existing) {
        return prev.map((i) =>
          i.id === input.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: input.id,
          title: input.title,
          price: input.price,
          priceValue: parsePriceINR(input.price),
          imageSrc: input.imageSrc,
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const totals: CartTotals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.priceValue * i.quantity, 0);
    const discount = Math.round(subtotal * DISCOUNT_RATE);
    const tax = Math.round((subtotal - discount) * TAX_RATE);
    const total = subtotal - discount + tax;
    const itemCount = items.reduce((n, i) => n + i.quantity, 0);
    return { subtotal, discount, tax, total, itemCount };
  }, [items]);

  const value = useMemo(
    () => ({ items, isOpen, open, close, toggle, addItem, removeItem, increment, decrement, totals }),
    [items, isOpen, open, close, toggle, addItem, removeItem, increment, decrement, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
