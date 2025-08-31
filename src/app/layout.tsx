import type {Metadata} from "next";
import {Cormorant_Garamond} from "next/font/google";
import "./globals.css";
import "./normalize.css";

const cormorantGaramond = Cormorant_Garamond({
    variable: "--font-cormorant-garamond",
    weight: ['400', '500', '600', '700'],
    subsets: ["cyrillic"],
});

export const metadata: Metadata = {
    title: "Рецептики",
    description: "Мои рецептики, чтобы вкусно кушать",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="ru">
        <body className={`${cormorantGaramond.variable}  antialiased min-h-screen`}>
        {children}
        </body>
        </html>
    );
}
