import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, SiteHeader, SiteFooter, BackgroundEffects } from './components/SharedUI';
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
    default: '🚗 Офіційні тести ПДР 2026 у Telegram | ПДР Міні Апп',
    template: '%s | ПДР України 2026',
  },
  description:
    'Офіційні тести ПДР 2026 у Telegram. Готуйся до іспиту в ТСЦ МВС безкоштовно та без реклами! Запускай в 1 клік.',
  keywords: [
    'тести ПДР онлайн',
    'білети ПДР 2026',
    'ПДД тесты онлайн',
    'экзаменационные билеты ПДД Украина 2026',
    'ПДД Украина 2026',
    'офіційні тести ПСЦ МВС',
    'официальные билеты ПДД МВД',
    'тести ПДР 2026 Україна',
    'іспит ПДР ГСЦ МВС',
    'онлайн тести ПДР',
    'телеграм бот пдр україна 2026',
    'пдр міні апп',
    'правила проїзду перехрестя',
    'нові штрафи пдр 2026',
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
    title: '🚗 Офіційні тести ПДР 2026 у Telegram | ПДР Міні Апп',
    description:
      'Офіційні тести ПДР 2026 у Telegram. Готуйся до іспиту в ТСЦ МВС безкоштовно та без реклами! Запускай в 1 клік.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ПДР України — Офіційні тести та білети для підготовки до іспиту 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🚗 Офіційні тести ПДР 2026 у Telegram | ПДР Міні Апп',
    description:
      'Офіційні тести ПДР 2026 у Telegram. Готуйся до іспиту в ТСЦ МВС безкоштовно та без реклами! Запускай в 1 клік.',
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
        'Підготовка до іспиту ПДР онлайн 2026. Офіційні тести ГСЦ МВС.',
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
      image: `${SITE_URL}/og-image.jpg`,
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
          name: 'Як підготуватися до іспиту ПДР?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для успішної підготовки до іспиту з ПДР необхідно регулярно проходити офіційні тести ПДР онлайн. Наш додаток використовує актуальну базу 2026 року та надає режим симулятора іспиту, що максимально наближений до умов складання в ГСЦ МВС.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи збігаються тести з екзаменом у Сервісному центрі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, абсолютно. Наша база — це офіційні білети ПСЦ МВС (100% відповідність). Якщо питання змінюються на офіційному іспиті (pdr.infotech.gov.ua), вони миттєво оновлюються у нашому додатку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи потрібно щось завантажувати на телефон?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ні. Увесь процес навчання проходить безпосередньо у вашому месенджері Telegram. Додаток використовує кешування для швидкої роботи та економить пам'ять телефону.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як працює симулятор іспиту?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Симулятор повністю відтворює умови реального іспиту в ГСЦ МВС: вам дається 20 хвилин на 20 випадкових питань. Для успішної здачі можна зробити не більше 2 помилок.',
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
        {
          '@type': 'Question',
          name: 'Багато хто шукає ПДД онлайн, але яка офіційна назва?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Офіційна назва українською мовою — Правила дорожнього руху (ПДР). Незважаючи на те, що багато користувачів шукають "ПДД тесты онлайн 2026 Украина" або "билеты ПДД 2026", наш додаток надає матеріали українською мовою згідно з вимогами законодавства, але інтуїтивно зрозумілий для всіх.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи підходить додаток замість автошколи онлайн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наш сервіс є ідеальним доповненням до навчання. Якщо ви шукаєте "автошкола онлайн" або "тести ПДР онлайн Київ/Дніпро/Львів", симулятор допоможе закріпити теорію та скласти екзамен ПДД онлайн з першого разу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи є у додатку довідник та штрафи ПДД онлайн?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, окрім тестів, у додатку доступний зручний довідник ПДР Україна, де можна вивчити всі дорожні знаки та переглянути актуальні штрафи ПДД онлайн.',
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
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-theme-primary" style={{ position: 'relative' }}>
            <BackgroundEffects />
            <SiteHeader />
            <main style={{ paddingTop: '5rem' }}>
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
