import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
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
import { Package, Plus, Filter, AlertTriangle, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const cuentas = [
  {
    id: '1',
    plataforma: 'Netflix',
    usuario: 'netflix@cuenta1.com',
    tipo: 'Premium',
    perfilesDisponibles: 2,
    perfilesTotales: 4,
    fechaCompra: '2024-10-01',
    fechaExpiracion: '2024-12-30',
    estado: 'disponible',
    notas: 'Cuenta principal',
    color: 'bg-red-600'
  },
  {
    id: '2',
    plataforma: 'Disney+',
    usuario: 'disney@cuenta1.com',
    tipo: 'Estándar',
    perfilesDisponibles: 1,
    perfilesTotales: 4,
    fechaCompra: '2024-11-01',
    fechaExpiracion: '2024-12-15',
    estado: 'asignada',
    notas: '',
    color: 'bg-blue-600'
  },
  {
    id: '3',
    plataforma: 'Max',
    usuario: 'max@cuenta1.com',
    tipo: 'Premium',
    perfilesDisponibles: 0,
    perfilesTotales: 3,
    fechaCompra: '2024-09-15',
    fechaExpiracion: '2024-12-05',
    estado: 'asignada',
    notas: 'Próxima a vencer',
    color: 'bg-purple-600'
  },
  {
    id: '4',
    plataforma: 'Spotify',
    usuario: 'spotify@cuenta1.com',
    tipo: 'Premium',
    perfilesDisponibles: 5,
    perfilesTotales: 6,
    fechaCompra: '2024-11-20',
    fechaExpiracion: '2025-01-20',
    estado: 'disponible',
    notas: '',
    color: 'bg-green-600'
  },
  {
    id: '5',
    plataforma: 'Netflix',
    usuario: 'netflix@cuenta2.com',
    tipo: 'Básico',
    perfilesDisponibles: 0,
    perfilesTotales: 1,
    fechaCompra: '2024-08-01',
    fechaExpiracion: '2024-11-30',
    estado: 'expirada',
    notas: 'Renovar pronto',
    color: 'bg-red-600'
  },
];

const estadoBadgeVariant = (estado: string) => {
  switch (estado) {
    case 'disponible':
      return 'default';
    case 'asignada':
      return 'secondary';
    case 'expirada':
      return 'destructive';
    case 'problema':
      return 'outline';
    default:
      return 'default';
  }
};

const estadoLabel = (estado: string) => {
  switch (estado) {
    case 'disponible':
      return 'Disponible';
    case 'asignada':
      return 'Asignada';
    case 'expirada':
      return 'Expirada';
    case 'problema':
      return 'Problema';
    default:
      return estado;
  }
};

export function Inventario() {
  const [filterPlatform, setFilterPlatform] = useState('todas');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNuevaCuenta = () => {
    toast.success('Cuenta agregada al inventario');
    setDialogOpen(false);
  };

  const filteredCuentas = cuentas.filter(cuenta => {
    const matchPlatform = filterPlatform === 'todas' || cuenta.plataforma.toLowerCase() === filterPlatform;
    const matchEstado = filterEstado === 'todos' || cuenta.estado === filterEstado;
    return matchPlatform && matchEstado;
  });

  // Contador de cuentas por plataforma
  const contadores = {
    netflix: cuentas.filter(c => c.plataforma === 'Netflix' && c.estado === 'disponible').length,
    disney: cuentas.filter(c => c.plataforma === 'Disney+' && c.estado === 'disponible').length,
    max: cuentas.filter(c => c.plataforma === 'Max' && c.estado === 'disponible').length,
    spotify: cuentas.filter(c => c.plataforma === 'Spotify' && c.estado === 'disponible').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Gestión de Inventario</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Administra tus cuentas de streaming
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Cuenta
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Cuenta al Inventario</DialogTitle>
              <DialogDescription>
                Registra una nueva cuenta de streaming
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plataforma">Plataforma *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="netflix">Netflix</SelectItem>
                      <SelectItem value="disney">Disney+</SelectItem>
                      <SelectItem value="max">Max</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="prime">Prime Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Plan *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="estandar">Estándar</SelectItem>
                      <SelectItem value="basico">Básico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario / Correo *</Label>
                <Input id="usuario" placeholder="usuario@cuenta.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="perfiles">Perfiles Totales</Label>
                  <Input id="perfiles" type="number" defaultValue="4" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disponibles">Perfiles Disponibles</Label>
                  <Input id="disponibles" type="number" defaultValue="4" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="compra">Fecha de Compra</Label>
                  <Input id="compra" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiracion">Fecha de Expiración</Label>
                  <Input id="expiracion" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notas">Notas Internas</Label>
                <Textarea id="notas" placeholder="Notas sobre esta cuenta..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleNuevaCuenta}>
                Agregar Cuenta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contadores por Plataforma */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Netflix</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{contadores.netflix}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-red-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            {contadores.netflix < 2 && (
              <div className="flex items-center gap-1 mt-2 text-xs text-yellow-600">
                <AlertTriangle className="h-3 w-3" />
                Stock bajo
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Disney+</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{contadores.disney}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            {contadores.disney < 2 && (
              <div className="flex items-center gap-1 mt-2 text-xs text-yellow-600">
                <AlertTriangle className="h-3 w-3" />
                Stock bajo
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Max</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{contadores.max}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            {contadores.max < 2 && (
              <div className="flex items-center gap-1 mt-2 text-xs text-yellow-600">
                <AlertTriangle className="h-3 w-3" />
                Stock bajo
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Spotify</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">{contadores.spotify}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={filterPlatform} onValueChange={setFilterPlatform}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las plataformas</SelectItem>
                <SelectItem value="netflix">Netflix</SelectItem>
                <SelectItem value="disney+">Disney+</SelectItem>
                <SelectItem value="max">Max</SelectItem>
                <SelectItem value="spotify">Spotify</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="asignada">Asignada</SelectItem>
                <SelectItem value="expirada">Expirada</SelectItem>
                <SelectItem value="problema">Problema</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Cuentas en Inventario ({filteredCuentas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plataforma</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Perfiles</TableHead>
                <TableHead>Fecha Compra</TableHead>
                <TableHead>Expira</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Notas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCuentas.map((cuenta) => (
                <TableRow key={cuenta.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded ${cuenta.color} flex items-center justify-center`}>
                        <span className="text-white text-xs">{cuenta.plataforma[0]}</span>
                      </div>
                      {cuenta.plataforma}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{cuenta.usuario}</TableCell>
                  <TableCell>{cuenta.tipo}</TableCell>
                  <TableCell>
                    <span className={cuenta.perfilesDisponibles === 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'}>
                      {cuenta.perfilesDisponibles}/{cuenta.perfilesTotales}
                    </span>
                  </TableCell>
                  <TableCell>{cuenta.fechaCompra}</TableCell>
                  <TableCell>{cuenta.fechaExpiracion}</TableCell>
                  <TableCell>
                    <Badge variant={estadoBadgeVariant(cuenta.estado)}>
                      {estadoLabel(cuenta.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{cuenta.notas || '-'}</TableCell>
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
        {filteredCuentas.map((cuenta) => (
          <Card key={cuenta.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 rounded-lg ${cuenta.color} flex items-center justify-center`}>
                      <span className="text-white">{cuenta.plataforma[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{cuenta.plataforma}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{cuenta.tipo}</p>
                    </div>
                  </div>
                  <Badge variant={estadoBadgeVariant(cuenta.estado)}>
                    {estadoLabel(cuenta.estado)}
                  </Badge>
                </div>
                
                <div className="text-sm space-y-1">
                  <p className="text-gray-600 dark:text-gray-400">
                    Usuario: <span className="font-mono text-xs">{cuenta.usuario}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Perfiles: <span className={cuenta.perfilesDisponibles === 0 ? 'text-red-600' : ''}>
                      {cuenta.perfilesDisponibles}/{cuenta.perfilesTotales} disponibles
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Expira: {cuenta.fechaExpiracion}
                  </p>
                  {cuenta.notas && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Notas: {cuenta.notas}
                    </p>
                  )}
                </div>

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