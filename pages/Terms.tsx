
import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 w-fit rounded-2xl text-blue-400">
          <Scale size={32} />
        </div>
        <h1 className="text-4xl font-black text-white">Terms of Service</h1>
        <p className="text-gray-500 font-mono text-sm uppercase">Effective for all Node IDs as of May 2025</p>
      </div>

      <div className="space-y-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">1. License Agreement</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            By accessing Mosta Pharm EL-DocToOoR OS, you are granted a non-transferable license to operate the pharmaceutical management module within authorized clinical settings. Unauthorized replication or reverse-engineering of the ICD Mapping Agent is strictly prohibited.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">2. Professional Responsibility</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            While the AI ICD Agent provides high-confidence mapping, it is an advisory tool. Final clinical and coding decisions remain the sole responsibility of the licensed pharmacist or healthcare practitioner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-white/5 bg-black/40 rounded-2xl">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> Permitted Use
            </h3>
            <ul className="text-xs text-gray-500 space-y-2">
              <li>• Institutional pharmacy management</li>
              <li>• Regulatory claim submission</li>
              <li>• Inventory auditing</li>
            </ul>
          </div>
          <div className="p-6 border border-white/5 bg-black/40 rounded-2xl">
            <h3 className="font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" /> Prohibited Use
            </h3>
            <ul className="text-xs text-gray-500 space-y-2">
              <li>• Automated drug scraping</li>
              <li>• Shared credential usage</li>
              <li>• Unlicensed distribution</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
