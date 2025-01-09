/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors
                'primary': {
                    DEFAULT: '#0077FF',  // primary-blue
                    'dark': '#0056B3',   // dark-blue
                    'light': '#F2F9FF',  // light-blue
                },
                // Secondary Colors
                'secondary': {
                    'orange': '#FF6700',
                    'gold': '#FFC107',
                    'green': '#28A745',
                },
                // Neutral Colors
                'neutral': {
                    'white': '#FFFFFF',
                    'light': '#F5F5F5',    // light-gray
                    'medium': '#CCCCCC',   // medium-gray
                    'dark': '#333333',     // dark-gray
                    'black': '#000000',
                },
                // Tertiary Colors
                'tertiary': {
                    'purple': '#6F42C1',
                    'teal': '#20C997',
                    'red': '#DC3545',
                },
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: 'none',
                        color: '#333',
                        a: {
                            color: '#3182ce',
                            '&:hover': {
                                color: '#2c5282',
                            },
                        },
                    },
                },
            },
            borderRadius: {
                'default': '4px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        function({ addBase }) {
            addBase({
                '*': {
                    '--tw-border-radius': '4px',
                },
            });
        },
    ],
}