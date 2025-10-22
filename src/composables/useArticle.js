import { computed, ref, onMounted, nextTick, watch } from 'vue';

export function useArticle(content, ui = {}, lang = 'en', emit) {
  const defaultUI = {
    showTitle: true,
    showMeta: true,
    showCover: true,
    center: true,
    proseSize: 'full'
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

  const formatReadingTime = computed(() => {
    const minutes = content.readingTime ? Math.ceil(content.readingTime) : estimatedMinutes.value;
    if (!minutes) return null;
    const i18n = {
      en: (m) => `${m} min read`,
      es: (m) => `${m} min de lectura`,
      fr: (m) => `${m} min de lecture`,
      pt: (m) => `${m} min de leitura`
    };
    const normalize = (lang || 'en').slice(0, 2).toLowerCase();
    return (i18n[normalize] || i18n.en)(minutes);
  });

  // Clases calculadas para el contenedor y la prosa
  const proseClass = computed(() => {
    return `tv-prose tv-prose--${uiOptions.value.proseSize}`;
  });

  const containerClass = computed(() => {
    return {
      'tv-article': true,
      'tv-article--centered': uiOptions.value.center
    };
  });

  const bodyEl = ref(null);

  function enhanceAnchors() {
    const root = bodyEl.value;
    if (!root) return;

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
    btn.setAttribute('aria-label', 'Copy link');
    btn.title = 'Copy link';
    btn.textContent = '#';
    btn.addEventListener('click', (e) => handleAnchorClick(e, id));
    return btn;
  }

  async function handleAnchorClick(e, id) {
    e.stopPropagation();
    const url = buildAnchorUrl(id);

    try {
      await copyToClipboard(url);
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
    bodyEl
  };
}
