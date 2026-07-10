import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
});

const iconVersion = "3";

export const metadata: Metadata = {
    title: {
        default: "Elio",
        template: "%s | Elio",
    },

    applicationName: "Elio",

    description:
        "Your personal health companion for managing medications, health records, insurance, reminders, and everyday health tasks.",
    icons: {
        icon: [
            {
                url: "/Elio_New.png?v=4",
                type: "image/png",
                sizes: "1024x1024",
            },
        ],
        shortcut: "/Elio_New.png?v=4",
        apple: [
            {
                url: "/Elio_New.png?v=4",
                type: "image/png",
                sizes: "1024x1024",
            },
        ],
    },

    appleWebApp: {
        capable: true,
        title: "Elio",
        statusBarStyle: "default",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#F5F5F7",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <head>
            <link
                rel="icon"
                type="image/png"
                href={`/Elio_New.png?v=${iconVersion}`}
            />

            <link
                rel="shortcut icon"
                type="image/png"
                href={`/Elio_New.png?v=${iconVersion}`}
            />

            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href={`/Elio_New.png?v=${iconVersion}`}
            />

            <link
                rel="mask-icon"
                href="/elio-land.svg"
                color="#062541"
            />
        </head>

        <body className={`${inter.variable} ${jakarta.variable}`}>
        {children}
        </body>
        </html>
    );
}