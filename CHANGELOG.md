# Changelog

All notable changes to `@todovue/tv-article` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.6] - 2026-02-04

### Changed
- Removed padding from code block and line elements to improve overall layout and readability.
- Checked for `document` existence before accessing DOM APIs to support server-side rendering.
- Enhanced highlight line parsing to correctly interpret highlight attributes and metadata tags.
- Removed left padding from highlighted elements to improve alignment.

## [1.3.5] - 2026-01-30

### Changed
- Adjusted the article container to use full-width and inline-block display properties.
- Removed the media query that adjusted button opacity on mobile devices.
- Reduced the padding for code blocks within articles to use smaller spacing.

## [1.3.4] - 2026-01-27

### Changed
- Simplified the file list in `package.json` to include only essential assets.
- Simplified the build configuration by removing demo-specific logic.
- Enhanced GitHub Actions workflows to automate npm package publishing and GitHub release creation.
- Moved the `@todovue/tv-demo` component import from main.js to `Demo.vue` to localize its usage.
- Updated build commands to include `README.md` and `CHANGELOG.md` files in the public directory during the build process.

### Added
- Included the `src` directory in the `package.json` files list to ensure component source files are bundled in the package distribution.

### Removed
- Eliminated the global import of the `@todovue/tv-demo` component from `main.js`.

### Dependencies
- Updated `@todovue/tv-demo` to `^1.4.11`.
- Updated `@todovue/tv-alert` to `^1.2.1`.
- Updated `@todovue/tv-label` to `^1.2.3`.
- Updated `@todovue/tv-relative-time` to `^1.3.1`.
- Updated `vue` to `^3.5.27`.
- Updated `sass` to `^1.97.3`.

## [1.3.3] - 2026-01-22

### Changed
- Refined icon handling by separating monochrome and colored assets.
- Enhanced the `getIconClass` function to support specific file extensions.

## [1.3.2] - 2026-01-21

### Changed
- Refined the `getIconClass` function to utilize file names for more accurate icon determination.

## [1.3.1] - 2026-01-21

### Added
- Introduced titles to success messages for copy actions, localized based on the user's language.

### Changed
- Enhanced file name handling within the parseInfo function.
- Improved logic for grouping code functionality.

## [1.3.0] - 2026-01-21

### Added
- Implemented code grouping functionality to allow toggling between different programming language examples.
- Introduced a tabbed interface for code blocks to improve documentation readability and organization.
- Added support for file type icons within code blocks to provide better context for different programming languages and formats.

### Changed
- Adjusted the spacing for article headers to ensure consistent layout alignment.
- Updated mixins to utilize medium spacing constants across the stylesheet.
- Enhanced code block styling to improve readability and visual clarity.
- Updated the icon mapping logic to ensure correct file type associations in code blocks.
- Enhanced the visual styling of icons within code blocks for better integration and visibility.
- Adjusted the positioning of heading anchor buttons to improve accessibility and responsiveness on smaller screens.
- Enhanced the visibility of heading anchor buttons to ensure they are easily discoverable across various viewport sizes.

### Dependencies
- Updated the `@todovue/tv-demo` dependency to `^1.4.4`.
- Updated the `@todovue/tv-alert` dependency to `^1.2.0`.
- Updated the `@todovue/tv-label` dependency to `^1.2.1`.
- Updated the `@todovue/tv-relative-time` dependency to `^1.3.0`.
- Updated the `sass` dependency to `^1.97.2`.
- Updated the `vite` dependency to `^7.3.1`.

## [1.2.3] - 2026-01-06

### Fixed
- Fixed responsive behavior for tables.
- Fixed the copy button in code blocks.
- Fixed text breaking when there are very long words without spaces.

## [1.2.2] - 2025-12-27

### Added
- Added automatic publishing to the TODOvue cPanel in `release.yml` for each release, simplifying package distribution and updates.
- Added `package-lock.json` to the repository to ensure dependency consistency and facilitate version management across development and production environments.

### Changed
- Changed the `base` option in `vite.config.js` for website deployment in cpanel.

### Fixed
- Fixed repository URL in `package.json` to point to the correct GitHub repository.
- Fixed the token configuration used to generate the package in the GitHub Actions workflow `release.yml`.

### Dependencies
- Updated dependency versions in `package.json` to maintain compatibility and benefit from improvements and bug fixes in the used libraries.
- Added `@todovue/tv-alert` dependency to `package.json` for enhanced alert functionalities.

## [1.2.1] - 2025-11-24

