<template>
  <div class="ratings-container">
    <div class="product-ratings ">
      <span
        class="ratings"
        :style="$options.filters.ratingFormat(product.avg_rating, true)"
        :class="getIsAr ? 'end-0' : ''"
      />
    </div>
    <a
      v-if="!hideReviews"
      class="rating-link mx-2"
      @click="$router.push('?reviews=true')">({{product.total_reviews > 0 ? `${product.total_reviews} Reviews` :  $t('common.thereisnoreviewyet')}})
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
    hideReviews: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>
<style scoped>
.tooltiptext {
  overflow: visible;
}
</style>
