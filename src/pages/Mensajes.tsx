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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MessageSquare, Send, Copy, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const plantillas = [
  {
    id: '1',
    titulo: 'Bienvenida',
    categoria: 'onboarding',
    cuerpo: 'Hola {nombre_cliente}, ¡Bienvenido! Estamos encantados de tenerte con nosotros. Cualquier duda estamos a tu orden.',
    canal: 'WhatsApp'
  },
  {
    id: '2',
    titulo: 'Envío de Datos de Cuenta',
    categoria: 'ventas',
    cuerpo: '🎬 Hola {nombre_cliente}, aquí están los datos de tu cuenta de {servicio}:\n\nUsuario: {usuario}\nContraseña: {password}\nFecha de expiración: {fecha_expiracion}\n\n¡Disfruta!',
    canal: 'WhatsApp'
  },
  {
    id: '3',
    titulo: 'Recordatorio de Renovación',
    categoria: 'renovacion',
    cuerpo: '🔔 Hola {nombre_cliente}, tu plan de {servicio} vence el {fecha_expiracion}. ¿Deseas renovarlo? El precio es {monto}.',
    canal: 'WhatsApp'
  },
  {
    id: '4',
    titulo: 'Confirmación de Pago',
    categoria: 'pagos',
    cuerpo: '✅ Hola {nombre_cliente}, confirmamos tu pago de {monto} por {servicio}. ¡Gracias!',
    canal: 'WhatsApp'
  },
  {
    id: '5',
    titulo: 'Aviso de Suspensión',
    categoria: 'alertas',
    cuerpo: '⚠️ Hola {nombre_cliente}, tu servicio de {servicio} ha sido suspendido por falta de pago. Contacta con nosotros para renovarlo.',
    canal: 'WhatsApp'
  },
];

const logMensajes = [
  {
    id: '1',
    cliente: 'María González',
    tipo: 'Recordatorio de renovación',
    canal: 'WhatsApp',
    fecha: '2024-12-02 10:30 AM',
    estado: 'enviado'
  },
  {
    id: '2',
    cliente: 'Carlos Pérez',
    tipo: 'Envío de datos de cuenta',
    canal: 'WhatsApp',
    fecha: '2024-12-02 09:15 AM',
    estado: 'enviado'
  },
  {
    id: '3',
    cliente: 'Ana Martínez',
    tipo: 'Confirmación de pago',
    canal: 'Email',
    fecha: '2024-12-01 04:20 PM',
    estado: 'enviado'
  },
  {
    id: '4',
    cliente: 'Pedro López',
    tipo: 'Recordatorio de renovación',
    canal: 'WhatsApp',
    fecha: '2024-12-01 11:00 AM',
    estado: 'error'
  },
];

export function Mensajes() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlantilla, setSelectedPlantilla] = useState('');

  const handleEnviarMensaje = () => {
    toast.success('Mensaje enviado exitosamente');
    setDialogOpen(false);
  };

  const copiarPlantilla = (cuerpo: string) => {
    navigator.clipboard.writeText(cuerpo);
    toast.success('Plantilla copiada al portapapeles');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 dark:text-white">Mensajes y Notificaciones</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona plantillas y mensajes automáticos
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogOpen(true)}>
            <Send className="mr-2 h-4 w-4" />
            Enviar Mensaje Manual
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Enviar Mensaje Manual</DialogTitle>
              <DialogDescription>
                Selecciona un cliente y personaliza el mensaje
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
                    <SelectItem value="1">María González - +505 8888-8888</SelectItem>
                    <SelectItem value="2">Carlos Pérez - +505 7777-7777</SelectItem>
                    <SelectItem value="3">Ana Martínez - +505 6666-6666</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plantilla">Plantilla</Label>
                <Select value={selectedPlantilla} onValueChange={setSelectedPlantilla}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plantilla (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {plantillas.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.titulo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canal">Canal *</Label>
                <Select defaultValue="whatsapp">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje *</Label>
                <Textarea
                  id="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                  defaultValue={selectedPlantilla ? plantillas.find(p => p.id === selectedPlantilla)?.cuerpo : ''}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Variables disponibles: {'{nombre_cliente}'}, {'{servicio}'}, {'{fecha_expiracion}'}, {'{monto}'}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleEnviarMensaje}>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensaje
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="plantillas" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
          <TabsTrigger value="log">Log de Mensajes</TabsTrigger>
        </TabsList>

        <TabsContent value="plantillas" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {plantillas.map((plantilla) => (
              <Card key={plantilla.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plantilla.titulo}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{plantilla.categoria}</Badge>
                        <Badge variant="secondary">{plantilla.canal}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copiarPlantilla(plantilla.cuerpo)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {plantilla.cuerpo}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      Usar Plantilla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Plantilla</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título de la Plantilla</Label>
                  <Input id="titulo" placeholder="Ej: Promoción de Navidad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onboarding">Bienvenida</SelectItem>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="renovacion">Renovación</SelectItem>
                      <SelectItem value="pagos">Pagos</SelectItem>
                      <SelectItem value="alertas">Alertas</SelectItem>
                      <SelectItem value="promociones">Promociones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuerpo">Cuerpo del Mensaje</Label>
                <Textarea
                  id="cuerpo"
                  placeholder="Escribe tu plantilla aquí..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canal-plantilla">Canal Predeterminado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Guardar Plantilla
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Mensajes Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo de Mensaje</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logMensajes.map((mensaje) => (
                    <TableRow key={mensaje.id}>
                      <TableCell>{mensaje.cliente}</TableCell>
                      <TableCell>{mensaje.tipo}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{mensaje.canal}</Badge>
                      </TableCell>
                      <TableCell>{mensaje.fecha}</TableCell>
                      <TableCell>
                        {mensaje.estado === 'enviado' ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Enviado
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Error
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}