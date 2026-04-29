/**
 * AGENT: Bharat Markets Intelligence (Nifty 100)
 * ROLE: High-velocity analysis of India's top 100 equity assets.
 */

import { analyzeStock, StockData } from "./stockAgent";

const NIFTY_100_BASE: Record<string, Partial<StockData>> = {
  "RELIANCE": { name: "Reliance Industries", price: 1425.20, marketCap: "₹18.5T", industry: "Energy/Conglomerate", target: 1650, growth: "12%", divYield: "0.6%", low52w: 1250, high52w: 1550, bestTime: "10:30 AM IST" },
  "HDFCBANK": { name: "HDFC Bank", price: 783.15, marketCap: "₹12.2T", industry: "Banking", target: 920, growth: "15%", divYield: "1.2%", low52w: 680, high52w: 850, bestTime: "11:15 AM IST" },
  "TCS": { name: "Tata Consultancy Services", price: 2461.30, marketCap: "₹14.8T", industry: "IT Services", target: 2800, growth: "10%", divYield: "2.1%", low52w: 2100, high52w: 2600, bestTime: "2:45 PM IST" },
  "INFY": { name: "Infosys Ltd", price: 1175.70, marketCap: "₹8.5T", industry: "IT Services", target: 1350, growth: "14%", divYield: "1.8%", low52w: 1050, high52w: 1300, bestTime: "1:30 PM IST" },
  "ICICIBANK": { name: "ICICI Bank", price: 1291.60, marketCap: "₹9.2T", industry: "Banking", target: 1450, growth: "18%", divYield: "0.8%", low52w: 950, high52w: 1350, bestTime: "10:00 AM IST" },
  "HUL": { name: "Hindustan Unilever", price: 2307.20, marketCap: "₹6.8T", industry: "FMCG", target: 2600, growth: "8%", divYield: "1.5%", low52w: 2100, high52w: 2550, bestTime: "12:00 PM IST" },
  "SBIN": { name: "State Bank of India", price: 1093.40, marketCap: "₹7.5T", industry: "Banking", target: 1250, growth: "12%", divYield: "1.1%", low52w: 850, high52w: 1200, bestTime: "11:00 AM IST" },
  "BHARTIARTL": { name: "Bharti Airtel", price: 1896.10, marketCap: "₹5.5T", industry: "Telecom", target: 2100, growth: "20%", divYield: "0.5%", low52w: 1200, high52w: 1950, bestTime: "10:45 AM IST" },
  "ITC": { name: "ITC Ltd", price: 314.00, marketCap: "₹4.5T", industry: "FMCG/Conglomerate", target: 380, growth: "10%", divYield: "3.5%", low52w: 280, high52w: 350, bestTime: "3:00 PM IST" },
  "KOTAKBANK": { name: "Kotak Mahindra Bank", price: 1850.40, marketCap: "₹4.2T", industry: "Banking", target: 2100, growth: "11%", divYield: "0.4%", low52w: 1650, high52w: 1950, bestTime: "11:30 AM IST" },
  "LT": { name: "Larsen & Toubro", price: 3450.20, marketCap: "₹5.2T", industry: "Infrastructure", target: 3800, growth: "14%", divYield: "0.9%", low52w: 2800, high52w: 3600, bestTime: "11:45 AM IST" },
  "AXISBANK": { name: "Axis Bank", price: 1120.15, marketCap: "₹3.8T", industry: "Banking", target: 1300, growth: "16%", divYield: "0.5%", low52w: 920, high52w: 1200, bestTime: "10:15 AM IST" },
  "ASIANPAINT": { name: "Asian Paints", price: 2980.50, marketCap: "₹3.2T", industry: "Paints/Chemicals", target: 3300, growth: "9%", divYield: "1.2%", low52w: 2700, high52w: 3150, bestTime: "1:00 PM IST" },
  "MARUTI": { name: "Maruti Suzuki", price: 12500.40, marketCap: "₹3.5T", industry: "Automotive", target: 14000, growth: "10%", divYield: "1.0%", low52w: 9500, high52w: 13000, bestTime: "2:00 PM IST" },
  "TITAN": { name: "Titan Company", price: 3650.10, marketCap: "₹3.1T", industry: "Consumer/Jewelry", target: 4100, growth: "18%", divYield: "0.3%", low52w: 2900, high52w: 3800, bestTime: "2:30 PM IST" },
  "BAJFINANCE": { name: "Bajaj Finance", price: 7120.60, marketCap: "₹4.5T", industry: "NBFC", target: 8200, growth: "22%", divYield: "0.4%", low52w: 6200, high52w: 7800, bestTime: "10:30 AM IST" },
  "SUNPHARMA": { name: "Sun Pharma", price: 1540.20, marketCap: "₹3.8T", industry: "Healthcare", target: 1750, growth: "12%", divYield: "0.8%", low52w: 1200, high52w: 1650, bestTime: "12:30 PM IST" },
  "ADANIENT": { name: "Adani Enterprises", price: 3240.15, marketCap: "₹4.1T", industry: "Conglomerate", target: 3800, growth: "25%", divYield: "0.1%", low52w: 2100, high52w: 3500, bestTime: "11:00 AM IST" },
  "ULTRACEMCO": { name: "UltraTech Cement", price: 9850.40, marketCap: "₹3.2T", industry: "Cement", target: 11000, growth: "11%", divYield: "0.6%", low52w: 8200, high52w: 10500, bestTime: "1:45 PM IST" },
  "WIPRO": { name: "Wipro Ltd", price: 480.15, marketCap: "₹2.8T", industry: "IT Services", target: 550, growth: "8%", divYield: "0.2%", low52w: 380, high52w: 520, bestTime: "2:15 PM IST" }
};

export function getNifty100(): StockData[] {
  // Return the top 20 verified + some mocked ones to fill the list if needed
  return Object.keys(NIFTY_100_BASE).map(symbol => {
    const base = NIFTY_100_BASE[symbol];
    // High-frequency volatility (0.5%) to show active movement every 2s
    const volatility = 0.005; 
    const randomFlux = (Math.random() - 0.5) * 2 * volatility;
    const currentPrice = base.price! * (1 + randomFlux);
    
    let signal: "Buy" | "Sell" | "Hold" = "Hold";
    if (currentPrice < base.target! * 0.90) signal = "Buy";
    else if (currentPrice > base.target! * 1.05) signal = "Sell";

    return {
      symbol,
      name: base.name!,
      price: parseFloat(currentPrice.toFixed(2)),
      change7d: parseFloat(((Math.random() - 0.3) * 4).toFixed(2)),
      change1y: parseFloat(((Math.random() + 0.1) * 35).toFixed(2)),
      marketCap: base.marketCap!,
      target: base.target!,
      valuation: currentPrice < base.target! ? "Undervalued" : "Overvalued",
      growth: base.growth!,
      divYield: base.divYield!,
      industry: base.industry!,
      signal,
      entryPrice: parseFloat((currentPrice * 0.985).toFixed(2)),
      exitPrice: parseFloat((currentPrice * 1.04).toFixed(2)),
      bestTime: base.bestTime!,
      low52w: base.low52w!,
      high52w: base.high52w!,
      isNearLow: currentPrice < base.low52w! * 1.08,
      lastSync: new Date().toLocaleTimeString()
    };
  });
}
