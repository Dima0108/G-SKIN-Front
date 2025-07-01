'use client';

import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { useCurrencyStore } from '../../../store/useCurrencyStore';

const currencies = [
    { symbol: '$', code: 'USD' },
    { symbol: '₽', code: 'RUB' },
    { symbol: 'zł', code: 'PLN' },
    { symbol: '¥', code: 'CNY' },
    { symbol: '£', code: 'GBP' },
    { symbol: '€', code: 'EUR' },
];

const CurrencySwitcher = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 text-white cursor-pointer"
            >
                <span>{selectedCurrency}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-black border border-gray-600 rounded shadow-lg max-h-40 overflow-y-auto z-50 custom-scroll w-28 text-white">
                    {currencies.map(({ symbol, code }) => (
                        <div
                            key={code}
                            className="flex items-center px-3 py-2 gap-2 hover:bg-[#FFD300] hover:text-black cursor-pointer"
                            onClick={() => {
                                setSelectedCurrency(code);
                                setIsOpen(false);
                            }}
                        >
                            <span className="font-bold">{symbol}</span>
                            <span>{code}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySwitcher;