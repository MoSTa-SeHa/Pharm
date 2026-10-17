import React from 'react';
import { Megaphone } from 'lucide-react';

const Marketing: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">دعاية وتسويق</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 flex flex-col items-center justify-center">
        <Megaphone size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-400">إدارة الحملات الإعلانية، العروض الترويجية، وبرامج نقاط الولاء...</p>
      </div>
    </div>
  );
};
export default Marketing;
