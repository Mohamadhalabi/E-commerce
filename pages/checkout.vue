<template>
  <main class="main main-test">
    <div class="container checkout-container">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/')">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/cart')"> {{ $t("dashboard.cart") }} </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            <a href="javascript:;">{{ $t("dashboard.checkout") }}</a>
          </li>
        </ol>
        <button type="button" class="border-0 bg-white" @click="generatePdf()">
          <img src="../static/images/pdf-logo.png" class="pdf-logo" alt="PDF Button">
        </button>
      </nav>
      <template v-if="cartList.length > 0">
        <div class="row">
          <div class="col-lg-8">
            <pv-free-shipping-amount class="p-3" :checkout="true"></pv-free-shipping-amount>
            <div class="mt-1 coupon-box-checkout">
              <div class="col-lg-12 text-center">
                <p class="text-black-50">{{ $t('checkout.IfYouHaveAcoupon') }}</p>
              </div>
              <div class="col-lg-12 text-center">
                <input
                  class="form-input mr-2 apply-coupon-input text-black-50"
                  v-model="dataForm.coupon_code"
                  type="text"
                  @input="hiddenErrorMessage"
                  :placeholder="$t('checkout.enterCouponCode')"
                >
                <button
                  class="checkout-default-button mt-1"
                  :disabled="!dataForm.coupon_code"
                  type="button"
                  @click="refetchPrice"
                >{{ $t('checkout.applyCoupon')}}
                </button>
              </div>
            </div>

            <div class="col-lg-12 p-0 mt-2 stepper">
              <div class="bs-stepper stepper-bg">
                <div class="bs-stepper-header">
                  <!-- your steps here -->
                  <div class="step ">
                    <span class="step-trigger">
                      <span class="bs-stepper-circle stepper-address" ></span>
                      <span class="bs-stepper-label checkout-steps">{{ $t('checkout.addrress') }}</span>
                    </span>
                  </div>
                  <div class="line"></div>
                  <div class="step">
                    <span class="step-trigger">
                      <span class="bs-stepper-circle stepper-shipping"></span>
                      <span class="bs-stepper-label checkout-steps">{{ $t('checkout.shippingMethod') }}</span>
                    </span>
                  </div>
                  <div class="line"></div>
                  <div class="step">
                    <span class="step-trigger">
                      <span class="bs-stepper-circle stepper-payment"></span>
                      <span class="bs-stepper-label checkout-steps">{{ $t('checkout.paymentMethod') }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 mt-2 border-with-top-text">
              <pv-addresses
                @DefaultAddress="CheckIfDefaultExists"
                @address="GetNewAddress"
                :checkout="true"
              />
            </div>
            <h5 v-if="this.is_shipping_method_disabled" style="color: red;margin: 0;" class="text-center mt-2">* {{ $t('checkout.selectAddress') }}</h5>
            <transition name="slide">
              <div class="col-lg-12 mt-2 border-with-top-text-shipping-method">
                <div class="row" :class="{ 'text-right': getIsAr }">
                  <div
                    v-for="(item, index) in ['dhl', 'aramex', 'fedex', 'ups','domestic','pick_up']" :key="index" class="col-lg-3 col-md-3 col-sm-3 col-6 mt-auto mb-auto text-center">
                    <label :for="item" class="addressStyle mt-2 mb-2 ml-2 mr-2" :class="dataForm.shipping_method == item ? 'selectedAddress' : 'notSelectedAddress'">
                      <div class="row">
                        <div class="col-lg-9 mr-auto ml-auto">
                          <input
                            type="radio"
                            class="d-none"
                            :id="item"
                            :disabled="is_shipping_method_disabled"
                            v-model="dataForm.shipping_method"
                            :value="item"
                            @click="GetShippingMethod(item)"
                          />
                          <img
                            v-if="item !=='pick_up' && item !=='domestic'"
                            class="shipping-methods"
                            :src="`./images/payments_and_shipping/${item}-png.png`"
                            :alt="item"
                            :title="item"
                            :class="{ 'custom-disabled-class': is_shipping_method_disabled }"
                          />
                          <img
                            v-if="item =='pick_up'"
                            class="shipping_methods"
                            :src="`./images/payments_and_shipping/pick-up.jpg`"
                            alt="Pick Up from our store"
                            title="Pick Up From Our Store!"
                            :class="{ 'custom-disabled-class': is_shipping_method_disabled }"
                          />
                          <img
                            v-if="item =='domestic'"
                            class="shipping_methods"
                            :src="`./images/payments_and_shipping/domestic-shipping.png`"
                            alt="Domestic Shipping"
                            title="Domestic Shipping"
                            :class="{ 'custom-disabled-class': is_shipping_method_disabled }"
                          />
                        </div>
                      </div>
                    </label>
                    <input
                      class="radio"
                      type="radio"
                      :disabled="is_shipping_method_disabled"
                      v-model="dataForm.shipping_method"
                      :value="item"
                      @click="GetShippingMethod(item)"
                    />
                  </div>
                </div>
              </div>
            </transition>
            <h5 v-if="this.is_payment_method_disabled" style="color: red;margin: 0;" class="text-center mt-2">* {{ $t('checkout.selectAShipping')}}</h5>
            <transition name="slide">
              <div class="col-lg-12 mt-4 border-with-top-text-payment-method">
                <div class="row" :class="{ 'text-right': getIsAr }">
                  <div class="col-lg-4 mt-lg-4">
                    <div
                      class="card text-center paymentMethod-card"
                      style="max-height: 100px!important; min-height: 100px"
                      :class="{ 'payment-method-active': clickedCardIndex === 1 }"
                      @click="handlePaymentMethod(1),CheckCardSelected()"
                    >
                      <div class="card-body payment-method-card">
                        <div class="row">
                          <div class="col-lg-8 mt-auto mb-auto payment-method-text">
                            {{ $t('checkout.creditDebitCard') }}
                          </div>
                          <div class="col-lg-4 mb-auto mt-auto payment-methods">
                            <i class="far fa-credit-card"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <input
                        class="radio"
                        type="radio"
                        :disabled="is_payment_method_disabled"
                        v-model="clickedCardIndex"
                        :value="1"
                        @click="handlePaymentMethod(1),CheckCardSelected()"
                      />
                    </div>
                  </div>

                  <div class="col-lg-4 mt-lg-4">
                    <div
                      class="card text-center paymentMethod-card"
                      style="max-height: 100px!important; min-height: 100px"
                      :class="{ 'payment-method-active': clickedCardIndex === 2 }"
                      @click="handlePaymentMethod(2),CheckCardSelected()"
                    >
                      <div class="card-body payment-method-card">
                        <div class="row">
                          <div class="col-lg-8 mt-auto mb-auto payment-method-text">
                            {{ $t('checkout.payPal') }}
                          </div>
                          <div class="col-lg-4 mb-auto mt-auto payment-methods">
                            <i class="fab fa-paypal"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <input
                        class="radio"
                        type="radio"
                        :disabled="is_payment_method_disabled"
                        v-model="clickedCardIndex"
                        :value="2"
                        @click="handlePaymentMethod(2),CheckCardSelected()"
                      />
                    </div>
                  </div>
                  <div class="col-lg-4 mt-lg-4">
                    <div
                      class="card text-center paymentMethod-card"
                      style="max-height: 100px!important; min-height: 100px"
                      :class="{ 'payment-method-active': clickedCardIndex === 3 }"
                      @click="handlePaymentMethod(3),CheckCardSelected()"
                    >
                      <div class="card-body payment-method-card">
                        <div class="row">
                          <div class="col-lg-8 mt-auto mb-auto payment-method-text">
                            {{ $t('checkout.buyNowPayLater') }}
                          </div>
                          <div class="col-lg-4 mb-auto mt-auto payment-methods">
                            <i class="fas fa-university"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center">
                      <input
                        class="radio"
                        type="radio"
                        :disabled="is_payment_method_disabled"
                        v-model="clickedCardIndex"
                        :value="3"
                        @click="handlePaymentMethod(3),CheckCardSelected()"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </transition>

            <transition name="slide">
              <div class="col-lg-12 mt-2 bank-transfer-payment" v-if="clickedCardIndex == 3">
                <div class="container mt-2">
                  <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>{{ $t('checkout.bank') }}</th>
                        <th>{{ $t('checkout.accountNumber') }}</th>
                        <th>{{ $t('checkout.SortCode') }}</th>
                        <th style="width: 25%">{{ $t('checkout.IBAN') }}</th>
                        <th>{{ $t('checkout.BIC') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td data-label="Flight No.">ADCB</td>
                        <td data-label="Destination">699321041001</td>
                        <td data-label="Time">ADCBAEAA</td>
                        <td data-label="Gate">AE470030000699321041001</td>
                        <td data-label="Status">ADCBAEAA</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </transition>
          </div>
          <div class="col-lg-4 mt-1 p-0 stepper-bg">
            <div class="table-container p-3" v-if="checkoutData !=null">
              <table class="custom-table">
                <thead class="checkout-table-header">
                <p class="your-order">{{ $t("checkout.yourOrder") }}</p>
                </thead>
                <tbody>
                <tr
                  v-for="(product, index) in checkoutData.products"
                  :key="`cart-product-${index}`"
                  class="checkout-table-body"
                  v-if="index < 5 || showAllResults"
                >
                  <td>
                    <div class="row">
                      <div class="col-lg-2 col-md-2 col-sm-2 col-3 align-center m-auto">
                        <nuxt-link :to="getLink('/products/'+product.slug)">
                          <img :src="product.gallery[0].s.url" class="ml-auto mr-auto" :alt="product.gallery[0].s.alt" />
                        </nuxt-link>
                      </div>
                      <div class="col-lg-6 col-md-4 col-sm-4">
                        <p class="product-title pt-3 mt-auto mb-auto">
                          {{ product.short_title }}
                          <span class="sku-color sku-color-checkout d-flex justify-content-lg-start justify-content-md-start text-center">
                            SKU: {{ product.sku }}
                          </span>
                        </p>
                        <span style="color: red;font-weight: bold;font-size: 12px" v-if="product.quantity > product.stock">
                          {{ $t("checkout.outOfStock") }}
                        </span>
                      </div>
                      <div class="col-lg-4 col-md-6 col-sm-6 mt-auto mb-auto product-quantity-price text-lg-right text-md-right text-sm-right text-center">
                        <span class="product-qty">{{ product.quantity }} X</span>
                        <span
                          v-if="product.price"
                          class="text-black font-weight-bold">
                            {{ product.price.value + " " + product.price.currency }}
                          </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <br>
                <tr v-if="checkoutData.products.length > 5" class="checkout-table-pagination">
                  <td colspan="2">
                    <a @click="showAllResults = !showAllResults" class="checkout-table-pagination-a">
                      <button class="checkout-default-button" style="width: auto">
                        {{ showAllResults ? $t('shop.showLess') : $t('shop.seeAllResults') }}
                      </button><span v-if="!showAllResults" class="product-counter" style="color: white; font-size: 18px;">
                        ({{ checkoutData.products.length }})
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="payment-details-td">
                    <div class="row p-3 mt-1" v-if="checkoutData.total_before_coupon">
                      <div class="col-lg-8 col-sm-6 col-2 checkout-table-body">
                        <h6 class="">{{ $t("checkout.subtotal") }} Before Coupon</h6>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-2 checkout-table-body font-weight-bold text-align-end" style="text-decoration: line-through">
                        {{parseFloat(checkoutData.total_before_coupon.value).toFixed(2) + " " + checkoutData.total_before_coupon.currency}}
                      </div>
                    </div>
                    <div class="row p-3" v-if="checkoutData.total_before_coupon">
                      <div class="col-lg-8 checkout-table-body d-flex">
                        <h6 class="text-success">
                          <i class="fa fa-times text-danger" @click="removeCoupon" style="cursor: pointer">
                          </i>
                          {{ $t("checkout.coupon") }}: {{ dataForm.coupon_code }}
                        </h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body text-align-end">
                        <b>{{parseFloat(checkoutData.discount_value.value * -1).toFixed(2) + " " + checkoutData.discount_value.currency}}</b>
                      </div>
                    </div>
                    <div class="row p-3 mt-1">
                      <div class="col-lg-8 checkout-table-body">
                        <h6>{{ $t("checkout.subtotal") }}</h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body font-weight-bold text-align-end">
                      <span v-if="!checkoutData.discount">
                        {{
                          checkoutData.sub_total.value +
                          " " + checkoutData.sub_total.currency
                        }}</span>
                      </div>
                    </div>
                    <div v-if="!checkoutData.total_before_coupon && dataForm.coupon_code!=''" class="row p-3">
                      <div class="col-lg-8 checkout-table-body">
                        <h6 class="">
                          {{ $t("checkout.coupon") }}
                        </h6>
                      </div>
                      <div class="col-lg-4 checkout-table-body font-weight-bold text-align-end">
                        0
                      </div>
                    </div>
                    <div class="row p-3">
                      <div class="col-lg-8 checkout-table-body checkout-payment-method-shipping">
                        <h6>{{ $t("checkout.shippingPrice") }} Method</h6>
                        <p class="text-uppercase"
                        v-if="dataForm.shipping_method =='pick_up'">
                          Pick Up from our store
                        </p>
                        <p class="text-uppercase"
                           v-else-if="dataForm.shipping_method =='domestic'">
                          Domestic Shipping
                        </p>
                        <p class="text-uppercase"
                           v-else>
                          {{ dataForm.shipping_method }}
                        </p>
                        <p class="m-1 text-uppercase" v-if="dataForm.shipping_method ===''">---</p>
                      </div>
                      <div class="col-lg-4 checkout-table-body font-weight-bold mt-lg-3 text-align-end">
                        <span>{{checkoutData.shipping_cost.value + " " + checkoutData.shipping_cost.currency }}</span>
                      </div>
                    </div>
                    <div class="row p-3">
                      <div class="col-lg-12 checkout-table-body">
                        <h6>Payment Method</h6>
                        <p class="text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == 1"
                        >Credit / Debit Card
                        </p>

                        <p class="text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == 2"
                        >Paypal
                        </p>

                        <p class="text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == 3"
                        >Transfer
                        </p>
                        <p class="m-1 text-uppercase checkout-payment-method-shipping"
                           v-if="this.clickedCardIndex == null"
                        >---
                        </p>

                      </div>
                    </div>

                    <div class="row p-3">
                      <div class="col-lg-8 checkout-table-body">
                        <h4>{{ $t("checkout.total") }}</h4>
                      </div>
                      <div class="col-lg-4 checkout-table-body text-align-end">
                        <b class="total-price"
                           style="font-weight: 600;font-size: 22px"
                        >{{
                            checkoutData.dolar_price.value +
                            checkoutData.dolar_price.currency
                          }}
                        </b>
                      </div>
                    </div>

                    <div class="row p-3 ml-auto mr-auto">
                      <div class="col-lg-12 d-flex flex-wrap">
                        <input class="mr-2" type="checkbox"
                               v-model="termsAndConditions"
                        >
                        I have read and agree the website <span class="font-weight-bold" style="color:#556b2f !important;">
                        <a href="/terms" target="_blank">
                          terms and conditions
                        </a>
                      </span>
                      </div>
                    </div>

                    <div>
                      <p
                        v-if="hasBlockedCountry"
                        class="mt-2"
                        style="font-size: 12px; color: #ff8181"
                      >
                        You can not complate order becuse you are added blocked
                        country product
                      </p>


                      <base-button-icon-1
                        class="py-4 w-100"
                        type="button"
                        :disabled="hasBlockedCountry"
                        @click="createOrder"
                        :outline="true"
                      ><span v-if="!loadingOrder">
                    {{ $t("checkout.createOrder") }}
                  </span>
                        <b-spinner v-else class=""
                        /></base-button-icon-1>
                      <div class="mt-2">
<!--                        <PaypalBtn-->
<!--                          v-if="checkoutData && dataForm.payment_method == 'paypal'"-->
<!--                          ref="mediaRef"-->
<!--                          :payment-for="'order'"-->
<!--                          :amount="checkoutData.dolar_price.value"-->
<!--                          :coupon_code="dataForm.coupon_code"-->
<!--                          :shipping_method="dataForm.shipping_method"-->
<!--                          :address="dataForm.address"-->
<!--                          :is-valid="checkIsValidPayment && !hasBlockedCountry"-->
<!--                          :termsAndConditions="termsAndConditions"-->
<!--                          :is_uae="this.is_uae"-->
<!--                          :isActive="this.isActive"-->
<!--                        />-->
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="box-content">
        <table
          class="table-cart"
          data-pagination="no"
          data-per-page="5"
          data-page="1"
          data-id
          data-token
        >
          <thead class="d-none">
          <tr>
            <th class="product-thumbnail" />

            <th class="product-name">
              <span class="nobr">{{ $t("checkout.products") }}</span>
            </th>

            <th class="product-price">
              <span class="nobr">{{ $t("checkout.price") }}</span>
            </th>

            <th class="product-stock-status">
              <span class="nobr">{{ $t("checkout.stockStatus") }}</span>
            </th>

            <th class="product-add-to-cart">
              <span class="nobr">{{ $t("checkout.actions") }}</span>
            </th>
          </tr>
          </thead>

          <tbody class="cart-items-wrapper">
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center">
              <p class="noproduct-msg mb-2">
                {{ $t("checkout.CheckoutNotAvailable") }}
              </p>
              <i class="icon-bag-2 cart-empty" />
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center cart-empty">
              {{ $t("checkout.noProductCard") }}
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 text-center">
              <nuxt-link :to="getLink('/shop')" class="btn btn-go-shop">
                {{ $t("checkout.returnToShop") }}
              </nuxt-link>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="mb-6" />
      </div>
    </div>
    <AddressDialog
      :type-form="typeForm"
      @close="closedEvent"
    />
  </main>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Api from "~/api";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import PvFreeShippingAmount from "~/pages/PvFreeShippingAmount.vue";
import PvAddresses from "~/components/account/PvAddresses.vue";
export default {
  components: {
    PvAddresses,
    PvFreeShippingAmount,
    AddressDialog: () => import("~/components/account/PvAddressFormModal"),
    BaseButtonIcon1,
  },
  data: function () {
    return {
      is_uae:false,
      is_shipping_method_disabled: true,
      is_payment_method_disabled: true,
      termsAndConditions:false,
      showAllResults: false,
      clickedCardIndex: null,
      checkIsValidPayment: false,
      loadingOrder: false,
      checkoutData: null,
      address: [],
      selectedAddress:false,
      hasBlockedCountry: false,
      typeForm: "add",
      dataForm: {
        address: "",
        payment_method: "",
        card_name: "",
        card_id: "",
        coupon_code: "",
        shipping_method: "",
      },
      showInvalideMessage: false,
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("auth", ["isAuthenticated","StateUser"]),
    ...mapGetters("shop", [
      "cartList",
      "cartProductsPrice",
      "cartCurrency",
      "cartPaymentPrice",
      "displayOutOfStock",
    ]),
    ...mapGetters("rtlStore", ["getIsAr"]),
  },

  watch: {
    "dataForm.payment_method": function (val) {
      if (val == "paypal") {
        this.dataForm.card_id = "-1";
      } else {
        const element = document.getElementsByTagName("head");
        element[0].removeChild(element[0].children[0]);
      }
    },
    "dataForm.shipping_method": function (val) {
      this.refetchPrice();
    },
    dataForm: {
      handler: function (val) {
        if (!val.shipping_method || !val.address) {
          this.checkIsValidPayment = false;
        } else {
          this.checkIsValidPayment = true;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.refetchPrice()
  },
  methods: {
    ...mapActions("shop", ["getCartList"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    generatePdf(){
      // this.$Progress.start();
      Api.get(`/generate-pdf-checkout`, {params: {user: this.StateUser.email, currency: this.cartCurrency, address:this.dataForm.address,shipping_method:this.dataForm.shipping_method
          ,shipping_cost:this.checkoutData.shipping_cost.value}})
        .then((response) => {
          // this.$Progress.finish();
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
    },
    CheckCardSelected(){
      if(!this.is_payment_method_disabled) {
        const value = this.clickedCardIndex;
        if (value !== null) {
          // if(this.clickedCardIndex === 1 && value !== -1){
          const spanElement = document.querySelector('.stepper-payment');
          if (value) {
            spanElement.style.backgroundColor = '#556b2f';
          } else {
            spanElement.style.backgroundColor = '#6c757d';
          }
        }
      }
    },
    GetShippingMethod(value){
      const spanElement = document.querySelector('.stepper-shipping');
      if (value) {
        spanElement.style.backgroundColor = '#556b2f';
        this.is_payment_method_disabled = false
      } else {
        spanElement.style.backgroundColor = '#6c757d';
      }
    },
    handlePaymentMethod(index) {
      if(!this.is_payment_method_disabled) {
        this.clickedCardIndex = index;
        if (this.clickedCardIndex === 1) {
          this.dataForm.payment_method = "stripe_link_online"
        } else if (this.clickedCardIndex === 2) {
          this.dataForm.payment_method = "paypal"
        } else if (this.clickedCardIndex === 3) {
          this.dataForm.payment_method = "transfer_online"
        }
      }
    },
    CheckIfDefaultExists(val) {
      const spanElement = document.querySelector('.stepper-address');
      if (val) {
        spanElement.style.backgroundColor = '#556b2f';
      } else {
        spanElement.style.backgroundColor = '#6c757d';
      }
      this.selectedAddress = val;
      if(this.selectedAddress){
        this.is_shipping_method_disabled = false;
      }
    },

    GetNewAddress(value){
      this.dataForm.address = value.id
      this.refetchPrice()
      Api.post("/user/addresses/check-if-uae",{ id: value.id }).then((res) =>{
        this.is_uae = res.data.message
      })
    },
    hiddenErrorMessage(event) {
      this.showInvalideMessage = false;
    },
    createOrder() {
      if (this.dataForm.address == "") {
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: this.$t('alerts.PleaseSelect')
        });
      }
      else if (this.dataForm.shipping_method == "") {
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: this.$t('alerts.PleaseChoose')
        });
      }
      else if (this.dataForm.payment_method == ""){
        this.$notify({
          group: "errorMessage",
          type: "error",
          text: this.$t('alerts.PleaseSelectPaymentMethod')
        });
      }
      else {
        if (this.termsAndConditions == true) {
          if(!this.is_uae && this.dataForm.shipping_method == "domestic" || !this.is_uae && this.dataForm.shipping_method =="pick_up"){
            this.$notify({
              group: "custom-notify",
              type: "error",
              text: this.$t("alerts.domesticShipping"),
            })
          }
          else{
            this.loadingOrder = true;
            this.$nuxt.$loading.start()
            Api.post("/user/orders/create", this.dataForm)
              .then((response) => {
                this.$nuxt.$loading.finish()
                if (this.dataForm.payment_method == 'stripe_link_online') {
                  location.href = response.data.data.payment.stripe_url
                }

                else if(this.dataForm.payment_method == 'paypal'){
                  location.href = response.data.data.paypal_url
                }
                else {
                  this.$router.push({
                    path: "/complete-order",
                    query: {
                      orderId: response.data.data.order.order_id,
                      success: response.data.data.order.success,
                      message: response.data.data.message,
                    },
                  });
                }
              })
              .catch((err) => {
                this.$notify({
                  group: "errorMessage",
                  type: "error",
                  text: err.response.data.message,
                });
                this.loadingOrder = false;
              });
          }
        }
        else {
          this.$notify({
            group: "custom-notify",
            type: "error",
            text: this.$t("alerts.acceptTerms"),
          })
        }
      }
    },

    refetchPrice() {
      // this.$Progress.start();
      let query = "?";
      if (this.dataForm.address) {
        query += `address=${this.dataForm.address}&`;
      }
      if(this.dataForm.shipping_method ==""){
        query += `shipping_method=${"NULL"}&`;
      }
      else if (this.dataForm.shipping_method !="") {
        query += `shipping_method=${this.dataForm.shipping_method}&`;
      }
      if (this.dataForm.coupon_code) {
        query += `coupon_code=${this.dataForm.coupon_code}`;
      }
      Api.get(`/user/orders/checkout${query}`)
        .then((response) => {
          this.checkoutData = response.data;
          if(this.dataForm.shipping_method ==""){
            this.checkoutData.shipping_cost.value = 0.00
          }
          this.checkHasBlockedCountry(this.checkoutData.products);
          // this.$Progress.finish();
        })
        .catch((error) => {
          console.log(error)
        });
    },

    checkHasBlockedCountry(products) {
      this.hasBlockedCountry = false;
      for (let index = 0; index < products.length; index++) {
        if (products[index]["message"]) {
          this.hasBlockedCountry = true;
        }
      }
    },

    removeCoupon() {
      this.dataForm.coupon_code = null;
      this.refetchPrice();
    },
  },
};
</script>
<style>
.custom-disabled-class{
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
.paymentMethod-card{
  margin-bottom: 1rem!important;
}
</style>
