<template>
    <div class="filters">
        <div v-for="(values, characteristic) in filters" :key="characteristic" class="filter-container">
            <div class="filter-header" @click="toggleCollapse(characteristic)">
                <div class="filter-title">{{ characteristic }}</div>
                <div class="icon-expand">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <rect width="24" height="24" fill="transparent"></rect>
                        <path :d="collapsed[characteristic] ? 'M12 8l-4 4h8z' : 'M12 16l-4-4h8z'" fill="#000"></path>
                    </svg>
                </div>
            </div>
            <div v-show="!collapsed[characteristic]" class="filter-content">
                <div class="filter-search">
                    <div class="search-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <rect width="24" height="24" fill="transparent"></rect>
                            <circle cx="11" cy="11" r="8" stroke="#989898" stroke-width="1.5" fill="none"></circle>
                            <line x1="16" y1="16" x2="21" y2="21" stroke="#989898" stroke-width="1.5"></line>
                        </svg>
                    </div>
                    <input type="text" class="search-input" placeholder="Search" v-model="searchTerms[characteristic]"
                        @input="filterValues(characteristic)">
                </div>
                <div class="filter-list">
                    <div v-for="value in filteredValues[characteristic]" :key="value" class="filter-item">
                        <div class="checkbox" :class="{ checked: isSelected(characteristic, value) }"
                            @click="toggleFilter(characteristic, value)">
                            <div class="checkmark">
                                <svg width="16" height="16" viewBox="0 0 16 16">
                                    <rect width="16" height="16" fill="transparent"></rect>
                                    <path v-if="isSelected(characteristic, value)" d="M4 8l2 2 4-4" stroke="#FFF"
                                        stroke-width="1.5"></path>
                                </svg>
                            </div>
                        </div>
                        <span>{{ value }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; // Импорт axios для HTTP-запросов
import { reactive, toRefs, watch } from 'vue'; // Импорт функций из Vue

export default {
    name: 'CategoryFilter', // Название компонента
    props: ['categoryId'], // Входной параметр
    setup(props, { emit }) {
        // Инициализация состояния компонента
        const state = reactive({
            products: [],
            filters: {},
            selectedFilters: {},
            searchTerms: {},
            filteredValues: {},
            collapsed: {},
        });

        // Получение продуктов с сервера
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:1452/api/category/${props.categoryId}`);
                state.products = response.data;
                generateFilters();
                initializeSelectedFilters();
                initializeCollapsed();
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        // Генерация фильтров из продуктов
        const generateFilters = () => {
            const filters = {};
            state.products.forEach(product => {
                product.characteristics.forEach(char => {
                    if (!filters[char.characteristic]) {
                        filters[char.characteristic] = new Set();
                    }
                    filters[char.characteristic].add(char.value);
                });
            });

            state.filters = Object.fromEntries(
                Object.entries(filters).map(([key, value]) => [key, Array.from(value)])
            );

            state.filteredValues = JSON.parse(JSON.stringify(state.filters));
            state.searchTerms = Object.fromEntries(
                Object.keys(state.filters).map(key => [key, ''])
            );
        };

        // Инициализация выбранных фильтров
        const initializeSelectedFilters = () => {
            for (const characteristic in state.filters) {
                state.selectedFilters[characteristic] = new Set(state.filters[characteristic]);
            }
        };

        // Инициализация состояния свернутых фильтров
        const initializeCollapsed = () => {
            for (const characteristic in state.filters) {
                state.collapsed[characteristic] = true;
            }
        };

        // Переключение фильтра
        const toggleFilter = (characteristic, value) => {
            if (state.selectedFilters[characteristic].has(value)) {
                state.selectedFilters[characteristic].delete(value);
            } else {
                state.selectedFilters[characteristic].add(value);
            }
            state.selectedFilters[characteristic] = new Set(state.selectedFilters[characteristic]);
        };

        // Фильтрация значений по поисковому термину
        const filterValues = (characteristic) => {
            const term = state.searchTerms[characteristic].toLowerCase();
            state.filteredValues[characteristic] = state.filters[characteristic].filter(value =>
                value.toLowerCase().includes(term)
            );
        };

        // Проверка, выбран ли фильтр
        const isSelected = (characteristic, value) => {
            return state.selectedFilters[characteristic]?.has(value) || false;
        };

        // Переключение состояния свернутого фильтра
        const toggleCollapse = (characteristic) => {
            state.collapsed[characteristic] = !state.collapsed[characteristic];
        };

        // Отслеживание изменений в выбранных фильтрах
        watch(() => state.selectedFilters, (newVal) => {
            emit('filter', newVal);
        }, { deep: true });

        fetchProducts(); // Получение продуктов при инициализации компонента

        // Возвращение состояния и функций для использования в шаблоне
        return {
            ...toRefs(state),
            toggleFilter,
            filterValues,
            isSelected,
            toggleCollapse,
        };
    },
};
</script>


<style scoped>
.filter-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: 0px;
    margin-right: 32px;
    padding: 0;
    gap: 16px;
    width: 256px;
}

.filter-header {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    gap: 10px;
    width: 256px;
    height: 48px;
    border-bottom: 0.5px solid #B5B5B5;
    cursor: pointer;
}

.filter-header .filter-title {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.03em;
    color: #000000;
}

.filter-header .icon-expand {
    width: 24px;
    height: 24px;
}

.filter-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 256px;
}

.filter-search {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 16px;
    gap: 8px;
    width: 80%;
    background: #F5F5F5;
    border-radius: 8px;
}

.search-icon {
    width: 24px;
    height: 24px;
}

.search-input {
    width: 100%;
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #656565;
    opacity: 0.5;
    border: none;
    background: none;
    outline: none;
}

.filter-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    gap: 6px;
    width: 100%;
    height: auto;
    overflow-y: auto;
}

.filter-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 8px;
    width: 100%;
    height: 24px;
}

.checkbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2px;
    gap: 8px;
    width: 16px;
    height: 16px;
    border: 0.5px solid #D3D3D3;
    border-radius: 3px;
    position: relative;
}

.checkbox.checked {
    background: #000000;
}

.checkmark {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter-item span {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 15px;
    line-height: 22px;
    color: #000000;
    flex-grow: 1;
}
</style>