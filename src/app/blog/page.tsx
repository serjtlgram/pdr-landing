import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Блог | Правила дорожнього руху 2026',
  description: 'Корисні статті, розбори складних ситуацій та нові штрафи ПДР 2026 року.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-theme-primary pt-24 pb-20">
      <div className="container-xl max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-theme-secondary hover:text-accent-cyan transition-colors mb-8">
          <ChevronLeft size={20} />
          <span>На головну</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-theme-primary">
          База <span className="gradient-text">Знань ПДР</span>
        </h1>
        <p className="text-theme-secondary text-lg mb-12">
          Розбираємо складні ситуації, вивчаємо нові штрафи та готуємось до іспиту разом.
        </p>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <p className="text-sm font-semibold text-accent-cyan mb-2">{post.date}</p>
                <h2 className="text-2xl font-bold text-theme-primary mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent-blue transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-theme-secondary mb-4 leading-relaxed">
                  {post.description}
                </p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-theme-primary hover:text-accent-purple transition-colors">
                  Читати статтю &rarr;
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-theme-secondary">Статей поки немає, але скоро з'являться!</p>
          )}
        </div>
      </div>
    </div>
  );
}
