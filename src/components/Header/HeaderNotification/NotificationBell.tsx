// components/NotificationBell.tsx
'use client';
import { useNotificationStore } from '@/store/notificationStore';
import Image from 'next/image';

export default function NotificationBell() {
    const { open, notifications } = useNotificationStore();

    return (
        <button onClick={open} className="relative flex z-50">
            <Image src="/img/notification.svg" alt="notification" width={28} height={28} />
            <span className="text-base ml-1">{notifications.length}</span>
        </button>
    );
}
