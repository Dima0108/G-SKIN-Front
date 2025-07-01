'use client';

import { useState } from 'react';
import { useCartStore } from '../../../store/useCartStore';
import { useGameTabStore } from '../../../store/useGameTabStore';

import NotificationBell from '../HeaderNotification/NotificationBell';
import NotificationsModal from '../HeaderNotification/NotificationsModal';
import LanguageSwitcher from '../HeaderLanguage/LanguageSwitcher';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import CurrencySwitcher from '../HeaderCurrencySwitcher/CurrencySwitcher';
import { CartDrawer } from '../HeaderCartDrawer/CartDrawer';

const Header = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { items } = useCartStore();
    const { activeTab } = useGameTabStore();
    const isDota = activeTab === 'dota2';

    const navItems = [
        { name: 'Market', href: '/market' },
        { name: 'Trade', href: '/trade' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Support', href: '/support' },
    ];

    return (
        <header className="w-full bg-black text-white px-8 py-4 flex items-center">
            {/* Логотип */}
            <Link href="/" className="flex items-center gap-3 mr-10">
                <Image src="/img/logo.svg" alt="Logo" width={100} height={100} />
            </Link>

            {/* Навигация */}
            <nav className="flex gap-8 text-base font-medium">
                {navItems.map(({ name, href }) => {
                    const isActive =
                    name === 'Market'
                        ? pathname === '/' || pathname.startsWith('/market')
                        : pathname.startsWith(href);

                    const activeClass = isDota
                    ? 'text-[#FF574E]'
                    : 'text-[#FFD300]';

                    const hoverClass = isDota
                    ? 'hover:text-[#FF574E]'
                    : 'hover:text-[#FFD300]';

                    return (
                    <Link
                        key={name}
                        href={href}
                        className={`transition ${isActive ? activeClass : `text-white ${hoverClass}`}`}
                    >
                        {name}
                    </Link>
                    );
                })}
                </nav>


            {/* Правая часть */}
            <div className="flex items-center gap-6 ml-auto">
                {/* Уведомления */}
                <div className="flex items-center gap-6 ml-auto">
                    <NotificationBell />
                    <NotificationsModal />
                </div>

                {/* Флаг */}
                <LanguageSwitcher />

                {/* Валюта */}
                <CurrencySwitcher />

                {/* Корзина */}
                <div className="relative flex items-center gap-2">
                    <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
                        <Image src="/img/cart.svg" alt="Cart" width={24} height={24} />
                        {items.length > 0 && (
                            <span className="text-base">{items.length}</span>
                        )}
                    </button>
                    {open && <CartDrawer onClose={() => setOpen(false)} />}
                </div>

                {/* Steam login */}
                <button
                    className={`${
                        isDota
                            ? 'bg-[#FF574E] hover:bg-[#e14c45]'
                            : 'bg-yellow-400 hover:bg-yellow-300'
                    } text-black text-base px-3 py-1.5 rounded transition`}
                >
                    <div className="flex items-center gap-2">
                        <Image src="/img/steam.svg" alt="Steam" width={24} height={24} />
                        Sign in with Steam
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;