export type Role = 'ADMIN' | 'COACH' | 'PARENT';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  roles: Role[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', roles: ['ADMIN', 'COACH', 'PARENT'] },
  { id: 'students', label: 'Alumnos', icon: 'Users', roles: ['ADMIN'] },
  { id: 'organizer', label: 'Organizador', icon: 'GripVertical', roles: ['ADMIN'] },
  { id: 'classes', label: 'Clases', icon: 'Calendar', roles: ['ADMIN', 'COACH'] },
  { id: 'vouchers', label: 'Bonos', icon: 'Ticket', roles: ['ADMIN', 'PARENT'] },
  { id: 'tournaments', label: 'Torneos', icon: 'Trophy', roles: ['ADMIN', 'COACH'] },
  { id: 'documents', label: 'Documentos', icon: 'FolderOpen', roles: ['ADMIN', 'PARENT'] },
  { id: 'finance', label: 'Finanzas', icon: 'Wallet', roles: ['ADMIN'] },
  { id: 'settings', label: 'Configuración', icon: 'Settings', roles: ['ADMIN'] },
];
