<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>EasyOrden - Inicio</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">

                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <ion-col>
                            <h2>Categorias:</h2>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Comidas</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Puedes comprar comidas aquí.
                                    <br>
                                    <ion-button color="warning" router-link="/productos/comidas">comidas</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Bebidas</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Puedes comprar bebidas aquí.
                                    <br>
                                    <ion-button color="warning" router-link="/productos/bebidas">Bebidas</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Postres</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Puedes comprar postres aquí.
                                    <br>
                                    <ion-button color="warning" router-link="/productos/postres">Postres</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>

                        <ion-col>
                            <ion-card>
                                <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
                                <ion-card-header>
                                    <ion-card-title>Otros</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Puedes comprar complementos aquí.
                                    <br>
                                    <ion-button color="warning" router-link="/productos/otros">Otros</ion-button>
                                </ion-card-content>
                            </ion-card>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>

        <ion-footer>
            <ion-toolbar router-link="/pagar" color="primary">
                <center>
                    <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                    Pagar - Productos: {{ cantCard }}
                </center>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter
    },
    data() {
        return {
            cart,
            cantCard: 0
        }
    },
    methods: {
        cantCarrito(){
            const card = this.$store.state.carrito
            this.cantCard = card.length;
        }
    },
    created() {
        this.cantCarrito();
    },
    mounted() {
        this.cantCarrito();
    },
    updated() {
        this.cantCarrito();
    },
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