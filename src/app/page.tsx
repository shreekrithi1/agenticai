"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type?: "text" | "status" | "thought";
}

export default function Home() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Institutional Agri-Brain Online. Synchronizing with Hostinger VPS...",
      type: "text"
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [cultivationPlan, setCultivationPlan] = useState<any>(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [language, setLanguage] = useState("English");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic Background Generator
  const renderField = () => {
    if (!prediction) return null;
    return (
      <div className="dynamic-field-overlay fade-in">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="fieldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="1000" height="1000" fill="url(#fieldGrad)" />
          {Array.from({length: 40}).map((_, i) => (
            <circle 
              key={i} 
              cx={Math.random() * 1000} 
              cy={Math.random() * 1000} 
              r={2 + Math.random() * 3} 
              fill="#10b981" 
              opacity="0.4"
              className="pulse-crop"
              style={{ animationDelay: `${Math.random() * 5}s` }}
            />
          ))}
        </svg>
      </div>
    );
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, view]);

  const handleGeneratePlan = async () => {
    if (!prediction || isPlanning) return;
    setIsPlanning(true);
    setCultivationPlan(null);
    const userMsg = messages.findLast(m => m.role === 'user')?.content || "";
    const cleanLocation = userMsg.replace(/Location Analysis: /g, "").trim();

    setMessages(prev => [...prev, { role: "user", content: `Generate a detailed cultivation roadmap for ${prediction.bestCrop} in ${language}.`, type: "text" }]);

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
        setMessages(prev => [...prev, { role: "assistant", content: language === "English" ? "Institutional roadmap generated." : "సాగు ప్రణాళిక రూపొందించబడింది.", type: "status" }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Failed to generate plan. Check VPS connectivity.", type: "text" }]);
    } finally {
      setIsPlanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const locationQuery = input;
    setInput("");
    setPrediction(null);
    setCultivationPlan(null);
    setMessages(prev => [...prev, { role: "user", content: `Location Analysis: ${locationQuery}`, type: "text" }]);
    setIsProcessing(true);

    try {
      const response = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: locationQuery, language: language }),
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
        <div className="hero-bg" style={{ backgroundImage: `url('/agrimind_hero_vision_1777442060580.png')` }}></div>
        <div className="hero-overlay"></div>
        
        <div className="landing-content fade-in">
          <div className="brand-badge">Sovereign Agri-Intelligence</div>
          <h1 className="hero-title">The Future of <span className="gradient-text">Precision Agriculture</span></h1>
          <p className="hero-subtitle">
            Harnessing VPS-hosted Gemma 3 (4B) to provide location-specific crop intelligence, soil analysis, and 4-phase cultivation roadmaps in 25+ Indian languages.
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary-glow" onClick={() => setView("app")}>
              Launch Agri-Brain PRO
            </button>
            <div className="tech-stack">
              <span>● Hostinger VPS</span>
              <span>● Gemma 3 Core</span>
              <span>● Real-time Weather Sync</span>
            </div>
          </div>
        </div>

        <div className="landing-footer">
          <div className="footer-item">
            <h4>Private & Secure</h4>
            <p>Self-hosted inference ensures your farm data stays private.</p>
          </div>
          <div className="footer-item">
            <h4>25+ Languages</h4>
            <p>Institutional advice in your native regional dialect.</p>
          </div>
          <div className="footer-item">
            <h4>Precision Vectors</h4>
            <p>High-fidelity roadmaps tailored to your unique soil profile.</p>
          </div>
        </div>

        <style jsx>{`
          .landing-page { height: 100vh; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; text-align: center; font-family: 'Outfit', sans-serif; }
          .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-size: cover; background-position: center; z-index: -2; animation: zoomOut 20s infinite alternate; }
          .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, rgba(2, 6, 2, 0.4) 0%, rgba(2, 6, 2, 0.95) 100%); z-index: -1; }
          
          @keyframes zoomOut { from { transform: scale(1.1); } to { transform: scale(1); } }

          .landing-content { max-width: 900px; padding: 40px; z-index: 1; }
          .brand-badge { display: inline-block; padding: 8px 20px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; color: #10b981; border-radius: 40px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px; }
          .hero-title { font-size: 4.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 24px; letter-spacing: -2px; }
          .gradient-text { background: linear-gradient(135deg, #10b981, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .hero-subtitle { font-size: 1.2rem; color: rgba(255, 255, 255, 0.7); line-height: 1.6; margin-bottom: 48px; max-width: 700px; margin-left: auto; margin-right: auto; }
          
          .btn-primary-glow { padding: 20px 48px; background: #10b981; color: #020602; border: none; border-radius: 20px; font-weight: 900; font-size: 1.2rem; cursor: pointer; transition: 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4); }
          .btn-primary-glow:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 60px rgba(16, 185, 129, 0.6); }
          
          .tech-stack { margin-top: 32px; display: flex; gap: 24px; justify-content: center; font-size: 0.8rem; font-weight: 700; color: rgba(255, 255, 255, 0.4); }
          
          .landing-footer { position: absolute; bottom: 0; left: 0; width: 100%; padding: 60px 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; background: linear-gradient(to top, #020602, transparent); border-top: 1px solid rgba(255, 255, 255, 0.05); }
          .footer-item h4 { color: #10b981; font-size: 1rem; font-weight: 800; margin-bottom: 8px; }
          .footer-item p { font-size: 0.85rem; color: rgba(255, 255, 255, 0.5); line-height: 1.5; }

          @media (max-width: 768px) {
            .hero-title { font-size: 2.8rem; }
            .landing-footer { grid-template-columns: 1fr; padding: 40px 20px; }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="premium-bg"></div>
      {renderField()}
      
      <div className="header fade-in">
        <div className="logo" onClick={() => setView("landing")} style={{ cursor: 'pointer' }}>
          <div className="intelligence-orbit">
            <div className={`core ${isProcessing ? 'scanning' : ''}`}>🌱</div>
            <div className="ring"></div>
          </div>
          <div className="logo-text">
            <h1>AgriMind <span className="tag">BEYOND</span></h1>
            <p className="status-indicator">● VPS-Gemma Core Live</p>
          </div>
        </div>
        <div className="nav-badges">
          <div className="lang-container glass">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="select-lang"
            >
              <optgroup label="Primary">
                <option value="English">English</option>
                <option value="Hindi">हिन्दी</option>
              </optgroup>
              <optgroup label="Regional">
                <option value="Telugu">తెలుగు</option>
                <option value="Tamil">தமிழ்</option>
                <option value="Kannada">ಕನ್ನಡ</option>
                <option value="Malayalam">മലയാളം</option>
                <option value="Bengali">বাংলা</option>
                <option value="Marathi">मराठी</option>
              </optgroup>
            </select>
          </div>
          <div className="badge glass green">Institutional Node</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="chat-section glass-v2 fade-in">
          <div className="messages" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.role}`}>
                <div className={`message-v2 ${msg.type || "text"} ${msg.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                  {msg.type === 'thought' && <span className="analysis-tag">Neural Processing</span>}
                  {msg.content}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="scanning-container">
                <div className="scanning-line"></div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="input-area-v2 glass-top">
            <div className="input-wrapper-v2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Synchronize Location..."
                className="main-input-v2"
              />
              <button type="submit" className="btn-sync" disabled={isProcessing}>
                {isProcessing ? 'Syncing...' : 'Sync Location'}
              </button>
            </div>
          </form>
        </div>

        {prediction && (
          <div className="intelligence-panel glass-v2 fade-in">
            <div className="top-result">
              <div className="prediction-id">A1-SYNC-0{Math.floor(Math.random()*100)}</div>
              <div className="crop-focus">
                <span className="label">Recommended Culture</span>
                <h2>{prediction.bestCrop}</h2>
              </div>
              <div className="confidence-meter">
                <svg width="80" height="80">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(16, 185, 129, 0.1)" strokeWidth="4" />
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#10b981" strokeWidth="4" 
                    strokeDasharray="220" strokeDashoffset={220 - (220 * (parseInt(prediction.probability) || 85) / 100)} 
                    strokeLinecap="round" />
                </svg>
                <div className="conf-value">{prediction.probability}</div>
              </div>
            </div>
            
            <div className="analysis-report glass">
              <p>{prediction.reasoning}</p>
            </div>

            <div className="bionic-stats">
              <div className="bionic-card glass">
                <div className="bionic-icon">🪨</div>
                <div className="bionic-info">
                  <span className="label">Soil Matrix</span>
                  <span className="value">{prediction.soil?.type}</span>
                </div>
                <div className="liquid-bar"><div className="liquid-fill" style={{width: '85%'}}></div></div>
              </div>
              <div className="bionic-card glass">
                <div className="bionic-icon">🧪</div>
                <div className="bionic-info">
                  <span className="label">PH Balance</span>
                  <span className="value">{prediction.soil?.pH}</span>
                </div>
                <div className="liquid-bar"><div className="liquid-fill warn" style={{width: '65%'}}></div></div>
              </div>
            </div>

            <div className="environmental-sync glass">
              <div className="weather-chip">
                <span className="icon">☁️</span>
                <span className="text">{prediction.weather?.status} ({prediction.weather?.temp})</span>
              </div>
              <div className="irrigation-logic">
                <h3>Irrigation Logic</h3>
                <p>{prediction.irrigation}</p>
              </div>
            </div>

            {cultivationPlan ? (
              <div className="roadmap-view fade-in">
                <h3 className="roadmap-title">Cultivation Vector</h3>
                <div className="vector-timeline">
                  {cultivationPlan.phases.map((phase: any, idx: number) => (
                    <div key={idx} className="vector-node glass">
                      <div className="node-id">{idx + 1}</div>
                      <div className="node-content">
                        <h4>{phase.name}</h4>
                        <p>{phase.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <button 
                className="btn-roadmap-v2" 
                onClick={handleGeneratePlan}
                disabled={isPlanning}
              >
                {isPlanning ? 'Analyzing Growth Vectors...' : 'Synthesize Roadmap'}
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .container { max-width: 1600px; margin: 0 auto; padding: 20px; height: 100vh; display: flex; flex-direction: column; position: relative; }
        
        .dynamic-field-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.5; pointer-events: none; }
        .pulse-crop { animation: pulseCrop 4s infinite; }
        @keyframes pulseCrop { 0% { opacity: 0.2; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.5); } 100% { opacity: 0.2; transform: scale(1); } }

        /* Intelligence Orbit Logo */
        .intelligence-orbit { position: relative; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; }
        .core { font-size: 28px; z-index: 2; transition: 0.5s; }
        .core.scanning { animation: floatCore 2s infinite ease-in-out; text-shadow: 0 0 15px #10b981; }
        .ring { position: absolute; width: 100%; height: 100%; border: 2px dashed rgba(16, 185, 129, 0.3); border-radius: 50%; animation: spin 10s linear infinite; }
        
        .logo-text h1 { font-size: 1.8rem; font-weight: 900; letter-spacing: -1px; margin: 0; }
        .logo-text .tag { background: #10b981; color: #020602; padding: 2px 10px; border-radius: 6px; font-size: 0.7rem; margin-left: 8px; vertical-align: middle; }
        .status-indicator { font-size: 0.65rem; color: #10b981; margin: 2px 0 0 0; font-weight: 700; opacity: 0.8; }

        /* V2 Chat Bubbles */
        .glass-v2 { background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .chat-section { display: flex; flex-direction: column; overflow: hidden; }
        .messages { flex: 1; overflow-y: auto; padding: 30px; display: flex; flex-direction: column; gap: 20px; position: relative; }
        .message-v2 { padding: 20px 28px; border-radius: 30px; font-size: 0.95rem; line-height: 1.6; max-width: 85%; }
        .user-bubble { background: linear-gradient(135deg, #10b981, #065f46); color: #fff; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2); align-self: flex-end; }
        .bot-bubble { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); align-self: flex-start; }
        .analysis-tag { display: block; font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: #10b981; margin-bottom: 8px; letter-spacing: 2px; }

        /* Scanning Line Animation */
        .scanning-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
        .scanning-line { width: 100%; height: 2px; background: linear-gradient(to right, transparent, #10b981, transparent); position: absolute; animation: scanLine 2s infinite linear; }
        @keyframes scanLine { 0% { top: 0; opacity: 0; } 50% { opacity: 0.5; } 100% { top: 100%; opacity: 0; } }

        /* Bionic Controls */
        .input-area-v2 { padding: 30px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); }
        .input-wrapper-v2 { display: flex; gap: 12px; background: rgba(255, 255, 255, 0.02); padding: 8px; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .main-input-v2 { flex: 1; background: transparent; border: none; color: #fff; font-size: 1rem; padding: 0 20px; outline: none; }
        .btn-sync { background: #10b981; color: #020602; border: none; padding: 12px 28px; border-radius: 16px; font-weight: 900; cursor: pointer; transition: 0.3s; }
        .btn-sync:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3); }

        /* Intelligence Panel */
        .intelligence-panel { padding: 30px; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; border-radius: 40px; }
        .top-result { display: flex; justify-content: space-between; align-items: center; position: relative; margin-top: 10px; }
        .prediction-id { position: absolute; top: -20px; left: 0; font-size: 0.6rem; font-weight: 900; color: #64748b; letter-spacing: 2px; }
        .crop-focus h2 { font-size: 2.2rem; font-weight: 900; margin: 4px 0 0 0; }
        .confidence-meter { position: relative; width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; }
        .conf-value { position: absolute; font-size: 1.1rem; font-weight: 900; color: #10b981; }

        .analysis-report { padding: 20px; border-radius: 20px; font-style: italic; font-size: 0.9rem; line-height: 1.6; border-left: 3px solid #10b981; }

        .bionic-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .bionic-card { padding: 16px; border-radius: 20px; display: flex; flex-direction: column; gap: 12px; position: relative; }
        .bionic-info .label { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; color: #64748b; display: block; }
        .bionic-info .value { font-size: 0.9rem; font-weight: 700; color: #fff; }
        .liquid-bar { height: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 2px; }
        .liquid-fill { height: 100%; background: #10b981; border-radius: 2px; }
        .liquid-fill.warn { background: #f59e0b; }

        .environmental-sync { padding: 20px; border-radius: 24px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.1); }
        .weather-chip { font-size: 0.9rem; font-weight: 700; color: #34d399; margin-bottom: 12px; display: flex; gap: 8px; }
        .irrigation-logic h3 { font-size: 0.65rem; text-transform: uppercase; color: #10b981; letter-spacing: 1.5px; margin-bottom: 4px; }
        .irrigation-logic p { font-size: 0.85rem; opacity: 0.8; margin: 0; line-height: 1.5; }

        .vector-timeline { display: flex; flex-direction: column; gap: 12px; }
        .vector-node { padding: 16px; border-radius: 20px; display: flex; gap: 16px; align-items: flex-start; }
        .node-id { width: 32px; height: 32px; background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #10b981; font-size: 0.8rem; flex-shrink: 0; }
        .node-content h4 { font-size: 0.95rem; color: #10b981; margin: 0 0 4px 0; }
        .node-content p { font-size: 0.85rem; opacity: 0.7; margin: 0; line-height: 1.4; }

        .btn-roadmap-v2 { width: 100%; padding: 20px; background: rgba(16, 185, 129, 0.02); border: 1px solid #10b981; color: #10b981; border-radius: 20px; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        .btn-roadmap-v2:hover { background: #10b981; color: #020602; }

        @keyframes floatCore { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .main-grid { flex: 1; display: grid; grid-template-columns: 1fr ${prediction ? '500px' : '0fr'}; gap: 24px; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }

        @media (max-width: 1200px) {
          .main-grid { grid-template-columns: 1fr; overflow-y: auto; height: auto; }
          .container { height: auto; padding: 10px; }
          .intelligence-panel { height: auto; border-radius: 30px; }
          .chat-section { height: 600px; border-radius: 30px; }
        }
      `}</style>
    </main>
  );
}
