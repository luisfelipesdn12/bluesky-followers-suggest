import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Bluesky Follow Suggestion",
    icons: [{
        url: "/favicon.png",
    }],
    description: "Score-based follower suggestion for bluesky!",
    authors: [{
        name: "Luis Felipe",
        url: "https://luisf.dev"
    }],
    openGraph: {
        type: "website",
        url: "https://trip.luisf.dev/",
        title: "Bluesky Follow Suggestion",
        description: "Score-based follower suggestion for bluesky!",
        images: [{ url: "/website-card.png" }],
    },
    twitter: {
        card: "summary_large_image",
        images: [{ url: "/website-card.png" }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                    <Analytics />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
