import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, UserCircle2, Sparkles, ShieldCheck, X, Users, Globe, Landmark, Send, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onSkip: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSkip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteStep, setInviteStep] = useState<'form' | 'success'>('form');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      setError('Please enter your credentials to access the heritage network.');
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteStep('success');
    setTimeout(() => {
      setShowInviteModal(false);
      setInviteStep('form');
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full relative bg-[#0c0c0c] overflow-y-auto selection:bg-amber-600/30">
      {/* Dynamic Background Overlay */}
      <div className="fixed inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1600100397608-f09075727653?q=80&w=2070&auto=format&fit=crop" 
            alt="Mysore Palace Heritage" 
            className="w-full h-full object-cover opacity-30 scale-110 blur-[2px]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
         <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-32 pb-16 md:pt-48 md:pb-24 px-6 animate-app-reveal">
        <div className="w-full max-w-lg glass-card p-10 md:p-14 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden">
          
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-8">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Heritage Portal
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-4 tracking-tight leading-tight">
              Welcome <br/>
              <span className="text-amber-500 italic">Back Traveler.</span>
            </h1>
            <p className="text-stone-500 text-sm md:text-base font-light leading-relaxed">
              Access your personalized itineraries and supported artisan networks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Email Identifier</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 md:py-5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-stone-700 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.08] transition-all text-sm"
                  placeholder="name@heritage.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1">Secure Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 md:py-5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder-stone-700 focus:outline-none focus:border-amber-500/30 focus:bg-white/[0.08] transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-[10px] font-bold uppercase tracking-widest bg-red-500/5 p-3 rounded-xl border border-red-500/10">
                <Sparkles className="w-3.5 h-3.5" /> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-16 md:h-20 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl md:rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-amber-900/40 active:scale-95 mt-4"
            >
              Enter Portal <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 flex flex-col items-center gap-6">
            <button 
              onClick={onSkip} 
              className="text-stone-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-3 group"
            >
              <UserCircle2 className="w-4 h-4 text-stone-600 group-hover:text-amber-500" />
              Continue as Guest
            </button>
            
            <div className="w-full flex items-center gap-4 py-2 opacity-20">
              <div className="h-px bg-stone-500 flex-1"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-500"></div>
              <div className="h-px bg-stone-500 flex-1"></div>
            </div>
            
            <p className="text-[8px] font-black text-stone-700 uppercase tracking-[0.4em] text-center px-4 leading-relaxed">
              Authorized access strictly for registered MysuruUnveiled partners and members.
            </p>
          </div>
        </div>
        
        {/* Improved Request Invite Trigger */}
        <div className="mt-10 text-center mb-8">
          <div className="inline-flex items-center gap-3 p-1.5 pl-6 bg-white/5 border border-white/10 rounded-full group cursor-pointer hover:bg-white/10 transition-all active:scale-95" onClick={() => setShowInviteModal(true)}>
            <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest">
              Don't have an account? 
            </span>
            <span className="bg-amber-600 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl shadow-amber-900/20 group-hover:bg-amber-500 transition-colors">
              Request Invite
            </span>
          </div>
        </div>
      </div>

      {/* Meaningful Request Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="w-full max-w-2xl bg-[#141414] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] relative animate-app-reveal">
            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 text-stone-400 rounded-full transition-all active:rotate-90"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Sidebar Info */}
              <div className="md:w-5/12 bg-amber-600/10 p-10 md:p-12 border-r border-white/5 flex flex-col justify-center">
                <div className="w-14 h-14 bg-amber-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-amber-900/40">
                  <Landmark className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-6 leading-tight">Join the Heritage Network.</h3>
                <div className="space-y-6">
                  {[
                    { icon: <Users className="w-4 h-4" />, title: "Support Artisans", desc: "Gain direct access to 40+ master craft families." },
                    { icon: <Globe className="w-4 h-4" />, title: "Unlock Impact", desc: "See real-time stats of your tourism contribution." },
                    { icon: <Sparkles className="w-4 h-4" />, title: "Private Map", desc: "Access 100+ vetted locations away from crowds." }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="text-amber-500 mt-1">{benefit.icon}</div>
                      <div>
                        <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{benefit.title}</div>
                        <p className="text-[11px] text-stone-500 leading-relaxed font-light">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Area */}
              <div className="md:w-7/12 p-10 md:p-12">
                {inviteStep === 'form' ? (
                  <>
                    <h4 className="text-stone-300 text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div> Heritage Invitation Request
                    </h4>
                    <form onSubmit={handleInviteSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest ml-1">Full Name</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-amber-500/30 focus:bg-white/[0.08] transition-all outline-none" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest ml-1">Primary Email</label>
                        <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-amber-500/30 focus:bg-white/[0.08] transition-all outline-none" placeholder="travel@heritage.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest ml-1">I am a...</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-stone-400 text-sm focus:border-amber-500/30 focus:bg-white/[0.08] transition-all outline-none appearance-none">
                          <option>Conscious Traveler</option>
                          <option>Local Artisan / Craftsman</option>
                          <option>Heritage Preservationist</option>
                          <option>Tourism Professional</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full py-5 bg-stone-100 text-black hover:bg-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                        Submit Interest <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-500/20 animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-4">Request Received</h3>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-xs font-light">
                      Thank you for your interest in preserving Mysuru's heritage. Our stewards will review your request and reach out shortly.
                    </p>
                    <div className="mt-10 flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse delay-150"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};