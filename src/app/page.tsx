"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type?: "text" | "status" | "thought";
}

const QUICK_ACTIONS = [
  "Check Cotton in Maharashtra",
  "Soil analysis for Guntur, AP",
  "Best crop for black soil",
  "Wheat roadmap for Punjab"
];

export default function Home() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I am your Institutional Agri-Brain. Tell me your location in India, and I'll analyze the soil and weather to predict the best crop for you.",
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, view, isProcessing, isPlanning]);

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
        setMessages(prev => [...prev, { role: "assistant", content: language === "English" ? "Institutional roadmap synthesized successfully." : "సాగు ప్రణాళిక విజయవంతంగా రూపొందించబడింది.", type: "status" }]);
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
          .landing-content { max-width: 800px; padding: 40px; }
          .hero-title { font-size: 4.5rem; font-weight: 900; margin-bottom: 24px; }
          .gradient-text { background: linear-gradient(135deg, #10b981, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .hero-subtitle { font-size: 1.2rem; color: rgba(255,255,255,0.7); margin-bottom: 48px; }
          .btn-primary-glow { padding: 20px 48px; background: #10b981; color: #020602; border: none; border-radius: 20px; font-weight: 900; font-size: 1.2rem; cursor: pointer; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.4); transition: 0.3s; }
          .btn-primary-glow:hover { transform: translateY(-5px); }
          @keyframes zoomOut { from { transform: scale(1.1); } to { transform: scale(1); } }
        `}</style>
      </main>
    );
  }

  return (
    <main className="app-container">
      <div className="premium-bg"></div>
      
      <div className="sidebar glass">
        <div className="sidebar-header">
          <div className="logo-small" onClick={() => setView("landing")}>
            <span className="logo-icon">🌱</span>
            <span className="logo-name">AgriMind</span>
          </div>
          <button className="new-chat-btn" onClick={() => { setMessages([]); setPrediction(null); setCultivationPlan(null); }}>
            + New Analysis
          </button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-label">Recent Locations</div>
          <div className="history-item">● Pune, Maharashtra</div>
          <div className="history-item">● Guntur, AP</div>
        </div>
        <div className="sidebar-footer">
          <div className="vps-status">
            <span className="dot pulse"></span> VPS-Gemma Node Active
          </div>
        </div>
      </div>

      <div className="chat-interface">
        <div className="chat-header fade-in">
          <div className="header-info">
            <h2>Gemma 3 <span className="model-tag">4B Institutional</span></h2>
          </div>
          <div className="lang-selector glass">
            🌐 <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <optgroup label="Common">
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </optgroup>
              <optgroup label="South">
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Malayalam">മലയാളം (Malayalam)</option>
                <option value="Tulu">ತುಳು (Tulu)</option>
              </optgroup>
              <optgroup label="North & West">
                <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Haryanvi">हरियाणवी (Haryanvi)</option>
                <option value="Bhojpuri">भोजपुरी (Bhojpuri)</option>
                <option value="Dogri">डोगरी (Dogri)</option>
                <option value="Kashmiri">کٲشُر (Kashmiri)</option>
                <option value="Sindhi">سنڌي (Sindhi)</option>
              </optgroup>
              <optgroup label="East & North East">
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
                <option value="Assamese">অসমীয়া (Assamese)</option>
                <option value="Maithili">मैथिली (Maithili)</option>
                <option value="Santali">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
                <option value="Manipuri">মৈতেইলোন (Manipuri)</option>
                <option value="Bodo">बर' (Bodo)</option>
                <option value="Nepali">नेपाली (Nepali)</option>
              </optgroup>
              <optgroup label="Classical">
                <option value="Sanskrit">संस्कृतम् (Sanskrit)</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="chat-viewport" ref={scrollRef}>
          <div className="message-list">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-row ${msg.role}`}>
                <div className="avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="sender-name">{msg.role === 'user' ? 'You' : 'Agri-Brain'}</div>
                  <div className={`bubble ${msg.type}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {(isProcessing || isPlanning) && (
              <div className="chat-row assistant">
                <div className="avatar">🤖</div>
                <div className="message-content">
                   <div className="sender-name">Agri-Brain</div>
                   <div className="typing-indicator">
                    <span></span><span></span><span></span>
                    <span className="typing-text">{isPlanning ? 'Synthesizing Roadmap...' : 'Analyzing Data...'}</span>
                   </div>
                </div>
              </div>
            )}
            
            {prediction && (
              <div className="chat-row assistant">
                <div className="avatar">🧠</div>
                <div className="result-card glass-v2 fade-in">
                  <div className="card-header">
                    <div className="crop-info">
                      <span className="label">Optimal Culture</span>
                      <h3>{prediction.bestCrop}</h3>
                    </div>
                    <div className="match-score">{prediction.probability} Match</div>
                  </div>
                  <div className="card-body">
                    <p className="reasoning">{prediction.reasoning}</p>
                    <div className="mini-stats">
                      <div className="stat"><span>PH</span> <strong>{prediction.soil?.pH}</strong></div>
                      <div className="stat"><span>SOIL</span> <strong>{prediction.soil?.type}</strong></div>
                      <div className="stat"><span>TEMP</span> <strong>{prediction.weather?.temp}</strong></div>
                      <div className="stat"><span>NPK</span> <strong>{prediction.soil?.nutrients}</strong></div>
                    </div>
                    
                    {!cultivationPlan ? (
                      <button className="btn-action" onClick={handleGeneratePlan} disabled={isPlanning}>
                        {isPlanning ? 'Analyzing Growth Vectors...' : 'Synthesize Roadmap'}
                      </button>
                    ) : (
                      <div className="roadmap-inline fade-in">
                        <h4>Roadmap Vector</h4>
                        <div className="roadmap-grid">
                          {cultivationPlan.phases.map((p: any, i: number) => (
                            <div key={i} className="roadmap-step glass">
                              <span className="step-num">{i+1}</span>
                              <div className="step-text">
                                <div className="p-name">{p.name}</div>
                                <div className="p-task">{p.task}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="chat-input-area">
          {messages.length < 3 && !prediction && (
            <div className="quick-actions">
              {QUICK_ACTIONS.map(action => (
                <button key={action} className="action-pill" onClick={() => handleSubmit(undefined, action)}>
                  {action}
                </button>
              ))}
            </div>
          )}
          <form className="input-box glass" onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AgriMind about your farm location..."
              className="chat-input"
            />
            <button type="submit" className="send-btn" disabled={isProcessing}>
              {isProcessing ? '⌛' : '↑'}
            </button>
          </form>
          <div className="disclaimer">AgriMind institutional intelligence is grounded by Real-time climate data.</div>
        </div>
      </div>

      <style jsx>{`
        .app-container { height: 100vh; display: flex; background: #0a0a0a; color: #ececec; font-family: 'Outfit', sans-serif; overflow: hidden; }
        .premium-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(circle at 50% 50%, #0d1a0d 0%, #050505 100%); }

        .sidebar { width: 280px; height: 100%; border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; padding: 16px; background: rgba(0,0,0,0.2); }
        .logo-small { display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; }
        .logo-icon { font-size: 28px; }
        .logo-name { font-weight: 900; font-size: 1.3rem; letter-spacing: -1px; }
        .new-chat-btn { margin-top: 20px; padding: 14px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; background: rgba(255,255,255,0.02); color: #fff; text-align: left; cursor: pointer; font-weight: 700; transition: 0.2s; }
        .new-chat-btn:hover { background: rgba(255,255,255,0.08); border-color: #10b981; }
        .sidebar-content { flex: 1; margin-top: 32px; }
        .sidebar-label { font-size: 0.65rem; color: #555; font-weight: 900; text-transform: uppercase; margin-bottom: 16px; padding: 0 12px; letter-spacing: 2px; }
        .history-item { padding: 12px; font-size: 0.9rem; color: #888; cursor: pointer; border-radius: 10px; display: flex; align-items: center; gap: 8px; }
        .history-item:hover { background: rgba(255,255,255,0.03); color: #10b981; }
        
        .chat-interface { flex: 1; display: flex; flex-direction: column; }
        .chat-header { height: 70px; padding: 0 50px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .chat-header h2 { font-size: 1rem; font-weight: 800; }
        .model-tag { color: #10b981; font-weight: 900; font-size: 0.7rem; background: rgba(16,185,129,0.1); padding: 2px 8px; border-radius: 4px; margin-left: 8px; }
        .lang-selector { padding: 6px 16px; border-radius: 20px; font-size: 0.9rem; border: 1px solid rgba(255,255,255,0.1); }
        .lang-selector select { background: transparent; border: none; color: #fff; outline: none; font-weight: 700; }

        .chat-viewport { flex: 1; overflow-y: auto; padding: 40px 0; scroll-behavior: smooth; }
        .message-list { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; padding: 0 30px; }
        .chat-row { display: flex; gap: 28px; animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .avatar { width: 42px; height: 42px; border-radius: 12px; background: #1a1a1a; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.08); }
        .user .avatar { background: linear-gradient(135deg, #10b981, #065f46); }
        .sender-name { font-size: 0.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #555; margin-bottom: 10px; }
        .bubble { font-size: 1.1rem; line-height: 1.7; color: #d1d1d1; max-width: 90%; }
        .bubble.status { color: #10b981; font-weight: 700; }

        .result-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); border-radius: 32px; padding: 40px; margin-top: 15px; width: 100%; box-shadow: 0 30px 60px rgba(0,0,0,0.5); backdrop-filter: blur(20px); }
        .card-header h3 { font-size: 2.5rem; font-weight: 900; margin-top: 8px; letter-spacing: -1px; }
        .match-score { font-size: 0.9rem; padding: 8px 20px; border-radius: 30px; }
        .reasoning { font-size: 1.1rem; color: #999; margin: 30px 0; }
        .mini-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; margin-bottom: 30px; }
        .stat span { color: #10b981; }
        .stat strong { font-size: 1.1rem; }

        .btn-action { padding: 20px; font-size: 1.1rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(16,185,129,0.2); }
        
        .roadmap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .roadmap-step { padding: 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); position: relative; }
        .step-num { position: absolute; top: -10px; left: -10px; }
        .p-name { color: #10b981; font-weight: 800; margin-bottom: 6px; }
        .p-task { font-size: 0.85rem; color: #888; }

        .typing-indicator { display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); padding: 12px 20px; border-radius: 15px; border: 1px solid rgba(16,185,129,0.1); }
        .typing-text { font-size: 0.75rem; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 1px; margin-left: 8px; }

        .chat-input-area { max-width: 1000px; margin: 0 auto; padding: 20px 30px 40px 30px; }
        .input-box { border-radius: 24px; padding: 10px 15px; }
        .chat-input { font-size: 1.1rem; padding: 15px; }
        .send-btn { width: 50px; height: 50px; border-radius: 15px; font-size: 1.2rem; }

        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1000px) {
          .roadmap-grid { grid-template-columns: 1fr; }
          .mini-stats { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </main>
  );
}
