
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  ClipboardList,
  Building2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

const data = [
  { name: 'السبت', sales: 0, claims: 0 },
  { name: 'الأحد', sales: 0, claims: 0 },
  { name: 'الإثنين', sales: 0, claims: 0 },
  { name: 'الثلاثاء', sales: 0, claims: 0 },
  { name: 'الأربعاء', sales: 0, claims: 0 },
  { name: 'الخميس', sales: 0, claims: 0 },
  { name: 'الجمعة', sales: 0, claims: 0 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between dir-rtl">
        <div className="text-right">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">لوحة القيادة</h1>
          <p className="text-gray-400 mt-2">إحصائيات فورية ومراقبة لعمليات صيدلية المرابع.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all">تحميل التقرير</button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all">تصدير اكسيل</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 dir-rtl text-right">
        <StatCard title="إجمالي المخزون" value="0" change="0%" isPositive={true} icon={Package} color="bg-emerald-500" />
        <StatCard title="إيرادات اليوم" value="0 EGP" change="0%" isPositive={true} icon={ClipboardList} color="bg-indigo-500" />
        <StatCard title="زيارات العملاء" value="0" change="0%" isPositive={true} icon={Users} color="bg-purple-500" />
        <StatCard title="تنبيهات النظام" value="0" change="مستقر" isPositive={true} icon={AlertCircle} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8 dir-rtl">
            <h2 className="text-xl font-bold text-white text-right w-full">أداء المبيعات الشهري</h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                إجمالي الإيرادات
              </span>
              <span className="flex items-center gap-2 text-xs text-indigo-400 font-medium bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
                <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                المطالبات
              </span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f1733', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                <Area type="monotone" dataKey="claims" stroke="#6366f1" fillOpacity={1} fill="url(#colorClaims)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col dir-rtl text-right">
          <h2 className="text-xl font-bold text-white mb-6">أحدث الأنشطة</h2>
          <div className="space-y-6 flex-1">
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ClipboardList size={40} className="mb-4 opacity-20" />
              <p className="text-sm">لا توجد نشاطات مسجلة حتى الآن.</p>
              <p className="text-xs mt-2">النظام جاهز للعمل...</p>
            </div>
          </div>
          <button className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-gray-400 transition-all">
            عرض سجل النشاطات الكامل
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
