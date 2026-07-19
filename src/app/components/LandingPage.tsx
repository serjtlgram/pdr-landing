'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
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
  Sun,
  Award,
  ChevronDown,
  Star,
  Trophy,
  BookOpen,
  Users,
  Sparkles,
  Target,
  Clock,
  TrendingUp,
  Menu,
  X,
  Play,
} from 'lucide-react';

const TELEGRAM_URL = 'https://t.me/ispytpdrbot?startapp';

/* ─── THEME CONTEXT ──────────────────────────────────────────────────── */
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('pdr-theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ?? (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pdr-theme', next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

const useTheme = () => useContext(ThemeContext);

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── ANIMATED COUNTER ───────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{Number.isInteger(target) ? count.toLocaleString('uk-UA') : count.toFixed(1)}{suffix}</span>;
}

/* ─── THEME TOGGLE BUTTON ────────────────────────────────────────────── */
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Переключити тему"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card hover:border-theme transition-all"
      style={{ border: '1px solid var(--border-color)' }}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: 'var(--accent-blue)' }} />
      )}
      <span className="text-xs font-semibold hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
        {theme === 'dark' ? 'Світла' : 'Темна'}
      </span>
    </button>
  );
}

/* ─── CTA BUTTON ─────────────────────────────────────────────────────── */
function TelegramButton({
  label = 'Почати тестування безкоштовно',
  size = 'md',
  id = 'cta-main',
  className = '',
}: {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  className?: string;
}) {
  // Explicit paddings that guarantee text never clips
  const styles: Record<string, React.CSSProperties> = {
    sm: { padding: '0.6rem 1.25rem', fontSize: '0.875rem', gap: '0.5rem' },
    md: { padding: '0.85rem 1.75rem', fontSize: '1rem',    gap: '0.6rem' },
    lg: { padding: '1.1rem 2.25rem',  fontSize: '1.125rem', gap: '0.75rem' },
  };
  const iconSize = size === 'lg' ? 20 : 18;

  return (
    <a
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      className={`btn-shimmer text-white font-bold rounded-2xl transition-all duration-300 animate-glow-ring ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        ...styles[size],
      }}
    >
      <Bot size={iconSize} style={{ flexShrink: 0 }} />
      <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
    </a>
  );
}

/* ─── MAIN LANDING ───────────────────────────────────────────────────── */
export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [heroVisible, setHeroVisible] = useState(false);

  useReveal();

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  const stats = [
    { icon: <Users style={{ color: 'var(--accent-cyan)', width: '1.4rem', height: '1.4rem' }} />, value: 1400, suffix: '+', label: 'учнів' },
    { icon: <Trophy style={{ color: '#f59e0b', width: '1.4rem', height: '1.4rem' }} />, value: 94, suffix: '%', label: 'здають з 1-го разу' },
    { icon: <BookOpen style={{ color: 'var(--accent-purple)', width: '1.4rem', height: '1.4rem' }} />, value: 2000, suffix: '+', label: 'питань у базі' },
    { icon: <Star style={{ color: '#fb923c', width: '1.4rem', height: '1.4rem' }} />, value: 4.9, suffix: '/5', label: 'середня оцінка' },
  ];

  const features = [
    { icon: <Smartphone />, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', title: 'Робота в офлайн-режимі', desc: "Після завантаження питань у Telegram, додаток кешує дані, економлячи трафік та працюючи навіть при поганому зв'язку." },
    { icon: <ShieldCheck />, color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', title: 'Офіційні тести ПСЦ МВС', desc: '100% відповідність офіційній базі pdr.infotech.gov.ua на 2026 рік. Автоматичне оновлення при змінах.' },
    { icon: <BarChart3 />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', title: 'ШІ-помічник та статистика', desc: "Алгоритм ШІ аналізує твою успішність, дає зрозумілі пояснення до помилок та формує персональну статистику." },
    { icon: <Target />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', title: 'Режим як у Сервісному Центрі', desc: 'Симулятор іспиту: 20 питань за 20 хвилин, максимум 2 помилки — точна копія екзамену в МВС.' },
    { icon: <BookOpen />, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Дорожні знаки та штрафи', desc: 'Окремий зручний довідник по всіх дорожніх знаках України та актуальних штрафах ПДР онлайн.' },
    { icon: <Moon />, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', title: 'Темна / Світла тема', desc: 'Комфортне вивчення ПДР вдень і вночі безпосередньо у твоєму смартфоні.' },
  ];

  const steps = [
    { num: '01', title: 'Відкрий у Telegram', desc: 'Натисни кнопку — і бот одразу в твоєму месенджері. Жодної реєстрації.' },
    { num: '02', title: 'Обери категорію', desc: 'A, B, C, D або одразу всі теми. Навчайся по розділах або в режимі Марафону.' },
    { num: '03', title: 'Робота над помилками', desc: 'Бот автоматично збирає твої помилки. Повторюй їх по другому колу, доки не відповіси правильно.' },
    { num: '04', title: 'Зберігай у закладки', desc: 'Зберігай підступні запитання в закладки в один клік. Повертайся до них у будь-який момент для закріплення.' },
    { num: '05', title: 'Здай на 20/20', desc: 'Пройди симулятор 5 разів поспіль — і йди на реальний іспит впевнено.' },
  ];

  const testimonials = [
    { name: 'Олексій М.', tag: 'Категорія B', text: 'Здав з першого разу, зробив 0 помилок! Симулятор іспиту — топ, відчув себе ніби вже в МВС.', stars: 5, avatar: 11 },
    { name: 'Катерина Л.', tag: 'Категорія A', text: 'Вчила ПДР тільки у транспорті по 15 хвилин на день. За 2 тижні склала іспит. Дякую!', stars: 5, avatar: 12 },
    { name: 'Дмитро П.', tag: 'Категорія C', text: 'Двічі провалювався у старій школі. Тут за тиждень інтенсиву — склав. Аналітика помилок реально допомогла.', stars: 5, avatar: 13 },
  ];

  const faqs = [
    { q: 'Як підготуватися до іспиту ПДР?', a: 'Для успішної підготовки до іспиту з ПДР необхідно регулярно проходити офіційні тести ПДР онлайн. Наш додаток використовує актуальну базу 2026 року та надає режим симулятора іспиту, що максимально наближений до умов складання в ГСЦ МВС.' },
    { q: 'Чи збігаються тести з екзаменом у Сервісному центрі?', a: 'Так, абсолютно. Наша база — це офіційні білети ПСЦ МВС (100% відповідність). Якщо питання змінюються на офіційному іспиті (pdr.infotech.gov.ua), вони миттєво оновлюються у нашому додатку.' },
    { q: 'Чи потрібно щось завантажувати на телефон?', a: "Ні. Увесь процес навчання проходить безпосередньо у вашому месенджері Telegram. Додаток використовує кешування для швидкої роботи та економить пам'ять телефону." },
    { q: 'Як працює симулятор іспиту?', a: 'Симулятор повністю відтворює умови реального іспиту в ГСЦ МВС: вам дається 20 хвилин на 20 випадкових питань. Для успішної здачі можна зробити не більше 2 помилок.' },
    { q: 'Скільки коштує користування додатком?', a: "Базовий доступ для ознайомлення з питаннями — безкоштовний. Для доступу до глибокої аналітики, розумної роботи над помилками та режиму 'Марафон' є Pro-версія." },
    { q: 'Багато хто шукає ПДД онлайн, але яка офіційна назва?', a: 'Офіційна назва українською мовою — Правила дорожнього руху (ПДР). Незважаючи на те, що багато користувачів шукають "ПДД тесты онлайн 2026 Украина" або "билеты ПДД 2026", наш додаток надає матеріали українською мовою згідно з вимогами законодавства, але інтуїтивно зрозумілий для всіх.' },
    { q: 'Чи підходить додаток замість автошколи онлайн?', a: 'Наш сервіс є ідеальним доповненням до навчання. Якщо ви шукаєте "автошкола онлайн" або "тести ПДР онлайн Київ/Дніпро/Львів", симулятор допоможе закріпити теорію та скласти екзамен ПДД онлайн з першого разу.' },
    { q: 'Чи є у додатку довідник та штрафи ПДД онлайн?', a: 'Так, окрім тестів, у додатку доступний зручний довідник ПДР Україна, де можна вивчити всі дорожні знаки та переглянути актуальні штрафи ПДД онлайн.' },
  ];

  return (
    <ThemeProvider>
      <LandingInner
        heroVisible={heroVisible}
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
        stats={stats}
        features={features}
        steps={steps}
        testimonials={testimonials}
        faqs={faqs}
      />
    </ThemeProvider>
  );
}

/* ─── INNER COMPONENT (uses theme context) ───────────────────────────── */
function LandingInner({
  heroVisible, scrolled, menuOpen, setMenuOpen,
  openFaq, setOpenFaq,
  stats, features, steps, testimonials, faqs,
}: {
  heroVisible: boolean;
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  openFaq: number;
  setOpenFaq: (v: number) => void;
  stats: Array<{ icon: React.ReactNode; value: number; suffix: string; label: string }>;
  features: Array<{ icon: React.ReactNode; color: string; bg: string; title: string; desc: string }>;
  steps: Array<{ num: string; title: string; desc: string }>;
  testimonials: Array<{ name: string; tag: string; text: string; stars: number; avatar: number }>;
  faqs: Array<{ q: string; a: string }>;
}) {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-theme-primary" style={{ position: 'relative' }}>
      {/* Noise texture */}
      <div className="noise" />

      {/* ── Ambient blobs ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
        <div className="blob animate-blob" style={{ width: '45vw', height: '45vw', top: '-10%', left: '-10%', background: 'var(--blob-1)' }} />
        <div className="blob animate-blob-delay" style={{ width: '40vw', height: '40vw', bottom: '-10%', right: '-10%', background: 'var(--blob-2)' }} />
        <div className="blob" style={{ width: '30vw', height: '30vw', top: '40%', left: '50%', transform: 'translateX(-50%)', background: 'var(--blob-3)', filter: 'blur(100px)' }} />
      </div>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.3s ease',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          background: scrolled ? 'var(--bg-card)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        }}
      >
        <div className="container-xl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 1.5rem' }}>
          {/* Logo */}
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', overflow: 'hidden', boxShadow: '0 0 15px var(--glow-cyan)' }}>
              <Image src="/img/logo.png" alt="ПДР України" width={36} height={36} priority style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }} className="gradient-text">
              ПДР УКРАЇНИ
            </span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Головна навігація" className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
            {[['#features', 'Переваги'], ['#how', 'Як це'], ['#faq', 'FAQ'], ['/blog', 'Блог']].map(([href, label]) => (
              <a key={href} href={href}
                style={{ display: 'inline-block', padding: '0.4rem 0.875rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: '0.5rem', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right controls — each item is isolated so nothing bleeds into neighbours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', isolation: 'isolate' }}>
            {/* Theme toggle — standalone, no overflow */}
            <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
              <ThemeToggle />
            </div>
            {/* Telegram button — standalone, no overflow */}
            <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }} className="hidden sm:block">
              <TelegramButton label="Відкрити в Telegram" size="sm" id="cta-header" />
            </div>
            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
              style={{ position: 'relative', zIndex: 2, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', border: '1px solid var(--border-color)', background: 'var(--bg-glass)', color: 'var(--text-primary)', cursor: 'pointer' }}
              className="sm:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[['#features', 'Переваги'], ['#how', 'Як це працює'], ['#faq', 'FAQ'], ['/blog', 'Блог']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{ padding: '0.625rem 0.75rem', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '0.5rem', background: 'var(--bg-glass)' }}>
                {label}
              </a>
            ))}
            <TelegramButton label="Відкрити в Telegram" size="sm" id="cta-mobile-menu" className="mt-2 w-full justify-center" />
          </div>
        )}
      </header>

      <main style={{ paddingTop: '5rem' }}>

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section
          style={{ position: 'relative', zIndex: 10, overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center' }}
          aria-labelledby="hero-heading"
        >
          {/* Grid bg */}
          <div className="bg-grid" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} aria-hidden="true" />

          <div className="container-xl" style={{ width: '100%', paddingTop: '3rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>

              {/* Text content — center on mobile */}
              <div
                style={{
                  maxWidth: '44rem', textAlign: 'center', width: '100%',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1.5rem' }}>
                  <Sparkles size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Оновлені питання 2026 · Офіційна база МВС</span>
                </div>

                <h1
                  id="hero-heading"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    fontWeight: 900,
                    lineHeight: 1.08,
                    letterSpacing: '-0.02em',
                    marginBottom: '1.25rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Офіційні тести ПДР 2026 |{' '}
                  <span className="gradient-text-animated">Телеграм Бот</span>
                </h1>

                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' }}>
                  Готуйтеся до іспиту ПДР 2026 онлайн! 100% відповідність офіційній базі ГСЦ МВС. Найкращий ПДР Міні Апп у Telegram, ШІ-аналітика помилок та симулятор реального іспиту.
                </p>

                {/* CTA buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
                  <TelegramButton label="Почати тестування безкоштовно" size="lg" id="cta-hero-main" className="group" />
                  <a
                    href="#how"
                    id="cta-how"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '1.1rem 1.75rem',
                      borderRadius: '1rem',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '1.0625rem',
                      textDecoration: 'none',
                      background: 'var(--bg-glass)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.background = 'var(--badge-bg)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'var(--bg-glass)'; }}
                  >
                    <Play size={18} style={{ color: 'var(--accent-cyan)' }} />
                    Як це працює
                  </a>
                </div>

                {/* Social proof row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex' }}>
                    {[11, 12, 13, 14, 15].map((i, idx) => (
                      <div key={i} style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', border: '2px solid var(--bg-primary)', overflow: 'hidden', marginLeft: idx > 0 ? '-0.6rem' : 0, background: 'var(--bg-secondary)' }}>
                        <Image src={`https://i.pravatar.cc/100?img=${i}`} alt="Учень" width={36} height={36} loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '2px' }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" strokeWidth={0} />)}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>4.9/5</strong> · 1 400+ задоволених учнів
                    </p>
                  </div>
                  <div style={{ height: '2rem', width: '1px', background: 'var(--border-color)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '9999px', background: '#10b981' }} className="animate-ping-slow" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>Безкоштовно</span>
                  </div>
                </div>
              </div>

              {/* Phone mockup */}
              <div
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(50px)',
                  transition: 'all 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s',
                  position: 'relative', width: '100%', maxWidth: '22rem',
                }}
              >
                <div style={{ position: 'absolute', inset: '-2rem', background: 'radial-gradient(ellipse, var(--glow-cyan) 0%, transparent 70%)', filter: 'blur(40px)' }} aria-hidden="true" />
                <div className="animate-float" style={{ position: 'relative' }}>
                  <div className="gradient-border" style={{ borderRadius: '2.5rem', display: 'inline-block', width: '100%' }}>
                    <Image
                      src={theme === 'dark' ? '/img/1000007882.jpg' : '/img/1000007883.jpg'}
                      alt="Інтерфейс додатку тести ПДР онлайн 2026"
                      width={380}
                      height={680}
                      priority
                      fetchPriority="high"
                      style={{
                        width: '100%', height: 'auto', borderRadius: '2.3rem',
                        display: 'block',
                        boxShadow: `0 40px 80px rgba(0,0,0,${theme === 'dark' ? '0.7' : '0.2'}), 0 0 0 1px var(--border-color)`,
                      }}
                    />
                  </div>
                  {/* Floating badge — exam result */}
                  <div
                    className="animate-float-badge glass-card"
                    style={{
                      position: 'absolute', right: '-1rem', top: '25%', zIndex: 20,
                      padding: '0.75rem 1rem', borderRadius: '1rem',
                      boxShadow: 'var(--shadow-card)',
                      minWidth: '9rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '9999px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award size={18} style={{ color: '#10b981' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Результат</p>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>Іспит складено!</p>
                      </div>
                    </div>
                  </div>
                  {/* Floating badge — score */}
                  <div
                    className="glass-card"
                    style={{
                      position: 'absolute', left: '-1rem', bottom: '20%', zIndex: 20,
                      padding: '0.75rem 1rem', borderRadius: '1rem',
                      boxShadow: 'var(--shadow-card)',
                      animation: 'float-badge 6s ease-in-out infinite 1s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '2rem', height: '2rem', borderRadius: '9999px', background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Target size={14} style={{ color: 'var(--accent-cyan)' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Точність</p>
                        <p style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--text-primary)' }}>20 <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ 20</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom gradient fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8rem', background: 'linear-gradient(to bottom, transparent, var(--bg-primary))', zIndex: 5, pointerEvents: 'none' }} />
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 10 }} aria-label="Статистика">
          <div className="container-xl" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="reveal" style={{ borderRadius: '1.5rem', border: '1px solid var(--border-color)', background: 'var(--bg-card)', backdropFilter: 'blur(20px)', padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              {stats.map((s, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '0.75rem', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                    {s.icon}
                  </div>
                  <p style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ──────────────────────────────────────────── */}
        <section id="features" style={{ position: 'relative', zIndex: 10, paddingTop: '6rem', paddingBottom: '6rem' }} aria-labelledby="features-heading">
          <div className="container-xl">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Можливості</div>
              <h2 id="features-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>
                Мобільний додаток{' '}
                <span className="gradient-text">ПДР 2026</span>
                {': Підготовка до іспиту'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7, fontSize: '1.0625rem' }}>
                Жодних нудних лекцій. Тільки практика, яка реально доводить до результату 20 з 20.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
              {features.map((f, i) => (
                <article
                  key={i}
                  className={`reveal reveal-delay-${(i % 3) + 1} glass-card`}
                  style={{ padding: '1.75rem', borderRadius: '1.5rem', cursor: 'default' }}
                >
                  <div className="feature-icon-wrap" style={{ background: f.bg, marginBottom: '1.25rem' }}>
                    {React.cloneElement(f.icon as React.ReactElement<{ size?: number; color?: string }>, { size: 22, color: f.color })}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHOWCASE ──────────────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 10, paddingTop: '2rem', paddingBottom: '6rem', overflow: 'hidden' }} aria-labelledby="showcase-heading">
          <div className="bg-dots" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} aria-hidden="true" />
          <div className="container-xl" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>

              {/* Text */}
              <div className="reveal" style={{ textAlign: 'center', maxWidth: '42rem' }}>
                <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Інтерфейс</div>
                <h2 id="showcase-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                  Відчуй атмосферу{' '}
                  <span className="gradient-text">реального іспиту</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.0625rem', marginBottom: '1.75rem' }}>
                  20 питань · 20 хвилин · максимум 2 помилки. Наш симулятор — точна копія МВС.
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', maxWidth: '28rem', margin: '0 auto 2rem' }}>
                  {['Режим «Марафон» на 2000+ питань', 'Детальні ШІ-пояснення до кожної помилки', 'Відстеження готовності у відсотках', 'Розбивка за категоріями A, B, C, D'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '1.375rem', height: '1.375rem', borderRadius: '9999px', background: 'rgba(6,182,212,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 size={13} style={{ color: 'var(--accent-cyan)' }} />
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" id="cta-showcase"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700, color: 'var(--accent-cyan)', textDecoration: 'none', fontSize: '0.9375rem', transition: 'gap 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.gap = '0.625rem'; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = '0.375rem'; }}
                >
                  Запустити демо-іспит <ChevronRight size={18} />
                </a>
              </div>

              {/* Screenshots */}
              <div className="reveal" style={{ position: 'relative', width: '100%', maxWidth: '36rem' }}>
                <div style={{ position: 'absolute', inset: '-3rem', background: 'radial-gradient(ellipse, var(--glow-blue) 0%, transparent 70%)', filter: 'blur(60px)' }} aria-hidden="true" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative' }}>
                  <Image src={theme === 'dark' ? '/img/1000007884.jpg' : '/img/1000007886.jpg'} alt="Вибір категорії в онлайн тестах ПДР 2026" width={250} height={445} loading="lazy"
                    style={{ width: '100%', height: 'auto', borderRadius: '1.75rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)', transform: 'translateY(2rem)' }} />
                  <Image src={theme === 'dark' ? '/img/1000007834.jpg' : '/img/1000007885.jpg'} alt="Результат офіційного іспиту ПДР МВС 2026" width={250} height={445} loading="lazy"
                    style={{ width: '100%', height: 'auto', borderRadius: '1.75rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-card)' }} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────── */}
        <section id="how" style={{ position: 'relative', zIndex: 10, paddingTop: '6rem', paddingBottom: '6rem' }} aria-labelledby="how-heading">
          <div className="container-xl">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Як це працює</div>
              <h2 id="how-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                5 кроків до{' '}
                <span className="gradient-text">прав в кишені</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))', gap: '1rem' }}>
              {steps.map((s, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} glass-card`} style={{ padding: '1.5rem', borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '3.5rem', fontWeight: 900, color: 'var(--border-color)', lineHeight: 1, userSelect: 'none', transition: 'color 0.3s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--badge-bg)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--border-color)')}
                  >{s.num}</div>
                  <div className="step-badge" style={{ marginBottom: '1.25rem' }}>{parseInt(s.num)}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────── */}
        <section style={{ position: 'relative', zIndex: 10, paddingTop: '2rem', paddingBottom: '6rem' }} aria-labelledby="reviews-heading">
          <div className="container-xl">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Відгуки</div>
              <h2 id="reviews-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Що кажуть{' '}
                <span className="gradient-text">наші учні</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
              {testimonials.map((t, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} testimonial-card`}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                    {Array.from({ length: t.stars }).map((_, s) => <Star key={s} size={15} fill="#f59e0b" strokeWidth={0} />)}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: '1.25rem', fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={`https://i.pravatar.cc/100?img=${t.avatar}`} alt={t.name} width={40} height={40} loading="lazy" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.tag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section id="faq" style={{ position: 'relative', zIndex: 10, paddingTop: '4rem', paddingBottom: '6rem' }} aria-labelledby="faq-heading">
          <div className="container-xl">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>FAQ</div>
              <h2 id="faq-heading" style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Часті питання / FAQ
              </h2>
            </div>

            <div className="reveal" style={{ maxWidth: '50rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              itemScope itemType="https://schema.org/FAQPage">
              {faqs.map((faq, index) => (
                <div key={index}
                  itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
                  style={{
                    borderRadius: '1.25rem',
                    border: '1px solid',
                    borderColor: openFaq === index ? 'var(--border-hover)' : 'var(--border-color)',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease',
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(10px)',
                  }}>
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-ans-${index}`}
                    style={{ width: '100%', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                  >
                    {/* span замість h3 — h3 не валідний всередині button */}
                    <span role="heading" aria-level={3} style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }} itemProp="name">{faq.q}</span>
                    <ChevronDown size={18} style={{ color: 'var(--accent-cyan)', flexShrink: 0, transition: 'transform 0.3s ease', transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  </button>
                  <div
                    id={`faq-ans-${index}`}
                    role="region"
                    itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
                    style={{
                      maxHeight: openFaq === index ? '40rem' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.35s ease, opacity 0.35s ease, padding 0.35s ease',
                      opacity: openFaq === index ? 1 : 0,
                      padding: openFaq === index ? '0 1.5rem 1.25rem' : '0 1.5rem 0',
                    }}
                  >
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }} itemProp="text">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────────────── */}
        <section aria-label="Заклик до дії — відкрити застосунок" style={{ position: 'relative', zIndex: 10, paddingTop: '2rem', paddingBottom: '6rem' }}>
          <div className="container-xl">
            <div className="reveal" style={{ position: 'relative', borderRadius: '2.5rem', overflow: 'hidden', padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)', textAlign: 'center', border: '1px solid var(--border-color)', background: 'var(--bg-card)', backdropFilter: 'blur(30px)' }}>
              {/* Inner blobs */}
              <div style={{ position: 'absolute', top: '-30%', left: '20%', width: '60%', height: '160%', background: 'radial-gradient(ellipse, var(--glow-cyan) 0%, transparent 60%)', pointerEvents: 'none' }} aria-hidden="true" />
              <div style={{ position: 'absolute', bottom: '-20%', right: '10%', width: '40%', height: '100%', background: 'radial-gradient(ellipse, var(--glow-blue) 0%, transparent 60%)', pointerEvents: 'none' }} aria-hidden="true" />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                  <div style={{ width: '5.5rem', height: '5.5rem', borderRadius: '1.5rem', overflow: 'hidden', margin: '0 auto' }} className="animate-pulse-glow">
                    <Image src="/img/logo.png" alt="ПДР України" width={88} height={88} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '1.25rem', height: '1.25rem', borderRadius: '9999px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={12} color="white" />
                  </div>
                </div>

                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Твої права вже чекають
                </h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '32rem', margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
                  Приєднуйся до 1 400+ українців, які вже здали іспит на 20/20. Перший крок — безкоштовно.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', alignItems: 'center' }}>
                  <TelegramButton label="Відкрити бота в Telegram" size="lg" id="cta-final" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Старт за 10 секунд · Без реєстрації</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container-xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: '1.875rem', height: '1.875rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <Image src="/img/logo.png" alt="ПДР" width={30} height={30} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>ПДР України Bot</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['Договір оферти', '#'], ['Політика конфіденційності', '#'], ['Контакти', '#']].map(([label, href]) => (
              <a key={label} href={href} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{label}</a>
            ))}
          </nav>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>© 2026 ПДР України. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
