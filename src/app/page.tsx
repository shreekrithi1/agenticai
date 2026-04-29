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
  }, [messages, view, isProcessing]);

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
      
      {/* ChatGPT-style Sidebar */}
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
            {isProcessing && (
              <div className="chat-row assistant">
                <div className="avatar">🤖</div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            
            {/* Dynamic Result Card inside Chat (ChatGPT style) */}
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
                    </div>
                    
                    {!cultivationPlan ? (
                      <button className="btn-action" onClick={handleGeneratePlan} disabled={isPlanning}>
                        {isPlanning ? 'Constructing Vector...' : 'Generate Roadmap'}
                      </button>
                    ) : (
                      <div className="roadmap-inline">
                        <h4>Roadmap Vector</h4>
                        {cultivationPlan.phases.map((p: any, i: number) => (
                          <div key={i} className="roadmap-step">
                            <span className="step-num">{i+1}</span>
                            <div className="step-text"><strong>{p.name}</strong>: {p.task}</div>
                          </div>
                        ))}
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
          <div className="disclaimer">AgriMind can make mistakes. Verify critical farming decisions.</div>
        </div>
      </div>

      <style jsx>{`
        .app-container { height: 100vh; display: flex; background: #0a0a0a; color: #ececec; font-family: 'Outfit', sans-serif; overflow: hidden; }
        .premium-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background: radial-gradient(circle at 50% 50%, #0d1a0d 0%, #050505 100%); }

        /* Sidebar */
        .sidebar { width: 260px; height: 100%; border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; padding: 12px; }
        .logo-small { display: flex; align-items: center; gap: 8px; padding: 12px; cursor: pointer; }
        .logo-icon { font-size: 24px; }
        .logo-name { font-weight: 800; font-size: 1.1rem; }
        .new-chat-btn { margin-top: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; background: transparent; color: #fff; text-align: left; cursor: pointer; transition: 0.2s; }
        .new-chat-btn:hover { background: rgba(255,255,255,0.05); }
        .sidebar-content { flex: 1; margin-top: 24px; }
        .sidebar-label { font-size: 0.7rem; color: #666; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; padding: 0 12px; }
        .history-item { padding: 10px 12px; font-size: 0.85rem; color: #999; cursor: pointer; border-radius: 8px; }
        .history-item:hover { background: rgba(255,255,255,0.03); color: #fff; }
        .vps-status { font-size: 0.75rem; color: #10b981; display: flex; align-items: center; gap: 8px; padding: 12px; border-top: 1px solid rgba(255,255,255,0.05); }
        .dot.pulse { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }

        /* Chat Interface */
        .chat-interface { flex: 1; display: flex; flex-direction: column; position: relative; }
        .chat-header { height: 60px; padding: 0 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .chat-header h2 { font-size: 0.95rem; font-weight: 700; }
        .model-tag { color: #666; font-weight: 400; margin-left: 8px; }
        .lang-selector { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
        .lang-selector select { background: transparent; border: none; color: #fff; outline: none; }

        .chat-viewport { flex: 1; overflow-y: auto; padding: 40px 0; }
        .message-list { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 32px; padding: 0 20px; }
        .chat-row { display: flex; gap: 24px; animation: fadeIn 0.4s ease-out; }
        .avatar { width: 36px; height: 36px; border-radius: 8px; background: #222; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.05); }
        .user .avatar { background: #065f46; }
        .message-content { flex: 1; }
        .sender-name { font-size: 0.85rem; font-weight: 800; margin-bottom: 8px; color: #fff; }
        .bubble { font-size: 1rem; line-height: 1.6; color: #d1d1d1; }
        .bubble.status { color: #10b981; font-weight: 600; }
        .bubble.thought { color: #34d399; font-size: 0.85rem; padding: 12px; background: rgba(16,185,129,0.05); border-radius: 12px; margin-top: 12px; }

        /* ChatGPT-style Result Card */
        .result-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 32px; margin-top: 12px; box-shadow: 0 15px 40px rgba(0,0,0,0.3); }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: #10b981; font-weight: 800; }
        .card-header h3 { font-size: 1.8rem; font-weight: 900; margin-top: 4px; color: #fff; }
        .match-score { padding: 6px 14px; background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: 20px; color: #10b981; font-size: 0.8rem; font-weight: 800; }
        .reasoning { font-size: 1rem; color: #aaa; margin-bottom: 24px; line-height: 1.6; }
        .mini-stats { display: flex; gap: 24px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 16px; margin-bottom: 24px; }
        .stat { display: flex; flex-direction: column; gap: 4px; }
        .stat span { font-size: 0.6rem; font-weight: 800; color: #666; text-transform: uppercase; }
        .stat strong { font-size: 0.9rem; color: #fff; }
        
        .btn-action { width: 100%; padding: 16px; background: #10b981; color: #020602; border: none; border-radius: 12px; font-weight: 900; cursor: pointer; transition: 0.2s; }
        .btn-action:hover { background: #34d399; }

        .roadmap-inline { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px; }
        .roadmap-inline h4 { font-size: 0.9rem; color: #10b981; margin-bottom: 16px; }
        .roadmap-step { display: flex; gap: 16px; margin-bottom: 16px; }
        .step-num { width: 24px; height: 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: #000; font-weight: 900; flex-shrink: 0; }
        .step-text { font-size: 0.9rem; color: #999; }

        /* Input Area */
        .chat-input-area { max-width: 800px; margin: 0 auto; width: 100%; padding: 20px; }
        .quick-actions { display: flex; gap: 12px; margin-bottom: 16px; justify-content: center; flex-wrap: wrap; }
        .action-pill { padding: 8px 16px; background: transparent; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; color: #999; font-size: 0.85rem; cursor: pointer; transition: 0.2s; }
        .action-pill:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .input-box { display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: #1a1a1a; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .chat-input { flex: 1; background: transparent; border: none; padding: 12px; color: #fff; font-size: 1rem; outline: none; }
        .send-btn { width: 40px; height: 40px; background: #fff; color: #000; border: none; border-radius: 10px; font-weight: 900; cursor: pointer; transition: 0.2s; }
        .send-btn:disabled { background: #333; color: #666; }
        .disclaimer { font-size: 0.65rem; color: #555; text-align: center; margin-top: 12px; }

        .typing-indicator { display: flex; gap: 4px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 12px; }
        .typing-indicator span { width: 6px; height: 6px; background: #666; border-radius: 50%; animation: bounce 1.4s infinite; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .sidebar { display: none; }
          .chat-viewport { padding: 20px 0; }
          .message-list { padding: 0 16px; }
          .chat-row { gap: 12px; }
          .card-header h3 { font-size: 1.4rem; }
        }
      `}</style>
    </main>
  );
}
