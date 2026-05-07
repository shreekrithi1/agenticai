"use client";

import Link from "next/link";
import { ArrowLeft, Users, RefreshCw, Briefcase, Zap, ShieldCheck, CheckCircle2, MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";

export default function BusinessFlow() {
  const steps = [
    {
      id: 1,
      title: "Agentic Communication",
      desc: "Face-to-face conversation equivalent between autonomous nodes.",
      icon: <Users size={24} className="text-blue-400" />,
      delay: 0.1,
      pos: "col-start-1 row-start-1"
    },
    {
      id: 2,
      title: "Dynamic Adaptation",
      desc: "Welcome changing requirements in real-time.",
      icon: <RefreshCw size={24} className="text-orange-400" />,
      delay: 0.2,
      pos: "col-start-2 row-start-1"
    },
    {
      id: 3,
      title: "Multi-Agent Collaboration",
      desc: "Work together across disparate global systems.",
      icon: <Briefcase size={24} className="text-purple-400" />,
      delay: 0.3,
      pos: "col-start-3 row-start-1"
    },
    {
      id: 4,
      title: "Autonomous Execution",
      desc: "Build projects around motivated intelligence.",
      icon: <Zap size={24} className="text-yellow-400" />,
      delay: 0.4,
      pos: "col-start-4 row-start-2"
    },
    {
      id: 5,
      title: "Settle Transactions",
      desc: "Produce working products & automated payments.",
      icon: <MonitorPlay size={24} className="text-emerald-400" />,
      delay: 0.5,
      pos: "col-start-3 row-start-3"
    },
    {
      id: 6,
      title: "Cryptographic Audit",
      desc: "Continuous attention to detail and compliance.",
      icon: <ShieldCheck size={24} className="text-red-400" />,
      delay: 0.6,
      pos: "col-start-2 row-start-3"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-slate-50 font-sans p-8">
      <nav className="mb-12 flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span className="font-semibold">Return to Hub</span>
        </Link>
        <div className="font-bold tracking-widest text-xs uppercase text-slate-500">Business Flow Architecture</div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center lg:items-start">
        
        {/* Legend Panel */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h3 className="text-lg font-bold mb-6 text-white">Network Roles</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/50">
                <Users size={16} className="text-orange-400" />
              </div>
              <span className="text-sm font-bold text-slate-300">Orchestrator Node</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
                <Users size={16} className="text-purple-400" />
              </div>
              <span className="text-sm font-bold text-slate-300">Execution Agent</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
                <Users size={16} className="text-blue-400" />
              </div>
              <span className="text-sm font-bold text-slate-300">Client Protocol</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/50">
                <Users size={16} className="text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-slate-300">Validator</span>
            </div>
          </div>
        </motion.div>

        {/* Flow Diagram */}
        <div className="w-full lg:w-3/4 relative py-12">
          
          {/* Animated SVG Path connecting the nodes */}
          <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
            <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 100,80 L 350,80 L 600,80 Q 750,80 750,200 Q 750,320 600,320 L 350,320 L 200,320 Q 50,320 50,200 Q 50,80 100,80" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeDasharray="10 10"
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                d="M 100,80 L 350,80 L 600,80 Q 750,80 750,200 Q 750,320 600,320 L 350,320 L 200,320 Q 50,320 50,200 Q 50,80 100,80" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="4" 
                className="opacity-50"
                style={{ strokeDasharray: "10 1000", strokeDashoffset: 0 }}
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-8 md:gap-4 place-items-center min-h-[400px]">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: step.delay }}
                className={`bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-[220px] shadow-2xl relative ${step.pos} group hover:border-white/30 hover:bg-white/5 transition-colors`}
              >
                {/* Yellow Plus Button equivalent */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black border-4 border-[#0a0a0a] shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={16} />
                </div>

                <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10">
                  {step.icon}
                </div>
                <h4 className="font-bold text-sm text-white mb-2 leading-tight">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </main>
  );
}
