import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import { SiteHeader, BackgroundEffects } from '@/app/components/SharedUI';
import { Clock, BookOpen, ChevronRight, User, Eye } from 'lucide-react';

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
              className="group relative flex flex-col items-start justify-between rounded-[2rem] bg-[var(--bg-card)] p-8 md:p-10 border border-[var(--border-color)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent-cyan)]"
            >
              <div className="flex-1 w-full relative z-10 pointer-events-none">
                {/* Title */}
                <h2 className="text-[22px] md:text-[26px] font-bold text-[var(--text-primary)] mb-6 leading-[1.3] group-hover:text-[var(--accent-cyan)] transition-colors pointer-events-auto">
                  <Link href={`/${post.slug}`} className="focus:outline-none">
                    <span className="absolute inset-0 z-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-[16px] md:text-[17px] leading-[1.7] text-[var(--text-secondary)] line-clamp-4 opacity-90 mb-8">
                  {post.description}
                </p>
              </div>

              {/* Bottom Action / Meta Row */}
              <div className="mt-auto pt-2 flex flex-wrap items-center gap-4 md:gap-5 w-full relative z-10 pointer-events-none">
                {/* Category Pill */}
                <span className="inline-block px-3 py-1 rounded-[4px] bg-[#60a5fa] text-white text-[11px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>

                {/* Read Time / Eye */}
                <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--text-secondary)] opacity-70">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>

                {/* Date */}
                <span className="text-[13px] font-semibold text-[var(--text-secondary)] opacity-70 uppercase tracking-wide">
                  {post.date}
                </span>
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
