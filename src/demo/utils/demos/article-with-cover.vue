<template>
  <TvArticle :content="articleContent" />
</template>

<script setup>
import { ref } from 'vue';
import { TvArticle } from '@todovue/tv-article';

const articleContent = ref({
  title: "Guía completa de Nuxt Content",
  description: "Todo lo que necesitas saber sobre Nuxt Content para crear blogs y documentación increíbles.",
  date: "2025-10-20",
  readingTime: 12,
  tags: ["Nuxt", "Content", "Markdown"],
  cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&fit=crop",
  coverAlt: "Laptop con código en pantalla",
  coverCaption: "Nuxt Content hace que crear contenido sea sencillo y poderoso",
  body: `
    <h2 id="introduccion">Introducción</h2>
    <p>Nuxt Content es un módulo basado en archivos que permite crear sitios web con contenido rico usando Markdown, YAML, CSV y JSON.</p>

    <h3 id="instalacion">Instalación</h3>
    <pre><code>npm install @nuxt/content</code></pre>

    <h2 id="caracteristicas">Características destacadas</h2>
    <table>
      <thead>
        <tr>
          <th>Característica</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Markdown</td>
          <td>Soporte completo de Markdown con extensiones</td>
        </tr>
        <tr>
          <td>Syntax Highlighting</td>
          <td>Resaltado de código automático</td>
        </tr>
        <tr>
          <td>Búsqueda</td>
          <td>Búsqueda full-text integrada</td>
        </tr>
        <tr>
          <td>Hot Reload</td>
          <td>Actualización en tiempo real durante desarrollo</td>
        </tr>
      </tbody>
    </table>

    <h2 id="frontmatter">Usando Frontmatter</h2>
    <p>El frontmatter te permite añadir metadatos a tus documentos:</p>
    <pre><code>---
title: Mi artículo
description: Una descripción
tags: [nuxt, content]
---

# Contenido del artículo aquí</code></pre>

    <blockquote>
      <p>El frontmatter es parseado automáticamente y está disponible en el objeto del documento.</p>
    </blockquote>

    <hr>

    <h2 id="conclusiones">Conclusiones</h2>
    <p>Nuxt Content es la solución perfecta para crear blogs, documentación y sitios basados en contenido con Nuxt 3.</p>
  `
});
</script>

