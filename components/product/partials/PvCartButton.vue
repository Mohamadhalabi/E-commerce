<template>
  <div>
    <span v-if="parent === 'products-detail' && product.hide_price == 0">
      <a
        href="javascript:;"
        class="btn btn-dark add-cart mr-2"
        title="Add to cart"
        :class="{disabled: !isCartActive}"
        @click="addToCart(product)"
      >
        {{ $t('wishlist.addToCart') }}
      </a>
    </span>


     <a
      href="javascript:;"
      class="btn-icon btn-add-cart product-type-simple"
      @click="addToWishlist(product)"
    >
      <i class="icon-heart" />
      <span v-if="parent === 'products-large-card'">Add to cart</span>
    </a>


    <a
      href="javascript:;"
      title="Add to compare"
      class="btn-icon btn-add-cart product-type-simple"
      @click="addToList(product)"
    >
      <!-- <i class="icon-shopping-cart" /> -->
      <i class="fa fa-random" />
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PvWishlistButton from './PvWishlistButton.vue';

export default {
  components: {
    PvWishlistButton,
  },
  props: {
    product: Object,
    parent: String
  },

  methods: {
    ...mapActions('shop', ['addToCart']),
    ...mapActions('compare', ['fetchList', 'addToList']),
    ...mapActions('fav', ['addToWishlist']),
    goToWhatsApp(product) {
      window.open(`https://api.whatsapp.com/send?phone=00905525700100&text=Could I please have the price of the ${product.title}`, '_blank');
    }
  }
};
</script>
