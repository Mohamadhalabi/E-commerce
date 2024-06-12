<template>
  <div class="container"
       :class="{'text-right':getIsAr}">
    <div class="row" v-if="cartList.length > 0">
      <div :class="['col-lg-' + (checkout ? '12' : '8'), 'free-shipping']" style="border-style: dashed; padding: 25px; border-color: #e7e7e7; border-width: 2px;">
        <template v-if="cartPaymentPrice / exchange_rate >= $settings.shipping_methods[4].free_shipping">
          Congratulations, your order now qualifies for free shipping!
        </template>
        <template v-else>
          {{$t('cart.add')}} <span class="free-shipping-minus-cart-total">{{ cartCurrency }}{{ (($settings.shipping_methods[4].free_shipping * exchange_rate) - (cartPaymentPrice / exchange_rate)).toFixed(2) }}</span> {{$t('cart.toYour')}}
          <span v-if="this.isWishlist ==true">{{$t('cart.wishlist')}}</span> <span v-else>{{$t('cart.cart')}}</span>
          {{$t('cart.andGet')}} <span class="free-shipping-span">{{$t('cart.freeShipping')}}</span>
        </template>
        <div class="progress-bar mt-2">
          <div class="progress" :style="{ width: progressBarWidth, backgroundColor: progressColor }"></div>
        </div>
      </div>
      <div v-if="this.checkout !== true && this.isWishlist !==true" class="col-lg-4 mt-auto mb-auto ml-auto d-flex justify-content-lg-end mt-2 p-0 mt-lg-0">
        <button type="button" class="border-0 bg-white" @click="generatePdf()">
          <img src="../static/images/pdf-logo.png" class="pdf-logo" alt="PDF Button">
        </button>
<!--        <div v-if="StateUser">-->
<!--          <button v-if="StateUser['is_admin'] === 1" type="button" class="border-0 bg-white" @click="generateExcel()">-->
<!--            <img src="../static/images/excel.webp" class="excel-logo" alt="Excel Button">-->
<!--          </button>-->
<!--          <button v-if="StateUser['is_admin'] === 1" type="button" class="border-0 bg-white" @click="generateWord()">-->
<!--            <img src="../static/images/word-logo.webp" class="word-logo" alt="word Button">-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import api from "~/api";
import Api from "~/api";
import {scrollTopHandler} from "~/utils";
export default {
  props:['checkout','isWishlist'],

  data() {
    return {
      dataForm: {
        address: "",
        payment_method: "stripe",
        card_name: "",
        card_id: "",
        card_exp_month: "",
        card_exp_year: "",
        card_cvc: "",
        coupon_code: "",
        shipping_method: "ups",
      },
      exchange_rate: 0,
      free_shipping: 0,
      animationDelay: `100ms`,
      totalWishList: 0
    };
  },
  created() {
    this.getCartList();
    let selected_currency = localStorage.getItem('currency');
    if(selected_currency == null){
      selected_currency ="USD"
    }
    Api.post("exchange-rate", selected_currency)
      .then((response) => {
        this.exchange_rate = response.data;
      })
      .catch((error) => {
        let errorObj = error.response.data.data;
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: error.response.data.data[Object.keys(errorObj)[0]][0],
        });
      })
    },
  computed: {
    ...mapGetters("shop", [
      "cartCount",
      "cartList",
      "cartProductsPrice",
      "cartCurrency",
      "cartTotalDiscount",
      "cartPaymentPrice",
    ]),
    ...mapGetters("auth", ["isAuthenticated","StateUser"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("fav",["getWishlistList"]),
    progressBarWidth() {
      if (this.cartPaymentPrice / this.exchange_rate >= this.$settings.shipping_methods[4].free_shipping) {
        return '100%';
      } else {
        const percentage = ((this.cartPaymentPrice / this.exchange_rate) / this.$settings.shipping_methods[4].free_shipping) * 100;
        return `${percentage}%`;
      }
    },
    progressColor() {
        return "#f8912d";
    }
  },

  mounted() {
  },

  methods: {
    ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity"]),
    generateWord(){
      Api.get(`/generate-word`, { params: { user: this.StateUser.id, currency: this.cartCurrency } })
        .then((response) => {
          let url ="https://dev-srv.tlkeys.com"+response.data.file_url;
          window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
          );
        })
        .catch((error) => {
          console.error('Error generating Excel:', error);
        });
    },
    generateExcel() {
      Api.get(`/generate-excel`, { params: { user: this.StateUser.id, currency: this.cartCurrency } })
        .then((response) => {
          let url ="https://dev-srv.tlkeys.com"+response.data.file_url;
          window.open(
            url,
            '_blank' // <- This is what makes it open in a new window.
          );
        })
        .catch((error) => {
          console.error('Error generating Excel:', error);
        });
    },
    generatePdf() {
      let idsWithQuantities = [];
      this.cartList.forEach(item => {
        idsWithQuantities.push({
          id: item.id,
          sku: item.sku,
          quantity: item.quantity,
          one_piece_price: item.priceitem,
          product_image: item.gallery[0]['m']['url'],
          product_title: item.title
        });
      });
      if (this.StateUser != null) {
        Api.get(`/generate-pdf`, {params: {user: this.StateUser.id, currency: this.cartCurrency}})
          .then((response) => {
            // Assuming the response contains the base64-encoded PDF data as 'pdf'
            if (response.data.pdf) {
              // Convert base64 to binary data
              const pdfBinary = atob(response.data.pdf);

              // Convert the binary data to a Uint8Array
              const pdfArray = new Uint8Array(pdfBinary.length);
              for (let i = 0; i < pdfBinary.length; i++) {
                pdfArray[i] = pdfBinary.charCodeAt(i);
              }

              // Create a Blob from the Uint8Array
              const pdfBlob = new Blob([pdfArray], {type: 'application/pdf'});

              // Create a URL for the Blob
              const pdfUrl = URL.createObjectURL(pdfBlob);

              // Open the PDF in a new tab or window
              window.open(pdfUrl, '_blank');
            }
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
          });
      }
      else{
        Api.get(`/generate-pdf-without-auth`, {params: {products: idsWithQuantities, currency: this.cartCurrency}})
          .then((response) => {
            // Assuming the response contains the base64-encoded PDF data as 'pdf'
            if (response.data.pdf) {
              // Convert base64 to binary data
              const pdfBinary = atob(response.data.pdf);

              // Convert the binary data to a Uint8Array
              const pdfArray = new Uint8Array(pdfBinary.length);
              for (let i = 0; i < pdfBinary.length; i++) {
                pdfArray[i] = pdfBinary.charCodeAt(i);
              }

              // Create a Blob from the Uint8Array
              const pdfBlob = new Blob([pdfArray], {type: 'application/pdf'});

              // Create a URL for the Blob
              const pdfUrl = URL.createObjectURL(pdfBlob);

              // Open the PDF in a new tab or window
              window.open(pdfUrl, '_blank');
            }
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
          });
      }
    }

  },
};
</script>
<style>
.free-shipping-minus-cart-total{
  color: #f8912d;
  font-weight: 600;
}
.free-shipping{
  font-size: 16px;
  color: #797979;
}
.free-shipping-span{
  font-weight: bold;
  color: black;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: lightgray;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 5px;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.2) 10px,
    rgba(0, 0, 0, 0.2) 20px
  );
}
img.pdf-logo{
  width: 50px;
  height: auto;
}
img.excel-logo{
  width: 100px;
}
img.word-logo{
  width: 75px;
}
</style>
