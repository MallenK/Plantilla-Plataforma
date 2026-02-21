import { Bell, Trophy, TrendingUp, Calendar as CalendarIcon, ChevronRight, Users, Ticket, Wallet } from 'lucide-react';
import { CalendarView } from './CalendarView';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => (
  <div className="p-8 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        onClick={() => onNavigate('students')}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alumnos Activos</p>
          <Users size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-black text-slate-900">124</h3>
          <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+12%</span>
        </div>
        <div className="mt-4 h-1.5 bg-slate-50 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-3/4"></div>
        </div>
      </div>
      
      <div 
        onClick={() => onNavigate('vouchers')}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Bonos Vendidos</p>
          <Ticket size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-black text-slate-900">86</h3>
          <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">+5%</span>
        </div>
        <div className="mt-4 flex gap-1 items-end h-8">
          {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-blue-100 rounded-t-sm group-hover:bg-blue-600 transition-colors" style={{ height: `${h}%` }}></div>
          ))}
        </div>
      </div>

      <div 
        onClick={() => onNavigate('finance')}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all group"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ingresos Mes</p>
          <Wallet size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
        </div>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-black text-slate-900">4.250€</h3>
          <span className="text-slate-400 text-xs font-bold">Meta: 5k</span>
        </div>
        <div className="mt-4 h-1.5 bg-slate-50 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 w-[85%]"></div>
        </div>
      </div>

      <div 
        onClick={() => onNavigate('documents')}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm cursor-pointer hover:border-blue-200 transition-all group"
      >
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Alertas</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
            <Bell size={20} />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900">4 Críticas</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acción requerida</p>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <CalendarView isAdmin={true} />
      </div>

      <div className="space-y-8">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h4 className="font-black text-slate-900">Próximos Torneos</h4>
            <Trophy size={18} className="text-orange-500" />
          </div>
          <div className="p-4 space-y-2">
            {[
              { name: 'Copa Primavera Sub-12', date: '15 Mar', status: 'Abierto' },
              { name: 'Tecnificación Élite', date: '22 Mar', status: 'Próximamente' },
            ].map((t, i) => (
              <div 
                key={i} 
                onClick={() => onNavigate('tournaments')}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-blue-100 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <CalendarIcon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{t.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.date}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button 
              onClick={() => onNavigate('tournaments')}
              className="w-full py-2 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest"
            >
              Ver todos los torneos
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-900/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-black">Estado de Pagos</h4>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-widest">Completados</span>
              <span className="font-black">85%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%]"></div>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
              Hay 12 alumnos con pagos pendientes. Se ha enviado un recordatorio automático hoy.
            </p>
            <button 
              onClick={() => onNavigate('finance')}
              className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
            >
              Gestionar Finanzas
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
