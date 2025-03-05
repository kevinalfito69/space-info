<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly, scale } from 'svelte/transition'; // Added more transition effects [^1]
  import Navbar from "../components/Navbar.svelte"
  let title: string = "";
  let imageUrl: string = "";
  let explanation: string = "";
  let date: string = "";
  let isLoading: boolean = true;
  let error: string | null = null;

  const apiKey = "q6yp2lBh91cDDuJXqQa1b2hnafvin1Rgh1ukZXeg";
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  onMount(async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      title = data.title;
      imageUrl = data.url;
      explanation = data.explanation;
      date = data.date;
      isLoading = false;
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      error = "Failed to load astronomy data. Please try again later.";
      isLoading = false;
    }
  });
</script>

<main class="min-h-screen bg-gray-900 text-white h-screen bg-no-repeat bg-cover bg-center" style:background-image={imageUrl ? `url('${imageUrl}')` : 'none'}>
  

  <Navbar/>
  {#if isLoading}
    <div class="min-h-screen flex flex-col items-center justify-center" in:fade={{ duration: 300 }}>
      <div class="space-y-4 text-center">
        <div class="loader"></div>
        <p class="text-lg">Loading today's astronomy picture...</p>
      </div>
    </div>
  {:else if error}
    <div class="min-h-screen flex items-center justify-center p-4" in:fade={{ duration: 300 }}>
      <div class="bg-red-900/80 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md">
        <h2 class="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
        <button 
          class="mt-4 px-4 py-2 bg-white text-red-900 rounded-md hover:bg-gray-200 transition-colors"
          on:click={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  {:else}
    <div class="relative">
     

      <!-- Main content -->
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-5xl mx-auto">
          
         <div 
            class="bg-black/50 bg-da rounded-xl overflow-hidden shadow-2xl mb-8"
            in:scale={{ start: 0.95, duration: 700, delay: 400 }}
          >
          <h2 
          class="text-xl md:text-2xl font-bold mb-6 text-center" 
          in:fly={{ y: 20, duration: 700, delay: 300 }}
        >
          {title}
        </h2>
            
            <!-- Explanation -->
            <div class="p-6 md:p-8">
              <p 
                class="text-gray-200 leading-relaxed text-sm md:text-sm space-y-4"
                in:fade={{ duration: 1000, delay: 600 }}
              >
                {explanation.split('\n\n').map(paragraph => `${paragraph}`).join('')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <a in:fade={{ duration: 1000, delay: 800 }} href={imageUrl} target="_blank" rel="noopener noreferrer" aria-label="full-screen" title="full-screen" class="p-2 -translate-1.5 bg-white absolute bottom-0 right-0 rounded-lg transition-colors duration-300 font-medium">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-black " viewBox="0 0 24 24"><path  d="M11.25 13.5q.95 0 1.6-.65t.65-1.6t-.65-1.6t-1.6-.65t-1.6.65t-.65 1.6t.65 1.6t1.6.65m4.825 4l-2.625-2.625q-.5.325-1.062.475t-1.138.15q-1.775 0-3.012-1.237T7 11.25t1.238-3.012T11.25 7t3.013 1.238T15.5 11.25q0 .575-.162 1.138t-.488 1.062l2.65 2.65zM5 21q-.825 0-1.412-.587T3 19v-4h2v4h4v2zm10 0v-2h4v-4h2v4q0 .825-.587 1.413T19 21zM3 9V5q0-.825.588-1.412T5 3h4v2H5v4zm16 0V5h-4V3h4q.825 0 1.413.588T21 5v4z"/></svg>
  </a>
  <footer class=" absolute bottom-0 pb-2.5 inset-x-0" in:fade={{ duration: 700, delay: 900 }}>
    <div class="container mx-auto px-4 text-center text-sm">
      <p class="text-white">
        Data provided by <a href="https://api.nasa.gov/" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-300 underline">NASA APOD API</a>
      </p>
      <p class="text-gray-500 text-sm mt-2">
        © {new Date().getFullYear()} NASA Astronomy Picture of the Day Viewer
      </p>
    </div>
  </footer>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #111827;
    color: white;
  }

  .loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }

  .loader::before,
  .loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #fff;
    animation: prixClipFix 2s linear infinite;
  }

  .loader::after {
    inset: 8px;
    transform: rotate3d(90, 90, 0, 180deg);
    border-color: #9333ea;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes prixClipFix {
    0% { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0); }
    50% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0); }
    75% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%); }
    100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%); }
  }
</style>