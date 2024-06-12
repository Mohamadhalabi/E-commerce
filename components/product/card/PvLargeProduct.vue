<template>
  <div class="product-default left-details product-list">
    <figure>
      <nuxt-link
        :to="getLink(`/products/${product.slug}`)"
       >
        <template v-for="image in product.gallery.slice(0,2)">
          <pv-gallery-image
            :key="image.m.id"
            :image="image"
          />
        </template>
      </nuxt-link>

      <pv-label-group :product="product" />

      <div
        v-if="product.discount && product.discount.until"
        class="product-countdown-container"
      >
        <span class="product-countdown-title">{{ $t('products.discountEndsIn') }}:</span>
        <pv-count-down
          class="product-countdown countdown-compact"
          :until="product.discount.until"
          :compact="true"
        />
      </div>
    </figure>

    <div class="product-details">
      <pv-category-list :product="product" />

      <h3 class="product-title">
        <nuxt-link :to="getLink(`/products/${product.slug}`)">
          {{product.title}}
        </nuxt-link>
      </h3>

      <pv-rating :product="product" />

      <div
        v-if="product.summary_name"
        class="product-description"
      >
        <p class="mb-0">
          {{product.summary_name}}
        </p>
      </div>

      <pv-price-box :product="product" />

      <div class="product-action">
        <pv-cart-button
          :product="product"
          :parent="'products-large-card'"
        />

        <pv-wishlist-button
          :product="product"
          :parent="'products-large-card'"
        />

        <pv-quickview-button
          :product="product"
          :parent="'products-large-card'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PvGalleryImage from '~/components/product/partials/PvGalleryImage';
import PvLabelGroup from '~/components/product/partials/PvLabelGroup';
import PvCountDown from '~/components/product/partials/PvCountDown';
import PvCategoryList from '~/components/product/partials/PvCategoryList';
import PvRating from '~/components/product/partials/PvRating';
import PvPriceBox from '~/components/product/partials/PvPriceBox';
import PvCartButton from '~/components/product/partials/PvCartButton';
import PvWishlistButton from '~/components/product/partials/PvWishlistButton';
import PvQuickviewButton from '~/components/product/partials/PvQuickviewButton';
import {mapGetters} from "vuex";

export default {
  components: {
    PvGalleryImage,
    PvLabelGroup,
    PvCountDown,
    PvCategoryList,
    PvRating,
    PvPriceBox,
    PvCartButton,
    PvWishlistButton,
    PvQuickviewButton
  },
  props: {
    product: Object
  },
  computed:{
    ...mapGetters("language", ["getLang"])
  },
  methods:{
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  }
};
</script>
