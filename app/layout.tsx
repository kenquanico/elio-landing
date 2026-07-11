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
                url: "/elio-icon-v5.png",
                type: "image/png",
                sizes: "1024x1024",
            },
            {
                url: "/elio-icon-v5.png",
                type: "image/png",
                sizes: "32x32",
            },
        ],
        shortcut: "/elio-icon-v5.png",
        apple: [
            {
                url: "/elio-icon-v5.png",
                type: "image/png",
                sizes: "180x180",
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