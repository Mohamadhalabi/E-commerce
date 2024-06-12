<template>
  <div>
    <vue-nouislider
      id="price-slider"
      :config="settings"
      :values="prices"
    />
    <div class="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
      <div class="filter-price-text">
        Price: {{ lowest.currency }}{{prices[0]}} - {{ lowest.currency }}{{prices[1]}}
      </div>
      <a
        class="btn btn-warning text-light"
      >Filter</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeItem',
  props: {
    lowest: Object,
    highest: Object
  },
  data() {
    return {
      settings: {
        connect: true,
        step: 50,
        margin: 100,
        range: {
          min: parseInt(this.lowest.value),
          max: parseInt(this.highest.value)+1
        },
        format: {
          'from': Number,
          'to': Number
        }
      },
      prices: [parseInt(this.lowest.value), parseInt(this.highest.value)]
    };
  }

};
</script>

<style scoped>

</style>
