<template>
  <main class="main">
    <div>
      <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/')">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/shop')">
              {{ $t("products.shop") }}
            </nuxt-link>
          </li>
          <li
            v-for="category in product.categories"
            :key="category.id"
            class="breadcrumb-item">
            <nuxt-link
              :to="getLink('/'+category.slug)">
              {{ category.name }}
            </nuxt-link>
          </li>
          <li v-if="loaded" class="breadcrumb-item active" aria-current="page">
            {{ product.short_title }}
          </li>
        </ol>
        <div class="mt-auto">
          <PvBtnShare  />
        </div>
      </nav>
      <div class="product-single-container container product-single-default">
        <div v-if="product" class="row">
          <div class="col-xl-5 col-lg-6 col-md-6 col-12 product-single-gallery">
            <pv-media-new :product="product" />
            <div class="text-center">
              <span class="sku-color d-lg-none d-md-none">SKU: {{ product.sku }}</span>
            </div>
          </div>
          <div class="col-xl-7 col-lg-6 col-md-5 col-sm-12 col-12 product-single-details">
            <pv-detail
              :product="product"
              :tokens="tokens"
              :prev-product="prev_product"
              :next-product="next_product"
            />
          </div>
        </div>
      </div>
      <div
        v-if="!product"
        class="skel-group container">
        <div class="summary-before col-lg-5 col-md-6" />
        <div class="summary entry-summary col-lg-7 col-md-6" />
        <div class="tab-content col-lg-12 mb-7" />
      </div>
      <div>
        <pv-description
          v-if="product"
          :product="product"
          class="container"
        />
      </div>
      <pv-collection
        v-if="product.work_with_blade.length > 0"
        :products="product.work_with_blade"
        :collection-title="'Works with this blade'"
        class="container"
      />


      <pv-collection
        v-if="related_products.length > 1"
        :products="related_products"
        :collection-title="$t('products.relatedProducts')"
        class="container"
      />
      <hr class="mt-0 m-b-5 container" />

      <div
        class="product-widgets-container container mx-auto row pb-2"
      >
        <div class="container">
          <div class="product-widgets-container row pb-2">
            <pv-on-sale-products
              :collection-title="$t('home.onSaleProduct')"
              :animation-delay="'200'"
            />
            <pv-top-selling-three-products
              :collection-title="$t('home.topSellingProduct')"
              :animation-delay="'500'"
            />
            <pv-new-arrival
              :collection-title="$t('home.newarrivalproducts')"
              :animation-delay="'800'"
            />
            <pv-free-shipping
              :collection-title="$t('home.freeshoppingproducts')"
              :animation-delay="'1100'"
            />
          </div>
        </div>
      </div>
      </div>
  </main>
</template>

<script>
import PvDetail from "~/components/product/PvDetail";
import PvDescription from "~/components/product/PvDescription";
import PvCollection from "~/components/product/card/PvCollection";
import PvMediaNew from "~/components/product/PvMediaNew.vue"
import Api from "~/api";
import {mapGetters} from "vuex";
import PvFreeShipping from "~/components/home/PvFreeShipping.vue";
import PvNewArrival from "~/components/home/PvNewArrival.vue";
import PvTopSellingThreeProducts from "~/components/home/PvTopSellingThreeProducts.vue";
import PvOnSaleProducts from "~/components/home/PvOnSaleProducts.vue";
import PvBtnShare from "~/components/common/PvBtnShare.vue";
import axios from "axios";

