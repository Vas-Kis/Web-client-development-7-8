import { useFavorites } from '../store/FavoritesContext';
import InventoryCard from '../components/gallery/InventoryCard';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8 flex items-center gap-2">
        Мої улюблені
      </h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-white rounded-3xl shadow-sm">
          У вас ще немає улюблених предметів.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(item => (
            <InventoryCard key={item.id} item={item} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}