
import React, { useState, useEffect } from 'react';
import { BOOKING_ITEMS, BUS_SCHEDULE } from '../constants';
import { Car, Bus, Calendar, MapPin, Clock, Search, User, Map, ArrowRight, X, Star, CheckCircle, ShieldCheck, Info, UserCircle, Navigation, Phone, RotateCcw } from 'lucide-react';
import { BookingItem } from '../types';

const AutoRickshawIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="6" cy="17" r="3" />
    <circle cx="18" cy="17" r="3" />
    <path d="M2 17V8a2 2 0 0 1 2-2h10l4 5v6" />
    <path d="M4 11h10" />
    <path d="M16 11l2 3" />
  </svg>
);

interface ActiveBooking {
  driverName: string;
  vehicleModel: string;
  plateNumber: string;
  rating: number;
  eta: number;
  type: 'Cab' | 'Auto';
}

export const Bookings: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'transport' | 'stays'>('transport');
  const [transportType, setTransportType] = useState<'cabs' | 'auto' | 'bus'>('cabs');
  const [isSearching, setIsSearching] = useState(false);
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<BookingItem | null>(null);

  const hotels = BOOKING_ITEMS.filter(item => item.type === 'hotel');

  const handleStartSearch = (type: 'Cab' | 'Auto') => {
    setIsSearching(true);
    setActiveBooking(null);
    
    // Simulate searching logic
    setTimeout(() => {
      setIsSearching(false);
      const mockDriver: ActiveBooking = {
        driverName: type === 'Auto' ? 'Nagaraj K.' : 'Arjun Singh',
        vehicleModel: type === 'Auto' ? 'Bajaj RE Green' : 'Maruti Suzuki Dzire',
        plateNumber: `KA 09 ${type === 'Auto' ? 'A' : 'M'} ${Math.floor(1000 + Math.random() * 9000)}`,
        rating: 4.8,
        eta: Math.floor(2 + Math.random() * 6),
        type: type
      };
      setActiveBooking(mockDriver);
    }, 2500);
  };

  const cancelBooking = () => {
    setActiveBooking(null);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#111111] py-8 text-stone-200 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>

      {/* Top Toggle Switch */}
      <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-center relative z-10">
        <div className="bg-stone-900/50 p-1.5 rounded-full border border-stone-800 flex backdrop-blur-sm">
          <button
            onClick={() => setActiveMode('transport')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeMode === 'transport' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            Transport
          </button>
          <button
            onClick={() => setActiveMode('stays')}
            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeMode === 'stays' ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            Stays
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TRANSPORT SECTION */}
        {activeMode === 'transport' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-4">Travel Smarter</h2>
              <p className="text-stone-400 text-lg">Authentic local transport at your fingertips.</p>
            </div>

            {/* Booking Container */}
            <div className="bg-[#1c1c1c] rounded-[2rem] border border-stone-800 overflow-hidden shadow-2xl">
              {/* Transport Tabs */}
              <div className="flex bg-stone-900/50 p-2 border-b border-stone-800">
                <button
                  onClick={() => { cancelBooking(); setTransportType('cabs'); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    transportType === 'cabs' ? 'bg-stone-800 text-white shadow-inner' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <Car className="w-4 h-4" /> Cabs
                </button>
                <button
                  onClick={() => { cancelBooking(); setTransportType('auto'); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    transportType === 'auto' ? 'bg-stone-800 text-white shadow-inner' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <AutoRickshawIcon className="w-4 h-4" /> Auto
                </button>
                <button
                  onClick={() => { cancelBooking(); setTransportType('bus'); }}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    transportType === 'bus' ? 'bg-stone-800 text-white shadow-inner' : 'text-stone-500 hover:text-stone-300'
                  }`}
                >
                  <Bus className="w-4 h-4" /> City Bus
                </button>
              </div>

              {/* Dynamic Panel */}
              <div className="p-8 md:p-12">
                
                {/* 1. Idle State */}
                {!isSearching && !activeBooking && (transportType === 'cabs' || transportType === 'auto') && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Pickup Point</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                          <input type="text" placeholder="Current Location" className="w-full bg-[#111] border border-stone-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-amber-500 outline-none transition-all" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Where to?</label>
                        <div className="relative">
                          <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                          <input type="text" placeholder="Destination" className="w-full bg-[#111] border border-stone-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-amber-500 outline-none transition-all" />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleStartSearch(transportType === 'cabs' ? 'Cab' : 'Auto')}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-2xl font-black text-lg tracking-wide shadow-xl shadow-amber-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    >
                      Book {transportType === 'cabs' ? 'Cab' : 'Auto Rickshaw'} <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* 2. Searching State */}
                {isSearching && (
                  <div className="py-12 flex flex-col items-center justify-center animate-fade-in text-center">
                    <div className="relative w-24 h-24 mb-8">
                       <div className="absolute inset-0 border-4 border-amber-600/20 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
                       <div className="absolute inset-4 bg-stone-800 rounded-full flex items-center justify-center">
                          {transportType === 'cabs' ? <Car className="w-6 h-6 text-amber-500" /> : <AutoRickshawIcon className="w-6 h-6 text-amber-500" />}
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Finding nearby drivers...</h3>
                    <p className="text-stone-500 mb-8 max-w-xs">Connecting you with authorized Mysuru local transport partners.</p>
                    <button onClick={cancelBooking} className="text-stone-500 hover:text-red-400 text-sm font-bold flex items-center gap-2 bg-stone-800/50 px-6 py-2 rounded-full transition-colors">
                       <X className="w-4 h-4" /> Cancel Search
                    </button>
                  </div>
                )}

                {/* 3. Assigned State */}
                {activeBooking && (
                  <div className="animate-slide-up">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Driver Assigned</span>
                       </div>
                       <div className="bg-stone-800 px-3 py-1 rounded-full text-xs text-stone-300 flex items-center gap-1.5 font-bold">
                          <Clock className="w-3 h-3" /> Arriving in {activeBooking.eta} mins
                       </div>
                    </div>

                    <div className="bg-stone-900/50 border border-stone-800 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center gap-8">
                       <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center text-stone-600">
                             <UserCircle className="w-10 h-10" />
                          </div>
                          <div>
                             <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                {activeBooking.driverName} 
                                <span className="text-xs bg-amber-600/20 text-amber-500 px-2 py-0.5 rounded flex items-center">
                                   <Star className="w-3 h-3 fill-current mr-1" /> {activeBooking.rating}
                                </span>
                             </h4>
                             <p className="text-stone-500 text-sm">{activeBooking.vehicleModel}</p>
                          </div>
                       </div>
                       <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-stone-800 pt-6 md:pt-0 md:pl-8 flex-shrink-0">
                          <p className="text-xs text-stone-600 font-bold uppercase tracking-tighter mb-1">Plate Number</p>
                          <div className="bg-white text-stone-900 px-4 py-1.5 rounded-lg font-mono font-black text-lg border-2 border-stone-300">
                             {activeBooking.plateNumber}
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <button onClick={() => alert("Calling driver...")} className="bg-stone-800 hover:bg-stone-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                          <Phone className="w-4 h-4" /> Call Driver
                       </button>
                       <button onClick={cancelBooking} className="border border-red-900/50 text-red-500 hover:bg-red-900/10 py-4 rounded-2xl font-bold transition-all">
                          Cancel Trip
                       </button>
                    </div>
                  </div>
                )}

                {/* 4. Bus Schedule Panel */}
                {transportType === 'bus' && (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                         <h3 className="text-2xl font-bold text-white mb-1">KSRTC City Schedule</h3>
                         <p className="text-stone-500 text-sm">Reliable public transport for Mysore exploration.</p>
                      </div>
                      <button 
                        onClick={() => window.open('https://ksrtc.in/oprs-web/aboutus/map.do', '_blank')}
                        className="bg-amber-600/10 hover:bg-amber-600/20 text-amber-500 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
                      >
                        <Map className="w-3.5 h-3.5" /> View Official Map
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                       {BUS_SCHEDULE.map((bus, idx) => (
                         <div key={idx} className="bg-stone-900/30 border border-stone-800/50 p-5 rounded-2xl flex items-center justify-between group hover:border-amber-900/30 transition-all">
                            <div className="flex items-center gap-5">
                               <div className="w-12 h-12 bg-amber-600/10 rounded-xl flex items-center justify-center text-amber-600 font-black text-lg">
                                  {bus.routeNo}
                               </div>
                               <div>
                                  <h4 className="font-bold text-stone-200">{bus.destination}</h4>
                                  <p className="text-xs text-stone-500 font-medium">Starts from {bus.stand}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-xs font-bold text-stone-400 mb-1">{bus.frequency}</div>
                               <div className="text-[10px] text-stone-600 uppercase tracking-widest">{bus.timings}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* STAYS SECTION (PRESERVED) */}
        {activeMode === 'stays' && (
          <div className="animate-fade-in">
             <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-4 text-center">Stay Authentic</h2>
              <p className="text-stone-400 text-lg">Curated heritage properties and luxury stays in the heart of Mysore.</p>
            </div>

            <div className="bg-[#1c1c1c] rounded-[2rem] border border-stone-800 p-8 md:p-12 shadow-2xl mb-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                <div className="space-y-3">
                  <label className="text-xs text-stone-500 font-bold uppercase tracking-widest">Dates</label>
                  <input type="date" className="w-full bg-[#111] border border-stone-800 rounded-2xl p-4 text-white focus:border-amber-500 outline-none" />
                </div>
                <div className="space-y-3">
                   <label className="text-xs text-stone-500 font-bold uppercase tracking-widest">Guests</label>
                   <select className="w-full bg-[#111] border border-stone-800 rounded-2xl p-4 text-white focus:border-amber-500 outline-none appearance-none">
                      <option>2 Adults</option>
                      <option>1 Adult</option>
                      <option>Family</option>
                   </select>
                </div>
                <div className="flex items-end">
                   <button 
                    onClick={() => { setIsSearching(true); setTimeout(() => { setIsSearching(false); alert("Found 12 available properties!"); }, 1000); }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-900/20"
                   >
                     <Search className="w-4 h-4" /> Search Properties
                   </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-[#1c1c1c] border border-stone-800 rounded-3xl overflow-hidden group hover:border-amber-700/50 transition-all">
                  <div className="h-56 overflow-hidden relative">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs text-amber-400 font-bold flex items-center">
                      <Star className="w-3.5 h-3.5 mr-1.5 fill-current" /> {hotel.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-2 font-serif">{hotel.name}</h4>
                    <p className="text-stone-500 text-sm mb-6 line-clamp-2 leading-relaxed">{hotel.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-stone-800">
                      <span className="text-amber-500 font-black text-lg">{hotel.price}</span>
                      <button 
                        onClick={() => setSelectedHotel(hotel)}
                        className="text-sm text-stone-300 hover:text-white border border-stone-700 px-6 py-2 rounded-xl hover:bg-stone-800 transition-colors font-bold"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hotel Detail Modal (Preserved) */}
      {selectedHotel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedHotel(null)}
        >
          <div 
            className="bg-[#1c1c1c] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-stone-800 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedHotel(null)} className="absolute top-6 right-6 z-10 p-2 bg-stone-900/80 hover:bg-stone-800 text-stone-400 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="h-72 relative">
               <img src={selectedHotel.imageUrl} className="w-full h-full object-cover" alt={selectedHotel.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] to-transparent"></div>
               <div className="absolute bottom-8 left-8">
                  <h4 className="text-4xl font-serif font-bold text-white mb-3">{selectedHotel.name}</h4>
                  <div className="flex gap-2">
                    {selectedHotel.features.map(f => (
                      <span key={f} className="text-[10px] bg-amber-600/20 text-amber-500 border border-amber-900/50 px-3 py-1 rounded-full font-black uppercase tracking-widest">{f}</span>
                    ))}
                  </div>
               </div>
            </div>
            <div className="p-10">
               <p className="text-stone-400 leading-relaxed mb-8 text-lg">{selectedHotel.description}</p>
               <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-[2rem] mb-10 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-black tracking-widest mb-1">Nightly Rate</p>
                    <p className="text-3xl font-black text-amber-500">{selectedHotel.price}</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-bold bg-green-900/10 px-4 py-2 rounded-2xl border border-green-900/30">
                    <ShieldCheck className="w-5 h-5" /> Secured Heritage Stay
                  </div>
               </div>
               <button 
                onClick={() => { alert("Redirecting to secure gateway..."); setSelectedHotel(null); }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-amber-900/20 active:scale-[0.98]"
               >
                 Confirm Booking
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
