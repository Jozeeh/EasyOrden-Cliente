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
                                
                            </ion-card-header>
                            <ion-card-content>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Correo" type="text" v-model="email"></ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-input label-placement="floating" label="Contraseña" type="password" v-model="password"></ion-input>
                                </ion-item>
                                <div v-if="datosErroneos===true" style="color: red; margin-top: 10px;">
                                    Ingresa correctamente tus datos
                                </div>

                                <br>
                                <a style="text-decoration: none;" @click="this.$router.push('/registrarse')">¿No tienes cuenta? Registrate aquí</a>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" color="success" @click="login()">Iniciar Sesión</ion-button>
                    </ion-col>
                    <ion-col size="12">
                        <ion-button expand="block" color="warning" @click="this.$router.push('/registrarse')">Registrarse</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

        <ion-footer> 
            <ion-toolbar>
                Desarrollado por DevDreams - 2023
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>


<script>
import {IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonFooter, IonToolbar, IonTitle, IonIcon, IonAlert } from '@ionic/vue';
import axios from 'axios';

export default {
    name: 'InicioSesionPage',
    components: {
        IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonThumbnail, IonFooter, IonToolbar, IonTitle, IonIcon, IonAlert
    },
    data() {
        return {
            ipLocal: this.$store.state.ipLocal,
            email: '',
            password: '',
            datosErroneos: false
        };
    },
    methods: {
        login() {
            const userData = {
                email: this.email,
                password: this.password
            };
            axios.post(`http://${this.ipLocal}/api/users`, userData)
                .then(response => {
                    // Manejar la respuesta exitosa aquí
                    const token = response.data.token; // Suponiendo que el token se devuelve en la respuesta

                    // Almacena el token en el almacenamiento local o en una cookie
                    localStorage.setItem('tokenInicioSesion', token);
                    this.$store.dispatch('iniciarSesionAccion')
                    this.$store.state.datosUsuario = response.data.data

                    // Redirige y limpia inputs de inicio de sesion
                    this.$router.push('/inicio')
                    this.email = ''
                    this.password = ''
                    this.datosErroneos = false
                    this.$store.state.stateInicio = true
                    

                    console.log(response);
                })
                .catch(error => {
                    // Manejar errores de inicio de sesión aquí
                    this.datosErroneos = true
                    console.error(error);
                });
        }
    },
    mounted() {
        console.log(this.$store.state.datosUsuario);
    }
}
</script>

<style scoped>
.fondo-card-sesion{
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
ion-footer{
    --ion-background-color: none;
    background-color: rgb(26, 26, 26);
    --ion-text-color: none;
    color: white;
    text-align: center;
    font-size: 15px;
}
</style>
