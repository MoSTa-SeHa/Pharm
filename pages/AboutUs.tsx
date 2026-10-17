
import React from 'react';
import { Users, Globe, Award, Target, Sparkles, Building2 } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-white tracking-tighter">About Mosta Pharm</h1>
        <p className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs">A Division of EL-DocToOoR Global</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Redefining the Pharmaceutical Core.</h2>
          <p className="text-gray-400 leading-relaxed">
            Mosta Pharm was born from a singular vision: to bridge the gap between traditional pharmacy management and the cutting edge of Artificial Intelligence. As part of the EL-DocToOoR ecosystem, we provide a unified operating system that empowers pharmacists to focus on patient care while the OS handles the complexity of global drug registries and regulatory compliance.
          </p>
          <div className="flex gap-4">
             <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex-1 text-center">
                <p className="text-2xl font-black text-white">2025</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Launch Year</p>
             </div>
             <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex-1 text-center">
                <p className="text-2xl font-black text-blue-400">Global</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Presence</p>
             </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
          <img 
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1000" 
            className="rounded-[3rem] border border-white/10 shadow-2xl relative z-10 opacity-80"
            alt="Laboratory"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To provide high-performance digital tools that ensure zero-error medication dispensing.' },
          { icon: Sparkles, title: 'Our Vision', desc: 'A world where AI agents and pharmacists work in perfect synergy for better health.' },
          { icon: Award, title: 'Our Standards', desc: 'Fully compliant with MOH, DOH, and international HIPAA privacy regulations.' }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-transparent p-12 rounded-[3rem] border border-white/10 text-center space-y-6">
        <Building2 className="mx-auto text-blue-500" size={48} />
        <h3 className="text-2xl font-bold text-white">The EL-DocToOoR Network</h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We operate as a core node in the EL-DocToOoR global health network, serving thousands of patients across the MENA region through advanced telemetry and automated inventory management.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
