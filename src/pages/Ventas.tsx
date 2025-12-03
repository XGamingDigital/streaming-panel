import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ShoppingCart, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const plataformas = [
  { id: 'netflix', nombre: 'Netflix', color: 'bg-red-600' },
  { id: 'disney', nombre: 'Disney+', color: 'bg-blue-600' },
  { id: 'max', nombre: 'Max', color: 'bg-purple-600' },
  { id: 'spotify', nombre: 'Spotify', color: 'bg-green-600' },
  { id: 'prime', nombre: 'Prime Video', color: 'bg-cyan-600' },
];

export function Ventas() {
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [plan, setPlan] = useState('');
  const [precio, setPrecio] = useState('');
  const [costo, setCosto] = useState('');
  const [showResumen, setShowResumen] = useState(false);

  const handleConfirmarVenta = () => {
    setShowResumen(true);
    toast.success('Venta registrada exitosamente');
  };

  const copiarResumen = () => {
    const texto = `
🎬 ¡Tu servicio está listo!

Cliente: María González
Servicio: Netflix Premium
Plan: 1 mes
Fecha inicio: 02/12/2024
Fecha expiración: 02/01/2025
Precio: $15.00

Usuario: netflix@cuenta.com
Contraseña: password123

¡Gracias por tu compra! 🎉
    `.trim();
    
    navigator.clipboard.writeText(texto);
    toast.success('Resumen copiado al portapapeles');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white">Registrar Nueva Venta</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Completa los datos de la venta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seleccionar Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>1. Seleccionar Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Buscar o seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">María González - +505 8888-8888</SelectItem>
                    <SelectItem value="2">Carlos Pérez - +505 7777-7777</SelectItem>
                    <SelectItem value="3">Ana Martínez - +505 6666-6666</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full">
                + Crear Nuevo Cliente
              </Button>
            </CardContent>
          </Card>

          {/* Seleccionar Servicio */}
          <Card>
            <CardHeader>
              <CardTitle>2. Seleccionar Servicio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Plataforma *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {plataformas.map((plataforma) => (
                    <button
                      key={plataforma.id}
                      onClick={() => setSelectedPlatform(plataforma.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPlatform === plataforma.id
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className={`h-12 w-12 rounded-lg ${plataforma.color} mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-white text-xl">{plataforma.nombre[0]}</span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-white text-center">
                        {plataforma.nombre}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuenta">Cuenta de Inventario</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Asignación automática" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Asignación automática</SelectItem>
                    <SelectItem value="1">Cuenta #1 - Premium (2 slots disponibles)</SelectItem>
                    <SelectItem value="2">Cuenta #2 - Estándar (1 slot disponible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plan">Tipo de Plan *</Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1mes">1 mes</SelectItem>
                      <SelectItem value="3meses">3 meses</SelectItem>
                      <SelectItem value="6meses">6 meses</SelectItem>
                      <SelectItem value="perfil">Perfil compartido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion">Duración (días)</Label>
                  <Input id="duracion" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inicio">Fecha de Inicio</Label>
                  <Input id="inicio" type="date" defaultValue="2024-12-02" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiracion">Fecha de Expiración</Label>
                  <Input id="expiracion" type="date" defaultValue="2025-01-02" className="bg-gray-50 dark:bg-gray-900" readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles de Pago */}
          <Card>
            <CardHeader>
              <CardTitle>3. Detalles de Pago</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="precio">Precio de Venta *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                      id="precio" 
                      type="number" 
                      className="pl-7" 
                      placeholder="0.00"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costo">Costo Base</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input 
                      id="costo" 
                      type="number" 
                      className="pl-7" 
                      placeholder="0.00"
                      value={costo}
                      onChange={(e) => setCosto(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ganancia</Label>
                  <div className="h-10 px-3 rounded-md border border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-900/20 flex items-center">
                    <span className="text-green-600">
                      ${precio && costo ? (parseFloat(precio) - parseFloat(costo)).toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moneda">Moneda</Label>
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
                  <Label htmlFor="metodo">Método de Pago *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">Efectivo</SelectItem>
                      <SelectItem value="transferencia">Transferencia</SelectItem>
                      <SelectItem value="tarjeta">Tarjeta</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cupon">Cupón de Descuento</Label>
                <div className="flex gap-2">
                  <Input id="cupon" placeholder="Código de cupón" />
                  <Button variant="outline">Aplicar</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="enviar-whatsapp" defaultChecked />
                  <Label htmlFor="enviar-whatsapp" className="cursor-pointer">
                    Enviar datos de la cuenta al cliente por WhatsApp
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="programar-renovacion" defaultChecked />
                  <Label htmlFor="programar-renovacion" className="cursor-pointer">
                    Programar mensaje automático de renovación
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleConfirmarVenta}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Confirmar Venta
          </Button>
        </div>

        {/* Resumen Lateral */}
        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumen de Venta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedClient ? (
                <>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
                    <p className="text-gray-900 dark:text-white mt-1">María González</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+505 8888-8888</p>
                  </div>
                  <Separator />
                </>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Selecciona un cliente para comenzar</p>
              )}

              {selectedPlatform && (
                <>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Servicio</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {plataformas.find(p => p.id === selectedPlatform)?.nombre}
                      </Badge>
                      {plan && <Badge variant="outline">{plan}</Badge>}
                    </div>
                  </div>
                  <Separator />
                </>
              )}

              {precio && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Precio</span>
                      <span className="text-gray-900 dark:text-white">${precio}</span>
                    </div>
                    {costo && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Costo</span>
                          <span className="text-gray-900 dark:text-white">${costo}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-green-600">Ganancia</span>
                          <span className="text-green-600">
                            ${(parseFloat(precio) - parseFloat(costo)).toFixed(2)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <Separator />
                </>
              )}

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fechas</p>
                <div className="space-y-1 mt-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Inicio</span>
                    <span className="text-gray-900 dark:text-white">02/12/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Expiración</span>
                    <span className="text-gray-900 dark:text-white">02/01/2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumen para copiar (se muestra después de confirmar) */}
          {showResumen && (
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-900 dark:text-green-100">
                    ¡Venta Confirmada!
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-sm space-y-2">
                  <p className="text-gray-900 dark:text-white">🎬 ¡Tu servicio está listo!</p>
                  <Separator />
                  <p><span className="text-gray-500">Cliente:</span> María González</p>
                  <p><span className="text-gray-500">Servicio:</span> Netflix Premium</p>
                  <p><span className="text-gray-500">Plan:</span> 1 mes</p>
                  <p><span className="text-gray-500">Precio:</span> $15.00</p>
                  <Separator />
                  <p><span className="text-gray-500">Usuario:</span> netflix@cuenta.com</p>
                  <p><span className="text-gray-500">Contraseña:</span> password123</p>
                  <Separator />
                  <p className="text-center">¡Gracias por tu compra! 🎉</p>
                </div>
                <Button onClick={copiarResumen} className="w-full" variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar Resumen
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
