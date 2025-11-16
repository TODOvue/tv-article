import { createApp } from 'vue'
import { TvDemo } from '@todovue/tv-demo'
import TvArticle from './demo/Demo.vue'
import '@todovue/tv-demo/style.css'
import './style.scss'

const app = createApp(TvArticle)
app.component('TvDemo', TvDemo)
app.mount('#tv-article')
