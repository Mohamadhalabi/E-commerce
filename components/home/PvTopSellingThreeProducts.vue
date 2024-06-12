<template>
  <pv-small-collection
    :products="topSellingThreeProducts"
    :collection-title="$t('home.topSellingProduct')"
    :animation-delay="'200'"
    :link="link"
  />
</template>
<script>
import axios from "axios";
export default {
  components: {
    PvSmallCollection: () => import("~/components/product/card/PvSmallCollection.vue"),
  },
  props : {
    link: String,
  },
  async fetch() {
    const topSellingProducts = await axios.get("products/top-selling-products",{
      baseURL: process.env.API_BASE_URL,
      headers:{
        'Accept-Language': this.$i18n.locale,
        'Content-Type': 'application/json',
        'currency': this.$cookies.get('currency') || 'USD',
        'Accept': 'application/json',
        'secret-key': process.env.SECRET_KEY,
        'api-key': process.env.API_KEY,
      }
    });
    this.topSellingThreeProducts = topSellingProducts.data.top_selling.slice(0,3);
  },
  data: function () {
    return {
      topSellingThreeProducts: null,
    };
  },
}
</script>
