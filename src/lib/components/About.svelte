<script>
  let { onBack } = $props();
</script>

<article class="about">
  <h1 class="title">About Glimpse</h1>
  <p class="lede">A SERP &amp; social preview toolkit for SEO consultants</p>

  <section class="section">
    <h2>What is Glimpse?</h2>
    <p>
      Glimpse is a browser-based toolkit to preview and optimise how pages appear across
      Google search results, social media cards, and structured data &mdash; all in one clean
      interface, no signup or tracking required.
    </p>
  </section>

  <section class="section">
    <h2>Tools</h2>
    <dl class="tools-list">
      <div class="tool">
        <dt><strong>SERP Preview</strong></dt>
        <dd>
          Real-time Google result preview with pixel-width calculation, keyword highlighting,
          and character limits.
        </dd>
      </div>
      <div class="tool">
        <dt><strong>Social Cards</strong></dt>
        <dd>
          Preview Facebook, Twitter/X, Slack, and Discord cards with per-platform guidance.
        </dd>
      </div>
      <div class="tool">
        <dt><strong>Schema Generator</strong></dt>
        <dd>
          Visual form for 10+ schema types with live JSON-LD output.
        </dd>
      </div>
    </dl>
  </section>

  <section class="section">
    <h2>Built at Claude's Corner</h2>
    <p>
      Glimpse is part of
      <a href="https://claudescorner.dev" target="_blank" rel="noopener noreferrer">Claude's Corner</a>,
      built by
      <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a>.
      The source code is available on
      <a href="https://github.com/zexiro/glimpse" target="_blank" rel="noopener noreferrer">GitHub</a>.
    </p>
  </section>

  <div class="cta">
    <button class="back-btn" onclick={onBack}>
      &larr; Back to SERP Preview
    </button>
  </div>
</article>

<style>
  .about {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .title {
    font-family: var(--font-sans);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
  }

  .lede {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .section {
    margin-bottom: 2rem;
  }

  .section h2 {
    font-family: var(--font-sans);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 0.6rem;
  }

  .section p {
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 0.95rem;
  }

  .tools-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .tool {
    background: var(--bg-surface);
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    padding: 1rem 1.25rem;
    transition: border-color var(--transition-fast);
  }

  .tool:hover {
    border-color: var(--border);
  }

  .tool dt {
    font-size: 0.95rem;
    color: var(--text);
    margin-bottom: 0.25rem;
  }

  .tool dd {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin: 0;
  }

  .section a {
    color: var(--accent);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .section a:hover {
    text-decoration: underline;
  }

  .cta {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-light);
  }

  .back-btn {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.6rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: var(--radius);
    cursor: pointer;
    transition: background var(--transition-fast);
  }

  .back-btn:hover {
    background: var(--accent-hover);
  }

  @media (max-width: 640px) {
    .about {
      padding: 1rem 0;
    }

    .title {
      font-size: 1.4rem;
    }

    .lede {
      font-size: 1rem;
    }
  }
</style>
