<script>
    import { onMount } from 'svelte';
	import Navbar from '../components/Navbar.svelte';
  import { fetchMarsWeather,loading, error, recentDataWeather, weatherData } from '$lib/api';
  
    let weatherValue= [];
    let recentWeatherValue = [];
    let loadingValue= true;
    let errorValue = null;
    loading.subscribe((value)=>{
      loadingValue = value;
    })
    error.subscribe((value)=>{
      errorValue = value;
    })
    weatherData.subscribe((value)=>{
      weatherValue = value;
    })
    recentDataWeather.subscribe((value)=>{
      recentWeatherValue = value;
    })
    onMount(fetchMarsWeather)
    
    
  </script>
  
  <main class=" mx-auto min font-sans h-screen bg-no-repeat bg-cover bg-center" style="background-image: url('/mars_bg.png');" >
    <Navbar/>
    <section class="container mx-auto flex flex-col justify-between gap-24 content-between">
      <div>
        <h1 class="text-2xl mb-6 md:text-6xl font-bold text-center text-white">Latest Weather at Gale Crater</h1>
        <p class=" text-white text-sm text-center">Curiosity is taking daily weather measurements at Gale Crater in the southern hemisphere of Mars, near the equator. At this location, it's currently middle autumn.</p>
      </div>
    {#if $loading}
      <p class="text-center text-gray-600">Loading...</p>
    {:else if $error}
      <p class="text-center text-red-500">Error: {error}</p>
    {:else if $recentDataWeather && $recentDataWeather.length > 0}
      <ul class="space-y-4 md:flex md:justify-center md:content-center md:gap-8">
        {#each $recentDataWeather as weather}
          <li class="border h-full border-black/20 flex flex-col content-between justify-between text-center  p-4 rounded-lg shadow-md bg-black/30 backdrop-blur-md ">
            <h2 class="text-lg text-white font-semibold">Sol {weather.sol}</h2>
            <p class="text-gray-300"><strong>Date:</strong> {new Date(weather.terrestrialDate).toLocaleDateString()}</p>
            <span class="bg-gray-300 h-0.5"></span>
            <p class="text-gray-200 text-xs"><strong>Min Temp:</strong> {weather.minTemp}°C</p>
            <p class="text-gray-200 text-xs"><strong>Max Temp:</strong> {weather.maxTemp}°C</p>
            <p class="text-gray-200 text-xs"><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
  </main>