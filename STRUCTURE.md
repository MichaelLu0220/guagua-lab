website/                          # 專案根目錄
├── .git/                         # Git 版本控制資料夾
├── .next/                        # Next.js 建置快取資料夾
├── node_modules/                 # Node.js 依賴套件
│
├── posts/                        # MDX 文章資料夾
│
├── public/                       # 靜態資源資料夾
│   ├── favicon.ico
│   └── images/                   # 圖片資源
│
├── src/                          # 原始碼主資料夾
│   ├── app/                      # Next.js 15 App Router
│   │   ├── about/                # 關於頁面
│   │   │   └── page.tsx
│   │   │
│   │   ├── api/                  # API 路由
│   │   │   ├── stock/
│   │   │   │   └── route.ts      # FinMind 股價代理 API
│   │   │   └── stock-info/
│   │   │       └── route.ts      # FinMind 個股資訊代理 API
│   │   │
│   │   ├── archives/             # 文章歸檔頁面
│   │   │   ├── page.tsx
│   │   │   └── ArchiveClient.tsx
│   │   │
│   │   ├── blog/                 # 部落格相關頁面
│   │   │   └── [slug]/           # 動態路由 - 文章頁面
│   │   │       ├── page.tsx              # Server Component（SEO metadata + JSON-LD）
│   │   │       └── BlogClientContent.tsx # 文章內容客戶端組件
│   │   │
│   │   ├── checklist/            # 旅遊清單（資料驅動 + 雙語）
│   │   │   ├── page.tsx          # 索引頁 Server Component（SEO metadata）
│   │   │   ├── ChecklistIndexClient.tsx  # 索引頁卡片牆（雙語切換）
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 動態路由 - 個別清單（SEO metadata）
│   │   │
│   │   ├── categories/           # 分類頁面
│   │   │   ├── page.tsx
│   │   │   ├── CategoryClient.tsx
│   │   │   └── [category]/       # 動態路由 - 特定分類
│   │   │       ├── page.tsx
│   │   │       └── CategoryDetailClient.tsx
│   │   │
│   │   ├── equity/               # 股票/權益曲線頁面
│   │   │   └── page.tsx
│   │   │
│   │   ├── tags/                 # 標籤頁面
│   │   │   ├── page.tsx
│   │   │   ├── TagClient.tsx
│   │   │   └── [tag]/            # 動態路由 - 特定標籤
│   │   │       ├── page.tsx
│   │   │       └── TagDetailClient.tsx
│   │   │
│   │   ├── thailand-checklist/   # 舊路由（permanent redirect → /checklist/thailand）
│   │   │   └── page.tsx
│   │   │
│   │   ├── uschecklist/          # 舊路由（permanent redirect → /checklist/usa）
│   │   │   └── page.tsx
│   │   │
│   │   ├── favicon.ico           # 網站圖示（App Router 慣例位置）
│   │   ├── globals.css           # 全域 CSS 樣式（含 Neobrutalism 風格）
│   │   ├── layout.tsx            # 根布局（全站 metadata、Google verification）
│   │   ├── page.tsx              # 首頁（含 WebSite JSON-LD）
│   │   ├── robots.ts             # robots.txt 動態生成
│   │   └── sitemap.ts            # sitemap.xml 動態生成
│   │
│   ├── components/               # 共用組件資料夾
│   │   ├── blog/                 # 文章頁專用組件
│   │   │   ├── PostHeader.tsx
│   │   │   ├── PostNavigation.tsx
│   │   │   ├── PostTags.tsx
│   │   │   ├── SiteFooter.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── checklist/            # 旅遊清單共用元件
│   │   │   └── ChecklistView.tsx # 共用客戶端互動元件（勾選 / 進度 / localStorage）
│   │   ├── ClientHomePage.tsx    # 首頁客戶端組件
│   │   ├── CodeBlock.tsx         # MDX 程式碼區塊（含複製按鈕）
│   │   ├── CommentSection.tsx    # 評論區組件
│   │   ├── EquityCurve.tsx       # 權益曲線圖
│   │   ├── HeroBanner.tsx        # 英雄橫幅組件
│   │   ├── HomeNavBar.tsx        # 首頁導航欄組件
│   │   ├── KLineChart.tsx        # K 線圖（lightweight-charts）
│   │   ├── NavBar.tsx            # 通用導航欄組件
│   │   ├── ThemeToggle.tsx       # 主題切換組件（canonical 版本）
│   │   └── TradeHistory.tsx      # 交易歷史組件
│   │
│   ├── hooks/                    # 自訂 React Hooks
│   │   └── useLanguage.ts        # 雙語切換 hook（讀寫 localStorage + 廣播事件）
│   │
│   ├── lib/                      # 工具函式庫
│   │   ├── backtest.ts           # 回測邏輯
│   │   ├── checklists/           # 旅遊清單資料層
│   │   │   ├── types.ts          # Checklist / ChecklistBlock / ChecklistTheme 型別
│   │   │   ├── thailand.tsx      # 泰國清單資料（含主題色）
│   │   │   ├── usa.tsx           # 美國清單資料（含主題色）
│   │   │   └── index.ts          # registry：getAllChecklists / getChecklistBySlug
│   │   ├── posts.ts              # 文章處理（getAllPosts、getPostBySlug、雙語解析等）
│   │   └── siteConfig.ts         # 網站配置（SEO、Open Graph 預設值）
│   │
│   └── utils/                    # 工具函式
│       └── languageDetector.ts   # 語言檢測工具
│
├── .gitignore                    # Git 忽略檔案配置
├── CLAUDE.md                     # Claude Code 工作指引
├── DEVLOG.md                     # 開發日誌
├── README.md                     # 專案說明文件
├── STRUCTURE.md                  # 專案結構說明（本檔案）
├── TODO.md                       # 待辦事項
├── deployflow.txt                # 部署流程備忘
├── eslint.config.mjs             # ESLint 配置
├── next-env.d.ts                 # Next.js TypeScript 環境定義
├── next.config.ts                # Next.js 配置（注意：ignoreBuildErrors 為 true）
├── package-lock.json             # npm 依賴鎖定檔案
├── package.json                  # 專案配置和依賴
├── postcss.config.js             # PostCSS 配置
├── tailwind.config.js            # Tailwind CSS 配置
├── tsconfig.json                 # TypeScript 配置
└── tsconfig.tsbuildinfo          # TypeScript 增量建置快取



