import React, { useState } from 'react';
import { BOOKING_ITEMS, BUS_SCHEDULE } from '../constants';
import { Car, Bus, Calendar, MapPin, Clock, Search, User, Map, ArrowRight } from 'lucide-react';

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

  // Filter hotels for the "Stays" section display
  const hotels = BOOKING_ITEMS.filter(item => item.type === 'hotel');

  return (
    <div className="min-h-screen bg-[#111111] py-8 text-stone-200">
      
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
                
                {/* CABS & AUTO FORM */}
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
                        <input type="text" placeholder="e.g., Mysore Palace" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-stone-300"><MapPin className="w-4 h-4" /> Drop-off Location</label>
                        <input type="text" placeholder="e.g., Chamundi Hills" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white placeholder-stone-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-stone-300"><Calendar className="w-4 h-4" /> Date</label>
                        <input type="date" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-stone-300"><Clock className="w-4 h-4" /> Time</label>
                        <input type="time" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
                      </div>
                    </div>

                    <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-900/20">
                      <Search className="w-5 h-5" /> 
                      {transportType === 'cabs' ? 'Find a Cab' : 'Find an Auto'}
                    </button>
                  </>
                )}

                {/* BUS SCHEDULE TABLE */}
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
                      <button className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1">
                        <Map className="w-3 h-3" /> View Route Map
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-stone-700 text-stone-400 text-xs uppercase tracking-wider">
                            <th className="py-3 px-2">Route No</th>
                            <th className="py-3 px-2">Origin Stand</th>
                            <th className="py-3 px-2">Destination</th>
                            <th className="py-3 px-2">Timings / Frequency</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {BUS_SCHEDULE.map((bus, idx) => (
                            <tr key={idx} className="border-b border-stone-800 hover:bg-white/5 transition-colors">
                              <td className="py-4 px-2 font-bold text-amber-500">{bus.routeNo}</td>
                              <td className="py-4 px-2 text-stone-300">{bus.stand}</td>
                              <td className="py-4 px-2 text-white flex items-center gap-2">
                                <ArrowRight className="w-3 h-3 text-stone-600" /> {bus.destination}
                              </td>
                              <td className="py-4 px-2 text-stone-400">
                                <div>{bus.timings}</div>
                                <div className="text-xs text-stone-600">{bus.frequency}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 p-4 bg-amber-900/20 border border-amber-900/50 rounded-lg flex items-start gap-3">
                       <div className="p-1 bg-amber-600 rounded-full text-white mt-0.5"><Bus className="w-3 h-3" /></div>
                       <div>
                         <p className="text-amber-200 text-sm font-bold">KSRTC Support</p>
                         <p className="text-stone-400 text-xs">For live tracking and pass info, visit the KSRTC Mysuru counter at CBS.</p>
                       </div>
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
              <p className="text-stone-400">From luxury resorts to charming heritage hotels, discover the best accommodation in Mysuru.</p>
            </div>

            <div className="bg-[#1c1c1c] rounded-xl border border-stone-800 p-8 shadow-2xl mb-16 max-w-5xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-6">Search for Hotels</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-1 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-wider"><MapPin className="w-3 h-3" /> Destination</label>
                  <input type="text" defaultValue="Mysuru, India" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none" />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-wider"><Calendar className="w-3 h-3" /> Check-in</label>
                  <input type="date" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-stone-400 focus:border-amber-500 focus:outline-none" />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-wider"><Calendar className="w-3 h-3" /> Check-out</label>
                  <input type="date" className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-stone-400 focus:border-amber-500 focus:outline-none" />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="flex items-center gap-2 text-xs text-stone-400 uppercase tracking-wider"><User className="w-3 h-3" /> Guests</label>
                  <select className="w-full bg-[#111] border border-stone-700 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none">
                    <option>2 Guests</option>
                    <option>1 Guest</option>
                    <option>Family (3-4)</option>
                  </select>
                </div>
              </div>
              <button className="w-full md:w-auto px-8 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                <Search className="w-4 h-4" /> Search Hotels
              </button>
            </div>

            {/* Featured Hotels List (Optional but looks nice below search) */}
            <div className="text-center mb-8">
               <h3 className="text-2xl font-serif font-bold text-amber-500">Featured Hotels</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-[#1c1c1c] border border-stone-800 rounded-xl overflow-hidden group hover:border-amber-700/50 transition-all">
                  <div className="h-48 overflow-hidden relative">
                    <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs text-amber-400 font-bold flex items-center">
                      <Search className="w-3 h-3 mr-1" /> {hotel.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-white mb-1">{hotel.name}</h4>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">{hotel.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-500 font-bold">{hotel.price}</span>
                      <button className="text-sm text-stone-300 hover:text-white border border-stone-700 px-3 py-1 rounded hover:bg-stone-800 transition-colors">
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
    </div>
  );
};