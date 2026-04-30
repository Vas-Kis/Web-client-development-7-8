import { Heart } from 'lucide-react';
import { useFavorites } from '../../store/FavoritesContext';

export default function InventoryCard({ item, onClick }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const active = isFavorite(item.id);

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-50">
        <img 
          src={item.photo_url || '/placeholder.png'} 
          alt={item.inventory_name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <div className="p-5 relative flex-grow flex items-center justify-between bg-gradient-to-b from-white to-slate-50/50">
        <h3 className="font-semibold text-lg text-slate-800 truncate pr-4">{item.inventory_name}</h3>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
          className={`absolute -top-6 right-4 p-3 rounded-full shadow-lg backdrop-blur-md transition-colors ${active ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-400 hover:text-red-500'}`}
        >
          <Heart size={20} fill={active ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}