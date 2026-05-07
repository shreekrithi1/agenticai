"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
  Infinity,
  Fingerprint,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

const TECH_STACK = [
  { name: "Gemini 1.5", icon: <Sparkles size={24} />, color: "#4285f4", desc: "Multimodal Intelligence" },
  { name: "Gemma 3", icon: <Database size={24} />, color: "#3b82f6", desc: "Open Model Weights" },
  { name: "Ollama", icon: <Zap size={24} />, color: "#f59e0b", desc: "Local Inference" },
  { name: "OpenClaw", icon: <Cpu size={24} />, color: "#ec4899", desc: "Agent Orchestration" },
  { name: "Stripe", icon: <CreditCard size={24} />, color: "#635bff", desc: "Global Payouts" },
  { name: "Face ID", icon: <ScanFace size={24} />, color: "#10b981", desc: "Biometric Identity" },
  { name: "Liveness", icon: <UserCheck size={24} />, color: "#34d399", desc: "Anti-Spoofing" },
  { name: "Anam AI", icon: <Bot size={24} />, color: "#8b5cf6", desc: "Persona Synthesis" },
  { name: "Tavus", icon: <Video size={24} />, color: "#ef4444", desc: "Generative Video" },
  { name: "Hostinger", icon: <Server size={24} />, color: "#673ab7", desc: "VPS Infrastructure" },
  { name: "Vercel", icon: <Cloud size={24} />, color: "#ffffff", desc: "Edge Deployment" },
  { name: "React 19", icon: <Code2 size={24} />, color: "#61dafb", desc: "Modern Frontend" }
];

const VALUES = [
  { 
    title: "The Mission", 
    desc: "To synchronize Indian agriculture with global agentic rails, providing every MSME and farmer with sovereign intelligence and autonomous finance.",
    icon: <Target size={40} />,
    color: "#10b981",
    bg: "/assets/farm_bg.png"
  },
  { 
    title: "The Vision", 
    desc: "A world where 'Truth Velocity' defines commerce—where AI agents negotiate, settle, and audit in milliseconds, bridging the digital prosperity gap.",
    icon: <Eye size={40} />,
    color: "#3b82f6",
    bg: "/assets/network_bg.png"
  },
  { 
    title: "The Values", 
    desc: "Institutional integrity, precision-first modeling, and absolute sovereignty. We build tools that empower, not just assist.",
    icon: <ShieldCheck size={40} />,
    color: "#f59e0b",
    bg: "/assets/greenhouse_bg.png"
  }
];

