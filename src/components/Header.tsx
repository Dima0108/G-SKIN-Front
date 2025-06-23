'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const navItems = [
        { name: 'Market', href: '/market/cs2' },
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
                {navItems.map(({ name, href }) => (
                    <Link
                        key={name}
                        href={href}
                        className={`transition ${pathname.startsWith(href) ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                            }`}
                    >
                        {name}
                    </Link>
                ))}
            </nav>

            {/* Правая часть — уводим вправо */}
            <div className="flex items-center gap-6 ml-auto">
                {/* Иконка уведомлений + 0 */}
                <div className="flex items-center gap-1 text-sm">
                    <Image src="/img/notification.svg" alt="notification" width={28} height={28} />
                    <span>0</span>
                </div>

                {/* Флаг */}
                <div className="flex items-center gap-1 text-sm">
                    <Image src="/img/gb-flag.svg" alt="EN" width={24} height={24} />
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div>

                {/* Валюта */}
                <div className="flex items-center gap-2 text-base">EUR 
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </span>
                </div>

                {/* Корзина */}
                <div className='flex items-center gap-1 text-sm'>
                    <Image src="/img/cart.svg" alt="Cart" width={28} height={28} />
                    <span>0</span>
                </div>

                {/* Steam login */}
                <button className="bg-yellow-400 text-black text-base px-3 py-1.5 rounded hover:bg-yellow-300 transition">
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
