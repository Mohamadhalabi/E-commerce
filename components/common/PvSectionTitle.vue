<template>
  <div :class="{ 'float-right' : getIsAr }" class="titleWrapper w-100 mb-1">
    <div class="row">
      <div class="col-lg-12 additional-product-items d-flex">
        <h3 class="m-0 home-page-title">
          <span v-if="!UrlLink.includes('undefined')">
            <nuxt-link :to="getLink('/shop?' + this.link)">
              {{ title }}
            </nuxt-link>
          </span>
          <span v-else>
            {{ title }}
          </span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "PvSectionTitle",
  props: ["title","link"],
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),
  },
  data() {
    return {
      UrlLink: 'shop?' + this.link,
    };
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
