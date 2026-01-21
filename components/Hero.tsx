import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-screen flex items-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-40">
        <div className="max-w-5xl animate-app-reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.25em] mb-10">
            <Sparkles className="w-3.5 h-3.5" /> Mysore Heritage Decentralized
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black font-serif mb-8 leading-[1] tracking-tighter text-white">
            Beyond the <br/>
            <span className="text-amber-500 italic">Palace Walls.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-stone-400 mb-12 max-w-2xl leading-relaxed font-light">
            Skip the commercial traps. Connect with master artisans, find silent backwaters, and rediscover the true soul of the city.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-24">
            <button 
              onClick={onStart}
              className="h-16 md:h-20 bg-amber-600 hover:bg-amber-500 text-white px-10 md:px-14 rounded-2xl md:rounded-3xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
            >
              Start Exploring <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={onImpact}
              className="h-16 md:h-20 bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5 px-10 md:px-14 rounded-2xl md:rounded-3xl font-black text-xs uppercase tracking-widest backdrop-blur-xl transition-all active:scale-95"
            >
              Our Impact
            </button>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { title: "Direct-to-Artisan", desc: "No middleman. Your tourism directly supports local master craft families." },
            { title: "Eco-Conscious Travel", desc: "Redirecting traffic away from over-congested zones to preserve heritage." },
            { title: "Curated Hidden Gems", desc: "Access locations unknown even to most locals, vetted for quality." }
          ].map((item, i) => (
            <div key={i} className="bg-stone-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] flex flex-col gap-4">
              <div className="w-10 h-10 bg-amber-600/10 rounded-xl flex items-center justify-center text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 text-lg">{item.title}</h4>
                <p className="text-stone-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};