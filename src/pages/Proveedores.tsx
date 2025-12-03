import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Building2, Plus, AlertCircle, Eye, Clock, DollarSign, Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const proveedores = [
  {
    id: '1',
    nombre: 'StreamPro',
    tipo: 'Mayorista',
    plataformas: ['Netflix', 'Disney+', 'Max'],
    costoPorCuenta: '$8.00',
    fechaInicio: '2024-01-01',
    fechaVencimiento: '2024-12-04',
    diasRestantes: 2,
    slotsDisponibles: 15,
    slotsTotales: 50,
    estado: 'proximo_a_vencer',
    contacto: '+505 9999-9999'
  },
  {
    id: '2',
    nombre: 'MediaHub',
    tipo: 'Reseller',
    plataformas: ['Spotify', 'YouTube Premium'],
    costoPorCuenta: '$5.00',
    fechaInicio: '2024-03-15',
    fechaVencimiento: '2025-03-15',
    diasRestantes: 103,
    slotsDisponibles: 30,
    slotsTotales: 100,
    estado: 'activo',
    contacto: '+505 8888-8888'
  },
  {
    id: '3',
    nombre: 'ContentPlus',
    tipo: 'App',
    plataformas: ['Netflix', 'Prime Video'],
    costoPorCuenta: '$10.00',
    fechaInicio: '2024-06-01',
    fechaVencimiento: '2024-11-30',
    diasRestantes: -2,
    slotsDisponibles: 0,
    slotsTotales: 20,
    estado: 'vencido',
    contacto: '+505 7777-7777'
  },
  {
    id: '4',
    nombre: 'GlobalStream',
    tipo: 'Mayorista',
    plataformas: ['Max', 'Disney+', 'Paramount+'],
    costoPorCuenta: '$7.00',
    fechaInicio: '2024-02-01',
    fechaVencimiento: '2025-02-01',
    diasRestantes: 61,
    slotsDisponibles: 45,
    slotsTotales: 80,
    estado: 'activo',
    contacto: '+505 6666-6666'
  },
];

const getDiasColor = (dias: number) => {
  if (dias < 0) return 'text-red-600';
  if (dias <= 3) return 'text-orange-600';
  if (dias <= 7) return 'text-yellow-600';
  return 'text-green-600';
};

const estadoBadgeVariant = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'default';
    case 'proximo_a_vencer':
      return 'secondary';
    case 'vencido':
      return 'destructive';
    case 'pausado':
      return 'outline';
    default:
      return 'default';
  }
};

const estadoLabel = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'Activo';
    case 'proximo_a_vencer':
      return 'Próximo a Vencer';
    case 'vencido':
      return 'Vencido';
    case 'pausado':
      return 'Pausado';
    default:
      return estado;
  }
};

export function Proveedores() {
  const [filterEstado, setFilterEstado] = useState('todos');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNuevoProveedor = () => {
    toast.success('Proveedor agregado exitosamente');
    setDialogOpen(false);
  };

  const filteredProveedores = proveedores.filter(proveedor => {
    return filterEstado === 'todos' || proveedor.estado === filterEstado;
  });

  const contadores = {
    proximosAVencer: proveedores.filter(p => p.diasRestantes >= 0 && p.diasRestantes <= 7).length,
    vencidos: proveedores.filter(p => p.diasRestantes < 0).length,
    activos: proveedores.filter(p => p.estado === 'activo').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Gestión de Proveedores</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Administra tus proveedores y cuentas mayoristas
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proveedor
          </Button>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
              <DialogDescription>
                Registra un proveedor de cuentas de streaming
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Proveedor *</Label>
                  <Input id="nombre" placeholder="Ej: StreamPro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Proveedor *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mayorista">Mayorista</SelectItem>
                      <SelectItem value="reseller">Reseller</SelectItem>
                      <SelectItem value="tienda">Tienda</SelectItem>
                      <SelectItem value="app">App</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plataformas">Plataformas que Ofrece</Label>
                <Input id="plataformas" placeholder="Netflix, Disney+, Max..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="costo">Costo por Cuenta/Slot</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input id="costo" type="number" className="pl-7" placeholder="0.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slots">Slots Disponibles</Label>
                  <Input id="slots" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inicio">Fecha de Inicio</Label>
                  <Input id="inicio" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vencimiento">Fecha de Vencimiento</Label>
                  <Input id="vencimiento" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contacto">Información de Contacto</Label>
                <Input id="contacto" placeholder="+505 9999-9999 o correo@proveedor.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notas">Notas</Label>
                <Textarea id="notas" placeholder="Información adicional sobre el proveedor..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleNuevoProveedor}>
                Guardar Proveedor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alertas de Vencimiento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Próximos a Vencer</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.proximosAVencer}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">En los próximos 7 días</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Proveedores Vencidos</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.vencidos}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Requieren atención</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Proveedores Activos</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.activos}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">En buen estado</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="proximo_a_vencer">Próximo a Vencer</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
                <SelectItem value="pausado">Pausado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Lista de Proveedores ({filteredProveedores.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Plataformas</TableHead>
                <TableHead>Costo/Cuenta</TableHead>
                <TableHead>Slots</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Días Restantes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProveedores.map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">{proveedor.nombre}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{proveedor.contacto}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{proveedor.tipo}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {proveedor.plataformas.map((plataforma, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {plataforma}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{proveedor.costoPorCuenta}</TableCell>
                  <TableCell>
                    <span className={proveedor.slotsDisponibles < 5 ? 'text-yellow-600' : 'text-gray-900 dark:text-white'}>
                      {proveedor.slotsDisponibles}/{proveedor.slotsTotales}
                    </span>
                  </TableCell>
                  <TableCell>{proveedor.fechaVencimiento}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${getDiasColor(proveedor.diasRestantes)}`}>
                      <Clock className="h-3 w-3" />
                      {proveedor.diasRestantes < 0 
                        ? `${Math.abs(proveedor.diasRestantes)} días vencido`
                        : `${proveedor.diasRestantes} días`
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={estadoBadgeVariant(proveedor.estado)}>
                      {estadoLabel(proveedor.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredProveedores.map((proveedor) => (
          <Card key={proveedor.id}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{proveedor.nombre}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{proveedor.tipo}</p>
                    </div>
                  </div>
                  <Badge variant={estadoBadgeVariant(proveedor.estado)}>
                    {estadoLabel(proveedor.estado)}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {proveedor.plataformas.map((plataforma, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {plataforma}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Costo/Cuenta</p>
                    <p className="text-gray-900 dark:text-white flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {proveedor.costoPorCuenta}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Slots</p>
                    <p className="text-gray-900 dark:text-white flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {proveedor.slotsDisponibles}/{proveedor.slotsTotales}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Vencimiento</p>
                    <p className="text-gray-900 dark:text-white">{proveedor.fechaVencimiento}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Días Restantes</p>
                    <p className={`flex items-center gap-1 ${getDiasColor(proveedor.diasRestantes)}`}>
                      <Clock className="h-3 w-3" />
                      {proveedor.diasRestantes < 0 
                        ? `${Math.abs(proveedor.diasRestantes)} vencido`
                        : proveedor.diasRestantes
                      }
                    </p>
                  </div>
                </div>

                {proveedor.diasRestantes >= 0 && proveedor.diasRestantes <= 7 && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm text-yellow-700 dark:text-yellow-500">
                      Este proveedor está próximo a vencer
                    </p>
                  </div>
                )}

                {proveedor.diasRestantes < 0 && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-700 dark:text-red-500">
                      Proveedor vencido - Renovar o pausar cuentas asociadas
                    </p>
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}