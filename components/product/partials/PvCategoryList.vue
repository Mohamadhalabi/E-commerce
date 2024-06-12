<template>
  <div
    :class="{ 'category-list': wrapper, 'text-right': getIsAr }"
    :style="!wrapper ? 'display: inline-block;' : ''"
  >
     <span v-for="(category) in product.categories" :key="category.id">
      <nuxt-link   :to="`/${category.slug}`">{{ category.name }}</nuxt-link>
       {{ index === product.categories.length - 1 ? "" : " > " }}
    </span>
     <nuxt-link v-if="category" :to="`/${product.categories[product.categories.length - 1].slug} `" >
      <span>{{ product.categories[product.categories.length - 1].name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
    wrapper: {
      type: Boolean,
      default: true,
    },
  },
  /* created() {
    if (this.products.categories) {

      console.log(this.products.categories.length);
    }
  }, */
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>


<style scoped>
.category-list a {
  transition: all 0.1s ease-in;
}
.category-list a:hover {
  color: #ff6800 !important;
}
</style>
