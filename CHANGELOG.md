# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# [1.1.0] - 2025-11-12
## ✨ Added
- Added body rendering for the object received from Nuxt Content.
- Added dynamic timer color changes.

## 📦 Dependencies
- Added `markdown-it` dependency for Markdown parsing.

# [1.0.2] - 2025-11-04
## 🛠️ Changed
* Improved accessibility for the copy link button with better focus styles and screen reader support.
* Enhanced external link indicator styling for better visibility and user experience.

# [1.0.1] – 2025-10-30

## ✨ Added

* Copy link button (`ui.showCopy`, enabled by default) next to the article title, with accessible feedback (`aria-live`) and full styling through `.tv-article__copy`.
* Automatic link enhancement in the article body:
    * External links: `target="_blank"`, `rel="noopener noreferrer"`, and a visual indicator `↗`.
    * Internal anchors (`#id`): smooth scrolling and URL hash updates.
* New cover configuration options (`coverLoading`, `coverDecoding`, `coverFetchPriority`, `coverAspect`).
* Responsive prose width variants: `.tv-prose--sm`, `.tv-prose--md`, `.tv-prose--lg`, `.tv-prose--full`.
* Copy button now includes `aria-label` and uses `aria-live="polite"` feedback for copy success/failure.
* Decorative icons marked with `aria-hidden="true"`.
* External links clearly differentiated visually.
* Complete styling for `.tv-article__copy`: focus ring, tooltip feedback, hover states, and dark-mode adjustments.
* Better spacing and color hierarchy for meta info and tags.
* External link indicator styling using `:deep(a[data-external="true"])`.
* Updated `tv-prose` sizing and responsive behavior for different prose widths.

## 🛠️ Changed

* Reading time logic now prioritizes a numeric `readingTime` prop; otherwise, it auto-calculates by real word count (≈200 wpm).
* Localized reading time format:
    * `es`: `X min de lectura`
    * `en`: `X min read`
    * `fr`, `pt` supported as well.
* Improved slug generation (`slugify`) for titles with accents or emojis — produces stable IDs.
* Header structure updated: new wrapper `.tv-article__header-top` to align the title and copy button horizontally.

## 🐛 Fixed

* Server-side rendering safety for all DOM-dependent logic (guards for `window`, `document`, `navigator`).
* Clipboard fallback: when `navigator.clipboard` is unavailable, uses `execCommand('copy')`.
* Re-applies anchor enhancements when the article body content changes.


## [1.0.0] - 2025-10-21
### ✨ Added
- Initial stable release of `@todovue/tv-article`.
- `TvArticle` Vue 3 component for rich article rendering with polished typography.
- Props:
  - `content`: `title`, `description`, `date`, `readingTime`, `tags` (string or `{ tag, color }`), `cover`, `coverAlt`, `coverCaption`, `body` (HTML).
  - `ui`: `showTitle`, `showMeta`, `showCover`, `center`, `proseSize` (`'sm'|'base'|'md'|'lg'|'full'`), `coverLoading`, `coverDecoding`, `coverFetchPriority`, `coverAspect`.
  - `lang`: localized labels for `'en'` (default), `'es'`, `'fr'`, `'pt'`.
- Event: `anchor-copied` (emits heading anchor id when the link is copied).
- Slots: `header`, `before`, `after`, `footer`, and default.
- Reading time estimation (~200 wpm) when `readingTime` is not provided.
- Heading anchors (H2–H4) with “copy link” button and localized feedback.
- External link hardening (opens external links in a new tab with `rel="noopener noreferrer"`).
- Cover image options: `loading`, `decoding`, `fetchpriority`, and aspect ratio control via `ui.coverAspect`.
- Auto-injected CSS via Vite (no manual CSS import needed).
- SSR-friendly (Nuxt 3) — DOM enhancements run in `onMounted`.
- Build artifacts: ESM/CJS bundles and type definitions in `dist/`.
- Integrations: `@todovue/tv-label` for tags and `@todovue/tv-relative-time` for dates.

[1.1.0]: https://github.com/TODOvue/tv-article/pull/5/files
[1.0.2]: https://github.com/TODOvue/tv-article/pull/4/files
[1.0.1]: https://github.com/TODOvue/tv-article/pull/3/files
[1.0.0]: https://github.com/TODOvue/tv-article/pull/1/files
