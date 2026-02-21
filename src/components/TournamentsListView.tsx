import React, { useState, useMemo } from 'react';
import { Trophy, Calendar, MapPin, Users, DollarSign, ChevronRight, Plus, Filter, Search, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_TOURNAMENTS = [
  { id: 1, name: 'Copa Primavera Sub-12', date: '15 Mar, 2026', location: 'Sede Central', players: 24, maxPlayers: 32, revenue: '1.200€', status: 'Open' },
  { id: 2, name: 'Tecnificación Élite', date: '22 Mar, 2026', location: 'Campo Municipal', players: 16, maxPlayers: 16, revenue: '2.400€', status: 'Full' },
  { id: 3, name: 'Torneo Relámpago Alevín', date: '05 Abr, 2026', location: 'Sede Central', players: 12, maxPlayers: 24, revenue: '600€', status: 'Open' },
  { id: 4, name: 'Campus Semana Santa', date: '10-14 Abr, 2026', location: 'Sede Central', players: 45, maxPlayers: 60, revenue: '6.750€', status: 'Open' },
];

export const TournamentsListView = () => {
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTournament, setSelectedTournament] = useState<any>(null);

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tournaments, searchQuery, statusFilter]);

  return (
    <div className="p-8 space-y-8 relative min-h-screen">
      {/* Tournament Detail Modal */}
      <AnimatePresence>
        {selectedTournament && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTournament(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="relative bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="h-48 bg-slate-900 relative overflow-hidden shrink-0">
                <img src={`https://picsum.photos/seed/tournament${selectedTournament.id}/1200/400`} className="w-full h-full object-cover opacity-40" alt="Tournament" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                  <div>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Torneo Oficial</span>
                    <h3 className="text-4xl font-black text-white">{selectedTournament.name}</h3>
                  </div>
                  <button onClick={() => setSelectedTournament(null)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white backdrop-blur-md transition-all">
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-slate-50 p-6 rounded-[32px] space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</p>
                    <p className="text-lg font-black text-slate-900">{selectedTournament.date}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[32px] space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede</p>
                    <p className="text-lg font-black text-slate-900">{selectedTournament.location}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[32px] space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inscritos</p>
                    <p className="text-lg font-black text-slate-900">{selectedTournament.players} / {selectedTournament.maxPlayers}</p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-[32px] space-y-1 text-white">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recaudación</p>
                    <p className="text-lg font-black text-blue-400">{selectedTournament.revenue}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-10">
                  <div className="col-span-2 space-y-6">
                    <h4 className="text-xl font-black text-slate-900">Descripción del Evento</h4>
                    <p className="text-slate-500 leading-relaxed">
                      Este torneo reúne a las mejores academias de la región para una jornada de competición y aprendizaje. 
                      Se garantiza un mínimo de 3 partidos por equipo, arbitraje profesional y zona de avituallamiento para jugadores.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-slate-100 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                          <CheckCircle2 size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Seguro Incluido</span>
                      </div>
                      <div className="p-4 border border-slate-100 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                          <CheckCircle2 size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">Trofeos y Medallas</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-900">Equipos Inscritos</h4>
                    <div className="space-y-3">
                      {['FutbolTech A', 'Real Madrid Academy', 'Atleti Kids', 'Barça Escola'].map((team, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Trophy size={16} className="text-slate-400" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{team}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-4 shrink-0">
                <button className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">
                  Gestionar Inscripciones
                </button>
                <button className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all">
                  Descargar Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lista de Torneos</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Gestión de eventos y competiciones externas</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
          <Plus size={18} />
          Crear Nuevo Torneo
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar torneo..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold text-xs focus:outline-none"
          >
            <option value="All">Todos los Estados</option>
            <option value="Open">Abiertos</option>
            <option value="Full">Completos</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filtros Avanzados
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTournaments.length > 0 ? filteredTournaments.map((t) => (
          <div key={t.id} className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden group hover:border-blue-200 transition-all">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Trophy size={32} />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  t.status === 'Open' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {t.status === 'Open' ? 'Inscripciones Abiertas' : 'Completo'}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4">{t.name}</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha</p>
                    <p className="text-sm font-bold text-slate-700">{t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sede</p>
                    <p className="text-sm font-bold text-slate-700">{t.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inscritos</p>
                    <p className="text-sm font-bold text-slate-700">{t.players} / {t.maxPlayers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recaudación</p>
                    <p className="text-sm font-black text-blue-600">{t.revenue}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-widest">Ocupación</span>
                  <span className="text-slate-900">{Math.round((t.players / t.maxPlayers) * 100)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${t.status === 'Full' ? 'bg-orange-500' : 'bg-blue-600'}`} 
                    style={{ width: `${(t.players / t.maxPlayers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-blue-50 transition-colors">
              <button 
                onClick={() => setSelectedTournament(t)}
                className="text-sm font-black text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                Gestionar Inscripciones
                <ChevronRight size={16} />
              </button>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/player${i}/100/100`} alt="Player" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                  +{t.players - 4}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="lg:col-span-2 py-20 text-center text-slate-400 font-bold">
            No se encontraron torneos con los criterios seleccionados
          </div>
        )}
      </div>
    </div>
  );
};