export default function WelcomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="welcome-page" ref={containerRef}>
      {/* Dynamic Background */}
      <div className="background-wrapper">
        <div className="grid-overlay" />
        <div className="vignette" />
      </div>
      
      <div className="content-container">
        {/* Hero Section */}
        <motion.section style={{ y: heroY, opacity: heroOpacity }} className="hero">
          <div className="hero-visual">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 2 }}
              className="hero-image-bg"
              style={{ backgroundImage: "url('/assets/farm_bg.png')" }}
            />
            <div className="hero-gradient-overlay" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-badge glass"
          >
            <Sparkles size={14} className="text-emerald-400" />
            <span>Next-Gen Agentic Ecosystem</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="main-logo-wrapper"
          >
            <Image 
              src="/assets/agrimind_logo.png" 
              alt="AgriMind" 
              width={160} 
              height={160}
              className="main-logo float"
              priority
            />
          </motion.div>

          <div className="title-stack">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glitch-title"
            >
              AgriMind <span className="gradient-text">Beyond</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hero-tagline"
            >
              The Institutional Standard for <span className="text-emerald-400">Autonomous Agriculture</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="hero-cta-box"
          >
            <Link href="/hub" className="launch-button">
              <span className="btn-text">Initialize Hub Access</span>
              <ChevronRight size={24} />
              <div className="btn-shine" />
            </Link>
            <div className="node-status glass">
              <div className="dot pulse" />
              <span>Gemma-3 Node Active</span>
            </div>
          </motion.div>
        </motion.section>

        {/* High-Quality Vision Cards */}
        <section className="vision-cards-section">
          <div className="cards-header">
            <div className="header-line" />
            <h2>Sovereign Architecture</h2>
            <div className="header-line" />
          </div>
          
          <div className="vision-grid">
            {VALUES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="vision-card"
              >
                <div className="card-bg-image" style={{ backgroundImage: `url('${item.bg}')` }} />
                <div className="card-overlay" />
                <div className="card-content glass">
                  <div className="card-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="card-footer-line" style={{ background: item.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Bento with Visual Depth */}
        <section className="tech-bento-section">
          <div className="tech-bento-header">
            <Fingerprint size={48} className="text-emerald-500/50 mb-4" />
            <h2>The Agentic Rail</h2>
            <p>Institutional grade protocols for 2026 commerce</p>
          </div>

          <div className="bento-container">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bento-item glass-hover"
              >
                <div className="bento-icon" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <div className="bento-meta">
                  <h4>{tech.name}</h4>
                  <span>{tech.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Footer */}
        <footer className="welcome-footer-final">
          <div className="footer-blur-bg" />
          <div className="footer-main glass">
            <div className="footer-left">
              <div className="footer-logo">
                <Image src="/assets/agrimind_logo.png" alt="Logo" width={40} height={40} />
                <span>AgriMind <span className="text-emerald-500">Institutional</span></span>
              </div>
              <p>Bridging traditional wisdom with agentic autonomy.</p>
            </div>
            <div className="footer-right">
              <div className="footer-column">
                <h6>Legal</h6>
                <a href="#">Compliance</a>
                <a href="#">Audit Trails</a>
              </div>
              <div className="footer-column">
                <h6>System</h6>
                <span className="text-emerald-500">v3.4.2-STABLE</span>
                <span>Uptime: 99.99%</span>
              </div>
            </div>
          </div>
          <div className="copyright">
             © 2026 Sovereign AI Systems. Orchestrated in India.
          </div>
        </footer>
      </div>

      <style jsx>{`
        .welcome-page {
          min-height: 100vh;
          background: #010401;
          color: #f8fafc;
          overflow-x: hidden;
        }

        .background-wrapper {
          position: fixed;
          inset: 0;
          z-index: -1;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(#10b98122 0.5px, transparent 0.5px);
          background-size: 30px 30px;
          mask-image: radial-gradient(circle at 50% 50%, black, transparent 90%);
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 20%, #010401 100%);
        }

        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 200px;
          padding: 0 40px;
        }

        /* Hero */
        .hero {
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        .hero-visual {
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 0 0 100px 100px;
          overflow: hidden;
        }

        .hero-image-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(2px) brightness(0.6);
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, #01040100, #010401);
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 40px;
        }

        .main-logo-wrapper {
          position: relative;
          margin-bottom: 40px;
        }

        .main-logo {
          filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.4));
        }

        .glitch-title {
          font-size: 8rem;
          font-weight: 900;
          letter-spacing: -6px;
          line-height: 0.8;
          margin-bottom: 24px;
        }

        .hero-tagline {
          font-size: 1.8rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .hero-cta-box {
          margin-top: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .launch-button {
          position: relative;
          background: #10b981;
          color: white;
          padding: 24px 60px;
          border-radius: 20px;
          text-decoration: none;
          font-size: 1.4rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(16, 185, 129, 0.5);
        }

        .launch-button:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 30px 60px -15px rgba(16, 185, 129, 0.6);
        }

        .btn-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -150%; }
          100% { left: 150%; }
        }

        .node-status {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }

        .dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* Vision Cards */
        .vision-cards-section {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .cards-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .header-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
        .cards-header h2 { font-size: 3rem; font-weight: 900; letter-spacing: -1px; }

        .vision-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .vision-card {
          position: relative;
          height: 500px;
          border-radius: 40px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          transition: 0.5s;
        }

        .vision-card:hover { transform: translateY(-20px); }
        .vision-card:hover .card-bg-image { transform: scale(1.1); }

        .card-bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, #010401 100%);
        }

        .card-content {
          margin: 30px;
          padding: 40px;
          border-radius: 30px;
          position: relative;
          z-index: 1;
        }

        .card-icon { margin-bottom: 24px; }
        .card-content h3 { font-size: 2rem; font-weight: 900; margin-bottom: 16px; }
        .card-content p { color: #cbd5e1; line-height: 1.6; font-size: 1.1rem; }
        .card-footer-line { position: absolute; bottom: 0; left: 0; height: 4px; width: 0; transition: 0.5s; }
        .vision-card:hover .card-footer-line { width: 100%; }

        /* Bento */
        .tech-bento-section {
          text-align: center;
        }

        .tech-bento-header h2 { font-size: 4rem; font-weight: 900; margin-bottom: 16px; }
        .tech-bento-header p { font-size: 1.4rem; color: #64748b; margin-bottom: 80px; }

        .bento-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .bento-item {
          padding: 32px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          transition: 0.3s;
          background: rgba(255,255,255,0.01);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .bento-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: #10b98133;
          transform: translateY(-5px);
        }

        .bento-icon {
          width: 70px;
          height: 70px;
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bento-meta h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 4px; }
        .bento-meta span { font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; }

        /* Footer */
        .welcome-footer-final {
          padding-bottom: 80px;
          position: relative;
        }

        .footer-blur-bg {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 200px;
          background: #10b98122;
          filter: blur(100px);
          z-index: -1;
        }

        .footer-main {
          padding: 60px;
          border-radius: 50px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 20px;
        }

        .footer-left p { color: #64748b; font-size: 1.1rem; max-width: 300px; }

        .footer-right { display: flex; gap: 80px; }
        .footer-column { display: flex; flex-direction: column; gap: 16px; }
        .footer-column h6 { font-size: 1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #f8fafc; }
        .footer-column a, .footer-column span { color: #64748b; text-decoration: none; font-weight: 600; transition: 0.3s; }
        .footer-column a:hover { color: #10b981; }

        .copyright { text-align: center; color: #475569; font-size: 0.9rem; font-weight: 600; letter-spacing: 1px; }

        /* Helpers */
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .gradient-text { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        @media (max-width: 1200px) {
          .glitch-title { font-size: 6rem; }
          .vision-grid { grid-template-columns: 1fr; }
          .vision-card { height: 400px; }
          .bento-container { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .glitch-title { font-size: 4rem; letter-spacing: -3px; }
          .hero-tagline { font-size: 1.2rem; }
          .footer-main { flex-direction: column; gap: 60px; border-radius: 40px; padding: 40px; }
          .footer-right { gap: 40px; }
        }
      `}</style>
    </main>
  );
}
