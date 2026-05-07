"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Shield, Cpu, Activity, Play, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WelcomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Agentic Orchestration",
      desc: "Deploy autonomous AI agents that negotiate and settle transactions in milliseconds.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Digital Agronomy",
      desc: "Transform raw agricultural data into actionable, predictive yield models.",
      color: "from-emerald-500 to-teal-400"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sovereign Security",
      desc: "Military-grade encryption securing every node in your agricultural network.",
      color: "from-purple-500 to-pink-400"
    }
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-slate-50 font-sans selection:bg-emerald-500/30 overflow-hidden relative">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-emerald-500/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[120px]" 
        />
      </div>

      {/* Sticky Glass Navigation */}
      <header className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black">
              <Leaf size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">BharatAgri</span>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            <Link href="#" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#" className="hover:text-white transition-colors">Infrastructure</Link>
            <Link href="#" className="hover:text-white transition-colors">Security</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:text-white transition-colors hidden sm:block">Sign In</Link>
            <Link 
              href="/hub" 
              className="px-5 py-2 bg-white text-black hover:bg-slate-200 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
            >
              Access Hub
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-12 mb-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Activity size={16} className="text-emerald-400" />
            <span className="text-slate-300">System v4.2 is now live</span>
            <ChevronRight size={16} className="text-slate-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 max-w-5xl"
          >
            Intelligence for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
              agricultural frontier.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10"
          >
            BharatAgri provides the agentic orchestration layer needed to synchronize global farming nodes with millisecond precision and sovereign security.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/hub" 
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Initialize Hub
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-semibold text-lg transition-all backdrop-blur-sm">
              <Play size={20} className="text-slate-400 group-hover:text-white transition-colors" />
              Watch Demo
            </button>
          </motion.div>
        </section>

        {/* Interactive Features Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Orchestrate with precision.</h2>
            <p className="text-slate-400">Built from the ground up for high-concurrency agricultural environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="relative group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 backdrop-blur-sm overflow-hidden cursor-default"
              >
                {/* Hover Gradient Effect */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>

                {/* Animated Arrow on Hover */}
                <div className={`absolute bottom-8 right-8 transition-all duration-300 ${hoveredFeature === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <ArrowRight className="text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-white/[0.02] backdrop-blur-lg pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Leaf className="text-emerald-500 opacity-50" size={20} />
            <span className="font-semibold text-slate-400">BharatAgri Systems</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Status</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
