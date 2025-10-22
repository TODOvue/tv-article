<script setup>
import { TvLabel } from '@todovue/tv-label';
import { TvRelativeTime } from '@todovue/tv-relative-time';
import { computed, onMounted, nextTick, watch, ref } from 'vue';
import { useArticle } from '../composables/useArticle.js';

const props = defineProps({
  content: {
    type: Object,
    default: () => ({
      title: '',
      body: ''
    }),
    validator: (value) => {
      return value && typeof value === 'object';
    }
  },
  ui: {
    type: Object,
    default: () => ({})
  },
  lang: {
    type: String,
    default: 'en'
  }
});

const emit = defineEmits(['anchor-copied']);

const {
  formatReadingTime,
  uiOptions,
  hasMeta,
} = useArticle(props.content, props.ui, props.lang);

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

    ensureRelativePosition(heading);
    heading.appendChild(createAnchorButton(id));
  });
}

function ensureRelativePosition(el) {
  const computed = window.getComputedStyle(el).position;
  if (computed === 'static') el.style.position = 'relative';
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
    emit('anchor-copied', id);
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

watch(() => props.content?.body, async () => {
  await nextTick();
  if (bodyEl.value) {
    bodyEl.value.querySelectorAll('.tv-anchor').forEach(el => el.remove());
  }
  enhanceAnchors();
});
</script>

<template>
  <article :class="containerClass">
    <slot name="header">
      <header v-if="uiOptions.showTitle || uiOptions.showMeta || (uiOptions.showCover && content.cover)" class="tv-article__header">
        <h1 v-if="uiOptions.showTitle && content.title" class="tv-article__title">
          {{ content.title }}
        </h1>

        <p v-if="content.description" class="tv-article__description">
          {{ content.description }}
        </p>

        <div v-if="uiOptions.showMeta && hasMeta" class="tv-article__meta">
          <div v-if="content.date" class="tv-article__meta-item">
            <tv-relative-time :lang="lang" show-full-date :date="content.date"/>
          </div>

          <div v-if="formatReadingTime" class="tv-article__meta-item">
            <span>{{ formatReadingTime }}</span>
          </div>

          <div v-if="content.tags && content.tags.length" class="tv-article__tags">
            <tv-label
              v-for="tag in content.tags"
              :key="typeof tag === 'object' ? tag.tag : tag"
              :color="typeof tag === 'object' ? tag.color : '#4FC08D'"
            >
              {{ typeof tag === 'object' ? tag.tag : tag }}
            </tv-label>
          </div>
        </div>

        <figure v-if="uiOptions.showCover && content.cover" class="tv-article__cover">
          <img
            :src="content.cover"
            :alt="content.coverAlt || content.title || 'Imagen de portada'"
            class="tv-article__cover-image"
            decoding="async"
            loading="lazy"
          />
          <figcaption v-if="content.coverCaption" class="tv-article__cover-caption">
            {{ content.coverCaption }}
          </figcaption>
        </figure>
      </header>
    </slot>

    <slot name="before" />

    <div :class="proseClass">
      <div v-if="content.body" v-html="content.body" ref="bodyEl" class="tv-article__body"></div>
      <slot v-else />
    </div>

    <slot name="after" />

    <slot name="footer" />
  </article>
</template>

<style scoped lang="scss" src="../assets/scss/style.scss"></style>
