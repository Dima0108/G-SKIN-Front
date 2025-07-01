'use client';
import '../../../../i18n';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import useLanguageStore from '../../../store/useLanguageStore';

const LanguageSwitcher = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguageStore();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', name: 'English', flag: '/img/gb-flag.svg' },
        { code: 'ru', name: 'Русский', flag: '/img/russian.svg' },
        { code: 'de', name: 'Deutsch', flag: '/img/deutch.svg' },
        { code: 'es', name: 'Español', flag: '/img/español.svg' },
        { code: 'fr', name: 'Française', flag: '/img/française.svg' },
        { code: 'ee', name: 'Eesti', flag: '/img/eesti.svg' },
    ];

    const current = languages.find(l => l.code === language);

    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image src={current?.flag || ''} alt={current?.code || ''} width={22} height={22} />
                {isOpen ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-black border border-gray-600 rounded shadow-lg max-h-52 overflow-y-auto z-50 custom-scroll text-white w-40">
                    {languages.map(lang => (
                        <div
                            key={lang.code}
                            className="flex items-center px-3 py-2 gap-2 hover:bg-[#FFD300] hover:text-black cursor-pointer"
                            onClick={() => {
                                setLanguage(lang.code);
                                setIsOpen(false);
                            }}
                        >
                            <Image src={lang.flag} alt={lang.code} width={20} height={20} />
                            <span className="text-sm text-">{lang.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;