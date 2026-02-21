import React, { useState, useMemo } from 'react';
import { Ticket, Plus, TrendingUp, Users, DollarSign, MoreVertical, Edit2, Trash2, Search, Filter, Download, Eye, ChevronRight, X, CheckCircle2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_VOUCHER_TYPES = [
  { id: 1, name: 'Bono Mensual 8', price: '65€', sessions: 8, sales: 45, revenue: '2.925€', status: 'Active' },
  { id: 2, name: 'Pack 10 Sesiones', price: '120€', sessions: 10, sales: 28, revenue: '3.360€', status: 'Active' },
  { id: 3, name: 'Bono Mensual 4', price: '40€', sessions: 4, sales: 15, revenue: '600€', status: 'Active' },
  { id: 4, name: 'Pack 20 Sesiones', price: '200€', sessions: 20, sales: 8, revenue: '1.600€', status: 'Active' },
  { id: 5, name: 'Clase de Prueba', price: '0€', sessions: 1, sales: 12, revenue: '0€', status: 'Active' },
];

export const VouchersView = () => {
  const [vouchers, setVouchers] = useState(INITIAL_VOUCHER_TYPES);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingVoucher, setEditingVoucher] = useState<any>(null);
  const [viewingVoucher, setViewingVoucher] = useState<any>(null);
  const [voucherToDelete, setVoucherToDelete] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredVouchers = useMemo(() => {
    return vouchers.filter(v => 
      v.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [vouchers, searchQuery]);

  const confirmDelete = (id: number) => {
    setVoucherToDelete(id);
  };

  const executeDelete = () => {
    if (voucherToDelete) {
      setVouchers(prev => prev.filter(v => v.id !== voucherToDelete));
      setVoucherToDelete(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newVoucher = {
      id: editingVoucher ? editingVoucher.id : Date.now(),
      name: formData.get('name') as string,
      price: formData.get('price') as string,
      sessions: parseInt(formData.get('sessions') as string) || 8,
      sales: editingVoucher ? editingVoucher.sales : 0,
      revenue: editingVoucher ? editingVoucher.revenue : '0€',
      status: 'Active'
    };

    if (editingVoucher) {
      setVouchers(prev => prev.map(v => v.id === editingVoucher.id ? newVoucher : v));
    } else {
      setVouchers(prev => [newVoucher, ...prev]);
    }

    setIsSidebarOpen(false);
    setEditingVoucher(null);
  };

  const openEdit = (voucher: any) => {
    setEditingVoucher(voucher);
    setIsSidebarOpen(true);
  };

  const openView = (voucher: any) => {
    setViewingVoucher(voucher);
  };

  return (
    <div className="p-8 space-y-8 relative min-h-screen">
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {voucherToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setVoucherToDelete(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">¿Eliminar Bono?</h4>
              <p className="text-slate-500 text-sm mb-8">Esta acción eliminará este tipo de bono del catálogo.</p>
              <div className="flex gap-3">
                <button onClick={() => setVoucherToDelete(null)} className="flex-1 py-3 bg-slate-50 text-slate-400 font-bold rounded-xl hover:bg-slate-100 transition-colors">Cancelar</button>
                <button onClick={executeDelete} className="flex-1 py-3 bg-red-600 text-white font-black rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all">Eliminar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Voucher Modal */}
      <AnimatePresence>
        {viewingVoucher && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setViewingVoucher(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-blue-600/20">
                      <Ticket size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{viewingVoucher.name}</h3>
                      <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-1">Catálogo de Tarifas</p>
                    </div>
                  </div>
                  <button onClick={() => setViewingVoucher(null)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-3xl space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio</p>
                    <p className="text-2xl font-black text-slate-900">{viewingVoucher.price}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesiones</p>
                    <p className="text-2xl font-black text-slate-900">{viewingVoucher.sessions}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ventas Totales</p>
                    <p className="text-2xl font-black text-slate-900">{viewingVoucher.sales}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recaudación</p>
                    <p className="text-2xl font-black text-blue-600">{viewingVoucher.revenue}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setViewingVoucher(null); openEdit(viewingVoucher); }} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">
                    Editar Bono
                  </button>
                  <button onClick={() => { setViewingVoucher(null); confirmDelete(viewingVoucher.id); }} className="px-6 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-100 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit/New Voucher Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                <h3 className="text-xl font-black text-slate-900">{editingVoucher ? 'Editar Bono' : 'Nuevo Bono'}</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Nombre del Bono</label>
                    <input name="name" required defaultValue={editingVoucher?.name} type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" placeholder="Ej. Bono Mensual 8" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Precio</label>
                      <input name="price" required defaultValue={editingVoucher?.price} type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" placeholder="65€" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Sesiones</label>
                      <input name="sessions" required defaultValue={editingVoucher?.sessions} type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsSidebarOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl hover:bg-slate-100 transition-colors">Cancelar</button>
                  <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                    {editingVoucher ? 'Guardar Cambios' : 'Crear Bono'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Gestión de Bonos</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Configuración de tarifas y seguimiento de ventas</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar bono..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 font-medium"
            />
          </div>
          <button 
            onClick={() => { setEditingVoucher(null); setIsSidebarOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            <Plus size={18} />
            Nuevo Tipo de Bono
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <Ticket size={24} />
            </div>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+8%</span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bonos Activos</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">108</h3>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+15%</span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nuevas Ventas</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">24</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-[32px] shadow-xl shadow-slate-900/20 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center">
              <DollarSign size={24} />
            </div>
            <TrendingUp size={20} className="text-blue-400" />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ingresos por Bonos</p>
          <h3 className="text-3xl font-black mt-1">8.485€</h3>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h4 className="font-black text-slate-900">Catálogo de Bonos</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre del Bono</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesiones</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ventas</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Recaudación</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredVouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <Ticket size={20} />
                      </div>
                      <span className="font-bold text-slate-900">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-600">{v.sessions} sesiones</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-blue-600">{v.price}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-600">{v.sales}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">{v.revenue}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openView(v)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => openEdit(v)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => confirmDelete(v.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
