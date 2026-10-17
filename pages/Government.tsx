
import React from 'react';
import { Building2, ShieldCheck, Lock, CheckCircle2, AlertCircle, ExternalLink, Activity } from 'lucide-react';

const Government: React.FC = () => {
  const authorities = [
    { key: "MOH", name: "Ministry of Health (MOH)", status: "CONNECTED_LOCKED", latency: '42ms' },
    { key: "DOH", name: "Department of Health (DOH)", status: "CONNECTED_LOCKED", latency: '58ms' },
    { key: "DHA", name: "Dubai Health Authority (DHA)", status: "CONNECTED_LOCKED", latency: '35ms' },
    { key: "SHAFAFIYA", name: "Shafafiya", status: "CONNECTED_LOCKED", latency: '120ms' },
    { key: "MALAFFI", name: "Malaffi", status: "CONNECTED_LOCKED", latency: '22ms' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white">Authority Integration</h1>
          <p className="text-gray-400 mt-2">Regulatory compliance and claim submission gateways.</p>
        </div>
        <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 text-xs font-bold uppercase flex items-center gap-2">
          <AlertCircle size={14} /> Mode: PILOT_NON_PRODUCTION
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Building2 size={18} className="text-blue-400" /> Active Authority Handshakes
              </h3>
              <span className="text-xs text-gray-500 uppercase font-mono">Status Check: {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="divide-y divide-white/5">
              {authorities.map((auth) => (
                <div key={auth.key} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                      {auth.key.substring(0, 1)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{auth.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Activity size={10} /> Latency: {auth.latency}
                        </span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-green-500" /> Schema Valid
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-xs font-bold">
                      <Lock size={12} /> LOCKED
                    </div>
                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8">
            <div className="flex gap-6 items-start">
              <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Awaiting Official Authorization</h3>
                <p className="text-gray-400 mt-2 leading-relaxed">
                  Your system has been successfully verified for integration with the Ministry of Health (MOH) and DOH gateways. Direct claim submission is currently locked in pilot mode. To unlock production features, please submit your facility's e-Claim credentials through the authorized portal.
                </p>
                <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all">
                  Apply for Production Access
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="font-bold text-white mb-6">Security Compliance</h3>
            <div className="space-y-4">
              {[
                { label: 'E-Sign Verification', status: true },
                { label: 'TLS 1.3 Encryption', status: true },
                { label: 'Malaffi OAuth Token', status: false },
                { label: 'DOH Audit Logging', status: true },
                { label: 'MOH Credential Hub', status: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-sm text-gray-300 font-medium">{item.label}</span>
                  {item.status ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <Lock size={18} className="text-gray-600" />
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-gray-500 text-center uppercase tracking-widest font-bold">
              Encryption Node ID: EL-DOC-SEC-9912
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-lg font-bold">Need Support?</h3>
               <p className="text-white/80 text-sm mt-2 mb-6">Connect with our integration specialists for assistance with DOH/MOH handshakes.</p>
               <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-xl">
                 Open Integration Ticket
               </button>
             </div>
             <Building2 size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Government;
