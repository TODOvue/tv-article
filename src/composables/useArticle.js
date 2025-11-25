import { computed, ref, onMounted, nextTick, watch, unref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

function slugify(str = '') {
  return (
    String(str)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'tv-article-title'
  )
}

function renderMinimarkNode(node) {
  if (typeof node === 'string') {
    return node;
  }

  if (!Array.isArray(node) || node.length === 0) {
    return '';
  }

  const [tag, attrs, ...children] = node;
  const voidElements = new Set(['hr', 'br', 'img', 'input', 'meta', 'link']);

  if (tag === 'style') {
    const renderedChildren = children.map(renderMinimarkNode).join('');
    return `<${tag}>${renderedChildren}</${tag}>`;
  }

  if (tag === 'pre') {
    const code = attrs?.code;
    let language = attrs?.language;

    if (language === 'vue') {
      language = 'xml';
    }

    if (code && language && hljs.getLanguage(language)) {
      try {
        const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value;
        return `<pre class="tv-codeblock"><code class="hljs language-${language}">${highlighted}</code></pre>`;
      } catch (e) { }
    }

    const attributes = Object.entries(attrs || {})
      .map(([key, value]) => {
        if (key === '__ignoreMap' || key === 'code' || key === 'language' || key === 'meta' || key === 'style') return '';
        const attrKey = key === 'className' ? 'class' : key;
        return `${attrKey}="${String(value)}"`;
      })
      .filter(Boolean)
      .join(' ');

    const renderedChildren = children.map(renderMinimarkNode).join('');
    return `<${tag}${attributes ? ' ' + attributes : ''}>${renderedChildren}</${tag}>`;
  }

  const attributes = Object.entries(attrs || {})
    .map(([key, value]) => {
      if (tag === 'code' && key === '__ignoreMap') {
        return '__ignoreMap=""';
      }
      if (tag === 'span' && key === 'emptyLinePlaceholder') {
        return 'emptyLinePlaceholder="true"';
      }
      if (key === '__ignoreMap' || key === 'code' || key === 'language' || key === 'meta' || key === 'style') return '';

      const attrKey = key === 'className' ? 'class' : key;
      if (Array.isArray(value)) {
        return `${attrKey}="${value.join(' ')}"`;
      }
      return `${attrKey}="${String(value)}"`;
    })
    .filter(Boolean)
    .join(' ');

  if (voidElements.has(tag)) {
    return `<${tag}${attributes ? ' ' + attributes : ''}>`;
  }

  const renderedChildren = children.map(renderMinimarkNode).join('');

  return `<${tag}${attributes ? ' ' + attributes : ''}>${renderedChildren}</${tag}>`;
}

export function useArticle(articleContent, ui = {}, language = 'en', emit) {
  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  })
  const contentState = computed(() => {
    const raw = unref(articleContent) || {}
    return {
      ...raw,
      cover: raw.cover || raw.meta?.cover,
      coverAlt: raw.coverAlt || raw.meta?.coverAlt,
      coverCaption: raw.coverCaption || raw.meta?.coverCaption,
      readingTime: raw.readingTime || raw.meta?.readingTime
    }
  })
  const uiState = computed(() => unref(ui) || {})
  const langState = computed(() => {
    const raw = unref(language)
    return typeof raw === 'string' ? raw : 'en'
  })

  const renderedBody = computed(() => {
    const body = contentState.value.body || ''
    if (typeof body === 'object' && body !== null) {
      if (body.type === 'minimark' && Array.isArray(body.value)) {
        return body.value.map(renderMinimarkNode).join('');
      }
      console.warn('TvArticle: body es un objeto no reconocido:', body);
      return ''
    }
    if (typeof body === 'string' && !/<\/?[a-z][\s\S]*>/i.test(body)) {
      return md.render(body)
    }
    if (typeof body === 'string') {
      return body
    }

    return ''
  })

  const defaultUiOptions = {
    showTitle: true,
    showMeta: true,
    showCover: true,
    showCopy: true,
    center: true,
    proseSize: 'full',
    coverLoading: 'lazy',
    coverDecoding: 'async',
    coverFetchPriority: 'auto',
    coverAspect: null
  }

  const uiOptions = computed(() => {
    const merged = { ...defaultUiOptions, ...uiState.value }
    const allowedProse = new Set(['sm', 'md', 'lg', 'xl', 'full'])
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
    const { readingTime } = contentState.value
    if (readingTime != null && !Number.isNaN(Number(readingTime))) {
      return Math.max(1, Math.ceil(Number(readingTime)))
    }
    const wc = wordsCountFromHtml(renderedBody.value)
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
      default: return `${minutes} min read`
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
        } catch { }
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
        } catch { }
        btn.classList.add('is-copied')
        setTimeout(() => btn.classList.remove('is-copied'), 1200)
      })
      pre.appendChild(btn)
    })

    const anchors = el.querySelectorAll('a[href]')
    anchors.forEach(a => {
      const href = a.getAttribute('href') || ''
      const isAbsolute = /^https?:\/\//i.test(href)
      const isHash = href.startsWith('#')

      if (isAbsolute) {
        try {
          const url = new URL(href, window.location.href)
          if (url.origin !== window.location.origin) {
            a.setAttribute('target', '_blank')
            a.setAttribute('rel', 'noopener noreferrer')
            a.dataset.external = 'true'
          }
        } catch { }
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

  const copyTitleLink = async () => {
    const hash = `#${titleId.value}`
    if (!isBrowser()) {
      if (emit) emit('copy', { id: titleId.value, ok: false })
      return false
    }
    try {
      const fullUrl = window.location.origin + window.location.pathname + hash
      await navigator.clipboard.writeText(fullUrl)
      if (emit) emit('copy', { id: titleId.value, ok: true })
      return true
    } catch (err) {
      console.error('Failed to copy title link:', err)
      if (emit) emit('copy', { id: titleId.value, ok: false })
      return false
    }
  }

  onMounted(() => {
    watch([bodyEl, renderedBody], ([newEl]) => {
      if (newEl) {
        nextTick(enhanceAnchors)
      }
    }, { immediate: true })
  })

  return {
    contentState,
    uiOptions,
    hasMeta,
    hasTags,
    formatReadingTime,
    proseClass,
    containerClass,
    bodyEl,
    titleId,
    copyTitleLink,
    renderedBody
  }
}
