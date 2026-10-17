import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Sales: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">المبيعات (نقطة البيع)</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 flex flex-col items-center justify-center">
        <ShoppingCart size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-400">واجهة نقاط البيع والفواتير قيد التطوير...</p>
      </div>
    </div>
  );
};
export default Sales;
