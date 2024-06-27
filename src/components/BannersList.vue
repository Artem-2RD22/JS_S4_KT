<template>
  <div class="banners-list">
    <div class="big-banner first-banner">
      <div class="image-container">
        <div class="image group-1"></div>
      </div>
      <div class="title-text">
        <div class="title">Popular Products</div>
        <div class="description">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
        </div>
        <router-link :to="`/category/6`">
        <div class="button">
          <div class="label">Shop&nbsp;Now</div>
        </div>
      </router-link>
      </div>
    </div>

    <div class="big-banner second-banner">
      <div class="image-container">
        <div class="image image-64"></div>
      </div>
      <div class="title-text">
        <div class="title">Ipad Pro</div>
        <div class="description">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
        </div>
        <router-link :to="`/category/4`">
        <div class="button">
          <div class="label">Shop&nbsp;Now</div>
        </div>
      </router-link>
      </div>
    </div>

    <div class="big-banner third-banner">
      <div class="image-container">
        <div class="image image-41"></div>
      </div>
      <div class="title-text">
        <div class="title">Samsung Galaxy</div>
        <div class="description">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
        </div>
        <router-link :to="`/category/2`">
        <div class="button">
          <div class="label">Shop&nbsp;Now</div>
        </div>
      </router-link>
      </div>
    </div>

    <div class="big-banner fourth-banner">
      <div class="image-container">
        <div class="image macbook-1"></div>
      </div>
      <div class="title-text">
        <div class="title">Macbook Pro</div>
        <div class="description">
          iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.
        </div>
        <router-link :to="`/category/3`">
        <div class="button">
          <div class="label">Shop&nbsp;Now</div>
        </div>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannersList',
};
</script>

<style scoped>
.banners-list {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0;
  width: 100%;
  height: 640px;
}

.big-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 32px;
  gap: 24px;
  width: 100%;
  min-width: 280px;
  height: 640px;
  box-sizing: border-box;
}

.first-banner {
  background: #FFFFFF;
}

.second-banner {
  background: #F9F9F9;
}

.third-banner {
  background: #EAEAEA;
}

.fourth-banner {
  background: #2C2C2C;
}

.title-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  width: 296px;
}

.title {
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 33px;
  line-height: 48px;
  color: #000000;
}

.fourth-banner .title {
  color: #FFFFFF;
}

.description {
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
  gap: 8px;
  width: 188px;
  height: 56px;
  border: 1px solid #000000;
  border-radius: 6px;
}

.fourth-banner .button {
  border: 1px solid #FFFFFF;
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

.fourth-banner .label {
  color: #FFFFFF;
}

.image-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 300px;
}

.image {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}

.group-1 {
  background-image: url('../assets/Group 1.png');
}

.image-64 {
  background-image: url('../assets/image 64.png');
}

.image-41 {
  background-image: url('../assets/image 41.png');
}

.macbook-1 {
  background-image: url('../assets/Macbook 1.png');
}

a {
  text-decoration: none;
}
</style>
