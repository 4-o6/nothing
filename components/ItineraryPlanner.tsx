import React, { useState } from 'react';
import { generateSustainableItinerary } from '../services/geminiService';
import { Itinerary } from '../types';
import { Loader2, Calendar, Users, Heart, CheckCircle, Leaf, Lock } from 'lucide-react';

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
    // Planner disabled - showing Coming Soon instead
    return;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0c0c0c] text-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-50 bg-[#0c0c0c]/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6 rounded-[3rem] border-2 border-dashed border-amber-600/30 mb-20 animate-app-reveal">
           <div className="w-24 h-24 bg-amber-600/10 rounded-full flex items-center justify-center mb-8 border border-amber-600/20 shadow-[0_0_50px_rgba(217,119,6,0.1)]">
              <Lock className="w-10 h-10 text-amber-500 animate-pulse" />
           </div>
           <h2 className="text-4xl sm:text-5xl font-serif font-black text-white mb-6">Planner Syncing.</h2>
           <p className="text-stone-400 max-w-md text-lg font-light leading-relaxed mb-10">
              Our sustainable travel engine is being calibrated for Mysuru's upcoming festival season. <br/><span className="text-amber-500 font-black uppercase tracking-widest text-xs mt-4 block">Coming Soon in Early 2026</span>
           </p>
           <button 
             onClick={() => window.history.back()}
             className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-white transition-all"
           >
             Go Back to Gems
           </button>
        </div>

        <div className="text-center mb-16 animate-fade-in-up blur-md pointer-events-none opacity-40">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white tracking-tight">Smart Sustainable Planner</h2>
          <p className="text-lg font-light text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Get a personalized plan that avoids peak crowds and supports the local economy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-start blur-md pointer-events-none opacity-20">
          {/* Controls Placeholder */}
          <div className="p-8 rounded-[2.5rem] shadow-2xl border bg-[#141414] border-stone-800/50 md:col-span-1">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-stone-500">
                  <Calendar className="w-4 h-4" /> Duration (Days)
                </label>
                <div className="w-full h-1.5 bg-stone-800 rounded-lg"></div>
              </div>
              <button className="w-full py-5 bg-stone-800 text-stone-500 rounded-2xl font-black text-sm uppercase tracking-widest">
                Create My Plan
              </button>
            </div>
          </div>

          {/* Results Area Placeholder */}
          <div className="md:col-span-2">
            <div className="h-full min-h-[450px] flex flex-col items-center justify-center border-2 border-dashed rounded-[3rem] p-12 border-stone-800 bg-[#111]/30 text-stone-600">
              <Leaf className="w-16 h-16 mb-6 opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};