### Added
- Added `highlight.js` for syntax highlighting.

### Changed
- Updated background and text colors for dark and light themes to improve readability and visual comfort.
- Changed render pre to `highlight.js`

### Dependencies
- Updated the `@todovue/tv-demo` dependency to `^1.2.2` to ensure compatibility with the latest changes.

## [1.2.0] - 2025-11-21

### Added
- Added `nux.js` configuration file for Nuxt 4 integration.
- Added `tsconfig.json` for proper type checking during build.
- Create `global.d.ts` to declare module for TypeScript users.
- Added Nuxt module for automatic style injection and auto-registration of the `TvArticle` component.
- The `@todovue/tv-article` component is now externalized from the final build, reducing bundle size.
- Added `CHANGELOG.md` in script to generate demo and documentation site.

### Dependencies
- Updated the `@todovue/tv-demo` dependency to `^1.2.1` to ensure compatibility with the latest changes.
- Updated the `@todovue/tv-label` dependency to `^1.1.1` to ensure compatibility with the latest changes.
- Updated the `@todovue/tv-relative-time` dependency to `^1.2.0` to ensure compatibility with the latest changes.

## [1.1.1] - 2025-11-15

### Changed
- Styles are now served as a separate CSS file (`dist/tv-article.css`) generated by Vite during the build process.
- Users must now explicitly import the stylesheet in their application:
  - For Vue/Vite SPA: `import '@todovue/tv-article/style.css'` in `main.ts`
  - For Nuxt 3/4: Add `'@todovue/tv-article/style.css'` to the `css` array in `nuxt.config.ts`

### Added
- Added `sideEffects` field to `package.json` to support proper tree-shaking with CSS files.
- Added `./style.css` export path in `package.json` for explicit CSS imports.
- Improved SSR/SSG compatibility, especially for Nuxt 3/4 applications.

### Dependencies
- Removed dependency on `vite-plugin-css-injected-by-js` from `devDependencies`

## [1.1.0] - 2025-11-12

### Added
- Added body rendering for the object received from Nuxt Content.
- Added dynamic timer color changes.

### Dependencies
- Added `markdown-it` dependency for Markdown parsing.

## [1.0.2] - 2025-11-04

### Changed
* Improved accessibility for the copy link button with better focus styles and screen reader support.
* Enhanced external link indicator styling for better visibility and user experience.

## [1.0.1] – 2025-10-30

### Added
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

### Changed
* Reading time logic now prioritizes a numeric `readingTime` prop; otherwise, it auto-calculates by real word count (≈200 wpm).
* Localized reading time format:
    * `es`: `X min de lectura`
    * `en`: `X min read`
    * `fr`, `pt` supported as well.
* Improved slug generation (`slugify`) for titles with accents or emojis — produces stable IDs.
* Header structure updated: new wrapper `.tv-article__header-top` to align the title and copy button horizontally.

### Fixed
* Server-side rendering safety for all DOM-dependent logic (guards for `window`, `document`, `navigator`).
* Clipboard fallback: when `navigator.clipboard` is unavailable, uses `execCommand('copy')`.
* Re-applies anchor enhancements when the article body content changes.

## [1.0.0] - 2025-10-21

### Added
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

[1.3.6]: https://github.com/TODOvue/tv-article/pull/17/files
[1.3.5]: https://github.com/TODOvue/tv-article/pull/15/files
[1.3.4]: https://github.com/TODOvue/tv-article/pull/14/files
[1.3.3]: https://github.com/TODOvue/tv-article/pull/14/files
[1.3.2]: https://github.com/TODOvue/tv-article/pull/13/files
[1.3.1]: https://github.com/TODOvue/tv-article/pull/12/files
[1.3.0]: https://github.com/TODOvue/tv-article/pull/11/files
[1.2.3]: https://github.com/TODOvue/tv-article/pull/10/files
[1.2.2]: https://github.com/TODOvue/tv-article/pull/9/files
[1.2.1]: https://github.com/TODOvue/tv-article/pull/8/files
[1.2.0]: https://github.com/TODOvue/tv-article/pull/7/files
[1.1.1]: https://github.com/TODOvue/tv-article/pull/6/files
[1.1.0]: https://github.com/TODOvue/tv-article/pull/5/files
[1.0.2]: https://github.com/TODOvue/tv-article/pull/4/files
[1.0.1]: https://github.com/TODOvue/tv-article/pull/3/files
[1.0.0]: https://github.com/TODOvue/tv-article/pull/1/files
