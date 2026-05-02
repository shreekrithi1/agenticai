"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Search, 
  Bookmark, 
  Map as MapIcon, 
  Clock, 
  Archive, 
  Book, 
  Menu, 
  Globe, 
  ChevronRight,
  Sparkles,
  Zap,
  Quote
} from "lucide-react";
import Link from "next/link";

// --- Types ---
type ViewState = 'states' | 'personalities' | 'detail';

interface Lesson {
  title: string;
  description: string;
  color: string;
}

interface Milestone {
  year: string;
  event: string;
}

interface Translation {
  name: string;
  title: string;
  tag: string;
  bio: string;
  fullBio?: string;
  years: string;
  lessons?: Lesson[];
  milestones?: Milestone[];
  quote?: string;
}

interface Legend {
  id: string;
  image: string;
  historicalImage?: string;
  translations: Record<string, Translation>;
}

interface StateData {
  name: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
  legends: Legend[];
}

// --- Data ---
const DATA: StateData[] = [
  {
    name: "Andhra Pradesh",
    tagline: "Gems of the Telugu Heartland",
    description: "Discover the land of revolutionary fire and artistic finesse. From the hills of Manyam to the courts of Vijayanagara.",
    image: "https://images.unsplash.com/photo-1623122176092-23f99097d740?auto=format&fit=crop&q=80&w=800",
    accentColor: "#ff9f1c",
    legends: [
      {
        id: "ntr",
        image: "https://images.unsplash.com/photo-1614583225154-5feade0733ec?auto=format&fit=crop&q=80&w=800", // Representative portrait
        historicalImage: "https://images.unsplash.com/photo-1541533230302-6186a99b6f6c?auto=format&fit=crop&q=80&w=800", // Campaign crowd
        translations: {
          en: {
            name: "Nandamuri Taraka Rama Rao",
            title: "The Titan of the Telugu Land",
            tag: "ICON OF THE PEOPLE",
            bio: "A titan who transcended the silver screen to shape the destiny of a million lives. Known for his divine portrayals and revolutionary leadership.",
            fullBio: "Nandmuri Taraka Rama Rao (NTR) was more than a film star; he was a cultural phenomenon who transitioned from being the quintessential celluloid god to a political messiah. Born in the humble village of Nimmakuru, his journey spanned over 300 films, where he embodied deities like Lord Krishna and Rama with such conviction that millions began to view him as a divine entity. In 1982, NTR embarked on his most significant role - the savior of Telugu pride.",
            years: "1923 - 1996",
            quote: "Society is the temple. The people are the Gods.",
            lessons: [
              { title: "Upholding Self-Respect", description: "NTR's entire political career was built on Atma Gauravam (Self-Respect). He taught that identity and dignity are the foundations of any meaningful progress.", color: "#8b4513" },
              { title: "Power of Pace", description: "From party launch to election victory in just 9 months - proving that conviction and momentum can overcome any institutional barrier.", color: "#d2691e" },
              { title: "People's Connection", description: "He lived among the people during his campaigns, eating their food and sleeping in his van. Genuine empathy is the only true leadership currency.", color: "#556b2f" },
              { title: "Creative Reformist", description: "He mastered acting, screenwriting, and directing before mastering governance. He proves that creativity is not a silo, but a tool-kit for solving world problems.", color: "#2f4f4f" }
            ],
            milestones: [
              { year: "1949", event: "Mana Desam debut that launched a thousand ships." },
              { year: "1982", event: "Founded Telugu Desam Party to restore Telugu pride." },
              { year: "1983", event: "Became Chief Minister after a historic 9-month campaign." }
            ]
          }
        }
      },
      {
        id: "alluri",
        image: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800", // Representative warrior
        translations: {
          en: {
            name: "Alluri Sitarama Raju",
            title: "Manyam Veerudu: Hero of the Jungles",
            tag: "REVOLUTIONARY",
            bio: "Led the Rampa Rebellion against British colonial rule. A master of guerrilla warfare who protected tribal rights.",
            years: "1897 - 1924"
          }
        }
      },
      {
        id: "sarojini",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800", // Representative poet
        translations: {
          en: {
            name: "Sarojini Naidu",
            title: "The Nightingale of India",
            tag: "POETRY",
            bio: "A prolific poet and pivotal figure in the independence movement. The first woman to become the Governor of an Indian state.",
            years: "1879 - 1949"
          }
        }
      }
    ]
  },
  {
    name: "Rajasthan",
    tagline: "Lord of Kings",
    description: "Discover the valor of Rajput warriors and the timeless romance of desert ballads.",
    image: "https://images.unsplash.com/photo-1599661046289-e318978df6b1?auto=format&fit=crop&q=80&w=800",
    accentColor: "#e67e22",
    legends: []
  },
  {
    name: "Kerala",
    tagline: "God's Own Country",
    description: "Legends of Mahabali and the rhythmic tales of the emerald backwaters.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
    accentColor: "#27ae60",
    legends: []
  },
  {
    name: "Tamil Nadu",
    tagline: "Land of Cholas",
    description: "The land of Chola kings and the divine echoes of ancient Dravidian chants.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    accentColor: "#e74c3c",
    legends: []
  },
  {
    name: "West Bengal",
    tagline: "Poetic Soul of Bharat",
    description: "Mystical folk tales from the Sundarbans and the poetic soul of Bengal.",
    image: "https://images.unsplash.com/photo-1590050752117-23a9d7fc217c?auto=format&fit=crop&q=80&w=800",
    accentColor: "#9b59b6",
    legends: []
  },
  {
    name: "Maharashtra",
    tagline: "Saints and Warriors",
    description: "Forts that whisper tales of Shivaji's bravery and the saints of Bhakti.",
    image: "https://images.unsplash.com/photo-1626291664852-514e2277d37d?auto=format&fit=crop&q=80&w=800",
    accentColor: "#d35400",
    legends: []
  },
  {
    name: "Punjab",
    tagline: "Land of the Five Rivers",
    description: "The spirit of courage, the soil of sacrifice, and the rhythm of the Bhangra.",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80&w=800",
    accentColor: "#f1c40f",
    legends: []
  },
  {
    name: "Karnataka",
    tagline: "Empire of Heritage",
    description: "The stone-carved dreams of Hampi and the tech-infused spirit of Bengaluru.",
    image: "https://images.unsplash.com/photo-1600100397608-f010e445083a?auto=format&fit=crop&q=80&w=800",
    accentColor: "#3498db",
    legends: []
  },
  {
    name: "Haryana",
    tagline: "Land of Mahabharata",
    description: "The historic battlefield of Kurukshetra and the modern industrial spirit of Gurugram.",
    image: "https://images.unsplash.com/photo-1610412430378-500742111b7f?auto=format&fit=crop&q=80&w=800",
    accentColor: "#f39c12",
    legends: []
  },
  {
    name: "Goa",
    tagline: "Pearl of the Orient",
    description: "The fusion of Indo-Portuguese culture and the pristine shores of the Arabian Sea.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    accentColor: "#1abc9c",
    legends: []
  },
  {
    name: "Uttarakhand",
    tagline: "Land of the Gods",
    description: "Majestic Himalayan peaks and the sacred origins of the Ganga and Yamuna.",
    image: "https://images.unsplash.com/photo-1584285418504-03512e032f91?auto=format&fit=crop&q=80&w=800",
    accentColor: "#3498db",
    legends: []
  },
  {
    name: "Telangana",
    tagline: "Pride of the Deccan",
    description: "The land of the Kakatiya dynasty and the Nawabi grandeur of Hyderabad.",
    image: "https://images.unsplash.com/photo-1605367102148-f6858e801458?auto=format&fit=crop&q=80&w=800",
    accentColor: "#f1c40f",
    legends: []
  },
  {
    name: "Gujarat",
    tagline: "Land of Legends",
    description: "From the salt deserts of Kutch to the home of the Asiatic lion in Gir.",
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&q=80&w=800",
    accentColor: "#e67e22",
    legends: []
  },
  {
    name: "Uttar Pradesh",
    tagline: "Heartland of Spirituality",
    description: "The cradle of Indian civilization and the spiritual echoes of Varanasi.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800",
    accentColor: "#f39c12",
    legends: []
  },
  {
    name: "Bihar",
    tagline: "Cradle of Enlightenment",
    description: "Where Buddha attained nirvana and the ancient Nalanda university flourished.",
    image: "https://images.unsplash.com/photo-1622194948162-197af692295a?auto=format&fit=crop&q=80&w=800",
    accentColor: "#27ae60",
    legends: []
  },
  {
    name: "Assam",
    tagline: "Gateway to the Northeast",
    description: "The land of one-horned rhinos and the mighty Brahmaputra river.",
    image: "https://images.unsplash.com/photo-1602758161706-e07e866699e1?auto=format&fit=crop&q=80&w=800",
    accentColor: "#16a085",
    legends: []
  },
  {
    name: "Odisha",
    tagline: "Soul of Incredible India",
    description: "The architectural marvels of Konark and the spiritual fervor of Puri.",
    image: "https://images.unsplash.com/photo-1599341626413-989d34740cd2?auto=format&fit=crop&q=80&w=800",
    accentColor: "#d35400",
    legends: []
  },
  {
    name: "Madhya Pradesh",
    tagline: "The Heart of India",
    description: "Ancient caves of Bhimbetka and the magnificent temples of Khajuraho.",
    image: "https://images.unsplash.com/photo-1565463740268-245c79679f2d?auto=format&fit=crop&q=80&w=800",
    accentColor: "#7f8c8d",
    legends: []
  },
  {
    name: "Himachal Pradesh",
    tagline: "Abode of the Gods",
    description: "Snow-capped Himalayan peaks and the serene valleys of Shimla and Manali.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    accentColor: "#3498db",
    legends: []
  },
  {
    name: "Jammu & Kashmir",
    tagline: "Paradise on Earth",
    description: "The floating gardens of Dal Lake and the majestic Sufi heritage of Srinagar.",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800",
    accentColor: "#2980b9",
    legends: []
  }
];

