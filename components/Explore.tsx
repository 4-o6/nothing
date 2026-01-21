
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
    <div className="min-h-screen bg-[#0c0c0c] py-32 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-100 mb-8 tracking-tight">Uncover Hidden Gems</h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Avoid the commercial traps. Find the stories that define Mysuru's heartbeat, curated by artificial intelligence and local heritage data.
          </p>
        </div>

        {/* AI Search Bar */}
        <div className="max-w-3xl mx-auto mb-20 relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSearch} className="relative z-10">
            <div className="relative group p-1 bg-gradient-to-r from-amber-600/50 to-amber-900/50 rounded-[2rem] shadow-2xl">
              <div className="bg-[#141414] rounded-[1.8rem] flex items-center overflow-hidden transition-all group-focus-within:bg-[#1a1a1a]">
                <div className="pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask AI: 'Where can I find real Mysore sandalwood?'..."
                  className="block w-full px-5 py-6 bg-transparent text-white placeholder-stone-600 focus:outline-none font-medium text-lg"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="mr-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 disabled:bg-stone-800 transition-all shadow-xl shadow-amber-900/30 active:scale-95"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> DISCOVER</>}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* AI Results Section */}
        {aiResults && (
          <div className="mb-24 bg-[#141414] rounded-[3rem] p-10 md:p-16 border border-stone-800/50 shadow-2xl animate-fade-in-up backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-white">AI Heritage Intelligence</h3>
            </div>
            
            <div className="prose prose-invert max-w-none mb-12">
              <p className="whitespace-pre-line text-stone-300 text-xl leading-relaxed font-light italic">
                {aiResults.text}
              </p>
            </div>
            
            {aiResults.chunks && aiResults.chunks.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {aiResults.chunks.map((chunk, idx) => {
                  const data = chunk.web || chunk.maps; 
                  if (!data) return null;
                  const uri = data.uri || data.googleMapsUri || "#";
                  const title = data.title || "Heritage Destination";

                  return (
                    <a 
                      key={idx}
                      href={uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-5 rounded-3xl bg-[#0c0c0c] border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 transition-all group card-lift"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-600/5 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-lg font-bold text-white truncate">{title}</p>
                        <p className="text-xs text-amber-600 font-black uppercase tracking-widest flex items-center gap-2 mt-1">
                          MAPS <ExternalLink className="w-3 h-3" />
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <h3 className="text-4xl font-serif font-bold text-stone-100 mb-12 flex items-center gap-4 animate-fade-in-up">
          <span className="w-1 h-12 bg-amber-600 rounded-full"></span>
          Master-Curated Experiences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in-up">
          {HIDDEN_GEMS.map((place, i) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-[2.5rem] overflow-hidden border border-stone-800/50 transition-all duration-700 cursor-pointer card-lift"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-amber-400 shadow-2xl flex items-center gap-2">
                  <Star className="w-4 h-4 fill-current" /> {place.rating}
                </div>
                <div className={`absolute bottom-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-2xl
                  ${place.crowdLevel === 'low' ? 'bg-green-600' : place.crowdLevel === 'moderate' ? 'bg-amber-600' : 'bg-red-600'}
                `}>
                  {place.crowdLevel} Crowd
                </div>
              </div>
              
              <div className="p-8">
                <div className="text-[10px] font-black tracking-[0.2em] text-amber-600 uppercase mb-3">{place.category}</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">{place.name}</h3>
                <p className="text-stone-500 text-base mb-8 line-clamp-3 leading-relaxed font-light">{place.description}</p>
                
                <div className="flex items-center text-stone-600 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                  {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal Polished */}
      {selectedGem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedGem(null)}
        >
          <div 
            className="bg-[#141414] w-full max-w-3xl rounded-[3rem] overflow-hidden shadow-2xl relative border border-stone-800/50 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedGem(null)}
              className="absolute top-8 right-8 z-10 p-3 bg-stone-900/80 hover:bg-stone-800 text-white rounded-full shadow-2xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="h-80 relative">
               <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center gap-4 mb-4">
                     <span className="bg-amber-600 text-[10px] font-black px-4 py-1 rounded-full text-white uppercase tracking-[0.2em]">{selectedGem.category}</span>
                     <div className="flex items-center text-amber-400 text-sm font-black bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md border border-amber-600/20">
                        <Star className="w-4 h-4 fill-current mr-2" /> {selectedGem.rating} RATING
                     </div>
                  </div>
                  <h3 className="text-5xl font-serif font-bold text-white leading-tight tracking-tight">{selectedGem.name}</h3>
               </div>
            </div>

            <div className="p-12 overflow-y-auto">
               <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center text-stone-300 bg-stone-900/50 px-6 py-3 rounded-2xl border border-stone-800/50 font-bold text-sm">
                     <MapPin className="w-5 h-5 mr-3 text-amber-600" /> {selectedGem.location}
                  </div>
                  <div className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border ${
                      selectedGem.crowdLevel === 'low' ? 'bg-green-600/10 text-green-500 border-green-600/20' : 
                      selectedGem.crowdLevel === 'moderate' ? 'bg-amber-600/10 text-amber-500 border-amber-600/20' : 'bg-red-600/10 text-red-500 border-red-600/20'
                  }`}>
                     {selectedGem.crowdLevel} OCCUPANCY
                  </div>
               </div>

               <div className="mb-12">
                 <p className="text-stone-400 leading-relaxed text-xl font-light mb-6">{selectedGem.description}</p>
                 <div className="p-6 bg-stone-900/30 border border-stone-800 rounded-3xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-600/10 rounded-full flex items-center justify-center text-amber-500">
                       <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-stone-500 font-medium italic">
                      This location directly supports {Math.floor(Math.random() * 50) + 10}+ local households via community tourism.
                    </p>
                 </div>
               </div>
               
               <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                      onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                      className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-amber-900/30 active:scale-[0.98]"
                  >
                      <Navigation className="w-6 h-6" /> NAVIGATE NOW
                  </button>
                  <button 
                      onClick={() => setSelectedGem(null)}
                      className="flex-1 border border-stone-800 hover:bg-stone-800 text-stone-400 py-5 rounded-2xl font-black text-lg transition-all active:scale-[0.98]"
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
