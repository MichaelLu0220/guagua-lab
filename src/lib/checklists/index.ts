import type { Checklist } from './types';
import { thailandChecklist } from './thailand';
import { usaChecklist } from './usa';

const registry: Record<string, Checklist> = {
  [thailandChecklist.slug]: thailandChecklist,
  [usaChecklist.slug]: usaChecklist,
};

export function getAllChecklists(): Checklist[] {
  return Object.values(registry);
}

export function getChecklistBySlug(slug: string): Checklist | null {
  return registry[slug] ?? null;
}

export function getAllChecklistSlugs(): string[] {
  return Object.keys(registry);
}

export type { Checklist, ChecklistBlock, ChecklistSection, ChecklistTheme } from './types';
