<script>
  let { current = 0, max = 100, label = '', unit = 'px' } = $props();

  let percent = $derived(Math.min((current / max) * 100, 100));
  let status = $derived(
    percent > 100 ? 'over' :
    percent > 85 ? 'warn' :
    'ok'
  );
</script>

<div class="pixel-bar">
  <div class="bar-header">
    <span class="bar-label">{label}</span>
    <span class="bar-value" class:over={status === 'over'} class:warn={status === 'warn'}>
      {Math.round(current)}{unit} / {max}{unit}
    </span>
  </div>
  <div class="bar-track">
    <div
      class="bar-fill"
      class:ok={status === 'ok'}
      class:warn={status === 'warn'}
      class:over={status === 'over'}
      style="width: {Math.min(percent, 100)}%"
    ></div>
  </div>
</div>

<style>
  .pixel-bar {
    margin-bottom: 0.5rem;
  }

  .bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
  }

  .bar-label {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-faint);
  }

  .bar-value {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .bar-value.warn {
    color: var(--warning);
  }

  .bar-value.over {
    color: var(--danger);
  }

  .bar-track {
    height: 4px;
    background: var(--bg-elevated);
    border-radius: 2px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    border-radius: 2px;
    transition: width var(--transition), background-color var(--transition);
  }

  .bar-fill.ok {
    background: var(--success);
  }

  .bar-fill.warn {
    background: var(--warning);
  }

  .bar-fill.over {
    background: var(--danger);
  }
</style>
