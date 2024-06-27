<template>
    <section v-if="product" class="main-info">
        <div class="images">
            <div class="product-images">
                <div v-for="(image, index) in product.images" :key="index" class="image"
                    :style="{ backgroundImage: `url(http://localhost:1452/${image})` }"></div>
            </div>
            <div class="main-image" :style="{ backgroundImage: `url(http://localhost:1452/${product.images[0]})` }">
            </div>
        </div>
        <div class="info">
            <div class="content">
                <div class="title">
                    <div class="product-name">{{ product.name }}</div>
                    <div class="price">
                        <div class="current-price" v-if="product.discount_price">{{ product.discount_price }}</div>
                        <div class="original-price" v-if="product.discount_price">{{ product.price }}</div>
                        <div class="current-price" v-else>{{ product.price }}</div>
                    </div>
                </div>
                <div class="details">
                    <div v-for="(characteristic, index) in randomCharacteristics" :key="index" class="detail">
                        {{ characteristic.characteristic }}: {{ characteristic.value }}<span
                            v-if="characteristic.unit_type !== 'значение'"> {{ characteristic.unit_type }}</span>
                    </div>
                </div>
                <div class="description">
                    Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging
                    throughout the day. Incredible photos even in weak, yearend in bright lighting using the new system
                    with two cameras
                    <a href="#">more...</a>
                </div>
                <div class="buttons">
                    <div class="button wishlist" :class="{ 'in-wishlist': isInWishlist }" @click="addProductToWishlist"
                        v-if="!isInWishlist">
                        Add to Wishlist
                    </div>
                    <div class="button wishlist in-wishlist" v-else>
                        In Wishlist
                    </div>
                    <div class="button cart" :class="{ 'in-cart': isInCart }" @click="addProductToCart"
                        v-if="product.is_available && !isInCart">
                        Add to Cart
                    </div>
                    <div class="button cart in-cart" v-else-if="isInCart && product.is_available">
                        In Cart
                    </div>
                    <div class="button cart not-available" v-else>
                        Not Available
                    </div>
                </div>
                <div class="icons">
                    <div class="feature">
                        <div class="icon delivery"></div>
                        <div class="feature-text-block">
                            <div class="feature-text">Free Delivery</div>
                            <div class="feature-value">{{ product.is_available ? '1-2 Days' : 'N/A' }}</div>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="icon stock"></div>
                        <div class="feature-text-block">
                            <div class="feature-text">In Stock</div>
                            <div class="feature-value">{{ product.is_available ? 'Today' : 'N/A' }}</div>
                        </div>
                    </div>
                    <div class="feature">
                        <div class="icon guaranteed"></div>
                        <div class="feature-text-block">
                            <div class="feature-text">Guaranteed</div>
                            <div class="feature-value">{{ calculateGuarantee(product.guarantee) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ProductInfo',
    props: ['product'],
    data() {
        return {
            randomCharacteristics: [],
        };
    },
    computed: {
        ...mapState(['cart', 'favorites']), // Подключение состояний корзины и избранного из Vuex
        isInCart() {
            // Проверка, находится ли продукт в корзине
            return this.cart.some(cartItem => cartItem.id === this.product.id);
        },
        isInWishlist() {
            // Проверка, находится ли продукт в избранном
            return this.favorites.some(favoriteItem => favoriteItem.id === this.product.id);
        },
    },
    watch: {
        product: {
            immediate: true, // Немедленный вызов обработчика при инициализации компонента
            handler(newProduct) {
                // Выводим 6 случайных характеристик продукта
                if (newProduct && newProduct.characteristics) {
                    const shuffled = newProduct.characteristics.sort(() => 0.5 - Math.random());
                    this.randomCharacteristics = shuffled.slice(0, 6);
                }
            },
        },
    },
    methods: {
        ...mapActions(['addToCart', 'addToFavorites']), // Подключение действий для добавления в корзину и избранное
        addProductToCart() {
            // Добавление продукта в корзину, если его там еще нет
            if (!this.isInCart) {
                this.addToCart(this.product);
            }
        },
        addProductToWishlist() {
            // Добавление продукта в избранное, если его там еще нет
            if (!this.isInWishlist) {
                this.addToFavorites(this.product);
            }
        },
        calculateGuarantee(months) {
            // Расчет срока гарантии в годах или месяцах
            if (!months) return 'N/A';
            const years = months / 12;
            return years >= 1 ? `${Math.floor(years)} year${years >= 2 ? 's' : ''}` : `${months} months`;
        },
    },
};
</script>



<style scoped>
.main-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 112px 160px;
    gap: 48px;
    background-color: #ffffff;
}

.images {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 48px;
}

.product-images {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}

.image {
    width: 75px;
    height: 93px;
    background-size: cover;
    background-position: center;
}

#image-57 {
    opacity: 1;
}

.main-image {
    width: 413px;
    height: 516px;
    background-size: cover;
    background-position: center;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.title {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.product-name {
    font-family: 'ABeeZee', sans-serif;
    font-size: 40px;
    font-style: italic;
    color: #000000;
}

.price {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.current-price {
    font-family: 'ABeeZee', sans-serif;
    font-size: 32px;
    font-style: italic;
    color: #000000;
}

.original-price {
    font-family: 'Abel', sans-serif;
    font-size: 24px;
    text-decoration: line-through;
    color: #A0A0A0;
}

.details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.detail {
    padding: 16px;
    background: #F4F4F4;
    border-radius: 7px;
    font-family: 'Abel', sans-serif;
    font-size: 14px;
    color: #C4C4C4;
    text-align: center;
}

.description {
    font-family: 'Abel', sans-serif;
    font-size: 14px;
    line-height: 24px;
    color: #6C6C6C;
}

.buttons {
    display: flex;
    flex-direction: row;
    gap: 16px;
}

.button {
    padding: 16px 56px;
    border-radius: 6px;
    font-family: 'ABeeZee', sans-serif;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
}

.wishlist {
    background: #FFFFFF;
    border: 1px solid #000000;
    color: #000000;
}

.cart {
    background: #000000;
    color: #FFFFFF;
}

.icons {
    display: flex;
    flex-direction: row;
    gap: 32px;
}

.feature {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    border-radius: 8px;
}

.feature-text-block {
    display: flex;
    flex-direction: column;
}

.icon {
    width: 56px;
    height: 56px;
    background: #F6F6F6;
    border-radius: 11px;
    background-size: initial;
    background-position: center;
    background-repeat: no-repeat;
}

.icon.delivery {
    background-image: url('../assets/Icon/delivery-truck-svgrepo-com_(1)_1.png');
}

.icon.stock {
    background-image: url('../assets/Icon/shop-2-svgrepo-com_2.png');
}

.icon.guaranteed {
    background-image: url('../assets/Icon/verify.png');
}

.feature-text {
    font-family: 'ABeeZee', sans-serif;
    font-size: 14px;
    font-style: italic;
    color: #717171;
}

.feature-value {
    font-family: 'ABeeZee', sans-serif;
    font-size: 14px;
    font-style: italic;
    color: #000000;
}
</style>