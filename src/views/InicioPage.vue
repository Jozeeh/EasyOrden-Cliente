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


            <!-- Modal de alerta de que el mesero ya va en camino -->
            <ion-modal :is-open="meseroCamino">
                <ion-header>
                    <ion-toolbar style="background: #c93e4f; color: white;">
                        <ion-title>Alerta</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="finalizarAlerta()">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding fondo">

                    <ion-card style="background: white;">
                        <ion-card-header>
                            <ion-card-title style="color: black;">¡El mesero ya va en camino!</ion-card-title>
                        </ion-card-header>

                        <ion-card-content style="color: black;">
                            ¡Luego de 5 minutos se activar de nuevo el modal para que puedas confirmar si el mesero llego!
                            <center><img style="margin-top: 20px;" src="/camarero.png" width="200"></center>
                        </ion-card-content>
                    </ion-card>
                </ion-content>

            </ion-modal>

            <!-- Modal de alerta de que el mesero ya va en camino -->
            <ion-modal :is-open="esperaMesero">
                <ion-header>
                    <ion-toolbar style="background: #c93e4f; color: white;">
                        <ion-title>Alerta</ion-title>

                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding fondo">

                    <ion-card style="background: white;">
                        <ion-card-header>
                            <ion-card-title style="color: black;">¿El mesero ya llego?</ion-card-title>
                        </ion-card-header>

                        <ion-card-content>
                            <ion-button color="success" @click="terminar()">Si llego</ion-button>
                            <ion-button color="danger" @click="meseroNoLlego()">No llego</ion-button>
                        </ion-card-content>
                    </ion-card>
                </ion-content>
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
import {
    IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonAlert, IonThumbnail, IonNote, IonToast, IonModal, IonLoading
} from '@ionic/vue';

import { cart } from 'ionicons/icons';

