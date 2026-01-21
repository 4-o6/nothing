
import React, { useState } from 'react';
import { generateSustainableItinerary } from '../services/geminiService';
import { Itinerary } from '../types';
import { Loader2, Calendar, Users, Heart, CheckCircle, Leaf, ThermometerSun, Shield, Info } from 'lucide-react';

interface ItineraryPlannerProps {
  theme: 'dark' | 'light';
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ theme }) => {
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
    <div className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#0c0c0c]' : 'bg-stone-50'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className={`text-4xl font-serif font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>Smart Sustainable Planner</h2>
          <p className={`text-lg font-light ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>
            Get a personalized plan that avoids peak crowds and supports the local economy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Controls */}
          <div className={`p-6 rounded-3xl shadow-xl border transition-all ${theme === 'dark' ? 'bg-[#141414] border-stone-800' : 'bg-white border-stone-200'} md:col-span-1`}>
            <div className="space-y-6">
              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>
                  <Calendar className="w-4 h-4" /> Duration (Days)
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="text-right text-xs font-bold text-amber-500 mt-2">{days} Days</div>
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>
                  <Users className="w-4 h-4" /> Who's traveling?
                </label>
                <select 
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className={`w-full p-3 rounded-xl text-sm font-bold border transition-all outline-none appearance-none ${theme === 'dark' ? 'bg-[#0c0c0c] border-stone-800 text-white' : 'bg-stone-50 border-stone-200 text-stone-900'}`}
                >
                  <option>Solo Traveler</option>
                  <option>Couple</option>
                  <option>Family with Kids</option>
                  <option>Group of Friends</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2 ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>
                  <Heart className="w-4 h-4" /> Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        interests.includes(opt) 
                          ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-900/20' 
                          : theme === 'dark' ? 'bg-[#0c0c0c] text-stone-500 border-stone-800 hover:border-amber-500/50' : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-amber-500'
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
                className="w-full py-4 bg-amber-600 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 disabled:bg-stone-800 transition-all flex justify-center items-center gap-2 shadow-xl shadow-amber-900/30"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create My Plan'}
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="md:col-span-2">
            {!itinerary && !loading && (
              <div className={`h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-8 transition-all ${theme === 'dark' ? 'border-stone-800 bg-[#111]/30 text-stone-600' : 'border-stone-200 bg-stone-50 text-stone-400'}`}>
                <Leaf className="w-12 h-12 mb-4 opacity-10" />
                <p className="text-center font-light">Select preferences to generate a responsible travel plan.</p>
              </div>
            )}

            {loading && (
              <div className={`h-full min-h-[400px] flex flex-col items-center justify-center ${theme === 'dark' ? 'text-stone-500' : 'text-stone-600'}`}>
                <Loader2 className="w-8 h-8 animate-spin text-amber-600 mb-4" />
                <p className="animate-pulse font-serif italic text-xl">Consulting local experts AI...</p>
              </div>
            )}

            {itinerary && (
              <div className="space-y-6 animate-fade-in">
                <div className={`p-8 rounded-3xl shadow-xl border ${theme === 'dark' ? 'bg-[#141414] border-stone-800' : 'bg-white border-stone-200'}`}>
                  <h3 className={`text-2xl font-bold font-serif mb-3 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{itinerary.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 bg-green-500/10 px-4 py-1.5 rounded-full w-fit border border-green-500/20">
                    <CheckCircle className="w-3 h-3" />
                    Optimized for Sustainable Impact
                  </div>
                </div>

                <div className="space-y-4">
                  {itinerary.items.map((item, index) => (
                    <div key={index} className={`p-6 rounded-2xl border flex gap-6 group transition-all card-lift ${theme === 'dark' ? 'bg-[#141414] border-stone-800' : 'bg-white border-stone-100'}`}>
                      <div className="flex-shrink-0 w-16 pt-1 text-right">
                         <span className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-stone-600' : 'text-stone-400'}`}>{item.time}</span>
                      </div>
                      <div className={`flex-grow border-l-2 pl-6 relative ${theme === 'dark' ? 'border-stone-800' : 'border-stone-100'}`}>
                        {item.isSustainable && (
                          <div className="absolute -left-[9px] top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#141414] flex items-center justify-center shadow-lg">
                            <Leaf className="w-2 h-2 text-white" />
                          </div>
                        )}
                        <h4 className={`text-lg font-bold mb-1 transition-colors group-hover:text-amber-500 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{item.activity}</h4>
                        <div className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-3">{item.location}</div>
                        <p className={`text-sm leading-relaxed font-light ${theme === 'dark' ? 'text-stone-400' : 'text-stone-600'}`}>{item.notes}</p>
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
