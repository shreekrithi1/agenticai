import fs from "fs";
import path from "path";

// Simple file-based JSON database for prototype persistency
const DB_PATH = path.join(process.cwd(), "data", "parallel_stocks_db.json");

export interface DBState {
  last_updated: string; // ISO date string
  stocks: any[];
}

export function readDB(): DBState | null {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to read DB:", error);
  }
  return null;
}

export function writeDB(state: DBState) {
  try {
    // Ensure data directory exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write DB:", error);
  }
}

export function isDBStale(lastUpdatedStr: string): boolean {
  // We want to update once per day after 6 AM PST.
  // For simplicity, we check if the calendar day has changed in UTC or if it's been > 24 hours.
  const lastUpdated = new Date(lastUpdatedStr);
  const now = new Date();
  
  // Difference in hours
  const diffHours = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
  return diffHours >= 24;
}
