"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Globe, MapPin, BookOpen, Briefcase, GraduationCap, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "te", name: "తెలుగు" },
  { code: "hi", name: "हिन्दी" },
  { code: "ta", name: "தமிழ்" }
];

const STATES = [
  "Maharashtra",
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
  "Punjab",
  "Karnataka",
  "Kerala"
];

interface Translation {
  name: string;
  dob: string;
  origin: string;
  earlyLife: string;
  career: string;
  genZLearn: string;
  references: string;
}

interface Legend {
  id: string;
  image: string;
  translations: Record<string, Translation>;
}

const LEGENDS_DATA: Record<string, Legend[]> = {
  "Maharashtra": [
    {
      id: "shivaji",
      image: "https://images.unsplash.com/photo-1626291664852-514e2277d37d?auto=format&fit=crop&q=80&w=800",
      translations: {
        en: {
          name: "Chhatrapati Shivaji Maharaj",
          dob: "February 19, 1630",
          origin: "Shivneri Fort, Maharashtra",
          earlyLife: "Born to Shahaji Bhonsle and Jijabai, Shivaji was raised with a strong sense of justice and independence. He was mentored by his mother and Dadoji Konddeo in administration and warfare.",
          career: "Founder of the Maratha Empire. He pioneered 'Shiva Sutra' or guerrilla warfare. Known for his administrative skills, he established a progressive civil rule with well-structured cabinet (Ashta Pradhan).",
          genZLearn: "Innovation in adversity and ethical leadership. He built a navy from scratch and valued merit over birth. His focus on 'Swarajya' (Self-rule) is the ultimate startup mindset.",
          references: "Raigad Fort, Maratha Navy Records, Adnyapatra."
        },
        te: {
          name: "ఛత్రపతి శివాజీ మహారాజ్",
          dob: "ఫిబ్రవరి 19, 1630",
          origin: "శివనేరి కోట, మహారాష్ట్ర",
          earlyLife: "షాహాజీ భోంస్లే మరియు జిజాబాయి దంపతులకు జన్మించిన శివాజీ, బలమైన న్యాయం మరియు స్వాతంత్ర్య భావంతో పెరిగారు. ఆయనకు ఆయన తల్లి మరియు దాదోజీ కొండదేవ్ పరిపాలన మరియు యుద్ధతంత్రంలో శిక్షణ ఇచ్చారు.",
          career: "మరాఠా సామ్రాజ్య స్థాపకుడు. గెరిల్లా యుద్ధతంత్రానికి ఆద్యుడు. అష్టప్రధాన్ అనే మంత్రిమండలితో అద్భుతమైన పరిపాలన అందించారు.",
          genZLearn: "ప్రతికూల పరిస్థితుల్లో ఆవిష్కరణ మరియు నైతిక నాయకత్వం. పుట్టుక కంటే ప్రతిభకే ప్రాధాన్యత ఇచ్చారు. స్వరాజ్య సాధనలో ఆయన పట్టుదల నేటి తరానికి స్ఫూర్తిదాయకం.",
          references: "రాయగఢ్ కోట, మరాఠా నావికాదళ రికార్డులు."
        }
      }
    }
  ],
  "Tamil Nadu": [
    {
      id: "apj",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800", // Representative lab/science image
      translations: {
        en: {
          name: "Dr. A.P.J. Abdul Kalam",
          dob: "October 15, 1931",
          origin: "Rameswaram, Tamil Nadu",
          earlyLife: "Grew up in a humble family, selling newspapers to support his education. He studied physics and aerospace engineering, driven by a dream to fly.",
          career: "The 'Missile Man of India'. Led India's space and missile programs (SLV-III, Agni, Prithvi). Served as the 11th President of India, becoming the 'People's President'.",
          genZLearn: "Humility and Vision 2020. He proved that background doesn't define destiny. His dedication to youth and education is a blueprint for mentorship and lifelong learning.",
          references: "Wings of Fire, Ignited Minds, ISRO Archives."
        },
        te: {
          name: "డాక్టర్ ఎ.పి.జె. అబ్దుల్ కలాం",
          dob: "అక్టోబర్ 15, 1931",
          origin: "రామేశ్వరం, తమిళనాడు",
          earlyLife: "పేద కుటుంబంలో జన్మించారు, చదువు కోసం వార్తాపత్రికలు అమ్మారు. విమానం ఎగరాలనే కోరికతో ఫిజిక్స్ మరియు ఏరోస్పేస్ ఇంజనీరింగ్ చదివారు.",
          career: "భారత క్షిపణి పితామహుడు. ఇస్రో మరియు డిఆర్డిఓలో కీలక పాత్ర పోషించారు. భారత 11వ రాష్ట్రపతిగా సామాన్య ప్రజలకు చేరువయ్యారు.",
          genZLearn: "వినయం మరియు విజన్ 2020. మీ గతం మీ భవిష్యత్తును నిర్ణయించదని ఆయన నిరూపించారు. యువతకు ఆయన నిరంతర స్ఫూర్తి ప్రదాత.",
          references: "అగ్ని రెక్కలు (Wings of Fire), ఇస్రో."
        }
      }
    }
  ],
  "West Bengal": [
    {
      id: "tagore",
      image: "https://images.unsplash.com/photo-1471970103260-f58b13f959b4?auto=format&fit=crop&q=80&w=800", // Artistic library image
      translations: {
        en: {
          name: "Rabindranath Tagore",
          dob: "May 7, 1861",
          origin: "Calcutta, West Bengal",
          earlyLife: "A polymath from a prominent family, he reshaped Bengali literature and music. He was the first non-European to win the Nobel Prize in Literature.",
          career: "Author of Gitanjali. He founded Visva-Bharati University, emphasizing education in nature. He composed the national anthems of India and Bangladesh.",
          genZLearn: "Global Citizenship and Creativity. He believed in a world 'where the mind is without fear'. His ability to blend tradition with modern thought is essential for today's creators.",
          references: "Gitanjali, Santiniketan Records, Nobel Archives."
        },
        te: {
          name: "రవీంద్రనాథ్ ఠాగూర్",
          dob: "మే 7, 1861",
          origin: "కలకత్తా, పశ్చిమ బెంగాల్",
          earlyLife: "బెంగాలీ సాహిత్యం మరియు సంగీతాన్ని పునర్నిర్మించిన మహనీయుడు. సాహిత్యంలో నోబెల్ బహుమతి పొందిన మొదటి భారతీయుడు.",
          career: "గీతాంజలి రచయిత. శాంతినికేతన్ వ్యవస్థాపకుడు. భారత్ మరియు బంగ్లాదేశ్ జాతీయ గీతాలను ఆయనే స్వరపరిచారు.",
          genZLearn: "ప్రపంచ పౌరసత్వం మరియు సృజనాత్మకత. భయం లేని మనస్సుతో జీవించాలని ఆయన ఆకాంక్షించారు. కళ మరియు విద్యల పట్ల ఆయన దృక్పథం అద్భుతం.",
          references: "గీతాంజలి, శాంతినికేతన్."
        }
      }
    }
  ],
  "Gujarat": [
    {
      id: "patel",
      image: "https://images.unsplash.com/photo-1605371924599-2c03d64d0dd3?auto=format&fit=crop&q=80&w=800", // Representative statue/iron image
      translations: {
        en: {
          name: "Sardar Vallabhbhai Patel",
          dob: "October 31, 1875",
          origin: "Nadiad, Gujarat",
          earlyLife: "Born into a farming family, he was a self-taught lawyer who practiced in Ahmedabad. He was deeply influenced by Mahatma Gandhi's non-violence movement.",
          career: "The 'Iron Man of India'. As the first Home Minister, he unified 562 princely states into the Indian Union. He was a master organizer and crisis manager.",
          genZLearn: "Unification and Grit. He showed that true power lies in bringing people together under a single vision. His 'Iron' resolve is the ultimate lesson in resilience.",
          references: "Statue of Unity Records, Home Ministry Archives."
        },
        te: {
          name: "సర్దార్ వల్లభభాయ్ పటేల్",
          dob: "అక్టోబర్ 31, 1875",
          origin: "నదియాడ్, గుజరాత్",
          earlyLife: "రైతు కుటుంబంలో జన్మించారు, స్వయంగా న్యాయశాస్త్రం అభ్యసించారు. మహాత్మా గాంధీ అహింసా సిద్ధాంతాలకు ప్రభావితమయ్యారు.",
          career: "భారత ఉక్కు మనిషి. స్వతంత్ర భారత మొదటి హోం మంత్రిగా 562 సంస్థానాలను విలీనం చేసి అఖండ భారతాన్ని నిర్మించారు.",
          genZLearn: "ఐక్యత మరియు పట్టుదల. ఒకే లక్ష్యం కోసం ప్రజలను ఎలా ఏకం చేయాలో ఆయన నేర్పించారు. ఆయన 'ఉక్కు' సంకల్పం నేటి తరానికి ఆదర్శం.",
          references: "స్టాట్యూ ఆఫ్ యూనిటీ, భారత హోం శాఖ."
        }
      }
    }
  ],
  "Punjab": [
    {
      id: "bhagat",
      image: "https://images.unsplash.com/photo-1599427303058-f06cbdf4bb91?auto=format&fit=crop&q=80&w=800", // Representative courage image
      translations: {
        en: {
          name: "Bhagat Singh",
          dob: "September 28, 1907",
          origin: "Banga, Punjab (now in Pakistan)",
          earlyLife: "Born into a family of freedom fighters. At age 12, he visited Jallianwala Bagh and was deeply moved by the massacre, which fueled his revolutionary spirit.",
          career: "A socialist revolutionary and a brilliant intellectual. He founded the Naujawan Bharat Sabha. He became a martyr at the young age of 23, inspiring millions.",
          genZLearn: "Intellectual Courage and Radical Thinking. He wasn't just about action; he was a deep reader and thinker. He teaches us to question the status quo and stand for one's beliefs.",
          references: "Why I am an Atheist, Jail Notebooks."
        },
        te: {
          name: "భగత్ సింగ్",
          dob: "సెప్టెంబర్ 28, 1907",
          origin: "బంగా, పంజాబ్",
          earlyLife: "స్వాతంత్ర్య సమరయోధుల కుటుంబంలో జన్మించారు. జలియన్ వాలా బాగ్ మారణకాండ ఆయనను తీవ్రంగా కలిచివేసింది మరియు విప్లవ భావాలను రగిల్చింది.",
          career: "సోషలిస్ట్ విప్లవకారుడు మరియు గొప్ప మేధావి. 23 ఏళ్ల చిన్న వయసులోనే దేశం కోసం ప్రాణత్యాగం చేసి కోట్లాది మందికి స్ఫూర్తిగా నిలిచారు.",
          genZLearn: "మేధోపరమైన ధైర్యం మరియు ఆలోచనా విధానం. ఆయన కేవలం పోరాట యోధుడే కాదు, గొప్ప పాఠకుడు కూడా. నమ్మిన సిద్ధాంతం కోసం ఎలా నిలబడాలో ఆయన నేర్పారు.",
          references: "భగత్ సింగ్ జైలు డైరీ."
        }
      }
    }
  ],
  "Karnataka": [
    {
      id: "visvesvaraya",
      image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800", // Engineering/Construction image
      translations: {
        en: {
          name: "Sir M. Visvesvaraya",
          dob: "September 15, 1861",
          origin: "Muddenahalli, Karnataka",
          earlyLife: "Born into a family of scholars, he struggled with poverty but excelled in academics. He studied civil engineering in Pune.",
          career: "The 'Father of Modern Mysore'. Architect of the Krishna Raja Sagara dam. His birthday is celebrated as Engineer's Day in India.",
          genZLearn: "Precision and Institutional Building. He believed in 'Industrialize or Perish'. His focus on efficiency and systematic planning is the bedrock of modern engineering.",
          references: "Memoirs of my Working Life, KRS Dam Records."
        },
        te: {
          name: "సర్ మోక్షగుండం విశ్వేశ్వరయ్య",
          dob: "సెప్టెంబర్ 15, 1861",
          origin: "ముద్దేనహళ్లి, కర్ణాటక",
          earlyLife: "పేదరికంలో పుట్టినా చదువులో రాణించారు. పూణేలో సివిల్ ఇంజనీరింగ్ అభ్యసించారు.",
          career: "ఆధునిక మైసూరు పితామహుడు. కృష్ణరాజ సాగర్ ఆనకట్ట రూపశిల్పి. ఆయన జన్మదినాన్ని ఇంజనీర్స్ డేగా జరుపుకుంటాము.",
          genZLearn: "ఖచ్చితత్వం మరియు వ్యవస్థల నిర్మాణం. పరిశ్రమలు లేకపోతే వినాశనమే అని ఆయన నమ్మారు. ఆయన క్రమశిక్షణ నేటి యువ ఇంజనీర్లకు పాఠం.",
          references: "కెఆర్ఎస్ డ్యామ్ రికార్డులు."
        }
      }
    }
  ]
};

