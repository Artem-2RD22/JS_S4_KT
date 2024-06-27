<template>
    <div class="details-section" v-if="product">
      <div class="content">
        <h1 class="details-title">Details</h1>
        <p class="details-description">
          Just as a book is judged by its cover, the first thing you notice when you pick up a modern smartphone is the display. Nothing surprising, because advanced technologies allow you to practically level the display frames and cutouts for the front camera and speaker, leaving no room for bold design solutions. And how good that in such realities Apple everything is fine with displays. Both critics and mass consumers always praise the quality of the picture provided by the products of the Californian brand. And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.
        </p>
        <div class="details-info">
          <div class="line" v-for="(char, index) in product.characteristics" :key="index">
            <div class="label">{{ char.characteristic }}</div>
            <div class="value">{{ formatValue(char) }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductDetails',
    props: ['product'],
    methods: {
      formatValue(char) {
        if (char.unit_type === 'значение') {
          return char.value;
        }
        return `${char.value} ${char.unit_type}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .details-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 160px;
    background-color: #FAFAFA;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 40px 0;
    gap: 32px;
    width: 1120px;
    background: #FFFFFF;
    border-radius: 8px;
  }
  
  .details-title {
    font-family: 'ABeeZee', sans-serif;
    font-size: 24px;
    font-style: italic;
    color: #000000;
  }
  
  .details-description {
    width: 1040px;
    font-family: 'ABeeZee', sans-serif;
    font-size: 14px;
    font-style: italic;
    line-height: 24px;
    color: #9D9D9D;
  }
  
  .details-info {
    display: flex;
    flex-direction: column;
    width: 1040px;
  }
  
  .line {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 8px;
    border-bottom: 0.5px solid #CDCDCD;
    margin-bottom: 24px;
  }
  
  .label {
    font-family: 'Abel', sans-serif;
    font-size: 16px;
    color: #000000;
  }
  
  .value {
    font-family: 'Abel', sans-serif;
    font-size: 15px;
    color: #000000;
    text-align: right;
    white-space: pre-line;
  }
  </style>
  