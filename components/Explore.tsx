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
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Hidden Gems</h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Avoid the commercial traps. Find stories that define Mysuru's heartbeat, curated by AI and heritage data.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-20 animate-app-reveal">
          <form onSubmit={handleSearch} className="bg-white/5 p-2 rounded-3xl border border-white/10 flex items-center shadow-2xl">
            <Search className="w-6 h-6 text-stone-500 ml-4 hidden sm:block" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Where is real sandalwood?"
              className="flex-1 bg-transparent px-4 py-4 md:py-5 text-white outline-none placeholder-stone-600 text-sm md:text-base font-medium"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 md:py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>DISCOVER</span>
            </button>
          </form>
        </div>

        {aiResults && (
          <div className="mb-20 glass-card rounded-[2.5rem] p-8 md:p-12 animate-app-reveal">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">AI Heritage Discovery</h3>
            </div>
            <p className="text-stone-300 text-lg leading-relaxed mb-10 font-light italic">
              {aiResults.text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiResults.chunks?.map((chunk, idx) => {
                const data = chunk.web || chunk.maps;
                if (!data) return null;
                return (
                  <a key={idx} href={data.uri} target="_blank" className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4 hover:border-amber-500/50 transition-all">
                    <MapPin className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider truncate">{data.title}</span>
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
              className="group bg-[#141414] rounded-[2rem] overflow-hidden border border-white/5 cursor-pointer shadow-xl animate-app-reveal"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="h-60 overflow-hidden relative">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-black/70 px-3 py-1.5 rounded-full text-[10px] font-black text-amber-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" /> {place.rating}
                </div>
              </div>
              <div className="p-8">
                <div className="text-[9px] font-black tracking-widest text-amber-600 uppercase mb-3">{place.category}</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{place.name}</h3>
                <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">{place.description}</p>
                <div className="flex items-center text-stone-600 text-[10px] font-black uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-amber-600" /> {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedGem && (
        <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedGem(null)}>
          <div className="bg-[#141414] w-full max-w-2xl rounded-t-[3rem] md:rounded-[3rem] overflow-hidden border-t md:border border-white/10 animate-app-reveal" onClick={e => e.stopPropagation()}>
            <div className="h-64 relative">
              <img src={selectedGem.imageUrl} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedGem(null)} className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-600 text-[10px] font-black px-4 py-1.5 rounded-full text-white uppercase tracking-widest">{selectedGem.category}</div>
                <div className="bg-white/5 text-[10px] font-black px-4 py-1.5 rounded-full text-stone-400 uppercase tracking-widest">{selectedGem.crowdLevel} Crowd</div>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">{selectedGem.name}</h3>
              <p className="text-stone-400 text-lg font-light leading-relaxed mb-10">{selectedGem.description}</p>
              <button 
                onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white h-16 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
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