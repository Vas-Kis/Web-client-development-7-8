export default function ConfirmModal({ onConfirm, onCancel, message }) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white max-w-sm w-full text-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{message}</h3>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">Скасувати</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-[0_4px_10px_rgba(239,68,68,0.3)] transition-all">Видалити</button>
        </div>
      </div>
    </div>
  );
} // hmm