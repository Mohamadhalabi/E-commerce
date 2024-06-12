<template>
  <div>
    <div class="d-flex align-items-center">
      <h1 class="product-title">
        {{ product.title }}
      </h1>

      <div>
        <pv-product-nav
          v-if="isProductNav"
          :prev-product="prevProduct"
          :next-product="nextProduct"
        ></pv-product-nav>
      </div>
    </div>

    <div v-if="product.summary_name && product.summary_name != product.title" class="product-desc">
      <h2 class="summary-name">{{ product.summary_name }}</h2>
    </div>
    <hr class="mb-1 mt-0">
    <pv-rating :product="product" :hide-reviews="false"/>
<!--    <hr class="short-divider"/>-->
    <div class="row">
      <div class="col">
        <div v-if="product.categories[0].slug ==  'pin-code-offline'">
          <pv-price-box class="mb-2 mt-1" :product="product" />
        </div>
        <pv-price-box class="mb-2 mt-1" v-if="product.hide_price == 0" :product="product"/>
      <div v-else style="text-align: start; display: flex">
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
          To order this product, please click on the WhatsApp icon and contact us.
        </span>
      </div>

      <div
        v-if="product.discount &&
          product.offers &&
          product.discount.until &&
          product.stock
          "
        class="product-countdown-container-two mt-1"
      >
        <h5 class="daily-deal-title">{{ $t("products.discountEndsIn") }}:</h5>
        <pv-count-down
          class="product-countdown countdown-compact"
          :until="product.discount.until"
          :label-short="true"
        />
      </div>

      <ul class="single-info-list">
        <li class="sku-color mt-1 " v-if="product.sku">
          {{ $t("products.sku") }}:
          <strong class="sku-color ">{{ product.sku }}</strong>
        </li>

        <li>
          {{ $t("products.category") }}:
          <strong>
            <i>
              <a
                :href="getLink('https://www.tlkeys.com/'+product.categories[product.categories.length - 1].slug)"
              >
                <strong>
                  <div
                    :class="{ 'text-right': getIsAr }" class="d-inline-flex">
                    {{ product.categories[product.categories.length - 1].name }}
                  </div>
                </strong>
              </a>
            </i>
          </strong>
        </li>

        <li v-if="models">
          {{ $t("products.cars") }}:
          <span v-for="(model, index) in models.split(',')">
          <a
            :href="getLink('https://www.tlkeys.com/' + model.trim().toLowerCase().replace(/\s+/g, '-'))"
            :key="index"
          >
            <strong>
              <i>
                {{ model.trim() }}
              </i>
            </strong>
          </a>
          <span v-if="index < models.split(',').length - 1">, </span>
        </span>
        </li>
        <li v-if="product.specifications.manufacturer">
          {{ $t("products.MANUFACTURER") }}:
          <a :href="getLink('https://www.tlkeys.com/' + product.specifications.manufacturer.toLowerCase().replace(/\s+/g, '-'))">
            <strong>
            <i>
              {{ product.specifications.manufacturer }}
            </i>
          </strong>
          </a>
          <span v-for="(other_man,index) in product.specifications.other_manufacturers.toString().split(',')">
            <nuxt-link
              :to="getLink('/' + other_man.trim().toLowerCase().replace(/\s+/g, '-'))"
              :key="index"
            >
              <strong>
                <i>
                  {{ other_man.replace(/-/g, '') }}
                </i>
              </strong>
            </nuxt-link>
          </span>
        </li>
      </ul>
      </div>
      <div class="col-lg-12">
      <!-- Begin:offer table -->
      <h4 v-if="product.offers.length > 0" class="w-100 mb-1">
        {{ $t("common.buyMorePayLess") }}
      </h4>
      <div
        v-if="product.offers.length > 0"
        id="product-offers-content"
        class="mb-3"
      >
        <pv-offers :product="product"/>
      </div>
      <!-- End:offer table -->
      </div>
    </div>
    <div
      class="product-action d-lg-flex  align-items-center"
      v-if="!product.has_token_input || product.specifications.manufacturer =='TMPRO'"
    >
      <div class="product-single-qty">
        <div
          v-if="product.hide_price == 0"
          class="input-group w-100 bootstrap-touchspin bootstrap-touchspin-injected"
        >
          <span class=" input-group-btn input-group-prepend">
            <button
              class=" btn-outline btn-down-icon bootstrap-touchspin-down"
              type="button"
              :disabled="product.hide_price != '0'"
              @click="minusQty"
              :style="getIsAr ? 'border-radius: 0px 6px 6px 0px' : 'border-radius:6px 0px 0px 6px ;'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 96 960 960"
                width="18"
              >
                <path d="M200 606v-60h560v60H200Z"/>
              </svg>
            </button>
          </span>

          <input
            v-model.number="qty"
            class="horizontal-quantity form-control bg-transparent"
            type="text"
            :max="product.stock"
            :min="qty"
            :disabled="product.hide_price != '0'"
            @change="changeQty($event)"
          />



          <span class="input-group-btn input-group-append">
            <button
              :style="getIsAr ? 'border-radius:6px 0px 0px 6px' : 'border-radius:0px 6px 6px 0px !important;'"
              class="btn-outline btn-up-icon bootstrap-touchspin-up"
              type="button"
              :disabled="product.hide_price != '0'"
              @click="plusQty"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18"
                viewBox="0 96 960 960"
                width="18"
              >
                <path
                  d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
      <base-button-icon-1
        v-if="product.hide_price == 0"
        @click="product.quantity = qty;
          AddProductToCart(product);
        "
        :outline="true"
        class="mx-2 py-4"
      >
        {{ $t("products.addCart") }}</base-button-icon-1>
      <div v-else class="d-flex align-items-center">
        <button ontouchstart
                class="whatsapp-button"
                @click="handleWhatsAppClick(product)">
          <i
            style="font-size: 20px"
            class="py-2 px-5 rounded-3 fab fa-whatsapp"
          ></i>
        </button>
      </div>

      <div class="d-flex flex-column p-3">
        <pv-wishlist-button class="p-0" :product="product" :parent="'products-detail'" />
        <pv-compare-button class="p-0" :product="product" parent="product-detail"></pv-compare-button>
      </div>

    </div>
    <div v-if="product.has_cover">
      <AutoComplate
        v-model="selectedBrand"
        placeholder="Please Select a brand for the cover"
        :options="selectBrands"
        @setValue="
            $event
              ? (selectedBrand = $event.name)
              : (selectedBrand = null)
          "
      />
    </div>
    <div v-if="ProductStatus !== null && ProductSKU === product.sku">
      <b-alert
          variant="danger"
          class="font-weight-bold"
          dismissible
          fade
          :show="showDismissibleAlert"
          @dismissed="showDismissibleAlert=true"
      >    <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
        <i class="fa fa-exclamation-triangle"></i>
        {{ ProductStatus }}
      </b-alert>
    </div>
    <PvInputToken
      :product="product"
      v-if="product.has_token_input && !product.hide_price"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import PvPriceBox from "~/components/product/partials/PvPriceBox";