# ============================================
# 技術棧
# ============================================

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS + Neobrutalism 風格
- Content: MDX (next-mdx-remote/rsc，支援中英雙語)
- Charts: lightweight-charts（K 線圖、權益曲線）
- Language: TypeScript
- Deployment: Vercel



# ============================================
# 主要功能
# ============================================

1. SEO 優化
   - 動態 metadata 生成（每頁、每篇文章獨立）
   - sitemap.xml 自動生成（含文章、分類、標籤頁）
   - robots.txt 動態生成
   - Open Graph / Twitter Card 支援
   - JSON-LD 結構化資料（首頁 WebSite、文章 BlogPosting）
   - Google Search Console verification 已設定

2. 雙語支援
   - 標題、描述支援 { en, zh } frontmatter 格式
   - 文章內容使用 <div className="language-content" data-lang="..."> 切換
   - 語言狀態存於 localStorage，透過自訂 languageChange 事件同步

3. 主題切換
   - 淺色／深色模式（Tailwind dark: variant）
   - 系統偏好自動偵測

4. 文章功能
   - MDX 格式（Server-side 渲染）
   - 程式碼區塊語法高亮（rehype-highlight）
   - 閱讀時間計算
   - 上下篇文章導航
   - 標籤與分類系統
   - Table of Contents（自動產生 heading 錨點）
   - 評論區

5. Server / Client 分工
   - 所有 page.tsx 為 Server Component（資料抓取 + SEO）
   - *Client.tsx 為 Client Component（互動行為）
   - 文章透過 generateStaticParams 做 SSG

6. 股票／回測功能
   - /equity 頁面提供 K 線圖（lightweight-charts）
   - /api/stock、/api/stock-info 代理 FinMind API
   - 需 FINMIND_TOKEN 環境變數（無 token 仍可用，但有 rate limit）
