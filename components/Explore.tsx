
import React, { useState } from 'react';
import { Place } from '../types';
import { HIDDEN_GEMS } from '../constants';
import { searchHiddenGems } from '../services/geminiService';
import { MapPin, Star, Search, Loader2, X, Navigation, Sparkles, ArrowRight, ExternalLink, Globe, AlertCircle, Bookmark } from 'lucide-react';

export const Explore: React.FC = () => {
  const [selectedGem, setSelectedGem] = useState<Place | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<{text: string, chunks: any[]} | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery || isSearching) return;
    
    setIsSearching(true);
    setAiResults(null);
    setAiError(null);
    
    try {
      const results = await searchHiddenGems(cleanQuery);
      setAiResults(results);
    } catch (error: any) {
      setAiError("Search unavailable. Please check your connection and try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-56 pb-24 px-4 selection:bg-amber-600/30">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6">
             <Bookmark className="w-3.5 h-3.5" /> Fast Discovery
          </div>
          <h2 className="text-5xl sm:text-7xl font-serif font-bold text-white mb-4 tracking-tighter">
            Hidden <span className="text-amber-500 italic">Mysuru.</span>
          </h2>
        </div>

        {/* Rapid Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative">
            <div className={`absolute -inset-1 bg-amber-600 rounded-[2.5rem] blur-xl opacity-10 transition-opacity ${isSearching ? 'opacity-30' : ''}`}></div>
            <div className="relative bg-stone-900 border border-white/5 rounded-[2.3rem] flex items-center px-6 shadow-2xl">
              <Search className={`w-5 h-5 mr-3 ${isSearching ? 'text-amber-500 animate-pulse' : 'text-stone-700'}`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything: 'Rosewood', 'Silk', 'Lakes'..."
                className="flex-1 bg-transparent text-white border-none outline-none py-5 text-base"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="text-amber-500 disabled:opacity-30 p-2"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
              </button>
            </div>
          </form>
          
          {aiError && (
            <div className="mt-4 flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-widest bg-red-950/20 p-4 rounded-2xl border border-red-900/20">
              <AlertCircle className="w-4 h-4" /> {aiError}
            </div>
          )}

          {aiResults && (
            <div className="mt-8 bg-[#141414] border border-amber-600/30 rounded-[2.5rem] p-8 sm:p-12 shadow-3xl relative animate-app-reveal">
               <button onClick={() => setAiResults(null)} className="absolute top-6 right-6 text-stone-600 hover:text-white"><X className="w-5 h-5" /></button>
               <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest mb-6"><Sparkles className="w-4 h-4" /> Instant Insight</div>
               <div className="text-stone-300 text-lg leading-relaxed mb-8 font-light whitespace-pre-wrap">{aiResults.text}</div>
               {aiResults.chunks && aiResults.chunks.length > 0 && (
                 <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                   {aiResults.chunks.map((chunk: any, i: number) => {
                     const link = chunk.web || chunk.maps;
                     if (!link) return null;
                     return (
                       <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-stone-900 rounded-xl text-[10px] font-bold text-stone-400 hover:text-white border border-white/5">
                         {chunk.web ? <Globe className="w-3 h-3 text-blue-500" /> : <MapPin className="w-3 h-3 text-amber-500" />}
                         <span className="truncate max-w-[120px]">{link.title || 'Source'}</span>
                       </a>
                     );
                   })}
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Static Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIDDEN_GEMS.map((place) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer flex flex-col hover:border-amber-600/30 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={place.imageUrl} alt={place.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-[10px] font-black text-amber-400 flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-current" /> {place.rating}</div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-[9px] font-black text-amber-600 uppercase mb-3 px-3 py-1 bg-amber-600/10 rounded-full w-fit">{place.category}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight">{place.name}</h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">{place.description}</p>
                <div className="flex items-center text-stone-600 text-[10px] font-black uppercase tracking-widest pt-4 border-t border-white/5 mt-auto">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-amber-600" /> {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedGem && (
          <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md px-4" onClick={() => setSelectedGem(null)}>
            <div className="bg-[#141414] w-full max-w-xl rounded-t-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10" onClick={e => e.stopPropagation()}>
              <div className="h-64 relative">
                <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedGem(null)} className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-10">
                <div className="flex gap-2 mb-6">
                  <span className="bg-amber-600 text-[9px] font-black px-4 py-1.5 rounded-full text-white uppercase">{selectedGem.category}</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-white mb-4">{selectedGem.name}</h3>
                <p className="text-stone-500 text-base font-light leading-relaxed mb-10">{selectedGem.description}</p>
                <button 
                  onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white h-16 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
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
