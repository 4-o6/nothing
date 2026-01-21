
import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../constants';
import { Check, Leaf, Star, Diamond, ArrowLeft, CreditCard, Smartphone, Wallet, Phone, Mail, User, ShieldCheck, CheckCircle2, Ticket } from 'lucide-react';

export const Packages: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf': return <Leaf className="w-12 h-12" />;
      case 'star': return <Star className="w-12 h-12" />;
      case 'diamond': return <Diamond className="w-12 h-12" />;
      default: return <Star className="w-12 h-12" />;
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const getCardStyle = (tier: string) => {
    switch (tier) {
      case 'Budget':
        return {
          container: 'bg-[#1a2e25] border-green-800/50',
          iconColor: 'text-green-500',
          priceColor: 'text-green-400',
          checkColor: 'text-green-500',
          buttonClass: 'border border-green-700 text-green-400 hover:bg-green-900/50'
        };
      case 'Standard':
        return {
          container: 'bg-[#2a2012] border-amber-600/50 relative overflow-hidden',
          iconColor: 'text-amber-500',
          priceColor: 'text-amber-500',
          checkColor: 'text-amber-500',
          buttonClass: 'bg-transparent border border-amber-600 text-amber-500 hover:bg-amber-900/30'
        };
      case 'Premium':
        return {
          container: 'bg-[#231e18] border-amber-800/50',
          iconColor: 'text-amber-700',
          priceColor: 'text-amber-600',
          checkColor: 'text-amber-700',
          buttonClass: 'border border-amber-800 text-amber-600 hover:bg-amber-900/20'
        };
      default:
        return { container: 'bg-stone-800', iconColor: 'text-stone-400', priceColor: 'text-white', checkColor: 'text-stone-400', buttonClass: 'bg-stone-700' };
    }
  };

  const renderDetailView = () => {
    const pkg = TOUR_PACKAGES.find(p => p.id === selectedPackageId);
    if (!pkg) return null;

    if (paymentSuccess) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center animate-fade-in">
          <div className="bg-[#1c1c1c] p-12 rounded-3xl border border-stone-800 text-center max-w-lg shadow-2xl">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-stone-400 mb-8 leading-relaxed">Your journey with the {pkg.name} has been secured. A digital pass and itinerary have been sent to your email.</p>
            <div className="bg-stone-900 p-6 rounded-2xl mb-8 flex flex-col items-center gap-2 border border-stone-800">
               <span className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Booking ID</span>
               <span className="text-xl font-mono text-amber-500">MU-2026-X79K2</span>
            </div>
            <button 
              onClick={() => { setPaymentSuccess(false); setSelectedPackageId(null); }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all"
            >
              Return to Explorer
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => setSelectedPackageId(null)} className="flex items-center text-stone-400 hover:text-amber-500 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Packages
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1c1c1c] border border-stone-800 rounded-xl p-8 relative overflow-hidden">
               <div className="flex justify-between items-start mb-4">
                 <div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">{pkg.name}</h1>
                    <p className="text-stone-400">{pkg.description}</p>
                 </div>
                 <div className="text-right">
                    <div className="text-3xl font-bold text-amber-500">{pkg.price}</div>
                 </div>
               </div>
               <div className="border-t border-stone-800 pt-6 mt-6">
                 <h3 className="text-lg font-bold text-white mb-4">Inclusions</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-stone-300 text-sm">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> {feat}
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-[#1c1c1c] border border-stone-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Payment</h3>
              <div className="space-y-3 mb-6">
                {['UPI / GPay / PhonePe', 'Credit / Debit Card'].map((mode, i) => (
                   <div key={mode} className={`flex items-center justify-between p-3 rounded-lg border border-stone-700 bg-stone-800/50 hover:border-amber-500/50 cursor-pointer ${i === 0 ? 'border-amber-600' : ''}`}>
                      <span className="text-stone-300 text-sm">{mode}</span>
                      <div className={`w-3 h-3 rounded-full border ${i === 0 ? 'bg-amber-600 border-amber-600' : 'border-stone-500'}`}></div>
                   </div>
                ))}
              </div>
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? <span className="animate-pulse">Processing...</span> : `Secure Payment: ${pkg.price}`}
              </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#111111] py-16 text-stone-200">
      {selectedPackageId ? renderDetailView() : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Mysuru Tour Packages</h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto">Choose the perfect tier for your unforgettable journey.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TOUR_PACKAGES.map((pkg) => {
              const styles = getCardStyle(pkg.tier);
              return (
                <div key={pkg.id} className={`flex flex-col rounded-xl border p-8 transition-transform hover:-translate-y-2 ${styles.container}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className={`text-4xl font-bold ${styles.priceColor} mb-1`}>{pkg.price}</div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-stone-300 text-sm">
                        <Check className={`w-5 h-5 flex-shrink-0 ${styles.checkColor}`} /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setSelectedPackageId(pkg.id)} className={`w-full py-3 rounded-lg font-semibold ${styles.buttonClass}`}>
                    Choose Package
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
