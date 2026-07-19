import React from 'react';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
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
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors mb-10 font-semibold text-sm">
            <ChevronLeft size={18} />
            <span>До списку статей</span>
          </Link>
          
          {/* Article Header */}
          <header className="mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 rounded-[6px] bg-[rgba(6,182,212,0.12)] text-[var(--accent-cyan)] text-[11px] font-extrabold uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-[var(--text-secondary)] opacity-40">•</span>
              <span className="text-[13px] text-[var(--text-secondary)] font-semibold">{post.date}</span>
              <span className="text-[var(--text-secondary)] opacity-40">•</span>
              <span className="text-[13px] text-[var(--text-secondary)] font-semibold">{post.readTime} читання</span>
            </div>
            
            <h1 className="text-[2.25rem] md:text-[3.5rem] font-black text-[var(--text-primary)] pb-8 mb-12 border-b border-[var(--border-color)] leading-[1.15] tracking-tight">
              {post.title}
            </h1>
          </header>

          {/* Article Content */}
          <article className="prose dark:prose-invert prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-[var(--text-primary)] prose-headings:tracking-tight
            prose-h2:text-[2rem] prose-h2:font-black prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-[var(--border-color)] prose-h2:pb-4
            prose-h3:text-[1.5rem] prose-h3:mt-10 prose-h3:mb-6
            prose-p:text-[var(--text-secondary)] prose-p:text-[1.1rem] prose-p:leading-[1.85] prose-p:mb-8
            prose-a:text-[var(--accent-blue)] hover:prose-a:text-[var(--accent-cyan)] prose-a:transition-colors prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[var(--text-primary)] prose-strong:font-extrabold
            prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6
            prose-li:text-[var(--text-secondary)] prose-li:text-[1.1rem] prose-li:my-3 prose-li:leading-[1.8] prose-li:marker:text-[var(--accent-cyan)] prose-li:marker:font-bold
            prose-blockquote:border-l-[4px] prose-blockquote:border-[var(--accent-cyan)] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-[var(--text-secondary)] prose-blockquote:bg-[var(--bg-glass)] prose-blockquote:py-4 prose-blockquote:pr-6 prose-blockquote:rounded-r-xl"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Bottom CTA Card */}
          <div className="mt-32 mb-10">
            <div className="glass-card rounded-[2.5rem] relative overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)', padding: '4rem 2.5rem', textAlign: 'center' }}>
              {/* Decorative background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-40 bg-[var(--accent-cyan)] opacity-[0.15] blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-[2rem] font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">Готуєшся до іспиту ПДР?</h3>
                <p className="text-[var(--text-secondary)] mb-8 max-w-[28rem] mx-auto text-[1.05rem] leading-[1.6]">
                  Запускай наш офіційний Telegram-бот та проходь тести ПДР 2026 року з реальними питаннями від ГСЦ МВС. Безкоштовно та без реклами.
                </p>
                <div className="flex justify-center">
                  <TelegramButton label="Запустити тести у Telegram" size="lg" id="cta-blog-post" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
