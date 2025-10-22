import Default from './demos/default.vue?raw';
import ArticleBasic from './demos/article-basic.vue?raw';
import ArticleWithCover from './demos/article-with-cover.vue?raw';
import ArticleCustomUI from './demos/article-custom-ui.vue?raw';
import ArticleMinimal from './demos/article-minimal.vue?raw';

export const demos = [
  {
    id: 1,
    title: "TvArticle - Basic",
    propsData: {
      lang: "en",
      content: {
        title: "Introduction to Vue 3 and Composition API",
        description: "Learn the fundamental concepts of Vue 3 and how to use the Composition API to create more maintainable applications.",
        date: "2025-10-15",
        readingTime: 8,
        tags: [
          { tag: "Vue", color: "#4FC08D" },
          { tag: "JavaScript", color: "#F7DF1E" },
          { tag: "Tutorial", color: "#FF5733" }
        ],
        body: `
          <h2 id="what-is-vue-3">What is Vue 3?</h2>
          <p>Vue 3 is the latest version of the popular progressive JavaScript framework. It brings significant performance improvements, better TypeScript support, and the new <strong>Composition API</strong>.</p>
          
          <h3 id="key-features">Key Features</h3>
          <ul>
            <li>Better performance and smaller bundle size</li>
            <li>Composition API for improved code organization</li>
            <li>Fragments, Teleport, and Suspense</li>
            <li>Enhanced TypeScript support</li>
          </ul>

          <h2 id="composition-api">Composition API</h2>
          <p>The Composition API is an alternative way to write components that offers better logic reusability and code organization.</p>

          <h3 id="basic-example">Basic Example</h3>
          <pre><code>import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);
    
    const increment = () => {
      count.value++;
    };
    
    return { count, doubled, increment };
  }
}</code></pre>

          <blockquote>
            <p>The Composition API doesn't replace the Options API, both can coexist in the same project.</p>
          </blockquote>

          <h2 id="advantages">Advantages of Vue 3</h2>
          <ol>
            <li><strong>Performance:</strong> Vue 3 is up to 2x faster than Vue 2</li>
            <li><strong>Size:</strong> Smaller bundle thanks to tree-shaking</li>
            <li><strong>TypeScript:</strong> Native and improved support</li>
            <li><strong>Maintainability:</strong> Better code organization with Composition API</li>
          </ol>

          <h2 id="conclusion">Conclusion</h2>
          <p>Vue 3 represents a major leap forward for the Vue ecosystem, offering better performance and an improved developer experience.</p>
        `
      }
    },
    html: ArticleBasic,
  },
  {
    id: 2,
    title: "TvArticle - With Cover",
    propsData: {
      lang: "en",
      content: {
        tags: [
          { tag: "Nuxt", color: "#00C58E" },
          { tag: "Content", color: "#FF5733" },
          { tag: "Markdown", color: "#F39C12" }
        ],
        description: "Everything you need to know about Nuxt Content to create amazing blogs and documentation.",
        date: "2025-10-20",
        readingTime: 12,
        cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop",
        coverAlt: "Laptop with code on screen",
        coverCaption: "Nuxt Content makes creating content simple and powerful",
        body: `
          <h2 id="introduction">Introduction</h2>
          <p>Nuxt Content is a file-based module that allows you to create rich content websites using Markdown, YAML, CSV, and JSON.</p>

          <h3 id="installation">Installation</h3>
          <pre><code>npm install @nuxt/content</code></pre>

          <h2 id="features">Featured Characteristics</h2>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Markdown</td>
                <td>Full Markdown support with extensions</td>
              </tr>
              <tr>
                <td>Syntax Highlighting</td>
                <td>Automatic code highlighting</td>
              </tr>
              <tr>
                <td>Search</td>
                <td>Built-in full-text search</td>
              </tr>
              <tr>
                <td>Hot Reload</td>
                <td>Real-time updates during development</td>
              </tr>
            </tbody>
          </table>

          <h2 id="frontmatter">Using Frontmatter</h2>
          <p>Frontmatter allows you to add metadata to your documents:</p>
          <pre><code>---
title: My article
description: A description
tags: [nuxt, content]
---

# Article content here</code></pre>

          <blockquote>
            <p>Frontmatter is automatically parsed and available in the document object.</p>
          </blockquote>

          <hr>

          <h2 id="conclusions">Conclusions</h2>
          <p>Nuxt Content is the perfect solution for creating blogs, documentation, and content-based sites with Nuxt 3.</p>
        `
      }
    },
    html: ArticleWithCover,
  },
  {
    title: "TvArticle - Custom UI + Footer",
    propsData: {
      content: {
        lang: "en",
        title: "Typography and Prose Styles",
        description: "Example of all typography elements supported in TvArticle.",
        date: "2025-10-21",
        readingTime: 5,
        tags: [
          { tag: "Typography", color: "#8E44AD" },
          { tag: "CSS", color: "#2980B9" },
          { tag: "Design", color: "#27AE60" }
        ],
        body: `
          <h2 id="headings">Headings</h2>
          <p>Headings create visual hierarchy in your content.</p>

          <h3 id="h3-example">This is an H3</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <h2 id="text-format">Text Formatting</h2>
          <p>You can use <strong>bold</strong>, <em>italic</em>, and <code>inline code</code> in your paragraphs.</p>

          <h2 id="lists">Lists</h2>
          <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>

          <h2 id="quotes">Quotes</h2>
          <blockquote>
            <p>This is a featured quote that uses a colored border and italic style.</p>
          </blockquote>

          <h2 id="code">Code Blocks</h2>
          <pre><code>function example() {
  return "Hello world";
}</code></pre>
        `
      },
      ui: {
        proseSize: 'lg',
        center: true
      }
    },
    html: ArticleCustomUI,
  },
  {
    id: 4,
    title: "TvArticle - Minimalist",
    propsData: {
      lang: "en",
      content: {
        title: "Minimalist Article",
        body: `
          <h2 id="simple">Simple and Clean</h2>
          <p>This article shows the component with minimal configuration.</p>

          <h3 id="content">Only Content Matters</h3>
          <p>Perfect for technical documentation.</p>

          <pre><code>const simple = true;</code></pre>
        `
      },
      ui: {
        showMeta: false,
        showCover: false,
        proseSize: 'base'
      }
    },
    html: ArticleMinimal,
  },
];

