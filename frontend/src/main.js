import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // 상태 관리 라이브러리 등록
app.use(router); // 라우터 등록
app.mount('#app');