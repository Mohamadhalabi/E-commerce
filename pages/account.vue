<template>
  <no-ssr>
    <main class="main">
      <div class="container account-container custom-account-container">
        <div
          class="row">
          <div
            class="sidebar widget widget-dashboard col-md-3 mb-5 col-12 order-0"
            sticky-container
          >
            <div v-sticky="isSticky" sticky-offset="{top: 136}">
              <div class="from-demo-26 mb-3">
                <div v-if="isAuthenticated" class="header-user">
                  <i :class="StateUser.avatar ? 'user-avatar' : 'sicon-user'">
                    <nuxt-img
                      format="webp"
                      v-if="StateUser.avatar"
                      :src="checkURL(StateUser.avatar)"
                      @error="defalutAvatar"
                      width="50"
                      height="50"
                      alt="Avatar"
                    />
                  </i>

                  <div
                    class="header-userinfo d-none d-lg-block mx-2"
                    :class="{ 'text-right': getIsAr }"
                  >
                  <span class="d-inline-block font2 line-height-1">
                    {{ $t("account.logged") }}
                  </span>
                    <h4 class="mb-0">
                      {{ StateUser.name }}
                      <sub><br />{{ StateUser.uuid }}</sub>
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <ul class="nav nav-tabs list flex-column mb-0" role="tablist">
                  <li
                    class="nav-item custom-nav-item w-100"
                    style="cursor: pointer"
                  >
                    <a
                      class="nav-link custom-nav-link w-100"
                      :class="
                      $route.query.tab == 'dashboard' || !$route.query.tab
                        ? 'active'
                        : ''
                    "
                      @click="changeTab('dashboard')"
                    >
                      <i class="sicon-grid d-inline-block" />
                      <span class="d-inline-block">{{
                      $t("dashboard.dashboard")
                    }}</span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="
                      $route.query.tab == 'account-details' ? 'active' : ''
                    "
                      @click="changeTab('account-details')"
                    >
                      <i class="sicon-user d-inline-block" />
                      <span class="d-inline-block">{{
                      $t("dashboard.accountDetails")
                    }}</span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="
                      $route.query.tab == 'change-password' ? 'active' : ''
                    "
                      @click="changeTab('change-password')"
                    >
                      <i class="sicon-lock d-inline-block" />
                      <span class="d-inline-block">
                      {{ $t("dashboard.editPassword") }}
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="
                      $route.query.tab == 'orders' ||
                      $route.query.tab == 'order-info'
                        ? 'active'
                        : ''
                    "
                      @click="changeTab('orders')"
                    >
                      <i class="sicon-basket d-inline-block" />
                      <span class="d-inline-block">
                      {{ $t("dashboard.myOrders") }}
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'wallet' ? 'active' : ''"
                      @click="changeTab('wallet')"
                    >
                      <i class="sicon-wallet d-inline-block" />
                      <span class="d-inline-block">
                      {{ $t("dashboard.myWallet") }}
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'coupons' ? 'active' : ''"
                      @click="changeTab('coupons')"
                    >
                      <i class="sicon-tag" />
                      <span class="d-inline-block">{{
                      $t("dashboard.myCoupons")
                    }}</span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'addresses' ? 'active' : ''"
                      @click="changeTab('addresses')"
                    >
                      <i class="sicon-direction" />
                      <span class="d-inline-block">
                      {{ $t("dashboard.myAddresses") }}
                    </span>
                    </a>
                  </li>

