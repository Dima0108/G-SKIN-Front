'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useCarouselStore } from '../../store/useCarouselStore';
import { useGameTabStore } from '@/store/useGameTabStore';

export const SkinsCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrolling, setScrolling] = useState(false);
    const { activeTab } = useGameTabStore();

    const { cs2Skins, dota2Skins } = useCarouselStore();
    const skins = activeTab === 'cs2' ? cs2Skins : dota2Skins;

    const accentColor = activeTab === 'cs2' ? '#FFD300' : '#FF574E';
    const cardWidth = 130 + 12;

    const scrollNext = () => {
        if (!scrollRef.current) return;

        const el = scrollRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;

        setScrolling(true);

        if (el.scrollLeft >= maxScroll - cardWidth) {
            el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            el.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }

        setTimeout(() => setScrolling(false), 600);
    };

    return (
        <div className="relative w-full bg-black text-white py-4 px-8 z-50">
            <div className="flex gap-3 items-start w-[1240px] max-w-full">
                {/* Статистика */}
                <div className="text-sm min-w-[160px] shrink-0">
                    <div className="text-sm uppercase">Total sales of the website</div>
                    <div className="text-2xl mt-1">333,326,746</div>
                    <button
                        className="mt-1 text-sm"
                        style={{ color: accentColor }}
                    >
                        Purchase History
                    </button>
                </div>

                {/* Карусель */}
                <div className="relative w-[1150px]">
                    <div
                        ref={scrollRef}
                        className="flex gap-3 overflow-x-hidden pr-10"
                        style={{
                            scrollBehavior: 'smooth',
                            pointerEvents: scrolling ? 'none' : 'auto',
                        }}
                    >
                        {skins.map((skin) => (
                            <div
                                key={skin.id}
                                className="min-w-[130px] bg-[#1a1a1a] border border-white/10 pb-4 text-sm shrink-0"
                            >
                                <Image src={skin.image} alt="skin" width={130} height={60} className="mx-auto" />
                                <div className="mt-1 pl-3">{skin.name}</div>
                                <div className="text-white/70 pl-3">{skin.price}</div>
                            </div>
                        ))}
                    </div>

                    {/* Кнопка пролистывания */}
                    <button
                        onClick={scrollNext}
                        className="absolute right-[-40px] top-1/2 -translate-y-1/2 bg-white text-black w-8 h-8 flex items-center justify-center rounded shadow hover:bg-gray-200 transition"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};
