
import React, { useState } from 'react';
import { BOOKING_ITEMS, BUS_SCHEDULE } from '../constants';
import { Car, Bus, MapPin, Search, Map, Info, UserCircle, Navigation, Phone, Handshake, ShieldCheck, Sparkles, Clock, Star } from 'lucide-react';
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

export const Bookings: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'transport' | 'stays'>('transport');
  const [transportType, setTransportType] = useState<'cabs' | 'auto' | 'bus'>('cabs');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<BookingItem | null>(null);

  const hotels = BOOKING_ITEMS.filter(item => item.type === 'hotel');

  const handleBookingRequest = () => {
    setShowComingSoon(true);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-28 pb-20 text-stone-200 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none animate-pulse"></div>
      
      {/* Top Toggle Switch */}
      <div className="max-w-7xl mx-auto px-4 mb-16 flex justify-center relative z-10 animate-fade-in-up">
        <div className="bg-stone-900/50 p-1.5 rounded-full border border-stone-800 flex backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => { setActiveMode('transport'); setShowComingSoon(false); }}
            className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
              activeMode === 'transport' ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/40' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            TRANSPORT
          </button>
          <button
            onClick={() => { setActiveMode('stays'); setShowComingSoon(false); }}
            className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
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
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Seamless Travel</h2>
              <p className="text-stone-400 text-lg font-light leading-relaxed max-w-xl mx-auto">Navigating Mysuru with local expertise and ethical transparency.</p>
            </div>

            <div className="bg-[#141414] rounded-[2.5rem] border border-stone-800/50 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="flex bg-stone-900/30 p-2 border-b border-stone-800/50">
                {[
                  { id: 'cabs', icon: <Car className="w-4 h-4" />, label: 'Private Cab' },
                  { id: 'auto', icon: <AutoRickshawIcon className="w-4 h-4" />, label: 'Auto Rickshaw' },
                  { id: 'bus', icon: <Bus className="w-4 h-4" />, label: 'City Bus' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setTransportType(tab.id as any); setShowComingSoon(false); }}
                    className={`flex-1 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all ${
                      transportType === tab.id ? 'bg-stone-800 text-amber-500 shadow-xl' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-10 md:p-14">
                {showComingSoon ? (
                   <div className="text-center animate-fade-in">
                      <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-amber-500 border border-amber-500/20">
                         <Handshake className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-4">Live Collaboration in Progress</h3>
                      <p className="text-stone-400 text-base font-light leading-relaxed max-w-md mx-auto mb-10">
                        We are currently collaborating with local KSRTC and private driver unions to ensure fair pricing and heritage-trained guides. This real-time booking feature will be live soon.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-sm mx-auto">
                        <div className="bg-[#0c0c0c] p-4 rounded-2xl border border-stone-800 flex items-center gap-3">
                           <ShieldCheck className="w-5 h-5 text-green-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Union Verified</span>
                        </div>
                        <div className="bg-[#0c0c0c] p-4 rounded-2xl border border-stone-800 flex items-center gap-3">
                           <Sparkles className="w-5 h-5 text-amber-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Heritage Trained</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowComingSoon(false)}
                        className="mt-12 text-stone-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest underline decoration-amber-500 underline-offset-4"
                      >
                        Return to Navigation
                      </button>
                   </div>
                ) : (
                  <>
                    {(transportType === 'cabs' || transportType === 'auto') && (
                      <div className="animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-2">Pickup Point</label>
                            <div className="relative group">
                              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                              <input type="text" placeholder="Pickup Location" className="w-full bg-[#0c0c0c] border border-stone-800 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-stone-700" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-2">Destination</label>
                            <div className="relative group">
                              <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-700" />
                              <input type="text" placeholder="Where to?" className="w-full bg-[#0c0c0c] border border-stone-800 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-stone-700" />
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={handleBookingRequest}
                          className="w-full bg-amber-600 hover:bg-amber-500 text-white py-5 rounded-2xl font-black text-base tracking-widest shadow-xl shadow-amber-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                        >
                          INITIALIZE SECURE BOOKING
                        </button>
                      </div>
                    )}

                    {transportType === 'bus' && (
                      <div className="animate-fade-in-up">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                          <div>
                             <h3 className="text-2xl font-serif font-bold text-white mb-2">City Bus Schedules</h3>
                             <p className="text-stone-500 text-sm font-light">The economical and eco-friendly way to see the city.</p>
                          </div>
                          <button 
                            onClick={() => window.open('https://ksrtc.in/oprs-web/aboutus/map.do', '_blank')}
                            className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-[10px] font-black flex items-center gap-2 transition-all shadow-lg"
                          >
                            <Map className="w-4 h-4" /> OFFICIAL MAP
                          </button>
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-3 scrollbar-hide">
                           {BUS_SCHEDULE.map((bus, idx) => (
                             <div key={idx} className="bg-stone-900/20 border border-stone-800/40 p-5 rounded-2xl flex items-center justify-between group hover:border-amber-500/40 hover:bg-stone-900/40 transition-all duration-500">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-amber-600/10 rounded-xl flex items-center justify-center text-amber-500 font-black text-lg border border-amber-600/10">
                                      {bus.routeNo}
                                   </div>
                                   <div>
                                      <h4 className="text-base font-bold text-stone-100 mb-0.5">{bus.destination}</h4>
                                      <p className="text-[10px] text-stone-500 font-medium tracking-tight">From: {bus.stand}</p>
                                   </div>
                                </div>
                                <div className="text-right">
                                   <div className="text-[10px] font-black text-amber-600 mb-1">{bus.frequency}</div>
                                   <div className="text-[9px] text-stone-600 font-black uppercase tracking-widest">{bus.timings}</div>
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Stays view */}
        {activeMode === 'stays' && (
          <div className="animate-fade-in-up">
             <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Royal Stays</h2>
              <p className="text-stone-400 text-lg font-light max-w-xl mx-auto leading-relaxed">Curated properties that preserve architectural heritage.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-[#141414] border border-stone-800/50 rounded-3xl overflow-hidden group hover:border-amber-500/30 transition-all duration-700 card-lift">
                  <div className="h-56 overflow-hidden relative">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-amber-400 font-black flex items-center shadow-2xl">
                      <Star className="w-3.5 h-3.5 mr-1.5 fill-current" /> {hotel.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-serif font-bold text-white mb-2">{hotel.name}</h4>
                    <p className="text-stone-500 text-sm mb-6 line-clamp-2 leading-relaxed font-light">{hotel.description}</p>
                    <div className="flex justify-between items-center pt-5 border-t border-stone-800/50">
                      <span className="text-amber-500 font-black text-lg">{hotel.price}</span>
                      <button 
                        onClick={() => handleBookingRequest()}
                        className="text-[10px] text-stone-300 border border-stone-800 px-5 py-2 rounded-xl hover:bg-amber-600 hover:text-white transition-all font-black uppercase tracking-widest"
                      >
                        RESERVE
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
