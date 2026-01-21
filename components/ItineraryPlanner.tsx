import React, { useState } from 'react';
import { generateSustainableItinerary } from '../services/geminiService';
import { Itinerary } from '../types';
import { Loader2, Calendar, Users, Heart, CheckCircle, Leaf } from 'lucide-react';

export const ItineraryPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [days, setDays] = useState(2);
  const [groupType, setGroupType] = useState('Couple');
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = ['Heritage', 'Artisans', 'Food', 'Nature', 'Spirituality'];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    if (interests.length === 0) return alert("Please select at least one interest.");
    setLoading(true);
    setItinerary(null);
    try {
      const result = await generateSustainableItinerary(days, interests, groupType);
      setItinerary(result);
    } catch (e) {
      console.error(e);
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0c0c0c] text-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white tracking-tight">Smart Sustainable Planner</h2>
          <p className="text-lg font-light text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Get a personalized plan that avoids peak crowds and supports the local economy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Controls */}
          <div className="p-8 rounded-[2.5rem] shadow-2xl border bg-[#141414] border-stone-800/50 md:col-span-1">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-stone-500">
                  <Calendar className="w-4 h-4" /> Duration (Days)
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="text-right text-xs font-bold text-amber-500 mt-2">{days} Days</div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-stone-500">
                  <Users className="w-4 h-4" /> Who's traveling?
                </label>
                <select 
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="w-full p-4 rounded-xl text-sm font-bold border transition-all outline-none appearance-none bg-[#0c0c0c] border-stone-800 text-white focus:border-amber-500/50"
                >
                  <option>Solo Traveler</option>
                  <option>Couple</option>
                  <option>Family with Kids</option>
                  <option>Group of Friends</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-stone-500">
                  <Heart className="w-4 h-4" /> Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        interests.includes(opt) 
                          ? 'bg-amber-600 text-white border-amber-600 shadow-xl shadow-amber-900/20' 
                          : 'bg-[#0c0c0c] text-stone-500 border-stone-800 hover:border-amber-500/50 hover:text-stone-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-5 bg-amber-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 disabled:bg-stone-900 transition-all flex justify-center items-center gap-2 shadow-2xl shadow-amber-900/30 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create My Plan'}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="md:col-span-2">
            {!itinerary && !loading && (
              <div className="h-full min-h-[450px] flex flex-col items-center justify-center border-2 border-dashed rounded-[3rem] p-12 border-stone-800 bg-[#111]/30 text-stone-600">
                <Leaf className="w-16 h-16 mb-6 opacity-10" />
                <p className="text-center font-light text-lg">Select your preferences to generate a responsible travel plan.</p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-stone-500">
                <Loader2 className="w-10 h-10 animate-spin text-amber-600 mb-6" />
                <p className="animate-pulse font-serif italic text-2xl">Consulting heritage database...</p>
              </div>
            )}

            {itinerary && (
              <div className="space-y-8 animate-fade-in">
                <div className="p-10 rounded-[2.5rem] shadow-2xl border bg-[#141414] border-stone-800/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <h3 className="text-3xl font-bold font-serif mb-4 text-white tracking-tight">{itinerary.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-5 py-2 rounded-full w-fit border border-green-500/20">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Optimized for Sustainable Impact
                  </div>
                </div>

                <div className="space-y-6">
                  {itinerary.items.map((item, index) => (
                    <div key={index} className="p-8 rounded-[2rem] border flex gap-8 group transition-all card-lift bg-[#141414] border-stone-800/30">
                      <div className="flex-shrink-0 w-20 pt-1 text-right">
                         <span className="text-[11px] font-black uppercase tracking-widest text-stone-600">{item.time}</span>
                      </div>
                      <div className="flex-grow border-l-2 pl-8 relative border-stone-800/50">
                        {item.isSustainable && (
                          <div className="absolute -left-[10px] top-1.5 w-4.5 h-4.5 bg-green-500 rounded-full border-2 border-[#141414] flex items-center justify-center shadow-lg">
                            <Leaf className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                        <h4 className="text-xl font-bold mb-2 transition-colors group-hover:text-amber-500 text-white tracking-tight">{item.activity}</h4>
                        <div className="text-[10px] text-amber-600 font-black uppercase tracking-[0.2em] mb-4">{item.location}</div>
                        <p className="text-base leading-relaxed font-light text-stone-400">{item.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};