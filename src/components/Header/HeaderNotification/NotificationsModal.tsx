'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useNotificationStore } from '@/store/notificationStore';

export default function NotificationsModal() {
    const { isOpen, notifications, close } = useNotificationStore();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                close();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, close]);

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="absolute right-108 top-18 z-10 w-[400px] h-[300px] overflow-y-auto bg-black text-white border border-white rounded p-4 shadow-lg"
        >
            <h2 className="text-lg mb-4">Notifications</h2>

            {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[220px] text-gray-400">
                    <Image
                        src="/img/no-notifications.svg" // или .svg — путь к картинке из public
                        alt="No notifications"
                        width={48}
                        height={48}
                        className="mb-4 "
                    />
                    <p className="text-sm">You didn’t get notifications yet.</p>
                </div>
            ) : (
                notifications.map((n) => (
                    <div key={n.id}>
                        <h3 className="text-sm">{n.title}</h3>
                        <p className="text-xs text-gray-400">{n.time}</p>
                        <p className="text-sm">{n.description}</p>
                        {n.cta && (
                            <button className="bg-yellow-400 text-black px-2 py-1 mt-2 rounded hover:bg-yellow-300">
                                {n.cta}
                            </button>
                        )}
                        <hr className="my-2 border-white/20" />
                    </div>
                ))
            )}
        </div>
    );
}
