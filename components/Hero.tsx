import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-[95vh] flex items-center overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-44">
        <div className="max-w-4xl animate-app-reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Mysore Heritage Discovery
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif mb-8 leading-[1] tracking-tight text-white">
            Beyond the <br/>
            <span className="text-amber-500 italic">Palace Walls.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-stone-400 mb-14 max-w-2xl leading-relaxed font-light">
            Skip the generic trails. Connect with 40+ master artisans, find silent backwaters, and experience the heartbeat of the Royal City.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-24">
            <button 
              onClick={onStart}
              className="h-16 md:h-20 bg-amber-600 hover:bg-amber-500 text-white px-10 md:px-14 rounded-2xl md:rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
            >
              Start Exploring <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onImpact}
              className="h-16 md:h-20 bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-10 md:px-14 rounded-2xl md:rounded-3xl font-black text-xs uppercase tracking-[0.2em] backdrop-blur-xl transition-all active:scale-95"
            >
              Our Impact
            </button>
          </div>
        </div>

        {/* Highlight Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { title: "Direct-to-Artisan", desc: "No middleman. Your tourism directly supports local master craft families with zero commission." },
            { title: "Eco-Conscious Travel", desc: "AI-guided routing to avoid over-congested zones and preserve Mysore's historic infrastructure." },
            { title: "Curated Hidden Gems", desc: "Access locations unknown even to most locals, strictly vetted for authentic heritage value." }
          ].map((item, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] flex flex-col gap-6 card-lift">
              <div className="w-12 h-12 bg-amber-600/20 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-600/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-3 text-xl font-serif tracking-tight">{item.title}</h4>
                <p className="text-stone-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};