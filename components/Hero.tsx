import React from 'react';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] min-h-screen flex items-center overflow-hidden">
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-28 md:py-40">
        <div className="max-w-4xl animate-app-reveal">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5" /> Mysore Heritage Discovery
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-black font-serif mb-10 leading-[0.9] tracking-tighter text-white">
            Beyond the <br/>
            <span className="text-amber-500 italic">Palace.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-stone-400 mb-14 max-w-2xl leading-relaxed font-light">
            Skip the generic trails. Connect with 40+ master artisans, find silent backwaters, and experience the heartbeat of the Royal City.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-24">
            <button 
              onClick={onStart}
              className="h-16 md:h-20 bg-amber-600 hover:bg-amber-500 text-white px-10 md:px-14 rounded-[2rem] font-black text-[11px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
            >
              Start Your Journey <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={onImpact}
              className="h-16 md:h-20 bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5 px-10 md:px-14 rounded-[2rem] font-black text-[11px] md:text-xs uppercase tracking-[0.2em] backdrop-blur-xl transition-all active:scale-95"
            >
              Sustainability Report
            </button>
          </div>
        </div>

        {/* Dynamic Highlight Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-app-reveal" style={{ animationDelay: '0.3s' }}>
          {[
            { title: "Direct-to-Artisan", desc: "Your tourism directly supports local master craft families with zero commission." },
            { title: "Eco-Conscious Discovery", desc: "AI-guided routing to avoid over-congested zones and preserve heritage." },
            { title: "Curated Hidden Gems", desc: "Access locations unknown even to most locals, strictly vetted for quality." }
          ].map((item, i) => (
            <div key={i} className="bg-stone-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] flex flex-col gap-4 hover:border-amber-600/30 transition-colors">
              <div className="w-10 h-10 bg-amber-600/10 rounded-2xl flex items-center justify-center text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-2 text-base md:text-lg">{item.title}</h4>
                <p className="text-stone-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};