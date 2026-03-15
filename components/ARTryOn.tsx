'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Wig {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  price: string;
  offsetY: number;  // vertical offset from forehead
  scaleX: number;   // width multiplier relative to face
  scaleY: number;   // height multiplier
}

const WIGS: Wig[] = [
  {
    id: 'balayage',
    name: 'Balayage Ombre Ash Blonde',
    nameEn: 'Balayage Ombre Ash Blonde',
    image: '/images/perika-balayage-ash.jpg',
    price: 'KM 1.600',
    offsetY: -0.45,
    scaleX: 1.8,
    scaleY: 1.6,
  },
  {
    id: 'platinum',
    name: 'Platinum Valovita',
    nameEn: 'Platinum Wavy',
    image: '/images/perika-platinum-valovita.jpg',
    price: 'KM 1.600',
    offsetY: -0.45,
    scaleX: 1.8,
    scaleY: 1.6,
  },
];

export default function ARTryOn() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedWig, setSelectedWig] = useState<Wig>(WIGS[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<any>(null);
  const wigImageRef = useRef<HTMLImageElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // Load wig image when selection changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedWig.image;
    img.onload = () => {
      wigImageRef.current = img;
    };
  }, [selectedWig]);

  const initFaceLandmarker = useCallback(async () => {
    try {
      const vision = await import('@mediapipe/tasks-vision');
      const { FaceLandmarker, FilesetResolver } = vision;
      
      const filesetResolver = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
      );
      
      // Try GPU first, fall back to CPU
      let landmarker: any = null;
      for (const delegate of ['GPU', 'CPU'] as const) {
        try {
          landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
              modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
              delegate,
            },
            outputFaceBlendshapes: false,
            outputFacialTransformationMatrixes: true,
            runningMode: 'VIDEO',
            numFaces: 1,
          });
          break;
        } catch (e) {
          console.warn(`FaceLandmarker ${delegate} delegate failed:`, e);
          if (delegate === 'CPU') throw e;
        }
      }
      
      setFaceLandmarker(landmarker);
      return landmarker;
    } catch (err) {
      console.error('Failed to load face landmarker:', err);
      setError('Nije moguće učitati detekciju lica. Pokušajte ponovo.');
      return null;
    }
  }, []);

  const startCamera = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 480 } 
        },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      let landmarker = faceLandmarker;
      if (!landmarker) {
        landmarker = await initFaceLandmarker();
      }
      
      if (landmarker && videoRef.current) {
        setCameraActive(true);
        detectFaces(landmarker);
      } else {
        // Model failed to load — stop camera stream
        if (videoRef.current?.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
          tracks.forEach((t) => t.stop());
          videoRef.current.srcObject = null;
        }
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Nije moguće pristupiti kameri. Provjerite dozvole.');
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    setCameraActive(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  const detectFaces = (landmarker: any) => {
    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    let lastTime = -1;

    const render = () => {
      if (!video || video.paused || video.ended) return;

      const now = performance.now();
      if (now !== lastTime) {
        lastTime = now;

        try {
          const results = landmarker.detectForVideo(video, now);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            const landmarks = results.faceLandmarks[0];
            drawWigOverlay(ctx, landmarks, canvas.width, canvas.height);
          }
        } catch (e) {
          // silently continue
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  const drawWigOverlay = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    w: number,
    h: number
  ) => {
    const wigImg = wigImageRef.current;
    if (!wigImg) return;

    // Key landmarks
    // 10 = top of forehead (center)
    // 234 = left temple area
    // 454 = right temple area
    // 152 = chin
    // 1 = nose tip
    
    const forehead = landmarks[10];
    const leftTemple = landmarks[234];
    const rightTemple = landmarks[454];
    const chin = landmarks[152];
    const noseTip = landmarks[1];

    // Calculate face dimensions
    const faceWidth = Math.abs(rightTemple.x - leftTemple.x) * w;
    const faceHeight = Math.abs(forehead.y - chin.y) * h;

    // Wig dimensions
    const wigWidth = faceWidth * selectedWig.scaleX;
    const wigHeight = faceHeight * selectedWig.scaleY;

    // Position: center horizontally on face, offset vertically above forehead
    const centerX = ((leftTemple.x + rightTemple.x) / 2) * w;
    const foreheadY = forehead.y * h;
    
    const wigX = centerX - wigWidth / 2;
    const wigY = foreheadY + (faceHeight * selectedWig.offsetY);

    // Calculate head rotation from face landmarks
    const dx = rightTemple.x - leftTemple.x;
    const dy = rightTemple.y - leftTemple.y;
    const angle = Math.atan2(dy, dx);

    // Draw with rotation
    ctx.save();
    ctx.translate(centerX, foreheadY);
    ctx.rotate(angle);
    
    // Apply slight transparency for blending
    ctx.globalAlpha = 0.88;
    
    // Draw wig with rounded clipping for natural look
    ctx.beginPath();
    const clipW = wigWidth;
    const clipH = wigHeight;
    const clipX = -clipW / 2;
    const clipY = faceHeight * selectedWig.offsetY;
    const radius = clipW * 0.08;
    
    ctx.moveTo(clipX + radius, clipY);
    ctx.lineTo(clipX + clipW - radius, clipY);
    ctx.quadraticCurveTo(clipX + clipW, clipY, clipX + clipW, clipY + radius);
    ctx.lineTo(clipX + clipW, clipY + clipH - radius);
    ctx.quadraticCurveTo(clipX + clipW, clipY + clipH, clipX + clipW - radius, clipY + clipH);
    ctx.lineTo(clipX + radius, clipY + clipH);
    ctx.quadraticCurveTo(clipX, clipY + clipH, clipX, clipY + clipH - radius);
    ctx.lineTo(clipX, clipY + radius);
    ctx.quadraticCurveTo(clipX, clipY, clipX + radius, clipY);
    ctx.closePath();
    ctx.clip();
    
    ctx.drawImage(wigImg, clipX, clipY, clipW, clipH);
    
    ctx.restore();
  };

  const takeScreenshot = () => {
    const video = videoRef.current;
    const overlay = overlayCanvasRef.current;
    if (!video || !overlay) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    // Mirror the video (selfie mode)
    ctx.translate(tempCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    
    // Reset transform and draw overlay (also mirrored)
    ctx.setTransform(-1, 0, 0, 1, tempCanvas.width, 0);
    ctx.drawImage(overlay, 0, 0);

    // Add branding
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, tempCanvas.height - 50, tempCanvas.width, 50);
    ctx.fillStyle = '#C9A96E';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.fillText('EYNNA HAIR SARAJEVO', 15, tempCanvas.height - 20);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(selectedWig.name + ' • ' + selectedWig.price, 15, tempCanvas.height - 5);

    setScreenshot(tempCanvas.toDataURL('image/jpeg', 0.92));
  };

  const downloadScreenshot = () => {
    if (!screenshot) return;
    const link = document.createElement('a');
    link.download = `eynna-hair-tryon-${selectedWig.id}.jpg`;
    link.href = screenshot;
    link.click();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Camera View */}
      <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#2a2a2a]">
        {!cameraActive && !loading && (
          <div className="aspect-[4/3] flex flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C9A96E]/20 to-[#C9A96E]/5 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Virtualno Isprobavanje Perika</h3>
              <p className="text-gray-400 text-sm max-w-md">
                Isprobajte naše perike uživo koristeći kameru vašeg uređaja. 
                Odaberite periku i pogledajte kako izgleda na vama!
              </p>
            </div>
            <button
              onClick={startCamera}
              className="px-8 py-3 bg-gradient-to-r from-[#C9A96E] to-[#A88B4A] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(201,169,110,0.3)] transition-all duration-300 hover:scale-105"
            >
              📸 Pokreni Kameru
            </button>
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>
        )}

        {loading && (
          <div className="aspect-[4/3] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Učitavanje AI modela za detekciju lica...</p>
          </div>
        )}

        {cameraActive && (
          <div className="relative aspect-[4/3]">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }}
              playsInline
              muted
            />
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ transform: 'scaleX(-1)' }}
            />
            
            {/* Controls overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              <button
                onClick={takeScreenshot}
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center hover:bg-white/30 transition-all"
                title="Uslikaj"
              >
                <div className="w-10 h-10 rounded-full border-2 border-white" />
              </button>
              <button
                onClick={stopCamera}
                className="w-14 h-14 rounded-full bg-red-500/60 backdrop-blur-md border-2 border-red-400/40 flex items-center justify-center hover:bg-red-500/80 transition-all"
                title="Zaustavi kameru"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
              </button>
            </div>

            {/* Wig name overlay */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
              <span className="text-[#C9A96E] text-sm font-semibold">{selectedWig.name}</span>
              <span className="text-white/60 text-xs ml-2">{selectedWig.price}</span>
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Wig Selector */}
      <div className="mt-6 flex gap-4 justify-center">
        {WIGS.map((wig) => (
          <button
            key={wig.id}
            onClick={() => setSelectedWig(wig)}
            className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedWig.id === wig.id
                ? 'border-[#C9A96E] shadow-[0_0_20px_rgba(201,169,110,0.3)] scale-105'
                : 'border-[#2a2a2a] hover:border-[#C9A96E]/50'
            }`}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 relative">
              <img
                src={wig.image}
                alt={wig.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-semibold truncate">{wig.name}</p>
                <p className="text-[#C9A96E] text-xs">{wig.price}</p>
              </div>
            </div>
            {selectedWig.id === wig.id && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#C9A96E] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Screenshot Preview Modal */}
      {screenshot && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setScreenshot(null)}>
          <div className="bg-[#111] rounded-2xl overflow-hidden max-w-lg w-full border border-[#2a2a2a]" onClick={(e) => e.stopPropagation()}>
            <img src={screenshot} alt="Screenshot" className="w-full" />
            <div className="p-4 flex gap-3 justify-center">
              <button
                onClick={downloadScreenshot}
                className="px-6 py-2.5 bg-[#C9A96E] text-white rounded-full font-semibold text-sm hover:bg-[#A88B4A] transition-colors"
              >
                📥 Preuzmi Sliku
              </button>
              <button
                onClick={() => {
                  if (navigator.share && screenshot) {
                    navigator.share({
                      title: 'Eynna Hair - Virtual Try-On',
                      text: `Pogledajte kako mi stoji ${selectedWig.name}! 💇‍♀️`,
                      url: window.location.href,
                    }).catch(() => {});
                  }
                }}
                className="px-6 py-2.5 border border-[#C9A96E] text-[#C9A96E] rounded-full font-semibold text-sm hover:bg-[#C9A96E]/10 transition-colors"
              >
                📤 Podijeli
              </button>
              <button
                onClick={() => setScreenshot(null)}
                className="px-6 py-2.5 border border-gray-600 text-gray-400 rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors"
              >
                ✕ Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
