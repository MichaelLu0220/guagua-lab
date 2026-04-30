import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import ChecklistIndexClient from './ChecklistIndexClient';

export const metadata: Metadata = {
  title: 'Travel Checklists',
  description: 'Pre-departure travel checklists by country with progress tracking.',
  alternates: { canonical: `${siteConfig.url}/checklist` },
  openGraph: {
    title: 'Travel Checklists',
    description: 'Pre-departure travel checklists by country with progress tracking.',
    url: `${siteConfig.url}/checklist`,
    siteName: siteConfig.name,
    type: 'website',
    images: [
      {
        url: `${siteConfig.url}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: 'Travel Checklists',
      },
    ],
  },
};

export default function ChecklistIndexPage() {
  return <ChecklistIndexClient />;
}
