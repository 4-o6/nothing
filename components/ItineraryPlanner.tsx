
import React, { useState } from 'react';
import { generateSustainableItinerary } from '../services/geminiService';
import { Itinerary } from '../types';
import { 
  Sparkles, Calendar, Users, Heart, Loader2, CheckCircle2, 
  ArrowRight, Leaf, ShieldCheck, MapPin, Clock, Info, RefreshCw,
  Palette, Utensils, TreePine, Landmark, Moon
} from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category?.toLowerCase()) {
    case 'artisan': return <Palette className="w-4 h-4" />;
    case 'food': return <Utensils className="w-4 h-4" />;
    case 'nature': return <TreePine className="w-4 h-4" />;
    case 'culture': return <Landmark className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export const ItineraryPlanner: React.FC = () => {
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState<string[]>([]);
  const [groupType, setGroupType] = useState('Solo Traveler');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    'Artisan Workshops', 
    'Hidden Lakes', 
    'Temple Heritage', 
    'Local Food', 
    'Silk Weaving', 
    'Nature Walks',
    'Yoga & Wellness',
    'Vintage Trails'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    if (interests.length === 0 || loading) return;
    setLoading(true);
    setItinerary(null);
    try {
      const result = await generateSustainableItinerary(days, interests, groupType);
      setItinerary(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (itinerary) {
    return (
      <div className="min-h-screen pt-28 pb-32 bg-[#0c0c0c] text-stone-200 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-app-reveal">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-widest mb-4">
                <Sparkles className="w-3 h-3" /> DECENTRALIZED ROUTE ACTIVE
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">{itinerary.title}</h2>
            </div>
            <button 
              onClick={() => setItinerary(null)}
              className="flex items-center gap-2 text-stone-500 hover:text-amber-500 transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              <RefreshCw className="w-4 h-4" /> Reset Planner
            </button>
          </div>

          <div className="space-y-12">
            {itinerary.items.map((item, idx) => (
              <div key={idx} className="group relative pl-8 sm:pl-16 pb-2 last:pb-0 animate-app-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-800/50 group-last:h-4"></div>
                <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-amber-600 ring-4 ring-amber-600/10 transition-transform group-hover:scale-125"></div>
                
                <div className="bg-[#141414] border border-white/5 p-6 sm:p-10 rounded-[2.5rem] transition-all hover:border-amber-600/20 card-lift relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-8 py-3 bg-white/5 rounded-bl-[2rem] border-b border-l border-white/5 text-[9px] font-black uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <CategoryIcon category={item.category || ''} /> {item.category || 'Discovery'}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4 sm:pt-0">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-amber-500 text-[10px] font-mono font-black mb-1">{item.time}</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{item.activity}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6 text-stone-500 text-[10px] font-black uppercase tracking-widest mb-6">
                    <div className="flex items-center gap-2 bg-stone-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" /> {item.location}
                    </div>
                    {item.duration && (
                      <div className="flex items-center gap-2 bg-stone-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> {item.duration}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-2xl">{item.notes}</p>

                  {item.isSustainable && (
                    <div className="bg-green-500/5 border border-green-500/10 p-5 rounded-2xl flex items-start gap-4">
                      <Leaf className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[9px] font-black text-green-500 uppercase tracking-[0.2em] mb-1">Sustainable Impact</div>
                        <p className="text-xs text-stone-500 leading-relaxed font-light">{item.impactReason || "This activity directly benefits local families and preserves Mysuru's tangible heritage."}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 animate-app-reveal">
             <div className="bg-stone-900/40 border border-white/5 p-10 rounded-[3rem]">
                <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-sm uppercase tracking-widest font-serif"><Info className="w-5 h-5 text-amber-600" /> Seasonal Protocol</h4>
                <ul className="space-y-4">
                  {itinerary.seasonalGuidelines?.map((tip, i) => (
                    <li key={i} className="text-xs text-stone-500 font-light flex items-start gap-3 leading-relaxed">
                      <div className="w-1 h-1 rounded-full bg-amber-600 mt-2 flex-shrink-0"></div> {tip}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="bg-stone-900/40 border border-white/5 p-10 rounded-[3rem]">
                <h4 className="text-white font-bold mb-6 flex items-center gap-3 text-sm uppercase tracking-widest font-serif"><ShieldCheck className="w-5 h-5 text-green-600" /> Heritage Safety</h4>
                <ul className="space-y-4">
                  {itinerary.safetyTips?.map((tip, i) => (
                    <li key={i} className="text-xs text-stone-500 font-light flex items-start gap-3 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" /> {tip}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-32 bg-[#0c0c0c] text-stone-200 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 animate-app-reveal">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">AI Route Planner</h2>
          <p className="text-stone-500 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Experience the "Living Museum". Our models use heritage grounding to find silent studios and family looms.
          </p>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-black/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mb-4">Journey Duration</label>
                <div className="flex flex-wrap items-center gap-3">
                  {[1, 2, 3, 5, 7].map(num => (
                    <button 
                      key={num}
                      onClick={() => setDays(num)}
                      className={`w-14 h-14 rounded-2xl font-black text-xs transition-all ${days === num ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/40' : 'bg-white/5 text-stone-500 hover:bg-white/10'}`}
                    >
                      {num}D
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mb-4">Traveler Profile</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Solo Traveler', 'Couple', 'Families', 'Art Enthusiasts', 'Photographers', 'Digital Nomads'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setGroupType(type)}
                      className={`py-4 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-left border ${groupType === type ? 'bg-amber-600/10 text-amber-500 border-amber-600/30' : 'bg-white/5 text-stone-500 border-transparent'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest block">Heritage Focus</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(interest => (
                  <button 
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${interests.includes(interest) ? 'bg-white text-black border-white shadow-xl' : 'bg-white/5 text-stone-600 border-white/5 hover:border-white/20'}`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || interests.length === 0}
            className="w-full h-16 md:h-20 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 disabled:text-stone-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/30 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Grounding Heritage Nodes...
              </>
            ) : (
              <>Generate Authentic Itinerary <ArrowRight className="w-5 h-5" /></>
            )}
          </button>
          
          {interests.length === 0 && !loading && (
             <p className="text-center mt-6 text-[10px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">Select at least one heritage focus</p>
          )}
        </div>
      </div>
    </div>
  );
};
