'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FiltersCS2Props {
    onSearchChange: (value: string) => void;
    onPriceChange: (min: string, max: string) => void;
}

const FiltersCS2 = ({ onSearchChange, onPriceChange }: FiltersCS2Props) => {
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [openedFilters, setOpenedFilters] = useState<Record<string, boolean>>({});

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearchChange(value);
    };

    const handlePriceChange = (min: string, max: string) => {
        setPriceMin(min);
        setPriceMax(max);
        onPriceChange(min, max);
    };

    const toggleFilter = (label: string) => {
        setOpenedFilters((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside className="w-[270px] p-5 text-white select-none">
            {/* Поиск */}
            <div className="relative mb-3">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full h-[30px] pl-3 pr-8 bg-[#e8f4d9] text-black/50 font-light text-sm rounded-sm outline-none"
                />
                <Image
                    src="/img/search.svg"
                    alt="search"
                    width={26}
                    height={26}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                />
            </div>

            {/* Категория */}
            <div className="w-full bg-[#FFD300] text-black text-xl text-center py-2 mb-3 rounded-sm">
                CATEGORY
            </div>

            {/* Заголовок */}
            <div className="uppercase text-lg mb-1">FILTERS:</div>

            {/* Список фильтров */}
            <div className="flex flex-col gap-[6px] text-base">
                {[
                    'Saved filter',
                    'Price',
                    'Delivery Speed',
                    'Quality',
                    'Rarity',
                    'Color',
                    'Collection',
                    'Other',
                    'Float',
                    'Phase',
                ].map((label) => {
                    const isOpen = openedFilters[label];
                    return (
                        <div key={label}>
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFilter(label)}
                            >
                                <span>{label}</span>
                                <span className="text-white/60 text-base">
                                    {isOpen ? '−' : '+'}
                                </span>
                            </div>

                            {/* Пример: блок для Price */}
                            {label === 'Price' && isOpen && (
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        value={priceMin}
                                        onChange={(e) => handlePriceChange(e.target.value, priceMax)}
                                        placeholder="€ 0.00"
                                        className="w-1/2 bg-white text-black text-center text-xs px-2 py-[5px] rounded-sm"
                                    />
                                    <span className="text-white text-xs">-</span>
                                    <input
                                        value={priceMax}
                                        onChange={(e) => handlePriceChange(priceMin, e.target.value)}
                                        placeholder="€ 0.00"
                                        className="w-1/2 bg-white text-black text-center text-xs px-2 py-[5px] rounded-sm"
                                    />
                                </div>
                            )}

                            {/* Можно позже добавить аналогично другие фильтры */}
                        </div>
                    );
                })}
            </div>

            {/* Кнопки */}
            <div className="flex items-center justify-between mt-4 gap-2">
                <button
                    className="w-1/2 bg-white text-black text-sm py-[5px] rounded-sm"
                    onClick={() => {
                        setSearchTerm('');
                        setPriceMin('');
                        setPriceMax('');
                        onSearchChange('');
                        onPriceChange('', '');
                    }}
                >
                    Reset
                </button>
                <button className="w-1/2 bg-[#FFD300] text-black text-sm py-[5px] rounded-sm flex items-center justify-center gap-1">
                    Save
                    <Image
                        src="/img/save.svg"
                        alt="save"
                        width={14}
                        height={14}
                        className="inline-block pt-1"
                    />
                </button>
            </div>

            {/* Стикеры */}
            <div className="mt-5">
                <div className="text-base mb-1">Stickers</div>
                <div className="relative mb-2">
                    <input
                        type="text"
                        placeholder="Sticker Search..."
                        className="w-full h-[30px] pl-3 pr-8 bg-[#e8f4d9] text-black text-xs rounded-sm outline-none"
                    />
                    <Image
                        src="/img/search-grey.svg"
                        alt="search"
                        width={26}
                        height={26}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    />
                </div>

                <div className="bg-black/30 p-1 rounded-sm">
                    <Image
                        src="/img/Ad-image.svg"
                        alt="sticker"
                        width={200}
                        height={70}
                        className="rounded-sm"
                    />
                </div>
            </div>
        </aside>
    );
};

export default FiltersCS2;
