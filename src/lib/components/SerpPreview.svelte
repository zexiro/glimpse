<script>
  import { measurePixelWidth, truncateToPixelWidth, LIMITS } from '../utils/pixel-width.js';
  import PixelBar from './PixelBar.svelte';
  import CopyButton from './CopyButton.svelte';

  let title = $state('How to Optimize Your Title Tags for SEO in 2026');
  let description = $state('Learn the best practices for writing title tags that rank well in Google search results. Includes character limits, pixel width guidelines, and real examples from top-performing pages.');
  let url = $state('https://example.com/seo/title-tag-optimization');
  let keyword = $state('title tags');
  let device = $state('desktop');

  let limits = $derived(LIMITS[device]);

  let titlePx = $derived(title ? measurePixelWidth(title, limits.title.fontSize, limits.title.font) : 0);
  let descPx = $derived(description ? measurePixelWidth(description, limits.description.fontSize, limits.description.font) : 0);

  let displayTitle = $derived(
    title
      ? truncateToPixelWidth(title, limits.title.px, limits.title.fontSize, limits.title.font)
      : { text: '', truncated: false }
  );

  let displayDesc = $derived(
    description
      ? truncateToPixelWidth(description, limits.description.px, limits.description.fontSize, limits.description.font)
      : { text: '', truncated: false }
  );

  let displayUrl = $derived(() => {
    if (!url) return '';
    try {
      const u = new URL(url);
      return u.hostname + u.pathname.replace(/\/$/, '');
    } catch {
      return url;
    }
  });

  function highlightKeyword(text, kw) {
    if (!kw || !text) return text;
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }

  let titleHtml = $derived(highlightKeyword(displayTitle.text, keyword));
  let descHtml = $derived(highlightKeyword(displayDesc.text, keyword));
</script>

