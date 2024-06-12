<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/">
            {{ $t("products.home") }}
          </nuxt-link>
        </li>
        <li class="breadcrumb-item">
          Promotion
        </li>
      </ol>
    </nav>
    <div class="container">
      <h1 class="promotion additional-product-items mb-3">Smart Keys / Emulators / Pin Tools</h1>
      <div class="row">
        <div
          v-for="item in products"
          :key="item.sku"
          class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 mt-lg-0"
        >
          <pv-product :product="item" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from '~/api';
import { mapGetters } from 'vuex';
import PvProduct from "~/components/product/card/PvProduct.vue";
export default {
  async asyncData({ params }) {
    const response = await Api.get(`/promotion/smart-keys-emulators-pin-tools`);
    return {
      products : response.data.data
    };
  },
  components: {
    PvProduct,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    ...mapGetters('rtlStore',['getIsAr'])
  },
  mounted() {
    // this.$Progress.start();
  },
};
</script>
<style>
.promotion{
  font-size: 32px!important;
}
</style>
