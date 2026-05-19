import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartProvider } from "./utils/cart";
import { CartSidebar } from "./components/cart/CartSidebar";

/**
 * Shell font — Outfit loaded once at the root shell level.
 * Individual micro-frontend sections inherit via CSS variables
 * and override with their own font-family utilities as needed.
 */
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shell",
});

export const metadata: Metadata = {
  title: "Goyaz — Timeless Royalty, Crafted in Silver",
  description: "India's Largest Premium Silver Destination. Nakshi, Polki, Kundan, Temple and Bridal jewellery handcrafted in 92.5 silver.",
  openGraph: {
    title: "Goyaz — Timeless Royalty, Crafted in Silver",
    description: "India's Largest Premium Silver Destination.",
    siteName: "Goyaz",
    locale: "en_IN",
    type: "website",
  },
};

/**
 * Root Shell — Micro-Frontend Architecture
 *
 * Responsibility: provide the top-level stacking context,
 * design-token scope and slot infrastructure.
 * It owns NO layout opinions beyond the viewport frame.
 * Each child route is a self-contained MFE that renders
 * into the <main> slot.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
      /**
       * data-shell marks the outermost MFE host boundary.
       * CSS isolation rules in globals.css anchor to this.
       */
      data-shell="goyaz"
    >
      <body className="h-full bg-[var(--color-bg)] text-[var(--color-fg)] overflow-x-clip">
        {/*
         * #mfe-viewport — the single full-height flex column
         * that stacks the three first-class MFE zones:
         *   1. [data-mfe="navbar"]   — sticky navigation shell
         *   2. [data-mfe="main"]     — page-level MFE slot
         *   3. [data-mfe="footer"]   — global footer shell (future)
         */}
        <CartProvider>
          <div id="mfe-viewport" className="relative flex min-h-full flex-col w-full">
            <Navbar />
            {/* ── MFE slot: page content ── */}
            <main
              id="mfe-main"
              data-mfe="main"
              className="flex-1"
              /**
               * aria-live lets screen-reader clients announce
               * soft navigations when the MFE swaps content.
               */
              aria-live="polite"
            >
              {children}
            </main>
            <Footer />
          </div>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
