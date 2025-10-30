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
        body: `
          <h2 id="que-es">¿Qué es la Composition API?</h2>
          <p>Una forma más flexible de organizar lógica de componentes con mejores opciones para reutilizar código.</p>

          <h3 id="ejemplo-basico">Ejemplo básico</h3>
          <pre><code>import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);
    const increment = () => { count.value++; };
    return { count, doubled, increment };
  }
}</code></pre>

          <p>Más detalles en la <a href="https://vuejs.org/guide/introduction.html">documentación oficial</a>.</p>
          <p>Ir a <a href="#que-es">¿Qué es la Composition API?</a></p>
        `
      },
      ui: {
        center: true,
        proseSize: 'md',
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
