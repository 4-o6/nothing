import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Map, ChevronRight, ChevronDown, 
  LogOut, ShoppingBag, Ticket, UtensilsCrossed, Leaf, Info
} from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  isAuthenticated: boolean;
  setView: (view: AppView) => void;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  isAuthenticated, 
  setView, 
  onLogout, 
  onLoginClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const coreItems = [
    { id: AppView.HOME, label: 'HOME' },
    { id: AppView.EXPLORE, label: 'GEMS' },
    { id: AppView.MAP, label: 'MAP' },
    { id: AppView.ARTISANS, label: 'ARTISANS' },
  ];

  const secondaryItems = [
    { id: AppView.FOOD, label: 'Food Guide', icon: <UtensilsCrossed className="w-5 h-5" />, color: 'text-orange-400' },
    { id: AppView.PLANNER, label: 'Planner', icon: <Leaf className="w-5 h-5" />, color: 'text-green-400' },
    { id: AppView.BOOKINGS, label: 'Bookings', icon: <ShoppingBag className="w-5 h-5" />, color: 'text-blue-400' },
    { id: AppView.PACKAGES, label: 'Packages', icon: <Ticket className="w-5 h-5" />, color: 'text-amber-400' },
    { id: AppView.IMPACT, label: 'Impact', icon: <Info className="w-5 h-5" />, color: 'text-purple-400' },
  ];

  const handleNavigate = (view: AppView) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[150] px-3 md:px-12 lg:px-16 pt-3 sm:pt-6 pointer-events-none h-0 overflow-visible">
      <div className="max-w-[1400px] mx-auto flex items-center gap-2 sm:gap-3 pointer-events-auto">
        
        {/* Map Icon Circle (Desktop) */}
        <button 
          onClick={() => handleNavigate(AppView.MAP)}
          className={`hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 border border-white/10 ${currentView === AppView.MAP ? 'bg-amber-600 text-white' : 'bg-stone-900/90 backdrop-blur-3xl text-amber-500'}`}
        >
          <Map className="w-7 h-7" />
        </button>

        {/* Main Pill Navbar */}
        <div className="relative z-[200] flex-1 flex items-center justify-between bg-stone-900/90 backdrop-blur-3xl border border-white/10 px-3 sm:px-10 py-1.5 sm:py-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Logo Section */}
          <div 
            className="flex flex-col cursor-pointer group select-none min-w-0"
            onClick={() => handleNavigate(AppView.HOME)}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-lg md:text-2xl font-bold font-serif text-amber-500 tracking-tight truncate">
                MysuruUnveiled 
              </span>
            </div>
            <span className="text-[6px] md:text-[8px] font-black tracking-[0.2em] uppercase text-stone-500 -mt-0.5 hidden sm:block">Beyond Palace Walls</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 flex-shrink-0">
            {coreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 xl:px-5 py-2.5 rounded-2xl text-[10px] xl:text-[11px] font-black uppercase tracking-[0.15em] transition-all ${
                  currentView === item.id 
                    ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/20' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="relative group/menu ml-2">
              <button className="px-5 py-2.5 rounded-2xl text-[10px] xl:text-[11px] font-black uppercase tracking-[0.15em] text-stone-400 hover:text-white flex items-center gap-2 bg-white/5 border border-white/5 transition-all">
                DISCOVERY <ChevronDown className="w-3.5 h-3.5 group-hover/menu:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 pt-4 w-60 opacity-0 translate-y-3 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300">
                <div className="bg-[#141414] border border-white/10 rounded-[2rem] p-3 shadow-[0_30px_60px_rgba(0,0,0,0.9)] backdrop-blur-3xl">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 text-stone-400 hover:text-white transition-all text-[10px] font-bold uppercase tracking-wider text-left"
                    >
                      <span className={item.color}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action & Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 ml-2 flex-shrink-0">
            {isAuthenticated ? (
              <button onClick={onLogout} className="p-2 sm:p-3 bg-stone-800 hover:bg-red-900/20 text-stone-400 hover:text-red-400 rounded-xl transition-all border border-white/5">
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={onLoginClick} 
                className="hidden sm:block bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] shadow-xl transition-all active:scale-95"
              >
                LOGIN
              </button>
            )}
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-amber-500 shadow-xl transition-all active:scale-90"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[140] lg:hidden transition-all duration-700 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsOpen(false)}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#0c0c0c] border-l border-white/5 shadow-2xl flex flex-col p-6 pt-24 transition-transform duration-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
            {coreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${
                  currentView === item.id ? 'bg-amber-600 text-white' : 'text-stone-400'
                }`}
              >
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
            <div className="h-px bg-white/10 my-4"></div>
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-stone-400"
              >
                <span className={item.color}>{item.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};