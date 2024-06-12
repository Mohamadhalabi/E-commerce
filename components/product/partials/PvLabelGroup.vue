<template>
  <div style="top:0px" class="p-1 w-100 position-absolute d-flex flex-column align items-center justify-content-between">
    <!-- Begin:Top Row -->
    <div class="d-flex align-items-center justify-content-between  ">
      <!-- Begin: Discount -->
      <template
        v-if="
         product.discount && !isEmpty(product.discount)
        "
      >
        <div class="off-animatin product-label label-sale">
          <template v-if="product.discount.type === 'fixed'">
            {{ product.discount.value + product.price.currency }}
            off
          </template>
          <template v-else-if="product.discount.type === 'percent'">
            {{ this.$options.filters.discountFormat(product.discount.value) }}%
            off
          </template>
        </div>
      </template>
      <!-- End: Discount -->

      <!-- Begin :Free Shepping -->
        <template v-if=" product.is_free_shipping">
          <div class="product-label label-free-shipping">
            {{ $t("products.freeShipping") }}
          </div>
        </template>
        <!-- End :Free Shipping -->


    </div>
    <!-- End :Top Row -->

    <!-- Begin: Secund Row -->
    <div class="d-flex justify-content-between align-items-center ">
      <!-- Begin: New -->
      <template v-if="product.is_featured">
        <div class="product-label label-new">
          {{ $t("products.new") }}
        </div>
      </template>
      <!-- End:New -->

       <!-- Begin:Hot -->
        <template v-if="product.is_best_seller">
          <div class="product-label label-hot">
            {{ $t("products.hot") }}
          </div>
        </template>
        <!-- End:Hot -->
    </div>
    <!-- End Right Side -->
  </div>
</template>

<script>
import { isEmpty } from "lodash";

export default {
  props: {
    product: Object,
  },
  data: function () {
    return {
      sale_percentage: 0,
      isEmpty,
    };
  },
  mounted: function () {
    if (this.product.is_sale && this.product.price) {
      this.sale_percentage =
        ((this.product.price.value - this.product.sale_price.value) /
          this.product.price.value) *
        100;
      this.sale_percentage = parseInt(this.sale_percentage);
    }
  },
};
</script>

<style scoped>
.product-label {
  padding: 0.5rem;
}
</style>
