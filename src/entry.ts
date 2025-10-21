import TvArticle from './components/TvArticle.vue'

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
