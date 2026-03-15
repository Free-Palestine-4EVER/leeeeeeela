'use client';

import { categories } from '@/lib/products';

export default function MarqueeTicker() {
  const items = [...categories, ...categories];

  return (
    <div className="py-6 bg-secondary/50 border-y border-offwhite/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((cat, i) => (
          <span key={i} className="mx-8 text-sm uppercase tracking-[0.2em] text-muted/60 font-medium flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-accent/40 rounded-full" />
            {cat.nameEn}
          </span>
        ))}
      </div>
    </div>
  );
}
