<template>
  <div class="product">
    <SiteHeader />
    <ProductInfo :product="product" />
    <ProductDetails :product="product" />
    <ProductReviews :product="product" />
    <DiscountedProducts />
    <SiteFooter />
  </div>
</template>

<script>
import axios from 'axios';
import SiteHeader from '@/components/SiteHeader.vue';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import ProductReviews from '@/components/ProductReviews.vue';
import DiscountedProducts from '@/components/DiscountProducts.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  name: 'ProductPage',
  components: {
    SiteHeader,
    ProductInfo,
    ProductDetails,
    ProductReviews,
    DiscountedProducts,
    SiteFooter,
  },
  data() {
    return {
      product: null,
      productId: null,
    };
  },
  async created() {
    this.productId = this.$route.params.id;
    await this.fetchProductData();
  },
  watch: {
    '$route.params.id': {
      handler: 'fetchProductData',
      immediate: true,
    },
  },
  methods: {
    async fetchProductData() {
      // Получение ID продукта
      this.productId = this.$route.params.id;
      try {
        // Выполнение запроса для получения данных о продукте
        const response = await axios.get(`http://localhost:1452/api/products/${this.productId}`);
        this.product = response.data; // Сохранение данных о продукте
      } catch (error) {
        // Обработка ошибки при выполнении запроса
        console.error('Failed to fetch product details.', error);
      }
    },
  },

};
</script>

<style scoped>
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 100%;
  background: #FAFAFA;
  overflow: hidden;
}
</style>