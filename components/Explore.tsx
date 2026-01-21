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
    try {
      const results = await searchHiddenGems(query, { lat: 12.2958, lng: 76.6394 });
      setAiResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-app-reveal">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">Hidden Gems</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by AI and heritage data.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-20 animate-app-reveal">
          <form onSubmit={handleSearch} className="bg-white/5 p-2 rounded-3xl border border-white/10 flex items-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <Search className="w-6 h-6 text-stone-600 ml-5 hidden sm:block" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where is real sandalwood?"
              className="flex-1 bg-transparent px-5 py-4.5 text-white outline-none placeholder-stone-700 text-base font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-50 flex items-center gap-3 shadow-xl transition-all active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              <span>DISCOVER</span>
            </button>
          </form>
        </div>

        {aiResults && (
          <div className="mb-20 glass-card rounded-[3rem] p-10 md:p-14 animate-app-reveal">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white tracking-tight">AI Heritage Discovery</h3>
            </div>
            <p className="text-stone-400 text-lg leading-relaxed mb-10 font-light italic border-l-2 border-amber-900/30 pl-8">
              {aiResults.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiResults.chunks?.map((chunk, idx) => {
                const data = chunk.web || chunk.maps;
                if (!data) return null;
                return (
                  <a key={idx} href={data.uri} target="_blank" className="p-5 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-amber-500/50 hover:bg-amber-600/5 transition-all group">
                    <MapPin className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[11px] font-black text-white uppercase tracking-wider truncate">{data.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

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
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-black text-amber-400 flex items-center gap-2 shadow-xl">
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
      </div>

      {selectedGem && (
        <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in" onClick={() => setSelectedGem(null)}>
          <div className="bg-[#141414] w-full max-w-2xl rounded-t-[3rem] md:rounded-[3rem] overflow-hidden border-t md:border border-white/10 animate-app-reveal" onClick={e => e.stopPropagation()}>
            <div className="h-72 relative">
              <img src={selectedGem.imageUrl} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedGem(null)} className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full hover:bg-black transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-10 md:p-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-600 text-[10px] font-black px-4 py-1.5 rounded-full text-white uppercase tracking-widest shadow-lg">{selectedGem.category}</div>
                <div className="bg-white/5 text-[10px] font-black px-4 py-1.5 rounded-full text-stone-500 uppercase tracking-widest border border-white/5">{selectedGem.crowdLevel} Crowd</div>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">{selectedGem.name}</h3>
              <p className="text-stone-500 text-lg font-light leading-relaxed mb-10">{selectedGem.description}</p>
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
  );
};