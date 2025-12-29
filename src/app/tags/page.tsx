import { getAllPosts } from '@/lib/posts';
import TagClient from './TagClient';

export default function TagsPage() {
  const posts = getAllPosts();
  return <TagClient posts={posts} />;
}
