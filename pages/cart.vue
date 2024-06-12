  <template>
  <div class="container">
    <div class="my-5">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link
                :to="getLink('/')">
                {{ $t("wishlist.home") }}
              </nuxt-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ $t("dashboard.cart") }}
            </li>
          </ol>
        </div>
      </nav>
    </div>
    <div v-if="cartList.length > 0">
      <button
        @click="clearCart({ StateUser })"
        style="background-color: #892118;
        color: white;border-radius: 10px;
        padding: 15px"
        type="button"
        :outline="true"
        class="py-3 mb-1 font-weight-bold">
        <i style="color: white;" class="fa fa-trash remove-button"></i>
        Empty Cart
      </button>
    </div>
    <client-only>
      <pv-free-shipping-amount></pv-free-shipping-amount>
    </client-only>
    <div
      v-if="cartList.length > 0"
      key="noEmpty"
      class="row account-container">
      <div class="col-lg-8">
        <table class="table table-bordered table-striped mt-0 table-responsive-md"
                 :class="{'text-right':getIsAr}">
            <thead class="thead-dark">
              <tr class="text-center bg-white vertical-align-middle">
                <th style="width: 10%">
                  {{ $t("cart.delete") }}
                </th>
                <th style="width: 40%">
                  {{ $t("cart.product") }}
                </th>
                <th style="width: 15%" class="">
                  {{ $t("cart.price") }}
                </th>
                <th style="width: 15%" class="qty-col text-center">
                  {{ $t("cart.quantity") }}
                </th>
                <th style="width: 20%" class="">
                  {{ $t("cart.Total") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, index) in cartList"
                :key="product.sku" :class="{ out_of_stock_class: outOfStockList.includes(product.sku) }">
                <td class="text-center vertical-align-middle">
                  <i class="fa fa-trash remove-button" @click="removeFromCart({ product, index })"></i>
                </td>
                <td class="vertical-align-middle">
                  <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-3 col-sm-6 col-12 m-auto">
                      <figure
                        class="product-image-container position-relative product-cart-image-container">
                        <div class="position-relative">
                          <nuxt-link
                            :to="getLink('/products/'+product.slug)"
                            class="product-image">
                            <img
                              class="ml-xl-2 ml-lg-2 ml-md-2 m-auto cart-image mix-blend-multiply"
                              width="100px"
                              height="100px"
                              :src="product.gallery[0]['s']['url']"
                              :alt="product.gallery[0]['l']['alt']"
                            />
                          </nuxt-link>
                        </div>
                      </figure>
                    </div>
                    <div class="col-xl-8 col-lg-7 col-md-9 col-sm-6 col-12 text-center text-md-left text-sm-left text-lg-left m-auto">
                      <h6 class="product-title m-auto">
                        <nuxt-link :to="getLink('/products/'+product.slug)">
                          {{ product.short_title }}
                          <div>
                            <span class="sku-color">
                          {{ $t("products.sku") }}: {{ product.sku }}</span>
                          </div>
                        </nuxt-link>
                      </h6>
                    </div>
                  </div>
                </td>

                <td class="price-color text-center font-weight-bold vertical-align-middle" style="">
                  <div v-if="isAuthenticated">
                    <span class="old-price mt-auto mb-auto" v-if="product.price_without_sale != product.sale_price.value">
                    </span>
                    <span>{{product.price.currency + product.sale_price.value}}</span>
                  </div>
                  <div v-else>
                    <div v-if="product.sale_price.value !='-'">
                      {{product.sale_price.value}}{{product.sale_price.currency}}
                    </div>
                    <div v-else>
                      {{product.price.value}}{{product.price.currency}}
                    </div>
                  </div>
                </td>

                <td class="text-center" style="vertical-align: middle">
                  <pv-quantity-input
                    :qty="product.quantity"
                    :has_token="product.has_token_input"
                    :product="product"
                    @changeQty="changeQuantity"
                  />
                </td>

                <td class="price-color text-center font-weight-bold" style="vertical-align: middle">
                  <span class="subtotal-price">
                    {{
                      product.price.currency +
                      parseFloat(product.priceitem * product.quantity).toFixed(2)
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
      <div class="col-lg-4">
        <div class="order-summary">
          <h3 style="border-bottom: 1px solid #ededed">{{ $t("cart.cartTotal") }}</h3>
          <table class="table table-mini-cart ">
            <tbody v-if="cartList.length == 0">
              <p class="cart-empty-text ml-3">
                {{ $t("checkout.cardEmpty") }}
              </p>
            </tbody>
            <tfoot>
              <tr class="cart-subtotal">
                <td class="pt-4">
                  <h4>{{ $t("checkout.subtotal") }}</h4>
                </td>

                <td class="price-color" style="vertical-align: middle">
                  <h4>{{
                    cartCurrency + cartPaymentPrice.toFixed(2)
                  }}</h4>
                </td>
              </tr>
              <tr class="order-total border-0">
                <td class="" style="vertical-align: middle">
                  <h4 class="total-price">
                    {{ $t("checkout.total") }}
                  </h4>
                </td>

                <td class="" style="vertical-align: middle">
                  <h2 class="price-color m-0">
                    {{ cartCurrency + cartPaymentPrice.toFixed(2) }}
                  </h2>
                </td>
              </tr>
            </tfoot>
          </table>
          <b-alert v-if="displayOutOfStock" show variant="danger">
            <i class="fa fa-exclamation-triangle"></i>
            {{ $t("cart.outOfStock") }} <span class="font-weight-bold" v-for="(outofstock,index) in outOfStockList" :key="index">
          {{outofstock}}
        </span> {{ $t("cart.notavailable") }} {{ $t('cart.weWillTry') }}
          </b-alert>
          <base-button-icon1
            class="w-100 py-4"
            @click="
              $router.push(
                getLink(`/checkout${
                  dataForm.coupon_code
                    ? `?coupon_code=${dataForm.coupon_code}`
                    : ''
                }`
              ))
            "
            type="button"
            v-if="isAuthenticated"
            :outline="true"
          >
            {{ $t("checkout.checkoutBtn") }}</base-button-icon1
          >

          <nuxt-link v-else
                     :to="getLink('/auth/login/')"
          >
            <base-button-icon1 type="button" :outline="true" class="py-4 w-100">
              {{ $t("checkout.loginToGoToCheckout") }}
            </base-button-icon1>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div v-else class="box-content">
      <table
        class="table-cart table-responsive"
        data-pagination="no"
        data-per-page="5"
        data-page="1"
        data-id
        data-token
        style="display: table;"
      >
        <thead class="d-none">
          <tr>
            <th class="product-thumbnail" />

            <th class="product-name">
              <span class="nobr">{{ $t("cart.products") }}</span>
            </th>

            <th class="product-price">
              <span class="nobr">{{ $t("cart.price") }}</span>
            </th>

            <th class="product-stock-status">
              <span class="nobr">{{ $t("cart.stockStatus") }}</span>
            </th>

            <th class="product-add-to-cart">
              <span class="nobr">{{ $t("cart.actions") }}</span>
            </th>
          </tr>
        </thead>

        <tbody class="cart-items-wrapper">
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center">
              <i class="icon-bag-2 cart-empty" />
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="px-3 py-2 text-center cart-empty">
              {{ $t("cart.NoProductsAdded") }}
            </td>
          </tr>
          <tr class="border-0 py-0">
            <td colspan="6" class="w-100 text-center">
              <base-button-icon-1
                :outline="true"
                style="width: 150px"
                class="py-4"
              >
                <nuxt-link style="color: white"
                           :to="getLink('/shop')"
                >
                  {{ $t("cart.GoShop") }}
                </nuxt-link>
              </base-button-icon-1>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PvQuantityInput from "~/components/features/PvQuantityInput";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import Api from "~/api";
import PvQuantitySelect from "~/components/features/PvQuantitySelect.vue";
export default {
  head() {
    return {
      title: "Cart | Techno Lock Keys Trading",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/cart',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Shopping Cart | Techno Lock Keys Trading"
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com/cart",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: `${this.$settings.social_media.twitter}`,
        },
        {
          name: "twitter:title",
          content: 'Cart | Techno Lock Keys Trading',
        },
        {
          name: "twitter:description",
          content: "Shopping Cart | Techno Lock Keys Trading"
        },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
      ],
    }
  },
  components: {
    PvQuantitySelect,
    PvFreeShippingAmount:() => import("~/pages/PvFreeShippingAmount.vue"),
    PvQuantityInput,
    BaseButtonIcon1,
  },
  data() {
    return {
      showInvalideMessage:false,
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
      free_shipping: 0,
      max: 1000,
      current: 900,
      animationDelay: `100ms`,
      outOfStockItems: [],
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("shop", [
      "cartCount",
      "cartList",
      "cartProductsPrice",
      "cartCurrency",
      "cartTotalDiscount",
      "cartPaymentPrice",
      "displayOutOfStock",
      "outOfStockList",
    ]),
    ...mapGetters("auth", ["isAuthenticated","StateUser"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    progressBarWidth() {
      const percentage = (this.cartPaymentPrice / this.$settings.shipping_methods[4].free_shipping) * 100;
      return `${percentage}%`;
    },
    progressColor() {
      if (this.current <= this.max) {
        return "#f8912d";
      }
    }
  },

  methods: {
    ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity", "clearCart"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    hiddenErrorMessage(event) {
      this.showInvalideMessage = false;
    },
    refetchPrice() {
      let query = "?";
      if (this.dataForm.address) {
        query += `address=${this.dataForm.address}&`;
      }

      if(this.dataForm.shipping_method ==""){
        query += `shipping_method=${"dhl"}&`;
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
        })
        .catch((error) => {
          console.log(error)
          this.showInvalideMessage = true;
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: "The selected coupon code is invalid.",
          });
        });
    },
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
.remove-button{
  color: #3e3e3e;
  cursor: pointer;
  font-size: 20px;
  transition: 0.5s;
}
.remove-button:hover{
  color: #212121;
}
@media screen and (max-width: 575px) {
  .cart-image {
    min-width: 100px;
  }
}
.vertical-align-middle{
  vertical-align: middle;
}
.mix-blend-multiply{
  mix-blend-mode: multiply;
}
.out_of_stock_class{
  background-color: red;
  border: 2px solid red
}
</style>
