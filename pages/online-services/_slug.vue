<template>
  <main class="main"
        :class="{'text-right': getIsAr }"
  >
    <div>
      <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("products.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            <nuxt-link to="/online-services">
              {{ $t("online.onlineServices") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">
            {{ short_title[$i18n.locale] }}
          </li>
        </ol>
      </nav>
      <div class="product-single-container container product-single-default">
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-6 col-12">
            <nuxt-img :src="image['l']['url']" class="rounded-5" style="border: 1px solid #e7e7e6!important;"
            />

<!--              <ImageMagnifier :image="image" size="l" />-->
          </div>
          <div class="col-xl-7 col-lg-6 col-md-6 col-sm-12 col-12">
            <h1 class="product-title">{{title[$i18n.locale]}}</h1>
            <div class="summary-name">
              <span> {{summary_name[$i18n.locale]}}</span>
            </div>
            <div class="review mt-lg-2">
              <pv-rating :product="product" />
            </div>
            <div class="price mt-3">
              <span class="product-price price-color" v-if="price > 0">
                ${{price}}
              </span>
              <div v-else>
                <i
                  class="fab fa-sm fa-whatsapp"
                  style="font-size: 20px; color: #556b2f; cursor: pointer"
                  @click="goToWhatsApp(product.short_title[$i18n.locale])"
                />
                <small class="contact-us" @click="goToWhatsApp(product.short_title[$i18n.locale])">{{
                    $t("products.ContactUsToSendYouThePrice")
                  }}</small>
              </div>
            </div>
            <div class="category mt-3">
              <ul class="single-info-list">
                <li>
                  {{ $t("products.category") }}:
                  <nuxt-link to="/online-services">
                    <strong><div class="" style="display: inline-block;">
                      {{ $t("online.onlineServices") }}
                    </div>
                    </strong>
                  </nuxt-link>
                </li>
              </ul>
            </div>
            <button
              class="py-1 mx-1 whatsapp-button mb-3"
              @click="goToWhatsApp(product.short_title[$i18n.locale])"
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
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h3 class="additional-product-items">{{ $t("products.Description") }}</h3>
            <span v-html="description[$i18n.locale]">
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "~/api";
import PvRating from "~/components/product/partials/PvRating.vue";
import {mapGetters} from "vuex";
import ImageMagnifier from "~/components/product/partials/ImageMagnifier.vue";
export default {
  name: "_slug",
  components: {PvRating,ImageMagnifier},

  async asyncData({ params }) {
    const response  = await Api.post(`search/online-service-product/${params.slug}`);

    return {
      product : response.data,
      title : response.data.title,
      summary_name : response.data.summary_name,
      short_title : response.data.short_title,
      price : response.data.price,
      description : response.data.description,
      image: response.data.image,
    }
  },


  data() {
    return {
      product: [],
      description: "",
      short_title: "",
      price: "",
      title:"",
      summary_name:"",
      image: "",
        prev_product: null,
      next_product: null,
    }
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods:{
    goToWhatsApp(product) {
      window.open(
        `https://api.whatsapp.com/send?phone=971544179287&text=I want to order the ${product} `,
        "_blank"
      );
    },
  }
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
.single-info-list{
  border-bottom: 1px solid #e7e7e6;
}

.contact-us{
  position: relative;
  color: rgb(43, 169, 104);
  cursor: pointer;
  font-size: 12px;
  height: 38px;
}

</style>
