<template>
  <div>
    <div class="row">
      <div class="col-12">
        <ul class="text-danger font-weight-bold">
          <li>
            <i class="fa fa-exclamation-triangle"></i>
            {{ $t("products.serial_number_is_required") }}
          </li>
          <li class="my-2">
            <i class="fa fa-exclamation-triangle"></i>
            {{ $t("products.after_receiving_payment") }}
          </li>
        </ul>
      </div>
      <div class="col-12 m-0">
        <div class=" m-0">
          <label>{{ $t("products.serial_number") }}</label>
          <b-form-tags
            addButtonVariant="warning"
            id="serial_number"
            input-id="serial_number"
            remove-on-delete
            :class="`   border-warning `"
            size="lg"
            tagPills="false"
            :separator="['+', ',', ' ']"
            placeholder="Enter new serial number separated by space"
            v-model="serial_number"
          ></b-form-tags>
        </div>
      </div>
    </div>


    <div class="product-single-qty">
      <div
        v-if="product.hide_price == 0"
        class="input-group bootstrap-touchspin bootstrap-touchspin-injected"
      >
        <input
          v-model="qty"
          class="horizontal-quantity form-control bg-transparent"
          type="text"
          @change="changeQty($event)"
        />
      </div>
    </div>


    <base-button-icon-1 :disabled="serial_number.length == 0" @click="product.quantity = qty ; addToCart(product)"
                        :outline="true" class="p-3">
      {{ $t("products.addCart") }}
    </base-button-icon-1>

  </div>
</template>

<script>
import {mapActions} from "vuex";
import Api from "~/api";
import BaseButtonIcon1 from '~/components/common/BaseButtonIcon1.vue';

export default {
  components: {BaseButtonIcon1},
  comments: {
    BaseButtonIcon1,
  },
  data() {
    return {
      qty: 0,
      serial_number: [],
      validation_serial_number: false,
    };
  },
  props: {
    product: Object,
    /* tokens: Array, */
  },
  watch: {
    serial_number: function () {
      this.qty = this.serial_number.length;
      this.product["serial_number"] = this.serial_number;
    }
  },
 /*  created() {
     this.serial_number = this.tokens;
    this.qty = this.serial_number.length;
    if (!this.qty) {

      let product_cart = JSON.parse(localStorage.getItem('card')) || [];

      product_cart.forEach((item) => {
        console.log('i am item')
        console.log(item.slug)

        if (   this.products.slug=== item.slug) {
            this.serial_number = item.serial_number;
        }

      });
    }
  }, */
  methods: {
    ...mapActions("shop", ["addToCart"]),
    ...mapActions("compare", ["fetchList", "addToList"]),
    ...mapActions("fav", ["addToWishlist"]),

    addToCompare(item) {
      Api.post("/products/compares", {product: item.slug})
        .then((response) => {
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.message,
          });
        })
        .catch(() => {
        });
    },
    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=00905525700100&text=Could I please have the price of the ${product.title}`,
        "_blank"
      );
    },
    addTag(e) {
      this.qty = this.serial_number.length;
    },
  },
};
</script>
<style scoped>
.b-form-tags-list {
  height: 100%;
}

.b-form-tags-button {
  height: 30px !important;
  color: #fffaf4;
}

#serial_number {
  height: auto !important;
}
</style>
