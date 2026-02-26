<script>
  import { schemas, getSchema, getDefaultValues, generateJsonLd } from '../schemas/index.js';
  import CopyButton from './CopyButton.svelte';

  let selectedId = $state('article');
  let schema = $derived(getSchema(selectedId));
  let values = $state(getDefaultValues(getSchema('article')));

  // Reset values when schema changes
  $effect(() => {
    if (schema) {
      values = getDefaultValues(schema);
    }
  });

  let jsonLd = $derived(() => {
    if (!schema) return '';
    const data = generateJsonLd(schema, values);
    return JSON.stringify(data, null, 2);
  });

  let scriptTag = $derived(() => {
    return `<script type="application/ld+json">\n${jsonLd()}\n<\/script>`;
  });

  // Check for required fields
  let missingRequired = $derived(() => {
    if (!schema) return [];
    return schema.fields
      .filter(f => f.required && f.type !== 'repeater')
      .filter(f => !values[f.key])
      .map(f => f.label);
  });

  function updateValue(key, val) {
    values = { ...values, [key]: val };
  }

  function addRepeaterItem(key, fields) {
    const defaults = {};
    for (const f of fields) defaults[f.key] = '';
    const current = values[key] || [];
    values = { ...values, [key]: [...current, defaults] };
  }

  function removeRepeaterItem(key, index) {
    const current = values[key] || [];
    if (current.length <= 1) return;
    values = { ...values, [key]: current.filter((_, i) => i !== index) };
  }

  function updateRepeaterItem(key, index, subKey, val) {
    const current = [...(values[key] || [])];
    current[index] = { ...current[index], [subKey]: val };
    values = { ...values, [key]: current };
  }

  function openRichResultsTest() {
    const encoded = encodeURIComponent(scriptTag());
    window.open(`https://search.google.com/test/rich-results?code=${encoded}`, '_blank');
  }
</script>

