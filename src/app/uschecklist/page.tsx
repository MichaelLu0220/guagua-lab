'use client';

import React, { useState, useEffect } from 'react';

export default function USAChecklistPage() {
  const [checklistState, setChecklistState] = useState<{[key: number]: boolean}>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('usa-checklist');
    if (saved) {
      try {
        setChecklistState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved checklist state');
      }
    }
    setIsLoaded(true);
  }, []);

  const saveState = (newState: {[key: number]: boolean}) => {
    setChecklistState(newState);
    localStorage.setItem('usa-checklist', JSON.stringify(newState));
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newState = { ...checklistState, [index]: checked };
    saveState(newState);
  };

  const totalItems = 38;
  const completedItems = Object.values(checklistState).filter(Boolean).length;
  const percentage = Math.round((completedItems / totalItems) * 100);

  if (!isLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Microsoft JhengHei, 微軟正黑體, Arial, sans-serif'
      }}>
        <div>載入中...</div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        body {
            font-family: 'Microsoft JhengHei', '微軟正黑體', Arial, sans-serif;
            line-height: 1.6;
            background-color: #f0f4ff;
            color: #2c3e50;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.15);
        }
        
        .header h1 {
            margin: 0;
            font-size: 2.2em;
            font-weight: bold;
        }
        
        .header .subtitle {
            margin-top: 8px;
            font-size: 1em;
            opacity: 0.9;
        }
        
        .route-bar {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 12px;
            font-size: 0.95em;
            opacity: 0.95;
        }
        
        .route-dot {
            background: rgba(255,255,255,0.3);
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .section {
            background: #ffffff;
            margin: 15px 0;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border: 1px solid #e0e7ff;
            border-left: 4px solid #667eea;
        }
        
        .section-title {
            color: #4338ca;
            font-size: 1.3em;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 2px dashed #c7d2fe;
            padding-bottom: 8px;
        }
        
        .checklist-item {
            display: flex;
            align-items: flex-start;
            margin: 12px 0;
            padding: 10px;
            background: #f8f9ff;
            border-radius: 8px;
            border: 1px solid #e0e7ff;
            transition: all 0.3s ease;
        }
        
        .checklist-item:hover {
            background: #eef2ff;
            transform: translateX(3px);
        }
        
        .checklist-item.completed {
            background: #f0fdf4;
            border-color: #bbf7d0;
            opacity: 0.7;
            text-decoration: line-through;
        }
        
        .checkbox {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            margin-top: 2px;
            cursor: pointer;
            accent-color: #4338ca;
        }
        
        .item-text {
            flex: 1;
            font-size: 1.05em;
            line-height: 1.5;
        }
        
        .highlight {
            background: linear-gradient(120deg, #e0e7ff 0%, #e0e7ff 100%);
            background-repeat: no-repeat;
            background-size: 100% 50%;
            background-position: 0 85%;
            padding: 2px 4px;
            font-weight: bold;
            color: #3730a3;
        }
        
        .warn {
            background: linear-gradient(120deg, #fef9c3 0%, #fef9c3 100%);
            padding: 2px 4px;
            font-weight: bold;
            color: #92400e;
        }
        
        .link {
            color: #3b82f6;
            text-decoration: underline;
            word-break: break-all;
        }
        
        .link:hover {
            color: #2563eb;
        }
        
        .progress-bar {
            position: sticky;
            top: 10px;
            background: #fff;
            padding: 15px;
            border-radius: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 2px solid #c7d2fe;
            z-index: 100;
        }
        
        .progress-container {
            background: #ecf0f1;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: ${completedItems === totalItems 
              ? 'linear-gradient(90deg, #f59e0b, #ef4444)' 
              : 'linear-gradient(90deg, #4338ca, #667eea)'};
            width: ${percentage}%;
            transition: width 0.3s ease;
            border-radius: 10px;
        }
        
        .progress-text {
            text-align: center;
            margin-top: 8px;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .memo-note {
            background: #fefce8;
            border: 2px dashed #fbbf24;
            border-radius: 8px;
            padding: 12px;
            margin: 10px 0;
            font-style: italic;
            color: #92400e;
        }
        
        .alert-note {
            background: #fef2f2;
            border: 2px dashed #f87171;
            border-radius: 8px;
            padding: 12px;
            margin: 10px 0;
            color: #991b1b;
        }
        
        @media (max-width: 600px) {
            .container { padding: 10px; }
            .header h1 { font-size: 1.8em; }
            .section { padding: 15px; }
        }
      `}</style>

      <div className="container">
        <div className="header">
          <div style={{fontSize: '2em', marginBottom: '8px'}}>🇺🇸</div>
          <h1>美國行李清單</h1>
          <div className="subtitle">14 天旅程 · 探訪親友</div>
        </div>

        {/* 進度條 */}
        <div className="progress-bar">
          <div className="progress-container">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">
            {completedItems === totalItems 
              ? `🎉 全部完成！出發吧！(${completedItems}/${totalItems})`
              : `行李整理進度：${completedItems} / ${totalItems} 項（${percentage}%）`
            }
          </div>
        </div>

        {/* 重要文件 */}
        <div className="section">
          <div className="section-title">📄【重要文件（隨身攜帶）】</div>
          {[
            { id: 0, text: <>護照（<span className="highlight">效期至少 6 個月以上</span>）</> },
            { id: 1, text: <>ESTA 電子旅遊授權 ✅（已辦好）</> },
            { id: 2, text: <>機票（電子票 or 列印備份）</> },
            { id: 3, text: <>信用卡 ×2（<span className="highlight">Visa / Mastercard</span> 美國通用）</> },
            { id: 4, text: <>少量美金現金（入境申報上限 $10,000）</> },
            { id: 5, text: <>親戚 & 朋友地址（紙本備份，海關可能問）</> },
            { id: 6, text: <>旅平險保單（建議買美國醫療費用超高！）</> },
          ].map(item => (
            <div key={item.id} className={`checklist-item ${checklistState[item.id] ? 'completed' : ''}`}>
              <input type="checkbox" className="checkbox" checked={checklistState[item.id] || false}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
              <div className="item-text">{item.text}</div>
            </div>
          ))}
          <div className="memo-note">
            💡 入境美國時海關官員可能問你：住哪裡、待多久、有多少現金。<strong>親戚地址</strong>一定要記起來或帶紙本！
          </div>
        </div>

        {/* 衣物 */}
        <div className="section">
          <div className="section-title">👕【衣物（14 天）】</div>
          {[
            { id: 7, text: <>保暖外套 ×1（飛機穿，舊金山早晚涼、印第安那可能更冷）</> },
            { id: 8, text: <>輕便外套 / 帽T ×1</> },
            { id: 9, text: <>長袖 ×3</> },
            { id: 10, text: <>短袖 ×2</> },
            { id: 11, text: <>牛仔褲 ×2</> },
            { id: 12, text: <>休閒長褲 ×1</> },
            { id: 13, text: <>內衣褲 × 6–7 套</> },
            { id: 14, text: <>睡衣 ×1 套</> },
            { id: 15, text: <>運動鞋 ×1（穿著搭機）</> },
            { id: 16, text: <>輕便備用鞋或拖鞋（室內用）</> },
          ].map(item => (
            <div key={item.id} className={`checklist-item ${checklistState[item.id] ? 'completed' : ''}`}>
              <input type="checkbox" className="checkbox" checked={checklistState[item.id] || false}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
              <div className="item-text">{item.text}</div>
            </div>
          ))}
          <div className="memo-note">
            💡 美國幾乎每個家庭都有洗衣機，住親戚/朋友家可以洗衣！衣服不用帶太多。
          </div>
        </div>

        {/* 盥洗用品 */}
        <div className="section">
          <div className="section-title">🧴【盥洗 & 藥品】</div>
          {[
            { id: 17, text: <>個人清潔用品小罐裝（<span className="highlight">液體 &lt;100ml，放透明夾鏈袋</span>）</> },
            { id: 18, text: <>乳液（美國天氣乾，必帶！）</> },
            { id: 19, text: <>護唇膏（飛機上超乾）</> },
            { id: 20, text: <>腸胃藥（水土不服必備）</> },
            { id: 21, text: <>基本止痛藥（美國藥超貴）</> },
            { id: 22, text: <>感冒藥備用</> },
            { id: 23, text: <>痠痛貼布（走很多路必備）</> },
            { id: 24, text: <>個人常用藥品（<span className="warn">需含麻醉成分的要附醫師處方</span>）</> },
          ].map(item => (
            <div key={item.id} className={`checklist-item ${checklistState[item.id] ? 'completed' : ''}`}>
              <input type="checkbox" className="checkbox" checked={checklistState[item.id] || false}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
              <div className="item-text">{item.text}</div>
            </div>
          ))}
          <div className="alert-note">
            ⚠️ 某些台灣常見藥品（如含麻黃素的感冒藥）在美國屬管制品，建議帶簡單的非處方藥即可。
          </div>
        </div>

        {/* 電子用品 */}
        <div className="section">
          <div className="section-title">📱【電子用品】</div>
          {[
            { id: 25, text: <>充電線 ×2（Type-C / Lightning 依手機型號）</> },
            { id: 26, text: <>行動電源（<span className="highlight">只能帶登機，不可托運</span>）</> },
            { id: 27, text: <><span className="highlight">轉接頭（美規）</span> — 美國插座是三孔，台灣插頭也能用（電壓110-120V 相容）</> },
            { id: 28, text: <>耳機</> },
            { id: 29, text: <>頸枕（長途飛行 12+ 小時必帶！）</> },
          ].map(item => (
            <div key={item.id} className={`checklist-item ${checklistState[item.id] ? 'completed' : ''}`}>
              <input type="checkbox" className="checkbox" checked={checklistState[item.id] || false}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
              <div className="item-text">{item.text}</div>
            </div>
          ))}
          <div className="memo-note">
            💡 美國電壓 120V，台灣 110V，差距小，大多數電器<strong>不需要變壓器</strong>，直接插可用！但仍要確認電器標示。
          </div>
        </div>

        {/* 網路 & 交通 */}
        <div className="section">
          <div className="section-title">📶【網路 & 交通 App】</div>
          {[
            { id: 30, text: <>SIM 卡 / eSIM 提前買好（<span className="highlight">美國 T-Mobile / AT&T</span> 方案，蝦皮或 KKday 較便宜）</> },
            { id: 31, text: <>下載 <span className="highlight">Uber / Lyft</span>（美國叫車主力，先在台灣綁信用卡）</> },
            { id: 32, text: <>下載 <span className="highlight">Google Maps</span>（離線地圖先下載好）</> },
            { id: 33, text: <>下載 <span className="highlight">Yelp</span>（找餐廳必備）</> },
          ].map(item => (
            <div key={item.id} className={`checklist-item ${checklistState[item.id] ? 'completed' : ''}`}>
              <input type="checkbox" className="checkbox" checked={checklistState[item.id] || false}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
              <div className="item-text">{item.text}</div>
            </div>
          ))}
          <div className="memo-note">
            💡 印第安那屬於中西部，大眾交通不發達，<strong>幾乎只能靠 Uber 或朋友接送</strong>，先確認朋友是否能接機！
          </div>
        </div>

        {/* 行前注意 */}
        <div className="section">
          <div className="section-title">✅【出發前確認】</div>
          {[
            { id: 34, text: <>通知信用卡公司出國（避免被停卡）</> },
            { id: 35, text: <>跟親戚確認舊金山接機安排</> },
            { id: 36, text: <>跟朋友確認印第安那交通方式</> },
            { id: 37, text: <>行李秤重確認（<span className="highlight">托運 23kg / 隨身 7kg</span>，依航空公司）</> },
          ].map(item => (
            <div key={item.id} className={`checklist-item ${checklistState[item.id] ? 'completed' : ''}`}>
              <input type="checkbox" className="checkbox" checked={checklistState[item.id] || false}
                onChange={(e) => handleCheckboxChange(item.id, e.target.checked)} />
              <div className="item-text">{item.text}</div>
            </div>
          ))}
          <div className="alert-note">
            🚫 美國海關禁止攜帶：新鮮水果、蔬菜、肉類、農產品。零食、泡麵等加工食品通常 OK，但最好申報！
          </div>
          <div className="memo-note">
            💡 小費文化：餐廳通常給 <strong>15–20%</strong>，計程車 / Uber 司機 10%，住飯店每天留 $1–2 給房務。
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '15px', color: 'white'}}>
          <div style={{fontSize: '1.5em', marginBottom: '10px'}}>✈️ 🇺🇸 🎉</div>
          <div style={{fontSize: '1.2em', fontWeight: 'bold'}}>準備完成，出發去美國！</div>
          <div style={{fontSize: '0.9em', marginTop: '8px', opacity: 0.9}}>Have a wonderful trip! 旅途順利！</div>
        </div>
      </div>
    </>
  );
}