import React, { useState } from 'react';
import { ShieldCheck, User, Lock, Mail, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('tourist'); // 'tourist' or 'admin'
  const [isLoading, setIsLoading] = useState(false);
  
  // Admin form state
  const [adminId, setAdminId] = useState('admin_cmd_01');
  const [password, setPassword] = useState('••••••••');

  const handleAdminAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onLogin('admin');
    }, 1200);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google Sign-In popup redirect delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin('tourist');
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/40 to-orange-50/30 min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Cinematic Blurs */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-300/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-white w-full max-w-md relative z-10">
        
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-slate-900/20">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight mb-2">
            TourSafe
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-orange-400" /> A Safe City For Every Woman
          </p>
        </div>

        {/* Role Toggle Switch */}
        <div className="flex p-1 bg-slate-100/80 rounded-2xl mb-8 border border-slate-200/50 relative">
          <button 
            type="button"
            onClick={() => setRole('tourist')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 z-10 ${
              role === 'tourist' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <User size={16} /> Civilian Portal
          </button>
          <button 
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 z-10 ${
              role === 'admin' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <ShieldAlert size={16} /> Command Login
          </button>
        </div>

        {/* CONDITIONAL RENDERING BASED ON ROLE */}
        {role === 'tourist' ? (
          /* CIVILIAN GOOGLE SIGN IN */
          <div className="space-y-6 py-2">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 mb-6">
                Sign in securely with your Google account to track local safety scores and access emergency services.
              </p>
            </div>

            <button 
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm hover:shadow transition-all group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2 text-blue-600">
                  <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                  Connecting to Google...
                </span>
              ) : (
                <>
                  {/* Google SVG Logo */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-4">
              Protected by enterprise-grade OAuth encryption.
            </p>
          </div>
        ) : (
          /* ADMIN USER ID & PASSWORD LOGIN */
          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Command User ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600">
                  <User className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Security Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600">
                  <Lock className="text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-slate-200 rounded-2xl text-slate-800 font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all shadow-lg mt-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black shadow-slate-900/25 hover:shadow-slate-900/40 hover:-translate-y-0.5"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying Credentials...
                </span>
              ) : (
                <>
                  Access Command Center <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}