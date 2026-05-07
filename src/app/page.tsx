"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Shield, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Minimal Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Leaf className="text-emerald-500" size={24} />
          <span className="font-bold text-xl tracking-tight">BharatAgri</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
          <Link href="#" className="hover:text-white transition-colors">Platform</Link>
          <Link href="#" className="hover:text-white transition-colors">Solutions</Link>
          <Link href="#" className="hover:text-white transition-colors">Enterprise</Link>
        </nav>
        <Link 
          href="/hub" 
          className="text-sm font-medium hover:text-emerald-400 transition-colors"
        >
          Sign In
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System 4.0 Online
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-6">
            Digital Agronomy.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Perfected.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed mb-10">
            Orchestrate your agricultural assets with autonomous AI intelligence. The future of farming, simplified.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/hub" 
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold text-lg transition-all"
            >
              Initialize Hub
              <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 rounded-full font-semibold text-lg transition-all">
              Read Documentation
            </button>
          </div>
        </motion.div>
      </section>

      {/* Simple Feature Trio */}
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-24 border-t border-neutral-900 mt-20">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
            <Cpu size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Agentic Compute</h3>
          <p className="text-neutral-500 font-light leading-relaxed">
            Multi-modal reasoning engine leveraging state-of-the-art AI models for crop analytics.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-cyan-400 mb-6">
            <Leaf size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Sustainable Yields</h3>
          <p className="text-neutral-500 font-light leading-relaxed">
            Optimize resource allocation to maximize output while maintaining environmental integrity.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure Infrastructure</h3>
          <p className="text-neutral-500 font-light leading-relaxed">
            End-to-end encryption and SOC 2 Type II compliant data handling for all farm telemetry.
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="w-full py-8 border-t border-neutral-900 text-center text-xs text-neutral-600 font-medium">
        © 2026 BharatAgri. All rights reserved.
      </footer>
    </main>
  );
}
