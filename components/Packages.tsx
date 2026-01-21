import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../constants';
import { TourPackage } from '../types';
import { 
  Check, Leaf, Star, Diamond, ArrowLeft, CheckCircle2, 
  X, CreditCard, Landmark, QrCode, Wallet, ShieldCheck, 
  Handshake, Sparkles, Loader2 
} from 'lucide-react';

export const Packages: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('direct');

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setSelectedPackage(null);
    }, 2000);
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
          priceColor: 'text-stone-400',
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
        <div className="bg-[#141414] p-10 rounded-[3rem] border border-stone-800 text-center max-w-md shadow-2xl animate-app-reveal">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Booking Secured</h2>
          <p className="text-stone-400 text-sm mb-10 leading-relaxed font-light">Your royal journey has been confirmed. A digital heritage pass has been generated and sent to your registered identifier.</p>
          <button 
            onClick={() => { setPaymentSuccess(false); }}
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-amber-900/20 uppercase tracking-widest text-xs"
          >
            RETURN TO EXPLORE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] pt-28 pb-20 text-stone-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">Royal Packages</h2>
          <p className="text-lg text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Choose a curated journey tier for your unforgettable Mysuru experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {TOUR_PACKAGES.map((pkg) => {
            const styles = getCardStyle(pkg.tier);
            return (
              <div key={pkg.id} className={`flex flex-col rounded-[2.5rem] border p-10 transition-all card-lift ${styles.container}`}>
                <div className="text-center mb-12">
                  <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${styles.priceColor}`}>{pkg.tier} EXPERIENCE</div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-3">{pkg.name}</h3>
                  <div className={`text-4xl font-black ${styles.priceColor} mb-2 tracking-tighter`}>{pkg.price}</div>
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Per Person • All Inclusive</p>
                </div>
                
                <ul className="space-y-5 mb-12 flex-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-stone-300 text-xs font-light leading-relaxed group">
                      <div className={`mt-0.5 p-1 rounded-full bg-stone-900 border border-white/5 ${styles.checkColor}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setSelectedPackage(pkg)}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${styles.buttonClass} active:scale-95`}
                >
                  Reserve Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout & More Info Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in" onClick={() => setSelectedPackage(null)}>
          <div className="bg-[#141414] w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative animate-app-reveal" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedPackage(null)} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 text-stone-400 rounded-full transition-all z-10"><X className="w-6 h-6" /></button>

            {/* Left side: Package Info */}
            <div className="md:w-5/12 bg-stone-900/40 p-10 md:p-14 border-r border-white/5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-8">
                <Sparkles className="w-3.5 h-3.5" /> SECURE BOOKING
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">{selectedPackage.name}</h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed mb-10">{selectedPackage.description}</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-amber-500">
                  <Handshake className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Commission-Free Artisan Support</span>
                </div>
                <div className="flex items-center gap-4 text-stone-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Certified Sustainable Route</span>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5">
                <div className="text-[10px] font-black text-stone-600 uppercase tracking-widest mb-2">Recommended For</div>
                <div className="text-white text-lg font-serif font-bold">{selectedPackage.recommendedFor}</div>
              </div>
            </div>

            {/* Right side: Payment Methods */}
            <div className="md:w-7/12 p-10 md:p-14">
              <h4 className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Select Payment Method</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { id: 'direct', label: 'Direct to Artisan', desc: 'Pay locally on arrival', icon: <Handshake className="w-5 h-5" /> },
                  { id: 'upi', label: 'UPI / Heritage QR', desc: 'GPay, PhonePe, Paytm', icon: <QrCode className="w-5 h-5" /> },
                  { id: 'card', label: 'Credit / Debit Card', desc: 'Visa, Master, Amex', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'net', label: 'Net Banking', desc: 'All Indian major banks', icon: <Landmark className="w-5 h-5" /> }
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-6 rounded-3xl border text-left transition-all duration-300 relative group ${
                      paymentMethod === method.id 
                        ? 'bg-amber-600/10 border-amber-600 ring-1 ring-amber-600/30' 
                        : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className={`mb-4 ${paymentMethod === method.id ? 'text-amber-500' : 'text-stone-600'}`}>
                      {method.icon}
                    </div>
                    <div className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{method.label}</div>
                    <div className="text-[10px] text-stone-500 font-light">{method.desc}</div>
                    {paymentMethod === method.id && (
                      <div className="absolute top-4 right-4 text-amber-500">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-stone-900/60 p-8 rounded-3xl border border-white/5 mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Base Package</span>
                  <span className="text-white font-bold">{selectedPackage.price}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Sustainable Tax</span>
                  <span className="text-green-500 font-bold">₹0</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm font-black text-white uppercase tracking-widest">Final Total</span>
                  <span className="text-2xl font-black text-amber-500">{selectedPackage.price}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-16 md:h-20 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 text-white rounded-2xl md:rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Verifying Heritage Node...
                  </>
                ) : (
                  <>Confirm & Secure Booking</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};