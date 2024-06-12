<template>
  <div class="swiper-carousel swiper-theme">
    <div ref="pvCarousel" v-swiper="sliderOption" @resize="resizeHandler">
      <div class="swiper-wrapper">
        <slot />
      </div>
       <div
        class="swiper-nav"
        v-if="sliderOption.navigation && !mainSlider">
         <button type="button" role="presentation" class="swiper-prev"
         v-if="ShowNavigation"
         >
           <i v-if="!useFasIcon" class="icon-angle-left" />
         </button>

        <button type="button" role="presentation" class="swiper-next"
        v-if="ShowNavigation"
        >
          <i v-if="!useFasIcon" class="icon-angle-right" />
        </button>
      </div>

<!--      Main slider-->
      <div
        class="swiper-nav-mainSlider"
        v-if="sliderOption.navigation && mainSlider">
        <button type="button" role="presentation" class="swiper-prev"
                v-if="ShowNavigation"
        >
          <i v-if="!useFasIcon" class="icon-angle-left" />
        </button>

        <button type="button" role="presentation" class="swiper-next"
                v-if="ShowNavigation"
        >
          <i v-if="!useFasIcon" class="icon-angle-right" />
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
  props: {
    isIndexPage: Boolean,
    ShowNavigation: Boolean,
    options: Object,
    mainSlider: Boolean,
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
.swiper-nav .swiper-prev{
  position: absolute;
  left: -30px;
  font-size: 50px!important;
  font-weight: 400!important;
  color: #555452!important;
}
.swiper-nav .swiper-next{
  position: absolute;
  right: -30px;
  font-size: 50px!important;
  font-weight: 400!important;
  color: #555452!important;
}
.swiper-nav-mainSlider .swiper-prev{
  position: absolute;
  font-size: 80px!important;
  font-weight: 400!important;
  color: #2e59d7!important;
  z-index: 99;
  background-color: transparent;
  border: 0;
  left: 0;
}
.swiper-nav-mainSlider .swiper-next{
  position: absolute;
  right: 0;
  font-size: 80px!important;
  font-weight: 400!important;
  color: #2e59d7!important;
  z-index: 99;
  background-color: transparent;
  border: 0;
}



@media screen and (max-width: 580px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 3vh;
    font-size: 40px!important;
  }
}
@media screen and (max-width: 380px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 0vh;
    font-size: 40px!important;
  }
}
@media screen and (min-width: 580px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 2vh;
  }
}

@media screen and (min-width: 767px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 10vh;
  }
}


@media screen and (min-width: 992px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 8vh;
  }
}

@media screen and (min-width: 1200px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 14vh;
  }
}

@media screen and (min-width: 1800px){
  .swiper-nav-mainSlider .swiper-next , .swiper-nav-mainSlider .swiper-prev {
    bottom: 18vh;
  }
}
</style>
