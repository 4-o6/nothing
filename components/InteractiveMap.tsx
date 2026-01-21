import React, { useState, useEffect, useRef } from 'react';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, X, Navigation, List, Map as MapIcon, ChevronRight, Sparkles, Plus, Minus, Crosshair, Loader2 } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(HIDDEN_GEMS[0].id);
  const [showList, setShowList] = useState(false);
  const [zoom, setZoom] = useState(15);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const mapIframeRef = useRef<HTMLIFrameElement>(null);

  const selectedPlace = HIDDEN_GEMS.find(p => p.id === selectedPlaceId);

  // Focus the map on selected place
  const [mapCenter, setMapCenter] = useState({ 
    lat: HIDDEN_GEMS[0].lat || 12.3051, 
    lng: HIDDEN_GEMS[0].lng || 76.6551 
  });

  const handlePlaceClick = (id: string) => {
    setIsMapLoading(true);
    setSelectedPlaceId(id);
    const place = HIDDEN_GEMS.find(p => p.id === id);
    if (place && place.lat && place.lng) {
        setMapCenter({ lat: place.lat, lng: place.lng });
    }
    // Auto-close sidebar on mobile after selection to show map
    setShowList(false);
  };

  const handleRecenter = () => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      setIsMapLoading(true);
      setMapCenter({ lat: selectedPlace.lat, lng: selectedPlace.lng });
    }
  };

  const handleZoom = (delta: number) => {
    setIsMapLoading(true);
    setZoom(prev => Math.min(Math.max(prev + delta, 12), 19));
  };

  // Construct OSM embed string with marker and dynamic zoom-based bbox
  const getMapSrc = () => {
    // Standard OSM delta for zoom 15 is ~0.008
    const baseDelta = 0.008;
    const factor = Math.pow(2, 15 - zoom);
    const delta = baseDelta * factor;
    
    const minLon = mapCenter.lng - delta;
    const minLat = mapCenter.lat - delta;
    const maxLon = mapCenter.lng + delta;
    const maxLat = mapCenter.lat + delta;
    
    const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`;
  };

  return (
    <div className="h-[100dvh] bg-[#0c0c0c] flex flex-col lg:flex-row overflow-hidden relative pt-[64px] lg:pt-[80px]">
      
      {/* Sidebar - Heritage Directory */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-[#0c0c0c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col border-r border-white/5 shadow-2xl
        ${showList ? 'w-full sm:w-[400px] translate-x-0' : 'w-full sm:w-[400px] -translate-x-full lg:translate-x-0 lg:w-[320px] xl:w-[400px]'}
      `}>
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[#141414]/80 backdrop-blur-xl border-b border-white/5 flex flex-col gap-4 pt-12 lg:pt-8">
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
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${selectedPlaceId === place.id ? 'translate-x-1 text-white' : 'text-stone-800'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Content Area */}
      <div className="flex-1 relative bg-[#0c0c0c] overflow-hidden lg:ml-0">
        
        {/* Toggle Sidebar Button (FAB) - Visible only when list is hidden on mobile */}
        <button 
          onClick={() => setShowList(true)}
          className={`absolute top-6 left-6 z-40 bg-stone-900/90 backdrop-blur-xl text-white px-5 sm:px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest border border-white/10 active:scale-95 transition-all group lg:hidden ${showList ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
        >
          <List className="w-4 h-4 text-amber-500" /> 
          <span>Directory</span>
        </button>

        {/* Map Viewport Wrapper */}
        <div className="w-full h-full relative group">
            {/* Loading Overlay for smooth-feeling transitions */}
            {isMapLoading && (
              <div className="absolute inset-0 z-10 bg-[#0c0c0c] flex items-center justify-center animate-fade-in">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
                  <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Pivoting Atlas...</span>
                </div>
              </div>
            )}

            <iframe 
                ref={mapIframeRef}
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src={getMapSrc()} 
                onLoad={() => setIsMapLoading(false)}
                className={`w-full h-full contrast-[1.1] grayscale-[0.2] transition-opacity duration-700 ${isMapLoading ? 'opacity-0' : 'opacity-80'}`}
                title="Mysore Heritage Navigation"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-40"></div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-6 top-6 flex flex-col gap-3 z-40">
          <button 
            onClick={() => handleZoom(1)}
            className="w-12 h-12 bg-stone-900/90 backdrop-blur-xl text-white rounded-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-amber-600 transition-all active:scale-90"
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleZoom(-1)}
            className="w-12 h-12 bg-stone-900/90 backdrop-blur-xl text-white rounded-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-amber-600 transition-all active:scale-90"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button 
            onClick={handleRecenter}
            className="w-12 h-12 bg-stone-900/90 backdrop-blur-xl text-white rounded-xl border border-white/10 shadow-2xl flex items-center justify-center hover:bg-amber-600 transition-all active:scale-90"
            title="Center on Selected"
          >
            <Crosshair className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Detail Sheet */}
        {selectedPlace && !showList && (
           <div className="absolute bottom-6 sm:bottom-10 left-4 right-4 sm:left-6 sm:right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-xl z-40 animate-app-reveal pb-[env(safe-area-inset-bottom)]">
              <div className="bg-stone-900/95 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-row items-center gap-4 sm:gap-6">
                 
                 <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-[1.2rem] sm:rounded-[1.5rem] overflow-hidden flex-shrink-0 border border-white/10 relative shadow-xl">
                   <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 sm:px-3 sm:py-1 bg-amber-600/10 rounded-full mb-1">
                       <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                       <span className="text-[8px] sm:text-[9px] font-black text-amber-500 uppercase tracking-widest">{selectedPlace.category}</span>
                    </div>
                    <h3 className="text-base sm:text-2xl font-serif font-black text-white truncate leading-tight mb-1">{selectedPlace.name}</h3>
                    <div className="flex items-center gap-2 text-stone-500 text-[9px] sm:text-[10px] uppercase font-black tracking-widest truncate">
                       <MapPin className="w-3 h-3 text-amber-600" /> {selectedPlace.location}
                    </div>
                 </div>

                 <button 
                   onClick={() => window.open(selectedPlace.googleMapsUri, '_blank')}
                   className="w-14 h-14 sm:w-20 sm:h-20 bg-amber-600 hover:bg-amber-500 text-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all shadow-xl shadow-amber-900/30 active:scale-90 flex items-center justify-center flex-shrink-0"
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