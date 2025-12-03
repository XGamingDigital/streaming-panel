import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Headphones, Plus, AlertCircle, MessageSquare, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const tickets = [
  {
    id: '1',
    cliente: 'María González',
    plataforma: 'Netflix',
    problema: 'No puede iniciar sesión',
    prioridad: 'alta',
    estado: 'abierto',
    asignadoA: 'Juan Díaz',
    fecha: '2024-12-02 10:00 AM'
  },
  {
    id: '2',
    cliente: 'Carlos Pérez',
    plataforma: 'Disney+',
    problema: 'Perfil no aparece',
    prioridad: 'media',
    estado: 'en_progreso',
    asignadoA: 'Juan Díaz',
    fecha: '2024-12-01 03:00 PM'
  },
  {
    id: '3',
    cliente: 'Ana Martínez',
    plataforma: 'Spotify',
    problema: 'Calidad de audio baja',
    prioridad: 'baja',
    estado: 'resuelto',
    asignadoA: 'Juan Díaz',
    fecha: '2024-11-30 11:00 AM'
  },
];

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
    case 'abierto':
      return 'destructive';
    case 'en_progreso':
      return 'secondary';
    case 'resuelto':
      return 'default';
    default:
      return 'outline';
  }
};

export function Soporte() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterEstado, setFilterEstado] = useState('todos');

  const handleNuevoTicket = () => {
    toast.success('Ticket creado exitosamente');
    setDialogOpen(false);
  };

  const filteredTickets = tickets.filter(ticket => {
    return filterEstado === 'todos' || ticket.estado === filterEstado;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Soporte y Problemas</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tickets de soporte de clientes
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Ticket
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Ticket</DialogTitle>
              <DialogDescription>
                Registra un problema o solicitud de soporte
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">María González</SelectItem>
                    <SelectItem value="2">Carlos Pérez</SelectItem>
                    <SelectItem value="3">Ana Martínez</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plataforma">Plataforma Afectada</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="netflix">Netflix</SelectItem>
                    <SelectItem value="disney">Disney+</SelectItem>
                    <SelectItem value="max">Max</SelectItem>
                    <SelectItem value="spotify">Spotify</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Problema *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="login">Problemas de inicio de sesión</SelectItem>
                    <SelectItem value="perfil">Perfil no disponible</SelectItem>
                    <SelectItem value="calidad">Problemas de calidad</SelectItem>
                    <SelectItem value="acceso">Sin acceso al servicio</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción del Problema *</Label>
                <Textarea id="descripcion" placeholder="Describe el problema..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prioridad-ticket">Prioridad</Label>
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
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleNuevoTicket}>
                Crear Ticket
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tickets Abiertos</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">
                  {tickets.filter(t => t.estado === 'abierto').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">En Progreso</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">
                  {tickets.filter(t => t.estado === 'en_progreso').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resueltos Hoy</p>
                <p className="text-3xl text-gray-900 dark:text-white mt-1">
                  {tickets.filter(t => t.estado === 'resuelto').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <Select value={filterEstado} onValueChange={setFilterEstado}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="abierto">Abiertos</SelectItem>
              <SelectItem value="en_progreso">En Progreso</SelectItem>
              <SelectItem value="resuelto">Resueltos</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Lista de Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Plataforma</TableHead>
                <TableHead>Problema</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Asignado a</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-mono">#{ticket.id}</TableCell>
                  <TableCell>{ticket.cliente}</TableCell>
                  <TableCell>{ticket.plataforma}</TableCell>
                  <TableCell>{ticket.problema}</TableCell>
                  <TableCell>
                    <Badge variant={prioridadBadge(ticket.prioridad)}>
                      {ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={estadoBadge(ticket.estado)}>
                      {ticket.estado === 'abierto' ? 'Abierto' : 
                       ticket.estado === 'en_progreso' ? 'En Progreso' : 'Resuelto'}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.asignadoA}</TableCell>
                  <TableCell>{ticket.fecha}</TableCell>
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
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ticket #{ticket.id}</p>
                    <h3 className="text-gray-900 dark:text-white mt-1">{ticket.cliente}</h3>
                  </div>
                  <Badge variant={estadoBadge(ticket.estado)}>
                    {ticket.estado === 'abierto' ? 'Abierto' : 
                     ticket.estado === 'en_progreso' ? 'En Progreso' : 'Resuelto'}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.problema}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{ticket.plataforma}</Badge>
                    <Badge variant={prioridadBadge(ticket.prioridad)}>
                      {ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Asignado a: {ticket.asignadoA}</p>
                  <p>{ticket.fecha}</p>
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