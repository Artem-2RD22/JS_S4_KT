<template>
  <div class="smaller-banners">
    <div class="left-banners">
      <div class="wide-square">
        <div class="playstation-image"></div>
        <div class="title-text">
          <div class="title">Playstation 5</div>
          <div class="description">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</div>
        </div>
      </div>
      <div class="squares">
        <div class="square-banner white-square">
          <div class="title-text">
            <div class="title">Apple AirPods Max</div>
            <div class="description">Computational audio. Listen, it's powerful</div>
          </div>
          <div class="airpods-image"></div>
        </div>
        <div class="square-banner dark-square">
          <div class="title-text">
            <div class="title white">Apple Vision Pro</div>
            <div class="description">An immersive way to experience entertainment</div>
          </div>
          <div class="visionpro-image"></div>
        </div>
      </div>
    </div>
    <div class="big-banner">
      <div class="content">
        <div class="title-text">
          <div class="title">Macbook Air</div>
          <div class="description">The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</div>
        </div>
        <router-link :to="`/category/3`">
        <div class="button">
          <div class="label">Shop&nbsp;Now</div>
        </div>
      </router-link>
      </div>
      <div class="macbook-image"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallerBanner'
};
</script>

<style scoped>
.smaller-banners {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
    height: 600px;
  }
  
  .left-banners {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 0px;
    width: 50%;
    height: 600px;
  }
  
  .wide-square {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 48px 0px 0px;
    width: 100%;
    height: 328px;
    background: #FFFFFF;
    position: relative;
  }
  
  .playstation-image {
    position: absolute;
    height: 343px;
    left: 45px;
    right: 0px;
    top: 0px;
    background: url('../assets/PlayStation.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .title-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    width: 338px;
    z-index: 1;
  }

  .square-banner .title-text {
    padding-left: 150px;

  }

  .square-banner .title {
    font-size: 29px;
    width: 160px;
  }
  
  .square-banner .description {
    width: 160px;
  }
  
  .title {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 49px;
    line-height: 40px;
    color: #000000;
  }
  
  .description {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #919191;
  }
  
  .squares {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
    height: 272px;
  }
  
  .square-banner {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    width: 50%;
    height: 100%;
    isolation: isolate;
    position: relative;
  }
  
  .white-square {
    background: #EDEDED;
  }
  
  .dark-square {
    background: #353535;
  }
  
  .dark-square .title{
    color: #FFFFFF;
  }

  .airpods-image {
    position: absolute;
    height: 272px;
    left: 0px;
    right: 256px;
    top: 0px;
    background: url('../assets/airpods.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .visionpro-image {
    position: absolute;
    height: 272px;
    left: 0px;
    right: 256px;
    top: 0px;
    background: url('../assets/visionpro.png');

    background-repeat: no-repeat;
    background-position: center;
  }
  
  .big-banner {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    height: 600px;
    background: #EDEDED;
    position: relative;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    width: 360px;
    max-width: 360px;
    height: 192px;
    z-index: 0;
  }
  
  .big-banner .title-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    margin-left: 100px;
    gap: 16px;
    width: 360px;
    height: 120px;
  }
  
  .big-banner .title {
    font-family: 'Abel', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 56px;
    color: #000000;
  }
  
  .big-banner .description {
    font-family: 'ABeeZee', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #919191;
  }
  
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 56px;
    margin-left: 100px;
    gap: 8px;
    width: 188px;
    height: 56px;
    border: 1px solid #000000;
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
    color: #000000;
  }
  
  .macbook-image {
    position: absolute;
    width: 292px;
    height: 502px;
    right: 0px;
    bottom: 44px;
    background: url('../assets/MacBook_Pro_14.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
