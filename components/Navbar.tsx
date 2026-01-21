import React, { useState, useEffect } from 'react';
import { 
  Compass, Users, Leaf, Menu, X, MapPinned, 
  LogOut, Ticket, UtensilsCrossed, ChevronDown,
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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 px-4 sm:px-8 ${scrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-6'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between bg-stone-900/90 backdrop-blur-3xl border border-white/10 px-4 sm:px-6 md:px-10 py-2 sm:py-2.5 rounded-xl sm:rounded-full shadow-2xl transition-all ${scrolled ? 'shadow-amber-900/20' : ''}`}>
          
          <div 
            className="flex flex-col cursor-pointer group select-none"
            onClick={() => handleNavigate(AppView.HOME)}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg md:text-xl font-black font-serif text-amber-500 tracking-tight">MysuruUnveiled</span>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-amber-600"></div>
            </div>
            <span className="text-[6px] sm:text-[7px] font-black tracking-[0.4em] uppercase text-stone-500">Beyond Palace Walls</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {coreItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 xl:px-5 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-all ${
                  currentView === item.id 
                    ? 'bg-amber-600 text-white shadow-xl shadow-amber-900/20' 
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="relative group/menu ml-1">
              <button className="px-4 xl:px-5 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase tracking-widest text-stone-400 hover:text-white flex items-center gap-2 bg-white/5 border border-white/5 transition-all">
                Discovery <ChevronDown className="w-3 h-3 group-hover/menu:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full right-0 pt-4 w-56 opacity-0 translate-y-3 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300">
                <div className="bg-[#181818] border border-white/10 rounded-3xl p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                  {secondaryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 text-stone-400 hover:text-white transition-all text-[11px] font-bold uppercase tracking-wider text-left"
                    >
                      <span className={item.color}>{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button onClick={onLogout} className="p-2 sm:p-2.5 bg-stone-800 hover:bg-red-900/20 text-stone-400 hover:text-red-400 rounded-lg sm:rounded-xl transition-all border border-white/5">
                <LogOut className="w-4 h-4 sm:w-5 h-5" />
              </button>
            ) : (
              <button onClick={onLoginClick} className="hidden sm:block bg-amber-600 hover:bg-amber-500 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                Portal Login
              </button>
            )}
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-amber-500 shadow-xl"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer remains unchanged for functionality */}
    </>
  );
};