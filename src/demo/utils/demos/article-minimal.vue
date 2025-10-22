<template>
  <TvArticle :content="articleContent" :ui="uiOptions" />
</template>

<script setup>
import { ref } from 'vue';
import { TvArticle } from '@todovue/tv-article';

const articleContent = ref({
  title: "Artículo minimalista",
  body: `
    <h2 id="simple">Simple y limpio</h2>
    <p>Este artículo muestra el componente con configuración mínima, sin meta información ni portada.</p>

    <h3 id="contenido">Solo el contenido importa</h3>
    <p>Perfecto para documentación técnica o contenido donde la información es lo más importante.</p>

    <pre><code>const simple = true;
const clean = true;
const focused = simple && clean;</code></pre>

    <p>Sin distracciones, solo tu contenido brillando.</p>
  `
});

const uiOptions = ref({
  showMeta: false,
  showCover: false,
  proseSize: 'base'
});
</script>

