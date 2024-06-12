<template>
  <div class="swiper-carousel swiper-theme">
    <div ref="pvCarouselBrand" v-swiper="sliderOption" @resize="resizeHandler">
      <div class="swiper-wrapper">
        <slot />
      </div>
      <div
        class="swiper-nav"
        v-if="sliderOption.navigation"
      >
        <div>
          <button type="button" role="presentation" class="swiper-prev">
            <i v-if="!useFasIcon" class="icon-angle-left" />
          </button>

          <button type="button" role="presentation" class="swiper-next">
            <i v-if="!useFasIcon" class="icon-angle-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  props: {
    options: Object,
    useFasIcon: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      sliderOption: Object.assign({}, this.options),
      isNavDisabled: false,
      isDotDisabled: false,
      defaultOption : {
        loop: false,
        scrollbar: {
          draggable: false
        },
        spaceBetween: 0,
        slidesPerView: 1,
        watchSlidesVisibility: true,
        clickable: true,
      }
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      if (self.$refs.pvCarouselBrand) {
        self.$refs.pvCarouselBrand.swiper.emit("update");
        self.isNavDisabled =
          self.$refs.pvCarouselBrand.querySelectorAll(".swiper-button-disabled") &&
          self.$refs.pvCarouselBrand.querySelectorAll(".swiper-button-disabled").length > 1
            ? true
            : false;
        self.isDotDisabled =
          self.$refs.pvCarouselBrand.querySelectorAll(".swiper-pagination-bullet") &&
          self.$refs.pvCarouselBrand.querySelectorAll(".swiper-pagination-bullet").length < 2
            ? true
            : false;

        if (
          self.options.navigation &&
          document
            .querySelector(self.options.navigation.nextEl)
            .parentNode.querySelectorAll(".swiper-button-disabled").length > 1
        )
          document
            .querySelector(self.options.navigation.nextEl)
            .parentNode.classList.add("disabled");
      }
    });
  },
  methods: {
    handleSlideNext() {
      if(this.getIsAr){
        this.$refs.pvCarouselBrand.slidePrev()
      }
      else{
        this.$refs.pvCarouselBrand.slideNext();
      }
    },
    handleSlidePrevious() {
      if(this.getIsAr){
        this.$refs.pvCarouselBrand.slideNext();
      }
      else{
        this.$refs.pvCarouselBrand.slidePrev()
      }
    },
    resizeHandler() {
      this.isNavDisabled =
        this.$refs.pvCarouselBrand.querySelectorAll(".swiper-button-disabled") &&
        this.$refs.pvCarouselBrand.querySelectorAll(".swiper-button-disabled").length > 1;
      this.isDotDisabled =
        this.$refs.pvCarouselBrand.querySelectorAll(".swiper-pagination-bullet") &&
        this.$refs.pvCarouselBrand.querySelectorAll(".swiper-pagination-bullet").length < 2;
    },

  }
};
</script>

<style scoped>
.swiper-carousel .swiper-container {
  position: static !important;
}
.swiper-nav .swiper-prev{
  position: absolute;
  left: -35px;
  font-size: 50px!important;
  font-weight: 400!important;
  color: #555452!important;
}
.swiper-nav .swiper-next{
  position: absolute;
  right: -35px;
  font-size: 50px!important;
  font-weight: 400!important;
  color: #555452!important;
}
</style>
