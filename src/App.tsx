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
  GripVertical,
  Menu,
  X
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
    <div className="hidden lg:flex w-64 bg-slate-900 text-white h-screen flex-col sticky top-0 shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20">FT</div>
        <span className="font-black text-xl tracking-tighter">FutbolTech</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
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

const MobileNav = ({ currentRole, activeTab, setActiveTab }: { currentRole: Role, activeTab: string, setActiveTab: (id: string) => void }) => {
  const items = NAV_ITEMS.filter(item => item.roles.includes(currentRole)).slice(0, 5);
  
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
      default: return <LayoutDashboard size={20} />;
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2 flex items-center justify-around z-[100] pb-safe">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${
            activeTab === item.id ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          {getIcon(item.icon)}
          <span className="text-[10px] font-black uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
};

const Header = ({ title, role, onMenuClick }: { title: string, role: Role, onMenuClick?: () => void }) => (
  <header className="h-20 lg:h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-50">
    <div className="flex items-center gap-4">
      <button onClick={onMenuClick} className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl">
        <Menu size={24} />
      </button>
      <div>
        <h1 className="text-lg lg:text-2xl font-black text-slate-900 tracking-tight truncate max-w-[150px] lg:max-w-none">{title}</h1>
        <p className="text-[8px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 lg:mt-1">Panel • {role}</p>
      </div>
    </div>
    
    <div className="flex items-center gap-2 lg:gap-8">
      <div className="relative">
        <button className="p-2 lg:p-3 text-slate-400 hover:text-blue-600 transition-all hover:bg-slate-50 rounded-2xl relative group">
          <Bell size={20} className="lg:w-[22px] lg:h-[22px] group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2 right-2 lg:top-3 lg:right-3 w-2 h-2 lg:w-2.5 lg:h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4 lg:pl-8 lg:border-l lg:border-slate-100">
        <div className="hidden sm:block text-right">
          <p className="text-xs lg:text-sm font-black text-slate-900">Juan Pérez</p>
          <p className="text-[8px] lg:text-[10px] font-bold text-blue-600 uppercase tracking-widest">Director</p>
        </div>
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl border-2 border-blue-100 p-0.5">
          <img 
            src="https://picsum.photos/seed/admin/100/100" 
            alt="Avatar" 
            className="w-full h-full object-cover rounded-[10px] lg:rounded-[14px]"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="space-y-0">
              <div className="p-4 lg:p-8">
                <div className="bg-blue-600 p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 lg:w-64 h-32 lg:h-64 bg-white/10 rounded-full -mr-10 lg:-mr-20 -mt-10 lg:-mt-20"></div>
                  <h2 className="text-2xl lg:text-4xl font-black mb-2">¡Hola, Coach!</h2>
                  <p className="text-blue-100 font-medium text-sm lg:text-base">Tienes 2 clases programadas para hoy.</p>
                </div>
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
            <div className="space-y-0">
              <div className="p-4 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  <div className="bg-white p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] border border-slate-100 shadow-sm">
                    <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-6">Estado de Lucas</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <p className="text-slate-400 font-bold text-[10px] lg:text-xs uppercase tracking-widest">Sesiones del Bono</p>
                        <p className="text-xl lg:text-2xl font-black text-blue-600">5 / 8</p>
                      </div>
                      <div className="h-3 lg:h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 lg:p-1">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '62.5%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-6 lg:p-10 rounded-[32px] lg:rounded-[40px] text-white">
                    <h3 className="text-xl lg:text-2xl font-black mb-6">Próxima Clase</h3>
                    <div className="flex items-center gap-4 lg:gap-6">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl flex items-center justify-center">
                        <Calendar size={24} className="lg:w-8 lg:h-8" />
                      </div>
                      <div>
                        <p className="text-lg lg:text-xl font-bold">Lunes, 23 Feb</p>
                        <p className="text-slate-400 text-sm lg:text-base">17:30h • Campo 3</p>
                      </div>
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
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 pb-20 lg:pb-0">
      {/* Role Switcher (For Demo Purposes) */}
      <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-[100] flex flex-col gap-2 lg:gap-3">
        <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right mb-0.5 lg:mb-1 drop-shadow-sm">Simular</p>
        <div className="flex gap-1.5 lg:gap-2 bg-white/80 backdrop-blur-xl p-2 rounded-[20px] lg:rounded-[24px] shadow-2xl border border-white/50 ring-1 ring-slate-900/5 scale-90 lg:scale-100 origin-right">
          {(['ADMIN', 'COACH', 'PARENT'] as Role[]).map(role => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                setActiveTab('dashboard');
              }}
              className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-[14px] lg:rounded-[18px] text-[8px] lg:text-[10px] font-black tracking-widest uppercase transition-all duration-500 ${
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

      {/* Mobile Full Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[200] bg-slate-900 text-white p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl">FT</div>
                <span className="font-black text-xl tracking-tighter">FutbolTech</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-4">
              {NAV_ITEMS.filter(item => item.roles.includes(currentRole)).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    activeTab === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="absolute bottom-12 left-8 right-8">
              <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-500 font-black text-sm uppercase tracking-widest">
                <LogOut size={20} />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar currentRole={currentRole} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header title={getPageTitle()} role={currentRole} onMenuClick={() => setIsMobileMenuOpen(true)} />
        
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

      <MobileNav currentRole={currentRole} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
