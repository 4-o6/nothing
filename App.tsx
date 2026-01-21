import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Explore } from './components/Explore';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { Artisans } from './components/Artisans';
import { Bookings } from './components/Bookings';
import { Packages } from './components/Packages';
import { InteractiveMap } from './components/InteractiveMap';
import { FoodGuide } from './components/FoodGuide';
import { Login } from './components/Login';
import { Impact } from './components/Impact';
import { AppView } from './types';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Centralized scroll reset on view change
  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate reset
    resetScroll();
    
    // Fallback for asynchronous layout shifts
    const timeoutId = setTimeout(resetScroll, 10);
    return () => clearTimeout(timeoutId);
  }, [currentView]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView(AppView.HOME);
  };

  const handleSkipLogin = () => {
    setCurrentView(AppView.HOME);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(AppView.HOME);
  };

  const showReason = (type: string) => {
    const reasons: Record<string, string> = {
      privacy: "Privacy Policy: Our legal team is currently finalizing compliance with India's new Digital Personal Data Protection (DPDP) Act to ensure artisan data is fully protected.",
      terms: "Terms of Service: We are drafting specific clauses with the Mysore Tourism Board to ensure artisan revenue protection is legally binding.",
      sitemap: "Sitemap: Our location database is dynamically evolving as we discover and vet more hidden gems across the Mysuru district."
    };
    alert(reasons[type] || "This feature is coming soon.");
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LOGIN:
        return <Login onLogin={handleLoginSuccess} onSkip={handleSkipLogin} />;
      case AppView.HOME:
        return (
          <div className="animate-fade-in">
            <Hero 
              onStart={() => setCurrentView(AppView.EXPLORE)} 
              onImpact={() => setCurrentView(AppView.IMPACT)}
            />
            <div className="py-32 bg-[#0c0c0c] border-y border-white/5">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="italic font-serif text-3xl md:text-5xl text-stone-500 max-w-4xl mx-auto leading-[1.3]">
                  "Mysore is not just a palace. It is a living museum of crafts, cuisine, and culture waiting to be explored."
                </p>
                <div className="mt-12 flex justify-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-600/40"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-600/20"></div>
                </div>
              </div>
            </div>
            <Impact />
          </div>
        );
      case AppView.EXPLORE:
        return <Explore />;
      case AppView.PACKAGES:
        return <Packages />;
      case AppView.MAP:
        return <InteractiveMap />;
      case AppView.PLANNER:
        return <ItineraryPlanner />;
      case AppView.BOOKINGS:
        return <Bookings />;
      case AppView.ARTISANS:
        return <Artisans />;
      case AppView.FOOD:
        return <FoodGuide />;
      case AppView.IMPACT:
        return <Impact />;
      default:
        return <Hero onStart={() => setCurrentView(AppView.EXPLORE)} onImpact={() => setCurrentView(AppView.IMPACT)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-stone-200 antialiased selection:bg-amber-600 selection:text-white flex flex-col">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout} 
        onLoginClick={() => setCurrentView(AppView.LOGIN)}
      />
      
      <main className="flex-1">
        {renderView()}
      </main>
      
      {/* Footer hidden on Map view to keep it full-screen */}
      {currentView !== AppView.MAP && currentView !== AppView.LOGIN && (
        <footer className="bg-[#0c0c0c] border-white/5 py-24 border-t pb-40 md:pb-24 mt-auto">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 text-sm">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-bold text-3xl font-serif">MysuruUnveiled</h4>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-black mt-2">Beyond the Palace Walls</p>
              </div>
              <p className="leading-relaxed text-stone-500 font-light text-base max-w-sm">
                A sustainable initiative to distribute tourism benefits directly to local artisans and preserve hidden heritage gems of the Royal District.
              </p>
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-8 text-xl font-serif">Discovery Hub</h4>
              <ul className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Artisan Workshops', view: AppView.ARTISANS },
                  { label: 'Unseen Locations', view: AppView.EXPLORE },
                  { label: 'Secure Transport', view: AppView.BOOKINGS },
                  { label: 'Heritage Map', view: AppView.MAP },
                  { label: 'Impact Report', view: AppView.IMPACT },
                ].map((link, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => setCurrentView(link.view)} 
                    className="cursor-pointer transition-all flex items-center group text-stone-500 hover:text-amber-500"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    <span className="text-xs uppercase tracking-widest font-black">{link.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-white font-bold text-xl font-serif">Global Connect</h4>
              <div className="space-y-5">
                <a href="mailto:heritage@mysuruunveiled.com" className="flex items-start gap-4 group">
                  <div className="bg-white/5 p-3 rounded-xl group-hover:bg-amber-600/10 transition-colors">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] mb-1 text-stone-600 uppercase font-black tracking-widest">Inquiries</span>
                    <span className="text-stone-300 group-hover:text-white transition-colors">heritage@mysuruunveiled.com</span>
                  </div>
                </a>
                <div className="flex items-start gap-4 group">
                   <div className="bg-white/5 p-3 rounded-xl">
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] mb-1 text-stone-600 uppercase font-black tracking-widest">Base Camp</span>
                    <span className="text-stone-300 leading-snug">
                      vvce mysore
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-stone-600">
            <p className="mb-6 md:mb-0">© 2026 MysuruUnveiled Heritage Foundation.</p>
            <div className="flex flex-wrap justify-center gap-8">
              <span onClick={() => showReason('privacy')} className="cursor-pointer hover:text-amber-500 transition-colors">Privacy</span>
              <span onClick={() => showReason('terms')} className="cursor-pointer hover:text-amber-500 transition-colors">Terms</span>
              <span onClick={() => showReason('sitemap')} className="cursor-pointer hover:text-amber-500 transition-colors">Sitemap</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;