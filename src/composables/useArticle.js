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
    showCopy:  true,
    center: true,
    proseSize: 'full',
    coverLoading: 'lazy',
    coverDecoding: 'async',
    coverFetchPriority: 'auto',
    coverAspect: null
  }
  
  const uiOptions = computed(() => {
    const merged = { ...defaultUiOptions, ...uiState.value }
    const allowedProse = new Set(['sm','md','lg','xl','full'])
    if (!allowedProse.has(merged.proseSize)) merged.proseSize = 'full'
    return merged
  })
  
  const hasMeta = computed(() => {
    const { date, readingTime } = contentState.value
    return Boolean(date || readingTime)
  })
  
  const hasTags = computed(() => {
    const tags = contentState.value.tags
    return Array.isArray(tags) && tags.length > 0
  })
  
  const wordsCountFromHtml = (html) => {
    if (!html || typeof html !== 'string') return 0
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    const text = tmp.textContent || tmp.innerText || ''
    const words = text.trim().split(/\s+/).filter(Boolean)
    return words.length
  }
  
  const estimatedMinutes = computed(() => {
    const { readingTime, body } = contentState.value
    if (readingTime != null && !Number.isNaN(Number(readingTime))) {
      return Math.max(1, Math.ceil(Number(readingTime)))
    }
    const wc = wordsCountFromHtml(body)
    if (!wc) return null
    return Math.max(1, Math.ceil(wc / 200))
  })
  
  const normalizeLang = (value) =>
    typeof value === 'string' ? value.slice(0, 2).toLowerCase() : 'en'
  
  const formatReadingTime = computed(() => {
    const minutes = estimatedMinutes.value
    if (!minutes) return null
    switch (normalizeLang(langState.value)) {
      case 'es': return `${minutes} min de lectura`
      case 'fr': return `${minutes} min de lecture`
      case 'pt': return `${minutes} min de leitura`
      default:   return `${minutes} min read`
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
  
  const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'
  
  const enhanceAnchors = () => {
    if (!isBrowser()) return
    const el = bodyEl.value
    if (!el) return
    
  const headingSelector = 'h1, h2, h3, h4, h5, h6'
    const headings = el.querySelectorAll(headingSelector)
    headings.forEach((h) => {
      if (h.classList.contains('tv-heading-anchor')) return
      const text = (h.textContent || '').trim()
      if (!text) return
      if (!h.id) h.id = slugify(text)
      h.classList.add('tv-heading-anchor')
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'tv-anchor-btn'
      btn.setAttribute('aria-label', `Copy link to ${text}`)
      btn.innerHTML = '<span aria-hidden="true">#</span>'
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation()
        const hash = `#${h.id}`
        const full = (typeof window !== 'undefined') ? (window.location.origin + window.location.pathname + hash) : hash
        try {
          if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(full)
          } else {
            const ta = document.createElement('textarea')
            ta.value = full
            ta.style.position = 'fixed'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.focus(); ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
          }
        } catch {}
        btn.classList.add('is-copied')
        setTimeout(() => btn.classList.remove('is-copied'), 1200)
      })
      h.appendChild(btn)
    })
    
    const pres = el.querySelectorAll('pre')
    pres.forEach((pre) => {
      if (pre.classList.contains('tv-codeblock')) return
      pre.classList.add('tv-codeblock')
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'tv-code-copy'
      btn.setAttribute('aria-label', 'Copy code')
      btn.innerHTML = '<span aria-hidden="true">⧉</span>'
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation()
        const code = pre.querySelector('code')
        const text = code ? code.innerText : pre.innerText
        try {
          if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text)
          } else {
            const ta = document.createElement('textarea')
            ta.value = text
            ta.style.position = 'fixed'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.focus(); ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
          }
        } catch {}
        btn.classList.add('is-copied')
        setTimeout(() => btn.classList.remove('is-copied'), 1200)
      })
      pre.appendChild(btn)
    })
    
    const anchors = el.querySelectorAll('a[href]')
    anchors.forEach(a => {
      const href = a.getAttribute('href') || ''
      const isAbsolute = /^https?:\/\//i.test(href)
      const isHash     = href.startsWith('#')
      
      if (isAbsolute) {
        try {
          const url = new URL(href, window.location.href)
          if (url.origin !== window.location.origin) {
            a.setAttribute('target', '_blank')
            a.setAttribute('rel', 'noopener noreferrer')
            a.dataset.external = 'true'
          }
        } catch {}
      }
      
      if (isHash) {
        a.addEventListener('click', (ev) => {
          const id = href.slice(1)
          const target = document.getElementById(id)
          if (target) {
            ev.preventDefault()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            history.pushState(null, '', `#${id}`)
          }
        }, { passive: false })
      }
    })
  }
  
  onMounted(() => nextTick(enhanceAnchors))
  watch(() => contentState.value.body, () => nextTick(enhanceAnchors))
  
  const copyTitleLink = async () => {
    const hash = `#${titleId.value}`
    if (!isBrowser()) {
      if (emit) emit('copy', { id: titleId.value, ok: false })
      return false
    }
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(hash)
      } else {
        const ta = document.createElement('textarea')
        ta.value = hash
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.focus()
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      if (emit) emit('copy', { id: titleId.value, ok: true })
      return true
    } catch (e) {
      if (emit) emit('copy', { id: titleId.value, ok: false, error: e })
      return false
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
