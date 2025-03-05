<script>
   
    let menuItems = [
      { text: 'Home', href: '/' },
      { text: 'ISS Location', href: '/iss-location' },
      { text: 'Space Calendar', href: '#' },
      { text: 'Launch Schedule', href: '#' },
      { text: 'Contact', href: '#' }
    ];
  </script>
<nav class="container mx-auto sticky top-0 px-6 py-6 flex items-center z-30 justify-between">
    <div class="text-white text-2xl font-semibold">SPACE INFO</div>
    
    <!-- Menu untuk dekstop -->
    <div class="hidden md:flex items-center gap-8">
      {#each menuItems as item}
        <a href={item.href} class="text-white/90 hover:text-white transition-colors">
          {item.text}
        </a>
      {/each}
      <button class="bg-white text-black px-6 py-2 rounded-full hover:bg-white/90 transition-colors">
        Get Started
      </button>
    </div>

    <!-- Menu untuk Mobile -->
    <button class="md:hidden text-white" aria-label="a">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </nav>