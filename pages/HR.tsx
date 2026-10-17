import React from 'react';
import { Briefcase } from 'lucide-react';

const HR: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">الموارد البشرية والشؤون الإدارية (HR)</h1>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-96 flex flex-col items-center justify-center">
        <Briefcase size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-400">أسماء الموظفين، الحضور والانصراف، الرواتب، الحوافز، والملاحظات...</p>
      </div>
    </div>
  );
};
export default HR;
