<template>
  <div class="container">
    <nav
      aria-label="breadcrumb"
      class="breadcrumb-nav"
    >
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/')"
              class="router-link-active">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li
            aria-current="page"
            class="breadcrumb-item active"
          >
            {{ $t("online.onlineServices") }}
          </li>
        </ol>
      </div>
    </nav>
    <h1 class="text-center mt-lg-2">{{ $t("online.onlineServices") }}</h1>
    <div class="row online-services-products">
      <div
        v-for="item in products"
        :key="item.sku"
        class="col-7 col-sm-5 col-md-4 col-lg-3 col-xl-3 mb-2"
      >
        <pv-product-online-services :product="item" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import Api from "~/api";
import PvProductOnlineServices from "~/components/product/card/PvProductOnlineServices.vue";
export default {
  name: "index",
  components: {PvProductOnlineServices},
  computed: {
    ...mapGetters('rtlStore',['getIsAr']),
    ...mapGetters("language", ["getLang"]),
  },

  async asyncData({ params }) {
    const response  = await Api.get(`search/online-services-products`);
    return {
      products : response.data
    }
  },
  data() {
    return {
      products: [],
    };
  },
  head() {
    return {
      title: "Techno Lock Keys Trading | Online Services",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Techno Lock Keys | Online Services"
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
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: `${this.$settings.social_media.twitter}`,
        },
        {
          name: "twitter:title",
          content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        },
        {
          name: "twitter:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
      ],
      script: [
        {
          // type: 'application/ld+json', json: {
          //   "@context": "https://schema.org",
          //   "@type": "WebPage",
          //   "products": this.products.map(product => {
          //     const productData = {
          //       "@type": "Product",
          //       "name": product.title,
          //       "url": process.env.PUBLIC_PATH + product.slug,
          //       "description": product['seo_description'],
          //       "brand": {
          //         "@type": "Brand",
          //         "name": product.manufacturer,
          //       },
          //       "image": product.gallery[0]['l']['url'],
          //       "additionalImage": product.gallery[1]['l']['url'],
          //       "sameAs": process.env.PUBLIC_PATH + "products/" + product.canonical,
          //       "sku": product.sku,
          //       "weight": product.weight,
          //       "offers": {
          //         "@type": "Offer",
          //         "price": product.price.value,
          //         "salePrice": product.sale_price.value === product.price.value ? 0 : product.sale_price.value,
          //         "priceCurrency": product.price.code,
          //         "availability": product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
          //         "url": process.env.PUBLIC_PATH + "products/" + product.slug,
          //       }
          //     };
          //
          //     // Add review information only if avg_rating is not null or 0
          //     if (product.avg_rating !== null && product.avg_rating !== 0) {
          //       productData.review = {
          //         "@type": "Review",
          //         "reviewRating": {
          //           "@type": "Rating",
          //           "ratingValue": product.avg_rating,
          //           "bestRating": product.best_rating,
          //         },
          //         "author": {
          //           "@type": "Person",
          //           "name": product.author_review
          //         }
          //       };
          //     }
          //     return productData;
          //   })
          // }
        },
      ]
    }
  },

  methods : {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  }
}
</script>

<style scoped>
@media screen and (max-width: 767px){
  .online-services-products{
    justify-content: center;
  }
}
</style>
