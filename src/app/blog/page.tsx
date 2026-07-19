import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { SiteHeader, BackgroundEffects } from '@/app/components/SharedUI';
import { Clock, BookOpen, ChevronRight, User } from 'lucide-react';

export default function BlogIndex() {
  const posts = getAllPosts();

  // Vibrant gradient covers for posts to give a high-end visual look
  const cardGradients = [
    'from-indigo-600/30 via-purple-600/20 to-slate-900',
    'from-cyan-600/30 via-blue-600/20 to-slate-900',
    'from-emerald-600/30 via-teal-600/20 to-slate-900',
  ];

  const cardIcons = [
    '🚔',
    '📘',
    '🚦',
  ];

  return (
    <div className="min-h-screen bg-theme-primary" style={{ position: 'relative' }}>
      <BackgroundEffects />
      <SiteHeader />
      
      {/* Increased top padding (pt-44 md:pt-52) to guarantee ZERO header overlap */}
      <main className="container-xl max-w-7xl pt-44 md:pt-52 pb-24 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] mb-6 shadow-sm">
            <BookOpen size={14} className="text-[var(--accent-cyan)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent-cyan)]">Офіційний блог та новини</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-theme-primary tracking-tight leading-tight">
            База <span className="gradient-text">Знань ПДР 2026</span>
          </h1>
          
          <p className="text-theme-secondary text-base md:text-xl leading-relaxed">
            Актуальні зміни в законах, розбір складних питань та корисні поради для впевненого складання іспиту у ГСЦ МВС.
          </p>
        </div>

        {/* 3-Column Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article 
              key={post.slug} 
              className="glass-card rounded-[2rem] overflow-hidden border border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)] flex flex-col relative"
            >
              {/* Cover Image Banner with Badge & Icon (Ref Image 1 & 2 inspired) */}
              <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${cardGradients[idx % cardGradients.length]} flex items-center justify-center p-6 border-b border-[var(--border-color)]`}>
                <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="text-6xl group-hover:scale-110 transition-transform duration-500 transform drop-shadow-lg select-none">
                  {cardIcons[idx % cardIcons.length]}
                </div>

                {/* Category Pill Tag top left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[var(--accent-cyan)] text-[11px] font-extrabold uppercase tracking-widest shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-grow">
                {/* Meta Row: Date & Read Time */}
                <div className="flex items-center gap-3 text-xs font-semibold text-[var(--text-secondary)] opacity-75 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-extrabold text-theme-primary mb-3 leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">
                  <Link href={`/${post.slug}`} className="before:absolute before:inset-0 focus:outline-none">
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-theme-secondary text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.description}
                </p>

                {/* Author Info & Action Row (Ref Image 2 & 3 inspired) */}
                <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={post.authorAvatar} 
                      alt={post.author} 
                      className="w-7 h-7 rounded-full border border-[var(--accent-cyan)]/30 object-cover" 
                    />
                    <span className="text-xs font-bold text-theme-primary truncate max-w-[120px]">
                      {post.author}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[var(--accent-cyan)] uppercase tracking-wider group-hover:text-[var(--accent-blue)] transition-colors">
                    Читати <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="glass-card p-12 text-center rounded-3xl">
            <p className="text-theme-secondary text-lg">Статей поки немає, але скоро з'являться!</p>
          </div>
        )}
      </main>
    </div>
  );
}
