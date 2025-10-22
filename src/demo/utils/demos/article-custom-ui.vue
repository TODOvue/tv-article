<template>
  <TvArticle :content="articleContent" :ui="uiOptions" @anchor-copied="onAnchorCopied">
    <template #footer>
      <div class="custom-footer">
        <hr>
        <p><strong>Autor:</strong> TvArticle Team</p>
        <p><em>¿Te gustó este artículo? Compártelo con tu equipo.</em></p>
      </div>
    </template>
  </TvArticle>
</template>

<script setup>
import { ref } from 'vue';
import { TvArticle } from '@todovue/tv-article';

const onAnchorCopied = ({ id, url }) => {
  console.log('Anchor copiado:', id, url);
};

const articleContent = ref({
  title: "Tipografía y estilos de prosa",
  description: "Ejemplo de todos los elementos de tipografía soportados en TvArticle.",
  date: "2025-10-21",
  readingTime: 5,
  tags: ["Tipografía", "CSS", "Design"],
  body: `
    <h2 id="encabezados">Encabezados</h2>
    <p>Los encabezados crean jerarquía visual en tu contenido.</p>

    <h3 id="h3-ejemplo">Este es un H3</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

    <h4 id="h4-ejemplo">Este es un H4</h4>
    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

    <h5 id="h5-ejemplo">Este es un H5</h5>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>

    <h6 id="h6-ejemplo">Este es un H6</h6>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit.</p>

    <h2 id="texto-formato">Formato de texto</h2>
    <p>Puedes usar <strong>negrita</strong>, <em>cursiva</em>, y <code>código inline</code> en tus párrafos.</p>
    <p>También puedes crear <a href="#">enlaces</a> que son accesibles y visibles en ambos temas.</p>

    <h2 id="listas">Listas</h2>
    <h3 id="lista-desordenada">Lista desordenada</h3>
    <ul>
      <li>Primer elemento</li>
      <li>Segundo elemento con más texto para ver cómo se comporta el line-height</li>
      <li>Tercer elemento
        <ul>
          <li>Sub-elemento anidado</li>
          <li>Otro sub-elemento</li>
        </ul>
      </li>
    </ul>

    <h3 id="lista-ordenada">Lista ordenada</h3>
    <ol>
      <li>Paso uno</li>
      <li>Paso dos</li>
      <li>Paso tres</li>
    </ol>

    <h2 id="citas">Citas</h2>
    <blockquote>
      <p>Esta es una cita destacada que usa un borde de color y estilo itálico para diferenciarse del resto del contenido.</p>
      <p>Puede contener múltiples párrafos.</p>
    </blockquote>

    <h2 id="codigo">Bloques de código</h2>
    <p>Para snippets más largos, usa bloques de código con scroll horizontal:</p>
    <pre><code>function ejemploMuyLargo(parametro1, parametro2, parametro3, parametro4) {
  const resultado = parametro1 + parametro2 + parametro3 + parametro4;
  return resultado;
}

// Este código tiene líneas largas para demostrar el scroll horizontal
const arrayMuyLargo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];</code></pre>

    <h2 id="separadores">Separadores</h2>
    <p>Usa líneas horizontales para separar secciones:</p>
    <hr>
    <p>Contenido después del separador.</p>
  `
});

const uiOptions = ref({
  proseSize: 'lg',
  center: true
});
</script>

<style scoped>
.custom-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  font-size: 0.875rem;
  color: var(--tv-article-text-muted);
}

.custom-footer p {
  margin: 0.5rem 0;
}
</style>

