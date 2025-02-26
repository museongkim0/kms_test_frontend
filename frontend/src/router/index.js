import { createRouter, createMemoryHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import BoardRegist from '../components/BoardRegist.vue';

const routes = [
{ path: '/', name: 'HelloWorld', component: HelloWorld },
{ path: '/register', name: 'BoardRegist', component: BoardRegist },
];

const router = createRouter({
history: createMemoryHistory(),
routes,
});

export default router;