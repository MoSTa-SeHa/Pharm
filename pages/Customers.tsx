import React from 'react';
import { Users } from 'lucide-react';

const Customers: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">العملاء</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 flex flex-col items-center justify-center">
        <Users size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-400">تسجيل العملاء، تنبيهات طبية، حساباتهم، فواتيرهم، وترشيحات الأدوية المناسبة لهم...</p>
      </div>
    </div>
  );
};
export default Customers;