<div class="serp-layout">
  <div class="input-panel">
    <div class="field">
      <label for="serp-title" class="field-label">Page Title</label>
      <input
        id="serp-title"
        type="text"
        bind:value={title}
        placeholder="Your page title"
        class="field-input"
      />
      <PixelBar current={titlePx} max={limits.title.px} label="Title width" />
      <div class="char-count">
        <span class:over={title.length > 60} class:warn={title.length > 50 && title.length <= 60}>
          {title.length} chars
        </span>
      </div>
    </div>

    <div class="field">
      <label for="serp-desc" class="field-label">Meta Description</label>
      <textarea
        id="serp-desc"
        bind:value={description}
        placeholder="Your meta description"
        class="field-input field-textarea"
        rows="3"
      ></textarea>
      <PixelBar current={descPx} max={limits.description.px} label="Description width" />
      <div class="char-count">
        <span class:over={description.length > 160} class:warn={description.length > 140 && description.length <= 160}>
          {description.length} chars
        </span>
      </div>
    </div>

    <div class="field">
      <label for="serp-url" class="field-label">URL</label>
      <input
        id="serp-url"
        type="text"
        bind:value={url}
        placeholder="https://example.com/page"
        class="field-input"
      />
    </div>

    <div class="field">
      <label for="serp-keyword" class="field-label">
        Target Keyword
        <span class="field-hint">(bolded in preview)</span>
      </label>
      <input
        id="serp-keyword"
        type="text"
        bind:value={keyword}
        placeholder="keyword phrase"
        class="field-input"
      />
    </div>
  </div>

  <div class="preview-panel">
    <div class="preview-header">
      <span class="preview-title-text">Google Preview</span>
      <div class="device-toggle" role="radiogroup" aria-label="Device preview">
        <button
          class="device-btn"
          class:active={device === 'desktop'}
          role="radio"
          aria-checked={device === 'desktop'}
          aria-label="Desktop preview"
          onclick={() => device = 'desktop'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </button>
        <button
          class="device-btn"
          class:active={device === 'mobile'}
          role="radio"
          aria-checked={device === 'mobile'}
          aria-label="Mobile preview"
          onclick={() => device = 'mobile'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="serp-card" class:mobile={device === 'mobile'}>
      <div class="serp-url-row">
        <div class="serp-favicon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-faint)">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
        <div class="serp-url-info">
          <span class="serp-site-name">{displayUrl() ? displayUrl().split('/')[0] : 'example.com'}</span>
          <span class="serp-breadcrumb">{displayUrl() || 'example.com'}</span>
        </div>
      </div>
      <h3 class="serp-title-text">{@html titleHtml || '<span class="empty">Page Title</span>'}</h3>
      <p class="serp-desc-text">{@html descHtml || '<span class="empty">Meta description will appear here...</span>'}</p>
    </div>

    {#if displayTitle.truncated}
      <p class="truncation-warning">Title will be truncated in {device} results</p>
    {/if}
    {#if displayDesc.truncated}
      <p class="truncation-warning">Description will be truncated in {device} results</p>
    {/if}

    <div class="meta-output">
      <div class="meta-output-header">
        <span class="meta-output-label">HTML Meta Tags</span>
        <CopyButton text={`<title>${title}</title>\n<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`} />
      </div>
      <pre class="meta-code"><code>&lt;title&gt;{title}&lt;/title&gt;
&lt;meta name="description" content="{description}" /&gt;</code></pre>
    </div>
  </div>
</div>

<style>
  .serp-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  .input-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .field-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }

  .field-hint {
    font-weight: 400;
    text-transform: none;
    letter-spacing: normal;
    color: var(--text-faint);
  }

  .field-input {
    padding: 0.5rem 0.75rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-size: 0.85rem;
    outline: none;
    transition: border-color var(--transition-fast);
  }

  .field-input:focus {
    border-color: var(--accent);
  }

  .field-textarea {
    resize: vertical;
    min-height: 60px;
    font-family: inherit;
    line-height: 1.5;
  }

  .char-count {
    font-size: 0.65rem;
    text-align: right;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
  }

  .char-count .warn {
    color: var(--warning);
  }

  .char-count .over {
    color: var(--danger);
    font-weight: 600;
  }

  .preview-panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .preview-title-text {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-faint);
  }

  .device-toggle {
    display: flex;
    gap: 0.2rem;
    background: var(--bg-elevated);
    border-radius: var(--radius-sm);
    padding: 0.15rem;
  }

  .device-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.3rem 0.5rem;
    border-radius: 3px;
    color: var(--text-faint);
    display: flex;
    align-items: center;
    transition: all var(--transition-fast);
  }

  .device-btn.active {
    background: var(--bg-surface);
    color: var(--accent);
    box-shadow: 0 1px 2px var(--shadow);
  }

  .serp-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 1rem 1.25rem;
    max-width: 100%;
  }

  .serp-card.mobile {
    max-width: 360px;
  }

  .serp-url-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.4rem;
  }

  .serp-favicon {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--bg-elevated);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .serp-url-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .serp-site-name {
    font-size: 14px;
    font-family: Arial, sans-serif;
    color: var(--text);
    line-height: 1.2;
  }

  .serp-breadcrumb {
    font-size: 12px;
    font-family: Arial, sans-serif;
    color: var(--text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .serp-title-text {
    font-size: 20px;
    font-family: Arial, sans-serif;
    font-weight: normal;
    color: #1a0dab;
    line-height: 1.3;
    margin-bottom: 0.2rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  :global([data-theme="dark"]) .serp-title-text {
    color: #8AB4F8;
  }

  .serp-title-text :global(strong) {
    font-weight: 700;
  }

  .serp-desc-text {
    font-size: 14px;
    font-family: Arial, sans-serif;
    color: var(--text-muted);
    line-height: 1.5;
  }

  .serp-desc-text :global(strong) {
    font-weight: 700;
    color: var(--text);
  }

  .serp-desc-text :global(.empty),
  .serp-title-text :global(.empty) {
    color: var(--text-faint);
    font-style: italic;
  }

  .truncation-warning {
    font-size: 0.7rem;
    color: var(--warning);
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .truncation-warning::before {
    content: '!';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--warning-soft);
    font-size: 0.6rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .meta-output {
    margin-top: 0.5rem;
    background: var(--bg-elevated);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .meta-output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border-light);
  }

  .meta-output-label {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-faint);
  }

  .meta-code {
    padding: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.6;
    color: var(--text-muted);
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: 768px) {
    .serp-layout {
      grid-template-columns: 1fr;
    }

    .serp-card.mobile {
      max-width: 100%;
    }
  }
</style>
