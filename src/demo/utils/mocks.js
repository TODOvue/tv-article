import ArticleBasic from './demos/article-basic.vue?raw';
import ArticleWithCover from './demos/article-with-cover.vue?raw';
import ArticleCustomUI from './demos/article-custom-ui.vue?raw';
import ArticleMinimal from './demos/article-minimal.vue?raw';

export const demos = [
  {
    id: 1,
    title: "TvArticle - Basic",
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
                "className": "language-vue shiki shiki-themes github-light github-dark",
                "code": "<script setup>\nimport { TvArticle } from '@todovue/tv-article'\n\nconst article = {\n  title: 'My First Article',\n  description: 'An introduction to the TODOvue ecosystem',\n  date: '2025-11-12',\n  readingTime: 5,\n  tags: ['Vue', { tag: 'JavaScript', color: '#F7DF1E' }],\n  body: `\n    <h2 id=\"introduction\">Introduction</h2>\n    <p>Article content...</p>\n  `\n}\n</script>\n\n<template>\n  <TvArticle :content=\"article\" lang=\"en\" />\n</template>\n",
                "language": "vue",
                "meta": "",
                "style": ""
              },
              [
                "code",
                {
                  "__ignoreMap": ""
                },
                [
                  "span",
                  {
                    "class": "line",
                    "line": 1
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "<"
                  ],
                  [
                    "span",
                    {
                      "class": "s9eBZ"
                    },
                    "script"
                  ],
                  [
                    "span",
                    {
                      "class": "sScJk"
                    },
                    " setup"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ">\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 2
                  },
                  [
                    "span",
                    {
                      "class": "szBVR"
                    },
                    "import"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    " { TvArticle } "
                  ],
                  [
                    "span",
                    {
                      "class": "szBVR"
                    },
                    "from"
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    " '@todovue/tv-article'\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 3
                  },
                  [
                    "span",
                    {
                      "emptyLinePlaceholder": true
                    },
                    "\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 4
                  },
                  [
                    "span",
                    {
                      "class": "szBVR"
                    },
                    "const"
                  ],
                  [
                    "span",
                    {
                      "class": "sj4cs"
                    },
                    " article"
                  ],
                  [
                    "span",
                    {
                      "class": "szBVR"
                    },
                    " ="
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    " {\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 5
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  title: "
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "'My First Article'"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ",\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 6
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  description: "
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "'An introduction to the TODOvue ecosystem'"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ",\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 7
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  date: "
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "'2025-11-12'"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ",\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 8
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  readingTime: "
                  ],
                  [
                    "span",
                    {
                      "class": "sj4cs"
                    },
                    "5"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ",\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 9
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  tags: ["
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "'Vue'"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ", { tag: "
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "'JavaScript'"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ", color: "
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "'#F7DF1E'"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    " }],\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 10
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  body: "
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "`\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 11
                  },
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "    <h2 id=\"introduction\">Introduction</h2>\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 12
                  },
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "    <p>Article content...</p>\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 13
                  },
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "  `\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 14
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "}\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 15
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "</"
                  ],
                  [
                    "span",
                    {
                      "class": "s9eBZ"
                    },
                    "script"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ">\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 16
                  },
                  [
                    "span",
                    {
                      "emptyLinePlaceholder": true
                    },
                    "\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 17
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "<"
                  ],
                  [
                    "span",
                    {
                      "class": "s9eBZ"
                    },
                    "template"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ">\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 18
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "  <"
                  ],
                  [
                    "span",
                    {
                      "class": "s9eBZ"
                    },
                    "TvArticle"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    " :"
                  ],
                  [
                    "span",
                    {
                      "class": "sScJk"
                    },
                    "content"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "="
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "\""
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "article"
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "\""
                  ],
                  [
                    "span",
                    {
                      "class": "sScJk"
                    },
                    " lang"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "="
                  ],
                  [
                    "span",
                    {
                      "class": "sZZnC"
                    },
                    "\"en\""
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    " />\n"
                  ]
                ],
                [
                  "span",
                  {
                    "class": "line",
                    "line": 19
                  },
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    "</"
                  ],
                  [
                    "span",
                    {
                      "class": "s9eBZ"
                    },
                    "template"
                  ],
                  [
                    "span",
                    {
                      "class": "sVt8B"
                    },
                    ">\n"
                  ]
                ]
              ]
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
