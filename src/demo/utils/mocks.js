import ArticleBasic from './demos/article-basic.vue?raw';
import ArticleWithCover from './demos/article-with-cover.vue?raw';
import ArticleCustomUI from './demos/article-custom-ui.vue?raw';
import ArticleMinimal from './demos/article-minimal.vue?raw';

export const demos = [
  {
    id: 1,
    title: "TvArticle - Basic",
    description: "Basic usage of TvArticle with common props and content structure.",
    propsData: {
      lang: "es",
      content: {
        title: "Introducción a Vue 3 y Composition API",
        description: "Conceptos fundamentales de Vue 3 y cómo la Composition API mejora la reutilización de lógica.",
        date: "2025-10-15",
        readingTime: 4,
        tags: [
          { tag: "Vue", color: "#42b883" },
          { tag: "Composition API", color: "#35495e" },
          "Frontend"
        ],
        body: {
          "type": "minimark",
          "value": [
            [
              "p",
              {},
              "Welcome to the first official blog post of ",
              [
                "strong",
                {},
                "TODOvue"
              ],
              "! This is the beginning of an exciting journey where we will document the creation of a complete Vue 3 component library."
            ],
            [
              "h2",
              {
                "id": "what-is-todovue"
              },
              "What is TODOvue?"
            ],
            [
              "p",
              {},
              "TODOvue is a collection of Vue 3 components designed with best practices in mind:"
            ],
            [
              "ul",
              {},
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Modern"
                ],
                ": Composition API, TypeScript, and the latest Vue 3 features"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Accessible"
                ],
                ": Following ARIA standards and accessibility best practices"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "SSR-Ready"
                ],
                ": Compatible with Nuxt 3 and server-side rendering"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Tree-shakeable"
                ],
                ": Import only what you need"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Well-documented"
                ],
                ": Each component comes with complete documentation and examples"
              ]
            ],
            [
              "h2",
              {
                "id": "the-first-component-tvarticle"
              },
              "The First Component: TvArticle"
            ],
            [
              "p",
              {},
              "Our first released component is ",
              [
                "code",
                {},
                "TvArticle"
              ],
              ", a specialized component for rendering article content with polished typography and advanced features."
            ],
            [
              "h3",
              {
                "id": "key-features"
              },
              "Key Features"
            ],
            [
              "p",
              {},
              "The ",
              [
                "code",
                {},
                "TvArticle"
              ],
              " component includes:"
            ],
            [
              "ol",
              {},
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Prose typography"
                ],
                " for long content (paragraphs, lists, tables, blockquotes, code, images)"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Copyable anchors"
                ],
                " on H2-H4 headings with localized feedback"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Optional metadata"
                ],
                ": date (with a relative-time component), reading time, and colored tags"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Cover image"
                ],
                " with control over ",
                [
                  "code",
                  {},
                  "loading"
                ],
                ", ",
                [
                  "code",
                  {},
                  "decoding"
                ],
                ", ",
                [
                  "code",
                  {},
                  "fetchpriority"
                ],
                ", and aspect ratio"
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Configurable layout"
                ],
                ": centered container and prose width control"
              ]
            ],
            [
              "h3",
              {
                "id": "usage-example"
              },
              "Usage Example"
            ],
            [
              "pre",
              {
                "language": "vue [Composition API]",
                "code": "<script setup>\nimport { TvArticle } from '@todovue/tv-article'\n\nconst article = {\n  title: 'Composition API',\n  description: 'Using Vue 3 script setup',\n  // ...\n}\n</script>\n"
              }
            ],
            [
              "pre",
              {
                "language": "vue [Options API]",
                "code": "<script>\nimport { TvArticle } from '@todovue/tv-article'\n\nexport default {\n  components: { TvArticle },\n  data() {\n    return {\n      article: {\n        title: 'Options API',\n        description: 'Using Vue 2 style options',\n        // ...\n      }\n    }\n  }\n}\n</script>\n"
              }
            ],
            [
              "h3",
              {
                "id": "installation"
              },
              "Installation"
            ],
            [
              "p",
              {},
              "You can install the package using npm, yarn, or pnpm:"
            ],
            [
              "pre",
              {
                "language": "bash [npm]",
                "code": "npm install @todovue/tv-article"
              }
            ],
            [
              "pre",
              {
                "language": "bash [yarn]",
                "code": "yarn add @todovue/tv-article"
              }
            ],
            [
              "pre",
              {
                "language": "bash [pnpm]",
                "code": "pnpm add @todovue/tv-article"
              }
            ],
            [
              "h2",
              {
                "id": "why-another-component-library"
              },
              "Why Another Component Library?"
            ],
            [
              "p",
              {},
              "There are many excellent libraries like Vuetify, PrimeVue, or Element Plus. So, why TODOvue?"
            ],
            [
              "h3",
              {
                "id": "different-philosophy"
              },
              "Different Philosophy"
            ],
            [
              "p",
              {},
              "TODOvue is born with a specific philosophy:"
            ],
            [
              "ul",
              {},
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Specialized components"
                ],
                ": We don't try to be everything to everyone. Each component solves one specific problem very well."
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Zero unnecessary dependencies"
                ],
                ": Only strictly necessary dependencies."
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "Injected styles"
                ],
                ": CSS automatically injected via JavaScript, with no manual configuration."
              ],
              [
                "li",
                {},
                [
                  "strong",
                  {},
                  "TypeScript first"
                ],
                ": First-class types, not an afterthought."
              ]
            ],
            [
              "h2",
              {
                "id": "the-road-ahead"
              },
              "The Road Ahead"
            ],
            [
              "p",
              {},
              "This blog will document the complete development process:"
            ],
            [
              "ul",
              {},
              [
                "li",
                {},
                "Architecture decisions and why we made them"
              ],
              [
                "li",
                {},
                "Technical challenges and how we solve them"
              ],
              [
                "li",
                {},
                "New components and their use cases"
              ],
              [
                "li",
                {},
                "Performance improvements and optimizations"
              ],
              [
                "li",
                {},
                "Community feedback and iterations"
              ]
            ],
            [
              "h2",
              {
                "id": "join-the-journey"
              },
              "Join the Journey"
            ],
            [
              "p",
              {},
              "TODOvue is open source and we welcome contributions. Whether you want to:"
            ],
            [
              "ul",
              {},
              [
                "li",
                {},
                "Report bugs or suggest features"
              ],
              [
                "li",
                {},
                "Contribute code or documentation"
              ],
              [
                "li",
                {},
                "Share your use cases"
              ],
              [
                "li",
                {},
                "Simply follow the progress"
              ]
            ],
            [
              "p",
              {},
              "All forms of participation are welcome!"
            ],
            [
              "h2",
              {
                "id": "next-steps"
              },
              "Next Steps"
            ],
            [
              "p",
              {},
              "In the following posts we will explore:"
            ],
            [
              "ol",
              {},
              [
                "li",
                {},
                "The internal architecture of TvArticle"
              ],
              [
                "li",
                {},
                "How we handle SSR and style injection"
              ],
              [
                "li",
                {},
                "The localization and i18n system"
              ],
              [
                "li",
                {},
                "Helper components: TvLabel and TvRelativeTime"
              ],
              [
                "li",
                {},
                "Plans for new components"
              ]
            ],
            [
              "hr",
              {}
            ],
            [
              "p",
              {},
              "Do you have any questions or comments? We would love to hear them! Follow us on ",
              [
                "a",
                {
                  "href": "https://github.com/TODOvue",
                  "rel": [
                    "nofollow"
                  ]
                },
                "GitHub"
              ],
              " to stay up to date with the latest news."
            ],
            [
              "style",
              {},
              "html pre.shiki code .sVt8B, html code.shiki .sVt8B{--shiki-default:#24292E;--shiki-dark:#E1E4E8}html pre.shiki code .s9eBZ, html code.shiki .s9eBZ{--shiki-default:#22863A;--shiki-dark:#85E89D}html pre.shiki code .sScJk, html code.shiki .sScJk{--shiki-default:#6F42C1;--shiki-dark:#B392F0}html pre.shiki code .szBVR, html code.shiki .szBVR{--shiki-default:#D73A49;--shiki-dark:#F97583}html pre.shiki code .sZZnC, html code.shiki .sZZnC{--shiki-default:#032F62;--shiki-dark:#9ECBFF}html pre.shiki code .sj4cs, html code.shiki .sj4cs{--shiki-default:#005CC5;--shiki-dark:#79B8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}html.dark .shiki span {color: var(--shiki-dark);background: var(--shiki-dark-bg);font-style: var(--shiki-dark-font-style);font-weight: var(--shiki-dark-font-weight);text-decoration: var(--shiki-dark-text-decoration);}"
            ]
          ],
          "toc": {
            "title": "",
            "searchDepth": 2,
            "depth": 2,
            "links": [
              {
                "id": "what-is-todovue",
                "depth": 2,
                "text": "What is TODOvue?"
              },
              {
                "id": "the-first-component-tvarticle",
                "depth": 2,
                "text": "The First Component: TvArticle",
                "children": [
                  {
                    "id": "key-features",
                    "depth": 3,
                    "text": "Key Features"
                  },
                  {
                    "id": "usage-example",
                    "depth": 3,
                    "text": "Usage Example"
                  }
                ]
              },
              {
                "id": "why-another-component-library",
                "depth": 2,
                "text": "Why Another Component Library?",
                "children": [
                  {
                    "id": "different-philosophy",
                    "depth": 3,
                    "text": "Different Philosophy"
                  }
                ]
              },
              {
                "id": "the-road-ahead",
                "depth": 2,
                "text": "The Road Ahead"
              },
              {
                "id": "join-the-journey",
                "depth": 2,
                "text": "Join the Journey"
              },
              {
                "id": "next-steps",
                "depth": 2,
                "text": "Next Steps"
              }
            ]
          }
        }
      },
      ui: {
        center: true,
        proseSize: 'full',
        showCopy: true
      }
    },
    html: ArticleBasic,
  },

  {
    id: 2,
    title: "TvArticle - With Cover",
    description: "TvArticle example showcasing a cover image with custom aspect ratio and loading options.",
    propsData: {
      lang: "en",
      content: {
        title: "Nuxt Content Essentials",
        description: "Everything you need to know about Nuxt Content to create amazing blogs and docs.",
        date: "2025-10-20",
        readingTime: 12,
        tags: [
          { tag: "Nuxt", color: "#00C58E" },
          { tag: "Content", color: "#FF5733" },
          { tag: "Markdown", color: "#F39C12" }
        ],
        cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop",
        coverAlt: "Laptop with code on screen",
        coverCaption: "Nuxt Content makes creating content simple and powerful",
        body: `
          <h2 id="overview">Overview</h2>
          <p>Nuxt Content provides a powerful Markdown engine with Vue components.</p>
          <p>External link to <a href="https://content.nuxt.com">Nuxt Content</a>.</p>
          <p>Jump to <a href="#overview">Overview</a>.</p>
        `
      },
      ui: {
        coverAspect: '16 / 9',
        coverLoading: 'lazy',
        coverDecoding: 'async',
        coverFetchPriority: 'high',
        center: true,
        proseSize: 'lg',
        showCopy: true
      }
    },
    html: ArticleWithCover,
  },

  {
    id: 3,
    title: "TvArticle - Custom UI",
    description: "Demonstration of TvArticle with customized UI options like prose size and metadata visibility.",
    propsData: {
      lang: "es",
      content: {
        title: "UI Personalizada",
        date: "2025-10-21",
        tags: [
          { tag: "UI", color: "#9b59b6" },
          "Accesibilidad"
        ],
        body: `
          <h2 id="diseno">Diseño</h2>
          <p>Ejemplo con opciones de UI personalizadas y énfasis en accesibilidad.</p>
          <p>Más info en <a href="https://a11yproject.com/">The A11Y Project</a>.</p>
        `
      },
      ui: {
        center: false,
        proseSize: 'md',
        showMeta: true,
        showCover: false,
        showCopy: true
      }
    },
    html: ArticleCustomUI,
  },

  {
    id: 4,
    title: "TvArticle - Minimalist",
    description: "A minimalist TvArticle example focusing solely on content without metadata or cover image.",
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
        proseSize: 'md',
        showCopy: true
      }
    },
    html: ArticleMinimal,
  },

  {
    id: 5,
    title: "TvArticle - Anchors & External Links",
    description: "Testing internal anchors and external links within the TvArticle component.",
    propsData: {
      lang: "es",
      content: {
        title: "Vinculación y navegación",
        date: "2025-10-22",
        tags: ["UX", "Accesibilidad", { tag: "Links", color: "#2ECC71" }],
        body: `
          <h2 id="intro">Introducción</h2>
          <p>Este artículo prueba enlaces internos y externos.</p>
          <p>Enlace externo a <a href="https://vuejs.org/">Vue.js</a> y a <a href="https://nuxt.com">Nuxt</a>.</p>
          <p>Ir a la sección <a href="#detalles">detalles</a> con scroll suave.</p>
          <h2 id="detalles">Detalles</h2>
          <p>Más contenido para validar el desplazamiento interno.</p>
        `
      },
      ui: { showCopy: false, proseSize: 'md', center: true }
    },
    html: ArticleBasic,
  },

  {
    id: 6,
    title: "TvArticle - Auto Reading Time",
    description: "An article example that tests the automatic reading time estimation feature.",
    propsData: {
      lang: "en",
      content: {
        title: "Auto-estimated Reading",
        date: "2025-10-23",
        tags: ["Performance", "DX"],
        body: `
          <p>${'Lorem ipsum '.repeat(250)}</p>
        `
      },
      ui: { showCopy: true, proseSize: 'lg', center: false }
    },
    html: ArticleMinimal,
  },

  {
    id: 7,
    title: "TvArticle - PT + Slugify",
    description: "Demonstration of TvArticle in Portuguese with accented characters and emoji in titles for slug stability.",
    propsData: {
      lang: "pt",
      content: {
        title: "Guia rápido de tipografia ✨",
        date: "2025-10-24",
        tags: [{ tag: "Tipografia", color: "#8E44AD" }, "Estilo"],
        body: `
          <h2 id="visao">Visão geral</h2>
          <p>Texto com acentuação e títulos com emoji para validar slugs estáveis.</p>
        `
      },
      ui: { showCopy: true, proseSize: 'md', center: true }
    },
    html: ArticleCustomUI,
  },

  {
    id: 8,
    title: "TvArticle - RTL Arabic",
    description: "Testing TvArticle with right-to-left (RTL) content in Arabic, including headings and links.",
    propsData: {
      lang: "ar",
      content: {
        title: "مقالة عربية",
        date: "2025-10-25",
        tags: ["RTL", { tag: "تصميم", color: "#3498DB" }],
        body: `
          <h2 id="rtl">لغة من اليمين إلى اليسار</h2>
          <p>هذا نص لاختبار الاتجاه من اليمين إلى اليسار وعناصر العناوين والروابط.</p>
          <p><a href="#rtl">الانتقال إلى الأعلى</a></p>
        `
      },
      ui: { showCopy: true, proseSize: 'md', center: true }
    },
    html: ArticleBasic,
  },

  {
    id: 9,
    title: "TvArticle - Portrait Cover",
    description: "TvArticle example with a portrait-oriented cover image to test aspect ratio handling.",
    propsData: {
      lang: "en",
      content: {
        title: "Portrait Image Cover",
        date: "2025-10-26",
        cover: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&h=1200&fit=crop",
        coverAlt: "Portrait sample",
        coverCaption: "Testing portrait cover and aspect ratio",
        body: `
          <h2 id="cover">Cover Behavior</h2>
          <p>Validates aspect ratio and lazy/decoding priorities.</p>
        `
      },
      ui: {
        coverAspect: '3 / 4',
        coverLoading: 'lazy',
        coverDecoding: 'async',
        coverFetchPriority: 'auto',
        showCopy: true,
        center: true,
        proseSize: 'md'
      }
    },
    html: ArticleWithCover,
  },

  {
    id: 10,
    title: "TvArticle - Custom Header Slot",
    description: "Demo of TvArticle with a custom header slot while retaining the copy button functionality.",
    propsData: {
      lang: "es",
      content: {
        title: "Encabezado personalizado",
        date: "2025-10-27",
        body: `
          <h2 id="slot">Contenido</h2>
          <p>Este demo valida que si se sobrescribe el header, también debe incluir el botón de copiar.</p>
        `
      },
      ui: { showCopy: true, proseSize: 'md', center: true }
    },
    html: ArticleCustomUI,
  },
];
