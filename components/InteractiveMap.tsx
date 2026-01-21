import React, { useState } from 'react';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, X, Navigation, List, Map as MapIcon, ChevronRight, Sparkles } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(HIDDEN_GEMS[0].id);
  const [showList, setShowList] = useState(true);

  const selectedPlace = HIDDEN_GEMS.find(p => p.id === selectedPlaceId);

  // Focus the map on selected place
  const [mapCenter, setMapCenter] = useState({ 
    lat: HIDDEN_GEMS[0].lat || 12.3051, 
    lng: HIDDEN_GEMS[0].lng || 76.6551 
  });

  const handlePlaceClick = (id: string) => {
    setSelectedPlaceId(id);
    const place = HIDDEN_GEMS.find(p => p.id === id);
    if (place && place.lat && place.lng) {
        setMapCenter({ lat: place.lat, lng: place.lng });
    }
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 1024) setShowList(false);
  };

  // Construct OSM embed string with marker
  const getMapSrc = () => {
    const zoom = 0.005; // Tight zoom for city exploration
    const bbox = `${mapCenter.lng - zoom},${mapCenter.lat - zoom},${mapCenter.lng + zoom},${mapCenter.lat + zoom}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`;
  };

  return (
    <div className="h-screen bg-[#0c0c0c] flex flex-col lg:flex-row overflow-hidden pt-[64px] lg:pt-[80px]">
      
      {/* Sidebar - Desktop Priority */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 bg-[#0c0c0c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col border-r border-white/5 shadow-2xl
        ${showList ? 'w-full sm:w-[400px] translate-x-0' : 'w-full sm:w-[400px] -translate-x-full lg:hidden lg:w-0'}
      `}>
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#141414]/80 backdrop-blur-xl border-b border-white/5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <MapIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-black text-xl text-white tracking-tight">Heritage Atlas</h2>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest -mt-1">Mysuru's Secret Spots</p>
              </div>
            </div>
            <button onClick={() => setShowList(false)} className="lg:hidden p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
              <X className="w-5 h-5 text-stone-500" />
            </button>
          </div>
        </div>
        
        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 space-y-3 pb-32">
          {HIDDEN_GEMS.map((place) => (
            <button
              key={place.id}
              onClick={() => handlePlaceClick(place.id)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 group ${
                selectedPlaceId === place.id 
                  ? 'bg-amber-600 text-white shadow-2xl shadow-amber-900/30 ring-1 ring-amber-400/30' 
                  : 'bg-[#141414] hover:bg-white/5 border border-white/5'
              }`}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[8px] font-black uppercase tracking-widest mb-1 ${selectedPlaceId === place.id ? 'text-white/60' : 'text-amber-600'}`}>
                    {place.category}
                </div>
                <h3 className={`font-bold text-sm truncate leading-none ${selectedPlaceId === place.id ? 'text-white' : 'text-stone-200'}`}>
                  {place.name}
                </h3>
                <p className={`text-[10px] truncate mt-1.5 ${selectedPlaceId === place.id ? 'text-white/70' : 'text-stone-500'}`}>
                  {place.location}
                </p>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${selectedPlaceId === place.id ? 'translate-x-1 text-white' : 'text-stone-800'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Content Area */}
      <div className="flex-1 relative bg-[#0c0c0c] overflow-hidden">
        
        {/* Toggle Sidebar Button (FAB) */}
        {!showList && (
           <button 
             onClick={() => setShowList(true)}
             className="absolute top-6 left-6 z-40 bg-stone-900/90 backdrop-blur-xl text-white px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 font-black text-[10px] uppercase tracking-widest animate-app-reveal border border-white/10 active:scale-95 transition-all group"
           >
             <List className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" /> 
             <span>Explore Directory</span>
           </button>
        )}

        {/* Map Viewport Wrapper */}
        <div className="w-full h-full relative">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src={getMapSrc()} 
                className="w-full h-full opacity-80 contrast-[1.1] grayscale-[0.2]"
                title="Mysore Heritage Navigation"
            ></iframe>
            {/* Soft Ambient Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-40"></div>
        </div>

        {/* Floating Detail Sheet (Mobile-proper & Desktop-refined) */}
        {selectedPlace && (
           <div className="absolute bottom-6 sm:bottom-10 left-6 right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-xl z-40 animate-app-reveal">
              <div className="bg-stone-900/95 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                 
                 <div className="w-full sm:w-24 sm:h-24 h-40 rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-white/10 relative shadow-xl">
                   <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="w-full h-full object-cover" />
                   <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-[8px] font-black text-amber-500">
                     {selectedPlace.rating} ★
                   </div>
                 </div>
                 
                 <div className="flex-1 min-w-0 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600/10 rounded-full mb-2">
                       <Sparkles className="w-3 h-3 text-amber-500" />
                       <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">{selectedPlace.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-black text-white truncate leading-none mb-2">{selectedPlace.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-stone-500 text-[10px] uppercase font-black tracking-widest">
                       <MapPin className="w-4 h-4 text-amber-600" /> {selectedPlace.location}
                    </div>
                 </div>

                 <button 
                   onClick={() => window.open(selectedPlace.googleMapsUri, '_blank')}
                   className="w-full sm:w-20 sm:h-20 bg-amber-600 hover:bg-amber-500 text-white p-5 sm:p-6 rounded-3xl transition-all shadow-xl shadow-amber-900/30 active:scale-90 flex items-center justify-center gap-3 sm:flex-col"
                 >
                   <Navigation className="w-6 h-6" />
                   <span className="sm:hidden font-black text-[10px] uppercase tracking-widest">Route</span>
                 </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};