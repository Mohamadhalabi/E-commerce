<template>
  <div>
    <NotFound v-if="products.length == 0 && show_not_found" />
    <div v-if="viewType == 'product'">
      <nav
        v-if="!products || (products && products.length > 0)"
        v-sticky class="toolbox sticky-header mobile-sticky"
        data-start-top="500"
        data-offset-top="60">
        <div class="filters d-flex  d-lg-none">
          <i class="fa fa-sliders-h"
             @click="clickedFilter()"
          > Filters</i>
        </div>
        <div class="toolbox-left" v-if="true">
          <div class="toolbox-item toolbox-sort">
            <label>{{ $t("shop.sort_by") }}</label>
            <div class="select-custom">
              <select
                v-model="ordering"
                name="orderby"
                class="form-control"
                @change="changeOrder"
              >
                <option value="type">{{ $t("shop.type")}}</option>
                <option value="title_a_to_z">
                  {{ $t("shop.title_a_to_z") }}
                </option>
                <option value="title_z_to_a">
                  {{ $t("shop.title_z_to_a") }}
                </option>
                <option value="price_high_low">
                  {{ $t("shop.price_high_low") }}
                </option>
                <option value="price_low_high">
                  {{ $t("shop.price_low_high") }}
                </option>
                <option value="oldest">{{ $t("shop.oldest") }}</option>
                <option value="newest">{{ $t("shop.newest") }}</option>
                <option value="priority">{{ $t("shop.priority") }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="toolbox-right" v-if="true">
          <div class="toolbox-item toolbox-sort">
            <div class="mx-3 select-custom">
              <select
                v-model="selectedNumber"
                name="selectedNumber"
                class="form-control"
                @change="handleChange">
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
                <option value="24">24</option>
              </select>
            </div>
            <i
              @click="selectShowStyle('grid')"
              style="cursor: pointer; font-size: 1.8rem"
              :class="{ 'orange-1': isSelected }"
              class="mx-2 icon-mode-grid"
            />
            <i
              @click="selectShowStyle('list')"
              style="cursor: pointer; font-size: 1.8rem"
              :class="{ 'orange-1': !isSelected }"
              class="mx-2 icon-mode-list"
            />
          </div>
        </div>
      </nav>

      <div v-if="showStyle == 'grid'" class="row">
        <div
          v-for="item in products"
          :key="item.sku"
            class="custom-col col-6 col-sm-4 col-md-4 col-lg-4 col-xl-3 mb-2"
        >
          <pv-product :product="item" />
        </div>
      </div>
      <template v-else class="row">
         <div
            v-for="item in products"
            :key="item.sku"
            class="col-12 mb-3"
          >
          <pv-list-product :product="item"></pv-list-product>
          </div>
      </template>
      <b-pagination
        v-if="pageCount > 1"
        v-model="selectedPage"
        :total-rows="pageCount"
        :per-page="1"
        pills
        limit="6"
        ellipsis
        align="center"
        size="xl"
        @input="changePage(selectedPage)"
      />
    </div>

    <div v-if="viewType == 'categories'">
      <div v-for="(product, index) in products" :key="index">
        <base-button-icon-1
          style="z-index: 1000"
          @click="showMore(product.slug)"
          :outline="true"
          class="p-3 position-absolute end-0"
        >
          {{ $t("shop.showMore") }}
        </base-button-icon-1>
        <pv-collection
          class="p-0 m-0"
          :products="product.products"
          :collection-title="product.category"
          :view-type="viewType"
        />
        <div class="w-100 border mb-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PvProduct from "~/components/product/card/PvProduct.vue";
import PvListProduct from "~/components/product/card/PvListProduct.vue";
import { scrollTopHandler } from "~/utils";
import PvCollection from "~/components/product/card/PvCollection.vue";
import NotFound from "~/components/shop/NotFound.vue";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  components: {
    BaseButtonIcon1,
    NotFound,
    PvCollection,
    PvProduct,
    PvListProduct,
  },
  head() {
    return {
      script: [
        {
          type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "products": this.products.map(product => {
              const productData = {
                "@type": "Product",
                "name": product.title,
                "url": process.env.PUBLIC_PATH + product.slug,
                "description": product['seo_description'],
                "brand": {
                  "@type": "Brand",
                  "name": product.manufacturer,
                },
                "image": product.gallery[0]['l']['url'],
                "additionalImage": product.gallery[1]['l']['url'],
                "sameAs": process.env.PUBLIC_PATH + "products/" + product.canonical,
                "sku": product.sku,
                "weight": product.weight,
                "offers": {
                  "@type": "Offer",
                  "price": product.price.value,
                  "salePrice": product.sale_price.value === product.price.value ? 0 : product.sale_price.value,
                  "priceCurrency": product.price.code,
                  "availability": product.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
                  "url": process.env.PUBLIC_PATH + "products/" + product.slug,
                }
              };

              // Add review information only if avg_rating is not null or 0
              if (product.avg_rating !== null && product.avg_rating !== 0) {
                productData.review = {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": product.avg_rating,
                    "bestRating": product.best_rating,
                  },
                  "author": {
                    "@type": "Person",
                    "name": product.author_review
                  }
                };
              }
              return productData;
            })
          }
        },
      ]
    }
  },

  async fetch() {
    await this.fetchProducts();
  },

  props: {
    value: {
      type: Object,
      required: false,
    },
    category: {
      type: String,
      required: false,
      default: null,
    },
    manufacturer: {
      type: String,
      required: false,
      default: null,
    },
    brand: {
      type: String,
      required: false,
      default: null,
    },
    slugtype: {
      type: String,
      required: false,
      default: null,
    },
    slug: {
      type: String,
      required: false,
      default: null,
    },
  },

  data: function () {
    return {
      showStyle: "grid",
      viewType: null,
      selectedNumber: 24,
      show_not_found: false,
      products: [],
      direction: "asc",
      length: 12,
      pageCount: 1,
      md: "",
      selectedPage: 1,
      type: {
        type: String,
        default: "grid",
      },
      orderBy: "created_at",
      ordering: "type",
    };
  },
  watch: {
    $route: function () {
      this.type = this.$route.query.list_view ? "list" : "grid";
      this.fetchProducts();
    },
    async getCurrency() {
      await this.fetchProducts()
    },
  },
  created: function () {
    // setTimeout(() => {
    //   this.show_not_found = true;
    // }, 3000);
    // if (this.$route.query.hasOwnProperty("page")) {
    //   this.selectedPage = this.$route.query.page;
    // }
    // this.type = this.$route.query.list_view ? "list" : "grid";
    // this.getProduct(this.slug);
  },
  computed: {
    ...mapGetters("header",["getCurrency"]),
    isSelected() {
      if (this.showStyle === "grid") {
        return true;
      } else if (this.showStyle === "list") {
        return false;
      }
    },
  },
  methods: {
    async fetchProducts(){
      let tempQuery = "";
      let displayType = "normal";
      if (this.$route.query.hasOwnProperty("categories") || this.category) {
        displayType = "normal";
      }
      if (this.slugtype == "category") {
        tempQuery += `categories=${this.slug}`;
      } else if (this.slugtype == "manufacturer") {
        tempQuery += `manufacturers=${this.slug}`;
      } else if (this.slugtype == "brand") {
        tempQuery += `brands=${this.slug}`;
      }
      for (const property in this.$route.query) {
        tempQuery += `&${property}${
          this.$route.query[property] ? `=${this.$route.query[property]}` : ""
        }`;
      }
      switch (this.ordering) {
        case "type":
          this.orderBy = "type";
          this.direction = "desc";
          break;
        case "title_a_to_z":
          this.orderBy = "title";
          this.direction = "asc";
          break;
        case "title_z_to_a":
          this.orderBy = "title";
          this.direction = "desc";
          break;
        case "price_low_high":
          this.orderBy = "price";
          this.direction = "asc";
          break;
        case "price_high_low":
          this.orderBy = "price";
          this.direction = "desc";
          break;
        case "oldest":
          this.orderBy = "created_at";
          this.direction = "asc";
          break;
        case "newest":
          this.orderBy = "created_at";
          this.direction = "desc";
          break;
        case "priority":
          this.orderBy = "created_at";
          this.direction = "desc";
          break;
      }
      let query = `?${tempQuery}&disply_type=${displayType}&direction=${this.direction}&order-by=${this.orderBy}&length=${this.selectedNumber}`;
      const { data } = await axios.get(`search/product${query}`,{
        baseURL: process.env.API_BASE_URL,
        headers:{
          'Accept-Language': this.$i18n.locale,
          'Content-Type': 'application/json',
          'currency': this.$cookies.get('currency') || 'USD',
          'Accept': 'application/json',
          'secret-key': process.env.SECRET_KEY,
          'api-key': process.env.API_KEY,
        }
      });
      this.products = data.products;
      if(this.products.length === 0 ){
        this.show_not_found = true
      }
      if (data.products[0]["category"]) {
        this.viewType = "categories";
      } else {
        this.viewType = "product";
      }

      this.pageCount = data.total_pages;

    },
    clickedFilter(){
      this.$emit('filters',true)
    },
    selectShowStyle(style) {
      this.showStyle = style;
    },
    handleChange() {
      this.fetchProducts();
      this.$router.push({ path: this.$route.path, query: {
            ...this.$route.query,
            page: 1,
          }, });
    },
    changeOrder() {
      this.fetchProducts();
    },
    changeDirection() {
      this.fetchProducts();
    },
    changePage(page) {
      this.selectedPage = page;
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.selectedPage,
        },
      });
      // this.getProduct(this.slug);
      scrollTopHandler();
    },
    showMore(category) {
      let query = {
        categories: category,
        page: 1,
        search: this.$route.query.search,
      };
      this.$router.push({ path: "shop", query: { ...query } });
    },

  },
};
</script>

<style scoped>
.product-default {
}
.filters{
  font-size: 16px;
}

@media screen and (max-width: 400px){
  .filters{
    width: 100%;
    margin-bottom: 15px;
    margin-top: 15px;
  }
}
@media screen and (max-width: 350px){
  .col-6{
    flex: 0 0 100%;
    max-width: 100%;
  }
}
@media screen and (max-width: 767px){
  .icon-mode-list{
    display: none;
  }
}
</style>
