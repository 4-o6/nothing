import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
  onSkip: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSkip }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
    } else {
      setError('Please fill in all fields (Demo Mode: any valid input works)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-stone-900 animate-fade-in">
      <div className="absolute inset-0 z-0">
         <img 
            src="https://picsum.photos/id/1040/1920/1080" 
            alt="Mysore Background" 
            className="w-full h-full object-cover opacity-40"
         />
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-amber-500 mb-0">MysuruUnveiled</h1>
          <p className="text-stone-400 text-xs tracking-[0.2em] uppercase mb-4">Beyond the Palace</p>
          <p className="text-stone-300 text-sm">Sign in to unlock personalized features</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">User ID / Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-stone-800/50 border border-stone-600 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="user@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-stone-800/50 border border-stone-600 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-amber-900/30"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
            <button onClick={onSkip} className="text-stone-400 text-sm hover:text-white transition-colors">
                Continue as Guest
            </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-stone-500">
            &copy; 2024 College Project Demo
        </div>
      </div>
    </div>
  );
};