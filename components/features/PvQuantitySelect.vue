<template>
<!--  <div class="product-single-qty">-->
<!--    <b-input-group>-->
<!--      <b-form-input hide-spin-buttons v-model="currentQty" type="number" :max="product.stock" @input="changeQty"></b-form-input>-->
<!--      <b-input-group-append>-->
<!--        <b-dropdown v-model="selected" text="Dropdown" class="m-md-2">-->
<!--          <b-dropdown-item v-for="option in options" :key="option.item" :value="option.item">-->
<!--            {{ option.name }}-->
<!--          </b-dropdown-item>-->
<!--        </b-dropdown>-->
<!--      </b-input-group-append>-->
<!--    </b-input-group>-->
<!--  </div>-->
  <b-input-group>
    <b-form-input></b-form-input>
    <template #append>
      <b-dropdown text="Dropdown" variant="success">
        <b-dropdown-item>Action A</b-dropdown-item>
        <b-dropdown-item>Action B</b-dropdown-item>
      </b-dropdown>
    </template>
  </b-input-group>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    qty: Number,
    product: Object,
    has_token: Boolean
  },
  data() {
    return {
      currentQty: this.qty,
      selected: 'A',
      options: [
        { item: 'A', name: 'Option A' },
        { item: 'B', name: 'Option B' },
        { item: 'D', name: 'Option C' },
      ],
    };
  },
  watch: {
    qty(newQty) {
      this.currentQty = newQty;
    },
  },
  methods: {
    changeQty() {
      // Your existing changeQty logic
      this.$emit("changeQty", { quantity: this.currentQty, product: this.product });
    },
  },
};
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
