"use client";

import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ChevronRight,
  Info,
  Database,
  Cloud,
  Layers,
  Sparkles,
  CreditCard,
  ScanFace,
  Terminal,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const TECH_STACK = [
  { name: "Gemini 1.5 Pro", icon: <Sparkles size={14} />, color: "#4285f4" },
  { name: "Gemma 3 27B", icon: <Database size={14} />, color: "#3b82f6" },
  { name: "Ollama Compute", icon: <Zap size={14} />, color: "#f59e0b" },
  { name: "Stripe Agentic", icon: <CreditCard size={14} />, color: "#635bff" },
  { name: "Sovereign ID", icon: <ScanFace size={14} />, color: "#10b981" },
];

const CARDS = [
  {
    title: "Mission Protocol",
    desc: "Implementing autonomous agentic rails for global agricultural settlement.",
    icon: <Target className="text-emerald-500" />,
    label: "PRIORITY_01"
  },
  {
    title: "Vision Systems",
    desc: "A decentralized future where AI agents negotiate and settle without latency.",
    icon: <Eye className="text-blue-500" />,
    label: "STABLE_BUILD"
  },
  {
    title: "Core Infrastructure",
    desc: "Multi-modal orchestration layer powered by Gemini 1.5 and OpenClaw.",
    icon: <Cpu className="text-purple-500" />,
    label: "SOC2_READY"
  }
];

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#0a0a0a]" />;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-['Outfit'] selection:bg-emerald-500/30 overflow-x-hidden p-6 lg:p-12">
      
      {/* Structural Header */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <Image 
                src="/assets/futuristic_logo_v2.png" 
                alt="Logo" 
                width={32} 
                height={32}
              />
            </div>
            <span className="text-xs font-black tracking-[0.5em] text-slate-500 uppercase">Classified / Internal Use</span>
          </div>
          <div className="flex items-baseline gap-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">Project</h1>
            <span className="text-7xl md:text-9xl font-black text-emerald-500 leading-none">α</span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <Link 
            href="/hub" 
            className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-xl font-black text-lg transition-all hover:bg-emerald-500 active:scale-95"
          >
            <span>START SESSION</span>
            <ArrowRight size={20} />
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Operational State: Nominal</span>
          </div>
        </div>
      </header>

      {/* Material 3 Card Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {CARDS.map((card, i) => (
          <div 
            key={i}
            className="group bg-[#161616] border border-white/5 rounded-3xl p-8 hover:border-emerald-500/50 transition-all flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  {card.icon}
                </div>
                <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase bg-white/5 px-3 py-1.5 rounded-lg">
                  {card.label}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-bold uppercase tracking-widest">Audit Secure</span>
              <Info size={16} className="opacity-20 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </section>

      {/* Technical Spec Section */}
      <section className="max-w-6xl mx-auto bg-[#161616] border border-white/5 rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-emerald-500" />
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">System Capability</h2>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              Project Alpha represents the shift from passive tools to autonomous decision nodes. Our agentic stack handles high-concurrency negotiation and global settlement protocols.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="flex items-center gap-3 bg-white/5 border border-white/5 px-5 py-4 rounded-2xl">
                <span className="text-emerald-500">{tech.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="max-w-6xl mx-auto mt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">
        <div className="flex items-center gap-8">
          <span>Encrypted Node: RSA-4096</span>
          <span>Lat: 12.9716 / Lon: 77.5946</span>
        </div>
        <div>
          © 2026 Sovereign Systems • Build 04-26.α
        </div>
      </footer>

      <style jsx global>{`
        body {
          background-color: #0a0a0a;
          margin: 0;
        }
        * {
          transition: none !important; /* Force no animations as requested */
        }
        .group:hover {
          transition: border-color 0.2s ease !important; /* Exception for subtle hover interaction */
        }
      `}</style>
    </main>
  );
}
