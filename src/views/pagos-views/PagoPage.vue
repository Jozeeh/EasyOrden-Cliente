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
                <ion-title class="ion-text-center">Método de pago</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card class="card-seguirCompra ion-text-center" @click="this.$router.push('/inicio')">
                            <ion-card-content>
                                <ion-title>¿Quieres seguir comprando?</ion-title>
                                <ion-title><ion-icon :icon="cart"></ion-icon>Añade más productos aquí.</ion-title>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-card class="card-listaCompras">
                            <ion-card-header class="ion-text-center">
                                <ion-card-title style="--color: black;">
                                    Carrito de compras
                                </ion-card-title>
                                <ion-card-subtitle>platillos a comprar:</ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                <ion-item v-for="(producto, i) in this.$store.getters.getCarrito" :key="i" style="--ion-item-background: white; color: black;">
                                    <ion-thumbnail slot="start">
                                        <img alt="producto-imagen" :src="producto.imagen" />
                                    </ion-thumbnail>
                                    <ion-label>{{ producto.nombrePlato }}</ion-label>
                                    ${{ producto.precio }}
                                    <ion-button @click="eliminarUnProducto(i)" color="danger" slot="end"><ion-icon :icon="trash"></ion-icon></ion-button>
                                </ion-item>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col>
                        <ion-card>
                            <ion-card-content class="ion-text-center" style="color: black; background-color: white;">
                                <b>TOTAL DE COMPRA:</b> ${{ this.$store.getters.getTotalCarrito }}
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- BOTONES METODO DE PAGO -->
                <ion-row>
                    <ion-col>
                        <button class="payment-button" @click="mandarCocina()">
                            <img src="https://cdn-icons-png.flaticon.com/128/5776/5776691.png" alt="Stripe Logo">
                            Pagar con efectivo
                        </button>
                    </ion-col>

                    <ion-col>
                        <button class="payment-button" @click="mandarCocina()">
                            <img src="https://cdn-icons-png.flaticon.com/128/174/174861.png" alt="PayPal Logo">
                            Pagar con PayPal
                        </button>
                    </ion-col>

                    <ion-col>
                        <button class="payment-button" @click="mandarCocina()">
                            <img src="https://cdn-icons-png.flaticon.com/128/5949/5949784.png"
                                alt="Tarjetas de Crédito Logo">
                            Pagar con Tarjeta de Crédito o Debito
                        </button>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- ALERTA EN CASO NO HAYA PRODUCTOS EN EL CARRITO -->
            <ion-alert style="--background: white; --ion-text-color: black;"
                :is-open="alertaCarrito"
                :header="datosAlertaCarrito.header"
                :message="datosAlertaCarrito.message"
                :buttons="datosAlertaCarrito.buttons"
                @didDismiss="verAlertaCarrito(false)"
            ></ion-alert>

            <!-- CARGANDO EDITACIÓN -->
            <ion-loading :is-open="cargandoConfirmarCompra" trigger="open-loading" message="Confirmando compra..." style="--background: white; color: black;"></ion-loading>

        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail, IonAlert, IonLoading } from '@ionic/vue';
import axios from 'axios';
import { cart, trash } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonLabel, IonItem, IonThumbnail, IonAlert, IonLoading
    },
    data() {
        return {
            cart, trash,

            // carrito: this.$store.getters.getCarrito

            ipLocal: this.$store.state.ipLocal,
            carrito: {},
            pedido: {},
            idUser: this.$store.state.datosUsuario.id,

            alertaCarrito: false,
            datosAlertaCarrito: {
                header: '',
                message: '',
                buttons: []
            },
            cargandoConfirmarCompra: false
        }
    },
    methods: {
        verAlertaCarrito(state, mensajeEstado) {
            if (mensajeEstado === "Compra exitosa!"){
                this.datosAlertaCarrito.header = "Compra Exitosa!";
                this.datosAlertaCarrito.message = "Muchas gracias por tu compra!";
                this.datosAlertaCarrito.buttons = [{
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        this.$router.push('/facturas')
                    },
                }];
                this.alertaCarrito = state;
            } else{
                this.datosAlertaCarrito.header = "Compra Fallida!";
                this.datosAlertaCarrito.message = "Al parecer no tienes productos para comprar!";
                this.datosAlertaCarrito.buttons = [{
                    text: 'OK',
                    role: 'confirm',
                    handler: () => {
                        console.log('No había productos para comprar!')
                    },
                }];
                this.alertaCarrito = state;
            }
        },
        eliminarUnProducto(index) {
            this.$store.commit('eliminarUnProducto', index);
        },
        mandarCocina() {
            this.cargandoConfirmarCompra = true;
            this.pedido = {
                detalles: this.$store.getters.getCarrito.map(producto => ({
                    fkIdPlato: producto.idPlato,
                    fkIdUser: producto.idUsuario,
                    estadoPedido: 'Ordenado',
                    numMesa: 'Mesa 1'
                }))
            };

            axios.post(`${this.ipLocal}/pedidos/store`, this.pedido)
                .then(response => {
                    this.cargandoConfirmarCompra = false
                    this.verAlertaCarrito(true, "Compra exitosa!");
                    this.$router.push('/facturas')
                    console.log(response.data)
                })
                .catch(error => {
                    this.cargandoConfirmarCompra = false
                    this.verAlertaCarrito(true, "Compra fallida!");
                    this.$router.push('/inicio');
                    console.error('OCURRIO UN ERROR: ', error);
                })
        },
        confirmarPago() {
            this.$router.push('/facturas')
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
                    this.$router.push('/inicio-sesion')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario
                    this.obtenerDatosUsuario();
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
    
}
</script>


<style scoped>
.card-listaCompras {
    --background: white;
    --color: black;
}

.card-seguirCompra {
    --background: #FEFBD6;
    background-position: center center;
    background-size: cover;
    font-weight: bold;
    border-radius: 10px;
    color: black;
}

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

/* TOTAL COMPRA */
.cart-container {
    background-color: #f5ea95;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* Centra verticalmente en la ventana */
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
    max-width: 40px;
    /* Tamaño del logotipo ajustado */
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
} */</style>