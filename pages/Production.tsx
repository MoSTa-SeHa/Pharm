import React from 'react';
import { PenTool } from 'lucide-react';

const Production: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">إنتاج وتصميم</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 flex flex-col items-center justify-center">
        <PenTool size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-400">مواد الدعاية المطبوعة وتصميم التركيبات أو المواد الخاصة بالصيدلية...</p>
      </div>
    </div>
  );
};
export default Production;
