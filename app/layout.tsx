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

const iconVersion = "4";

export const metadata: Metadata = {
    title: {
        default: "Elio - Your Offline-First Health Companion",
        template: "%s | Elio",
    },

    applicationName: "Elio",

    description:
        "Manage medications, health records, insurance, reminders, and everyday health tasks with Elio.",

    icons: {
        icon: [
            {
                url: `/Elio_New.png?v=${iconVersion}`,
                type: "image/png",
                sizes: "1024x1024",
            },
        ],

        shortcut: [
            {
                url: `/Elio_New.png?v=${iconVersion}`,
                type: "image/png",
            },
        ],

        apple: [
            {
                url: `/Elio_New.png?v=${iconVersion}`,
                type: "image/png",
                sizes: "180x180",
            },
        ],

        other: [
            {
                rel: "mask-icon",
                url: "/elio-land.svg",
                color: "#062541",
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
        <body className={`${inter.variable} ${jakarta.variable}`}>
        {children}
        </body>
        </html>
    );
}