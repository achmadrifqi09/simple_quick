/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-royal-blue": "#2F80ED",
                "primary-emperor": "#4F4F4F",
                "primary-gray": "#828282",
                "primary-alto": "#E0E0E0",
                "gray-border": "#BDBDBD",
                "notification-rajah": "#F8B76B",
                "notification-malibu": "#8785FF",
                "notification-brunt-sienna": "#EB5757",
                "notification-cream-can": "#F2C94C",
                concrete: "#F2F2F2",
                "sticker-zumthor": "#E9F3FF",
                "sticker-flesh": "#FDCFA4",
                "sticker-givry": "#F9E9C3",
                "sticker-cruise": "#AFEBDB",
                "sticker-tea-green": "#CBF1C2",
                "sticker-perfume": "#CFCEF9",
                "sticker-white-pointer": "#F9E0FD",

                "chat-pearl-lusta": "#FCEED3",
                "chat-tulip-tree": "#E5A443",

                "chat-blue-chalk": "#EEDCFF",
                "chat-medium-purple": "#9B51E0",

                "chat-iceberg": "#D2F2EA",
                "chat-ocean-green": "#43B78D",
            },
            screens: {
                xs: "480px",
            },
            fontFamily: {
                lato: ["Lato", "sans-serif"],
            },
        },
    },
    plugins: [],
};
