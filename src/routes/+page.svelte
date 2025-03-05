
  <script>
    import Navbar from "./components/Navbar.svelte"
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
              <span>Picture of the day</span>
            </a>
          </div>
  
          <!-- Konten Kanan -->
          <div class="space-y-4">
            <div class="group cursor-pointer">
              <div class="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-white text-xl mb-1">25k Project</h3>
                    <p class="text-white/70 text-sm">People around the world</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
  
            <div class="group cursor-pointer">
              <div class="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all">
                <div class="flex items-center justify-between">
                    <img src="/iss.png" class="w-1/2 rounded-xl" alt="" srcset="">
                  <div>
                    <h3 class="text-white text-xl mb-1">See ISS Location</h3>
                    <p class="text-white/70 text-sm">Explore a handpicked selection</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Any additional custom styles can go here */
  </style>