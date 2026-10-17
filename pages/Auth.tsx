
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: { email: string; isAdmin: boolean }) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration logic and email notification
    setTimeout(() => {
      const isAdmin = email.toLowerCase().endsWith('@eldoctooor.ae');
      
      if (!isLogin) {
        // Log "Sending welcome message" to simulated console
        console.log(`[SYS-MAIL] Sending Welcome Message to: ${email}`);
        console.log(`[SYS-ADMIN] Notification sent to: mostafaelmourabea@gmail.com`);
        setShowWelcome(true);
      } else {
        proceedToApp(isAdmin);
      }
      setIsLoading(false);
    }, 2000);
  };

  const proceedToApp = (isAdmin: boolean) => {
    setIsSuccess(true);
    setTimeout(() => {
      const userData = { email, isAdmin };
      localStorage.setItem('mosta_user', JSON.stringify(userData));
      onAuthSuccess(userData);
      window.location.hash = '#/';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0b1020]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-lg z-10 relative">
        <button 
          onClick={() => window.location.hash = '#/'}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 font-bold text-sm uppercase tracking-widest dir-rtl"
        >
          <ArrowLeft size={16} className="rotate-180" /> العودة للرئيسية
        </button>

        <div className="bg-[#0f1733] border border-white/10 rounded-[3rem] p-12 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
          {isSuccess ? (
            <div className="text-center space-y-6 animate-in zoom-in duration-500 py-10">
               <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                 <CheckCircle2 size={48} className="text-green-500" />
               </div>
               <h2 className="text-4xl font-black text-white">Access Granted</h2>
               <p className="text-gray-400">مرحباً بك في نظام إدارة صيدلية المرابع. جاري تهيئة النظام...</p>
               {email.toLowerCase().endsWith('@almarabea.com') && (
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                   <ShieldCheck size={14} /> وضع الإدارة مفعل
                 </div>
               )}
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20">
                   <Sparkles size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                  {isLogin ? 'مرحباً بعودتك' : 'إنشاء حساب'}
                </h1>
                <p className="text-gray-500">قم بإدخال بياناتك للدخول للنظام.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2 text-right dir-rtl">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1">البريد الإلكتروني</label>
                  <div className="relative group">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <input 
                      required
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@almarabea.com"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-800 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-right dir-rtl">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1">كلمة المرور</label>
                  <div className="relative group">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
                    <input 
                      required
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-gray-800 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3 items-center" dir="rtl">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                      <ShieldCheck size={18} />
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase leading-tight">
                      استخدم بريد ينتهي بـ @almarabea.com للحصول على <span className="text-emerald-400">صلاحيات المدير</span>
                    </p>
                  </div>
                )}

                <button 
                  disabled={isLoading}
                  className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl text-white font-black text-xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  dir="rtl"
                >
                  {isLoading ? (
                    <><Loader2 className="animate-spin" /> جاري الاتصال...</>
                  ) : (
                    <>{isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'} <ChevronRight className="rotate-180" /></>
                  )}
                </button>
              </form>

              <div className="text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors"
                >
                  {isLogin ? "ليس لديك حساب؟ إنشاء حساب جديد" : "لديك حساب بالفعل؟ تسجيل الدخول"}
                </button>
              </div>
            </div>
          )}

          {/* Ad Slot in Auth Page */}
          <div className="mt-10 pt-10 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="bg-white/2 rounded-2xl p-4 text-center border border-dashed border-white/10">
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Sponsored</span>
              <p className="text-[9px] text-gray-800 mt-1 uppercase font-bold">ca-pub-8167320193401713</p>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-[#0f1733] border border-blue-500/30 rounded-[3rem] p-10 max-w-md w-full text-center shadow-2xl relative">
              <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-blue-500/10">
                <Mail size={40} className="text-blue-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Welcome to Mosta!</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                We've sent an automated welcome briefing to <span className="text-white font-bold">{email}</span> and notified our directorate at <span className="text-blue-400 italic">mostafaelmourabea@gmail.com</span>.
              </p>
              <button 
                onClick={() => proceedToApp(email.toLowerCase().endsWith('@eldoctooor.ae'))}
                className="w-full py-4 bg-white text-black rounded-2xl font-black text-lg hover:bg-gray-200 transition-all shadow-xl"
              >
                Proceed to OS Portal
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
