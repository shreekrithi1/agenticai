"use client";

import Link from "next/link";
import { ArrowLeft, Users, RefreshCw, Briefcase, Zap, ShieldCheck, MonitorPlay, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

export default function BusinessFlow() {
  const steps = [
    {
      id: 1,
      title: "Agentic Communication",
      desc: "Secure, face-to-face equivalent dialogue between autonomous nodes.",
      icon: <Users size={24} className="text-blue-400" />,
      color: "blue",
      alignment: "left"
    },
    {
      id: 2,
      title: "Dynamic Adaptation",
      desc: "Welcome changing requirements and market conditions in real-time.",
      icon: <RefreshCw size={24} className="text-orange-400" />,
      color: "orange",
      alignment: "right"
    },
    {
      id: 3,
      title: "Multi-Agent Collaboration",
      desc: "Disparate systems working together with zero trust friction.",
      icon: <Briefcase size={24} className="text-purple-400" />,
      color: "purple",
      alignment: "left"
    },
    {
      id: 4,
      title: "Autonomous Execution",
      desc: "Build projects around motivated intelligence with autonomous capabilities.",
      icon: <Zap size={24} className="text-yellow-400" />,
      color: "yellow",
      alignment: "right"
    },
    {
      id: 5,
      title: "Settle Transactions",
      desc: "Produce working products and settle global payments instantly.",
      icon: <MonitorPlay size={24} className="text-emerald-400" />,
      color: "emerald",
      alignment: "left"
    },
    {
      id: 6,
      title: "Cryptographic Audit",
      desc: "Continuous attention to detail through immutable cryptographic ledgers.",
      icon: <ShieldCheck size={24} className="text-red-400" />,
      color: "red",
      alignment: "right"
    }
  ];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue': return 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.15)]';
      case 'orange': return 'bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.15)]';
      case 'purple': return 'bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)]';
      case 'yellow': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.15)]';
      case 'emerald': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]';
      case 'red': return 'bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.15)]';
      default: return 'bg-white/10 border-white/30 text-white';
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-50 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* Header */}
        <header className="mb-20 flex flex-col items-center text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 hover:bg-white/10 transition-colors">
            <ArrowLeft size={16} className="text-slate-400" />
            <span className="text-slate-300">Return to Hub</span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Flow</span></h1>
          <p className="text-slate-400 max-w-2xl text-lg">The continuous, agentic lifecycle powering our institutional orchestration hub. Adapted from agile methodologies for AI autonomy.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Timeline Diagram */}
          <div className="w-full lg:w-2/3 relative">
            
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={step.id} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${step.alignment === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: step.alignment === 'left' ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full md:w-[45%] p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md hover:bg-white/[0.04] transition-all group`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${getColorClasses(step.color)}`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                  </motion.div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#030712] border-4 border-white/10 items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <span className="text-sm font-bold text-slate-500">{step.id}</span>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-[45%]" />
                  
                  {/* Connecting Arrow for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center py-6 text-white/20">
                      <ArrowDownRight size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Loop Back Visual indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-col items-center text-center"
            >
              <div className="w-0.5 h-16 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="mt-4 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                Continuous Iteration Loop
              </div>
            </motion.div>

          </div>

          {/* Sticky Legend / Legend Panel */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="text-emerald-400" />
                Network Actors
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Users size={18} className="text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">Orchestrator Node</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Defines the overall agentic strategy and delegates specific tasks. (Equivalent to Scrum Master)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Users size={18} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">Execution Agent</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Carries out specialized intelligence tasks like code generation or payment routing. (Equivalent to Developer)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Users size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">Client Protocol</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Interfaces with external APIs and real-world triggers to maintain product vision. (Equivalent to Product Owner)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Users size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">Validator Network</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Audits and finalizes cryptographic proofs and deliverables. (Equivalent to Customer)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
