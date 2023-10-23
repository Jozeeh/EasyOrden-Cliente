<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Generador de Código QR</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Texto 1</ion-label>
          <ion-input v-model="text1"></ion-input>
        </ion-item>
  
        <ion-item>
          <ion-label position="stacked">Texto 2</ion-label>
          <ion-input v-model="text2"></ion-input>
        </ion-item>
  
        <ion-button @click="generateQRCode">Generar QR Code</ion-button>
        <br>
  
        <ion-img :src="qrCodeUrl" v-if="qrCodeUrl" alt="QR Code"></ion-img>
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonImg, IonButton } from '@ionic/vue';
  import QRCode from 'qrcode-generator';
  
  export default {
    components:{
        IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonInput, IonLabel, IonItem, IonImg, IonButton
    },
    data() {
      return {
        text1: '',
        text2: '',
        qrCodeUrl: null,
      };
    },
    methods: {
      generateQRCode() {
        // Combine the two texts into one string
        const combinedText = `${this.text1}, ${this.text2}`
  
        // Create a QRCode instance and generate the QR code
        const qrcode = new QRCode(0, 'M');
        qrcode.addData(combinedText);
        qrcode.make();
  
        // Convert the QR code data to a data URL
        this.qrCodeUrl = qrcode.createDataURL(4, 0);
      },
    },
  };
  </script>

<style>
    ion-img{
        width: 150px;
    }
</style>
  