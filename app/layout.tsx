import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { LayoutProps } from "@/.next/types/app/layout";

import "@/styles/globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/ui/Footer";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | MI Store",
    default: "Welcome | MI Store",
  },
  description: "MI Store",
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />

          <main className="bg-white">
            <section className="mx-auto min-h-[100dvh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </section>
          </main>

          <Footer />
        </CartProvider>

        <Toaster
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              padding: "16px 24px",
              fontSize: "14px",
              textAlign: "center",
              maxWidth: "500px",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
