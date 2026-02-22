import React, { useState } from 'react';
import { CheckCircle2, XCircle, User, MapPin, Clock, MessageSquare, Save, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CLASSES = [
  { id: 1, group: 'Benjamín A', field: 'Campo 3', time: '17:00 - 18:30', level: 'Avanzado', students: [
    { id: 1, name: 'Lucas García', present: false, report: '' },
    { id: 2, name: 'Mateo Rodríguez', present: false, report: '' },
    { id: 3, name: 'Hugo López', present: false, report: '' },
    { id: 4, name: 'Leo Sánchez', present: false, report: '' },
  ]},
  { id: 2, group: 'Alevín B', field: 'Campo 1', time: '18:30 - 20:00', level: 'Intermedio', students: [
    { id: 5, name: 'Sofía Martínez', present: false, report: '' },
    { id: 6, name: 'Daniel Ruiz', present: false, report: '' },
  ]}
];

export const CoachAttendanceView = () => {
  const [selectedClass, setSelectedClass] = useState<typeof CLASSES[0] | null>(null);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [reports, setReports] = useState<Record<number, string>>({});
  const [showReportModal, setShowReportModal] = useState<number | null>(null);

  const handleToggleAttendance = (studentId: number) => {
    setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleSaveReport = (studentId: number, text: string) => {
    setReports(prev => ({ ...prev, [studentId]: text }));
    setShowReportModal(null);
  };

  if (selectedClass) {
    return (
      <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6 pb-24 lg:pb-8">
        <button 
          onClick={() => setSelectedClass(null)}
          className="text-sm font-bold text-blue-600 flex items-center gap-2 mb-4"
        >
          <ChevronRight size={16} className="rotate-180" />
          Volver a mis clases
        </button>

        <div className="bg-slate-900 rounded-[32px] p-6 lg:p-8 text-white shadow-xl shadow-slate-900/20">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 bg-blue-600 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-widest">En Directo</span>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] lg:text-xs">
              <Clock size={14} /> {selectedClass.time}
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black">{selectedClass.group}</h2>
          <div className="flex flex-wrap items-center gap-3 lg:gap-4 mt-2 text-slate-400 text-[10px] lg:text-sm">
            <span className="flex items-center gap-1"><MapPin size={14} /> {selectedClass.field}</span>
            <span className="hidden sm:inline">•</span>
            <span>Nivel {selectedClass.level}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-black text-slate-900 px-2">Pase de Lista Digital</h3>
          {selectedClass.students.map((student) => (
            <div key={student.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <User size={24} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">{student.name}</p>
                  <p className="text-[8px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">
                    {reports[student.id] ? 'Reporte Técnico Listo' : 'Sin Observaciones'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => setShowReportModal(student.id)}
                  className={`flex-1 sm:flex-none p-3 rounded-xl transition-all flex items-center justify-center ${reports[student.id] ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                  <MessageSquare size={20} />
                </button>
                <button 
                  onClick={() => handleToggleAttendance(student.id)}
                  className={`flex-[2] sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
                    attendance[student.id] 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {attendance[student.id] ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  {attendance[student.id] ? 'Presente' : 'Ausente'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm lg:text-base">
            <Save size={20} />
            Finalizar Sesión
          </button>
          <p className="text-center text-[8px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
            Al finalizar, se notificará a los padres y se actualizarán los expedientes
          </p>
        </div>

        {/* Report Modal Simulation */}
        <AnimatePresence>
          {showReportModal !== null && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowReportModal(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden"
              >
                <div className="p-6 lg:p-8 space-y-6">
                  <h4 className="text-lg lg:text-xl font-black text-slate-900">Reporte Técnico: {selectedClass.students.find(s => s.id === showReportModal)?.name}</h4>
                  <textarea 
                    className="w-full h-40 p-4 lg:p-6 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-slate-700 text-sm lg:text-base"
                    placeholder="Escribe aquí tus observaciones sobre el entrenamiento, actitud, técnica..."
                    defaultValue={reports[showReportModal] || ''}
                    id="report-textarea"
                  />
                  <div className="flex gap-3">
                    <button onClick={() => setShowReportModal(null)} className="flex-1 py-4 bg-slate-50 text-slate-400 font-bold rounded-2xl hover:bg-slate-100 transition-colors text-sm">Cancelar</button>
                    <button 
                      onClick={() => {
                        const val = (document.getElementById('report-textarea') as HTMLTextAreaElement).value;
                        handleSaveReport(showReportModal, val);
                      }}
                      className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all text-sm"
                    >
                      Guardar Reporte
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8 pb-24 lg:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Mis Sesiones</h2>
          <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Gestión de asistencia y reportes de campo</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Buscar clase..." className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {CLASSES.map((c) => (
          <div 
            key={c.id} 
            onClick={() => setSelectedClass(c)}
            className="bg-white p-6 lg:p-8 rounded-[32px] lg:rounded-[40px] border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={24} className="lg:w-7 lg:h-7" />
              </div>
              <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">Hoy</span>
            </div>
            <h3 className="text-lg lg:text-xl font-black text-slate-900">{c.group}</h3>
            <div className="mt-4 space-y-2">
              <p className="text-xs lg:text-sm text-slate-500 flex items-center gap-2"><MapPin size={14} /> {c.field}</p>
              <p className="text-xs lg:text-sm text-slate-500 flex items-center gap-2"><Clock size={14} /> {c.time}</p>
              <p className="text-xs lg:text-sm text-slate-500 flex items-center gap-2"><User size={14} /> {c.students.length} Alumnos</p>
            </div>
            <button className="w-full mt-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 group-hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm">
              Pasar Lista
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
