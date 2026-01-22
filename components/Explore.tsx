
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
      
      if (!results || (!results.text && (!results.chunks || results.chunks.length === 0))) {
        setAiError("No specific heritage details found for this search. Please try a more general term like 'Mysore silk' or 'Mandi Mohalla'.");
      } else {
        setAiResults(results);
      }
    } catch (error: any) {
      console.error("Search failed:", error);
      setAiError("The Heritage Engine is currently busy or reaching capacity. Please try again in a few moments.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-56 sm:pt-48 pb-32 px-4 selection:bg-amber-600/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-24 animate-app-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] mb-6">
             <Bookmark className="w-3.5 h-3.5" /> Discovery Engine
          </div>
          <h2 className="text-5xl sm:text-7xl font-serif font-bold text-white mb-6 tracking-tighter leading-tight">
            Uncover the <br className="sm:hidden"/> <span className="text-amber-500 italic">Unseen.</span>
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-base sm:text-xl font-light leading-relaxed">
            Use our AI Heritage Search to find silent weavers, hidden lakes, and the stories most travelers miss.
          </p>
        </div>

        {/* Search Experience */}
        <div className="max-w-3xl mx-auto mb-20 sm:mb-32 animate-app-reveal">
          <form onSubmit={handleSearch} className="relative group">
            <div className={`
              absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-900 rounded-[2.5rem] blur opacity-20 
              group-hover:opacity-40 transition duration-1000 group-hover:duration-200
              ${isSearching ? 'opacity-60 animate-pulse' : ''}
            `}></div>
            <div className="relative p-1 rounded-[2.5rem] bg-stone-900/50 border border-white/5 shadow-2xl backdrop-blur-3xl">
              <div className="flex items-center bg-[#0c0c0c] rounded-[2.3rem] px-5 md:px-8 py-1 overflow-hidden">
                <Search className={`w-6 h-6 mr-4 transition-colors ${isSearching ? 'text-amber-500 animate-pulse' : 'text-stone-700'}`} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for an artisan, neighborhood, or secret spot..."
                  className="flex-1 bg-transparent text-white border-none outline-none text-base sm:text-lg placeholder:text-stone-800 py-5"
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="bg-stone-900 hover:bg-amber-600 text-stone-500 hover:text-white transition-all p-3.5 rounded-2xl disabled:opacity-50 active:scale-95"
                >
                  {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </form>
          
          {/* Error Message */}
          {aiError && (
            <div className="mt-8 flex items-start gap-4 bg-red-500/5 border border-red-500/10 p-6 rounded-3xl text-red-400 text-xs font-bold uppercase tracking-widest animate-fade-in leading-relaxed">
              <AlertCircle className="w-5 h-5 flex-shrink-0" /> 
              <span>{aiError}</span>
            </div>
          )}

          {/* AI Search Results Card */}
          {aiResults && (
            <div className="mt-12 bg-[#141414] border border-amber-600/20 rounded-[3rem] p-8 md:p-16 animate-app-reveal shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                  <button 
                    onClick={() => setAiResults(null)} 
                    className="text-stone-700 hover:text-white transition-colors p-3 hover:bg-white/5 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
               </div>
               
               <div className="flex items-center gap-3 text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-10">
                 <Sparkles className="w-5 h-5" /> Heritage Search Insights
               </div>
               
               <div className="text-stone-300 text-lg md:text-xl leading-relaxed mb-12 font-light prose prose-invert max-w-none whitespace-pre-wrap">
                 {aiResults.text}
               </div>

               {aiResults.chunks && aiResults.chunks.length > 0 && (
                 <div className="space-y-6 pt-12 border-t border-white/5">
                   <p className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Verifiable Heritage Sources</p>
                   <div className="flex flex-wrap gap-4">
                     {aiResults.chunks.map((chunk: any, i: number) => {
                       const link = chunk.web || chunk.maps;
                       if (!link) return null;
                       return (
                         <a 
                           key={i} 
                           href={link.uri} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex items-center gap-4 px-6 py-3.5 bg-[#0c0c0c] border border-white/5 rounded-2xl text-[11px] font-bold text-stone-400 hover:text-white hover:border-amber-600/30 transition-all group/link"
                         >
                           {chunk.web ? <Globe className="w-4 h-4 text-blue-500" /> : <MapPin className="w-4 h-4 text-amber-500" />}
                           <span className="truncate max-w-[200px]">{link.title || 'View Source'}</span>
                           <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover/link:opacity-100" />
                         </a>
                       );
                     })}
                   </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Curation Title */}
        <div className="flex items-center gap-4 mb-12 animate-app-reveal">
           <div className="h-px bg-white/5 flex-1"></div>
           <span className="text-[10px] font-black text-stone-700 uppercase tracking-[0.5em]">Curated Heritage Nodes</span>
           <div className="h-px bg-white/5 flex-1"></div>
        </div>

        {/* Static Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {HIDDEN_GEMS.map((place, i) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl animate-app-reveal flex flex-col h-full card-lift"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="h-72 overflow-hidden relative">
                <img src={place.imageUrl} alt={place.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-amber-400 flex items-center gap-2 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-current" /> {place.rating}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="text-[9px] font-black tracking-widest text-amber-600 uppercase mb-4 px-4 py-1 bg-amber-600/10 rounded-full w-fit">{place.category}</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">{place.name}</h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-8 line-clamp-3 flex-1">{place.description}</p>
                <div className="flex items-center text-stone-600 text-[10px] font-black uppercase tracking-widest pt-6 border-t border-white/5">
                  <MapPin className="w-4 h-4 mr-2.5 text-amber-600" /> {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedGem && (
          <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in px-4" onClick={() => setSelectedGem(null)}>
            <div className="bg-[#141414] w-full max-w-2xl rounded-t-[3rem] sm:rounded-[4rem] overflow-hidden border-t sm:border border-white/10 animate-app-reveal max-h-[90vh] overflow-y-auto scrollbar-hide" onClick={e => e.stopPropagation()}>
              <div className="h-80 relative">
                <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedGem(null)} className="absolute top-8 right-8 p-4 bg-black/50 text-white rounded-full hover:bg-black transition-colors backdrop-blur-md"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-10 sm:p-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-amber-600 text-[10px] font-black px-5 py-2 rounded-full text-white uppercase tracking-widest shadow-xl">{selectedGem.category}</div>
                  <div className="bg-white/5 text-[10px] font-black px-5 py-2 rounded-full text-stone-500 uppercase tracking-widest border border-white/10">{selectedGem.crowdLevel} Crowd</div>
                </div>
                <h3 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-8 leading-tight tracking-tighter">{selectedGem.name}</h3>
                <p className="text-stone-500 text-lg sm:text-xl font-light leading-relaxed mb-12">{selectedGem.description}</p>
                <button 
                  onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white h-20 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl shadow-amber-900/40 transition-all active:scale-95"
                >
                  <Navigation className="w-5 h-5" /> LAUNCH IN GOOGLE MAPS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
