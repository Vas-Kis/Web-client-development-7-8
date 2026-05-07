import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';

export default function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ inventory_name: '', description: '' });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Завантаження поточних даних інвентарю [cite: 78, 79, 80]
  useEffect(() => {
    inventoryApi.getById(id)
      .then(res => {
        setFormData({
          inventory_name: res.data.inventory_name,
          description: res.data.description || ''
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Не вдалося завантажити дані для редагування.');
        setLoading(false);
      });
  }, [id]);

  // 1. Оновлення текстових даних (JSON) [cite: 87, 88, 90]
  const handleTextUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!formData.inventory_name) return setError('Назва є обов\'язковою');

    try {
      await inventoryApi.updateData(id, formData);
      setMessage('Текстові дані успішно оновлено!');
    } catch (err) {
      setError('Помилка при оновленні текстових даних');
    }
  };

  // 2. Оновлення фотографії (multipart/form-data) [cite: 94, 95, 96]
  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!photo) return setError('Оберіть нове фото для завантаження');

    const data = new FormData();
    data.append('photo', photo);

    try {
      await inventoryApi.updatePhoto(id, data);
      setMessage('Фотографію успішно оновлено!');
    } catch (err) {
      setError('Помилка при оновленні фотографії');
    }
  };

  if (loading) return <div className="text-center p-10 text-blue-500">Завантаження...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Редагування інвентарю</h2>
        <button onClick={() => navigate('/admin')} className="text-sm text-slate-500 hover:text-slate-800 underline">Повернутися назад</button>
      </div>

      {message && <div className="mb-4 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">{message}</div>}
      {error && <div className="mb-4 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">1. Оновлення текстових даних</h3>
        <form onSubmit={handleTextUpdate} className="flex flex-col gap-4">
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
              className="w-full border border-slate-300 p-2.5 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none h-24"
            />
          </div>
          <button type="submit" className="self-end bg-blue-50 text-blue-600 font-medium py-2 px-6 rounded-xl hover:bg-blue-100 transition-colors">
            Оновити текст
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-700 mb-4 border-b pb-2">2. Оновлення фотографії</h3>
        <form onSubmit={handlePhotoUpdate} className="flex flex-col gap-4">
          <div>
            <input 
              type="file" 
              onChange={e => setPhoto(e.target.files[0])}
              className="w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>
          <button type="submit" className="self-end bg-blue-50 text-blue-600 font-medium py-2 px-6 rounded-xl hover:bg-blue-100 transition-colors">
            Завантажити нове фото
          </button>
        </form>
      </div>
    </div>
  );
}