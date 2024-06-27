<template>
    <div class="reviews-section" v-if="product">
        <div class="overall-rating">
            <div class="rating-box">
                <div class="rating-value">{{ product.rating }}</div>
                <div class="review-count">of {{ product.count_review }} reviews</div>
                <div class="stars">
                    <div v-for="index in fullStars" :key="'full-' + index" class="star">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z"
                                fill="#FFB547" />
                        </svg>
                    </div>
                    <div v-if="hasHalfStar" class="star">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.43625 1.35577C9.0554 0.0270975 10.9446 0.0270965 11.5637 1.35577L13.0026 4.4436C13.254 4.98311 13.7658 5.35492 14.3566 5.4273L17.7379 5.84158C19.1929 6.01983 19.7767 7.81657 18.7044 8.816L16.2123 11.1387C15.7769 11.5445 15.5814 12.1461 15.6952 12.7303L16.346 16.0742C16.6261 17.513 15.0977 18.6235 13.8159 17.9125L10.8368 16.2601C10.3163 15.9714 9.68372 15.9714 9.16321 16.2601L6.18415 17.9125C4.90227 18.6235 3.37388 17.513 3.65395 16.0742L4.30485 12.7303C4.41857 12.1461 4.2231 11.5445 3.78768 11.1387L1.29562 8.816C0.223307 7.81657 0.807103 6.01983 2.26207 5.84158L5.64342 5.4273C6.23421 5.35492 6.74596 4.98311 6.99736 4.4436L8.43625 1.35577Z"
                                fill="url(#halfStarGradient)" />
                            <defs>
                                <linearGradient id="halfStarGradient" x1="0" x2="1" y1="0" y2="0">
                                    <stop offset="50%" stop-color="#FFB547" />
                                    <stop offset="50%" stop-color="rgba(255, 181, 71, 0)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div v-for="index in emptyStars" :key="'empty-' + index" class="star empty"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductReviews',
    props: ['product'],
    computed: {
        fullStars() {
            return Math.floor(this.product?.rating || 0);
        },
        hasHalfStar() {
            return (this.product?.rating || 0) % 1 !== 0;
        },
        emptyStars() {
            return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
        }
    }
};
</script>

<style scoped>
.reviews-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 0px;
    gap: 32px;
    width: 100%;
    border-radius: 24px;
    background-color: #ffffff;
}

.overall-rating {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 160px;
    padding: 0;
    gap: 48px;
    width: 475px;
    height: 192px;
}

.rating-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    gap: 16px;
    width: 184px;
    height: 192px;
    background: #FAFAFA;
    border-radius: 25px;
}

.rating-value {
    width: 120px;
    height: 56px;
    font-size: 56px;
    line-height: 56px;
    text-align: center;
    color: #000000;
    font-style: italic;
}

.review-count {
    width: 120px;
    height: 16px;
    font-size: 15px;
    line-height: 16px;
    text-align: center;
    color: #000000;
    opacity: 0.3;
    font-style: italic;
}

.stars {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    height: 24px;
}

.star,
.half-star {
    width: 24px;
    height: 24px;
}

.star.empty {
    background: none;
}
</style>