import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  DollarSign, 
  Users, 
  AlertCircle, 
  RotateCcw, 
  TrendingUp,
  ShoppingCart,
  UserPlus,
  Wallet
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ventasData = [
  { dia: 'Lun', ventas: 12 },
  { dia: 'Mar', ventas: 19 },
  { dia: 'Mié', ventas: 15 },
  { dia: 'Jue', ventas: 25 },
  { dia: 'Vie', ventas: 22 },
  { dia: 'Sáb', ventas: 30 },
  { dia: 'Dom', ventas: 18 },
];

const plataformasData = [
  { name: 'Netflix', value: 45, color: '#E50914' },
  { name: 'Disney+', value: 25, color: '#113CCF' },
  { name: 'Max', value: 15, color: '#0F1EED' },
  { name: 'Spotify', value: 15, color: '#1DB954' },
];

const actividadReciente = [
  { tipo: 'venta', descripcion: 'Nueva venta: Netflix Premium - María González', tiempo: 'Hace 5 min', estado: 'success' },
  { tipo: 'cliente', descripcion: 'Nuevo cliente registrado: Carlos Pérez', tiempo: 'Hace 15 min', estado: 'info' },
  { tipo: 'renovacion', descripcion: 'Plan renovado: Disney+ - Ana Martínez', tiempo: 'Hace 30 min', estado: 'success' },
  { tipo: 'alerta', descripcion: 'Plan por vencer: Max - Pedro López (mañana)', tiempo: 'Hace 1 hora', estado: 'warning' },
  { tipo: 'pago', descripcion: 'Pago registrado: $25 - Transferencia', tiempo: 'Hace 2 horas', estado: 'success' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Bienvenido de vuelta, aquí está tu resumen de hoy
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/ventas">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Nueva Venta
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/clientes">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
              Ventas del Día
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">$450.00</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-green-600">15 ventas</span> realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
              Clientes Nuevos
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">8</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span className="text-blue-600">+12%</span> vs ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
              Por Expirar
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">12</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              próximos <span className="text-yellow-600">3 días</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
              Comisiones
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">$125.00</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              estimadas <span className="text-purple-600">este mes</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Importantes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              Planes que vencen HOY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">3</div>
            <Link to="/renovaciones">
              <Button variant="link" className="px-0 text-red-600 h-auto">
                Ver detalles →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Próximos 48 horas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">9</div>
            <Link to="/renovaciones">
              <Button variant="link" className="px-0 text-yellow-600 h-auto">
                Ver detalles →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-500" />
              Proveedores por vencer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-gray-900 dark:text-white">2</div>
            <Link to="/proveedores">
              <Button variant="link" className="px-0 text-purple-600 h-auto">
                Ver detalles →
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ventas de los últimos 7 días</CardTitle>
            <CardDescription>Número de ventas por día</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="dia" 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'currentColor' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="ventas" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plataformas más vendidas</CardTitle>
            <CardDescription>Distribución de ventas por servicio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plataformasData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {plataformasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Actividad Reciente y Acciones Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actividadReciente.map((actividad, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    actividad.estado === 'success' ? 'bg-green-500' :
                    actividad.estado === 'warning' ? 'bg-yellow-500' :
                    actividad.estado === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {actividad.descripcion}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {actividad.tiempo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/ventas">
              <Button className="w-full justify-start" variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Nueva Venta
              </Button>
            </Link>
            <Link to="/clientes">
              <Button className="w-full justify-start" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Cliente
              </Button>
            </Link>
            <Link to="/caja">
              <Button className="w-full justify-start" variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                Registrar Pago
              </Button>
            </Link>
            <Link to="/renovaciones">
              <Button className="w-full justify-start" variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Ver Renovaciones
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}