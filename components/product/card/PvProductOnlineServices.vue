<template>
  <div
    class="mb-2 product-default bg-white inner-quickview inner-icon pt-2 position-relative card-main-wrapper border shadow-sm rounded-10"
  >
    <figure class="img-effect shadow">
      <nuxt-link :to="`/online-services/${product.slug}`">
        <img loading="lazy" :src="product.image" style="" />
      </nuxt-link>
    </figure>

    <div class="position-relative px-3 py-1 d-flex flex-column product-card-information">
      <div class="row">
        <div class="col-lg-12 text-center">
        </div>
        <div class="col-lg-12 text-center category-title mb-lg-0 mb-md-0 mb-1">
          <div
            :class="{ 'category-list': wrapper, 'text-right': getIsAr }"
            :style="!wrapper ? 'display: inline-block;' : ''"
          >
            <nuxt-link
              id="categoryLink"
              :to="`/online-services`"
            >
              {{ $t("online.onlineServices") }}
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-12 text-center mt-1 product-short-title mb-1 mb-lg-0 mb-md-0">
          <div>
            <nuxt-link :to="`/products/${product.slug}`">
              {{ product.short_title[$i18n.locale] }}
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-12 text-center mt-3 mb-2 mt-lg-1 mt-md-2">
          <span class="price-color" v-if="product.price > 0">${{product.price}}</span>
          <div v-else>
            <i
              class="fab fa-sm fa-whatsapp"
              style="font-size: 20px; color: #556b2f; cursor: pointer"
              @click="goToWhatsApp(product.short_title[$i18n.locale])"
            />
            <small class="contact-us" @click="goToWhatsApp(product.short_title[$i18n.locale])">{{
                $t("products.ContactUsToSendYouThePrice")
              }}</small>
          </div>
        </div>
        <div class="col-lg-12 text-center mt-lg-2">
          <pv-rating :product="product" />
        </div>

      </div>



    </div>
    <!-- Begin:Buttons -->
    <div class="d-flex align-items-streach justify-content-center py-2 mt-4 mt-lg-2 mt-md-2">
      <button
        v-if="!(product.hide_price == 0)"
        class="w-100 mx-1 whatsapp-button"
        @click="goToWhatsApp(product.short_title[$i18n.locale])"
      >
        <i
          style="font-size: larger"
          class="py-2 px-5 rounded-3 fab fa-whatsapp"
        ></i>
      </button>

      <base-button-icon-1
        v-else-if="!product.has_token"
        class="px-2 py-2 mx-1 w-100"
        @click="addToCart(product)"
        :outline="true"
      >{{ $t("wishlist.addToCart") }}
      </base-button-icon-1>
      <base-button-icon-1
        v-else
        class="px-2 py-2 mx-1 w-100"
        @click="$router.push({ path: `/products/${product.slug}` })"
        :outline="true"
      >{{ $t("wishlist.addToCart") }}
      </base-button-icon-1>
<!--      <base-button-icon-1-->
<!--        class="px-2 py-2 mx-1 w-100"-->
<!--        @click="openQuickview"-->
<!--        :outline="true"-->
<!--      >{{ $t("wishlist.QuickView") }}-->
<!--      </base-button-icon-1>-->
    </div>

    <!-- End:Buttons -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PvRating from "~/components/product/partials/PvRating";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
export default {
  name: "PvProductOnlineServices",
  components: {
    PvRating,
    BaseButtonIcon1,
  },
  data:function (){
    return{
      animationDelay : `100ms`
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  props: {
    product: Object,
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),
    handleWhatsAppClick(product) {
      this.goToWhatsApp(product);
    },
    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=971544179287&text=Could I please have the price of the ${product}`,
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

.top-details * {
  z-index: 1;
  margin: 0px !important;
}
.card-main-wrapper {
  overflow: hidden;
}

.rounded-10 {
  border-radius: 10px;
}

.product-default {
}

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
.product-card-information{
  height: 180px;
}
.product-short-title{
  font-weight: 900;
  height: 50px;
}
.product-short-title:hover{
  text-decoration: underline;
}

.whatsapp-button{
  background-color: #2ba968;
  border: 1px solid #2ba968;
  border-radius: 6px;
  transition: all 0.2s ease-in;
  font-size: 1em;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease-out;
  box-shadow: 0px 1px 2px #2ba968;
}

.contact-us{
  position: relative;
  color: rgb(43, 169, 104);
  cursor: pointer;
  font-size: 12px;
  height: 38px;
  bottom: 3px;
}

</style>
