import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { SiteHeader, BackgroundEffects } from '@/app/components/SharedUI';
import { Clock, BookOpen, ChevronRight, User } from 'lucide-react';

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-theme-primary" style={{ position: 'relative' }}>
      <BackgroundEffects />
      <SiteHeader />
      
      {/* Increased top padding (pt-44 md:pt-52) to guarantee ZERO header overlap */}
      <main className="container-xl" style={{ maxWidth: '80rem', paddingTop: '10rem', paddingBottom: '6rem', position: 'relative', zIndex: 10, fontFamily: 'var(--font-inter)' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.25rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            База <span className="gradient-text-animated">Знань ПДР 2026</span>
          </h1>
          
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '38rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Актуальні зміни в законах, розбір складних питань та корисні поради для впевненого складання іспиту у ГСЦ МВС.
          </p>
        </div>

        {/* 3-Column Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article 
              key={post.slug} 
              className="glass-card rounded-[2rem] p-8 md:p-10 border border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(6,182,212,0.12)] flex flex-col relative"
            >
              {/* Premium Top Metadata Row */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[var(--accent-cyan)] text-[11px] font-extrabold uppercase tracking-widest">{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] opacity-40"></span>
                <span className="text-xs font-semibold text-[var(--text-secondary)] opacity-75">{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)] opacity-40"></span>
                <span className="flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)] opacity-75">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-theme-primary mb-4 leading-snug group-hover:text-[var(--accent-cyan)] transition-colors">
                <Link href={`/${post.slug}`} className="before:absolute before:inset-0 focus:outline-none">
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-theme-secondary text-base leading-relaxed mb-10 flex-grow opacity-90">
                {post.description}
              </p>

              {/* Elegant Action Row */}
              <div className="mt-auto pt-6 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--text-primary)] opacity-80 group-hover:text-[var(--accent-cyan)] transition-colors">
                  Читати статтю
                </span>
                <div className="w-9 h-9 rounded-full bg-[var(--badge-bg)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--accent-cyan)] group-hover:bg-[rgba(6,182,212,0.1)] transition-all duration-300">
                  <ChevronRight size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 transition-all" />
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
