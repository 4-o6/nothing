import React, { useState, useEffect } from 'react';
import { 
  Map, Compass, Users, Leaf, Menu, X, MapPinned, LogIn, 
  LogOut, Ticket, UtensilsCrossed, Sparkles, ChevronDown,
  LayoutDashboard, ShoppingBag, Info
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreItems = [
    { id: AppView.HOME, label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: AppView.EXPLORE, label: 'Gems', icon: <Compass className="w-5 h-5" /> },
    { id: AppView.MAP, label: 'Map', icon: <MapPinned className="w-5 h-5" /> },
    { id: AppView.ARTISANS, label: 'Artisans', icon: <Users className="w-5 h-5" /> },
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Mobile Top Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-[110] px-4 py-4 transition-all duration-300 ${scrolled ? 'md:py-3' : 'md:py-5'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between bg-stone-900/80 backdrop-blur-2xl border border-white/10 px-4 md:px-8 py-2.5 rounded-3xl md:rounded-full shadow-2xl transition-all ${scrolled ? 'shadow-amber-900/10' : ''}`}>
          
          {/* Brand */}
          <div 
            className="flex flex-col cursor-pointer group select-none"
            onClick={() => handleNavigate(AppView.HOME)}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-black font-serif text-amber-500 group-hover:text-amber-400 transition-colors">MysuruUnveiled</span>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></div>
            </div>
            <span className="text-[7px] font-black tracking-[0.4em] uppercase text-stone-500 group-hover:text-stone-400 transition-colors">Beyond Palace Walls</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            {coreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentView === item.id 
                    ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/20' 
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* More Dropdown (Desktop) */}
            <div className="relative group/menu">
              <button className="px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-white flex items-center gap-2 bg-white/5 border border-white/5">
                Discovery <ChevronDown className="w-3.5 h-3.5 group-hover/menu:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 mt-3 w-56 opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300">
                <div className="bg-[#141414] border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden backdrop-blur-3xl">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-stone-400 hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider"
                    >
                      <span className={item.color}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Auth/Menu Button */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button onClick={onLogout} className="p-3 md:p-3.5 bg-stone-800 hover:bg-red-900/20 text-stone-400 hover:text-red-400 rounded-2xl transition-all border border-white/5">
                <LogOut className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            ) : (
              <button onClick={onLoginClick} className="hidden sm:block bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-900/20 transition-all active:scale-95">
                Portal Login
              </button>
            )}
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-2xl text-amber-500 active:scale-90 transition-transform shadow-xl"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`
        fixed inset-0 z-[105] bg-black/95 backdrop-blur-3xl lg:hidden flex flex-col pt-32 px-6 transition-all duration-500
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
      `}>
        <div className="max-w-md mx-auto w-full">
          <div className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-6 pl-2">Quick Navigation</div>
          <div className="grid grid-cols-2 gap-3 mb-10">
            {coreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex flex-col gap-3 p-5 rounded-3xl border transition-all text-left ${
                  currentView === item.id ? 'bg-amber-600 border-amber-500 shadow-xl' : 'bg-[#141414] border-white/5 text-stone-400'
                }`}
              >
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-6 h-6" })}
                <span className={`text-[11px] font-black uppercase tracking-widest ${currentView === item.id ? 'text-white' : ''}`}>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-6 pl-2">Discovery Tools</div>
          <div className="space-y-3 pb-12">
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all ${
                  currentView === item.id ? 'bg-amber-600/20 border-amber-600/40 text-white' : 'bg-[#141414] border-white/5 text-stone-400'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-white/5 ${item.color}`}>{item.icon}</div>
                  <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Dock (App Layout) */}
      <div className="lg:hidden fixed bottom-8 left-6 right-6 z-[110] pointer-events-none">
        <div className="max-w-sm mx-auto bg-stone-900/90 backdrop-blur-3xl border border-white/10 rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto">
          {coreItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`p-3 rounded-full transition-all relative ${
                currentView === item.id ? 'text-amber-500 bg-amber-600/10' : 'text-stone-500'
              }`}
            >
              {React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5" })}
              {currentView === item.id && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></div>}
            </button>
          ))}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-4 rounded-full transition-all bg-amber-600 text-white shadow-xl ${isOpen ? 'rotate-45 scale-110' : ''}`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );
};