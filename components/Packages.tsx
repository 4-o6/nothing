import React, { useState } from 'react';
import { TOUR_PACKAGES } from '../constants';
import { Check, Leaf, Star, Diamond, ArrowLeft, CreditCard, Smartphone, Wallet, Phone, Mail, User, ShieldCheck } from 'lucide-react';

export const Packages: React.FC = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf': return <Leaf className="w-12 h-12" />;
      case 'star': return <Star className="w-12 h-12" />;
      case 'diamond': return <Diamond className="w-12 h-12" />;
      default: return <Star className="w-12 h-12" />;
    }
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
        return {
          container: 'bg-stone-800',
          iconColor: 'text-stone-400',
          priceColor: 'text-white',
          checkColor: 'text-stone-400',
          buttonClass: 'bg-stone-700'
        };
    }
  };

  const renderDetailView = () => {
    const pkg = TOUR_PACKAGES.find(p => p.id === selectedPackageId);
    if (!pkg) return null;

    // Mock Reviews Data
    const reviews = [
      { user: "Rahul Sharma", rating: 5, comment: "The guide was incredibly knowledgeable about the local history. Highly recommended!" },
      { user: "Anita Desai", rating: 4, comment: "Great experience, especially the artisan visits. The van was very comfortable." },
      { user: "John Smith", rating: 5, comment: "Seamless booking and the itinerary was perfect. Loved the hidden food spots." }
    ];

    return (
      <div className="animate-fade-in max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => setSelectedPackageId(null)}
          className="flex items-center text-stone-400 hover:text-amber-500 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Packages
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Overview & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Package Overview Header */}
            <div className="bg-[#1c1c1c] border border-stone-800 rounded-xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 {getIcon(pkg.icon)}
               </div>
               <div className="flex justify-between items-start mb-4">
                 <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wide border ${pkg.tier === 'Premium' ? 'bg-amber-900/20 text-amber-500 border-amber-800' : 'bg-stone-800 text-stone-400 border-stone-700'}`}>
                      {pkg.tier} Tier
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">{pkg.name}</h1>
                    <p className="text-stone-400">{pkg.description}</p>
                 </div>
                 <div className="text-right">
                    <div className="text-3xl font-bold text-amber-500">{pkg.price}</div>
                    <div className="text-stone-500 text-xs">Total inclusive of taxes</div>
                 </div>
               </div>

               <div className="border-t border-stone-800 pt-6 mt-6">
                 <h3 className="text-lg font-bold text-white mb-4">What's Included</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-300 text-sm">{feat}</span>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-stone-300 text-sm">Travel Insurance Included</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-[#1c1c1c] border border-stone-800 rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-current" /> Recent Reviews
              </h3>
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-stone-800 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-stone-200">{review.user}</span>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-stone-400 text-sm italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Payment & Support */}
          <div className="space-y-6">
            
            {/* Payment Modes */}
            <div className="bg-[#1c1c1c] border border-stone-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Payment Modes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-stone-700 bg-stone-800/50 hover:border-amber-500/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-stone-400" />
                    <span className="text-stone-300 text-sm">UPI / GPay / PhonePe</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-stone-500"></div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-stone-700 bg-stone-800/50 hover:border-amber-500/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-stone-400" />
                    <span className="text-stone-300 text-sm">Credit / Debit Card</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-stone-500"></div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-stone-700 bg-stone-800/50 hover:border-amber-500/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-stone-400" />
                    <span className="text-stone-300 text-sm">Net Banking</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-stone-500"></div>
                </div>
              </div>

              <button className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-amber-900/20 transition-all">
                Proceed to Pay {pkg.price}
              </button>
              <p className="text-xs text-stone-500 text-center mt-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Secure SSL Payment
              </p>
            </div>

            {/* Customer Service */}
            <div className="bg-stone-800/30 border border-stone-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Customer Support</h3>
              <p className="text-stone-400 text-xs mb-4">Need help deciding? Contact our local experts.</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-stone-300">
                  <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-stone-500">Call Us (24/7)</div>
                    +91 99000 00000
                  </div>
                </div>
                <div className="flex items-center gap-3 text-stone-300">
                  <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-stone-500">Email Support</div>
                    support@mu.com
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#111111] py-16 text-stone-200">
      {selectedPackageId ? (
        renderDetailView()
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-500 mb-6">Mysuru Tour Packages</h2>
            <p className="text-lg text-stone-400 max-w-2xl mx-auto">
              Choose the perfect package for your unforgettable journey through the city of palaces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TOUR_PACKAGES.map((pkg) => {
              const styles = getCardStyle(pkg.tier);
              return (
                <div 
                  key={pkg.id} 
                  className={`flex flex-col rounded-xl border p-8 transition-transform duration-300 hover:-translate-y-2 ${styles.container}`}
                >
                  {pkg.tier === 'Standard' && (
                    <div className="absolute top-0 inset-x-0 bg-amber-600/90 text-stone-900 text-center text-sm font-bold py-1 uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`flex justify-center mb-6 ${pkg.tier === 'Standard' ? 'mt-4' : ''}`}>
                    <div className={`p-4 rounded-full bg-black/20 ${styles.iconColor}`}>
                      {getIcon(pkg.icon)}
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <div className={`text-4xl font-bold ${styles.priceColor} mb-1`}>{pkg.price}</div>
                    <p className="text-stone-500 text-sm">{pkg.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 ${styles.checkColor}`} />
                        <span className="text-stone-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${styles.buttonClass}`}
                  >
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