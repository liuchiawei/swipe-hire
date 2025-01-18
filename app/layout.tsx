import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
// import { ThemeProvider } from "@/lib/ThemeProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwipeHire 新感覚の求人サイト",
  description: "新感覚の求人サイト",
};

export default function RootLayout({
  children,
  home,
}: Readonly<{
  children: React.ReactNode;
  home: boolean;
}>) {
  return (
    <html lang="ja">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        {/* <ThemeProvider> */}
          {home ? (
            <main>
              {children}
            </main>
          ) : (
            <>
              <Nav />
              <main className="bg-neutral-200 min-h-screen">{children}</main>
            </>
          )}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
