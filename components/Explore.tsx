
import React, { useState } from 'react';
import { Place } from '../types';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, Star, Search, Loader2, ExternalLink, X, Navigation, Sparkles } from 'lucide-react';
import { searchHiddenGems } from '../services/geminiService';

export const Explore: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState<{text: string, chunks: any[]} | null>(null);
  const [selectedGem, setSelectedGem] = useState<Place | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setAiResults(null);
    try {
      const mysoreLoc = { lat: 12.2958, lng: 76.6394 }; 
      const results = await searchHiddenGems(query, mysoreLoc);
      setAiResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-24 md:pt-28 pb-32 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-12 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-stone-100 mb-4 md:mb-6 tracking-tight">Uncover Hidden Gems</h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm md:text-lg font-light leading-relaxed px-4">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by AI and heritage data.
          </p>
        </div>

        {/* Compact AI Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 relative animate-fade-in-up px-2 md:px-0" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSearch} className="relative z-10">
            <div className="relative group p-0.5 bg-gradient-to-r from-amber-600/30 to-amber-900/30 rounded-2xl shadow-xl">
              <div className="bg-[#141414] rounded-[0.9rem] flex flex-col sm:flex-row items-center overflow-hidden transition-all group-focus-within:bg-[#1a1a1a]">
                <div className="hidden sm:flex pl-5 items-center pointer-events-none">
                  <Search className="h-5 w-5 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask: 'Where is real Mysore sandalwood?'..."
                  className="block w-full px-4 sm:px-4 py-4 md:py-5 bg-transparent text-white placeholder-stone-600 focus:outline-none font-medium text-sm md:text-base"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto sm:mr-1.5 bg-amber-600 hover:bg-amber-500 text-white px-6 py-4 sm:py-3.5 rounded-b-xl sm:rounded-xl font-black flex items-center justify-center gap-2 disabled:bg-stone-800 transition-all shadow-lg active:scale-95 text-[10px] md:text-sm uppercase tracking-widest"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>DISCOVER</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* AI Results Section */}
        {aiResults && (
          <div className="mb-16 md:mb-20 bg-[#141414] rounded-3xl p-6 md:p-12 border border-stone-800/50 shadow-2xl animate-fade-in-up backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/10 rounded-lg md:rounded-xl flex items-center justify-center text-amber-500">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white">Heritage Intelligence</h3>
            </div>
            
            <div className="prose prose-invert max-w-none mb-8 md:mb-10">
              <p className="whitespace-pre-line text-stone-300 text-sm md:text-lg leading-relaxed font-light italic">
                {aiResults.text}
              </p>
            </div>
            
            {aiResults.chunks && aiResults.chunks.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {aiResults.chunks.map((chunk, idx) => {
                  const data = chunk.web || chunk.maps; 
                  if (!data) return null;
                  const uri = data.uri || data.googleMapsUri || "#";
                  const title = data.title || "Location";

                  return (
                    <a 
                      key={idx}
                      href={uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-[#0c0c0c] border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 transition-all group card-lift"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-600/5 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs md:text-sm font-bold text-white truncate">{title}</p>
                        <p className="text-[9px] md:text-[10px] text-amber-600 font-black uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                          MAPS <ExternalLink className="w-2.5 h-2.5" />
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 mb-8 md:mb-10 animate-fade-in-up">
          <div className="w-1 h-6 md:h-8 bg-amber-600 rounded-full"></div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-100">Curated Experiences</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up">
          {HIDDEN_GEMS.map((place, i) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-3xl overflow-hidden border border-stone-800/50 transition-all duration-700 cursor-pointer card-lift shadow-xl"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black text-amber-400 shadow-xl flex items-center gap-1.5">
                  <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" /> {place.rating}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-[8px] md:text-[9px] font-black tracking-[0.2em] text-amber-600 uppercase mb-2">{place.category}</div>
                <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">{place.name}</h3>
                <p className="text-stone-500 text-xs md:text-sm mb-6 line-clamp-2 leading-relaxed font-light">{place.description}</p>
                
                <div className="flex items-center text-stone-600 text-[10px] md:text-[11px] font-medium uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal Refined for Mobile (Slide-up) */}
      {selectedGem && (
        <div 
          className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedGem(null)}
        >
          <div 
            className="bg-[#141414] w-full max-w-2xl rounded-t-[2rem] md:rounded-[2rem] overflow-hidden shadow-2xl relative border-t border-x md:border border-stone-800/50 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Grab handle for mobile */}
            <div className="md:hidden w-12 h-1.5 bg-stone-700 rounded-full mx-auto mt-4 mb-2"></div>
            
            <button 
              onClick={() => setSelectedGem(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="h-48 sm:h-64 relative">
               <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-tight tracking-tight">{selectedGem.name}</h3>
               </div>
            </div>

            <div className="p-6 md:p-8">
               <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="flex items-center text-stone-300 bg-stone-900/50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-stone-800/50 font-bold text-[10px] md:text-xs">
                     <MapPin className="w-3.5 h-3.5 mr-2 text-amber-600" /> {selectedGem.location}
                  </div>
                  <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest border ${
                      selectedGem.crowdLevel === 'low' ? 'bg-green-600/10 text-green-500 border-green-600/20' : 
                      selectedGem.crowdLevel === 'moderate' ? 'bg-amber-600/10 text-amber-500 border-amber-600/20' : 'bg-red-600/10 text-red-500 border-red-600/20'
                  }`}>
                     {selectedGem.crowdLevel} Density
                  </div>
               </div>

               <p className="text-stone-400 leading-relaxed text-sm md:text-base font-light mb-8 max-h-40 overflow-y-auto scrollbar-hide">
                  {selectedGem.description}
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 pb-4 md:pb-0">
                  <button 
                      onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                      className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-black text-sm md:text-base flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest"
                  >
                      <Navigation className="w-5 h-5" /> NAVIGATE
                  </button>
                  <button 
                      onClick={() => setSelectedGem(null)}
                      className="hidden sm:block px-8 border border-stone-800 hover:bg-stone-800 text-stone-400 py-4 rounded-2xl font-black text-sm md:text-base transition-all active:scale-[0.98] uppercase tracking-widest"
                  >
                      CLOSE
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
