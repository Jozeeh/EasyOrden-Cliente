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
                                <ion-button color="tertiary" :disabled="pedirMesero"
                                    @click="mostrarAlertaMesero(true)">Pedir
                                    mesero</ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- ALERTA de pedir un mesero -->
            <ion-toast :is-open="isOpen"
                message="¡Se ha Notificado a un mesero! (Luego de 5 minutos se volvera activar el boton)" :duration="5000"
                @didDismiss="setOpen(false)"></ion-toast>

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
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter,
    IonItem, IonAlert,
    IonThumbnail, IonNote, IonToast
} from '@ionic/vue';

import { cart } from 'ionicons/icons';

import axios from 'axios';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard,
        IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter,
        IonItem, IonThumbnail, IonNote, IonAlert, IonToast
    },
    data() {
        return {
            cart,
            pedirMesero: false,
            isOpen: false,
            ipLocal: this.$store.state.ipLocal
        }
    },
    methods: {
        alertaMesero() {
            this.pedirMesero = true;
            setTimeout(() => {
                this.pedirMesero = false;
            }, 300000); // 300000 ms = 5 minutos
        },
        mostrarAlertaMesero(state) {
            const alerta = {
                fkIdUsuario: this.$store.state.datosUsuario.id,
                mesa: this.$store.state.numeroMesa,
                estado: 'enviado'
            }
            // console.log(alerta)
            const datosJSON = JSON.stringify(alerta);
            // console.log(datosJSON)
            axios.post(`http://${this.ipLocal}/api/pedirmesero`, alerta)
                .then(response => {
                    if (response.data.code === 200) {
                        this.isOpen = state
                        this.alertaMesero()
                    }
                })
                .catch(error => console.log(error))

        },
        getPedirMesero(){
            axios.get(`http://${this.ipLocal}/api/mostrarMesero`)
            .then(response =>{
                const array = response.data.data
                // if(response.data.data.estado === 'enviado' && response.data.data.fkIdUsuario === this.$store.state.datosUsuario.id){
                    array.forEach(function (el, i) {
                        if(el.estado === 'enviado'){
                            console.log('funciona')
                        }
                    });
                // }
                
            })
            .catch(error => console.log(error))
        }
    },
    created() {
        // Configura una consulta periódica cada ciertos segundos (por ejemplo, cada 5 segundos)
        this.pollingTimer = setInterval(this.getPedirMesero, 5000);
    },
    beforeDestroy() {
        // Limpia el temporizador cuando el componente se destruye para evitar fugas de memoria
        clearInterval(this.pollingTimer);
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
}
</style>