import axios from 'axios';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonFooter, IonItem, IonThumbnail, IonNote, IonAlert, IonToast, IonModal, IonLoading
    },
    data() {
        return {
            cart,
            pedirMesero: false,
            isOpen: false,
            ipLocal: this.$store.state.ipLocal,
            fechaActual: '',
            // activa modal de mesero en camino
            meseroCamino: false,
            hookstate: true,
            esperaMesero: false,
            idAlert: ''

        }
    },
    methods: {
        obtenerDatosUsuario() {
            try {
                // Usa la función get para recuperar los datos del usuario por su clave
                this.$storage.get('tokenInicioSesion')
                    .then(userData => {
                        if (userData) {
                            // userData contiene los datos del usuario
                            console.log('Datos del usuario:', userData);
                            this.$store.state.datosUsuario = userData;
                            this.$store.state.ipLocal = userData.ipLocal;
                            this.ipLocal = userData.ipLocal;
                            this.$store.state.numeroMesa = userData.numeroMesa;
                            console.log(this.ipLocal)
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
        },
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
                estado: 'Alerta'
            }
            // console.log(alerta)
            const datosJSON = JSON.stringify(alerta);
            // console.log(datosJSON)
            axios.post(`${this.ipLocal}/pedirmesero`, alerta)
                .then(response => {
                    if (response.data.code === 200) {
                        this.isOpen = state
                        this.alertaMesero()
                        this.obtenerId()
                        this.activarConsultaPeriodica()

                    }
                })
                .catch(error => console.log(error))

        },
        obtenerId() {
            var Estado = 'Alerta'
            axios.get(`${this.ipLocal}/mostrarMesero/${Estado}`)
                .then(response => {
                    const array = response.data.data
                    // if(response.data.data.estado === 'enviado' && response.data.data.fkIdUsuario === this.$store.state.datosUsuario.id){
                    let idA = ''
                    var id = this.$store.state.datosUsuario.id
                    var mesa = this.$store.state.numeroMesa
                    console.log('funv')
                    array.forEach(function (el, i) {
                        if (el.mesa === mesa && el.fkIdUsuario === id) {
                            idA = el.idPedirMesero
                        }
                    });
                    this.idAlert = idA

                })
                .catch(error => console.log(error))
        },
        getPedirMesero() {
            var Estado = 'En camino'
            axios.get(`${this.ipLocal}/mostrarMesero/${Estado}`)
                .then(response => {
                    const array = response.data.data
                    // if(response.data.data.estado === 'enviado' && response.data.data.fkIdUsuario === this.$store.state.datosUsuario.id){
                    var estado = false
                    var id = this.$store.state.datosUsuario.id
                    //    console.log('funv')
                    array.forEach(function (el, i) {

                        if (el.fkIdUsuario === id) {

                            estado = true

                        }
                    });
                    this.obtenerId()

                    // alert(this.idAlert)

                    if (estado === true) {
                        this.desactivarConsultaPeriodica()
                        this.meseroCamino = estado
                    }


                })
                .catch(error => console.log(error))
        },
        // obtinene la fecha
        obtenerFechaActual() {
            const fecha = new Date();
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1;
            const anio = fecha.getFullYear();
            this.fechaActual = `${anio}-${mes}-${dia}`;
        },
        esperaMeseroFuncion() {
            this.meseroCamino = false;
            setTimeout(() => {
                this.meseroCamino = false;
            }, 300000); // 300000 ms = 5 minutos
        },
        finalizarAlerta() {
            var alerta = {
                estado: 'espera'
            }
            var id = this.idAlert
            // console.log(alerta)
            const datosJSON = JSON.stringify(alerta);
            axios.put(`${this.ipLocal}/pedirmesero/notificar/${id}`, alerta)
                .then(response => {
                    if (response.data.code === 200) {

                        this.meseroCamino = false;
                        setTimeout(() => {
                            this.esperaMesero = true;
                        }, 30000); // 3 minutos en milisegundos
                        // Llama a esperaMeseroFuncion para iniciar la consulta periódica
                        

                    }

                })
                .catch(error => console.log(error))
        },
        desactivarConsultaPeriodica() {
            this.hookstate = false;
            clearInterval(this.pollingTimer);
        },
        terminar() {
            var id = this.idAlert
            axios.delete(`${this.ipLocal}/pedirmesero/destroy/${id}`)
                .then(response => {
                    if (response.data.code === 200) {
                        this.esperaMesero = false
                        this.desactivarConsultaPeriodica()
                    }
                })
                .catch(error => console.log(error))
        },
        meseroNoLlego() {
            var alerta = {
                estado: 'Alerta'
            }
            var id = this.idAlert
            // console.log(alerta)
            const datosJSON = JSON.stringify(alerta);
            axios.put(`${this.ipLocal}/pedirmesero/notificar/${id}`, alerta)
                .then(response => {
                    if (response.data.code === 200) {
                        this.esperaMesero = false
                        this.activarConsultaPeriodica()
                    }

                })
                .catch(error => console.log(error))
        },
        activarConsultaPeriodica() {
            this.hookstate = true;
            this.pollingTimer = setInterval(this.getPedirMesero, 30000);
            this.obtenerFechaActual();
        }

    },
    created() {
        // this.desactivarConsultaPeriodica()
        // Configura una consulta periódica cada ciertos segundos (por ejemplo, cada 5 segundos)
        if (this.hookstate === true) {
            this.pollingTimer = setInterval(this.getPedirMesero, 30000);
            this.obtenerFechaActual();
        }

    },
    beforeDestroy() {

        if (this.hookstate === true) {
            // Limpia el temporizador cuando el componente se destruye para evitar fugas de memoria
            clearInterval(this.pollingTimer);
        }

    },
    mounted() {
        console.log(this.$store.state.estadoSesion)
    },
    beforeCreate() {
        //Verificar si ya tenemos una sesión iniciada
        this.$storage.get('tokenInicioSesion')
            .then(token => {
                if (!token) {
                    //Si no tenemos sesión iniciada
                    console.log('Inicia sesión o registrate!')
                    this.$router.push('/scaner')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario
                    this.obtenerDatosUsuario();
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });

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
    background-color: white;
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