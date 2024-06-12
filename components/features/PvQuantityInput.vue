<template>
  <div class="product-single-qty">

    <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
      <span class="input-group-btn input-group-prepend" v-if="!has_token">
        <button

          class="btn btn-outline btn-down-icon bootstrap-touchspin-down"
          style="transition: none !important"
          type="button"
          :disabled="getDisplay"
          @click="minusQty"
          :style="getIsAr ? 'border-radius: 0px 6px 6px 0px' : 'border-radius:6px 0px 0px 6px ;'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 96 960 960"
            width="18"
          >
            <path d="M200 606v-60h560v60H200Z"/>
          </svg>
        </button>
      </span>

      <input
        class="horizontal-quantity form-control"
        type="number"
        :value="currentQty"
        :max="product.stock"
        @change="changeQty($event)"
        readonly
      />

      <span class="input-group-btn input-group-append" v-if="!has_token">
        <button
          :style="getIsAr ? 'border-radius:6px 0px 0px 6px' : 'border-radius:0px 6px 6px 0px !important;'"
          class="btn btn-outline btn-up-icon bootstrap-touchspin-up"
          type="button"
          style="transition: none !important"
          :disabled="getDisplay"
          @click="plusQty($event)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 96 960 960"
            width="18"
          >
            <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/>
          </svg>
        </button>
      </span>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    qty: Number,
    product: Object,
    has_token: Boolean
  },

  data: function () {
    return {
      currentQty: this.qty,
      minPurchaseQty:0,
    };
  },

  watch: {
    qty: function () {
      this.currentQty = this.qty;
    },
  },
  computed: {
    ...mapGetters("shop", ["getDisplay"]),
    ...mapGetters('rtlStore', ['getIsAr']),
  },

  methods: {
    changeQty: function (e) {
      // if (e.target.value > parseInt(this.product.stock))
      //   this.currentQty = this.product.stock;
      if (e.srcElement.valueAsNumber < 1) this.currentQty = 1;
      this.$emit("changeQty", {quantity: this.currentQty, product: this.product});
    },

    plusQty: function () {
      // if (this.currentQty < this.product.stock)
      this.currentQty++;
      let dataForm = {
        quantity: this.currentQty,
        product: this.product,
      };
      this.$emit("changeQty", dataForm);
    },

    minusQty: function () {
      if(this.currentQty <= this.product.min_purchase_qty) {
        this.currentQty = this.product.min_purchase_qty
      } else{
        this.currentQty--;
      }

      let dataForm = {
        quantity: this.currentQty,
        product: this.product,
      };

      this.$emit("changeQty", dataForm);
    },
  },
};
</script>

