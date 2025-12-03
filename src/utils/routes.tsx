import { createBrowserRouter } from "react-router";
import { Login } from "../pages/Login";
import { Layout } from "../components/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Clientes } from "../pages/Clientes";
import { ClienteDetalle } from "../pages/ClienteDetalle";
import { Ventas } from "../pages/Ventas";
import { Inventario } from "../pages/Inventario";
import { Renovaciones } from "../pages/Renovaciones";
import { Mensajes } from "../pages/Mensajes";
import { Caja } from "../pages/Caja";
import { Cupones } from "../pages/Cupones";
import { Reportes } from "../pages/Reportes";
import { Tareas } from "../pages/Tareas";
import { Soporte } from "../pages/Soporte";
import { Configuracion } from "../pages/Configuracion";
import { Proveedores } from "../pages/Proveedores";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "clientes", Component: Clientes },
      { path: "clientes/:id", Component: ClienteDetalle },
      { path: "ventas", Component: Ventas },
      { path: "inventario", Component: Inventario },
      { path: "renovaciones", Component: Renovaciones },
      { path: "mensajes", Component: Mensajes },
      { path: "caja", Component: Caja },
      { path: "cupones", Component: Cupones },
      { path: "reportes", Component: Reportes },
      { path: "tareas", Component: Tareas },
      { path: "soporte", Component: Soporte },
      { path: "configuracion", Component: Configuracion },
      { path: "proveedores", Component: Proveedores },
    ],
  },
]);
