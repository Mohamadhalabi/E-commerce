<template>
  <div class="product-nav">
    <div
      v-for="(product,index) in [prevProduct, nextProduct]"
      :key="index"
      :class="[{disabled: !product || isEmpty(product)}, (index === 0 ? 'product-prev' : 'product-next')]"
    >
      <nuxt-link
        v-if="product && !isEmpty(product)"
        :key="index === 0 ? 'toPrevProduct' : 'toNextProduct'"
        :to="getLink('/products/'+product.slug)"
      >
        <span class="product-link" />
        <span class="product-popup">
          <span class="box-content">
            <pv-gallery-image
              :image="product.gallery[0]"
              :size="'s'"
            />
            <span>{{product.short_title}}</span>
          </span>
        </span>
      </nuxt-link>

      <a
        v-else
        href="javascript:;"
      >
        <span class="product-link" />
      </a>
    </div>
  </div>
</template>

<script>
import PvGalleryImage from '~/components/product/partials/PvGalleryImage';
import {isEmpty} from 'lodash';
import {mapGetters} from "vuex";

export default {
  components: {
    PvGalleryImage
  },
  props: {
    prevProduct: Object,
    nextProduct: Object
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    }
  },
  data: function() {
    return {
      isEmpty
    };
  }
};
</script>
