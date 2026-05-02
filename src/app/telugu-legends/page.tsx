"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Star, Award, History, GraduationCap } from "lucide-react";
import Link from "next/link";

const LEGENDS = [
  {
    name: "అల్లూరి సీతారామరాజు",
    title: "మన్యం వీరుడు",
    bio: "బ్రిటిష్ పాలనకు వ్యతిరేకంగా రంప తిరుగుబాటుకు నాయకత్వం వహించిన గొప్ప స్వాతంత్ర్య సమరయోధుడు. గిరిజనుల హక్కుల కోసం పోరాడి, 'మన్యం వీరుడు'గా చిరస్థాయిగా నిలిచిపోయారు.",
    history: "1897లో విశాఖపట్నం జిల్లాలో జన్మించారు. గెరిల్లా యుద్ధతంత్రంతో బ్రిటిష్ వారిని గడగడలాడించారు. 1924లో బ్రిటిష్ వారి చేతిలో వీరమరణం పొందారు.",
    icon: <Star className="text-orange-500" />
  },
  {
    name: "పొట్టి శ్రీరాములు",
    title: "అమరజీవి",
    bio: "ప్రత్యేక ఆంధ్ర రాష్ట్ర సాధన కోసం 58 రోజుల పాటు ఆమరణ నిరాహార దీక్ష చేసి తన ప్రాణాలను అర్పించిన మహనీయుడు. వీరి త్యాగ ఫలితంగానే భాషా ప్రయుక్త రాష్ట్రాల ఏర్పాటు జరిగింది.",
    history: "1901లో నెల్లూరు జిల్లాలో జన్మించారు. గాంధేయవాదిగా స్వాతంత్ర్య ఉద్యమంలో చురుగ్గా పాల్గొన్నారు. 1952 డిసెంబర్ 15న అమరజీవి అయ్యారు.",
    icon: <Award className="text-yellow-500" />
  },
  {
    name: "టంగుటూరి ప్రకాశం పంతులు",
    title: "ఆంధ్ర కేసరి",
    bio: "మద్రాసులో బ్రిటిష్ వారి తుపాకీ గుళ్లకు ఎదురొడ్డి నిలిచిన ధీశాలి. ఆంధ్ర రాష్ట్ర మొదటి ముఖ్యమంత్రిగా సేవలందించిన గొప్ప రాజనీతిజ్ఞుడు.",
    history: "1872లో ప్రకాశం జిల్లాలో జన్మించారు. బారిస్టర్ చదువుకున్నా, దేశం కోసం తన ఆస్తిపాస్తులన్నింటినీ త్యాగం చేశారు. సామాన్యుల పక్షపాతిగా పేరుగాంచారు.",
    icon: <History className="text-blue-500" />
  },
  {
    name: "ఎన్.టి. రామారావు (NTR)",
    title: "తెలుగు జాతి గర్వకారణం",
    bio: "విశ్వవిఖ్యాత నటసార్వభౌముడు. తెలుగు వారి ఆత్మగౌరవాన్ని ప్రపంచవ్యాప్తం చేసిన మహానటుడు మరియు రాజకీయ నాయకుడు. పేదల కోసం అనేక సంక్షేమ పథకాలను ప్రవేశపెట్టారు.",
    history: "1923లో నిమ్మకూరులో జన్మించారు. చిత్రసీమలో రాముడు, కృష్ణుడు వంటి పాత్రలతో దైవంగా కొలవబడ్డారు. రాజకీయాల్లోకి వచ్చిన 9 నెలల్లోనే అధికారాన్ని చేపట్టి చరిత్ర సృష్టించారు.",
    icon: <Star className="text-purple-500" />
  },
  {
    name: "పి.వి. నరసింహారావు",
    title: "భారత ఆర్థిక సంస్కరణల పితామహుడు",
    bio: "దేశాన్ని ఆర్థిక సంక్షోభం నుండి గట్టెక్కించిన గొప్ప దార్శనికుడు. భారత ప్రధానమంత్రిగా పనిచేసిన మొదటి దక్షిణాది వ్యక్తి. పదిహేడు భాషలు తెలిసిన బహుభాషా కోవిదుడు.",
    history: "1921లో వరంగల్ జిల్లాలో జన్మించారు. క్లిష్ట పరిస్థితుల్లో దేశ పగ్గాలు చేపట్టి, నూతన ఆర్థిక విధానాలతో దేశాన్ని ప్రగతిపథంలో నడిపించారు.",
    icon: <GraduationCap className="text-green-500" />
  },
  {
    name: "పింగళి వెంకయ్య",
    title: "జాతీయ జెండా రూపశిల్పి",
    bio: "భారత జాతీయ జెండాను రూపొందించిన మహనీయుడు. ప్రతి భారతీయుడి గుండెల్లో త్రివర్ణ పతాకం రెపరెపలాడుతున్నంత కాలం వీరి పేరు చిరస్థాయిగా ఉంటుంది.",
    history: "1876లో కృష్ణా జిల్లాలో జన్మించారు. వ్యవసాయ శాస్త్రవేత్తగా కూడా విశేష సేవలందించారు. గాంధీజీ కోరిక మేరకు జెండా నమూనాను సిద్ధం చేశారు.",
    icon: <Award className="text-red-500" />
  }
];

export default function TeluguLegends() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: "url('/assets/telugu_legends.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/60 to-[#0f172a]" />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>తిరిగి హోమ్ పేజీకి</span>
            </Link>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
              తెలుగు <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">మహనీయులు</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium">
              తెలుగు జాతి కీర్తిని దశదిశలా వ్యాపింపజేసిన అజరామర మూర్తుల చరిత్ర
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legends Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEGENDS.map((legend, idx) => (
            <motion.div
              key={legend.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card group"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="mb-6 flex items-start justify-between">
                  <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:bg-slate-700/50 transition-colors">
                    {legend.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Legend Entry #{idx + 1}</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-orange-400 transition-colors">
                  {legend.name}
                </h3>
                <div className="text-sm font-semibold text-orange-500/80 mb-4 tracking-wide">
                  {legend.title}
                </div>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      <BookOpen size={12} /> క్లుప్త వివరణ
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {legend.bio}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      <History size={12} /> చరిత్ర
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {legend.history}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-40 text-center px-6">
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-700 to-transparent mx-auto mb-8" />
        <p className="text-slate-500 text-sm font-medium">
          తెలుగు సంస్కృతి మరియు వారసత్వాన్ని గౌరవిస్తూ...
        </p>
      </footer>

      <style jsx>{`
        .glass-card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          transition: all 0.4s cubic-bezier(0.2, 0, 0.2, 1);
          height: 100%;
        }
        .glass-card:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(251, 146, 60, 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </main>
  );
}
