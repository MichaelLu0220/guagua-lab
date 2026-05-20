# Maintenance Notes

This file keeps day-to-day project notes out of the public README.

## Local Commands

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start a production build:

```bash
npm run start
```

## Environment

Normal content pages do not require private environment variables.

Optional API-backed features may use:

```env
FINMIND_TOKEN=your_token_here
```

Keep `.env` files local.

## Content Notes

Articles live in `posts/` as `.mdx` files.

Recommended frontmatter:

```yaml
---
title:
  en: "English title"
  zh: "Traditional Chinese title"
description:
  en: "Short English description"
  zh: "Traditional Chinese description"
date: 2026-01-01 12:00:00
tags: [tag-one, tag-two]
categories: Tech
---
```

Bilingual blocks can be separated with:

```mdx
<div className="language-content" data-lang="en">

English content.

</div>

<div className="language-content" data-lang="zh">

Traditional Chinese content.

</div>
```

## Public Hygiene

- Keep README intentionally high-level.
- Keep drafts, private notes, abandoned experiments, and deployment scratch files untracked.
- Check that public assets are referenced before keeping them.
- Document only setup names and maintenance steps here, not full product reasoning.
