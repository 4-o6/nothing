import React, { useState } from 'react';
import { Place } from '../types';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, Star, Search, Loader2, ExternalLink, X, Navigation } from 'lucide-react';
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
      // Simulate generic location for Mysore center
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
    <div className="min-h-screen bg-stone-50 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Uncover Hidden Gems</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Escape the queues. Find the places that define the soul of Mysore, from centuries-old wrestling pits (Garadi Mane) to silent silk weaving lofts.
          </p>
        </div>

        {/* AI Search Bar */}
        <div className="max-w-3xl mx-auto mb-16 relative">
          <form onSubmit={handleSearch} className="relative z-10">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI: 'Find traditional wooden toy workshops' or 'Best dosa places locals eat at'..."
                className="block w-full pl-11 pr-4 py-4 bg-white border border-stone-200 rounded-xl leading-5 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm transition-shadow"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute inset-y-1.5 right-1.5 bg-stone-900 text-white px-6 rounded-lg text-sm font-medium hover:bg-stone-800 disabled:bg-stone-300 transition-colors"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Discover'}
              </button>
            </div>
          </form>
        </div>

        {/* AI Results Section */}
        {aiResults && (
          <div className="mb-16 bg-white rounded-2xl p-8 shadow-sm border border-stone-100 animate-fade-in">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
              AI Recommendations
            </h3>
            <div className="prose prose-stone max-w-none mb-6">
              <p className="whitespace-pre-line text-stone-700">{aiResults.text}</p>
            </div>
            
            {/* Grounding Sources / Links */}
            {aiResults.chunks && aiResults.chunks.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {aiResults.chunks.map((chunk, idx) => {
                  const mapData = chunk.web || chunk.maps; // Usually maps for location queries
                  if (!mapData) return null;
                  return (
                    <a 
                      key={idx}
                      href={mapData.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-stone-200 hover:border-amber-500 hover:bg-amber-50 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-amber-100 text-stone-500 group-hover:text-amber-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-stone-900 truncate">{mapData.title}</p>
                        <p className="text-xs text-stone-500 flex items-center gap-1">
                          View on Maps <ExternalLink className="w-3 h-3" />
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Curated Static List */}
        <h3 className="text-2xl font-serif font-bold text-stone-900 mb-8">Curated Experiences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HIDDEN_GEMS.map((place) => (
            <div 
              key={place.id} 
              onClick={() => setSelectedGem(place)}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-stone-800 shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" /> {place.rating}
                </div>
                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm
                  ${place.crowdLevel === 'low' ? 'bg-green-600' : place.crowdLevel === 'moderate' ? 'bg-yellow-600' : 'bg-red-600'}
                `}>
                  {place.crowdLevel === 'low' ? 'Peaceful' : place.crowdLevel === 'moderate' ? 'Moderate' : 'Busy'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xs font-bold tracking-wider text-amber-600 uppercase mb-2">{place.category}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">{place.name}</h3>
                <p className="text-stone-600 text-sm mb-4 line-clamp-3">{place.description}</p>
                
                <div className="flex items-center text-stone-400 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {place.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedGem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedGem(null)}
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedGem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="h-64 sm:h-72 relative flex-shrink-0">
               <img src={selectedGem.imageUrl} alt={selectedGem.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
               <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="bg-amber-500 text-xs font-bold px-2.5 py-1 rounded text-white uppercase tracking-wider">{selectedGem.category}</span>
                     <div className="flex items-center text-amber-300 text-sm font-bold bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" /> {selectedGem.rating}
                     </div>
                  </div>
                  <h3 className="text-3xl font-serif font-bold leading-tight">{selectedGem.name}</h3>
               </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
               <div className="flex flex-wrap gap-3 mb-6 text-sm">
                  <div className="flex items-center text-stone-700 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
                     <MapPin className="w-4 h-4 mr-1.5 text-amber-600" /> {selectedGem.location}
                  </div>
                  <div className={`px-3 py-1.5 rounded-full font-medium border ${
                      selectedGem.crowdLevel === 'low' ? 'bg-green-50 text-green-700 border-green-200' : 
                      selectedGem.crowdLevel === 'moderate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>
                     Crowd Level: {selectedGem.crowdLevel === 'low' ? 'Low (Peaceful)' : selectedGem.crowdLevel === 'moderate' ? 'Moderate' : 'High (Busy)'}
                  </div>
               </div>

               <div className="mb-8">
                 <h4 className="font-bold text-stone-900 mb-2 text-lg">Overview</h4>
                 <p className="text-stone-600 leading-relaxed text-base">{selectedGem.description}</p>
                 <p className="text-stone-600 leading-relaxed text-base mt-2">
                    Visiting this location supports local preservation efforts and helps decentralize tourism in Mysore.
                 </p>
               </div>
               
               <div className="flex gap-4 mt-auto">
                  <button 
                      onClick={() => window.open(selectedGem.googleMapsUri, '_blank')}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-900/20 active:scale-[0.98]"
                  >
                      <Navigation className="w-5 h-5" /> Get Directions
                  </button>
                  <button 
                      onClick={() => setSelectedGem(null)}
                      className="flex-1 border border-stone-200 hover:bg-stone-50 text-stone-700 py-3.5 rounded-xl font-semibold transition-colors active:scale-[0.98]"
                  >
                      Close
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};