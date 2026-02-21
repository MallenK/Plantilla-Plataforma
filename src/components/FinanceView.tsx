import React from 'react';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, CreditCard, DollarSign } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, user: 'Lucas García', amount: '+65.00€', method: 'Tarjeta', date: 'Hoy, 10:24', status: 'Completed' },
  { id: 2, user: 'Mateo Rodríguez', amount: '+120.00€', method: 'Transferencia', date: 'Hoy, 09:15', status: 'Pending' },
  { id: 3, user: 'Sofía Martínez', amount: '+65.00€', method: 'Tarjeta', date: 'Ayer, 18:45', status: 'Completed' },
  { id: 4, user: 'Hugo López', amount: '+200.00€', method: 'Efectivo', date: 'Ayer, 16:20', status: 'Completed' },
];

export const FinanceView = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
              <ArrowUpRight size={14} /> +12.5%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Ingresos Totales</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">12.450€</h3>
          <p className="text-xs text-slate-400 mt-4">Balance de los últimos 30 días</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <CreditCard size={24} />
            </div>
            <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
              <ArrowDownRight size={14} /> -2.1%
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Gastos Operativos</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">3.120€</h3>
          <p className="text-xs text-slate-400 mt-4">Alquiler de campos y staff</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-900/20 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center">
              <Wallet size={24} />
            </div>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Beneficio Neto</p>
          <h3 className="text-3xl font-bold mt-1">9.330€</h3>
          <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-3/4"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h4 className="font-bold text-slate-800">Flujo de Caja (6 meses)</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Ingresos</span>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Gastos</span>
              </div>
            </div>
          </div>
          <div className="p-8 h-64 flex items-end gap-6">
            {[40, 65, 45, 90, 75, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex gap-1 items-end h-full">
                  <div className="flex-1 bg-blue-500 rounded-t-lg" style={{ height: `${h}%` }}></div>
                  <div className="flex-1 bg-slate-100 rounded-t-lg" style={{ height: `${h * 0.3}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mes {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h4 className="font-bold text-slate-800">Últimos Pagos</h4>
          </div>
          <div className="divide-y divide-slate-50">
            {TRANSACTIONS.map((t) => (
              <div key={t.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{t.user}</p>
                    <p className="text-[10px] text-slate-400">{t.date} • {t.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600">{t.amount}</p>
                  <p className={`text-[10px] font-bold ${t.status === 'Completed' ? 'text-emerald-500' : 'text-orange-500'}`}>
                    {t.status === 'Completed' ? 'Completado' : 'Pendiente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50/50 border-t border-slate-100">
            <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
              Ver Historial Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
