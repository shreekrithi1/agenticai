"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronRight, Volume2, Info } from 'lucide-react';

interface DemoStep {
  id: string;
  label: string;
  description: string;
  targetUrl: string;
  action?: () => Promise<void>;
}

interface DemoContextType {
  isActive: boolean;
  currentStepIndex: number;
  startDemo: () => void;
  stopDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error('useDemo must be used within a DemoProvider');
  return context;
};

const DEMO_STEPS: DemoStep[] = [
  {
    id: 'intro',
    label: 'Hub Overview',
    description: 'Welcome to the Institutional Orchestration Hub. This is where you manage all your agentic assets.',
    targetUrl: '/'
  },
  {
    id: 'stocks',
    label: 'Market Oracle',
    description: 'Accessing real-time market intelligence and buy/sell signals powered by Parallel AI.',
    targetUrl: '/stocks'
  },
  {
    id: 'analysis',
    label: 'Data Sync',
    description: 'The system automatically syncs every 30 seconds to ensure high-conviction execution.',
    targetUrl: '/stocks'
  },
  {
    id: 'flow',
    label: 'System Flow',
    description: 'Visualizing the cryptographic audit and multi-agent collaboration cycle.',
    targetUrl: '/flow'
  }
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startDemo = () => {
    setIsActive(true);
    setCurrentStepIndex(0);
  };

  const stopDemo = () => {
    setIsActive(false);
    setCurrentStepIndex(0);
    window.speechSynthesis.cancel();
  };

  return (
    <DemoContext.Provider value={{ isActive, currentStepIndex, startDemo, stopDemo }}>
      {children}
      <DemoOverlay 
        isActive={isActive} 
        currentStepIndex={currentStepIndex} 
        onNext={() => setCurrentStepIndex(prev => prev + 1)}
        onStop={stopDemo}
      />
    </DemoContext.Provider>
  );
};

const DemoOverlay: React.FC<{ 
  isActive: boolean; 
  currentStepIndex: number; 
  onNext: () => void;
  onStop: () => void;
}> = ({ isActive, currentStepIndex, onNext, onStop }) => {
  const [showDialog, setShowDialog] = useState(false);
  const currentStep = DEMO_STEPS[currentStepIndex];

  const speak = (text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    // Look for a British voice
    const britishVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
    if (britishVoice) utterance.voice = britishVoice;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isActive || !currentStep) return;

    const runStep = async () => {
      // 1. Navigate if needed
      if (window.location.pathname !== currentStep.targetUrl) {
        window.location.href = currentStep.targetUrl;
        return;
      }

      // 2. Show Dialog
      setShowDialog(true);
      speak(currentStep.description);
      
      // 3. Wait 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 4. Perform Auto-Actions (example: fill search if on stocks page)
      if (currentStep.id === 'analysis' && window.location.pathname === '/stocks') {
        const searchInput = document.querySelector('input[placeholder*="search"]') as HTMLInputElement;
        if (searchInput) {
          let text = "TSLA";
          for (let i = 0; i <= text.length; i++) {
            searchInput.value = text.slice(0, i);
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, 100));
          }
        }
      }

      // 5. Hide Dialog and Move Next
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowDialog(false);
      
      if (currentStepIndex < DEMO_STEPS.length - 1) {
        onNext();
      } else {
        setTimeout(onStop, 2000);
      }
    };

    runStep();
  }, [isActive, currentStepIndex]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Top Step Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-xl border-bottom border-white/10 flex items-center px-12 pointer-events-auto"
      >
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
              <Volume2 size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Demo Active</div>
              <div className="text-sm font-bold text-white">Institutional Walkthrough</div>
            </div>
          </div>

          <div className="h-8 w-px bg-white/10 mx-4" />

          <div className="flex items-center gap-6">
            {DEMO_STEPS.map((step, idx) => (
              <div key={step.id} className={`flex items-center gap-3 ${idx > currentStepIndex ? 'opacity-30' : 'opacity-100'}`}>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-black ${idx === currentStepIndex ? 'bg-white text-black border-white' : 'border-white/30 text-white/30'}`}>
                  {idx + 1}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${idx === currentStepIndex ? 'text-white' : 'text-white/30'}`}>
                  {step.label}
                </span>
                {idx < DEMO_STEPS.length - 1 && <ChevronRight size={14} className="text-white/10" />}
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={onStop}
          className="bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white/50 hover:text-red-500 p-2 rounded-xl transition-all"
        >
          <X size={20} />
        </button>
      </motion.div>

      {/* Center Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg pointer-events-auto"
          >
            <div className="bg-[#111] border-2 border-emerald-500/30 rounded-[32px] p-8 shadow-[0_0_100px_rgba(16,185,129,0.2)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <Info className="text-emerald-400" size={24} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-1">Step {currentStepIndex + 1}</div>
                  <h2 className="text-2xl font-black text-white">{currentStep?.label}</h2>
                </div>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed font-medium">
                {currentStep?.description}
              </p>
              <div className="mt-8 flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Processing</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
