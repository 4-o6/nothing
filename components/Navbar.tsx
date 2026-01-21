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

export const Navbar: React.FC<NavbarProps> = ({ currentView, isAuthenticated, setView, onLogout, onLoginClick }) => {
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
        <div className="bg-stone-900/60 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 h-20 flex items-center justify-between shadow-2xl">
          {/* Brand/Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavigate(AppView.HOME)}>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-serif text-amber-500 leading-none group-hover:text-amber-400 transition-colors">MysuruUnveiled</span>
              <span className="text-[9px] text-stone-500 font-black tracking-[0.3em] uppercase mt-1">Heritage Decentralized</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                    currentView === item.id
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20'
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="w-px h-6 bg-white/10 mx-4"></div>

              {isAuthenticated ? (
                <button 
                  onClick={onLogout}
                  className="p-3 bg-stone-800 hover:bg-red-900/20 text-stone-400 hover:text-red-400 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              ) : (
                 <button 
                  onClick={onLoginClick}
                  className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  Login
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-stone-400 hover:text-white bg-white/5 rounded-xl transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-4 right-4 animate-fade-in-up">
           <div className="bg-stone-900/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest flex items-center gap-4 transition-all mb-2 ${
                  currentView === item.id
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-400 hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <div className="mt-4 pt-4 border-t border-white/10">
              {isAuthenticated ? (
                 <button onClick={onLogout} className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black text-red-500 bg-red-500/5">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button onClick={onLoginClick} className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black text-amber-500 bg-amber-500/5">
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