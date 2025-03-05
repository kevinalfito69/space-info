<script lang="ts">
    import { onMount } from 'svelte';
  
    interface MarsWeather {
      sol: string;
      terrestrialDate: string;
      minTemp: number;
      maxTemp: number;
      windSpeed: number;
    }
  
    let weatherData: MarsWeather[] = [];
    let loading: boolean = true;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        const response = await fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json');
        if (!response.ok) {
          throw new Error('Failed to fetch Mars weather data');
        }
        const data = await response.json();
        const reports = data.soles;
        
        weatherData = reports.map((report: any) => ({
          sol: report.sol,
          terrestrialDate: report.terrestrial_date,
          minTemp: report.min_temp || 0,
          maxTemp: report.max_temp || 0,
          windSpeed: report.wind_speed || 0,
        }));
      } catch (err) {
        error = (err as Error).message;
      } finally {
        loading = false;
      }
    });
  </script>
  
  <main class="max-w-3xl mx-auto p-6 font-sans">
    <h1 class="text-2xl font-bold text-center mb-6">Mars Weather Report</h1>
    {#if loading}
      <p class="text-center text-gray-600">Loading...</p>
    {:else if error}
      <p class="text-center text-red-500">Error: {error}</p>
    {:else}
      <ul class="space-y-4">
        {#each weatherData as weather}
          <li class="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <h2 class="text-lg font-semibold">Sol {weather.sol}</h2>
            <p class="text-gray-700"><strong>Date:</strong> {new Date(weather.terrestrialDate).toLocaleDateString()}</p>
            <p class="text-gray-700"><strong>Min Temp:</strong> {weather.minTemp}°C</p>
            <p class="text-gray-700"><strong>Max Temp:</strong> {weather.maxTemp}°C</p>
            <p class="text-gray-700"><strong>Wind Speed:</strong> {weather.windSpeed} m/s</p>
          </li>
        {/each}
      </ul>
    {/if}
  </main>