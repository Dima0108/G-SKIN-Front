// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                monomaniac: ['var(--font-monomaniac)'],
            },
        },
    },
    plugins: [],
};

export default config;