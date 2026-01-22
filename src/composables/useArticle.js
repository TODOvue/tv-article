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

const ICON_MAP = {
  js: 'js',
  javascript: 'js',
  ts: 'typescript',
  typescript: 'typescript',
  vue: 'vue',
  css: 'css',
  scss: 'sass',
  sass: 'sass',
  less: 'less',
  html: 'html',
  xml: 'xml',
  json: 'json',
  bash: 'shell',
  sh: 'shell',
  shell: 'shell',
  zsh: 'shell',
  md: 'markdown',
  markdown: 'markdown',
  npm: 'npm',
  pnpm: 'pnpm',
  yarn: 'yarn',
  bun: 'bun',
  docker: 'docker',
  dockerfile: 'docker',
  nginx: 'nginx',
  go: 'go',
  python: 'python',
  py: 'python',
  c: 'c',
  cpp: 'cpp',
  csharp: 'csharp',
  cs: 'csharp',
  java: 'java',
  php: 'php',
  ruby: 'ruby',
  rb: 'ruby',
  rust: 'rust',
  rs: 'rust',
  sql: 'database',
}

function getIconClass(lang, fileName) {
  const fileKey = fileName?.toLowerCase().trim()
  if (fileKey) {
    if (ICON_MAP[fileKey]) {
      return `tv-icon-${ICON_MAP[fileKey]}`
    }
    const ext = fileKey.split('.').pop()
    if (ext && ICON_MAP[ext]) {
      return `tv-icon-${ICON_MAP[ext]}`
    }
  }

  const key = lang?.toLowerCase().trim() || ''
  const icon = ICON_MAP[key]
  return icon ? `tv-icon-${icon}` : 'tv-icon-code'
}

function parseInfo(info, explicitFileName = null) {
  if (!info && !explicitFileName) return { lang: '', fileName: null, highlighLines: new Set() }

  const infoStr = info || ''
  const langMatch = infoStr.match(/^(\S+)/)
  const lang = langMatch ? langMatch[1] : ''

  const fileMatch = infoStr.match(/\[(.*?)\]/)
  const fileName = explicitFileName || (fileMatch ? fileMatch[1] : null)

  const linesMatch = infoStr.match(/\{([\d,-]+)\}/)
  const highlighLines = new Set()

  if (linesMatch) {
    const rangeStr = linesMatch[1]
    const ranges = rangeStr.split(',')
    ranges.forEach(range => {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number)
        for (let i = start; i <= end; i++) {
          highlighLines.add(i)
        }
      } else {
        highlighLines.add(Number(range))
      }
    })
  }
  const cleanLang = lang.replace(/\[.*?\]/, '').replace(/\{.*?\}/, '')

  return { lang: cleanLang, fileName, highlighLines }
}

function wrapLines(html, highlightedLines = new Set()) {
  if (!html) return ''
  const lines = html.split(/\r?\n/)
  if (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop()
  }

  const openTags = []
  const result = []

  lines.forEach((line, index) => {
    const lineNumber = index + 1
    const isHighlighted = highlightedLines.has(lineNumber)
    const lineClass = isHighlighted ? 'tv-line tv-line--highlighted' : 'tv-line'

    let lineContent = openTags.map(t => t.full).join('') + line

    const tagRegex = /<\/?([a-zA-Z0-9-]+)(?:\s+[^>]*?)?>/g
    let match
    while ((match = tagRegex.exec(line)) !== null) {
      const fullTag = match[0]
      const tagName = match[1]

      if (fullTag.startsWith('</')) {
        const idx = openTags.map(t => t.name).lastIndexOf(tagName)
        if (idx !== -1) {
          openTags.splice(idx, 1)
        }
      } else if (!fullTag.endsWith('/>')) {
        openTags.push({ name: tagName, full: fullTag })
      }
    }
    const closingTags = [...openTags].reverse().map(t => `</${t.name}>`).join('')
    lineContent += closingTags

    if (!lineContent) lineContent = ' '

    result.push(`<span class="${lineClass}">${lineContent}</span>`)
  })

  return result.join('\n')
}

