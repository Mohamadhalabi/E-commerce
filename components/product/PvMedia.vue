<template>
  <div>
    <div v-if="false" class="border">
      <div class="product-slider-container">
        <pv-label-group :product="product" />

        <PvCarousel
          ref="mediaRef"
          class="product-single-carousel show-nav-hover"
          :options="baseSlider1"
        >
          <div
            v-for="image in product.gallery"
            :key="image.m.id"
            class="swiper-slide"
          >
            <pv-gallery-image
              :class-name="'products-single-image'"
              :image="image"
              :size="'l'"
              class="border rounded-10"
            />
          </div>
        </PvCarousel>

      </div>

      <PvCarousel
        ref="thumbRef"
        class="prod-thumbnail swiper-dots show-nav-hover"
        :options="baseSlider8"
        :use-fas-icon="true"
      >
        <div
          v-for="(image, index) in product.gallery"
          :key="image.m.id"
          class="swiper-dot swiper-slide"
          :class="{ active: index === 0 }"
          @click="activeThumbItem(index, $event)"
        >
          <pv-gallery-image
            :image="image"
            :size="'s'"
            class="border rounded-10"
          />
        </div>
      </PvCarousel>

<!--      <light-box-->
<!--        ref="lightBox"-->
<!--        :media="lightBoxMedia"-->
<!--        :show-light-box="false"-->
<!--      />-->
    </div>
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
          :options="baseSlider1"
        >
          <div
            class="swiper-slide"
            v-for="image in product.gallery"
            :key="image.l.id"
          >
            <pv-gallery-image2
              :class-name="'products-single-image'"
              :image="image"
              :size="'l'"
              class="rounded-10"
            />
          </div>
        </PvCarousel>
      </div>
      <!-- End:Big Slider -->

      <!-- Begin:Vertical Slider  -->
      <div class="vertical-thumbs px-2">
        <button class="thumb-up">
          <i class="icon-angle-up"></i>
        </button>

        <PvCarousel
          class="prod-thumbnail swiper-dots show-nav-hover product-thumbs-wrap"
          ref="thumbRef"
          :options="baseSlider8">
          <div
            class="swiper-dot swiper-slide "
            v-for="(image, index) in product.gallery"
            :key="image.s.id"
            @click="activeThumbItem(index, $event)"
            :class="{ active: index === 0 }"
          >
            <pv-gallery-image
              :image="image"
              :size="'s'"
              class="rounded-5"
            />
          </div>
        </PvCarousel>

        <button class="thumb-down">
          <i class="icon-angle-down"></i>
        </button>
      </div>
    </div>
<!--    <light-box ref="lightBox" :media="lightBoxMedia" :show-light-box="false" />-->
  </div>
</template>

<script>
import PvLabelGroup from "~/components/product/partials/PvLabelGroup";
import PvGalleryImage from "~/components/product/partials/PvGalleryImage";
import PvGalleryImage2 from "~/components/product/partials/PvGalleryImage2";
import PvCarousel from "~/components/features/PvCarousel";
import { baseSlider1, baseSlider8 } from "~/utils/data/carousel";
import { mapGetters } from "vuex";

export default {
  components: {
    PvLabelGroup,
    PvGalleryImage,
    PvGalleryImage2,
    PvCarousel,
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
      baseSlider1,
      baseSlider8,
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
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
  },
};
</script>
<style scoped>
.rounded-10 {
  border-radius: 10px;
}
</style>
