"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Search, 
  Globe, 
  Clock, 
  ArrowLeft,
  Share2,
  TrendingUp,
  Cpu,
  Zap,
  Filter,
  CheckCircle2,
  AlertCircle,
  Activity
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Marathi", "Bengali"];
const CATEGORIES = ["All Intelligence", "India", "Technology", "Agriculture", "Business", "World"];

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  timestamp: string;
  image: string;
  source: string;
  region: string;
  factCheckScore: number;
}

export default function TruthVelocityNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("All Intelligence");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchNews = async () => {
    try {
      const catParam = category === "All Intelligence" ? "Top Stories" : category;
      const res = await fetch(`/api/news?lang=${language}&cat=${catParam}`);
      const data = await res.json();
      setNews(data);
      setLoading(false);
    } catch (e) {
      console.error("News fetch failed");
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5000);
    return () => clearInterval(interval);
  }, [language, category]);

  const getTimeAgo = (timestamp: string) => {
    const diff = Math.floor((currentTime.getTime() - new Date(timestamp).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <main className="truth-container">
      {/* Dynamic Navigation */}
      <nav className="truth-nav">
        <div className="nav-blur"></div>
        <div className="nav-content">
          <Link href="/" className="truth-brand">
            <Activity className="brand-icon" size={32} />
            <div className="brand-text">
              <span className="title">TRUTH <span className="accent">VELOCITY</span></span>
              <span className="tagline">Bharat Intelligence Node</span>
            </div>
          </Link>

          <div className="nav-controls">
            <div className="search-pill">
              <Search size={16} />
              <input type="text" placeholder="Audit news..." />
            </div>
            <div className="lang-toggle">
              <Globe size={14} />
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <Link href="/" className="exit-node"><ArrowLeft size={18} /></Link>
          </div>
        </div>
      </nav>

      {/* Hero Pulse */}
      <section className="truth-hero">
        <div className="hero-content">
          <div className="live-status">
            <div className="pulse-circle"></div>
            <span>LIVE INTEEMETRY • SYNCED TO THE SECOND</span>
          </div>
          <h1>Decentralized News <span className="gradient-text">Audit</span></h1>
          <div className="category-rail">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`cat-pill ${category === cat ? "active" : ""}`}
                onClick={() => { setCategory(cat); setLoading(true); }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Feed */}
      <section className="intelligence-feed">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${language}-${category}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="feed-grid"
          >
            {news.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="intel-card"
              >
              <div className="card-media" style={{ backgroundImage: `url(${item.image})` }}>
                <div className="media-overlay"></div>
                <div className="fact-check-gauge">
                  <div className="gauge-label">FACT AUDIT</div>
                  <div className="gauge-value" style={{ color: item.factCheckScore > 9 ? "#10b981" : "#f59e0b" }}>
                    {item.factCheckScore}<span className="small">/10</span>
                  </div>
                  <div className="gauge-bar">
                    <div className="fill" style={{ width: `${item.factCheckScore * 10}%`, background: item.factCheckScore > 9 ? "#10b981" : "#f59e0b" }}></div>
                  </div>
                </div>
                <div className="time-badge">{getTimeAgo(item.timestamp)}</div>
              </div>
              <div className="card-content">
                <div className="content-top">
                  <span className="cat-tag">{item.category}</span>
                  <span className="region-tag">{item.region}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="content-footer">
                  <div className="source-info">
                    <ShieldCheck size={14} color="#10b981" />
                    <span>Verified: {item.source}</span>
                  </div>
                  <button className="audit-btn">Full Audit</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;900&display=swap');

        .truth-container { min-height: 100vh; background: #0a0a0b; color: #fff; font-family: 'Outfit', sans-serif; padding-bottom: 100px; }
        
        .truth-nav { position: sticky; top: 0; z-index: 1000; height: 80px; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-blur { position: absolute; inset: 0; background: rgba(10,10,11,0.8); backdrop-filter: blur(20px); }
        .nav-content { position: relative; width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 40px; display: flex; justify-content: space-between; align-items: center; }
        
        .truth-brand { display: flex; align-items: center; gap: 16px; text-decoration: none; color: #fff; }
        .brand-icon { color: #10b981; filter: drop-shadow(0 0 10px rgba(16,185,129,0.3)); }
        .brand-text { display: flex; flex-direction: column; }
        .brand-text .title { font-size: 1.4rem; font-weight: 900; letter-spacing: -1px; }
        .brand-text .accent { color: #10b981; }
        .brand-text .tagline { font-size: 0.6rem; text-transform: uppercase; letter-spacing: 2px; color: #666; font-weight: 800; }

        .nav-controls { display: flex; align-items: center; gap: 24px; }
        .search-pill { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 100px; display: flex; align-items: center; gap: 10px; width: 250px; }
        .search-pill input { background: transparent; border: none; color: #fff; outline: none; font-size: 0.85rem; width: 100%; }
        .lang-toggle { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 700; color: #888; }
        .lang-toggle select { background: transparent; border: none; color: #fff; outline: none; cursor: pointer; }
        .exit-node { color: #666; transition: 0.3s; }
        .exit-node:hover { color: #fff; transform: translateX(-4px); }

        .truth-hero { padding: 100px 40px 60px; max-width: 1400px; margin: 0 auto; text-align: center; }
        .live-status { display: inline-flex; align-items: center; gap: 10px; background: rgba(16,185,129,0.1); padding: 8px 16px; border-radius: 100px; color: #10b981; font-size: 0.65rem; font-weight: 900; letter-spacing: 1.5px; margin-bottom: 32px; }
        .pulse-circle { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }
        
        .truth-hero h1 { font-size: 4.5rem; font-weight: 900; letter-spacing: -4px; margin-bottom: 40px; }
        .gradient-text { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .category-rail { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .cat-pill { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 12px 24px; border-radius: 100px; color: #888; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .cat-pill:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .cat-pill.active { background: #10b981; color: #000; border-color: #10b981; }

        .intelligence-feed { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .feed-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        
        .intel-card { 
          background: #212121; 
          border-radius: 12px; 
          overflow: hidden; 
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
          box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
        }
        .intel-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 6px 6px rgba(0,0,0,0.3);
          background: #2a2a2a;
          border-color: rgba(255,255,255,0.1);
        }
        
        .card-media { height: 220px; background-size: cover; background-position: center; position: relative; }
        .media-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 70%, rgba(33,33,33,1) 100%); }
        
        .fact-check-gauge { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }
        .gauge-label { font-size: 0.5rem; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 2px; }
        .gauge-value { font-size: 1rem; font-weight: 900; color: #10b981; }
        
        .time-badge { position: absolute; top: 12px; left: 12px; background: #fff; color: #000; padding: 4px 10px; border-radius: 4px; font-size: 0.6rem; font-weight: 900; }

        .card-content { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .cat-tag { font-size: 0.65rem; font-weight: 900; color: #10b981; text-transform: uppercase; margin-bottom: 8px; }
        .card-content h3 { font-size: 1.2rem; font-weight: 700; line-height: 1.4; margin-bottom: 12px; color: #fff; }
        .card-content p { font-size: 0.9rem; color: #aaa; line-height: 1.6; margin-bottom: 20px; flex: 1; }
        
        .content-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; }
        .source-info { font-size: 0.7rem; color: #666; font-weight: 600; }
        .audit-btn { background: transparent; border: 1px solid rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 8px; color: #fff; font-size: 0.7rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .audit-btn:hover { background: rgba(255,255,255,0.05); border-color: #fff; }

        @media (max-width: 900px) {
          .truth-hero h1 { font-size: 3rem; }
          .feed-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
