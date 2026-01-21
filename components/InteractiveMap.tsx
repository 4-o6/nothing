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
    <div className="h-screen bg-[#0c0c0c] flex flex-col md:flex-row overflow-hidden pt-[80px] md:pt-[88px]">
      
      {/* Desktop Sidebar / Mobile Overlay */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 bg-[#0c0c0c] transition-all duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col border-r border-white/5
        ${showList ? 'w-full md:w-[360px] translate-x-0' : 'w-full md:w-0 -translate-x-full md:hidden'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 bg-[#141414]/50 backdrop-blur-xl border-b border-white/5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <MapIcon className="w-4.5 h-4.5" />
              </div>
              <h2 className="font-serif font-bold text-lg text-white">Heritage Map</h2>
            </div>
            <button onClick={() => setShowList(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-stone-500" />
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-600/10 rounded-lg w-fit">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Verified Hidden Gems</span>
          </div>
        </div>
        
        {/* Sidebar List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-2 pb-24 md:pb-6">
          {HIDDEN_GEMS.map((place) => (
            <button
              key={place.id}
              onClick={() => handlePlaceClick(place.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                selectedPlaceId === place.id 
                  ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/20' 
                  : 'bg-[#141414] hover:bg-white/5 border border-white/5'
              }`}
            >
              <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-xs truncate ${selectedPlaceId === place.id ? 'text-white' : 'text-stone-200'}`}>
                  {place.name}
                </h3>
                <p className={`text-[10px] truncate mt-0.5 ${selectedPlaceId === place.id ? 'text-white/70' : 'text-stone-500'}`}>
                  {place.location}
                </p>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${selectedPlaceId === place.id ? 'translate-x-1 text-white' : 'text-stone-800'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Map Content Area */}
      <div className="flex-1 relative bg-white overflow-hidden">
        
        {/* Toggle List FAB (Only when hidden) */}
        {!showList && (
           <button 
             onClick={() => setShowList(true)}
             className="absolute top-6 left-6 z-40 bg-stone-900 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest animate-app-reveal border border-white/10 active:scale-95 transition-transform"
           >
             <List className="w-4 h-4 text-amber-500" /> View Places
           </button>
        )}

        {/* Map Viewport */}
        <div className="w-full h-full relative">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng-0.012},${mapCenter.lat-0.012},${mapCenter.lng+0.012},${mapCenter.lat+0.012}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`} 
                className="w-full h-full opacity-90 contrast-[1.05]"
                title="Mysore Map"
            ></iframe>
            {/* Soft Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-amber-900/5"></div>
        </div>

        {/* Dynamic Detail Card */}
        {selectedPlace && (
           <div className="absolute bottom-6 md:bottom-8 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-md z-40 animate-app-reveal">
              <div className="bg-[#141414]/95 backdrop-blur-2xl border border-white/10 p-4 md:p-5 rounded-[2rem] shadow-2xl flex items-center gap-4">
                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                   <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="text-[8px] font-black text-amber-500 uppercase tracking-widest mb-1">{selectedPlace.category}</div>
                    <h3 className="text-base md:text-xl font-serif font-bold text-white truncate">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-1.5 text-stone-500 text-[9px] uppercase font-black tracking-widest mt-1">
                       <MapPin className="w-3 h-3 text-amber-600" /> {selectedPlace.location}
                    </div>
                 </div>

                 <button 
                   onClick={() => window.open(selectedPlace.googleMapsUri, '_blank')}
                   className="bg-amber-600 hover:bg-amber-500 text-white p-4 md:p-5 rounded-2xl transition-all shadow-lg active:scale-90"
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