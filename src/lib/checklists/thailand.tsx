import type { Checklist } from './types';

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="highlight">{children}</span>
);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="link" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export const thailandChecklist: Checklist = {
  slug: 'thailand',
  emoji: '🛕',
  title: { en: 'Thailand Travel Checklist', zh: '泰國旅遊準備清單' },
  shortTitle: { en: 'Thailand', zh: '泰國' },
  subtitle: {
    en: '✅ Tick off items to track your progress',
    zh: '✅ 勾選完成的項目，追蹤您的準備進度',
  },
  shortDescription: {
    en: '20 essentials before flying to Thailand: visa, money, transit, attire, temple etiquette.',
    zh: '出發泰國前的 20 項準備事項：簽證、金錢、交通、衣著、寺廟禮儀。',
  },
  metaDescription: {
    en: 'Thailand travel checklist: passport validity, TDAC, SuperRich exchange, Grab, temple dress code — 20 essentials before departure.',
    zh: '泰國旅遊準備清單：護照效期、TDAC、SuperRich 換匯、Grab、寺廟服裝等 20 項出發前必備事項。',
  },
  footer: {
    emoji: '🎉',
    title: {
      en: 'All set — have a great trip!',
      zh: '準備完成後就可以開心出發啦！',
    },
    subtitle: {
      en: 'สนุกให้สุดเหวี่ยง! (Have fun!)',
      zh: 'สนุกให้สุดเหวี่ยง! (玩得開心！)',
    },
  },
  theme: {
    pageBg: '#fef9e7',
    headerBg: 'linear-gradient(135deg, #ff9a9e, #fecfef)',
    headerColor: '#2c3e50',
    headerBorder: '2px solid #f8d7da',
    accent: '#ff6b9d',
    accentSoft: '#f1c40f',
    itemBg: '#fef9f3',
    itemBorder: '#ffe8cc',
    highlightBg: '#fff9c4',
    highlightColor: '#d68910',
    linkColor: '#3498db',
    linkHoverColor: '#2980b9',
    progressBorder: '#f1c40f',
    progressFill: 'linear-gradient(90deg, #27ae60, #2ecc71)',
    progressFillComplete: 'linear-gradient(90deg, #f39c12, #e74c3c)',
    footerBg: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    footerColor: '#2c3e50',
  },
  sections: [
    {
      title: { en: '🌸 [Time Off & Stay]', zh: '🌸【假期&住宿】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: 'Request leave from work, book hotel',
            zh: '先跟公司請假、訂飯店',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Previous itinerary reference: <A href="https://reurl.cc/9nLz98">https://reurl.cc/9nLz98</A></>,
            zh: <>上次的行程參考：<A href="https://reurl.cc/9nLz98">https://reurl.cc/9nLz98</A></>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Money]', zh: '🌸【金錢】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Bring <H>15,000 NTD</H> to exchange for THB, plus a credit card (<H>SuperRich</H> in town has the best rate)</>,
            zh: <>帶 <H>15,000 台幣</H> 去換泰銖，並帶信用卡（市區 <H>SuperRich 匯率最佳</H>）</>,
          },
        },
        {
          kind: 'memo',
          content: { en: '💡 Tipping is up to you!', zh: '💡 小費看你開心！' },
        },
      ],
    },
    {
      title: { en: '🌸 [Visa / Documents]', zh: '🌸【簽證/文件】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Fill out TDAC after booking the hotel 👉 <A href="https://tdac.immigration.go.th/arrival-card/">https://tdac.immigration.go.th/arrival-card/</A></>,
            zh: <>訂完飯店後填寫 TDAC 👉 <A href="https://tdac.immigration.go.th/arrival-card/">https://tdac.immigration.go.th/arrival-card/</A></>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Confirm passport validity is at least <H>6 months</H></>,
            zh: <>確認護照效期至少 <H>6 個月以上</H></>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Insurance]', zh: '🌸【保險】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Travel insurance recommended (~<H>NT$1,000/person</H>, covers medical + baggage delay)</>,
            zh: <>推薦買旅平險（約 <H>NT$1,000/人</H>，醫療保障＋行李延誤）</>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Internet / Transit Apps]', zh: '🌸【網路/交通APP】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Download <H>Grab</H> and register in Taiwan first (link your credit card)</>,
            zh: <>下載 <H>Grab</H>，在台灣先註冊好（綁定信用卡）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Buy SIM / eSIM in advance (<H>cheaper on Shopee</H>)</>,
            zh: <>SIM 卡/ eSIM 提早買好（<H>蝦皮便宜</H>）</>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Itinerary]', zh: '🌸【行程規劃】' },
      blocks: [
        {
          kind: 'item',
          text: { en: 'List places to visit and food to try', zh: '先列好想去的、想吃的清單' },
        },
        {
          kind: 'memo',
          content: {
            en: "💡 Don't pack the schedule too tight — Bangkok traffic is heavy, take it easy.",
            zh: '💡 行程不必排太緊，曼谷常塞車，優閒的享受假期',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Popular attraction tickets (<H>Grand Palace, Maeklong Railway Market, Asiatique</H>) — book online in advance</>,
            zh: <>熱門景點門票（<H>大皇宮、鐵道市場、Asiatique</H>）建議先線上預訂</>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Bangkok Transit]', zh: '🌸【曼谷交通】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: (
              <>
                Airport transit:
                <br />
                • DMK → city: <H>A1/A2 bus</H> or Grab
                <br />
                • BKK → city: <H>Airport Rail Link</H> or Grab
              </>
            ),
            zh: (
              <>
                了解機場交通：
                <br />
                • DMK 機場 → 市區：<H>A1/A2 公車</H>或 Grab
                <br />
                • BKK 機場 → 市區：<H>Airport Rail Link</H> 或 Grab
              </>
            ),
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Transit payment: BTS accepts <H>one-day pass</H>! MRT accepts <H>Visa & Mastercard</H>!</>,
            zh: <>準備交通付費方式：BTS可用<H>一日券</H>！MRT可用<H>Visa & MasterCard信用卡</H>！</>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Medicine / Health]', zh: '🌸【藥品/健康】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Bring <H>stomach medicine</H></>,
            zh: <>必帶 <H>腸胃藥</H></>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Gear]', zh: '🌸【裝備】' },
      blocks: [
        {
          kind: 'item',
          text: { en: 'Universal plug adapter', zh: '帶萬用插座/轉接頭' },
        },
        {
          kind: 'memo',
          content: {
            en: '⚠️ Last time a friend plugged a curling iron straight in and tripped the breaker — burned out!',
            zh: '⚠️ 上次朋友直插捲髮器直接跳電燒焦！',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Light rain gear (<H>September is rainy season</H>, frequent afternoon thunderstorms)</>,
            zh: <>帶輕便雨具（<H>9 月雨季</H>，常有午後雷陣雨）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Bring slippers (recommended) or buy a pair there for <H>~100 baht</H></>,
            zh: <>帶拖鞋(很建議)或是去那邊花<H>100塊買</H></>,
          },
        },
      ],
    },
    {
      title: { en: '🌸 [Clothing]', zh: '🌸【衣著】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Temple attire: <H>long pants</H>, no sleeveless tops, closed-toe or modest shoes</>,
            zh: <>準備寺廟服裝：<H>長褲</H>、避免無袖上衣，帶包鞋或不太露的鞋子</>,
          },
        },
        {
          kind: 'memo',
          content: {
            en: '💡 Temple entrances sell suitable garments',
            zh: '💡 寺廟入口都有賣合適的服裝',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Daily wear: mostly short sleeves, <H>1 pair of long pants is a must</H></>,
            zh: <>準備日常服裝：短袖為主，<H>１件長褲必備</H></>,
          },
        },
        {
          kind: 'item',
          text: {
            en: 'A light jacket if you get cold easily',
            zh: '怕冷可帶薄外套',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Sun protection (<H>sunscreen is essential</H>!)</>,
            zh: <>準備防曬用品（<H>務必做好防曬措施</H>！）</>,
          },
        },
        {
          kind: 'memo',
          content: {
            en: "💡 Don't overpack clothes — you can buy locally",
            zh: '💡 衣服不用帶太多，當地也能買',
          },
        },
      ],
    },
  ],
};
