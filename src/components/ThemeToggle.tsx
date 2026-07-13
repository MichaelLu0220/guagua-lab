'use client';

import { useEffect, useRef, useState } from 'react';
import { FaCog, FaMoon, FaSun, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

export default function ThemeToggle() {
    const [dark, setDark] = useState(false); // 主題暗色狀態
    const [open, setOpen] = useState(false); // 功能按鈕是否開啟（使用者意圖）
    const [rendered, setRendered] = useState(false); // 按鈕群組是否在 DOM 中（保留離場動畫）
    const [spin, setSpin] = useState(false); // 齒輪是否旋轉
    const [showPulse, setShowPulse] = useState(false); // 第一次進站的 pulse 提示
    const { language, changeLanguage, mounted } = useLanguage();
    const menuRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<NodeJS.Timeout | null>(null);
    const canHover = useRef(false); // 裝置是否支援 hover（區分桌機與觸控）

    // 初始化主題 - 修復水合錯誤
    useEffect(() => {
        // 只在客戶端執行 localStorage 操作
        const isDark = localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
        if (!localStorage.getItem('seen-gear-hint')) setShowPulse(true);
        // 偵測是否為支援 hover 的裝置（桌機滑鼠），觸控裝置改用點擊
        canHover.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }, []);

    // 展開時立即渲染；收回後短暫保留，讓快速離場動畫播完。
    useEffect(() => {
        if (open) {
            setRendered(true);
            return;
        }
        if (!rendered) return;
        const hideTimer = setTimeout(() => setRendered(false), 120);
        return () => clearTimeout(hideTimer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // 點擊選單以外區域時關閉（手機點擊模式需要）
    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                handleClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    // 防止水合錯誤：組件未掛載時不渲染
    if (!mounted) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <div className="relative">
                    <button className="relative bg-white dark:bg-[#252b27] text-zinc-900 dark:text-[#f4f1e8] border-2 border-zinc-900 dark:border-[#f4f1e8] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] focus:outline-none">
                        <FaCog size={22} />
                    </button>
                </div>
            </div>
        );
    }

    const toggleTheme = () => {
        const newDark = !dark;
        setDark(newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newDark);
    };

    const toggleLanguage = () => {
        const nextLang = language === 'en' ? 'zh' : 'en';
        changeLanguage(nextLang);
    };

    const handleOpen = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        if (open) return;
        localStorage.setItem('seen-gear-hint', 'true');
        setShowPulse(false);
        setSpin(true); // 展開時齒輪旋轉
        setOpen(true);
    };

    const handleClose = () => {
        if (!open) return;
        setSpin(true); // 收回時齒輪旋轉
        setOpen(false);
    };

    const handleAnimationEnd = () => {
        setSpin(false);
    };

    const handleMouseEnter = () => {
        if (!canHover.current) return; // 觸控裝置不觸發 hover 開啟
        handleOpen();
    };

    const handleMouseLeave = () => {
        if (!canHover.current) return; // 觸控裝置不觸發 hover 關閉
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
            handleClose();
        }, 200);
    };

    // 點擊齒輪：切換選單開關（手機端主要互動方式）
    const handleToggle = () => {
        if (open) {
            handleClose();
        } else {
            handleOpen();
        }
    };

    return (
        <div
            ref={menuRef}
            className="fixed bottom-6 right-6 z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative">
                {/* 功能按鈕群組 */}
                {(open || rendered) && (
                    <div className="flex flex-col items-center gap-3 mb-4">
                        <AnimatedButton
                            visible={open}
                            delay={80}
                            onClick={toggleTheme}
                            ariaLabel="切換主題"
                        >
                            {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </AnimatedButton>

                        <AnimatedButton
                            visible={open}
                            delay={40}
                            onClick={toggleLanguage}
                            ariaLabel="切換語言"
                        >
                            <div className="flex items-center">
                                <span className="text-base font-extrabold">{language === 'en' ? 'EN' : '中'}</span>
                            </div>
                        </AnimatedButton>

                        <AnimatedButton
                            visible={open}
                            delay={0}
                            isLink
                            href="/"
                            ariaLabel="回首頁"
                            onClick={handleClose}
                        >
                            <FaHome size={20} />
                        </AnimatedButton>
                    </div>
                )}

                {/* 齒輪按鈕 */}
                <div className="relative">
                    {showPulse && (
                        <span className="absolute inset-0 animate-ping bg-pink-500/40 dark:bg-teal-400/40 pointer-events-none" />
                    )}
                    <button
                        className="relative transition-all duration-200 ease-out bg-white dark:bg-[#252b27] text-zinc-900 dark:text-[#f4f1e8] border-2 border-zinc-900 dark:border-[#f4f1e8] p-3 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(244,241,232,0.25)] hover:translate-x-[2px] hover:translate-y-[2px]"
                        aria-label="設定選單"
                        aria-expanded={open}
                        onClick={handleToggle}
                    >
                        <FaCog
                            size={22}
                            className={spin ? 'animate-spin-smooth' : ''}
                            onAnimationEnd={handleAnimationEnd}
                        />
                    </button>
                </div>
            </div>

            {/* 動畫樣式區域 */}
            <style jsx global>{`
                @keyframes spin-smooth {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(180deg); }
                }

                @keyframes slideInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(12px) scale(0.92);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes slideOutDown {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(8px) scale(0.94);
                    }
                }

                .animate-slide-in {
                    animation: slideInUp 0.12s ease-out both;
                }

                .animate-slide-out {
                    animation: slideOutDown 0.1s ease-in forwards;
                }

                .animate-spin-smooth {
                    animation: spin-smooth 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
}

// 動畫按鈕元件
function AnimatedButton({
    visible,
    delay,
    children,
    onClick,
    ariaLabel,
    isLink = false,
    href = '/',
}: {
    visible: boolean;
    delay: number;
    children: React.ReactNode;
    onClick?: () => void;
    ariaLabel: string;
    isLink?: boolean;
    href?: string;
}) {
    const [showButton, setShowButton] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // 控制進場與離場動畫
    useEffect(() => {
        if (visible) {
            setHasInteracted(true);
            setShowButton(true);
        } else {
            const hideTimer = setTimeout(() => {
                setShowButton(false);
            }, 120);
            return () => clearTimeout(hideTimer);
        }
    }, [visible, delay]);

    if (!showButton) return null;

    const animationClass = hasInteracted
        ? visible
            ? 'animate-slide-in'
            : 'animate-slide-out'
        : '';

    const baseClass = `w-12 h-12 flex items-center justify-center bg-white dark:bg-[#252b27] text-zinc-900 dark:text-[#f4f1e8] border-2 border-zinc-900 dark:border-[#f4f1e8] transition-all duration-200 ease-out transform shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(244,241,232,0.25)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(244,241,232,0.25)] hover:translate-x-[2px] hover:translate-y-[2px] ${animationClass}`;
    const animationStyle = visible ? { animationDelay: `${delay}ms` } : undefined;

    if (isLink) {
        return (
            <Link href={href} aria-label={ariaLabel} onClick={onClick} className={baseClass} style={animationStyle}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} aria-label={ariaLabel} className={baseClass} style={animationStyle}>
            {children}
        </button>
    );
}
