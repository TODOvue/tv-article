import { computed, ref, onMounted, nextTick, watch, unref } from 'vue'

function slugify (str = '') {
  return (
    String(str)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'tv-article-title'
  )
}

export function useArticle (articleContent, ui = {}, language = 'en', emit) {
  const contentState = computed(() => unref(articleContent) || {})
  const uiState      = computed(() => unref(ui) || {})
  const langState    = computed(() => {
    const raw = unref(language)
    return typeof raw === 'string' ? raw : 'en'
  })

  const defaultUiOptions = {
    showTitle: true,
    showMeta:  true,
    showCover: true,
    center: true,
    proseSize: 'full',
    coverLoading: 'lazy',
    coverDecoding: 'async',
    coverFetchPriority: 'auto',
    coverAspect: null
  }

  const uiOptions = computed(() => ({
    ...defaultUiOptions,
    ...uiState.value
  }))

  const hasTags = computed(() => Array.isArray(contentState.value.tags) && contentState.value.tags.length > 0)
  
  const hasMeta = computed(() => {
    const { date, readingTime } = contentState.value
    return Boolean(date || readingTime || hasTags.value)
  })

  const estimatedMinutes = computed(() => {
    const { readingTime, body } = contentState.value
    
    if (readingTime) return Math.ceil(readingTime)
    if (!body || typeof body !== 'string') return null

    const text = body
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    if (!text) return null
    
    const words = text.split(' ').filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
  })

  const normalizeLang = (value) =>
    typeof value === 'string' ? value.slice(0, 2).toLowerCase() : 'en'

  const formatReadingTime = computed(() => {
    const { readingTime } = contentState.value
    const minutes = readingTime ? Math.ceil(readingTime) : estimatedMinutes.value
    if (!minutes) return null
    
    switch (normalizeLang(langState.value)) {
      case 'es': return `${minutes} min${minutes === 1 ? '' : 's'} de lectura`
      case 'fr': return `${minutes} min${minutes === 1 ? '' : 's'} de lecture`
      case 'pt': return `${minutes} min${minutes === 1 ? '' : 's'} de leitura`
      default:   return `${minutes} min${minutes === 1 ? '' : 's'} read`
    }
  })

  const proseClass = computed(() => `tv-prose tv-prose--${uiOptions.value.proseSize}`)
  
  const containerClass = computed(() => ({
    'tv-article': true,
    'tv-article--centered': Boolean(uiOptions.value.center)
  }))

  const titleId = computed(() => {
    const { title } = contentState.value
    return title ? slugify(title) : 'tv-article-title'
  })

  const bodyEl = ref(null)

  const enhanceAnchors = () => {
    const el = bodyEl.value
    if (!el) return ''
  }
  
  onMounted(() => nextTick(enhanceAnchors))
  watch(() => contentState.value.body, () => nextTick(enhanceAnchors))

  const copyTitleLink = async () => {
    try {
      const hash = `#${titleId.value}`
      await navigator.clipboard?.writeText?.(hash)
      if (emit) emit('copy', { id: titleId.value })
    } catch(error) {
      console.error('Error copying title link:', error)
    }
  }
  
  return {
    contentState,
    uiOptions,

    hasMeta,
    hasTags,
    estimatedMinutes,
    formatReadingTime,

    proseClass,
    containerClass,
    bodyEl,
    titleId,

    copyTitleLink
  }
}
