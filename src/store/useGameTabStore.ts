// store/useGameTabStore.ts
import { create } from 'zustand';

type GameTab = 'cs2' | 'dota2';

interface GameTabState {
    activeTab: GameTab;
    setActiveTab: (tab: GameTab) => void;
}

export const useGameTabStore = create<GameTabState>((set) => ({
    activeTab: 'cs2',
    setActiveTab: (tab) => set({ activeTab: tab }),
}));
