
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Stethoscope, 
  Building2, 
  Terminal, 
  Menu, 
  X,
  Bell,
  Search,
  User,
  Database,
  LogOut,
  CreditCard,
  ArrowRight,
  History,
  Users,
  Briefcase,
  Megaphone,
  PenTool,
  ClipboardList
} from 'lucide-react';
import LiveAssistant from './LiveAssistant';

interface LayoutProps {
  children: React.ReactNode;
  user?: { email: string; isAdmin: boolean } | null;
  onLogout?: () => void;
}

interface SearchSuggestion {
  id: string;
  type: 'Drug' | 'Inventory' | 'ICD-10' | 'System';
  title: string;
  subtitle: string;
  path: string;
}

const UNIVERSAL_DATA: SearchSuggestion[] = [];

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const filtered = UNIVERSAL_DATA.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const navItems = [
    { name: 'الرئيسية', icon: LayoutDashboard, path: '#/' },
    { name: 'المبيعات', icon: ShoppingCart, path: '#/sales' },
    { name: 'المشتريات', icon: ShoppingCart, path: '#/purchases' },
    { name: 'المخازن والأرصدة', icon: Package, path: '#/inventory' },
    { name: 'العملاء', icon: Users, path: '#/customers' },
    { name: 'الموارد البشرية (HR)', icon: Briefcase, path: '#/hr' },
    { name: 'إدارة وتخطيط', icon: ClipboardList, path: '#/planning' },
    { name: 'دعاية وتسويق', icon: Megaphone, path: '#/marketing' },
    { name: 'إنتاج وتصميم', icon: PenTool, path: '#/production' },
  ];

  const currentPath = window.location.hash || '#/';
  const isLandingPage = !user && currentPath === '#/';

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#0b1020]">
        {children}
      </div>
    );
  }

  if (!user && currentPath === '#/auth') {
    return <div className="min-h-screen bg-[#0b1020]">{children}</div>;
  }

  const handleSuggestionClick = (path: string) => {
    window.location.hash = path;
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <div className="flex h-screen bg-[#0b1020] text-gray-100 overflow-hidden selection:bg-blue-500/30">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-500 bg-[#0f1733] border-r border-white/10 flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/30">
            M
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg leading-tight tracking-tight text-white uppercase" style={{ fontFamily: 'Tahoma, sans-serif' }}>صيدلية المرابع</span>
              <span className="text-[10px] text-emerald-400 font-bold tracking-[0.2em] uppercase opacity-80">نظام الإدارة</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            if (item.adminOnly && !user?.isAdmin) return null;
            return (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group relative ${
                  currentPath === item.path 
                  ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/5' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <item.icon size={20} className={currentPath === item.path ? 'text-emerald-400' : 'group-hover:text-emerald-400'} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-1 bg-[#0f1733] border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none text-xs font-bold">
                    {item.name}
                  </div>
                )}
              </a>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors ${!isSidebarOpen && 'justify-center'}`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold uppercase tracking-widest">تسجيل خروج</span>}
          </button>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-gray-500 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-[#0b1020]/40 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 z-[60]">
          <div className="flex items-center gap-4 flex-1 max-w-xl relative" ref={searchRef}>
             <div className="relative w-full">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-blue-400' : 'text-gray-500'}`} size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="ابحث في النظام (F2)..." 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm placeholder:text-gray-600 text-right dir-rtl"
                />
             </div>

             {/* Search Suggestions Dropdown */}
             {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#0f1733] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[70]">
                  <div className="p-3 border-b border-white/5 bg-white/2 flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Results</span>
                    <span className="text-[10px] text-blue-400 font-bold uppercase">{suggestions.length} Found</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {suggestions.length > 0 ? (
                      suggestions.map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => handleSuggestionClick(item.path)}
                          className="w-full p-4 flex items-start gap-4 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0 group"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                            item.type === 'Drug' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                            item.type === 'Inventory' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                            item.type === 'ICD-10' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                            'bg-gray-500/10 border-gray-500/20 text-gray-400'
                          }`}>
                            {item.type === 'Drug' && <Database size={18} />}
                            {item.type === 'Inventory' && <Package size={18} />}
                            {item.type === 'ICD-10' && <Stethoscope size={18} />}
                            {item.type === 'System' && <Terminal size={18} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-white truncate">{item.title}</span>
                              <span className="text-[9px] font-black px-2 py-0.5 rounded bg-white/5 text-gray-500 uppercase tracking-widest">{item.type}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate mt-0.5">{item.subtitle}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-700 group-hover:text-blue-400 transition-colors self-center shrink-0" />
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center space-y-2">
                        <div className="w-12 h-12 bg-white/2 rounded-full flex items-center justify-center mx-auto text-gray-700">
                          <Search size={24} />
                        </div>
                        <p className="text-sm text-gray-500 italic">No matching records found in local terminal</p>
                      </div>
                    )}
                  </div>
                  {suggestions.length > 0 && (
                    <div className="p-3 border-t border-white/5 bg-black/20 flex items-center justify-center">
                      <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em]">End of Terminal Buffer</p>
                    </div>
                  )}
                </div>
             )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> DB: ONLINE</span>
               <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> API: v2.4</span>
            </div>
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0b1020]"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                <div className="text-right hidden sm:block order-last pr-4">
                  <p className="text-sm font-semibold text-white leading-none mb-1">{user?.email.split('@')[0]}</p>
                  <p className={`text-[10px] flex items-center justify-end gap-1 font-bold uppercase tracking-tighter ${user?.isAdmin ? 'text-emerald-400' : 'text-green-400'}`}>
                    {user?.isAdmin ? 'مدير النظام' : 'مستخدم نشط'}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-105 transition-transform">
                  <User size={20} />
                </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          {children}
          <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0b1020] to-transparent pointer-events-none z-0"></div>
        </div>
        
        {/* Real-time Assistant Integration */}
        <LiveAssistant />
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0f1733] border border-blue-500/30 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative overflow-hidden">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X /></button>
            <div className="text-center space-y-4 mb-8 text-right dir-rtl">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-emerald-400" size={32} />
              </div>
              <h2 className="text-3xl font-black text-white text-center">ترقية الاشتراك</h2>
              <p className="text-gray-400 text-center">افتح كافة مميزات نظام صيدلية المرابع.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 dir-rtl">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-2xl font-black text-white">499 EGP<span className="text-xs font-normal text-gray-500">/شهرياً</span></span>
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">باقة الإدارة الشاملة</span>
               </div>
               <ul className="space-y-3">
                 {['وصول كامل لصلاحيات الإدارة المستقلة', 'دعم الذكاء الاصطناعي والاستشارات', 'ربط مع فروع متعددة ونقاط بيع', 'دعم فني متميز متاح 24/7'].map(item => (
                   <li key={item} className="flex items-center justify-start gap-2 text-sm text-gray-300 text-right">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></div> {item}
                   </li>
                 ))}
               </ul>
            </div>

            <a 
              href="https://PayPal.me/elmourab3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#0070ba] hover:bg-[#003087] rounded-2xl flex items-center justify-center gap-3 text-white font-black text-xl transition-all shadow-xl shadow-blue-500/20"
            >
              Pay via PayPal
            </a>
            <p className="mt-4 text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Direct settlement to EL-DocToOoR Authority
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
