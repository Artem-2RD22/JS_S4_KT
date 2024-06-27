import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles.css';

const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch('loadCart'); //загрузка корзины из Localstorage
store.dispatch('loadFavorites'); //Загрузка избранного из Localstorage

app.mount('#app');
