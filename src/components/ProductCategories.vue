<template>
  <div class="category-section">
    <div class="category-header">
      <span class="category-title">Browse By Category</span>
      <div class="arrows">
        <div class="arrow-left">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="transparent"></rect>
            <path d="M15 18l-6-6 6-6" fill="#000"></path>
          </svg>
        </div>
        <div class="arrow-right">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <rect width="24" height="24" fill="transparent"></rect>
            <path d="M9 18l6-6-6-6" fill="#000"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="category-cards">
      <router-link :to="`/category/2`">
        <div class="category-card">
          <div class="icon phones"></div>
          <span>Phones</span>
        </div>
      </router-link>
      <router-link :to="`/category/5`">
        <div class="category-card">
          <div class="icon smart-watches"></div>
          <span>Smart Watches</span>
        </div>
      </router-link>
      <router-link :to="`/category/1`">
        <div class="category-card">
          <div class="icon cameras"></div>
          <span>Cameras</span>
        </div>
      </router-link>
      <router-link :to="`/category/6`">
        <div class="category-card">
          <div class="icon headphones"></div>
          <span>Headphones</span>
        </div>
      </router-link>
      <router-link :to="`/category/3`">
        <div class="category-card">
          <div class="icon computers"></div>
          <span>Computers</span>
        </div>
      </router-link>
      <router-link :to="`/category/4`">
        <div class="category-card">
          <div class="icon gaming"></div>
          <span>Gaming</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCategories'
};
</script>

<style scoped>
.category-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 80px;
  gap: 32px;
  width: 1440px;
  height: 352px;
  background: #FAFAFA;
}

.category-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
}

.category-title {
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.01em;
  padding-left: 160px;
  color: #000000;
}

.arrows {
  display: flex;
  flex-direction: row;
  padding-right: 160px;
  gap: 16px;
}

.arrow-left,
.arrow-right {
  width: 32px;
  height: 32px;
}

.category-cards {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 1440px;
}

.category-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 160px;
  min-width: 135px;
  height: 128px;
  background: #EDEDED;
  border-radius: 15px;
}

.category-card span {
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

a {
  text-decoration: none;
}

.icon {
  width: 48px;
  height: 48px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.phones {
  background: url('../assets/Icon/phones_icon.png');
}

.smart-watches {
  background: url('../assets/Icon/smart_watches_icon.png');
}

.cameras {
  background: url('../assets/Icon/cameras_icon.png');
}

.headphones {
  background: url('../assets/Icon/headphones_icon.png');
}

.computers {
  background: url('../assets/Icon/computers_icon.png');
}

.gaming {
  background: url('../assets/Icon/gaming_icon.png');
}
</style>
