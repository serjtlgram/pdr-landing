import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  category?: string;
  image?: string;
  readTime?: string;
  author?: string;
  authorAvatar?: string;
  content: string;
};

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory);
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Blog post not found: ${realSlug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || 'Без назви',
    date: data.date || '2026-01-01',
    description: data.description || '',
    category: data.category || 'ПДР 2026',
    image: data.image || '/img/blog-default.jpg',
    readTime: data.readTime || '5 хв',
    author: data.author || 'Команда ПДР',
    authorAvatar: data.authorAvatar || 'https://i.pravatar.cc/100?img=12',
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .filter((slug) => slug.endsWith('.md'))
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
