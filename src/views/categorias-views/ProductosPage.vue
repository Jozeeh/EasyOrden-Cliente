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
                <img src="/EasyOrden-LogoBlancoSinFondo.png" width="200">
            </ion-toolbar>
        </ion-header>

        <ion-content class="fondo">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <!-- Selecionar comida -->
                        <ion-item class="select-categoria">
                            <ion-select label="Categoria:" v-model="categoria" placeholder="Comidas">
                                <ion-select-option value="Comidas">Comidas</ion-select-option>
                                <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                <ion-select-option value="Postres">Postres</ion-select-option>
                                <ion-select-option value="Complementos">Complementos</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size-xm="6" v-for="(producto, i) in productos" :key="i">
                        <!-- TARJETAS PRODUCTOS -->
                        <ion-card v-if="producto.categoria == categoria" class="card-productos">
                            <img alt="producto-imagen" :src="producto.imagen" />
                            <ion-card-header>
                                <ion-card-subtitle>{{ producto.categoria }} (ID: {{ producto.idPlato }})</ion-card-subtitle>
                                <ion-card-title>{{ producto.nombrePlato }}</ion-card-title>
                                <ion-card-title>$ {{ producto.precio }}</ion-card-title>
                            </ion-card-header>

                            <!-- CONTENIDO DEL CARD -->
                            <ion-card-content>
                                <!-- AGREGAR AL CARRITO -->
                                <ion-button color="success" @click="agregarCarrito(producto)">
                                    Agregar
                                    <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                                </ion-button>

                                <!-- INFORMACION DEL CARRITO -->
                                <ion-button color="primary" @click="verModalInfo(producto)">
                                    Info
                                    <ion-icon aria-hidden="true" slot="start" :ios="informationCircle"
                                        :md="informationCircle"></ion-icon>
                                </ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- CONTENIDO AL PRESIONAR INFO -->
            <ion-modal ref="modal" trigger="open-modal" :enter-animation="enterAnimation" :leave-animation="leaveAnimation"
                :is-open="modalInfo">
                <ion-content class="contenido-info">
                    <ion-toolbar style="background-color: #c93e4f;">
                        <ion-title>Información del producto</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="modalInfo = false">Cerrar</ion-button>
                        </ion-buttons>
                    </ion-toolbar>

                    <img :src="modalInfoProducto.imagen">
                    <ion-card-content>
                        <ion-card-subtitle>{{ modalInfoProducto.categoria }} (ID: {{ modalInfoProducto.idPlato
                        }})</ion-card-subtitle>
                        <h1>{{ modalInfoProducto.nombrePlato }}</h1>
                        <h1>${{ modalInfoProducto.precio }}</h1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores odio amet fuga dolor illo, aut
                        reiciendis. Placeat assumenda, odit officia natus saepe ut rem fugiat fuga inventore, distinctio
                        facere cumque.
                        Modi, quas pariatur. Optio unde repellendus deleniti, ut, reprehenderit, cumque tempora dolore
                        exercitationem neque odit vero nihil dicta officiis animi. Nesciunt suscipit voluptatum labore
                        repellendus reiciendis autem expedita id quibusdam?
                    </ion-card-content>
                </ion-content>

                <ion-toolbar style="background-color: white;">
                    <ion-button color="danger" slot="end" @click="modalInfo = false"><ion-icon aria-hidden="true" slot="start"
                            :ios="close" :md="close"></ion-icon>Cerrar</ion-button>
                    <ion-button color="success" slot="end" @click="agregarCarrito(modalInfoProducto)"><ion-icon
                            aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>Agregar</ion-button>
                </ion-toolbar>
            </ion-modal>

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
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter, IonModal, IonLabel, IonNote } from '@ionic/vue';

import axios from 'axios';

import { cart, informationCircle, close } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter, IonModal, IonLabel, IonNote
    },
    data() {
        return {
            cart, informationCircle, close,
            ipLocal: this.$store.state.ipLocal,

            categoria: 'Comidas',
            productos: {},
            modalInfoProducto: {},
            modalInfo: false,
        }
    },
    methods: {
        // Ver información del producto en el modal
        verModalInfo(producto) {
            this.modalInfoProducto = producto
            this.modalInfo = true
        },
        // Agregar al carrito
        agregarCarrito(producto) {
            const datosCarrito = {
                idPlato: producto.idPlato,
                nombrePlato: producto.nombrePlato,
                precio: producto.precio,
                imagen: producto.imagen,
                idUsuario: this.$store.state.datosUsuario.id
            }
            this.$store.dispatch('agregarCarritoAccion', datosCarrito)
            this.modalInfo = false
        },

        // Obtenemos los plato según la categoria
        obtenerPlatos() {
            axios.get(`http://${this.ipLocal}/api/platos/select/${this.categoria}`)
                .then(response => {
                    this.productos = response.data.data
                    console.log(response.data.data);
                })
                //Si ocurre un error se imprimirá en consola
                .catch(error => {
                    console.error('OCURRIO UN ERROR: ', error);
                })
        }
    },
    mounted() {
        this.obtenerPlatos()
    },
    watch: {
        //este metodo comprueba que la operacion sea diferente para volver hacer el calculo
        //debe ser mismo nombre de la variable donde esta en return
        categoria(nuevoValor, antiguoValor) {
            if (nuevoValor != antiguoValor) {
                this.obtenerPlatos()
            }
        },
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

.contenido-info {
    --background: none;
    background-color: white;
    --ion-text-color: black;
}

.card-productos {
    --ion-card-title-color: none;
    color: black;
    background-color: white;
}

ion-card-title {
    color: black;
}

.select-categoria {
    --background: none;
    background-color: #fefbd6;
    color: black;
    border-radius: 20px;
}

/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

.sltCategorias {
    text-align: center;
    background: #E6E6E6;
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