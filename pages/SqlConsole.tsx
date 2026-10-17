
import React, { useState } from 'react';
import { Terminal, Play, Save, Trash2, Database, AlertCircle, CheckCircle2 } from 'lucide-react';

const SqlConsole: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM DrugMaster LIMIT 10;');
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleExecute = () => {
    setIsExecuting(true);
    // Simulate query execution
    setTimeout(() => {
      setResults([
        { DrugCode: 'DRG-001', PackageName: 'Panadol Advance', GenericName: 'Paracetamol', Stock: 1240 },
        { DrugCode: 'DRG-002', PackageName: 'Amoxil 250mg', GenericName: 'Amoxicillin', Stock: 45 },
        { DrugCode: 'DRG-003', PackageName: 'Nexium 40mg', GenericName: 'Esomeprazole', Stock: 15 },
        { DrugCode: 'DRG-004', PackageName: 'Ventolin Inhaler', GenericName: 'Salbutamol', Stock: 210 },
      ]);
      setIsExecuting(false);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Terminal size={32} className="text-blue-500" /> SQL Management Console
          </h1>
          <p className="text-gray-400 mt-1">Direct access to the EL-DocToOoR relational database.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-500">MYSQL LIVE</span>
          </div>
          <button className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-lg transition-all">
             <Save size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-400 bg-white/5 border border-white/10 rounded-lg transition-all">
             <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Schema Browser */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
             <Database size={14} /> Schema Explorer
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto">
             {[
               { name: 'DrugMaster', rows: '22,049' },
               { name: 'InventoryLogs', rows: '1.2M' },
               { name: 'ClaimsHistory', rows: '48k' },
               { name: 'PatientData', rows: '12k' },
               { name: 'AuthorityGateways', rows: '5' },
             ].map((table, i) => (
               <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                     <span className="text-sm text-gray-200 font-mono font-bold group-hover:text-blue-400 transition-colors">{table.name}</span>
                     <span className="text-[10px] text-gray-600">{table.rows}</span>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Editor & Results */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <div className="bg-[#0b1020] border border-white/10 rounded-3xl p-6 relative group flex flex-col">
            <div className="absolute top-4 right-4 z-10">
               <button 
                 onClick={handleExecute}
                 disabled={isExecuting}
                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-blue-500/20 transition-all"
               >
                 {isExecuting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Play size={16} fill="currentColor" />}
                 Execute (F5)
               </button>
            </div>
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-48 bg-transparent text-blue-400 font-mono text-lg outline-none resize-none placeholder:text-gray-800 pt-12"
              spellCheck={false}
            />
          </div>

          <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
               <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Query Results</span>
               {results.length > 0 && <span className="text-[10px] text-green-500 font-mono">{results.length} rows returned in 42ms</span>}
            </div>
            <div className="flex-1 overflow-auto">
               {results.length > 0 ? (
                 <table className="w-full text-left font-mono text-xs">
                   <thead>
                     <tr className="text-gray-500 border-b border-white/5 uppercase">
                       {Object.keys(results[0]).map((key) => (
                         <th key={key} className="px-6 py-3">{key}</th>
                       ))}
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {results.map((row, i) => (
                       <tr key={i} className="hover:bg-blue-500/5 transition-colors">
                         {Object.values(row).map((val: any, j) => (
                           <td key={j} className="px-6 py-3 text-gray-300">{val}</td>
                         ))}
                       </tr>
                     ))}
                   </tbody>
                 </table>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                    <Terminal size={48} />
                    <p className="text-sm italic">Execute a query to view results</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlConsole;
