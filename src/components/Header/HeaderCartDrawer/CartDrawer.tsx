'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';

export const CartDrawer = ({ onClose }: { onClose: () => void }) => {
    const { items, total, removeItem, clearCart } = useCartStore();
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    // Закрытие при клике вне блока
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={modalRef}
            className="absolute right-[-190px] top-10 z-50 w-[420px] max-h-[800px] overflow-hidden bg-[#0F0F0F] border border-white rounded-lg shadow-xl text-white p-4"
        >
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                    <Image
                        src="/img/cart-empty.svg"
                        alt="Empty cart"
                        width={50}
                        height={50}
                        className="mb-4"
                    />
                    <h2 className="text-xl">Your cart is empty</h2>
                    <p className="text-sm text-white/60 mt-1">Add items from our inventory.</p>
                    <button
                        onClick={() => {
                            onClose();
                            router.push('/market');
                        }}
                        className="mt-6 bg-[#F4F1E7] text-black px-6 py-2 rounded-sm text-base hover:bg-[#e5e2d7] transition"
                    >
                        Go to Market
                    </button>
                </div>
            ) : (
                <>
                    <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scroll">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex border border-white rounded-md p-3 gap-3 relative bg-[#171717]"
                            >
                                <div className="w-[140px] h-[70px] flex items-center justify-center overflow-hidden">
                                    <Image src={item.image} alt={item.name} width={90} height={60} />
                                </div>

                                <div className="flex flex-col justify-center text-sm">
                                    <div className="flex items-center gap-2 text-xs mb-0.5">
                                        <span className="bg-[#8B3733] text-white text-[12px] px-3 py-0.5 rounded">-4%</span>
                                        <span className="inline-flex items-center gap-1 bg-white text-[12px] text-black/60 px-2 py-0.5 rounded">
                                            1m
                                            <Image
                                                src="/img/Drop-Shipping.svg"
                                                alt="Drop-Shipping"
                                                width={10}
                                                height={10}
                                            />
                                        </span>
                                    </div>
                                    <div className="text-sm leading-tight">{item.name}</div>
                                    <div className="text-sm leading-tight">{item.rarity}</div>
                                    <div className="text-xs">{item.details}</div>
                                    <div className="text-sm mt-0.5">€ {item.price.toFixed(2)}</div>
                                </div>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute top-0 right-3 text-white/60 hover:text-red-500 text-lg"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="w-full mt-4 pt-4 flex justify-between items-center text-sm">
                        <div>
                            <div className="text-white text-base">Total</div>
                            <div className="text-lg">€ {total.toFixed(2)}</div>
                        </div>
                        <div>
                            <div className="text-white text-base">Items</div>
                            <div className="text-lg">{items.length}</div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col gap-2">
                        <button className="w-full bg-[#F4F1E7] text-black py-2 rounded-sm text-base hover:bg-[#e5e2d7] transition">
                            Buy
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full border border-white text-white py-2 rounded-sm text-base hover:bg-white hover:text-black transition"
                        >
                            Empty
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
