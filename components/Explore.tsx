import React, { useState } from 'react';
import { Place } from '../types';
import { HIDDEN_GEMS } from '../constants';
import { searchHiddenGems } from '../services/geminiService';
import { MapPin, Star, Search, Loader2, X, Navigation, Sparkles, ArrowRight, ExternalLink, Globe, AlertCircle } from 'lucide-react';

export const Explore: React.FC = () => {
  const [selectedGem, setSelectedGem] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<{text: string, chunks: any[]} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    setAiResults(null);
    setAiError(null);
    
    try {
      const results = await searchHiddenGems(searchQuery);
      if (!results || (!results.text && results.chunks.length === 0)) {
        throw new Error("No results returned");
      }
      setAiResults(results);
    } catch (error) {
      console.error("AI Search Failed:", error);
      setAiError("Heritage data is currently reaching capacity or unavailable. Please try a simpler query.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-40 sm:pt-36 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 animate-app-reveal">
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4 tracking-tight">Hidden Gems</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-base sm:text-xl font-light">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by heritage grounding.
          </p>
        </div>

        {/* AI Heritage Search */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-24 animate-app-reveal group">
          <form onSubmit={handleSearch} className="relative p-1 rounded-[2.5rem] bg-gradient-to-r from-stone-900 via-amber-900/30 to-stone-900 border border-white/5 shadow-2xl">
            <div className="flex items-center bg-[#0c0c0c] rounded-[2.3rem] px-4 md:px-6 py-1 overflow-hidden">
              <Search className={`w-5 h-5 mr-3 transition-colors ${isSearching ? 'text-amber-500 animate-pulse' : 'text-stone-700'}`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search: Try 'Rosewood artisans' or 'Quiet lakes'..."
                className="flex-1 bg-transparent text-white border-none outline-none text-sm sm:text-base placeholder:text-stone-700 py-4"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-stone-900 hover:bg-amber-600 text-stone-400 hover:text-white transition-all p-3 rounded-2xl disabled:opacity-50"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </form>
          
          {aiError && (
            <div className="mt-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
              <AlertCircle className="w-5 h-5" /> {aiError}
            </div>
          )}

          {aiResults && (
            <div className="mt-8 bg-[#141414] border border-amber-500/30 rounded-[2.5rem] p-8 sm:p-12 animate-app-reveal shadow-2xl relative">
               <div className="absolute top-0 right-0 p-4">
                  <button onClick={() => setAiResults(null)} className="text-stone-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><X className="w-5 h-5" /></button>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-6">
                 <Sparkles className="w-4 h-4" /> AI Heritage Search Insight
               </div>
               <div className="text-stone-300 text-sm md:text-base leading-relaxed mb-10 prose prose-invert font-light max-w-none whitespace-pre-wrap">
                 {aiResults.text}
               </div>
               {aiResults.chunks && aiResults.chunks.length > 0 && (
                 <div className="space-y-4 pt-8 border-t border-white/5">
                   <p className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Linked Locations & Sources</p>
                   <div className="flex flex-wrap gap-3">
                     {aiResults.chunks.map((chunk: any, i: number) => {
                       const link = chunk.web || chunk.maps;
                       if (!link) return null;
                       return (
                         <a 
                           key={i} 
                           href={link.uri} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-3 px-4 py-2.5 bg-stone-900 border border-white/5 rounded-xl text-[10px] font-bold text-stone-400 hover:text-white transition-all"
                         >
                           {chunk.web ? <Globe className="w-3.5 h-3.5 text-blue-500" /> : <MapPin className="w-3.5 h-3.5 text-amber-500" />}
                           {link.title || 'View Source'} <ExternalLink className="w-3 h-3" />
                         </a>
                       );
                     })}
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Existing Static Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIDDEN_GEMS.map((place, i) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl animate-app-reveal flex flex-col h-full card-lift"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="h-64 overflow-hidden relative">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black text-amber-400 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-current" /> {place.rating}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-[9px] font-black tracking-widest text-amber-600 uppercase mb-3 px-3 py-1 bg-amber-600/10 rounded-full w-fit">{place.category}</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-tight">{place.name}</h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-3 flex-1">{place.description}</p>
                <div className="flex items-center text-stone-600 text-[10px] font-black uppercase tracking-widest pt-5 border-t border-white/5">
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" /> {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Selection */}
        {selectedGem && (
          <div className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in px-4" onClick={() => setSelectedGem(null)}>
            <div className="bg-[#141414] w-full max-w-2xl rounded-t-[2rem] sm:rounded-[3rem] overflow-hidden border-t sm:border border-white/10 animate-app-reveal max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="h-72 relative">
                <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedGem(null)} className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full hover:bg-black transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-600 text-[10px] font-black px-4 py-1.5 rounded-full text-white uppercase tracking-widest">{selectedGem.category}</div>
                  <div className="bg-white/5 text-[10px] font-black px-4 py-1.5 rounded-full text-stone-500 uppercase tracking-widest border border-white/5">{selectedGem.crowdLevel} Crowd</div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 leading-tight">{selectedGem.name}</h3>
                <p className="text-stone-500 text-base sm:text-lg font-light leading-relaxed mb-10">{selectedGem.description}</p>
                <button 
                  onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white h-16 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95"
                >
                  <Navigation className="w-5 h-5" /> NAVIGATE IN MAPS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};