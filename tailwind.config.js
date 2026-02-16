/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'sky-clear-start': '#92daea',
                'sky-clear-end': '#275fa5',
                'sky-dark-start': '#32087d',
                'sky-dark-end': '#0a1039',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'drift': 'drift 60s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                drift: {
                    'from': { transform: 'translateX(-100%)' },
                    'to': { transform: 'translateX(100vw)' },
                },
            },
        },
    },
    plugins: [],
}
