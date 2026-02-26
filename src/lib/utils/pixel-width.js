/**
 * Measures the rendered pixel width of text using the Canvas API.
 * This matches how Google calculates title truncation in SERPs.
 */

let canvas = null;
let ctx = null;

function getContext() {
  if (!ctx) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
  }
  return ctx;
}

export function measurePixelWidth(text, fontSize = 20, fontFamily = 'Arial') {
  const c = getContext();
  c.font = `${fontSize}px ${fontFamily}`;
  return c.measureText(text).width;
}

/**
 * Google SERP pixel limits (based on Screaming Frog research):
 * Desktop title: ~482px (rendered at 20px Arial)
 * Mobile title: ~550px (rendered at 20px Arial)
 * Desktop description: ~928px (rendered at 14px Arial)
 * Mobile description: ~757px (rendered at 14px Arial)
 */
export const LIMITS = {
  desktop: {
    title: { px: 482, fontSize: 20, font: 'Arial' },
    description: { px: 928, fontSize: 14, font: 'Arial' },
  },
  mobile: {
    title: { px: 550, fontSize: 20, font: 'Arial' },
    description: { px: 757, fontSize: 14, font: 'Arial' },
  },
};

/**
 * Truncate text at word boundary to fit within pixel width.
 * Returns { text, truncated } where truncated indicates if ellipsis was added.
 */
export function truncateToPixelWidth(text, maxPx, fontSize, fontFamily = 'Arial') {
  const fullWidth = measurePixelWidth(text, fontSize, fontFamily);
  if (fullWidth <= maxPx) return { text, truncated: false };

  const ellipsis = '\u2026';
  const ellipsisWidth = measurePixelWidth(ellipsis, fontSize, fontFamily);
  const targetWidth = maxPx - ellipsisWidth;

  const words = text.split(/\s+/);
  let result = '';
  let currentWidth = 0;

  for (const word of words) {
    const candidate = result ? result + ' ' + word : word;
    const w = measurePixelWidth(candidate, fontSize, fontFamily);
    if (w > targetWidth) break;
    result = candidate;
    currentWidth = w;
  }

  // If even the first word is too long, truncate characters
  if (!result) {
    for (let i = 1; i <= text.length; i++) {
      const w = measurePixelWidth(text.slice(0, i), fontSize, fontFamily);
      if (w > targetWidth) {
        result = text.slice(0, Math.max(1, i - 1));
        break;
      }
    }
  }

  return { text: result + ellipsis, truncated: true };
}
