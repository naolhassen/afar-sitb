import React from 'react';
import { Sparkles } from 'lucide-react';

export default function TextMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  const loopItems = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-4 sm:py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050a18] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050a18] to-transparent" />
      <div className="flex w-max animate-cg-marquee items-center gap-10 whitespace-nowrap">
        {loopItems.map((item, i) => (
          <div key={`${item}-${i}`} className="flex shrink-0 items-center gap-10">
            <span className="cg-gradient-text-light text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
              {item}
            </span>
            <Sparkles className="shrink-0 text-blue-400/60" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { TextMarquee };
