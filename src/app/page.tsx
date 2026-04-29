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
      content: "Welcome to AgriMind AI. Provide a PIN code, city, or village in India to predict the optimal crop based on regional soil quality and real-time weather.",
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
    setMessages(prev => [...prev, { role: "user", content: `Generate a detailed cultivation plan for ${prediction.bestCrop} in ${language}.`, type: "text" }]);

    try {
      const response = await fetch("/api/orchestrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query: prediction.bestCrop, 
          location: messages.findLast(m => m.role === 'user')?.content.replace("Location: ", ""),
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
              await new Promise(r => setTimeout(r, 800));
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
      <div className="header fade-in">
        <div className="logo">
          <span className="logo-icon">🌱</span>
          <h1>AgriMind <span className="tag">INDIA</span></h1>
        </div>
        <div className="nav-badges">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="badge glass select-lang"
          >
            <option value="English">English</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Malayalam">മലയാളം (Malayalam)</option>
          </select>
          <div className="badge glass green">Sovereign Agri-AI</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="chat-section glass fade-in">
          <div className="messages" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.role}`}>
                <div className={`message ${msg.type || "text"}`}>
                  {msg.type === 'thought' && <span className="thought-label">Agri-Logic: </span>}
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

          <form onSubmit={handleSubmit} className="input-area">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Postcode, City or Village..."
              className="glass"
            />
            <button type="submit" className="btn-primary" disabled={isProcessing}>
              {isProcessing ? 'Analyzing...' : 'Predict Crop'}
            </button>
          </form>
        </div>

        {prediction && (
          <div className="prediction-section glass fade-in">
            <div className="prediction-header">
              <div className="crop-badge">Recommended: {prediction.bestCrop}</div>
              <div className="prob-badge">{prediction.probability} Match</div>
            </div>
            
            <p className="reasoning">{prediction.reasoning}</p>

            <div className="stats-grid">
              <div className="stat-card glass">
                <span className="label">Soil Type</span>
                <span className="value">{prediction.soil?.type}</span>
              </div>
              <div className="stat-card glass">
                <span className="label">Soil pH</span>
                <span className="value">{prediction.soil?.pH}</span>
              </div>
              <div className="stat-card glass">
                <span className="label">Nutrients</span>
                <span className="value small">{prediction.soil?.nutrients}</span>
              </div>
              <div className="stat-card glass">
                <span className="label">Weather</span>
                <span className="value">{prediction.weather?.status} ({prediction.weather?.temp})</span>
              </div>
            </div>

            <div className="strategy-card glass">
              <h3>Irrigation Strategy</h3>
              <p>{prediction.irrigation}</p>
            </div>

            {isPlanning && (
              <div className="loading-container glass fade-in">
                <div className="spinner"></div>
                <p>AgriMind is constructing your roadmap...</p>
                <div className="pulse-icon">🌱</div>
              </div>
            )}

            {cultivationPlan && !isPlanning ? (
              <div className="plan-details fade-in">
                <div className="section-label">Cultivation Roadmap</div>
                {cultivationPlan.phases.map((phase: any, idx: number) => (
                  <div key={idx} className="phase-card glass">
                    <span className="phase-index">{idx + 1}</span>
                    <div className="phase-content">
                      <h4>{phase.name}</h4>
                      <p>{phase.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : !isPlanning && (
              <button 
                className="btn-full" 
                onClick={handleGeneratePlan}
                disabled={isPlanning}
              >
                Generate Cultivation Plan
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .container { max-width: 1400px; margin: 0 auto; padding: 30px 20px; height: 100vh; display: flex; flex-direction: column; background: #040d04; color: #f1f5f9; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo h1 { font-weight: 800; font-size: 1.5rem; color: #22c55e; margin: 0; }
        .tag { font-size: 0.7rem; background: rgba(34, 197, 94, 0.1); padding: 2px 8px; border-radius: 4px; vertical-align: super; margin-left: 4px; color: #22c55e; }
        .nav-badges { display: flex; gap: 12px; }
        .badge { padding: 8px 16px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; border-radius: 20px; }
        .badge.green { color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2); }
        .badge.yellow { color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); }
        .select-lang { background: rgba(255,255,255,0.05); color: #22c55e; border: 1px solid rgba(34, 197, 94, 0.2); outline: none; cursor: pointer; appearance: none; }
        .select-lang option { background: #040d04; color: white; }

        .main-grid { flex: 1; display: grid; grid-template-columns: 1fr ${prediction ? '480px' : '0fr'}; gap: 24px; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .chat-section { display: flex; flex-direction: column; overflow: hidden; background: rgba(255, 255, 255, 0.02); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .messages { flex: 1; overflow-y: auto; padding: 32px; display: flex; flex-direction: column; gap: 20px; }
        .message-wrapper { display: flex; width: 100%; animation: slideUp 0.4s ease-out; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .user { justify-content: flex-end; }
        .assistant { justify-content: flex-start; }
        .system { justify-content: center; }

        .message { max-width: 80%; padding: 16px 24px; border-radius: 24px; font-size: 0.95rem; line-height: 1.6; }
        .user .message { background: #22c55e; color: #040d04; font-weight: 600; border-bottom-right-radius: 4px; }
        .assistant .message { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.08); border-bottom-left-radius: 4px; }
        .thought { background: rgba(34, 197, 94, 0.05); border: 1px dashed rgba(34, 197, 94, 0.2); color: #22c55e; font-size: 0.8rem; padding: 12px 20px; border-radius: 12px; }
        .thought-label { font-weight: 800; text-transform: uppercase; font-size: 0.65rem; color: #22c55e; margin-right: 8px; }

        .prediction-section { padding: 32px; background: rgba(0, 0, 0, 0.2); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.08); display: flex; flex-direction: column; gap: 24px; overflow-y: auto; }
        .prediction-header { display: flex; justify-content: space-between; align-items: center; }
        .crop-badge { background: #22c55e; color: #040d04; padding: 6px 16px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; }
        .prob-badge { color: #22c55e; font-weight: 800; font-size: 0.9rem; }
        .reasoning { font-size: 0.95rem; opacity: 0.8; line-height: 1.6; font-style: italic; border-left: 2px solid #22c55e; padding-left: 16px; }

        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .stat-card { padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 16px; display: flex; flex-direction: column; gap: 4px; }
        .stat-card .label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #64748b; }
        .stat-card .value { font-size: 1rem; font-weight: 600; color: #f1f5f9; }
        .stat-card .value.small { font-size: 0.8rem; }

        .strategy-card { padding: 20px; background: rgba(34, 197, 94, 0.05); border-radius: 16px; border: 1px solid rgba(34, 197, 94, 0.1); }
        .strategy-card h3 { font-size: 0.8rem; text-transform: uppercase; margin: 0 0 8px 0; color: #22c55e; }
        .strategy-card p { font-size: 0.9rem; margin: 0; opacity: 0.8; }

        .btn-full { width: 100%; padding: 18px; background: #22c55e; color: #040d04; border: none; border-radius: 14px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .btn-full:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(34, 197, 94, 0.2); }

        .plan-details { display: flex; flex-direction: column; gap: 12px; }
        .phase-card { display: flex; gap: 16px; padding: 16px; align-items: flex-start; }
        .phase-index { width: 32px; height: 32px; background: #22c55e; color: #040d04; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; }
        .phase-content h4 { font-size: 0.9rem; color: #22c55e; margin: 0 0 4px 0; }
        .phase-content p { font-size: 0.85rem; opacity: 0.7; margin: 0; }

        .loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 40px; text-align: center; background: rgba(34, 197, 94, 0.02); }
        .spinner { width: 40px; height: 40px; border: 3px solid rgba(34, 197, 94, 0.1); border-top-color: #22c55e; border-radius: 50%; animation: spin 1s linear infinite; }
        .pulse-icon { font-size: 2rem; animation: pulse 2s infinite; margin-top: 10px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 0.5; } }

        .input-area { padding: 32px; display: flex; gap: 16px; background: rgba(0,0,0,0.2); border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; }
        input { flex: 1; padding: 18px 24px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; color: white; font-size: 1rem; outline: none; }
        input:focus { border-color: #22c55e; }
        .btn-primary { padding: 0 32px; background: #22c55e; color: #040d04; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.3s; }

        .typing { display: flex; gap: 8px; padding: 16px; }
        .typing span { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .typing span:nth-child(1) { animation-delay: -0.32s; }
        .typing span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1.0); opacity: 1; } }
      `}</style>
    </main>
  );
}
