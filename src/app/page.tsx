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
  AlertCircle
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
  
  // WhatsApp & Weather State
  const [isWhatsAppSubscribed, setIsWhatsAppSubscribed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [userLocation, setUserLocation] = useState<{ city: string; temp: string; status: string } | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isProcessing, isPlanning]);

  // Simulate receiving a WhatsApp update after subscription
  useEffect(() => {
    if (isWhatsAppSubscribed && !showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 8000); // Hide after 8s
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isWhatsAppSubscribed]);

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

  const handleWhatsAppToggle = async () => {
    if (!isWhatsAppSubscribed && phoneNumber.length < 10) {
       setMessages(prev => [...prev, { role: "system", content: "⚠️ Please enter a valid 10-digit WhatsApp number.", type: "status" }]);
       return;
    }

    setIsSubscribing(true);
    try {
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: isWhatsAppSubscribed ? "unsubscribe" : "subscribe",
          phone: `${countryCode}${phoneNumber}`
        })
      });
      if (response.ok) {
        setIsWhatsAppSubscribed(!isWhatsAppSubscribed);
        const msg = !isWhatsAppSubscribed 
          ? `✅ Successfully subscribed ${countryCode} ${phoneNumber} to daily weather updates.` 
          : `❌ Unsubscribed ${countryCode} ${phoneNumber} from all updates.`;
        setMessages(prev => [...prev, { role: "system", content: msg, type: "status" }]);
        if (isWhatsAppSubscribed) setPhoneNumber(""); // Clear on unsub
      }
    } finally {
      setIsSubscribing(false);
    }
  };

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
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={() => { setMessages([]); setPrediction(null); setCultivationPlan(null); }}>
            <Plus size={18} /> New Analysis
          </button>
          <button className="toggle-sidebar" onClick={() => setSidebarOpen(false)}>
             <Menu size={20} />
          </button>
        </div>
        
        <div className="sidebar-scroll">
          <div className="sidebar-section">
            <div className="section-label">Institutional History</div>
            <div className="history-item active">
              <MessageSquare size={16} />
              <span>Current Analysis</span>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-label">WhatsApp Alerts</div>
            <div className={`whatsapp-card-v2 glass ${isWhatsAppSubscribed ? 'subscribed' : ''}`}>
              <div className="card-top">
                <Phone size={14} color={isWhatsAppSubscribed ? "#10b981" : "#666"} />
                <span>Weather Intelligence</span>
              </div>
              
              {!isWhatsAppSubscribed ? (
                <div className="sub-form fade-in">
                  <p>Receive daily weather & crop alerts.</p>
                  <div className="phone-input-group">
                    <select 
                      value={countryCode} 
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="country-select"
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g,''))}
                      className="phone-field"
                    />
                  </div>
                  <button 
                    className="btn-sub-action" 
                    onClick={handleWhatsAppToggle}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? 'Synchronizing...' : 'Subscribe'}
                  </button>
                </div>
              ) : (
                <div className="sub-active fade-in">
                  <div className="active-badge">
                    <CheckCircle2 size={12} /> Active: {countryCode} {phoneNumber}
                  </div>
                  <button 
                    className="btn-unsub-action" 
                    onClick={handleWhatsAppToggle}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? 'Processing...' : 'Unsubscribe'}
                  </button>
                </div>
              )}
            </div>
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
        <AnimatePresence>
          {showNotification && (
            <motion.div 
              initial={{ opacity: 0, y: -100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.8 }}
              className="whatsapp-alert glass"
            >
              <div className="wa-header">
                <div className="wa-brand">
                  <Phone size={14} color="#10b981" />
                  <span>AgriMind WhatsApp Alert</span>
                </div>
                <div className="wa-time">Just Now</div>
              </div>
              <div className="wa-body">
                <p><strong>To: {countryCode} {phoneNumber}</strong></p>
                <p>📍 {userLocation?.city || "Your Location"}: Current temp is {userLocation?.temp || "29°C"} ({userLocation?.status || "Clear"}). Ideal conditions for soil analysis. Open AgriMind to start.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
        .sidebar { width: 300px; background: #171717; height: 100%; display: flex; flex-direction: column; transition: 0.3s; border-right: 1px solid rgba(255,255,255,0.05); }
        .sidebar.closed { width: 0; overflow: hidden; }
        .sidebar-header { padding: 20px; display: flex; gap: 8px; }
        .new-chat-btn { flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: #fff; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
        .toggle-sidebar { padding: 10px; border-radius: 8px; color: #666; cursor: pointer; }
        .toggle-sidebar:hover { color: #fff; background: rgba(255,255,255,0.05); }

        .sidebar-scroll { flex: 1; padding: 0 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 32px; }
        .section-label { font-size: 0.65rem; color: #555; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1.5px; }
        
        .whatsapp-card-v2 { padding: 20px; border-radius: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
        .whatsapp-card-v2.subscribed { border-color: #10b981; background: rgba(16,185,129,0.03); }
        .card-top { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #ececec; margin-bottom: 16px; }
        
        .sub-form p { font-size: 0.75rem; color: #888; margin-bottom: 12px; }
        .phone-input-group { display: flex; gap: 4px; background: rgba(0,0,0,0.2); border-radius: 8px; padding: 4px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .country-select { background: transparent; border: none; color: #fff; font-size: 0.75rem; padding: 0 4px; outline: none; }
        .phone-field { flex: 1; background: transparent; border: none; color: #fff; font-size: 0.85rem; padding: 8px; outline: none; width: 100%; }
        .btn-sub-action { width: 100%; padding: 10px; background: #10b981; color: #000; border: none; border-radius: 8px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: 0.2s; }
        .btn-sub-action:hover { background: #34d399; }

        .active-badge { font-size: 0.8rem; font-weight: 700; color: #10b981; display: flex; align-items: center; gap: 6px; margin-bottom: 16px; }
        .btn-unsub-action { width: 100%; padding: 8px; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; }

        .weather-widget { padding: 20px; border-radius: 16px; background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)); }
        .weather-main { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .temp { font-size: 1.5rem; font-weight: 900; color: #fff; }
        .condition { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; color: #f59e0b; }
        .location { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; color: #666; font-weight: 600; }

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

        .chat-footer { padding: 20px 20px 60px 20px; }
        .input-capsule-wrapper { max-width: 768px; margin: 0 auto; width: 100%; }
        .input-capsule { background: #2f2f2f; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 10px 16px; }
        .main-input { flex: 1; background: transparent; border: none; color: #fff; outline: none; padding: 10px; }
        .submit-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: none; background: #555; color: #212121; cursor: pointer; }
        .submit-btn.active { background: #fff; }
        .footer-disclaimer { font-size: 0.65rem; color: #555; text-align: center; margin-top: 16px; }

        @keyframes pulseAnim { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        .whatsapp-alert {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 400px;
          padding: 16px;
          border-radius: 16px;
          background: rgba(30, 30, 30, 0.95);
          border: 1px solid #10b981;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          z-index: 1000;
          backdrop-filter: blur(20px);
        }
        .wa-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
        .wa-brand { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; color: #10b981; text-transform: uppercase; }
        .wa-time { font-size: 0.65rem; color: #666; }
        .wa-body p { font-size: 0.85rem; line-height: 1.5; color: #ececec; margin: 4px 0; }
      `}</style>
    </main>
  );
}
