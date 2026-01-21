import React, { useState } from 'react';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, X, Navigation, List, Map as MapIcon, ChevronRight, Sparkles } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(HIDDEN_GEMS[0].id);
  const [showList, setShowList] = useState(true);

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
    <div className="h-screen bg-[#0c0c0c] flex flex-col md:flex-row overflow-hidden pt-16 md:pt-20">
      
      {/* Sidebar with App-style list */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 bg-[#0c0c0c] transition-transform duration-300 ease-out flex flex-col border-r border-white/5 shadow-2xl
        ${showList ? 'w-full md:w-[380px] translate-x-0' : 'w-full md:w-[380px] -translate-x-full md:hidden'}
      `}>
        <div className="p-6 bg-[#141414] border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white">
                <MapIcon className="w-5 h-5" />
              </div>
              <h2 className="font-serif font-bold text-xl text-white">Heritage Map</h2>
            </div>
            <button onClick={() => setShowList(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-stone-500" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-600/10 rounded-full w-fit">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Mysuru Gems</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-2 pb-24 md:pb-8">
          {HIDDEN_GEMS.map((place) => (
            <button
              key={place.id}
              onClick={() => handlePlaceClick(place.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all flex items-center gap-4 ${
                selectedPlaceId === place.id 
                  ? 'bg-amber-600 shadow-lg shadow-amber-900/20' 
                  : 'bg-[#141414] hover:bg-white/5 border border-white/5'
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm truncate ${selectedPlaceId === place.id ? 'text-white' : 'text-stone-200'}`}>
                  {place.name}
                </h3>
                <p className={`text-[10px] font-medium truncate ${selectedPlaceId === place.id ? 'text-white/70' : 'text-stone-500'}`}>
                  {place.location}
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 ${selectedPlaceId === place.id ? 'text-white' : 'text-stone-700'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Map Area - CLEAN LIGHT MODE */}
      <div className="flex-1 relative bg-white overflow-hidden">
        
        {/* Toggle List Button (Hidden when list open on mobile) */}
        {!showList && (
           <button 
             onClick={() => setShowList(true)}
             className="absolute top-6 left-6 z-40 bg-[#141414] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest animate-app-reveal border border-white/10"
           >
             <List className="w-5 h-5" /> Places
           </button>
        )}

        <div className="w-full h-full relative">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng-0.015},${mapCenter.lat-0.015},${mapCenter.lng+0.015},${mapCenter.lat+0.015}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`} 
                className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[0.98]"
                title="Mysore Map"
            ></iframe>
        </div>

        {/* Floating Detail Card - Mobile Bottom Bar Style */}
        {selectedPlace && (
           <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:max-w-xl z-40 animate-app-reveal">
              <div className="bg-[#141414] border border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                   <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white tracking-tight truncate">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[10px] uppercase font-bold tracking-widest mt-1">
                       <MapPin className="w-3 h-3 text-amber-500" /> {selectedPlace.location}
                    </div>
                 </div>

                 <button 
                   onClick={() => window.open(selectedPlace.googleMapsUri, '_blank')}
                   className="bg-amber-600 hover:bg-amber-500 text-white p-4 rounded-2xl transition-transform active:scale-90"
                 >
                   <Navigation className="w-5 h-5" />
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};