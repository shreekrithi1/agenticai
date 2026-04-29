export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  timestamp: string; // ISO
  image: string;
  source: string;
  region: string;
  factCheckScore: number; // 0-10
}

const CATEGORIES = ["Top Stories", "India", "Technology", "Agriculture", "Business", "World"];

export async function getLatestNews(language: string = "English", category: string = "Top Stories"): Promise<NewsItem[]> {
  // Simulating real-time high-fidelity news feed
  // In production, this would hit a news API (e.g. NewsAPI, GNews) or scrape trusted sources
  
  const news: NewsItem[] = [
    {
      id: "1",
      title: "Bharat Mission 2026: New Digital Infrastructure for Rural Empowerment Launched",
      summary: "Government announces a sovereign stack for precision agriculture, integrating real-time climate telemetry across 1.4 lakh villages.",
      category: "India",
      timestamp: new Date().toISOString(),
      image: "https://images.unsplash.com/photo-1532375811409-ca46d79dcb06?auto=format&fit=crop&q=80&w=800",
      source: "AgriMind Intelligence",
      region: "New Delhi",
      factCheckScore: 9.8
    },
    {
      id: "2",
      title: "Nifty 100 Touches Record High Amidst Global Tech Rally",
      summary: "Indian indices surged 1.5% as local tech giants report robust Q4 earnings, outperforming Wall Street peers.",
      category: "Business",
      timestamp: new Date(Date.now() - 30000).toISOString(),
      image: "https://images.unsplash.com/photo-1611974717483-9b250201994e?auto=format&fit=crop&q=80&w=800",
      source: "Market Analytics",
      region: "Mumbai",
      factCheckScore: 9.5
    },
    {
      id: "3",
      title: "Gemma 3 Deployment Scales Across Indian Topography",
      summary: "AI agents grounded in regional soil matrices are now providing precision advice to farmers in 15+ states.",
      category: "Technology",
      timestamp: new Date(Date.now() - 60000).toISOString(),
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800",
      source: "AgriMind Beyond",
      region: "Bengaluru",
      factCheckScore: 9.9
    },
    {
      id: "4",
      title: "Monsoon Forecast 2026: Normal Rainfall Expected Across Southern Peninsula",
      summary: "Meteorological departments release favorable outlook for the upcoming season, boosting kharif crop sentiments.",
      category: "Agriculture",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      image: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&q=80&w=800",
      source: "Climate Watch",
      region: "Kochi",
      factCheckScore: 8.7
    },
    {
      id: "5",
      title: "Mumbai Infrastructure: Coastal Road Project Enters Final Phase",
      summary: "Connectivity between South Mumbai and suburbs to be revolutionized by next quarter with new undersea tunnel.",
      category: "India",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      image: "https://images.unsplash.com/photo-1567185392511-832030040685?auto=format&fit=crop&q=80&w=800",
      source: "National Pulse",
      region: "Mumbai",
      factCheckScore: 9.2
    },
    {
      id: "6",
      title: "Global Supply Chains: India Emerges as Semiconductor Hub",
      summary: "Three new fabrication plants greenlit in Gujarat as global tech leaders pivot manufacturing to Bharat.",
      category: "Business",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      source: "World Trade Monitor",
      region: "Gandhinagar",
      factCheckScore: 9.4
    }
  ];

  // Filtering by category if not Top Stories
  const filtered = category === "Top Stories" ? news : news.filter(n => n.category === category);

  // Simulating translation if language is not English
  const TRANSLATIONS: Record<string, any> = {
    "Hindi": {
      "Bharat Mission 2026": "भारत मिशन 2026: ग्रामीण सशक्तिकरण के लिए नया डिजिटल बुनियादी ढांचा शुरू किया गया",
      "Nifty 100": "निफ्टी 100 रिकॉर्ड ऊंचाई पर, वैश्विक टेक रैली के बीच",
      "Gemma 3": "जेम्मा 3 की तैनाती भारतीय स्थलाकृति में व्यापक",
      "Monsoon": "मानसून पूर्वानुमान 2026: सामान्य वर्षा की उम्मीद",
      "Mumbai": "मुंबई इंफ्रास्ट्रक्चर: तटीय सड़क परियोजना अंतिम चरण में",
      "Semiconductor": "वैश्विक आपूर्ति श्रृंखला: भारत सेमीकंडक्टर हब के रूप में उभरा"
    },
    "Telugu": {
      "Bharat Mission 2026": "భారత్ మిషన్ 2026: గ్రామీణ సాధికారత కోసం కొత్త డిజిటల్ మౌలిక సదుపాయాలు ప్రారంభం",
      "Nifty 100": "నిఫ్టీ 100 రికార్డు స్థాయికి, గ్లోబల్ టెక్ ర్యాలీ మధ్య",
      "Gemma 3": "జెమ్మా 3 విస్తరణ భారతీయ భూభాగంలో విస్తృతంగా ఉంది",
      "Monsoon": "మాన్సూన్ అంచనా 2026: సాధారణ వర్షపాతం అంచనా",
      "Mumbai": "ముంబై ఇన్ఫ్రాస్ట్రక్చర్: కోస్టల్ రోడ్ ప్రాజెక్ట్ తుది దశకు చేరుకుంది",
      "Semiconductor": "గ్లోబల్ సప్లై చైన్స్: సెమీకండక్టర్ హబ్‌గా భారత్ ఆవిర్భావం"
    },
    "Tamil": {
      "Bharat Mission 2026": "பாரத் மிஷன் 2026: கிராமப்புற அதிகாரமளிப்பிற்கான புதிய டிஜிட்டல் உள்கட்டமைப்பு தொடங்கப்பட்டது",
      "Nifty 100": "நிஃப்டி 100 சாதனை உச்சத்தை தொட்டது, உலகளாவிய டெக் பேரணிக்கு மத்தியில்",
      "Gemma 3": "ஜெம்மா 3 வரிசைப்படுத்தல் இந்திய நிலப்பரப்பில் விரிவானது",
      "Monsoon": "மழைக்கால முன்னறிவிப்பு 2026: சாதாரண மழைப்பொழிவு எதிர்பார்க்கப்படுகிறது",
      "Mumbai": "மும்பை உள்கட்டமைப்பு: கடலோர சாலைத் திட்டம் இறுதி கட்டத்தை எட்டியுள்ளது",
      "Semiconductor": "உலகளாவிய விநியோகச் சங்கிலிகள்: செமிகண்டக்டர் மையமாக பாரதம் உருவெடுக்கிறது"
    }
  };

  if (language !== "English" && TRANSLATIONS[language]) {
    const dict = TRANSLATIONS[language];
    return filtered.map(n => {
      let translatedTitle = n.title;
      // Simple keyword matching for simulation
      if (n.title.includes("Bharat Mission")) translatedTitle = dict["Bharat Mission 2026"];
      if (n.title.includes("Nifty 100")) translatedTitle = dict["Nifty 100"];
      if (n.title.includes("Gemma 3")) translatedTitle = dict["Gemma 3"];
      if (n.title.includes("Monsoon")) translatedTitle = dict["Monsoon"];
      if (n.title.includes("Mumbai")) translatedTitle = dict["Mumbai"];
      if (n.title.includes("Semiconductor")) translatedTitle = dict["Semiconductor"];

      return {
        ...n,
        title: translatedTitle,
        summary: `[${language}] Analysis of this intelligence node is now available in your native script.`,
        source: `${n.source} (${language})`
      };
    });
  }

  return filtered;
}
