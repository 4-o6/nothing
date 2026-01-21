import React, { useState } from 'react';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, X, Navigation, List, Map as MapIcon, ChevronRight, Sparkles } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(HIDDEN_GEMS[0].id);
  const [showList, setShowList] = useState(true);

  // Default Mysore Coordinates (Center)
  const [mapCenter, setMapCenter] = useState({ 
    lat: HIDDEN_GEMS[0].lat || 12.3050, 
    lng: HIDDEN_GEMS[0].lng || 76.6550 
  });

  const selectedPlace = HIDDEN_GEMS.find(p => p.id === selectedPlaceId);

  const handlePlaceClick = (id: string) => {
    setSelectedPlaceId(id);
    const place = HIDDEN_GEMS.find(p => p.id === id);
    if (place && place.lat && place.lng) {
        setMapCenter({ lat: place.lat, lng: place.lng });
    }
    if (window.innerWidth < 768) setShowList(false);
  };

  return (
    <div className="h-screen bg-[#0c0c0c] flex flex-col md:flex-row overflow-hidden pt-16 md:pt-24">
      
      {/* Premium Dark Sidebar */}
      <div className={`
        absolute md:relative z-30 bg-[#0c0c0c] h-full transition-all duration-500 flex flex-col border-r border-white/5 shadow-2xl
        ${showList ? 'w-full md:w-[400px] translate-x-0' : 'w-0 -translate-x-full md:w-0'}
      `}>
        <div className="p-6 md:p-8 bg-[#141414]/50 backdrop-blur-xl border-b border-white/5">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-600/20">
                <MapIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-xl md:text-2xl text-white tracking-tight">Heritage Map</h2>
                <div className="flex items-center gap-1.5 text-[9px] font-black text-amber-600 uppercase tracking-widest mt-0.5">
                   <Sparkles className="w-2.5 h-2.5" /> Mysore District
                </div>
              </div>
            </div>
            <button onClick={() => setShowList(false)} className="md:hidden p-2.5 bg-white/5 rounded-xl text-stone-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Discover decentralized attractions away from the commercial crowds.
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3 pb-32 md:pb-8">
          {HIDDEN_GEMS.map((place) => (
            <button
              key={place.id}
              onClick={() => handlePlaceClick(place.id)}
              className={`w-full text-left p-4 rounded-[1.5rem] md:rounded-[2rem] border transition-all duration-500 flex items-start gap-4 group ${
                selectedPlaceId === place.id 
                  ? 'bg-amber-600/10 border-amber-600/30 shadow-xl shadow-amber-900/10' 
                  : 'bg-[#141414]/40 border-white/5 hover:border-amber-600/20 hover:bg-[#141414]'
              }`}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm md:text-base tracking-tight mb-1 transition-colors ${selectedPlaceId === place.id ? 'text-amber-500' : 'text-stone-200 group-hover:text-white'}`}>
                  {place.name}
                </h3>
                <p className="text-[10px] md:text-xs text-stone-500 font-light line-clamp-1 mb-2">
                  {place.location}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-[8px] md:text-[9px] font-black text-stone-600 uppercase tracking-widest group-hover:text-amber-600/70 transition-colors">
                    {place.category}
                  </div>
                  <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 ${selectedPlaceId === place.id ? 'translate-x-1 text-amber-500' : 'text-stone-800'}`} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-[#080808] overflow-hidden flex flex-col">
        
        {/* Toggle List Button */}
        {!showList && (
           <button 
             onClick={() => setShowList(true)}
             className="absolute top-6 left-6 z-40 bg-[#141414] border border-white/10 p-4 rounded-2xl shadow-2xl text-amber-500 animate-fade-in active:scale-95 transition-transform"
           >
             <List className="w-6 h-6" />
           </button>
        )}

        {/* Map Container with Dark Styling */}
        <div className="w-full h-full relative overflow-hidden">
            {/* Using a filter to make standard maps look dark/onyx */}
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng-0.02},${mapCenter.lat-0.02},${mapCenter.lng+0.02},${mapCenter.lat+0.02}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`} 
                style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2)' }}
                className="w-full h-full absolute inset-0"
                title="Mysore Map"
            ></iframe>
            
            {/* Vignette & Gradients to blend into Onyx UI */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]/40"></div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0c0c0c] to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0c0c0c] to-transparent pointer-events-none"></div>
        </div>

        {/* Selected Details Floating Glass Card */}
        {selectedPlace && (
           <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-xl z-40 animate-slide-up">
              <div className="bg-[#141414]/90 backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors"></div>
                 
                 <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-700">
                   <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] mb-1.5">{selectedPlace.category}</div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight mb-2 truncate">{selectedPlace.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-3 text-stone-500 text-[10px] uppercase font-black tracking-widest">
                       <MapPin className="w-3.5 h-3.5 text-amber-600" /> {selectedPlace.location}
                    </div>
                 </div>

                 <button 
                   onClick={() => window.open(selectedPlace.googleMapsUri, '_blank')}
                   className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-900/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                 >
                   <Navigation className="w-4 h-4" /> GO
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
