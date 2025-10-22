import { computed } from 'vue';

export function useArticle(content, ui = {}) {
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

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d);
  };

  const formatReadingTime = computed(() => {
    if (!content.readingTime) return null;
    const minutes = Math.ceil(content.readingTime);
    return `${minutes} min read`;
  });

  return {
    uiOptions,
    hasMeta,
    formatDate,
    formatReadingTime
  };
}

