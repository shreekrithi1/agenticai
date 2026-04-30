"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Send, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  User, 
  Mail, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  recipient: string;
  amount: string;
  currency: string;
  status: "pending" | "processing" | "completed" | "verified";
  type: "email" | "mobile" | "stablecoin";
  timestamp: string;
}

export default function VelocityPayments() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"email" | "mobile" | "stablecoin">("email");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TX-9021", recipient: "brother@email.com", amount: "50.00", currency: "USD", status: "completed", type: "email", timestamp: "2m ago" },
    { id: "TX-9018", recipient: "+91 98XXX XXXXX", amount: "2500.00", currency: "INR", status: "verified", type: "mobile", timestamp: "1h ago" }
  ]);
  const [agentThought, setAgentThought] = useState("");

  const handleSend = () => {
    if (!recipient || !amount) return;
    
    setIsProcessing(true);
    setAgentThought("Analyzing KYC/AML requirements for cross-border movement...");
    
    setTimeout(() => {
      setAgentThought("Verifying Shared Payment Token (SPT) limit for recipient " + recipient + "...");
    }, 1500);

    setTimeout(() => {
      const newTx: Transaction = {
        id: `TX-${Math.floor(Math.random() * 9000) + 1000}`,
        recipient,
        amount,
        currency: "USD",
        status: "processing",
        type: method,
        timestamp: "just now"
      };
      setTransactions([newTx, ...transactions]);
      setIsProcessing(false);
      setRecipient("");
      setAmount("");
      setAgentThought("");
    }, 4000);
  };

  return (
    <main className="payments-page">
      {/* Institutional Header */}
      <nav className="payments-nav">
        <div className="nav-left">
          <Link href="/" className="back-link">
            <ArrowLeft size={20} />
          </Link>
          <div className="nav-brand">
            <CreditCard size={24} color="#ef4444" />
            <h1>Velocity Pay <span className="version">v2.6 Alpha</span></h1>
          </div>
        </div>
        <div className="nav-right">
          <div className="security-badge">
            <ShieldCheck size={16} />
            <span>Agentic Fraud Detection Active</span>
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">Institutional Node #71</span>
              <span className="node-status">Secured via Stripe Identity</span>
            </div>
            <div className="user-avatar">AD</div>
          </div>
        </div>
      </nav>

      <div className="payments-grid">
        {/* Left Column: Agentic Intelligence */}
        <section className="agent-column">
          <div className="intelligence-card">
            <div className="card-header">
              <Cpu size={20} color="#ef4444" />
              <h2>Financial Orchestrator</h2>
            </div>
            <div className="agent-chat">
              <div className="message bot">
                <div className="bot-icon">AI</div>
                <div className="bubble">
                  How can I assist your global treasury today? I can handle cross-border payouts to 160+ countries via email, mobile, or stablecoins.
                </div>
              </div>
              
              <AnimatePresence>
                {isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="message bot thought"
                  >
                    <div className="bot-icon"><Clock size={14} /></div>
                    <div className="bubble">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <p>{agentThought}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="agent-footer">
              <div className="input-box">
                <input placeholder="Ask agent to orchestrate a payout..." disabled={isProcessing} />
                <button className="send-btn"><Send size={18} /></button>
              </div>
            </div>
          </div>

          <div className="limits-card">
            <h3>Machine Payment Protocol (MPP)</h3>
            <div className="limit-row">
              <span>Authorized Agent Limit</span>
              <span className="value">$5,000.00 / day</span>
            </div>
            <div className="limit-bar">
              <div className="limit-progress" style={{ width: "15%" }}></div>
            </div>
            <p className="limit-note">Scoped to Shared Payment Token (SPT) #3391</p>
          </div>
        </section>

        {/* Center Column: Direct Execution */}
        <section className="execution-column">
          <div className="transfer-card">
            <div className="method-tabs">
              <button 
                className={`tab ${method === "email" ? "active" : ""}`}
                onClick={() => setMethod("email")}
              >
                <Mail size={16} /> Email
              </button>
              <button 
                className={`tab ${method === "mobile" ? "active" : ""}`}
                onClick={() => setMethod("mobile")}
              >
                <Smartphone size={16} /> Mobile
              </button>
              <button 
                className={`tab ${method === "stablecoin" ? "active" : ""}`}
                onClick={() => setMethod("stablecoin")}
              >
                <Globe size={16} /> Stablecoin
              </button>
            </div>

            <div className="transfer-form">
              <div className="input-group">
                <label>Recipient {method === "email" ? "Email" : method === "mobile" ? "Number" : "Wallet"}</label>
                <input 
                  type="text" 
                  placeholder={method === "email" ? "recipient@email.com" : method === "mobile" ? "+91 ..." : "0x..."} 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Amount (USD)</label>
                <div className="amount-input">
                  <span className="currency">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="fee-breakdown">
                <div className="fee-line">
                  <span>Exchange Rate (Stripe FX)</span>
                  <span>1 USD = 83.42 INR</span>
                </div>
                <div className="fee-line total">
                  <span>Total Settlement</span>
                  <span>${amount || "0.00"}</span>
                </div>
              </div>

              <button 
                className={`execute-btn ${isProcessing ? "loading" : ""}`}
                onClick={handleSend}
                disabled={isProcessing}
              >
                {isProcessing ? "Verifying Transaction..." : "Authorize Global Payout"}
                <Zap size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Telemetry */}
        <section className="telemetry-column">
          <div className="telemetry-card">
            <div className="card-header">
              <Clock size={18} />
              <h3>Real-time Settlement Hub</h3>
            </div>
            <div className="transaction-list">
              {transactions.map(tx => (
                <div key={tx.id} className="tx-item">
                  <div className={`tx-icon ${tx.status}`}>
                    {tx.status === "completed" ? <CheckCircle2 size={16} /> : 
                     tx.status === "processing" ? <Clock size={16} /> : <ShieldCheck size={16} />}
                  </div>
                  <div className="tx-info">
                    <div className="tx-recipient">{tx.recipient}</div>
                    <div className="tx-meta">{tx.type.toUpperCase()} • {tx.timestamp}</div>
                  </div>
                  <div className="tx-amount">
                    <div className="val">-${tx.amount}</div>
                    <div className={`status-pill ${tx.status}`}>{tx.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .payments-page { min-height: 100vh; background: #0a0a0b; color: #fff; font-family: 'Outfit', sans-serif; padding-top: 80px; }
        
        /* Nav */
        .payments-nav { 
          position: fixed; top: 0; left: 0; right: 0; height: 80px; 
          background: rgba(10,10,11,0.8); backdrop-filter: blur(20px); 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 0 40px; border-bottom: 1px solid rgba(255,255,255,0.05); z-index: 100;
        }
        .nav-left { display: flex; align-items: center; gap: 24px; }
        .back-link { color: #888; transition: 0.2s; }
        .back-link:hover { color: #fff; transform: translateX(-4px); }
        .nav-brand { display: flex; align-items: center; gap: 12px; }
        .nav-brand h1 { font-size: 1.4rem; font-weight: 900; letter-spacing: -0.5px; }
        .version { font-size: 0.6rem; color: #ef4444; background: rgba(239,68,68,0.1); padding: 2px 8px; border-radius: 4px; vertical-align: middle; margin-left: 8px; }
        
        .nav-right { display: flex; align-items: center; gap: 32px; }
        .security-badge { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; font-weight: 700; color: #10b981; background: rgba(16,185,129,0.1); padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(16,185,129,0.2); }
        
        .user-profile { display: flex; align-items: center; gap: 12px; }
        .user-info { text-align: right; }
        .user-name { display: block; font-size: 0.8rem; font-weight: 800; }
        .node-status { display: block; font-size: 0.6rem; color: #666; font-weight: 600; }
        .user-avatar { width: 40px; height: 40px; background: #222; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); }

        /* Grid */
        .payments-grid { max-width: 1400px; margin: 0 auto; padding: 40px; display: grid; grid-template-columns: 350px 1fr 380px; gap: 32px; height: calc(100vh - 80px); }
        
        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .card-header h2, .card-header h3 { font-size: 1rem; font-weight: 800; }

        /* Agent Column */
        .intelligence-card { background: #151516; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; overflow: hidden; height: 480px; margin-bottom: 32px; }
        .agent-chat { flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }
        .message { display: flex; gap: 12px; }
        .bot-icon { width: 28px; height: 28px; background: #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 900; flex-shrink: 0; }
        .bubble { background: #1e1e1f; padding: 12px 16px; border-radius: 0 16px 16px 16px; font-size: 0.85rem; color: #ccc; line-height: 1.5; border: 1px solid rgba(255,255,255,0.03); }
        .thought .bubble { background: rgba(239,68,68,0.05); color: #ef4444; font-size: 0.75rem; border: 1px dashed rgba(239,68,68,0.3); }
        .agent-footer { padding: 16px; background: #1a1a1b; border-top: 1px solid rgba(255,255,255,0.05); }
        .input-box { background: #0a0a0b; border-radius: 12px; display: flex; align-items: center; padding: 4px 4px 4px 16px; border: 1px solid rgba(255,255,255,0.1); }
        .input-box input { flex: 1; background: transparent; border: none; color: #fff; font-size: 0.8rem; outline: none; }
        .send-btn { width: 32px; height: 32px; background: #ef4444; border: none; border-radius: 8px; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
        
        .limits-card { background: linear-gradient(135deg, rgba(239,68,68,0.1) 0%, transparent 100%); padding: 24px; border-radius: 24px; border: 1px solid rgba(239,68,68,0.2); }
        .limit-row { display: flex; justify-content: space-between; margin: 16px 0 8px; font-size: 0.75rem; font-weight: 700; color: #888; }
        .limit-row .value { color: #fff; }
        .limit-bar { height: 6px; background: rgba(255,255,255,0.05); border-radius: 100px; overflow: hidden; margin-bottom: 12px; }
        .limit-progress { height: 100%; background: #ef4444; box-shadow: 0 0 10px rgba(239,68,68,0.5); }
        .limit-note { font-size: 0.6rem; color: #555; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        /* Execution Column */
        .transfer-card { background: #151516; border-radius: 32px; border: 1px solid rgba(255,255,255,0.05); padding: 40px; }
        .method-tabs { display: flex; background: #0a0a0b; padding: 6px; border-radius: 16px; margin-bottom: 40px; border: 1px solid rgba(255,255,255,0.05); }
        .tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; background: transparent; border: none; color: #666; font-size: 0.8rem; font-weight: 700; padding: 12px; border-radius: 12px; cursor: pointer; transition: 0.2s; }
        .tab.active { background: #222; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }

        .transfer-form { display: flex; flex-direction: column; gap: 32px; }
        .input-group label { display: block; font-size: 0.75rem; font-weight: 800; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .input-group input { width: 100%; background: #0a0a0b; border: 1px solid rgba(255,255,255,0.08); padding: 16px 20px; border-radius: 16px; color: #fff; font-size: 1.1rem; font-weight: 600; transition: 0.3s; }
        .input-group input:focus { border-color: #ef4444; box-shadow: 0 0 20px rgba(239,68,68,0.1); outline: none; }
        
        .amount-input { position: relative; }
        .currency { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; font-weight: 900; color: #ef4444; }
        .amount-input input { padding-left: 40px; }

        .fee-breakdown { background: #1a1a1b; border-radius: 20px; padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .fee-line { display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-weight: 600; }
        .fee-line.total { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; margin-top: 4px; color: #fff; font-weight: 800; font-size: 0.9rem; }

        .execute-btn { background: #ef4444; border: none; padding: 20px; border-radius: 20px; color: #000; font-weight: 900; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .execute-btn:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 15px 30px rgba(239,68,68,0.3); }
        .execute-btn.loading { opacity: 0.7; background: #333; color: #ef4444; }

        /* Telemetry Column */
        .telemetry-card { background: #151516; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05); padding: 24px; height: 100%; display: flex; flex-direction: column; }
        .transaction-list { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
        .tx-item { background: #1a1a1b; padding: 16px; border-radius: 16px; display: flex; align-items: center; gap: 16px; border: 1px solid transparent; transition: 0.2s; }
        .tx-item:hover { border-color: rgba(255,255,255,0.05); transform: translateX(4px); }
        .tx-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tx-icon.completed { background: rgba(16,185,129,0.1); color: #10b981; }
        .tx-icon.processing { background: rgba(245,158,11,0.1); color: #f59e0b; animation: pulse 2s infinite; }
        .tx-icon.verified { background: rgba(59,130,246,0.1); color: #3b82f6; }
        .tx-info { flex: 1; }
        .tx-recipient { font-size: 0.8rem; font-weight: 800; color: #fff; margin-bottom: 2px; }
        .tx-meta { font-size: 0.6rem; color: #666; font-weight: 700; }
        .tx-amount { text-align: right; }
        .tx-amount .val { font-size: 0.9rem; font-weight: 900; color: #fff; margin-bottom: 4px; }
        .status-pill { font-size: 0.5rem; font-weight: 900; text-transform: uppercase; padding: 2px 8px; border-radius: 100px; display: inline-block; }
        .status-pill.completed { background: #10b981; color: #000; }
        .status-pill.processing { background: #f59e0b; color: #000; }
        .status-pill.verified { background: #3b82f6; color: #fff; }

        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        
        .typing-dot { display: inline-block; width: 4px; height: 4px; background: #ef4444; border-radius: 50%; margin-right: 3px; animation: bounce 0.6s infinite alternate; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce { from { transform: translateY(0); } to { transform: translateY(-4px); } }

        @media (max-width: 1200px) {
          .payments-grid { grid-template-columns: 1fr; height: auto; }
          .agent-column, .telemetry-column { order: 2; }
          .execution-column { order: 1; }
        }
      `}</style>
    </main>
  );
}
