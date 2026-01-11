
import React, { useState } from 'react';
import { ARTISANS } from '../constants';
import { MapPin, UserCheck, Navigation, Phone, MessageSquare, X, Info } from 'lucide-react';
import { Artisan } from '../types';

export const Artisans: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Artisan | null>(null);

  const handleDirections = (uri: string) => {
    window.open(uri, '_blank');
  };

  const handleContactClick = (artisan: Artisan) => {
    setSelectedContact(artisan);
  };

  const closeContactModal = () => {
    setSelectedContact(null);
  };

  const sanitizePhone = (phone: string) => {
    return phone.replace(/[^0-9+]/g, '');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Guardians of Heritage</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Meet the master craftsmen of Mysore. Visiting them directly ensures 100% of your money supports their livelihood and keeps the art alive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTISANS.map((artisan) => (
            <div key={artisan.id} className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
              <div className="aspect-w-16 aspect-h-9 w-full h-64 overflow-hidden relative">
                <img 
                  src={artisan.imageUrl} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-widest">{artisan.craft}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold leading-tight">{artisan.name}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-stone-600 mb-6 text-sm leading-relaxed italic border-l-2 border-amber-200 pl-4 flex-1">
                  {artisan.story}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-xs font-medium text-stone-500">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    {artisan.location}
                  </div>
                  {artisan.visitable && (
                    <span className="flex items-center text-[10px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 uppercase tracking-tighter">
                      <UserCheck className="w-3 h-3 mr-1" /> Open for Visits
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button 
                    onClick={() => handleDirections(artisan.googleMapsUri)}
                    className="flex items-center justify-center gap-2 bg-amber-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-900/10 active:scale-95"
                  >
                    <Navigation className="w-4 h-4" /> Directions
                  </button>
                  <button 
                    onClick={() => handleContactClick(artisan)}
                    className="flex items-center justify-center gap-2 border border-stone-200 text-stone-700 py-3 rounded-xl text-sm font-bold hover:bg-stone-50 transition-colors active:scale-95"
                  >
                    <Phone className="w-4 h-4" /> Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="mt-24 bg-stone-900 rounded-[2.5rem] p-10 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-10">Direct Impact Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-5xl font-bold text-amber-500 mb-3">100%</div>
                <p className="text-stone-300 text-sm font-medium">Direct payment to artisans. Zero intermediary commission.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <div className="text-5xl font-bold text-amber-500 mb-3">40%</div>
                 <p className="text-stone-300 text-sm font-medium">Reduction in traffic congestion near the Palace Heritage Zone.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <div className="text-5xl font-bold text-amber-500 mb-3">500+</div>
                 <p className="text-stone-300 text-sm font-medium">Independent craft households directly supported by this platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {selectedContact && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm animate-fade-in"
          onClick={closeContactModal}
        >
          <div 
            className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={closeContactModal}
              className="absolute top-5 right-5 p-2 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-amber-600" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-stone-900 mb-1">Contact Artisan</h4>
              <p className="text-stone-500 text-sm mb-6">{selectedContact.name} • {selectedContact.craft}</p>
              
              <div className="bg-stone-50 p-4 rounded-2xl mb-8 border border-stone-100">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Direct Line</p>
                <p className="text-xl font-mono font-bold text-stone-900">{selectedContact.contactPhone}</p>
              </div>

              <div className="space-y-3">
                <a 
                  href={`tel:${sanitizePhone(selectedContact.contactPhone)}`}
                  className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/10"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </a>
                <a 
                  href={`https://wa.me/${sanitizePhone(selectedContact.contactPhone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-stone-200 text-stone-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-all"
                >
                  <MessageSquare className="w-5 h-5 text-green-600" /> WhatsApp Message
                </a>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest bg-stone-50 py-2 rounded-full">
                <Info className="w-3 h-3" /> Artisan supports direct UPI payments
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
