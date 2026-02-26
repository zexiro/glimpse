<script>
  import CopyButton from './CopyButton.svelte';

  let ogTitle = $state('How to Optimize Your Title Tags for SEO');
  let ogDescription = $state('Learn the best practices for writing title tags that rank well in Google search results.');
  let ogImage = $state('');
  let siteName = $state('Example Blog');
  let ogUrl = $state('https://example.com/seo/title-tags');

  let metaTags = $derived(`<meta property="og:title" content="${ogTitle.replace(/"/g, '&quot;')}" />
<meta property="og:description" content="${ogDescription.replace(/"/g, '&quot;')}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${ogUrl}" />${ogImage ? `\n<meta property="og:image" content="${ogImage}" />` : ''}${siteName ? `\n<meta property="og:site_name" content="${siteName.replace(/"/g, '&quot;')}" />` : ''}
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${ogTitle.replace(/"/g, '&quot;')}" />
<meta name="twitter:description" content="${ogDescription.replace(/"/g, '&quot;')}" />${ogImage ? `\n<meta name="twitter:image" content="${ogImage}" />` : ''}`);

  function truncate(str, max) {
    if (!str || str.length <= max) return str;
    return str.slice(0, max - 1) + '\u2026';
  }

  let displayDomain = $derived(() => {
    if (!ogUrl) return 'example.com';
    try {
      return new URL(ogUrl).hostname;
    } catch {
      return ogUrl;
    }
  });
</script>

