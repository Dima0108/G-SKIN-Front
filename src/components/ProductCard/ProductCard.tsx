'use client';

import Image from 'next/image';
import { useCartStore } from '../../store/useCartStore';


interface Item {
    id: number;
    image: string;
    name: string;
    rarity: string;
    price: number;
    discount?: number;
    time?: string;
}

interface ProductCardProps {
    item: Item;
}

const ProductCard = ({ item }: ProductCardProps) => {
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        addItem({
            id: String(item.id), // важен тип: string
            name: item.name,
            rarity: item.rarity,
            price: item.price,
            details: '', // если есть - добавь
            image: item.image,
        });
    };

    return (
        <div className="w-[190px] bg-[#1A1A1A] border border-black rounded-sm p-2 text-white text-sm">
            {/* Картинка */}
            <div className="w-full h-[90px] flex items-center justify-center mb-2">
                <Image src={item.image} alt={item.name} width={130} height={90} />
            </div>

            {/* Скидка и иконка */}
            <div className="flex items-center gap-2 text-[12px] mb-1">
                {typeof item.discount === 'number' && item.discount > 0 && (
                    <span className="bg-[#8B3733] text-white px-2 py-0.5 rounded font-medium">
                        -{item.discount}%
                    </span>
                )}
                <span className="inline-flex items-center gap-1 bg-white text-black px-2 py-0.5 rounded">
                    ST
                    <Image src="/img/Drop-Shipping.svg" alt="ds" width={12} height={12} />
                    {item.time}
                </span>
            </div>

            {/* Название */}
            <div className="text-[13px] font-medium leading-tight mb-1">
                {item.name}
            </div>

            {/* Редкость */}
            <div className="text-[13px] text-[#FF6969] font-medium mb-1">
                {item.rarity}
            </div>

            {/* Цена */}
            <div className="text-[15px] font-medium mb-2">
                € {item.price.toFixed(2)}
            </div>

            {/* Корзина */}
            <button
                onClick={handleAddToCart}
                className="w-full h-[32px] bg-[#D9D9D9] flex items-center justify-center rounded-sm"
            >
                <Image src="/img/Shopping-Basket.svg" alt="cart" width={20} height={20} />
            </button>
        </div>
    );
};

export default ProductCard;