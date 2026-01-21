<script setup>
import { defineAsyncComponent } from 'vue'
import { demos } from "./utils/mocks.js"

const TvArticle = defineAsyncComponent(/* webpackChunkName: "TvArticle" */() => import('../components/TvArticle.vue'))
</script>

<template>
  <TvDemo
    hide-background
    :component="TvArticle"
    :variants="demos"
    :manual-emits="['copy', 'label-click']"
    component-name="TvArticle"
    npm-install="@todovue/tv-article"
    source-link="https://github.com/TODOvue/tv-article"
    url-clone="https://github.com/TODOvue/tv-article.git"
    version="1.3.0"
  />
</template>

<style scoped>

</style>
