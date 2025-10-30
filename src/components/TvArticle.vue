<script setup>
import { TvLabel } from '@todovue/tv-label';
import { TvRelativeTime } from '@todovue/tv-relative-time';
import { useArticle } from '../composables/useArticle.js';
import { toRefs, ref } from 'vue';

const props = defineProps({
  content: {
    type: Object,
    default: () => ({
      title: '',
      body: '',
    }),
    validator: (value) => value && typeof value === 'object'
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

const emit = defineEmits(['copy']);
const { content, ui, lang } = toRefs(props);

const {
  contentState: contentComputed,
  uiOptions,
  hasMeta,
  hasTags,
  formatReadingTime,
  proseClass,
  containerClass,
  bodyEl,
  titleId,
  copyTitleLink
} = useArticle(content, ui, lang, emit)

const contentProxy = contentComputed
const copyMsg = ref('')
const handleCopyClick = async () => {
  const ok = await copyTitleLink()
  copyMsg.value = ok ? 'Link copiado' : 'No se pudo copiar'
  setTimeout(() => { copyMsg.value = '' }, 1500)
}
</script>

<template>
  <article
    :class="containerClass"
    :aria-labelledby="contentProxy.title ? titleId : undefined"
  >
    <slot name="header">
      <header
        v-if="(uiOptions.showTitle || uiOptions.showMeta || (uiOptions.showCover && contentProxy.cover))"
        class="tv-article__header"
      >
        <div class="tv-article__header-top">
          <h1
            v-if="uiOptions.showTitle && contentProxy.title"
            class="tv-article__title"
            :id="titleId"
          >
            {{ contentProxy.title }}
          </h1>

          <button
            v-if="uiOptions.showCopy && contentProxy.title"
            class="tv-article__copy"
            type="button"
            :aria-label="`Copiar enlace a ${contentProxy.title}`"
            @click="handleCopyClick"
          >
            <span aria-hidden="true">#</span>
          </button>

          <span class="sr-only" aria-live="polite">{{ copyMsg }}</span>
        </div>

        <p v-if="uiOptions.showMeta && hasMeta" class="tv-article__meta">
          <template v-if="contentProxy.date">
            <TvRelativeTime :date="contentProxy.date" :lang="lang" class="tv-article__date" />
            <span v-if="formatReadingTime"> • </span>
          </template>
          <span v-if="formatReadingTime" class="tv-article__reading-time">
            {{ formatReadingTime }}
          </span>
        </p>

        <div v-if="uiOptions.showMeta && hasTags" class="tv-article__tags">
          <TvLabel
            v-for="tag in contentProxy.tags"
            :key="typeof tag === 'object' ? tag.tag : tag"
            :color="typeof tag === 'object' ? tag.color : '#4FC08D'"
          >
            {{ typeof tag === 'object' ? tag.tag : tag }}
          </TvLabel>
        </div>

        <figure
          v-if="uiOptions.showCover && contentProxy.cover"
          class="tv-article__cover"
          :style="uiOptions.coverAspect ? { aspectRatio: uiOptions.coverAspect } : null"
        >
          <img
            :src="contentProxy.cover"
            :alt="contentProxy.coverAlt || contentProxy.title || 'Imagen de portada'"
            class="tv-article__cover-image"
            :loading="uiOptions.coverLoading"
            :decoding="uiOptions.coverDecoding"
            :fetchpriority="uiOptions.coverFetchPriority"
          />
          <figcaption v-if="contentProxy.coverCaption" class="tv-article__cover-caption">
            {{ contentProxy.coverCaption }}
          </figcaption>
        </figure>
      </header>
    </slot>

    <slot name="before" />

    <div :class="proseClass">
      <div
        v-if="contentProxy.body"
        v-html="contentProxy.body"
        ref="bodyEl"
        class="tv-article__body"
      />
      <slot v-else />
    </div>

    <slot name="after" />
    <slot name="footer" />
  </article>
</template>

<style scoped lang="scss" src="../assets/scss/style.scss"></style>
