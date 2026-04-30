import { X } from 'lucide-react';

export default function InventoryQuickView({ item, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white/95 border border-white shadow-2xl rounded-3xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row relative">
        <button onClick={onClose} className="absolute top-4 right-4 bg-black/10 hover:bg-black/20 p-2 rounded-full text-slate-700 transition-colors z-10">
          <X size={20} />
        </button>
        <div className="md:w-1/2 bg-slate-100 relative">
           <img src={item.photo_url || '/placeholder.png'} alt={item.inventory_name} className="w-full h-full object-cover min-h-[300px]" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{item.inventory_name}</h2>
          <p className="text-slate-600 leading-relaxed mb-6">{item.description || 'Опис відсутній.'}</p>
        </div>
      </div>
    </div>
  );
}