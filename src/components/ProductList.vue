<template>
  <div class="products">
    <div class="top-tags">
      <div class="tags">
        <div class="tag-container" :class="{ selected: selectedTag === 'new' }" @click="filterProducts('new')">
          <span class="tag">New Arrival</span>
          <div class="line" v-if="selectedTag === 'new'"></div>
        </div>
        <div class="tag-container" :class="{ selected: selectedTag === 'bestseller' }"
          @click="filterProducts('bestseller')">
          <span class="tag">Bestseller</span>
          <div class="line" v-if="selectedTag === 'bestseller'"></div>
        </div>
        <div class="tag-container" :class="{ selected: selectedTag === 'featured' }"
          @click="filterProducts('featured')">
          <span class="tag">Featured Products</span>
          <div class="line" v-if="selectedTag === 'featured'"></div>
        </div>
      </div>
    </div>
    <div class="products-grid">
      <div class="row" v-for="row in chunkedProducts" :key="row[0].id">
        <div class="product-card" v-for="product in row" :key="product.id">
          <div class="top-section">
            <div class="icon-like"></div>
          </div><router-link :to="`/product/${product.id}`">
            <div class="product-image" :style="{ backgroundImage: `url(${getImageUrl(product.images[0])})` }"></div>
          </router-link>
          <div class="text-icon">
            <div class="info">
              <div class="product-name"><router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
              </div>
              <div class="product-price">
                <span v-if="product.discount_price">{{ product.discount_price }}</span>
                <span v-else>{{ product.price }}</span>
                <span v-if="product.discount_price"><sup class="original-price">{{ product.price }}</sup></span>
              </div>
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
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsList',
  data() {
    return {
      products: [],
      filteredProducts: [],
      selectedTag: 'new'
    };
  },
  computed: {
    ...mapState(['cart']), // Подключение состояния корзины из Vuex
    ...mapGetters(['cartItems']), // Подключение геттера для элементов корзины из Vuex
    chunkedProducts() {
      // Разбиение отфильтрованных продуктов на чанки по 4
      const chunkSize = 4;
      const chunks = [];
      for (let i = 0; i < this.filteredProducts.length; i += chunkSize) {
        chunks.push(this.filteredProducts.slice(i, i + chunkSize));
      }
      return chunks;
    }
  },
  methods: {
    ...mapActions(['addToCart']), // Подключение действия для добавления в корзину
    async fetchProducts() {
      // Получение продуктов с сервера
      try {
        const response = await axios.get('http://localhost:1452/api/products/');
        this.products = response.data;
        this.filterProducts(this.selectedTag); // Фильтрация продуктов по выбранному тегу
      } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
      }
    },
    filterProducts(tag) {
      // Фильтрация продуктов по тегу
      this.selectedTag = tag;
      if (tag === 'new') {
        this.filteredProducts = this.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
      } else if (tag === 'bestseller') {
        this.filteredProducts = this.products.sort((a, b) => b.count_review - a.count_review).slice(0, 8);
      } else if (tag === 'featured') {
        this.filteredProducts = this.products.sort((a, b) => b.rating - a.rating).slice(0, 8);
      }
    },
    getImageUrl(imageName) {
      // Получение URL изображения продукта
      return `http://localhost:1452/${imageName}`;
    },
    isInCart(productId) {
      // Проверка, находится ли продукт в корзине
      return this.cart.some(item => item.id === productId);
    },
    addProductToCart(product) {
      // Добавление продукта в корзину
      this.addToCart(product);
    },
  },
  created() {
    // Получение продуктов при создании компонента
    this.fetchProducts();
  }
};
</script>

<style scoped>
.products {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 160px;
  gap: 32px;
  width: 1440px;
  background: #ffffff;
}

.top-tags {
  margin-left: 160px;
}

.tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 32px;
  width: 100%;
}

.tag-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selected .tag {
  font-family: 'ABeeZee', italic;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #000000;
}

.line {
  width: 99px;
  height: 0;
  border: 2px solid #000000;
}

.tag {
  font-family: 'ABeeZee', italic;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #8b8b8b;
  cursor: pointer;
}

.products-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 16px;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  gap: 16px;
  width: 100%;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  gap: 16px;
  width: 236px;
  background: #f7f7f7;
  border-radius: 9px;
}

.top-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  gap: 8px;
  width: 236px;
}

.icon-like {
  width: 32px;
  height: 32px;
}

.product-image {
  width: 160px;
  height: 160px;
  background-size: cover;
  background-position: center;
}

.text-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 24px;
  width: 236px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 16px;
  width: 236px;
}

.product-card .product-name {
  width: 100%;
  height: 48px;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

.product-card .product-price {
  width: 100%;
  height: 24px;
  font-family: 'Abel', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.03em;
  color: #000000;
}

.product-card .product-price .original-price {
  text-decoration: line-through;
  color: #A0A0A0;
}

.product-card .button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 64px;
  gap: 8px;
  background: #000000;
  border-radius: 8px;
  flex: none;
  order: 3;
  flex-grow: 0;
  width: 58px;
  height: 24px;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #FFFFFF;
  cursor: pointer;
}
</style>
