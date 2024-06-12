<template>
  <div>

    <div
      style="height: max-content !important"
      class="pg-vertical product-single-gallery d-flex align-items-center justify-content-between"
    >
      <!-- Begin:Big Slider -->
      <div class="product-slider-container">
        <pv-label-group :product="product" />

        <PvCarousel
          ref="mediaRef"
          class="product-single-carousel show-nav-hover"
          :options="bigSlider"
        >
          <div
            class="swiper-slide"
            v-for="image in product.gallery"
            :key="image.m.id"
          >
            <pv-gallery-image
              :class-name="'products-single-image'"
              :image="image"
              :size="'m'"
              class="border rounded-10"
            />
          </div>
        </PvCarousel>

        <span class="prod-full-screen" @click="openLightBox" v-if="isMagnify">
          <i class="icon-plus"></i>
        </span>
      </div>
      <!-- End:Big Slider -->

      <!-- Begin:Vertical Slider  -->
      <div class="vertical-thumbs px-2   flex-column">
        <button class="thumb-up2  w-100">
          <i class="icon-angle-up"></i>
        </button>

        <PvCarousel
          class="prod-thumbnail swiper-dots show-nav-hover product-thumbs-wrap"
          ref="thumbRef2"
          id="test"
          :key="test"
          :options="smallSlider2"
        >
          <div
            class="swiper-dot swiper-slide"
            v-for="(image, index) in product.gallery"
            :key="image.s.id"
            @click="activeThumbItem(index, $event)"
            :class="{ active: index === 0 }"
          >
            <pv-gallery-image
              :image="image"
              :size="'s'"
              class="border rounded-5"
            />
          </div>
        </PvCarousel>

        <button class="thumb-down2 w-100"   >
          <i class="icon-angle-down"></i>
        </button>
      </div>
      <!-- End:Vertical Slider-->
    </div>

    <div v-if="product.bundled">
      <div class="row" v-if="product.bundled.length > 0">
        <div class="col-12">
          <h3 :class="{ 'text-right': getIsAr }" class="text-warning">
            {{ $t("products.bought_bundle_together") }}
          </h3>
        </div>
        <div
          class="col-6 px-1 mb-2"
          v-for="(prod, i) in product.bundled"
          :key="i"
        >
          <pv-small-product :product="prod" :key="i" />
        </div>
      </div>
    </div>

<!--    <light-box ref="lightBox" :media="lightBoxMedia" :show-light-box="false" />-->
  </div>
</template>

<script>
import PvLabelGroup from "~/components/product/partials/PvLabelGroup";
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvCarousel from "~/components/features/PvCarousel";
// import LightBox from "vue-image-lightbox";
import { bigSlider, smallSlider2 } from "~/utils/data/carousel";
// import "vue-image-lightbox/dist/vue-image-lightbox.min.css";
import PvSmallCollection from "~/components/product/card/PvSmallCollection.vue";
import PvSmallProduct from "~/components/product/card/PvSmallProduct.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PvSmallProduct,
    PvSmallCollection,
    PvLabelGroup,
    PvGalleryImage,
    PvCarousel,
    // LightBox,
  },
  props: {
    product: Object,
    isMagnify: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      bigSlider,
      smallSlider2,
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    lightBoxMedia: function () {
      return this.product.gallery.reduce((acc, cur) => {
        return [
          ...acc,
          {
            src: cur.l.url,
            thumb: cur.s.url,
          },
        ];
      }, []);
    },
  },
  mounted: function () {
    if (this.product !== null) {
      this.$nextTick(() => {
        let self = this;
        this.$refs.mediaRef.swiper.on("transitionStart", function () {
          let activeIndex = self.$refs.mediaRef.swiper.activeIndex;
          self.$refs.thumbRef.swiper.slideTo(activeIndex);
          self.$refs.thumbRef.swiper.$el
            .find(".swiper-wrapper")
            .find(".swiper-dot.active")[0]
            .classList.remove("active");
          self.$refs.thumbRef.swiper.$el
            .find(".swiper-wrapper")
            .find(".swiper-dot")
            [activeIndex].classList.add("active");
        });
      });
    }
  },
  methods: {
    activeThumbItem: function (index, e) {
      // remove active class from previous active item
      e.currentTarget.parentNode
        .querySelector(".swiper-dot.active")
        .classList.remove("active");

      // active current selected item
      e.currentTarget.classList.add("active");

      // translate thumb carousel
      this.$refs.mediaRef.swiper.slideTo(index);
    },
    openLightBox: function () {
      this.$refs.lightBox.showImage(this.$refs.mediaRef.swiper.activeIndex);
    },
  },
};
</script>
<style scoped>
/* .vue-lb-modal-image {
  padding: unset !important;
  height: unset !important;
} */
/* .vue-lb-container{
  flex-direction: column;
}
.vue-lb-content{
  border: 1px solid red;
} */

.rounded-10 {
  border-radius: 10px;
}
</style>
