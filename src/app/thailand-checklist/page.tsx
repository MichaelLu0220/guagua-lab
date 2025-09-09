'use client';

import React, { useState, useEffect } from 'react';

export default function ThailandChecklistPage() {
  const [checklistState, setChecklistState] = useState<{[key: number]: boolean}>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 載入儲存的狀態
  useEffect(() => {
    const saved = localStorage.getItem('thailand-checklist');
    if (saved) {
      try {
        setChecklistState(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved checklist state');
      }
    }
    setIsLoaded(true);
  }, []);

  // 儲存狀態
  const saveState = (newState: {[key: number]: boolean}) => {
    setChecklistState(newState);
    localStorage.setItem('thailand-checklist', JSON.stringify(newState));
  };

  // 更新勾選狀態
  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newState = { ...checklistState, [index]: checked };
    saveState(newState);
  };

  // 計算進度
  const totalItems = 20;
  const completedItems = Object.values(checklistState).filter(Boolean).length;
  const percentage = Math.round((completedItems / totalItems) * 100);

  // 在客戶端載入完成前顯示載入狀態
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
            background-color: #fef9e7;
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
            background: linear-gradient(135deg, #ff9a9e, #fecfef);
            color: #2c3e50;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.1);
            border: 2px solid #f8d7da;
        }
        
        .header h1 {
            margin: 0;
            font-size: 2.2em;
            font-weight: bold;
        }
        
        .section {
            background: #ffffff;
            margin: 15px 0;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border-left: 4px solid #ff6b9d;
            border: 1px solid #f1c40f;
        }
        
        .section-title {
            color: #e74c3c;
            font-size: 1.3em;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 2px dashed #f39c12;
            padding-bottom: 8px;
        }
        
        .checklist-item {
            display: flex;
            align-items: flex-start;
            margin: 12px 0;
            padding: 10px;
            background: #fef9f3;
            border-radius: 8px;
            border: 1px solid #ffe8cc;
            transition: all 0.3s ease;
        }
        
        .checklist-item:hover {
            background: #fff3e0;
            transform: translateX(3px);
        }
        
        .checklist-item.completed {
            background: #e8f5e8;
            border-color: #c8e6c9;
            opacity: 0.7;
            text-decoration: line-through;
        }
        
        .checkbox {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            margin-top: 2px;
            cursor: pointer;
            accent-color: #27ae60;
        }
        
        .item-text {
            flex: 1;
            font-size: 1.05em;
            line-height: 1.5;
        }
        
        .highlight {
            background: linear-gradient(120deg, #fff9c4 0%, #fff9c4 100%);
            background-repeat: no-repeat;
            background-size: 100% 50%;
            background-position: 0 85%;
            padding: 2px 4px;
            font-weight: bold;
            color: #d68910;
        }
        
        .link {
            color: #3498db;
            text-decoration: underline;
            word-break: break-all;
        }
        
        .link:hover {
            color: #2980b9;
            background: #ebf3fd;
            padding: 2px 4px;
            border-radius: 4px;
        }
        
        .progress-bar {
            position: sticky;
            top: 10px;
            background: #fff;
            padding: 15px;
            border-radius: 25px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 2px solid #f1c40f;
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
              ? 'linear-gradient(90deg, #f39c12, #e74c3c)' 
              : 'linear-gradient(90deg, #27ae60, #2ecc71)'};
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
            background: #fff3cd;
            border: 2px dashed #f39c12;
            border-radius: 8px;
            padding: 12px;
            margin: 10px 0;
            font-style: italic;
            color: #856404;
        }
        
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            
            .header h1 {
                font-size: 1.8em;
            }
            
            .section {
                padding: 15px;
            }
            
            .checklist-item {
                padding: 8px;
            }
        }
      `}</style>

      <div className="container">
        <div className="progress-bar">
          <div className="progress-container">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-text">
            {completedItems === totalItems 
              ? `🎊 恭喜完成所有準備！${completedItems}/${totalItems} 項目 (${percentage}%) 🎊`
              : `完成進度：${completedItems}/${totalItems} 項目 (${percentage}%)`
            }
          </div>
        </div>
        
        <div className="header">
          <h1>🌴 泰國旅遊準備清單</h1>
          <div style={{fontSize: '0.9em', marginTop: '10px', color: '#7f8c8d'}}>
            ✅ 勾選完成的項目，追蹤您的準備進度
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【假期&住宿】</div>
          <div className={`checklist-item ${checklistState[0] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[0] || false}
              onChange={(e) => handleCheckboxChange(0, e.target.checked)}
            />
            <div className="item-text">先跟公司請假、訂飯店</div>
          </div>
          <div className={`checklist-item ${checklistState[1] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[1] || false}
              onChange={(e) => handleCheckboxChange(1, e.target.checked)}
            />
            <div className="item-text">
              上次的行程參考：<a href="https://reurl.cc/9nLz98" className="link" target="_blank" rel="noopener noreferrer">https://reurl.cc/9nLz98</a>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【金錢】</div>
          <div className={`checklist-item ${checklistState[2] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[2] || false}
              onChange={(e) => handleCheckboxChange(2, e.target.checked)}
            />
            <div className="item-text">
              帶 <span className="highlight">15,000 台幣</span> 去換泰銖，並帶信用卡（市區 <span className="highlight">SuperRich 匯率最佳</span>）
            </div>
          </div>
          <div className="memo-note">
            💡 小費看你開心！
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【簽證/文件】</div>
          <div className={`checklist-item ${checklistState[3] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[3] || false}
              onChange={(e) => handleCheckboxChange(3, e.target.checked)}
            />
            <div className="item-text">
              訂完飯店後填寫 TDAC 👉 
              <a href="https://tdac.immigration.go.th/arrival-card/" className="link" target="_blank" rel="noopener noreferrer">https://tdac.immigration.go.th/arrival-card/</a>
            </div>
          </div>
          <div className={`checklist-item ${checklistState[4] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[4] || false}
              onChange={(e) => handleCheckboxChange(4, e.target.checked)}
            />
            <div className="item-text">確認護照效期至少 <span className="highlight">6 個月以上</span></div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【保險】</div>
          <div className={`checklist-item ${checklistState[5] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[5] || false}
              onChange={(e) => handleCheckboxChange(5, e.target.checked)}
            />
            <div className="item-text">
              推薦買旅平險（約 <span className="highlight">NT$1,000/人</span>，醫療保障＋行李延誤）
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【網路/交通APP】</div>
          <div className={`checklist-item ${checklistState[6] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[6] || false}
              onChange={(e) => handleCheckboxChange(6, e.target.checked)}
            />
            <div className="item-text">下載 <span className="highlight">Grab</span>，在台灣先註冊好（綁定信用卡）</div>
          </div>
          <div className={`checklist-item ${checklistState[7] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[7] || false}
              onChange={(e) => handleCheckboxChange(7, e.target.checked)}
            />
            <div className="item-text">SIM 卡/ eSIM 提早買好（<span className="highlight">蝦皮便宜</span>）</div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【行程規劃】</div>
          <div className={`checklist-item ${checklistState[8] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[8] || false}
              onChange={(e) => handleCheckboxChange(8, e.target.checked)}
            />
            <div className="item-text">先列好想去的、想吃的清單</div>
          </div>
          <div className="memo-note">
            💡 行程不必排太緊，曼谷常塞車，而且乎麻後有點難全照行程走
          </div>
          <div className={`checklist-item ${checklistState[9] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[9] || false}
              onChange={(e) => handleCheckboxChange(9, e.target.checked)}
            />
            <div className="item-text">
              熱門景點門票（<span className="highlight">大皇宮、鐵道市場、Asiatique</span>）建議先線上預訂
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【曼谷交通】</div>
          <div className={`checklist-item ${checklistState[10] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[10] || false}
              onChange={(e) => handleCheckboxChange(10, e.target.checked)}
            />
            <div className="item-text">
              了解機場交通：<br />
              • DMK 機場 → 市區：<span className="highlight">A1/A2 公車</span>或 Grab<br />
              • BKK 機場 → 市區：<span className="highlight">Airport Rail Link</span> 或 Grab
            </div>
          </div>
          <div className={`checklist-item ${checklistState[11] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[11] || false}
              onChange={(e) => handleCheckboxChange(11, e.target.checked)}
            />
            <div className="item-text">
              準備交通付費方式：BTS可用<span className="highlight">一日券</span>！MRT可用<span className="highlight">Visa & MasterCard信用卡</span>！
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【藥品/健康】</div>
          <div className={`checklist-item ${checklistState[12] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[12] || false}
              onChange={(e) => handleCheckboxChange(12, e.target.checked)}
            />
            <div className="item-text">必帶 <span className="highlight">腸胃藥</span></div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【裝備】</div>
          <div className={`checklist-item ${checklistState[13] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[13] || false}
              onChange={(e) => handleCheckboxChange(13, e.target.checked)}
            />
            <div className="item-text">帶萬用插座/轉接頭</div>
          </div>
          <div className="memo-note">
            ⚠️ 上次朋友直插捲髮器直接跳電燒焦！
          </div>
          <div className={`checklist-item ${checklistState[14] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[14] || false}
              onChange={(e) => handleCheckboxChange(14, e.target.checked)}
            />
            <div className="item-text">帶輕便雨具（<span className="highlight">9 月雨季</span>，常有午後雷陣雨）</div>
          </div>
          <div className={`checklist-item ${checklistState[15] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[15] || false}
              onChange={(e) => handleCheckboxChange(15, e.target.checked)}
            />
            <div className="item-text">帶拖鞋(很建議)或是去那邊花<span className="highlight">100塊買</span></div>
          </div>
        </div>

        <div className="section">
          <div className="section-title">🌸【衣著】</div>
          <div className={`checklist-item ${checklistState[16] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[16] || false}
              onChange={(e) => handleCheckboxChange(16, e.target.checked)}
            />
            <div className="item-text">
              準備寺廟服裝：<span className="highlight">長褲</span>、避免無袖上衣，帶包鞋或不太露的鞋子
            </div>
          </div>
          <div className="memo-note">
            💡 寺廟入口都有賣合適的服裝
          </div>
          <div className={`checklist-item ${checklistState[17] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[17] || false}
              onChange={(e) => handleCheckboxChange(17, e.target.checked)}
            />
            <div className="item-text">準備日常服裝：短袖為主，<span className="highlight">１件長褲必備</span></div>
          </div>
          <div className={`checklist-item ${checklistState[18] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[18] || false}
              onChange={(e) => handleCheckboxChange(18, e.target.checked)}
            />
            <div className="item-text">怕冷可帶薄外套</div>
          </div>
          <div className={`checklist-item ${checklistState[19] ? 'completed' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={checklistState[19] || false}
              onChange={(e) => handleCheckboxChange(19, e.target.checked)}
            />
            <div className="item-text">準備防曬用品（<span className="highlight">務必做好防曬措施</span>！）</div>
          </div>
          <div className="memo-note">
            💡 衣服不用帶太多，當地也能買
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, #a8edea, #fed6e3)', borderRadius: '15px', border: '2px solid #f8d7da'}}>
          <div style={{fontSize: '1.3em', marginBottom: '10px'}}>🎉</div>
          <div style={{fontSize: '1.1em', color: '#2c3e50', fontWeight: 'bold'}}>準備完成後就可以開心出發啦！</div>
          <div style={{fontSize: '0.9em', color: '#7f8c8d', marginTop: '8px'}}>สนุกให้สุดเหวี่ยง! (玩得開心！)</div>
        </div>
      </div>
    </>
  );
}