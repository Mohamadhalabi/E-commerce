<template>
  <pv-collection
    :isIndexPage ="true"
    :products="latestProducts2"
    :collectionTitle="$t('home.latestProducts')"
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
    this.latestProducts2 = new_arrival.data.new_arrival
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data: function () {
    return {
      latestProducts2: null,
    };
  },
}
</script>
