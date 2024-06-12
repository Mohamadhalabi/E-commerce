<template>
  <pv-small-collection
      :products="isNewArrivalProducts"
      :collection-title="$t('home.newarrivalproducts')"
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
  async fetch() {
    const new_arrival = await axios.get("products/new-arrival",{
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
    this.isNewArrivalProducts = new_arrival.data.new_arrival.slice(0,3);
  },
  props: {
    link: String,
  },
  data: function () {
    return {
      isNewArrivalProducts: null,
    };
  },
}
</script>
