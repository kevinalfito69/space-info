<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import { onMount } from 'svelte';

  // Definisi tipe untuk respons API ISS
  interface ISSResponse {
    iss_position: {
      latitude: string;
      longitude: string;
    };
    timestamp: number;
    message: string;
  }

  let latitude = 0;
  let longitude = 0;
  let spacekit: any;
  let simulation: any;
  let earth: any;
  let issObject: any;
  let initialized = false;

  // Fungsi untuk mengkonversi koordinat lat/long ke posisi kartesian
  function latLongToCartesian(latitude: number, longitude: number, radius: number = 1): [number, number, number] {
    const latRad = (latitude * Math.PI) / 180;
    const longRad = (longitude * Math.PI) / 180;

    const x = radius * Math.cos(latRad) * Math.cos(longRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(longRad);

    return [x, y, z];
  }

  async function fetchISSLocation(): Promise<void> {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data: ISSResponse = await response.json();
      latitude = parseFloat(data.iss_position.latitude);
      longitude = parseFloat(data.iss_position.longitude);

      if (initialized && issObject) {
        const position = latLongToCartesian(latitude, longitude, 1.02);
        issObject.getObject().position.set(position[0], position[1], position[2]);
      }
    } catch (error) {
      console.error('Error fetching ISS location:', error);
    }
  }

  onMount(async () => {
    // Pastikan kode hanya dijalankan di browser
    if (typeof window !== 'undefined') {
      try {
        // Import Spacekit secara dinamis
        const spacekitModule = await import('https://typpo.github.io/spacekit/build/spacekit.js');
        spacekit = spacekitModule;
        console.log('Spacekit loaded:', spacekit);

        // Siapkan container
        const container = document.getElementById('map');
        if (!container) {
          console.error('Container element not found');
          return;
        }

        // Buat simulasi baru
        simulation = new spacekit.Simulation(container, {
          basePath: 'https://typpo.github.io/spacekit', // Pastikan basePath valid
          startDate: new Date(),
          startPaused: false,
          debug: {
            showAxes: true, // Aktifkan debug axes untuk memeriksa orientasi
            showGrid: true, // Aktifkan debug grid untuk memeriksa posisi
          },
        });

        // Tambahkan bumi
        earth = simulation.createObject('earth', {
          labelText: 'Earth',
          ephem: new spacekit.EphemerisTable({
            entries: [{
              jd: 0,
              position: [0, 0, 0],
            }],
          }),
          atmosphere: true,
        });
        console.log('Earth created:', earth);

        // Atur skybox
        simulation.createSkybox(spacekit.SkyboxPresets.NASA_TYCHO);
        console.log('Skybox created');

        // Tambahkan bintang
        simulation.createStars();
        console.log('Stars created');

        // Atur kamera
        const viewer = simulation.getViewer();
        viewer.setCameraPosition([0, 0, 3]); // Posisi kamera di atas Bumi
        console.log('Camera position set');

        // Buat objek untuk ISS
        issObject = simulation.createObject('iss', {
          labelText: 'ISS',
          ephem: new spacekit.EphemerisTable({
            entries: [{
              jd: 0,
              position: [1.02, 0, 0], // Posisi awal ISS
            }],
          }),
          theme: {
            color: 0xff0000, // Warna merah untuk ISS
            markerSize: 10,
          },
        });
        console.log('ISS object created:', issObject);

        // Inisialisasi sukses
        initialized = true;

        // Ambil lokasi ISS dan perbarui posisi
        await fetchISSLocation();

        // Perbarui posisi setiap 5 detik
        const interval = setInterval(fetchISSLocation, 5000);

        // Bersihkan interval saat komponen di-unmount
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error initializing Spacekit:', error);
      }
    }
  });
</script>

<style>
  #map {
    width: 100%;
    height: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #000;
    position: relative;
    overflow: hidden;
  }
</style>

<Navbar />
<div class="m-auto max-w-2xl flex flex-col items-center">
  <h1 class="text-4xl">ISS Live Location</h1>
  <div id="map" class="w-full h-96 rounded-lg m-auto"></div>
  <div class="flex justify-evenly bg-black/50 backdrop-blur-sm rounded-b-lg w-full text-white font-semibold">
    <p>Lintang: {latitude.toFixed(6)}°</p>
    <p>Bujur: {longitude.toFixed(6)}°</p>
  </div>
  <p class="text-sm text-gray-400">Data diperbarui setiap 5 detik</p>
</div>