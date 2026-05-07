"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight,
  ChevronRight,
  Globe,
  Terminal,
  Activity,
  Shield,
  Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050505]" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-['Inter',sans-serif] overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-20 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
             <Image 
              src="/assets/alpha_logo.png" 
              alt="Alpha Logo" 
              width={24} 
              height={24}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <span className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">PROJECT α</span>
        </div>

        <div className="hidden md:flex items-center gap-12 bg-white/[0.03] px-8 py-3 rounded-full border border-white/5 backdrop-blur-md">
          <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors">Platform</Link>
          <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors">Solutions</Link>
          <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors">Developers</Link>
          <Link href="#" className="text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors">Enterprise</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="#" className="text-sm font-bold text-slate-300 hover:text-white transition-colors hidden sm:block">Sign In</Link>
          <Link 
            href="/hub" 
            className="px-6 py-2.5 bg-white text-black hover:bg-cyan-400 hover:text-black rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            Deploy Node
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase">System v4.0 Online</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
              The Next Era of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Agentic Compute.</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-lg font-light">
              Orchestrate autonomous AI nodes with unprecedented scale and security. Built for the future of global agricultural settlement.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link 
                href="/hub" 
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_10px_40px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95"
              >
                Initialize Hub
                <ArrowRight size={20} />
              </Link>
              <button 
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg text-white transition-all backdrop-blur-md"
              >
                <Terminal size={20} className="text-slate-400" />
                View Documentation
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/10 mt-8">
              <div>
                <p className="text-3xl font-black text-white">99.99%</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Uptime SLA</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">~12ms</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Global Latency</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">SOC 2</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Type II Certified</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Decorative Elements behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-[40px] blur-3xl transform -rotate-6 scale-105"></div>
            
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(6,182,212,0.15)] bg-black/50 backdrop-blur-sm aspect-square flex items-center justify-center">
               {/* Main Hero Image */}
               <Image
                  src="/assets/hq_visual_hero.png"
                  alt="Agentic Core"
                  fill
                  className="object-cover mix-blend-screen opacity-90 hover:opacity-100 transition-opacity duration-700 hover:scale-105"
               />
               
               {/* Overlay gradients for integration */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-40" />
               <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-transparent to-transparent opacity-40" />
            </div>

            {/* Floating Glass Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Live Processing</p>
                <p className="text-xs font-medium text-slate-400">1.2M events/sec</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -top-8 -right-8 bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Threat Mitigation</p>
                <p className="text-xs font-medium text-slate-400">Active Shielding</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Trusted By / Logos Section */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.01] py-10 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 w-full md:w-auto text-center md:text-left">Powered By</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-12 items-center">
            <span className="text-xl font-black tracking-tighter">GEMINI 1.5</span>
            <span className="text-xl font-black tracking-tighter">GEMMA 3</span>
            <span className="text-xl font-black tracking-tighter flex items-center gap-2"><Zap size={20}/> OLLAMA</span>
            <span className="text-xl font-black tracking-tighter">STRIPE</span>
            <span className="text-xl font-black tracking-tighter">VERCEL</span>
          </div>
        </div>
      </section>

      {/* Institutional Telemetry Footer */}
      <footer className="relative z-10 w-full py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-cyan-500/50" />
              <span>Asia-South-1 Node</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Terminal size={14} className="text-cyan-500/50" />
              <span>RSA-4096 / ECC-521</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            © 2026 Sovereign Systems • Build 04-26.α
          </p>
        </div>
      </footer>

      {/* Styled JSX for Global Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap');
        
        body {
          background-color: #050505;
        }
      `}</style>
    </main>
  );
}
