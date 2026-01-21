import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../constants';
import { Check, Leaf, Star, Diamond, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Packages: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const getCardStyle = (tier: string) => {
    switch (tier) {
      case 'Budget':
        return {
          container: 'bg-[#1a2e25]/40 border-green-800/30 backdrop-blur-sm',
          priceColor: 'text-green-400',
          checkColor: 'text-green-500',
          buttonClass: 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
        };
      case 'Standard':
        return {
          container: 'bg-[#2a2012]/40 border-amber-600/30 backdrop-blur-sm relative overflow-hidden',
          priceColor: 'text-amber-500',
          checkColor: 'text-amber-500',
          buttonClass: 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20'
        };
      case 'Premium':
        return {
          container: 'bg-[#231e18]/40 border-amber-800/30 backdrop-blur-sm',
          priceColor: 'text-amber-700',
          checkColor: 'text-amber-700',
          buttonClass: 'bg-stone-800 hover:bg-stone-700 text-white'
        };
      default:
        return { container: 'bg-stone-800', priceColor: 'text-white', checkColor: 'text-stone-400', buttonClass: 'bg-stone-700' };
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] pt-28 flex items-center justify-center animate-fade-in px-4">
        <div className="bg-[#141414] p-10 rounded-3xl border border-stone-800 text-center max-w-md shadow-2xl">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-3">Booking Secured</h2>
          <p className="text-stone-400 text-sm mb-8 leading-relaxed font-light">Your royal journey has been confirmed. Check your email for the digital heritage pass.</p>
          <button 
            onClick={() => { setPaymentSuccess(false); setSelectedPackageId(null); }}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-amber-900/20"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-28 pb-20 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Royal Packages</h2>
          <p className="text-base text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Choose a curated journey tier for your unforgettable Mysuru experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TOUR_PACKAGES.map((pkg) => {
            const styles = getCardStyle(pkg.tier);
            return (
              <div key={pkg.id} className={`flex flex-col rounded-3xl border p-8 transition-all card-lift ${styles.container}`}>
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{pkg.name}</h3>
                  <div className={`text-3xl font-bold ${styles.priceColor} mb-1`}>{pkg.price}</div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-black">All Inclusive</p>
                </div>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-stone-300 text-xs font-light leading-relaxed">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${styles.checkColor}`} /> {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${styles.buttonClass} disabled:opacity-50`}
                >
                  {isProcessing ? 'Processing...' : 'Reserve Now'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};