import { useParams, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { ArrowLeft, ShoppingCart, RotateCcw, MessageSquare, AlertCircle } from 'lucide-react';
import { Textarea } from '../components/ui/textarea';

const clienteData = {
  id: '1',
  nombre: 'María González',
  whatsapp: '+505 8888-8888',
  correo: 'maria@email.com',
  estado: 'activo',
  etiquetas: ['VIP', 'Cliente Frecuente'],
  fechaAlta: '2024-01-15',
};

const serviciosActivos = [
  {
    id: '1',
    plataforma: 'Netflix',
    plan: 'Premium',
    fechaInicio: '2024-11-15',
    fechaExpiracion: '2024-12-15',
    diasRestantes: 13,
    estado: 'activo',
    precio: '$15.00',
  },
  {
    id: '2',
    plataforma: 'Disney+',
    plan: 'Estándar',
    fechaInicio: '2024-11-01',
    fechaExpiracion: '2024-12-01',
    diasRestantes: -1,
    estado: 'expirado',
    precio: '$10.00',
  },
  {
    id: '3',
    plataforma: 'Spotify',
    plan: 'Premium',
    fechaInicio: '2024-11-20',
    fechaExpiracion: '2024-12-20',
    diasRestantes: 18,
    estado: 'activo',
    precio: '$8.00',
  },
];

const historialCompras = [
  {
    id: '1',
    fecha: '2024-11-20',
    servicio: 'Spotify Premium',
    monto: '$8.00',
    metodoPago: 'Transferencia',
  },
  {
    id: '2',
    fecha: '2024-11-15',
    servicio: 'Netflix Premium',
    monto: '$15.00',
    metodoPago: 'Efectivo',
  },
  {
    id: '3',
    fecha: '2024-11-01',
    servicio: 'Disney+ Estándar',
    monto: '$10.00',
    metodoPago: 'Transferencia',
  },
];

const mensajesEnviados = [
  {
    id: '1',
    tipo: 'Recordatorio de renovación',
    fecha: '2024-11-30 10:30 AM',
    canal: 'WhatsApp',
    estado: 'Enviado',
  },
  {
    id: '2',
    tipo: 'Envío de datos de cuenta',
    fecha: '2024-11-20 09:15 AM',
    canal: 'WhatsApp',
    estado: 'Enviado',
  },
  {
    id: '3',
    tipo: 'Confirmación de pago',
    fecha: '2024-11-15 02:00 PM',
    canal: 'WhatsApp',
    estado: 'Enviado',
  },
];

export function ClienteDetalle() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/clientes">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900 dark:text-white">{clienteData.nombre}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="default">Activo</Badge>
            <Badge variant="secondary">VIP</Badge>
            <Badge variant="outline">Cliente Frecuente</Badge>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/ventas">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Nueva Venta
            </Link>
          </Button>
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Renovar
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mensaje
          </Button>
        </div>
      </div>

      {/* Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
              <p className="text-gray-900 dark:text-white mt-1">{clienteData.whatsapp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Correo</p>
              <p className="text-gray-900 dark:text-white mt-1">{clienteData.correo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cliente desde</p>
              <p className="text-gray-900 dark:text-white mt-1">{clienteData.fechaAlta}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="servicios" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="servicios">Servicios</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
          <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
          <TabsTrigger value="notas">Notas</TabsTrigger>
        </TabsList>

        <TabsContent value="servicios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Servicios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviciosActivos.map((servicio) => (
                  <div
                    key={servicio.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-gray-900 dark:text-white">
                          {servicio.plataforma} - {servicio.plan}
                        </h3>
                        <Badge variant={servicio.estado === 'activo' ? 'default' : 'destructive'}>
                          {servicio.estado === 'activo' ? 'Activo' : 'Expirado'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Expira</p>
                          <p className="text-gray-900 dark:text-white">{servicio.fechaExpiracion}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Días restantes</p>
                          <p className={`${servicio.diasRestantes < 0 ? 'text-red-600' : servicio.diasRestantes < 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {servicio.diasRestantes < 0 ? 'Vencido' : `${servicio.diasRestantes} días`}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Precio</p>
                          <p className="text-gray-900 dark:text-white">{servicio.precio}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 sm:mt-0">
                      <Button variant="outline" size="sm">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Renovar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método de Pago</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historialCompras.map((compra) => (
                    <TableRow key={compra.id}>
                      <TableCell>{compra.fecha}</TableCell>
                      <TableCell>{compra.servicio}</TableCell>
                      <TableCell>{compra.monto}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{compra.metodoPago}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mensajes">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mensajesEnviados.map((mensaje) => (
                    <TableRow key={mensaje.id}>
                      <TableCell>{mensaje.tipo}</TableCell>
                      <TableCell>{mensaje.fecha}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{mensaje.canal}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{mensaje.estado}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagos">
          <Card>
            <CardHeader>
              <CardTitle>Pagos y Deudas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Pagado</p>
                    <p className="text-2xl text-gray-900 dark:text-white mt-1">$33.00</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Saldo Pendiente</p>
                    <p className="text-2xl text-red-600 mt-1">$0.00</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Último Pago</p>
                    <p className="text-gray-900 dark:text-white mt-1">2024-11-20</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Historial de pagos disponible en la pestaña "Historial"
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notas">
          <Card>
            <CardHeader>
              <CardTitle>Notas Internas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Escribe notas sobre este cliente..."
                rows={6}
                defaultValue="Cliente preferente, siempre paga a tiempo. Prefiere recibir mensajes por WhatsApp en horario de tarde."
              />
              <Button className="bg-purple-600 hover:bg-purple-700">
                Guardar Notas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}