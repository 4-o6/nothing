
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
import { ChevronRight, Mail, Phone, Instagram, Facebook, Twitter, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Success login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView(AppView.HOME);
  };

  // Skip login / Guest mode
  const handleSkipLogin = () => {
    setCurrentView(AppView.HOME);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(AppView.HOME);
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
            <div className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-stone-500 italic font-serif text-xl">
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
    <div className="min-h-screen bg-stone-50">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout} 
        onLoginClick={() => setCurrentView(AppView.LOGIN)}
      />
      <main className="animate-fade-in">
        {renderView()}
      </main>
      
      <footer className="bg-stone-900 text-stone-500 py-16 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          <div>
            <h4 className="text-stone-100 font-bold mb-2 text-2xl serif">MysuruUnveiled</h4>
            <p className="mb-6 text-xs uppercase tracking-widest text-amber-600 font-bold">Beyond the Palace</p>
            <p className="leading-relaxed mb-6 text-stone-400">
              Decentralizing tourism to preserve heritage and empower locals. We help you discover the soul of the city while supporting the hands that build it.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-stone-100 font-bold mb-6 text-lg">Quick Links</h4>
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
                  className="cursor-pointer text-stone-400 hover:text-amber-500 transition-colors flex items-center group"
                >
                  <ChevronRight className="w-3 h-3 mr-2 text-stone-600 group-hover:text-amber-500 transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-stone-100 font-bold mb-6 text-lg">Connect</h4>
            <div className="space-y-4">
              <a href="mailto:info@mysuruunveiled.com" className="flex items-start gap-3 hover:text-white transition-colors group">
                <div className="mt-0.5 w-8 h-8 rounded bg-stone-800 flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="block text-xs text-stone-400 mb-0.5">Email Us</span>
                  info@mysuruunveiled.com
                </div>
              </a>
              <a href="tel:+919900000000" className="flex items-start gap-3 hover:text-white transition-colors group">
                 <div className="mt-0.5 w-8 h-8 rounded bg-stone-800 flex items-center justify-center group-hover:bg-amber-900/30 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="block text-xs text-stone-400 mb-0.5">Call Us</span>
                  +91 99000 00000
                </div>
              </a>
              <div className="flex items-start gap-3">
                 <div className="mt-0.5 w-8 h-8 rounded bg-stone-800 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="block text-xs text-stone-400 mb-0.5">Visit Us</span>
                  <p className="leading-snug text-stone-500">
                    Vidyavardhaka College of Engineering,<br/> 
                    P.B. No.206, Gokulam III Stage,<br/>
                    Mysuru, Karnataka 570002
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
          <p>&copy; 2026 MysuruUnveiled.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-stone-400">Privacy Policy</span>
            <span className="cursor-pointer hover:text-stone-400">Terms of Service</span>
            <span className="cursor-pointer hover:text-stone-400">Sitemap</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
