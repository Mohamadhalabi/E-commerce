<template>
  <div class="order-content">
    <div class="row">
      <div class="col-lg-9">
        <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
          <i class="orange-1 icon-bag-2 cart-empty align-middle mx-2 pr-1" />
          {{
            $t("cart.shipping_cart")
          }}
        </h3>
      </div>
      <div class="col-lg-3 float-right" v-if="cartList.length > 0">
        <base-button-icon1
          class="py-4 float-right w-50 checkout-button"
          @click="
              $router.push(
                `/checkout${
                  dataForm.coupon_code
                    ? `?coupon_code=${dataForm.coupon_code}`
                    : ''
                }`
              )
            "
          type="button"
          :outline="true"
        >
          {{ $t("checkout.checkoutBtn") }}</base-button-icon1
        >
      </div>
    </div>
    <div class="container">
      <div v-if="cartList.length > 0" key="noEmpty">
        <div class="">
          <div class="">
            <table class="table table-responsive table-striped table-bordered shadow" :class="{ 'text-right': getIsAr }">
              <thead>
                <tr class="bg-white text-center">
                  <th>
                    {{ $t("common.delete")}}
                  </th>
                  <th class="text-center" style="width: 25%">
                    {{ $t("cart.product") }}
                  </th>
                  <th class="text-center">
                    {{ $t("cart.Sku") }}
                  </th>
                  <th class=" text-center">
                    {{ $t("cart.price") }}
                  </th>
                  <th class="text-center">
                    {{ $t("cart.quantity") }}
                  </th>
                  <th class="text-center">
                    {{ $t("cart.Subtotal") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in cartList"
                  :key="product.sku"
                  class="product-row"
                >
                  <td class="text-center" style="vertical-align: middle">
                    <i class="fa fa-trash remove-button"
                       @click="removeFromCart({ product, index })"
                    >
                    </i>
                  </td>
                  <td style="vertical-align: middle!important;">
                    <div class="row">
                      <div class="col-xl-4 col-lg-4 col-md-9 col-sm-9 m-auto col-12 m-auto">
                        <figure class="product-image-container position-relative product-cart-image-container"
                        >
                          <div class="position-relative">
                            <nuxt-link
                              :to="getLink('/products/'+product.slug)"
                            >
                              <pv-gallery-image
                                :key="product.gallery[0].m.id"
                                :image="product.gallery[0]"
                                class="m-auto cart-image"
                                width="80"
                                height="80"
                              />
                            </nuxt-link>
                          </div>
                        </figure>
                      </div>
                      <div class="col-xl-8 col-lg-8 col-md-12 text-center text-lg-left mt-auto mb-auto text-left ml-auto mr-auto">
                        <p class="product-title px-2 m-0 text-xl-left text-center font-weight-bold">
                          <nuxt-link :to="getLink('/products/'+product.slug)">
                            {{ product.short_title }}
                          </nuxt-link>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="sku-color text-center" style="vertical-align: middle">
                    {{ product.sku }}
                  </td>

                  <td class="price-color text-center font-weight-bold" style="vertical-align: middle">
                    {{ product.price.currency + product.price.value }}
                  </td>

                  <td class="text-center" style="vertical-align: middle">
                    <pv-quantity-input
                      :qty="product.quantity"
                      :product="product"
                      @changeQty="changeQuantity"
                    />
                  </td>

                  <td class="text-center font-weight-bold" style="vertical-align: middle">
                    <span class="price-color subtotal-price">
                      {{
                        product.price.currency +
                        (product.price.value * product.quantity).toFixed(2)
                      }}
                    </span>
                  </td>
                </tr>
              <tr>
                <td class="bg-white border-0"></td>
                <td class="bg-white border-0"></td>
                <td class="bg-white border-0"></td>
                <td class="bg-white border-0"></td>
                <td class="text-center font-weight-bold" style="vertical-align: middle">{{ $t("checkout.total") }}</td>
                <td class="text-center" style="vertical-align: middle">
                  <h4 class="total-price price-color m-0">
                    {{ cartCurrency + cartPaymentPrice }}
                  </h4>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
                <span class="nobr">price</span>
              </th>

              <th class="product-stock-status">
                <span class="nobr">Stock status</span>
              </th>

              <th class="product-add-to-cart">
                <span class="nobr">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody class="cart-items-wrapper">

            <tr class="border-0 py-0">
              <td colspan="6" class="px-3 py-2 text-center cart-empty">
               {{ $t('common.Noproductsaddedtothecart') }}
              </td>
            </tr>
            <tr class="border-0 py-0">
              <td colspan="6" class="px-3 text-center">

                <nuxt-link
                  :to="getLink('/shop')"
                >
                  <base-button-icon1 style="width: 150px;" :outline="true" class="py-4">{{ $t("cart.GoShop") }}</base-button-icon1>
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvQuantityInput from "~/components/features/PvQuantityInput";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import Api from "~/api";

export default {
  components: {
    PvGalleryImage,
    PvQuantityInput,
    BaseButtonIcon1,
  },
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
    };
  },
  created() {
    this.getCartList();
  },
  beforeCreate() {
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("shop", [
      "cartCount",
      "cartList",
      "cartProductsPrice",
      "cartCurrency",
      "cartTotalDiscount",
      "cartPaymentPrice",
    ]),
  },
  methods: {
    ...mapActions("shop", ["removeFromCart", "getCartList", "changeQuantity"]),
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
.cart-image{
  mix-blend-mode: multiply;
}
.cart-table{
  display: table;
}
@media screen and (max-width: 992px) {
  .checkout-button {
    width: 25% !important;
  }
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
</style>
