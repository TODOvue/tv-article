import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@todovue/tv-article',
    configKey: 'tvArticle'
  },
  setup(_options, nuxt) {
    const articleCss = '@todovue/tv-article/style.css';
    const labelCss = '@todovue/tv-label/style.css';
    const alertCss = '@todovue/tv-alert/style.css';
    
    const pushUnique = (path) => {
      if (!nuxt.options.css.includes(path)) {
        nuxt.options.css.push(path);
      }
    };
    
    pushUnique(articleCss);
    pushUnique(labelCss);
    pushUnique(alertCss);
  }
})
