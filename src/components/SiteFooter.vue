<template>
  <footer class="footer">
    <div class="info">
      <div class="logo-text">
        <router-link :to="`/`">
        <div class="logo">
          <img src="../assets/logo_white.png" alt="Cyber Logo" class="logo-vector" />
        </div>
      </router-link>
        <p class="description">We are a residential interior design firm located in Portland. Our boutique-studio offers
          more than</p>
      </div>
      <div class="footer-navigation">
        <div class="section">
          <h3 class="section-title">Services</h3>
          <ul class="section-list">
            <li class="section-item">Bonus program</li>
            <li class="section-item">Gift cards</li>
            <li class="section-item">Credit and payment</li>
            <li class="section-item">Service contracts</li>
            <li class="section-item">Non-cash account</li>
            <li class="section-item">Payment</li>
          </ul>
        </div>
        <div class="section">
          <h3 class="section-title">Assistance to the buyer</h3>
          <ul class="section-list">
            <li class="section-item">Find an order</li>
            <li class="section-item">Terms of delivery</li>
            <li class="section-item">Exchange and return of goods</li>
            <li class="section-item">Guarantee</li>
            <li class="section-item">Frequently asked questions</li>
            <li class="section-item">Terms of use of the site</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="social-icons">
      <div class="icon twitter"></div>
      <div class="icon facebook"></div>
      <div class="icon tiktok"></div>
      <div class="icon instagram"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
};
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 104px 160px;
  gap: 24px;
  width: 1440px;
  background: #000000;
  flex: none;
  order: 8;
  align-self: stretch;
  flex-grow: 0;
}

.info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  padding: 0px;
  gap: 113px;
  width: 1120px;
  height: 256px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 384px;
  height: 94.87px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 65.4px;
  height: 22.87px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.logo-vector {
  width: 65.4px;
  height: 22.87px;
}

.description {
  width: 384px;
  height: 48px;
  font-family: 'ABeeZee', sans-serif;
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #CFCFCF;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.footer-navigation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 623px;
  height: 256px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  margin: 0 auto;
  width: 295.5px;
  height: 256px;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.section-title {
  width: auto;
  height: 16px;
  font-family: 'Abel', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
}

.section-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-item {
  width: 295.5px;
  height: 32px;
  font-family: 'Abel', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  color: #CFCFCF;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
}

.social-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 15px;
  width: 173px;
  height: 16px;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.icon {
  margin: 0 auto;
  width: 16px;
  height: 16px;
  background-size: contain;
}
</style>
