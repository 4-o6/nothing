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
    <div className="min-h-screen bg-[#0c0c0c] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-app-reveal">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Hidden Gems</h2>
          <p className="text-stone-500 max-w-xl mx-auto text-base font-light leading-relaxed">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by AI and heritage data.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-16 animate-app-reveal">
          <form onSubmit={handleSearch} className="bg-white/5 p-1.5 rounded-2xl border border-white/10 flex items-center shadow-2xl">
            <Search className="w-5 h-5 text-stone-600 ml-4 hidden sm:block" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where is real sandalwood?"
              className="flex-1 bg-transparent px-4 py-3.5 text-white outline-none placeholder-stone-700 text-sm font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>DISCOVER</span>
            </button>
          </form>
        </div>

        {aiResults && (
          <div className="mb-16 glass-card rounded-[2rem] p-8 md:p-10 animate-app-reveal">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">AI Heritage Discovery</h3>
            </div>
            <p className="text-stone-400 text-base leading-relaxed mb-8 font-light italic">
              {aiResults.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiResults.chunks?.map((chunk, idx) => {
                const data = chunk.web || chunk.maps;
                if (!data) return null;
                return (
                  <a key={idx} href={data.uri} target="_blank" className="p-3.5 bg-black/40 rounded-xl border border-white/5 flex items-center gap-3 hover:border-amber-500/50 transition-all">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">{data.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIDDEN_GEMS.map((place, i) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-[#141414] rounded-[1.5rem] overflow-hidden border border-white/5 cursor-pointer shadow-xl animate-app-reveal"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="h-52 overflow-hidden relative">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-3 right-3 bg-black/70 px-2.5 py-1 rounded-full text-[9px] font-black text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {place.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="text-[8px] font-black tracking-widest text-amber-600 uppercase mb-2">{place.category}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">{place.name}</h3>
                <p className="text-stone-500 text-xs font-light leading-relaxed mb-4 line-clamp-2">{place.description}</p>
                <div className="flex items-center text-stone-600 text-[9px] font-black uppercase tracking-widest">
                  <MapPin className="w-3 h-3 mr-1.5 text-amber-600" /> {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGem && (
        <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedGem(null)}>
          <div className="bg-[#141414] w-full max-w-xl rounded-t-[2rem] md:rounded-[2rem] overflow-hidden border-t md:border border-white/10 animate-app-reveal" onClick={e => e.stopPropagation()}>
            <div className="h-56 relative">
              <img src={selectedGem.imageUrl} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedGem(null)} className="absolute top-5 right-5 p-2 bg-black/50 text-white rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-600 text-[9px] font-black px-3 py-1 rounded-full text-white uppercase tracking-widest">{selectedGem.category}</div>
                <div className="bg-white/5 text-[9px] font-black px-3 py-1 rounded-full text-stone-500 uppercase tracking-widest">{selectedGem.crowdLevel} Crowd</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-tight">{selectedGem.name}</h3>
              <p className="text-stone-500 text-base font-light leading-relaxed mb-8">{selectedGem.description}</p>
              <button 
                onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white h-14 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <Navigation className="w-4 h-4" /> NAVIGATE IN MAPS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};