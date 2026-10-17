
import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileText } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 space-y-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <div className="p-3 bg-green-500/10 border border-green-500/20 w-fit rounded-2xl text-green-400">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-gray-500 font-mono text-sm uppercase">Last Revised: May 2025 • Version 2.4</p>
      </div>

      <div className="prose prose-invert prose-blue max-w-none space-y-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Lock size={20} className="text-blue-500" /> 1. Data Encryption Standards
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Mosta Pharm OS utilizes TLS 1.3 for all data in transit and AES-256 for data at rest. Patient health information (PHI) is isolated in specialized encryption nodes that are inaccessible from public network layers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <EyeOff size={20} className="text-blue-500" /> 2. Information Usage
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We collect data necessary for pharmaceutical dispensing and insurance claim processing. This includes:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
            {['Emirates ID Verification', 'Medical Prescriptions', 'Inventory Audit Logs', 'Pharmacist Identity'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Server size={20} className="text-blue-500" /> 3. Data Sovereignty
          </h2>
          <p className="text-gray-400 leading-relaxed">
            All data processed through the Mosta Pharm OS is hosted on local cloud infrastructures within the UAE to remain compliant with federal healthcare data laws.
          </p>
        </section>

        <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
          <h4 className="text-white font-bold mb-2">GDPR & HIPAA Compliance</h4>
          <p className="text-sm text-gray-400">
            While we primarily serve the Middle East, our data processing protocols are built to exceed the requirements of both GDPR and HIPAA, ensuring your facility remains compliant globally.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
