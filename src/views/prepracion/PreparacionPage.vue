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
                <!-- <ion-row>
                    <ion-col>
                        <ion-card>
                            <ion-card-content>
                                <ion-title>
                                    <h2>Estado del pedido</h2>
                                </ion-title>
                                <div class="percentage-bar">
                                    <div class="bar">
                                        <div class="fill" :style="{ width: `${percentage}%` }"> </div>
                                    </div>
                                    <div class="status-icon">
                                        <img :src="statusIcons[state]" alt="Status Icon" />
                                        <div class="percentage">{{ percentage }}%</div>
                                    </div>

                                </div>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row> -->

                <ion-row v-for="(pedidoClientes, i) in pedidos2" :key="i">
                    <ion-col v-if="pedidoClientes.name === this.$store.state.datosUsuario.name">
                        <!-- ION ACORDEON -->
                        <ion-accordion-group>
                            <ion-accordion value="first" :toggle-icon="caretDownCircle" toggle-icon-slot="end"
                                class="accordion-icon item-description">
                                <ion-item slot="header" class="item-producto">
                                    <ion-label>{{ pedidoClientes.name }}</ion-label>
                                </ion-item>
                                <div class="ion-padding accordionExpand" slot="content">
                                    <!-- PRODUCTOS DE CADA CLIENTE -->
                                    <ion-card v-for="(pedidos, i) in pedidoClientes.pedidos"
                                        style="background-color: white; color: black;">
                                        <div v-if="pedidos.numMesa === this.$store.state.numeroMesa">
                                            <ion-card-header>
                                                <div><b>Cliente:</b> {{ pedidos.name }}</div>
                                                <div><b>El pedido fue hecho:</b> {{ pedidos.created_at }}</div>
                                                <ion-item style="--background: white; color: black;">
                                                    <ion-thumbnail slot="end"><img alt="pedido-imagen"
                                                            :src="pedidos.imagen" /></ion-thumbnail>
                                                    <ion-label> {{ pedidos.nombrePlato }}</ion-label>
                                                </ion-item>
                                                <ion-card-title style="color: black;">{{ pedidos.numMesa }}</ion-card-title>
                                            </ion-card-header>

                                            <ion-card-content>

                                                <b>El producto está en:</b> {{ pedidos.estadoPedido }}
                                                <br>
                                                <div class="progress-bar">
                                                    <div class="progress"
                                                        :style="{ width: `${porcentajeCompletado(pedidos.estadoPedido)}%` }">
                                                    </div>
                                                </div>
                                            </ion-card-content>
                                        </div>
                                    </ion-card>
                                </div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </ion-col>
                </ion-row>

            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard,
    IonCardContent, IonAccordionGroup, IonAccordion, IonButton, IonItem, IonCardTitle, IonCardHeader, IonThumbnail, IonLabel, IonInput
} from '@ionic/vue';
import axios from 'axios';
export default {
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol, IonCard,
        IonCardContent, IonAccordionGroup, IonAccordion, IonButton, IonItem, IonCardTitle, IonCardHeader, IonThumbnail, IonLabel, IonInput
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

            // pedidos
            ipLocal: this.$store.state.ipLocal,
            categoriaEstadoPedido: 'Ordenado',
            pedidos: {},
            pedidos2: {},

            // para cargar la barra
            pedidosEstados: {
                estadoPedido: '' // Cambiar esto para probar diferentes estados
            },
            fechaActual: ''
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
                        this.ipLocal = userData.ipLocal
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
        updateProgressBar() {
            const percentageMap = {
                enviado: 0,
                preparacion: 50,
                listo: 75,
                entregado: 100,
            };
            this.percentage = percentageMap[this.state];

        },
        obtenerPedidos() {
            axios.get(`${this.ipLocal}/pedidos/select/`)
                .then(response => {
                    this.pedidos2 = response.data.data
                    console.log(response.data.data);
                })
                //Si ocurre un error se imprimirá en consola
                .catch(error => {
                    console.error('OCURRIO UN ERROR: ', error);
                })
        },
        // Obtenemos los pedidos que se han hecho con los detalles del plato
        obtenerPedidosCategoria() {
            axios.get(`${this.ipLocal}/pedidos/select/${this.categoriaEstadoPedido}`)
                .then(response => {
                    this.pedidos = response.data.data
                    console.log(response.data.data);
                })
                //Si ocurre un error se imprimirá en consola
                .catch(error => {
                    console.error('OCURRIO UN ERROR: ', error);
                })
        },
        actualizarEstadoPedido(idPedido, nuevoEstado) {

            if (nuevoEstado == "En preparación") {
                nuevoEstado = "En preparación"

            } else if (nuevoEstado == "Listo") {
                nuevoEstado = "Entregado"
            }

            const data = {
                estadoPedido: nuevoEstado
            };

            axios.put(`${this.ipLocal}/pedidos/update/${idPedido}`, data)
                .then(response => {
                    console.log(response.data.data);
                    this.obtenerPedidos()
                })
                //Si ocurre un error se imprimirá en consola
                .catch(error => {
                    console.error('OCURRIO UN ERROR: ', error);
                })
        },
        // funcion para calcular el porcentaje de la barra
        porcentajeCompletado(estadoPedido) {
            switch (estadoPedido) {
                case 'Ordenado':
                    return 10;
                case 'En preparación':
                    return 50;
                case 'Entregado':
                    return 100;
                default:
                    return 0;
            }
        },
        // obtiene la fecha actual
        obtenerFechaActual() {
            var fecha = new Date();
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1;
            var anio = fecha.getFullYear();
            this.fechaActual = anio + '-' + mes + '-' + dia;

        },
    },
    created() {
        // Configura una consulta periódica cada ciertos segundos (por ejemplo, cada 5 segundos)
        this.obtenerFechaActual()
        this.pollingTimer = setInterval(this.obtenerPedidos, 300000);
    },
    beforeDestroy() {
        // Limpia el temporizador cuando el componente se destruye para evitar fugas de memoria
        clearInterval(this.pollingTimer);
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
        
    },
    
    mounted() {
        this.updateProgressBar();
        this.obtenerPedidos()
    },
    watch: {
        //este metodo comprueba que la operacion sea diferente para volver hacer el calculo
        //debe ser mismo nombre de la variable donde esta en return
        categoriaEstadoPedido(nuevoValor, antiguoValor) {
            if (nuevoValor != antiguoValor) {
                this.obtenerPedidosCategoria()
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

.progress-bar {
    width: 100%;
    height: 10px;
    background-color: #ddd;
}

.progress {
    height: 100%;
    background-color: #007bff;
}
</style>