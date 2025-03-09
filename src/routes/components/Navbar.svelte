<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  
  let menuItems = [
    { text: 'Home', href: '/' },
    { text: 'ISS Location', href: '/iss-location' },
    { text: 'Mars Weather', href: '/mars-weather' },
    { text: 'Launch Schedule', href: '/launch-schedule' },
    { text: 'News', href: '/news' }
  ];

  let currentPath = '';
  let isScrolled = false; 
  let mobileMenuOpen = false;
  
  onMount(() => {
    currentPath = window.location.pathname;
    const handleScroll = () => {
      isScrolled = window.scrollY >= 20;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<nav class="{isScrolled ? 'bg-black/20 backdrop-blur-xs border-b' : 'bg-transparent'} text-white mx-auto sticky top-0 px-6 py-6 flex items-center z-[999] justify-between">
  <div class="text-2xl font-semibold">SPACE INFO</div>
  
  <!-- Menu untuk desktop -->
  <div class="hidden md:flex items-center gap-8">
    {#each menuItems as item}
      <a 
        href={item.href} 
        class="transition-colors px-3 py-2 rounded-md {currentPath === item.href ? 'bg-white/20' : 'hover:text-white'}"
      >
        {item.text}
      </a>
    {/each}
  </div>

  <!-- Tombol Menu Mobile -->
  <button 
    class="md:hidden text-white focus:outline-none" 
    aria-label="Toggle menu"
    on:click={toggleMobileMenu}
  >
    {#if !mobileMenuOpen}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    {/if}
  </button>
</nav>

<!-- Menu Mobile yang muncul ketika tombol ditekan -->
{#if mobileMenuOpen}
  <div 
    class="md:hidden fixed top-[72px] inset-x-0 bg-black/80 backdrop-blur-md z-[998] border-b border-gray-800"
    transition:slide={{ duration: 300 }}
  >
    <div class="flex flex-col py-4">
      {#each menuItems as item}
        <a 
          href={item.href} 
          class="text-white px-6 py-3 transition-colors {currentPath === item.href ? 'bg-white/10' : 'hover:bg-white/5'}"
          on:click={closeMobileMenu}
        >
          {item.text}
        </a>
      {/each}
    </div>
  </div>
{/if}