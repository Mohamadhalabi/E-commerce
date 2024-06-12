<template>
  <div>
    <div class="col-lg-12">
      <h1 class="home-page-h1 font-weight-bold m-0">{{ $t("home.keyandremote") }}</h1>
    </div>
    <div class="box-shadow-none third-menu">
      <div class="row d-flex home-page-search mb-3 mb-lg-0 justify-content-center">
        <div class="col-xl-5 col-lg-6 col-12 mt-lg-0 mt-2 col-md-12 d-lg-flex justify-content-xl-end align-center text-center" style="align-items: center;">
          <span class="search-by-fcc mr-2">
            {{ $t("home.SearchFCCID") }} {{ $t("home.orSearchPartNumber")}}
          </span>
          <div>
            <div class="searchProductStyle p-3">
              <form class="nosubmit2"
                    @submit.prevent="onEnter(searchKey)"
              >
                <input
                  v-model="searchKey"
                  type="search"
                  class="w-100 fcc-part-search-input search-by-car"
                  :placeholder="$t('common.search')"
                  @input="searchProduct"
                  :style=" getIsAr
                            ? 'background-position: 96% ;'
                            : 'background-position: 5px ;'
                        "
                />
              </form>
              <b-list-group
                v-if="productsBySearch.length > 0"
                class="home-page-search-items"
              >
                <b-list-group-item
                  v-for="(product, index) in availableItems"
                  :key="index"
                  class="pruductSearch p-1 pt-2"
                  @click="$router.push(`products/${product['slug']}`)">
                  <nuxt-img
                    format="webp"
                    loading="lazy"
                    :src="product['gallery'][0]['s']['url']"
                    :alt="product['short_title']"
                    width="50"
                    class="d-inline-block mx-1"
                  />
                  <div>
                    <span style="color: #535250;font-size: 14px;">{{ product["short_title"] }}</span>
                    <div class="sku-color" style="margin-bottom: 5px;">Sku:{{ product.sku }}</div>

                    <pv-price-box
                      class="m-0"
                      :homePageSearch="true"
                      v-if="product.hide_price == 0"
                      :product="product"
                    />

                    <div
                      v-else
                      style="text-align: start; display: flex">
                      <i
                        class="fab fa-sm fa-whatsapp mx-1"
                        style="
                                    font-size: 20px;
                                    color: #4fce5d;
                                    cursor: pointer;
                                  "
                        @click="goToWhatsApp"
                      />
                      <small
                        class="d-inline-block px-2"
                        @click="goToWhatsApp(product)"
                        style="
                                    width: 100%;
                                    position: relative;
                                    color: #4fce5d;
                                    cursor: pointer;
                                  ">
                        {{ $t("product.ContactUsToSendYouThePrice") }}
                      </small>
                    </div>
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  v-if="getProductsBySearchArrayLength > 5"
                  class="text-center border">
                  <nuxt-link class="notHover" to="/shop">
                    <base-button-icon-1
                      class="w-100 py-3"
                      :outline="true"
                    >
                      see ({{ getProductsBySearchArrayLength - 5 }})
                      product more..
                    </base-button-icon-1>
                  </nuxt-link>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
        <div class="col-xl-7 col-lg-12 m-auto pl-5 pr-5 mb-2">
          <div class="" action="#" method="get">
            <div class="row d-lg-flex justify-content-center d-block home-page-search">
              <div class="mt-auto mb-auto text-center">
                <span class="search-by-fcc mt-2 mt-lg-0 mr-2">
                  {{ $t('home.searchByCar') }}
                </span>
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0 mt-1 mt-lg-0 search-by-car">
                <AutoComplate
                  v-model="brand"
                  :placeholder="$t('home.selectBrand')"
                  :options="brands"
                  class="search-by-car-input"
                  :item-text="'brand'"
                  @setValue="$event ? (brand = $event.slug) : (brand = null),getModelsByBrand()"/>
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0 search-by-car">
                <AutoComplate
                  v-model="model"
                  :placeholder="$t('home.selectModel')"
                  :options="models"
                  class="search-by-car-input"
                  :item-text="'name'"
                  @setValue="$event ? (model = $event.slug) : (model = null),getYears()"/>
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0 search-by-car">
                <AutoComplate
                  v-model="year"
                  :placeholder="$t('home.selectYear')"
                  :options="years"
                  class="search-by-car-input"
                  :item-text="'name'"
                  @setValue="$event ? (year = $event.slug) : (year = null), goToShop()"
                />
              </div>
              <div class="ml-lg-2 mb-1 mb-lg-0 search-by-car">
                <base-button-icon-1
                  @click="goToShop"
                  :icon="true"
                  :innerText="$t('home.Search')"
                  class="py-3 w-100">
                  <i class="icon sicon-magnifier"></i>
                </base-button-icon-1>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "~/api";
