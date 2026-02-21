import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Globe, UserCog, Map, CreditCard, ChevronRight, Save } from 'lucide-react';

export const SettingsView = () => {
  const [activeSection, setActiveSection] = useState('general');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Settings size={20} />
                </div>
                Información de la Escuela
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre de la Escuela</label>
                  <input type="text" defaultValue="FutbolTech Academy" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email de Contacto</label>
                  <input type="email" defaultValue="info@futboltech.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teléfono</label>
                  <input type="tel" defaultValue="+34 600 000 000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Idioma Predeterminado</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700">
                    <option>Español</option>
                    <option>English</option>
                    <option>Français</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                  <Globe size={20} />
                </div>
                Localización y Moneda
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zona Horaria</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700">
                    <option>(GMT+01:00) Madrid, Paris</option>
                    <option>(GMT+00:00) London, Lisbon</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Moneda</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-slate-700">
                    <option>Euro (€)</option>
                    <option>US Dollar ($)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Gestión de Staff</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">Añadir Miembro</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Juan Pérez', role: 'Director Técnico', email: 'juan@futboltech.com' },
                { name: 'Carlos Ruiz', role: 'Entrenador Principal', email: 'carlos@futboltech.com' },
                { name: 'Marta Sanz', role: 'Entrenadora Sub-12', email: 'marta@futboltech.com' },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-blue-600 shadow-sm">{member.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold text-slate-900">{member.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><ChevronRight size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-8">
            <h3 className="text-xl font-black text-slate-900">Facturación y Pagos</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Método de Pago</p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center font-bold italic">VISA</div>
                  <p className="font-bold">•••• •••• •••• 4242</p>
                </div>
                <button className="text-xs font-black text-blue-400 uppercase tracking-widest">Cambiar Tarjeta</button>
              </div>
              <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Próxima Factura</p>
                <p className="text-3xl font-black text-blue-900 mb-2">149,00€</p>
                <p className="text-xs text-blue-700 font-bold">Vence el 12 de Mayo, 2026</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
              <Settings size={40} />
            </div>
            <p className="text-slate-400 font-bold">Esta sección está en desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Configuración del Sistema</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Personaliza tu escuela y gestiona preferencias globales</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-4">
          <nav className="space-y-2">
            {[
              { id: 'general', label: 'General', icon: Settings },
              { id: 'staff', label: 'Gestión de Staff', icon: UserCog },
              { id: 'fields', label: 'Campos y Sedes', icon: Map },
              { id: 'billing', label: 'Facturación y Pagos', icon: CreditCard },
              { id: 'notifications', label: 'Notificaciones', icon: Bell },
              { id: 'security', label: 'Seguridad', icon: Shield },
              { id: 'backup', label: 'Copia de Seguridad', icon: Database },
              { id: 'public', label: 'Web Pública', icon: Globe },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={activeSection === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} />
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <ChevronRight size={16} className={activeSection === item.id ? 'text-white/50' : 'text-slate-300'} />
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 min-h-[600px]">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
