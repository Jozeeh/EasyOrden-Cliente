<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="start">
                    <ion-back-button text="Atrás" :icon="caretBack"></ion-back-button>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>Otros</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">

                <ion-grid>
                    <ion-row>
                        <ion-col size="6" size-xm="6">
                            <!-- TARJETAS PRODUCTOS -->
                            <ion-card>
                                <img alt="Silhouette of mountains"
                                    src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-subtitle>Otros</ion-card-subtitle>
                                    <ion-card-title>Ensalada</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <!-- AGREGAR AL CARRITO -->
                                    <ion-button color="success" class="btnAgregarCarrito">
                                        Agregar
                                        <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                                    </ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <!-- PRODUCTOS DE PRUEBA -->
                        <ion-col size="6" size-xm="6">
                            <ion-card>
                                <img alt="Silhouette of mountains"
                                    src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-subtitle>Otros</ion-card-subtitle>
                                    <ion-card-title>Arroz</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <!-- AGREGAR AL CARRITO -->
                                    <ion-button color="success" class="btnAgregarCarrito">
                                        Agregar
                                        <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                                    </ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col size="6" size-xm="6">
                            <ion-card>
                                <img alt="Silhouette of mountains"
                                    src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-subtitle>Otros</ion-card-subtitle>
                                    <ion-card-title>Tortillas</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <!-- AGREGAR AL CARRITO -->
                                    <ion-button color="success" class="btnAgregarCarrito">
                                        Agregar
                                        <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                                    </ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col size="6" size-xm="6">
                            <ion-card>
                                <img alt="Silhouette of mountains"
                                    src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-subtitle>Otros</ion-card-subtitle>
                                    <ion-card-title>Pan de ajo</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <!-- AGREGAR AL CARRITO -->
                                    <ion-button color="success" class="btnAgregarCarrito">
                                        Agregar
                                        <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                                    </ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                    </ion-row>
                </ion-grid>
            </div>

        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton
    },
    data() {
        return {
            cart
        }
    }
}
</script>


<style scoped>
/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

.contenedor {
    /* border: 1px solid black; */
    width: 90%;
    margin: 0 auto;
}

.btnAgregarCarrito {
    margin-top: 20px;
    font-weight: bold;
    font-size: 11px;
}

.sltCategorias{
    text-align: center;
    background: #E6E6E6;
}

/* #container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
} */
</style>