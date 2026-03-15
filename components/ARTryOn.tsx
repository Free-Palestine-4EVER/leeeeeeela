'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface HairTemplate {
  id: string;
  thumb: string;
  title: string;
  category_name: string;
}

export default function ARTryOn() {
  const [templates, setTemplates] = useState<HairTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<HairTemplate | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userPhotoFile, setUserPhotoFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const allTemplates: HairTemplate[] = [];
      let nextToken: string | null = null;
      
      for (let i = 0; i < 5; i++) {
        let url = '/api/try-on?action=templates&page_size=20';
        if (nextToken) url += `&starting_token=${nextToken}`;
        
        const resp = await fetch(url);
        const data = await resp.json();
        
        if (data.status === 200 && data.data?.templates) {
          allTemplates.push(...data.data.templates);
          nextToken = data.data.next_token;
          if (!nextToken) break;
        } else break;
      }
      
      // Only female styles (relevant for wigs)
      const female = allTemplates.filter(t => t.category_name === 'Female');
      setTemplates(female);
      if (female.length > 0) setSelectedTemplate(female[0]);
    } catch (err) {
      console.error('Failed to load templates:', err);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUserPhotoFile(file);
    setResultImage(null);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPhoto(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const runTryOn = async () => {
    if (!userPhotoFile || !selectedTemplate) return;
    
    setLoading(true);
    setError(null);
    setResultImage(null);
    
    try {
      // 1. Upload the photo
      const formData = new FormData();
      formData.append('file', userPhotoFile);
      
      const uploadResp = await fetch('/api/try-on/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResp.json();
      
      if (uploadData.status !== 200) {
        throw new Error(uploadData.error || 'Upload failed');
      }

      // 2. Run the hairstyle task using file_id
      const taskResp = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          src_file_id: uploadData.file_id,
          template_id: selectedTemplate.id,
        }),
      });
      const taskData = await taskResp.json();
      
      if (taskData.status !== 200) {
        throw new Error(taskData.error || 'Failed to start AI task');
      }
      
      const taskId = taskData.data.task_id;
      
      // 3. Poll for result
      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 2000));
        
        const statusResp = await fetch(`/api/try-on?action=status&task_id=${encodeURIComponent(taskId)}`);
        const statusData = await statusResp.json();
        
        const taskStatus = statusData.data?.task_status;
        
        if (taskStatus === 'success') {
          const resultUrl = statusData.data?.results?.url;
          if (resultUrl) {
            setResultImage(resultUrl);
          } else {
            throw new Error('No result image returned');
          }
          return;
        } else if (taskStatus === 'error') {
          throw new Error(statusData.data?.error_message || 'AI processing failed');
        }
      }
      
      throw new Error('Processing timed out');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Categorize templates
  const categories = ['all', ...Array.from(new Set(templates.map(t => {
    const title = t.title.toLowerCase();
    if (title.includes('bob') || title.includes('pixie') || title.includes('crew') || title.includes('buzz')) return 'short';
    if (title.includes('long') || title.includes('braid') || title.includes('wave')) return 'long';
    if (title.includes('curl') || title.includes('afro') || title.includes('coil')) return 'curly';
    return 'other';
  })))];

  const filteredTemplates = filter === 'all' 
    ? templates 
    : templates.filter(t => {
        const title = t.title.toLowerCase();
        if (filter === 'short') return title.includes('bob') || title.includes('pixie') || title.includes('crew') || title.includes('buzz') || title.includes('bixie');
        if (filter === 'long') return title.includes('long') || title.includes('braid') || title.includes('wave') || title.includes('straight');
        if (filter === 'curly') return title.includes('curl') || title.includes('afro') || title.includes('coil');
        return true;
      });

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Photo Upload & Result */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Upload Section */}
        <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#2a2a2a]">
          <div className="p-4 border-b border-[#2a2a2a]">
            <h3 className="text-white font-semibold text-sm">Vaša Fotografija</h3>
          </div>
          <div className="aspect-[3/4] relative flex items-center justify-center">
            {userPhoto ? (
              <>
                <img src={userPhoto} alt="Your photo" className="w-full h-full object-cover" />
                <button
                  onClick={() => { setUserPhoto(null); setUserPhotoFile(null); setResultImage(null); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  ✕
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Otpremite svoju fotografiju za virtualno isprobavanje frizura</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#C9A96E] to-[#A88B4A] text-white text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(201,169,110,0.3)] transition-all"
                  >
                    📁 Izaberi Sliku
                  </button>
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="px-5 py-2.5 border border-[#C9A96E] text-[#C9A96E] text-sm font-semibold rounded-full hover:bg-[#C9A96E]/10 transition-all"
                  >
                    📸 Kamera
                  </button>
                </div>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={handleFileSelect} className="hidden" />
          <input ref={cameraInputRef} type="file" accept="image/jpeg" capture="user" onChange={handleFileSelect} className="hidden" />
        </div>

        {/* Result Section */}
        <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#2a2a2a]">
          <div className="p-4 border-b border-[#2a2a2a]">
            <h3 className="text-white font-semibold text-sm">
              AI Rezultat {selectedTemplate && <span className="text-[#C9A96E] ml-2">— {selectedTemplate.title}</span>}
            </h3>
          </div>
          <div className="aspect-[3/4] relative flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-2 border-[#C9A96E]/20 rounded-full" />
                  <div className="absolute inset-0 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-white text-sm font-medium">AI Obrađuje...</p>
                  <p className="text-gray-500 text-xs mt-1">Generisanje vaše nove frizure</p>
                </div>
              </div>
            ) : resultImage ? (
              <>
                <img src={resultImage} alt="AI Result" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  <a
                    href={resultImage}
                    download="eynna-hair-tryon.jpg"
                    target="_blank"
                    className="px-5 py-2 bg-[#C9A96E] text-white text-sm font-semibold rounded-full hover:bg-[#A88B4A] transition-colors"
                  >
                    📥 Preuzmi
                  </a>
                </div>
              </>
            ) : error ? (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <span className="text-3xl">😕</span>
                </div>
                <p className="text-red-400 text-sm">{error}</p>
                <button onClick={runTryOn} className="px-5 py-2 border border-[#C9A96E] text-[#C9A96E] text-sm rounded-full hover:bg-[#C9A96E]/10 transition-colors">
                  Pokušaj Ponovo
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <span className="text-5xl">✨</span>
                <p className="text-gray-400 text-sm">
                  {userPhoto 
                    ? 'Izaberite frizuru i pritisnite "Isprobaj"'
                    : 'Otpremite fotografiju da počnete'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Try On Button */}
      {userPhoto && selectedTemplate && !loading && (
        <div className="flex justify-center mb-8">
          <button
            onClick={runTryOn}
            className="px-10 py-4 bg-gradient-to-r from-[#C9A96E] to-[#A88B4A] text-white font-bold text-lg rounded-full hover:shadow-[0_0_40px_rgba(201,169,110,0.4)] hover:scale-105 transition-all duration-300"
          >
            ✨ Isprobaj Frizuru
          </button>
        </div>
      )}

      {/* Style Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { key: 'all', label: 'Sve' },
          { key: 'long', label: 'Duga Kosa' },
          { key: 'short', label: 'Kratka Kosa' },
          { key: 'curly', label: 'Kovrčava' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.key
                ? 'bg-[#C9A96E] text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] border border-[#2a2a2a]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Style Grid */}
      {loadingTemplates ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => { setSelectedTemplate(template); setResultImage(null); }}
              className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedTemplate?.id === template.id
                  ? 'border-[#C9A96E] shadow-[0_0_20px_rgba(201,169,110,0.3)] scale-[1.03]'
                  : 'border-[#2a2a2a] hover:border-[#C9A96E]/50'
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={template.thumb}
                  alt={template.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                  <p className="text-white text-[10px] sm:text-xs font-semibold truncate">{template.title}</p>
                </div>
              </div>
              {selectedTemplate?.id === template.id && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#C9A96E] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