export default function IndiaLegends() {
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [lang, setLang] = useState("en");

  const legends = LEGENDS_DATA[selectedState] || [];

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-[#1a1a1a] font-sans pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-black transition-colors font-bold uppercase tracking-tighter">
            <ArrowLeft size={20} />
            <span>Hub</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              {LANGUAGES.map(l => (
                <button 
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang === l.code ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* State Selector Rail */}
      <div className="bg-white border-b overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-4">
          {STATES.map(state => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${selectedState === state ? 'bg-[#ff6b35] border-[#ff6b35] text-white shadow-lg' : 'bg-transparent border-slate-200 text-slate-500 hover:border-slate-400'}`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedState + lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-16"
          >
            {legends.map((legend: Legend) => {
              const content = legend.translations[lang] || legend.translations['en'];
              return (
                <div key={legend.id} className="legend-layout bg-white shadow-2xl rounded-[40px] overflow-hidden flex flex-col md:flex-row min-h-[700px] border border-slate-100">
                  {/* Left Column: Image with accent blocks */}
                  <div className="relative w-full md:w-2/5 min-h-[400px] md:min-h-full overflow-hidden">
                    {/* Decorative Orange Blocks */}
                    <div className="absolute top-0 left-0 w-32 h-64 bg-[#ff6b35] z-0" />
                    <div className="absolute bottom-12 right-0 w-24 h-48 bg-[#d6511e] opacity-80 z-0" />
                    
                    <div className="relative z-10 h-full p-8 flex items-center justify-center">
                      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
                        <img 
                          src={legend.image} 
                          alt={content.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Content */}
                  <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center bg-[#fafafa]">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-[#1a1a1a]">BIOGRAPHY<span className="text-[#ff6b35]">.</span></h1>
                    
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <div className="flex gap-2 text-sm font-black uppercase tracking-widest text-[#ff6b35]">
                          <MapPin size={14} /> Profile
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          <p><span className="font-black">Name:</span> {content.name}</p>
                          <p><span className="font-black">Date of Birth:</span> {content.dob}</p>
                          <p><span className="font-black">Address:</span> {content.origin}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#ff6b35]">
                          <GraduationCap size={16} /> Early Life and Education:
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          {content.earlyLife}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#ff6b35]">
                          <Briefcase size={16} /> Career:
                        </div>
                        <p className="text-slate-600 leading-relaxed font-medium">
                          {content.career}
                        </p>
                      </div>

                      <div className="space-y-4 bg-[#ff6b35]/5 p-6 rounded-2xl border-l-4 border-[#ff6b35]">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#ff6b35]">
                          <Sparkles size={16} /> What Gen Z can learn:
                        </div>
                        <p className="text-slate-800 leading-relaxed font-bold italic">
                          "{content.genZLearn}"
                        </p>
                      </div>

                      <div className="pt-8 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
                          <BookOpen size={14} /> Contact or References:
                        </div>
                        <p className="text-slate-500 text-xs font-bold mt-2">
                          {content.references}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {legends.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[40px] shadow-sm border border-dashed border-slate-300">
                <Globe size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-500">More legends coming soon for {selectedState}</h3>
                <p className="text-slate-400 mt-2">We are digitizing history across Bharat.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @font-face {
          font-family: 'Outfit';
          src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap');
        }
        
        main { font-family: 'Outfit', sans-serif; }
      `}</style>
    </main>
  );
}
