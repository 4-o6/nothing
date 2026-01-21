import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-20 lg:opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-32 pb-12 lg:pt-48 lg:pb-24">
        <div className="max-w-5xl animate-app-reveal">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-6 sm:mb-10 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Mysore Heritage Discovery
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-serif mb-6 sm:mb-8 leading-[1.1] sm:leading-[1] tracking-tighter text-white">
            Beyond the <br className="hidden sm:block"/>
            <span className="text-amber-500 italic">Palace Walls.</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl text-stone-400 mb-8 sm:mb-14 max-w-2xl leading-relaxed font-light">
            Skip the generic trails. Connect with 40+ master artisans, find silent backwaters, and experience the heartbeat of the Royal City.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-16 sm:mb-24">
            <button 
              onClick={onStart}
              className="h-14 sm:h-16 md:h-20 bg-amber-600 hover:bg-amber-500 text-white px-8 sm:px-10 md:px-14 rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 sm:gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
            >
              Start Exploring <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={onImpact}
              className="h-14 sm:h-16 md:h-20 bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-8 sm:px-10 md:px-14 rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] backdrop-blur-xl transition-all active:scale-95"
            >
              Our Impact
            </button>
          </div>
        </div>

        {/* Highlight Row - Desktop priority stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { title: "Direct-to-Artisan", desc: "No middleman. Your tourism directly supports local master craft families with zero commission." },
            { title: "Eco-Conscious Travel", desc: "AI-guided routing to avoid over-congested zones and preserve Mysore's historic infrastructure." },
            { title: "Curated Hidden Gems", desc: "Access locations unknown even to most locals, strictly vetted for authentic heritage value." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] flex flex-col gap-4 sm:gap-6 card-lift">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center text-amber-500 border border-amber-600/20">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 sm:mb-3 text-lg sm:text-xl font-serif tracking-tight">{item.title}</h4>
                <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};