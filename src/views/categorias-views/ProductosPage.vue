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
                <ion-title>Productos</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">

                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <!-- Selecionar comida -->
                            <ion-list>
                                <ion-item>
                                    <ion-select aria-label="Favorite Fruit" value="apple" v-model="categoria" placeholder="Comidas">
                                        <ion-select-option value="Comidas">Comidas</ion-select-option>
                                        <ion-select-option value="Bebidas">Bebidas</ion-select-option>
                                        <ion-select-option value="Postres">Postres</ion-select-option>
                                        <ion-select-option value="Complementos">Complementos</ion-select-option>
                                    </ion-select>
                                </ion-item>
                            </ion-list>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size-xm="6" v-for="(producto, i) in productos" :key="i">
                            <!-- TARJETAS PRODUCTOS -->
                            <ion-card v-if="producto.categoria == categoria">
                                <img alt="producto-imagen"
                                    :src="producto.imagen" />
                                <ion-card-header>
                                    <ion-card-subtitle>{{ producto.categoria }} (ID: {{ producto.idPlato }})</ion-card-subtitle>
                                    <ion-card-title>{{ producto.nombrePlato }}</ion-card-title>
                                    <ion-card-title>$ {{ producto.precio }}</ion-card-title>
                                </ion-card-header>

                                <ion-card-content>
                                    Here's a small text description for the card content. Nothing more, nothing less.
                                    <br>
                                    <!-- AGREGAR AL CARRITO -->
                                    <ion-button color="success" class="btnAgregarCarrito" @click="agregarCarrito(producto)">
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

        <ion-footer class="footerPagar">
            <ion-toolbar router-link="/pagar">
                    <b>Productos:</b> {{ this.$store.getters.getCantidadCarrito }}  <b>Total:</b> ${{ this.$store.getters.getTotalCarrito }} <br>
                    <ion-button size="default">
                        <ion-icon aria-hidden="true" slot="start" :ios="cart" :md="cart"></ion-icon>
                        Pagar
                    </ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter } from '@ionic/vue';

import axios from 'axios';

import { cart } from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, IonList, IonItem, IonFooter
    },
    data() {
        return {
            cart,
            ipLocal: this.$store.state.ipLocal,

            categoria: 'Comidas',
            productos: {}
        }
    },
    methods: {
        // Agregar al carrito
        agregarCarrito(producto) {
            this.$store.dispatch('agregarCarritoAccion', producto)
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
        categoria(nuevoValor, antiguoValor){
            if(nuevoValor!=antiguoValor){
                this.obtenerPlatos()
            }
        },
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
}

</style>