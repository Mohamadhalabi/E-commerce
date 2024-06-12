  <template>
    <div class="dropdown cart-dropdown">
      <a
        href="javascript:;"
        title="Cart"
        class="dropdown-toggle cart-toggle"
        role="button"
        @click="showCartMenu">
        <i class="fa fa-shopping-cart"  />
        <span class="cart-count badge-circle">{{ cartCount }}</span>
      </a>
      <div class="cart-overlay" @click="hideCartMenu" />
      <div
        style="z-index: 99999!important;"
        class="dropdown-menu mobile-cart"
        :class="{
          'left-0': getIsAr,
          'transform-reverse': getIsAr,
          'right-auto': getIsAr,
        }">
        <a
          href="javascript:;"
          title="Close (Esc)"
          class="btn-close"
          :class="{ closeButtonToRightRtl: getIsAr }"
          @click="hideCartMenu">
          <button
            title="Close (Esc)"
            type="button"
            class="position-absolute close-button"
            @click="$emit('close')">
            ×
          </button>
        </a>

        <div class="dropdownmenu-wrapper custom-scrollbar">
          <div class="dropdown-cart-header d-flex">
            <div class="second" v-if="cartList.length > 0">
              <button
                @click="clearCart({ StateUser })"
                style="background-color: #892118;color: white;border-radius: 10px;font-size: 13px;margin-left: 5px"
                type="button"
                :outline="true"
                class="py-1 mb-1 font-weight-bold">
                <i style="color: white;font-size: 13px;" class="fa fa-trash remove-button"></i>
                Empty Cart
              </button>
              <span class="ml-5">
                {{ $t("header.shipping_cart") }}
              </span>
            </div>
          </div>
          <template v-if="cartList && cartList.length > 0">
            <div class="dropdown-cart-products">
              <div
                v-for="(product, index) in cartList"
                :key="product.sku"
                class="product py-3 mb-1 position-relative">
                <a
                  href="javascript:;"
                  title="Remove Product"
                  class="btn-close"
                  :class="{ closeButtonToRightRtl: getIsAr }"
                  @click="removeFromCart({ product, index })">
                  <button
                    title="Close (Esc)"
                    type="button"
                    class="position-absolute close-button">
                    ×
                  </button>
                </a>
                <div class="mx-1">
                  <figure>
                    <nuxt-link :to="getLink('/products/'+product.slug)">
                      <img
                        loading="lazy"
                      width="150"
                      height="150"
                      :src="product.gallery[0]['s']['url']"
                      alt="">
                    </nuxt-link>
                  </figure>
                </div>
                <div
                  class="product-details m-0 p-0 mx-1"
                  :class="{ 'text-right': getIsAr }">
                  <h4 class="product-title m-0 p-0" style="max-width: 75%">
                    <nuxt-link :to="getLink('/products/'+product.slug)">
                      {{ product.short_title }}
                    </nuxt-link>
                  </h4>

                  <h6 class="my-2 fw-bold">
                    <div class="row">
                      <div class="col-lg-12 sku-color"> {{$t('products.sku')}} :{{ product.sku }}</div>
                      <div class="col-lg-12 text-dark d-flex mt-1">
                        <pv-quantity-input
                          :qty="product.quantity"
                          :has_token="product.has_token_input"
                          :product="product"
                          @change="changeQuantity"
                        />
                        <span class="cart-price ml-4 m-auto">
                          {{product.price.currency + parseFloat(product.priceitem * product.quantity).toFixed(2) }}
                        </span>
                      </div>
                    </div>
                   </h6>
                  <div class="w-100 d-flex align-items-center">
                  </div>
                </div>
              </div>
            </div>
            <div :class="{'side-bar-cart-bottom-div': true, 'position-absolute': cartList.length <= 4}">
            <div class="dropdown-cart-total">
              <div>
                <span class="font-weight-bold">{{ $t("header.subtotal") }}:</span>
              </div>
              <div class="side-bar-price">
                <span class="cart-total-price mx-1">
                  {{ cartCurrency}} {{ cartPaymentPrice.toFixed(2) }}
              </span>
              </div>
            </div>
              <div class="dropdown-cart-action">
              <nuxt-link
                @click.native="hideCartMenu"
                :to="getLink('/cart')">
                <base-button-icon-1
                  class="py-3 my-1 w-100 view-cart-button"
                  :outline="true"
                  >{{ $t("header.view_cart") }}</base-button-icon-1
                >
              </nuxt-link>
              <nuxt-link
                @click.native="hideCartMenu"
                v-if="isAuthenticated" :to="getLink('/checkout')">
                <base-button-icon-1
                  class="w-100 py-3 mt-1 checkout-button"
                  :outline="true">
                  {{ $t("header.checkout") }}</base-button-icon-1>
              </nuxt-link>

              <nuxt-link
                @click.native="hideCartMenu"
                v-else :to="getLink('/auth/login')">
                 <base-button-icon1
                  :outline="true"
                  class="w-100 py-3 mt-1 checkout-button"
                  type="button"
                >
                  {{ $t("checkout.loginToGoToCheckout") }}
                  </base-button-icon1
                >
              </nuxt-link>
            </div>
            </div>
          </template>
          <p v-else class="cart-empty-text" :class="getIsAr ? 'text-right' : ''">
            {{ $t("header.no_product_in_cart") }}
          </p>
        </div>
      </div>
    </div>
  </template>

  <script>
  import BaseButtonIcon1 from "../BaseButtonIcon1.vue";
  import { mapGetters, mapActions } from "vuex";
  import PvQuantityInput from "~/components/features/PvQuantityInput.vue";
  export default {
    components: {
      PvQuantityInput,
      BaseButtonIcon1,
    },
    computed: {
      ...mapGetters("auth", ["isAuthenticated","StateUser"]),
      ...mapGetters("shop", [
        "cartCount",
        "cartList",
        "cartProductsPrice",
        "cartCurrency",
        "cartPaymentPrice",
      ]),
      ...mapGetters("rtlStore", ["getIsAr"]),
      ...mapGetters("language", ["getLang"]),
    },
    data() {
      return {
        qty: 1
      };
    },
    mounted() {
      this.getCartList();
    },
    methods: {
      ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity","clearCart"]),
      minusQty(product) {
        if(product.quantity > 1){
          product.quantity --;
        }
      },
      changeQty(e) {
      },
      getLink(route) {
        if (this.getLang === 'en') {
          this.getLang ="";
          return route; // No need to modify route for English
        } else {
          return `/${this.getLang}${route}`; // Include the language parameter
        }
      },
      ...mapActions("shop", ["getCartList", "removeFromCart"]),
      showCartMenu: function () {
        if (localStorage.getItem("tokenEnded") == 1) {
          document.querySelector("body").classList.add("cart-opened");
        } else if (this.$route.path !== "/cart")
          document.querySelector("body").classList.add("cart-opened");
      },
      hideCartMenu: function () {
        document.querySelector("body").classList.remove("cart-opened");
      },
    },
  };
  </script>
