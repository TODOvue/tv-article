<template>
  <TvArticle :content="articleContent" />
</template>

<script setup>
import { ref } from 'vue';
import { TvArticle } from '@todovue/tv-article';

const articleContent = ref({
  title: "Introducción a Vue 3 y Composition API",
  description: "Aprende los conceptos fundamentales de Vue 3 y cómo utilizar la Composition API para crear aplicaciones más mantenibles.",
  date: "2025-10-15",
  readingTime: 8,
  tags: ["Vue", "JavaScript", "Tutorial"],
  body: `
    <h2 id="que-es-vue-3">¿Qué es Vue 3?</h2>
    <p>Vue 3 es la última versión del popular framework progresivo de JavaScript. Trae mejoras significativas en rendimiento, mejor soporte de TypeScript y la nueva <strong>Composition API</strong>.</p>

    <h3 id="caracteristicas-principales">Características principales</h3>
    <ul>
      <li>Mejor rendimiento y menor tamaño del bundle</li>
      <li>Composition API para mejor organización del código</li>
      <li>Fragmentos, Teleport y Suspense</li>
      <li>Soporte mejorado de TypeScript</li>
    </ul>

    <h2 id="composition-api">Composition API</h2>
    <p>La Composition API es una forma alternativa de escribir componentes que ofrece mejor reutilización de lógica y organización del código.</p>

    <h3 id="ejemplo-basico">Ejemplo básico</h3>
    <pre><code>import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    return { count, doubled, increment };
  }
}</code></pre>

    <blockquote>
      <p>La Composition API no reemplaza la Options API, ambas pueden coexistir en el mismo proyecto.</p>
    </blockquote>

    <h2 id="ventajas">Ventajas de Vue 3</h2>
    <ol>
      <li><strong>Rendimiento:</strong> Vue 3 es hasta 2x más rápido que Vue 2</li>
      <li><strong>Tamaño:</strong> El bundle es más pequeño gracias al tree-shaking</li>
      <li><strong>TypeScript:</strong> Soporte nativo y mejorado</li>
      <li><strong>Mantenibilidad:</strong> Mejor organización del código con Composition API</li>
    </ol>

    <h2 id="conclusion">Conclusión</h2>
    <p>Vue 3 representa un gran salto adelante para el ecosistema Vue, ofreciendo mejor rendimiento y una experiencia de desarrollo mejorada.</p>
  `
};
</script>

