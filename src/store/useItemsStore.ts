// store/useItemsStore.ts

import { create } from 'zustand';

export type Item = {
    id: number;
    name: string;
    rarity: string;
    price: number;
    image: string;
    discount: number;
    time: string;
};

interface ItemsStore {
    cs2Items: Item[];
    dota2Items: Item[];
}

export const useItemsStore = create<ItemsStore>(() => ({
    cs2Items: Array.from({ length: 35 }).map((_, i) => ({
        id: i,
        name: i % 2 === 0 ? 'Glock-18 | Wasteland Rebel' : 'Sport Gloves | Vice',
        rarity: 'ST / FN / 0.0115',
        price: i % 2 === 0 ? 46.38 : 16889.47,
        image: i % 2 === 0 ? '/img/Glock-18.svg' : '/img/gloves.svg',
        discount: i % 2 === 0 ? 4 : 24,
        time: '1m',
    })),
    dota2Items: Array.from({ length: 35 }).map((_, i) => ({
        id: i + 100,
        name: i % 2 === 0 ? 'Arms of Desolation' : 'Apogee of the Guardian Flame',
        rarity: 'Immortal',
        price: i % 2 === 0 ? 340.12 : 4200.00,
        image: i % 2 === 0 ? '/img/Arms_of_Desolation.svg' : '/img/Apogee_of_the_Guardian_Flame.svg',
        discount: i % 2 === 0 ? 10 : 18,
        time: '2m',
    })),
}));