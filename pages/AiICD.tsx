
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Stethoscope, 
  Send, 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Loader2, 
  Sparkles, 
  Copy, 
  History, 
  Search as SearchIcon,
  XCircle,
  Clock
} from 'lucide-react';
import { getICDMapping } from '../services/geminiService';
import { ICDResponse } from '../types';

interface HistoryItem {
  id: string;
  timestamp: number;
  diagnosis: string;
  result: ICDResponse;
}

const AiICD: React.FC = () => {
  const [diagnosis, setDiagnosis] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ICDResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('diagnostic_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    localStorage.setItem('diagnostic_history', JSON.stringify(newHistory));
  };

  const handleProcess = async () => {
    if (!diagnosis.trim() || diagnosis.length < 5) return;
    
    setIsProcessing(true);
    setError(null);
    try {
      const data = await getICDMapping(diagnosis);
      setResult(data);
      
      // Add to history
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        diagnosis: diagnosis.trim(),
        result: data
      };
      saveHistory([newItem, ...history.slice(0, 19)]); // Keep last 20
    } catch (err) {
      console.error(err);
      setError("Failed to generate ICD mapping. Please ensure your environment is correctly configured.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const loadHistoryItem = (item: HistoryItem) => {
    setDiagnosis(item.diagnosis);
    setResult(item.result);
    setSearchQuery(''); // Close/Clear search
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  // Filter history based on search query
  const filteredHistory = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return history.filter(item => 
      item.diagnosis.toLowerCase().includes(query) || 
      item.result.icd10.code.toLowerCase().includes(query) ||
      item.result.icd10.title.toLowerCase().includes(query)
    );
  }, [history, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20 text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} /> Next-Gen Diagnostics
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight">AI ICD Coding Agent</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Convert natural language clinical diagnoses into precise ICD-10 and ICD-11 codes with semantic reasoning powered by Gemini Pro.
        </p>
      </div>

      {/* History Search Bar */}
      <div className="relative max-w-2xl mx-auto z-50">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all backdrop-blur-md">
          <div className="pl-3 text-gray-500">
            <SearchIcon size={20} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search diagnostic history (codes, terms, or snippets)..."
            className="flex-1 bg-transparent border-none outline-none py-2 text-white placeholder:text-gray-600 font-medium"
          />
          {history.length > 0 && !searchQuery && (
             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 text-[10px] font-bold text-gray-500">
                <History size={12} /> {history.length} RECORDS
             </div>
          )}
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-2 text-gray-500 hover:text-white transition-colors">
              <XCircle size={18} />
            </button>
          )}
        </div>

        {/* History Search Results Dropdown */}
        {searchQuery.trim() && (
          <div className="absolute top-full left-0 w-full mt-2 bg-[#0f1733] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 border-b border-white/5 bg-white/2 flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Matching History</span>
              <span className="text-[10px] text-blue-400 font-bold">{filteredHistory.length} Found</span>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => loadHistoryItem(item)}
                    className="w-full p-4 flex items-start gap-4 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Clock size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-white truncate">{item.result.icd10.code}: {item.result.icd10.title}</span>
                        <span className="text-[9px] text-gray-600 font-mono whitespace-nowrap ml-2">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">{item.diagnosis}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-600 italic text-sm">
                  No matching records found in history.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start relative z-0">
        {/* Input Panel */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                 <Stethoscope size={24} />
               </div>
               <h2 className="text-xl font-bold text-white">Clinical Diagnosis</h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setDiagnosis("64-year-old male with persistent cough, night sweats, and significant weight loss over 3 months. Chest X-ray shows apical cavitary lesion. Sputum smear positive for acid-fast bacilli.")}
                className="text-xs text-blue-400 hover:text-blue-300 font-medium bg-blue-400/5 px-3 py-1.5 rounded-lg border border-blue-400/10 transition-all"
              >
                Load Case Example
              </button>
            </div>
          </div>
          
          <div className="relative group">
            <textarea 
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter patient diagnosis (e.g., Patient presents with chronic lower back pain radiating down left leg, suggestive of sciatica...)"
              className="w-full h-56 bg-black/40 border border-white/10 rounded-2xl p-6 text-white focus:ring-2 focus:ring-blue-500/30 outline-none transition-all resize-none font-medium placeholder:text-gray-600"
            />
            <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono">
              {diagnosis.length} CHARS
            </div>
          </div>

          <button 
            onClick={handleProcess}
            disabled={isProcessing || diagnosis.length < 5}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-500/10 transition-all text-lg"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={20} /> Analyzing Context...</>
            ) : (
              <>Process Mapping <Send size={20} /></>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
              <AlertTriangle size={18} />
              {error}
            </div>
          )}

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Info size={18} />
            </div>
            <p className="text-xs text-gray-400">
              Agent performs semantic cross-referencing between official ICD descriptors and clinical notes. Valid for MOH compliance checking.
            </p>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="grid grid-cols-2 gap-4">
                {/* ICD-10 Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group border-blue-500/20">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded">ICD-10-CM</span>
                    <button onClick={() => copyToClipboard(result.icd10.code)} className="text-gray-500 hover:text-white"><Copy size={16} /></button>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">{result.icd10.code}</div>
                  <p className="text-sm text-gray-400 leading-relaxed h-10 line-clamp-2">{result.icd10.title}</p>
                </div>

                {/* ICD-11 Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group border-indigo-500/20">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded">ICD-11 (WHO)</span>
                    <button onClick={() => copyToClipboard(result.icd11?.code || '')} className="text-gray-500 hover:text-white"><Copy size={16} /></button>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">{result.icd11?.code || 'N/A'}</div>
                  <p className="text-sm text-gray-400 leading-relaxed h-10 line-clamp-2">{result.icd11?.title}</p>
                </div>
              </div>

              {/* reasoning card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BrainCircuit size={20} className="text-purple-400" />
                    <h3 className="font-bold text-white uppercase tracking-wider text-sm">Agent Reasoning</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <CheckCircle2 size={14} className="text-green-400" />
                    <span className="text-xs font-bold text-green-400">Confidence: {(result.confidence_score * 100).toFixed(0)}%</span>
                  </div>
                </div>
                <div className="prose prose-invert prose-sm">
                  <p className="text-gray-300 leading-relaxed text-base italic">
                    "{result.reasoning}"
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                   <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                        Anatomical Match
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                        Pathology Cross-check
                      </div>
                   </div>
                   <button className="text-xs font-bold text-blue-400 hover:underline">Report Mismatch</button>
                </div>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6">
               <div className="relative">
                 <BrainCircuit size={64} className="text-blue-500/20 animate-pulse" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                 </div>
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl font-bold text-white">Neural Processing</h3>
                 <p className="text-gray-400 text-sm max-w-xs">AI is currently indexing standard clinical terminology against WHO database.</p>
               </div>
            </div>
          ) : (
            <div className="h-full border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 text-gray-600">
               <BrainCircuit size={64} />
               <div className="space-y-2">
                 <h3 className="text-xl font-bold text-gray-500">Diagnostic Output Pending</h3>
                 <p className="text-sm max-w-xs mx-auto">Results will appear here once the clinical diagnosis has been processed.</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiICD;
