// store/useCurrencyStore.ts
import { create } from 'zustand';

interface CurrencyState {
    selectedCurrency: string;
    setSelectedCurrency: (code: string) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
    selectedCurrency: 'EUR',
    setSelectedCurrency: (code) => set({ selectedCurrency: code }),
}));
