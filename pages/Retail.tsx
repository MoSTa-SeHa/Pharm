
import React, { useState } from 'react';
import { ShoppingCart, Search, User, CreditCard, Banknote, Tag, Trash2, CheckCircle2, Mic, ReceiptText } from 'lucide-react';

const Retail: React.FC = () => {
  const [cart, setCart] = useState([
    { id: 1, name: 'Panadol Advance 500mg (24s)', price: 12.50, qty: 2, insurance: 'Thiqa' },
    { id: 2, name: 'Nexium 40mg (14s)', price: 145.00, qty: 1, insurance: 'Cash' },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      setTimeout(() => setOrderComplete(false), 3000);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-500">
      {/* Search & Selection */}
      <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-hidden">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4 shadow-xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="F2: Scan Barcode or Search Drug..." 
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-lg focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm text-gray-300">
            <Mic size={18} className="text-blue-400" /> Voice Entry
          </button>
        </div>

        <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <ShoppingCart size={20} className="text-blue-400" /> Active Session <span className="text-gray-500 font-mono text-sm ml-2">#89122</span>
            </h3>
            <div className="flex gap-4">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/5">Op: Sarah A.</span>
              <span className="text-[10px] text-green-400 font-bold uppercase animate-pulse flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> SYNCED
              </span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="text-[10px] uppercase font-bold text-gray-500 bg-black/20 sticky top-0 z-10">
                <tr>
                  <th className="px-8 py-4 text-left">Item Description</th>
                  <th className="px-8 py-4 text-center">Qty</th>
                  <th className="px-8 py-4 text-right">Unit Price</th>
                  <th className="px-8 py-4 text-center">Coverage</th>
                  <th className="px-8 py-4 text-right">Subtotal</th>
                  <th className="px-8 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cart.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-500/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">{item.name}</div>
                      <div className="text-[10px] text-blue-400/60 uppercase tracking-widest font-bold mt-1">MOH Approved</div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
                        <button className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-gray-400">-</button>
                        <span className="text-sm font-bold w-6 text-center text-white">{item.qty}</span>
                        <button className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-gray-400">+</button>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-mono text-xs text-gray-500">AED {item.price.toFixed(2)}</td>
                    <td className="px-8 py-6 text-center">
                       <span className={`text-[9px] font-black px-2.5 py-1 rounded-full tracking-tighter ${
                         item.insurance === 'Thiqa' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-white/10'
                       }`}>
                         {item.insurance.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-white text-sm">AED {(item.price * item.qty).toFixed(2)}</td>
                    <td className="px-8 py-6 text-right">
                       <button className="text-gray-700 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/5">
                         <Trash2 size={16} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 border-t border-white/10 bg-black/40 flex justify-between items-center backdrop-blur-xl">
             <div className="flex gap-10">
                <div className="group cursor-help">
                   <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2 group-hover:text-blue-400 transition-colors">Total Items</p>
                   <p className="text-2xl font-black text-white">{cart.length}</p>
                </div>
                <div className="group cursor-help">
                   <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2 group-hover:text-green-400 transition-colors">Insurance Savings</p>
                   <div className="flex items-center gap-2">
                     <p className="text-2xl font-black text-green-400">AED 2.50</p>
                     <span className="text-[10px] text-green-500/50 font-bold uppercase">Applied</span>
                   </div>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-2">Grand Terminal Total</p>
                <p className="text-5xl font-black text-white tracking-tighter">AED {total.toFixed(2)}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Payment & Patient */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <User size={80} />
          </div>
          <div className="flex items-center gap-3">
             <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
               <User size={20} />
             </div>
             <h3 className="font-bold text-white uppercase tracking-wider text-sm">Patient Context</h3>
          </div>
          <div className="p-5 bg-black/60 rounded-2xl border border-white/10 flex gap-4 items-center group-hover:border-blue-500/30 transition-colors">
             <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center font-black text-xl text-white shadow-lg">JD</div>
             <div className="flex-1">
                <h4 className="font-bold text-white text-base">John Doe</h4>
                <p className="text-[10px] text-gray-500 font-mono mt-0.5 tracking-tighter">EMIRATES ID: 784-1992-001239-1</p>
             </div>
             <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[9px] font-black rounded border border-green-500/20">VALID</div>
          </div>
          <button className="w-full py-3.5 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest">
            Switch Record (F4)
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl relative">
           {orderComplete && (
              <div className="absolute inset-0 bg-[#0b1020]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in">
                 <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 border border-green-500/40">
                   <CheckCircle2 size={40} className="text-green-500" />
                 </div>
                 <h4 className="text-2xl font-black text-white">Order Processed</h4>
                 <p className="text-sm text-gray-400 mt-2">Inventory updated & Claim #MP-9912 submitted successfully.</p>
                 <button onClick={() => setOrderComplete(false)} className="mt-6 text-blue-400 text-xs font-bold uppercase underline">New Sale</button>
              </div>
           )}
           
           <h3 className="font-bold text-white mb-2 uppercase tracking-wider text-sm flex items-center gap-2">
             <CreditCard size={18} className="text-blue-400" /> Payment Gateway
           </h3>
           <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-3 p-6 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 transition-all border border-blue-500/50 hover:brightness-110 active:scale-95">
                <CreditCard size={24} />
                <span className="text-[10px] font-black tracking-widest uppercase">E-Pay</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                <Banknote size={24} className="text-green-400" />
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Cash</span>
              </button>
           </div>
           
           <div className="p-5 bg-black/40 border border-white/10 rounded-2xl space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-white font-mono font-bold">AED {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">MOH VAT (5%)</span>
                <span className="text-white font-mono font-bold">AED {(total * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-gray-300 font-black uppercase tracking-[0.2em] text-xs">Payable</span>
                <div className="text-right">
                  <span className="text-blue-400 font-black text-2xl font-mono leading-none">AED {(total * 1.05).toFixed(2)}</span>
                  <p className="text-[9px] text-gray-600 font-bold mt-1">Terminal ID: MP-OS-001</p>
                </div>
              </div>
           </div>
           
           <button 
             onClick={handleProcess}
             disabled={isProcessing}
             className={`w-full py-5 rounded-2xl font-black text-xl tracking-widest shadow-2xl transition-all group overflow-hidden relative ${
               isProcessing 
                 ? 'bg-blue-600/50 cursor-not-allowed' 
                 : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
             }`}
           >
             <div className="relative z-10 flex items-center justify-center gap-3">
               {isProcessing ? (
                 <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> UPDATING DB</>
               ) : (
                 <>PROCESS FINAL <ReceiptText size={24} /></>
               )}
             </div>
             {!isProcessing && (
                <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine"></div>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default Retail;
