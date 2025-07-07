import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { NotificationProvider } from '@/shared/ui/NotificationProvider';

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
    template: '%s | ПЕРМНЕФТЕХИМ'
  },
  description: 'Официальный дилер «Славной кровли» в Перми. Поставка композитной черепицы, кровельных аксессуаров и промышленной химии по России и странам СНГ. Расчёт, доставка, сопровождение',
  keywords: 'кровельные материалы, химические реагенты, Пермь, ПЕРМНЕФТЕХИМ, кровля, химия, строительные материалы',
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
    description: 'Официальный дилер «Славной кровли» в Перми. Поставка композитной черепицы, кровельных аксессуаров и промышленной химии по России и странам СНГ. Расчёт, доставка, сопровождение',
    images: [
      {
        url: '/Crovlya.png',
        width: 1200,
        height: 630,
        alt: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химическая продукция',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ПЕРМНЕФТЕХИМ - Кровельные материалы и химическая продукция в Перми',
    description: 'ООО ПЕРМНЕФТЕХИМ - поставщик качественных кровельных материалов и химических реагентов в Перми.',
    images: ['/Crovlya.png'],
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
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
