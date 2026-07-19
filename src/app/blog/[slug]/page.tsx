import React from 'react';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ChevronLeft, Bot } from 'lucide-react';
import { Metadata } from 'next';

const TELEGRAM_URL = 'https://t.me/ispytpdrbot?startapp';

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
    <div className="min-h-screen bg-theme-primary pt-24 pb-20">
      <div className="container-xl max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-theme-secondary hover:text-accent-cyan transition-colors mb-8">
          <ChevronLeft size={20} />
          <span>До списку статей</span>
        </Link>
        
        <article className="glass-card p-6 md:p-10 rounded-3xl">
          <header className="mb-8 border-b border-theme pb-8">
            <p className="text-accent-cyan font-semibold mb-3">{post.date}</p>
            <h1 className="text-3xl md:text-5xl font-extrabold text-theme-primary mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-theme-secondary text-lg leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="prose prose-invert prose-lg max-w-none text-theme-primary
            prose-headings:text-theme-primary prose-headings:font-bold
            prose-a:text-accent-blue hover:prose-a:text-accent-cyan
            prose-strong:text-theme-primary
            prose-ul:list-disc prose-ol:list-decimal
            prose-li:text-theme-secondary
            prose-p:text-theme-secondary prose-p:leading-relaxed"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-theme">
            <div className="bg-gradient-to-r from-[rgba(6,182,212,0.1)] to-[rgba(59,130,246,0.1)] p-8 rounded-2xl text-center border border-[rgba(6,182,212,0.2)]">
              <h3 className="text-2xl font-bold text-theme-primary mb-3">Готуєшся до іспиту ПДР?</h3>
              <p className="text-theme-secondary mb-6 max-w-lg mx-auto">
                Запускай наш офіційний Telegram-бот та проходь тести ПДР 2026 року з реальними питаннями від ГСЦ МВС. Безкоштовно та без реклами.
              </p>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer text-white font-bold rounded-2xl inline-flex items-center gap-2 px-6 py-3 transition-transform hover:-translate-y-1"
              >
                <Bot size={20} />
                <span>Запустити тести у Telegram</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
