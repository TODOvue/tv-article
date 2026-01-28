<p align="center"><img width="150" src="https://res.cloudinary.com/dcdfhi8qz/image/upload/v1763663056/uqqtkgp1lg3xdplutpga.png" alt="TODOvue logo"></p>

# TODOvue Article (TvArticle)
A Vue 3 component to display rich article content with polished typography, optional cover image, metadata (date, reading time, tags), and copyable heading anchors. Works in SPA and SSR (e.g., Nuxt 4) and injects styles automatically.

[![npm](https://img.shields.io/npm/v/@todovue/tv-article.svg)](https://www.npmjs.com/package/@todovue/tv-article)
[![npm downloads](https://img.shields.io/npm/dm/@todovue/tv-article.svg)](https://www.npmjs.com/package/@todovue/tv-article)
[![npm total downloads](https://img.shields.io/npm/dt/@todovue/tv-article.svg)](https://www.npmjs.com/package/@todovue/tv-article)
![License](https://img.shields.io/github/license/TODOvue/tv-article)
![Release Date](https://img.shields.io/github/release-date/TODOvue/tv-article)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/@todovue/tv-article)
![Node Version](https://img.shields.io/node/v/@todovue/tv-article)
![Last Commit](https://img.shields.io/github/last-commit/TODOvue/tv-article)
![Stars](https://img.shields.io/github/stars/TODOvue/tv-article?style=social)
> Demo: https://ui.todovue.blog/article

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start (SPA)](#quick-start-spa)
- [Nuxt 4 / SSR Usage](#nuxt-4--ssr-usage)
- [Component Registration Options](#component-registration-options)
- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Customization (Styles / UI)](#customization-styles--ui)
- [Accessibility](#accessibility)
- [SSR Notes](#ssr-notes)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features
- Polished prose typography for long content (paragraphs, lists, tables, quotes, code, images, etc.).
- H2–H4 headings get a “copy link” anchor button with localized feedback text.
- Optional metadata: date (rendered with relative-time component), reading time (estimated or forced), and colored tags.
- Cover image with `loading`, `decoding`, `fetchpriority` and aspect ratio control.
- Configurable layout: centered container and prose width (`sm`, `base`, `md`, `lg`, `full`).
- Slots for header/before/after/footer; default slot used when `content.body` is not provided.
- External links safety: open in a new tab with `rel="noopener noreferrer"` automatically.
- CSS auto-injected via JS: no manual CSS import required.

Internal deps: uses `@todovue/tv-label` (tags) and `@todovue/tv-relative-time` (date). You only need to install `@todovue/tv-article`.

## Installation
Using npm:
```bash
npm install @todovue/tv-article
```
Using yarn:
```bash
yarn add @todovue/tv-article
```
Using pnpm:
```bash
pnpm add @todovue/tv-article
```
Peer: Vue ^3.

## Quick Start (SPA)
**Important**: You must explicitly import the stylesheet in your application.

Global registration (main.js / main.ts):
```js
import { createApp } from 'vue'
import App from './App.vue'

import { TvArticle } from '@todovue/tv-article'
import '@todovue/tv-article/style.css' // import styles
import '@todovue/tv-label/style.css' // tv-article depends on tv-label

const app = createApp(App)
app.component('TvArticle', TvArticle)
app.mount('#app')
```
Local import inside a component:
```vue
<script setup>
import { TvArticle } from '@todovue/tv-article'
import '@todovue/tv-article/style.css'

const article = {
  title: 'Introduction to Vue 3',
  description: 'Key concepts and the Composition API',
  date: '2025-10-15',
  readingTime: 8, // optional; if missing, it is estimated from body
  tags: [ 'Vue', { tag: 'JavaScript', color: '#F7DF1E' } ],
  body: `
    <h2 id="what-is-vue">What is Vue?</h2>
    <p>Provide safe HTML to v-html…</p>
  `
}
</script>

<template>
  <TvArticle :content="article" lang="en"></TvArticle>
</template>
```

## Nuxt 4 / SSR Usage
Create a plugin file: `plugins/tv-article.client.ts` (or without suffix; SSR-safe since DOM access happens in `onMounted`):
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@todovue/tv-card/nuxt'
  ]
})
```
Use anywhere:
```vue
<TvArticle :content="{ title: 'Post', body: '<p>Hello</p>' }"></TvArticle>
```

## Component Registration Options
| Approach                                 | When to use                                    |
|------------------------------------------|------------------------------------------------|
| Global via `app.use(TvArticle)`          | Many usages across app / design system install |
| Local named import `{ TvArticle }`       | Isolated or code-split contexts                |
| Direct default import `import TvArticle` | Single usage or manual registration            |

## Props
All content is expected to be safe HTML for `content.body` (it is rendered via `v-html`).

- Prop: `content` (Object) [default: `{ title: '', body: '' }`]
  - title: string
  - description: string
  - date: string | Date (rendered relatively via `@todovue/tv-relative-time`)
  - readingTime: number (minutes; if omitted, estimated at ~200 wpm)
  - tags: Array<string | { tag: string, color?: string }>
  - cover: string (image URL)
  - coverAlt: string
  - coverCaption: string
  - body: string (HTML)

- Prop: `ui` (Object) [defaults below]
  - showTitle: boolean (true)
  - showMeta: boolean (true)
  - showCover: boolean (true)
  - center: boolean (true)
  - proseSize: 'sm' | 'base' | 'md' | 'lg' | 'full' ('full')
  - coverLoading: 'lazy' | 'eager' ('lazy')
  - coverDecoding: 'async' | 'sync' ('async')
  - coverFetchPriority: 'auto' | 'high' | 'low' ('auto')
  - coverAspect: string | null (e.g., '16 / 9')

- Prop: `lang` (String) [default: 'en']
  - Affects reading time text and anchor button labels ('en', 'es', 'fr', 'pt').

## Events
| Event (kebab)    | Payload             | Description                                |
|------------------|---------------------|--------------------------------------------|
| `anchor-copied`  | `string` (anchorId) | Emitted when a heading link is copied      |

Usage:
```vue
<TvArticle @anchor-copied="onCopied"></TvArticle>
```
```js
function onCopied(id) {
  console.log('Anchor copied:', id)
}
```

## Slots
- `header`: Replace the entire header (title, description, meta, cover). If not provided, TvArticle renders the header based on `ui` and `content`.
- `before`: Content before the article body.
- `after`: Content after the article body.
- `footer`: Footer area (author, share, etc.).
- default: When `content.body` is missing, the default slot is rendered inside the prose container.

## Customization (Styles / UI)
- Styles: the package injects CSS automatically when you import the component (no extra CSS import needed).
- Layout: control width with `ui.proseSize` and centering with `ui.center`.
- Cover: adjust `ui.coverAspect`, `coverLoading`, `coverDecoding`, and `coverFetchPriority`.
- Tags: `content.tags` accepts strings or `{ tag, color }` objects.
- For deeper theming, override the `.tv-article*` classes in your app.

## Accessibility
- `aria-labelledby` is applied to `<article>` when a title is present.
- Anchor button on H2–H4 with localized `aria-label`/`title` and copied feedback.
- External links are marked with `target="_blank"` and `rel="noopener noreferrer"` for safety.

## SSR Notes
- No DOM access during `setup`; enhancements (anchors/links) happen in `onMounted`, making it SSR-safe.
- Styles are injected on the client via JS; no need to import CSS manually.

## Examples
Basic:
```vue
<TvArticle :content="{
  title: 'Introduction to Vue 3',
  date: '2025-10-15',
  readingTime: 8,
  tags: ['Vue', 'JavaScript'],
  body: '<h2 id=&quot;what-is&quot;>What is it?</h2><p>…</p>'
}" lang="en"></TvArticle>
```
With cover and aspect ratio:
```vue
<TvArticle
  :content="{
    title: 'Nuxt Content Guide',
    description: 'Build blogs and docs',
    date: '2025-10-20',
    readingTime: 12,
    tags: ['Nuxt', 'Markdown'],
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop',
    coverAlt: 'Laptop with code',
    coverCaption: 'Content with cover image',
    body: '<h2 id=&quot;intro&quot;>Introduction</h2><p>…</p>'
  }"
  :ui="{ coverAspect: '16 / 9', center: true }"
></TvArticle>
```
Custom UI + footer slot:
```vue
<TvArticle
  :content="{ title: 'Typography', body: '<h2 id=&quot;h2&quot;>H2</h2><p>…</p>' }"
  :ui="{ proseSize: 'lg', center: true }"
  @anchor-copied="id => console.log(id)"
>
  <template #footer>
    <hr />
    <small>Author: TvArticle Team</small>
  </template>
</TvArticle>
```
Minimal:
```vue
<TvArticle :content="{ title: 'Minimal', body: '<p>Only content</p>' }" :ui="{ showMeta: false, showCover: false, proseSize: 'base' }"></TvArticle>
```

## Development
```bash
git clone https://github.com/TODOvue/tv-article.git
cd tv-article
npm install
npm run dev      # demo playground with Vite
npm run build    # library build (ESM/CJS + d.ts)
npm run build:demo  # demo site build (dist-demo)
```
The library marks `vue` as external and generates `dist/tv-article.es.js`, `dist/tv-article.cjs.js`, `dist/tv-article.css`, and type definitions.

### Notes
- `content.body` is rendered with `v-html`: provide sanitized HTML if it comes from Markdown or external sources.
- Reading time falls back to an estimation of ~200 wpm when `readingTime` is not provided.
- Supported internal locales for UI text: `en`, `es`, `fr`, `pt`.

## Contributing
PRs and issues welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License
MIT © TODOvue

### Attributions
Crafted for the TODOvue component ecosystem
