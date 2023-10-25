import { createRouter, createWebHistory } from '@ionic/vue-router';
import InicioPage from '../views/InicioPage.vue'
import ComidasPage from '../views/categorias-views/ProductosPage.vue'
import PagoPage from '../views/pagos-views/PagoPage.vue'
import FacturaPage from '../views/pagos-views/FacturasPage.vue'
import BarcodeScanner from '../views/BarcodeScanner.vue'
import LoginView from '../views/LoginView/LoginView.vue'
import RegistroPage from '../views/LoginView/RegistroPage.vue'
import PreparacionPage from '../views/prepracion/PreparacionPage.vue'


const routes = [
  {
    path: '',
    redirect: '/scaner'
  },
  {
    path: '/generador',
    component: () => import ('../views/GeeradorQr.vue')
  },
  {
    path: '/scaner',
    component: BarcodeScanner
  },
  {
    path: '/inicio',
    component: InicioPage
  },
  {
    path: '/registrarse',
    component: RegistroPage
  },
  {
    path: '/productos',
    component: ComidasPage
  },
  {
    path: '/pagar',
    component: PagoPage
  },
  {
    path: '/facturas',
    component: FacturaPage
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/preparacion',
    component: PreparacionPage
  },
  
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
