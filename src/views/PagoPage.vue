<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar class="bgcolor-header">
                <ion-buttons slot="start">
                    <ion-back-button text="Atrás" :icon="caretBack"></ion-back-button>
                </ion-buttons>

                <ion-buttons slot="end">
                    <ion-menu-button color="light"></ion-menu-button>
                </ion-buttons>
                <ion-title>Comidas</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <div class="contenedor">

                <ion-grid>
                    <ion-row v-for="(prod, i) in this.$store.state.carrito">
                        <ion-col>
                            {{ prod.nombre }}
                        </ion-col>
                        <ion-col>
                            {{ prod.precio }}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            Total: 
                        </ion-col>
                        <ion-col>
                            {{ Total }}
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

        </ion-content>
    </ion-page>
</template>


<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton, } from '@ionic/vue';

import {cart} from 'ionicons/icons';

export default {
    name: 'InicioPage',
    components: {
        IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, 
        IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonSelect, IonSelectOption, IonBackButton
    },
    data() {
        return {
            cart,
            Total: 0
        }
    },
    methods:{
        calcularTotal(){
            var carrito = this.$store.state.carrito
            var total = 0
            carrito.forEach(function (prod, i){
                total += prod.precio
               
            });

            this.Total = total
        }
    },
    created() {
        this.calcularTotal();
    },
    mounted() {
        this.calcularTotal();
    },
    
    
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