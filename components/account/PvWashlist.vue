<template>
  <div class="whatsnewlass">
   <!--  <h3 class="account-sub-title d-none d-md-block text-center">
      {{ $t("account.wishlist") }}
    </h3> -->

    <h3 class="account-sub-title d-md-block mt-0 pt-1 ml-1">
        <i class="orange-1 far fa-heart wishlist-empty align-middle mx-2 pr-1" /> {{ $t("account.wishlist") }}
      </h3>

    <div class="container">
      <div class="cart-message carted" style="display: none">
        <strong v-if="currentProduct" class="single-cart-notice">
          “{{ currentProduct.name }}”
        </strong>

        <span>{{ $t("wishlist.hasBeenAdded") }}</span>
      </div>

      <div class="cart-message removed" style="display: none">
        <strong v-if="currentProduct" class="single-cart-notice">
          “{{ currentProduct.name }}”
        </strong>
        <span>{{ $t("wishlist.hasBeenRemoved") }}</span>
      </div>

      <div
        v-if="getWishlistList.length > 0"
        key="noEmpty"
        class="wishlist-table-container"
      >
        <table
          class="table mb-0 table-bordered table-striped table-responsive wishlist-table shadow"
          :class="{ 'text-right': getIsAr }"
        >
          <thead>
            <tr class="bg-white text-center">
              <th style="width: 10%">
                {{ $t("common.delete")}}
              </th>
              <th class="product-col" style="width: 35%">
                {{ $t("wishlist.product") }}
              </th>
              <th>
                {{ $t("cart.Sku") }}
              </th>
              <th class="price-col">
                {{ $t("wishlist.price") }}
              </th>
              <!-- <th class="status-col">
                {{ $t("wishlist.stockStatus") }}
              </th> -->
              <th class="action-col text-center">
                {{ $t("wishlist.actions") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in getWishlistList"
              :key="`wishlist-${index}`"
              class="product-row p-5"
            >
              <td style="vertical-align: middle" class="text-center">
                <i class="fa fa-trash remove-button"
                   @click="removeFromWishlist({ product, index })"
                ></i>
              </td>
              <td class="text-left text-lg-center" style="vertical-align: middle">
                <div class="row">
                  <div class="col-xl-3 col-lg-4 m-auto">
                    <figure
                      class="product-image-container position-relative product-cart-image-container"
                    >
                      <div class="position-relative">
                        <nuxt-link
                          :to="getLink('/products/'+product.slug)"
                          class="product-image"
                        >
                          <img
                            loading="lazy"
                            class="bg-white ml-auto mr-auto"
                            width="80"
                            height="80"
                            :src="product.gallery[0]['m']['url']"
                            :alt="product.gallery[0]['l']['alt']"
                            :title="product.gallery[0]['l']['alt']"
                          />
                        </nuxt-link>
                      </div>
                    </figure>
                  </div>
                  <div class="col-xl-9 col-lg-8 text-center text-lg-left mt-auto mb-auto text-left ml-auto mr-auto">
                    <h6 class="product-title ">
                      <nuxt-link :to="getLink('/products/'+product.slug)">
                        {{ product.short_title }}
                      </nuxt-link>
                    </h6>
                  </div>
                </div>
              </td>

              <td class="sku-color text-center" style="vertical-align: middle">
                {{ product.sku }}
              </td>

              <td class="text-center" style="vertical-align: middle">
                <div v-if="product.hide_price == 0" class="mt-1">
                  <pv-price-box :product="product" />
                </div>
                <div v-else>
                  <i
                    class="fab fa-sm fa-whatsapp contact-us-for-price"
                    @click="goToWhatsApp(product)"
                  />
                  <small @click="goToWhatsApp(product)"
                         class="contact-us-for-price"
                  >{{
                    $t("products.ContactUsToSendYouThePrice")
                  }}</small>
                </div>
              </td>
              <td class="text-center" style="vertical-align: middle">
                <base-button-icon-1
                  v-if="product"
                  class="py-2 w-100 mb-1"
                  :outline="true"
                  @click="addToCart(product)"
                >
                  {{ $t("wishlist.addToCart") }}</base-button-icon-1
                >

                <nuxt-link
                  v-else
                  :to="getLink('/products/'+product.slug)"
                  class="btn btn-dark btn-add-cart btn-shop quick-view-button "
                >
                  {{ $t("wishlist.QuickView") }}
                </nuxt-link>

                <base-button-icon-1
                  class="py-2 w-100 quick-view-button "
                  :outline="true"
                  @click="openQuickview(product)"
                >
                  {{ $t("wishlist.QuickView") }}
                </base-button-icon-1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    PvGalleryImage,
    PvPriceBox,
    BaseButtonIcon1,
  },
  data: function () {
    return {
      wishItems: [],
      currentProduct: null,
    };
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[
        this.$i18n.locale
      ],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    };
  },
  computed: {
    ...mapGetters("fav", ["getWishlistList"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"])
  },
  watch: {},
  mounted: function () {
    this.fetchWishlist();
  },
  methods: {
    ...mapActions("fav", ["fetchWishlist", "removeFromWishlist"]),
    ...mapActions("shop", ["addToCart"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    openQuickview: function (product) {
      this.$modal.show(
        () => import("~/components/product/PvQuickview"),
        { slug: product.slug },
        {
          width: "931",
          height: "auto",
          adaptive: true,
          class: "quickview-modal",
        }
      );
    },
    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=00905525700100&text=Could I please have the price of the ${product.title}`,
        "_blank"
      );
    },
  },
};
</script>
<style>
.wishlist-table{
  display: table;
}
@media screen and (max-width: 992px){
  .wishlist-table{
    display: inline-block;
  }
}
.contact-us-for-price{
  font-size: 14px;
  color: #556b2f;
  cursor: pointer
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
.quick-view-button{
  background-color: #3e3e3e!important;
  border: 1px solid #3e3e3e!important;
  box-shadow: 0px 1px 2px #3e3e3e!important;
}
</style>
