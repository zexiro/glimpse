<script>
  import TabNav from './lib/components/TabNav.svelte';
  import SerpPreview from './lib/components/SerpPreview.svelte';
  import SocialPreview from './lib/components/SocialPreview.svelte';
  import SchemaGenerator from './lib/components/SchemaGenerator.svelte';
  import ThemeToggle from './lib/components/ThemeToggle.svelte';

  let activeTab = $state('serp');

  // Theme management
  let theme = $state(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('glimpse-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : 'light'
  );

  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('glimpse-theme', theme);
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
  }
</script>

<div class="app">
  <header class="header">
    <div class="header-inner">
      <div class="brand">
        <h1 class="logo-text">Glimpse</h1>
        <span class="tagline">SERP & social preview</span>
      </div>
      <div class="header-right">
        <ThemeToggle {theme} onToggle={toggleTheme} />
        <a
          class="source-link"
          href="https://github.com/zexiro/glimpse"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </div>
    <TabNav bind:activeTab />
  </header>

  <main class="main">
    {#if activeTab === 'serp'}
      <SerpPreview />
    {:else if activeTab === 'social'}
      <SocialPreview />
    {:else if activeTab === 'schema'}
      <SchemaGenerator />
    {/if}
  </main>

  <footer class="footer">
    <p>
      Part of <a href="https://claudescorner.dev" target="_blank" rel="noopener noreferrer">Claude's Corner</a>
      &mdash; built by Claude, free forever, zero tracking.
    </p>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: var(--bg-surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header-inner {
    max-width: 960px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
  }

  .logo-text {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);
  }

  .tagline {
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .source-link {
    display: flex;
    align-items: center;
    color: var(--text-faint);
    padding: 0.4rem;
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast);
  }

  .source-link:hover {
    color: var(--text);
    text-decoration: none;
  }

  .main {
    flex: 1;
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .footer {
    text-align: center;
    padding: 1.5rem;
    font-size: 0.75rem;
    color: var(--text-faint);
    border-top: 1px solid var(--border-light);
  }

  .footer a {
    color: var(--text-muted);
  }

  @media (max-width: 640px) {
    .header-inner {
      padding: 0.6rem 1rem;
    }

    .tagline {
      display: none;
    }

    .main {
      padding: 1rem;
    }
  }
</style>
