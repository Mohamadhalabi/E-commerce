<template>
  <div :dir="$dir()" :class="$i18n.locale === 'ar' ? 'ltrClass' : ''" @click="hideMobileSearch">
    <noscript v-html="iFrameCode" />
    <pv-header @isClicked="isClicked" />
    <nuxt keep-alive />
    <pv-footer/>
    <pv-app-popup class="minipopup-area minipopup-top-area" />
    <pv-product-popup class="minipopup-area" />
    <pv-error-message class="minipopup-area" />
    <pv-compare-popup class="minipopup-area" />
    <pv-wishlist-popup class="minipopup-area" />

    <a id="scroll-top" href="javascript:;" title="Top" role="button" @click="scrollToTop">
      <i class="icon-angle-up" />
    </a>
    <pv-mobile-menu />
  </div>
</template>

<script>
import api from "~/api";
import "static/css/ltrStyle.css";
import PvFooter from "~/components/common/PvFooter.vue";
import {
  resizeHandler,
  scrollTop,
  showScrollTopHandler,
  stickyHeaderHandler
} from "~/utils";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Api from "~/api";
export default {
  components: {
    PvHeader:() =>import("~/components/common/header/PvHeader.vue"),
    PvFooter,
    PvAppPopup:() => import("~/components/popups/PvAppPopup"),
    PvProductPopup:() => import("~/components/popups/PvProductPopup"),
    PvMobileMenu:() => import("~/components/common/header/PvMobileMenu"),
    PvErrorMessage:() => import("~/components/popups/PvErrorMessage.vue"),
    PvComparePopup:() =>import("~/components/popups/PvComparePopup.vue"),
    PvWishlistPopup:() => import("~/components/popups/PvWishlistPopup.vue"),
  },
  watch: {
    $route: function() {
      resizeHandler();
      // this.$modal.hideAll();
      document.getElementById("search_term").value = "";
    },
  },
  data() {
    return {
      isSearchInputClicked: false,
      ScrollToFooter: false,
      currencyValue:"",
      iFrameCode: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PWSSMVC7" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
    };
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
  },
  mounted: function() {
    this.updateLanguageCode(this.$i18n.locale)
    api.defaults.headers["Accept-Language"] = this.$i18n.locale;
    if (this.isAuthenticated) {
      this.getCartList();
      this.fetchList();
      this.fetchWishlist();
    }
    window.addEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.addEventListener("scroll", showScrollTopHandler, { passive: true });
    window.addEventListener("resize", stickyHeaderHandler);
    window.addEventListener("resize", resizeHandler);
  },

  unmounted: function() {
    window.removeEventListener("scroll", showScrollTopHandler, { passive: true });
    window.removeEventListener("scroll", stickyHeaderHandler, { passive: true });
    window.removeEventListener("resize", stickyHeaderHandler);
    window.removeEventListener("resize", resizeHandler);
  },

  methods: {
    ...mapActions("shop", ["getCartList"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),
    ...mapActions("language",["updateLanguageCode"]),
    ...mapMutations("auth", ["LOGOUT"]),

    isClicked(val){
      this.isSearchInputClicked = val
    },
    scrollToTop: function() {
      scrollTop(false);
    },
    hideMobileSearch: function() {
      if (document.querySelector(".header-search.header-search-inline")) {
        let headerSearch = document.querySelector(".header-search.header-search-inline");
        headerSearch.classList.remove("show");
        headerSearch.querySelector(".header-search-wrapper").classList.remove("show");

      }
      if (document.querySelector(".search-suggests")) {
        if (this.isSearchInputClicked == true) {
          document.querySelector(".search-suggests").setAttribute("style", "display: block");
        }
        if(this.isSearchInputClicked == false)
        {
          document.querySelector(".search-suggests").setAttribute("style", "display: none");
        }
      }
    },
  },
};
</script>
<style>
@media screen and (max-width: 767px) {
  .mobile-only {
    display: block;
  }

  .desktop-only {
    display: none;
  }
}
@media screen and (min-width: 768px) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: contents;
  }
}

body{
  width:100%;
  overflow-x:hidden;
  overflow-y:hidden;
}
@media screen and (max-width: 992px){
  .top-notice{
    display: none!important;
  }
}
</style>
