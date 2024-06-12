<template>
  <div class="swiper-carousel swiper-theme">
    <div ref="pvCarousel" v-swiper="sliderOption" @resize="resizeHandler">
      <div class="swiper-wrapper">
        <slot />
      </div>

      <div
        v-if="sliderOption.navigation && !sliderOption.isThumbCarousel"
        class="swiper-nav"
        :class="{ disabled: isNavDisabled }"
      >
        <button type="button" role="presentation" class="swiper-prev">
          <i v-if="!useFasIcon" class="icon-angle-left" />
          <i v-if="useFasIcon" class="fas fa-chevron-left" />
        </button>

        <button type="button" role="presentation" class="swiper-next">
          <i v-if="!useFasIcon" class="icon-angle-right" />
          <i v-if="useFasIcon" class="fas fa-chevron-right" />
        </button>
      </div>

      <div
        v-if="sliderOption.pagination"
        class="swiper-dots  swiper-pagination-clickable"
        :class="{ disabled: isDotDisabled }"
      >
      </div>
    </div>
  </div>
</template>

<script>
const defaultOption = {
  loop: false,
  scrollbar: {
    draggable: false,
  },
  spaceBetween: 0,
  slidesPerView: 1,
  watchSlidesVisibility: true,
  clickable: true,
};

export default {
  name:'PvCarouselUnlockRemote',
  layout: 'AlternateLayout',
  props: {
    options: Object,
    useFasIcon: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      sliderOption: Object.assign({}, defaultOption, this.options),
      isNavDisabled: false,
      isDotDisabled: false,
    };
  },

  mounted: function () {
    let self = this;
    this.$nextTick(() => {
      if (self.$refs.pvCarousel) {
        self.$refs.pvCarousel.swiper.emit("update");
        self.isNavDisabled =
          self.$refs.pvCarousel.querySelectorAll(".swiper-button-disabled") &&
          self.$refs.pvCarousel.querySelectorAll(".swiper-button-disabled")
            .length > 1
            ? true
            : false;
        self.isDotDisabled =
          self.$refs.pvCarousel.querySelectorAll(".swiper-pagination-bullet") &&
          self.$refs.pvCarousel.querySelectorAll(".swiper-pagination-bullet")
            .length < 2
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
    resizeHandler: function () {
      this.isNavDisabled =
        this.$refs.pvCarousel.querySelectorAll(".swiper-button-disabled") &&
        this.$refs.pvCarousel.querySelectorAll(".swiper-button-disabled")
          .length > 1;
      this.isDotDisabled =
        this.$refs.pvCarousel.querySelectorAll(".swiper-pagination-bullet") &&
        this.$refs.pvCarousel.querySelectorAll(".swiper-pagination-bullet")
          .length < 2;
    },
    slidePrev() {
      if (this.$refs.pvCarousel && this.$refs.pvCarousel.swiper) {
        this.$refs.pvCarousel.swiper.slidePrev();
      }
    },
    slideNext() {
      if (this.$refs.pvCarousel && this.$refs.pvCarousel.swiper) {
        this.$refs.pvCarousel.swiper.slideNext();
      }
    }
  },
};
</script>

<style scoped>
.swiper-carousel .swiper-container {
  position: static !important;
}

</style>
