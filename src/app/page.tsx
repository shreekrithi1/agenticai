"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  Globe, 
  Cpu, 
  Send, 
  Copy, 
  RotateCcw, 
  ThumbsUp, 
  ChevronDown,
  Sprout,
  Menu,
  X,
  Bell,
  Sun,
  MapPin,
  Settings,
  LogOut,
  Phone,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowLeft,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type?: "text" | "status" | "thought";
}

const QUICK_ACTIONS = [
  { label: "Cotton", text: "Cotton analysis for Maharashtra", icon: <Sprout size={14} /> },
  { label: "Soil", text: "Soil profile: Guntur, AP", icon: <Globe size={14} /> },
  { label: "Crop", text: "Best crop for black soil", icon: <Sun size={14} /> },
  { label: "Wheat", text: "Wheat roadmap: Punjab", icon: <MapPin size={14} /> }
];

const COUNTRIES = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+61", name: "Australia", flag: "🇦🇺" }
];

export default function Home() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I am **AgriMind**, your institutional agriculture intelligence. I'm connected to a **Hostinger VPS** running **Gemma 3 (4B)**. \n\nTell me your location in India, and I'll provide a precision analysis of soil, climate, and cultivation roadmaps.",
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [cultivationPlan, setCultivationPlan] = useState<any>(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [language, setLanguage] = useState("English");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [userLocation, setUserLocation] = useState<{ city: string; temp: string; status: string; humidity?: string; wind?: string; source?: string; lastSync?: string } | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isProcessing, isPlanning]);


  useEffect(() => {
    if (view === "app" && !userLocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`/api/weather?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
          const data = await res.json();
          if (data.city) setUserLocation(data);
        } catch (e) {
          console.error("Weather fetch failed");
        }
      });
    }
  }, [view]);


  const handleGeneratePlan = async () => {
    if (!prediction || isPlanning) return;
    setIsPlanning(true);
    setCultivationPlan(null);
    const userMsg = messages.findLast(m => m.role === 'user')?.content || "";
    const cleanLocation = userMsg.replace(/Location Analysis: /g, "").trim();

    setMessages(prev => [...prev, { role: "user", content: `Synthesize detailed cultivation roadmap for ${prediction.bestCrop}.`, type: "text" }]);

    try {
      const response = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query: prediction.bestCrop, 
          location: cleanLocation,
          type: "cultivation",
          language: language
        }),
      });

      const data = await response.json();
      if (data.plan) {
        setCultivationPlan(data.plan);
        setMessages(prev => [...prev, { role: "assistant", content: language === "English" ? "Institutional roadmap synthesized successfully." : "సాగు ప్రణాళిక రూపొందించబడింది.", type: "status" }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Failed to generate roadmap. Check VPS connection.", type: "text" }]);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent, overrideInput?: string) => {
    e?.preventDefault();
    const query = overrideInput || input;
    if (!query.trim() || isProcessing) return;

    setInput("");
    setPrediction(null);
    setCultivationPlan(null);
    setMessages(prev => [...prev, { role: "user", content: query, type: "text" }]);
    setIsProcessing(true);

    try {
      const response = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, language: language }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: "assistant", content: `Error: ${data.error}`, type: "text" }]);
      } else {
        if (data.steps) {
          for (const step of data.steps) {
            if (step.thought) {
              setMessages(prev => [...prev, { role: "system", content: step.thought, type: "thought" }]);
              await new Promise(r => setTimeout(r, 600));
            }
            setMessages(prev => [...prev, { role: "assistant", content: step.message, type: "status" }]);
          }
        }
        if (data.prediction) {
          setPrediction(data.prediction);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Agri-Intelligence engine encountered an error. Is Hostinger VPS online?", type: "text" }]);
    } finally {
      setIsProcessing(false);
    }
  };

  if (view === "landing") {
    return (
      <main className="hub-page">
        <div className="hub-container fade-in">
          <header className="hub-header">
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="hub-brand"
            >
              <Cpu size={32} color="#10b981" />
              <h1>AgriMind <span className="gradient-text">Beyond</span></h1>
            </motion.div>
            <p className="hub-subtitle">Institutional Orchestration Hub</p>
          </header>

          <div className="hub-grid">
            {/* Market Intelligence */}
            <div className="hub-group">
              <div className="group-label">Market Intelligence</div>
              <div className="compact-pair">
                <Link href="/stocks?type=india" className="compact-card">
                  <div className="card-image sm" style={{ backgroundImage: "url('/assets/india_stocks.png')" }}>
                    <div className="card-badge sm">26 APR</div>
                  </div>
                  <div className="card-accent-bar blue sm">
                    <span>INDIA NIFTY 100</span>
                    <Zap size={12} />
                  </div>
                  <div className="card-body sm">
                    <h3>Bharat Velocity</h3>
                    <p>Institutional 2s telemetry.</p>
                    <button className="read-more blue-text sm">Launch</button>
                  </div>
                </Link>

                <Link href="/stocks?type=top" className="compact-card">
                  <div className="card-image sm" style={{ backgroundImage: "url('/assets/us_stocks.png')" }}>
                    <div className="card-badge sm">26 APR</div>
                  </div>
                  <div className="card-accent-bar orange sm">
                    <span>US FORTUNE 20</span>
                    <Zap size={12} />
                  </div>
                  <div className="card-body sm">
                    <h3>Wall Street Intel</h3>
                    <p>Global tech execution signals.</p>
                    <button className="read-more orange-text sm">Launch</button>
                  </div>
                </Link>
              </div>
            </div>

            {/* Agri Intelligence */}
            <div className="hub-group">
              <div className="group-label">Agri Intelligence</div>
              <div className="compact-pair">
                <div className="compact-card" onClick={() => setView("app")}>
                  <div className="card-image sm" style={{ backgroundImage: "url('/assets/india_agri.png')" }}>
                    <div className="card-badge sm">26 APR</div>
                  </div>
                  <div className="card-accent-bar green sm">
                    <span>BHARAT SOIL</span>
                    <Sparkles size={12} />
                  </div>
                  <div className="card-body sm">
                    <h3>Soil Matrix</h3>
                    <p>Predictive regional modeling.</p>
                    <button className="read-more green-text sm">Launch</button>
                  </div>
                </div>

                <div className="compact-card" onClick={() => setView("app")}>
                  <div className="card-image sm" style={{ backgroundImage: "url('/assets/us_agri.png')" }}>
                    <div className="card-badge sm">26 APR</div>
                  </div>
                  <div className="card-accent-bar green sm">
                    <span>US PRECISION AG</span>
                    <Sparkles size={12} />
                  </div>
                  <div className="card-body sm">
                    <h3>Ag-Tech Pro</h3>
                    <p>Advanced climate grounding.</p>
                    <button className="read-more green-text sm">Launch</button>
                  </div>
                </div>
              </div>
            </div>

            <footer className="hub-footer">
              <div className="footer-inline">
                <div className="powered-label">ORCHESTRATED BY</div>
                <div className="tech-stack">
                  <div className="tech-item next">
                    <span className="tech-icon sm">▲</span>
                    <span className="tech-name">Next.js 15</span>
                  </div>
                  <div className="tech-item react">
                    <div className="tech-icon atom sm">⚛</div>
                    <span className="tech-name">React 19</span>
                  </div>
                  <div className="tech-item claw">
                    <Wind size={24} className="tech-icon" color="#ec4899" />
                    <span className="tech-name">OpenClaw</span>
                  </div>
                  <div className="tech-item gemma">
                    <Cpu size={24} className="tech-icon" />
                    <span className="tech-name">Gemma 3</span>
                  </div>
                  <div className="tech-item ollama">
                    <Zap size={24} className="tech-icon" />
                    <span className="tech-name">Ollama</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <style jsx>{`
          .hub-page { height: 100vh; background: #f8fafc; color: #1a1a1a; padding: 20px; font-family: 'Outfit', sans-serif; display: flex; align-items: center; justify-content: center; overflow: hidden; }
          .hub-container { width: 100%; max-width: 1000px; }
          
          .hub-header { text-align: center; margin-bottom: 30px; }
          .hub-brand { display: flex; align-items: center; gap: 12px; justify-content: center; margin-bottom: 4px; }
          .hub-brand h1 { font-size: 2.2rem; font-weight: 900; letter-spacing: -1.5px; margin: 0; }
          .hub-subtitle { font-size: 0.9rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
          
          .hub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
          .hub-group { display: flex; flex-direction: column; gap: 12px; }
          .group-label { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; }
          
          .compact-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          
          .compact-card { 
            background: #fff; 
            border-radius: 8px; 
            overflow: hidden; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
            text-decoration: none; 
            color: inherit;
            transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
            border: 1px solid #f1f5f9;
          }
          .compact-card:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); border-color: #cbd5e1; }

          .card-image.sm { height: 100px; background-size: cover; background-position: center; position: relative; }
          .card-badge.sm { position: absolute; top: 0; right: 0; background: #3b82f6; color: #fff; padding: 4px 10px; font-size: 0.55rem; font-weight: 900; }
          
          .card-accent-bar.sm { padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; color: #fff; font-size: 0.6rem; font-weight: 900; letter-spacing: 0.5px; }
          .card-accent-bar.blue { background: #3b82f6; }
          .card-accent-bar.orange { background: #f59e0b; }
          .card-accent-bar.green { background: #10b981; }
          .card-accent-bar.red { background: #bb1919; }
          
          .card-body.sm { padding: 16px; display: flex; flex-direction: column; gap: 8px; }
          .card-body.sm h3 { font-size: 1rem; font-weight: 800; color: #0f172a; margin: 0; }
          .card-body.sm p { font-size: 0.75rem; color: #64748b; line-height: 1.4; margin: 0; }
          
          .read-more.sm { background: transparent; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 4px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; cursor: pointer; transition: 0.2s; width: fit-content; margin-top: 4px; }
          .read-more:hover { background: #f8fafc; border-color: #cbd5e1; }
          
          .blue-text { color: #3b82f6; }
          .orange-text { color: #f59e0b; }
          .green-text { color: #10b981; }
          .red-text { color: #bb1919; }
          
          .compact-pair.full-width { grid-template-columns: 1fr; }
          .card-badge.sm.red { background: #bb1919; }

          .gradient-text { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .fade-in { animation: fadeIn 0.8s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

          .hub-footer { margin-top: 80px; padding: 20px 0; border-top: 1px solid rgba(0,0,0,0.05); }
          .footer-inline { display: flex; align-items: center; justify-content: center; gap: 40px; }
          .powered-label { font-size: 0.65rem; font-weight: 900; color: #1e293b; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; white-space: nowrap; }
          .tech-stack { display: flex; align-items: center; gap: 32px; }
          .tech-item { display: flex; align-items: center; gap: 10px; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
          .tech-item:hover { transform: translateY(-2px) scale(1.05); }
          
          .tech-icon { font-size: 1.5rem; display: flex; align-items: center; justify-content: center; }
          .tech-icon.sm { font-size: 1.2rem; }
          .tech-icon.atom { color: #61dafb; animation: spin 10s linear infinite; font-size: 1.4rem; }
          .tech-name { font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }

          .tech-item.next .tech-icon { color: #000; }
          .tech-item.gemma .tech-icon { color: #3b82f6; }
          .tech-item.ollama .tech-icon { color: #f59e0b; }
          .tech-item.claw .tech-icon { color: #ec4899; }

          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </main>
    );
  }

  return (
    <main className="chat-container dark">
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="new-chat-btn" onClick={() => setView("landing")}>
            <ArrowLeft size={16} />
            <span>Return to Hub</span>
          </div>
        </div>
        
        <div className="sidebar-scroll">
          <div className="sidebar-section">
            <div className="section-label">Institutional History</div>
            <div className="history-item active">
              <MessageSquare size={16} />
              <span>Current Analysis</span>
            </div>
            <Link href="/stocks" className="history-item link-item">
              <TrendingUp size={16} color="#10b981" />
              <span>Stock Analysis</span>
            </Link>
          </div>


          {userLocation && (
            <div className="sidebar-section">
              <div className="section-label">Local Climate Monitoring</div>
              <div className="weather-widget glass">
                <div className="weather-main">
                  <div className="temp">{userLocation.temp}</div>
                  <div className="condition">
                    <Sun size={16} color="#f59e0b" />
                    <span>{userLocation.status}</span>
                  </div>
                </div>
                <div className="location">
                  <MapPin size={12} />
                  <span>{userLocation.city}</span>
                </div>
                {userLocation.humidity && (
                  <div className="weather-meta fade-in">
                    <div className="meta-item">💧 {userLocation.humidity}</div>
                    <div className="meta-item">💨 {userLocation.wind}</div>
                    <div className="sync-info">
                       <span className="source-label">{userLocation.source}</span>
                       <span className="sync-timestamp">Sync: {userLocation.lastSync}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="vps-badge">
            <Cpu size={14} /> <span>Gemma-3-Node</span>
            <div className="status-dot pulse"></div>
          </div>
        </div>
      </div>

      <div className="chat-main">

        <header className="chat-header">
          {!sidebarOpen && <button className="menu-trigger" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>}
          <div className="model-selector">
            <span>AgriMind BEYOND</span>
            <ChevronDown size={14} />
          </div>
          <div className="lang-pill glass">
            <Globe size={14} />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Hindi">हिन्दी</option>
            </select>
          </div>
        </header>

        <div className="messages-viewport" ref={scrollRef}>
          <div className="messages-list">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                <div className="message-container">
                  <div className="message-avatar">
                    {msg.role === 'user' ? '👤' : <Sprout size={20} color="#10b981" />}
                  </div>
                  <div className="message-body">
                    <div className="message-text">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    {msg.role === 'assistant' && (
                      <div className="message-actions">
                        <button className="action-btn"><Copy size={14} /></button>
                        <button className="action-btn"><RotateCcw size={14} /></button>
                        <button className="action-btn"><ThumbsUp size={14} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {(isProcessing || isPlanning) && (
              <div className="message-row assistant">
                <div className="message-container">
                  <div className="message-avatar"><Sprout size={20} color="#10b981" /></div>
                  <div className="message-body">
                    <div className="typing-loader">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {prediction && (
              <div className="message-row assistant">
                <div className="message-container">
                  <div className="message-avatar"><Cpu size={20} color="#10b981" /></div>
                  <div className="message-body">
                    <div className="institutional-card glass-v2 fade-in">
                      <div className="card-header">
                        <div className="header-top">
                          <span className="card-label">{prediction.isGeneral ? "General Intelligence" : "Precision Analysis Prediction"}</span>
                          {!prediction.isGeneral && <span className="conf-pill">{prediction.probability} Match</span>}
                        </div>
                        <h2>{prediction.bestCrop}</h2>
                      </div>
                      <div className="card-content">
                        <div className="card-reasoning" style={{ fontSize: prediction.isGeneral ? '1rem' : '0.95rem', lineHeight: '1.6' }}>
                          <ReactMarkdown>{prediction.reasoning}</ReactMarkdown>
                        </div>
                        {!prediction.isGeneral && (
                          <div className="data-grid">
                            <div className="data-item">
                              <span className="data-label">Soil Matrix</span>
                              <span className="data-value">{prediction.soil?.type}</span>
                            </div>
                            <div className="data-item">
                              <span className="data-label">PH Balance</span>
                              <span className="data-value">{prediction.soil?.pH}</span>
                            </div>
                            <div className="data-item">
                              <span className="data-label">Current Climate</span>
                              <span className="data-value">{prediction.weather?.temp} / {prediction.weather?.status}</span>
                            </div>
                            <div className="data-item">
                              <span className="data-label">Nutrient Load</span>
                              <span className="data-value">{prediction.soil?.nutrients}</span>
                            </div>
                          </div>
                        )}
                        {!prediction.isGeneral && !cultivationPlan ? (
                          <button className="btn-roadmap-launch" onClick={handleGeneratePlan} disabled={isPlanning}>
                            {isPlanning ? 'Synthesizing Vectors...' : 'Synthesize Institutional Roadmap'}
                          </button>
                        ) : (
                          <div className="roadmap-reveal fade-in">
                            <h4 className="roadmap-title">Cultivation Vector Roadmap</h4>
                            <div className="roadmap-steps">
                              {cultivationPlan?.phases?.map((p: any, idx: number) => (
                                <div key={idx} className="roadmap-node glass">
                                  <div className="node-icon">{idx + 1}</div>
                                  <div className="node-text">
                                    <div className="node-name">{p.name}</div>
                                    <div className="node-task">{p.task}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="chat-footer">
          <div className="input-capsule-wrapper">
            {messages.length < 3 && !prediction && (
              <div className="suggestions-rail">
                {QUICK_ACTIONS.map(a => (
                  <button key={a.label} className="suggestion-pill" onClick={() => handleSubmit(undefined, a.text)}>
                    <span className="pill-icon">{a.icon}</span>
                    <span className="pill-text">{a.label}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="premium-input-box">
              <form onSubmit={handleSubmit} className="input-flex">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your farm location..."
                  className="chat-field"
                />
                <button type="submit" className={`circle-send-btn ${input ? 'active' : ''}`} disabled={isProcessing}>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
          <div className="footer-disclaimer">
            AgriMind BEYOND (Gemma 3 Core). Institutional advice grounded by real-time climate data.
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-container { display: flex; height: 100vh; background: #212121; color: #ececec; font-family: 'Inter', system-ui, -apple-system, sans-serif; overflow: hidden; }
        .sidebar { width: 300px; background: #171717; height: 100%; display: flex; flex-direction: column; transition: 0.3s; border-right: 1px solid rgba(255,255,255,0.05); }
        .sidebar.closed { width: 0; overflow: hidden; }
        .sidebar-header { padding: 20px; display: flex; gap: 8px; }
        .new-chat-btn { flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: #fff; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
        .toggle-sidebar { padding: 10px; border-radius: 8px; color: #666; cursor: pointer; }
        .history-item { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 8px; font-size: 0.85rem; color: #888; cursor: pointer; transition: 0.2s; text-decoration: none; }
        .history-item.active { background: rgba(255,255,255,0.05); color: #fff; }
        .history-item:hover { background: rgba(255,255,255,0.03); color: #fff; }
        .link-item { border: 1px dashed rgba(16,185,129,0.2); margin-top: 4px; }
        .link-item:hover { border-style: solid; border-color: #10b981; }

        .sidebar-scroll { flex: 1; padding: 0 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .section-label { font-size: 0.65rem; color: #555; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1.5px; }
        

        .weather-widget { padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); }
        .weather-main { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .temp { font-size: 1.5rem; font-weight: 900; color: #fff; }
        .condition { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; color: #f59e0b; }
        .location { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #666; font-weight: 600; margin-bottom: 8px; }
        .weather-meta { display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid rgba(255,255,255,0.05); pt: 8px; margin-top: 8px; }
        .meta-item { font-size: 0.65rem; color: #888; font-weight: 700; }
        .sync-info { width: 100%; display: flex; flex-direction: column; gap: 2px; margin-top: 4px; }
        .source-label { font-size: 0.55rem; color: #444; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
        .sync-timestamp { font-size: 0.55rem; color: #10b981; font-weight: 700; }

        .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .vps-badge { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; color: #666; }
        .status-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; }
        .pulse { animation: pulseAnim 2s infinite; }

        .chat-main { flex: 1; display: flex; flex-direction: column; background: #212121; }
        .chat-header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .model-selector { display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer; }
        .lang-pill select { background: transparent; border: none; color: #fff; outline: none; }

        .messages-viewport { flex: 1; overflow-y: auto; }
        .messages-list { max-width: 800px; margin: 0 auto; }
        .message-row { width: 100%; padding: 32px 0; border-bottom: 1px solid rgba(255,255,255,0.02); }
        .message-container { max-width: 768px; margin: 0 auto; display: flex; gap: 24px; padding: 0 20px; }
        .message-avatar { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .message-text { font-size: 1rem; line-height: 1.6; }
        .message-actions { display: flex; gap: 12px; margin-top: 12px; opacity: 0; }
        .message-row:hover .message-actions { opacity: 1; }
        .action-btn { background: transparent; border: none; color: #555; cursor: pointer; }
        .action-btn:hover { color: #fff; }

        .typing-loader { display: flex; gap: 4px; padding: 12px 0; }
        .typing-loader span { width: 5px; height: 5px; background: #666; border-radius: 50%; animation: bounce 1.4s infinite; }
        .typing-loader span:nth-child(2) { animation-delay: 0.2s; }
        .typing-loader span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }

        .institutional-card { background: #2f2f2f; border-radius: 12px; padding: 32px; border: 1px solid rgba(255,255,255,0.1); margin-top: 12px; }
        .institutional-card h2 { font-size: 2.2rem; font-weight: 900; margin: 8px 0 20px 0; }
        .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
        .data-item { background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; }
        .data-label { font-size: 0.6rem; color: #666; text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 4px; }
        .data-value { font-size: 0.95rem; font-weight: 700; color: #fff; }
        .btn-roadmap-launch { width: 100%; padding: 16px; background: #10b981; color: #000; border: none; border-radius: 12px; font-weight: 900; cursor: pointer; }

        .roadmap-node { display: flex; gap: 20px; padding: 20px; border-radius: 12px; background: rgba(0,0,0,0.2); margin-top: 12px; }
        .node-icon { width: 30px; height: 30px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; color: #000; flex-shrink: 0; }
        .node-name { font-weight: 800; color: #10b981; margin-bottom: 4px; }
        .node-task { font-size: 0.85rem; color: #999; line-height: 1.5; }

        .chat-footer { padding: 20px 20px 40px 20px; background: linear-gradient(to top, #212121 80%, transparent); }
        .input-capsule-wrapper { max-width: 768px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 16px; }
        
        .suggestions-rail { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; animation: fadeInUp 0.4s ease; }
        .suggestion-pill { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #2f2f2f; border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; color: #ececec; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .suggestion-pill:hover { background: #383838; border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
        .pill-icon { color: #10b981; display: flex; }
        
        .premium-input-box { background: #2f2f2f; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 8px 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: 0.3s; }
        .premium-input-box:focus-within { border-color: rgba(255,255,255,0.25); box-shadow: 0 15px 40px rgba(0,0,0,0.5); }
        .input-flex { display: flex; align-items: center; gap: 12px; }
        .chat-field { flex: 1; background: transparent; border: none; color: #fff; outline: none; padding: 12px 8px; font-size: 1rem; font-weight: 500; }
        .circle-send-btn { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: none; background: #444; color: #888; cursor: pointer; transition: 0.3s; }
        .circle-send-btn.active { background: #fff; color: #000; transform: scale(1.1); }
        .circle-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .footer-disclaimer { font-size: 0.65rem; color: #555; text-align: center; margin-top: 16px; font-weight: 600; letter-spacing: 0.02em; }

        .card-reasoning :global(p) { margin-bottom: 16px; }
        .card-reasoning :global(p:last-child) { margin-bottom: 0; }
        .card-reasoning :global(ul), .card-reasoning :global(ol) { margin-left: 20px; margin-bottom: 16px; }
        .card-reasoning :global(li) { margin-bottom: 8px; }
        .card-reasoning :global(strong) { color: #fff; font-weight: 800; }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </main>
  );
}
