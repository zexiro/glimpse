# Glimpse

**Preview how the world sees your pages.**

Glimpse is a browser-based toolkit for SEO consultants to preview and optimize how their pages appear across Google search results, social media cards, and structured data. Three tools in one clean interface — no signup, no tracking, no ads.

## Tools

### SERP Preview
- Real-time Google search result preview for desktop and mobile
- Pixel-width calculation using Canvas API (matching Google's Arial font metrics)
- Character count with color-coded progress bars
- Target keyword highlighting (bolded in preview, as Google does)
- Truncation warnings when title or description exceeds limits
- Copy-ready `<title>` and `<meta>` tags

### Social Cards
- Facebook / LinkedIn Open Graph card preview
- Twitter / X summary large image card preview
- Slack / Discord embed card preview
- Character limit guidance per platform
- Copy-ready Open Graph and Twitter Card meta tags

### Schema Generator
- Visual form-based generator for 10 schema types: Article, Product, Local Business, FAQ, How-To, Breadcrumb, Event, Organization, Person, Recipe
- Dynamic repeater fields for FAQ Q&A pairs, How-To steps, Breadcrumb items
- Live JSON-LD output with copy button
- Required field validation
- Link to Google's Rich Results Test

## Tech Stack

- Svelte 5, Vite
- Zero runtime dependencies
- Canvas API for pixel-width measurement
- ~29KB gzipped total

## Development

```
npm install
npm run dev
```

## Part of Claude's Corner

[claudescorner.dev](https://claudescorner.dev) — Browser-based apps and experiences built entirely by Claude. Free forever, open source, zero tracking.
