
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
    { id: AppView.BOOKINGS, label: 'Bookings', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const desktopItems = [
    ...navItems,
    { id: AppView.FOOD, label: 'Food', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: AppView.PACKAGES, label: 'Packages', icon: <Ticket className="w-4 h-4" /> },
    { id: AppView.MAP, label: 'Map', icon: <MapPinned className="w-4 h-4" /> },
  ];

  const handleNavigate = (view: AppView) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop/Tablet Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-4">
          <div className="bg-stone-900/60 border-white/10 backdrop-blur-xl border rounded-3xl md:rounded-[2rem] px-4 md:px-6 h-16 md:h-18 flex items-center justify-between shadow-2xl">
            {/* Brand/Logo */}
            <div className="flex items-center cursor-pointer group" onClick={() => handleNavigate(AppView.HOME)}>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black font-serif leading-none transition-colors text-amber-500 group-hover:text-amber-400">MysuruUnveiled</span>
                <span className="text-[7px] md:text-[8px] font-black tracking-[0.3em] uppercase mt-0.5 text-stone-500">Heritage Decentralized</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-1">
                {desktopItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                      currentView === item.id
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20'
                        : 'text-stone-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="w-px h-6 mx-4 bg-white/10"></div>

                {isAuthenticated ? (
                  <button 
                    onClick={onLogout}
                    className="p-2.5 rounded-xl transition-all bg-stone-800 hover:bg-red-900/20 text-stone-400 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                ) : (
                   <button 
                    onClick={onLoginClick}
                    className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-900/20"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Menu Button (Top Right) */}
            <div className="lg:hidden flex items-center gap-2">
              {!isAuthenticated && (
                <button 
                  onClick={onLoginClick}
                  className="bg-amber-600/10 text-amber-500 p-2 rounded-xl border border-amber-600/20"
                >
                  <LogIn className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-xl transition-colors text-stone-400 hover:text-white bg-white/5 ${isOpen ? 'bg-amber-600 text-white' : ''}`}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Full Screen Mobile Overlay */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-[90] bg-black/95 backdrop-blur-2xl animate-fade-in flex flex-col pt-24 px-6">
            <div className="flex-1 overflow-y-auto pb-32 space-y-2">
              {desktopItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full text-left px-6 py-4 rounded-2xl text-base font-bold flex items-center gap-5 transition-all ${
                    currentView === item.id
                      ? 'bg-amber-600 text-white shadow-xl'
                      : 'text-stone-400 bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span className="uppercase tracking-widest text-xs font-black">{item.label}</span>
                </button>
              ))}
              
              {isAuthenticated && (
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-6 py-4 rounded-2xl text-base font-bold flex items-center gap-5 transition-all text-red-400 bg-red-400/5 mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-xs font-black">Logout</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation (Native App Style) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100] flex justify-center pointer-events-none">
        <div className="bg-stone-900/80 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] px-4 py-3 flex items-center justify-around w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                currentView === item.id ? 'text-amber-500 scale-110' : 'text-stone-500'
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
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
