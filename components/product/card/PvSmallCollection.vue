<template>
  <div
    class="col-xl-3 col-lg-6 col-sm-6  pb-lg-0 col-equal d-flex align-items-center justify-content-between flex-column"
  >
    <h3 class="section-sub-title px-2 w-100">
      <nuxt-link :to="UrlLink">
        {{collectionTitle}}
      </nuxt-link>
    </h3>

    <div v-if="!products || products.length === 0">
      <div
        v-for="(item,index) in [0,1,2]"
        :key="`${kebabCase(collectionTitle)}-${index}`"
        class="skel-product-col skel-pro mb-2"
      />
    </div>

    <pv-small-product
      v-for="product in products"
      v-else
      :key="product.sku"
      :product="product"
    />
  </div>
</template>

<script>
import {kebabCase} from 'lodash';

export default {
  components: {
    PvSmallProduct: () => import("~/components/product/card/PvSmallProduct")
  },
  props: {
    products: Array,
    collectionTitle: String,
    animationDelay: String,
    link: String,
  },
  data: function() {
    return {
      kebabCase,
      UrlLink: 'shop?' + this.link,
    };
  }
};
</script>
