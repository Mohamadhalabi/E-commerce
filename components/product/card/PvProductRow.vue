<template >
  <div
    class="mb-2 mt-2 product-default bg-white inner-quickview  position-relative card-main-wrapper border shadow-sm rounded-10">
    <div class="row">
      <div class="col-lg-2 col-md-4 col-sm-4 col-xs-4 d-flex mt-auto mb-auto add-to-cart-accessories " style="border-right: 1px solid lightgrey; padding-top: 20px;padding-left: 20px; justify-content: space-around">
        <div class="mb-auto mt-auto accessories" v-if="product.hide_price == 0">
          <label class="toggler-wrapper style-1">
            <input type="checkbox" v-model="checked" @change="handleChange(product)">
            <div class="toggler-slider">
              <div class="toggler-knob"></div>
            </div>
          </label>
        </div>
        <figure class="img-effect rounded-10" >
          <nuxt-link :to="`/products/${product.slug}`" >
            <template v-for="image in product.gallery.slice(0, 2)">
              <pv-gallery-image
                :key="image.id"
                :image="image"
                class="rounded-10"
                style="max-width: 120px"
              />
            </template>
          </nuxt-link>
        </figure>
      </div>
      <div class="col-lg-8 col-md-4 col-sm-4 col-xs-4 mt-auto mb-auto text-lg-left title-short">
        <div class="mt-1">
          <nuxt-link class="short-title" :to="`/products/${product.slug}`">
            {{ product.short_title }}
          </nuxt-link>
        </div>
        <div class="sku mt-1">SKU:{{ product.sku }}</div>
      </div>
      <div class="col-lg-2 col-md-4 col-sm-4 col-xs-1 mt-auto pt-lg-3 mb-auto">
        <pv-price-box
          class="mt-1"
          v-if="product.hide_price == 0"
          :product="product"
          :additionalProductItems="true"
        />

        <div v-else class="d-flex justify-content-center text-lg-center">
          <i
            class="fab fa-sm fa-whatsapp mx-1"
            style="font-size: 20px; color: #556b2f; cursor: pointer"
            @click="goToWhatsApp"
          />

          <small
            class="d-inline-block px-2"
            @click="goToWhatsApp(product)"
            style="
            color: #556b2f;
            cursor: pointer;
            font-size: 14px;
          "
          >
            {{ $t("products.ContactUsToSendYouThePrice") }}
          </small>
        </div>
        <div class="text-center mt-1">
          <client-only>
            <pv-rating :product="product" />
          </client-only>
        </div>

        <!-- Begin:Buttons -->
        <div class="d-flex align-items-streach justify-content-center py-2">

          <button
            v-if="!(product.hide_price == 0)"
            class="w-100 mx-1 whatsapp-button"
            @click="goToWhatsApp(product)"
          >
            <i
              style="font-size: larger"
              class="py-2 px-5 rounded-3 fab fa-whatsapp"
            ></i>
          </button>
          <div class="mb-auto mt-auto add-to-cart-accessory" v-if="product.hide_price == 0">
            <label class="toggler-wrapper style-1">
              <input type="checkbox" v-model="checked" @change="handleChange(product)">
              <div class="toggler-slider">
                <div class="toggler-knob"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="top-details px-2 d-flex align-items-start justify-content-between position-absolute w-100">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvPriceBox from "~/components/product/partials/PvPriceBox";

export default {
  components: {
    PvGalleryImage,
    PvRating:() => import("~/components/product/partials/PvRating"),
    PvPriceBox,
  },
  data:function (){
    return{
      animationDelay : `100ms`,
      checked : false
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("shop", [
      "cartCount",
      "cartList",
      "cartProductsPrice",
      "cartCurrency",
      "cartPaymentPrice",
    ])
  },
  mounted() {
    this.getCartList().then(() => {
      this.cartList.forEach(item => {
        if (item.sku === this.product.sku) {
          this.checked = true;
        }
      });
    });
  },
  props: {
    product: Object
  },
  methods: {
    ...mapActions("shop", ["addToCart", "removeFromCart","getCartList"]),
    goToWhatsApp() {
      window.open(
        `https://api.whatsapp.com/send?phone=00905525700100&text=Could I please have the price of the ${this.product.short_title}`,
        "_blank"
      );
    },
    // add or remove from cart
    handleChange(product) {
      if(this.checked){
        this.addToCart(product)
      }
      else{
        const filteredCartItems = this.cartList.filter(item => item.sku === product.sku);
        this.removeFromCart({product:filteredCartItems[0],index:1})
      }
    }
  }
};
</script>

<style scoped>
.top-details * {
  z-index: 1;
  margin: 0px !important;
}

.rounded-10 {
  border-radius: 10px;
}

.product-default {
  height: auto !important;
}

.position-relative .category-list a {
  transition: all 0.1s ease-in;
}

.position-relative .category-list a:hover {
  color: red !important;
}
.short-title{
  font-size: 16px;
  font-weight: bold;
}
.toggler-wrapper {
  display: block;
  width: 45px;
  height: 25px;
  cursor: pointer;
  position: relative;
}

.toggler-wrapper input[type="checkbox"] {
  display: none;
}

.toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
  background-color: #44cc66;
}

.toggler-wrapper .toggler-slider {
  background-color: #ccc;
  position: absolute;
  border-radius: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
  position: absolute;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}


/*--------------------------------------------------------------
3.0 Effects Styles
--------------------------------------------------------------*/


/*Style 1*/

.toggler-wrapper.style-1 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
  left: calc(100% - 19px - 3px);
}

.toggler-wrapper.style-1 .toggler-knob {
  width: calc(25px - 6px);
  height: calc(25px - 6px);
  border-radius: 50%;
  left: 3px;
  top: 3px;
  background-color: #fff;
}
.add-to-cart-accessory{
  display: none;
}
@media screen and (max-width: 576px) {
  .title-short {
    text-align: center;
  }
  .accessories{
    display: none;
  }
  .add-to-cart-accessory{
    display: flex;
  }
  .add-to-cart-accessories{
    justify-content: center!important;
  }
}

.whatsapp-button{

    background-color: #ffffff;
    border: 1px solid #2ba968;
    border-radius: 6px;
    transition: all 0.2s ease-in;
    font-size: 1em;
    font-weight: 500;
    color: #2ba968;
    transition: all 0.2s ease-out;
    box-shadow: 0px 1px 2px #2ba968;
  }

.whatsapp-button:active {
    transform: translate(0px, 2px);
  }

</style>
