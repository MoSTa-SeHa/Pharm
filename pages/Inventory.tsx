
import React from 'react';
import { Package, AlertTriangle, ArrowDown, ArrowUp, BarChart3, Filter, Plus } from 'lucide-react';

const Inventory: React.FC = () => {
  const stockItems: any[] = [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end dir-rtl">
        <div className="text-right">
          <h1 className="text-4xl font-black text-white">المخازن والأرصدة</h1>
          <p className="text-gray-400 mt-2">متابعة دقيقة لحركة المخزون وإدارة النواقص بصيدلية المرابع.</p>
        </div>
        <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
          <Plus size={20} /> أمر شراء جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dir-rtl text-right">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">إجمالي قيمة المخزون</p>
          <div className="flex items-center justify-between flex-row-reverse">
            <h3 className="text-3xl font-black text-white">0 EGP</h3>
            <span className="text-gray-400 flex items-center gap-1 text-sm font-bold">
              0%
            </span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 border-orange-500/20">
          <p className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-2">تنبيهات انخفاض الأرصدة</p>
          <div className="flex items-center justify-between flex-row-reverse">
            <h3 className="text-3xl font-black text-white">0 أصناف</h3>
            <AlertTriangle className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 border-red-500/20">
          <p className="text-xs text-red-500 font-bold uppercase tracking-wider mb-2">اقتراب انتهاء الصلاحية</p>
          <div className="flex items-center justify-between flex-row-reverse">
            <h3 className="text-3xl font-black text-white">0 أصناف</h3>
            <span className="text-gray-400 flex items-center gap-1 text-sm font-bold">
              0%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 dir-rtl">
          <h3 className="font-bold text-white flex items-center justify-start gap-2 text-right w-full">
            <BarChart3 size={18} className="text-emerald-400" /> جدول الأرصدة
          </h3>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10 transition-colors">
              <Filter size={18} />
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/10 transition-all">
              تصدير الجدول
            </button>
          </div>
        </div>
        <div className="overflow-x-auto text-right dir-rtl">
          <table className="w-full text-right">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-gray-500 border-b border-white/5 bg-black/20">
                <th className="px-6 py-4">اسم وشريط الصنف</th>
                <th className="px-6 py-4">الحالة</th>
                <th className="px-6 py-4">رصيد المخزن</th>
                <th className="px-6 py-4 text-center">انتهاء الصلاحية</th>
                <th className="px-6 py-4 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {stockItems.length > 0 ? stockItems.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className="text-[10px] font-mono text-gray-500 mt-0.5">{item.code}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      item.status === 'Healthy' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      item.status === 'Warning' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.stock > 500 ? 'bg-emerald-500' : item.stock > 100 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(100, (item.stock / 1500) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-white">{item.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-xs font-mono text-gray-400">{item.expiry}</span>
                  </td>
                  <td className="px-6 py-5 text-left">
                    <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors opacity-0 group-hover:opacity-100">
                      تعديل
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={5} className="px-6 py-10 text-center text-gray-500 text-sm">
                     لا يوجد أرصدة في النظام حتى الآن. قم بإضافة أصناف جديدة للبدء.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
