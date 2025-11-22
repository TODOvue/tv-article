import type { App, Plugin } from 'vue'
import _TvArticle from './components/TvArticle.vue'
import './style.scss'

const TvArticle = _TvArticle as typeof _TvArticle & Plugin;
TvArticle.install = (app: App) => {
  app.component('TvArticle', TvArticle)
};

export { TvArticle }

export const TvArticlePlugin: Plugin = {
  install: TvArticle.install
};
export default TvArticle;

declare module 'vue' {
  export interface GlobalComponents {
    TvArticle: typeof TvArticle;
  }
}
