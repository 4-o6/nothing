import React, { useState } from 'react';
import { generateSustainableItinerary } from '../services/geminiService';
import { Itinerary } from '../types';
import { Loader2, Calendar, Users, Heart, CheckCircle, Leaf, ThermometerSun, Shield, Info } from 'lucide-react';

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
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Smart Sustainable Planner</h2>
          <p className="text-stone-600">
            Get a personalized plan that avoids peak crowds and supports the local economy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 md:col-span-1">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Duration (Days)
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={days} 
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="text-right text-sm text-stone-500 mt-1">{days} Days</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Who's traveling?
                </label>
                <select 
                  value={groupType}
                  onChange={(e) => setGroupType(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-amber-500 focus:border-amber-500 outline-none"
                >
                  <option>Solo Traveler</option>
                  <option>Couple</option>
                  <option>Family with Kids</option>
                  <option>Group of Friends</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => toggleInterest(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        interests.includes(opt) 
                          ? 'bg-amber-100 text-amber-800 border-amber-200 border' 
                          : 'bg-stone-100 text-stone-600 border-transparent border hover:bg-stone-200'
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
                className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 disabled:bg-stone-400 transition-colors flex justify-center items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create My Plan'}
              </button>
            </div>

            {/* Static Tips Sidebar Section */}
            <div className="mt-8 pt-6 border-t border-stone-100">
               <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-sm text-stone-800">Essential Tips</span>
               </div>
               
               <div className="space-y-4">
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                     <h5 className="flex items-center gap-1.5 text-xs font-bold text-orange-800 mb-1">
                        <ThermometerSun className="w-3 h-3" /> Seasonal Guide
                     </h5>
                     <p className="text-[11px] text-stone-600 leading-relaxed">
                        <strong>Oct-Feb:</strong> Best weather. Carry light jackets.<br/>
                        <strong>Mar-May:</strong> Summer peaks. Plan indoor activities 12PM-4PM.<br/>
                        <strong>Jun-Sep:</strong> Monsoon. Carry umbrellas/raincoats.
                     </p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                     <h5 className="flex items-center gap-1.5 text-xs font-bold text-blue-800 mb-1">
                        <Shield className="w-3 h-3" /> Safety First
                     </h5>
                     <ul className="text-[11px] text-stone-600 space-y-1 list-disc list-inside">
                        <li>Use Pre-paid Auto stands.</li>
                        <li>Avoid Chamundi steps after 6 PM.</li>
                        <li>Tourist Helpline: 1077.</li>
                     </ul>
                  </div>
               </div>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-2">
            {!itinerary && !loading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-stone-400 border-2 border-dashed border-stone-200 rounded-2xl p-8 bg-stone-50/50">
                <Leaf className="w-12 h-12 mb-4 opacity-20" />
                <p>Select your preferences to generate a responsible travel plan.</p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-stone-500">
                <Loader2 className="w-8 h-8 animate-spin text-amber-600 mb-4" />
                <p className="animate-pulse">Consulting local experts AI...</p>
              </div>
            )}

            {itinerary && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
                  <h3 className="text-xl font-bold font-serif text-stone-900 mb-2">{itinerary.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                    <CheckCircle className="w-4 h-4" />
                    <span>Optimized for low crowd density</span>
                  </div>
                </div>

                {/* Seasonal & Safety Guidelines (Dynamic) */}
                {(itinerary.seasonalGuidelines || itinerary.safetyTips) && (
                    <div className="grid md:grid-cols-2 gap-4">
                        {itinerary.seasonalGuidelines && itinerary.seasonalGuidelines.length > 0 && (
                            <div className="bg-orange-50/80 p-5 rounded-xl border border-orange-100">
                                <h4 className="flex items-center gap-2 font-bold text-orange-900 mb-3 text-sm uppercase tracking-wider">
                                    <ThermometerSun className="w-4 h-4" /> Seasonal Advice
                                </h4>
                                <ul className="space-y-2">
                                    {itinerary.seasonalGuidelines.map((tip, i) => (
                                        <li key={i} className="text-sm text-stone-700 flex items-start gap-2 leading-relaxed">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {itinerary.safetyTips && itinerary.safetyTips.length > 0 && (
                            <div className="bg-blue-50/80 p-5 rounded-xl border border-blue-100">
                                <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-3 text-sm uppercase tracking-wider">
                                    <Shield className="w-4 h-4" /> Safety Tips
                                </h4>
                                <ul className="space-y-2">
                                    {itinerary.safetyTips.map((tip, i) => (
                                        <li key={i} className="text-sm text-stone-700 flex items-start gap-2 leading-relaxed">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="space-y-4">
                  {itinerary.items.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 w-16 pt-1 text-right">
                         <span className="text-sm font-bold text-stone-400">{item.time}</span>
                      </div>
                      <div className="flex-grow border-l-2 border-stone-100 pl-4 relative">
                        {item.isSustainable && (
                          <div className="absolute -left-[9px] top-1 w-4 h-4 bg-green-100 rounded-full border-2 border-white flex items-center justify-center">
                            <Leaf className="w-2 h-2 text-green-600" />
                          </div>
                        )}
                        <h4 className="font-bold text-stone-800">{item.activity}</h4>
                        <div className="text-sm text-amber-600 font-medium mb-1">{item.location}</div>
                        <p className="text-sm text-stone-600">{item.notes}</p>
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