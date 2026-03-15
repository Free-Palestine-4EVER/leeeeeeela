'use client';

import React, { useState, useRef, useCallback } from 'react';

interface WigStyle {
  id: number;
  name: string;
  thumb: string;
  styleGroupId: number;
  taskType: string;
}

const STYLES: WigStyle[] = [
  // Hairstyles - Female
  { id: 219691778809272449, name: 'Soft Brown Flip', thumb: 'https://cdn.perfectcorp.com/cms/5b2b41ff-bee7-47e6-a343-90099a8970df/175506725166010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809272434, name: 'Wavy Bob & Bangs', thumb: 'https://cdn.perfectcorp.com/cms/ee0701fc-1cf9-4ed2-a3f9-25d966425c63/175272419944010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809272322, name: 'Blunt Fringe Straight', thumb: 'https://cdn.perfectcorp.com/cms/c00f11f9-a0f6-46a9-851e-32d387722d7b/175307253555010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809272394, name: 'Dark C-Curl Layers', thumb: 'https://cdn.perfectcorp.com/cms/11653247-0630-4ba4-ac4c-757aeefdc48b/175308687235010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809271190, name: 'Brown Wavy Undercut', thumb: 'https://cdn.perfectcorp.com/cms/4219a15b-b2c9-46a0-8577-67f43160e562/174737897369010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809271466, name: 'Dark Lob & Bangs', thumb: 'https://cdn.perfectcorp.com/cms/27c95f02-a392-48b6-81c0-49e385edc734/174883179649010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809271580, name: 'Tousled Bob', thumb: 'https://cdn.perfectcorp.com/cms/948bbfcb-ec05-4e82-a084-c6db61480a1f/174892407444010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809271111, name: 'S-Wave Brunette', thumb: 'https://cdn.perfectcorp.com/cms/10c2e901-3a63-4190-8189-a3d44276ef1d/174676122188010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809271034, name: 'Dark Wooly Curls', thumb: 'https://cdn.perfectcorp.com/cms/29ebfbcb-e50b-49fa-8bdd-15f9da127fac/174676189431010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809271047, name: 'Soft Chestnut Midcut', thumb: 'https://cdn.perfectcorp.com/cms/992d610d-23a9-48be-824c-02345d756507/174677997519010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809270052, name: 'Retro Brown Waves', thumb: 'https://cdn.perfectcorp.com/cms/9e78a455-ae3c-4b96-8865-6cc553df35a0/174046908091010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  { id: 219691778809269965, name: 'Caramel Bubble Bob', thumb: 'https://cdn.perfectcorp.com/cms/19a66ff0-e009-48dd-a0c2-b910c4e30129/174235236418010.jpg', styleGroupId: 13600839, taskType: 'hair-style' },
  // Wigs
  { id: 1004, name: 'Bob', thumb: 'https://yce-us-cdn.perfectcorp.com/static/prompt/female/f369434a-024e-4a77-8e67-009a8de7cd14.jpg', styleGroupId: 71, taskType: 'wig' },
  { id: 1009, name: 'Curly Long', thumb: 'https://yce-us-cdn.perfectcorp.com/static/prompt/female/f369434a-024e-4a77-8e67-009a8de7cd14.jpg', styleGroupId: 71, taskType: 'wig' },
  { id: 1010, name: 'Straight Long', thumb: 'https://yce-us-cdn.perfectcorp.com/static/prompt/female/f369434a-024e-4a77-8e67-009a8de7cd14.jpg', styleGroupId: 71, taskType: 'wig' },
  { id: 1006, name: 'Very Short', thumb: 'https://yce-us-cdn.perfectcorp.com/static/prompt/female/f369434a-024e-4a77-8e67-009a8de7cd14.jpg', styleGroupId: 71, taskType: 'wig' },
];

export default function ARTryOn() {
  const [selectedStyle, setSelectedStyle] = useState<WigStyle>(STYLES[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      setError('Molimo odaberite sliku.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Slika mora biti manja od 10MB.');
      return;
    }

    setError(null);
    setResultImage(null);

    // Read and resize
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 1024px on long side (API requirement)
        const maxDim = 1024;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        const resized = canvas.toDataURL('image/jpeg', 0.9);
        setUploadedImage(resized);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleTryOn = useCallback(async () => {
    if (!uploadedImage) return;
    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage,
          styleGroupId: selectedStyle.styleGroupId,
          styleId: selectedStyle.id,
          taskType: selectedStyle.taskType,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Greška pri obradi.');
      setResultImage(data.resultUrl);
    } catch (err: any) {
      setError(err.message || 'Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  }, [uploadedImage, selectedStyle]);

  const handleReset = () => {
    setUploadedImage(null);
    setResultImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Style selector */}
      <div>
        <h3 className="text-white/80 text-sm font-medium mb-3">Odaberite frizuru</h3>
        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {STYLES.map((style) => (
            <button
              key={`${style.taskType}-${style.id}`}
              onClick={() => { setSelectedStyle(style); setResultImage(null); }}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
                selectedStyle.id === style.id && selectedStyle.taskType === style.taskType
                  ? 'bg-[#C9A96E]/20 ring-2 ring-[#C9A96E]'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/10">
                <img src={style.thumb} alt={style.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-white/70 text-xs text-center max-w-[70px] truncate">{style.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload / Result area */}
      <div className="relative">
        {!uploadedImage ? (
          <label className="aspect-[4/3] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-[#C9A96E]/50 hover:bg-white/5 transition-all">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <svg className="w-16 h-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-center">
              <p className="text-[#C9A96E] font-semibold">Postavite svoju fotografiju</p>
              <p className="text-white/40 text-sm mt-1">JPG ili PNG, maks. 10MB</p>
              <p className="text-white/30 text-xs mt-2">Lice mora biti jasno vidljivo, gledajte ravno u kameru</p>
            </div>
          </label>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Original */}
              <div className="space-y-2">
                <p className="text-white/50 text-xs text-center uppercase tracking-wider">Original</p>
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5">
                  <img src={uploadedImage} alt="Original" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Result */}
              <div className="space-y-2">
                <p className="text-white/50 text-xs text-center uppercase tracking-wider">Rezultat</p>
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                  {loading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
                      <p className="text-white/40 text-xs">AI generiše...</p>
                    </div>
                  ) : resultImage ? (
                    <img src={resultImage} alt="Rezultat" className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-white/20 text-sm text-center px-4">
                      Pritisnite &quot;Probaj&quot; za generisanje
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-all text-sm font-medium"
              >
                Nova slika
              </button>
              <button
                onClick={handleTryOn}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#B8944F] text-black font-semibold hover:opacity-90 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generiše se...' : `Probaj: ${selectedStyle.name}`}
              </button>
            </div>

            {/* Download result */}
            {resultImage && (
              <a
                href={resultImage}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="block text-center py-2 text-[#C9A96E] text-sm hover:underline"
              >
                ⬇ Preuzmi rezultat
              </a>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-white/20 text-xs text-center">
        Powered by Perfect Corp AI • Rezultati su generirani pomoću AI i mogu varirati
      </p>
    </div>
  );
}
