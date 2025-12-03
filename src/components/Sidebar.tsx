import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  RotateCcw, 
  MessageSquare, 
  Wallet, 
  BarChart3, 
  CheckSquare, 
  Headphones, 
  Settings,
  Ticket,
  Building2,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Clientes', path: '/clientes' },
  { icon: ShoppingCart, label: 'Ventas', path: '/ventas' },
  { icon: Package, label: 'Inventario', path: '/inventario' },
  { icon: RotateCcw, label: 'Renovaciones', path: '/renovaciones' },
  { icon: Building2, label: 'Proveedores', path: '/proveedores' },
  { icon: MessageSquare, label: 'Mensajes', path: '/mensajes' },
  { icon: Wallet, label: 'Caja / Pagos', path: '/caja' },
  { icon: Ticket, label: 'Cupones', path: '/cupones' },
  { icon: BarChart3, label: 'Reportes', path: '/reportes' },
  { icon: CheckSquare, label: 'Tareas', path: '/tareas' },
  { icon: Headphones, label: 'Soporte', path: '/soporte' },
  { icon: Settings, label: 'Configuración', path: '/configuracion' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="lg:hidden p-4 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
