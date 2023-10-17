<template>
  <div>
    <video ref="video" autoplay></video>
    <canvas ref="canvas" style="display:none;"></canvas>
    <div v-if="scannedData">
      <p>Scanned Data:</p>
      <p>{{ scannedData }}</p>
    </div>
    <button @click="startScan">Start Scan</button>
    <button @click="stopScan">Stop Scan</button>
  </div>
</template>

<script>
import jsQR from 'jsqr';

export default {
  name: 'QRScanner',
  data() {
    return {
      scannedData: '',
      videoStream: null,
    };
  },
  methods: {
    async startScan() {
      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      try {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
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
            this.stopScan();
          }
          requestAnimationFrame(loop);
        };
        loop();
      } catch (err) {
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
  },
  beforeDestroy() {
    this.stopScan();
  },
};
</script>