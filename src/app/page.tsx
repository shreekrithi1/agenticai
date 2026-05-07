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
  Home,
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
      {/* Background Visuals */}
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
      </div>

      <div className="main-content">
        {/* Left Section: Hero & Branding */}
        <section className="hero-pane">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="brand-block"
          >
            <div className="m3-logo-surface float">
              <Image src="/assets/futuristic_logo.png" alt="Logo" width={120} height={120} />
            </div>
            <div className="brand-text">
              <h1 className="m3-display">Futuristic</h1>
              <p className="m3-headline-small">Institutional Agentic Rails</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="m3-button-container"
          >
            <Link href="/hub" className="m3-button-filled">
              <span>Enter Futuristic Hub</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>

          <div className="tech-chips-pane">
            <p className="pane-label">System Stack</p>
            <div className="chips-grid">
              {TECH_STACK.map((tech, i) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="m3-chip"
                >
                  <span className="chip-icon" style={{ color: tech.color }}>{tech.icon}</span>
                  <span className="chip-label">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Section: Interactive Info Surface */}
        <section className="info-pane glass">
          <div className="pane-header">
            <Info size={20} className="text-emerald-500" />
            <span>Operational Philosophy</span>
          </div>

          <div className="m3-tabs">
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="value-display"
              >
                <div className="value-header">
                  <div className="m3-icon-surface" style={{ color: VALUES[activeTab].color }}>
                    {VALUES[activeTab].icon}
                  </div>
                  <h2 className="m3-title-large">{VALUES[activeTab].title}</h2>
                </div>
                <p className="m3-body-large">{VALUES[activeTab].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pane-footer">
            <div className="status-badge">
              <div className="dot pulse" />
              <span>Sovereign Node v3.4 Active</span>
            </div>
            <div className="footer-copyright">
              © 2026 Sovereign AI
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .material-welcome {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: #020802;
          color: #e2e8f0;
          position: relative;
          font-family: 'Outfit', sans-serif;
        }

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
          filter: blur(4px);
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(2, 8, 2, 0.4) 0%, #020802 100%);
        }

        .main-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 450px;
          padding: 40px;
          gap: 40px;
        }

        /* Left Pane */
        .hero-pane {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 40px;
        }

        .brand-block {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-bottom: 60px;
        }

        .m3-logo-surface {
          width: 160px;
          height: 160px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        }

        .m3-display {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -3px;
          margin: 0;
          background: linear-gradient(135deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .m3-headline-small {
          font-size: 1.4rem;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 1px;
          margin-top: -8px;
        }

        .m3-button-filled {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          background: #10b981;
          color: white;
          padding: 20px 48px;
          border-radius: 24px;
          text-decoration: none;
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 0 4px 0 #065f46;
          transition: 0.2s;
          width: fit-content;
        }

        .m3-button-filled:hover {
          transform: translateY(-2px);
          background: #34d399;
          box-shadow: 0 6px 0 #064e3b;
        }

        .m3-button-filled:active {
          transform: translateY(2px);
          box-shadow: 0 0 0 transparent;
        }

        .tech-chips-pane {
          margin-top: 80px;
          max-width: 600px;
        }

        .pane-label {
          font-size: 0.7rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #64748b;
          margin-bottom: 20px;
        }

        .chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .m3-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 700;
        }

        /* Right Pane */
        .info-pane {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 48px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 40px;
          position: relative;
        }

        .pane-header {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 40px;
        }

        .m3-tabs {
          display: flex;
          gap: 12px;
          background: rgba(0,0,0,0.2);
          padding: 6px;
          border-radius: 20px;
          margin-bottom: 40px;
        }

        .m3-tab {
          flex: 1;
          background: transparent;
          border: none;
          color: #64748b;
          padding: 12px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 0.9rem;
          cursor: pointer;
          position: relative;
          transition: 0.3s;
        }

        .m3-tab.active { color: white; }

        .tab-indicator {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          z-index: -1;
        }

        .pane-body {
          flex: 1;
        }

        .value-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }

        .m3-icon-surface {
          width: 56px;
          height: 56px;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .m3-title-large {
          font-size: 2.2rem;
          font-weight: 900;
          margin: 0;
        }

        .m3-body-large {
          font-size: 1.2rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .pane-footer {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 24px;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 800;
          color: #10b981;
        }

        .dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
        .pulse { animation: pulse 2s infinite; }

        @keyframes pulse { 0% { opacity: 1; scale: 1; } 50% { opacity: 0.5; scale: 1.5; } 100% { opacity: 1; scale: 1; } }

        .footer-copyright { font-size: 0.7rem; color: #475569; font-weight: 700; }

        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        @media (max-width: 1024px) {
          .main-content { grid-template-columns: 1fr; overflow-y: auto; height: auto; }
          .material-welcome { overflow-y: auto; height: auto; }
          .hero-pane { padding: 40px 0; align-items: center; padding-left: 0; text-align: center; }
          .brand-block { flex-direction: column; text-align: center; }
          .m3-display { font-size: 4rem; }
          .info-pane { border-radius: 32px; padding: 24px; }
        }
      `}</style>
    </main>
  );
}
