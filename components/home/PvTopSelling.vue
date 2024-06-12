<template>
  <pv-collection
    :isIndexPage ="true"
    :products="topSelling"
    :collectionTitle="collectionTitle"
    :link="link"
  />
</template>
<script>
import Api from "~/api";
import {mapGetters} from "vuex";
import PvCollection from "~/components/product/card/PvCollection.vue";
import axios from "axios";
export default {
  components: {
    PvCollection,
  },
  computed: {
    ...mapGetters("header",["getCurrency"])
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
        this.topSelling = topSellingProducts.data.top_selling
  },
  props: {
    isIndexPage: Boolean,
    collectionTitle: String,
    link: String,
  },
  data: function () {
    return {
      topSelling: null,
    };
  },
  watch: {
    getCurrency() {
      Api.get("products/top-selling-products").then((response) => {
        this.topSelling = response.data.top_selling;
      })
    },
  }
}
</script>
