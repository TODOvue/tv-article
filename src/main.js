import { createApp } from 'vue'
import TvArticle from './demo/Demo.vue'
import '@todovue/tv-demo/style.css'
import '@todovue/tv-label/style.css'
import '@todovue/tv-alert/style.css'
import './style.scss'

const app = createApp(TvArticle)
app.mount('#tv-article')
