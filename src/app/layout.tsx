import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { NotificationProvider } from '@/shared/ui/NotificationProvider';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '500'], // Light и Medium
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700'], // Semibold и Bold
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химическая продукция в Перми',
    template: '%s | ПЕРМНЕФТЕХИМ',
  },
  description:
    'Официальный дилер «Славной кровли» в Перми. Поставка композитной черепицы, кровельных аксессуаров и промышленной химии по России и странам СНГ. Расчёт, доставка, сопровождение',
  keywords:
    'кровельные материалы, химические реагенты, Пермь, ПЕРМНЕФТЕХИМ, кровля, химия, строительные материалы',
  authors: [{ name: 'ООО ПЕРМНЕФТЕХИМ' }],
  creator: 'ООО ПЕРМНЕФТЕХИМ',
  publisher: 'ООО ПЕРМНЕФТЕХИМ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://permneftekhim.ru'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://permneftekhim.ru',
    siteName: 'ПЕРМНЕФТЕХИМ',
    title: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химическая продукция в Перми',
    description:
      'Официальный дилер «Славной кровли» в Перми. Поставка композитной черепицы, кровельных аксессуаров и промышленной химии по России и странам СНГ. Расчёт, доставка, сопровождение',
    images: [
      {
        url: '/Crovlya_9_11zon.webp',
        width: 1200,
        height: 630,
        alt: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химическая продукция',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химическая продукция в Перми',
    description:
      'ООО ПЕРМНЕФТЕХИМ - поставщик качественных кровельных материалов и химических реагентов в Перми.',
    images: ['/Crovlya_9_11zon.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="https://pnhperm.ru/favicon.ico" type="image/x-icon" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1PCMF4B3S7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1PCMF4B3S7');
          `}
        </Script>
        {/* Yandex Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(103243177, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/103243177"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
