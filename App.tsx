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
import { ChevronRight, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
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
          <>
            <Hero 
              onStart={() => setCurrentView(AppView.EXPLORE)} 
              onImpact={() => setCurrentView(AppView.IMPACT)}
            />
            <div className="py-24 bg-[#0c0c0c]">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="italic font-serif text-2xl text-stone-500 max-w-3xl mx-auto leading-relaxed">
                  "Mysore is not just a palace. It is a living museum of crafts, cuisine, and culture waiting to be explored."
                </p>
              </div>
            </div>
          </>
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

  if (currentView === AppView.LOGIN) {
    return <Login onLogin={handleLoginSuccess} onSkip={handleSkipLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-stone-200 antialiased selection:bg-amber-600 selection:text-white flex flex-col">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout} 
        onLoginClick={() => setCurrentView(AppView.LOGIN)}
      />
      <main className="flex-1 animate-fade-in">
        {renderView()}
      </main>
      
      {currentView !== AppView.MAP && (
        <footer className="bg-[#111] border-stone-800 py-16 border-t pb-32 md:pb-16 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
            <div>
              <h4 className="text-stone-100 font-bold mb-2 text-2xl font-serif">MysuruUnveiled</h4>
              <p className="mb-6 text-[10px] uppercase tracking-widest text-amber-600 font-black">Beyond the Palace</p>
              <p className="leading-relaxed mb-6 text-stone-400 font-light text-xs md:text-sm">
                Decentralizing tourism to preserve heritage and empower locals. We help you discover the soul of the city while supporting the hands that build it.
              </p>
            </div>
            
            <div className="hidden md:block">
              <h4 className="text-stone-100 font-bold mb-6 text-lg font-serif">Quick Links</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {[
                  { label: 'Meet Artisans', view: AppView.ARTISANS },
                  { label: 'Hidden Gems', view: AppView.EXPLORE },
                  { label: 'Book Stays & Travel', view: AppView.BOOKINGS },
                  { label: 'Interactive Map', view: AppView.MAP },
                  { label: 'Food Guide', view: AppView.FOOD },
                  { label: 'Our Impact', view: AppView.IMPACT },
                ].map((link, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => setCurrentView(link.view)} 
                    className="cursor-pointer transition-colors flex items-center group text-stone-400 hover:text-amber-500"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 text-stone-400 group-hover:text-amber-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-stone-100 font-bold mb-6 text-lg font-serif">Connect</h4>
              <div className="space-y-4">
                <a href="mailto:info@mysuruunveiled.com" className="flex items-start gap-3 transition-colors group text-stone-400 hover:text-white">
                  <div className="bg-stone-800 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className="block text-[10px] mb-0.5 text-stone-500 uppercase font-black">Email Us</span>
                    info@mysuruunveiled.com
                  </div>
                </a>
                <a href="tel:+919900000000" className="flex items-start gap-3 transition-colors group text-stone-400 hover:text-white">
                   <div className="bg-stone-800 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className="block text-[10px] mb-0.5 text-stone-500 uppercase font-black">Call Us</span>
                    +91 99000 00000
                  </div>
                </a>
                <div className="flex items-start gap-3">
                   <div className="bg-stone-800 mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xs md:text-sm">
                    <span className="block text-[10px] mb-0.5 text-stone-500 uppercase font-black">Visit Us</span>
                    <p className="leading-snug text-stone-500">
                      Mysuru, Karnataka 570002
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-stone-600">
            <p className="mb-4 md:mb-0">&copy; 2026 MysuruUnveiled.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <span onClick={() => showReason('privacy')} className="cursor-pointer hover:text-amber-500 transition-colors flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Privacy</span>
              <span onClick={() => showReason('terms')} className="cursor-pointer hover:text-amber-500 transition-colors flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Terms</span>
              <span onClick={() => showReason('sitemap')} className="cursor-pointer hover:text-amber-500 transition-colors flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> Sitemap</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
