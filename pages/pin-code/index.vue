<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/">
            {{ $t("products.home") }}
          </nuxt-link>
        </li>
        <li class="breadcrumb-item">
          {{ $t("pincode.pincode") }}
        </li>
      </ol>
    </nav>
      <div class="container mt-3">
        <div class="brandsConatiner">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-12">
              <h3 class="cart-total-price text-center">
                {{ $t("pincode.pincodeoffline") }}
              </h3>
              <div class="row justify-content-md-center justify-content-lg-start justify-content-sm-center justify-content-center">
                <div
                  v-for="(brand,index) in offline_pin_code"
                  :key="index"
                  class="brandClass col-xl-3 col-lg-3 mx-3 col-md-2 mx-xl-4 col-sm-3 mb-2 col-3"
                >
                  <nuxt-link
                  :to="'products/'+ brand.slug"
                  >
                  <nuxt-img
                    :src="brand.image.l.url"
                    class="img-thumbnail mx-auto mt-1"
                    :open_graph="brand.image.l['open_graph']"
                    :scal="brand.image.l['scal']"
                    :description="brand.image.l['description']"
                  />
                  <h6 class="text-center my-1 sku-color">
                    {{brand.sku}}
                  </h6>
                    <h6 class="text-center my-1 pin-code-offline-short-title">
                      {{brand.short_title}}
                    </h6>
                  <b class="text-center d-block price-color pin-code-offline-price">
                    {{brand.price.value}} {{brand.price.currency}}
                  </b>
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-xl-8 col-lg-8 col-md-12 mb-5 mt-md-5 mt-lg-0">
              <h3 class="text-center cart-total-price mx-1">
                {{ $t("pincode.pincodeonline") }}
              </h3>
              <iframe height="90%" width="100%" src="https://vin.prokeytools.com/login" style="border: none;">
              </iframe>
              <h4 class="to-get-pin-code text-center">
                {{ $t("pincode.togetpincode") }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    <div class="container mt-5 pin-code">
      <div class="row">
        <div
          v-for="item in products"
          :key="item.sku"
          class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 mt-lg-0"
        >
          <pv-product :product="item" />
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Api from '~/api';
import { mapGetters } from 'vuex';
import PvProduct from "~/components/product/card/PvProduct.vue";
import axios from "axios";
export default {
  components: {
    PvProduct,
  },
  async asyncData({ app }) {
    const response = await axios.get(`pin-code/offline-pincode`,{
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
    return {
      offline_pin_code : response.data.data
    };
  },
  async fetch(){
    this.viewType = null;
    let tempQuery = "";
    let displayType = "categories";
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

    let query = `?categories=pin-code&disply_type=categories&direction=desc&order-by=created_at&length=12`;

    await Api.get(`search/product${query}`).then((response) => {
      if (response.data.products.length > 0) {

        if (response.data.products[0]["category"]) {
          this.viewType = "categories";
        } else {
          this.viewType = "product";
        }
      }
      this.products = response.data.products;

      if (this.md != response.data.md5 && this.md != "") {
        this.selectedPage = 1;

        this.md = response.data.md5;
      }
      if (this.md == "") {
        this.md = response.data.md5;
      }
      this.pageCount = response.data.total_pages;
    });
  },
  data() {
    return {
      products: [],
      offline_pin_code : [],
    };
  },
  computed: {
    ...mapGetters('rtlStore',['getIsAr'])
  },
  mounted() {
    if(process.client) {
      let fullDomain = window.location.href;
      let expectedUrl = `https://www.tlkeys.com/${this.$i18n.locale}/pin-code`;
      if(this.$i18n.locale =='en'){
        expectedUrl = `https://www.tlkeys.com/pin-code`;
      }
      if (fullDomain !== expectedUrl) {
        window.location.href = expectedUrl;
      }
    }
  },
};
</script>
<style>
.brandClass{
  background: #fff;
  border-radius: 7px;
  box-shadow: 0px 0px 7px 0px #a8a8a8;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  min-height: 200px;
}
@media screen and (max-width: 993px){
  .brandClass{
    min-height: 250px;
  }
}
@media screen and (max-width: 550px){
  .brandClass{
    min-height: 200px!important;
  }
}
.brandClass:hover{
  transform: scale(1.05);
}
.brandClass:last-child{
  display: flex;
  justify-content: left;
}
@media screen and (max-width: 400px){
  .pin-code{
    margin-top: 100px!important;
  }
}
.pin-code-offline-price{
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
}
.pin-code-offline-short-title{
  position: absolute;
  right: 0;
  left: 0;
}
</style>
