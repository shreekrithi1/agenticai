"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight,
  Sparkles,
  CreditCard,
  ScanFace,
  UserCheck,
  Bot,
  Video,
  ChevronRight,
  Info,
  Database,
  Cloud,
  Layers
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const TECH_STACK = [
  { name: "Gemini 1.5", icon: <Sparkles size={18} />, color: "#4285f4" },
  { name: "Gemma 3", icon: <Database size={18} />, color: "#3b82f6" },
  { name: "Ollama", icon: <Zap size={18} />, color: "#f59e0b" },
  { name: "OpenClaw", icon: <Cpu size={18} />, color: "#ec4899" },
  { name: "Stripe", icon: <CreditCard size={18} />, color: "#635bff" },
  { name: "Face ID", icon: <ScanFace size={18} />, color: "#10b981" },
  { name: "Liveness", icon: <UserCheck size={18} />, color: "#34d399" },
  { name: "Anam AI", icon: <Bot size={18} />, color: "#8b5cf6" },
  { name: "Tavus", icon: <Video size={18} />, color: "#ef4444" },
  { name: "Hostinger", icon: <Server size={18} />, color: "#673ab7" },
  { name: "Vercel", icon: <Cloud size={18} />, color: "#ffffff" },
  { name: "Next.js", icon: <Layers size={18} />, color: "#ffffff" }
];

function Server(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>;
}

const VALUES = [
  { 
    id: "mission",
    title: "Mission", 
    desc: "To synchronize Indian agriculture with global agentic rails, providing every farmer with sovereign intelligence.",
    icon: <Target size={24} />,
    color: "#10b981",
    image: "/assets/farm_bg.png"
  },
  { 
    id: "vision",
    title: "Vision", 
    desc: "A world where 'Truth Velocity' defines commerce—where AI agents negotiate and settle in milliseconds.",
    icon: <Eye size={24} />,
    color: "#3b82f6",
    image: "/assets/network_bg.png"
  },
  { 
    id: "values",
    title: "Values", 
    desc: "Institutional integrity, precision-first modeling, and absolute sovereignty for those who feed the world.",
    icon: <ShieldCheck size={24} />,
    color: "#f59e0b",
    image: "/assets/greenhouse_bg.png"
  }
];

export default function WelcomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-black" />;

  return (
    <main className="fixed inset-0 bg-black text-slate-50 font-['Outfit'] overflow-hidden selection:bg-emerald-500/30">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.4]"
            style={{ backgroundImage: `url('${VALUES[activeTab].image}')` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.4)_0%,#000000_100%)]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-10 p-10 lg:p-16">
        
        {/* Left Section: Branding */}
        <section className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-10 mb-20"
          >
            <div className="w-44 h-44 bg-white/5 border border-white/10 rounded-[48px] flex items-center justify-center shadow-2xl p-5 animate-float">
              <Image 
                src="/assets/futuristic_logo_v2.png" 
                alt="Logo" 
                width={160} 
                height={160}
                className="drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                priority 
              />
            </div>
            <div>
              <h1 className="text-8xl font-black tracking-tighter leading-none bg-gradient-to-br from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Futuristic
              </h1>
              <p className="text-2xl text-slate-400 font-semibold tracking-widest uppercase mt-2">
                Sovereign Intelligence v4.0
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-24"
          >
            <Link href="/hub" className="group relative inline-flex items-center gap-5 px-14 py-6 bg-emerald-500 text-white rounded-3xl font-black text-xl shadow-[0_6px_0_#065f46] active:translate-y-1 active:shadow-none transition-all hover:-translate-y-1 hover:bg-emerald-400">
              <span>Initialize Hub Access</span>
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-[-20px] bg-emerald-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>

          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Institutional Stack</p>
            <div className="flex flex-wrap gap-3">
              {TECH_STACK.map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.05] rounded-2xl backdrop-blur-md hover:bg-white/[0.08] transition-colors"
                >
                  <span style={{ color: tech.color }}>{tech.icon}</span>
                  <span className="text-sm font-bold">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Section: Info Panel */}
        <section className="bg-white/[0.015] backdrop-blur-[40px] border border-white/[0.05] rounded-[64px] flex flex-col p-12 overflow-hidden relative">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-10">
            <div className="w-8 h-[1px] bg-emerald-500/50" />
            <Info size={14} className="text-emerald-500" />
            <span>Core Grounding Protocol</span>
          </div>

          <div className="flex gap-2 bg-black/40 p-1.5 rounded-[24px] border border-white/[0.05] mb-12">
            {VALUES.map((val, i) => (
              <button 
                key={val.id}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-3.5 rounded-[18px] text-sm font-extrabold transition-all relative ${activeTab === i ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {val.title}
                {activeTab === i && (
                  <motion.div 
                    layoutId="tab-active" 
                    className="absolute inset-0 bg-white/[0.05] rounded-[18px] z-[-1]" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-white/[0.02] border border-white/10 rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 blur-xl" style={{ background: VALUES[activeTab].color }} />
                    <div className="relative z-10">{VALUES[activeTab].icon}</div>
                  </div>
                  <h2 className="text-5xl font-black tracking-tight">{VALUES[activeTab].title}</h2>
                </div>
                <p className="text-xl text-slate-400 leading-relaxed max-w-[90%]">
                  {VALUES[activeTab].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.05] flex justify-between items-center">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>Gemma-3-Node Online</span>
              </div>
              <span className="opacity-20">|</span>
              <span>Latency: 24ms</span>
            </div>
            <div className="text-[10px] font-black text-slate-600 uppercase">
              © 2026 Sovereign Systems
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
