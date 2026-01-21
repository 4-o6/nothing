import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, UserCircle2, ShieldCheck, Sparkles, Cpu, Link as LinkIcon } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onSkip: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSkip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isKeyReady, setIsKeyReady] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKeyStatus = async () => {
      // Check if process.env.API_KEY is baked in or if platform selection exists
      if (process.env.API_KEY && process.env.API_KEY.length > 10) {
        setIsKeyReady(true);
        return;
      }
      
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const hasKey = await aistudio.hasSelectedApiKey();
        setIsKeyReady(hasKey);
      } else {
        setIsKeyReady(false);
      }
    };
    checkKeyStatus();
  }, []);

  const handleInitializeKey = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      // Proceed assuming success to mitigate race conditions per platform instructions
      setIsKeyReady(true);
    } else {
      alert("Heritage network interface not detected. Ensure you are using a compatible browser environment.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      setError('Please enter your credentials to access the heritage network.');
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-[#0c0c0c] overflow-y-auto selection:bg-amber-600/30">
      <div className="fixed inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1600100397608-f09075727653?q=80&w=2070&auto=format&fit=crop" 
            alt="Mysore Palace Heritage" 
            className="w-full h-full object-cover opacity-30 scale-110 blur-[2px]"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-transparent to-[#0c0c0c]"></div>
         <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-32 pb-16 md:pt-48 md:pb-24 px-6 animate-app-reveal">
        <div className="w-full max-w-lg glass-card p-10 md:p-14 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>

          <div className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-600/10 border border-amber-600/20 text-amber-500 text-[9px] font-black uppercase tracking-[0.3em] mb-8">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Heritage Portal
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-4 tracking-tight leading-tight">
              Welcome <br/>
              <span className="text-amber-500 italic">Back Traveler.</span>
            </h1>

            {!isKeyReady && (
              <div className="mt-8 p-6 bg-amber-600/5 rounded-[2rem] border border-amber-600/10 animate-fade-in">
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                  <Cpu className="w-4 h-4" /> Heritage Sync Required
                </p>
                <button 
                  onClick={handleInitializeKey}
                  className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-amber-900/40 transition-all flex items-center justify-center gap-3"
                >
                  <LinkIcon className="w-4 h-4" /> Initialize Heritage Key
                </button>
                <p className="mt-4 text-[9px] text-stone-600 font-light leading-relaxed">
                  To enable AI Grounding and Itinerary Generation on Vercel, please link your heritage API project.
                </p>
              </div>
            )}
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
      </div>
    </div>
  );
};