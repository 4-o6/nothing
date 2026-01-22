import React, { useState, useRef } from 'react';
import { Place } from '../types';
import { HIDDEN_GEMS } from '../constants';
import { searchHiddenGems } from '../services/geminiService';
import { MapPin, Star, Search, Loader2, X, Navigation, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

export const Explore: React.FC = () => {
  const [selectedGem, setSelectedGem] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResults, setAiResults] = useState<{text: string, chunks: any[]} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    setAiResults(null);
    
    try {
      const results = await searchHiddenGems(searchQuery);
      setAiResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-32 sm:pt-28 pb-24 sm:pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 animate-app-reveal">
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 tracking-tight">Hidden Gems</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-base sm:text-xl font-light leading-relaxed">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by heritage data.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16 sm:mb-24 animate-app-reveal group">
          <form onSubmit={handleSearch} className="relative p-1 rounded-[2.5rem] bg-gradient-to-r from-stone-900 via-amber-900/20 to-stone-900 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            <div className="flex items-center bg-[#0c0c0c] rounded-[2.3rem] px-4 md:px-6 py-2 md:py-3 overflow-hidden relative">
              <Search className={`w-6 h-6 mr-4 transition-colors ${isSearching ? 'text-amber-500 animate-pulse' : 'text-stone-700'}`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search: Find woodcarvers in Agrahara..."
                className="flex-1 bg-transparent text-white border-none outline-none text-base sm:text-base placeholder:text-stone-600 py-3 md:py-4"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-stone-900 hover:bg-amber-600 hover:text-white transition-all p-3 rounded-2xl border border-white/5 text-stone-400 group-hover:text-white disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
          
          {aiResults && (
            <div className="mt-8 bg-[#141414] border border-white/10 rounded-[2.5rem] p-8 animate-app-reveal shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <button onClick={() => setAiResults(null)} className="text-stone-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">
                 <Sparkles className="w-3.5 h-3.5" /> AI Heritage Insights
               </div>
               <div className="text-stone-300 text-sm md:text-base leading-relaxed mb-8 prose prose-invert font-light max-w-none whitespace-pre-wrap">
                 {aiResults.text}
               </div>
               
               {aiResults.chunks && aiResults.chunks.length > 0 && (
                 <div className="space-y-4 pt-6 border-t border-white/5">
                   <p className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Grounding Sources</p>
                   <div className="flex flex-wrap gap-3">
                     {aiResults.chunks.map((chunk: any, i: number) => (
                       chunk.maps && (
                         <a 
                           key={i} 
                           href={chunk.maps.uri} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-3 px-4 py-2 bg-stone-900 border border-white/5 rounded-xl text-[10px] font-bold text-stone-400 hover:text-white hover:border-amber-600/30 transition-all"
                         >
                           <MapPin className="w-3.5 h-3.5 text-amber-600" /> {chunk.maps.title || 'Location Found'} <ExternalLink className="w-3 h-3" />
                         </a>
                       )
                     ))}
                   </div>
                 </div>
               )}
            </div>
          )}
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
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
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

        {selectedGem && (
          <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in px-4" onClick={() => setSelectedGem(null)}>
            <div className="bg-[#141414] w-full max-w-2xl rounded-t-[2rem] sm:rounded-[3rem] overflow-hidden border-t sm:border border-white/10 animate-app-reveal max-h-[90vh] overflow-y-auto scrollbar-hide" onClick={e => e.stopPropagation()}>
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
                onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white h-14 sm:h-16 rounded-xl sm:rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-3 sm:gap-4 shadow-2xl transition-all active:scale-95 mb-4"
              >
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" /> NAVIGATE IN MAPS
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};