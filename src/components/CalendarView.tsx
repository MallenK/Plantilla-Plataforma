import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, User, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 8); // 8:00 to 21:00

interface Event {
  id: number;
  title: string;
  field: string;
  coach: string;
  time: string;
  day: number; // 0-6
  startHour: number;
  duration: number;
  color: string;
}

const MOCK_EVENTS: Event[] = [
  { id: 1, title: 'Benjamín A', field: 'Campo 3', coach: 'Carlos R.', time: '17:00 - 18:30', day: 0, startHour: 17, duration: 1.5, color: 'bg-blue-500' },
  { id: 2, title: 'Alevín B', field: 'Campo 1', coach: 'Marta S.', time: '18:30 - 20:00', day: 1, startHour: 18.5, duration: 1.5, color: 'bg-orange-500' },
  { id: 3, title: 'Tecnificación Élite', field: 'Campo 2', coach: 'Juan P.', time: '16:00 - 17:30', day: 2, startHour: 16, duration: 1.5, color: 'bg-purple-500' },
  { id: 4, title: 'Infantil C', field: 'Campo 3', coach: 'Carlos R.', time: '17:30 - 19:00', day: 3, startHour: 17.5, duration: 1.5, color: 'bg-emerald-500' },
  { id: 5, title: 'Femenino Sub-14', field: 'Campo 1', coach: 'Lucía M.', time: '10:00 - 11:30', day: 5, startHour: 10, duration: 1.5, color: 'bg-pink-500' },
];

