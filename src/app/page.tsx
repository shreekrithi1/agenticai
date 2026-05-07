"use client";

import { 
  Target, 
  Eye, 
  Cpu, 
  ChevronRight,
  Info,
  Database,
  Zap,
  Globe,
  Terminal,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const CARDS = [
  {
    title: "Mission",
    desc: "Autonomous agentic orchestration for global agricultural settlement protocols.",
    icon: <Target size={24} className="text-emerald-400" />,
    id: "M01"
  },
  {
    title: "Vision",
    desc: "Decentralized millisecond commerce powered by sovereign AI nodes.",
    icon: <Eye size={24} className="text-blue-400" />,
    id: "V01"
  },
  {
    title: "Infrastructure",
    desc: "Multi-modal reasoning engine leveraging Gemini 1.5 and OpenClaw v4.",
    icon: <Cpu size={24} className="text-purple-400" />,
    id: "I01"
  }
];

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050705]" />;

  return (
    <main className="h-screen w-screen bg-[#050705] text-[#f8fafc] font-['Outfit'] overflow-hidden relative flex flex-col p-8 lg:p-12">
      
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Top Header / Branding */}
      <header className="relative z-10 flex justify-between items-start mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center p-4 shadow-2xl backdrop-blur-md">
            <Image 
              src="/assets/alpha_logo.png" 
              alt="Project Alpha Logo" 
              width={64} 
              height={64}
              className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter leading-none mb-1">PROJECT α</h1>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              <span className="text-emerald-500">SOVEREIGN</span>
              <span className="opacity-20">/</span>
              <span>INTELLIGENCE</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Status: Operational</span>
          </div>
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mr-4">Build 2026.04.α-STABLE</span>
        </div>
      </header>

      {/* Main Content Area: Split View */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* Left: Hero Info */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <div className="space-y-6 mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
              <ShieldAlert size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest">Internal Protocol Access</span>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              AGENTIC<br />
              <span className="text-emerald-500">SETTLEMENT</span><br />
              RAILS
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
              Project Alpha orchestrates high-fidelity autonomous settlement between global agricultural nodes using millisecond-precision AI.
            </p>
          </div>

          <div className="flex gap-4">
            <Link 
              href="/hub" 
              className="group flex items-center gap-6 px-12 py-5 bg-white text-black rounded-2xl font-black text-xl transition-all hover:bg-emerald-500 active:scale-95 shadow-2xl"
            >
              <span>INITIALIZE HUB</span>
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right: Material Cards Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-auto pr-2 custom-scrollbar">
          {CARDS.map((card) => (
            <div 
              key={card.id}
              className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 backdrop-blur-xl flex gap-8 items-center group hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all cursor-default"
            >
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center flex-shrink-0 border border-white/5 group-hover:border-emerald-500/20 transition-all">
                {card.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-black tracking-tight">{card.title}</h3>
                  <span className="text-[10px] font-black text-slate-600 tracking-widest">{card.id}</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm lg:text-base">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Quick Stats / Tech Card */}
          <div className="bg-emerald-500 text-black rounded-[32px] p-8 flex items-center justify-between">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">System Throughput</h4>
              <p className="text-4xl font-black tracking-tighter leading-none">99.98%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Uptime Verified</p>
            </div>
            <div className="flex -space-x-4">
              <div className="w-12 h-12 bg-black rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold">G</div>
              <div className="w-12 h-12 bg-black rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold">α</div>
              <div className="w-12 h-12 bg-black rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold">OC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="relative z-10 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <Terminal size={14} className="text-emerald-500" />
            <span>Encrypted Node: RSA-4096-ECC</span>
          </div>
          <div className="flex items-center gap-3">
            <Database size={14} />
            <span>Gemma-3-Node: 172.16.0.4</span>
          </div>
        </div>
        <div>
          © 2026 Sovereign Systems • Project Alpha Prototype
        </div>
      </footer>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16,185,129,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16,185,129,0.3);
        }
      `}</style>
    </main>
  );
}
