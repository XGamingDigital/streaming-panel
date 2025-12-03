import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
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
import { Ticket, Plus, Percent } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const cupones = [
  {
    id: '1',
    codigo: 'NAVIDAD2024',
    tipo: 'porcentaje',
    valor: 20,
    fechaInicio: '2024-12-01',
    fechaFin: '2024-12-25',
    vecesUsado: 15,
    limite: 100,
    estado: 'activo',
    plataformas: ['Netflix', 'Disney+']
  },
  {
    id: '2',
    codigo: 'PRIMERAVEZ',
    tipo: 'monto',
    valor: 5,
    fechaInicio: '2024-01-01',
    fechaFin: '2024-12-31',
    vecesUsado: 45,
    limite: null,
    estado: 'activo',
    plataformas: ['Todas']
  },
  {
    id: '3',
    codigo: 'VERANO2024',
    tipo: 'porcentaje',
    valor: 15,
    fechaInicio: '2024-06-01',
    fechaFin: '2024-08-31',
    vecesUsado: 80,
    limite: 100,
    estado: 'caducado',
    plataformas: ['Spotify', 'YouTube Premium']
  },
];

export function Cupones() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleNuevoCupon = () => {
    toast.success('Cupón creado exitosamente');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Cupones y Descuentos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona cupones y promociones
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cupón
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Cupón</DialogTitle>
              <DialogDescription>
                Define los parámetros del cupón de descuento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código del Cupón *</Label>
                  <Input id="codigo" placeholder="Ej: NAVIDAD2024" className="uppercase" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Descuento *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="porcentaje">Porcentaje (%)</SelectItem>
                      <SelectItem value="monto">Monto Fijo ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor">Valor del Descuento *</Label>
                <Input id="valor" type="number" placeholder="Ej: 20 para 20% o $20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input id="descripcion" placeholder="Ej: Descuento de Navidad" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inicio">Fecha de Inicio</Label>
                  <Input id="inicio" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fin">Fecha de Fin</Label>
                  <Input id="fin" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limite">Límite de Usos (opcional)</Label>
                <Input id="limite" type="number" placeholder="Dejar vacío para ilimitado" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plataformas">Plataformas Aplicables</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las plataformas</SelectItem>
                    <SelectItem value="netflix">Solo Netflix</SelectItem>
                    <SelectItem value="disney">Solo Disney+</SelectItem>
                    <SelectItem value="max">Solo Max</SelectItem>
                    <SelectItem value="spotify">Solo Spotify</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleNuevoCupon}>
                Crear Cupón
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Cupones Activos</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">
                  {cupones.filter(c => c.estado === 'activo').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Ticket className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Usos</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">
                  {cupones.reduce((sum, c) => sum + c.vecesUsado, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Percent className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Descuento Promedio</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">18%</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Lista de Cupones</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Válido Desde</TableHead>
                <TableHead>Válido Hasta</TableHead>
                <TableHead>Usos</TableHead>
                <TableHead>Plataformas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cupones.map((cupon) => (
                <TableRow key={cupon.id}>
                  <TableCell className="font-mono">{cupon.codigo}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {cupon.tipo === 'porcentaje' ? 'Porcentaje' : 'Monto Fijo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {cupon.tipo === 'porcentaje' ? `${cupon.valor}%` : `$${cupon.valor}`}
                  </TableCell>
                  <TableCell>{cupon.fechaInicio}</TableCell>
                  <TableCell>{cupon.fechaFin}</TableCell>
                  <TableCell>
                    {cupon.vecesUsado}
                    {cupon.limite && ` / ${cupon.limite}`}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cupon.plataformas.map((plataforma, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {plataforma}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={cupon.estado === 'activo' ? 'default' : 'destructive'}>
                      {cupon.estado === 'activo' ? 'Activo' : 'Caducado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Desactivar
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
        {cupones.map((cupon) => (
          <Card key={cupon.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-mono">{cupon.codigo}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {cupon.tipo === 'porcentaje' ? `${cupon.valor}% de descuento` : `$${cupon.valor} de descuento`}
                    </p>
                  </div>
                  <Badge variant={cupon.estado === 'activo' ? 'default' : 'destructive'}>
                    {cupon.estado === 'activo' ? 'Activo' : 'Caducado'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {cupon.plataformas.map((plataforma, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {plataforma}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Válido hasta</p>
                    <p className="text-gray-900 dark:text-white">{cupon.fechaFin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Usos</p>
                    <p className="text-gray-900 dark:text-white">
                      {cupon.vecesUsado}
                      {cupon.limite && ` / ${cupon.limite}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">Editar</Button>
                  <Button variant="outline" className="flex-1 text-red-600" size="sm">
                    Desactivar
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