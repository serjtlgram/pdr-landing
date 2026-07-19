import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { SiteHeader, BackgroundEffects } from '@/app/components/SharedUI';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-theme-primary" style={{ position: 'relative' }}>
      <BackgroundEffects />
      <SiteHeader />
      
      <main className="container-xl max-w-4xl pt-32 pb-20 relative z-10">
        <div className="text-center mb-16">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Офіційні матеріали та поради</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-theme-primary tracking-tight">
            База <span className="gradient-text">Знань ПДР</span>
          </h1>
          <p className="text-theme-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Розбираємо складні ситуації, вивчаємо нові штрафи та готуємось до іспиту разом.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card p-6 md:p-8 rounded-3xl flex flex-col gap-4 border border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors duration-300 group">
              <div>
                <p className="text-sm font-semibold text-accent-cyan mb-3">{post.date}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-theme-primary mb-4 leading-tight group-hover:text-accent-blue transition-colors">
                  <Link href={`/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-theme-secondary mb-6 leading-relaxed text-lg">
                  {post.description}
                </p>
                <Link href={`/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[var(--accent-cyan)] hover:bg-[var(--accent-blue)] px-6 py-3 rounded-xl transition-all duration-300">
                  Читати статтю &rarr;
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="glass-card p-12 text-center rounded-3xl">
              <p className="text-theme-secondary text-lg">Статей поки немає, але скоро з'являться!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
