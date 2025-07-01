// store/useCarouselStore.ts

import { create } from 'zustand';

type SkinItem = {
    id: number;
    image: string;
    name: string;
    price: string;
};

interface ItemsState {
    cs2Skins: SkinItem[];
    dota2Skins: SkinItem[];
}

export const useCarouselStore = create<ItemsState>(() => ({
    cs2Skins: new Array(20).fill(null).map((_, i) => ({
        id: i,
        image: '/img/image26.svg',
        name: 'FN / 0.0009',
        price: '€ 92.85',
    })),
    dota2Skins: new Array(20).fill(null).map((_, i) => ({
        id: i + 100,
        image: '/img/dotaSkin.svg',
        name: 'Reaper’s Wreath',
        price: '€ 4.49',
    })),
}));
