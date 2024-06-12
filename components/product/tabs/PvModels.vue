<template>
  <table class="table table-striped table-bordered">
    <thead>
    <tr>
      <th class="bg-white">{{$t('products.BRAND')}}</th>
      <th class="bg-white">{{$t('products.MODEL')}}</th>
      <th class="bg-white">{{$t('products.from')}}</th>
      <th class="bg-white">{{$t('products.to')}}</th>
    </tr>
    </thead>
    <tbody>
    <tr></tr>
    <tr v-for="brand in product.brands" :key="brand.brand">
      <td>
        <nuxt-link
          class="carsModel"
          :to="getLink('/' + (brand.brand ? brand.brand.toLowerCase().trim().replace(/\s+/g, '-') : ''))"
        >
          {{ brand.brand || '' }}
        </nuxt-link>
      </td>
      <td v-if="brand.model !== 'All'">
        <nuxt-link
          class="carsModel"
          :to="getLink('/' + (brand.brand ? brand.brand.toLowerCase().trim().replace(/\s+/g, '-') : '') + (brand.model ? '?models=' + brand.model.toLowerCase().trim().replace(/\s+/g, '-') : ''))"
        >
          {{ brand.model ? brand.model : $t('products.all') }}
        </nuxt-link>
      </td>
      <td v-else>
        <nuxt-link
          class="carsModel"
          :to="getLink('/' + (brand.brand ? brand.brand.toLowerCase().trim().replace(/\s+/g, '-') : ''))"
        >
          {{ brand.model || '' }}
        </nuxt-link>
      </td>
      <template v-if="brand.years && !isEmpty(brand.years)">
        <td>{{ getMinimumYear(brand) }}</td>
        <td>{{ getMaximumYear(brand) }}</td>
      </template>
      <template v-else>
        <td>{{ $t('products.all') }}</td>
        <td>{{ $t('products.all') }}</td>
      </template>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapGetters } from "vuex";

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      isEmpty,
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    getMinimumYear(brand) {
      if (brand.years && brand.years.length > 0) {
        return Math.min(...brand.years);
      }
      return null;
    },
    getMaximumYear(brand) {
      if (brand.years && brand.years.length > 0) {
        return Math.max(...brand.years);
      }
      return null;
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  },
};
</script>

<style>
.carsModel {
  text-decoration: underline;
}
.carsModel:hover {
  text-decoration: underline;
}
</style>
