<template>
  <div class="banner">
    <div class="content">
      <div class="titles">
        <div class="subtitle">Pro.Beyond.</div>
        <div class="main-title">IPhone 14 Pro</div>
        <div class="description">Created to change everything for the better. For everyone</div>
      </div>
      <router-link :to="`/category/2`">
      <div class="button">
        <div class="label">Shop&nbsp;Now</div>
      </div>
      </router-link>
    </div>
    <div class="iphone-image"></div>
  </div>
</template>

<script>
export default {
  name: 'MainBanner'
};
</script>

<style scoped>
.banner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 160px;
    width: 100%;
    max-width: 1440px;
    height: 632px;
    background: linear-gradient(90.7deg, #211C24 0.64%, #211C24 101%);
    position: relative;
    overflow: hidden;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 200px;
    padding: 0;
    gap: 24px;
    max-width: 714px;
  }
  
  .titles {
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 24px;
  }
  
  .subtitle {
    font-family: 'Arial', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 32px;
    color: #FFFFFF;
    opacity: 0.4;
  }
  
  .main-title {
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 96px;
    line-height: 72px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
  }
  
  .description {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #919191;
  }
  
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 56px;
    gap: 8px;
    width: 188px;
    height: 56px;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    box-sizing: border-box;
  }
  
  .label {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #FFFFFF;
  }
  
  .iphone-image {
    width: 406px;
    height: 632px;
    background: url('../assets/Iphone_Image.png') no-repeat center center;
    background-size: contain;
    
  }
  
</style>
