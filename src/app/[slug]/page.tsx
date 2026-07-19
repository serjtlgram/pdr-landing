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
      
      <main className="container-xl max-w-3xl" style={{ paddingTop: '10rem', paddingBottom: '6rem', position: 'relative', zIndex: 10, fontFamily: 'var(--font-inter)' }}>
        <Link href="/blog" className="inline-flex items-center gap-2 text-theme-secondary hover:text-[var(--accent-cyan)] transition-colors mb-8 font-medium">
          <ChevronLeft size={20} />
          <span>До списку статей</span>
        </Link>
        
        <article className="glass-card p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-[var(--border-color)]">
          <header className="mb-10 border-b border-[var(--border-color)] pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] text-[var(--accent-cyan)] text-xs font-extrabold uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-xs text-[var(--text-secondary)] opacity-60">•</span>
              <span className="text-xs text-[var(--text-secondary)] font-semibold">{post.date}</span>
              <span className="text-xs text-[var(--text-secondary)] opacity-60">•</span>
              <span className="text-xs text-[var(--text-secondary)] font-semibold">{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-theme-primary mb-6 leading-[1.15] tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-3 pt-2">
              <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full border border-[var(--accent-cyan)]/40 object-cover" />
              <span className="text-sm font-bold text-theme-primary">{post.author}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none 
            prose-headings:text-theme-primary prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-a:text-accent-blue hover:prose-a:text-accent-cyan prose-a:transition-colors prose-a:font-semibold
            prose-strong:text-theme-primary prose-strong:font-bold
            prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6
            prose-li:text-theme-secondary prose-li:my-2 prose-li:leading-relaxed prose-li:text-lg
            prose-p:text-theme-secondary prose-p:leading-relaxed prose-p:text-lg prose-p:my-6
            prose-blockquote:border-l-4 prose-blockquote:border-accent-cyan prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-theme-secondary prose-blockquote:bg-[var(--bg-secondary)] prose-blockquote:py-2 prose-blockquote:rounded-r-lg"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-10 border-t border-[var(--border-color)]">
            <div className="bg-gradient-to-br from-[rgba(6,182,212,0.15)] to-[rgba(59,130,246,0.15)] p-10 rounded-3xl text-center border border-[rgba(6,182,212,0.3)] shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/img/noise.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-theme-primary mb-4">Готуєшся до іспиту ПДР?</h3>
                <p className="text-theme-secondary mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                  Запускай наш офіційний Telegram-бот та проходь тести ПДР 2026 року з реальними питаннями від ГСЦ МВС. Безкоштовно та без реклами.
                </p>
                <TelegramButton label="Запустити тести у Telegram" size="lg" id="cta-blog-post" />
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
