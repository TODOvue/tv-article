import { computed } from 'vue';

export function useArticle(content, ui = {}, lang = 'en') {
  const defaultUI = {
    showTitle: true,
    showMeta: true,
    showCover: true,
    center: true,
    proseSize: 'md'
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

  return {
    uiOptions,
    hasMeta,
    formatReadingTime
  };
}
