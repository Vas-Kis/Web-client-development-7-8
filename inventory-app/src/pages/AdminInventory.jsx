import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inventoryApi } from '../services/inventoryApi';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await inventoryApi.getAll();
      setInventory(res.data);
    } catch (err) {
      setError('Не вдалося завантажити дані');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleDelete = async () => {
    try {
      await inventoryApi.delete(deleteId);
      setInventory(prev => prev.filter(item => item.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      alert('Помилка видалення');
    }
  };

  if (loading) return <div className="p-8 text-center text-blue-500">Завантаження даних...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-700">Управління інвентарем</h1>
        <Link to="/admin/create" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow-[0_4px_10px_rgba(59,130,246,0.3)] transition-all">
          <Plus size={18} className="mr-2" /> Додати позицію
        </Link>
      </div>

      {inventory.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">Інвентар порожній.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="p-4">Фото</th>
                <th className="p-4">Назва</th>
                <th className="p-4">Опис</th>
                <th className="p-4 text-right">Дії</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <img src={item.photo_url || '/placeholder.png'} alt={item.inventory_name} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
                  </td>
                  <td className="p-4 font-medium text-slate-800">{item.inventory_name}</td>
                  <td className="p-4 text-slate-500 truncate max-w-xs">{item.description}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <Link to={`/admin/view/${item.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg inline-block">
                      <Eye size={18} />
                    </Link>
                    <Link to={`/admin/edit/${item.id}`} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg"><Edit size={18} /></Link>
                    <button onClick={() => setDeleteId(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteId && (
        <ConfirmModal 
          onConfirm={handleDelete} 
          onCancel={() => setDeleteId(null)} 
          message="Ви впевнені, що хочете видалити цю позицію?" 
        />
      )}
    </div>
  );
} //hmm