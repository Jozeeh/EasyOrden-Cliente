import { createRouter, createWebHistory } from '@ionic/vue-router';
import InicioPage from '../views/InicioPage.vue'
import ComidasPage from '../views/categorias-views/ProductosPage.vue'
import PagoPage from '../views/PagoPage.vue'
import PedidosPage from '../views/PedidosPage.vue'
import BarcodeScanner from '../views/BarcodeScanner.vue'

const routes = [
  {
    path: '',
    redirect: '/inicio'
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
    path: '/productos/:categoria',
    component: ComidasPage
  },
  {
    path: '/pagar',
    component: PagoPage
  },
  {
    path: '/pedidos',
    component: PedidosPage
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
