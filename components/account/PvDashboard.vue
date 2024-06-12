<template>
  <div class="dashboard-content">
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      <i class="orange-1 sicon-drawer align-middle mx-2 pr-1" />
      {{ $t("account.dashboard") }}
    </h3>
    <p v-if="isAuthenticated" :class="{ 'text-right': getIsAr }">
      {{ $t("account.Hello") }}
      <strong class="text-dark">{{ StateUser.name }}</strong>
    </p>
    <div class="mb-4" />

    <div class="row row-lg " id="wrapper">
      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="orders"
            @click.prevent="changeTab('orders')"
          >
            <i class="fa fa-cart-arrow-down" />
            <div class="feature-box-content">
              <h3>{{ $t("dashboard.orders") }}</h3>
            </div>
          </div>
        </a>
      </div>

      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="wallet"
            @click.prevent="changeTab('wallet')"
          >
            <i class="fa fa-money-bill" />
            <div class="feature-box-content">
              <h3>{{ $t("dashboard.wallet") }}</h3>
            </div>
          </div>
        </a>
      </div>

      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="coupons"
            @click.prevent="changeTab('coupons')"
          >
            <i class="fa fa-percentage" />
            <div class="feature-box-content">
              <h3>{{ $t("coupon.coupons") }}</h3>
            </div>
          </div>
        </a>
      </div>

      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="addresses"
            @click.prevent="changeTab('addresses')"
          >
            <i class="fa fa-address-card" />
            <div class="feature-box-content">
              <h3>{{ $t("dashboard.addresses") }}</h3>
            </div>
          </div>
        </a>
      </div>

      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="account-details"
            @click.prevent="changeTab('account-details')"
          >
            <i class="fa fa-info" />
            <div class="feature-box-content">
              <h3>{{ $t("account.account_details") }}</h3>
            </div>
          </div>
        </a>
      </div>

      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="cart"
            @click.prevent="changeTab('cart')"
          >
            <i class="fa fa-shopping-cart" />
            <div class="feature-box-content">
              <h3>
                Cart
                <span class="cart-count badge-circle">{{ cartCount }}</span>
              </h3>
            </div>
          </div>
        </a>
      </div>

      <div class="col-6 col-md-4 col-xl-3">
        <a class="link-to-tab">
          <div
            class="feature-box text-center pb-4"
            data-toggle="wishlist"
            @click.prevent="changeTab('wishlist')"
          >
            <i class="fa fa-heart" />
            <div class="feature-box-content">
              <h3>
                {{ $t("account.wishlist") }}
                <span class="cart-count badge-circle">{{ cartCount }}</span>
              </h3>
            </div>
          </div>
        </a>
      </div>

      <div  v-if="isAuthenticated" class="col-6 col-md-4 col-xl-3">
        <a href="javascript:;" @click="LogOut">
          <div class="feature-box text-center pb-4">
            <i class="fa fa-sign-out-alt" />
            <div class="feature-box-content">
              <h3>{{ $t("account.log_out") }}</h3>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    cartCount: Number,
    wishlistCount: Number,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  data:function (){
    return{
      animationDelay : `100ms`
    }
  },
  methods: {
    ...mapActions("shop", ["getCartList"]),
    ...mapActions("compare", ["fetchList"]),
    ...mapActions("fav", ["fetchWishlist"]),
    head() {
      return {
        titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
        title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      }
    },
    changeTab: function (query) {
      this.$router.push({ path: "/account", query: { tab: query } });
      scrollTopHandler();
    },
    LogOut() {
      // this.$Progress.start();
      this.$auth.logout().then((res) => {
        localStorage.setItem("tokenEnded", 1);

        this.fetchList();
        this.fetchWishlist();
        this.getCartList();

        this.$router.push("/");
      });
      // this.$Progress.finish();
    },
  },
};
</script>

<style scoped>
#wrapper i{
  color: #535250!important;
}
.link-to-tab{
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}
.link-to-tab:hover{
  cursor: pointer;
}
</style>
