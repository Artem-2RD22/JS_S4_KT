<template>
    <div class="category">
        <SiteHeader />
        <div class="category-page">
            <CategoryFilter :categoryId="categoryId" @filter="applyFilter" />
            <div class="category-content">
                <div class="top-part">
                    <div class="left-side">
                        <span class="selected-products">Selected Products:</span>
                        <span class="product-count">{{ filteredProducts.length }}</span>
                    </div>
                    <div class="dropdown" @click="toggleDropdown">
                        <span class="dropdown-label">{{ sortOptionLabel }}</span>
                        <div class="icon-chevron-down">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <rect width="24" height="24" fill="transparent"></rect>
                                <path d="M12 16l-4-4h8z" fill="#9F9F9F"></path>
                            </svg>
                        </div>
                        <ul v-if="dropdownOpen" class="dropdown-menu" @click="toggleDropdown">
                            <li @click="sortProducts('rating')">By rating</li>
                            <li @click="sortProducts('price')">By price</li>
                            <li @click="sortProducts('createdAt')">By date added</li>
                        </ul>
                    </div>
                </div>
                <div class="product-list">
                    <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
                        <div class="top-section">
                            <div class="icon-like" @click="toggleFavorite(product)">
                                <svg width="32" height="32" viewBox="0 0 32 32">
                                    <rect width="32" height="32" fill="transparent"></rect>
                                    <path :d="favoriteIconPath(product.id)"
                                        :fill="isFavorite(product.id) ? 'red' : '#ffffff'"
                                        stroke="rgba(145, 145, 145, 0.77)" stroke-width="1.4"></path>
                                </svg>
                            </div>
                        </div>
                        <router-link :to="`/product/${product.id}`">
                            <div class="image">
                                <img :src="`http://localhost:1452/${product.images[0]}`" :alt="product.name" />
                            </div>
                        </router-link>
                        <div class="info">
                            <router-link :to="`/product/${product.id}`" class="product-name">
                                <span>{{ product.name }}</span>
                            </router-link>
                            <div class="product-price">
                                <span v-if="product.discount_price">{{ product.discount_price }}</span>
                                <span v-else>{{ product.price }}</span>
                                <span v-if="product.discount_price"><sup class="original-price">{{ product.price
                                        }}</sup></span>
                            </div>
                        </div>
                        <div class="button cart" :class="{ 'in-cart': isInCart(product.id) }"
                            @click="addProductToCart(product)" v-if="product.is_available && !isInCart(product.id)">
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
                <div class="pagination" v-if="totalPages > 1">
                    <div class="arrow left" @click="prevPage" v-if="currentPage > 1"></div>
                    <div class="page-number" v-for="page in pageNumbers" :key="page"
                        :class="{ active: page === currentPage }" @click="goToPage(page)">
                        {{ page }}
                    </div>
                    <div class="arrow right" @click="nextPage" v-if="currentPage < totalPages"></div>
                </div>
            </div>
        </div>
        <SiteFooter />
    </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader.vue';
