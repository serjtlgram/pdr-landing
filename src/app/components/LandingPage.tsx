'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Bot,
  CheckCircle2,
  Zap,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Smartphone,
  Moon,
  Award,
  ChevronDown,
  Star,
  Trophy,
  BookOpen,
  Users,
} from 'lucide-react';

const TELEGRAM_URL = 'https://t.me/ispytpdrbot?startapp';

// ─── Reusable CTA Button ─────────────────────────────────────────────────────
function TelegramButton({
  size = 'default',
  className = '',
  label = 'Почати безкоштовно',
}: {
  size?: 'default' | 'large';
  className?: string;
  label?: string;
}) {
  const padding = size === 'large' ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-base';
  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="cta-telegram-main"
      className={`group relative ${padding} bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <Bot className="w-6 h-6 relative z-10 shrink-0" />
      <span className="relative z-10">{label}</span>
    </a>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('uk-UA')}
      {suffix}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-blue-400" />,
      title: 'Без завантажень',
      desc: "Навчайся прямо в Telegram. Ніяких зайвих додатків — економ пам'ять телефону.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-cyan-400" />,
      title: 'Офіційні питання',
      desc: '100% відповідність базі питань Головного Сервісного Центру МВС на 2026 рік.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      title: 'Розумна аналітика',
      desc: "Алгоритм запам'ятовує твої помилки та змушує повторювати складні теми.",
    },
    {
      icon: <Moon className="w-8 h-8 text-yellow-400" />,
      title: 'Темна тема',
      desc: 'Бережи очі. Ідеально для навчання ввечері або в транспорті.',
    },
  ];

  const stats = [
    { icon: <Users className="w-6 h-6 text-cyan-400" />, value: 1400, suffix: '+', label: 'учнів' },
    { icon: <Trophy className="w-6 h-6 text-yellow-400" />, value: 94, suffix: '%', label: 'здають з першого разу' },
    { icon: <BookOpen className="w-6 h-6 text-purple-400" />, value: 2000, suffix: '+', label: 'питань у базі' },
    { icon: <Star className="w-6 h-6 text-orange-400" />, value: 4.9, suffix: '/5', label: 'середня оцінка' },
  ];

  const faqs = [
    {
      q: 'Чи відповідають питання офіційній базі МВС?',
      a: 'Так, абсолютно. Наша база на 100% синхронізована з актуальними питаннями Головного Сервісного Центру МВС України на 2026 рік. Якщо питання змінюються на офіційному іспиті, вони автоматично оновлюються у нашому додатку.',
    },
    {
      q: 'Чи потрібно щось завантажувати на телефон?',
      a: "Ні. Увесь процес навчання проходить безпосередньо у вашому месенджері Telegram. Це економить пам'ять телефону та дозволяє вчити ПДР на будь-якому пристрої, де встановлено Telegram.",
    },
    {
      q: 'Як працює симулятор іспиту?',
      a: 'Симулятор повністю відтворює умови реального іспиту в Сервісному центрі: вам дається 20 хвилин на 20 випадкових питань. Для успішної здачі можна зробити не більше 2 помилок. Ми рекомендуємо здавати симулятор мінімум 5 разів поспіль перед реальним іспитом.',
    },
    {
      q: 'Скільки коштує користування додатком?',
      a: "Базовий доступ та тестування — безкоштовні. Для доступу до глибокої аналітики, ШІ-пояснень складних ситуацій та режиму 'Марафон' передбачена вигідна підписка у гривнях, яка обійдеться дешевше, ніж одна перездача іспиту в МВС.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-[family-name:var(--font-inter)] overflow-hidden">

      {/* ── Background blobs ─────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-cyan-500/30">
            <Image
              src="/img/logo.png"
              alt="Логотип ПДР України"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            ПДР УКРАЇНИ
          </span>
        </div>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          id="cta-header"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all backdrop-blur-md font-medium text-sm"
        >
          <Bot className="w-4 h-4 text-cyan-400" />
          Відкрити в Telegram
        </a>
      </header>

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          className="relative z-10 container mx-auto px-6 pt-12 pb-24 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          aria-labelledby="hero-heading"
        >
          {/* Left */}
          <div
            className={`flex-1 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6 font-semibold text-sm">
              <Zap className="w-4 h-4" />
              Оновлені питання 2026 року
            </div>

            <h1
              id="hero-heading"
              className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6"
            >
              Здай іспит з ПДР на{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                20/20
              </span>{' '}
              з першого разу
            </h1>

            <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
              Твій персональний ШІ-репетитор прямо в Telegram. Готуйся до іспиту
              в Сервісному центрі МВС без нудних лекцій. Офіційні тести та
              гарантія результату.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <TelegramButton size="default" label="Почати безкоштовно" />
              <a
                href="#how-it-works"
                id="cta-how-it-works"
                className="px-8 py-4 rounded-2xl font-bold text-base border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-slate-400" />
                Як це працює?
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[11, 12, 13, 14].map((i) => (
                  <div
                    key={i}
                    className="w-11 h-11 rounded-full border-2 border-slate-950 bg-slate-800 overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?img=${i}`}
                      alt={`Студент ${i}`}
                      width={44}
                      height={44}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-400">
                  <strong className="text-white">4.9/5</strong> оцінка від 1 400+ учнів
                </p>
              </div>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div
            className={`flex-1 relative transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="relative w-full max-w-sm mx-auto animate-float">
              <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full" aria-hidden="true" />
              <Image
                src="/img/1000007882.jpg"
                alt="Інтерфейс додатку ПДР України в Telegram з неоновим дизайном"
                width={420}
                height={740}
                priority
                fetchPriority="high"
                className="relative z-10 w-full rounded-[2.5rem] border-[8px] border-slate-900 shadow-2xl shadow-cyan-900/50 object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -right-4 top-1/4 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-xl animate-float-reverse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Результат</p>
                    <p className="text-white font-bold">Іспит складено!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ────────────────────────────────────────── */}
        <section className="relative z-10 bg-slate-900/60 border-y border-white/5 py-12" aria-label="Статистика">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-1">
                    {s.icon}
                  </div>
                  <p className="text-3xl font-extrabold text-white">
                    {typeof s.value === 'number' && Number.isInteger(s.value) ? (
                      <AnimatedCounter target={s.value} suffix={s.suffix} />
                    ) : (
                      <span>{s.value}{s.suffix}</span>
                    )}
                  </p>
                  <p className="text-slate-400 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="relative z-10 py-24 bg-slate-900/30 border-b border-white/5"
          aria-labelledby="features-heading"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 id="features-heading" className="text-3xl lg:text-5xl font-bold mb-4">
                Переваги нашого{' '}
                <span className="text-cyan-400">Telegram Mini App</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Чому звичайні книжки та сайти застаріли, а наш бот доводить до результату 20 з 20.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, idx) => (
                <article
                  key={idx}
                  className="bg-slate-950/50 border border-white/5 p-8 rounded-3xl hover:bg-slate-900 hover:border-cyan-500/20 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Visual Showcase ───────────────────────────────────── */}
        <section className="relative z-10 py-24 container mx-auto px-6 overflow-hidden" aria-labelledby="showcase-heading">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Screenshots grid */}
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <Image
                  src="/img/1000007884.jpg"
                  alt="Вибір категорії ПДР у темній темі"
                  width={280}
                  height={500}
                  loading="lazy"
                  className="rounded-3xl border border-white/10 shadow-2xl transform translate-y-8 w-full"
                />
                <Image
                  src="/img/1000007834.jpg"
                  alt="Успішний результат іспиту ПДР 20 з 20"
                  width={280}
                  height={500}
                  loading="lazy"
                  className="rounded-3xl border border-white/10 shadow-2xl w-full"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 order-1 lg:order-2">
              <h2 id="showcase-heading" className="text-4xl lg:text-5xl font-bold mb-6">
                Відчуй атмосферу <br />
                <span className="text-cyan-400">реального іспиту</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Наш симулятор повністю відтворює умови справжнього іспиту в МВС: 20 питань,
                20 хвилин та право лише на 2 помилки. Звикни до стресу заздалегідь.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Режим «Марафон» на 2000+ питань',
                  'Детальні ШІ-пояснення до кожної помилки',
                  'Відстеження готовності у відсотках',
                  'Розбивка за категоріями прав (A, B, C, D)',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-demo"
                className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors group"
              >
                Запустити демо-іспит
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="relative z-10 py-24 bg-slate-900/30 border-y border-white/5" aria-labelledby="faq-heading">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-3xl lg:text-4xl font-bold mb-4">
                Часті запитання (FAQ)
              </h2>
              <p className="text-slate-400">Все, що потрібно знати перед стартом навчання.</p>
            </div>

            <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-700"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="font-semibold text-lg text-slate-200 pr-4" itemProp="name">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-500 shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === index ? 'max-h-56 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-slate-400 leading-relaxed" itemProp="text">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Final ────────────────────────────────────────── */}
        <section className="relative z-10 py-24 container mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-900/0 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <Image
              src="/img/logo.png"
              alt="Лого ПДР України"
              width={96}
              height={96}
              loading="lazy"
              className="w-24 h-24 rounded-2xl mx-auto mb-8 animate-pulse-glow relative z-10 object-cover"
            />

            <h2 className="text-4xl lg:text-6xl font-bold mb-6 relative z-10">
              Твої права вже чекають
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 relative z-10">
              Приєднуйся до тисяч українців, які вже здали іспит на 20/20.
              Почни безкоштовно прямо зараз у Telegram.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <TelegramButton size="large" label="Відкрити бота в Telegram" />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-slate-950 py-12 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Image
              src="/img/logo.png"
              alt="Логотип ПДР"
              width={32}
              height={32}
              loading="lazy"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-bold text-slate-300">ПДР України Bot</span>
          </div>
          <div className="text-slate-500 text-sm">© 2026 Всі права захищені.</div>
          <nav className="flex gap-6 text-sm" aria-label="Юридичні посилання">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Договір оферти
            </a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
              Політика конфіденційності
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
