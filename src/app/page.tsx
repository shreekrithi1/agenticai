"use client";

import { motion } from "framer-motion";
import { 
  Sprout, 
  Target, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Globe, 
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
  Video
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TECH_STACK = [
  { name: "Gemini 1.5", icon: <Sparkles size={24} />, color: "#4285f4" },
  { name: "Gemma 3", icon: <Database size={24} />, color: "#3b82f6" },
  { name: "Ollama", icon: <Zap size={24} />, color: "#f59e0b" },
  { name: "OpenClaw", icon: <Cpu size={24} />, color: "#ec4899" },
  { name: "Stripe", icon: <CreditCard size={24} />, color: "#635bff" },
  { name: "Face ID", icon: <ScanFace size={24} />, color: "#10b981" },
  { name: "Liveness Check", icon: <UserCheck size={24} />, color: "#34d399" },
  { name: "Anam AI", icon: <Bot size={24} />, color: "#8b5cf6" },
  { name: "Tavus", icon: <Video size={24} />, color: "#ef4444" },
  { name: "Hostinger VPS", icon: <Server size={24} />, color: "#673ab7" },
  { name: "Vercel", icon: <Cloud size={24} />, color: "#ffffff" },
  { name: "Next.js 15", icon: <Layers size={24} />, color: "#ffffff" },
  { name: "React 19", icon: <Code2 size={24} />, color: "#61dafb" }
];

const VALUES = [
  { 
    title: "Mission", 
    desc: "To revolutionize Indian agriculture through sovereign agentic intelligence, ensuring every farmer has access to FAANG-grade insights and autonomous financial rails.",
    icon: <Target className="text-emerald-500" size={32} />,
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  { 
    title: "Vision", 
    desc: "A future where rural prosperity is driven by seamless human-AI collaboration, bridging the digital divide with trust, precision, and sovereign intelligence.",
    icon: <Eye className="text-blue-500" size={32} />,
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
  { 
    title: "Values", 
    desc: "Sovereignty, Precision, Integrity, and a Farmer-First approach. We build for those who feed the world, with transparency and institutional rigor.",
    icon: <ShieldCheck className="text-amber-500" size={32} />,
    gradient: "from-amber-500/20 to-orange-500/20"
  }
];

export default function WelcomePage() {
  return (
    <main className="welcome-page">
      <div className="premium-bg"></div>
      
      <div className="content-container">
        {/* Hero Section */}
        <section className="hero">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="logo-container"
          >
            <div className="logo-wrapper glass float">
              <Image 
                src="/assets/agrimind_logo.png" 
                alt="AgriMind Logo" 
                width={120} 
                height={120}
                className="main-logo"
              />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="title"
          >
            Welcome to <span className="gradient-text">AgriMind</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="subtitle"
          >
            The Sovereign Intelligence Hub for Modern Agriculture
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="cta-container"
          >
            <Link href="/hub" className="cta-button glass">
              <span>Enter AgriMind Hub</span>
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </section>

        {/* Mission Vision Values Section */}
        <section className="mvv-section">
          <div className="section-grid">
            {VALUES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
                className={`mvv-card glass bg-gradient-to-br ${item.gradient}`}
              >
                <div className="card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="tech-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Powered By Cutting-Edge Technology
          </motion.h2>
          
          <div className="tech-grid">
            {TECH_STACK.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="tech-item glass"
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="tech-icon-wrapper" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <span className="tech-name">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="welcome-footer">
          <p>© 2026 AgriMind Sovereign Intelligence. All Rights Reserved.</p>
        </footer>
      </div>

      <style jsx>{`
        .welcome-page {
          min-height: 100vh;
          color: white;
          padding: 60px 20px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .content-container {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 100px;
        }

        .hero {
          text-align: center;
          padding-top: 40px;
        }

        .logo-wrapper {
          width: 160px;
          height: 160px;
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
          padding: 20px;
        }

        .main-logo {
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.3));
        }

        .title {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -2px;
          margin-bottom: 16px;
        }

        .subtitle {
          font-size: 1.4rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 36px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          color: white;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .cta-button:hover {
          background: rgba(16, 185, 129, 0.1);
          border-color: #10b981;
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
        }

        .section-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .mvv-card {
          padding: 40px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: 0.3s;
        }

        .mvv-card:hover {
          transform: translateY(-10px);
        }

        .card-icon {
          background: rgba(0,0,0,0.2);
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mvv-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .mvv-card p {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 1rem;
        }

        .tech-section {
          text-align: center;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 48px;
          color: #f8fafc;
        }

        .tech-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .tech-item {
          padding: 20px 30px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: 0.3s;
        }

        .tech-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: #e2e8f0;
        }

        .welcome-footer {
          text-align: center;
          padding: 40px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          color: #64748b;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .section-grid { grid-template-columns: 1fr; }
          .title { font-size: 3rem; }
        }

        @media (max-width: 640px) {
          .title { font-size: 2.5rem; }
          .subtitle { font-size: 1.1rem; }
          .tech-grid { gap: 12px; }
          .tech-item { padding: 15px 20px; }
        }

        .gradient-text {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </main>
  );
}
