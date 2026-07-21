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
              className="glass-card hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] hover:border-[var(--accent-cyan)] transition-all duration-300 relative group flex flex-col"
              style={{ padding: '2rem', borderRadius: '2rem' }}
            >
              {/* Top Row: Icon & Category */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', width: '100%', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
                <div className="feature-icon-wrap" style={{ background: 'var(--badge-bg)', color: 'var(--accent-cyan)', margin: 0 }}>
                  <BookOpen size={24} />
                </div>
                <div style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', padding: '0.4rem 0.8rem', borderRadius: '999px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-cyan)' }}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Image Preview */}
              {post.image && post.image !== '/img/blog-default.jpg' && (
                <div className="w-full relative rounded-xl overflow-hidden aspect-[16/9] border border-[var(--border-color)]" style={{ marginBottom: '1rem' }}>
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}

              {/* Title */}
              <h2 className="text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
                <Link href={`/${post.slug}`} className="focus:outline-none" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, flexGrow: 1, marginBottom: '2rem', position: 'relative' }}>
                {post.description}
              </p>

              {/* Bottom Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: 'auto', width: '100%', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                   <Clock size={16} />
                   <span>{post.readTime} читання</span>
                 </div>
                 <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-secondary)', opacity: 0.5 }}></div>
                 <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
