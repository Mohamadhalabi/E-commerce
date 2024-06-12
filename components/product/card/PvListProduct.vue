<template>
  <div class="container">
  <div
    class="product-default d-flex flex-column flex-sm-row
     align-items-center bg-white inner-quickview inner-icon pt-2
      position-relative
      card-main-wrapper
      row border shadow-sm  rounded-5"
  >
    <pv-rating
      style="top: 10px; right: 10px"
      class="position-absolute"
      :product="product"
    />

    <div class="position-absolute mb-0"></div>
   <div class="col-xl-3 col-lg-4 col-md-3 col-sm-4 col-7 ">
     <figure class="mt-sm-0 mt-4 img-effect  ">
        <nuxt-link :to="`/products/${product.slug}`">

          <template v-for="image in product.gallery.slice(0, 2)">
            <pv-gallery-image
              :key="image.id"
              :image="image"
              class="rounded-5 border shadow"
            />
          </template>
        </nuxt-link>

        <pv-label-group :product="product" />
        <div
          v-if="product.offers &&
            product.discount &&
            product.discount.until &&
            product.stock
            "
          class="product-countdown-container w-100"
        >
          <span class="product-countdown-title">{{ $t("products.discountEndsIn") }}</span>
          <pv-count-down
            class="product-countdown countdown-compact"
            :until="product.discount.until"
            :compact="true"
          />
        </div>
      </figure>
   </div>

    <div class="col-xl-9 col-lg-8 col-md-9 col-sm-8 col-12">
      <div class="position-relative py-1 d-flex flex-column">
        <div
          :class="{'text-right': getIsAr }"
        >
          <nuxt-link
            id="categoryLink"
            :to="`/${product.categories[product.categories.length - 1].slug}`"
          >
            {{ product.categories[product.categories.length - 1].name }}
          </nuxt-link>
        </div>

        <div class="mt-1">
          <nuxt-link style="font-weight: 600" :to="`/products/${product.slug}`">
            {{ product.short_title }}
          </nuxt-link>
        </div>

        <p class="mt-1 mb-0">{{ product.seo_description }}</p>

        <pv-price-box
          class="m-0 mt-2 mb-1 align-items-start"
          v-if="product.hide_price == 0"
          :product="product"
        />

        <div v-else style="text-align: start; display: flex">
          <i
            class="fab fa-sm fa-whatsapp mx-1"
            style="font-size: 20px; color: #556b2f; cursor: pointer"
            @click="goToWhatsApp"
          />

          <small
            class="d-inline-block px-2"
            @click="goToWhatsApp(product)"
            style="
              width: 100px;
              position: relative;
              color: #556b2f;
              cursor: pointer;
            "
          >
            {{ $t("products.ContactUsToSendYouThePrice") }}
          </small>
        </div>

      </div>
      <div class="sku-color">SKU:{{ product.sku }}</div>

      <!-- Begin:Buttons -->
      <div class="d-flex justify-content-sm-start  justify-content-between py-2">
        <whatsapp-button
          v-if="!(product.hide_price == 0)"
          class="mx-2"
          style="width: 100px"
        ></whatsapp-button>

        <base-button-icon-1
          v-else-if="!product.has_token && !product.has_cover"
          style="width: 100px"
          class="px-2 py-2 mx-2"
          @click="addToCart(product)"
          :outline="true"
          >{{ $t("wishlist.addToCart") }}
        </base-button-icon-1>
        <base-button-icon-1
          v-else
          style="width: 100px"
          class="px-2 py-2 mx-2"
          @click="$router.push({ path: `/products/${product.slug}` })"
          :outline="true"
          >{{ $t("wishlist.addToCart") }}
        </base-button-icon-1>
        <base-button-icon-1
          class="px-2 py-2 mx-2"
          style="width: 100px"
          @click="openQuickview"
          :outline="true"
          >{{ $t("wishlist.QuickView") }}
        </base-button-icon-1>
      </div>

      <!-- End:Buttons -->
    </div>
  </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvLabelGroup from "~/components/product/partials/PvLabelGroup";
import PvCartButton from "~/components/product/partials/PvCartButton";
import PvCountDown from "~/components/product/partials/PvCountDown";
import PvRating from "~/components/product/partials/PvRating";
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import WhatsappButton from "~/components/common/WhatsappButton.vue";

export default {
  components: {
    PvGalleryImage,
    PvLabelGroup,
    PvCartButton,
    PvCountDown,
    PvRating,
    PvPriceBox,
    BaseButtonIcon1,
    WhatsappButton,
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  data: function () {
    return {
      animationDelay: `100ms`,
    };
  },
  props: {
    product: Object,
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),
    goToWhatsApp() {
      window.open(
        `https://api.whatsapp.com/send?phone=00905525700100&text=Could I please have the price of the ${this.product.short_title}`,
        "_blank"
      );
    },
    openQuickview: function () {
      this.$modal.show(
        () => import("~/components/product/PvQuickview"),
        { slug: this.product.slug },
        {
          width: "931",
          height: "auto",
          adaptive: true,
          class: "quickview-modal",
        }
      );
    },
  },
};
</script>

<style scoped>
.mt-10 {
  margin-top: 1.5rem;
}

.top-details * {
  z-index: 1;
  margin: 0px !important;
}

.card-price-box {
  border-radius: 50%;
  width: 300px;
  height: 300px;
  text-align: center;
  top: -200px;
  left: -160px;
  background-color: #f5ae6786;
}

.price-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  bottom: 0px;
}



/* .products-default {
  height: auto !important;
} */

.position-relative .category-list a {
  transition: all 0.1s ease-in;
}

.position-relative .category-list a:hover {
  color: red !important;
}

#categoryLink {
  text-decoration: underline;
  font-size: 1.2rem;
  color: #727272;
  transition: all 0.1s ease-in;
}

#categoryLink:hover {
  color: #ff6800 !important;
}
</style>
