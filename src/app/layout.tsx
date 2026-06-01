import type { Metadata } from 'next';
import { Poppins, Hind_Siliguri } from 'next/font/google';
import './globals.css';
import Providers from "./providers";
import { siteConfig } from "@/lib/site";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

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
      <body className={`${poppins.variable} ${hindSiliguri.variable} font-sans`} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
