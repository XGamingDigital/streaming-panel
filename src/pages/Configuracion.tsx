import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Settings, Upload, Shield } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const usuarios = [
  { id: '1', nombre: 'Juan Díaz', email: 'juan@email.com', rol: 'Vendedor', estado: 'activo' },
  { id: '2', nombre: 'María Sánchez', email: 'maria@email.com', rol: 'Admin', estado: 'activo' },
  { id: '3', nombre: 'Pedro García', email: 'pedro@email.com', rol: 'Soporte', estado: 'bloqueado' },
];

export function Configuracion() {
  const handleGuardar = () => {
    toast.success('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white">Configuración</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Administra la configuración del sistema
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="parametros">Parámetros</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="auditoria">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personalización</CardTitle>
              <CardDescription>
                Configura la apariencia del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre-sistema">Nombre del Sistema</Label>
                <Input id="nombre-sistema" defaultValue="Sistema de Gestión de Streaming" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo del Sistema</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-2xl">S</span>
                  </div>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Cambiar Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-principal">Color Principal</Label>
                <div className="flex items-center gap-4">
                  <Input id="color-principal" type="color" defaultValue="#9333ea" className="w-20 h-10" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">#9333ea</span>
                </div>
              </div>

              <Button onClick={handleGuardar} className="bg-purple-600 hover:bg-purple-700">
                Guardar Cambios
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parametros" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parámetros del Sistema</CardTitle>
              <CardDescription>
                Configura los valores predeterminados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="duracion-plan">Duración por Defecto de Planes (días)</Label>
                <Input id="duracion-plan" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="moneda">Moneda Principal</Label>
                <Select defaultValue="usd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - Dólar</SelectItem>
                    <SelectItem value="nio">NIO - Córdoba</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comision">Comisión por Vendedor (%)</Label>
                <Input id="comision" type="number" defaultValue="25" />
              </div>

              <div className="space-y-4">
                <h3 className="text-gray-900 dark:text-white">Módulos Activos</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="modulo-cupones" className="cursor-pointer">Cupones y Descuentos</Label>
                    <Switch id="modulo-cupones" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="modulo-proveedores" className="cursor-pointer">Gestión de Proveedores</Label>
                    <Switch id="modulo-proveedores" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="modulo-reportes" className="cursor-pointer">Reportes Avanzados</Label>
                    <Switch id="modulo-reportes" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="modulo-mensajes" className="cursor-pointer">Mensajes Automáticos</Label>
                    <Switch id="modulo-mensajes" defaultChecked />
                  </div>
                </div>
              </div>

              <Button onClick={handleGuardar} className="bg-purple-600 hover:bg-purple-700">
                Guardar Parámetros
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Usuarios del Sistema</CardTitle>
                  <CardDescription>
                    Gestiona los usuarios y sus permisos
                  </CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Nuevo Usuario
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell>{usuario.nombre}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{usuario.rol}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={usuario.estado === 'activo' ? 'default' : 'destructive'}>
                          {usuario.estado === 'activo' ? 'Activo' : 'Bloqueado'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">Editar</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            {usuario.estado === 'activo' ? 'Bloquear' : 'Activar'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auditoria" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Auditoría</CardTitle>
              <CardDescription>
                Últimas acciones importantes en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { accion: 'Venta registrada', usuario: 'Juan Díaz', fecha: '2024-12-02 10:30 AM', tipo: 'venta' },
                  { accion: 'Cliente creado', usuario: 'Juan Díaz', fecha: '2024-12-02 09:15 AM', tipo: 'cliente' },
                  { accion: 'Configuración modificada', usuario: 'María Sánchez', fecha: '2024-12-01 04:00 PM', tipo: 'config' },
                  { accion: 'Usuario bloqueado', usuario: 'María Sánchez', fecha: '2024-12-01 02:30 PM', tipo: 'seguridad' },
                ].map((log, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">{log.accion}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Por {log.usuario} • {log.fecha}
                      </p>
                    </div>
                    <Badge variant="outline">{log.tipo}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
