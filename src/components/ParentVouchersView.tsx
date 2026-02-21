import React from 'react';
import { Ticket, Calendar, Clock, CheckCircle2, ChevronRight, Plus, Download, FileText, AlertCircle } from 'lucide-react';

const ACTIVITY = [
  { id: 1, date: '21 Feb, 2026', type: 'Entrenamiento', group: 'Benjamín A', coach: 'Carlos R.', status: 'Presente' },
  { id: 2, date: '18 Feb, 2026', type: 'Entrenamiento', group: 'Benjamín A', coach: 'Carlos R.', status: 'Presente' },
  { id: 3, date: '14 Feb, 2026', type: 'Entrenamiento', group: 'Benjamín A', coach: 'Carlos R.', status: 'Ausente' },
  { id: 4, date: '11 Feb, 2026', type: 'Entrenamiento', group: 'Benjamín A', coach: 'Carlos R.', status: 'Presente' },
];

export const ParentVouchersView = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mi Panel de Usuario</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Control de bonos, asistencia y documentación</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all">
          <Plus size={18} />
          Renovar Bono
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voucher Card */}
        <div className="lg:col-span-1 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-bl-full -mr-20 -mt-20 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
              <Ticket size={32} />
            </div>
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Bono Mensual Activo</p>
            <h3 className="text-4xl font-black text-slate-900 mb-8">8 Sesiones</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sesiones Consumidas</p>
                <p className="text-3xl font-black text-slate-900">5 / 8</p>
              </div>
              <div className="h-5 bg-slate-100 rounded-full overflow-hidden p-1">
                <div className="h-full bg-blue-600 rounded-full shadow-sm" style={{ width: '62.5%' }}></div>
              </div>
              <div className="pt-4">
                <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100 text-center">
                  <p className="text-blue-900 font-black text-xl">Quedan 3 sesiones</p>
                  <p className="text-blue-700 text-[10px] font-bold uppercase tracking-widest mt-1">Expira en 12 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity History */}
        <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between">
            <h4 className="text-xl font-black text-slate-900">Historial de Actividad</h4>
            <button className="text-blue-600 font-bold text-sm hover:underline">Descargar Reporte</button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-50">
              {ACTIVITY.map((item) => (
                <div key={item.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      item.status === 'Presente' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{item.date}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                        {item.type} • {item.group} • Coach: {item.coach}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'Presente' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-slate-900 rounded-[48px] p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-black mb-4">Gestión Documental</h3>
            <p className="text-slate-400 font-medium mb-8">Sube la ficha federativa y el seguro médico de tu hijo directamente desde aquí. Mantén su expediente siempre al día.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-white/10 rounded-3xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <FileText className="text-blue-400" />
                  <div>
                    <p className="font-bold">Ficha Federativa 2026</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Estado: Pendiente de subida</p>
                  </div>
                </div>
                <Plus size={20} className="text-blue-400 group-hover:scale-125 transition-transform" />
              </div>
              <div className="flex items-center justify-between p-6 bg-white/10 rounded-3xl border border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="text-emerald-500" />
                  <div>
                    <p className="font-bold">Seguro Médico</p>
                    <p className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-widest">Estado: Validado</p>
                  </div>
                </div>
                <Download size={20} className="text-slate-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <AlertCircle className="text-orange-500" size={32} />
              <h4 className="text-xl font-black">Aviso Importante</h4>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Recuerda que para participar en el próximo torneo de Marzo, todos los alumnos deben tener la **Ficha Federativa** validada antes del día 28 de Febrero.
            </p>
            <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-50 transition-all">
              Subir Documentación Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
