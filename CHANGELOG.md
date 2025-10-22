# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/TODOvue/tv-article/pull/1/files
