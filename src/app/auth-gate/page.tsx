"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { 
  ShieldCheck, 
  Smartphone, 
  UserCheck, 
  Lock, 
  ChevronRight,
  Shield,
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from "react";

function AuthGateContent() {
  const [status, setStatus] = useState<'pending' | 'scanning' | 'success' | 'failed'>('pending');
  const [swipeProgress, setSwipeProgress] = useState(0);
  const controls = useAnimation();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '250.00';
  const recipient = searchParams.get('to') || 'Institutional Node';

  useEffect(() => {
    // Simulate auto-scan start
    const timer = setTimeout(() => {
      setStatus('scanning');
      setTimeout(() => setStatus('success'), 3000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSwipe = (event: any, info: PanInfo) => {
    const x = info.offset.x;
    const progress = Math.min(Math.max(x / 200, 0), 1);
    setSwipeProgress(progress);

    if (x > 200) {
      // Authorization Successful
      controls.start({ x: 240, transition: { type: "spring", stiffness: 300, damping: 30 } });
      setTimeout(() => {
        alert("Transaction Authorized successfully via Biometric Secure Link.");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col font-sans overflow-hidden">
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #3b82f6;
          box-shadow: 0 0 15px #3b82f6;
          animation: scan 2s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header className="p-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[#0070ba]">
          <Shield fill="#0070ba" />
          <span className="font-black text-xl tracking-tighter">Futuristic SECURE</span>
        </div>
        <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-400 uppercase tracking-widest">
          Biometric Authorization Required
        </div>
      </header>

      {/* Transaction Details */}
      <main className="flex-1 flex flex-col items-center px-8 text-center space-y-12">
        <div className="space-y-2">
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Authorization for</p>
          <h1 className="text-5xl font-black tracking-tighter">${amount}</h1>
          <p className="text-gray-400 font-medium">Recipient: <span className="text-white">{recipient}</span></p>
        </div>

        {/* Biometric Surface */}
        <div className="relative w-64 h-64 rounded-full border-4 border-white/5 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center overflow-hidden">
           {status === 'pending' && <Lock className="text-gray-700" size={80} />}
           {status === 'scanning' && (
             <>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="scan-line" />
                 <Smartphone className="text-blue-500/20" size={120} />
               </motion.div>
               <p className="absolute bottom-12 text-[10px] font-black text-blue-500 uppercase tracking-widest animate-pulse">Matching Face ID...</p>
             </>
           )}
           {status === 'success' && (
             <motion.div 
               initial={{ scale: 0.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="flex flex-col items-center gap-4"
             >
               <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                 <CheckCircle2 size={40} />
               </div>
               <p className="text-green-500 font-black text-[10px] uppercase tracking-widest">Identity Verified</p>
             </motion.div>
           )}
        </div>

        {/* Action Area */}
        <div className="w-full max-w-sm space-y-8">
          <div className="relative h-16 bg-white/5 rounded-full border border-white/10 overflow-hidden flex items-center px-2">
             <div 
               className="absolute left-0 top-0 bottom-0 bg-green-500/20 transition-all" 
               style={{ width: `${swipeProgress * 100}%` }}
             />
             <motion.div 
               drag="x"
               dragConstraints={{ left: 0, right: 240 }}
               onPan={handleSwipe}
               animate={controls}
               className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black cursor-grab active:cursor-grabbing z-20 shadow-lg"
             >
               <ChevronRight size={24} />
             </motion.div>
             <div className="flex-1 text-center font-black text-xs uppercase tracking-[0.2em] text-white/40 pointer-events-none">
               {swipeProgress > 0.8 ? "Release to Confirm" : "Swipe to Authorize"}
             </div>
          </div>

          <button className="text-gray-600 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
            Cancel Transaction
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center">
         <div className="flex items-center justify-center gap-2 text-gray-700 text-[10px] font-black uppercase tracking-widest">
           <AlertCircle size={12} />
           <span>Secure Session ID: 9021-TX-88</span>
         </div>
      </footer>
    </div>
  );
}

export default function AuthGatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center text-white font-black text-xs uppercase tracking-widest">Loading Secure Session...</div>}>
      <AuthGateContent />
    </Suspense>
  );
}
