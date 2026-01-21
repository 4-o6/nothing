
import React, { useState } from 'react';
import { BOOKING_ITEMS, BUS_SCHEDULE } from '../constants';
import { Car, Bus, Calendar, MapPin, Clock, Search, User, Map, ArrowRight, X, Star, CheckCircle, ShieldCheck, Info } from 'lucide-react';
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
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<BookingItem | null>(null);

  const hotels = BOOKING_ITEMS.filter(item => item.type === 'hotel');

  const handleSearch = (type: string) => {
    setIsSearching(true);
    setSearchSuccess(null);
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(`Successfully found nearby ${type}s! A driver will contact you shortly.`);
      setTimeout(() => setSearchSuccess(null), 5000);
    }, 1500);
  };

  const handleHotelSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      alert("Found 12 available properties matching your criteria!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#111111] py-8 text-stone-200 relative">
      
      {/* Search Result Toast */}
      {searchSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-sm">{searchSuccess}</span>
        </div>
      )}

      {/* Top Toggle Switch */}
      <div className="max-w-7xl mx-auto px-4 mb-8 flex justify-center">
        <div className="bg-stone-900 p-1 rounded-full border border-stone-800 flex">
          <button
            onClick={() => setActiveMode('transport')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeMode === 'transport' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            Transport
          </button>
          <button
            onClick={() => setActiveMode('stays')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeMode === 'stays' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            Stays
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TRANSPORT SECTION */}
        {activeMode === 'transport' && (
          <div className="animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif font-bold text-amber-500 mb-4">Travel with Ease</h2>
              <p className="text-stone-400">Book cabs, autos, or check bus schedules for seamless travel in Mysuru.</p>
            </div>

            <div className="bg-[#1c1c1c] rounded-xl border border-stone-800 overflow-hidden shadow-2xl max-w-4xl mx-auto">
              {/* Transport Tabs */}
              <div className="flex border-b border-stone-800">
                <button
                  onClick={() => setTransportType('cabs')}
                  className={`flex-1 py-4 text-center font-medium flex items-center justify-center gap-2 transition-colors ${
                    transportType === 'cabs' ? 'bg-[#252525] text-white border-b-2 border-amber-500' : 'text-stone-500 hover:text-stone-300 hover:bg-[#202020]'
                  }`}
                >
                  <Car className="w-5 h-5" /> Cabs
                </button>
                <button
                  onClick={() => setTransportType('auto')}
                  className={`flex-1 py-4 text-center font-medium flex items-center justify-center gap-2 transition-colors ${
                    transportType === 'auto' ? 'bg-[#252525] text-white border-b-2 border-amber-500' : 'text-stone-500 hover:text-stone-300 hover:bg-[#202020]'
                  }`}
                >
                  <AutoRickshawIcon className="w-5 h-5" /> Auto Rickshaw
                </button>
                <button
                  onClick={() => setTransportType('bus')}
                  className={`flex-1 py-4 text-center font-medium flex items-center justify-center gap-2 transition-colors ${
                    transportType === 'bus' ? 'bg-[#252525] text-white border-b-2 border-amber-500' : 'text-stone-500 hover:text-stone-300 hover:bg-[#202020]'
                  }`}
                >
                  <Bus className="w-5 h-5" /> KSRTC Bus
                </button>
              </div>

              {/* Booking Form or Schedule */}
              <div className="p-8">
                
                {(transportType === 'cabs' || transportType === 'auto') && (
                  <>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {transportType === 'cabs' ? 'Book a Local Cab' : 'Book an Auto Rickshaw'}
                    </h3>
                    <p className="text-stone-500 text-sm mb-6">
                      {transportType === 'cabs' ? 'Instant booking for your city travel needs.' : 'Quick and affordable local travel.'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-stone-300"><MapPin className="w-4 h-4" /> Pickup Location</label>
                        <input type="text" placeholder="e.g., Mysore Palace" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-stone-300"><MapPin className="w-4 h-4" /> Drop-off Location</label>
                        <input type="text" placeholder="e.g., Chamundi Hills" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none" />
                      </div>
                    </div>

                    <button 
                      onClick={() => handleSearch(transportType === 'cabs' ? 'Cab' : 'Auto')}
                      disabled={isSearching}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isSearching ? <span className="animate-pulse">Searching Drivers...</span> : <><Search className="w-5 h-5" /> Find Transport</>}
                    </button>
                  </>
                )}

                {transportType === 'bus' && (
                  <>
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          KSRTC City Bus Timetable
                        </h3>
                        <p className="text-stone-500 text-sm">
                          Fixed routes and timings for popular destinations.
                        </p>
                      </div>
                      <button 
                        onClick={() => window.open('https://ksrtc.in/oprs-web/aboutus/map.do', '_blank')}
                        className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                      >
                        <Map className="w-3 h-3" /> View Official Map
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-stone-700 text-stone-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-2">Route</th>
                            <th className="py-3 px-2">Stand</th>
                            <th className="py-3 px-2">To</th>
                            <th className="py-3 px-2">Frequency</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {BUS_SCHEDULE.map((bus, idx) => (
                            <tr key={idx} className="border-b border-stone-800 hover:bg-white/5 transition-colors">
                              <td className="py-4 px-2 font-bold text-amber-500">{bus.routeNo}</td>
                              <td className="py-4 px-2 text-stone-300">{bus.stand}</td>
                              <td className="py-4 px-2 text-white">{bus.destination}</td>
                              <td className="py-4 px-2 text-stone-500 text-xs">{bus.frequency}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        )}

        {/* STAYS SECTION */}
        {activeMode === 'stays' && (
          <div className="animate-fade-in">
             <div className="text-center mb-10">
              <h2 className="text-4xl font-serif font-bold text-amber-500 mb-4">Find Your Perfect Stay</h2>
              <p className="text-stone-400">Curated heritage properties and luxury stays in the heart of Mysore.</p>
            </div>

            <div className="bg-[#1c1c1c] rounded-xl border border-stone-800 p-8 shadow-2xl mb-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-xs text-stone-400 uppercase tracking-wider">Dates</label>
                  <input type="date" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white focus:border-amber-500" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs text-stone-400 uppercase tracking-wider">Guests</label>
                   <select className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white">
                      <option>2 Adults</option>
                      <option>1 Adult</option>
                      <option>Family</option>
                   </select>
                </div>
                <div className="flex items-end">
                   <button 
                    onClick={handleHotelSearch}
                    disabled={isSearching}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all"
                   >
                     {isSearching ? <span className="animate-pulse">Searching...</span> : <><Search className="w-4 h-4" /> Search Properties</>}
                   </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-[#1c1c1c] border border-stone-800 rounded-xl overflow-hidden group hover:border-amber-700/50 transition-all">
                  <div className="h-48 overflow-hidden relative">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs text-amber-400 font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" /> {hotel.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-1 font-serif">{hotel.name}</h4>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">{hotel.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-500 font-bold">{hotel.price}</span>
                      <button 
                        onClick={() => setSelectedHotel(hotel)}
                        className="text-sm text-stone-300 hover:text-white border border-stone-700 px-4 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hotel Detail Modal */}
      {selectedHotel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedHotel(null)}
        >
          <div 
            className="bg-[#1c1c1c] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative border border-stone-800 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedHotel(null)} className="absolute top-5 right-5 z-10 p-2 bg-stone-900/50 hover:bg-stone-800 text-stone-400 rounded-full">
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 relative">
               <img src={selectedHotel.imageUrl} className="w-full h-full object-cover" alt={selectedHotel.name} />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                  <h4 className="text-3xl font-serif font-bold text-white mb-2">{selectedHotel.name}</h4>
                  <div className="flex gap-2">
                    {selectedHotel.features.map(f => (
                      <span key={f} className="text-[10px] bg-amber-600/20 text-amber-500 border border-amber-900/50 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{f}</span>
                    ))}
                  </div>
               </div>
            </div>
            <div className="p-8">
               <p className="text-stone-400 leading-relaxed mb-8">{selectedHotel.description}</p>
               <div className="bg-stone-900/50 border border-stone-800 p-6 rounded-2xl mb-8 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold tracking-widest mb-1">Stay Price</p>
                    <p className="text-2xl font-bold text-amber-500">{selectedHotel.price}</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-500 text-sm font-bold bg-green-900/10 px-3 py-1.5 rounded-lg border border-green-900/30">
                    <ShieldCheck className="w-4 h-4" /> Best Price Guarantee
                  </div>
               </div>
               <button 
                onClick={() => {
                  alert("Redirecting to secure booking gateway...");
                  setSelectedHotel(null);
                }}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-bold transition-all shadow-xl shadow-amber-900/10"
               >
                 Book This Property
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
