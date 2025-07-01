'use client';

import { useGameTabStore } from '../../store/useGameTabStore';

const GamesTabs = () => {
    const { activeTab, setActiveTab } = useGameTabStore();

    return (
        <div className="flex h-[39.7px] pl-[150px] bg-black z-[-1px]">
            <div className="flex gap-9">
                {/* CS2 */}
                <div
                    onClick={() => setActiveTab('cs2')}
                    className={`
                        cursor-pointer 
                        w-[190px] h-[40px]
                        bg-[#B29300] 
                        text-black 
                        text-base 
                        font-bold 
                        flex items-center justify-center
                        tracking-wide
                        transition-all
                        leading-none
                        ${activeTab === 'cs2' ? '' : ''}
                    `}
                    style={{
                        clipPath: 'polygon(0% 100%, 0% 100%, 15% 0%, 85% 0%, 100% 100%, 100% 100%)',
                    }}
                >
                    CS2
                </div>

                {/* DOTA 2 */}
                <div
                    onClick={() => setActiveTab('dota2')}
                    className={`
                        cursor-pointer 
                        w-[190px] h-[40px]
                        bg-[#B23E36] 
                        text-black 
                        text-base 
                        font-bold 
                        flex items-center justify-center
                        tracking-wide 
                        transition-all
                        leading-none
                        ${activeTab === 'dota2' ? '' : ''}
                    `}
                    style={{
                        clipPath: 'polygon(0% 100%, 0% 100%, 15% 0%, 85% 0%, 100% 100%, 100% 100%)',
                    }}
                >
                    DOTA 2
                </div>
            </div>
        </div>
    );
};

export default GamesTabs;