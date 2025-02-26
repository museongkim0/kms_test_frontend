import { createRouter, createMemoryHistory } from 'vue-router';
// import Home from '../components/Home.vue';
// import About from '../components/About.vue';

const routes = [
// { path: '/', name: 'Home', component: Home },
// { path: '/about', name: 'About', component: About },
];

const router = createRouter({
history: createMemoryHistory(),
routes,
});

export default router;