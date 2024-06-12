<template>
  <main class="main">
      <pv-stories class="desktop-only" />
      <pv-intro-section/>
      <home-page-search />
    <pv-slider-Banner class="desktop-only"  />
      <div
        class="container-fluid">
        <div class="container">
          <pv-latest-products
            :isIndexPage ="true"
            :collectionTitle="$t('home.latestProducts')"
            :link="'new-arrival'"
          />
        </div>
      </div>
      <div
        <div class="container">
          <pv-best-selling
            :isIndexPage ="true"
            :collectionTitle="$t('home.bestSellingProducts')"
            :link="'best-seller'"
          />
        </div>
      </div>
      <div
        class="container-fluid">
        <div class="container">
          <pv-top-selling
            :isIndexPage ="true"
            :collectionTitle="$t('home.topSellingProduct')"
            :link="'top-selling'"
          />
        </div>
      </div>
      <div class="container-fluid pt-4">
        <div class="container large-screen-only">
          <pv-line-banner class="mb-4" v-if="!isMobile" />
        </div>
      </div>
      <div>
        <div class="container">
          <div class="product-widgets-container row pb-2">
            <pv-on-sale-products
              :collection-title="$t('home.onSaleProduct')"
              :animation-delay="'200'"
              :link="'discount'"
            />
            <pv-top-selling-three-products
              :collection-title="$t('home.topSellingProduct')"
              :animation-delay="'500'"
              :link="'top-selling'"
            />
            <pv-new-arrival
              :collection-title="$t('home.newarrivalproducts')"
              :animation-delay="'800'"
              :link="'new-arrival'"
            />
            <pv-free-shipping
              :collection-title="$t('home.freeshoppingproducts')"
              :animation-delay="'1100'"
              :link="'free-shipping'"
            />
          </div>
        </div>
      </div>
    <pv-manufacturers-section/>
    <div style="background-color: #f07905">
      <div class="container">
        <div
          class="p-3 justify-content-center">
<!--          <b-form>-->
<!--            <div class="row">-->
<!--              <div class="col-lg-3 m-auto">-->
<!--                <h6 class="mt-auto mb-auto mr-3 news-letter-h6">Subscribe to our newsletter</h6>-->
<!--              </div>-->
<!--              <div class="col-lg-6 m-auto">-->
<!--                <b-form-group-->
<!--                  id="input-group-1"-->
<!--                  label="Enter your email address"-->
<!--                  label-for="input-1"-->
<!--                  description="We'll never share your email with anyone else."-->
<!--                >-->
<!--                  <b-form-input-->
<!--                    id="input-1"-->
<!--                    type="email"-->
<!--                    class="m-0"-->
<!--                    v-model="email"-->
<!--                    placeholder="Enter email"-->
<!--                    required-->
<!--                  ></b-form-input>-->
<!--                </b-form-group>-->
<!--              </div>-->
<!--              <div class="col-lg-3 m-auto">-->
<!--                <button type="submit" @click="Subscribe()" class="subscribe">Subscribe</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </b-form>-->
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import {mapGetters} from "vuex";
import api from '~/api';
export default {
  head() {
    return {
      title: 'Techno Lock Keys Trading | Automotive Locksmith Services',
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/',
        },
      ],
      meta: [
        {
          "http-equiv": 'content-language',
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        // {
        //   name: "twitter:card",
        //   content: "summary",
        // },
        // {
        //   name: "twitter:site",
        //   content: `${this.$settings.social_media.twitter}`,
        // },
        // {
        //   name: "twitter:title",
        //   content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        // },
        // {
        //   name: "twitter:description",
        //   content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        // },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
      ],
      script: [
        { type: 'application/ld+json', json: {
            "@context": "https://schema.org/",
            "@type": "Organization",
            "name": "Techno Lock Keys Trading",
            "url": "https://www.tlkeys.com/",
            "image": "https://www.tlkeys.com/tlk-logo.png",
            "description": "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Industrial No. 5, behind Maliah Road., shop No. 8",
              "addressCountry": "AE"
            },
            "telephone": "+971 6 542 1313",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "8:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Paypal",
            "sameAs": [
              "https://www.facebook.com/technolockkeys_world/",
              "https://twitter.com/techno_lock",
              "https://api.whatsapp.com/send?phone=971504429045"
            ]
          }
        },
        { type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.tlkeys.com",
            "logo": this.$settings.website.system_logo_black.l.url
          }
        }
      ]
    }
  },
  components: {
    // PvNewsletterModal,
    PvStories: () => import("~/components/home/PvStories"),
    PvIntroSection: () => import("~/components/home/PvIntroSection.vue"),
    HomePageSearch: () => import("~/components/home/HomePageSearch.vue"),
    PvSliderBanner: () => import("~/components/home/PvSliderBanner.vue"),
    PvManufacturersSection: () => import("~/components/home/PvManufacturersSection.vue"),
    PvLineBanner: () => import("~/components/home/PvLineBanner.vue"),
    PvLatestProducts: () => import("~/components/home/PvLatestProducts.vue"),
    PvBestSelling: () => import("~/components/home/PvBestSelling.vue"),
    PvTopSelling: () => import("~/components/home/PvTopSelling.vue"),
    PvOnSaleProducts: () => import("~/components/home/PvOnSaleProducts.vue"),
    PvTopSellingThreeProducts: () => import("~/components/home/PvTopSellingThreeProducts.vue"),
    PvNewArrival: () => import("~/components/home/PvNewArrival.vue"),
    PvFreeShipping:() => import("~/components/home/PvFreeShipping.vue"),
  },

  data: function () {
    return {
      animationDelay: '100ms',
      isFreeShippingProducts: null,
      latestProducts2: null,
      bestSellingProducts2: null,
      lastVisited: [],
      topSelling: [],
      topSellingThreeProducts: [],
      isMobile:false,
      email:"",
    };
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods: {
    handleResize() {
      if(process.client)
      this.isMobile = window.innerWidth < 768;
    },
    Subscribe(){
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        // Assuming `api` is an instance of Axios or similar HTTP client
        api.post("/subscribe", { email: this.email }).then((response) => {
          console.log(response);
        }).catch((error) => {
          if (error.response.status === 400) {
            this.$notify({
              group: "errorMessage",
              type: "error",
              text:  this.$t("alerts.emailAlready"),
            });
          } else {
            console.error(error);
          }
        });
      } else {
        this.$notify({
          group: "errorMessage",
          type: "error",
          text:  this.$t("alerts.enterValidEmail"),
        });
      }
    }
  },
  mounted() {
    if(process.client) {
      this.isMobile = window.innerWidth < 768;
      window.addEventListener('resize', this.handleResize);
    }
  },
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    if(process.client)
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>
<style>
@media screen and (max-width: 993px){
  .desktop-only{
    display: none;
  }
}
.news-letter-h6{
  font-size: 24px;
  color: #FFFFFF;
}
.subscribe{
  padding: 10px;
  border-radius: 10px;
  background-color: #a51017;
  color: #FFFFFF;
  border-color: black;
}
</style>
