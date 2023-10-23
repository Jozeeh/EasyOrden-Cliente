<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="start">
                    <ion-back-button text="Atrás"></ion-back-button>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>Método de pago</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">

                <ion-grid>
                    <ion-row class="ion-text-center">
                        <ion-col>
                           <h2>Carrito de compras</h2> 
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <ion-card>
                                <ion-card-header>
                                    <ion-card-title>Platos seleccionados</ion-card-title>
                                    <ion-card-subtitle>platillos a comprar:</ion-card-subtitle>
                                </ion-card-header>
                                <ion-card-content>
                                    <ion-list>
                                        <ion-item v-for="(producto, i) in this.$store.getters.getCarrito" :key="i">
                                            <ion-thumbnail slot="start">
                                            <img alt="producto-imagen" :src="producto.imagen" />
                                            </ion-thumbnail>
                                            <ion-label>{{ producto.nombrePlato }}</ion-label>
                                            <ion-label>$ {{ producto.precio }}</ion-label>
                                        </ion-item>
                                    </ion-list>
                                </ion-card-content>
                                </ion-card>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <div class="cart-container">
                                <div class="cart-content">
                                    <div class="cart-icon">&#128722;</div>
                                    <div class="cart-total">TOTAL DE COMPRA: $ {{ this.$store.getters.getTotalCarrito }}</div>
                                </div>
                            </div>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <button class="payment-button" @click="confirmarPago()">
                                <img src="https://cdn-icons-png.flaticon.com/128/5776/5776691.png" alt="Stripe Logo">
                                Pagar con efectivo
                            </button>
                        </ion-col>

                        <ion-col>
                            <button class="payment-button" @click="confirmarPago()">
                                <img src="https://cdn-icons-png.flaticon.com/128/174/174861.png" alt="PayPal Logo">
                                Pagar con PayPal
                            </button>
                        </ion-col>

                        <ion-col>
                            <button class="payment-button" @click="confirmarPago()">
                                <img src="https://cdn-icons-png.flaticon.com/128/5949/5949784.png" alt="Tarjetas de Crédito Logo">
                                Pagar con Tarjeta de Crédito o Debito
                            </button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail
    },
    data() {
        return {
            cart,

            carrito: this.$store.getters.getCarrito
        }
    },
    methods: {
        confirmarPago() {
            this.$router.push('/facturas')
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

/* TOTAL COMPRA */
.cart-container {
    background-color: #f5ea95;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; /* Centra verticalmente en la ventana */
    padding: 10px;
    border-top: 5px solid #fc8e5b;
}

.cart-content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.cart-icon {
    font-size: 24px;
    margin-right: 10px;
}

.cart-total {
    font-weight: bold;
    font-size: 18px;
}

/* CSS BOTONES PAGO (ELIMINAR DESPUES) */
.payment-button {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s ease;
    display: inline-block;
}

.payment-button img {
    max-width: 40px; /* Tamaño del logotipo ajustado */
    height: auto;
    vertical-align: middle;
    margin-right: 10px;
}

.payment-button a {
    text-decoration: none;
    color: #333;
}

.payment-button:hover {
    background-color: #eee;
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