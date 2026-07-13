import { getAllPosts, getAllTags } from '@/lib/posts';
import { notFound } from 'next/navigation';
import TagDetailClient from './TagDetailClient';

// 標籤在建置時已完全已知 → 預先產生靜態頁
export function generateStaticParams() {
  return getAllTags().map(tag => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const posts = getAllPosts();
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const filtered = posts.filter(post => (post.tags || []).includes(decodedTag));

  if (!filtered.length) return notFound();

  return <TagDetailClient posts={filtered} tag={decodedTag} />;
}
