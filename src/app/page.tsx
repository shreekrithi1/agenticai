"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  UserCheck,
  Bot,
  Video,
  ArrowUpRight,
  Globe,
  Terminal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const TECH_STACK = [
  { name: "Gemini 1.5", icon: <Sparkles size={16} />, color: "#4285f4" },
  { name: "Gemma 3", icon: <Database size={16} />, color: "#3b82f6" },
  { name: "Ollama", icon: <Zap size={16} />, color: "#f59e0b" },
  { name: "Stripe", icon: <CreditCard size={16} />, color: "#635bff" },
  { name: "Face ID", icon: <ScanFace size={16} />, color: "#10b981" },
  { name: "Vercel", icon: <Cloud size={16} />, color: "#ffffff" },
];

const BENTO_CARDS = [
  {
    id: "mission",
    title: "Mission",
    desc: "Synchronizing global agentic rails with sovereign intelligence for the future of commerce.",
    icon: <Target className="text-emerald-400" />,
    size: "large",
    accent: "from-emerald-500/20 to-transparent"
  },
  {
    id: "vision",
    title: "Vision",
    desc: "A world of millisecond settlement and autonomous negotiation.",
    icon: <Eye className="text-blue-400" />,
    size: "small",
    accent: "from-blue-500/20 to-transparent"
  },
  {
    id: "stack",
    title: "Intelligence Stack",
    desc: "Built on Gemini, Gemma, and OpenClaw protocols.",
    icon: <Cpu className="text-purple-400" />,
    size: "small",
    accent: "from-purple-500/20 to-transparent"
  }
];

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#020402]" />;

  return (
    <main className="min-h-screen bg-[#020402] text-slate-50 font-['Outfit'] selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <Image 
          src="/assets/master_bg.png" 
          alt="Background" 
          fill
          className="object-cover opacity-40 scale-110 animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020402]/80 via-transparent to-[#020402]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        
        {/* Header / Branding Section */}
        <header className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="relative group">
              <div className="absolute inset-[-20px] bg-emerald-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="w-32 h-32 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] flex items-center justify-center p-6 shadow-2xl relative">
                <Image 
                  src="/assets/futuristic_logo_v2.png" 
                  alt="Futuristic Logo" 
                  width={80} 
                  height={80}
                  className="drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              FUTURISTIC
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 font-medium tracking-[0.4em] uppercase">
              Sovereign Intelligence • Autonomous Rails
            </p>
          </motion.div>
        </header>

        {/* Action Section */}
        <section className="flex justify-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/hub" 
              className="group relative flex items-center gap-4 pl-10 pr-4 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#010401] rounded-full font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
            >
              <span>INITIALIZE HUB ACCESS</span>
              <div className="w-12 h-12 bg-[#010401] rounded-full flex items-center justify-center text-emerald-500 group-hover:rotate-45 transition-transform">
                <ArrowUpRight size={24} />
              </div>
            </Link>
          </motion.div>
        </section>

        {/* Bento Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {BENTO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`group relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-[40px] p-10 hover:border-white/10 transition-all ${card.size === 'large' ? 'md:col-span-2' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-3">{card.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{card.desc}</p>
                </div>
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity">
                <Info size={40} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Institutional Stack Ticker */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-white/5 pt-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">Institutional Stack</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
                  <span style={{ color: tech.color }}>{tech.icon}</span>
                  <span className="text-xs font-bold tracking-wider">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Telemetry */}
        <footer className="mt-32 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
              <span>Gemma-3-Node: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={12} />
              <span>Asia-South-1 Deployment</span>
            </div>
          </div>
          <div>
            © 2026 Sovereign Systems • Ver: 4.0.2-Stable
          </div>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s linear infinite alternate;
        }
      `}</style>
    </main>
  );
}
