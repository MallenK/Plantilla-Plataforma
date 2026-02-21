import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Filter, Eye, Edit2, Trash2, 
  X, User, Mail, Phone, Calendar, Trophy, 
  CheckCircle2, Clock, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Lucas García', age: 10, level: 'Avanzado', status: 'Active', sessions: '5/8', docs: 'valid' },
  { id: 2, name: 'Mateo Rodríguez', age: 8, level: 'Iniciación', status: 'Active', sessions: '2/10', docs: 'pending' },
  { id: 3, name: 'Sofía Martínez', age: 11, level: 'Intermedio', status: 'Active', sessions: '7/8', docs: 'valid' },
  { id: 4, name: 'Hugo López', age: 9, level: 'Avanzado', status: 'Waiting', sessions: '-', docs: 'pending' },
  { id: 5, name: 'Leo Sánchez', age: 7, level: 'Iniciación', status: 'Waiting', sessions: '-', docs: 'expired' },
];

export const StudentModule = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [activeTab, setActiveTab] = useState<'all' | 'waiting'>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [viewingStudent, setViewingStudent] = useState<any>(null);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesTab = activeTab === 'all' ? s.status === 'Active' : s.status === 'Waiting';
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = levelFilter === 'All' || s.level === levelFilter;
      return matchesTab && matchesSearch && matchesLevel;
    });
  }, [students, activeTab, searchQuery, levelFilter]);

  const confirmDelete = (id: number) => {
    setStudentToDelete(id);
  };

  const executeDelete = () => {
    if (studentToDelete) {
      setStudents(prev => prev.filter(s => s.id !== studentToDelete));
      setStudentToDelete(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newStudent = {
      id: editingStudent ? editingStudent.id : Date.now(),
      name: formData.get('name') as string,
      age: parseInt(formData.get('age') as string) || 10,
      level: formData.get('level') as string,
      status: activeTab === 'waiting' ? 'Waiting' : 'Active',
      sessions: editingStudent ? editingStudent.sessions : (activeTab === 'waiting' ? '-' : '0/8'),
      docs: editingStudent ? editingStudent.docs : 'pending'
    };

    if (editingStudent) {
      setStudents(prev => prev.map(s => s.id === editingStudent.id ? newStudent : s));
    } else {
      setStudents(prev => [newStudent, ...prev]);
    }

    setIsSidebarOpen(false);
    setEditingStudent(null);
  };

  const openEdit = (student: any) => {
    setEditingStudent(student);
    setIsSidebarOpen(true);
  };

  const openView = (student: any) => {
    setViewingStudent(student);
  };

  return (
    <div className="p-8 space-y-6 relative min-h-screen">
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {studentToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setStudentToDelete(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">¿Eliminar Alumno?</h4>
              <p className="text-slate-500 text-sm mb-8">Esta acción no se puede deshacer. Se perderán todos los datos del alumno.</p>
              <div className="flex gap-3">
                <button onClick={() => setStudentToDelete(null)} className="flex-1 py-3 bg-slate-50 text-slate-400 font-bold rounded-xl hover:bg-slate-100 transition-colors">Cancelar</button>
                <button onClick={executeDelete} className="flex-1 py-3 bg-red-600 text-white font-black rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all">Eliminar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Student Modal */}
      <AnimatePresence>
        {viewingStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setViewingStudent(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-blue-600/20">
                      {viewingStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-900">{viewingStudent.name}</h3>
                      <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-1">ID: #STU-{viewingStudent.id}</p>
                    </div>
                  </div>
                  <button onClick={() => setViewingStudent(null)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Información Académica</p>
                      <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Nivel</span>
                          <span className="text-sm font-black text-slate-900">{viewingStudent.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Edad</span>
                          <span className="text-sm font-black text-slate-900">{viewingStudent.age} años</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-500">Estado</span>
                          <span className="text-sm font-black text-emerald-600">{viewingStudent.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bonos y Sesiones</p>
                      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-blue-900">Sesiones Consumidas</span>
                          <span className="text-lg font-black text-blue-600">{viewingStudent.sessions}</span>
                        </div>
                        <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documentación</p>
                      <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Ficha Federativa</span>
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Seguro Médico</span>
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Autorización</span>
                          <Clock size={16} className="text-orange-500" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contacto Tutor</p>
                      <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                        <p className="text-sm font-bold text-slate-700">tutor@ejemplo.com</p>
                        <p className="text-sm font-bold text-slate-700">+34 600 000 000</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={() => { setViewingStudent(null); openEdit(viewingStudent); }} className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <Edit2 size={18} /> Editar Perfil
                  </button>
                  <button onClick={() => { setViewingStudent(null); confirmDelete(viewingStudent.id); }} className="px-6 py-4 bg-red-50 text-red-600 font-black rounded-2xl hover:bg-red-100 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Gestión de Alumnos</h2>
          <div className="flex items-center gap-1 mt-2 bg-slate-100 p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Alumnos Activos
            </button>
            <button 
              onClick={() => setActiveTab('waiting')}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'waiting' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Lista de Espera
              <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-md text-[10px]">
                {students.filter(s => s.status === 'Waiting').length}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 font-medium"
            />
          </div>
          <select 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-xs focus:outline-none"
          >
            <option value="All">Todos los Niveles</option>
            <option value="Iniciación">Iniciación</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          <button 
            onClick={() => { setEditingStudent(null); setIsSidebarOpen(true); }}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            <Plus size={18} />
            Añadir Alumno
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Alumno</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nivel</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesiones</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Documentación</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredStudents.length > 0 ? filteredStudents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{s.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.age} años</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    s.level === 'Avanzado' ? 'bg-purple-50 text-purple-600' : 
                    s.level === 'Intermedio' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {s.level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    s.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {s.status === 'Active' ? 'Activo' : 'En Espera'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-700">{s.sessions}</span>
                    {s.sessions !== '-' && <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-2/3"></div>
                    </div>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {s.docs === 'valid' ? <CheckCircle2 size={16} className="text-emerald-500" /> : 
                     s.docs === 'pending' ? <Clock size={16} className="text-orange-500" /> : 
                     <AlertCircle size={16} className="text-red-500" />}
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                      {s.docs === 'valid' ? 'Válida' : s.docs === 'pending' ? 'Pendiente' : 'Expirada'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openView(s)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Eye size={16} /></button>
                    <button onClick={() => openEdit(s)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={16} /></button>
                    <button onClick={() => confirmDelete(s.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-bold">
                  No se encontraron alumnos con los criterios seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                <h3 className="text-xl font-black text-slate-900">{editingStudent ? 'Editar Alumno' : 'Nuevo Alumno'}</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-8 space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Información Personal</p>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Nombre Completo</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input name="name" required defaultValue={editingStudent?.name} type="text" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" placeholder="Ej. Lucas García" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Edad</label>
                        <input name="age" required defaultValue={editingStudent?.age} type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Nivel</label>
                        <select name="level" defaultValue={editingStudent?.level || 'Iniciación'} className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700">
                          <option>Iniciación</option>
                          <option>Intermedio</option>
                          <option>Avanzado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Contacto Tutor</p>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="email" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" placeholder="tutor@ejemplo.com" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input type="tel" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" placeholder="+34 600 000 000" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Bono de Bienvenida</p>
                    <p className="text-[10px] text-blue-700 font-bold">Se asignará automáticamente un pack de 4 sesiones al activar.</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setIsSidebarOpen(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl hover:bg-slate-100 transition-colors">Cancelar</button>
                  <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                    {editingStudent ? 'Guardar Cambios' : 'Crear Alumno'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
