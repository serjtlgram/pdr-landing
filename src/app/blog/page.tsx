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
      
      <main className="container-xl max-w-4xl pt-40 md:pt-48 pb-20 relative z-10">
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
            <article key={post.slug} className="glass-card p-8 md:p-10 rounded-[2rem] flex flex-col gap-4 border border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(6,182,212,0.15)] relative">
              <div className="flex flex-col h-full">
                <div className="mb-5 flex items-center">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] text-[var(--accent-cyan)] text-xs font-bold uppercase tracking-widest">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-theme-primary mb-4 leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">
                  <Link href={`/${post.slug}`} className="before:absolute before:inset-0 focus:outline-none">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-theme-secondary mb-8 leading-relaxed text-lg flex-grow">
                  {post.description}
                </p>
                <div className="mt-auto flex items-center text-sm font-extrabold text-[var(--accent-cyan)] group-hover:text-[var(--accent-blue)] transition-colors uppercase tracking-wider">
                  Читати статтю <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                </div>
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
