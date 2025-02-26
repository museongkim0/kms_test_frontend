import { createRouter, createWebHistory } from 'vue-router';
import BoardList from '../components/BoardList.vue';
import BoardRegist from '../components/BoardRegist.vue';
import BoardDetail from '../components/BoardDetail.vue';


const routes = [
{ path: '/', name: 'BoardList', component: BoardList },
{ path: '/register', name: 'BoardRegist', component: BoardRegist },
{ path: '/detail/:id', name: 'BoardDetail', component: BoardDetail }
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;