export default {
  components: {
    PvMediaNew,
    PvBtnShare,
    PvOnSaleProducts,
    PvTopSellingThreeProducts,
    PvNewArrival,
    PvFreeShipping,
    PvDescription,
    PvCollection,
    PvDetail
  },
  async asyncData({ params, redirect, app }) {
    const { data } = await axios.get(`products/${params.slug}`,{
      baseURL: process.env.API_BASE_URL,
      headers:{
        'Accept-Language': app.i18n.locale,
        'Content-Type': 'application/json',
        'currency': app.$cookies.get('currency') || 'USD',
        'Accept': 'application/json',
        'secret-key': process.env.SECRET_KEY,
        'api-key': process.env.API_KEY,
      }
    });
    if (data.product.slug !== params.slug)
      redirect(`/products/${data.product.slug}`);
    return {
      product: data.product,
      tokens: data.tokens,
      related_products: data.related_products,
      featured_products : data.featured_products,
      best_selling_products : data.best_selling_products,
      latest_products: data.latest_products,
      top_rated_products: data.top_rated_products,
      prev_product: data.next_previous_products[0],
      next_product: data.next_previous_products[1],
    };
  },
  data: function () {
    return {
      product: null,
      tokens: null,
      featuredProducts: null,
      bestSellingProducts: null,
      isNewArrivalProducts: null,
      isFreeShippingProducts: null,
      related_products: null,
      featured_products: null,
      best_selling_products: null,
      latest_products: null,
      top_rated_products: null,
      prev_product: null,
      next_product: null,
      loaded: false,
      latestProducts: null,
      topRatedProducts: null,
      latestProducts2: null,
      bestSellingProducts2: null,
      parentCategoryLink: null,
      SubCategory: null,
      SubCategoryLink: null,
      short_tile: null,
      childCategory: null,
      ParentCategory: null,
      isSalePriceEqualToPrice:"-",
      currency:"",
    };
  },
  head() {
    let head_data = {
        titleTemplate: this.product.meta.title
          ? this.product.meta.title
          : this.product.title,
        title: this.product.meta.title
          ? this.product.meta.title
          : this.product.title,
        link: [
          {
            rel: 'canonical',
            href: this.product.canonical,
          },
        ],
        meta: [
          {
            "http-equiv": "content-language",
            content: this.$i18n.locale,
          },
          {
            name: "description",
            content: this.product.meta.description,
          },
          {
            name: "og:title",
            content: this.product.meta.title
          },
          {
            name: "og:description",
            content: this.product.meta.description,
          },
          {
            property: "og:image",
            content: this.product.open_graph,
          },
          {
            property: "og:type",
            content: "product",
          },
          {
            property: "og:site_name",
            content: "Techno Lock Keys"
          },
          {
            property: "og:url",
            content:  `${process.env.PUBLIC_PATH_WITHOUT_SLASH}`+this.$route.fullPath,
          },
        ],
        script: []
      }
      if(this.product.categories[1])
      head_data["script"].push({
      type: 'application/ld+json',
      json: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": this.$i18n.t("products.home"),
            "item": process.env.PUBLIC_PATH,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": this.$i18n.t("products.shop"),
            "item": `${process.env.PUBLIC_PATH}shop`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": this.product.categories[0]['name'],
            "item": `${process.env.PUBLIC_PATH}${this.product.categories[0]['slug']}`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": this.product.categories[1] && this.product.categories[1]['name'] ? this.product.categories[1]['name'] : '-',
            "item": `${process.env.PUBLIC_PATH}${this.product.categories[1] && this.product.categories[1]['slug'] ? this.product.categories[1]['slug'] : ''}`,
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": this.product.title,
            "item": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
          }
          ]
      }
      });
      else{
        head_data["script"].push({
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": this.$i18n.t("products.home"),
                "item": process.env.PUBLIC_PATH,
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": this.$i18n.t("products.shop"),
                "item": `${process.env.PUBLIC_PATH}shop`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": this.product.categories[0]['name'],
                "item": `${process.env.PUBLIC_PATH}${this.product.categories[0]['slug']}`,
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": this.product.title,
                "item": `${process.env.PUBLIC_PATH}products/${this.product.slug}`,
              }
            ]
          }
        })
      };
      if(this.product.avg_rating !=0)
      head_data["script"].push({
        type: 'application/ld+json',
        json: {
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": this.product.title,
          "image": this.product.main_image,
          "additionalImage": this.product.secondary_image,
          "video":this.product.videos_link,
          "compatibleWith":  this.product.compatible_products_slug,
          "bundledProduct": this.product.bundled_products_slug,
          "gallery": this.product.schema_gallery,
          "description": this.product.meta.description,
          "sameAs": this.product.canonical,
          "sku": this.product.sku,
          "brand": {
            "@type": "Brand",
            "name": this.product.specifications.manufacturer ?? "-"
          },
          "weight": this.product.weight,
          "offers": this.product.offers.length > 0 ? this.product.offers.map(offer => ({
            "@type": "Offer",
            "price": offer.price.value,
            "salePrice": this.product.sale_price.value,
            "priceCurrency": this.product.price.code,
            "priceValidUntil": formatDate(this.product.price.until),
            "availability": this.product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "url": process.env.PUBLIC_PATH + "products/" + this.product.slug,
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "value": offer.from
            }
          })) : [{
            "@type": "Offer",
            "price": this.product.price.value,
            "salePrice": this.product.sale_price.value,
            "priceCurrency": this.product.price.code,
            "priceValidUntil": formatDate(this.product.price.until),
            "availability": this.product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "url": process.env.PUBLIC_PATH + "products/" + this.product.slug,
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "value": 1
            }
          }],
          "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": this.product.avg_rating,
              "bestRating": this.product.best_rating,
            },
            "author": {
              "@type": "Person",
              "name": this.product.author_review
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": this.product.avg_rating,
            "reviewCount": this.product.total_reviews
          },
        }
      });
      else{
        head_data["script"].push({
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": this.product.title,
            "image": this.product.main_image,
            "additionalImage": this.product.secondary_image,
            "video":this.product.videos_link,
            "compatibleWith":  this.product.compatible_products_slug,
            "bundledProduct": this.product.bundled_products_slug,
            "gallery": this.product.schema_gallery,
            "description": this.product.meta.description,
            "sameAs": this.product.canonical,
            "sku": this.product.sku,
            "brand": {
              "@type": "Brand",
              "name": this.product.specifications.manufacturer ?? "-"
            },
            "weight": this.product.weight,
            "offers": this.product.offers.length > 0 ? this.product.offers.map(offer => ({
              "@type": "Offer",
              "price": offer.price.value,
              "salePrice": this.product.sale_price.value,
              "priceCurrency": this.product.price.code,
              "priceValidUntil": formatDate(this.product.price.until),
              "availability": this.product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
              "url": process.env.PUBLIC_PATH + "products/" + this.product.slug,
              "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": offer.from
              }
            })) : [{
              "@type": "Offer",
              "price": this.product.price.value,
              "salePrice": this.product.sale_price.value,
              "priceCurrency": this.product.price.code,
              "priceValidUntil": formatDate(this.product.price.until),
              "availability": this.product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
              "url": process.env.PUBLIC_PATH + "products/" + this.product.slug,
              "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": 1
              }
            }]
          }
        });
      }
      if(this.product.frequently_asked_questions && this.product.frequently_asked_questions.length > 0) {
        const faqItems = [];
        // Loop through the frequently_asked_questions array
        this.product.frequently_asked_questions.forEach(item => {
          // Ensure that the item has at least two elements (question and answer)
          if (item.length >= 2) {
            // Construct the FAQ item and add it to the faqItems array
            const faqItem = {
              "@type": "Question",
              "name": item[0], // Question is at index 0
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item[1], // Answer is at index 1
              },
            };
            faqItems.push(faqItem);
          }
        });
        head_data["script"].push({
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems,
          },
        });
      }
    if (this.product.video_details && this.product.video_details.length > 0) {
      this.product.video_details.forEach(video => {
        let thumbnailUrls = [];
        // Iterate over each thumbnail type (default, high, maxres, medium, standard)
        for (let thumbnailType in video.thumbnailUrl) {
          // Push the URL of each thumbnail into the array
          thumbnailUrls.push(video.thumbnailUrl[thumbnailType].url);
        }

        head_data["script"].push({
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": video.name,
            "description": video.description,
            "thumbnailUrl": thumbnailUrls,
            "uploadDate": video.uploadDate,
            "duration": video.duration,
            "contentUrl": video.contentUrl,
            "embedUrl": video.embedUrl,
          }
        });
      });
    }
    function formatDate(dateString) {
      if(dateString !== undefined){
        var date = new Date(dateString);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
      }
      else{
        var lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);
        var year = lastDayOfYear.getFullYear();
        var month = ("0" + (lastDayOfYear.getMonth() + 1)).slice(-2);
        var day = ("0" + lastDayOfYear.getDate()).slice(-2);
        return year + "-" + month + "-" + day;
      }
    }
    return head_data
  },
  mounted: function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
    ...mapGetters("header",["getCurrency"]),
  },
  methods: {
    async getProduct() {
      this.loaded = false;
      Api.get(`products/${this.$route.params.slug}`)
        .then((response) => {
          this.product = response.data.product;
          let productsArr =
            JSON.parse(localStorage.getItem("lastProductsVisited")) || [];
          productsArr.push(this.product);
          this.related_products = response.data.related_products;
          this.featured_products = response.data.featured_products;
          this.best_selling_products = response.data.best_selling_products;
          this.latest_products = response.data.latest_products;
          this.top_rated_products = response.data.top_rated_products;
          this.prev_product = response.data.next_previous_products[0];
          this.next_product = response.data.next_previous_products[1];
          this.loaded = true;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  },
};
</script>
