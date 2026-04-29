"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  type?: "text" | "status" | "thought";
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Institutional Crop Intelligence Active. Please provide your location in India to begin agricultural analysis.",
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleGeneratePlan = async () => {
    if (!prediction || isPlanning) return;
    setIsPlanning(true);
    setCultivationPlan(null);
    const userMsg = messages.findLast(m => m.role === 'user')?.content || "";
    const cleanLocation = userMsg.replace(/Location: |\(Lang: .*\)/g, "").trim();

    setMessages(prev => [...prev, { role: "user", content: `Generate a detailed cultivation plan for ${prediction.bestCrop} in ${language}.`, type: "text" }]);

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
        setMessages(prev => [...prev, { role: "assistant", content: language === "English" ? "Cultivation roadmap generated successfully." : "సాగు ప్రణాళిక విజయవంతంగా రూపొందించబడింది.", type: "status" }]);
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
    setMessages(prev => [...prev, { role: "user", content: `Location: ${locationQuery} (Lang: ${language})`, type: "text" }]);
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

  return (
    <main className="container">
      <div className="premium-bg"></div>
      
      <div className="header fade-in">
        <div className="logo">
          <div className="logo-orb">
            <span className="logo-icon">🌱</span>
          </div>
          <div className="logo-text">
            <h1>AgriMind <span className="tag">PRO</span></h1>
            <p className="status-indicator">● System Intelligence Active</p>
          </div>
        </div>
        <div className="nav-badges">
          <div className="lang-container glass">
            <span className="lang-icon">🌐</span>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="select-lang"
            >
              <optgroup label="Primary">
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </optgroup>
              <optgroup label="Regional">
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Malayalam">മലയാളം (Malayalam)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
                <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="Assamese">অসমীয়া (Assamese)</option>
                <option value="Maithili">मैथिली (Maithili)</option>
                <option value="Santali">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
                <option value="Kashmiri">کٲشُر (Kashmiri)</option>
                <option value="Nepali">नेपाली (Nepali)</option>
                <option value="Sindhi">سنڌي (Sindhi)</option>
                <option value="Konkani">कोंкणी (Konkani)</option>
                <option value="Dogri">डोगरी (Dogri)</option>
                <option value="Manipuri">মৈতেইলোন (Manipuri)</option>
                <option value="Sanskrit">संस्कृतम् (Sanskrit)</option>
                <option value="Bodo">बर' (Bodo)</option>
                <option value="Tulu">ತುಳು (Tulu)</option>
                <option value="Haryanvi">हरियाणवी (Haryanvi)</option>
                <option value="Bhojpuri">भोजपुरी (Bhojpuri)</option>
              </optgroup>
            </select>
          </div>
          <div className="badge glass-glow green">Sovereign Agri-Core</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="chat-section glass fade-in">
          <div className="messages" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.role}`}>
                <div className={`message ${msg.type || "text"} ${msg.role === 'user' ? 'gradient-bg' : ''}`}>
                  {msg.type === 'thought' && <span className="thought-label">Analysis: </span>}
                  {msg.content}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="typing">
                <span></span><span></span><span></span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="input-area glass-top">
            <div className="input-wrapper">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Location or PIN code..."
                className="main-input"
              />
              <button type="submit" className="btn-predict" disabled={isProcessing}>
                {isProcessing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </form>
        </div>

        {prediction && (
          <div className="prediction-section glass fade-in">
            <div className="result-header">
              <div className="crop-title">
                <span className="crop-label">Recommended Crop</span>
                <h2>{prediction.bestCrop}</h2>
              </div>
              <div className="probability-gauge glass">
                <span className="prob-value">{prediction.probability}</span>
                <span className="prob-label">Match</span>
              </div>
            </div>
            
            <div className="reasoning-box glass">
              <p>{prediction.reasoning}</p>
            </div>

            <div className="stats-container">
              <div className="stat-item glass">
                <span className="stat-label">Soil Profile</span>
                <span className="stat-value">{prediction.soil?.type}</span>
                <div className="stat-progress"><div className="progress-bar" style={{width: '90%'}}></div></div>
              </div>
              <div className="stat-item glass">
                <span className="stat-label">Soil pH</span>
                <span className="stat-value">{prediction.soil?.pH}</span>
                <div className="stat-progress"><div className="progress-bar" style={{width: '70%', background: '#f59e0b'}}></div></div>
              </div>
              <div className="stat-item glass">
                <span className="stat-label">Nutrient Load</span>
                <span className="stat-value small">{prediction.soil?.nutrients}</span>
              </div>
              <div className="stat-item glass">
                <span className="stat-label">Current Climate</span>
                <span className="stat-value">{prediction.weather?.status} ({prediction.weather?.temp})</span>
              </div>
            </div>

            <div className="strategy-alert glass">
              <div className="strategy-icon">💧</div>
              <div className="strategy-text">
                <h3>Irrigation Intelligence</h3>
                <p>{prediction.irrigation}</p>
              </div>
            </div>

            {cultivationPlan ? (
              <div className="plan-section fade-in">
                <h3 className="section-title">Cultivation Roadmap</h3>
                <div className="timeline">
                  {cultivationPlan.phases.map((phase: any, idx: number) => (
                    <div key={idx} className="timeline-item glass">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>{phase.name}</h4>
                        <p>{phase.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <button 
                className="btn-roadmap gradient-bg" 
                onClick={handleGeneratePlan}
                disabled={isPlanning}
              >
                {isPlanning ? <span className="loader-span">Constructing Roadmap...</span> : 'Generate Roadmap'}
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .container { max-width: 1440px; margin: 0 auto; padding: 24px; height: 100vh; display: flex; flex-direction: column; }
        
        /* Header Upgrade */
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .logo { display: flex; align-items: center; gap: 16px; }
        .logo-orb { width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
        .logo-text h1 { font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0; line-height: 1; }
        .logo-text .tag { color: #10b981; font-size: 0.8rem; letter-spacing: 2px; font-weight: 900; }
        .status-indicator { font-size: 0.65rem; color: #10b981; margin: 4px 0 0 0; font-weight: 700; opacity: 0.8; }
        
        .nav-badges { display: flex; gap: 12px; }
        .lang-container { display: flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 12px; }
        .lang-icon { font-size: 14px; opacity: 0.6; }
        .select-lang { background: transparent; border: none; color: #fff; font-size: 0.85rem; font-weight: 600; outline: none; cursor: pointer; }
        .select-lang option { background: #020602; }
        
        .badge-glow { padding: 8px 16px; border-radius: 12px; font-size: 0.75rem; font-weight: 800; border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }

        /* Main Content Layout */
        .main-grid { flex: 1; display: grid; grid-template-columns: 1fr ${prediction ? '500px' : '0fr'}; gap: 24px; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        
        .chat-section { display: flex; flex-direction: column; overflow: hidden; border-radius: 32px; }
        .messages { flex: 1; overflow-y: auto; padding: 40px; display: flex; flex-direction: column; gap: 24px; }
        .message-wrapper { display: flex; width: 100%; }
        .user { justify-content: flex-end; }
        .message { max-width: 75%; padding: 18px 26px; border-radius: 24px; font-size: 0.95rem; line-height: 1.6; position: relative; transition: 0.3s; }
        .assistant .message { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-bottom-left-radius: 4px; }
        .user .message { background: linear-gradient(135deg, #10b981, #059669); color: #fff; font-weight: 600; border-bottom-right-radius: 4px; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2); }
        .thought { background: rgba(16, 185, 129, 0.05); border: 1px dashed rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.8rem; padding: 14px 20px; border-radius: 16px; margin: 0 auto; max-width: 90%; text-align: center; }
        .thought-label { font-weight: 800; text-transform: uppercase; font-size: 0.6rem; letter-spacing: 1px; color: #10b981; display: block; margin-bottom: 4px; }

        /* Input Area Upgrade */
        .input-area { padding: 40px; background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); }
        .input-wrapper { display: flex; gap: 16px; background: rgba(255,255,255,0.02); padding: 8px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
        .main-input { flex: 1; background: transparent; border: none; padding: 12px 20px; color: #fff; font-size: 1rem; outline: none; }
        .btn-predict { background: #10b981; color: #fff; border: none; padding: 0 32px; border-radius: 14px; font-weight: 800; cursor: pointer; transition: 0.3s; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
        .btn-predict:hover { transform: scale(1.02); background: #34d399; }

        /* Prediction Result View */
        .prediction-section { padding: 40px; display: flex; flex-direction: column; gap: 32px; overflow-y: auto; border-radius: 32px; }
        .result-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .crop-label { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #10b981; letter-spacing: 1.5px; }
        .crop-title h2 { font-size: 2.2rem; font-weight: 900; margin: 4px 0 0 0; }
        .probability-gauge { width: 80px; height: 80px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px solid #10b981; background: rgba(16, 185, 129, 0.05); }
        .prob-value { font-size: 1.2rem; font-weight: 900; color: #10b981; line-height: 1; }
        .prob-label { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; opacity: 0.6; }

        .reasoning-box { padding: 24px; border-radius: 20px; border-left: 4px solid #10b981; font-style: italic; font-size: 0.95rem; line-height: 1.7; opacity: 0.9; }

        .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .stat-item { padding: 20px; border-radius: 20px; display: flex; flex-direction: column; gap: 8px; transition: 0.3s; }
        .stat-item:hover { background: rgba(255,255,255,0.05); transform: translateY(-4px); }
        .stat-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #64748b; }
        .stat-value { font-size: 1rem; font-weight: 700; }
        .stat-value.small { font-size: 0.8rem; line-height: 1.4; opacity: 0.8; }
        .stat-progress { height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; margin-top: 4px; }
        .progress-bar { height: 100%; background: #10b981; border-radius: 2px; }

        .strategy-alert { padding: 24px; border-radius: 20px; display: flex; gap: 20px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.1); align-items: center; }
        .strategy-icon { font-size: 32px; }
        .strategy-text h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #10b981; margin: 0 0 4px 0; }
        .strategy-text p { font-size: 0.9rem; margin: 0; opacity: 0.8; line-height: 1.5; }

        /* Timeline Roadmap */
        .plan-section { display: flex; flex-direction: column; gap: 24px; }
        .section-title { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; color: #64748b; font-weight: 800; margin: 0; }
        .timeline { display: flex; flex-direction: column; gap: 16px; position: relative; }
        .timeline-item { padding: 20px; border-radius: 20px; display: flex; gap: 20px; align-items: flex-start; position: relative; }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #10b981; margin-top: 6px; box-shadow: 0 0 10px #10b981; flex-shrink: 0; }
        .timeline-content h4 { font-size: 1rem; color: #10b981; margin: 0 0 6px 0; }
        .timeline-content p { font-size: 0.9rem; opacity: 0.7; margin: 0; line-height: 1.5; }

        .btn-roadmap { width: 100%; padding: 20px; background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; border-radius: 18px; font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); }
        .btn-roadmap:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4); }

        .loader-span { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .loader-span::before { content: ""; width: 18px; height: 18px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 1200px) {
          .main-grid { grid-template-columns: 1fr; overflow-y: auto; height: auto; }
          .container { height: auto; }
          .chat-section { height: 700px; }
          .prediction-section { height: auto; }
        }
      `}</style>
    </main>
  );
}