<div class="social-layout">
  <div class="input-panel">
    <div class="field">
      <label for="og-title" class="field-label">OG Title</label>
      <input id="og-title" type="text" bind:value={ogTitle} placeholder="Page title for social sharing" class="field-input" />
      <div class="char-count">
        <span class:warn={ogTitle.length > 55 && ogTitle.length <= 65} class:over={ogTitle.length > 65}>{ogTitle.length} chars</span>
        <span class="char-hint">Recommended: under 60</span>
      </div>
    </div>

    <div class="field">
      <label for="og-desc" class="field-label">OG Description</label>
      <textarea id="og-desc" bind:value={ogDescription} placeholder="Description for social sharing" class="field-input field-textarea" rows="3"></textarea>
      <div class="char-count">
        <span class:warn={ogDescription.length > 140 && ogDescription.length <= 160} class:over={ogDescription.length > 160}>{ogDescription.length} chars</span>
        <span class="char-hint">Recommended: under 155</span>
      </div>
    </div>

    <div class="field">
      <label for="og-image" class="field-label">
        OG Image URL
        <span class="field-hint">(1200x630 recommended)</span>
      </label>
      <input id="og-image" type="text" bind:value={ogImage} placeholder="https://example.com/og-image.jpg" class="field-input" />
    </div>

    <div class="field-row">
      <div class="field">
        <label for="og-site" class="field-label">Site Name</label>
        <input id="og-site" type="text" bind:value={siteName} placeholder="My Website" class="field-input" />
      </div>
      <div class="field">
        <label for="og-url" class="field-label">Page URL</label>
        <input id="og-url" type="text" bind:value={ogUrl} placeholder="https://example.com/page" class="field-input" />
      </div>
    </div>
  </div>

  <div class="preview-panel">
    <!-- Facebook / LinkedIn Card -->
    <div class="card-section">
      <span class="card-label">Facebook / LinkedIn</span>
      <div class="fb-card">
        <div class="fb-image" class:has-image={ogImage}>
          {#if ogImage}
            <img src={ogImage} alt="OG preview" onerror={(e) => e.target.style.display='none'} />
          {:else}
            <div class="image-placeholder">
              <span>1200 x 630</span>
            </div>
          {/if}
        </div>
        <div class="fb-info">
          <span class="fb-domain">{displayDomain()}</span>
          <span class="fb-title">{truncate(ogTitle, 65) || 'Page Title'}</span>
          <span class="fb-desc">{truncate(ogDescription, 155) || 'Page description will appear here...'}</span>
        </div>
      </div>
    </div>

    <!-- Twitter / X Card -->
    <div class="card-section">
      <span class="card-label">Twitter / X</span>
      <div class="tw-card">
        <div class="tw-image" class:has-image={ogImage}>
          {#if ogImage}
            <img src={ogImage} alt="Twitter card preview" onerror={(e) => e.target.style.display='none'} />
          {:else}
            <div class="image-placeholder">
              <span>1200 x 628</span>
            </div>
          {/if}
        </div>
        <div class="tw-info">
          <span class="tw-title">{truncate(ogTitle, 70) || 'Page Title'}</span>
          <span class="tw-desc">{truncate(ogDescription, 125) || 'Description...'}</span>
          <span class="tw-domain">{displayDomain()}</span>
        </div>
      </div>
    </div>

    <!-- Slack / Discord Card -->
    <div class="card-section">
      <span class="card-label">Slack / Discord</span>
      <div class="slack-card">
        <div class="slack-bar"></div>
        <div class="slack-content">
          <span class="slack-site">{siteName || displayDomain()}</span>
          <span class="slack-title">{truncate(ogTitle, 70) || 'Page Title'}</span>
          <span class="slack-desc">{truncate(ogDescription, 150) || 'Description...'}</span>
          {#if ogImage}
            <div class="slack-thumb">
              <img src={ogImage} alt="Slack preview" onerror={(e) => e.target.parentElement.style.display='none'} />
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="meta-output">
      <div class="meta-output-header">
        <span class="meta-output-label">Meta Tags</span>
        <CopyButton text={metaTags} />
      </div>
      <pre class="meta-code"><code>{metaTags}</code></pre>
    </div>
  </div>
</div>

<style>
  .social-layout {
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

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
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
    display: flex;
    justify-content: space-between;
    font-size: 0.65rem;
    color: var(--text-faint);
    font-variant-numeric: tabular-nums;
  }

  .char-count .warn { color: var(--warning); }
  .char-count .over { color: var(--danger); font-weight: 600; }
  .char-hint { color: var(--text-faint); }

  .preview-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .card-section {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .card-label {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-faint);
  }

  /* Facebook Card */
  .fb-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-surface);
  }

  .fb-image {
    width: 100%;
    aspect-ratio: 1.91 / 1;
    background: var(--bg-elevated);
    overflow: hidden;
  }

  .fb-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-faint);
    font-size: 0.8rem;
    font-weight: 500;
  }

  .fb-info {
    padding: 0.6rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .fb-domain {
    font-size: 0.7rem;
    color: var(--text-faint);
    text-transform: uppercase;
  }

  .fb-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
  }

  .fb-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  /* Twitter Card */
  .tw-card {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-surface);
  }

  .tw-image {
    width: 100%;
    aspect-ratio: 2 / 1;
    background: var(--bg-elevated);
    overflow: hidden;
  }

  .tw-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tw-info {
    padding: 0.6rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .tw-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
  }

  .tw-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .tw-domain {
    font-size: 0.7rem;
    color: var(--text-faint);
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  /* Slack Card */
  .slack-card {
    display: flex;
    gap: 0;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .slack-bar {
    width: 4px;
    background: var(--accent);
    flex-shrink: 0;
  }

  .slack-content {
    padding: 0.5rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .slack-site {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--text-muted);
  }

  .slack-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--accent);
    line-height: 1.3;
  }

  .slack-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .slack-thumb {
    margin-top: 0.3rem;
    width: 80px;
    height: 80px;
    border-radius: var(--radius-sm);
    overflow: hidden;
    flex-shrink: 0;
  }

  .slack-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .meta-output {
    margin-top: 0.25rem;
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
    font-size: 0.68rem;
    line-height: 1.6;
    color: var(--text-muted);
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }

  @media (max-width: 768px) {
    .social-layout {
      grid-template-columns: 1fr;
    }

    .field-row {
      grid-template-columns: 1fr;
    }
  }
</style>
