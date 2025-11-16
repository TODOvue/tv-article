import TvArticle from './components/TvArticle.vue'
import './style.scss'

(TvArticle as any).install = (app: any) => {
  app.component('TvArticle', TvArticle)
};

export const TvArticlePlugin = {
  install(app: any) {
    app.component('TvArticle', TvArticle)
  }
}

export { TvArticle }
export default TvArticle
