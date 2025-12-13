import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                zomato: {
                    primary: '#E23744',
                    secondary: '#F4F4F2',
                    black: '#1C1C1C',
                    gray: '#363636',
                    lightGray: '#9C9C9C',
                    white: '#FFFFFF',
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [],
};
export default config;
