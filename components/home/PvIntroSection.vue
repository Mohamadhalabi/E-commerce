<template>
  <div v-if="slides.length > 0">
    <section class="intro-section">
      <div class="row">
        <!-- Begin: Left Side -->
        <div key="intro-1" class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <Carousel
            :show-arrows='true'
            :loop='true'
            :autoplay-delay='5'
          >
            <div
              v-for="(slide, index) in slides"
              :key="index"
              class="swiper-slide"
              :class="`boxed-slide-${index}`">
              <a :href="slide.link" target="_blank" aria-label="Sliders">
                <nuxt-img
                  format="webp"
                  class="w-100"
                  sizes="sm:400px md:768px lg:1024px xl:1280px xxl:1536 2xl:1800px"
                  width="1800px"
                  height="454px"
                  :src="slide['image']"
                  alt="Slider"
                  :open_graph="slide['open_graph']"
                  :scal="slide['scal']"
                  :description="slide['description']" />
              </a>
            </div>
            <template #back-arrow='{ disabled }'>
              <i class="prevButton fa fa-chevron-left"></i>
            </template>

            <template #next-arrow='{ disabled }'>
              <i class="nextButton fa fa-chevron-right"></i>
            </template>
          </Carousel>



        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Api from "~/api";
import Carousel from 'vue-ssr-carousel';

export default {
  components: {
    Carousel,
    // PvCarousel:() => import("~/components/features/PvCarousel"),
  },
  async fetch() {
    try {
      const response = await Api.get("sliders");
      this.slides = response.data.result;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  },
  data: function () {
    return {
      slides: [],
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    // HomeSliderConfig() {
    //   return{
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     fade:true,
    //     changeDelay:1000,
    //     mobileFirst: true,
    //     navButtons:true,
    //     timing: 'ease',
    //     dots: false,
    //     slidesToShow: 1,
    //     speed: 1000,
    //   }
    // }
  },
};
</script>
