import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Запит GET /inventory/:id згідно з вимогами
    inventoryApi.getById(id)
      .then(res => setItem(res.data))
      .catch(() => setError('Не вдалося завантажити деталі інвентарю'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center p-10 text-blue-500 font-medium">Завантаження...</div>;
  if (error) return <div className="text-center p-10 text-red-500 font-medium">{error}</div>;
  if (!item) return <div className="text-center p-10 text-slate-500">Позицію не знайдено</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-2xl font-bold text-slate-800">Деталі інвентарю</h2>
          <Link to="/admin" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 font-medium px-4 py-2 rounded-xl transition-all">
            Повернутися назад
          </Link>
        </div>
        
        <div className="p-8 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <img
              src={item.photo_url || '/placeholder.png'}
              alt={item.inventory_name}
              className="w-full h-auto rounded-2xl object-cover shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold text-slate-800 mb-6">{item.inventory_name}</h3>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Опис</h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                {item.description || 'Опис відсутній.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}