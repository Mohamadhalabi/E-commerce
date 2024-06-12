<template>
  <div class="from-demo-26">
    <div class="bg-light-gray">
      <div class="container p-lg-3 text-center">
        <PvTopHeader />
      </div>
    </div>
    <header class="header">
      <div class="header-middle sticky-header mobile-sticky">
        <div class="container justify-content-center">
          <div class="row justify-content-center w-100 py-2 main-menu">
            <!--Begin: Left Side -->

            <div>
              <button
                class="mobile-menu-toggler"
                type="button"
                @click="showMobileMenu"
              >
                <i class="fas fa-bars">
                  <div v-for="number in numbers" :key="number"></div>
                </i>
              </button>
            </div>
            <div
              class="d-flex align-items-center flex-md-row flex-lg-grow-1 ">
              <nuxt-link :to="getLink('/')">
                <nuxt-img
                  v-if="!isMobile"
                  format="webp"
                  sizes="xs:100px sm:200px md:400px lg:500px xl:800px"
                  class="logo-image" title="Techno lock logo" src="/images/logos/techno-lock-desktop-logo.webp" alt="tlk Logo" />
                <nuxt-img
                  v-else
                  format="webp"
                  class="mobile-logo"
                  sizes="xs:300px sm:300px md:300px lg:500px xl:800px"
                  title="Techno lock logo" src="/images/logos/techno-lock-logo-mobile.webp" alt="tlk Logo" />
              </nuxt-link>
              <pv-header-search
                @SearchInputClicked="SearchInputClicked"
                class="d-sm-block" />
              <div class="small-devices-only d-flex">
                <div class="mb-auto mt-auto">
                  <a
                    class="header-icon position-relative mx-2 cursor-pointer"
                    title="search"
                    @click="openModal"
                  >
                    <i class="fa fa-search mt-auto"></i>
                  </a>
                </div>
                <b-modal v-model="modalOpen" class="modal-title" title="Find Your Product" centered hide-footer>
                  <div class="d-flex flex-column">
                    <div class="mb-2">
                      <label for="search-input" class="mr-2">Search:</label>
                      <input id="search-input" type="text" v-model="searchQuery" class="form-control w-100">
                    </div>
                    <div class="d-flex justify-content-start">
                      <button @click="search" class="search-button btn btn-primary ml-auto mr-auto">Search</button>
                    </div>
                  </div>
                </b-modal>
              </div>
            </div>
            <!-- End: Left Side -->

            <!--Begin: Right Side-->
            <div class="d-flex align-items-center">
              <div
                class="contact-widget d-none d-lg-flex flex-column"
                :class="getIsAr ? 'text-right' : ''">
                <p class="off-animatin mb-0 call-us-now text-center font-weight-bold">
                  {{ $t("auth.callNow") }}
                </p>
                <span class=" contact-phone ls-n-10 mb-0">
                  <a class="price-color font-weight-bold text-decoration-none"
                     :href="`tel:${$settings.contact.phone_primary}`">
                    {{ $settings.contact.phone_primary }}
                  </a>
                </span>
              </div>
              <no-ssr>
                <PvLoggedIn />
              </no-ssr>
              <no-ssr>
                <PvAuth />
              </no-ssr>


              <div class="d-flex">
                <a
                  class="header-icon position-relative mx-2 cursor-pointer mt-auto mb-auto"
                  title="wishlist"
                >
                  <i class="fa fa-heart" @click="goToWishlist" />
                  <span class="cart-count badge-circle">{{getWishlistCounts}}</span>
                </a>

                <a
                  class="header-icon position-relative ComparesBtn mx-2 cursor-pointer mt-auto mb-auto"
                  title="Compares">
                  <i class="fa fa-shuffle" @click="goToCompares" />
                  <span class="cart-count badge-circle">{{ getCounts }}</span>
                </a>

                <a class="mx-2 cursor-pointer mt-auto mb-auto">
                  <pv-cart-menu />
                </a>
              </div>
            </div>
            <!-- End : Right Side -->
          </div>
        </div>
      </div>
      <div
        class="header-bottom sticky-header d-none d-lg-flex desktop-sticky box-shadow-none first-menu">
        <div class="container">
          <pv-main-menu />
        </div>
      </div>
      <div
        class="d-none header-bottom sticky-header desktop-sticky2 box-shadow-none second-menu"
        style="z-index: 999"
        ref="headerBottom">
        <div class="container">
          <div class="row text-center w-100">
            <div class="col-lg-9 mt-auto mb-auto text-left">
              <nuxt-link
                class="price-color font-weight-bold"
                :to="getLink('/shop?offers')">
                <i class="fa fa-percent">
                </i>
                <span class="ml-1 mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.Offer") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/shop?free-shipping')">
                <i class="fas fa-shipping-fast"></i>
                <span class="ml-1 mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.FreeShipping") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/shop?bundled')">
                <i class="fa fa-boxes"></i>
                <span class="ml-1  mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.Bundles") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/online-services')">
                <i class="fa fa-wrench"></i>
                <span class="header-icons online-services ml-1  mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.OnlineServices") }}
                </span>
              </nuxt-link>
              <nuxt-link :to="getLink('/unlock-remote-services')">
                <i class="fa fa-lock"></i>
                <span class="header-icons online-services ml-1 mr-lg-2"
                      :class="getIsAr ? 'ml-xl-5' : 'mr-xl-5'">
                  {{ $t("header.unlockService") }}
                </span>
              </nuxt-link>
            </div>
            <div class="col-lg-3 d-flex">
              <i class="fa fa-search m-auto search-icon" @click="openModal">
              </i>
              <div class="header-dropdown m-auto">
                <a class="header-icons" href="javascript:;">{{ currency }}</a>
                <div class="header-menu text-center">
                  <ul>
                    <li
                      v-for="currency in availableCurrencies"
                      :key="currency"
                      @click="setCurrency(currency)">
                      <a href="javascript:;">{{ currency }}</a>
                    </li>
                  </ul>
                </div>
              </div>

              <a
                class="header-icon position-relative m-auto mt-1 ml-lg-3 cursor-pointer"
                title="wishlist"
              >
                <i class="fa fa-heart" @click="goToWishlist" />
                <span class="cart-count badge-circle">{{
                    getWishlistCounts
                  }}</span>
              </a>
              <a
                class="header-icon position-relative ComparesBtn m-auto mt-1 ml-lg-3 cursor-pointer"
                title="Compares">
                <i class="fa fa-shuffle" @click="goToCompares" />
                <span class="cart-count badge-circle">{{ getCounts }}</span>
              </a>
              <a class="m-auto mt-1 ml-lg-3 cursor-pointer">
                <pv-cart-menu />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="d-lg-flex d-none header-bottom sticky-header desktop-sticky3 box-shadow-none second-menu">
        <div class="container">
          <div class="row text-center w-100">
            <div class="row text-center w-100">
              <div class="col-lg-2 m-auto">
                <nuxt-link :to="getLink('/shop?offers')"
                           class="price-color font-weight-bold"
                >
                  <i class="fa fa-percent">
                  </i>
                  <span class="ml-1">
                  {{ $t("header.Offer") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto">
                <nuxt-link :to="getLink('/shop?free-shipping')">
                  <i class="fas fa-shipping-fast"></i>
                  <span class="ml-1">
                  {{ $t("header.FreeShipping") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto">
                <nuxt-link :to="getLink('/shop?bundled')">
                  <i class="fa fa-boxes"></i>
                  <span class="ml-1">
                  {{ $t("header.Bundles") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto services">
                <nuxt-link :to="getLink('/online-services')" class="m-auto">
                  <i class="fa fa-wrench"></i>
                  <span class="header-icons online-services ml-1">
                  {{ $t("header.OnlineServices") }}
                </span>
                </nuxt-link>
              </div>
              <div class="col-lg-2 m-auto services">
                <nuxt-link :to="getLink('/unlock-remote-services')">
                  <i class="fa fa-lock"></i>
                  <span class="header-icons online-services ml-1">
                   {{ $t("header.unlockService") }}
                </span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import PvMainMenu from "~/components/common/header/PvMainMenu";
import PvCartMenu from "~/components/common/header/PvCartMenu";
import PvHeaderSearch from "~/components/common/header/PvHeaderSearch";
import PvSocialIcons from "~/components/common/PvSocialIcons";
import { mapActions, mapGetters, mapMutations } from "vuex";
import api from "~/api";
import img from "~/static/images/blank.png";
import Api from "~/api";
import PvAuth from "~/components/common/header/PvAuth.vue";
import PvLoggedIn from "~/components/common/header/PvLoggedIn.vue";
import PvTopHeader from "~/components/common/header/PvTopHeader.vue";
export default {
  components: {
    PvTopHeader,
    PvLoggedIn,
    PvAuth,
    PvMainMenu,
    PvCartMenu,
    PvHeaderSearch,
  },
  data() {
    return {
      isMobile: false,
      isScrolling: false,
      searchQuery:"",
      modalOpen: false,
      showModal: false,
      inputValue: "",
      numbers: [1, 2, 3],
      isSearchVisible: false,
      searchKey:'',
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("fav", ["getWishlistCounts"]),
    ...mapGetters("compare", ["getCounts"]),
    ...mapGetters("currency", ["currency"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
    ...mapGetters("language", ["getLang"]),

    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },

    availableLocales() {
      return Object.entries(this.$settings.languages);
    },

    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
  },
  methods: {
    ...mapMutations("currency", ["setCurrencyValue"]),
    ...mapMutations("rtlStore", ["setLan"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),
    ...mapActions("auth", ["LogOut"]),
    ...mapActions("language",["updateLanguageCode"]),
    ...mapMutations("header", ["changeCurrency"]),

    SearchInputClicked(val){
      this.$emit('isClicked',val)
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    openModal() {
      this.modalOpen = true;
    },

    search(){
      window.location.href = "shop?page=1&search=" + this.searchQuery;
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 992;
    },
    checkScroll() {
      this.isScrolling = window.scrollY > 300;
    },

    closeModal(){
      this.showModal = false;
    },

    searchProduct() {
      if (this.searchKey =='') {
        this.productsBySearch = [];
      } else {
        let query = `?search=${this.searchKey}`;
        if (this.selectedCategory != null) {
          query = `?search=${this.searchKey}&categories=${this.selectedCategory}`;
        }
        Api.get(`shop${query}`)
          .then((response) => {
            this.productsBySearch = response.data.products;
            this.totalProduct = response.data.total;
          })
          .catch((error) => ({ error: JSON.stringify(error) }));
      }
    },
    goToShop() {
      if (!this.searchKey && !this.selectedCategory) return;
      let query = "";
      if (this.searchKey && this.selectedCategory == null) {
        query = `?page=1&search=${this.searchKey}&`;
      } else {
        query = `?categories=${this.selectedCategory}&page=1&search=${this.searchKey}&`;
      }
      this.$router.push({ path: "shop", query: { filter: query } });
    },

    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },

    myOrders() {
      this.$router.push({ path: "/account", query: { tab: "orders" } });
    },

    goToWishlist() {
      this.$router.push("/wishlist");
    },

    goToCompares() {
      this.$router.push("/compares");
    },

    showMobileMenu: function () {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("mySidenav3").style.width = "0";
      document.getElementById("mySidenav4").style.width = "0";
      document.getElementById("mySidenav5").style.width = "0";
      document.getElementById("mySidenav6").style.width = "0";
      document.querySelector("body").classList.add("mmenu-active");
    },


    setLocale(locale) {
      api.defaults.headers["Accept-Language"] = locale;
      this.$i18n.setLocale(locale);
      this.$i18n.locale = locale;
      this.$cookies.set('locale',locale,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.updateLanguageCode(locale)
    },

    setCurrency(currency) {
      api.defaults.headers["currency"] = currency;
      this.$cookies.set('currency',currency,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.setCurrencyValue(currency)
      this.$nuxt.refresh();
    },


    defalutAvatar(e) {
      e.target.src = img;
    },

    toggleSearchInput() {
      this.showSearchInput = !this.showSearchInput;
    },
    handleScroll() {
      if (window.scrollY >= 350) {
        this.$refs.headerBottom.classList.add('d-lg-flex');
      } else {
        this.$refs.headerBottom.classList.remove('d-lg-flex');
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.checkScroll);
    window.removeEventListener('resize', this.checkMobile);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  mounted() {
    if(process.client) {
      let currency = localStorage.getItem("currency")
      if (currency != null) {
        this.changeCurrency(currency);
        api.defaults.headers["currency"] = currency;
        this.setCurrencyValue(currency);
      }
    }
    this.checkMobile();
    window.addEventListener('scroll', this.checkScroll, {passive:true});
    window.addEventListener('resize', this.checkMobile);
    window.addEventListener('scroll', this.handleScroll, {passive:true});
  },
};
</script>

<style scoped>
@media (max-width: 991px) {
  .currency-language {
    justify-content: center;
  }
}
@media screen and (min-width: 992px)
{
  .contact-icons{
    display: none!important;
  }
}

.header-top{
  background-color: #f6f6f6;
}
.header-icons{
  font-size: 14px!important;
}
.online-services{
  font-size: 14px!important;
  color: #892118!important;
  font-weight: 900;
}

@media screen and (min-width: 992px) {
  .small-devices-only{
    display: none!important;
  }
}
@media screen and (max-width: 993px){
  .contact-icons{
    justify-content: end;
    font-size: 16px;
  }
}
@media screen and (max-width: 767px){
  .contact-icons{
    justify-content: center;
  }
}


@media screen and (max-width: 1200px) {
  .services {
    display: contents!important;
  }
}
.search-icon:hover{
  cursor: pointer;
}

@media screen and (min-width:1200px) {
  .main-menu {
    display: contents;
  }
}
.login-register{
  font-size: 13px;
}
@media screen and (min-width: 993px){
  .logo-image{
    width: 350px
  }
}
@media screen and (max-width: 992px){
  .mobile-logo{
    max-width: 350px;
  }
}
@media screen and (max-width: 400px){
  .mobile-logo{
    max-width: 200px;
  }
}
</style>
