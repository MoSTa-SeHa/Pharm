
import React from 'react';
import { ClipboardCheck, ShieldAlert, Cpu, History } from 'lucide-react';

const Policy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white">Operational Policy</h1>
          <p className="text-blue-400 font-bold uppercase text-xs tracking-widest">System Protocols v2.4</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-600 font-bold uppercase">Compliance Rating</p>
          <p className="text-2xl font-black text-green-500">AAA+</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex gap-6">
           <div className="shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500">
             <Cpu size={24} />
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white">AI Usage Policy</h3>
             <p className="text-sm text-gray-400 leading-relaxed">
               Mosta Pharm AI agents (Gemini Engine) process data within an isolated context. No customer-specific PHI is used for training the global model without explicit cryptographic consent.
             </p>
           </div>
        </div>

        <div className="flex gap-6">
           <div className="shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-green-500">
             <History size={24} />
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white">Audit & Logging</h3>
             <p className="text-sm text-gray-400 leading-relaxed">
               Every action within the OS—from SQL queries to drug master modifications—is logged with a timestamp and Node ID. Logs are immutable for 7 years to meet statutory audit requirements.
             </p>
           </div>
        </div>

        <div className="flex gap-6">
           <div className="shrink-0 w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-red-500">
             <ShieldAlert size={24} />
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white">Breach Protocol</h3>
             <p className="text-sm text-gray-400 leading-relaxed">
               In the event of a credential compromise, the OS implements an automatic "Terminal Lock" across all associated Node IDs within 120ms of detection.
             </p>
           </div>
        </div>
      </div>

      <div className="p-10 bg-black/40 border border-white/10 rounded-[2.5rem] flex items-center justify-between">
         <div className="space-y-1">
            <h4 className="text-white font-bold">Policy Document #MP-POL-2025</h4>
            <p className="text-xs text-gray-500">Authenticated by EL-DocToOoR Security Authority</p>
         </div>
         <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">Download PDF</button>
      </div>
    </div>
  );
};

export default Policy;
