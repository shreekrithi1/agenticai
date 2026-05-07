"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight,
  ChevronRight,
  Globe,
  Terminal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#0c0c28]" />;

  return (
    <main className="min-h-screen bg-[#0c0c28] text-white font-['Inter',sans-serif] overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Top Announcement Banner */}
      <div className="w-full bg-[#1e1b4b] border-b border-white/5 py-2 px-4 text-center text-xs font-medium tracking-tight">
        <p className="flex items-center justify-center gap-2">
          Project α raises $12.5M Series A from Global Agri-Capital 
          <ChevronRight size={14} className="text-purple-400" />
        </p>
      </div>

      {/* Navigation Header */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image 
              src="/assets/alpha_logo.png" 
              alt="Alpha Logo" 
              width={24} 
              height={24}
              className="brightness-200"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">Project α</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Problem</Link>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Capabilities</Link>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Research</Link>
          <Link href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">FAQ</Link>
        </div>

        <Link 
          href="/hub" 
          className="px-6 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full text-sm font-bold transition-all"
        >
          Initialize Hub
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-48 max-w-4xl mx-auto">
        {/* Decorative Gradient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <p className="text-[#2dd4bf] text-xs font-black uppercase tracking-[0.3em] mb-12">
            AGENTIC SETTLEMENT RAILS
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] mb-12">
            Your AI agents work in the lab. <br />
            They <span className="text-[#a78bfa] italic font-serif">settle</span> in production.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-16">
            Project α is the orchestration and settlement platform that helps you synchronize global agricultural nodes—and how to scale them with millisecond precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/hub" 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-2xl font-bold text-lg transition-all shadow-[0_20px_40px_rgba(139,92,246,0.2)]"
            >
              Start Session →
            </Link>
            <button 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 border border-white/20 hover:bg-white/5 rounded-2xl font-bold text-lg transition-all"
            >
              Watch Research
            </button>
          </div>
        </motion.div>
      </section>

      {/* Institutional Telemetry Footer */}
      <footer className="fixed bottom-0 w-full border-t border-white/5 bg-[#0c0c28]/80 backdrop-blur-md py-6 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>Network Status: Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={12} />
              <span>Asia-South-1 Node</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal size={12} />
              <span>RSA-4096 / ECC-521</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">
            © 2026 Sovereign Systems • Build 04-26.α
          </p>
        </div>
      </footer>

      {/* Styled JSX for Inter Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap');
        
        body {
          background-color: #0c0c28;
        }
      `}</style>
    </main>
  );
}
