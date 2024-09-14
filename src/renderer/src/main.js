import './assets/main.css'
import './assets/base.css'
// 图标库
import './assets/font/iconfont.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import directives  from "./CustomDirectives";
import { createPinia } from 'pinia'
import { loadingComponents } from './components'
const app = createApp(App)
loadingComponents(app)
app.use(router)
app.use(directives)
app.use(ElementPlus)
app.use(createPinia())
app.mount('#app')
