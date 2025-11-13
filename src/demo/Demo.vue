<script setup>
import { defineAsyncComponent } from 'vue'
import { TvDemo } from '@todovue/tv-demo'
import { demos } from "./utils/mocks.js"

const TvArticle = defineAsyncComponent(/* webpackChunkName: "TvArticle" */() => import('../components/TvArticle.vue'))

</script>

<template>
  <tv-demo
    hide-background
    :component="TvArticle"
    :variants="demos"
    nameComponent="TvArticle"
    npmInstall="@todovue/tv-article"
    sourceLink="https://github.com/TODOvue/tv-article"
    urlClone="https://github.com/TODOvue/tv-article.git"
    version="1.1.0"
  ></tv-demo>
</template>

<style scoped>

</style>
