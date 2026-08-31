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

export const metadata: Metadata = {
  title: "RecipeBook",
  description: "Моя книга рецептів",
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
