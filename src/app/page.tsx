"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <>
      {/* TopAppBar Shell */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding py-stack-sm max-w-7xl mx-auto bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-headline-md">agriculture</span>
          <span className="font-headline-md text-headline-md font-bold text-primary">BharatAgri</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-primary font-bold border-b-2 border-primary hover:text-primary transition-all" href="#">Home</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-all" href="#">Vision</a>
          <a className="text-on-surface-variant font-medium hover:text-primary transition-all" href="#">Tech</a>
          <Link className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold transition-transform scale-95 active:opacity-70" href="/hub">
            Go to Hub
          </Link>
        </nav>
        <button className="md:hidden p-2 text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>
      
      <main className="mt-20">
        {/* Hero Section */}
        <section className="relative min-h-[751px] flex items-center px-container-padding overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center relative z-10">
            <div className="space-y-stack-md">
              <div className="inline-block px-4 py-1 rounded-full bg-primary-container/20 text-on-primary-container font-label-caps border border-primary-container/30">
                NOW OPERATIONAL
              </div>
              <h1 className="font-display-lg text-display-lg text-on-background tracking-tight">
                Digital Agronomy for a <span className="text-primary">Sustainable Future</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
                Empowering institutions with orchestration intelligence. We bridge the gap between traditional farming and high-technology precision.
              </p>
              <div className="pt-stack-md flex gap-stack-md">
                <Link className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-title-sm hover:opacity-90 transition-all flex items-center gap-2" href="/hub">
                  Explore the Hub
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="bg-surface-container text-primary px-8 py-4 rounded-xl font-bold text-title-sm hover:bg-surface-container-high transition-all">
                  View Tech
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2">
                <img alt="Digital Agronomy Drone" className="w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdytM0lfBUOBFvwEAKtJDnZ0XWCi7U2E1H2B3joJy9ivfvaaffan-2rtgIBb7D4o0EDAcZg6NWn6QqOG-S-uboAiuHwp-4GX5V76k_xMhiQDo1EQ7VRcrDnxpsc_YEwUdN5xgE_5NWFR9sgkXtVJLjRs1VNObsSgXBu0TDxzpJUbfGt-XLp6nD4EI17LEot3LWq4KjKxVIkYWUzcnmaFOJ1eswwrwAi6NU8txaJzFBsxHl2TmwerpHLaI65yO1OmBBz98FB5cD2Q20"/>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-surface-variant transform -rotate-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-container rounded-lg">
                    <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>analytics</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-outline">LIVE FEED</p>
                    <p className="font-title-sm text-on-surface">Precision Analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute top-0 right-0 -z-0 opacity-10 pointer-events-none">
            <svg fill="none" height="600" viewBox="0 0 600 600" width="600" xmlns="http://www.w3.org/2000/svg">
              <circle cx="300" cy="300" fill="url(#paint0_radial)" r="300"></circle>
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(300 300) rotate(90) scale(300)" gradientUnits="userSpaceOnUse" id="paint0_radial" r="1">
                  <stop stopColor="#006C49"></stop>
                  <stop offset="1" stopColor="#006C49" stopOpacity="0"></stop>
                </radialGradient>
              </defs>
            </svg>
          </div>
        </section>

        {/* Vision, Mission & Values Bento Grid */}
        <section className="py-24 px-container-padding bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="font-display-lg text-headline-md text-on-background mb-4">Our Foundations</h2>
              <p className="text-on-surface-variant">Built on the principles of trust, transparency, and technological advancement.</p>
            </div>
            <div className="bento-grid">
              {/* Vision Card */}
              <div className="col-span-12 md:col-span-7 bg-white p-10 rounded-[2rem] shadow-sm border border-outline-variant/30 flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-primary text-display-lg mb-6" style={{fontVariationSettings: "'FILL' 1"}}>visibility</span>
                  <h3 className="font-headline-md text-headline-md mb-4">Our Vision</h3>
                  <p className="text-title-sm text-on-surface-variant max-w-md">To revolutionize global agriculture through autonomous orchestration and intelligent data modeling.</p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                  <span className="material-symbols-outlined text-[240px]" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
                </div>
              </div>
              {/* Value: Precision Chip */}
              <div className="col-span-12 md:col-span-5 bg-primary p-10 rounded-[2rem] text-on-primary flex flex-col justify-center">
                <h4 className="font-label-caps text-primary-fixed mb-2">CORE VALUE</h4>
                <h3 className="font-headline-md text-display-lg mb-2">Precision.</h3>
                <p className="text-body-md opacity-90">Every gram of soil, every drop of water, every seed—orchestrated with absolute accuracy.</p>
              </div>
              {/* Mission Card */}
              <div className="col-span-12 md:col-span-5 bg-inverse-surface p-10 rounded-[2rem] text-inverse-on-surface relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-headline-md text-headline-md mb-4 text-primary-fixed">Our Mission</h3>
                  <p className="text-body-md">Providing cutting-edge digital infrastructure that connects precision technology with real-world farming outcomes.</p>
                  <div className="mt-8 flex gap-2">
                    <span className="h-1 w-12 bg-primary rounded-full"></span>
                    <span className="h-1 w-4 bg-primary-fixed opacity-50 rounded-full"></span>
                    <span className="h-1 w-4 bg-primary-fixed opacity-50 rounded-full"></span>
                  </div>
                </div>
              </div>
              {/* Values Grid */}
              <div className="col-span-12 md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  </div>
                  <h4 className="font-title-sm">Innovation</h4>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                  </div>
                  <h4 className="font-title-sm">Integrity</h4>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">eco</span>
                  </div>
                  <h4 className="font-title-sm">Sustainability</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-24 px-container-padding bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="font-headline-md text-display-lg tracking-tight mb-4">Advanced Tech Stack</h2>
                <p className="text-on-surface-variant text-body-md">Our orchestration hub is built on a foundation of industrial-grade technologies, ensuring reliability and future-proof performance in the field.</p>
              </div>
              <div className="hidden md:block">
                <div className="p-4 bg-surface rounded-2xl border border-surface-variant flex gap-4 items-center">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-tertiary-container border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-secondary-container border-2 border-white"></div>
                  </div>
                  <span className="text-label-caps text-outline">TRUSTED BY 500+ INSTITUTIONS</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-stack-lg">
              {/* Next.js */}
              <div className="group flex flex-col items-center p-8 bg-surface rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-black rounded-2xl">
                  <span className="text-white font-bold text-headline-md">N</span>
                </div>
                <h4 className="font-title-sm group-hover:text-primary transition-colors">Next.js 15</h4>
                <p className="text-label-caps text-outline mt-1">FRAMEWORK</p>
              </div>
              {/* React */}
              <div className="group flex flex-col items-center p-8 bg-surface rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-[#61DAFB]/10 rounded-2xl">
                  <span className="material-symbols-outlined text-[#00D8FF] text-[40px]" style={{fontVariationSettings: "'wght' 600"}}>javascript</span>
                </div>
                <h4 className="font-title-sm group-hover:text-primary transition-colors">React 19</h4>
                <p className="text-label-caps text-outline mt-1">UI LIBRARY</p>
              </div>
              {/* OpenClaw */}
              <div className="group flex flex-col items-center p-8 bg-surface rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-primary-container/20 rounded-2xl">
                  <span className="material-symbols-outlined text-primary text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>hub</span>
                </div>
                <h4 className="font-title-sm group-hover:text-primary transition-colors">OpenClaw</h4>
                <p className="text-label-caps text-outline mt-1">ORCHESTRATION</p>
              </div>
              {/* Gemma 3 */}
              <div className="group flex flex-col items-center p-8 bg-surface rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-tertiary-container/20 rounded-2xl">
                  <span className="material-symbols-outlined text-tertiary text-[40px]" style={{fontVariationSettings: "'FILL' 1"}}>model_training</span>
                </div>
                <h4 className="font-title-sm group-hover:text-primary transition-colors">Gemma 3</h4>
                <p className="text-label-caps text-outline mt-1">AI MODEL</p>
              </div>
              {/* Ollama */}
              <div className="group flex flex-col items-center p-8 bg-surface rounded-3xl border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 mb-6 flex items-center justify-center bg-on-background/10 rounded-2xl">
                  <span className="material-symbols-outlined text-on-background text-[40px]">terminal</span>
                </div>
                <h4 className="font-title-sm group-hover:text-primary transition-colors">Ollama</h4>
                <p className="text-label-caps text-outline mt-1">RUNTIME</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Canvas */}
        <section className="py-24 px-container-padding">
          <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-primary to-on-primary-fixed-variant p-12 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display-lg text-white mb-6">Ready to scale your agricultural operations?</h2>
              <p className="text-white/80 text-title-sm mb-10">Join the digital revolution. Access the orchestration hub to manage your farm assets with AI-driven intelligence.</p>
              <Link className="inline-flex items-center gap-4 bg-white text-primary px-10 py-5 rounded-2xl font-bold text-headline-md hover:scale-105 transition-transform" href="/hub">
                Launch Hub
                <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
            </div>
            {/* Abstract Graphics */}
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none hidden md:block">
              <img alt="Tech Graphics" className="h-full w-full object-cover mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yTLJ5LyYv6XNxupw_bROYjfhle15jqGu20Pv8uNtgRN1mPkX0R7Uc6Y-BzMp3yxONxBvuvDI-FGLgjYLPOfI9WuIjms00zk4Q37Ro2_qZjeM2FPekFlDq_IAHW7NrsgrdE6EsOzyieF3gIEzp0tq3iNDJiRK65Rum2d9rsNCNsUvCjNnoaendVL7cOaDbo944xpW5UnIEHhGUFp0hPUqof1dkyLeaQnNNn6gIH5QW8ucCHPtuKSH3RYFgWNEh9xOk867aW-E7Wy-"/>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="w-full py-stack-lg px-container-padding flex flex-col md:flex-row justify-between items-center gap-stack-md bg-surface-container-highest">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-title-sm">agriculture</span>
            <span className="font-title-sm text-title-sm font-bold text-primary">BharatAgri</span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">© 2026 BharatAgri. Digital Agronomy for a Sustainable Future.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-on-surface-variant font-medium hover:text-on-primary-container transition-colors" href="#">Vision</a>
          <a className="text-on-surface-variant font-medium hover:text-on-primary-container transition-colors" href="#">Mission</a>
          <a className="text-on-surface-variant font-medium hover:text-on-primary-container transition-colors" href="#">Values</a>
          <a className="text-on-surface-variant font-medium hover:text-on-primary-container transition-colors" href="#">Tech Stack</a>
          <a className="text-on-surface-variant font-medium hover:text-on-primary-container transition-colors" href="#">Contact</a>
        </div>
      </footer>
    </>
  );
}
