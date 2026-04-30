import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllChecklistSlugs,
  getChecklistBySlug,
} from '@/lib/checklists';
import { pickString } from '@/lib/checklists/types';
import { siteConfig } from '@/lib/siteConfig';
import ChecklistView from '@/components/checklist/ChecklistView';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllChecklistSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) {
    return { title: '404' };
  }

  const title = pickString(checklist.title, 'en');
  const description = pickString(checklist.metaDescription, 'en');
  const url = `${siteConfig.url}/checklist/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'article',
      images: [
        {
          url: `${siteConfig.url}${siteConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}${siteConfig.defaultOgImage}`],
    },
    alternates: { canonical: url },
  };
}

export default async function ChecklistPage({ params }: Props) {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) return notFound();

  return <ChecklistView checklist={checklist} />;
}
