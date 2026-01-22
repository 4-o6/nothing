import React from 'react';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-20 lg:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 sm:pt-48 pb-12">
        <div className="max-w-4xl animate-app-reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] mb-8">
            <Sparkles className="w-3.5 h-3.5" /> Mysore Heritage Discovery
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-serif mb-6 leading-[1] tracking-tighter text-white">
            The Palace is <br className="hidden sm:block"/>
            <span className="text-amber-500 italic">Not the Whole Story.</span>
          </h1>
          
          <p className="text-base sm:text-xl text-stone-400 mb-10 max-w-2xl leading-relaxed font-light">
            90% of tourists never leave the Palace grounds. We’re here to change that. Connect with 40+ master artisans and find the silent soul of the Royal City.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              onClick={onStart}
              className="h-16 sm:h-20 bg-amber-600 hover:bg-amber-500 text-white px-12 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
            >
              Start Your Discovery <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onImpact}
              className="h-16 sm:h-20 bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-12 rounded-2xl font-black text-xs uppercase tracking-[0.2em] backdrop-blur-xl transition-all flex items-center justify-center gap-3"
            >
              The Problem <AlertCircle className="w-5 h-5 text-amber-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { title: "Direct Support", desc: "Skip the middlemen. Your visit directly funds the families preserving Mysuru's legacy." },
            { title: "AI Grounding", desc: "Using real-time search to verify locations of silent weavers and hidden studios." },
            { title: "Decentralized", desc: "Reducing Palace crowd density by promoting outer heritage hubs." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2rem] flex flex-col gap-3 border-white/5 hover:border-amber-600/20 transition-all">
              <h4 className="font-bold text-white text-lg font-serif">{item.title}</h4>
              <p className="text-stone-500 text-xs font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};