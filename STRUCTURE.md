website/                          # 專案根目錄
├── .git/                         # Git 版本控制資料夾
├── .next/                        # Next.js 建置快取資料夾
├── .github/                      # GitHub 相關配置
├── node\_modules/                 # Node.js 依賴套件
├── deposts/                      # 備用文章資料夾
│
├── src/                          # 原始碼主資料夾
│   ├── app/                      # Next.js 13+ App Router
│   │   ├── about/                # 關於頁面
│   │   │   └── page.tsx          # 關於頁面組件
│   │   │
│   │   ├── archives/             # 文章歸檔頁面
│   │   │   ├── page.tsx          # 歸檔頁面路由
│   │   │   └── ArchiveClient.tsx # 歸檔客戶端組件
│   │   │
│   │   ├── blog/                 # 部落格相關頁面
│   │   │   └── \[slug]/           # 動態路由 - 文章頁面
│   │   │       ├── page.tsx      # 文章頁面路由（含 SEO metadata）
│   │   │       └── BlogClientContent.tsx  # 文章內容客戶端組件（Neobrutalism 風格）
│   │   │
│   │   ├── categories/           # 分類頁面
│   │   │   ├── page.tsx          # 分類總覽頁面路由
│   │   │   ├── CategoryClient.tsx # 分類總覽客戶端組件
│   │   │   └── \[category]/       # 動態路由 - 特定分類
│   │   │       ├── page.tsx              # 特定分類頁面路由
│   │   │       └── CategoryDetailClient.tsx # 特定分類客戶端組件
│   │   │
│   │   ├── components/           # App 層級組件（應移至 src/components）
│   │   │   └── ThemeToggle.tsx   # 主題切換組件（重複，建議刪除）
│   │   │
│   │   ├── tags/                 # 標籤頁面
│   │   │   ├── page.tsx          # 標籤總覽頁面路由
│   │   │   ├── TagClient.tsx     # 標籤總覽客戶端組件
│   │   │   └── \[tag]/            # 動態路由 - 特定標籤
│   │   │       ├── page.tsx              # 特定標籤頁面路由
│   │   │       └── TagDetailClient.tsx   # 特定標籤客戶端組件
│   │   │
│   │   ├── thailand-checklist/   # 泰國清單頁面（特殊頁面）
│   │   │   └── page.tsx          # 泰國清單頁面組件
│   │   │
│   │   ├── favicon.ico           # 網站圖示
│   │   ├── globals.css           # 全域 CSS 樣式（含 Neobrutalism 風格）
│   │   ├── globals.css.bak       # 全域 CSS 備份
│   │   ├── layout.tsx            # 根布局組件（含 SEO 基礎設定）
│   │   ├── page.tsx              # 首頁路由
│   │   ├── robots.ts             # robots.txt 動態生成
│   │   └── sitemap.ts            # sitemap.xml 動態生成
│   │
│   ├── components/               # 共用組件資料夾
│   │   ├── ClientHomePage.tsx    # 首頁客戶端組件
│   │   ├── CommentSection.tsx    # 評論區組件
│   │   ├── HeroBanner.tsx        # 英雄橫幅組件
│   │   ├── HomeNavBar.tsx        # 首頁導航欄組件
│   │   ├── NavBar.tsx            # 通用導航欄組件
│   │   └── ThemeToggle.tsx       # 主題切換組件
│   │
│   ├── lib/                      # 工具函式庫
│   │   ├── posts.ts              # 文章處理相關函式（getAllPosts, getPostBySlug 等）
│   │   └── siteConfig.ts         # 網站配置（SEO、Open Graph 設定）
│   │
│   └── utils/                    # 工具函式
│       └── languageDetector.ts   # 語言檢測工具
│
├── posts/                        # MDX 文章資料夾
│
│
├── .gitignore                    # Git 忽略檔案配置
├── eslint.config.mjs             # ESLint 配置
├── next-env.d.ts                 # Next.js TypeScript 環境定義
├── next.config.ts                # Next.js 配置檔案
├── package-lock.json             # npm 依賴鎖定檔案
├── package.json                  # 專案配置和依賴
├── postcss.config.js            # PostCSS 配置
├── README.md                     # 專案說明文件
├── STRUCTURE.md                  # 專案規格說明（本檔案）
├── tailwind.config.js            # Tailwind CSS 配置
└── tsconfig.json                 # TypeScript 配置





\# ============================================

\# 技術棧

\# ============================================



\- Framework: Next.js 15 (App Router)

\- Styling: Tailwind CSS + Neobrutalism 風格

\- Content: MDX (支援中英雙語)

\- Language: TypeScript

\- Deployment: Vercel





\# ============================================

\# 主要功能

\# ============================================



1\. SEO 優化

  - 動態 metadata 生成

  - sitemap.xml 自動生成

  - robots.txt 配置

  - Open Graph / Twitter Card 支援

  - JSON-LD 結構化資料



2\. 雙語支援

  - 標題、描述支援 { en, zh } 格式

  - 文章內容使用 language-content div 切換



3\. 主題切換

  - 支援淺色/深色模式

  - Neobrutalism 風格設計

  - 系統偏好自動偵測



4\. 文章功能

  - MDX 格式支援

  - 程式碼區塊語法高亮

  - 閱讀時間計算

  - 上下篇文章導航

  - 標籤與分類系統

  - 評論區

