
import React from 'react';
import { AppView } from '../types';
import { ArrowRight, AlertTriangle, Leaf, Heart } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-[#0c0c0c] text-white min-h-screen flex items-center overflow-hidden">
      {/* Static Background Image with Smooth Entrance */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Heritage"
          className="w-full h-full object-cover opacity-30 animate-fade-in"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="lg:w-2/3 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            A Decentralized Tourism Initiative
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-black font-serif mb-10 leading-[0.95] tracking-tighter">
            Royal <span className="text-amber-500 italic">Mysuru</span> <br/>
            <span className="text-white/80">Rediscovered.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-400 mb-14 max-w-2xl leading-relaxed font-light">
            Skip the queues and crowds. Connect with master artisans, discover hidden backwaters, and sustain the true soul of the city.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-24">
            <button 
              onClick={onStart}
              className="group bg-amber-600 hover:bg-amber-500 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
            >
              Start Your Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </button>
            <button 
              onClick={onImpact}
              className="bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-12 py-6 rounded-2xl font-black text-xl backdrop-blur-xl transition-all active:scale-95"
            >
              Learn Our Impact
            </button>
          </div>
        </div>

        {/* Improved Floating Cards */}
        <div className="grid md:grid-cols-3 gap-10 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            { 
              icon: <AlertTriangle className="w-6 h-6" />, 
              title: "The Problem", 
              desc: "Hyper-tourism is eroding local heritage and traditional economies.",
              color: "text-red-400",
              bg: "bg-red-400/10",
              delay: "0s"
            },
            { 
              icon: <Leaf className="w-6 h-6" />, 
              title: "The Vision", 
              desc: "Redirecting footfall to sustain artisan hubs and natural gems.",
              color: "text-green-400",
              bg: "bg-green-400/10",
              delay: "0.2s"
            },
            { 
              icon: <Heart className="w-6 h-6" />, 
              title: "The Future", 
              desc: "Empowering 500+ local families through authentic discovery.",
              color: "text-amber-400",
              bg: "bg-amber-400/10",
              delay: "0.4s"
            }
          ].map((card, i) => (
            <div 
              key={i} 
              className={`bg-stone-900/30 backdrop-blur-2xl border border-white/5 p-10 rounded-[3rem] animate-float relative overflow-hidden group hover:border-amber-500/20 transition-colors`}
              style={{ animationDelay: card.delay }}
            >
              <div className={`w-16 h-16 ${card.bg} rounded-2xl flex items-center justify-center ${card.color} mb-8 transition-transform group-hover:scale-110 duration-500`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 font-serif text-white">{card.title}</h3>
              <p className="text-stone-400 text-base leading-relaxed font-light">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
