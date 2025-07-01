interface SidebarItem {
    name: string;
    href: string;
    icon: string;
    iconActive: string;
    iconDota?: string;
    iconDotaActive?: string;
}

const itemSidebar: SidebarItem[] = [
    {
        name: 'Buy',
        href: '/buy',
        icon: '/img/Buy.svg',
        iconActive: '/img/Buy-active.svg',
        iconDota: '/img/Buy.svg',
        iconDotaActive: '/img/Buy-dota-active.svg',
    },
    {
        name: 'Instant Sell',
        href: '/InstantSell',
        icon: '/img/Instant-sell.svg',
        iconActive: '/img/Instant-sell-active.svg',
        iconDota: '/img/Instant-sell.svg',
        iconDotaActive: '/img/Instant-sell-dota-active.svg',
    },
    {
        name: 'Sell',
        href: '/sell',
        icon: '/img/Sell.svg',
        iconActive: '/img/Sell-active.svg',
        iconDota: '/img/Instant-sell.svg',
        iconDotaActive: '/img/Sell-dota-active.svg',
    },
    {
        name: 'Cashout',
        href: '/cashout',
        icon: '/img/Cashout.svg',
        iconActive: '/img/Cashout-active.svg',
        iconDota: '/img/Instant-sell.svg',
        iconDotaActive: '/img/Cashout-dota-active.svg',
    },
    {
        name: 'History',
        href: '/history',
        icon: '/img/History.svg',
        iconActive: '/img/History-active.svg',
        iconDota: '/img/Instant-sell.svg',
        iconDotaActive: '/img/History-dota-active.svg',
    },
];

export default itemSidebar;
