import LandingPage from './components/LandingPage';
import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { Clock, BookOpen } from 'lucide-react';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <LandingPage />
      
      {/* ── LATEST BLOG POSTS ── */}
      {latestPosts.length > 0 && (
        <section style={{ position: 'relative', zIndex: 10, paddingBottom: '6rem' }}>
          <div className="container-xl">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'inline-block', padding: '0.25rem 0.875rem', borderRadius: '9999px', background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Блог</div>
              <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                База <span className="gradient-text-animated">Знань ПДР 2026</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
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

                  {/* Title */}
                  <h3 className="text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors duration-300" style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>
                    <Link href={`/${post.slug}`} className="focus:outline-none" style={{ color: 'inherit', textDecoration: 'none' }}>
                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                      {post.title}
                    </Link>
                  </h3>

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
            
            {/* View All Button */}
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Link href="/blog" 
                className="btn-shimmer text-white font-bold rounded-2xl transition-all duration-300 animate-glow-ring"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  padding: '1.1rem 2.25rem',
                  fontSize: '1.125rem',
                }}
              >
                Перейти до Бази Знань
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
