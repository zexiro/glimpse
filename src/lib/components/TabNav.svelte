<script>
  let { activeTab = $bindable('serp') } = $props();

  const tabs = [
    { id: 'serp', label: 'SERP Preview', icon: '🔍' },
    { id: 'social', label: 'Social Cards', icon: '🔗' },
    { id: 'schema', label: 'Schema', icon: '{ }' },
    { id: 'about', label: 'About', icon: 'ℹ️' },
  ];

  function handleKeydown(e) {
    const currentIdx = tabs.findIndex(t => t.id === activeTab);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      activeTab = tabs[(currentIdx + 1) % tabs.length].id;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      activeTab = tabs[(currentIdx - 1 + tabs.length) % tabs.length].id;
    }
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<nav class="tabs" role="tablist" aria-label="Tool sections" onkeydown={handleKeydown}>
  {#each tabs as tab}
    <button
      class="tab"
      class:active={activeTab === tab.id}
      role="tab"
      aria-selected={activeTab === tab.id}
      tabindex={activeTab === tab.id ? 0 : -1}
      onclick={() => activeTab = tab.id}
    >
      <span class="tab-icon">{tab.icon}</span>
      <span class="tab-label">{tab.label}</span>
    </button>
  {/each}
</nav>

<style>
  .tabs {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    gap: 0;
    border-bottom: none;
  }

  .tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0.6rem 1rem;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: color var(--transition-fast), border-color var(--transition-fast);
    white-space: nowrap;
  }

  .tab:hover {
    color: var(--text);
  }

  .tab.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .tab-icon {
    font-size: 0.85rem;
  }

  @media (max-width: 640px) {
    .tabs {
      padding: 0 1rem;
    }

    .tab {
      padding: 0.5rem 0.6rem;
      font-size: 0.75rem;
    }

    .tab-label {
      display: none;
    }

    .tab-icon {
      font-size: 1.1rem;
    }

    .tab::after {
      content: attr(aria-label);
    }
  }
</style>
