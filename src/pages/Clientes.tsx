import { useState } from 'react';
import { Link } from 'react-router';
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
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { UserPlus, Search, Filter, MessageSquare, Eye, Edit, Ban } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const clientes = [
  {
    id: '1',
    nombre: 'María González',
    whatsapp: '+505 8888-8888',
    correo: 'maria@email.com',
    serviciosActivos: 3,
    estado: 'activo',
    fechaAlta: '2024-01-15',
    plataformas: ['Netflix', 'Disney+', 'Spotify']
  },
  {
    id: '2',
    nombre: 'Carlos Pérez',
    whatsapp: '+505 7777-7777',
    correo: 'carlos@email.com',
    serviciosActivos: 1,
    estado: 'moroso',
    fechaAlta: '2024-02-20',
    plataformas: ['Max']
  },
  {
    id: '3',
    nombre: 'Ana Martínez',
    whatsapp: '+505 6666-6666',
    correo: 'ana@email.com',
    serviciosActivos: 2,
    estado: 'por_renovar',
    fechaAlta: '2024-03-10',
    plataformas: ['Netflix', 'Max']
  },
  {
    id: '4',
    nombre: 'Pedro López',
    whatsapp: '+505 5555-5555',
    correo: 'pedro@email.com',
    serviciosActivos: 0,
    estado: 'inactivo',
    fechaAlta: '2024-01-05',
    plataformas: []
  },
];

const estadoBadgeVariant = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'default';
    case 'moroso':
      return 'destructive';
    case 'por_renovar':
      return 'secondary';
    case 'inactivo':
      return 'outline';
    default:
      return 'default';
  }
};

const estadoLabel = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'Activo';
    case 'moroso':
      return 'Moroso';
    case 'por_renovar':
      return 'Por Renovar';
    case 'inactivo':
      return 'Inactivo';
    default:
      return estado;
  }
};

export function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNuevoCliente = () => {
    toast.success('Cliente creado exitosamente');
    setDialogOpen(false);
  };

  const filteredClientes = clientes.filter(cliente => {
    const matchSearch = 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.whatsapp.includes(searchTerm) ||
      cliente.correo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchEstado = filterEstado === 'todos' || cliente.estado === filterEstado;
    
    return matchSearch && matchEstado;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Gestión de Clientes</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Administra tu base de clientes
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nuevo Cliente</DialogTitle>
              <DialogDescription>
                Ingresa los datos del nuevo cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input id="nombre" placeholder="Ej: Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono (WhatsApp) *</Label>
                  <Input id="telefono" placeholder="+505 8888-8888" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input id="correo" type="email" placeholder="correo@ejemplo.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pais">País / Zona Horaria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ni">Nicaragua (GMT-6)</SelectItem>
                      <SelectItem value="mx">México (GMT-6)</SelectItem>
                      <SelectItem value="es">España (GMT+1)</SelectItem>
                      <SelectItem value="ar">Argentina (GMT-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferencias">Plataformas Favoritas</Label>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="notas">Notas Internas</Label>
                <Textarea 
                  id="notas" 
                  placeholder="Notas sobre el cliente..." 
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mensajes" />
                <Label htmlFor="mensajes" className="cursor-pointer">
                  Autoriza recibir mensajes automáticos
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleNuevoCliente}>
                Guardar Cliente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, teléfono o correo..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="moroso">Moroso</SelectItem>
                <SelectItem value="por_renovar">Por Renovar</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Lista de Clientes ({filteredClientes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Servicios Activos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Alta</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.whatsapp}</TableCell>
                  <TableCell>{cliente.correo}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cliente.serviciosActivos}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={estadoBadgeVariant(cliente.estado)}>
                      {estadoLabel(cliente.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell>{cliente.fechaAlta}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/clientes/${cliente.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Ban className="h-4 w-4 text-red-500" />
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
        {filteredClientes.map((cliente) => (
          <Card key={cliente.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-gray-900 dark:text-white">{cliente.nombre}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {cliente.whatsapp}
                    </p>
                  </div>
                  <Badge variant={estadoBadgeVariant(cliente.estado)}>
                    {estadoLabel(cliente.estado)}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Servicios activos:</span>
                  <Badge variant="outline">{cliente.serviciosActivos}</Badge>
                </div>

                {cliente.plataformas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cliente.plataformas.map((plataforma) => (
                      <Badge key={plataforma} variant="secondary" className="text-xs">
                        {plataforma}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to={`/clientes/${cliente.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Más
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
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