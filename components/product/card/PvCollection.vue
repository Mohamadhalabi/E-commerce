<template>
  <div v-if="products" class="">
    <div class="mb-2">
      <pv-section-title
        :title="collectionTitle"
        :link="link"
      ></pv-section-title>
    </div>
    <Carousel
      :slides-per-page="5"
      :show-dots='true'
      :autoplay-delay="4"
      :gutter="20"
      :show-arrows="true"
      :peek-right="5"
      :peek-left="5"
      :responsive='[
        {
          maxWidth: 1200,
          slidesPerPage: 4,
        },
        {
          maxWidth: 876,
          slidesPerPage: 3
        },
        {
          maxWidth: 580,
          slidesPerPage: 2
        },
        {
          maxWidth: 350,
          slidesPerPage: 1
        }
      ]'
    >
        <pv-product
          v-for="product in products"
          :key="product.sku"
          :product="product"
          data-swiper-autoplay="5000"
          :isIndexPage="isIndexPage"
        />
    </Carousel>
  </div>
</template>

<script>
import PvProduct from '~/components/product/card/PvProduct';
import PvSectionTitle from '~/components/common/PvSectionTitle.vue';
import {mapGetters} from "vuex";
import Carousel from "vue-ssr-carousel";
export default {
  components: {
    PvProduct,
    Carousel,
    PvSectionTitle,
  },
  props: {
    isIndexPage: Boolean,
    index:Object,
    products: Array,
    link:String,
    collectionTitle: String,
    viewType: {
      type: String,
      default: 'product'
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"])
  },
};
</script>
<style>
div.ssr-carousel-track{
  justify-content: start!important;
}
</style>
