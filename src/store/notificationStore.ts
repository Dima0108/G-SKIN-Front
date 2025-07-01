// store/notificationStore.ts
import { create } from 'zustand';

interface Notification {
    id: number;
    title: string;
    description: string;
    time: string;
    cta?: string;
}

interface State {
    isOpen: boolean;
    notifications: Notification[];
    open: () => void;
    close: () => void;
}

export const useNotificationStore = create<State>((set) => ({
    isOpen: false,
    notifications: [
        {
            id: 1,
            title: 'Your Market status turned offline!',
            description: 'Your Steam trade link is not valid. Your items are not visible to buyers.',
            time: '26.06.25 | 11:56',
        },
        {
            id: 2,
            title: 'Get even more coins!',
            description: 'New task available on G-SKIN TRADER Battle Pass — complete it to earn more coins.',
            time: '26.11.24 | 14:36',
            cta: 'Open',
        },
        {
            id: 3,
            title: 'Get even more coins!',
            description: 'New task available on G-SKIN TRADER Battle Pass — complete it to earn more coins.',
            time: '26.11.24 | 14:36',
        },
        {
            id: 4,
            title: 'Get even more coins!',
            description: 'New task available on G-SKIN TRADER Battle Pass — complete it to earn more coins.',
            time: '26.11.24 | 14:36',
        },
    ],
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));
