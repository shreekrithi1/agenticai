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
  genZ?: string;
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
    <main className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-body">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;600;700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap');
        
        :global(body) {
          background-color: #fbf9f5;
          color: #1b1c1a;
          font-family: 'Be Vietnam Pro', sans-serif;
        }

        .font-display { font-family: 'Noto Serif', serif; }
        .font-body { font-family: 'Be Vietnam Pro', sans-serif; }

        .manuscript-scroll {
          border-top: 1px solid #b15f00;
          border-bottom: 1px solid #b15f00;
          background-image: radial-gradient(#b15f00 0.5px, transparent 0.5px);
          background-size: 24px 24px;
          opacity: 0.1;
        }

        .md3-card-shadow {
          box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
        }
        
        .md3-card-shadow-hover {
          box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#efeeea] shadow-md border-b border-[#dbc2b0]/30">
        <button className="p-2 hover:bg-[#e4e2de] transition-colors rounded-full active:opacity-80 active:scale-95 duration-150" onClick={view !== 'states' ? goBack : undefined}>
          <span className="material-symbols-outlined text-[#1b1c1a]">{view === 'states' ? 'menu' : 'arrow_back'}</span>
        </button>
        <h1 className="text-xl font-bold font-display text-[#8d4b00] tracking-tight">Legends from India</h1>
        <button className="p-2 hover:bg-[#e4e2de] transition-colors rounded-full active:opacity-80 active:scale-95 duration-150">
          <span className="material-symbols-outlined text-[#1b1c1a]">history_edu</span>
        </button>
      </header>

      <AnimatePresence mode="wait">
        {view === 'states' && (
          <motion.main 
            key="states"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pt-24 pb-32 px-4 max-w-6xl mx-auto"
          >
            <section className="mb-12 text-center md:text-left">
              <h2 className="font-display text-[48px] leading-[56px] font-bold text-[#8d4b00] mb-4 tracking-tighter">Choose a State to Explore Legends</h2>
              <p className="font-body text-[18px] leading-[28px] text-[#554336] max-w-2xl">Journey through the vibrant tapestry of Bharat. From the Himalayan peaks to the coastal backwaters, every region holds a story of gods, heroes, and ancient wisdom.</p>
            </section>

            <div className="relative max-w-xl mb-12">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#887364]">search</span>
              <input 
                className="w-full bg-[#f5f3ef] border border-[#887364] rounded-full px-12 py-3.5 font-body outline-none transition-all placeholder:text-[#887364] focus:ring-2 focus:ring-[#8d4b00]/20" 
                placeholder="Search for a state or region..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStates.map((state, idx) => (
                <div 
                  key={state.name}
                  onClick={() => openState(state)}
                  className="flex flex-col bg-[#f5f3ef] rounded-xl overflow-hidden border border-[#dbc2b0]/50 md3-card-shadow hover:md3-card-shadow-hover transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={state.image} alt={state.name} />
                    {idx === 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold bg-[#8d4b00] text-white px-2 py-0.5 rounded-md uppercase tracking-wider">Featured</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-display text-[24px] font-semibold text-[#1b1c1a] mb-2">{state.name}</h3>
                    <p className="font-body text-[#554336] line-clamp-2 mb-4">{state.description}</p>
                    <div className="mt-auto pt-2 flex justify-end">
                      <button className="flex items-center gap-1.5 text-[#8d4b00] font-semibold group-hover:underline">
                        Explore <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <section className="mt-20 relative">
              <div className="absolute inset-0 manuscript-scroll pointer-events-none"></div>
              <div className="py-12 flex flex-col items-center">
                <h3 className="font-display text-[24px] font-semibold text-[#8d4b00] mb-8 text-center">Browse by Historical Eras</h3>
                <div className="flex gap-8 overflow-x-auto pb-6 px-4 w-full no-scrollbar justify-center">
                  {[
                    { icon: 'temple_hindu', label: 'Vedic Era' },
                    { icon: 'castle', label: 'Dynastic India' },
                    { icon: 'architecture', label: 'Classical Age' },
                    { icon: 'sailing', label: 'Maritime Era' }
                  ].map((era, i) => (
                    <div key={i} className={`flex-shrink-0 flex flex-col items-center ${i > 0 ? 'opacity-60' : ''}`}>
                      <div className={`w-16 h-16 rounded-full border-2 ${i === 0 ? 'border-[#8d4b00] bg-[#ffdcc3] text-[#8d4b00]' : 'border-[#887364] bg-[#efeeea] text-[#887364]'} flex items-center justify-center mb-2`}>
                        <span className="material-symbols-outlined">{era.icon}</span>
                      </div>
                      <span className="font-semibold text-[14px] text-[#1b1c1a]">{era.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.main>
        )}

        {view === 'personalities' && selectedState && (
          <motion.main 
            key="personalities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pt-24 pb-32 px-4 max-w-6xl mx-auto"
          >
            <div className="mb-10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#887364] uppercase tracking-widest mb-4">
                <span>ARCHIVE</span> <span className="material-symbols-outlined text-[10px]">chevron_right</span> <span>{selectedState.name}</span>
              </div>
              <h1 className="font-display text-[32px] font-bold text-[#8d4b00] leading-tight tracking-tighter">
                {selectedState.tagline}
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-10">
              {selectedState.legends.length > 0 && (
                <div className="flex flex-col bg-[#f5f3ef] rounded-xl overflow-hidden border border-[#dbc2b0]/50 md3-card-shadow transition-all group">
                  <img src={selectedState.legends[0].image} className="w-full h-80 object-cover" />
                  <div className="p-8">
                    <span className="text-[10px] font-bold text-[#8d4b00] uppercase tracking-[0.2em] mb-2 block">
                      {selectedState.legends[0].translations[lang].tag}
                    </span>
                    <h2 className="font-display text-[28px] font-bold text-[#1b1c1a] mb-2">
                      {selectedState.legends[0].translations[lang].name}
                    </h2>
                    <p className="font-display italic text-[#554336] mb-4 opacity-80">
                      "{selectedState.legends[0].translations[lang].title}"
                    </p>
                    <p className="font-body text-[#1b1c1a] mb-6 leading-relaxed">
                      {selectedState.legends[0].translations[lang].bio}
                    </p>
                    <button 
                      onClick={() => openLegend(selectedState.legends[0])}
                      className="w-full bg-[#8d4b00] text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-[#6e3900]"
                    >
                      Read Biography <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedState.legends.slice(1).map(legend => (
                  <div 
                    key={legend.id}
                    onClick={() => openLegend(legend)}
                    className="bg-[#f5f3ef] rounded-xl p-4 md3-card-shadow flex gap-4 border border-[#dbc2b0]/50 cursor-pointer group"
                  >
                    <div className="w-24 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={legend.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="flex-1 py-1 relative flex flex-col">
                      <span className="text-[8px] font-bold bg-[#ffdcc3] text-[#8d4b00] px-2 py-1 rounded mb-2 inline-block uppercase tracking-widest w-fit">
                        {legend.translations[lang].tag}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#1b1c1a] mb-1">{legend.translations[lang].name}</h3>
                      <p className="text-[10px] font-display italic text-[#554336]">{legend.translations[lang].title}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] font-bold text-[#887364]">{legend.translations[lang].years}</span>
                        <span className="material-symbols-outlined text-sm text-[#887364]">bookmark</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.main>
        )}

        {view === 'detail' && selectedLegend && (
          <motion.main 
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="pt-16 pb-32 max-w-6xl mx-auto"
          >
            <div className="relative h-[60vh] w-full">
              <img src={selectedLegend.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f5] via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="text-[10px] font-bold text-[#8d4b00] uppercase tracking-[0.3em] mb-2 block">
                  ARCHIVE ID: {selectedLegend.id.toUpperCase()}-1923
                </span>
                <h1 className="font-display text-[40px] font-bold text-[#1b1c1a] mb-2 leading-tight">
                  {selectedLegend.translations[lang].name}
                </h1>
                <p className="font-display text-lg italic text-[#554336] opacity-80">
                  "{selectedLegend.translations[lang].title}"
                </p>
              </div>
            </div>

            <div className="px-8 py-10 space-y-10">
              <div className="space-y-6">
                <h3 className="font-display text-[20px] font-bold uppercase tracking-widest text-[#8d4b00]">Biography</h3>
                <p className="font-body text-[18px] leading-relaxed text-[#1b1c1a]">
                  {selectedLegend.translations[lang].fullBio || selectedLegend.translations[lang].bio}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#dbc2b0]/30">
                <div className="bg-[#f5f3ef] p-8 rounded-2xl md3-card-shadow">
                  <h4 className="font-display text-lg font-bold text-[#8d4b00] mb-4">What Gen Z can learn</h4>
                  <p className="font-body text-[#554336] leading-relaxed">
                    {selectedLegend.translations[lang].genZ}
                  </p>
                </div>
                <div className="bg-[#efeeea] p-8 rounded-2xl border border-[#dbc2b0]/30">
                  <h4 className="font-display text-lg font-bold text-[#8d4b00] mb-4">Historical Context</h4>
                  <p className="font-body text-[#554336] leading-relaxed">
                    A visionary leader whose principles of truth and resilience redefined the landscape of Indian history.
                  </p>
                </div>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-[#efeeea] backdrop-blur-lg shadow-[0_-1px_3px_0px_rgba(0,0,0,0.1)] border-t border-[#dbc2b0]/30">
        <button onClick={() => setView('states')} className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${view === 'states' ? 'text-[#8d4b00]' : 'text-[#554336] opacity-70 hover:opacity-100'}`}>
          <span className={`material-symbols-outlined ${view === 'states' ? 'fill-1' : ''}`}>map</span>
          <span className="font-semibold text-[10px] mt-1">States</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#554336] opacity-70 hover:opacity-100 transition-all px-4 py-1">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-semibold text-[10px] mt-1">Timeline</span>
        </button>
        <button onClick={() => selectedState && setView('personalities')} className={`flex flex-col items-center justify-center px-4 py-1 transition-all ${view === 'personalities' ? 'text-[#8d4b00]' : 'text-[#554336] opacity-70 hover:opacity-100'}`}>
          <span className={`material-symbols-outlined ${view === 'personalities' ? 'fill-1' : ''}`}>museum</span>
          <span className="font-semibold text-[10px] mt-1">Archive</span>
        </button>
        <button className="flex flex-col items-center justify-center text-[#554336] opacity-70 hover:opacity-100 transition-all px-4 py-1">
          <span className="material-symbols-outlined">book_5</span>
          <span className="font-semibold text-[10px] mt-1">Library</span>
        </button>
      </nav>

      {/* FAB */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#8d4b00] text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined">explore</span>
      </button>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .fill-1 {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </main>
  );
}
