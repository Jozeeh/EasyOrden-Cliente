<template>
    <ion-page>
      <h1>Escáner de Código QR</h1>
      <div class="camera-preview">
        <video ref="video" :style="{ width: '100%', height: '100%' }"></video>
        <canvas ref="canvas" :width="videoWidth" :height="videoHeight" style="position: absolute; top: 0; left: 0;"></canvas>
        <qrcode-stream @decode="onDecode" :mirror="false"></qrcode-stream>
      </div>
      <div v-if="qrCode">
        <h2>Código QR Detectado:</h2>
        <p>{{ qrCode }}</p>
      </div>
    </ion-page>
  </template>
  
  <script>
  import {IonPage} from '@ionic/vue'
  import { ref } from 'vue';
  import { QrcodeStream } from 'vue-qrcode-reader';
  
  export default {
    name: 'BarcodeScanner',
    components: {
      QrcodeStream, IonPage
    },
    data() {
      return {
        qrCode: null,
        videoWidth: 640,
        videoHeight: 480,
      };
    },
    mounted() {
      this.initCamera();
    },
    methods: {
      async initCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          const video = this.$refs.video;
          video.srcObject = stream;
        } catch (error) {
          console.error('Error al acceder a la cámara:', error);
        }
      },
      onDecode(result) {
        this.qrCode = result;
      },
    },
  };
  </script>
  
  <style scoped>
  .camera-preview {
    position: relative;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  }
  </style>