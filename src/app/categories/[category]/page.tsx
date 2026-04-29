import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import CategoryDetailClient from './CategoryDetailClient';

interface Props {
  params: Promise<{ category: string }>;
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
