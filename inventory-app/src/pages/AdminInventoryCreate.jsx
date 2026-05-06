import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.inventory_name) return setError('Назва є обов\'язковою');

    const data = new FormData();
    data.append('inventory_name', formData.inventory_name);
    data.append('description', formData.description);
    if (photo) data.append('photo', photo);

    try {
      await inventoryApi.create(data);
      navigate('/admin');
    } catch (err) {
      setError('Помилка при збереженні');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-200 mt-10">
      <h2 className="text-2xl font-bold mb-6">Додати інвентар</h2>
      {error && <div className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Назва *</label>
          <input 
            type="text" 
            value={formData.inventory_name}
            onChange={e => setFormData({...formData, inventory_name: e.target.value})}
            className="w-full border border-slate-300 p-2.5 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Опис</label>
          <textarea 
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full border border-slate-300 p-2.5 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none h-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Фото</label>
          <input 
            type="file" 
            onChange={e => setPhoto(e.target.files[0])}
            className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
        <button type="submit" className="mt-4 bg-gradient-to-b from-blue-400 to-blue-500 text-white font-medium py-3 rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:shadow-lg hover:-translate-y-0.5 transition-all">
          Зберегти
        </button>
      </form>
    </div>
  );
} //yea