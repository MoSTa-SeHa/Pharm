
import React, { useState, useEffect } from 'react';
import { Search, Filter, Database, Info, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Drug } from '../types';

const PharmacyERP: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  // Mock data simulation (since real backend isn't here)
  const mockDrugs: Drug[] = [];

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const results = mockDrugs.filter(d => 
          d.PackageName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          d.GenericName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDrugs(results);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDrugs([]);
    }
  }, [searchTerm]);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-center dir-rtl">
        <div className="text-right">
          <h1 className="text-3xl font-extrabold text-white">دليل الأدوية الشامل</h1>
          <p className="text-gray-400 mt-1">كود الأصناف والأدوية المرتبطة بالنظام.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">
            <Database size={18} /> استيراد شيت اكسيل
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* Search List */}
        <div className="lg:col-span-5 flex flex-col h-full overflow-hidden bg-white/5 border border-white/10 rounded-3xl dir-rtl">
          <div className="p-6 border-b border-white/10 space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالاسم التجاري أو المادة الفعالة..." 
                className="w-full bg-[#0b1020] border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white focus:ring-2 focus:ring-emerald-500/50 text-right"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                <Filter size={14} /> الأدوية المراقبة
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                <Filter size={14} /> التأمين
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 text-right">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : drugs.length > 0 ? (
              drugs.map((drug) => (
                <div 
                  key={drug.DrugCode}
                  onClick={() => setSelectedDrug(drug)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selectedDrug?.DrugCode === drug.DrugCode 
                    ? 'bg-emerald-600/10 border-emerald-500/50' 
                    : 'bg-white/5 border-transparent hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start flex-row-reverse">
                    <h4 className="font-bold text-gray-100 text-sm">{drug.PackageName}</h4>
                    <span className="text-[10px] font-mono text-gray-500 bg-black/30 px-2 py-0.5 rounded uppercase">
                      {drug.DrugCode}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{drug.GenericName}</p>
                </div>
              ))
            ) : searchTerm.length > 0 ? (
                <div className="p-8 text-center text-gray-500 italic">لم يتم العثور على أدوية تطابق "{searchTerm}"</div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-50 space-y-4">
                <Database size={48} />
                <p>قاعدة البيانات جاهزة للإدخال والاستيراد</p>
              </div>
            )}
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-7 overflow-y-auto">
          {selectedDrug ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">
                      REGISTERED PRODUCT
                    </span>
                    <span className="text-gray-500 text-sm">Code: {selectedDrug.DrugCode}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedDrug.PackageName}</h2>
                  <p className="text-lg text-blue-400/80 mt-1 uppercase tracking-widest font-medium">{selectedDrug.GenericName}</p>
                </div>
                <div className="flex flex-col items-end">
                   <p className="text-xs text-gray-500 mb-1 uppercase">Max Reimbursement</p>
                   <p className="text-3xl font-bold text-white">AED {selectedDrug.ThiqaMaxReimbursementPrice?.toFixed(2)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                    <Info size={16} /> Clinical Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Dosage Form</p>
                      <p className="text-white font-medium">{selectedDrug.DosageForm || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Strength</p>
                      <p className="text-white font-medium">{selectedDrug.Strength || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Manufacturer</p>
                      <p className="text-white font-medium">{selectedDrug.ManufacturerName || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2">
                    <ShieldCheck size={16} /> Formulary Eligibility
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Thiqa Eligible</span>
                      {selectedDrug.ThiqaEligible ? <CheckCircle2 size={18} className="text-green-400" /> : <AlertTriangle size={18} className="text-red-400" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">ABM 1 Formulary</span>
                      {selectedDrug.ABM1 ? <CheckCircle2 size={18} className="text-green-400" /> : <AlertTriangle size={18} className="text-red-400" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">ABM 7 Formulary</span>
                      {selectedDrug.ABM7 ? <CheckCircle2 size={18} className="text-green-400" /> : <AlertTriangle size={18} className="text-red-400" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Basic Formulary</span>
                      {selectedDrug.BasicFormulary ? <CheckCircle2 size={18} className="text-green-400" /> : <AlertTriangle size={18} className="text-red-400" />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Info size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Regulatory Note</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      This record is part of the Ministry of Health (MOH) Drug Master registry. Pricing updates are synced every 24 hours. The indicated prices are for pilot simulation purposes only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white/5 border border-white/10 border-dashed rounded-3xl flex flex-col items-center justify-center text-gray-500 p-12 text-center dir-rtl">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                 <Info size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">لم يتم تحديد أي دواء</h3>
              <p className="mt-2 text-sm max-w-sm">قم بالبحث وتحديد صنف من القائمة لعرض تفاصيله وأسعاره وإعدادات التأمين الخاصة به.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyERP;
