<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '../components/Navbar.svelte';
  
  let mapElement: HTMLDivElement;
  let map: any;
  let issMarker: any;
  let latitude = 0;
  let longitude = 0;
  let lastUpdateTime = '';

  async function fetchISSLocation(): Promise<void> {
    try {
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      const data = await response.json();
      
      latitude = parseFloat(data.latitude);
      longitude = parseFloat(data.longitude);
      
      if (map && issMarker) {
        issMarker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], map.getZoom());
      }
      
      lastUpdateTime = new Date().toLocaleTimeString();
    } catch (error) {
      console.error('Error fetching ISS location:', error);
    }
  }

  onMount(async ():Promise<void> =>{
    
    const L = await import('leaflet');
    await import('leaflet/dist/leaflet.css');

    
    map = L.map(mapElement).setView([0, 0], 3);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    
    const issIcon = L.divIcon({
      className: 'custom-iss-icon',
      html: `
       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#fff" d="M15.5 19v2h-1.77c-.34.6-.99 1-1.73 1s-1.39-.4-1.73-1H8.5v-2h1.77c.17-.3.43-.56.73-.73V17h-1c-.55 0-1-.45-1-1v-3H6v4c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v3h3V8c0-.55.45-1 1-1h1V6h-1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1c0 .55-.45 1-1 1h-1v1h1c.55 0 1 .45 1 1v3h3V8c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-4h-3v3c0 .55-.45 1-1 1h-1v1.27c.3.17.56.43.73.73zM3 16v1h2v-1zm0-2v1h2v-1zm0-2v1h2v-1zm0-2v1h2v-1zm0-2v1h2V8zm16 8v1h2v-1zm0-2v1h2v-1zm0-2v1h2v-1zm0-2v1h2v-1zm0-2v1h2V8z"/></svg>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    
    
    issMarker = L.marker([latitude, longitude], {icon: issIcon}).addTo(map);
    
    
    await fetchISSLocation();
    
    // Update lokasi setiap 5 detik
    const interval = setInterval(fetchISSLocation, 5000);
    
    return () => clearInterval(interval);
  });
</script>


<main class=" mx-auto h-screen font-sans bg-no-repeat bg-cover bg-center" style="background-image: url('/iss_bg.png');" >
  <Navbar />
  <section class="container mx-auto px-4 max-w-4xl" >
    
    <div class="text-center mb-4">
      <h1 class="text-4xl  font-bold text-white">ISS Live Location</h1>
    </div>

    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div id="map" style="height: 300px;" bind:this={mapElement}></div>
      
      <div class="grid grid-cols-3 divide-x bg-gray-100 p-2">
        <div class="text-center">
          <span class="text-xs text-gray-600">Latitude</span>
          <p class="font-semibold">{latitude.toFixed(4)}°</p>
        </div>
        <div class="text-center">
          <span class="text-xs text-gray-600">Longitude</span>
          <p class="font-semibold">{longitude.toFixed(4)}°</p>
        </div>
        <div class="text-center">
          <span class="text-xs text-gray-600">Updated</span>
          <p class="font-semibold">{lastUpdateTime}</p>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <p class="text-gray-600 text-sm">updated every five seconds</p>
      <a 
        href="https://www.nasa.gov/mission_pages/station/main/index.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="text-sm text-blue-600 hover:underline"
      >
        More Information from NASA
      </a>
    </div>
  </section>
</main>