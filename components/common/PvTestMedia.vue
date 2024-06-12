<template>
  <div>

    {{ product.gallery }}
    <!-- <div class="pg-vertical products-single-gallery">
      <div class="products-slider-container">
        <div class="label-group">
          <div class="products-label label-hot" v-if="products.is_hot">HOT</div>
          <div class="products-label label-sale" v-if="products.is_sale">
            Sale
          </div>
        </div>

        <PvCarousel
          ref="mediaRef"
          class="products-single-carousel show-nav-hover"
          :options="baseSlider1"
        >
          <div
            class="swiper-slide"
            v-for="item in products.gallery"
            :key="item.name"
          >
            <img
              class="products-single-image"
              :src=""
              :width="item.width"
              :height="item.height"
              alt="lgPicture"
            />
          </div>
        </PvCarousel>

        <span class="prod-full-screen" @click="openLightBox" v-if="isMagnify">
          <i class="icon-plus"></i>
        </span>
      </div>

      <div class="vertical-thumbs">
        <button class="thumb-up">
          <i class="icon-angle-up"></i>
        </button>

        <PvCarousel
          class="prod-thumbnail swiper-dots show-nav-hover products-thumbs-wrap"
          ref="thumbRef"
          :options="baseSlider8"
        >
          <div
            class="swiper-dot swiper-slide"
            v-for="(item, index) in products.pictures"
            :key="'media-one' + index"
            @click="activeThumbItem(index, $event)"
            :class="{ active: index === 0 }"
          >
            <img
              v-lazy="`${baseUrl}${item.url}`"
              :width="item.width"
              :height="item.height"
              alt="products-thumbnail"
            />
          </div>
        </PvCarousel>

        <button class="thumb-down">
          <i class="icon-angle-down"></i>
        </button>
      </div>
    </div>

    <light-box ref="lightBox" :media="lightBoxMedia" :show-light-box="false" /> -->
  </div>
</template>

<script>
import PvCarousel from "~/components/features/PvCarousel";
// import LightBox from "vue-image-lightbox";
import { baseUrl } from "~/api";
import { baseSlider1, baseSlider8 } from "~/utils/data/carousel";
// import "vue-image-lightbox/dist/vue-image-lightbox.min.css";

export default {
  components: {
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
      baseSlider1: baseSlider1,
      baseSlider8: baseSlider8,
      baseUrl: baseUrl,
    };
  },
  computed: {
    lightBoxMedia: function () {
      return this.product.large_pictures.reduce((acc, cur) => {
        return [
          ...acc,
          {
            src: `${baseUrl}${cur.url}`,
            thumb: `${baseUrl}${cur.url}`,
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
