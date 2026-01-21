import React, { useState } from 'react';
import { ARTISANS } from '../constants';
import { MapPin, UserCheck, Navigation, Phone, MessageSquare, X, Info, Sparkles } from 'lucide-react';
import { Artisan } from '../types';

export const Artisans: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Artisan | null>(null);

  return (
    <div className="min-h-screen bg-[#0c0c0c] py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-500/20">
            <Sparkles className="w-3 h-3" /> DIRECT IMPACT
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">Guardians of Heritage</h2>
          <p className="text-stone-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            By visiting these masters directly, you ensure that 100% of your contribution stays within the local artisan ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTISANS.map((artisan, i) => (
            <div 
              key={artisan.id} 
              className="group bg-[#141414] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl flex flex-col card-lift"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="h-72 w-full overflow-hidden relative">
                <img 
                  src={artisan.imageUrl} 
                  alt={artisan.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-8 right-8 text-white">
                  <span className="bg-amber-600 text-[9px] font-black px-3 py-1 rounded-full text-white uppercase tracking-[0.2em] mb-3 inline-block shadow-lg">{artisan.craft}</span>
                  <h3 className="text-3xl font-serif font-bold leading-tight">{artisan.name}</h3>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <p className="text-stone-400 mb-8 text-base leading-relaxed font-light italic border-l-2 border-amber-900/30 pl-6 flex-1">
                  {artisan.story}
                </p>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center text-xs font-black text-stone-500 uppercase tracking-widest">
                    <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                    {artisan.location}
                  </div>
                  {artisan.visitable && (
                    <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-tighter">
                      OPEN STUDIO
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => window.open(artisan.googleMapsUri, '_blank')}
                    className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white py-4 rounded-2xl font-black text-sm transition-all active:scale-95"
                  >
                    <Navigation className="w-4 h-4" /> NAVIGATE
                  </button>
                  <button 
                    onClick={() => setSelectedContact(artisan)}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-stone-300 py-4 rounded-2xl font-black text-sm border border-white/5 transition-all active:scale-95"
                  >
                    <Phone className="w-4 h-4" /> CONTACT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Section Polished */}
        <div className="mt-32 bg-[#141414] rounded-[4rem] p-16 md:p-24 text-white text-center relative overflow-hidden border border-white/5 shadow-inner">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px] -mr-64 -mt-64"></div>
          
          <div className="relative z-10 animate-fade-in-up">
            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-12">Our Sustainable Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: "Direct-to-Artisan Payment", value: "100%", desc: "We take zero commissions from our local masters." },
                { label: "Palace Zone Congestion reduction", value: "40%", desc: "Distributing tourism footfall across outer hubs." },
                { label: "Households Supported", value: "500+", desc: "Independently verified local craft families." }
              ].map((stat, i) => (
                <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
                  <div className="text-6xl font-black text-amber-500 mb-4">{stat.value}</div>
                  <div className="text-white text-lg font-bold mb-2">{stat.label}</div>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal Polished */}
      {selectedContact && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedContact(null)}
        >
          <div 
            className="bg-[#1c1c1c] w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl relative border border-white/5 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedContact(null)} className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 text-stone-400 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-10 text-center">
              <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-amber-500/20">
                <Phone className="w-10 h-10 text-amber-500" />
              </div>
              <h4 className="text-3xl font-serif font-bold text-white mb-2">{selectedContact.name}</h4>
              <p className="text-amber-600 text-xs font-black uppercase tracking-widest mb-8">{selectedContact.craft} Master</p>
              
              <div className="bg-stone-900 rounded-3xl p-6 mb-8 border border-white/5 shadow-inner">
                <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2">Verified Direct Line</p>
                <p className="text-2xl font-mono font-black text-white">{selectedContact.contactPhone}</p>
              </div>

              <div className="space-y-4">
                <a 
                  href={`tel:${selectedContact.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-900/20"
                >
                  <Phone className="w-5 h-5" /> CALL NOW
                </a>
                <a 
                  href={`https://wa.me/${selectedContact.contactPhone.replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 border border-white/5 transition-all"
                >
                  <MessageSquare className="w-5 h-5 text-green-500" /> WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};