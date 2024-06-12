<template>
  <div>
    <div id="smart-button-container">
      <div style="text-align: center; position: relative;">
        <div
          v-if="(shipping_method ==='' || address==='') || (!is_uae && (shipping_method === 'domestic' || shipping_method === 'pick_up'))  || displayOutOfStock "
          class="displayBtn"
        />
        <div id="paypal-button-container" />
      </div>
      <div>
        <p class="font-weight-bold" style="color: red" v-if="address ==''">*Please Select an address</p>
        <p class="font-weight-bold" style="color: red" v-if="shipping_method ==''">*Please Select a shipping method</p>
        <p class="font-weight-bold" style="color: red" v-if="!is_uae && (shipping_method === 'domestic' || shipping_method === 'pick_up')">*This shipping method is only supported in the UAE</p>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '~/api';
import {mapActions, mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters("auth", ["isAuthenticated","StateUser"]),
    ...mapGetters("shop",["displayOutOfStock"]),
  },

  props: {
    is_uae:{
      type: Boolean,
      required:true,
    },
    termsAndConditions:{
      type: Boolean,
      required:true,
    },
    isActive: {
      type: Boolean,
      required: true
    },
    PaymentFor: {
      type: String,
      default: 'order',
      required: true
    },
    address: {
      type: String,
      default: null,
      required: false
    },
    isValid: {
      type: Boolean,
      default: false,
      required: false
    },

    amount: {
      type: String,
      default: 0,
      required: false
    },
    shipping_method: {
      type: String,
      default: null,
      required: false
    },
    coupon_code: {
      type: String,
      default: null,
      required: false
    },
    brand: {
      type: Number,
      default: null,
      required: false
    },
    serialNumber: {
      type: String,
      default: null,
      required: false
    },
    contactChannel: {
      type: String,
      default: null,
      required: false
    },
    contactValue: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      response: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions("shop", [ "getCartList", "clearCart"]),
    init() {
        function loadScript(url, callback) {
        const el = document.querySelector(`script[src="${url}"]`);
        if(!el) {
          const s = document.createElement('script');
          s.setAttribute('src', url);
          s.onload = callback;
          document.head.insertBefore(s, document.head.firstElementChild);
        }
      }

      loadScript('https://www.paypal.com/sdk/js?client-id=Af49r0dUUTEjYOtfvNCqX5AnGmnHHTBotsmIjrP_Ni0q81YVxNzcBVAScbMzAN8U7J5RGFl2waFXGhFa&currency=USD', () => {
        let _this = this;
        paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'gold',
            layout: 'horizontal',
            label: 'paypal',
            tagline: false
          },
          createOrder(data, actions) {
            _this.createOrederInDatabese();
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: _this.amount,
                  _token: _this.csrfToken,
                  brand: 'BRAMD',
                  serial_number: 'SERILA-NUMBER',
                  contact_channel: 'CONTACT-CHANNEL',
                  contact_value: 'CONTACT-VALUE'
                }
              }]
            });
          },

          // finalize the transaction
          onApprove(data, actions) {
            return actions.order.capture().then(details => {
              _this.approvePayment(true);
            });
          },
          onCancel: function(data) {
            _this.approvePayment(false);
          },
          onError: function(err) {
            _this.approvePayment(false);
          }

        }).render('#paypal-button-container');
      });

    },
    createOrederInDatabese() {
      let dataForm = {
        address: this.address,
        payment_method: 'paypal',
        shipping_method: this.shipping_method,
        coupon_code: this.coupon_code
      };

      Api.post('/user/orders/create', dataForm)
        .then((response) => {
          this.response = response.data;
          this.order_id = response.data.data.order.order_id;
          this.payment_id = response.data.data.payment.order_id;

        });
    },
    approvePayment($success) {
      let dataForm = {
        success: $success,
        response: this.response,
        order_id: this.order_id,
        order_payment_id: this.payment_id

      };
      Api.post('/user/orders/paypal/response', dataForm).then((res) => {
        setTimeout(() => {
          let StateUser = this.StateUser;
          this.clearCart({StateUser});
        }, 2000);
        this.$router.push({path: '/account?tab=orders'});
        this.$notify({
          group: 'custom-notify',
          type: 'success',
          text:  this.$t("alerts.paymentSuccesfull"),
        });
      }).catch((error) => {
        let errorObj = error.response.data.data;

        this.$notify({
          group: 'errorMessage',
          type: 'error',
          text: error.response.data.data[Object.keys(errorObj)[0]][0]
        });
        // this.$router.push({path: '/account?tab=orders'});
      });
    }

  },
  watch: {
    isActive(newValue) {
      if (newValue) {
        this.init();
      }
    }
  }
};
</script>
<style>

.displayBtn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: #ffffff80;
}
</style>