<!--                  <li class="nav-item custom-nav-item" style="cursor: pointer">-->
<!--                    <a-->
<!--                      class="nav-link custom-nav-link"-->
<!--                      :class="$route.query.tab == 'cards' ? 'active' : ''"-->
<!--                      @click="changeTab('cards')"-->
<!--                    >-->
<!--                      <i class="sicon-credit-card" />-->
<!--                      <span class="d-inline-block">-->
<!--                      {{ $t("dashboard.myPaymentCards") }}-->
<!--                    </span>-->
<!--                    </a>-->
<!--                  </li>-->

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'reviews' ? 'active' : ''"
                      @click="changeTab('reviews')"
                    >
                      <i class="sicon-bubble" />
                      <span class="d-inline-block">
                      {{ $t("dashboard.myReview") }}
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'cart' ? 'active' : ''"
                      @click="changeTab('cart')"
                    >
                      <i class="sicon-bag" />
                      <span class="d-inline-block">{{
                      $t("dashboard.cart")
                    }}</span>
                      <span class="from-demo-26">
                      <span class="cart-count badge-circle">
                        {{ cartCount }}
                      </span>
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'wishlist' ? 'active' : ''"
                      @click="changeTab('wishlist')"
                    >
                      <i class="sicon-heart" />
                      <span class="d-inline-block">{{
                      $t("dashboard.myFavouriteList")
                    }}</span>
                      <span class="from-demo-26">
                      <span class="cart-count badge-circle">
                        {{ getWishlistCounts }}
                      </span>
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'compares' ? 'active' : ''"
                      @click="changeTab('compares')"
                    >
                      <i class="sicon-shuffle" />
                      <span class="d-inline-block">{{
                      $t("dashboard.compares")
                    }}</span>
                      <span class="from-demo-26">
                      <span class="cart-count badge-circle">
                        {{ getCounts }}
                      </span>
                    </span>
                    </a>
                  </li>

                  <li class="nav-item custom-nav-item" style="cursor: pointer">
                    <a
                      class="nav-link custom-nav-link"
                      :class="$route.query.tab == 'whats-new' ? 'active' : ''"
                      @click="changeTab('whats-new')"
                    >
                      <i class="sicon-paper-clip" />
                      <span class="d-inline-block">
                      {{ $t("dashboard.whatsnew") }}</span
                      >
                      <span class="from-demo-26">
                      <span class="cart-count badge-circle">
                        {{ urReads }}
                      </span>
                    </span>
                    </a>
                  </li>

