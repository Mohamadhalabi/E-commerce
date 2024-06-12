<template>
  <div class=" p-5 ">
    <div
      v-if="!product"
      class="quickview-wrap product"
    >
      <div class="skel-group">
        <div class="col-lg-6 summary-before" />
        <div class="col-lg-6 summary entry-summary" />
      </div>
    </div>

    <div
      v-if="product"
      class="row position-relative"
    >
      <div class="col-md-6 product-single-gallery mb-md-0">
        <pv-media
          :product="product"
          :is-magnify="false"
        />
      </div>

      <div class="col-md-6 product-single-details mb-0">
        <pv-detail
          :product="product"
          :is-product-nav="false"
        />
      </div>


      <button
              title="Close (Esc)"
              type="button"
              class="position-absolute"
              style="border-radius: 50%; border: none;font-size: large; top: -25px; right: 0px;"
              @click="$emit('close')"
            >
              ×
            </button>
    </div>
  </div>
</template>

<script>
import PvMedia from '~/components/product/PvMediaNew.vue';
import PvDetail from '~/components/product/PvDetail';
import Api from '~/api';

export default {
  components: {
    PvMedia,
    PvDetail
  },
  props: {
    slug: String
  },
  data: function() {
    return {
      product: null
    };
  },
  mounted: function() {
    this.getProduct();
  },
  methods: {
    getProduct: function() {
      Api.get(`products/${this.slug}`, {
        params: {quick_view: true}
      })
        .then(response => {
          this.product = response.data.product;
        })
        .catch(error => ({error: JSON.stringify(error)}));
    }
  }
};
</script>

