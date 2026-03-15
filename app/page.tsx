'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/bs');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#C9A96E] font-serif">EYNNA HAIR</h1>
        <p className="text-[#888] mt-2 text-sm">Loading...</p>
      </div>
    </div>
  );
}
