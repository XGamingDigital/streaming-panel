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
import { Wallet, DollarSign, CreditCard, TrendingUp, Plus, Lock, Unlock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const ventasHoy = [
  { id: '1', cliente: 'María González', servicio: 'Netflix Premium', monto: 15, metodo: 'Transferencia', hora: '10:30 AM' },
  { id: '2', cliente: 'Carlos Pérez', servicio: 'Spotify Premium', monto: 8, metodo: 'Efectivo', hora: '11:15 AM' },
  { id: '3', cliente: 'Ana Martínez', servicio: 'Disney+ Estándar', monto: 10, metodo: 'Transferencia', hora: '02:45 PM' },
  { id: '4', cliente: 'Pedro López', servicio: 'Max Premium', monto: 12, metodo: 'Efectivo', hora: '04:20 PM' },
];

export function Caja() {
  const [cajaAbierta, setCajaAbierta] = useState(true);
  const [dialogPago, setDialogPago] = useState(false);
  const [dialogCierre, setDialogCierre] = useState(false);

  const totalCobrado = ventasHoy.reduce((sum, v) => sum + v.monto, 0);
  const totalEfectivo = ventasHoy.filter(v => v.metodo === 'Efectivo').reduce((sum, v) => sum + v.monto, 0);
  const totalTransferencia = ventasHoy.filter(v => v.metodo === 'Transferencia').reduce((sum, v) => sum + v.monto, 0);

  const handleRegistrarPago = () => {
    toast.success('Pago registrado exitosamente');
    setDialogPago(false);
  };

  const handleCerrarCaja = () => {
    setCajaAbierta(false);
    toast.success('Caja cerrada exitosamente');
    setDialogCierre(false);
  };

  const handleAbrirCaja = () => {
    setCajaAbierta(true);
    toast.success('Caja abierta');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-gray-900 dark:text-white">Caja y Pagos</h1>
            {cajaAbierta ? (
              <Badge variant="default" className="gap-1">
                <Unlock className="h-3 w-3" />
                Abierta
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <Lock className="h-3 w-3" />
                Cerrada
              </Badge>
            )}
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Control de dinero y movimientos del día
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {cajaAbierta ? (
            <>
              <Dialog open={dialogPago} onOpenChange={setDialogPago}>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setDialogPago(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Registrar Pago
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Registrar Nuevo Pago</DialogTitle>
                    <DialogDescription>
                      Ingresa los detalles del pago recibido
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="cliente-pago">Cliente</Label>
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
                      <Label htmlFor="monto-pago">Monto *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input id="monto-pago" type="number" className="pl-7" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="metodo-pago">Método de Pago *</Label>
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
                    <div className="space-y-2">
                      <Label htmlFor="concepto">Concepto</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venta">Pago de venta</SelectItem>
                          <SelectItem value="deuda">Pago de deuda</SelectItem>
                          <SelectItem value="renovacion">Renovación</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogPago(false)}>
                      Cancelar
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleRegistrarPago}>
                      Registrar Pago
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={dialogCierre} onOpenChange={setDialogCierre}>
                <Button variant="outline" onClick={() => setDialogCierre(true)}>
                  <Lock className="mr-2 h-4 w-4" />
                  Cerrar Caja
                </Button>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Cierre de Caja</DialogTitle>
                    <DialogDescription>
                      Revisa el resumen antes de cerrar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Ventas</p>
                          <p className="text-2xl text-gray-900 dark:text-white mt-1">{ventasHoy.length}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Cobrado</p>
                          <p className="text-2xl text-green-600 mt-1">${totalCobrado.toFixed(2)}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Detalle por Método de Pago</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Efectivo:</span>
                          <span className="text-gray-900 dark:text-white">${totalEfectivo.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Transferencia:</span>
                          <span className="text-gray-900 dark:text-white">${totalTransferencia.toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Comisiones Estimadas (25%):</span>
                          <span className="text-purple-600 text-xl">${(totalCobrado * 0.25).toFixed(2)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogCierre(false)}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleCerrarCaja}>
                      Confirmar Cierre
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <Button onClick={handleAbrirCaja} className="bg-green-600 hover:bg-green-700">
              <Unlock className="mr-2 h-4 w-4" />
              Abrir Caja
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Cobrado</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">${totalCobrado.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Efectivo</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">${totalEfectivo.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Transferencias</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">${totalTransferencia.toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Comisiones</p>
                <p className="text-2xl text-gray-900 dark:text-white mt-1">${(totalCobrado * 0.25).toFixed(2)}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ventas del Día */}
      <Card>
        <CardHeader>
          <CardTitle>Ventas Realizadas Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Método</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ventasHoy.map((venta) => (
                <TableRow key={venta.id}>
                  <TableCell>{venta.hora}</TableCell>
                  <TableCell>{venta.cliente}</TableCell>
                  <TableCell>{venta.servicio}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{venta.metodo}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    ${venta.monto.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}