<!--                  <li class="nav-item custom-nav-item" style="cursor: pointer">-->
<!--                    <a-->
<!--                      class="nav-link custom-nav-link"-->
<!--                      :class="$route.query.tab == 'support' ? 'active' : ''"-->
<!--                      @click="changeTab('support')"-->
<!--                    >-->
<!--                      <i class="sicon-wrench" />-->
<!--                      <span class="d-inline-block">{{-->
<!--                      $t("dashboard.support")-->
<!--                    }}</span>-->
<!--                    </a>-->
<!--                  </li>-->

                  <li v-if="isAuthenticated" class="custom-nav-item">
                    <a
                      href="javascript:;"
                      class="nav-link custom-nav-link"
                      @click="LogOut"
                    >
                      <i class="sicon-logout" />
                      <span class="d-inline-block">{{
                      $t("dashboard.logOut")
                    }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="sidebar widget widget-dashboard col-md-9 col-12"
            sticky-container
          >
            <div
              class="d-flex flex-column mb-2 py-3 rounded-5 shadow"
              v-if="StateUser && StateUser.seller"
              style="border: 2px solid rgba(83, 82, 80, 0.14)"
            >
              <div class="d-flex align-items-center">
                <div v-if="StateUser && StateUser.seller.avatar" class="symbol mx-3">
                  <nuxt-img
                    format="webp"
                    @error="defalutAvatar"
                    :src="StateUser && StateUser.seller.avatar"
                    class="rounded-5 shadow-sm"
                    alt=""
                    width="80"
                    height="80"
                  />
                </div>

                <div v-else class="symbol mx-3">
                  <nuxt-img
                    format="webp"
                    class="border"
                    @error="defalutAvatar"
                    src="https://expertsys-group.com/images/logo2.png"
                    alt="default"
                    width="80"
                    height="80"
                  />
                </div>

                <div class="mx-2">
                  <nuxt-link
                    to="/"
                    class="text-dark fw-bolder text-hover-primary fs-6 my-1 pl-1"
                  >
                    <h4 v-if="StateUser && StateUser.seller.name" class="mb-0">
                      {{ StateUser.seller.name }}
                    </h4>
                  </nuxt-link>

                  <div class="d-flex align-items-center justify-content-around">
                    <nuxt-link
                      v-if="StateUser && StateUser.seller.skype"
                      :to="StateUser.seller.skype"
                    >
                      <i
                        class="bg-light social-icon fab fa-skype text-warning"
                      ></i>
                    </nuxt-link>

                    <nuxt-link
                      v-if="StateUser && StateUser.seller.facebook"
                      :to="StateUser.seller.facebook"
                    ><i
                      class="bg-light social-icon icon-facebook text-warning"
                    ></i
                    ></nuxt-link>
                  </div>
                </div>
              </div>

              <div class="border mx-5 my-3"></div>

              <div class="w-100" :class="{ 'text-right': getIsAr }">
              <span
                class="wrapper flex-wrap d-flex fw-bold w-100 align-items-center"
                :class="{ 'text-right': getIsAr }"
              >
                <nuxt-link
                  v-if="StateUser && StateUser.seller.whatsapp_number"
                  :to="
                    'https://api.whatsapp.com/send?text=&phone=' +
                    StateUser.seller.whatsapp_number
                  "
                >
                  <i
                    class="bg-light social-icon fab fa-whatsapp text-warning"
                  ></i>
                  {{ StateUser.seller.whatsapp_number }}
                </nuxt-link>

                <nuxt-link
                  v-if="StateUser && StateUser.seller.email"
                  :to="'mailto:' + StateUser.seller.email"
                >
                  <i
                    class="bg-light social-icon fa fa-envelope text-warning"
                  ></i>
                  {{ StateUser.seller.email }}
                </nuxt-link>

                <nuxt-link
                  v-if="StateUser && StateUser.seller.phone"
                  :to="'tel:' + StateUser.seller.phone"
                ><i class="bg-light social-icon fa fa-phone text-warning"></i>
                  {{ StateUser.seller.phone }}</nuxt-link
                >
              </span>
              </div>
              <!--end::Text-->
            </div>

            <div v-if="$route.query.tab == 'dashboard' || !$route.query.tab">
              <PvDashboard />
            </div>
            <div v-if="$route.query.tab == 'account-details'">
              <PvAccountDetails />
            </div>
            <div v-else-if="$route.query.tab == 'orders'">
              <PvOrders />
            </div>
            <div v-else-if="$route.query.tab == 'wallet'">
              <PvWallet />
            </div>
            <div v-else-if="$route.query.tab == 'reviews'">
              <PvReview />
            </div>
            <div v-else-if="$route.query.tab == 'coupons'">
              <PvCoupons />
            </div>
            <div v-else-if="$route.query.tab == 'addresses'">
              <PvAddresses />
            </div>
<!--            <div v-else-if="$route.query.tab == 'cards'">-->
<!--              <PvCards />-->
<!--            </div>-->
            <div v-else-if="$route.query.tab == 'change-password'">
              <PvChangePassword />
            </div>
            <div v-else-if="$route.query.tab == 'order-info'">
              <PvOrderInfo />
            </div>
            <div v-else-if="$route.query.tab == 'cart'">
              <PvCart />
            </div>
            <div v-else-if="$route.query.tab == 'wishlist'">
              <PvWashlist />
            </div>
            <div v-else-if="$route.query.tab == 'compares'">
              <PvCompareList />
            </div>
<!--            <div v-else-if="$route.query.tab == 'support'">-->
<!--              <PvSupport />-->
<!--            </div>-->
            <div v-else-if="$route.query.tab == 'whats-new'">
              <PvWhatsNew />
            </div>
          </div>
        </div>
      </div>
    </main>
  </no-ssr>
</template>

<script>
import Api from "~/api";
import { mapGetters, mapActions } from "vuex";
import { scrollTopHandler } from "~/utils";
import img from "~/static/images/blank.png";

export default {
  head() {
    return {
      title: `${this.$t("dashboard.accountDetails")} | Techno Lock Keys Trading`,
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/account',
        },
      ],
      meta: [
        { hid: 'description', name: 'description', content: "Discover all the necessary download files at Techno lock Keys, a premier wholesale distributor. Techno lock Keys is recognized as one of the top distributors." },
        { charset: "utf-8" },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Discover all the necessary download files at Techno lock Keys, a premier wholesale distributor. Techno lock Keys is recognized as one of the top distributors.",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Downloads | Techno Lock Keys Trading",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: "www.tlkeys.com/downloads",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.$settings.seo.meta_image.l.url,
        },
        {
          hid: "og:image:alt",
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          hid: "og:image:height",
          name: "og:image:height",
          content: "627",
        },
        {
          hid: "og:image:width",
          name: "og:image:width",
          content: "1200",
        },
        // {
        //   hid: "twitter:card",
        //   name: "twitter:card",
        //   content: "summary_large_image",
        // },
        // {
        //   hid: "twitter:site",
        //   name: "twitter:site",
        //   content: `@${(this.$settings.social_media.twitter || '').split("/").pop()}`,
        // },
        // {
        //   hid: "twitter:creator",
        //   name: "twitter:creator",
        //   content: `@${(this.$settings.social_media.twitter || '').split("/").pop()}`,
        // },
        // {
        //   hid: "twitter:title",
        //   name: "twitter:title",
        //   content: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
        // },
        // {
        //   hid: "twitter:description",
        //   name: "twitter:description",
        //   content: JSON.parse(this.$settings.seo.meta_description)[this.$i18n.locale],
        // },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        },
        {
          rel: "shortcut icon",
          href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        },
        // {
        //   rel: "apple-touch-icon",
        //   sizes: "180x180",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    }
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("shop", ["cartCount"]),
    ...mapGetters("fav", ["getWishlistCounts"]),
    ...mapGetters("compare", ["getCounts"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  components: {
    PvReview: () => import("~/components/account/PvReview"),
    PvDashboard: () => import("~/components/account/PvDashboard.vue"),
    PvOrders: () => import("~/components/account/PvOrders"),
    PvAccountDetails: () => import("~/components/account/PvAccountDetails"),
    PvChangePassword: () => import("~/components/account/PvChangePassword"),
    PvWallet: () => import("~/components/account/PvWallet"),
    PvCoupons: () => import("~/components/account/PvCoupons"),
    PvAddresses: () => import("~/components/account/PvAddresses"),
    // PvCards: () => import("~/components/account/PvCards"),
    PvOrderInfo: () => import("~/components/account/PvOrderInfo"),
    PvCart: () => import("~/components/account/PvCart"),
    PvWashlist: () => import("~/components/account/PvWashlist"),
    PvCompareList: () => import("~/components/account/PvCompareList"),
    // PvSupport: () => import("~/components/account/PvSupportList"),
    PvWhatsNew: () => import("~/components/account/PvWhatsNew"),
  },

  data: function () {
    return {
      isSticky: false,
      urReads: 0,
      animationDelay:'100ms',
    };
  },

  mounted() {
    this.getWhatsNews();
  },

  methods: {
    ...mapActions("auth", ["LogOut"]),

    changeTab(query) {
      this.$router.push({ path: "account", query: { tab: query } });
      scrollTopHandler();
    },

    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },

    getWhatsNews() {
      // this.$Progress.start();
      Api.get("/user/whats-new").then((response) => {
        this.urReads = response.data.unread_total;
      });
      // this.$Progress.finish();
    },

    defalutAvatar(e) {
      e.target.src = img;
    },
  },
};
</script>

<style scoped>
.wrapper a {
  margin: 3px 12px;

  white-space: nowrap;
}
</style>
