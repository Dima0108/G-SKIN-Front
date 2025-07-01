'use client';

import itemSidebar from './itemSidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useGameTabStore } from '@/store/useGameTabStore';

export default function Sidebar() {
    const pathname = usePathname();
    const { activeTab } = useGameTabStore();
    const isDota = activeTab === 'dota2';
    const activeColor = isDota ? '#FF574E' : '#FFD300';

    return (
        <aside className="w-[70px] bg-[#171717] text-white h-[1126px] py-6 mt-9 flex flex-col text-center items-center z-[-1px]">
            <nav className="flex flex-col">
                {itemSidebar.map(({ name, href, icon, iconActive, iconDota, iconDotaActive }) => {
                    const isMarketPage = pathname.startsWith('/market');
                    const isActive =
                        (href === '/buy' && isMarketPage) || pathname === href;

                    const iconSrc = isDota
                        ? isActive
                            ? iconDotaActive || iconActive
                            : iconDota || icon
                        : isActive
                            ? iconActive
                            : icon;

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center gap-1 px-4 py-3 rounded transition ${
                                isActive ? `text-[${activeColor}]` : 'text-white hover:opacity-80'
                            }`}
                        >
                            <Image src={iconSrc} alt={name} width={24} height={24} />
                            <span className="text-sm">{name}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
