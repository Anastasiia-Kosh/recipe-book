import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "RecipeBook — домашні рецепти",
    template: "%s | RecipeBook",
  },

  description:
    "Перевірені домашні рецепти випічки, десертів та улюблених страв, які хочеться готувати знову.",

  applicationName: "RecipeBook",

  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "RecipeBook",
    title: "RecipeBook — домашні рецепти",
    description:
      "Перевірені домашні рецепти випічки, десертів та улюблених страв, які хочеться готувати знову.",
    url: siteUrl,
    images: [
    {
      url: "/images/og/recipe-book-og.jpg",
      width: 1200,
      height: 630,
      alt: "RecipeBook — домашні рецепти",
    },
  ],
  },
  twitter: {
  card: "summary_large_image",
  title: "RecipeBook — домашні рецепти",
  description:
    "Перевірені домашні рецепти випічки, десертів та улюблених страв, які хочеться готувати знову.",
  images: ["/images/og/recipe-book-og.jpg"],
},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${interTight.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,

              style: {
                width: "min(420px, calc(100vw - 32px))",
                padding: "16px 18px",

                border: "1px solid var(--color-border)",
                borderRadius: "10px",

                background: "var(--color-surface)",
                color: "var(--color-text)",

                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                lineHeight: "1.4",

                boxShadow: "0 10px 30px rgba(48, 38, 34, 0.12)",
              },

              success: {
                iconTheme: {
                  primary: "#a95660",
                  secondary: "#fcf9f5",
                },
              },

              error: {
                style: {
                  border: "1px solid #d8a0a0",
                },

                iconTheme: {
                  primary: "#a65353",
                  secondary: "#fcf9f5",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
