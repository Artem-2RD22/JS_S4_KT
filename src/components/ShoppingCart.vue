<template>
    <div class="shopping-cart">
        <div class="content">
            <div class="left-side">
                <div class="shopping-cart-title">Shopping Cart</div>
                <div class="products">
                    <div v-if="cartItems.length === 0" class="empty-cart">
                        Your cart is empty.
                    </div>
                    <div v-else>
                        <div v-for="(product, index) in cartItems" :key="product.id">
                            <div class="cart-product">
                                <router-link :to="`/product/${product.id}`">
                                    <div class="product-image">
                                        <img :src="`http://localhost:1452/${product.images[0]}`" :alt="product.name">
                                    </div>
                                </router-link>
                                <div class="product-details">
                                    <div class="info">
                                        <router-link :to="`/product/${product.id}`">
                                            <div class="product-name">{{ product.name }}</div>
                                        </router-link>
                                        <div class="product-id">#{{ product.id }}</div>
                                    </div>
                                    <div class="right-side">
                                        <div class="counter">
                                            <div class="icon-no-edit"
                                                @click="updateQuantity(product.id, product.quantity - 1)">
                                                <img src="../assets/Icon/No Edit.png" alt="No Edit">
                                            </div>
                                            <input type="number" v-model="product.quantity"
                                                @change="updateQuantity(product.id, product.quantity)" class="number">
                                            <div class="icon-edit"
                                                @click="updateQuantity(product.id, product.quantity + 1)">
                                                <img src="../assets/Icon/Edit.png" alt="Edit">
                                            </div>
                                        </div>
                                        <div class="product-price">{{ displayPrice(product) }}</div>
                                        <div class="icon-close" @click="removeFromCart(product.id)">
                                            <img src="../assets/Icon/Close.png" alt="Close">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="divider" v-if="index < cartItems.length - 1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="summary">
                <div class="order-summary">Order Summary</div>
                <div class="summary-content">
                    <div class="block">
                        <div class="fields">
                            <div class="label-field">
                                <div class="label">Discount code / Promo code</div>
                                <div class="field">
                                    <input type="text" v-model="promoCode" placeholder="Code">
                                </div>
                            </div>
                            <div class="label-field">
                                <div class="label">Your bonus card number</div>
                                <div class="field">
                                    <input type="text" v-model="bonusCardNumber" placeholder="Enter Card Number">
                                    <button class="apply-button" @click="applyBonusCard">Apply</button>
                                </div>
                            </div>
                        </div>
                        <div class="prices">
                            <div class="subtotal">
                                <div class="label">Subtotal</div>
                                <div class="value">{{ subtotal }}</div>
                            </div>
                            <div class="taxes">
                                <div class="label">Estimated Tax</div>
                                <div class="value">{{ tax }}</div>
                            </div>
                            <div class="shipping">
                                <div class="label">Estimated shipping & Handling</div>
                                <div class="value">{{ shipping }}</div>
                            </div>
                            <div class="total">
                                <div class="label">Total</div>
                                <div class="value">{{ total }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="checkout-button" @click="checkout">
                        <div class="button-label">Checkout</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'ShoppingCart',
    data() {
        return {
            promoCode: '',
            bonusCardNumber: '',
        };
    },
    computed: {
        ...mapState(['cart']), // Подключение состояния корзины
        ...mapGetters(['cartItems', 'cartTotal']), // Подключение геттеров для элементов и общей стоимости корзины 
        subtotal() {
            return this.cartTotal; // Подсчет промежуточного итога
        },
        tax() {
            return (this.cartTotal * 0.1).toFixed(0); // Подсчет налога
        },
        shipping() {
            return 700; // Стоимость доставки
        },
        total() {
            return (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(0); // Общая стоимость
        },
    },
    methods: {
        ...mapActions(['removeFromCart', 'updateCartQuantity', 'clearCart']), // Подключение действий 
        updateQuantity(productId, quantity) {
            // Обновление количества продукта в корзине
            if (quantity < 1) {
                quantity = 1;
            } else {
                this.updateCartQuantity({ productId, quantity });
            }
        },
        applyBonusCard() {
            // Применение бонусной карты
        },
        checkout() {
            // Оформление заказа и очистка корзины
            this.clearCart();
        },
        displayPrice(product) {
            // Отображение цены продукта с учетом скидки
            return product.discount_price ? product.discount_price : product.price;
        }
    },
};
</script>


<style scoped>
.shopping-cart {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 112px 160px;
    gap: 48px;
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    box-sizing: border-box;
}


.content {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0;
    gap: 48px;
    width: 100%;
    max-width: 1440px;
    box-sizing: border-box;
}


.left-side {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 40px;
    width: calc(100% - 600px);
}

.shopping-cart-title {
    width: 100%;
    font-family: 'Abel';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
}

.products {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 40px;
    width: 100%;
    border-radius: 15px;
}

.empty-cart {
    font-family: 'Abel';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #A0A0A0;
}


.cart-product {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px 0;
    gap: 15px;
    width: 100%;
}


.product-image {
    width: 90px;
    height: 90px;
    flex: none;
}

.product-image img {
    width: 100%;
    height: 100%;
}


.product-details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    padding: 0;
    row-gap: 8px;
    width: calc(100% - 90px);
}


.info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 8px;
    min-width: 106px;
}

.product-name {
    width: 100%;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
}

.product-id {
    width: 100%;
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
}


.right-side {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    gap: 24px;
    flex: 1;
}


.counter {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 8px;
}

.icon-no-edit,
.icon-edit,
.icon-close {
    width: 24px;
    height: 24px;
}

.icon-no-edit img,
.icon-edit img,
.icon-close img {
    width: 100%;
    height: 100%;
}

.number {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    width: 52px;
    height: 32px;
    border: 0.5px solid #D9D9D9;
    border-radius: 4px;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: #000000;
}

.product-price {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: 0.03em;
    color: #000000;
}

.divider {
    width: 100%;
    border: 0.5px solid #A3A3A3;
}


.summary {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 56px 64px;
    gap: 40px;
    width: 100%;
    max-width: 536px;
    border: 1px solid #EBEBEB;
    border-radius: 10px;
    box-sizing: border-box;
}

.order-summary {
    width: 100%;
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
    color: #111111;
}

.summary-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    gap: 48px;
    width: 100%;
}

.block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 24px;
    width: 100%;
}

.fields {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 24px;
    width: 100%;
}

.label-field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 8px;
    width: 100%;
}

.label-field .label {
    width: 100%;
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #545454;
}

.label-field .field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    width: 100%;
    background: #FFFFFF;
    border: 0.5px solid #9F9F9F;
    border-radius: 7px;
}

.label-field .field input {
    width: 100%;
    font-family: 'Abel';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #979797;
    border: none;
}

.label-field .field input:focus {
    outline: none;
    /* Removes the default outline */
}

.label-field .apply-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 76.45px;
    height: 32px;
    border: 1px solid #000000;
    border-radius: 6px;
    background: none;
}

.apply-button .apply-label {
    width: 60.45px;
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
}

.prices {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 16px;
    width: 100%;
}

.prices .subtotal,
.prices .taxes,
.prices .shipping,
.prices .total {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.prices .label {
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
}

.prices .value {
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.03em;
    color: #000000;
}

.checkout-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 56px;
    width: 100%;
    background: #000000;
    border-radius: 6px;
    cursor: pointer;
}

.checkout-button .button-label {
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #FFFFFF;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>