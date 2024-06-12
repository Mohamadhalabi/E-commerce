<template>
  <a
    href="javascript:;"
    class="btn-quickview"
    title="Quick View"

  >
  <span v-if="getIsAddToCard" class="py-3 d-block"
  @click="addToCart(product)">{{ $t('wishlist.addToCart') }}</span>
  <span v-else
  class="py-3 d-block"
  @click="openQuickview">{{ $t('wishlist.QuickView') }}</span>
    <i
      v-if="parent === 'products-large-card'"
      class="fas fa-external-link-alt"
    />
  </a>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    product: Object,
    parent: String,
    isAddToCard:Boolean
  },
  methods: {
    ...mapActions('shop', ['addToCart']),

   /*  openQuickview: function () {
      this.$modal.show(
        () => import('~/components/products/PvQuickview'),
        {slug: this.products.slug},
        {
          width: '931',
          height: 'auto',
          adaptive: true,
          class: 'quickview-modal'
        }
      );
    } */
  },
  computed: {
    getIsAddToCard() {
      return this.isAddToCard;
    }
  }

};
</script>
