<template>
    <!-- inicio de sesion -->
    <ion-page>
        <ion-content class="fondo-sesion">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-card class="fondo-card-sesion">
                            <ion-card-header>
                                <img src="/EasyOrden-LogoRojoSinFondo.png">
                                <ion-card-title>Iniciar Sesión</ion-card-title>
                                (para clientes)
                            </ion-card-header>
                            <ion-card-content>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Correo" type="text"
                                        v-model="email"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Contraseña" type="password"
                                        v-model="password"></ion-input>
                                </ion-item>
                                <div v-if="datosErroneos === true" style="color: red; margin-top: 10px;">
                                    Ingresa correctamente tus datos
                                </div>

                                <br>
                                <a style="text-decoration: none;" @click="this.$router.push('/registrarse')">¿No tienes
                                    cuenta? Registrate aquí</a>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" color="success" @click="login()">Iniciar Sesión</ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-button expand="block" color="warning"
                            @click="this.$router.push('/registrarse')">Registrarse</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer>
            <ion-toolbar>
                Desarrollado por DevDreams - 2023
            </ion-toolbar>
        </ion-footer>

        <!-- LOGIN MODAL -->
        <ion-modal ref="modal" :keep-contents-mounted="true" trigger="open-modal" :is-open="modalLogin">
            <ion-header class="ion-text-center" style="background-color: white; color: black; box-shadow: none; padding-top: 10px;">
                <b>Desarrollador por DevDreams - 2023</b>
            </ion-header>

            <div class="modal-container" style="height: 100%; display: flex; justify-content: center;align-items: center; background-color: white;">
                <img src="/EasyOrden-LogoRojoSinFondo.png" style="padding-left: 15px; padding-right: 15px;">
            </div>

            <ion-footer style="background-color: white; color: black; box-shadow: none;">
                <ion-spinner name="circular" style="--color: black;"></ion-spinner><br>
                Iniciando sesión...<br><br>
            </ion-footer>
        </ion-modal>

        <ion-alert style="--background: white; --ion-text-color: black;"
            :is-open="alertaLogin"
            header="Sesión fallida!"
            message="¡Al parecer el usuario no existe o ingresaste mal tus datos! :("
            :buttons="['OK']"
        ></ion-alert>
    </ion-page>
</template>


<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonFooter, IonToolbar, IonTitle, IonIcon, IonAlert, IonSpinner, IonModal, IonHeader } from '@ionic/vue';
import axios from 'axios';


export default {
    name: 'InicioSesionPage',
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonFooter, IonToolbar, IonTitle, IonIcon, IonAlert, IonSpinner, IonModal, IonHeader
    },
    data() {
        return {
            ipLocal: this.$store.state.ipLocal,
            email: '',
            password: '',
            datosErroneos: false,
            modalLogin: false,
            alertaLogin: false
        };
    },
    methods: {
        // Login con ionic/storage
        login() {
            this.modalLogin = true
            this.alertaLogin = false
            const userData = {
                email: this.email,
                password: this.password,
                // ipLocal: this.ipLocal
            };
            axios.post(`${this.ipLocal}/users`, userData)
                .then(response => {
                    // Manejar la respuesta exitosa aquí
                    const datosUsuario = response.data.data; // Suponiendo que el token se devuelve en la respuesta
                    datosUsuario['ipLocal'] = this.ipLocal;
                    datosUsuario['numeroMesa'] = this.$store.state.numeroMesa;

                    // Almacena el token en el almacenamiento local o en una cookie
                    this.$storage.set('tokenInicioSesion', datosUsuario);
                    // this.$storage.set('ipLocal', this.ipLocal);
                    // this.$store.dispatch('iniciarSesionAccion')
                    this.$store.state.datosUsuario = response.data.data
                    // this.$store.state.ipLocal = this.ipLocal

                    // Redirige y limpia inputs de inicio de sesion
                    this.$router.push('/inicio')
                    this.modalLogin = false
                    this.email = ''
                    this.password = ''
                    this.datosErroneos = false

                    console.log(response);
                })
                .catch(error => {
                    // Manejar errores de inicio de sesión aquí
                    this.alertaLogin = true
                    this.modalLogin = false
                    this.datosErroneos = true
                    console.error(error);
                });
        },
        // Obtenemos datos del usuario con Ionic/Storage
        obtenerDatosUsuario() {
            try {
                // Usa la función get para recuperar los datos del usuario por su clave
                this.$storage.get('tokenInicioSesion')
                    .then(userData => {
                        if (userData) {
                            // userData contiene los datos del usuario
                            this.$store.state.datosUsuario = userData;
                            this.$store.state.ipLocal = userData.ipLocal;
                            this.$store.state.numeroMesa = userData.numeroMesa;
                            

                            console.log('Datos del usuario:', userData);
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
    beforeCreate() {
        //Verificar si ya tenemos una sesión iniciada
        this.$storage.get('tokenInicioSesion')
            .then(token => {
                if (!token) {
                    //Si no tenemos sesión iniciada
                    console.log('Inicia sesión o registate!')
                } else {
                    // Si se encuentra un token, obtiene los datos del usuario y redirige al inicio
                    this.obtenerDatosUsuario();
                    this.$router.push('/inicio');
                }
            })
            .catch(error => {
                console.error('Error al verificar la sesión:', error);
            });
    },
    mounted() {
        console.log(this.$store.state.datosUsuario);
        // Aquí puedes realizar tareas de inicialización, y cuando estén completas, cambia `loading` a `false`

    },
}
</script>

<style scoped>
.fondo-card-sesion {
    background-color: #ffffff;
    border-radius: 10px;
    text-align: center;
    padding-bottom: 10px;
}

ion-item {
    --ion-item-background: none;
    color: black;
}

ion-card-title {
    color: black;
}

ion-button {
    margin: 0 auto;
    width: 90%;
}

.fondo-sesion {
    --background: none;
    background-image: url('/FondoSesion.webp');

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}

.fondo-sesion::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(14, 14, 14, 0.5);
}

ion-footer {
    --ion-background-color: none;
    background-color: rgb(26, 26, 26);
    --ion-text-color: none;
    color: white;
    text-align: center;
    font-size: 15px;
}</style>