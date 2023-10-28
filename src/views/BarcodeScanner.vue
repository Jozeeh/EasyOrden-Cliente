<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="danger" class="bgcolor-header ion-text-center">
        <img src="/EasyOrden-LogoBlancoSinFondo.png" width="200">
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding fondo">

      <ion-card class="card-qr">
        <ion-card-content>

          <div>
            <video ref="video" autoplay class="camera"></video>
            <canvas ref="canvas" style="display: none;"></canvas>
          </div>
          <p class="camera-error" v-if="cameraError">No has dado permisos a la cámara.</p>

          <!-- botones -->
          <ion-grid>
            <ion-row class="ion-align-items-center">
              <ion-col size="12">
                <ion-button class="toggle-camera" @click="toggleCamera" v-if="isMobile" color="warning">
                  <ion-icon :icon="isFrontCamera ? 'camera-reverse' : 'camera'"></ion-icon>
                  Cambiar Cámara
                </ion-button>
              </ion-col>
              <ion-col>
                <ion-button class="start-scan" @click="startScan" v-if="!isScanning" color="warning">Iniciar
                  Escaneo</ion-button>
              </ion-col>
              <ion-col>
                <ion-button class="stop-scan" @click="stopScan" v-if="!isScanning" color="warning">Detener
                  Escaneo</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>

          <ion-button @click="descargarPDF" v-if="qrCodeUrl">Descargar PDF</ion-button>
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import jsQR from 'jsqr';
import { IonPage, IonContent, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonImg } from '@ionic/vue'; // Asegúrate de importar IonIcon

export default {
  name: 'BarcodeScanner',
  components: {
    IonPage, IonContent, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonImg
  },
  data() {
    return {
      scannedData: '',
      videoStream: null,
      isFrontCamera: false,
      cameraError: false, // Agrega esta variable
    };
  },
  methods: {
    async startScan() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      let facingMode = 'user'; // Por defecto, usa la cámara frontal en dispositivos móviles
      if (this.isMobile) {
        facingMode = 'environment'; // Utiliza la cámara trasera en dispositivos móviles
      }
      const constraints = { video: { facingMode } };
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        this.cameraError = false;
        video.srcObject = this.videoStream;
        await video.play();
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const loop = async () => {
          if (!this.videoStream) {
            return;
          }
          ctx.drawImage(video, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code) {
            this.scannedData = code.data;
            this.$store.state.qr = code.data;

            // obtiene los datos
            const lineaDeTexto = code.data;

            // Dividir la cadena en un arreglo usando la coma como separador
            const datos = lineaDeTexto.split(',');

            // Verificar si se obtuvieron dos elementos después de dividir
            if (datos.length === 2) {
              // Asignar los valores a las variables
              const dato1 = datos[0].trim(); // Trim para eliminar espacios en blanco
              const dato2 = datos[1].trim();

              this.$store.state.ipLocal = dato1
              this.$store.state.numeroMesa = dato2
              this.$router.push('/login')
            } else {
              console.log("La línea de texto no contiene dos elementos separados por comas.");
            }


            this.stopScan();
          }
          requestAnimationFrame(loop);
        };
        loop();
      } catch (err) {
        this.cameraError = true;
        console.error(err);
      }
    },

    stopScan() {
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => {
          track.stop();
        });
        this.videoStream = null;
      }
    },

    toggleCamera() {
      this.isFrontCamera = !this.isFrontCamera;
      this.stopScan(); // Detener la cámara actual
      this.startScan();
    },
  },
  beforeDestroy() {
    this.stopScan();
  },

  computed: {
    isMobile() {
      return window.innerWidth <= 768; // Ajusta este valor según tus necesidades
    },
  },
};
</script>

<style scoped>

.card-qr {
  background-color: #ffffff;
  border-radius: 10px;
  text-align: center;
  padding-bottom: 10px;
}

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

/* ESTILOS HEADER */
.bgcolor-header {
    --background: #c93e4f;
    --color: white;
}

.camera-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.scan-frame {
  background-color: #fc5956;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.camera {
  width: 100%;
  max-width: 400px;
  border-radius: 30px;
}

.scan-result {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #fc8e5b;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.scan-line {
  background: #c93e4f;
  height: 2px;
  width: 100%;
  animation: scan 2s linear infinite;
}

.camera-error {
  color: #c93e4f;
  font-size: 18px;
  margin-top: 20px;
}

@keyframes scan {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
}
</style>
