/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Ticket, 
  Trophy, 
  FolderOpen, 
  Wallet, 
  Settings, 
  Bell, 
  LogOut,
  GripVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Role, NAV_ITEMS } from './types';

// Import Modular Components
import { AdminDashboard } from './components/DashboardView';
import { StudentModule } from './components/StudentModule';
import { OrganizerView } from './components/OrganizerView';
import { CalendarView } from './components/CalendarView';
import { FinanceView } from './components/FinanceView';
import { DocumentsView } from './components/DocumentsView';
import { VouchersView } from './components/VouchersView';
import { TournamentsListView } from './components/TournamentsListView';
import { SettingsView } from './components/SettingsView';
import { CoachAttendanceView } from './components/CoachAttendanceView';
import { ParentVouchersView } from './components/ParentVouchersView';

// --- Layout Components ---

const Sidebar = ({ currentRole, activeTab, setActiveTab }: { currentRole: Role, activeTab: string, setActiveTab: (id: string) => void }) => {
  const items = NAV_ITEMS.filter(item => item.roles.includes(currentRole));
  
  const getIcon = (name: string) => {
    switch (name) {
      case 'LayoutDashboard': return <LayoutDashboard size={20} />;
      case 'Users': return <Users size={20} />;
      case 'Calendar': return <Calendar size={20} />;
      case 'Ticket': return <Ticket size={20} />;
      case 'Trophy': return <Trophy size={20} />;
      case 'FolderOpen': return <FolderOpen size={20} />;
      case 'Wallet': return <Wallet size={20} />;
      case 'Settings': return <Settings size={20} />;
      case 'GripVertical': return <GripVertical size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">FT</div>
        <span className="font-black text-xl tracking-tighter">FutbolTech</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {getIcon(item.icon)}
            </span>
            <span className="font-bold text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-colors group">
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

const Header = ({ title, role }: { title: string, role: Role }) => (
  <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-50">
    <div>
      <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Panel de Control • {role}</p>
    </div>
    
    <div className="flex items-center gap-8">
      <div className="relative">
        <button className="p-3 text-slate-400 hover:text-blue-600 transition-all hover:bg-slate-50 rounded-2xl relative group">
          <Bell size={22} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
      
      <div className="flex items-center gap-4 pl-8 border-l border-slate-100">
        <div className="text-right">
          <p className="text-sm font-black text-slate-900">Juan Pérez</p>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Director Técnico</p>
        </div>
        <div className="w-12 h-12 rounded-2xl border-2 border-blue-100 p-0.5">
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Avatar" 
            className="w-full h-full object-cover rounded-[14px]"
            referrerPolicy="no-referrer" 
          />
        </div>
      </div>
    </div>
  </header>
);

// --- Main App ---

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('ADMIN');
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    if (currentRole === 'ADMIN') {
      switch (activeTab) {
        case 'dashboard': return <AdminDashboard onNavigate={setActiveTab} />;
        case 'students': return <StudentModule />;
        case 'organizer': return <OrganizerView />;
        case 'classes': return <CalendarView isAdmin={true} />;
        case 'finance': return <FinanceView />;
        case 'documents': return <DocumentsView />;
        case 'vouchers': return <VouchersView />;
        case 'tournaments': return <TournamentsListView />;
        case 'settings': return <SettingsView />;
        default: return <div className="p-20 text-center text-slate-300 font-bold">Módulo "{activeTab}" en desarrollo</div>;
      }
    }
    
    // Simplified for Coach/Parent in this mockup evolution
    if (currentRole === 'COACH') {
      switch (activeTab) {
        case 'dashboard':
          return (
            <div className="p-8 space-y-8">
              <div className="bg-blue-600 p-10 rounded-[40px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                <h2 className="text-4xl font-black mb-2">¡Hola, Coach!</h2>
                <p className="text-blue-100 font-medium">Tienes 2 clases programadas para hoy.</p>
              </div>
              <CoachAttendanceView />
            </div>
          );
        case 'classes': return <CoachAttendanceView />;
        case 'tournaments': return <TournamentsListView />;
        default: return <div className="p-20 text-center text-slate-300 font-bold">Módulo "{activeTab}" en desarrollo</div>;
      }
    }

    if (currentRole === 'PARENT') {
      switch (activeTab) {
        case 'dashboard':
          return (
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                  <h3 className="text-2xl font-black text-slate-900 mb-6">Estado de Lucas</h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Sesiones del Bono</p>
                      <p className="text-2xl font-black text-blue-600">5 / 8</p>
                    </div>
                    <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '62.5%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 p-10 rounded-[40px] text-white">
                  <h3 className="text-2xl font-black mb-6">Próxima Clase</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                      <Calendar size={32} />
                    </div>
                    <div>
                      <p className="text-xl font-bold">Lunes, 23 Feb</p>
                      <p className="text-slate-400">17:30h • Campo 3</p>
                    </div>
                  </div>
                </div>
              </div>
              <ParentVouchersView />
            </div>
          );
        case 'vouchers': return <ParentVouchersView />;
        case 'documents': return <ParentVouchersView />;
        default: return <div className="p-20 text-center text-slate-300 font-bold">Módulo "{activeTab}" en desarrollo</div>;
      }
    }

    return null;
  };

  const getPageTitle = () => {
    const item = NAV_ITEMS.find(i => i.id === activeTab);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Role Switcher (For Demo Purposes) */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right mb-1 drop-shadow-sm">Simular Entorno</p>
        <div className="flex gap-2 bg-white/80 backdrop-blur-xl p-2.5 rounded-[24px] shadow-2xl border border-white/50 ring-1 ring-slate-900/5">
          {(['ADMIN', 'COACH', 'PARENT'] as Role[]).map(role => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                setActiveTab('dashboard');
              }}
              className={`px-5 py-2.5 rounded-[18px] text-[10px] font-black tracking-widest uppercase transition-all duration-500 ${
                currentRole === role 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105' 
                  : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <Sidebar currentRole={currentRole} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header title={getPageTitle()} role={currentRole} />
        
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentRole}-${activeTab}`}
              initial={{ opacity: 0, scale: 0.99, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.01, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
