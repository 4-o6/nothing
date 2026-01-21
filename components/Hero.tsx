import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16 lg:pt-32">
        <div className="max-w-3xl animate-app-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl">
            <Sparkles className="w-3 h-3" /> Mysore Heritage Discovery
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-serif mb-6 leading-[1.05] tracking-tight text-white">
            Beyond the <br/>
            <span className="text-amber-500 italic">Palace Walls.</span>
          </h1>
          
          <p className="text-base md:text-xl text-stone-400 mb-10 max-w-xl leading-relaxed font-light">
            Skip the generic trails. Connect with 40+ master artisans, find silent backwaters, and experience the heartbeat of the Royal City.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button 
              onClick={onStart}
              className="h-14 md:h-16 bg-amber-600 hover:bg-amber-500 text-white px-8 md:px-12 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-900/30 active:scale-95"
            >
              Start Exploring <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onImpact}
              className="h-14 md:h-16 bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-8 md:px-12 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] backdrop-blur-xl transition-all active:scale-95"
            >
              Our Impact
            </button>
          </div>
        </div>

        {/* Highlight Row - More compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { title: "Direct-to-Artisan", desc: "No middleman. Your tourism directly supports local master craft families with zero commission." },
            { title: "Eco-Conscious Travel", desc: "AI-guided routing to avoid over-congested zones and preserve Mysore's historic infrastructure." },
            { title: "Curated Hidden Gems", desc: "Access locations unknown even to most locals, strictly vetted for authentic heritage value." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-[2rem] flex flex-col gap-4 card-lift">
              <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center text-amber-500 border border-amber-600/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 text-lg font-serif">{item.title}</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};