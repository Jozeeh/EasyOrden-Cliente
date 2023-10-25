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

                <!-- Estado del pedido -->
                <ion-row>
                    <ion-col>
                        <ion-card>
                            <ion-card-content>
                                <ion-title>
                                    <h2>Estado del pedido</h2>
                                </ion-title>
                                <div class="percentage-bar">
                                    <div class="bar">
                                        <div class="fill" :style="{ width: `${percentage}%` }" > </div>
                                            </div>
                                        <div class="status-icon">
                                            <img :src=" statusIcons[state] " alt="Status Icon" />
                                            <div class="percentage">{{ percentage }}%</div>
                                        </div>
                                    
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>


            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/vue';
import axios from 'axios';
export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent
    },
    data() {
        return {
            state: 'listo',
            percentage: 0,
            statusIcons: {
                enviado: '/pedido.png', // Ruta a la imagen para "Enviado"
                preparacion: '/pedido.png', // Ruta a la imagen para "En Preparación"
                listo: '/mascota.png', // Ruta a la imagen para "Listo para Entregar"
                entregado: '/pedido.png', // Ruta a la imagen para "Entregado"
            },
        }
    },
    methods: {
        updateProgressBar() {
            const percentageMap = {
                enviado: 0,
                preparacion: 50,
                listo: 75,
                entregado: 100,
            };
            this.percentage = percentageMap[this.state];
        },
    },
    
    mounted() {
        this.updateProgressBar();
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
}

/* barra de portcentaje */
.percentage-bar {
    display: flex;
    align-items: center;
    width: 100%;
}

.bar {
    width: 80%;
    height: 20px;
    background-color: #ccc;
    position: relative;
}

.fill {
    height: 100%;
    background-color: #9b1717;
    /* Color de la barra de llenado */
    transition: width 0.5s ease;
    /* Duración de la animación */
}

.status-icon {
    width: 20%;
    text-align: center;
}

.status-icon img {
    max-width: 100%;
    height: auto;
}
</style>