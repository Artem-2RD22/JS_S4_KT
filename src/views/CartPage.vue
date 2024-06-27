<template>
    <div class="cart">
        <SiteHeader />
        <ShoppingCart />
        <SiteFooter />
    </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
    name: 'CartPage',
    components: {
        SiteHeader,
        ShoppingCart,
        SiteFooter,
    },
};
</script>

<style scoped>
.cart {
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