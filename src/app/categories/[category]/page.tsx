import { getAllPosts, getAllCategories } from '@/lib/posts';
import { notFound } from 'next/navigation';
import CategoryDetailClient from './CategoryDetailClient';

interface Props {
  params: Promise<{ category: string }>;
}

// 分類在建置時已完全已知 → 預先產生靜態頁
export function generateStaticParams() {
  return getAllCategories().map(category => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getAllPosts();
  const filtered = posts.filter(
    post => post.categories === decodeURIComponent(category)
  );

  if (!filtered.length) return notFound();

  return (
    <CategoryDetailClient
      posts={filtered}
      categoryName={decodeURIComponent(category)}
    />
  );
}
