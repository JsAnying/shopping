import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './assets/main.css'
import App from './App.vue'
import router from './router/index.js'
import { pinia } from './stores/index.js'
import { useUserStore } from './stores/user.js'
import { setUnauthorizedHandler } from './utils/request.js'

setUnauthorizedHandler(async () => {
  const current = router.currentRoute.value
  useUserStore(pinia).logout()
  if (!['login', 'register'].includes(current.name)) {
    await router.replace({ name: 'login', query: { redirect: current.fullPath } })
  }
})

createApp(App).use(pinia).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
