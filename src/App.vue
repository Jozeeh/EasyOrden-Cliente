<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu side="end" content-id="main-content" type="overlay" :swipe-gesture="false">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Productos</ion-list-header> <br>
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in productosPage" :key="i">
              <ion-item @click="setSelectedIndex(i + appPages.length)" router-direction="root" :router-link="p.url"
                lines="none" :detail="false" class="hydrated">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="inbox-list">
            <ion-list-header>Cuenta</ion-list-header> <br>
            <!-- <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="setSelectedIndex(i)" router-direction="root" :router-link="p.url" lines="none"
                :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle> -->

            <!-- CERRAR SESION -->
            <ion-menu-toggle :auto-hide="false">
              <ion-item @click="cerrarSesion">
                <ion-icon aria-hidden="true" slot="start" :icon="logOut"></ion-icon>
                <ion-label>Cerrar Sesión</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>

      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup>
import {
  IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, 
  IonSplitPane, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonSelect, IonSelectOption, IonFooter, IonThumbnail
} from '@ionic/vue';
import { ref, onMounted, onUpdated } from 'vue';
import {
  home, person, personAdd, settings, document, addCircle, restaurant, logOut, qrCode, fastFoodOutline,
fastFoodSharp, archiveOutline, archiveSharp
} from 'ionicons/icons';

import store from '@/store';
import router from '@/router';

// Importamos ionic/storage para cerrar sesión
import { Storage } from '@ionic/storage';

// Configuración de ionic/storage
const storage = new Storage();
storage.create().then(storageInstance => {
});

// Cerrar sesión con ionic/storage
const cerrarSesion = async () => {
  await storage.remove('tokenInicioSesion');
  store.state.datosUsuario = [];
  

  router.push('/scaner')
};

const selectedIndex = ref(0);



const productosPage = [
  {
    title: 'Inicio',
    url: '/inicio',
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: 'Preparacion',
    url: '/preparacion',
    iosIcon: fastFoodOutline,
    mdIcon: fastFoodSharp,
  },
  
];

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}

const setSelectedIndex = (index) => {
  selectedIndex.value = index;
};

</script>


<style scoped>
ion-menu ion-content {
  /* --background: var(--ion-item-background, var(--ion-background-color, #c93e4f)); */
  --background: none;
  background-color: #c93e4f;
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;

}

ion-list {
  --background: none;
  background-color: #c93e4f;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
  color: #3d1734;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #3d1734);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
  --background: none;
  background-color: #c93e4f;
}

ion-menu.md ion-item.selected {
  --background: #3d1734;
  color: #f5ea95;
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-warning);
}

ion-menu.md ion-item ion-icon {
  color: #3d1734;
}

ion-menu.md ion-item ion-label {
  color: white;
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: rgb(0, 0, 0);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
