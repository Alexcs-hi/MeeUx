import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import SideBarProvider from "./context/SideBarToggle";
import { SearchProvider } from "./context/SearchContext";
import { SortProvider } from "./context/SortContext";
import { FavoriteProvider } from './context/FavoriteContext';
import { PostToolBarProvider } from './context/PostToolBarContext';
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
   title: "MeeUx – Rule34 Browser",
  description: "MeeUx is a Rule34 browser and explorer built to let you easily browse, search, and explore posts from Rule34 with a clean, modern UI",
  alternates: {
    canonical: "https://meeux.vercel.app/posts/all",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <head>

        <meta name="google-site-verification" content="EVlUqwRQgFSMPbxC0-MKONWDSr_Sv09VjR5BQCUvE88" />
       
      <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KEEBZJQMJD"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KEEBZJQMJD');
          `}
        </Script>
      </head>

      <body
        className={`${comfortaa.className} ${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <SideBarProvider>
          <SearchProvider>
            <SortProvider>
              <FavoriteProvider>
                <PostToolBarProvider>
                  <SideBar />
                  <NavBar />
                  <main className="sm:pt-19">
                    {children}
                    <SpeedInsights />
                    <Analytics />
                  </main>
                </PostToolBarProvider>
              </FavoriteProvider>
            </SortProvider>
          </SearchProvider>
        </SideBarProvider>
      </body>
    </html>
  );
}
