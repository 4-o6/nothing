import React, { useState } from 'react';
import { Map, Compass, Users, Leaf, Menu, X, ShoppingBag, MapPinned, LogIn, LogOut, Ticket, UtensilsCrossed } from 'lucide-react';
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

  const navItems = [
    { id: AppView.HOME, label: 'Home', icon: <Map className="w-5 h-5" /> },
    { id: AppView.EXPLORE, label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: AppView.PLANNER, label: 'Planner', icon: <Leaf className="w-5 h-5" /> },
    { id: AppView.ARTISANS, label: 'Artisans', icon: <Users className="w-5 h-5" /> },
    { id: AppView.MAP, label: 'Map', icon: <MapPinned className="w-5 h-5" /> },
  ];

  const handleNavigate = (view: AppView) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 pt-4 md:pt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex flex-col cursor-pointer bg-stone-900/40 backdrop-blur-xl border border-white/5 px-5 py-2.5 rounded-2xl"
            onClick={() => handleNavigate(AppView.HOME)}
          >
            <span className="text-lg md:text-xl font-black font-serif leading-none text-amber-500">MysuruUnveiled</span>
            <span className="text-[7px] font-black tracking-[0.3em] uppercase mt-1 text-stone-500">Heritage First</span>
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <button onClick={onLoginClick} className="bg-amber-600 text-white p-3 rounded-2xl shadow-lg shadow-amber-900/20 active:scale-90 transition-transform">
                <LogIn className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden bg-stone-900/40 backdrop-blur-xl border border-white/5 p-3 rounded-2xl text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Side Navigation could go here, but keeping top clean for now */}
      </nav>

      {/* Mobile Bottom Dock (Native Style) */}
      <div className="fixed bottom-6 left-6 right-6 z-[100] md:bottom-8 md:left-1/2 md:-translate-x-1/2 md:w-fit pointer-events-none">
        <div className="bg-[#141414]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] px-4 py-2 flex items-center justify-around md:justify-center md:gap-4 w-full shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all relative ${
                currentView === item.id ? 'text-amber-500' : 'text-stone-500'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${currentView === item.id ? 'bg-amber-600/10' : ''}`}>
                {React.cloneElement(item.icon as React.ReactElement, { 
                  className: `w-5 h-5 ${currentView === item.id ? 'stroke-[2.5px]' : 'stroke-2'}` 
                })}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest ${currentView === item.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {item.label}
              </span>
              {currentView === item.id && (
                <div className="absolute -bottom-1 w-1 h-1 bg-amber-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};