export const CalendarView = ({ isAdmin }: { isAdmin: boolean }) => {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const renderMonthView = () => {
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
      <div className="grid grid-cols-7 flex-1 overflow-auto">
        {DAYS.map(day => (
          <div key={day} className="p-4 border-b border-r border-slate-50 bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
            {day}
          </div>
        ))}
        {daysInMonth.map(day => (
          <div key={day} className="min-h-[120px] p-4 border-b border-r border-slate-50 relative group hover:bg-slate-50/50 transition-colors">
            <span className={`text-sm font-bold ${day === 21 ? 'text-blue-600' : 'text-slate-400'}`}>{day}</span>
            <div className="mt-2 space-y-1">
              {MOCK_EVENTS.filter(e => e.day === (day % 7)).map(e => (
                <div 
                  key={e.id} 
                  onClick={() => setSelectedEvent(e)}
                  className={`text-[10px] p-1.5 rounded-lg text-white font-bold truncate cursor-pointer ${e.color}`}
                >
                  {e.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    return (
      <div className="flex-1 overflow-auto relative">
        <div className="grid grid-cols-[80px_1fr] h-full">
          <div className="border-r border-slate-50">
            {HOURS.map((h) => (
              <div key={h} className="h-20 border-b border-slate-50 flex items-start justify-center pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{h}:00</span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="h-12 bg-slate-50/50 border-b border-slate-100 flex flex-col items-center justify-center sticky top-0 z-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Lunes</span>
              <span className="text-sm font-bold text-blue-600">21</span>
            </div>
            {HOURS.map((h) => (
              <div key={h} className="h-20 border-b border-slate-50"></div>
            ))}
            {MOCK_EVENTS.filter(e => e.day === 0).map(event => (
              <motion.div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`absolute left-4 right-4 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-xl ${event.color} text-white`}
                style={{
                  top: `${(event.startHour - 8) * 80 + 48}px`,
                  height: `${event.duration * 80}px`,
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-black leading-tight">{event.title}</p>
                    <p className="text-xs opacity-80 mt-1 flex items-center gap-1">
                      <MapPin size={14} /> {event.field}
                    </p>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold">
                    {event.time}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <p className="text-xs font-bold">{event.coach}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[32px] lg:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px] lg:h-[800px] relative">
      {/* Class Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-2xl rounded-[32px] lg:rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className={`h-24 lg:h-32 ${selectedEvent.color} p-6 lg:p-8 flex items-end justify-between relative`}>
                <h3 className="text-xl lg:text-3xl font-black text-white">{selectedEvent.title}</h3>
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 lg:top-6 right-4 lg:right-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors">
                  <X size={20} className="lg:w-6 lg:h-6" />
                </button>
              </div>
              <div className="p-6 lg:p-10 space-y-6 lg:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                    <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Horario</p>
                    <p className="text-xs lg:text-sm font-bold text-slate-700">{selectedEvent.time}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                    <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Campo</p>
                    <p className="text-xs lg:text-sm font-bold text-slate-700">{selectedEvent.field}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
                    <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Entrenador</p>
                    <p className="text-xs lg:text-sm font-bold text-slate-700">{selectedEvent.coach}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900 text-sm lg:text-base">Alumnos (12)</h4>
                    <button className="text-[10px] lg:text-xs font-black text-blue-600 uppercase tracking-widest">Pasar Lista</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                    {['Lucas García', 'Mateo Rodríguez', 'Sofía Martínez', 'Hugo López', 'Leo Sánchez', 'Daniel Ruiz'].map((name, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black">
                            {name.charAt(0)}
                          </div>
                          <span className="text-[10px] lg:text-xs font-bold text-slate-700">{name}</span>
                        </div>
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all text-sm">
                    Editar Clase
                  </button>
                  <button className="flex-1 py-4 bg-blue-50 text-blue-600 font-black rounded-2xl hover:bg-blue-100 transition-all text-sm">
                    Reporte Técnico
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="p-4 lg:p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between bg-white sticky top-0 z-20 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
          <h3 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Calendario</h3>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            {(['day', 'week', 'month'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 lg:px-5 py-2 text-[10px] lg:text-xs font-black rounded-lg transition-all uppercase tracking-widest ${
                  view === v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {v === 'day' ? 'Día' : v === 'week' ? 'Semana' : 'Mes'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 border border-slate-100 transition-colors"><ChevronLeft size={18} /></button>
            <span className="font-black text-slate-900 text-[10px] lg:text-sm uppercase tracking-widest whitespace-nowrap">21 - 27 Feb, 2026</span>
            <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 border border-slate-100 transition-colors"><ChevronRight size={18} /></button>
          </div>
          {isAdmin && (
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl lg:rounded-2xl font-bold text-[10px] lg:text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all whitespace-nowrap">
              <Plus size={16} />
              Crear Clase
            </button>
          )}
        </div>
      </div>

      {view === 'month' ? renderMonthView() : view === 'day' ? renderDayView() : (
        <div className="flex-1 overflow-auto relative">
          <div className="grid grid-cols-[60px_1fr] lg:grid-cols-[80px_1fr] min-w-[800px] lg:min-w-[1000px]">
            {/* Time Column */}
            <div className="border-r border-slate-50">
              {HOURS.map((h) => (
                <div key={h} className="h-16 lg:h-20 border-b border-slate-50 flex items-start justify-center pt-2">
                  <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase">{h}:00</span>
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 relative">
              {DAYS.map((day, i) => (
                <div key={day} className="border-r border-slate-50 relative">
                  <div className="h-10 lg:h-12 bg-slate-50/50 border-b border-slate-100 flex flex-col items-center justify-center sticky top-0 z-10">
                    <span className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</span>
                    <span className={`text-xs lg:text-sm font-black ${i === 5 ? 'text-blue-600' : 'text-slate-900'}`}>{21 + i}</span>
                  </div>
                  {HOURS.map((h) => (
                    <div key={h} className="h-16 lg:h-20 border-b border-slate-50"></div>
                  ))}

                  {/* Events for this day */}
                  {MOCK_EVENTS.filter(e => e.day === i).map(event => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onMouseEnter={() => setHoveredEvent(event)}
                      onMouseLeave={() => setHoveredEvent(null)}
                      onClick={() => setSelectedEvent(event)}
                      className={`absolute left-0.5 right-0.5 rounded-xl lg:rounded-2xl p-2 lg:p-4 cursor-pointer transition-all hover:brightness-110 shadow-lg ${event.color} text-white overflow-hidden group`}
                      style={{
                        top: `${(event.startHour - 8) * (window.innerWidth < 1024 ? 64 : 80) + (window.innerWidth < 1024 ? 40 : 48)}px`,
                        height: `${event.duration * (window.innerWidth < 1024 ? 64 : 80)}px`,
                        zIndex: hoveredEvent?.id === event.id ? 30 : 5
                      }}
                    >
                      <p className="text-[10px] lg:text-sm font-black leading-tight truncate">{event.title}</p>
                      <p className="text-[8px] lg:text-[10px] font-bold opacity-80 mt-0.5 lg:mt-1 flex items-center gap-1">
                        <MapPin size={10} className="lg:w-3 lg:h-3" /> {event.field}
                      </p>
                      
                      {/* Tooltip Simulation - Hidden on small screens */}
                      <AnimatePresence>
                        {hoveredEvent?.id === event.id && window.innerWidth >= 1024 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-slate-900 text-white p-6 rounded-[24px] shadow-2xl z-50 pointer-events-none border border-white/10"
                          >
                            <p className="font-black text-base mb-3">{event.title}</p>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                <Clock size={16} className="text-blue-400" /> {event.time}
                              </div>
                              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                <MapPin size={16} className="text-orange-400" /> {event.field}
                              </div>
                              <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                <User size={16} className="text-emerald-400" /> {event.coach}
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ocupación</span>
                              <span className="text-[10px] font-black text-emerald-400">12/12</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
