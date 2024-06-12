<template>
  <pv-collection
    :isIndexPage ="true"
    :products="bestSellingProducts2"
    :collectionTitle="$t('home.bestSellingProducts')"
    :link="link"
  />
</template>
<script>
import PvCollection from "~/components/product/card/PvCollection.vue";
import axios from "axios";
export default {
  components: {
    PvCollection,
  },
  async fetch() {
    const best_seller = await axios.get("products/best-seller",{
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
    this.bestSellingProducts2 = best_seller.data.best_seller
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link:String,
  },
  data: function () {
    return {
      bestSellingProducts2: null,
    };
  },
}
</script>
