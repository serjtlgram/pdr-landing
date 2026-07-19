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
      
      <main className="container-xl max-w-7xl pt-32 md:pt-40 pb-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-theme-primary tracking-tight">
            База <span className="gradient-text">Знань ПДР</span>
          </h1>
          <p className="text-theme-secondary text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Розбираємо складні ситуації, вивчаємо нові штрафи та готуємось до іспиту разом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card p-6 md:p-8 rounded-[1.5rem] flex flex-col gap-3 border border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)] relative">
              <div className="flex flex-col h-full">
                <div className="mb-2">
                  <span className="text-[var(--text-secondary)] opacity-70 text-sm font-semibold tracking-wide">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-theme-primary mb-3 leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">
                  <Link href={`/${post.slug}`} className="before:absolute before:inset-0 focus:outline-none">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-theme-secondary mb-6 leading-relaxed text-sm md:text-base flex-grow">
                  {post.description}
                </p>
                <div className="mt-auto flex items-center text-xs font-bold text-[var(--accent-blue)] transition-colors uppercase tracking-widest">
                  Читати статтю <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
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
