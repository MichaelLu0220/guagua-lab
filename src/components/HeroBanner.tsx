'use client';

import { useEffect, useState } from 'react';
import { detectBrowserLanguage } from '@/utils/languageDetector';

const images = [
    '/images/og-default4.png',
    '/images/og-default7.png',
    '/images/og-default8.png',
];

function scrollToArticles() {
    const target = document.getElementById('articles');
    if (target) {
        const yOffset = -60;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

export default function HeroBanner() {
    const [image, setImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [language, setLanguage] = useState<'en' | 'zh'>('en');

    useEffect(() => {
        const handleLanguageChange = (event: CustomEvent<'en' | 'zh'>) => {
            setLanguage(event.detail);
        };
        window.addEventListener('languageChange', handleLanguageChange as EventListener);

        setLanguage(detectBrowserLanguage());

        const idx = Math.floor(Math.random() * images.length);
        setImage(images[idx]);
        setVisible(true);

        return () => {
            window.removeEventListener('languageChange', handleLanguageChange as EventListener);
        };
    }, []);

    const changeBackground = () => {
        setVisible(false);
        setTimeout(() => {
            const idx = Math.floor(Math.random() * images.length);
            setImage(images[idx]);
            setVisible(true);
        }, 350);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* 背景圖 */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 hover:scale-110 transition-opacity duration-700"
                style={{ backgroundImage: `url(${image})`, opacity: visible ? 1 : 0 }}
            />

            {/* 深色漸層 */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-black/30 to-black/60 z-0" />

            {/* 點擊整區滑動 (修復版本) */}
            <div
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={scrollToArticles}
            >
                {/* invisible block to ensure clickable area exists */}
                <div className="w-full h-full" />
            </div>

            {/* 主內容 */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
                <div className="mb-8 space-y-6">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wide drop-shadow-2xl animate-fade-in leading-tight relative">
                        <span className="relative z-20">{language === 'en' ? "GuaGua's Blog" : 'GuaGua 的博客'}</span>
                    </h1>

                    <div className="w-24 h-1 bg-white/80 mx-auto rounded-full animate-expand" />
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light opacity-90 drop-shadow-lg max-w-5xl mx-auto leading-relaxed animate-slide-up">
                        {language === 'en'
                            ? 'Life, Technology, and a Bunch of Interesting Stories'
                            : '生活、技術，還有一些有趣的故事'}
                    </p>
                </div>
            </div>

            {/* Scroll 指示器 */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="animate-bounce flex flex-col items-center">
                    <div className="w-5 h-8 border-2 border-white/60 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                    </div>
                    <p className="text-sm text-white/30 mt-1 font-light whitespace-nowrap">
                        {language === 'en' ? 'Click to scroll' : '點擊滾動'}
                    </p>
                </div>
            </div>

            {/* 背景切換按鈕 */}
            <button
                onClick={changeBackground}
                className="absolute top-16 right-6 bg-black/20 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 hover:bg-black/30 transition-all duration-300 z-30 hover:scale-110 hover:rotate-180"
                title="Change Background"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>

            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes expand {
          from { width: 0; opacity: 0; }
          to { width: 6rem; opacity: 1; }
        }

        @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }

        

        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.6;
            }
            25% {
                transform: translateY(-30px) rotate(90deg);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-15px) rotate(180deg);
                opacity: 1;
            }
            75% {
                transform: translateY(-40px) rotate(270deg);
                opacity: 0.7;
            }
        }

        .animate-fade-in { 
            animation: fade-in 1.2s ease-out; 
        }
        
        .animate-slide-up { 
            animation: slide-up 1.5s ease-out 0.3s both; 
        }
        
        .animate-expand { 
            animation: expand 1s ease-out 0.6s both; 
        }

        

        .absolute.rounded-full:nth-child(odd) {
            animation-direction: reverse;
        }

        

        @keyframes bubble-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50%, 50%); }
        }
      `}</style>
        </div>
    );
}
