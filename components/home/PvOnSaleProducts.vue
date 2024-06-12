<template>
  <pv-small-collection
    :products="onSaleProducts"
    :collection-title="$t('home.onSaleProduct')"
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
  props:{
    link:String,
  },
  async fetch() {
    const getOnSaleProducts = await axios.get("shop?on_sale=1&length=3",{
      baseURL: process.env.API_BASE_URL,
      headers:{
        'Accept-Language': this.$i18n.locale,
        'Content-Type': 'application/json',
        'currency': this.$cookies.get('currency') || 'USD',
        'Accept': 'application/json',
        'secret-key': process.env.SECRET_KEY,
        'api-key': process.env.API_KEY,
      },
    })
    this.onSaleProducts = getOnSaleProducts.data.products;
  },
  data: function () {
    return {
      onSaleProducts: null,
    };
  },
}
</script>
