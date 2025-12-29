import { getAllPosts } from '@/lib/posts';
import TagDetailClient from './TagDetailClient';

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const posts = getAllPosts();
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const filtered = posts.filter(post => (post.tags || []).includes(decodedTag));

  return <TagDetailClient posts={filtered} tag={decodedTag} />;
}
