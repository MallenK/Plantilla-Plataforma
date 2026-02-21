import React, { useState } from 'react';
import { 
  Users, Trophy, GripVertical, Search, 
  Plus, Calendar, MapPin, ChevronRight, 
  CheckCircle2, UserPlus 
} from 'lucide-react';
import { motion } from 'motion/react';

const UNASSIGNED_STUDENTS = [
  { id: 10, name: 'Daniel Ruiz', level: 'Avanzado' },
  { id: 11, name: 'Elena Gil', level: 'Intermedio' },
  { id: 12, name: 'Pablo Sanz', level: 'Iniciación' },
  { id: 13, name: 'Carla Toro', level: 'Avanzado' },
];

const TARGETS = [
  { id: 1, name: 'Grupo Benjamín A', type: 'Class', count: 8, max: 12 },
  { id: 2, name: 'Copa Primavera', type: 'Tournament', count: 14, max: 20 },
  { id: 3, name: 'Alevín B', type: 'Class', count: 10, max: 10 },
];

export const OrganizerView = () => {
  const [activeView, setActiveView] = useState<'assign' | 'create-tournament'>('assign');

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Organizador</h2>
          <p className="text-slate-400">Gestiona asignaciones y eventos</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveView('assign')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeView === 'assign' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Asignaciones
          </button>
          <button 
            onClick={() => setActiveView('create-tournament')}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeView === 'create-tournament' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Nuevo Torneo
          </button>
        </div>
      </div>

      {activeView === 'assign' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Source: Unassigned Students */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[600px]">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                Alumnos Disponibles
              </h3>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Filtrar..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs focus:outline-none" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {UNASSIGNED_STUDENTS.map((s) => (
                <div key={s.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between group cursor-grab active:cursor-grabbing hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical size={14} className="text-slate-300" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{s.name}</p>
                      <p className="text-[10px] text-slate-400">{s.level}</p>
                    </div>
                  </div>
                  <button className="p-1.5 text-blue-600 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <UserPlus size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Targets: Classes & Tournaments */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TARGETS.map((t) => (
                <div key={t.id} className={`bg-white p-6 rounded-3xl border transition-all ${
                  t.count >= t.max ? 'border-orange-100 bg-orange-50/20' : 'border-slate-100 hover:border-blue-200'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      t.type === 'Class' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>
                      {t.type === 'Class' ? <Calendar size={24} /> : <Trophy size={24} />}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                      t.type === 'Class' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {t.type === 'Class' ? 'CLASE' : 'TORNEO'}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">{t.name}</h4>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Ocupación</span>
                      <span className={t.count >= t.max ? 'text-orange-600' : 'text-slate-700'}>
                        {t.count} / {t.max}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${t.count >= t.max ? 'bg-orange-500' : 'bg-blue-600'}`} 
                        style={{ width: `${(t.count / t.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="w-full mt-6 py-2.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all">
                    Ver Inscritos
                  </button>
                </div>
              ))}
              <button className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
                <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm">Crear Nueva Clase</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h3 className="text-xl font-bold text-slate-800">Configuración de Torneo</h3>
            <p className="text-slate-400 text-sm">Completa los detalles para publicar el evento</p>
          </div>
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Nombre del Torneo</label>
                <input type="text" placeholder="Ej. Copa de Verano 2026" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Sede / Ubicación</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" placeholder="Ej. Polideportivo Municipal" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Fecha del Evento</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="date" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Nivel Requerido</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option>Todos los niveles</option>
                  <option>Avanzado / Élite</option>
                  <option>Intermedio</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-700">Seleccionar Alumnos Inscritos</label>
              <div className="p-6 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                <Users size={32} className="mb-2" />
                <p className="text-sm font-medium">Haz clic para añadir alumnos de la base de datos</p>
                <button className="mt-4 px-6 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors">
                  Abrir Selector
                </button>
              </div>
            </div>
          </div>
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button onClick={() => setActiveView('assign')} className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
              Cancelar
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2">
              <CheckCircle2 size={18} />
              Crear Torneo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
