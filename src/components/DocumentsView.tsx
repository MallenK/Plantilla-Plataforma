import React, { useState } from 'react';
import { FolderOpen, FileText, CheckCircle2, AlertCircle, Clock, Search, Filter, MoreVertical, Download, Plus, X, Eye, Trash2, FileUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FOLDERS = [
  { id: 1, name: 'Lucas García', count: 4, status: 'valid', files: [
    { name: 'Ficha Federativa 2026.pdf', date: '12 Feb, 2026', size: '1.2 MB', status: 'valid' },
    { name: 'Seguro Médico.pdf', date: '10 Feb, 2026', size: '0.8 MB', status: 'valid' },
    { name: 'DNI Frontal.jpg', date: '05 Feb, 2026', size: '2.4 MB', status: 'valid' },
    { name: 'Autorización Viajes.pdf', date: '20 Jan, 2026', size: '0.5 MB', status: 'valid' },
  ]},
  { id: 2, name: 'Mateo Rodríguez', count: 2, status: 'pending', files: [
    { name: 'Ficha Federativa 2026.pdf', date: '15 Feb, 2026', size: '1.1 MB', status: 'pending' },
    { name: 'DNI Frontal.jpg', date: '14 Feb, 2026', size: '2.1 MB', status: 'valid' },
  ]},
  { id: 3, name: 'Sofía Martínez', count: 5, status: 'valid', files: [] },
  { id: 4, name: 'Hugo López', count: 1, status: 'expired', files: [] },
  { id: 5, name: 'Leo Sánchez', count: 3, status: 'pending', files: [] },
  { id: 6, name: 'Daniel Ruiz', count: 4, status: 'valid', files: [] },
];

export const DocumentsView = () => {
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFolders = FOLDERS.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 relative min-h-screen">
      {/* Individual Student Document View */}
      <AnimatePresence>
        {selectedFolder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedFolder(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                    <FolderOpen size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">{selectedFolder.name}</h3>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Expediente Digital de Alumno</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
                    <FileUp size={18} />
                    Subir Archivo
                  </button>
                  <button onClick={() => setSelectedFolder(null)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Archivos en la carpeta ({selectedFolder.files?.length || 0})</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado Global:</span>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         selectedFolder.status === 'valid' ? 'bg-emerald-50 text-emerald-600' : 
                         selectedFolder.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                       }`}>
                         {selectedFolder.status === 'valid' ? 'Validado' : selectedFolder.status === 'pending' ? 'Pendiente' : 'Expirado'}
                       </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {selectedFolder.files?.length > 0 ? selectedFolder.files.map((file: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-blue-600 transition-colors">
                            <FileText size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{file.name}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{file.date}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{file.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                            file.status === 'valid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {file.status === 'valid' ? 'Válido' : 'Pendiente'}
                          </span>
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all">
                            <Download size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                          <FolderOpen size={40} />
                        </div>
                        <p className="text-slate-400 font-bold">Esta carpeta está vacía</p>
                        <button className="text-blue-600 font-black text-xs uppercase tracking-widest">Subir el primer documento</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-900 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-black text-sm">Última actualización</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hace 2 días por Admin</p>
                  </div>
                </div>
                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all">
                  Validar Todo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Repositorio de Documentos</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Gestión de fichas, seguros y autorizaciones</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar carpeta..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 font-medium" 
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredFolders.map((folder) => (
          <div 
            key={folder.id} 
            onClick={() => setSelectedFolder(folder)}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <FolderOpen size={32} />
              </div>
              <div className="flex items-center gap-2">
                {folder.status === 'valid' ? <CheckCircle2 size={18} className="text-emerald-500" /> : 
                 folder.status === 'pending' ? <Clock size={18} className="text-orange-500" /> : 
                 <AlertCircle size={18} className="text-red-500" />}
                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
            <h4 className="font-black text-slate-900 text-xl truncate">{folder.name}</h4>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2 text-slate-400">
                <FileText size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">{folder.count} archivos</span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-8 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/30 transition-all group min-h-[240px]">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
            <Plus size={32} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-black text-xs uppercase tracking-widest text-center">Nueva Carpeta de Alumno</span>
        </button>
      </div>

      <div className="bg-blue-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">Validación Masiva</h3>
            <p className="text-blue-100 text-sm">¿Tienes muchos documentos pendientes? Utiliza nuestra herramienta de validación rápida para procesar fichas federativas en lote.</p>
          </div>
          <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-2xl shadow-xl hover:bg-blue-50 transition-all shrink-0">
            Comenzar Validación
          </button>
        </div>
      </div>
    </div>
  );
};
