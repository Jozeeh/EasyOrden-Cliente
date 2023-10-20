<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>EasyOrden</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label position="floating">Email</ion-label>
                            <ion-input type="email" v-model="email" required></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label position="floating">Password</ion-label>
                            <ion-input type="password" v-model="password" required></ion-input>
                        </ion-item>
                    </ion-list>
                    <a href="#">Registrarse</a>
                    <ion-button expand="block" @click="login()">Login</ion-button>
                    <ion-button expand="block" @click="registroAnonimo()">Inicio sin registro</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import axios from 'axios'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoginView',
    components: {
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonContent,
        IonHeader,
        IonInput,
        IonItem,
        IonLabel,
        IonList,
        IonPage,
        IonToolbar
    },
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {

        login() {
            const userData = {
                email: this.email,
                password: this.password
            };
            axios.post('http://127.0.0.1:8000/api/users', userData)
                .then(response => {
                    console.log(response);
                    // Manejar la respuesta exitosa aquí
                    const token = response.data.token; // Suponiendo que el token se devuelve en la respuesta

                    // Almacena el token en el almacenamiento local o en una cookie
                    localStorage.setItem('token', token);
                    this.$store.state.stateInicio = true
                    this.$store.state.user = response.data.data
                    this.$router.push('/inicio')

                    // Redirige o realiza otras acciones después del inicio de sesión
                })
                .catch(error => {
                    // Manejar errores de inicio de sesión aquí
                    console.error(error);
                });
        }
}
});
</script>

<style scoped>
ion-card {
    max-width: 400px;
    margin: 0 auto;
}
</style>
