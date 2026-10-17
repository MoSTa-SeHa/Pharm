
import React from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Database, 
  Globe, 
  Bot, 
  LayoutDashboard 
} from 'lucide-react';

const AdSlot = ({ id }: { id: number }) => (
  <div className="bg-white/2 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[150px] group transition-all hover:bg-white/5">
    <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest group-hover:text-blue-500/50 transition-colors">Advertisement {id}</span>
    <p className="text-[9px] text-gray-800 mt-1 uppercase font-bold">ca-pub-8167320193401713</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-600/10 transition-all group">
    <div className="p-3 bg-blue-500/10 rounded-2xl w-fit mb-6 text-blue-400 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#0b1020] selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 flex items-center justify-between backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-emerald-500/30">M</div>
          <span className="text-2xl font-black text-white tracking-tighter">صيدلية <span className="text-emerald-500">المرابع</span></span>
        </div>
        <div className="hidden lg:flex gap-10">
          <a href="#features" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#/about" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">About Us</a>
          <a href="#/policy" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">OS Policy</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#/auth" className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl text-sm font-black text-white shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2">
            تسجيل الدخول <ChevronRight size={18} />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-10 min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-600/10 rounded-full blur-[160px] animate-pulse-slow"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-black uppercase tracking-widest animate-bounce">
             <Sparkles size={14} /> نظام الإدارة الذكي لصيدلية المرابع
           </div>
           <h1 className="text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
             إدارة شاملة <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">لصيدليتك.</span>
           </h1>
           <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
             من المبيعات والمشتريات إلى إدارة شؤون الموظفين وتبيهات العملاء وتخطيط المخزون. كل ماتحتاجه صيدليتك في مكان واحد.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
             <a href="#/auth" className="px-10 py-5 bg-emerald-600 text-white rounded-3xl font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl">الدخول للنظام</a>
             <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-3xl font-black text-xl text-white hover:bg-white/10 transition-all">طلب عرض تجريبي</button>
           </div>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-20 relative z-10 w-full max-w-6xl mx-auto group">
           <div className="absolute inset-0 bg-blue-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="bg-black/40 border border-white/10 rounded-[3rem] p-4 backdrop-blur-3xl shadow-2xl overflow-hidden animate-float">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-[500px] object-cover rounded-[2.5rem] opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                alt="System Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="p-10 glass rounded-3xl text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                       <Zap size={32} className="text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">Live Data Processing</h4>
                    <p className="text-gray-400 text-sm">Real-time synchronization with MOH/DOH gateways.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Ads Section (Top) */}
      <section className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AdSlot id={1} />
        <AdSlot id={2} />
        <AdSlot id={3} />
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <div className="max-w-xl space-y-4">
             <h2 className="text-5xl font-black text-white">Advanced Modules. <br /> Total Control.</h2>
             <p className="text-gray-400 text-lg">Every tool you need to run a high-volume pharmacy at peak efficiency.</p>
           </div>
           <div className="flex gap-4">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                 <p className="text-3xl font-black text-white">22k+</p>
                 <p className="text-xs text-gray-500 font-bold uppercase mt-1">Drug Master Records</p>
              </div>
              <div className="p-8 bg-blue-600 rounded-3xl text-center shadow-xl shadow-blue-500/20">
                 <p className="text-3xl font-black text-white">99.9%</p>
                 <p className="text-xs text-blue-200 font-bold uppercase mt-1">Uptime SLA</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <FeatureCard icon={Database} title="Drug Registry" desc="Complete database of MOH approved pharmaceutical items with real-time price syncing." />
           <FeatureCard icon={Bot} title="AI ICD Mapping" desc="Convert clinical notes into precise ICD-10/11 codes using semantic reasoning agents." />
           <FeatureCard icon={ShieldCheck} title="Gov Integration" desc="Seamless handshakes with Malaffi, Shafafiya, and DOH regulatory gateways." />
           <FeatureCard icon={Zap} title="Smart Inventory" desc="Automated low-stock alerts and expiration monitoring with audit history." />
        </div>
      </section>

      {/* Ads Section (Bottom) */}
      <section className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AdSlot id={4} />
        <AdSlot id={5} />
        <AdSlot id={6} />
      </section>

      {/* Pricing Teaser */}
      <section className="py-32 px-10 bg-white/2">
         <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
            <Globe size={300} className="absolute -right-20 -bottom-20 text-white/10 rotate-12" />
            <h2 className="text-6xl font-black text-white leading-tight">Ready to revolutionize <br /> your operations?</h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto">Join Mosta Pharm and experience the world's most advanced pharmaceutical terminal today.</p>
            <div className="pt-8">
              <a href="#/auth" className="px-16 py-6 bg-white text-indigo-700 rounded-3xl font-black text-2xl hover:bg-gray-100 transition-all shadow-2xl">Enter OS Portal</a>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-10 border-t border-white/10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">MP</div>
             <span className="text-xl font-black text-white">Mosta Pharm OS</span>
           </div>
           <p className="text-gray-500 text-sm max-w-xs">Part of the EL-DocToOoR Global Healthcare Infrastructure.</p>
           <p className="text-gray-600 text-[10px] uppercase font-black tracking-widest mt-8">© 2025 EL-DocToOoR • mosta-pharm.eldoctooor.ae</p>
        </div>
        <div className="grid grid-cols-2 gap-10 lg:gap-20">
           <div className="space-y-4">
             <h4 className="text-white font-bold">Authority</h4>
             <ul className="space-y-2 text-sm text-gray-500">
               <li><a href="#/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
               <li><a href="#/policy" className="hover:text-blue-400 transition-colors">System Policy</a></li>
               <li><a href="#/privacy" className="hover:text-blue-400 transition-colors">Privacy</a></li>
               <li><a href="#/terms" className="hover:text-blue-400 transition-colors">Terms of Use</a></li>
             </ul>
           </div>
           <div className="space-y-4">
             <h4 className="text-white font-bold">Contact</h4>
             <ul className="space-y-2 text-sm text-gray-500">
               <li className="font-mono text-[10px]">mostafaelmourabea@gmail.com</li>
               <li><a href="https://eldoctooor.ae" className="hover:text-blue-400 transition-colors">www.eldoctooor.ae</a></li>
             </ul>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
