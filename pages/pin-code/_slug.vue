<template>
  <main class="main">
    <div>
      <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/pin-code">
              {{ $t("pincode.pincode") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            {{brand}}
          </li>
        </ol>
      </nav>
      <div v-for="(breadcrumb, index) in breadcrumbs" :key="index"
           :class="{ 'text-right': getIsAr }"
           class="product-single-container container product-single-default">
        <div class="row">
          <div class="col-xl-3 col-lg-5 col-md-5 col-sm-7 col-11 m-auto">
            <img :src="image">
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  m-auto  ">
            <h1 class="product-title"> {{ brand }}</h1>
            <div class="review mt-lg-2">
<!--              <pv-rating :products="matchingBrand" />-->
            </div>
            <div class="price mt-1">
              <span class="product-price price-color">
                {{ currency }}{{ value }}
              </span>
            </div>
            <div class="category mt-2">
              <ul class="single-info-list">
                <li>
                  {{ $t("products.category") }}:
                  <nuxt-link to="/pin-code">
                    <strong><div class="" style="display: inline-block;">
                      {{ $t("pincode.pincode") }}
                    </div>
                    </strong>
                  </nuxt-link>
                </li>
                <li>
                  {{ $t("products.BRAND") }}:
                  <nuxt-link :to="'/'+brand">
                    <strong>
                      {{ brand }}
                    </strong>
                  </nuxt-link>
              </li>
              </ul>
            </div>
            <button
              class="py-1 mx-1 whatsapp-button mb-3"
              @click="goToWhatsApp(breadcrumb.label)"
            >
              {{ $t("pincode.orderUsingWhatsapp") }}
              <i
                style="font-size: larger"
                class="py-3 px-3 rounded-3 fab fa-whatsapp"
              ></i>
            </button>
          </div>
        </div>
      </div>

      <div class="container mt-lg-5 mt-3"
           :class="{ 'text-right': getIsAr }">
        <div class="brandsConatiner">
          <div class="row">
            <div class="col-lg-12">
              <h3 class="additional-product-items">
                {{ $t("products.Description") }}
              </h3>
              <div class="">
                <span class="" v-html="description"></span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="container"
           :class="{ 'text-right': getIsAr }">
        <div class="brandsConatiner">
          <div class="row">
            <div class="col-lg-12">
              <h3 class="additional-product-items">
                {{ $t("pincode.related") }}
              </h3>
              <div class="row justify-content-start">
<!--                <pv-carousel-->
<!--                  ref="carousel"-->
<!--                  class="products-slider dots-small mb-2 border-0"-->
<!--                  :options="baseSlider7"-->
<!--                >-->
                <div
                  v-for="(brand,index) in brands"
                  :key="index"
                  class=" col-xl-1 col-lg-2 col-md-2 col-3 sm-4 xs-6 brandClass mx-2 mb-2 mt-1 "
                >
                  <nuxt-link
                    :to="brand.slug"
                  >
                    <img
                      :src="brand.icon.s.url"
                      class="img-thumbnail mx-auto mt-1"

                      :open_graph="brand.icon.s['open_graph']"
                      :scal="brand.icon.s['scal']"
                      :description="brand.icon.s['description']"
                    >
                    <h6 class="text-center my-1">
                      {{brand.brand}}
                    </h6>
                    <b class="text-center d-block">
                      {{brand.pin_code_price.value + brand.pin_code_price.currency}}
                    </b>
                  </nuxt-link>
                </div>
<!--                </pv-carousel>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "~/api";
import {mapGetters} from "vuex";
export default {
  name: "_slug",
  components: {},
  data() {
    return {
      brands: [],
      matchingBrand: [],
      currency: null,
      value : null,
      brand : null,
      description: "",
      image: "",
    }
  },
  created() {
    this.getBrands()
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    breadcrumbs() {
      const currentURL = this.$route.path; // Get the current URL from the $route object
      const urlParts = currentURL.split('/'); // Split the URL by "/"
      const lastItem = urlParts[urlParts.length - 1]; // Get the last item in the array (after the last "/")

      // Create an array with breadcrumb objects
      // Here, we assume that the first breadcrumb points to the home page ("/") and the last breadcrumb will be the last item in the URL
      const breadcrumbArray = [
        { to: currentURL, label: lastItem }, // Set the current URL as the link and the last item in the URL as the label
      ];

      return breadcrumbArray;
    },
  },
  mounted() {
    // this.$Progress.start();
  },
  methods:{
    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=971504429045&text=I want to order the ${product} pin code`,
        "_blank"
      );
    },
    getBrands(){
      Api.get('pin-code/price')
        .then(response => {
          this.brands = response.data.brands;
          this.matchingBrand = this.brands.find(item => item.slug.toLowerCase() === this.$route.params.slug.toLowerCase());
          this.currency = this.matchingBrand.pin_code_price.currency;
          this.value = this.matchingBrand.pin_code_price.value;
          this.description = this.matchingBrand.pin_code_description;
          this.brand = this.matchingBrand.brand;
          this.brands = this.brands.filter(item => item.brand !== this.matchingBrand.brand);
          this.image = this.matchingBrand.pin_code_image
          // this.$Progress.finish();
        })
        .catch(error => ({ error: JSON.stringify(error) }));
    },
  },
}
</script>

<style scoped>
.whatsapp-button{
  background-color: #2ba968;
  border: 1px solid #2ba968;
  border-radius: 6px;
  transition: all 0.2s ease-in;
  font-size: 1em;
  font-weight: 500;
  color: #ffffff;
  transition: all 0.2s ease-out;
  box-shadow: 0px 1px 2px #2ba968;
  width: 35%;
}

@media screen and (max-width: 1200px){
  .whatsapp-button{
    width: 75%;
  }
}
@media screen and (max-width: 767px){
  .whatsapp-button{
    width: 50%;
  }
}

@media screen and (max-width: 400px){
  .whatsapp-button{
    width: 100%;
  }
}

.whatsapp-button:active {
  transform: translate(0px, 2px);
}

.pin-code-paragraph{
  font-size: 18px;
  line-height: 25px;
}
.pin-code-h1{
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid black;
  width: fit-content;
}
.pin-code-price{
  color: #f52020;
  font-size: 22px;
  font-weight: bold;
}
h1.product-title{
  font-size: 30px;
  font-weight: bold;
}
.product-price{
  font-size: 30px;
  font-weight: bold;
  color: #f52020;
}
.pin-code-description{
  font-size: 14px;
  text-transform: capitalize;
  line-height: 25px;
}
</style>