function codeGroupPlugin(md) {
  md.core.ruler.push('code_group', (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'fence') continue;

      const info = tokens[i].info
      const { fileName } = parseInfo(info)
      if (!fileName) continue;

      const group = [tokens[i]];
      let nextIndex = i + 1;
      while (nextIndex < tokens.length) {
        const t = tokens[nextIndex];
        const { fileName: nextFileName } = parseInfo(t.info)
        if (t.type === 'fence' && nextFileName) {
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
          const { fileName, lang } = parseInfo(t.info);
          const activeClass = index === 0 ? ' active' : '';
          const iconClass = getIconClass(lang, fileName);

          headerHtml += `<button class="tv-code-group__tab${activeClass}" data-index="${index}">`;
          headerHtml += `<span class="tv-icon ${iconClass}"></span>`;
          headerHtml += `<span>${fileName}</span>`;
          headerHtml += `</button>`;
          t.info = t.info.replace(/\[.*?\]/, '').trim() + (index > 0 ? ' tv-hidden' : '');
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
    if (!Array.isArray(node) || node[0] !== 'pre') {
      newNodes.push(node);
      continue;
    }

    const attrs = node[1] || {};
    const { fileName } = parseInfo(attrs.language, attrs.filename);

    if (fileName) {
      const group = [node];
      let j = i + 1;
      while (j < nodes.length) {
        const nextNode = nodes[j];
        if (Array.isArray(nextNode) && nextNode[0] === 'pre') {
          const nextAttrs = nextNode[1] || {};
          const { fileName: nextFileName } = parseInfo(nextAttrs.language, nextAttrs.filename);
          if (nextFileName) {
            group.push(nextNode);
            j++;
            continue;
          }
        }
        break;
      }

      if (group.length > 1) {
        const clonedGroup = group.map(n => {
          const [tag, attrs, ...rest] = n;
          return [tag, { ...attrs }, ...rest];
        });

        const buttons = clonedGroup.map((n, idx) => {
          const attrs = n[1] || {};
          const rawLang = attrs.language || '';
          const rawFile = attrs.filename || null;

          const { fileName, lang } = parseInfo(rawLang, rawFile);
          const iconClass = getIconClass(lang, fileName);

          if (attrs.language) {
            attrs.language = attrs.language.replace(/\[.*?\]/, '').trim();
          }
          delete attrs.filename;

          const hideClass = ' tv-hidden';
          if (idx > 0) {
            if (attrs.className) {
              attrs.className += hideClass;
            } else {
              attrs.class = (attrs.class || '') + hideClass;
            }
          }

          return ['button', {
            class: `tv-code-group__tab${idx === 0 ? ' active' : ''}`,
            'data-index': idx
          },
            ['span', { class: `tv-icon ${iconClass}` }],
            ['span', { class: 'tv-tab-name' }, fileName]
          ];
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

const escapeHtml = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')

function renderMinimarkNode(node) {
  if (typeof node === 'string') {
    return escapeHtml(node)
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

    const extraClass = attrs?.class || attrs?.className || '';
    const style = attrs?.style ? ` style="${attrs.style}"` : '';

    const { lang: cleanLangStr, fileName, highlighLines } = parseInfo(language, attrs?.filename)

    let headerHtml = ''
    if (fileName) {
      const iconClass = getIconClass(cleanLangStr, fileName)
      headerHtml = `
       <div class="tv-code-block__header">
         <span class="tv-icon ${iconClass}"></span>
         <span class="tv-filename">${fileName}</span>
       </div>`
    }

    let highlightLang = cleanLangStr;
    if (highlightLang === 'vue') highlightLang = 'xml';

    const validLang = highlightLang && hljs.getLanguage(highlightLang) ? highlightLang : ''

    let codeContent = ''
    if (validLang && code) {
      try {
        const highlighted = hljs.highlight(code, { language: validLang, ignoreIllegals: true }).value;
        codeContent = wrapLines(highlighted, highlighLines)
      } catch (e) {
        codeContent = wrapLines(escapeHtml(code), highlighLines)
      }
    } else if (code) {
      codeContent = wrapLines(escapeHtml(code), highlighLines)
    }

    if (codeContent) {
      const preHtml = `<pre class="tv-codeblock ${extraClass}"${style}><code class="hljs language-${validLang || 'text'}">${codeContent}</code></pre>`

      if (headerHtml) {
        return `<div class="tv-code-block-wrapper">${headerHtml}${preHtml}</div>`
      }
      return preHtml
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
      let rawLang = lang || '';
      const isHidden = rawLang.includes('tv-hidden');
      rawLang = rawLang.replace('tv-hidden', '').trim();

      const { lang: clean, fileName, highlighLines } = parseInfo(rawLang);

      const style = isHidden ? ' style="display: none;"' : '';
      const extraClass = isHidden ? ' tv-hidden' : '';

      let content = '';
      if (clean && hljs.getLanguage(clean)) {
        try {
          const highlighted = hljs.highlight(str, { language: clean, ignoreIllegals: true }).value;
          content = wrapLines(highlighted, highlighLines);
        } catch (__) {
          content = wrapLines(md.utils.escapeHtml(str), highlighLines);
        }
      } else {
        content = wrapLines(md.utils.escapeHtml(str), highlighLines);
      }

      const preHtml = `<pre class="hljs${extraClass}"${style}><code>${content}</code></pre>`;
      if (fileName && !isHidden) {
        const iconClass = getIconClass(clean, fileName);
        return preHtml;
      }

      if (fileName) {
        const iconClass = getIconClass(clean, fileName);
        return `<div class="tv-code-block-wrapper"><div class="tv-code-block__header"><span class="tv-icon ${iconClass}"></span><span class="tv-filename">${fileName}</span></div>${preHtml}</div>`;
      }

      return preHtml;
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
          duration: 4000,
          title: language.value === 'es' ? 'Copiado' : 'Copied'
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
          duration: 4000,
          title: langState.value === 'es' ? 'Copiado' : 'Copied'
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
