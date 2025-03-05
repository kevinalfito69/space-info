<script lang="ts">
    import { onMount } from 'svelte';
	import Navbar from '../components/Navbar.svelte';
  
    interface Launch {
      name: string;
      provider: { name: string };
      pad: { location: { name: string } };
      t0: string;
    }
  
    let launches: Launch[] = [];
    let loading: boolean = true;
    let error: string | null = null;
  
    onMount(async () => {
      try {
        const response = await fetch('https://fdo.rocketlaunch.live/json/launches/next/5');
        if (!response.ok) {
          throw new Error('Failed to fetch launches');
        }
        const data = await response.json();
        launches = (data.result as Launch[]).sort((a, b) => new Date(b.t0).getTime() - new Date(a.t0).getTime());
      } catch (err) {
        error = (err as Error).message;
      } finally {
        loading = false;
      }
    });
  </script>
  <Navbar/>
  <main class="max-w-2xl mx-auto p-6 font-sans">
    <h1 class="text-2xl font-bold text-center mb-6">Upcoming Rocket Launches</h1>
    {#if loading}
      <p class="text-center text-gray-600">Loading...</p>
    {:else if error}
      <p class="text-center text-red-500">Error: {error}</p>
    {:else}
      <ul class="space-y-4">
        {#each launches as launch}
          <li class="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
            <h2 class="text-lg font-semibold">{launch.name}</h2>
            <p class="text-gray-700"><strong>Provider:</strong> {launch.provider.name}</p>
            <p class="text-gray-700"><strong>Location:</strong> {launch.pad.location.name}</p>
            <p class="text-gray-700"><strong>Date:</strong> {new Date(launch.t0).toLocaleString()}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </main>
  