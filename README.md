# ПДР України — Landing Page

Лендинг-сайт для Telegram Mini App **ПДР України** — підготовка до іспиту в ГАІ.

🚗 **Mini App у Telegram:** [t.me/ispytpdrbot](https://t.me/ispytpdrbot?startapp)  
🌐 **Сайт:** [pdr-ua.pp.ua](https://pdr-ua.pp.ua)

## Стек

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Деплой:** Vercel

## Локальний запуск

```bash
npm install
npm run dev
```

Відкрити у браузері: [http://localhost:3000](http://localhost:3000)

## Деплой на Vercel

1. Завантаж репозиторій на GitHub
2. Підключи репозиторій у [vercel.com](https://vercel.com)
3. Vercel автоматично визначить Next.js і виконає збірку
4. У налаштуваннях Vercel → **Domains** → додай `pdr-ua.pp.ua`

## Структура проекту

```
src/
└── app/
    ├── layout.tsx          # SEO-метадані, Schema.org, шрифти
    ├── page.tsx            # Головна сторінка
    ├── globals.css         # Глобальні стилі та анімації
    └── components/
        └── LandingPage.tsx # Компонент лендингу
public/
└── img/                    # Зображення (скриншоти додатку, логотип)
```

## SEO

- ✅ Title / Description / Keywords
- ✅ Open Graph (Facebook, Telegram preview)
- ✅ Twitter Card
- ✅ Schema.org: SoftwareApplication + FAQPage
- ✅ Canonical URL
- ✅ Robots: index, follow
- ✅ Next.js Image оптимізація (AVIF/WebP)
- ✅ Security Headers

## Ліцензія

© 2026 ПДР України. Всі права захищені.
