<template>
  <div class="whatsnewlass">
    <div class="container">
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
              {{ $t("wishlist.wishlist") }}
            </li>
          </ol>
        </div>
      </nav>
      <h1 class="account-sub-title d-md-block mt-0 pt-1 ml-1 font-weight-bold mt-3">
        <i
          class="orange-1 fa fa-heart wishlist-empty align-middle mx-2 pr-1"
        />
        {{ $t("wishlist.wishlist") }}
      </h1>
      <div class="cart-message carted" style="display: none">
        <strong v-if="currentProduct" class="single-cart-notice">
          “{{ currentProduct.name }}”
        </strong>
        <span>
          {{ $t("wishlist.hasBeenAdded") }}
        </span>
      </div>

      <div class="cart-message removed" style="display: none">
        <strong v-if="currentProduct" class="single-cart-notice">
          “{{ currentProduct.name }}”
        </strong>
        <span>
          {{ $t("wishlist.hasBeenRemoved") }}
        </span>
      </div>

      <div
        v-if="getWishlistList.length > 0"
        key="noEmpty"
        class="wishlist-table-container shadow rounded-5 "
      >
        <table
          class="table table-bordered table-responsive-md table-striped"
          :class="{ 'text-right': getIsAr }"
        >
          <thead>
            <tr class="bg-white">
              <th class="text-center" style="width: 10%;">
                {{ $t("common.delete") }}
              </th>
              <th class="text-center" style="width: 35%">
                {{ $t("wishlist.product") }}
              </th>
              <th class="text-center">
                {{ $t("cart.Sku") }}
              </th>
              <th class="text-center">
                {{ $t("wishlist.price") }}
              </th>
              <!-- <th class="status-col">
                {{ $t("wishlist.stockStatus") }}
              </th> -->
              <th class="text-center">
                {{ $t("wishlist.actions") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in getWishlistList"
              :key="`wishlist-${index}`"
              class=""
            >
              <td style="vertical-align: middle" class="text-center">
                <i class="fa fa-trash remove-button" @click="removeFromWishlist({ product, index })">

                </i>
              </td>
              <td class="" style="vertical-align: middle">
                <div class="row">
                  <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6 m-auto">
                    <figure
                      class="product-image-container position-relative product-cart-image-container"
                    >
                      <div class="position-relative">
                        <nuxt-link
                          :to="getLink('/products/'+product.slug)"
                          class="product-image"
                        >
                          <img
                            class="bg-white m-auto"
                            width="100"
                            height="100"
                            :src="product.gallery[0]['m']['url']"
                            alt=""
                          />
                        </nuxt-link>
                      </div>
                    </figure>
                  </div>
                  <div class="col-xl-8 col-lg-9 col-md-8 col-sm-6 m-auto text-left">
                    <h6 class="product-title">
                      <nuxt-link
                        :to="getLink('/products/'+product.slug)">
                        {{ product.short_title }}
                      </nuxt-link>
                    </h6>
                  </div>
                </div>
              </td>
              <td class="sku-color text-center" style="vertical-align: middle">
                {{ product.sku }}
              </td>

              <td class="text-center" style="vertical-align: middle;width: 12%;">
                <div v-if="product.hide_price == 0">
                  <pv-price-box
                    class="wishlist-price"
                    :product="product" />
                </div>
                <div v-else>
                  <i
                    class="fab fa-sm fa-whatsapp contact-us-icon"
                    @click="goToWhatsApp(product)"
                  />
                  <small class="contact-us-message" @click="goToWhatsApp(product)">{{
                    $t("products.ContactUsToSendYouThePrice")
                  }}</small>
                </div>
              </td>
              <td class="action text-center" style="vertical-align: middle;max-width: 25%">
                <base-button-icon-1
                  v-if="product && !product.has_token"
                  class="py-2 w-75 mb-1 addToCartButton"
                  :outline="true"
                  @click="addToCart(product)"
                >
                  {{ $t("wishlist.addToCart") }}</base-button-icon-1
                >

                <base-button-icon-1
                  v-else-if="!product.has_token"
                  @click="$router.push({ path: `/products/${product.slug}` })"
                  class="py-2 w-75 mb-1 addToCartButton quick-view-button"
                  :outline="true"
                >
                  {{ $t("wishlist.QuickView") }}
                </base-button-icon-1>

                <base-button-icon-1
                  class="py-2 w-75 addToCartButton quick-view-button"
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
      <div v-else class="box-content">
        <div class="wishlist-table-container">
          <table
            class="table-wishlist"
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
                  <span class="nobr">{{ $t("wishlist.product") }}</span>
                </th>

                <th class="product-price ">
                  <span class="nobr">{{ $t("wishlist.price") }}</span>
                </th>

                <th class="product-stock-status">
                  <span class="nobr">{{ $t("wishlist.stockStatus") }}</span>
                </th>

                <th class="product-add-to-cart">
                  <span class="nobr">{{ $t("wishlist.actions") }}</span>
                </th>
              </tr>
            </thead>

            <tbody class="wishlist-items-wrapper">

              <tr class="border-0 py-0">
                <td colspan="6" class="px-3 py-2 wishlist-empty wishlist-text">
                  {{ $t("wishlist.NoProductsAdded") }}
                </td>
              </tr>
              <tr class="border-0 py-0">
                <td colspan="6" class="px-3 text-center">
                  <nuxt-link
                    :to="getLink('/shop')">
                    <base-button-icon-1
                      style="width: 150px"
                      :outline="true"
                      class="py-4"
                    >
                      {{ $t("wishlist.GoShop") }}</base-button-icon-1
                    >
                  </nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PvPriceBox,
    BaseButtonIcon1,
  },
  data: function () {
    return {
      wishItems: [],
      currentProduct: null,
    };
  },
  computed: {
    ...mapGetters("fav", ["getWishlistList"]),
    ...mapGetters("language", ["getLang"]),
  },
  mounted: function () {
    // this.$Progress.start();
    this.fetchWishlist();
    // this.$Progress.finish();
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
