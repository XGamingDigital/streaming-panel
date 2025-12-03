import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { CheckSquare, Plus, Clock, CheckCircle, Circle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const tareas = [
  {
    id: '1',
    titulo: 'Llamar a María González',
    descripcion: 'Confirmar renovación de Netflix',
    fechaLimite: '2024-12-02',
    prioridad: 'alta',
    estado: 'pendiente',
    categoria: 'seguimiento'
  },
  {
    id: '2',
    titulo: 'Confirmar pago de Carlos Pérez',
    descripcion: 'Verificar transferencia de $15',
    fechaLimite: '2024-12-02',
    prioridad: 'alta',
    estado: 'en_progreso',
    categoria: 'pagos'
  },
  {
    id: '3',
    titulo: 'Revisar cuenta de Disney+',
    descripcion: 'Verificar perfiles disponibles',
    fechaLimite: '2024-12-03',
    prioridad: 'media',
    estado: 'pendiente',
    categoria: 'inventario'
  },
  {
    id: '4',
    titulo: 'Enviar datos a Ana Martínez',
    descripcion: 'Cuenta de Spotify Premium',
    fechaLimite: '2024-12-01',
    prioridad: 'baja',
    estado: 'completada',
    categoria: 'ventas'
  },
  {
    id: '5',
    titulo: 'Renovar proveedor StreamPro',
    descripcion: 'Contactar para renovar servicio mayorista',
    fechaLimite: '2024-12-04',
    prioridad: 'alta',
    estado: 'pendiente',
    categoria: 'proveedores'
  },
];

const prioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case 'alta':
      return 'border-l-red-500 bg-red-50 dark:bg-red-900/10';
    case 'media':
      return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10';
    case 'baja':
      return 'border-l-green-500 bg-green-50 dark:bg-green-900/10';
    default:
      return '';
  }
};

const prioridadBadge = (prioridad: string) => {
  switch (prioridad) {
    case 'alta':
      return 'destructive';
    case 'media':
      return 'secondary';
    case 'baja':
      return 'outline';
    default:
      return 'default';
  }
};

const estadoBadge = (estado: string) => {
  switch (estado) {
    case 'completada':
      return 'default';
    case 'en_progreso':
      return 'secondary';
    case 'pendiente':
      return 'outline';
    default:
      return 'outline';
  }
};

export function Tareas() {
  const [filterEstado, setFilterEstado] = useState('todas');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNuevaTarea = () => {
    toast.success('Tarea creada exitosamente');
    setDialogOpen(false);
  };

  const handleCompletarTarea = (id: string) => {
    toast.success('Tarea completada');
  };

  const filteredTareas = tareas.filter(tarea => {
    if (filterEstado === 'todas') return true;
    return tarea.estado === filterEstado;
  });

  const contadores = {
    pendientes: tareas.filter(t => t.estado === 'pendiente').length,
    enProgreso: tareas.filter(t => t.estado === 'en_progreso').length,
    completadas: tareas.filter(t => t.estado === 'completada').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Tareas del Vendedor</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Organiza tu trabajo diario
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Tarea
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
              <DialogDescription>
                Define los detalles de la tarea
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input id="titulo" placeholder="Ej: Llamar cliente" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea id="descripcion" placeholder="Detalles de la tarea..." rows={3} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha Límite</Label>
                  <Input id="fecha" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seguimiento">Seguimiento</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="pagos">Pagos</SelectItem>
                    <SelectItem value="inventario">Inventario</SelectItem>
                    <SelectItem value="proveedores">Proveedores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleNuevaTarea}>
                Crear Tarea
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterEstado('pendiente')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pendientes</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.pendientes}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <Circle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterEstado('en_progreso')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">En Progreso</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.enProgreso}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterEstado('completada')}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completadas</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">{contadores.completadas}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las tareas</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="en_progreso">En Progreso</SelectItem>
                <SelectItem value="completada">Completadas</SelectItem>
              </SelectContent>
            </Select>
            {filterEstado !== 'todas' && (
              <Button variant="outline" onClick={() => setFilterEstado('todas')}>
                Limpiar Filtro
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTareas.map((tarea) => (
          <Card key={tarea.id} className={`border-l-4 ${prioridadColor(tarea.prioridad)}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={tarea.estado === 'completada'}
                  onCheckedChange={() => handleCompletarTarea(tarea.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className={`text-gray-900 dark:text-white ${tarea.estado === 'completada' ? 'line-through opacity-60' : ''}`}>
                      {tarea.titulo}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={prioridadBadge(tarea.prioridad)}>
                        {tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}
                      </Badge>
                      <Badge variant={estadoBadge(tarea.estado)}>
                        {tarea.estado === 'pendiente' ? 'Pendiente' : 
                         tarea.estado === 'en_progreso' ? 'En Progreso' : 'Completada'}
                      </Badge>
                    </div>
                  </div>
                  
                  {tarea.descripcion && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {tarea.descripcion}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tarea.fechaLimite}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tarea.categoria}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTareas.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <CheckSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 dark:text-white mb-2">No hay tareas</h3>
            <p className="text-gray-500 dark:text-gray-400">
              No se encontraron tareas con este filtro
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}