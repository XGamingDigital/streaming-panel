import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { AlertCircle, RotateCcw, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const renovaciones = [
  {
    id: '1',
    cliente: 'María González',
    plataforma: 'Netflix',
    plan: 'Premium',
    fechaExpiracion: '2024-12-02',
    diasRestantes: 0,
    estado: 'pendiente',
    precio: '$15.00',
    whatsapp: '+505 8888-8888',
    color: 'bg-red-600'
  },
  {
    id: '2',
    cliente: 'Ana Martínez',
    plataforma: 'Disney+',
    plan: 'Estándar',
    fechaExpiracion: '2024-12-03',
    diasRestantes: 1,
    estado: 'pendiente',
    precio: '$10.00',
    whatsapp: '+505 6666-6666',
    color: 'bg-blue-600'
  },
  {
    id: '3',
    cliente: 'Pedro López',
    plataforma: 'Max',
    plan: 'Premium',
    fechaExpiracion: '2024-12-04',
    diasRestantes: 2,
    estado: 'pendiente',
    precio: '$12.00',
    whatsapp: '+505 5555-5555',
    color: 'bg-purple-600'
  },
  {
    id: '4',
    cliente: 'Carlos Pérez',
    plataforma: 'Spotify',
    plan: 'Premium',
    fechaExpiracion: '2024-12-05',
    diasRestantes: 3,
    estado: 'renovado',
    precio: '$8.00',
    whatsapp: '+505 7777-7777',
    color: 'bg-green-600'
  },
  {
    id: '5',
    cliente: 'Luis García',
    plataforma: 'Netflix',
    plan: 'Básico',
    fechaExpiracion: '2024-12-08',
    diasRestantes: 6,
    estado: 'pendiente',
    precio: '$10.00',
    whatsapp: '+505 4444-4444',
    color: 'bg-red-600'
  },
  {
    id: '6',
    cliente: 'Sofia Ramírez',
    plataforma: 'Disney+',
    plan: 'Premium',
    fechaExpiracion: '2024-11-30',
    diasRestantes: -2,
    estado: 'no_renovo',
    precio: '$15.00',
    whatsapp: '+505 3333-3333',
    color: 'bg-blue-600'
  },
];

const getDiasColor = (dias: number) => {
  if (dias < 0) return 'text-red-600';
  if (dias === 0) return 'text-red-600';
  if (dias <= 2) return 'text-orange-600';
  if (dias <= 7) return 'text-yellow-600';
  return 'text-green-600';
};

const getDiasBgColor = (dias: number) => {
  if (dias < 0) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  if (dias === 0) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  if (dias <= 2) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
  if (dias <= 7) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
  return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
};

const estadoBadgeVariant = (estado: string) => {
  switch (estado) {
    case 'pendiente':
      return 'secondary';
    case 'renovado':
      return 'default';
    case 'no_renovo':
      return 'destructive';
    default:
      return 'outline';
  }
};

const estadoLabel = (estado: string) => {
  switch (estado) {
    case 'pendiente':
      return 'Pendiente';
    case 'renovado':
      return 'Renovado';
    case 'no_renovo':
      return 'No Renovó';
    default:
      return estado;
  }
};

export function Renovaciones() {
  const [filterPeriodo, setFilterPeriodo] = useState('todos');
  const [filterEstado, setFilterEstado] = useState('todos');

  const handleEnviarRecordatorio = (cliente: string) => {
    toast.success(`Recordatorio enviado a ${cliente}`);
  };

  const handleRenovar = (cliente: string) => {
    toast.success(`Renovación procesada para ${cliente}`);
  };

  const handleEnviarMasivo = () => {
    toast.success('Recordatorios masivos enviados');
  };

  const filteredRenovaciones = renovaciones.filter(renovacion => {
    let matchPeriodo = true;
    if (filterPeriodo === 'hoy') matchPeriodo = renovacion.diasRestantes === 0;
    if (filterPeriodo === '3dias') matchPeriodo = renovacion.diasRestantes >= 0 && renovacion.diasRestantes <= 3;
    if (filterPeriodo === 'semana') matchPeriodo = renovacion.diasRestantes >= 0 && renovacion.diasRestantes <= 7;
    if (filterPeriodo === 'vencidos') matchPeriodo = renovacion.diasRestantes < 0;
    
    const matchEstado = filterEstado === 'todos' || renovacion.estado === filterEstado;
    
    return matchPeriodo && matchEstado;
  });

  const contadores = {
    hoy: renovaciones.filter(r => r.diasRestantes === 0 && r.estado === 'pendiente').length,
    dosDias: renovaciones.filter(r => r.diasRestantes >= 0 && r.diasRestantes <= 2 && r.estado === 'pendiente').length,
    vencidos: renovaciones.filter(r => r.diasRestantes < 0 && r.estado !== 'renovado').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Renovaciones y Vencimientos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona los servicios próximos a vencer
          </p>
        </div>
        <Button 
          onClick={handleEnviarMasivo}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Enviar Recordatorios Masivos
        </Button>
      </div>

      {/* Alertas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Vencen HOY</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.hoy}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <Button 
              variant="link" 
              className="px-0 text-red-600 h-auto mt-2"
              onClick={() => setFilterPeriodo('hoy')}
            >
              Ver todos →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Próximos 48 horas</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.dosDias}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <Button 
              variant="link" 
              className="px-0 text-orange-600 h-auto mt-2"
              onClick={() => setFilterPeriodo('3dias')}
            >
              Ver todos →
            </Button>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ya Vencidos</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.vencidos}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <Button 
              variant="link" 
              className="px-0 text-purple-600 h-auto mt-2"
              onClick={() => setFilterPeriodo('vencidos')}
            >
              Ver todos →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterPeriodo} onValueChange={setFilterPeriodo}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="3dias">Próximos 3 días</SelectItem>
                <SelectItem value="semana">Próxima semana</SelectItem>
                <SelectItem value="vencidos">Vencidos</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="renovado">Renovado</SelectItem>
                <SelectItem value="no_renovo">No Renovó</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Servicios ({filteredRenovaciones.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Fecha Expiración</TableHead>
                <TableHead>Días Restantes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRenovaciones.map((renovacion) => (
                <TableRow key={renovacion.id}>
                  <TableCell>
                    <div>
                      <p className="text-gray-900 dark:text-white">{renovacion.cliente}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{renovacion.whatsapp}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded ${renovacion.color} flex items-center justify-center`}>
                        <span className="text-white text-xs">{renovacion.plataforma[0]}</span>
                      </div>
                      {renovacion.plataforma}
                    </div>
                  </TableCell>
                  <TableCell>{renovacion.plan}</TableCell>
                  <TableCell>{renovacion.fechaExpiracion}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${getDiasColor(renovacion.diasRestantes)}`}>
                      <Clock className="h-3 w-3" />
                      {renovacion.diasRestantes < 0 
                        ? `Vencido hace ${Math.abs(renovacion.diasRestantes)} días`
                        : renovacion.diasRestantes === 0
                        ? 'Vence HOY'
                        : `${renovacion.diasRestantes} días`
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={estadoBadgeVariant(renovacion.estado)}>
                      {estadoLabel(renovacion.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell>{renovacion.precio}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEnviarRecordatorio(renovacion.cliente)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => handleRenovar(renovacion.cliente)}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Renovar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredRenovaciones.map((renovacion) => (
          <Card key={renovacion.id} className={`border-l-4 ${getDiasBgColor(renovacion.diasRestantes)}`}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-lg ${renovacion.color} flex items-center justify-center`}>
                      <span className="text-white">{renovacion.plataforma[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{renovacion.cliente}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {renovacion.plataforma} - {renovacion.plan}
                      </p>
                    </div>
                  </div>
                  <Badge variant={estadoBadgeVariant(renovacion.estado)}>
                    {estadoLabel(renovacion.estado)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Expira</p>
                    <p className="text-gray-900 dark:text-white">{renovacion.fechaExpiracion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Precio</p>
                    <p className="text-gray-900 dark:text-white">{renovacion.precio}</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 p-3 rounded-lg ${getDiasBgColor(renovacion.diasRestantes)}`}>
                  <Clock className={`h-4 w-4 ${getDiasColor(renovacion.diasRestantes)}`} />
                  <span className={getDiasColor(renovacion.diasRestantes)}>
                    {renovacion.diasRestantes < 0 
                      ? `Vencido hace ${Math.abs(renovacion.diasRestantes)} días`
                      : renovacion.diasRestantes === 0
                      ? '¡Vence HOY!'
                      : `Vence en ${renovacion.diasRestantes} días`
                    }
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleEnviarRecordatorio(renovacion.cliente)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Recordar
                  </Button>
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleRenovar(renovacion.cliente)}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Renovar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
