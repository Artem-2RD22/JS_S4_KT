<template>
    <div class="favorite">
      <SiteHeader />
      <FavoritesList />
      <SiteFooter />
    </div>
  </template>
  
  <script>
  import SiteHeader from '@/components/SiteHeader.vue';
  import FavoritesList from '@/components/FavoritesList.vue';
  import SiteFooter from '@/components/SiteFooter.vue';
  
  export default {
    name: 'FavoritesPage',
    components: {
      SiteHeader,
      FavoritesList,
      SiteFooter,
    },
  };
  </script>
  
  <style scoped>
.favorite {
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
  