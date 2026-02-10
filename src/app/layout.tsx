import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from "./providers";
import CustomCursor from "@/components/ui/CustomCursor";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} - Graphics Designer`,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  keywords: [
    "graphics designer",
    "visualizer",
    "thumbnail designer",
    "branding",
    "illustration",
    "ui ux",
  ],
  icons: {
    icon: '/favicon.svg',
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} - Graphics Designer`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Graphics Designer`,
    description: siteConfig.description,
    images: ["/og.svg"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div aria-hidden="true" className="site-bg" />
        <Providers>
          <CustomCursor />
        
          {children}
        </Providers>
      </body>
    </html>
  );
}
