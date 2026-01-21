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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="lg:w-3/5 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
            Heritage Decentralized
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-serif mb-6 leading-[1.05] tracking-tight text-white">
            Royal <span className="text-amber-500 italic">Mysuru</span> <br/>
            <span className="text-white/80">Rediscovered.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-400 mb-10 max-w-xl leading-relaxed font-light">
            Skip the queues and crowds. Connect with master artisans, discover hidden backwaters, and sustain the true soul of the city.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              onClick={onStart}
              className="group bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-900/30 active:scale-95"
            >
              Start Exploring <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={onImpact}
              className="bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-8 py-4 rounded-xl font-bold text-base backdrop-blur-xl transition-all active:scale-95"
            >
              Local Impact
            </button>
          </div>
        </div>

        {/* Proportional Floating Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {[
            { 
              icon: <AlertTriangle className="w-5 h-5" />, 
              title: "The Problem", 
              desc: "Overtourism is eroding heritage and traditional local economies.",
              color: "text-red-400",
              bg: "bg-red-400/10",
              delay: "0s"
            },
            { 
              icon: <Leaf className="w-5 h-5" />, 
              title: "The Vision", 
              desc: "Redirecting travel to sustain artisan hubs and natural gems.",
              color: "text-green-400",
              bg: "bg-green-400/10",
              delay: "0.2s"
            },
            { 
              icon: <Heart className="w-5 h-5" />, 
              title: "The Future", 
              desc: "Directly empowering 500+ local families through discovery.",
              color: "text-amber-400",
              bg: "bg-amber-400/10",
              delay: "0.4s"
            }
          ].map((card, i) => (
            <div 
              key={i} 
              className={`bg-stone-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-3xl animate-float relative overflow-hidden group hover:border-amber-500/20 transition-colors shadow-2xl`}
              style={{ animationDelay: card.delay }}
            >
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center ${card.color} mb-6 transition-transform group-hover:scale-110 duration-500`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif text-white">{card.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed font-light">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};