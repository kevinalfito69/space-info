<script>
  import { onMount } from 'svelte';
  import Navbar from '../components/Navbar.svelte';
  import { fetchNews, loading, error, articles } from '$lib/api';
  
  // Tambahkan variabel lokal untuk debugging
  let loadingValue = false;
  let errorValue = null;
  let articlesValue = [];
  
  // Subscribe ke store untuk debugging
  loading.subscribe(value => {
    loadingValue = value;
    console.log("Loading state changed:", value);
  });
  
  error.subscribe(value => {
    errorValue = value;
    console.log("Error state changed:", value);
  });
  
  articles.subscribe(value => {
    articlesValue = value;
    console.log("Articles updated:", value);
  });
  
  onMount(() => {
    console.log("Component mounted, fetching news...");
    fetchNews();
  });
</script>

<main class=" mx-auto">
  <Navbar/>
  <section class="container">
  <h1 class="text-3xl font-bold mb-6 text-center">Latest Space News</h1>
  
  
  {#if $loading}
    <p class="text-center text-gray-500">Loading...</p>
  {:else if $error}
    <p class="text-center text-red-500">Error: {$error}</p>
  {:else if $articles && $articles.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {#each $articles as article}
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={article.image_url || 'https://via.placeholder.com/300x200'} alt={article.title} class="w-full h-48 object-cover" />
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{article.title}</h2>
            <p class="text-gray-600 text-sm mb-2">Published: {new Date(article.published_at).toLocaleDateString()}</p>
            <p class="text-gray-700 mb-4">{article.summary ? article.summary.slice(0, 100) + '...' : 'No summary available'}</p>
            <a href={article.url} target="_blank" class="text-blue-500 hover:underline">Read more</a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-500">No articles found.</p>
  {/if}
</section>
</main>