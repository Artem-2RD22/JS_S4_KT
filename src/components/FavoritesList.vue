<template>
   <div class="favorites">
  <div class="content">
    <div class="left-side">
      <div class="favorite">Favorite</div>
      <div class="products">
        <div v-if="favoriteItems.length === 0" class="empty-cart">
          No favorites yet.
        </div>
        <div v-else>
          <div v-for="(product, index) in favoriteItems" :key="product.id">
            <div class="cart-product">
              <router-link :to="`/product/${product.id}`">
                <div class="product-image">
                  <img :src="`http://localhost:1452/${product.images[0]}`" :alt="product.name">
                </div>
              </router-link>
              <div class="product-content">
                <div class="info">
                  <router-link :to="`/product/${product.id}`">
                    <div class="product-name">{{ product.name }}</div>
                  </router-link>
                  <div class="product-id">#{{ product.id }}</div>
                </div>
              </div>
            </div>
            <div class="divider" v-if="index < favoriteItems.length - 1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    name: 'FavoritesList',
    computed: {
      ...mapState(['favorites']),
      ...mapGetters(['favoriteItems']),
    },
  };
  </script>
  
  <style scoped>
  .favorites {
    display: flex;
    flex-direction: row;
    align-items:flex-start;
    padding: 112px 160px 141px 535px;
    gap: 48px;
    width: 1440px;
    box-sizing: border-box;
  }
  
  .content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 48px;
    width: 349px;
    box-sizing: border-box;
  }
  
  .left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 40px;
    width: 349px;
    flex-grow: 1;
  }
  
  .favorite {
    width: 349px;
    height: 24px;
    font-family: 'Abel';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
    align-self: stretch;
    flex-grow: 0;
  }
  
  .products {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 40px;
    width: 324px;

    border-radius: 15px;
    flex-grow: 0;
  }
  
  .divider {
    width: 324px;
    height: 0px;
    border: 0.5px solid #A3A3A3;
    align-self: stretch;
    flex-grow: 0;
  }
  
  .cart-product {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0px;
    gap: 15px;
    width: 324px;
    height: 122px;
    align-self: stretch;
    flex-grow: 0;
  }
  
  .product-image {
    width: 90px;
    height: 90px;
    flex-grow: 0;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
  }
  
  .product-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    padding: 0px;
    row-gap: 8px;
    width: 219px;
    height: 56px;
    flex-grow: 1;
  }
  
  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 219px;
    min-width: 106px;
    height: 56px;
    flex-grow: 1;
  }
  
  .product-name {
    width: 219px;
    height: 24px;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    align-self: stretch;
    flex-grow: 0;
  }
  
  .product-id {
    width: 219px;
    height: 24px;
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
    align-self: stretch;
    flex-grow: 0;
  }
  </style>
  