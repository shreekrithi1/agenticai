# TripMind AI ✈️

**Autonomous Agentic Travel Orchestrator**

TripMind AI is a state-of-the-art web application that leverages multi-agent orchestration to automate the complexities of travel planning. By coordinating specialized agents for calendar management, travel logistics, weather analysis, and budget optimization, TripMind provides a seamless "one-click" itinerary generation experience.

## ✨ Features

- **🧠 Agentic Intelligence**: Watch the AI "think" through its chain-of-thought in real-time.
- **📅 Smart Scheduling**: Automatic calendar conflict detection and tentative slot blocking.
- **🏨 Multi-Asset Booking**: Parallel searching for flights, 4-star hotels, and car rentals.
- **💰 Budget Guardrails**: Real-time validation to ensure all plans stay within financial constraints.
- **☁️ Climate Insights**: Localized weather forecasts with packing and activity recommendations.
- **💎 Premium UI**: Modern glassmorphic design system with a dark-mode first aesthetic.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Logic**: Custom Agentic Orchestration Framework
- **Design**: Vanilla CSS with Glassmorphism & Micro-animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) to start planning your next trip.

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router & Global Styles
├── lib/
│   └── agents/       # Orchestration & Agent Logic
│       ├── tools/    # Specialized Agent Tools (Calendar, Budget, etc.)
│       └── types.ts  # Shared Type Definitions
```

## 📄 License

MIT License - feel free to use and extend!
