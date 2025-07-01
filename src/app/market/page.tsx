'use client';

import { useState } from 'react';
import { useGameTabStore } from '../../store/useGameTabStore';
import GamesTabs from '@/components/HeaderGamesTabs/GamesTabs';
import FiltersCS2 from '../../components/FiltersCS2/FiltersCS2';
import ProductCard from '../../components/ProductCard/ProductCard';
import { SkinsCarousel } from '@/components/SkinsCarousel/SkinsCarousel';
import { Footer } from '@/components/Footer/Footer';
import { FloatingChatButton } from '@/components/Header/HeaderFloatingChatButton/FloatingChatButton';
import { useItemsStore } from '../../store/useItemsStore';
import FiltersDota2 from '@/components/FiltersDota2/FiltersDota2';

export default function MarketPage() {
    const { activeTab } = useGameTabStore();
    const { cs2Items, dota2Items } = useItemsStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');

    const backgroundStyle =
        activeTab === 'cs2'
            ? {
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), linear-gradient(180deg, #FFD300, #FF574E)',
            }
            : {
                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), linear-gradient(0deg, #FFD300 0%, #FF574E 100%)',
            };

    const allItems = activeTab === 'cs2' ? cs2Items : dota2Items;

    const filteredItems = allItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const minOk = !priceMin || item.price >= parseFloat(priceMin);
        const maxOk = !priceMax || item.price <= parseFloat(priceMax);
        return matchesSearch && minOk && maxOk;
    });

    return (
        <div className="flex flex-col bg-[#000000] min-h-screen">
            <GamesTabs />
            <FloatingChatButton />

            <div
                className="flex-1 w-full mx-auto text-white transition-colors duration-300"
                style={backgroundStyle}
            >
                <div className="flex mx-auto px-9 gap-6">
                    {/* Sidebar фильтров */}
                    <aside className="w-[270px] h-[1043px] mt-11 mb-9 bg-[#241207] rounded-md">
                        {activeTab === 'dota2' ? (
                            <FiltersDota2
                                onSearchChange={setSearchTerm}
                                onPriceChange={(min, max) => {
                                    setPriceMin(min);
                                    setPriceMax(max);
                                }}
                            />
                        ) : (
                            <FiltersCS2
                                onSearchChange={setSearchTerm}
                                onPriceChange={(min, max) => {
                                    setPriceMin(min);
                                    setPriceMax(max);
                                }}
                            />
                        )}
                    </aside>

                    {/* Контент товаров */}
                    <main className="flex-1">
                        <div className="flex items-center justify-end">
                            <div className="text-sm bg-white text-black mt-2 mr-6 py-1 px-5 flex items-center gap-2 rounded-md">
                                <span>Default Sorting</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative h-[1050px] overflow-y-auto pr-2 pt-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                            <div className="flex flex-wrap gap-4">
                                {filteredItems.map((item) => (
                                    <ProductCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <SkinsCarousel />
            <Footer />
        </div>
    );
}