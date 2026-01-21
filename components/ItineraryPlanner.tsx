import React from 'react';
import { LayoutDashboard, Lock, ArrowLeft, Cpu, Database, Network } from 'lucide-react';

export const ItineraryPlanner: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0c0c0c] text-stone-200 overflow-hidden relative">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #444 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-app-reveal">
           <div className="w-20 h-20 bg-[#141414] border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-transparent"></div>
              <Cpu className="w-8 h-8 text-amber-500 relative z-10 animate-pulse" />
           </div>
           
           <h2 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">System Calibration.</h2>
           <p className="text-stone-500 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
             Our <span className="text-amber-500 font-bold">Sustainable Heritage Neural Network</span> is currently indexing local artisan schedules for the upcoming Dussehra season.
           </p>
        </div>

        {/* Dashboard Status Mocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-app-reveal" style={{ animationDelay: '0.2s' }}>
          {[
            { icon: <Database className="w-4 h-4" />, label: "Dataset Sync", status: "88% Complete" },
            { icon: <Network className="w-4 h-4" />, label: "Artisan Node", status: "Active Connection" },
            { icon: <Lock className="w-4 h-4" />, label: "Security", status: "Protected" }
          ].map((item, i) => (
            <div key={i} className="bg-[#141414] border border-white/5 p-6 rounded-[2rem] flex flex-col items-center gap-3">
               <div className="text-stone-600 mb-1">{item.icon}</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">{item.label}</div>
               <div className="text-[11px] font-bold text-amber-600">{item.status}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8 animate-app-reveal" style={{ animationDelay: '0.4s' }}>
          <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-4">
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Global Status:</span>
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">UNDER DEVELOPMENT</span>
          </div>

          <button 
             onClick={() => window.history.back()}
             className="group flex items-center gap-3 px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Return to Explorations
          </button>
        </div>
      </div>
    </div>
  );
};