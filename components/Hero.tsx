import React from 'react';
import { AppView } from '../types';
import { ArrowRight, AlertTriangle, Leaf, Heart } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onImpact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onImpact }) => {
  return (
    <div className="relative bg-stone-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://s7ap1.scene7.com/is/image/incredibleindia/sri-nandi-temple-mysuru-karnataka-1-attr-hero?qlt=82&ts=1742178245295"
          alt="Mysore Palace Architecture"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="lg:w-2/3">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm mb-6">
            <span className="animate-pulse mr-2">●</span> Reimagining Tourism in Mysore
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
            Discover the <span className="text-amber-500">Real Mysore</span> <br/> Beyond the Crowds.
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-8 max-w-2xl leading-relaxed">
            Every year, millions flock to the Palace, leaving local artisans and hidden heritage sites in the shadows. 
            Experience authentic culture, support local livelihoods, and travel sustainably.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStart}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-amber-900/20"
            >
              Explore Hidden Gems <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={onImpact}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-8 py-4 rounded-lg font-semibold transition-all"
            >
              Learn About Impact
            </button>
          </div>
        </div>
      </div>

      {/* Problem/Solution Cards */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-stone-800/50 backdrop-blur border border-stone-700 p-6 rounded-xl">
            <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">The Problem</h3>
            <p className="text-stone-400 text-sm">Over-tourism at major sites dilutes experience and strains infrastructure.</p>
          </div>
          <div className="bg-stone-800/50 backdrop-blur border border-stone-700 p-6 rounded-xl">
            <div className="w-12 h-12 bg-green-900/30 rounded-lg flex items-center justify-center text-green-400 mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">The Solution</h3>
            <p className="text-stone-400 text-sm">Decentralizing tourism to support local craft hubs and authentic eateries.</p>
          </div>
          <div className="bg-stone-800/50 backdrop-blur border border-stone-700 p-6 rounded-xl">
            <div className="w-12 h-12 bg-amber-900/30 rounded-lg flex items-center justify-center text-amber-400 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">The Impact</h3>
            <p className="text-stone-400 text-sm">Preserving heritage, empowering artisans, and richer experiences for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};