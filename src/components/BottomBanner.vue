<template>
<div class="bottom-banner">
    <div class="content">
        <div class="titles">
            <div class="main-title">Big Summer Sale</div>
            <div class="subtitle">Commodo fames vitae vitae leo mauris in. Eu consequat.</div>
        </div>
        <router-link :to="`/category/2`">
        <div class="button">
          <div class="label">Shop&nbsp;Now</div>
        </div>
      </router-link>
    </div>
    <div class="image image-6"></div>
    <div class="image image-8"></div>
    <div class="image jbl_jr_310bt_blue_1"></div>
    <div class="image image-7"></div>
    <div class="image image-18"></div>
</div>

</template>

<style scoped>
.bottom-banner {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 8px;
    isolation: isolate;
    width: 100%;
    height: 448px;
    background: linear-gradient(100.23deg, #2E2E2E 42.36%, #000000 98.65%);
}

.bottom-banner .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 40px;
    position: absolute;
    width: 480px;
    height: 200px;
    left: calc(50% - 240px);
    top: calc(50% - 100px);
    z-index: 5;
}

.bottom-banner .titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    width: 480px;
    height: 104px;
}

.bottom-banner .main-title {
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 56px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #FFFFFF;
}

.bottom-banner .subtitle {
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #787878;
}

.bottom-banner .button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 56px;
    gap: 8px;
    width: 188px;
    height: 56px;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
}

.bottom-banner .button .label {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #FFFFFF;
}

.bottom-banner .image {
    position: absolute;
    background-size: cover;
}
  
  .bottom-banner .image-6 {
    left: 15.49%;
    right: 61.04%;
    top: 0%;
    bottom: 74.11%;
    background: url('../assets/image_6.png') no-repeat center center;
  }
  
  .bottom-banner .image-8 {
    left: 88.64%;
    right: 0%;
    top: 1.77%;
    bottom: 16.54%;
    background: url('../assets/image_8.png') no-repeat center center;

    
  }
  
  .bottom-banner .jbl_jr_310bt_blue_1 {
    left: 0%;
    right: 76.0%;
    top: 38.39%;
    bottom: 3.12%;
    background: url('../assets/jbl_jr_310bt_blue_1.png') no-repeat center center;
  }
  
  .bottom-banner .image-7 {
    left: 72.43%;
    right: 0%;
    top: 55.13%;
    bottom: 0%;
    background: url('../assets/image_7.png') no-repeat center center;

  }
  
  .bottom-banner .image-18 {
    left: 2.71%;
    right: 80.83%;
    top: 0.67%;
    bottom: 56.47%;
    background: url('../assets/image_18.png') no-repeat center center;

  }
  
</style>
