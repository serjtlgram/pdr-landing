'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sun, Moon, Bot, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const TELEGRAM_URL = 'https://t.me/ispytpdrbot?startapp';

/* ─── THEME CONTEXT ──────────────────────────────────────────────────── */
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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

export const useTheme = () => useContext(ThemeContext);

/* ─── THEME TOGGLE BUTTON ────────────────────────────────────────────── */
export function ThemeToggle() {
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
export function TelegramButton({
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

/* ─── HEADER ─────────────────────────────────────────────────────────── */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    ['/blog', 'Блог'],
    ['/#features', 'Переваги'],
    ['/#how', 'Як це працює'],
    ['/#faq', 'FAQ'],
  ];

  return (
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
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', overflow: 'hidden', boxShadow: '0 0 15px var(--glow-cyan)' }}>
            <Image src="/img/logo.png" alt="ПДР України" width={36} height={36} priority style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }} className="gradient-text">
            ПДР УКРАЇНИ
          </span>
        </Link>

        <nav aria-label="Головна навігація" className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map(([href, label]) => (
            <Link key={href} href={href}
              style={{ display: 'inline-block', padding: '0.4rem 0.875rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none', borderRadius: '0.5rem', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', isolation: 'isolate' }}>
          <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
            <ThemeToggle />
          </div>
          <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }} className="hidden sm:block">
            <TelegramButton label="Відкрити в Telegram" size="sm" id="cta-header" />
          </div>
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

      {menuOpen && (
        <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navLinks.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              style={{ padding: '0.625rem 0.75rem', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '0.5rem', background: 'var(--bg-glass)' }}>
              {label}
            </Link>
          ))}
          <TelegramButton label="Відкрити в Telegram" size="sm" id="cta-mobile-menu" className="mt-2 w-full justify-center" />
        </div>
      )}
    </header>
  );
}

/* ─── BACKGROUND EFFECTS ─────────────────────────────────────────────── */
export function BackgroundEffects() {
  return (
    <>
      <div className="noise" />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
        <div className="blob animate-blob" style={{ width: '45vw', height: '45vw', top: '-10%', left: '-10%', background: 'var(--blob-1)' }} />
        <div className="blob animate-blob-delay" style={{ width: '40vw', height: '40vw', bottom: '-10%', right: '-10%', background: 'var(--blob-2)' }} />
        <div className="blob" style={{ width: '30vw', height: '30vw', top: '40%', left: '50%', transform: 'translateX(-50%)', background: 'var(--blob-3)', filter: 'blur(100px)' }} />
      </div>
    </>
  );
}
