<script setup>
import { TvLabel } from '@todovue/tv-label';
import { TvRelativeTime } from '@todovue/tv-relative-time';
import { useArticle } from '../composables/useArticle.js';
import { toRefs } from 'vue';

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

const { content, ui, lang } = toRefs(props);

const {
  formatReadingTime,
  uiOptions,
  hasMeta,
  proseClass,
  containerClass,
  bodyEl,
  titleId
} = useArticle(content, ui, lang, emit);
</script>

<template>
  <article :class="containerClass" :aria-labelledby="content.title ? titleId : undefined">
    <slot name="header">
      <header v-if="uiOptions.showTitle || uiOptions.showMeta || (uiOptions.showCover && content.cover)" class="tv-article__header">
        <h1 v-if="uiOptions.showTitle && content.title" class="tv-article__title" :id="titleId">
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

        <figure v-if="uiOptions.showCover && content.cover" class="tv-article__cover" :style="uiOptions.coverAspect ? { aspectRatio: uiOptions.coverAspect } : null">
          <img
            :src="content.cover"
            :alt="content.coverAlt || content.title || 'Imagen de portada'"
            class="tv-article__cover-image"
            :decoding="uiOptions.coverDecoding"
            :loading="uiOptions.coverLoading"
            :fetchpriority="uiOptions.coverFetchPriority"
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
