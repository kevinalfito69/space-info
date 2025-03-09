<script>
  import { mount, onMount } from 'svelte';
	import Navbar from '../components/Navbar.svelte';
  import { fetchLaunches, loading,error, launches } from '$lib/api';

  let loadingValue = true
  let errorValue = null
  let launchesValue = []
  loading.subscribe((value)=>{
    loadingValue = value;
  })
  error.subscribe((value)=>{
    errorValue = value;
  })
  launches.subscribe((value)=>{
    launchesValue = value;
  })
  onMount(fetchLaunches)
  
  </script>
    <Navbar/>
  <main class="container mx-auto p-6 font-sans">
    <h1 class="text-2xl font-bold text-center mb-6">Upcoming Rocket Launches</h1>
    {#if $loading}
      <p class="text-center text-gray-600">Loading...</p>
    {:else if $error}
      <p class="text-center text-red-500">Error: {error}</p>
    {:else if $launches && $launches.length > 0}
      <ul class="space-y-4">
        {#each $launches as launch}
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
  