import PvProductNav from "~/components/product/partials/PvProductNav";
import PvWishlistButton from "~/components/product/partials/PvWishlistButton";
import PvCountDown from "~/components/product/partials/PvCountDown";
import PvInputToken from "~/components/product/partials/PvInputToken";
import Api from "~/api";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import PvOffers from "./tabs/PvOffers.vue";
import PvCompareButton from './partials/PvCompareButton.vue';
import PvRating from "~/components/product/partials/PvRating.vue";
import AutoComplate from "~/components/common/AutoComplate.vue";

export default {
  components: {
    AutoComplate,
    PvRating,
    PvPriceBox,
    PvProductNav,
    PvWishlistButton,
    PvInputToken,
    PvCountDown,
    BaseButtonIcon1,
    PvOffers,
    PvCompareButton,
  },
  props: {
    product: Object,
    prevProduct: Object,
    nextProduct: Object,
    isProductNav: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      qty: 1,
      socialMedia: [],
      models: null,
      showDismissibleAlert: true,
      minPurchaseQty:0,
      selectBrands: [],
      selectedBrand: null,
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("shop", ["ProductStatus"]),
    ...mapGetters("shop", ["ProductSKU"]),

  },
  mounted() {
    this.qty = this.product.min_purchase_qty
    this.minPurchaseQty = this.product.min_purchase_qty;
    let dataModels = [];
    for (const item of this.product.brands) {
      if (!dataModels.some(model => model.value === item.brand)) {
        dataModels.push({ name: item.brand, value: item.brand });
      }
    }
    if (dataModels.length > 0) {
      this.models = dataModels.map(model => model.value).join(',');
    } else {
      this.models = null;
    }
    this.selectBrands = dataModels;
  },
  methods: {
    ...mapActions("shop", ["addToCart"]),
    ...mapActions("compare", ["fetchList", "addToList"]),

    AddProductToCart(product){
      if(this.selectedBrand == null && this.product.has_cover){
        this.$notify({
          group: 'errorMessage',
          type: 'error',
          text:  this.$t("alerts.chooseCover"),
        });
      }
      else{
        product["cover_model"] = this.selectedBrand;
        this.addToCart(product)
      }
    },

    getLink(route) {
      if (this.getLang === 'en') {
        return route;
      } else {
        return `/${this.getLang}${route}`;
      }
    },
    handleWhatsAppClick(product) {
      this.goToWhatsApp(product);
    },

    goToWhatsApp() {
      window.open(
        `https://api.whatsapp.com/send?phone=${this.$settings.contact.whatsapp}&text=Could I have more details about the product ${this.product.title}`,
        "_blank"
      );
    },
    // addToCompare(item) {
    //   Api.get("/products/compares")
    //     .then((response) => {
    //     })
    //     .catch((error) => {
    //     });
    //   Api.post("/products/compares", {product: item.slug})
    //     .then((response) => {
    //       this.$notify({
    //         group: "custom-notify",
    //         type: "success",
    //         text: response.data.message,
    //       });
    //     })
    //     .catch(() => {
    //     });
    // },
    plusQty: function () {
      // if (this.qty < this.product.stock)
        this.qty++;
    },
    minusQty: function () {
      if (this.qty > this.minPurchaseQty)
        this.qty--;
    },
    changeQty(e) {
      if(this.qty < this.minPurchaseQty){
        this.qty = this.minPurchaseQty
      }
    },
    // addCart: function (product) {
    //   this.currentProduct = product;
    //   document.querySelector(".cart-message.removed").style.display = "none";
    //   document.querySelector(".cart-message.carted").style.display = "block";
    //   this.addToCart({product: product});
    //   this.removeFromWishlist({product: product.sku});
    // },
  },
};
</script>
<style>
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
.summary-name{
  font-size: 22px;
  font-weight: bold;
  color: #556b2f;
  letter-spacing: -.01em;
  width: calc( 100% - 70px );
}
</style>