// --- Components ---

export default function LegendsFromIndia() {
  const [view, setView] = useState<ViewState>('states');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [selectedLegend, setSelectedLegend] = useState<Legend | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState("en");

  const filteredStates = useMemo(() => {
    return DATA.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // View Handlers
  const openState = (state: StateData) => {
    setSelectedState(state);
    setView('personalities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegend = (legend: Legend) => {
    setSelectedLegend(legend);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (view === 'detail') setView('personalities');
    else if (view === 'personalities') setView('states');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1e293b] font-sans pb-24 overflow-x-hidden">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#f8fafc]/90 backdrop-blur-md border-b border-[#1e293b]/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button className="p-2 -ml-2 text-[#64748b] hover:text-[#1e293b] transition-colors" onClick={view !== 'states' ? goBack : undefined}>
            {view === 'states' ? <Menu size={20} /> : <ArrowLeft size={20} />}
          </button>
          <h2 className="text-xl font-black tracking-tighter text-[#1e293b]">India Legends</h2>
          <button className="p-2 -mr-2 text-[#64748b] hover:text-[#1e293b] transition-colors">
            <Globe size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        
        {/* --- View: State List --- */}
        {view === 'states' && (
          <motion.div 
            key="states"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-6xl mx-auto px-6 py-8"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-[#1e293b] mb-4 leading-tight tracking-tighter">
                Explore <span className="text-[#10b981]">Bharat</span>
              </h1>
              <p className="text-sm leading-relaxed text-[#64748b] font-medium max-w-sm mx-auto">
                Journey through the vibrant tapestry of national icons and state legends.
              </p>
            </div>

            <div className="relative mb-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
              <input 
                type="text" 
                placeholder="Search for a state..." 
                className="w-full bg-[#f1f5f9] border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 transition-all text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStates.map((state, idx) => (
                <div 
                  key={state.name}
                  onClick={() => openState(state)}
                  className="bg-[#f1f5f9] rounded-[24px] overflow-hidden cursor-pointer group transition-all hover:bg-[#e2e8f0] active:scale-[0.98]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={state.image} alt={state.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {idx === 0 && (
                      <div className="absolute top-4 left-4 bg-[#10b981] text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black text-[#1e293b] tracking-tighter">{state.name}</h3>
                      <div className="p-2 rounded-full bg-white/50 text-[#10b981] group-hover:bg-[#10b981] group-hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                    <p className="text-[11px] text-[#64748b] font-medium leading-relaxed line-clamp-2">
                      {state.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h4 className="text-lg font-black text-[#5d4037] mb-6 tracking-wide">Browse by Historical Eras</h4>
              <div className="flex justify-center gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl border-2 border-[#ff9f1c] flex items-center justify-center text-[#ff9f1c] bg-white shadow-md">
                    <Zap size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#795548]">Vedic Era</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl border border-[#3e2723]/10 flex items-center justify-center text-[#795548] bg-white">
                    <Archive size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#795548] opacity-50">Dynastic</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl border border-[#3e2723]/10 flex items-center justify-center text-[#795548] bg-white">
                    <Book size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#795548] opacity-50">Classical</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- View: Personalities List --- */}
        {view === 'personalities' && selectedState && (
          <motion.div 
            key="personalities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-6xl mx-auto"
          >
            <div className="px-6 py-8 bg-gradient-to-br from-[#10b981]/5 to-transparent">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-4">
                <span>ARCHIVE</span> <ChevronRight size={10} /> <span>{selectedState.name}</span>
              </div>
              <h1 className="text-4xl font-black text-[#1e293b] mb-8 leading-tight tracking-tighter">
                {selectedState.tagline}
              </h1>

              {/* Featured Personality */}
              {selectedState.legends.length > 0 && (
                <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#1e293b]/5 mb-10 transition-all hover:shadow-md">
                  <img src={selectedState.legends[0].image} className="w-full h-64 object-cover" />
                  <div className="p-8">
                    <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-[0.2em] mb-2 block">
                      {selectedState.legends[0].translations[lang].tag}
                    </span>
                    <h2 className="text-2xl font-black text-[#1e293b] mb-2 tracking-tighter">
                      {selectedState.legends[0].translations[lang].name}
                    </h2>
                    <p className="text-sm italic font-serif text-[#64748b] mb-4 opacity-80">
                      "{selectedState.legends[0].translations[lang].title}"
                    </p>
                    <p className="text-sm leading-relaxed text-[#475569] font-medium mb-6">
                      {selectedState.legends[0].translations[lang].bio}
                    </p>
                    <button 
                      onClick={() => openLegend(selectedState.legends[0])}
                      className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-[#0f172a]"
                    >
                      Read Biography <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Other Personalities Grid */}
            <div className="px-6 space-y-6">
              <div className="flex gap-4 border-b border-[#3e2723]/10 pb-4 mb-6">
                <span className="text-xs font-black text-[#ff9f1c] border-b-2 border-[#ff9f1c] pb-4 -mb-[18px]">ALL ERAS</span>
                <span className="text-xs font-black text-[#795548]/40">FREEDOM STRUGGLE</span>
              </div>

              {selectedState.legends.slice(1).map(legend => (
                <div 
                  key={legend.id}
                  onClick={() => openLegend(legend)}
                  className="bg-white rounded-[24px] p-4 shadow-sm flex gap-4 border border-[#1e293b]/5 transition-all hover:shadow-md"
                >
                  <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={legend.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-2 relative flex flex-col">
                    <span className="text-[8px] font-bold bg-[#10b981]/10 text-[#10b981] px-2 py-1 rounded-full mb-2 inline-block uppercase tracking-widest w-fit">
                      {legend.translations[lang].tag}
                    </span>
                    <h3 className="text-lg font-black text-[#1e293b] mb-1 tracking-tighter">{legend.translations[lang].name}</h3>
                    <p className="text-[10px] italic font-serif text-[#64748b] mb-4">{legend.translations[lang].title}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[10px] font-bold text-[#94a3b8]">{legend.translations[lang].years}</span>
                      <Bookmark size={14} className="text-[#94a3b8]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Curator's Notes */}
            <div className="m-6 p-8 bg-[#e0e0e0]/30 rounded-3xl border border-[#3e2723]/5">
              <div className="flex items-center gap-2 mb-4">
                <Archive size={16} className="text-[#8b4513]" />
                <span className="text-xs font-black uppercase tracking-widest">Curator's Notes</span>
              </div>
              <p className="text-xs leading-relaxed text-[#795548]">
                {selectedState.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* --- View: Detail View --- */}
        {view === 'detail' && selectedLegend && (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative h-[80vh] w-full">
              <img src={selectedLegend.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-[0.3em] mb-2 block">
                  ARCHIVE ID: {selectedLegend.id.toUpperCase()}-1923
                </span>
                <h1 className="text-4xl font-black text-[#1e293b] mb-2 tracking-tighter">
                  {selectedLegend.translations[lang].name}
                </h1>
                <p className="text-lg italic font-serif text-[#64748b] opacity-80">
                  "{selectedLegend.translations[lang].title}"
                </p>
              </div>
            </div>

            <div className="px-8 py-10 space-y-10">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#10b981]">Biography</h3>
                <p className="text-base leading-relaxed text-[#475569] font-medium">
                  {selectedLegend.translations[lang].fullBio || selectedLegend.translations[lang].bio}
                </p>
              </div>

              {selectedLegend.historicalImage && (
                <div className="rounded-2xl overflow-hidden shadow-lg border-8 border-white">
                  <img src={selectedLegend.historicalImage} className="w-full grayscale" />
                  <div className="bg-white p-4 text-center">
                    <p className="text-[10px] italic text-[#795548]/60">The Chaitanya Ratham Campaign, 1982</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-[#8b4513]/40">Milestones of a Legacy</h3>
                <div className="space-y-8 border-l border-[#3e2723]/10 pl-6 ml-2">
                  {selectedLegend.translations[lang].milestones?.map((m, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[31px] top-0 w-3 h-3 rounded-full bg-[#ff9f1c] border-2 border-white" />
                      <h4 className="text-3xl font-black text-[#ff9f1c]/30 mb-1">{m.year}</h4>
                      <p className="text-xs font-bold text-[#5d4037]">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-10">
                <h3 className="text-center text-xs font-black uppercase tracking-widest text-[#795548]/50">Lessons from his journey</h3>
                <div className="space-y-4">
                  {selectedLegend.translations[lang].lessons?.map((lesson, i) => (
                    <div key={i} className="rounded-3xl p-8 text-white shadow-xl" style={{ backgroundColor: lesson.color }}>
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles size={20} />
                        <h4 className="text-lg font-black">{lesson.title}</h4>
                      </div>
                      <p className="text-xs leading-relaxed opacity-90">{lesson.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedLegend.translations[lang].quote && (
                <div className="text-center py-20 px-4">
                  <Quote size={40} className="mx-auto text-[#ff9f1c]/20 mb-8" />
                  <h2 className="text-2xl font-serif italic text-[#3e2723] leading-relaxed mb-10">
                    "{selectedLegend.translations[lang].quote}"
                  </h2>
                  <div className="h-1 w-20 bg-[#ff9f1c] mx-auto mb-4" />
                  <span className="text-xs font-black uppercase tracking-widest text-[#795548]">
                    {selectedLegend.translations[lang].name}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-[#1e293b]/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-around">
          <button onClick={() => setView('states')} className={`flex flex-col items-center gap-1 transition-all ${view === 'states' ? 'text-[#10b981]' : 'text-[#64748b]'}`}>
            <div className={`p-1 px-4 rounded-full transition-all ${view === 'states' ? 'bg-[#10b981]/10' : ''}`}>
              <MapIcon size={22} strokeWidth={view === 'states' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">States</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#64748b]">
            <div className="p-1 px-4 rounded-full">
              <Clock size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Timeline</span>
          </button>
          <button onClick={() => selectedState && setView('personalities')} className={`flex flex-col items-center gap-1 transition-all ${view === 'personalities' ? 'text-[#10b981]' : 'text-[#64748b]'}`}>
            <div className={`p-1 px-4 rounded-full transition-all ${view === 'personalities' ? 'bg-[#10b981]/10' : ''}`}>
              <Archive size={22} strokeWidth={view === 'personalities' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Archive</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#64748b]">
            <div className="p-1 px-4 rounded-full">
              <Book size={22} />
            </div>
            <span className="text-[10px] font-bold tracking-tight">Library</span>
          </button>
        </div>
      </nav>

      {/* FAB */}
      <div className="fixed bottom-28 right-6 z-50">
        <button className="w-16 h-16 bg-[#10b981] text-white rounded-[20px] shadow-xl flex items-center justify-center transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95">
          <Sparkles size={28} />
        </button>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&family=Playfair+Display:ital,wght@1,400&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-sans {
          font-family: 'Outfit', sans-serif;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        h1, h2, h3, h4, button {
          letter-spacing: -0.02em;
        }
      `}</style>
    </main>
  );
}
