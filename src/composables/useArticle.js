import { computed, ref, onMounted, nextTick, watch, unref } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import { useAlert } from '@todovue/tv-alert'
import DOMPurify from 'dompurify'

const { api } = useAlert()
const alert = api()

function slugify(str = '') {
  return (
    String(str)
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'tv-article-title'
  )
}

function parseCodeLabel(info) {
  const match = info?.match(/\[(.*?)\]/);
  return match ? match[1] : null;
}

function cleanLang(lang) {
  return lang?.replace(/\[.*?\]/, '').trim();
}

function codeGroupPlugin(md) {
  md.core.ruler.push('code_group', (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'fence') continue;

      const label = parseCodeLabel(tokens[i].info);
      if (!label) continue;

      const group = [tokens[i]];
      let nextIndex = i + 1;
      while (nextIndex < tokens.length) {
        const t = tokens[nextIndex];
        if (t.type === 'fence' && parseCodeLabel(t.info)) {
          group.push(t);
          nextIndex++;
        } else {
          break;
        }
      }

      if (group.length > 1) {
        const opening = new state.Token('html_block', '', 0);
        opening.content = '<div class="tv-code-group">';

        let headerHtml = '<div class="tv-code-group__header">';
        group.forEach((t, index) => {
          const l = parseCodeLabel(t.info);
          const activeClass = index === 0 ? ' active' : '';
          headerHtml += `<button class="tv-code-group__tab${activeClass}" data-index="${index}">${l}</button>`;
          t.info = cleanLang(t.info) + (index > 0 ? ' tv-hidden' : '');
        });
        headerHtml += '</div><div class="tv-code-group__content">';
        opening.content += headerHtml;

        const closing = new state.Token('html_block', '', 0);
        closing.content = '</div></div>';

        tokens.splice(i, 0, opening);
        tokens.splice(i + group.length + 1, 0, closing);

        i += group.length + 1;
      }
    }
  });
}

function preprocessMinimark(nodes) {
  const newNodes = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (Array.isArray(node) && node[0] === 'pre' && parseCodeLabel(node[1]?.language)) {
      const group = [node];
      let j = i + 1;
      while (j < nodes.length) {
        const nextNode = nodes[j];
        if (Array.isArray(nextNode) && nextNode[0] === 'pre' && parseCodeLabel(nextNode[1]?.language)) {
          group.push(nextNode);
          j++;
        } else {
          break;
        }
      }

      if (group.length > 1) {
        const clonedGroup = group.map(n => {
          const [tag, attrs, ...rest] = n;
          return [tag, { ...attrs }, ...rest];
        });

        const buttons = clonedGroup.map((n, idx) => {
          const lang = n[1]?.language || '';
          const label = parseCodeLabel(lang);
          n[1].language = cleanLang(lang);
          if (idx > 0) {
            n[1].class = (n[1].class || '') + ' tv-hidden';
          }
          return ['button', {
            class: `tv-code-group__tab${idx === 0 ? ' active' : ''}`,
            'data-index': idx
          }, label];
        });

        const groupNode = ['div', { class: 'tv-code-group' },
          ['div', { class: 'tv-code-group__header' }, ...buttons],
          ['div', { class: 'tv-code-group__content' }, ...clonedGroup]
        ];
        newNodes.push(groupNode);
        i = j - 1;
      } else {
        newNodes.push(node);
      }
    } else {
      newNodes.push(node);
    }
  }
  return newNodes;
}

function renderMinimarkNode(node) {
  if (typeof node === 'string') {
    return node
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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

    const extraClass = attrs?.class || '';
    const style = attrs?.style ? ` style="${attrs.style}"` : '';

    if (code && language && hljs.getLanguage(language)) {
      try {
        const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value;
        return `<pre class="tv-codeblock ${extraClass}"${style}><code class="hljs language-${language}">${highlighted}</code></pre>`;
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
    html: true,
    highlight: function (str, lang) {
      let clean = lang || '';
      const isHidden = clean.includes('tv-hidden');
      clean = clean.replace('tv-hidden', '').trim();
      const style = isHidden ? ' style="display: none;"' : '';
      const extraClass = isHidden ? ' tv-hidden' : '';

      if (clean && hljs.getLanguage(clean)) {
        try {
          return `<pre class="hljs${extraClass}"${style}><code>` +
            hljs.highlight(str, { language: clean, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }

      return `<pre class="hljs${extraClass}"${style}><code>` + md.utils.escapeHtml(str) + '</code></pre>';
    }
  })
  md.use(codeGroupPlugin);
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
    let htmlContent = ''

    if (typeof body === 'object' && body !== null) {
      if (body.type === 'minimark' && Array.isArray(body.value)) {
        const processedValue = preprocessMinimark(body.value);
        htmlContent = processedValue.map(renderMinimarkNode).join('');
      } else {
        console.warn('TvArticle: body es un objeto no reconocido:', body);
        return ''
      }
    } else if (typeof body === 'string' && !/<\/?[a-z][\s\S]*>/i.test(body)) {
      htmlContent = md.render(body)
    } else if (typeof body === 'string') {
      htmlContent = body
    } else {
      return ''
    }

    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 'strike', 'del', 'ins', 'mark',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li',
          'blockquote', 'pre', 'code',
          'a', 'img',
          'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
          'div', 'span', 'section', 'article', 'header', 'footer', 'nav', 'aside',
          'figure', 'figcaption',
          'hr',
          'abbr', 'cite', 'q', 'sub', 'sup', 'small',
          'dl', 'dt', 'dd',
          'button'
        ],
        ALLOWED_ATTR: [
          'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height',
          'class', 'id', 'style', 'data-*', 'aria-*',
          'type', 'aria-label', 'aria-hidden', 'aria-live',
          'loading', 'decoding', 'fetchpriority',
          '__ignoreMap', 'emptyLinePlaceholder'
        ],
        ALLOW_DATA_ATTR: true,
        ALLOW_ARIA_ATTR: true
      });
    }

    return htmlContent
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

    const tables = el.querySelectorAll('table')
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains('tv-table-wrapper')) return
      const wrapper = document.createElement('div')
      wrapper.className = 'tv-table-wrapper'
      table.parentNode.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })

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
        const message = language.value === 'es' ? 'Enlace copiado al portapapeles.' : 'Link copied to clipboard.'
        alert.success(message, {
          position: 'top-right',
          duration: 4000
        })
      })
      h.appendChild(btn)
    })

    const groups = el.querySelectorAll('.tv-code-group')
    groups.forEach((group) => {
      const header = group.querySelector('.tv-code-group__header')
      if (!header) return

      header.addEventListener('click', (ev) => {
        const btn = ev.target.closest('.tv-code-group__tab')
        if (!btn) return

        ev.stopPropagation()
        const index = btn.dataset.index

        header.querySelectorAll('.tv-code-group__tab').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')

        const content = group.querySelector('.tv-code-group__content')
        if (content) {
          const blocks = content.querySelectorAll('pre')
          blocks.forEach((block, i) => {
            if (String(i) === String(index)) {
              block.style.display = ''
              block.classList.remove('tv-hidden')
            } else {
              block.style.display = 'none'
            }
          })
        }
      })
    })

    const pres = el.querySelectorAll('pre')
    pres.forEach((pre) => {
      if (pre.querySelector('.tv-code-copy')) return
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
        const message = langState.value === 'es' ? 'Código copiado al portapapeles.' : 'Code copied to clipboard.'
        alert.success(message, {
          position: 'top-right',
          duration: 4000
        })
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
        } catch (e) { }
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
