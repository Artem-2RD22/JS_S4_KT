import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [], // Список всех продуктов
    searchResults: [], // Результаты поиска
    cart: [], // Корзина
    favorites: [] // Избранное
  },
  mutations: {
    setProducts(state, products) {
      state.products = products; // Список продуктов
    },
    setSearchResults(state, results) {
      state.searchResults = results; // Результаты поиска
    },
    clearSearchResults(state) {
      state.searchResults = []; // Очистка результатов поиска
    },
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++; // Увеличение количества, если продукт уже в корзине
      } else {
        state.cart.push({ ...product, quantity: 1 }); // Добавление нового продукта в корзину
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Сохранение корзины в localStorage
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId); // Удаление продукта из корзины
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Обновление корзины в localStorage
    },
    updateCartQuantity(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity; // Обновление количества продукта в корзине
        localStorage.setItem('cart', JSON.stringify(state.cart)); // Обновление корзины в localStorage
      }
    },
    loadCart(state) {
      const cart = localStorage.getItem('cart');
      if (cart) {
        state.cart = JSON.parse(cart); // Загрузка корзины из localStorage
      }
    },
    clearCart(state) {
      state.cart = []; // Очистка корзины
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Обновление localStorage
    },
    addToFavorites(state, product) {
      const existingFavorite = state.favorites.find(item => item.id === product.id);
      if (!existingFavorite) {
        state.favorites.push(product); // Добавление продукта в избранное
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Сохранение избранного в localStorage
    },
    removeFromFavorites(state, productId) {
      state.favorites = state.favorites.filter(item => item.id !== productId); // Удаление продукта из избранного
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Обновление избранного в localStorage
    },
    loadFavorites(state) {
      const favorites = localStorage.getItem('favorites');
      if (favorites) {
        state.favorites = JSON.parse(favorites); // Загрузка избранного из localStorage
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('http://localhost:1452/api/products/');
        commit('setProducts', response.data); // Получение и установка продуктов
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
    },
    searchProducts({ commit, state }, query) {
      const results = state.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      commit('setSearchResults', results); // Поиск продуктов и установка результатов
    },
    clearSearchResults({ commit }) {
      commit('clearSearchResults'); // Очистка результатов поиска
    },
    addToCart({ commit }, product) {
      commit('addToCart', product); // Добавление продукта в корзину
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId); // Удаление продукта из корзины
    },
    updateCartQuantity({ commit }, { productId, quantity }) {
      commit('updateCartQuantity', { productId, quantity }); // Обновление количества продукта в корзине
    },
    loadCart({ commit }) {
      commit('loadCart'); // Загрузка корзины из localStorage
    },
    clearCart({ commit }) {
      commit('clearCart'); // Очистка корзины
    },
    addToFavorites({ commit }, product) {
      commit('addToFavorites', product); // Добавление продукта в избранное
    },
    removeFromFavorites({ commit }, productId) {
      commit('removeFromFavorites', productId); // Удаление продукта из избранного
    },
    loadFavorites({ commit }) {
      commit('loadFavorites'); // Загрузка избранного из localStorage
    }
  },
  getters: {
    cartItemCount: state => {
      return state.cart.length; // Количество товаров в корзине
    },
    cartItems: state => {
      return state.cart; // Товары в корзине
    },
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0); // Общая стоимость товаров в корзине
    },
    favoriteItemCount: state => {
      return state.favorites.length; // Количество товаров в избранном
    },
    favoriteItems: state => {
      return state.favorites; // Товары в избранном
    }
  }
});
