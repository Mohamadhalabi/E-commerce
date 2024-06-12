<template>
  <div class="price-box" :class="{ 'text-center': additionalProductItems }">
    <template v-if="product.discount && product.discount.length !=0">
      <span
        v-if="product.discount.type =='fixed'"
        :class="{ 'highlighted': hasDuplicate(product.discount.value) }"
        class="product-price price-color font-weight-bold mt-0">
        {{(product.price.value - (product.discount.value * product.price.exchange_rate)).toFixed(2)}}{{product.price.currency}}
      </span>
      <span
        v-else
        :class="{ 'highlighted': hasDuplicate(product.discount.value) }"
        class="product-price price-color font-weight-bold mt-0">
        {{(product.price.value - (product.price.value * (product.discount.value / 100))).toFixed(2)}}{{product.price.currency}}
      </span>
      <span
        class="old-price mt-1 mb-0"
        :class="{ 'highlighted': hasDuplicate(product.discount.value), 'mt-1': gridPrice }"
      >
            {{product.price.value}}{{product.price.currency}}
      </span>
    </template>

    <template v-else-if="product.is_sale==1 && (product.price.value != product.sale_price.value)">
      <span
        :class="{ 'highlighted': hasDuplicate(product.sale_price.value) }"
        class="product-price price-color font-weight-bold mt-0">
        {{ product.sale_price.currency + product.sale_price.value }}
      </span>
      <span
        v-if="!gridPrice"
        class="old-price mt-1 mb-0"
        :class="{ 'highlighted': hasDuplicate(product.price.value) }"
      >
        {{ product.price.currency + product.price.value }}
      </span>
      <span
        v-else
        class="old-price mt-1"
        :class="{ 'highlighted': hasDuplicate(product.price.value) }"
      >
        {{ product.price.currency + product.price.value }}
      </span>
    </template>
    <template v-else>
      <span class="product-price price-color mb-1"
            :class="{ 'highlighted': hasDuplicate(product.price.value), 'homePageSearch': homePageSearch === true }"
      >
        {{ product.price.currency + product.price.value }}
      </span>
    </template>
  </div>
</template>
<script>
import { isEmpty } from "lodash";
import {mapGetters} from "vuex";

export default {
  props: {
    product: Object,
    gridPrice: Boolean,
    highlightCommon: Boolean,
    homePageSearch: Boolean,
    additionalProductItems: Boolean,
  },
  data: function () {
    return {
      isEmpty
    };
  },
  methods:{
    hasDuplicate(status){
      if(this.highlightCommon) {
        const count = this.getList.filter(product => product.is_free_shipping === status).length;
        return count >=2 ;
      }
    },
  },
  computed:{
    ...mapGetters("compare", ["getList"]),
  }
};
</script>
<style>
.highlighted {
  background-color: yellow!important;
}
.homePageSearch{
  font-size: 16px;

}
</style>
