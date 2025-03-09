
  <script>
    import Navbar from "./components/Navbar.svelte"
    import { launches, fetchLaunches } from "$lib/api";
	import { onMount } from "svelte";

    onMount(fetchLaunches)
  </script>
  
  <div class="min-h-screen relative bg-black">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img
        src="/bg.jpg"
        alt="Interior with plants"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40"></div>
    </div>
    <Navbar/>
  
    <!-- Konten -->
    <div class="relative z-10">
      <!-- Navigasi -->
  
      <div class="container mx-auto px-6 pt-20">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Konten Kiri -->
          <div class="space-y-8">
            <h1 class="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                Discover the latest information about space exploration.
            </h1>
            
            <a href="/pod" class="flex items-center gap-2 font-semibold  bg-white max-w-max text-black px-6 py-3 rounded-full hover:bg-white/70 hover:ring-white hover:ring transition-colors">
              <span class="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 1024 1024"><path  d="M512 128a384 384 0 1 0 0 768a384 384 0 0 0 0-768m0-64a448 448 0 1 1 0 896a448 448 0 0 1 0-896"/><path  d="M640 288q64 0 64 64t-64 64t-64-64t64-64M214.656 790.656l-45.312-45.312l185.664-185.6a96 96 0 0 1 123.712-10.24l138.24 98.688a32 32 0 0 0 39.872-2.176L906.688 422.4l42.624 47.744L699.52 693.696a96 96 0 0 1-119.808 6.592l-138.24-98.752a32 32 0 0 0-41.152 3.456l-185.664 185.6z"/></svg>
                Picture of the day</span>
            </a>
          </div>
  
          <!-- Konten Kanan -->
          <div class="space-y-4">
            <a href="/launch-schedule" class=" block group cursor-pointer">
              <div class="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-white text-xl mb-1">{$launches.length} Launch </h3>
                    <p class="text-white/70 text-sm">Around the world</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>
  
            <a href="/iss-location" class=" block group cursor-pointer">
              <div class="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                <div class="flex flex-col md:flex-row items-center justify-between">
                    <img src="/iss.png" class="w-full md:w-1/2 rounded-xl" alt="" srcset="">
                  <div>
                    <h3 class="text-white text-xl mb-1">See ISS Location</h3>
                    <p class="text-white/70 text-sm">Explore a handpicked selection</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Any additional custom styles can go here */
  </style>