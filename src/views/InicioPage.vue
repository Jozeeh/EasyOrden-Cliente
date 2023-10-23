<template>
    <ion-page>
        <ion-header>
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <img src="/EasyOrden-LogoBlancoSinFondo.png" width="200">
            </ion-toolbar>
        </ion-header>

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card class="card-bienvenida">
                            <ion-card-content>
                                <ion-title>Bienvenido al restaurante!</ion-title>

                                <ion-title>
                                    <p>Usuario: {{ this.$store.state.datosUsuario.name }}</p>
                                    <p>Correo: {{ this.$store.state.datosUsuario.email }}</p>
                                </ion-title>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-card class="card-categorias">
                            <img alt="Silhouette of mountains" src="/categorias.png" />
                            <ion-card-header>
                                <ion-card-title>Categorias</ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                Puedes comprar comidas aquí.
                                <br>
                                <ion-button color="warning" router-link="/productos">Productos</ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-card class="card-categorias">
                            <img alt="mesero" src="/mesero.png" />
                            <ion-card-header>
                                <ion-card-title>¿Necesitas un mesero?</ion-card-title>
                                <ion-card-subtitle>AYUDA!</ion-card-subtitle>
                            </ion-card-header>

                            <ion-card-content>
                                Si necesitas la ayuda de un mesero haz click aquí!
                                <br>
                                <ion-button color="tertiary">Pedir mesero</ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer class="footerPagar">
            <ion-toolbar router-link="/pagar">
                <b>Productos:</b> {{ this.$store.getters.getCantidadCarrito }} <b>Total:</b> ${{
                    this.$store.getters.getTotalCarrito }} <br>
                <ion-button size="default">
                    <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                    Pagar
                </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonThumbnail, IonNote } from '@ionic/vue';

import { cart } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonThumbnail, IonNote
    },
    data() {
        return {
            cart
        }
    },
    mounted() {
        console.log(this.$store.state.estadoSesion)
    },
    beforeCreate() {
        if (this.$store.state.estadoSesion === false) {
            this.$router.push('/inicio-sesion');
        }
    }
}
</script>


<style scoped>
.fondo {
    --background: none;
    background-image: url('/FondoSesion.webp');

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.fondo::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(14, 14, 14, 0.5);
}

.card-bienvenida {
    --background: none;
    background-image: url('/fondousuario.png');
    background-position: center center;
    background-size: cover;
    font-weight: bold;
    border-radius: 10px;
    color: black;
}

.card-categorias {
    --ion-card-title-color: none;
    color: black;
    background-color: #fefbd6;
}

ion-card-title {
    color: black;
}

/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

.footerPagar {
    background-color: #242424;
    /* border-top: 5px solid #fc8e5b; */
    padding: 10px;
}

ion-toolbar {
    color: white;
    --background: none;
    background-color: #242424;
    text-align: center;
}</style>