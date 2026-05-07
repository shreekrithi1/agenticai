"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowRight,
  Code2,
  Layers,
  Database,
  Cloud,
  CreditCard,
  Sparkles,
  Server,
  ScanFace,
  UserCheck,
  Bot,
  Video,
  ChevronRight,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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

  return (
    <main className="material-welcome">
      {/* Dynamic Background Visuals */}
      <div className="bg-canvas">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="bg-image"
            style={{ backgroundImage: `url('${VALUES[activeTab].image}')` }}
          />
        </AnimatePresence>
        <div className="bg-overlay" />
        <div className="bg-scanline" />
      </div>

      <div className="main-content">
        {/* Left Section: Hero & Branding */}
        <section className="hero-pane">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="brand-block"
          >
            <div className="m3-logo-surface float">
              <Image 
                src="/assets/futuristic_logo_v2.png" 
                alt="Logo" 
                width={160} 
                height={160}
                className="main-logo"
                priority 
              />
            </div>
            <div className="brand-text">
              <h1 className="m3-display">Futuristic</h1>
              <p className="m3-headline-small">Sovereign Intelligence v4.0</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="m3-button-container"
          >
            <Link href="/hub" className="tactile-button">
              <div className="button-surface">
                <span className="button-label">Initialize Hub Access</span>
                <ChevronRight size={24} />
              </div>
              <div className="button-shadow" />
              <div className="button-glow" />
            </Link>
          </motion.div>

          <div className="tech-chips-pane">
            <p className="pane-label">Institutional Stack</p>
            <div className="chips-grid">
              {TECH_STACK.map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="m3-chip glass-chip"
                >
                  <span className="chip-icon" style={{ color: tech.color }}>{tech.icon}</span>
                  <span className="chip-label">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Section: Interactive Info Surface */}
        <section className="info-pane glass-panel">
          <div className="pane-header">
            <div className="header-decoration" />
            <Info size={16} className="text-emerald-500" />
            <span>Core Grounding Protocol</span>
          </div>

          <div className="m3-tabs glass-tabs">
            {VALUES.map((val, i) => (
              <button 
                key={val.id}
                onClick={() => setActiveTab(i)}
                className={`m3-tab ${activeTab === i ? 'active' : ''}`}
              >
                {val.title}
                {activeTab === i && <motion.div layoutId="tab-active" className="tab-indicator" />}
              </button>
            ))}
          </div>

          <div className="pane-body">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="value-display"
              >
                <div className="value-header">
                  <div className="m3-icon-surface-high" style={{ borderColor: `${VALUES[activeTab].color}44` }}>
                    <div className="icon-glow" style={{ background: VALUES[activeTab].color }} />
                    <div className="icon-inner">{VALUES[activeTab].icon}</div>
                  </div>
                  <h2 className="m3-title-large">{VALUES[activeTab].title}</h2>
                </div>
                <p className="m3-body-large">{VALUES[activeTab].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pane-footer-high">
            <div className="system-telemetry">
              <div className="telemetry-item">
                <div className="dot pulse" />
                <span>Gemma-3-Node Online</span>
              </div>
              <div className="telemetry-item separator">|</div>
              <div className="telemetry-item">
                <span>Latency: 24ms</span>
              </div>
            </div>
            <div className="footer-copyright-high">
              © 2026 Sovereign Systems
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .material-welcome {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #010401;
          color: #f8fafc;
          position: relative;
          font-family: 'Outfit', sans-serif;
        }

        /* High Quality Background */
        .bg-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(2px) contrast(1.1);
          transition: 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(1, 4, 1, 0.6) 0%, #010401 100%);
        }

        .bg-scanline {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(16, 185, 129, 0.02) 50%);
          background-size: 100% 4px;
          pointer-events: none;
        }

        .main-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 500px;
          padding: 60px;
          gap: 60px;
        }

        /* Hero Pane */
        .hero-pane {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brand-block {
          display: flex;
          align-items: center;
          gap: 40px;
          margin-bottom: 80px;
        }

        .m3-logo-surface {
          width: 180px;
          height: 180px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          padding: 20px;
        }

        .main-logo {
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.2));
        }

        .m3-display {
          font-size: 6rem;
          font-weight: 900;
          letter-spacing: -4px;
          line-height: 0.9;
          margin: 0;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .m3-headline-small {
          font-size: 1.6rem;
          color: #94a3b8;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 8px;
        }

        /* Tactile Button Redesign */
        .tactile-button {
          position: relative;
          display: inline-flex;
          text-decoration: none;
          color: white;
          width: fit-content;
        }

        .button-surface {
          background: #10b981;
          padding: 24px 56px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          font-weight: 900;
          font-size: 1.3rem;
          position: relative;
          z-index: 2;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .button-shadow {
          position: absolute;
          inset: 0;
          background: #065f46;
          border-radius: 20px;
          transform: translateY(6px);
          z-index: 1;
          transition: 0.2s;
        }

        .button-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
          opacity: 0;
          transition: 0.4s;
          z-index: 0;
        }

        .tactile-button:hover .button-surface {
          transform: translateY(-2px);
          background: #15d191;
        }

        .tactile-button:hover .button-shadow {
          transform: translateY(8px);
        }

        .tactile-button:hover .button-glow {
          opacity: 1;
        }

        .tactile-button:active .button-surface {
          transform: translateY(4px);
        }

        .tactile-button:active .button-shadow {
          transform: translateY(2px);
        }

        /* Tech Chips */
        .tech-chips-pane {
          margin-top: 100px;
          max-width: 600px;
        }

        .pane-label {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #475569;
          margin-bottom: 24px;
        }

        .chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .glass-chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          padding: 10px 20px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          font-weight: 700;
          transition: 0.3s;
        }

        .glass-chip:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Info Pane */
        .glass-panel {
          background: rgba(255, 255, 255, 0.015);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 64px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 50px;
          position: relative;
        }

        .pane-header {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #64748b;
          margin-bottom: 40px;
        }

        .header-decoration {
          width: 30px;
          height: 1px;
          background: #10b981;
          opacity: 0.5;
        }

        .glass-tabs {
          display: flex;
          gap: 8px;
          background: rgba(0,0,0,0.3);
          padding: 6px;
          border-radius: 24px;
          margin-bottom: 50px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .m3-tab {
          flex: 1;
          background: transparent;
          border: none;
          color: #64748b;
          padding: 14px;
          border-radius: 18px;
          font-weight: 800;
          font-size: 0.95rem;
          cursor: pointer;
          position: relative;
          transition: 0.3s;
        }

        .m3-tab.active { color: white; }

        .tab-indicator {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          border-radius: 18px;
          z-index: -1;
        }

        .m3-icon-surface-high {
          width: 72px;
          height: 72px;
          background: rgba(255,255,255,0.02);
          border: 1px solid;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .icon-glow {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          filter: blur(15px);
        }

        .m3-title-large {
          font-size: 2.8rem;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .m3-body-large {
          font-size: 1.3rem;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 90%;
        }

        .pane-footer-high {
          margin-top: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 32px;
        }

        .system-telemetry {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; scale: 1; } 50% { opacity: 0.5; scale: 1.8; } 100% { opacity: 1; scale: 1; } }

        .footer-copyright-high { font-size: 0.75rem; color: #334155; font-weight: 800; }

        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

        @media (max-width: 1200px) {
          .main-content { grid-template-columns: 1fr; padding: 40px; overflow-y: auto; }
          .material-welcome { overflow-y: auto; }
          .hero-pane { align-items: center; text-align: center; }
          .brand-block { flex-direction: column; text-align: center; }
          .m3-display { font-size: 4rem; }
          .info-pane { border-radius: 40px; }
        }
      `}</style>
    </main>
  );
}
