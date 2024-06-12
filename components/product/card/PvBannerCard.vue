<template>
  <nuxt-link
    :to="getLink('/products/'+rondomProduct.slug)"
    class="top-notice-image w-100"
     :style="getBackgroundImageStyle()"
  >
    <div class="postiton-relative d-flex align-items-center flex-column">
      <div class="row home-page-slider">
        <div class="col-xl-6 col-lg-6 mt-auto mb-auto">
          <h2 class="w-100 ml-lg-5 h5-home-page text-center mt-1 mt-lg-2">
            <p
                class="m-0"
                :class="{'custom_color': custom_color}">
              {{ rondomProduct["short_title"] }}
            </p>
            <span class="" v-if="rondomProduct.offer && rondomProduct.offer.length !=0">
              <span class="product-price price-color">
                {{(rondomProduct.price.value  - rondomProduct.offer.value).toFixed(2)}}{{rondomProduct.price.currency}}
              </span>
              <span class="old-price">
              {{rondomProduct['price'].value}}{{rondomProduct['price'].currency}}
              </span>
            </span>

            <span class="product-price price-color" v-else-if="rondomProduct['sale_price'].value == rondomProduct['price'].value">
              {{rondomProduct['price'].value}}{{rondomProduct['price'].currency}}
            </span>


            <span class="" v-else>
              <span class="product-price price-color">
                {{rondomProduct['sale_price'].value}}{{rondomProduct['sale_price'].currency}}
              </span>
              <span class="old-price">
              {{rondomProduct['price'].value}}{{rondomProduct['price'].currency}}
              </span>
            </span>
          </h2>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div style="z-index: 1 !important" class="">
            <nuxt-img
              format="webp"
              loading="lazy"
              :alt="rondomProduct['png_image'][0]['s'].alt"
              :src="getImageUrl()"
              class="mr-0 product_image_png"
              :class="{
                'image-with-effect': true,
                }"
            />
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  props: {
    rondomProduct: Object,
    width: Number,
    height: Number,
    backgroundImageUrl: String,
    secondBackround: Boolean,
    left: Boolean,
    custom_color:Boolean,
    third_item:Boolean,
    fourth_item:Boolean,
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    getImageUrl() {
      if (this.width === 350 && this.height === 350) {
        return this.rondomProduct.png_image[0]['l']['url'];
      }
      else if (this.width === 250 && this.height === 250) {
        return this.rondomProduct.png_image[0]['m']['url'];
      } else {
        return '';
      }
    },
    getBackgroundImageStyle() {
      return `background-image: url(${this.backgroundImageUrl});` +
          'background-repeat: no-repeat;'
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
  img.mx-auto.rounded-5.shadow.border {
    height: 350px;
    width: 350px;
  }
}

.top-notice-image{
  border: 1px solid #DEE2EB;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-size: cover;
}

img.image-with-effect {
  --s: 15px;  /* size of the frame */
  --b: 2px;   /* border thickness */
  --w: 200px; /* width of the image */
  --c: #c7cbd3;

  aspect-ratio: 1;
  object-fit: cover;
  padding: calc(2 * var(--s));
  --_g: var(--c) var(--b), #0000 0, calc(100% - var(--b)), var(--c) 0;
  outline-offset: calc(var(--w) / -2 - 2 * var(--s));
  transition: 0.4s;
  cursor: pointer;
  padding: 15px;
}

img.image-with-effect:hover {

  background:
    linear-gradient(var(--_g)) 50%/100% var(--_i, 100%) no-repeat,
    linear-gradient(90deg, var(--_g)) 50%/var(--_i, 100%) 100% no-repeat;
  outline: var(--b) solid var(--c);
  outline-offset: calc(var(--s) / -2);
  --_i: calc(100% - 2 * var(--s));
}

.custom-class {
  background-size: 450px 200px;
}

@media screen and (max-width: 993px){
  .top-notice-image{
  }
  img.image-with-effect{
    width: 250px;
    height: 250px;
  }
}
.text-underline {
  text-decoration: underline;
}

.text-underline-offset-2 {
  text-underline-offset: 7px;
}

.h5-home-page{
  font-size: 16px;
  margin: 0!important;
  padding: 15px;
}
@media screen and (max-width: 1200px){
  .h5-home-page{
    font-size: 14px;
  }
}
@media screen and (min-width: 1435px){
  .home-page-slider{
    min-height: 200px;
  }
  .left-banner{
    min-height: 310px;
  }
  .left-banner-image{
    margin-top: 15%!important;
  }
}

@media screen and (min-width: 1200px){
  .left-banners{
    padding-top: 15%;
  }
}
.custom_color{
  color: white;
}

@media screen and (min-width: 1436px) {
  .product_image_png {
    margin-left: 25px;
    width: 180px;
  }
}
@media screen and (max-width: 1435px) {
  .product_image_png{
    width: 140px!important;
    margin-left: 20px;
  }
}
@media screen and (max-width: 1200px){
  .product_image_png{
    width: 120px!important;
    margin-left: 20px;
  }
}
</style>
