# Glimpse — PLAN

**Preview how the world sees your pages.**

Glimpse is a browser-based toolkit for SEO consultants to preview and optimize how their pages appear across Google search results, social media cards, and structured data. Three tools in one clean interface.

## Overview

**Who it's for:** SEO consultants, content marketers, web developers — anyone who optimizes pages for search and social visibility.

**Why it's worth building:** SEO consultants use 3–5 separate tools daily to preview SERP snippets, check OG tags, and generate schema markup. Most are cluttered with ads, require signups, or have poor UX. Glimpse combines the three most common preview tasks into one fast, beautiful, ad-free tool.

**What makes it different from existing Claude's Corner projects:** This is the first utility/productivity tool in the collection. No generative art, no audio, no games — just a clean professional tool that solves a real daily problem.

## Features & Interactions

### Tab 1: SERP Preview
- Input fields: Page Title, Meta Description, URL
- Real-time Google SERP snippet preview for both Desktop and Mobile
- **Pixel-width calculation** for title using canvas measureText with Arial font metrics
  - Desktop: truncation at ~482px (18px Arial rendering, 16px internal calculation)
  - Mobile: truncation at ~550px
- **Character count** with color-coded progress bars (green → yellow → red)
  - Title: green <50 chars, yellow 50-60, red >60
  - Description: green <140 chars, yellow 140-155, red >155
