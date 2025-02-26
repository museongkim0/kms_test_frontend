import { createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardRegist from '../components/BoardRegist.vue';


const routes = [
{ path: '/', name: 'BoardList', component: BoardList },
{ path: '/register', name: 'BoardRegist', component: BoardRegist },
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;