import CategoryFilter from '@/components/CategoryFilter.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import axios from 'axios';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'CategoryPage',
    components: {
        SiteHeader,
        CategoryFilter,
        SiteFooter,
    },
    data() {
        return {
            products: [], // Продукты
            filteredProducts: [], // Отфильтрованные продукты
            categoryId: this.$route.params.id, // ID категории из маршрута
            currentPage: 1, // Текущая страница
            itemsPerPage: 9, // Количество товаров на странице
            sortOption: 'rating', // Параметр сортировки
            sortOrder: 'desc', // Начальный порядок сортировки
            dropdownOpen: false, // Состояние выпадающего меню
        };
    },
    computed: {
        ...mapState(['cart', 'favorites']), // Подключение состояния корзины и избранного
        ...mapGetters(['cartItems', 'favoriteItems']), // Подключение геттеров для корзины и избранного
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage); // Расчет общего количества страниц
        },
        paginatedProducts() {
            // Разбиение продуктов на страницы
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredProducts.slice(start, end);
        },
        pageNumbers() {
            // Номера страниц для пагинации
            const total = this.totalPages;
            const current = this.currentPage;
            if (total <= 5) {
                return [...Array(total).keys()].map(n => n + 1);
            } else if (current <= 3) {
                return [1, 2, 3, 4, '...', total];
            } else if (current >= total - 2) {
                return [1, '...', total - 3, total - 2, total - 1, total];
            } else {
                return [1, '...', current - 1, current, current + 1, '...', total];
            }
        },
        sortOptionLabel() {
            // Метка текущей опции сортировки
            if (this.sortOption === 'rating') return 'By rating';
            if (this.sortOption === 'price') return 'By price';
            if (this.sortOption === 'createdAt') return 'By date added';
            return 'Сортировать по';
        }
    },
    methods: {
        ...mapActions(['addToCart', 'removeFromCart', 'addToFavorites', 'removeFromFavorites']), // Подключение действий
        applyFilter(selectedFilters) {
            // Применение фильтрации
            this.filteredProducts = this.products.filter(product => {
                return Object.keys(selectedFilters).every(key => {
                    const selectedValues = selectedFilters[key];
                    return product.characteristics.some(char => char.characteristic === key && selectedValues.has(char.value));
                });
            });
            this.sortProducts(this.sortOption); // Пересортировка после фильтрации
            this.currentPage = 1; // Сброс на первую страницу
        },
        sortProducts(option) {
            // Сортировка продуктов
            if (this.sortOption === option) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Переключение порядка сортировки
            } else {
                this.sortOrder = 'desc';
            }
            this.sortOption = option;

            const compareFn = (a, b) => {
                let valueA, valueB;
                if (option === 'price') {
                    valueA = a.discount_price ? a.discount_price : a.price;
                    valueB = b.discount_price ? b.discount_price : b.price;
                } else {
                    valueA = a[option];
                    valueB = b[option];
                }
                if (this.sortOrder === 'asc') {
                    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
                } else {
                    return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
                }
            };

            this.filteredProducts.sort(compareFn);
            this.dropdownOpen = false; // Закрытие выпадающего меню после выбора
        },
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen; // Переключение состояния выпадающего меню
        },
        goToPage(page) {
            if (page !== '...') {
                this.currentPage = page; // Переход на указанную страницу
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--; // Переход на предыдущую страницу
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++; // Переход на следующую страницу
            }
        },
        isInCart(productId) {
            return this.cart.some(item => item.id === productId); // Проверка наличия продукта в корзине
        },
        addProductToCart(product) {
            this.addToCart(product); // Добавление продукта в корзину
        },
        isFavorite(productId) {
            return this.favorites.some(item => item.id === productId); // Проверка наличия продукта в избранном
        },
        toggleFavorite(product) {
            // Переключение состояния избранного
            if (this.isFavorite(product.id)) {
                this.removeFromFavorites(product.id);
            } else {
                this.addToFavorites(product);
            }
        },
        favoriteIconPath(productId) {
            // Иконка избранного
            return this.isFavorite(productId)
                ? 'M16 29s-13-8.35-13-17a7.5 7.5 0 0 1 13-4.5A7.5 7.5 0 0 1 29 12c0 8.65-13 17-13 17z'
                : 'M16 29s-13-8.35-13-17a7.5 7.5 0 0 1 13-4.5A7.5 7.5 0 0 1 29 12c0 8.65-13 17-13 17z';
        },
    },
    async created() {
        // Получение продуктов при создании компонента
        try {
            const response = await axios.get(`http://localhost:1452/api/category/${this.categoryId}`);
            this.products = response.data;
            this.filteredProducts = this.products;
            this.sortProducts(this.sortOption); // Первоначальная сортировка
        } catch (error) {
            console.error('Ошибка при получении продуктов:', error);
        }
    },
};
</script>


<style scoped>
.category {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    width: 100%;
    background: #FAFAFA;
    overflow: hidden;
}

.category-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px;
}

.category-content {
    flex: 1;
    margin-left: 20px;
}

.product-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 16px;
    gap: 16px;
    width: 236px;
    min-width: 200px;
    background: #F7F7F7;
    border-radius: 9px;
}

.product-card .top-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 100%;
    height: 32px;
    position: relative;
}

.product-card .icon-like {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 0;
    right: 0;
}

.product-card .image {
    width: 160px;
    height: 160px;
    flex: none;
    order: 1;
    flex-grow: 0;
}

.product-card .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-card .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 16px;
    width: 100%;
    height: 88px;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
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

.product-card .not-available {
    padding: 12px 64px;
    cursor: default;
}

.product-card .in-cart {
    padding: 12px 64px;
    cursor: default;
}

.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-left: 360px;
    padding: 0px;
    gap: 16px;
    width: 276px;
    height: 32px;
    margin-top: 20px;
}

.pagination .arrow {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.pagination .arrow.left {
    transform: rotate(90deg);
}

.pagination .arrow.right {
    transform: rotate(-90deg);
}

.pagination .page-number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px 11px;
    gap: 8px;
    width: 32px;
    height: 32px;
    background: #F6F6F6;
    border-radius: 5px;
    font-family: 'ABeeZee';
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.03em;
    color: #000000;
    cursor: pointer;
}

.pagination .page-number.active {
    background: #000000;
    color: #FFFFFF;
}

.pagination .dots {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px 0px 3px;
    gap: 4px;
    width: 24px;
    height: 6px;
}

.pagination .dot {
    width: 3px;
    height: 3px;
    background: #737373;
}

.top-part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding: 0;
    width: 100%;
    height: 40px;
}

.left-side {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0;
    gap: 6px;
}

.selected-products {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: #6C6C6C;
}

.product-count {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.03em;
    color: #000000;
}

.dropdown {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 32px;
    padding: 8px 16px;
    gap: 8px;
    width: 256px;
    min-width: 140px;
    max-width: 256px;
    height: 40px;
    background: #FFFFFF;
    border: 0.5px solid #D4D4D4;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
}

.dropdown-label {
    margin: 0 auto;
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    display: flex;
    align-items: center;
    letter-spacing: -0.005em;
    color: #000000;
}

.icon-chevron-down {
    margin: 0 auto;
    width: 24px;
    height: 24px;
}

.icon-chevron-down svg {
    position: absolute;
    left: 85%;
    top: 22.5%;

}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #FFF;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 1;
    list-style: none;
    padding: 0;
    margin: 0;
}

.dropdown-menu li {
    padding: 10px 16px;
    cursor: pointer;
    font-family: 'Abel', sans-serif;
    font-size: 15px;
    color: #000;
}

.dropdown-menu li:hover {
    background: #F5F5F5;
}
</style>