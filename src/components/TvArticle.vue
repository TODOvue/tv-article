<script setup>
import { TvLabel } from '@todovue/tv-label';
import { TvRelativeTime } from '@todovue/tv-relative-time';
import { TvAlert } from '@todovue/tv-alert';
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

const emit = defineEmits(['copy' , 'label-click']);
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
  copyTitleLink,
  renderedBody
} = useArticle(content, ui, lang, emit)

const contentProxy = contentComputed
const copyMsg = ref('')
const handleCopyClick = async () => {
  await copyTitleLink()
}

const handleLabelClick = (tag) => {
  emit('label-click', tag)
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
            <TvRelativeTime :date="contentProxy.date" :lang="lang" show-full-date class="tv-article__date" />
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
            @click="handleLabelClick(tag)"
          >
            {{ typeof tag === 'object' ? tag.tag : tag }}
          </TvLabel>
        </div>

        <slot
          name="cover"
          :cover="contentProxy.cover"
          :cover-alt="contentProxy.coverAlt"
          :ui="uiOptions"
        >
          <figure
            v-if="uiOptions.showCover && contentProxy.cover"
            class="tv-article__cover"
            :style="uiOptions.coverAspect ? { aspectRatio: uiOptions.coverAspect } : {}"
          >
            <img
              :src="contentProxy.cover"
              :alt="contentProxy.coverAlt || ''"
              :loading="uiOptions.coverLoading"
              :decoding="uiOptions.coverDecoding"
              :fetchpriority="uiOptions.coverFetchPriority"
            >
            <figcaption v-if="contentProxy.coverCaption" class="tv-article__cover-caption">
              {{ contentProxy.coverCaption }}
            </figcaption>
          </figure>
        </slot>
      </header>
    </slot>

    <div
      ref="bodyEl"
      :class="proseClass"
      v-html="renderedBody"
    />
  </article>
  <TvAlert />
</template>

<style></style>
