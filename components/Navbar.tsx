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

  const handleLogoClick = () => {
    setView(AppView.HOME);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <div className="flex-shrink-0 flex flex-col justify-center overflow-hidden">
              <span className="text-xl font-bold font-serif text-amber-500 leading-none">MysuruUnveiled</span>
              <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase mt-0.5">Beyond the Palace</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-2 xl:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    currentView === item.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <button 
                  onClick={onLogout}
                  className="ml-4 text-xs flex items-center gap-1 text-stone-400 hover:text-white border border-stone-700 px-3 py-1 rounded-full hover:bg-stone-800 transition-colors"
                >
                  <LogOut className="w-3 h-3" /> Logout
                </button>
              ) : (
                 <button 
                  onClick={onLoginClick}
                  className="ml-4 text-xs flex items-center gap-1 text-amber-500 hover:text-amber-400 border border-amber-900/50 bg-amber-900/20 px-4 py-1.5 rounded-full hover:bg-amber-900/40 transition-colors"
                >
                  <LogIn className="w-3 h-3" /> Login
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-stone-900 border-b border-stone-800 shadow-2xl animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${
                  currentView === item.id
                    ? 'bg-amber-600 text-white'
                    : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 mt-2 border-t border-stone-800">
              {isAuthenticated ? (
                 <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-400 hover:bg-stone-800 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-amber-500 hover:bg-stone-800 hover:text-amber-400 transition-colors"
                >
                   <LogIn className="w-4 h-4" /> Login to Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};