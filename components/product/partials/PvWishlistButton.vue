<template>
  <nuxt-link
    v-if="isWishlisted"
    to="/wishlist"
    :class="{'add-wishlist': parent === 'products-detail'}"
    class="btn-icon-wish added-wishlist"
    :title="$t('products.goToWishlist')"
  >
    <i :class="parent != 'products-card' ? 'icon-wishlist-2' : 'icon-heart'" />
    <span v-if="parent === 'products-detail'">{{$t('products.goToWishlist')}}</span>
  </nuxt-link>

  <a
    v-else
    href="javascript:;"
    :class="{'add-wishlist': parent === 'products-detail'}"
    class="btn-icon-wish"
    :title="$t('products.addWishlist')"
    @click="addToWishlist(product)"
  >
    <i :class="parent != 'products-card' ? 'icon-wishlist-2' : 'icon-heart'" />
    <span v-if="parent === 'products-detail'">{{$t('products.addWishlist')}}</span>
  </a>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  props: {
    product: Object,
    parent: String
  },
  computed: {
    ...mapGetters('fav', ['getWishlistList']),
    isWishlisted: function() {
      if(this.getWishlistList.findIndex(item => item.sku === this.product.sku) > -1)
        return true;
      return false;
    }
  },
  created() {

  },
  methods: {
    ...mapActions('fav', ['addToWishlist' , 'fetchWishlist']),

  }
};
</script>
