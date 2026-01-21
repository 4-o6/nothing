
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
    }, 3000);
  };

  const cancelBooking = () => {
    setActiveBooking(null);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] py-32 text-stone-200 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"></div>

      {/* Top Toggle Switch */}
      <div className="max-w-7xl mx-auto px-4 mb-16 flex justify-center relative z-10 animate-fade-in-up">
        <div className="bg-stone-900/50 p-2 rounded-full border border-stone-800 flex backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setActiveMode('transport')}
            className={`px-10 py-3 rounded-full text-sm font-black transition-all duration-500 ${
              activeMode === 'transport' ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/40' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            TRANSPORT
          </button>
          <button
            onClick={() => setActiveMode('stays')}
            className={`px-10 py-3 rounded-full text-sm font-black transition-all duration-500 ${
              activeMode === 'stays' ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/40' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            STAYS
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TRANSPORT SECTION */}
        {activeMode === 'transport' && (
          <div className="animate-fade-in-up max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">Seamless Travel</h2>
              <p className="text-stone-400 text-xl font-light">Navigating Mysuru with local expertise and transparency.</p>
            </div>

            <div className="bg-[#141414] rounded-[3rem] border border-stone-800/50 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-sm">
              <div className="flex bg-stone-900/30 p-3 border-b border-stone-800/50">
                {[
                  { id: 'cabs', icon: <Car className="w-5 h-5" />, label: 'Private Cab' },
                  { id: 'auto', icon: <AutoRickshawIcon className="w-5 h-5" />, label: 'Auto Rickshaw' },
                  { id: 'bus', icon: <Bus className="w-5 h-5" />, label: 'City Bus' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { cancelBooking(); setTransportType(tab.id as any); }}
                    className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                      transportType === tab.id ? 'bg-stone-800 text-amber-500 shadow-xl' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-10 md:p-16">
                {!isSearching && !activeBooking && (transportType === 'cabs' || transportType === 'auto') && (
                  <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="space-y-4">
                        <label className="text-xs font-black text-stone-500 uppercase tracking-[0.2em] ml-2">Pickup Point</label>
                        <div className="relative group">
                          <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 group-focus-within:scale-110 transition-transform" />
                          <input type="text" placeholder="Enter Pickup Location" className="w-full bg-[#0c0c0c] border border-stone-800 rounded-3xl py-5 pl-14 pr-6 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-stone-700" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-xs font-black text-stone-500 uppercase tracking-[0.2em] ml-2">Destination</label>
                        <div className="relative group">
                          <Navigation className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                          <input type="text" placeholder="Where are you going?" className="w-full bg-[#0c0c0c] border border-stone-800 rounded-3xl py-5 pl-14 pr-6 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-stone-700" />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleStartSearch(transportType === 'cabs' ? 'Cab' : 'Auto')}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white py-6 rounded-3xl font-black text-xl tracking-wider shadow-2xl shadow-amber-900/30 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group"
                    >
                      REQUEST {transportType === 'cabs' ? 'CAB' : 'AUTO'} <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                )}

                {isSearching && (
                  <div className="py-20 flex flex-col items-center justify-center animate-fade-in text-center">
                    <div className="relative w-40 h-40 mb-12">
                       <div className="absolute inset-0 border-2 border-amber-500/10 rounded-full"></div>
                       <div className="absolute inset-0 border-2 border-amber-500/20 rounded-full animate-radar"></div>
                       <div className="absolute inset-0 border-2 border-amber-500/30 rounded-full animate-radar" style={{ animationDelay: '0.5s' }}></div>
                       <div className="absolute inset-0 border-2 border-amber-500/40 rounded-full animate-radar" style={{ animationDelay: '1s' }}></div>
                       
                       <div className="absolute inset-0 border-4 border-t-amber-500 rounded-full animate-spin"></div>
                       <div className="absolute inset-8 bg-stone-900 rounded-full flex items-center justify-center shadow-2xl">
                          {transportType === 'cabs' ? <Car className="w-10 h-10 text-amber-500" /> : <AutoRickshawIcon className="w-10 h-10 text-amber-500" />}
                       </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Scanning for nearby partners...</h3>
                    <p className="text-stone-500 mb-10 text-lg font-light max-w-sm">Connecting you with authorized local drivers who know every hidden alley of Mysuru.</p>
                    <button onClick={cancelBooking} className="text-stone-500 hover:text-red-400 text-sm font-black uppercase tracking-widest flex items-center gap-2 bg-white/5 px-8 py-3 rounded-full hover:bg-white/10 transition-all">
                       <X className="w-4 h-4" /> Cancel Request
                    </button>
                  </div>
                )}

                {activeBooking && (
                  <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-10">
                       <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                          <span className="text-green-500 font-black uppercase text-sm tracking-[0.2em]">Driver Confirmed</span>
                       </div>
                       <div className="bg-amber-600/10 px-5 py-2 rounded-2xl text-amber-500 flex items-center gap-2 font-black text-sm border border-amber-600/20">
                          <Clock className="w-4 h-4" /> Arriving in {activeBooking.eta} MINS
                       </div>
                    </div>

                    <div className="bg-stone-900/40 border border-stone-800 rounded-[2.5rem] p-10 mb-10 flex flex-col md:flex-row items-center gap-10 backdrop-blur-xl">
                       <div className="flex items-center gap-6 flex-1">
                          <div className="w-24 h-24 bg-[#111] rounded-[2rem] flex items-center justify-center text-stone-700 shadow-inner border border-stone-800">
                             <UserCircle className="w-14 h-14" />
                          </div>
                          <div>
                             <h4 className="text-2xl font-black text-white flex items-center gap-3 mb-2">
                                {activeBooking.driverName} 
                                <span className="text-xs bg-amber-500 text-white px-3 py-1 rounded-lg flex items-center shadow-lg shadow-amber-900/20">
                                   <Star className="w-3 h-3 fill-current mr-1.5" /> {activeBooking.rating}
                                </span>
                             </h4>
                             <p className="text-stone-500 text-lg font-medium">{activeBooking.vehicleModel}</p>
                          </div>
                       </div>
                       <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-stone-800/50 pt-10 md:pt-0 md:pl-10 flex-shrink-0 w-full md:w-auto">
                          <p className="text-xs text-stone-600 font-black uppercase tracking-[0.2em] mb-3">Vehicle Number</p>
                          <div className="bg-white text-stone-900 px-6 py-3 rounded-2xl font-mono font-black text-2xl border-b-4 border-stone-300 shadow-2xl">
                             {activeBooking.plateNumber}
                          </div>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <button onClick={() => alert("Connecting secure line to driver...")} className="bg-white hover:bg-stone-100 text-[#0c0c0c] py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95">
                          <Phone className="w-5 h-5" /> Call Driver
                       </button>
                       <button onClick={cancelBooking} className="border border-red-900/30 text-red-500 hover:bg-red-500/5 py-5 rounded-[2rem] font-black text-lg transition-all active:scale-95">
                          Cancel Booking
                       </button>
                    </div>
                  </div>
                )}

                {transportType === 'bus' && (
                  <div className="animate-fade-in-up">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                      <div>
                         <h3 className="text-3xl font-serif font-bold text-white mb-2">City Bus Schedules</h3>
                         <p className="text-stone-500 text-lg font-light">The economical and eco-friendly way to see the city.</p>
                      </div>
                      <button 
                        onClick={() => window.open('https://ksrtc.in/oprs-web/aboutus/map.do', '_blank')}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-2xl text-sm font-black flex items-center gap-3 transition-all shadow-xl shadow-amber-900/20"
                      >
                        <Map className="w-4 h-4" /> OFFICIAL MAP
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                       {BUS_SCHEDULE.map((bus, idx) => (
                         <div key={idx} className="bg-stone-900/20 border border-stone-800/40 p-6 rounded-[2rem] flex items-center justify-between group hover:border-amber-500/40 hover:bg-stone-900/40 transition-all duration-500 card-lift">
                            <div className="flex items-center gap-6">
                               <div className="w-16 h-16 bg-amber-600/10 rounded-2xl flex items-center justify-center text-amber-500 font-black text-xl shadow-inner border border-amber-600/10">
                                  {bus.routeNo}
                               </div>
                               <div>
                                  <h4 className="text-xl font-bold text-stone-100 mb-1 group-hover:text-amber-500 transition-colors">{bus.destination}</h4>
                                  <p className="text-sm text-stone-500 font-medium">From: <span className="text-stone-400">{bus.stand}</span></p>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-sm font-black text-amber-600 mb-1">{bus.frequency}</div>
                               <div className="text-xs text-stone-600 font-black uppercase tracking-widest">{bus.timings}</div>
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
        
        {/* Stays view */}
        {activeMode === 'stays' && (
          <div className="animate-fade-in-up">
             <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-amber-500 mb-6">Royal Comfort</h2>
              <p className="text-stone-400 text-xl font-light">Curated stays that preserve Mysuru's architectural heritage.</p>
            </div>

            <div className="bg-[#141414] rounded-[3rem] border border-stone-800 p-10 md:p-12 shadow-2xl mb-20 max-w-5xl mx-auto backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-black text-stone-600 uppercase tracking-widest ml-2">Check In/Out</label>
                  <input type="date" className="w-full bg-[#0c0c0c] border border-stone-800 rounded-2xl p-5 text-white focus:border-amber-500/50 outline-none" />
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-black text-stone-600 uppercase tracking-widest ml-2">Occupants</label>
                   <select className="w-full bg-[#0c0c0c] border border-stone-800 rounded-2xl p-5 text-white focus:border-amber-500/50 outline-none appearance-none">
                      <option>2 Adults, 0 Kids</option>
                      <option>1 Adult</option>
                      <option>Group / Family</option>
                   </select>
                </div>
                <div className="flex items-end">
                   <button 
                    onClick={() => alert("Found heritage properties!")}
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
                   >
                     <Search className="w-5 h-5" /> SEARCH STAYS
                   </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-[#141414] border border-stone-800/50 rounded-[2.5rem] overflow-hidden group hover:border-amber-500/30 transition-all duration-700 card-lift">
                  <div className="h-64 overflow-hidden relative">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-amber-400 font-black flex items-center shadow-2xl">
                      <Star className="w-4 h-4 mr-2 fill-current" /> {hotel.rating}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-serif font-bold text-white mb-3">{hotel.name}</h4>
                    <p className="text-stone-500 text-base mb-8 line-clamp-2 leading-relaxed font-light">{hotel.description}</p>
                    <div className="flex justify-between items-center pt-6 border-t border-stone-800/50">
                      <span className="text-amber-500 font-black text-2xl">{hotel.price}</span>
                      <button 
                        onClick={() => setSelectedHotel(hotel)}
                        className="text-sm text-stone-300 hover:text-white border border-stone-800 px-8 py-2.5 rounded-2xl hover:bg-stone-800 transition-all font-black uppercase tracking-widest shadow-xl"
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
    </div>
  );
};
