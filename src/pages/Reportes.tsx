import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ventasPorMes = [
  { mes: 'Ene', ingresos: 450, costos: 200, ganancia: 250 },
  { mes: 'Feb', ingresos: 520, costos: 230, ganancia: 290 },
  { mes: 'Mar', ingresos: 610, costos: 270, ganancia: 340 },
  { mes: 'Abr', ingresos: 580, costos: 250, ganancia: 330 },
  { mes: 'May', ingresos: 690, costos: 300, ganancia: 390 },
  { mes: 'Jun', ingresos: 750, costos: 320, ganancia: 430 },
];

const plataformasVentas = [
  { name: 'Netflix', value: 450, color: '#E50914' },
  { name: 'Disney+', value: 320, color: '#113CCF' },
  { name: 'Max', value: 280, color: '#0F1EED' },
  { name: 'Spotify', value: 250, color: '#1DB954' },
  { name: 'Prime Video', value: 150, color: '#00A8E1' },
];

const topClientes = [
  { nombre: 'María González', ventas: 8, total: 120 },
  { nombre: 'Carlos Pérez', ventas: 6, total: 95 },
  { nombre: 'Ana Martínez', ventas: 5, total: 80 },
  { nombre: 'Pedro López', ventas: 4, total: 65 },
  { nombre: 'Luis García', ventas: 4, total: 60 },
];

export function Reportes() {
  const handleExportExcel = () => {
    toast.success('Exportando a Excel...');
  };

  const handleExportPDF = () => {
    toast.success('Exportando a PDF...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Reportes y Analítica</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Análisis de ventas e ingresos
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <FileDown className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha-desde">Desde</Label>
              <Input id="fecha-desde" type="date" defaultValue="2024-01-01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha-hasta">Hasta</Label>
              <Input id="fecha-hasta" type="date" defaultValue="2024-12-31" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plataforma-filter">Plataforma</Label>
              <Select defaultValue="todas">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="netflix">Netflix</SelectItem>
                  <SelectItem value="disney">Disney+</SelectItem>
                  <SelectItem value="max">Max</SelectItem>
                  <SelectItem value="spotify">Spotify</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendedor-filter">Vendedor</Label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="1">Juan Díaz</SelectItem>
                  <SelectItem value="2">María Sánchez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
            Aplicar Filtros
          </Button>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Ingresos</p>
            <p className="text-3xl text-gray-900 dark:text-white mt-1">$3,600</p>
            <p className="text-sm text-green-600 mt-1">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Costos Totales</p>
            <p className="text-3xl text-gray-900 dark:text-white mt-1">$1,570</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">43.6% de ingresos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ganancia Bruta</p>
            <p className="text-3xl text-green-600 mt-1">$2,030</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">56.4% margen</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos, Costos y Ganancia por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventasPorMes}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis tick={{ fill: 'currentColor' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="ingresos" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="costos" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="ganancia" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Plataforma</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plataformasVentas}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {plataformasVentas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparativa Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorMes}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis tick={{ fill: 'currentColor' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="ingresos" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="ganancia" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topClientes.map((cliente, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <span className="text-purple-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{cliente.nombre}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cliente.ventas} ventas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 dark:text-white">${cliente.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
