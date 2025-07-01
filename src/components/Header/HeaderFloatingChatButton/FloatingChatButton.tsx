'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Paperclip, Smile, Send } from 'lucide-react';

export const FloatingChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'support', text: 'Привет! Чем можем помочь?' },
        { from: 'user', text: 'Есть вопрос по товару' },
    ]);
    const [input, setInput] = useState('');

    const containerRef = useRef<HTMLDivElement | null>(null);
    const chatRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Показывать кнопку только если блок товаров в зоне видимости
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Автоскролл вниз при отправке
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Закрытие при клике вне окна
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (
                chatRef.current &&
                !chatRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleChat = () => setIsOpen(prev => !prev);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { from: 'user', text: input }]);
        setInput('');
    };

    return (
        <>
            {/* Контейнер товаров — оберни им блок карточек */}
            <div ref={containerRef} className="relative" />

            {visible && (
                <button
                    ref={buttonRef}
                    onClick={toggleChat}
                    className="fixed bottom-2 right-[55px] z-50 w-[70px] h-[70px] bg-gradient-to-br from-yellow-400 to-orange-500 border-2 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition"
                    aria-label="Open chat"
                >
                    <Image src="/img/chat-icon.svg" alt="Chat" width={30} height={30} />
                </button>
            )}

            {isOpen && (
                <div
                    ref={chatRef}
                    className="fixed bottom-24 right-6 z-40 w-[320px] h-[450px] bg-black border border-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
                >
                    <div className="flex justify-between items-center bg-[#1c1c1c] p-3">
                        <span className="text-white text-base">Support Chat</span>
                        <div className="flex gap-2">
                            <button className="text-black bg-white text-xs px-2 py-1 rounded">Support</button>
                            <button className="text-white bg-[#ff4d4d] text-xs px-2 py-1 rounded">FAQ</button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-2 p-4 text-sm overflow-y-auto bg-black">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`whitespace-pre-line px-3 py-2 rounded-xl max-w-[80%] ${
                                    msg.from === 'user'
                                        ? 'self-end bg-white text-black'
                                        : 'bg-yellow-400 text-black'
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-2 border-t border-[#333] bg-[#1c1c1c]">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Send message..."
                                className="flex-1 px-3 py-2 text-sm bg-black text-white border border-[#444] rounded"
                            />
                            <button className="text-white hover:text-yellow-400">
                                <Smile size={20} />
                            </button>
                            <button className="text-white hover:text-yellow-400">
                                <Paperclip size={20} />
                            </button>
                            <button onClick={handleSend} className="text-white hover:text-yellow-400">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
