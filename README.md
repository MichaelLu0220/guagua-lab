# GuaGua Blog Template 🎨

A bilingual (English / 繁體中文), neo-brutalist personal blog template built with **Next.js 15**, **Tailwind CSS**, and **MDX**.

Live example → [www.guagualab.com](https://www.guagualab.com)

![style: neo-brutalism](https://img.shields.io/badge/style-neo--brutalism-ff69b4)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black)
![license: MIT](https://img.shields.io/badge/license-MIT-green)

## Features

- ✍️ **MDX posts** — drop a `.mdx` file into `posts/` and it's published
- 🌏 **Bilingual out of the box** — per-post English / 中文 content with automatic browser-language detection and a manual toggle
- 🌙 **Dark mode** — applied before first paint, no flash
- ⚡ **Fully static (SSG)** — every page ships as complete HTML; great Core Web Vitals and SEO
- 🔍 **SEO ready** — sitemap, robots.txt, Open Graph, Twitter Card, JSON-LD structured data
- 💬 **giscus comments** — GitHub Discussions-based, optional
- 📑 Auto table of contents, reading time, drop caps, code highlighting
- 🗂 Archives, categories, and tags pages — all generated from frontmatter

## Quick start

```bash
# 1. Use this template (or clone), then install
npm install

# 2. Start the dev server
npm run dev
```

Open http://localhost:3000 — you should see the sample blog.

## Make it yours

### 1. Edit `src/lib/siteConfig.ts`

Everything personal lives in one file: site name, domain, author info, hero
title/subtitle, keywords. Start here — the navbar, sidebar, footer, hero and
all SEO tags read from it.

### 2. Replace the placeholder images in `public/images/`

| File | Used for | Suggested size |
| --- | --- | --- |
| `avatar.png` | Sidebar & about page avatar | 160 × 160 |
| `hero-photo.png` | Homepage polaroid photo | 560 × 560 |
| `og-default.png` | Social share preview | 1200 × 630 |

Also replace `src/app/favicon.ico` with your own.

### 3. Write posts

Add `.mdx` files to `posts/`. See the sample post
([`posts/hello-world.mdx`](posts/hello-world.mdx)) for the frontmatter format
and the bilingual `language-content` blocks.

### 4. Tell your story

Edit `src/app/about/page.tsx` with your own introduction.

### 5. (Optional) Enable comments

1. Make your repo public and enable **Discussions**
2. Install the [giscus app](https://github.com/apps/giscus) on it
3. Get your IDs at [giscus.app](https://giscus.app) and fill in `siteConfig.giscus`

### 6. Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — zero
config needed. Remember to set `siteConfig.url` to your production domain so
canonical URLs, the sitemap, and OG images point to the right place.

## 中文說明

這是一個雙語（英文／繁體中文）的 neo-brutalist 風格個人部落格模板，使用 Next.js 15 + Tailwind CSS + MDX。

**快速開始**：`npm install` → `npm run dev`，打開 http://localhost:3000。

**客製化步驟**：

1. 編輯 `src/lib/siteConfig.ts` — 所有個人資訊（站名、網域、作者、首頁標題）都集中在這裡
2. 替換 `public/images/` 裡的佔位圖片（頭像、首頁照片、社群分享圖）與 favicon
3. 在 `posts/` 新增 `.mdx` 文章，格式參考範例文章 `posts/hello-world.mdx`
4. 編輯 `src/app/about/page.tsx` 寫你自己的介紹
5. （選配）到 [giscus.app](https://giscus.app) 取得設定值填入 `siteConfig.giscus` 開啟留言
6. 推上 GitHub、匯入 Vercel 即可部署，記得把 `siteConfig.url` 改成你的正式網域

## Credits

Designed and built by [GuaGua (Michael Lu)](https://www.guagualab.com).
Released under the [MIT License](LICENSE) — free for personal and commercial
use. Keeping the "Template by GuaGua" line in the footer is appreciated but
not required. 🙏