<div class="schema-layout">
  <div class="input-panel">
    <div class="field">
      <label for="schema-type" class="field-label">Schema Type</label>
      <div class="schema-select-grid">
        {#each schemas as s}
          <button
            class="schema-chip"
            class:active={selectedId === s.id}
            onclick={() => selectedId = s.id}
            aria-pressed={selectedId === s.id}
          >
            <span class="chip-icon">{s.icon}</span>
            <span class="chip-name">{s.name}</span>
          </button>
        {/each}
      </div>
    </div>

    {#if schema}
      <div class="form-fields">
        {#each schema.fields as field}
          {#if field.type === 'repeater'}
            <div class="repeater-section">
              <div class="repeater-header">
                <span class="field-label">{field.label}</span>
                <button class="add-btn" onclick={() => addRepeaterItem(field.key, field.fields)}>
                  + Add
                </button>
              </div>
              {#each (values[field.key] || []) as item, idx}
                <div class="repeater-item">
                  <div class="repeater-item-header">
                    <span class="repeater-item-num">#{idx + 1}</span>
                    {#if (values[field.key] || []).length > 1}
                      <button class="remove-btn" onclick={() => removeRepeaterItem(field.key, idx)} aria-label="Remove item {idx + 1}">
                        &times;
                      </button>
                    {/if}
                  </div>
                  {#each field.fields as subField}
                    <div class="sub-field">
                      <label class="sub-field-label" for="schema-{field.key}-{idx}-{subField.key}">{subField.label}</label>
                      {#if subField.type === 'textarea'}
                        <textarea
                          id="schema-{field.key}-{idx}-{subField.key}"
                          class="field-input field-textarea"
                          rows="2"
                          placeholder={subField.placeholder || ''}
                          value={item[subField.key] || ''}
                          oninput={(e) => updateRepeaterItem(field.key, idx, subField.key, e.target.value)}
                        ></textarea>
                      {:else}
                        <input
                          id="schema-{field.key}-{idx}-{subField.key}"
                          type="text"
                          class="field-input"
                          placeholder={subField.placeholder || ''}
                          value={item[subField.key] || ''}
                          oninput={(e) => updateRepeaterItem(field.key, idx, subField.key, e.target.value)}
                        />
                      {/if}
                    </div>
                  {/each}
                </div>
              {/each}
            </div>
          {:else if field.type === 'select'}
            <div class="field">
              <label for="schema-{field.key}" class="field-label">
                {field.label}
                {#if field.required}<span class="required">*</span>{/if}
              </label>
              <select
                id="schema-{field.key}"
                class="field-input field-select"
                value={values[field.key] || field.default || ''}
                onchange={(e) => updateValue(field.key, e.target.value)}
              >
                {#each field.options as opt}
                  <option value={opt}>{opt}</option>
                {/each}
              </select>
            </div>
          {:else if field.type === 'textarea'}
            <div class="field">
              <label for="schema-{field.key}" class="field-label">
                {field.label}
                {#if field.required}<span class="required">*</span>{/if}
              </label>
              <textarea
                id="schema-{field.key}"
                class="field-input field-textarea"
                rows="3"
                placeholder={field.placeholder || ''}
                value={values[field.key] || ''}
                oninput={(e) => updateValue(field.key, e.target.value)}
              ></textarea>
            </div>
          {:else if field.type === 'date'}
            <div class="field">
              <label for="schema-{field.key}" class="field-label">
                {field.label}
                {#if field.required}<span class="required">*</span>{/if}
              </label>
              <input
                id="schema-{field.key}"
                type="date"
                class="field-input"
                value={values[field.key] || ''}
                oninput={(e) => updateValue(field.key, e.target.value)}
              />
            </div>
          {:else}
            <div class="field">
              <label for="schema-{field.key}" class="field-label">
                {field.label}
                {#if field.required}<span class="required">*</span>{/if}
              </label>
              <input
                id="schema-{field.key}"
                type={field.type === 'url' ? 'url' : 'text'}
                class="field-input"
                placeholder={field.placeholder || ''}
                value={values[field.key] || ''}
                oninput={(e) => updateValue(field.key, e.target.value)}
              />
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>

  <div class="output-panel">
    <div class="output-card">
      <div class="output-header">
        <span class="output-label">JSON-LD Output</span>
        <div class="output-actions">
          <CopyButton text={scriptTag()} label="Copy" />
        </div>
      </div>
      <pre class="json-output"><code>{jsonLd()}</code></pre>
    </div>

    {#if missingRequired().length > 0}
      <div class="validation-box warn-box">
        <span class="validation-icon">!</span>
        <div>
          <span class="validation-title">Missing required fields</span>
          <span class="validation-list">{missingRequired().join(', ')}</span>
        </div>
      </div>
    {:else}
      <div class="validation-box ok-box">
        <span class="validation-icon">&#10003;</span>
        <span class="validation-title">All required fields filled</span>
      </div>
    {/if}

    <div class="output-tip">
      Paste the copied code inside your page's <code>&lt;head&gt;</code> tag. Use
      <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">Google's Rich Results Test</a>
      to validate.
    </div>
  </div>
</div>

<style>
  .schema-layout {
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

  .schema-select-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .schema-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.6rem;
    font-size: 0.72rem;
    font-weight: 500;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    cursor: pointer;
    color: var(--text-muted);
    transition: all var(--transition-fast);
  }

  .schema-chip:hover {
    border-color: var(--accent);
    color: var(--text);
  }

  .schema-chip.active {
    background: var(--accent-soft);
    border-color: var(--accent);
    color: var(--accent);
  }

  .chip-icon {
    font-size: 0.8rem;
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .field-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
  }

  .required {
    color: var(--danger);
  }

  .field-input {
    padding: 0.45rem 0.65rem;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-size: 0.82rem;
    outline: none;
    transition: border-color var(--transition-fast);
  }

  .field-input:focus {
    border-color: var(--accent);
  }

  .field-textarea {
    resize: vertical;
    min-height: 50px;
    font-family: inherit;
    line-height: 1.5;
  }

  .field-select {
    cursor: pointer;
  }

  .repeater-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .repeater-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .add-btn {
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    background: var(--accent-soft);
    border: 1px solid var(--accent);
    border-radius: var(--radius-sm);
    color: var(--accent);
    cursor: pointer;
    transition: all var(--transition-fast);
  }

  .add-btn:hover {
    background: var(--accent);
    color: white;
  }

  .repeater-item {
    border: 1px solid var(--border-light);
    border-radius: var(--radius);
    padding: 0.6rem;
    background: var(--bg-elevated);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .repeater-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .repeater-item-num {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--text-faint);
  }

  .remove-btn {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: var(--text-faint);
    cursor: pointer;
    padding: 0 0.3rem;
    line-height: 1;
    transition: color var(--transition-fast);
  }

  .remove-btn:hover {
    color: var(--danger);
  }

  .sub-field {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .sub-field-label {
    font-size: 0.65rem;
    font-weight: 500;
    color: var(--text-faint);
  }

  .output-panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: sticky;
    top: 7rem;
  }

  .output-card {
    background: var(--bg-elevated);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border-light);
  }

  .output-label {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-faint);
  }

  .output-actions {
    display: flex;
    gap: 0.3rem;
  }

  .json-output {
    padding: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.6;
    color: var(--text-muted);
    overflow-x: auto;
    max-height: 500px;
    overflow-y: auto;
    white-space: pre;
  }

  .validation-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius);
    font-size: 0.75rem;
  }

  .warn-box {
    background: var(--warning-soft);
    color: var(--warning);
  }

  .ok-box {
    background: var(--success-soft);
    color: var(--success);
  }

  .validation-icon {
    font-weight: 700;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .validation-title {
    font-weight: 600;
    display: block;
  }

  .validation-list {
    font-size: 0.7rem;
    opacity: 0.8;
  }

  .output-tip {
    font-size: 0.7rem;
    color: var(--text-faint);
    line-height: 1.5;
  }

  .output-tip code {
    font-family: var(--font-mono);
    background: var(--bg-elevated);
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    font-size: 0.65rem;
  }

  @media (max-width: 768px) {
    .schema-layout {
      grid-template-columns: 1fr;
    }

    .output-panel {
      position: static;
    }
  }
</style>
