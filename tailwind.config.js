/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#B71C1C', // Red Pigment
                    hover: '#9A1818',
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#3E2723', // Deep Brown
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: '#B71C1C',
                    foreground: '#ffffff',
                },
                background: '#E8DCCA', // Platinum/Beige
                surface: '#F5EFE6', // Lighter beige
                surfaceHighlight: '#FFF8F0',

                // Grade specific colors
                'grade-6': '#A1887F', // Argila Seca
                'grade-7': '#A8645E', // Terra Queimada
                'grade-8': '#AF403D', // Ferrugem/Tijolo
                'grade-9': '#B71C1C', // Vermelho Sangue
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
