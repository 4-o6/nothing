import React, { useState } from 'react';
import { Place } from '../types';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, Star, Search, Loader2, X, Navigation, Sparkles, Lock, Cpu } from 'lucide-react';

export const Explore: React.FC = () => {
  const [selectedGem, setSelectedGem] = useState<Place | null>(null);

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-24 sm:pt-32 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-20 animate-app-reveal">
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 tracking-tight">Hidden Gems</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-base sm:text-xl font-light leading-relaxed">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by heritage data.
          </p>
        </div>

        {/* Premium AI Search Mockup */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-24 animate-app-reveal group">
          <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-r from-stone-900 via-amber-900/20 to-stone-900 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-center bg-[#0c0c0c] rounded-[2.3rem] px-6 py-4 md:py-6 overflow-hidden relative">
              
              {/* Animation Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-600/5 to-transparent animate-[shimmer_3s_infinite] opacity-30"></div>
              
              <div className="flex items-center gap-4 flex-1">
                <Search className="w-6 h-6 text-stone-700" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-stone-600 uppercase tracking-[0.3em] mb-1">AI Heritage Engine</span>
                  <span className="text-stone-500 text-sm font-medium italic">Scanning historical datasets...</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-900/80 rounded-full border border-white/5">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                   <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">CALIBRATING</span>
                </div>
                <div className="bg-stone-900 p-3 rounded-2xl border border-white/10 text-stone-400 group-hover:text-amber-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            {/* Soft shadow glow */}
            <div className="absolute -inset-1 bg-amber-600/5 blur-2xl -z-10 group-hover:bg-amber-600/10 transition-all"></div>
          </div>
          <p className="text-center mt-6 text-[9px] font-black text-stone-700 uppercase tracking-[0.4em]">Heritage Neural Network Online • Beta Access Early 2026</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HIDDEN_GEMS.map((place, i) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl animate-app-reveal flex flex-col h-full card-lift"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="h-56 sm:h-64 overflow-hidden relative">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/70 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black text-amber-400 flex items-center gap-1.5 sm:gap-2 shadow-xl">
                  <Star className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" /> {place.rating}
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="text-[8px] sm:text-[9px] font-black tracking-widest text-amber-600 uppercase mb-2 sm:mb-3 px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-600/10 rounded-full w-fit">{place.category}</div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 sm:mb-3 tracking-tight">{place.name}</h3>
                <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-1">{place.description}</p>
                <div className="flex items-center text-stone-600 text-[9px] sm:text-[10px] font-black uppercase tracking-widest pt-4 sm:pt-5 border-t border-white/5">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 sm:mr-2 text-amber-600" /> {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGem && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedGem(null)}>
          <div className="bg-[#141414] w-full max-w-2xl rounded-t-[2rem] sm:rounded-[3rem] overflow-hidden border-t sm:border border-white/10 animate-app-reveal" onClick={e => e.stopPropagation()}>
            <div className="h-64 sm:h-72 relative">
              <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedGem(null)} className="absolute top-5 sm:top-6 right-5 sm:right-6 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black transition-colors"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button>
            </div>
            <div className="p-8 sm:p-14">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="bg-amber-600 text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-white uppercase tracking-widest shadow-lg">{selectedGem.category}</div>
                <div className="bg-white/5 text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-stone-500 uppercase tracking-widest border border-white/5">{selectedGem.crowdLevel} Crowd</div>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">{selectedGem.name}</h3>
              <p className="text-stone-500 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10">{selectedGem.description}</p>
              <button 
                // Fix: Corrected variable name from selectedPlace to selectedGem
                onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white h-14 sm:h-16 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-3 sm:gap-4 shadow-2xl transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" /> NAVIGATE IN MAPS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};