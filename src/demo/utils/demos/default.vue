<template>
  <TvArticle :content="articleContent" />
</template>

<script setup>
import { ref } from 'vue';
import { TvArticle } from '@todovue/tv-article';

const articleContent = ref({
  title: "Ejemplo de artículo",
  description: "Un artículo de ejemplo simple",
  date: "2025-10-21",
  readingTime: 3,
  tags: ["Demo", "Ejemplo"],
  body: `
    <h2 id="introduccion">Introducción</h2>
    <p>Este es un artículo de demostración.</p>

    <h3 id="contenido">Contenido</h3>
    <p>Aquí va el contenido del artículo.</p>
  `
});
</script>
