<template>
  <div>
    <pv-label-group :product="product" style="padding-right: 25px!important;padding-top: 10px!important;" />
    <div v-for="(image, index) in product.gallery" :key="index" class="slide rounded-5" ref="main" @mouseenter="mouseEntered" @mouseleave="mouseLeft">
      <div class="showOnDesktop">
        <ImageMagnifier v-if="index === currentIndex" :image="image" size="l" :isMouseInside="isMouseInside" />
      </div>
      <div class="showOnMobile">
        <img
          :src="image['l']['url']"
          v-if="index === currentIndex"
          class="rounded-5"
          style="border: 1px solid #e7e7e6!important;"
        />
      </div>
    </div>

    <Carousel
      thumbnails
      ref="thumbnails"
      :slides-per-page="4"
      :show-arrows="true"
      :loop="true"
    >
      <div
        v-for="(image, index) in product.gallery"
        :key="index"
        style="padding: 10px"
        class="thumbnail-image"
        :class="`slide--${index} slide--thumbniail`"
        @click="gotoMainCarousel(index)"
      >
        <img
          class="rounded-5"
          :src="image['s'].url"
          style="border: 1px solid #e7e7e6!important;"
        />
      </div>
      <template #back-arrow="{ disabled }">
        <i class="prevButton fa fa-chevron-left"></i>
      </template>
      <template #next-arrow="{ disabled }">
        <i class="nextButton fa fa-chevron-right"></i>
      </template>
    </Carousel>
  </div>
</template>

<script>
import ImageMagnifier from "~/components/product/partials/ImageMagnifier.vue";
import Carousel from "vue-ssr-carousel";
import PvLabelGroup from "~/components/product/partials/PvLabelGroup.vue";

export default {
  name: "Example4",
  components: {PvLabelGroup, ImageMagnifier, Carousel },
  props: {
    product: Object,
  },
  data() {
    return {
      highlightImage: false,
      isMouseInside: false,
      currentIndex: 0
    };
  },
  methods: {
    gotoMainCarousel(index) {
      this.currentIndex = index;
      this.highlightImage = true;
    },
    mouseEntered() {
      this.isMouseInside = true;
    },
    mouseLeft() {
      this.isMouseInside = false;
    }
  },
};
</script>
<style>
@media screen and (max-width: 993px){
  .showOnDesktop{
    display: none;
  }
}
@media screen and (min-width: 993px){
  .showOnMobile{
    display: none;
  }
}
</style>
