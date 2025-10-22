<script setup>
import { computed } from 'vue';
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
  }
});

defineEmits(['anchor-copied']);

const {
  formatReadingTime,
  formatDate,
  uiOptions,
  hasMeta,
} = useArticle(props.content, props.ui);

// TODO: Funcionalidad de copiar anclas para h2/h3
// const { copiedAnchor, generateSlug, copyAnchorLink } = useArticle(props.content, props.ui);
// const handleAnchorCopy = (id) => copyAnchorLink(id, emit);

const proseClass = computed(() => {
  return `tv-prose tv-prose--${uiOptions.value.proseSize}`;
});

const containerClass = computed(() => {
  return {
    'tv-article': true,
    'tv-article--centered': uiOptions.value.center
  };
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
            <!-- TODO: integrar tv-relative-time cuando esté disponible -->
            <!-- <tv-relative-time :date="content.date" /> -->
            <time :datetime="content.date">{{ formatDate(content.date) }}</time>
          </div>

          <div v-if="formatReadingTime" class="tv-article__meta-item">
            <span>{{ formatReadingTime }}</span>
          </div>

          <div v-if="content.tags && content.tags.length" class="tv-article__tags">
            <!-- TODO: integrar tv-label cuando esté disponible -->
            <span
              v-for="tag in content.tags"
              :key="tag"
              class="tv-article__tag"
            >
              {{ tag }}
            </span>
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
      <div v-if="content.body" v-html="content.body" class="tv-article__body"></div>
      <slot v-else />
    </div>

    <slot name="after" />

    <slot name="footer" />
  </article>
</template>

<style scoped lang="scss" src="../assets/scss/style.scss"></style>
