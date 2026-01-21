
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
    { id: AppView.HOME, label: 'Home', icon: <Map className="w-4 h-4" /> },
    { id: AppView.EXPLORE, label: 'Hidden Gems', icon: <Compass className="w-4 h-4" /> },
    { id: AppView.FOOD, label: 'Food Guide', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: AppView.PACKAGES, label: 'Packages', icon: <Ticket className="w-4 h-4" /> },
    { id: AppView.MAP, label: 'Map', icon: <MapPinned className="w-4 h-4" /> },
    { id: AppView.ARTISANS, label: 'Artisans', icon: <Users className="w-4 h-4" /> },
    { id: AppView.BOOKINGS, label: 'Bookings', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: AppView.PLANNER, label: 'Planner', icon: <Leaf className="w-4 h-4" /> },
  ];

  const handleNavigate = (view: AppView) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-4">
        <div className="bg-stone-900/60 border-white/10 backdrop-blur-xl border rounded-[2rem] px-6 h-16 flex items-center justify-between shadow-2xl">
          {/* Brand/Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavigate(AppView.HOME)}>
            <div className="flex flex-col">
              <span className="text-xl font-black font-serif leading-none transition-colors text-amber-500 group-hover:text-amber-400">MysuruUnveiled</span>
              <span className="text-[8px] font-black tracking-[0.3em] uppercase mt-0.5 text-stone-500">Heritage Decentralized</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
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
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-xl transition-colors text-stone-400 hover:text-white bg-white/5 ${isOpen ? 'bg-amber-600 text-white' : ''}`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 animate-fade-in-up">
           <div className="backdrop-blur-2xl border rounded-[2.5rem] p-4 shadow-2xl bg-stone-900/95 border-white/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-4 transition-all mb-1 ${
                  currentView === item.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-stone-400 hover:bg-white/5'
                }`}
              >
                {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4' })}
                {item.label}
              </button>
            ))}
            
            <div className="mt-3 pt-3 border-t border-white/10">
              {isAuthenticated ? (
                 <button onClick={onLogout} className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black text-red-500 bg-red-500/5 uppercase tracking-widest">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button onClick={onLoginClick} className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-black text-amber-500 bg-amber-500/5 uppercase tracking-widest">
                   <LogIn className="w-4 h-4" /> Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
