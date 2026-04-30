import type { Checklist } from './types';

const H = ({ children }: { children: React.ReactNode }) => (
  <span className="highlight">{children}</span>
);

const W = ({ children }: { children: React.ReactNode }) => (
  <span className="warn">{children}</span>
);

export const usaChecklist: Checklist = {
  slug: 'usa',
  emoji: '🗽',
  title: { en: 'USA Packing Checklist', zh: '美國行李清單' },
  shortTitle: { en: 'USA', zh: '美國' },
  subtitle: {
    en: '14-day trip · Visiting family & friends',
    zh: '14 天旅程 · 探訪親友',
  },
  shortDescription: {
    en: '14-day USA packing list: documents, clothing, medicine, electronics, plus tipping etiquette.',
    zh: '14 天美國行李清單：文件、衣物、藥品、電子用品與小費文化提醒。',
  },
  metaDescription: {
    en: 'USA travel checklist: ESTA, credit cards, clothing, medicine restrictions, Uber/Lyft apps, tipping culture — 14-day pre-departure essentials.',
    zh: '美國旅遊行李清單：ESTA、信用卡、衣物搭配、藥品攜帶限制、Uber/Lyft App、小費文化，14 天出發前必備整理。',
  },
  footer: {
    emoji: '✈️ 🇺🇸 🎉',
    title: {
      en: 'All set — off to the USA!',
      zh: '準備完成，出發去美國！',
    },
    subtitle: {
      en: 'Have a wonderful trip!',
      zh: 'Have a wonderful trip! 旅途順利！',
    },
  },
  theme: {
    pageBg: '#f0f4ff',
    headerBg: 'linear-gradient(135deg, #667eea, #764ba2)',
    headerColor: '#ffffff',
    headerBorder: 'none',
    accent: '#667eea',
    accentSoft: '#c7d2fe',
    itemBg: '#f8f9ff',
    itemBorder: '#e0e7ff',
    highlightBg: '#e0e7ff',
    highlightColor: '#3730a3',
    linkColor: '#3b82f6',
    linkHoverColor: '#2563eb',
    progressBorder: '#c7d2fe',
    progressFill: 'linear-gradient(90deg, #4338ca, #667eea)',
    progressFillComplete: 'linear-gradient(90deg, #f59e0b, #ef4444)',
    footerBg: 'linear-gradient(135deg, #667eea, #764ba2)',
    footerColor: '#ffffff',
  },
  sections: [
    {
      title: { en: '📄 [Important Documents — Carry-On]', zh: '📄【重要文件（隨身攜帶）】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Passport (<H>valid 6+ months</H>)</>,
            zh: <>護照（<H>效期至少 6 個月以上</H>）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: 'ESTA travel authorization ✅ (already approved)',
            zh: 'ESTA 電子旅遊授權 ✅（已辦好）',
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Flight ticket (e-ticket or printed backup)',
            zh: '機票（電子票 or 列印備份）',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Credit cards ×2 (<H>Visa / Mastercard</H> widely accepted in US)</>,
            zh: <>信用卡 ×2（<H>Visa / Mastercard</H> 美國通用）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Small amount of USD cash (declare amounts over $10,000)',
            zh: '少量美金現金（入境申報上限 $10,000）',
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Addresses of relatives & friends (paper backup — customs may ask)',
            zh: '親戚 & 朋友地址（紙本備份，海關可能問）',
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Travel insurance (US medical bills are extremely high!)',
            zh: '旅平險保單（建議買美國醫療費用超高！）',
          },
        },
        {
          kind: 'memo',
          content: {
            en: <>💡 US customs may ask: where you&apos;ll stay, how long, how much cash. <strong>Memorize the relative&apos;s address</strong> or carry a paper note!</>,
            zh: <>💡 入境美國時海關官員可能問你：住哪裡、待多久、有多少現金。<strong>親戚地址</strong>一定要記起來或帶紙本！</>,
          },
        },
      ],
    },
    {
      title: { en: '👕 [Clothing — 14 days]', zh: '👕【衣物（14 天）】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: 'Warm coat ×1 (for plane; SF mornings/evenings cool, Indiana likely colder)',
            zh: '保暖外套 ×1（飛機穿，舊金山早晚涼、印第安那可能更冷）',
          },
        },
        { kind: 'item', text: { en: 'Light jacket / hoodie ×1', zh: '輕便外套 / 帽T ×1' } },
        { kind: 'item', text: { en: 'Long sleeves ×3', zh: '長袖 ×3' } },
        { kind: 'item', text: { en: 'Short sleeves ×2', zh: '短袖 ×2' } },
        { kind: 'item', text: { en: 'Jeans ×2', zh: '牛仔褲 ×2' } },
        { kind: 'item', text: { en: 'Casual pants ×1', zh: '休閒長褲 ×1' } },
        { kind: 'item', text: { en: 'Underwear × 6–7 sets', zh: '內衣褲 × 6–7 套' } },
        { kind: 'item', text: { en: 'Pajamas ×1 set', zh: '睡衣 ×1 套' } },
        { kind: 'item', text: { en: 'Sneakers ×1 (wear on plane)', zh: '運動鞋 ×1（穿著搭機）' } },
        {
          kind: 'item',
          text: {
            en: 'Light backup shoes or slippers (for indoors)',
            zh: '輕便備用鞋或拖鞋（室內用）',
          },
        },
        {
          kind: 'memo',
          content: {
            en: '💡 Most US households have a washing machine — if you stay with relatives/friends you can do laundry. No need to overpack.',
            zh: '💡 美國幾乎每個家庭都有洗衣機，住親戚/朋友家可以洗衣！衣服不用帶太多。',
          },
        },
      ],
    },
    {
      title: { en: '🧴 [Toiletries & Medicine]', zh: '🧴【盥洗 & 藥品】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Personal toiletries in small containers (<H>liquids &lt;100ml in clear ziplock</H>)</>,
            zh: <>個人清潔用品小罐裝（<H>液體 &lt;100ml，放透明夾鏈袋</H>）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Lotion (US air is dry — must bring!)',
            zh: '乳液（美國天氣乾，必帶！）',
          },
        },
        { kind: 'item', text: { en: 'Lip balm (planes are super dry)', zh: '護唇膏（飛機上超乾）' } },
        {
          kind: 'item',
          text: { en: 'Stomach medicine (for unfamiliar food)', zh: '腸胃藥（水土不服必備）' },
        },
        {
          kind: 'item',
          text: { en: 'Basic painkillers (US meds are expensive)', zh: '基本止痛藥（美國藥超貴）' },
        },
        { kind: 'item', text: { en: 'Cold medicine backup', zh: '感冒藥備用' } },
        {
          kind: 'item',
          text: {
            en: 'Pain relief patches (lots of walking)',
            zh: '痠痛貼布（走很多路必備）',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Personal prescription meds (<W>those with anesthetic compounds need a doctor&apos;s note</W>)</>,
            zh: <>個人常用藥品（<W>需含麻醉成分的要附醫師處方</W>）</>,
          },
        },
        {
          kind: 'alert',
          content: {
            en: '⚠️ Some common Taiwan meds (e.g. cold meds with ephedrine) are controlled substances in the US — bring simple OTC meds instead.',
            zh: '⚠️ 某些台灣常見藥品（如含麻黃素的感冒藥）在美國屬管制品，建議帶簡單的非處方藥即可。',
          },
        },
      ],
    },
    {
      title: { en: '📱 [Electronics]', zh: '📱【電子用品】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: 'Charging cables ×2 (Type-C / Lightning depending on phone)',
            zh: '充電線 ×2（Type-C / Lightning 依手機型號）',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Power bank (<H>carry-on only, not in checked baggage</H>)</>,
            zh: <>行動電源（<H>只能帶登機，不可托運</H>）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <><H>Plug adapter (US-type)</H> — US sockets have 3 prongs; Taiwan plugs work too (110-120V compatible)</>,
            zh: <><H>轉接頭（美規）</H> — 美國插座是三孔，台灣插頭也能用（電壓110-120V 相容）</>,
          },
        },
        { kind: 'item', text: { en: 'Headphones', zh: '耳機' } },
        {
          kind: 'item',
          text: {
            en: 'Neck pillow (essential for 12+ hour flights!)',
            zh: '頸枕（長途飛行 12+ 小時必帶！）',
          },
        },
        {
          kind: 'memo',
          content: {
            en: <>💡 US voltage 120V, Taiwan 110V — close enough, most appliances <strong>need no transformer</strong>, but verify the label.</>,
            zh: <>💡 美國電壓 120V，台灣 110V，差距小，大多數電器<strong>不需要變壓器</strong>，直接插可用！但仍要確認電器標示。</>,
          },
        },
      ],
    },
    {
      title: { en: '📶 [Internet & Transport Apps]', zh: '📶【網路 & 交通 App】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: <>Buy SIM / eSIM in advance (<H>US T-Mobile / AT&T</H> plans, cheaper on Shopee or KKday)</>,
            zh: <>SIM 卡 / eSIM 提前買好（<H>美國 T-Mobile / AT&T</H> 方案，蝦皮或 KKday 較便宜）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Download <H>Uber / Lyft</H> (main rideshare in US — link credit card in Taiwan first)</>,
            zh: <>下載 <H>Uber / Lyft</H>（美國叫車主力，先在台灣綁信用卡）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Download <H>Google Maps</H> (download offline maps in advance)</>,
            zh: <>下載 <H>Google Maps</H>（離線地圖先下載好）</>,
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Download <H>Yelp</H> (must-have for finding restaurants)</>,
            zh: <>下載 <H>Yelp</H>（找餐廳必備）</>,
          },
        },
        {
          kind: 'memo',
          content: {
            en: <>💡 Indiana (Midwest) has limited public transit — <strong>almost only Uber or rides from friends</strong>. Confirm airport pickup with friends!</>,
            zh: <>💡 印第安那屬於中西部，大眾交通不發達，<strong>幾乎只能靠 Uber 或朋友接送</strong>，先確認朋友是否能接機！</>,
          },
        },
      ],
    },
    {
      title: { en: '✅ [Pre-Departure Checks]', zh: '✅【出發前確認】' },
      blocks: [
        {
          kind: 'item',
          text: {
            en: 'Notify credit card company of travel (avoid being blocked)',
            zh: '通知信用卡公司出國（避免被停卡）',
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Confirm SF airport pickup with relatives',
            zh: '跟親戚確認舊金山接機安排',
          },
        },
        {
          kind: 'item',
          text: {
            en: 'Confirm Indiana transport with friends',
            zh: '跟朋友確認印第安那交通方式',
          },
        },
        {
          kind: 'item',
          text: {
            en: <>Weigh bags (<H>checked 23kg / carry-on 7kg</H>, depends on airline)</>,
            zh: <>行李秤重確認（<H>托運 23kg / 隨身 7kg</H>，依航空公司）</>,
          },
        },
        {
          kind: 'alert',
          content: {
            en: '🚫 US customs prohibits: fresh fruit, vegetables, meat, agricultural products. Snacks and instant noodles usually OK — declare to be safe!',
            zh: '🚫 美國海關禁止攜帶：新鮮水果、蔬菜、肉類、農產品。零食、泡麵等加工食品通常 OK，但最好申報！',
          },
        },
        {
          kind: 'memo',
          content: {
            en: <>💡 Tipping: restaurants <strong>15–20%</strong>, taxi/Uber 10%, hotel housekeeping $1–2/day.</>,
            zh: <>💡 小費文化：餐廳通常給 <strong>15–20%</strong>，計程車 / Uber 司機 10%，住飯店每天留 $1–2 給房務。</>,
          },
        },
      ],
    },
  ],
};
