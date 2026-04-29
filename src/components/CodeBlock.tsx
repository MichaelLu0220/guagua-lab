'use client';

import { useState, useRef } from 'react';

export function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    const text = preRef.current?.innerText ?? '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 text-xs font-mono rounded border opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600"
        aria-label="複製程式碼"
      >
        {copied ? '已複製 ✓' : '複製'}
      </button>
    </div>
  );
}
