<template>
  <header class="header-top">
    <div class="header">
      <router-link :to="`/`">
        <div class="logo">
          <img src="../assets/logo_black.png" alt="Cyber Logo" class="logo-vector" />
        </div>
      </router-link>
      <div class="search-container">
        <div class="search-field">
          <div class="search-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <rect width="24" height="24" fill="transparent"></rect>
              <circle cx="11" cy="11" r="8" stroke="#989898" stroke-width="1.5" fill="none"></circle>
              <line x1="16" y1="16" x2="21" y2="21" stroke="#989898" stroke-width="1.5"></line>
            </svg>
          </div>
          <input type="text" placeholder="Search" class="search-input" v-model="searchQuery" @input="onSearchInput" />
        </div>
        <ResultsComponent v-if="searchQuery" />
      </div>
      <div class="icons">
        <router-link :to="`/favorites`">
          <div class="icon-favorites"></div>
        </router-link>
        <router-link :to="`/cart`">
          <div class="icon-cart"></div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import ResultsComponent from '@/components/ResultsComponent.vue'; // Компонент результатов поиска

export default {
  name: 'SiteHeader',
  components: {
    ResultsComponent
  },
  data() {
    return {
      searchQuery: '' // Переменная для хранения строки поиска
    };
  },
  created() {
    this.$store.dispatch('fetchProducts'); // Загрузка продуктов при создании компонента
  },
  methods: {
    ...mapActions(['searchProducts', 'clearSearchResults']), // Подключение действий
    onSearchInput() {
      // Обработчик ввода в поле поиска
      if (this.searchQuery.trim() === '') {
        this.clearSearchResults(); // Очистка результатов поиска, если строка поиска пуста
      } else {
        this.searchProducts(this.searchQuery); // Поиск продуктов по строке поиска
      }
    }
  }
};
</script>


<style scoped>
.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #FFFFFF;
  border-bottom: 1px solid #B5B5B5;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 5%;
  gap: 32px;
  width: 1440px;
  height: 88px;
  background: #FFFFFF;
  box-sizing: border-box;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  background: #FFFFFF;
}

.logo-vector {
  width: 65.4px;
  height: 22.87px;
}

.search-container {
  position: relative;
  width: 30%;
  max-width: 372px;
}

.search-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 56px;
  background: #F5F5F5;
  border-radius: 8px;
  padding: 0 16px;
}

.search-input {
  width: 100%;
  height: 100%;
  font-family: 'ABeeZee';
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #656565;
  opacity: 0.5;
  border: none;
  background: #F5F5F5;
  outline: none;
}

.icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;
}

.icon-favorites,
.icon-cart {
  width: 32px;
  height: 32px;
  background: #fff;
  background-position: center;
  background-repeat: no-repeat;
}

.icon-favorites {
  background-image: url(../assets/Icon/favorites.png);
}

.icon-cart {
  background-image: url(../assets/Icon/cart.png);
}

.icon-favorites::before,
.icon-cart::before {
  content: '';
  display: block;
  width: 32px;
  height: 32px;
}
</style>
