import { computed, ref, onMounted, nextTick, watch } from 'vue';

export function useArticle(content, ui = {}, lang = 'en', emit) {
  const defaultUI = {
    showTitle: true,
    showMeta: true,
    showCover: true,
    center: true,
    proseSize: 'full',
    coverLoading: 'lazy',
    coverDecoding: 'async',
    coverFetchPriority: 'auto',
    coverAspect: null
  };

  const uiOptions = computed(() => ({
    ...defaultUI,
    ...ui
  }));

  const hasMeta = computed(() => {
    return !!(content.date || content.readingTime || (content.tags && content.tags.length));
  });

  const estimatedMinutes = computed(() => {
    if (content.readingTime) return Math.ceil(content.readingTime);
    if (!content.body || typeof content.body !== 'string') return null;
    const text = content.body
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .trim();
    if (!text) return null;
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  const normalizeLang = (l) => (l || 'en').slice(0, 2).toLowerCase();

  const formatReadingTime = computed(() => {
    const minutes = content.readingTime ? Math.ceil(content.readingTime) : estimatedMinutes.value;
    if (!minutes) return null;
    const langTo = normalizeLang(lang);
    switch (langTo) {
      case 'es':
        return `${minutes} min${minutes === 1 ? '' : 's'} de lectura`;
      case 'fr':
        return `${minutes} min${minutes === 1 ? '' : 's'} de lecture`;
      case 'pt':
        return `${minutes} min${minutes === 1 ? '' : 's'} de leitura`;
      default:
        return `${minutes} min${minutes === 1 ? '' : 's'} read`;
    }
  });

  function tAnchor(key) {
    const n = normalizeLang(lang);
    switch (key) {
      case 'copied':
        switch (n) {
          case 'es':
            return 'Enlace copiado';
          case 'fr':
            return 'Lien copié';
          case 'pt':
            return 'Link copiado';
          default:
            return 'Link copied';
        }
      case 'copy':
      default:
        switch (n) {
          case 'es':
            return 'Copiar enlace';
          case 'fr':
            return 'Copier le lien';
          case 'pt':
            return 'Copiar link';
          default:
            return 'Copy link';
        }
    }
  }

  const proseClass = computed(() => {
    return `tv-prose tv-prose--${uiOptions.value.proseSize}`;
  });

  const containerClass = computed(() => {
    return {
      'tv-article': true,
      'tv-article--centered': uiOptions.value.center
    };
  });

  const titleId = computed(() => {
    const base = content?.title ? slugify(content.title) : 'tv-article-title';
    return `${base}`;
  });

  const bodyEl = ref(null);

  function enhanceAnchors() {
    const root = bodyEl.value;
    if (!root) return;
    ensureSafeLinks(root);

    const headings = root.querySelectorAll('h2[id], h3[id], h4[id]');
    headings.forEach((heading) => {
      if (heading.querySelector('.tv-anchor')) return;

      const id = heading.getAttribute('id');
      if (!id) return;

      heading.appendChild(createAnchorButton(id));
    });
  }

  function createAnchorButton(id) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tv-anchor';
    btn.setAttribute('aria-label', tAnchor('copy'));
    btn.title = tAnchor('copy');
    btn.textContent = '#';
    btn.addEventListener('click', (e) => handleAnchorClick(e, id));
    return btn;
  }

  async function handleAnchorClick(e, id) {
    e.stopPropagation();
    const url = buildAnchorUrl(id);

    try {
      await copyToClipboard(url);
      const el = e.currentTarget;
      if (el) {
        const prevTitle = el.getAttribute('title');
        const prevAria = el.getAttribute('aria-label');
        el.classList.add('is-copied');
        el.setAttribute('title', tAnchor('copied'));
        el.setAttribute('aria-label', tAnchor('copied'));
        setTimeout(() => {
          el.classList.remove('is-copied');
          if (prevTitle) el.setAttribute('title', prevTitle);
          if (prevAria) el.setAttribute('aria-label', prevAria);
        }, 1500);
      }
      if (typeof emit === 'function') emit('anchor-copied', id);
    } catch (error) {
      console.warn('Error copying to clipboard', error);
    }
  }

  function buildAnchorUrl(id) {
    const u = new URL(window.location.href);
    u.hash = id;
    return u.toString();
  }

  function ensureSafeLinks(root) {
    try {
      const anchors = root.querySelectorAll('a[href]');
      anchors.forEach((a) => {
        const href = a.getAttribute('href') || '';
        if (/^https?:\/\//i.test(href)) {
          const linkUrl = new URL(href, window.location.href);
          if (linkUrl.origin !== window.location.origin) {
            a.setAttribute('rel', 'noopener noreferrer');
            a.setAttribute('target', '_blank');
          }
        }
      });
    } catch (error) {
      console.warn('Error ensuring safe links', error);
    }
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  function slugify(str) {
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  onMounted(async () => {
    await nextTick();
    enhanceAnchors();
  });

  watch(() => content?.body, async () => {
    await nextTick();
    if (bodyEl.value) {
      bodyEl.value.querySelectorAll('.tv-anchor').forEach(el => el.remove());
    }
    enhanceAnchors();
  });

  return {
    uiOptions,
    hasMeta,
    formatReadingTime,
    proseClass,
    containerClass,
    bodyEl,
    titleId
  };
}
