"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ArrowLeft, 
  RefreshCcw, 
  Target, 
  BarChart3,
  ShieldCheck,
  Zap,
  Clock,
  ArrowDownCircle,
  Award,
  Globe,
  Search,
  MessageSquare,
  Send,
  X,
  Sparkles,
  User,
  Bot,
  Copy
} from "lucide-react";

// Parallel Logo Component
const ParallelLogo = ({ size = 14, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 3V21M17 3V21" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
import Link from "next/link";
import { useDemo } from "@/components/DemoMode";
import { motion, AnimatePresence } from "framer-motion";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change7d: number;
  change1y: number;
  marketCap: string;
  target: number;
  valuation: string;
  growth: string;
  divYield: string;
  industry: string;
  signal: "Buy" | "Sell" | "Hold";
  entryPrice: number;
  exitPrice: number;
  bestTime: string;
  low52w: number;
  high52w: number;
  isNearLow: boolean;
  lastSync: string;
}

export default function StockAnalysis() {
  const { startDemo } = useDemo();
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [activeTab, setActiveTab] = useState<"top" | "fortune" | "india">("top");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(30);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const fetchStocks = async () => {
    try {
      const type = activeTab === "fortune" ? "fortune20" : activeTab === "india" ? "india" : "top";
      const res = await fetch(`/api/stocks?type=${type}`);
      const data = await res.json();
      setStocks(data);
      setFilteredStocks(data);
      setLoading(false);
      setCountdown(activeTab === "india" ? 2 : 30);
    } catch (e) {
      console.error("Stock fetch failed");
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [activeTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchStocks();
          return activeTab === "india" ? 2 : 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Semantic Search / Filtering
  useEffect(() => {
    if (!searchQuery) {
      setFilteredStocks(stocks);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = stocks.filter(s => 
      s.symbol.toLowerCase().includes(q) || 
      s.name.toLowerCase().includes(q) || 
      s.industry.toLowerCase().includes(q) ||
      s.valuation.toLowerCase().includes(q)
    );
    setFilteredStocks(filtered);
  }, [searchQuery, stocks]);

  const handleChat = async () => {
    if (!chatQuery.trim()) return;
    const userText = chatQuery;
    setChatHistory(prev => [...prev, { role: "user", text: userText }]);
    setChatQuery("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/stocks/chat", {
        method: "POST",
        body: JSON.stringify({ query: userText, stocks })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: "assistant", text: data.response }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: "assistant", text: "Intel node offline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <main className="stock-page">
      <nav className="stock-nav">
        <Link href="/" className="back-link">
          <ArrowLeft size={18} /> <span>Return to Futuristic</span>
        </Link>
        <div className="nav-brand">Parallel AI Market Oracle</div>
        <div className="refresh-status">
          <button onClick={startDemo} className="demo-link-btn" style={{ background: 'none', border: 'none', color: '#10b981', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', marginRight: '20px' }}>Launch Demo Mode</button>
          <RefreshCcw size={14} className={countdown === 30 ? "spin" : ""} />
          <span>Next Sync: {countdown}s</span>
        </div>
      </nav>

      <header className="stock-header">
        <div className="header-content">
          <h1>Parallel AI <span className="gradient-text">Market Oracle</span></h1>
          <p>Real-time technical analysis for high-conviction portfolios.</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="as-on-date">Data as on: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})} 06:00 AM PST</div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-300">
              <ParallelLogo size={12} className="text-cyan-400" />
              <span>Powered by Parallel Web Search</span>
            </div>
          </div>
        </div>
        
        <div className="header-controls">
          <div className="search-bar glass">
            <Search size={18} color="#666" />
            <input 
              type="text" 
              placeholder="Semantic search symbol, name, or industry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="tabs-container glass">
            <button className={`tab-btn ${activeTab === "top" ? "active" : ""}`} onClick={() => setActiveTab("top")}>
              <Zap size={14} /> Top Picks
            </button>
            <button className={`tab-btn ${activeTab === "fortune" ? "active" : ""}`} onClick={() => setActiveTab("fortune")}>
              <Award size={14} /> Fortune 20
            </button>
            <button className={`tab-btn ${activeTab === "india" ? "active" : ""}`} onClick={() => setActiveTab("india")}>
              <Globe size={14} /> India Nifty 100
            </button>
          </div>
        </div>
      </header>

      <div className="analysis-grid">
        <div className="table-container glass">
          <table className="stock-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Trend Tracker</th>
                <th>Status</th>
                <th>7D Return</th>
                <th>Target</th>
                <th>Execution Time</th>
                <th>Signal</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filteredStocks.map((s) => (
                  <motion.tr 
                    key={s.symbol}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={s.isNearLow ? "near-low-row" : ""}
                  >
                    <td>
                      <div className="symbol-cell">
                        <div className="symbol-icon">{s.symbol[0]}</div>
                        <div>
                          <div className="symbol-text">{s.symbol}</div>
                          <div className="name-text">{s.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="price-text">{activeTab === 'india' ? '₹' : '$'}{s.price.toLocaleString()}</td>
                    <td className="low-cell">
                      <div className="low-val">{activeTab === 'india' ? '₹' : '$'}{s.low52w}</div>
                      <div className="low-trend">
                        {s.isNearLow && <span className="alert-badge"><ArrowDownCircle size={10} /> Near Low</span>}
                      </div>
                    </td>
                    <td>
                       <span className={`pill ${s.valuation === "Undervalued" ? "pill-green" : "pill-red"}`}>
                        {s.valuation}
                      </span>
                    </td>
                    <td className={s.change7d >= 0 ? "trend-up" : "trend-down"}>
                      {s.change7d >= 0 ? "+" : ""}{s.change7d}%
                    </td>
                    <td>{activeTab === 'india' ? '₹' : '$'}{s.target}</td>
                    <td className="time-cell">
                      <Clock size={12} /> {s.bestTime}
                    </td>
                    <td>
                      <div className={`signal-badge ${s.signal.toLowerCase()} flex items-center gap-1.5 justify-center`}>
                        {s.signal === "Buy" && <TrendingUp size={12} />}
                        {s.signal === "Sell" && <TrendingDown size={12} />}
                        {s.signal === "Hold" && <Activity size={12} />}
                        {s.signal}
                        <ParallelLogo size={10} className="ml-1 opacity-70" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredStocks.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="no-results">No institutional assets matching "{searchQuery}"</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="execution-matrix">
           <div className="signals-header">
            <Zap size={20} color="#f59e0b" />
            <h2>Day Trading Execution Matrix</h2>
          </div>
          <div className="signal-cards">
            {filteredStocks.slice(0, 6).map(s => (
              <div key={s.symbol} className="execution-card glass">
                <div className="card-top">
                  <span className="card-symbol">{s.symbol}</span>
                  <span className={`card-signal ${s.signal.toLowerCase()} flex items-center gap-1`}>
                    <ParallelLogo size={10} />
                    {s.signal}
                  </span>
                </div>
                <div className="card-data">
                  <div className="data-point"><span className="label">Entry</span><span className="value">{activeTab === 'india' ? '₹' : '$'}{s.entryPrice}</span></div>
                  <div className="data-point"><span className="label">Target</span><span className="value">{activeTab === 'india' ? '₹' : '$'}{s.exitPrice}</span></div>
                  <div className="data-point highlight"><span className="label">Time</span><span className="value">{s.bestTime}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Trigger */}
      <button className="chat-trigger glass" onClick={() => setIsChatOpen(true)}>
        <Sparkles size={20} />
        <span>Ask Market Oracle</span>
      </button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setIsChatOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="chat-modal glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="header-info">
                  <div className="ai-status"></div>
                  <h3>Market Oracle Agent</h3>
                </div>
                <button className="close-modal" onClick={() => setIsChatOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-messages">
                {chatHistory.length === 0 && (
                  <div className="empty-chat">
                    <Sparkles size={32} color="#10b981" />
                    <p>I am grounded in current {activeTab === 'india' ? 'Bharat' : 'Global'} telemetry. Ask me about signals, industry trends, or specific tickers.</p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`chat-msg ${msg.role}`}>
                    <div className="msg-avatar">
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className="msg-bubble">
                      <ReactMarkdown 
                        components={{
                          code({ node, inline, className, children, ...props }: any) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <div className="code-block-wrapper">
                                <div className="code-header">
                                  <span>{match[1]}</span>
                                  <button onClick={() => navigator.clipboard.writeText(String(children))}><Copy size={12} /></button>
                                </div>
                                <code className={className} {...props}>{children}</code>
                              </div>
                            ) : (
                              <code className={className} {...props}>{children}</code>
                            );
                          }
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isTyping && <div className="chat-msg assistant"><div className="msg-bubble typing">Analyzing market data...</div></div>}
                <div ref={chatEndRef} />
              </div>

              <div className="modal-footer">
                <input 
                  type="text" 
                  placeholder="Ask about these stocks..." 
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChat()}
                />
                <button className="send-btn" onClick={handleChat} disabled={isTyping}>
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .stock-page { min-height: 100vh; background: #0a0a0a; color: #ececec; font-family: 'Inter', sans-serif; padding: 60px 40px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow-x: hidden; }
        
        @media (max-width: 1024px) {
          .stock-page { padding: 0 20px 80px 20px; }
          .stock-header { flex-direction: column; align-items: flex-start; gap: 40px; }
          .header-controls { align-items: flex-start; width: 100%; }
          .search-bar { width: 100%; }
          .tabs-container { width: 100%; overflow-x: auto; }
          .tab-btn { flex: 1; white-space: nowrap; }
        }

        .stock-nav { height: 80px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 40px; }
        
        @media (max-width: 768px) {
          .stock-nav { height: auto; padding: 20px 0; flex-direction: column; gap: 16px; align-items: flex-start; }
          .stock-header h1 { font-size: 2.5rem; }
          .table-container { margin: 0 -20px; border-radius: 0; border-left: none; border-right: none; }
          .stock-table { display: block; overflow-x: auto; white-space: nowrap; }
          .chat-trigger { bottom: 20px; right: 20px; padding: 12px 20px; font-size: 0.9rem; }
          .chat-modal { width: 100%; height: 100%; border-radius: 0; }
        }

        .back-link { display: flex; align-items: center; gap: 8px; color: #888; text-decoration: none; font-size: 0.9rem; font-weight: 600; }
        .nav-brand { font-weight: 800; text-transform: uppercase; letter-spacing: 2px; color: #666; font-size: 0.75rem; }
        .refresh-status { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #10b981; font-weight: 700; }
        
        .stock-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 60px; }
        .stock-header h1 { font-size: 3.5rem; font-weight: 900; margin-bottom: 8px; letter-spacing: -2px; }
        .gradient-text { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stock-header p { color: #888; font-size: 1.1rem; margin-bottom: 12px; }
        .as-on-date { display: inline-block; padding: 4px 12px; background: rgba(16,185,129,0.1); color: #10b981; border-radius: 6px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }

        .header-controls { display: flex; flex-direction: column; gap: 20px; align-items: flex-end; }
        .search-bar { display: flex; align-items: center; gap: 12px; padding: 12px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); width: 400px; }
        .search-bar input { background: transparent; border: none; color: #fff; font-size: 0.9rem; width: 100%; outline: none; }
        
        .tabs-container { display: flex; gap: 4px; padding: 4px; border-radius: 12px; background: rgba(255,255,255,0.02); }
        .tab-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 8px; border: none; background: transparent; color: #666; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .tab-btn.active { background: #222; color: #fff; }

        .table-container { border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
        .stock-table { width: 100%; border-collapse: collapse; text-align: left; }
        .stock-table th { padding: 24px; background: rgba(255,255,255,0.02); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #666; }
        .stock-table td { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.02); }
        .no-results { text-align: center; color: #666; padding: 80px !important; font-style: italic; }

        .symbol-cell { display: flex; align-items: center; gap: 16px; }
        .symbol-icon { width: 36px; height: 36px; background: #222; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #10b981; }
        .symbol-text { font-weight: 800; }
        .name-text { font-size: 0.75rem; color: #666; }
        .price-text { font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        
        .pill { padding: 4px 12px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .pill-green { background: rgba(16,185,129,0.1); color: #10b981; }
        .pill-red { background: rgba(239,68,68,0.1); color: #ef4444; }
        
        .signal-badge { padding: 4px 12px; border-radius: 6px; font-weight: 800; font-size: 0.75rem; text-transform: uppercase; background: #333; color: #888; border: 1px solid rgba(255,255,255,0.05); }
        .signal-badge.buy { background: rgba(16,185,129,0.15); color: #10b981; border-color: rgba(16,185,129,0.3); }
        .signal-badge.sell { background: rgba(239,68,68,0.15); color: #ef4444; border-color: rgba(239,68,68,0.3); }

        .execution-matrix { margin-top: 60px; }
        .signals-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .signal-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .execution-card { padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
        .card-top { display: flex; justify-content: space-between; margin-bottom: 16px; }
        .card-symbol { font-weight: 900; font-size: 1.1rem; }
        .card-signal { font-size: 0.65rem; font-weight: 900; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.05); }
        .card-signal.buy { background: rgba(16,185,129,0.15); color: #10b981; border-color: rgba(16,185,129,0.3); }
        .card-signal.sell { background: rgba(239,68,68,0.15); color: #ef4444; border-color: rgba(239,68,68,0.3); }
        .card-data { display: flex; flex-direction: column; gap: 10px; }
        .data-point { display: flex; justify-content: space-between; font-size: 0.85rem; }
        .data-point .label { color: #666; }
        .data-point .value { font-weight: 700; font-family: 'JetBrains Mono', monospace; }
        .data-point.highlight .value { color: #f59e0b; }

        .chat-trigger { position: fixed; bottom: 40px; right: 40px; display: flex; align-items: center; gap: 12px; padding: 16px 28px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.1); color: #fff; font-weight: 700; cursor: pointer; box-shadow: 0 10px 40px rgba(0,0,0,0.5); z-index: 100; transition: 0.3s; }
        .chat-trigger:hover { transform: scale(1.05); background: rgba(255,255,255,0.05); }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
        .chat-modal { width: 600px; max-width: 90vw; height: 700px; max-height: 85vh; display: flex; flex-direction: column; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
        .modal-header { padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
        .header-info { display: flex; align-items: center; gap: 12px; }
        .ai-status { width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }
        .close-modal { background: transparent; border: none; color: #666; cursor: pointer; }
        
        .modal-messages { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .empty-chat { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #666; text-align: center; gap: 16px; }
        
        .chat-msg { display: flex; gap: 16px; margin-bottom: 24px; }
        .chat-msg.user { flex-direction: row-reverse; }
        .msg-avatar { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .user .msg-avatar { background: #3b82f6; color: #fff; }
        .assistant .msg-avatar { background: #10b981; color: #000; }

        .msg-bubble { max-width: 80%; padding: 4px 0; font-size: 0.95rem; line-height: 1.6; }
        .msg-bubble :global(p) { margin-bottom: 16px; color: rgba(255,255,255,0.9); }
        .msg-bubble :global(p:last-child) { margin-bottom: 0; }
        .msg-bubble :global(ul), .msg-bubble :global(ol) { margin-left: 24px; margin-bottom: 16px; color: rgba(255,255,255,0.8); }
        .msg-bubble :global(li) { margin-bottom: 8px; }
        .msg-bubble :global(strong) { color: #fff; font-weight: 800; }
        
        /* Code Blocks */
        .msg-bubble :global(.code-block-wrapper) { background: #000; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin: 16px 0; overflow: hidden; }
        .msg-bubble :global(.code-header) { background: rgba(255,255,255,0.05); padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; color: #888; text-transform: uppercase; letter-spacing: 1px; }
        .msg-bubble :global(.code-header button) { background: transparent; border: none; color: #666; cursor: pointer; transition: 0.2s; }
        .msg-bubble :global(.code-header button:hover) { color: #fff; }
        .msg-bubble :global(code) { display: block; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #e2e8f0; overflow-x: auto; }

        .msg-bubble :global(table) { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.85rem; border-radius: 12px; overflow: hidden; }
        .msg-bubble :global(th), .msg-bubble :global(td) { border: 1px solid rgba(255,255,255,0.05); padding: 12px; text-align: left; }
        .msg-bubble :global(th) { background: rgba(255,255,255,0.05); color: #10b981; font-weight: 900; }
        
        .user .msg-bubble { text-align: right; }
        .assistant .msg-bubble { text-align: left; }
        .msg-bubble.typing { font-style: italic; color: #666; background: transparent; padding: 0; }

        .modal-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 12px; }
        .modal-footer input { flex: 1; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px 16px; color: #fff; outline: none; }
        .send-btn { background: #10b981; color: #000; border: none; padding: 12px; border-radius: 12px; cursor: pointer; }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .spin { animation: spinAnim 1s linear infinite; }
        @keyframes spinAnim { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .glass { background: rgba(255,255,255,0.02); backdrop-filter: blur(20px); }
      `}</style>
    </main>
  );
}
