import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://pdr-ua.pp.ua';
const TELEGRAM_URL = 'https://t.me/ispytpdrbot?startapp';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ПДР України — Підготовка до іспиту в ГАІ | Telegram Mini App',
    template: '%s | ПДР України',
  },
  description:
    'Готуйся до іспиту ПДР у ГАІ з першого разу! Офіційні питання МВС 2026 року, симулятор іспиту, ШІ-аналітика помилок. Прямо у Telegram — без завантажень.',
  keywords: [
    'ПДР України',
    'іспит в ГАІ',
    'правила дорожнього руху',
    'підготовка до іспиту ПДР',
    'тести ПДР 2026',
    'симулятор іспиту ГАІ',
    'Telegram Mini App ПДР',
    'здати іспит на права',
    'МВС іспит ПДР',
    'онлайн тести ПДР',
  ],
  authors: [{ name: 'ПДР України' }],
  creator: 'ПДР України',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'uk-UA': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: SITE_URL,
    siteName: 'ПДР України',
    title: 'ПДР України — Підготовка до іспиту в ГАІ | Telegram Mini App',
    description:
      'Готуйся до іспиту ПДР у ГАІ з першого разу! Офіційні питання МВС 2026, симулятор іспиту, ШІ-аналітика. Прямо у Telegram.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ПДР України — Telegram Mini App для підготовки до іспиту',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ПДР України — Підготовка до іспиту в ГАІ',
    description:
      'Офіційні питання МВС 2026, симулятор іспиту та ШІ-аналітика помилок. Прямо у Telegram.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/img/logo.png', type: 'image/png' },
    ],
    apple: '/img/logo.png',
  },
  other: {
    'telegram:channel': TELEGRAM_URL,
  },
};

// Schema.org JSON-LD
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'ПДР України',
      description:
        'Підготовка до іспиту ПДР у ГАІ через Telegram Mini App',
      inLanguage: 'uk-UA',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'ПДР України — Telegram Mini App',
      operatingSystem: 'Telegram, iOS, Android, Web',
      applicationCategory: 'EducationalApplication',
      description:
        'Персональний ШІ-репетитор з ПДР України у Telegram. Офіційні питання МВС 2026 року, симулятор іспиту та розумна аналітика помилок.',
      url: TELEGRAM_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'UAH',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1458',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чи відповідають питання офіційній базі МВС?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, абсолютно. Наша база на 100% синхронізована з актуальними питаннями Головного Сервісного Центру МВС України на 2026 рік. Якщо питання змінюються на офіційному іспиті, вони автоматично оновлюються у нашому Telegram Mini App.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібно щось завантажувати на телефон?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ні. Увесь процес навчання проходить безпосередньо у вашому месенджері Telegram. Це економить пам'ять телефону та дозволяє вчити ПДР на будь-якому пристрої.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює симулятор іспиту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Симулятор повністю відтворює умови реального іспиту в Сервісному центрі: вам дається 20 хвилин на 20 випадкових питань. Для успішної здачі можна зробити не більше 2 помилок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки коштує користування додатком?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Базовий доступ для ознайомлення з питаннями — безкоштовний. Для доступу до глибокої аналітики, розумної роботи над помилками та режиму 'Марафон' є Pro-версія.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://t.me" />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