import {mapGetters} from "vuex";
import PvPriceBox from "~/components/product/partials/PvPriceBox.vue";
import AutoComplate from "~/components/common/AutoComplate.vue";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
export default {
  name: "HomePageSearch",
  components: {
    PvPriceBox,
    AutoComplate,
    BaseButtonIcon1
  },
  data: function () {
    return {
      availableItems: [],
      getProductsBySearchArrayLength: 5,
      slides: [],
      brands: [],
      models: [],
      years: [],
      brand: null,
      model: null,
      year: null,
      searchKey: null,
      productsBySearch: [],
      timer: null,
    };
  },
  computed: {
    ...mapGetters('rtlStore', ['getIsAr']),
    ...mapGetters("language", ["getLang"]),
  },
  mounted: function () {
    this.getSlides();
    this.getBrands();
  },
  methods: {
    onEnter(searchKey){
      if(this.getLang =="en"){
        this.$router.push('shop?search='+searchKey)
      }
      else{
        this.$router.push(this.getLang+'/shop?search='+searchKey)
      }
    },
    getSlides: function () {
      Api.get("sliders")
        .then((response) => {
          this.slides = response.data.result;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    goToShop: function () {
      let url = "/";
      if (this.brand != null) {
        url+="car-remote-and-transponder-key"
        url += "?brands=" + this.brand ;
        if (this.model != null) {
          url += "&models=" + this.model ;
        }
        if (this.year != null) {
          url += "&years=" + this.year ;
        }
        if (this.searchKey != null) {
          url += "&search_attributes=" + this.searchKey;
        }
        this.$router.push(url);
      } else {
        if (this.searchKey)
          this.$router
              .push(`/shop?search_attributes=` + this.searchKey)
            .then(() => {
              // this.$Progress.finish();
            });
      }
    },
    getBrands() {
      Api.get("brands/get-brands")
        .then((response) => {
          this.brands = response.data.brands;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },

    getModelsByBrand() {
      if (!this.brand) {
        this.models = [];
      } else {
        Api.post("brands/get-models", { slug: this.brand })
          .then((response) => {
            this.models = response.data.models;
            this.years = [];
            this.model = null;
            this.year = null;
          })
          .catch((error) => ({ error: JSON.stringify(error) }));
      }
    },
    getYears() {
      Api.post("brands/get-years", { slug: this.model })
        .then((response) => {
          this.years = response.data.years;
          this.year = null;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },

    searchProduct() {
      if (!this.searchKey || this.searchKey == "") {
        this.productsBySearch = [];
        this.getProductsBySearchArrayLength = 0;
      } else {
        if (this.timer) {
          clearTimeout(this.timer); // delay time befor searching
          this.timer = null; // delay time befor searching
          // this.$Progress.finish();
        }

        if (this.searchKey.length >= 3) {
          this.timer = setTimeout(() => {
            if (!this.searchKey || this.searchKey == " ") {
              this.productsBySearch = [];
              return;
            }
            // this.$Progress.start();
            Api.get(`/shop?search_attributes=${this.searchKey}`)
              .then((response) => {
                this.productsBySearch = response.data.products;
                this.getProductsBySearchArrayLength = response.data.total;
                this.availableItems = this.productsBySearch.slice(0, 5);
                // this.$Progress.finish();
              })
              .catch((error) => ({error: JSON.stringify(error)}));
          }, 500);

          // this.$Progress.finish();
        }
      }
    },
  },
}
</script>
<style>
@media screen and (max-width: 767px){
  .fcc-part-search-input{
    height: 35px;
  }
  .search-by-car{
    padding:3px;
  }
}
</style>
