// store/useCartStore.ts

import { create } from 'zustand';

export type Item = {
    id: string;
    name: string;
    rarity: string;
    price: number;
    details: string;
    image: string;
};

interface CartState {
    items: Item[];
    total: number;
    addItem: (item: Item) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: Array.from({ length: 0 }).map((_, i) => ({
        id: `${i + 1}`,
        name: i % 2 === 0 ? 'Glock-18 | Wasteland' : 'Sport Gloves | Vice',
        rarity: i % 2 === 0 ? 'Rebel' : 'Epic',
        price: i % 2 === 0 ? 46.38 : 16889.47,
        details: 'ST / FN / 0.0115',
        image: i % 2 === 0 ? '/img/Glock-18.svg' : '/img/gloves.svg',
    })),
    total: 4 * 46.38,
    addItem: (item) =>
        set((state) => ({
            items: [...state.items, item],
            total: state.total + item.price,
        })),
    removeItem: (id) =>
        set((state) => {
            const updatedItems = state.items.filter((item) => item.id !== id);
            const updatedTotal = updatedItems.reduce((sum, i) => sum + i.price, 0);
            return { items: updatedItems, total: updatedTotal };
        }),
    clearCart: () => set({ items: [], total: 0 }),
}));
