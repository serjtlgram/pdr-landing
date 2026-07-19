import React from 'react';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ChevronLeft, Clock, Calendar } from 'lucide-react';
import { Metadata } from 'next';
import { SiteHeader, BackgroundEffects, TelegramButton } from '@/app/components/SharedUI';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} | ПДР України 2026`,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-theme-primary" style={{ position: 'relative' }}>
      <BackgroundEffects />
      <SiteHeader />
      
      <main className="container-xl" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative', zIndex: 10, fontFamily: 'var(--font-inter)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#0284c7] hover:text-[#0369a1] transition-colors mb-10 font-semibold text-sm">
            <ChevronLeft size={18} strokeWidth={2.5} />
            <span>До списку статей</span>
          </Link>
          
          {/* Article Header */}
          <header className="mb-12" style={{ marginBottom: '3.5rem' }}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-block px-3 py-1 rounded-[6px] bg-[#f0f9ff] dark:bg-[rgba(2,132,199,0.15)] text-[#0284c7] dark:text-[#38bdf8] text-[11px] font-bold uppercase tracking-widest">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-[13px] text-slate-500 dark:text-slate-400 font-medium">
                <Clock size={14} />
                <span>{post.readTime} читання</span>
              </div>
            </div>
            
            <h1 className="text-[2.25rem] md:text-[3.5rem] font-black text-[var(--text-primary)] leading-[1.15] tracking-tight" style={{ marginBottom: '2.5rem' }}>
              {post.title}
            </h1>
            <div className="w-16 h-[4px] bg-[#0284c7] rounded-full"></div>
          </header>

          <style dangerouslySetInnerHTML={{__html: `
            .custom-ordered-list {
              counter-reset: custom-counter;
              list-style: none;
              padding: 0;
              margin: 2rem 0;
            }
            .custom-ordered-list > li {
              counter-increment: custom-counter;
              position: relative;
              padding-left: 3.5rem;
              padding-bottom: 1.5rem;
              margin-bottom: 1.5rem;
              border-bottom: 1px solid var(--border-color);
              font-size: 1.1rem;
              color: var(--text-secondary);
              line-height: 1.8;
            }
            .custom-ordered-list > li:last-child {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 0;
            }
            .custom-ordered-list > li::before {
              content: counter(custom-counter) ".";
              position: absolute;
              left: 0;
              top: -0.25rem;
              font-size: 2rem;
              font-weight: 700;
              color: #3b82f6;
            }
          `}} />

          {/* Article Content */}
          <article className="prose dark:prose-invert prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-[var(--text-primary)] prose-headings:tracking-tight
            prose-h3:text-[1.5rem] prose-h3:mt-10 prose-h3:mb-6
            prose-a:text-[var(--accent-blue)] hover:prose-a:text-[var(--accent-cyan)] prose-a:transition-colors prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--text-primary)] prose-strong:font-extrabold
            prose-ul:list-disc prose-ul:pl-6
            prose-blockquote:border-none prose-blockquote:bg-[#f8fafc] dark:prose-blockquote:bg-[rgba(255,255,255,0.03)] prose-blockquote:rounded-2xl prose-blockquote:p-8 prose-blockquote:not-italic prose-blockquote:my-10 prose-blockquote:text-[var(--text-primary)]"
          >
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => <h2 className="text-[2rem] font-black text-[var(--text-primary)] tracking-tight" style={{ marginTop: '4.5rem', marginBottom: '2rem' }} {...props} />,
                p: ({node, ...props}) => <p className="text-[1.1rem] leading-[1.85] text-[var(--text-secondary)]" style={{ marginBottom: '2.5rem' }} {...props} />,
                ol: ({node, ...props}) => <ol className="custom-ordered-list" {...props} />,
                li: ({node, ...props}) => <li {...props} />
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Bottom CTA Card */}
          <div className="mt-32 mb-10">
            <div className="glass-card rounded-[2.5rem] relative overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)', padding: '2.25rem 1.25rem', textAlign: 'center' }}>
              {/* Decorative background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-gradient-to-r from-[var(--accent-cyan)] to-[#8b5cf6] opacity-[0.08] blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <h3 className="text-[2rem] md:text-[2.75rem] font-black text-[var(--text-primary)] tracking-tight leading-[1.1]" style={{ marginBottom: '1.5rem' }}>
                  Твої права вже чекають
                </h3>
                <p className="text-[var(--text-secondary)] max-w-[28rem] text-[1.1rem] leading-[1.6]" style={{ marginBottom: '2.5rem' }}>
                  Приєднуйся до 1 400+ українців, які вже здали іспит на 20/20. Перший крок — безкоштовно.
                </p>
                <div className="flex justify-center" style={{ marginBottom: '1.25rem' }}>
                  <TelegramButton label="Відкрити бота в Telegram" size="lg" id="cta-blog-post" />
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[0.85rem] text-[var(--text-secondary)] font-medium opacity-75">
                  <Clock size={14} />
                  <span>Старт за 10 секунд · Без реєстрації</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
