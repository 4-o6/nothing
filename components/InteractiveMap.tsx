import React, { useState } from 'react';
import { HIDDEN_GEMS } from '../constants';
import { MapPin, X, Navigation, List, Map as MapIcon } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  // Default Mysore Coordinates
  const [mapCenter, setMapCenter] = useState({ lat: 12.3050, lng: 76.6550 });

  const selectedPlace = HIDDEN_GEMS.find(p => p.id === selectedPlaceId);

  const handlePlaceClick = (id: string) => {
    setSelectedPlaceId(id);
    const place = HIDDEN_GEMS.find(p => p.id === id);
    if (place && place.lat && place.lng) {
        setMapCenter({ lat: place.lat, lng: place.lng });
    }
    if (window.innerWidth < 768) setShowList(false);
  };

  const handleNavigate = (uri?: string) => {
    if (uri) {
      window.open(uri, '_blank');
    } else {
      alert("Location details unavailable in demo mode.");
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-stone-100 flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar List */}
      <div className={`
        absolute md:relative z-20 bg-white shadow-xl h-full transition-all duration-300 flex flex-col border-r border-stone-200
        ${showList ? 'w-full md:w-80 translate-x-0' : 'w-0 -translate-x-full md:w-0'}
      `}>
        <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
          <div>
            <h2 className="font-serif font-bold text-lg">Mysuru Gems</h2>
            <p className="text-xs text-stone-400">Select a location to view on map</p>
          </div>
          <button onClick={() => setShowList(false)} className="md:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {HIDDEN_GEMS.map((place) => (
            <button
              key={place.id}
              onClick={() => handlePlaceClick(place.id)}
              className={`w-full text-left p-4 border-b border-stone-100 hover:bg-stone-50 transition-colors flex items-start gap-3 ${selectedPlaceId === place.id ? 'bg-amber-50 border-l-4 border-l-amber-500' : ''}`}
            >
              <div className="w-16 h-16 bg-stone-200 rounded-lg overflow-hidden flex-shrink-0">
                <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className={`font-bold text-sm ${selectedPlaceId === place.id ? 'text-amber-700' : 'text-stone-900'}`}>{place.name}</h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{place.description}</p>
                <div className="mt-2 flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded w-fit">
                  {place.category}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-stone-200 overflow-hidden flex flex-col">
        
        {/* Mobile List Toggle */}
        {!showList && (
           <button 
             onClick={() => setShowList(true)}
             className="absolute top-4 left-4 z-30 bg-white p-2 rounded-lg shadow-lg text-stone-700 md:hidden"
           >
             <List className="w-6 h-6" />
           </button>
        )}

        {/* Live OpenStreetMap Embed - dynamically updating via key/src */}
        <div className="w-full h-full">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                // We add a small bounding box calculation for the view or just center the marker
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng-0.03},${mapCenter.lat-0.03},${mapCenter.lng+0.03},${mapCenter.lat+0.03}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`} 
                style={{ border: 0 }}
                title="Mysore Map"
            ></iframe>
        </div>

        {/* Selected Details Overlay (Bottom) */}
        {selectedPlace && (
           <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-6 shadow-[-10px_0_20px_rgba(0,0,0,0.1)] z-20 flex flex-col md:flex-row items-center justify-between gap-6 animate-slide-up">
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="w-16 h-16 rounded-lg object-cover hidden md:block" />
                 <div>
                    <h3 className="text-xl font-serif font-bold text-stone-900">{selectedPlace.name}</h3>
                    <p className="text-stone-500 text-sm flex items-center">
                       <MapPin className="w-3 h-3 mr-1" /> {selectedPlace.location}
                    </p>
                 </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <button 
                   onClick={() => setSelectedPlaceId(null)}
                   className="flex-1 md:flex-none px-4 py-2 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-50"
                 >
                    Close
                 </button>
                 <button 
                    onClick={() => handleNavigate(selectedPlace.googleMapsUri)}
                    className="flex-1 md:flex-none px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2"
                 >
                    <Navigation className="w-4 h-4" /> Get Directions
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};