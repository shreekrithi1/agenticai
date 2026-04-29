"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
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
  X
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type?: "text" | "status" | "thought";
}

const QUICK_ACTIONS = [
  "Cotton analysis for Maharashtra",
  "Soil profile: Guntur, AP",
  "Best crop for black soil",
  "Wheat roadmap: Punjab"
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isProcessing, isPlanning]);

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
      <main className="landing-page">
        <div className="hero-bg" style={{ backgroundImage: `url('/agrimind_hero.png')` }}></div>
        <div className="hero-overlay"></div>
        <div className="landing-content fade-in">
          <div className="brand-badge">Sovereign Agri-Intelligence</div>
          <h1 className="hero-title">The Future of <span className="gradient-text">Precision Agriculture</span></h1>
          <p className="hero-subtitle">Harnessing VPS-hosted Gemma 3 to provide location-specific crop intelligence in 25+ Indian languages.</p>
          <button className="btn-primary-glow" onClick={() => setView("app")}>Launch Agri-Brain PRO</button>
        </div>
        <style jsx>{`
          .landing-page { height: 100vh; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; color: #fff; text-align: center; }
          .hero-bg { position: absolute; width: 100%; height: 100%; background-size: cover; z-index: -2; animation: zoomOut 20s infinite alternate; }
          .hero-overlay { position: absolute; width: 100%; height: 100%; background: radial-gradient(circle, rgba(2,6,2,0.4) 0%, rgba(2,6,2,0.95) 100%); z-index: -1; }
          .landing-content { max-width: 800px; padding: 40px; z-index: 1; }
          .hero-title { font-size: 4.5rem; font-weight: 900; margin-bottom: 24px; letter-spacing: -2px; }
          .gradient-text { background: linear-gradient(135deg, #10b981, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .hero-subtitle { font-size: 1.2rem; color: rgba(255,255,255,0.7); margin-bottom: 48px; line-height: 1.6; }
          .btn-primary-glow { padding: 20px 48px; background: #10b981; color: #020602; border: none; border-radius: 20px; font-weight: 900; font-size: 1.2rem; cursor: pointer; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4); transition: 0.3s; }
          .btn-primary-glow:hover { transform: translateY(-5px) scale(1.02); }
          @keyframes zoomOut { from { transform: scale(1.1); } to { transform: scale(1); } }
        `}</style>
      </main>
    );
  }

  return (
    <main className="chat-container dark">
      {/* ChatGPT-style Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={() => { setMessages([]); setPrediction(null); setCultivationPlan(null); }}>
            <Plus size={18} /> New Analysis
          </button>
          <button className="toggle-sidebar" onClick={() => setSidebarOpen(false)}>
             <Menu size={20} />
          </button>
        </div>
        
        <div className="sidebar-history">
          <div className="history-label">Recent Searches</div>
          <div className="history-item active">
            <MessageSquare size={16} />
            <span>Cotton Analysis: Maharashtra</span>
          </div>
          <div className="history-item">
            <MessageSquare size={16} />
            <span>Soil Profile: Guntur, AP</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="vps-badge">
            <Cpu size={14} /> <span>Gemma-3-4B-Node</span>
            <div className="status-dot pulse"></div>
          </div>
        </div>
      </div>

      <div className="chat-main">
        {/* ChatGPT Top Header */}
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
                          <span className="card-label">Precision Analysis Prediction</span>
                          <span className="conf-pill">{prediction.probability} Match</span>
                        </div>
                        <h2>{prediction.bestCrop}</h2>
                      </div>
                      
                      <div className="card-content">
                        <p className="card-reasoning">{prediction.reasoning}</p>
                        
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

                        {!cultivationPlan ? (
                          <button className="btn-roadmap-launch" onClick={handleGeneratePlan} disabled={isPlanning}>
                            {isPlanning ? 'Synthesizing Vectors...' : 'Synthesize Institutional Roadmap'}
                          </button>
                        ) : (
                          <div className="roadmap-reveal fade-in">
                            <h4 className="roadmap-title">Cultivation Vector Roadmap</h4>
                            <div className="roadmap-steps">
                              {cultivationPlan.phases.map((p: any, idx: number) => (
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
              <div className="suggestions">
                {QUICK_ACTIONS.map(a => (
                  <button key={a} className="suggestion-btn" onClick={() => handleSubmit(undefined, a)}>{a}</button>
                ))}
              </div>
            )}
            <div className="input-capsule">
              <form onSubmit={handleSubmit} className="input-form">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your farm location..."
                  className="main-input"
                />
                <button type="submit" className={`submit-btn ${input ? 'active' : ''}`} disabled={isProcessing}>
                  <Send size={18} />
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
        
        /* Sidebar ChatGPT Style */
        .sidebar { width: 260px; background: #171717; height: 100%; display: flex; flex-direction: column; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebar.closed { width: 0; overflow: hidden; }
        .sidebar-header { padding: 12px; display: flex; gap: 8px; }
        .new-chat-btn { flex: 1; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; background: transparent; color: #fff; font-size: 0.85rem; font-weight: 500; cursor: pointer; transition: 0.2s; }
        .new-chat-btn:hover { background: rgba(255,255,255,0.05); }
        .toggle-sidebar { padding: 8px; border-radius: 6px; color: #9b9b9b; cursor: pointer; border: 1px solid rgba(255,255,255,0.1); }
        .toggle-sidebar:hover { background: rgba(255,255,255,0.05); color: #fff; }

        .sidebar-history { flex: 1; padding: 12px; overflow-y: auto; }
        .history-label { font-size: 0.75rem; color: #666; font-weight: 600; margin-bottom: 8px; padding: 0 12px; }
        .history-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 6px; font-size: 0.85rem; color: #ececec; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .history-item:hover { background: #2f2f2f; }
        .history-item.active { background: #2f2f2f; }

        .sidebar-footer { padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); }
        .vps-badge { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #9b9b9b; padding: 8px; }
        .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
        .pulse { animation: pulseAnim 2s infinite; }
        @keyframes pulseAnim { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }

        /* Main Chat Area */
        .chat-main { flex: 1; display: flex; flex-direction: column; background: #212121; position: relative; }
        .chat-header { height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .menu-trigger { padding: 8px; color: #9b9b9b; cursor: pointer; border-radius: 6px; }
        .menu-trigger:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .model-selector { display: flex; align-items: center; gap: 8px; font-size: 1.1rem; font-weight: 600; color: #fff; cursor: pointer; padding: 8px 12px; border-radius: 8px; }
        .model-selector:hover { background: rgba(255,255,255,0.05); }
        .lang-pill { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; padding: 6px 12px; border-radius: 20px; }
        .lang-pill select { background: transparent; border: none; color: #fff; outline: none; }

        .messages-viewport { flex: 1; overflow-y: auto; padding-top: 20px; }
        .messages-list { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; }
        .message-row { width: 100%; padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.02); }
        .message-row.user { background: transparent; }
        .message-row.assistant { background: transparent; }
        .message-container { max-width: 768px; margin: 0 auto; display: flex; gap: 24px; padding: 0 20px; }
        .message-avatar { width: 30px; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .message-body { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .message-text { font-size: 1rem; line-height: 1.6; color: #d1d1d1; }
        
        .message-actions { display: flex; gap: 12px; margin-top: 8px; opacity: 0; transition: 0.2s; }
        .message-row:hover .message-actions { opacity: 1; }
        .action-btn { background: transparent; border: none; color: #666; cursor: pointer; padding: 4px; border-radius: 4px; }
        .action-btn:hover { background: rgba(255,255,255,0.05); color: #fff; }

        .typing-loader { display: flex; gap: 4px; padding: 12px 0; }
        .typing-loader span { width: 6px; height: 6px; background: #666; border-radius: 50%; animation: bounce 1.4s infinite; }
        .typing-loader span:nth-child(2) { animation-delay: 0.2s; }
        .typing-loader span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }

        /* Institutional Card Style */
        .institutional-card { background: #2f2f2f; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px; margin-top: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .card-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #10b981; letter-spacing: 1px; }
        .conf-pill { font-size: 0.75rem; background: rgba(16,185,129,0.1); color: #10b981; padding: 2px 8px; border-radius: 12px; font-weight: 700; }
        .institutional-card h2 { font-size: 2rem; font-weight: 900; color: #fff; margin-bottom: 16px; }
        .card-reasoning { font-size: 0.95rem; color: #aaa; margin-bottom: 24px; line-height: 1.6; }
        .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .data-item { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; }
        .data-label { font-size: 0.65rem; color: #666; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px; }
        .data-value { font-size: 0.9rem; font-weight: 700; color: #fff; }

        .btn-roadmap-launch { width: 100%; padding: 14px; background: #10b981; color: #000; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .btn-roadmap-launch:hover { background: #34d399; transform: translateY(-2px); }

        .roadmap-steps { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 16px; }
        .roadmap-node { display: flex; gap: 16px; padding: 16px; border-radius: 8px; background: rgba(0,0,0,0.2); }
        .node-icon { width: 28px; height: 28px; background: #10b981; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; flex-shrink: 0; }
        .node-name { font-size: 0.9rem; font-weight: 800; color: #10b981; margin-bottom: 2px; }
        .node-task { font-size: 0.85rem; color: #999; line-height: 1.4; }

        /* Chat Footer */
        .chat-footer { padding: 20px 20px 40px 20px; }
        .input-capsule-wrapper { max-width: 768px; margin: 0 auto; width: 100%; }
        .suggestions { display: flex; gap: 8px; margin-bottom: 12px; justify-content: center; overflow-x: auto; padding-bottom: 8px; }
        .suggestion-btn { white-space: nowrap; padding: 6px 12px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #ececec; font-size: 0.85rem; cursor: pointer; transition: 0.2s; }
        .suggestion-btn:hover { background: rgba(255,255,255,0.05); }

        .input-capsule { background: #2f2f2f; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 8px 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .input-form { display: flex; align-items: center; gap: 12px; }
        .main-input { flex: 1; background: transparent; border: none; color: #fff; font-size: 1rem; outline: none; padding: 10px 0; }
        .submit-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: #676767; color: #212121; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; }
        .submit-btn.active { background: #fff; }
        .footer-disclaimer { font-size: 0.7rem; color: #666; text-align: center; margin-top: 12px; }

        @media (max-width: 768px) {
          .sidebar { position: fixed; z-index: 100; height: 100%; }
          .message-container { padding: 0 16px; gap: 16px; }
        }
      `}</style>
    </main>
  );
}