- Truncation preview with ellipsis when title/description exceeds limits
- Keyword highlighting — optional field to enter a target keyword, which gets bolded in the preview (as Google does)
- Favicon placeholder in the URL breadcrumb (Google's current format)
- Toggle between Desktop and Mobile preview

### Tab 2: Social Preview
- Input fields: OG Title, OG Description, OG Image URL (or drag-drop upload for preview), Site Name
- Live preview cards for:
  - **Facebook/LinkedIn** — large image card (1200×630 aspect ratio)
  - **Twitter/X** — summary large image card
  - **Slack/Discord** — embed card
- Character limits shown for each platform
- Image aspect ratio warnings if the provided image doesn't match recommended 1.91:1
- Meta tag code generation — copy-paste ready `<meta>` tags

### Tab 3: Schema Generator
- Dropdown to select schema type:
  - Article / BlogPosting
  - Product (with price, availability, reviews)
  - LocalBusiness (with hours, address, geo)
  - FAQ Page (add/remove Q&A pairs)
  - HowTo (add/remove steps)
  - BreadcrumbList (add/remove items)
  - Event (date, location, performer)
  - Organization
  - Person
  - Recipe
- Visual form for each schema type with all required + recommended fields
- Live JSON-LD output panel (syntax highlighted, copy button)
- Validation indicators — required fields marked, warnings for missing recommended fields
- "Test in Google" button — link to Google's Rich Results Test with the markup

## Information Architecture

```
src/
├── App.svelte                    # Root: tab routing, shared state
├── app.css                       # Global styles, CSS custom properties
├── main.js                       # Entry point
├── lib/
│   ├── components/
│   │   ├── TabNav.svelte         # Tab navigation (SERP / Social / Schema)
│   │   ├── SerpPreview.svelte    # SERP tab container
│   │   ├── SerpInput.svelte      # Title/desc/URL input fields
│   │   ├── SerpResult.svelte     # Google SERP snippet rendering
│   │   ├── PixelBar.svelte       # Pixel-width progress bar
│   │   ├── SocialPreview.svelte  # Social tab container
│   │   ├── SocialInput.svelte    # OG meta input fields
│   │   ├── FacebookCard.svelte   # Facebook/LinkedIn preview card
│   │   ├── TwitterCard.svelte    # Twitter/X preview card
│   │   ├── SlackCard.svelte      # Slack/Discord preview card
│   │   ├── MetaTagOutput.svelte  # Generated meta tag code
│   │   ├── SchemaGenerator.svelte # Schema tab container
│   │   ├── SchemaForm.svelte     # Dynamic form based on selected type
│   │   ├── JsonOutput.svelte     # JSON-LD output with syntax highlighting
│   │   └── CopyButton.svelte     # Reusable copy-to-clipboard button
│   ├── schemas/
│   │   ├── index.js              # Schema type registry
│   │   ├── article.js            # Article/BlogPosting fields + template
│   │   ├── product.js            # Product fields + template
│   │   ├── localBusiness.js      # LocalBusiness fields + template
│   │   ├── faq.js                # FAQ fields + template
│   │   ├── howto.js              # HowTo fields + template
│   │   ├── breadcrumb.js         # BreadcrumbList fields + template
│   │   ├── event.js              # Event fields + template
│   │   ├── organization.js       # Organization fields + template
│   │   ├── person.js             # Person fields + template
│   │   └── recipe.js             # Recipe fields + template
│   └── utils/
│       ├── pixel-width.js        # Canvas-based text pixel width measurement
│       ├── truncate.js           # Smart truncation at word boundaries
│       └── clipboard.js          # Copy to clipboard utility
```

## Visual Design

### Aesthetic
Professional, clean, utility-focused. This is a tool people use at work — it should feel like a well-made instrument, not a toy. Think "premium free tool" — the kind of thing that makes you surprised it doesn't cost money.

### Color Palette
- **Background:** #FAFAFA (light mode), #1A1A2E (dark mode)
- **Surface:** #FFFFFF / #16213E
- **Text:** #1A1A2E / #E8E8E8
- **Muted text:** #6B7280 / #9CA3AF
- **Primary accent:** #2563EB (a trustworthy blue — the color of links, the color of SEO)
- **Success:** #16A34A (green — within limits)
- **Warning:** #D97706 (amber — approaching limits)
- **Danger:** #DC2626 (red — over limits)
- **Border:** #E5E7EB / #2D3748

### Typography
- **Sans-serif throughout** — this is a data/utility tool, not a reading environment
- Font stack: `"Inter", system-ui, -apple-system, sans-serif` (load Inter from Google Fonts or bundle subset)
- Input labels: 0.75rem, uppercase, letter-spaced, muted
- Input fields: 0.95rem
- SERP preview title: 20px Arial (matching Google's actual rendering)
- SERP preview description: 14px Arial
- SERP preview URL: 14px Arial

### Layout
- Fixed header with app name + tab nav + theme toggle
- Main content area centered, max-width 900px
- Two-column layout on desktop for SERP tab: inputs left, preview right
- Stacked on mobile
- Schema tab: form on top/left, JSON output on bottom/right

### Animations
- Minimal — tab transitions (subtle slide/fade), button hover states, copy confirmation
- Progress bars animate width changes smoothly
- Respect `prefers-reduced-motion`

## Technical Architecture

### Stack
- **Svelte 5** with runes ($state, $derived, $effect, $props)
- **Vite** for build/dev
- **Zero runtime dependencies**

### Key Technical Details

**Pixel Width Calculation (pixel-width.js):**
Use the Canvas API's `measureText()` to calculate actual rendered pixel width of text. Create an offscreen canvas, set font to match Google's SERP rendering (Arial, appropriate sizes), and measure. This gives accurate per-character width calculations that account for kerning and font metrics.

```js
function measurePixelWidth(text, fontSize = 20, fontFamily = 'Arial') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}
```

**Smart Truncation (truncate.js):**
Truncate at word boundaries (not mid-word) with ellipsis, matching Google's behavior. Measure progressively shorter substrings until one fits within the pixel limit.

**Schema Generation:**
Each schema type defines:
- `fields`: array of { key, label, type, required, placeholder, description }
- `template(data)`: function that produces clean JSON-LD from form data
- Field types: text, textarea, url, number, date, select, repeater (for FAQ Q&A pairs, HowTo steps, etc.)

**Repeater fields:**
For schemas like FAQ (multiple Q&A pairs) and HowTo (multiple steps), support dynamic add/remove of grouped fields.

### State Management
- All state via Svelte 5 runes ($state at component level)
- No global store needed — each tab manages its own state
- localStorage persistence for last-used values (optional, nice-to-have)

### Browser APIs
- Canvas API (for pixel-width measurement)
- Clipboard API (for copy buttons)
- matchMedia (for dark mode detection)

## Accessibility Plan

- All form inputs have associated labels (explicit `<label for>`)
- Tab navigation is keyboard-accessible (arrow keys between tabs, Enter to select)
- Focus management when switching tabs
- All interactive elements reachable via Tab key
- Color is never the only indicator — text labels accompany color-coded bars
- ARIA live regions for dynamic content (character counts, validation messages)
- Sufficient contrast in both light and dark modes (WCAG AA minimum)
- Screen reader announcements for copy confirmations

## Responsive Strategy

- **Desktop (>900px):** Two-column layouts, side-by-side input + preview
- **Tablet (641–900px):** Single column, stacked input then preview
- **Mobile (<640px):** Full-width stacked, larger touch targets, simplified tab nav
- SERP preview adjusts between desktop and mobile rendering based on device toggle (not viewport)
- Schema form goes full-width on mobile with the JSON output below

## Edge Cases

- Empty inputs: show placeholder preview with example data
- Extremely long titles: truncation works correctly, pixel bar shows overflow
- Special characters in titles/descriptions: proper HTML escaping
- RTL text: basic support (browser handles direction)
- No JavaScript: tool requires JS (progressive enhancement not applicable for this type of tool)
- Clipboard API unavailable: fallback to textarea-select-copy method
- Images for social preview: if no image URL, show placeholder with recommended dimensions

## Performance Budget

- Target bundle: <30KB gzipped (JS + CSS)
- No external fonts — use system font stack with Inter as first choice via `@font-face` subset or just system-ui
- Actually, for the SERP preview to be pixel-accurate, we need Arial, which is available on virtually all systems
- Canvas for pixel measurement is created once and reused
- No network requests at runtime (all client-side)
