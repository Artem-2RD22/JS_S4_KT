<template>
  <div class="home">
    <SiteHeader />
    <MainBanner />
    <SmallerBanner />
    <ProductCategories />
    <ProductList />
    <BannersLine />
    <DiscountProducts />
    <BottomBanner />
    <SiteFooter />
  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue';
import MainBanner from '@/components/MainBanner.vue';
import SmallerBanner from '@/components/SmallerBanner.vue';
import ProductCategories from '@/components/ProductCategories.vue';
import ProductList from '@/components/ProductList.vue';
import BannersLine from '@/components/BannersList.vue';
import DiscountProducts from '@/components/DiscountProducts.vue';
import BottomBanner from '@/components/BottomBanner.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  name: 'HomePage',
  components: {
    SiteHeader,
    MainBanner,
    SmallerBanner,
    ProductCategories,
    ProductList,
    BannersLine,
    DiscountProducts,
    BottomBanner,
    SiteFooter
  }
};
</script>

<style scoped>
.home {
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
