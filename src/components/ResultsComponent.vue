<template>
    <div class="search-results" v-if="searchResults.length">
        <ul>
            <li v-for="product in searchResults" :key="product.id">
                <router-link :to="`/product/${product.id}`">
                    <img :src="`http://localhost:1452/${product.images[0]}`" alt="product image"
                        class="product-image" />
                    {{ product.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ResultsComponent',
    computed: {
        ...mapState(['searchResults'])
    }
};
</script>

<style scoped>
.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    margin-top: 8px;
    padding: 8px;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.search-results ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.search-results li {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.search-results li a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
}

.product-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}


.search-results::-webkit-scrollbar {
    width: 8px;
}

.search-results::-webkit-scrollbar-track {
    background: transparent;
}

.search-results::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10px;
    border: 2px solid #f5f5f5;
}

.search-results::-webkit-scrollbar-thumb:hover {
    background-color: #777;
}
</style>