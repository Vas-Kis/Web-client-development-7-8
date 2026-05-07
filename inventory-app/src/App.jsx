import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './store/FavoritesContext';
import AdminInventoryEdit from './pages/AdminInventoryEdit';

function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6 font-medium text-slate-600">
          <Link to="/gallery" className="hover:text-blue-500 transition-colors">Галерея</Link>
          <Link to="/favorites" className="hover:text-red-500 transition-colors">Улюблені</Link>
        </div>
        <Link to="/admin" className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
          Адмін-панель
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-slate-50/50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
} //another commit 

//a-a-and one more