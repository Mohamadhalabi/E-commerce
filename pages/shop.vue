<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/')">
              {{ $t("shop.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            <h1 class="breadcrumb-item d-flex m-0">{{ $t("shop.shop") }}</h1>
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-10">
            <pv-product-list
              @directionby="directionBy"
              @sortby="sortBy"
              @filters="displayFilters"
            />
        </div>
        <div class="sidebar-overlay" @click="hideSidebar" />
        <aside
          class="sidebar-shop col-lg-2 order-lg-first mobile-sidebar p-0"
          sticky-container
        >
          <div sticky-offset="{top: 75}">
            <sidebar-filter />
          </div>
        </aside>
      </div>
    </div>
    <b-modal
      v-model="openModal" hide-header hide-footer>
      <div
        class="sidebar-shop col-lg-2 order-lg-first p-4"
        sticky-container
      >
        <div sticky-offset="{top: 75}">
          <sidebar-filter />
        </div>
      </div>
    </b-modal>
  </main>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import Api from "~/api";
import {mapGetters} from "vuex";
import PvProductList from "~/components/shop/PvProductList.vue";

export default {
  directives: {
    // Sticky: () => import("vue-sticky-directive"),
  },
  components: {
    SidebarFilter: () => import("~/components/shop/SidebarFilter.vue"),
    PvProductList,
  },
  data: function () {
    return {
      openModal: false,
      animationDelay: `1ms`,
      sidebarList: [],
      featuredProducts: [],
      isSticky: false,
      viewType: null,
      sortby: null,
      directionby: null,
      queryFilter: {
        sintax: "?",
        page: 1,
      },
      dataShop: {
        products: [],
      },
      page: 1,
      length: 12,
      pageCount: 1,
      selectedPage: 1,
      searchKey: this.$route.query.searchKey,
    };
  },
  head() {
    return {
      title: "Shop | Techno Lock Keys Trading",
      link: [
        {
          rel: 'canonical',
          href: process.env.PUBLIC_PATH + "shop",
        },
      ],
      meta: [
        {
          name: "description",
          content: "With Techno lock keys, you can shop for all your locksmith supplies in one place and get the greatest rates and quality. Shop NOW!",
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
          content: "Shop | Techno Lock Keys Trading",
        },
        {
          name: "og:description",
          content: "With Techno lock keys, you can shop for all your locksmith supplies in one place and get the greatest rates and quality. Shop NOW!"
        },
        {
          name: "og:url",
          content: process.env.PUBLIC_PATH + this.$route.fullPath,
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
          content: 'Shop | Techno Lock Keys Trading',
        },
        {
          name: "twitter:description",
          content: "With Techno lock keys, you can shop for all your locksmith supplies in one place and get the greatest rates and quality. Shop NOW!"
        },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
      ],
      script: [
        {
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
    };
  },
  mounted: function () {
    this.resizeHandler();
    window.addEventListener(this.resizeHandler, {
      passive: true,
    });
  },
  unmounted: function () {
    window.removeEventListener("resize", this.resizeHandler);
  },
  computed:{
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    displayFilters(val){
      if(val){
        this.openModal = true
      }
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    resizeHandler: function () {
      this.isSticky = window.innerWidth > 991 ? true : false;
    },
    hideSidebar: function () {
      document.querySelector("body").classList.remove("sidebar-opened");
    },
    getProduct() {
      let query = "?";
      if (this.$route.query.hasOwnProperty("search")) {
        query += `search=${this.$route.query.search}&`;
      }

      this.viewType = null;

      if (!this.$route.query.hasOwnProperty("categories")) {
        query += "disply_type=categories";
      } else {
        query += "disply_type=normal";
      }

      Api.get(`search/product${query}`)
        .then((response) => {
          this.dataShop.products = response.data.products;
          this.pageCount = response.data.total_pages;

          if (response.data.products.length > 0) {
            if (response.data.products[0]["category"]) {
              this.viewType = "categories";
            } else {
              this.viewType = "product";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(page) {
      this.queryFilter.page = page;
      scrollTopHandler();
    },
    setPage(val) {
      this.queryFilter.page = val;
    },
    showMore(product) {
      let searchKey = "";

      if (this.$route.query.filter.includes("search")) {
        searchKey = this.$route.query.filter
          .substring(
            this.$route.query.filter.indexOf("search"),
            this.$route.query.filter.length
          )
          .substring(
            this.$route.query.filter
              .substring(
                this.$route.query.filter.indexOf("search"),
                this.$route.query.filter.length
              )
              .indexOf("=") + 1,
            this.$route.query.filter.substring(
              this.$route.query.filter.indexOf("search"),
              this.$route.query.filter.length
            ).length - 1
          );
      }
      let query = "";
      this.$router.push({ path: "shop", query: { filter: query } });
      this.viewType = "product";

      this.$nextTick(() => {
        this.getProduct(this.$route.query.filter);
      });

    },
    directionBy(data) {
      this.directionby = data;
      this.getProduct();
    },
    sortBy(data) {
      this.sortby = data;
      this.getProduct();
    },
  },
};
</script>
<style>
@media screen and (max-width: 993px){
  .mobile-sidebar{
    display: none;
  }
}
</style>
