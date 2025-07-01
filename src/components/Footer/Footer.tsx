'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useGameTabStore } from '@/store/useGameTabStore';

export const Footer = () => {
    const { activeTab } = useGameTabStore();
    const accentColor = activeTab === 'dota2' ? '#FF574E' : '#FFD300';

    return (
        <footer className="bg-black text-white text-xs px-8 py-6 z-100">
            <div className="mx-auto flex flex-wrap justify-between gap-8">
                {/* Блок описания */}
                <div className="max-w-[350px] text-white">
                    <div className="text-base">©2025 goliketrader.com</div>
                    <p className="mt-2 text-white/50 text-sm">
                        Placeholder disclaimer. Serving skins to mankind. Auctoritas
                        Unico est elementum. Viverra gravida sagittis amet.
                    </p>
                </div>

                {/* Линки слева */}
                <div className="flex flex-col gap-1 text-base">
                    <Link href="#" style={{ color: accentColor }}>Help & Support</Link>
                    <Link href="#" style={{ color: accentColor }}>Privacy Policy</Link>
                    <Link href="#" style={{ color: accentColor }}>Terms of use</Link>
                    <Link href="#" style={{ color: accentColor }}>Cookie Policy</Link>
                </div>

                {/* Линки справа */}
                <div className="flex flex-col gap-1 text-base">
                    <Link href="#" style={{ color: accentColor }}>Contact us</Link>
                    <Link href="#" style={{ color: accentColor }}>Purchase History</Link>
                    <Link href="#" style={{ color: accentColor }}>Legal</Link>
                </div>

                {/* Время и платёжки */}
                <div className="text-white/70 text-right text-base">
                    <div>Time on website:</div>
                    <div>1d 18h 25min 58sec</div>
                    <div className="flex gap-2 mt-2 justify-end">
                        <Image src="/img/Payment-Cards.svg" alt="cart" width={170} height={50} />
                    </div>
                </div>
            </div>
        </footer>
    );
};
