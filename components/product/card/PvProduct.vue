<template >
  <div
    style="max-width: 400px;"
    class="mb-2 product-default bg-white inner-quickview inner-icon pt-2 position-relative card-main-wrapper border shadow-sm rounded-10"
  >
    <figure class="img-effect shadow">
      <nuxt-link :to="getLink('/products/'+product.slug)">
        <template v-for="image in product.gallery.slice(0, 2)">
          <pv-gallery-image
            :key="image.id"
            :image="image"
            class="rounded-10"
          />
        </template>
      </nuxt-link>

      <pv-label-group :product="product" />

      <div class="btn-icon-group">
<!--        <pv-cart-button :products="products" :parent="'products-card'" />-->
      </div>
      <div
        v-if="product.discount && product.discount.until "
        style="background-color: rgba(0, 57, 74, 0.8)"
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

    <div class="position-relative px-3 py-1 d-flex flex-column"
         :class="{'product-card-information' : !isIndexPage, 'product-card-information-index' : isIndexPage}"
    >
      <div class="row">
        <div class="col-lg-12 text-center">
          <div class="sku-color">SKU:{{ product.sku }}</div>
        </div>
        <div class="col-lg-12 text-center category-title mb-lg-0 mb-md-0 mb-1 category-name">
          <div
            :class="{'text-right': getIsAr }"
            :style="'display: inline-block;'"
          >
            <nuxt-link
              class="categoryLink"
              :to="getLink('/'+product.categories[product.categories.length - 1].slug)"
            >
              {{ product.categories[product.categories.length - 1].name }}
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-12 text-center mt-1 product-short-title"
             :class="{'product-short-title-index': isIndexPage, 'product-short-title': !isIndexPage }"
        >
          <div>
            <nuxt-link :to="getLink('/products/'+product.slug)">
             <h2 class="product-h2 mb-0">{{ truncateTitle(product.title, 75) }}</h2>
            </nuxt-link>
          </div>
        </div>
<!--        col-lg-12 text-center mt-lg-1 mt-4 mt-md-1 mt-sm-2 mt-xl-2-->
        <div class="col-lg-12">
          <pv-price-box
            class="m-0"
            v-if="product.hide_price == 0"
            :product="product"
            :gridPrice="true"
          />
          <div v-else style="justify-content: center; display: flex;position: relative;bottom: 5px">
            <i
              class="fab fa-sm fa-whatsapp mb-auto mt-auto p-1"
              style="font-size: 20px; color: #2ba968; cursor: pointer"
              @click="goToWhatsApp(product)"
            />
            <span
              class="d-inline-block p-1 font-weight-bold"
              @click="goToWhatsApp(product)"
              style="position: relative; color: #f52020; cursor: pointer;font-size: 14px"
            >
          Contact Us
        </span>
          </div>
        </div>
        <div class="col-lg-12 text-center">
          <pv-rating :product="product" />
        </div>
      </div>
    </div>
    <!-- Begin:Buttons -->
    <div class="d-flex align-items-streach justify-content-center py-2 mt-4 mt-lg-2 mt-md-2">
      <button
        v-if="!(product.hide_price == 0)"
        class="w-100 mx-1 whatsapp-button"
        @click="handleWhatsAppClick(product)"
      >
        <i
          style="font-size: larger"
          class="py-2 px-5 rounded-3 fab fa-whatsapp"
        ></i>
      </button>

      <base-button-icon-1
        v-else-if="!product.has_token && !product.has_cover"
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
      <base-button-icon-1
        class="px-2 py-2 mx-1 w-100"
        @click="openQuickview"
        :outline="true"
      >{{ $t("wishlist.QuickView") }}
      </base-button-icon-1>
    </div>

    <!-- End:Buttons -->
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
export default {
  components: {
    PvGalleryImage,
    PvLabelGroup,
    PvCartButton,
    PvCountDown,
    PvRating,
    PvPriceBox,
    BaseButtonIcon1,
  },
  data:function (){
    return{
      animationDelay : `100ms`
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"])
  },
  props: {
    product: Object,
    isIndexPage: Boolean,
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    truncateTitle(title, maxLength) {
      if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
      } else {
        return title;
      }
    },
    handleWhatsAppClick(product) {
      this.goToWhatsApp(product);
    },
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


.price-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  bottom: 0px;
}

.rounded-10 {
  border-radius: 10px;
}

.position-relative .category-list a {
  transition: all 0.1s ease-in;
}

.position-relative .category-list a:hover {
  color: red !important;
}

.categoryLink {
  text-decoration: underline;
  font-size: 1.2rem;
  color: #727272;
  transition: all 0.1s ease-in;
}

.categoryLink:hover {
  color: #ff6800 !important;
  text-decoration: underline;

}
.product-card-information, .product-card-information-index{
  height: 180px;
}
.product-short-title{
  font-weight: 900;
  height: 70px;
}
.product-short-title-index{
  height: 80px;
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
.product-h2{
  font-size: 13px;

}

@media screen and (max-width: 1435px) and (min-width: 1200px){
  .product-card-information{
    height: 200px;
  }
  .product-card-information-index{
    height: 200px;
  }
  .category-name{
    height: 40px;
  }
  .product-short-title{
    height: 85px;
  }
}

@media screen and (max-width: 1200px){
  .product-card-information-index{
    height: 180px;
  }
  .product-short-title-index{
    height: 80px;
  }
}

@media screen and (max-width: 993px){
  .product-card-information-index{
    height: 180px;
  }
  .product-short-title-index{
    height: 80px;
  }
}

@media screen and (max-width: 767px)
{
  .product-short-title{
    height: 90px;
  }
  .product-card-information{
    height: 180px;
  }
  .category-name{
    height: 20px;
  }
}

@media screen and (max-width: 575px){
  .category-name {
    height: 20px!important;
  }
  .product-short-title{
    height: 80px;
  }
  .product-card-information{
    height: 160px;
  }
}

@media screen and (max-width: 400px){
  .product-card-information{
    height: 180px;
  }
  .product-short-title{
    height: 100px;
  }
}

@media screen and (max-width: 500px) {
  .product-short-title-index {
    height: 110px!important;
  }
  .product-card-information-index{
    height: 200px;
  }
}

@media screen and (max-width: 400px) {
  .product-short-title-index {
    height: 135px!important;
  }
  .product-card-information-index{
    height: 225px;
  }
}

@media screen and (max-width: 350px){
  .category-name {
    height: 10px!important;
  }
  .product-card-information{
    height: 140px;
  }
  .product-short-title{
    height: 70px!important;
  }
  .product-card-information-index{
    height: 160px;
  }
  .product-short-title-index{
    height: 80px!important;
  }
}

</style>
