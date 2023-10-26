<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="bgcolor-header">
                <!-- <ion-buttons slot="start">
                    <ion-back-button text="Atrás"></ion-back-button>
                </ion-buttons> -->

                <!-- <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons> -->
                <ion-title class="ion-text-center">Factura</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-grid>
                            <ion-row>
                                <ion-col size="12">
                                    <ion-card class="detalleFactura">
                                        <ion-card-header>
                                            <ion-card-title class="titulosDetalleFactura">Detalles de la Factura</ion-card-title>
                                        </ion-card-header>
                                        <ion-card-content class="titulosDetalleFactura">
                                            <ion-row>
                                                <ion-col size="6">
                                                    <p><strong>Cliente:</strong> {{this.$store.state.datosUsuario.name}}</p>
                                                    <p><strong>Fecha:</strong> 28 de Septiembre de 2023</p>
                                                </ion-col>
                                                <ion-col size="6">
                                                    <p><strong>Número de Factura:</strong> 12345</p>
                                                </ion-col>
                                            </ion-row>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col size="12">
                                    <ion-card class="detalleFactura">
                                        <ion-card-header>
                                            <ion-card-title class="titulosDetalleFactura">Detalles de Producto</ion-card-title>
                                        </ion-card-header>
                                        <ion-card-content class="titulosDetalleFactura">
                                            <ion-row v-for="(producto, i) in this.$store.getters.getCarrito" :key="i">
                                                <ion-col>
                                                    <ion-label>ID:{{ producto.idPlato }} {{ producto.nombrePlato }} ${{
                                                        producto.precio }}</ion-label>
                                                </ion-col>
                                            </ion-row>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col size="12">
                                    <ion-card class="detalleFactura">
                                        <ion-card-content class="titulosDetalleFactura">
                                            <ion-row>
                                                <ion-col size="9">
                                                    <p class="total-label">Total:</p>
                                                </ion-col>
                                                <ion-col size="3" class="total-amount">
                                                    {{ this.$store.getters.getTotalCarrito }}
                                                </ion-col>
                                            </ion-row>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>

                            <ion-row>
                                <ion-col size="12">
                                    <ion-card class="detalleFactura">
                                        <ion-card-content class="titulosDetalleFactura">
                                            <p class="footer">¡Gracias por su compra!</p>
                                        </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>

                            <ion-row class="ion-text-center">
                                <ion-col>
                                    <ion-button color="danger" @click="volverInicio()">Volver al inicio</ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-col>
                </ion-row>
            </ion-grid>


        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail, } from '@ionic/vue';

import { cart } from 'ionicons/icons';

import axios from 'axios';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail,
    },
    data() {
        return {
            cart,
            carrito: this.$store.getters.getCarrito

            // ipLocal: this.$store.state.ipLocal,
            // carrito: {},
            // pedido: {},
            // idUser: this.$store.state.datosUsuario.id
        }
    },
    methods: {
        //Volver al inicio y reiniciar state carrito
        volverInicio(){
            this.$store.dispatch('eliminarCarritoAccion')
            this.$router.push('/inicio')
        },
        // Obtenemos datos del usuario con Ionic/Storage
        obtenerDatosUsuario() {
            try {
                // Usa la función get para recuperar los datos del usuario por su clave
                this.$storage.get('tokenInicioSesion')
                .then(userData => {
                    if (userData) {
                        // userData contiene los datos del usuario
                        console.log('Datos del usuario:', userData);
                        this.$store.state.datosUsuario = userData;
                        this.ipLocal = userData.ipLocal;
                        this.$store.state.numeroMesa = userData.numeroMesa;
                    } else {
                        console.log('No se encontraron datos de usuario.');
                    }
                })
                .catch(error => {
                    console.error('Error al recuperar datos del usuario:', error);
                });
            } catch (error) {
                console.error('Error al recuperar datos del usuario:', error);
            }
        }
    },
    beforeCreate(){
        //Verificar si ya tenemos una sesión iniciada
        this.$storage.get('tokenInicioSesion')
            .then(token => {
                if (!token) {
                    //Si no tenemos sesión iniciada
                    console.log('Inicia sesión o registrate!')
                    this.$router.push('/login')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario
                    this.obtenerDatosUsuario();
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
    created() {
        
    },
    mounted() {

    },
    beforeDestroy() {
        
    },
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

/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

/* ESTILO DE FACTURA */
.detalleFactura {
    border-top: 5px solid #FEFBD6;
    --background: white;
}
.titulosDetalleFactura {
    --color: none;
    color: black;
}

/* END FACTURA */
</style>