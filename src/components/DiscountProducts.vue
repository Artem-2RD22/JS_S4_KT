<template>
  <div class="discount">
    <div class="discount-products">
      <h2>Discounts up to -50%</h2>
      <div class="products-row">
        <div class="product-card" v-for="product in products" :key="product.id">
          <div class="top-section">
            <div class="icon-like" @click="toggleFavorite(product)">
              <svg width="32" height="32" viewBox="0 0 32 32">
                <rect width="32" height="32" fill="transparent"></rect>
                <path :d="favoriteIconPath(product.id)" :fill="isFavorite(product.id) ? 'red' : '#ffffff'"
                  stroke="rgba(145, 145, 145, 0.77)" stroke-width="1.4"></path>
              </svg>
            </div>
          </div>
          <router-link :to="`/product/${product.id}`">
            <div class="product-image" :style="{ backgroundImage: `url(http://localhost:1452/${product.images[0]})` }">
            </div>
          </router-link>
          <div class="info">
            <router-link :to="`/product/${product.id}`">
              <h3>{{ product.name }}</h3>
            </router-link>
            <p class="price">${{ product.discount_price }}<sup class="original-price">{{ product.price }}</sup></p>

          </div>
          <div class="button cart" :class="{ 'in-cart': isInCart(product.id) }" @click="addProductToCart(product)"
            v-if="product.is_available && !isInCart(product.id)">
            Buy now
          </div>
          <div class="button cart in-cart" v-else-if="isInCart(product.id) && product.is_available">
            In Cart
          </div>
          <div class="button cart not-available" v-else>
            Not&nbsp;Available
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: "DiscountProducts",
  data() {
    return {
      products: [] // Локальное состояние для хранения продуктов со скидкой
    }
  },
  computed: {
    ...mapState(['cart', 'favorites']), // Подключение состояний корзины и избранного из Vuex
    ...mapGetters(['cartItems', 'favoriteItems']), // Подключение геттеров для элементов корзины и избранного
    isInCart() {
      // Проверка, находится ли продукт в корзине
      return productId => this.cart.some(cartItem => cartItem.id === productId);
    }
  },
  methods: {
    ...mapActions(['addToCart', 'addToFavorites', 'removeFromFavorites']), // Подключение действий для добавления и удаления продуктов
    async fetchDiscountProducts() {
      // Получение продуктов со скидкой с сервера
      try {
        const response = await axios.get('http://localhost:1452/api/products/');
        const discountProducts = response.data.filter(product => product.discount_price !== null);
        this.products = this.getRandomProducts(discountProducts, 4); // Сохранение случайных 4 продуктов
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
    },
    getRandomProducts(products, count) {
      // Получение случайных продуктов
      const shuffled = products.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    },
    addProductToCart(product) {
      // Добавление продукта в корзину, если его там еще нет
      if (!this.isInCart(product.id)) {
        this.addToCart(product);
      }
    },
    isFavorite(productId) {
      // Проверка, находится ли продукт в избранном
      return this.favorites.some(item => item.id === productId);
    },
    toggleFavorite(product) {
      // Переключение состояния избранного для продукта
      if (this.isFavorite(product.id)) {
        this.removeFromFavorites(product.id);
      } else {
        this.addToFavorites(product);
      }
    },
    favoriteIconPath(productId) {
      // Возвращение пути к иконке избранного в зависимости от состояния
      return this.isFavorite(productId)
        ? 'M16 29s-13-8.35-13-17a7.5 7.5 0 0 1 13-4.5A7.5 7.5 0 0 1 29 12c0 8.65-13 17-13 17z'
        : 'M16 29s-13-8.35-13-17a7.5 7.5 0 0 1 13-4.5A7.5 7.5 0 0 1 29 12c0 8.65-13 17-13 17z';
    },
  },
  created() {
    // Получение продуктов при создании компонента
    this.fetchDiscountProducts();
  }
};
</script>


<style scoped>
.discount {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100%;
  background: #FAFAFA;
  overflow: hidden;
}

.discount-products {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 80px;
  gap: 32px;
  width: 100%;
  background: #FFFFFF;
}

.discount-products h2 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: #000000;
  margin-left: 200px;
}

.products-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
  width: 100%;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 16px;
  width: 268px;
  min-width: 200px;
  background: #F7F7F7;
  border-radius: 9px;
  box-sizing: border-box;
}

.top-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}


.product-image {
  width: 160px;
  height: 160px;
  background-size: cover;
  background-position: center;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  flex-grow: 1;
}

.info h3 {
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

.price {
  font-family: 'Abel';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #000000;
}

.original-price {
  text-decoration: line-through;
  color: #A0A0A0;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 64px;
  width: 100%;
  max-width: 186px;
  background: #000000;
  border-radius: 8px;
  color: #FFFFFF;
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  box-sizing: border-box;
}
</style>
