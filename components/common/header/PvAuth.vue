<template>
  <nuxt-link  :to="getLink('/account')" class="header-icon" v-if="isAuthenticated">
    <div class="header-user">
      <i
        class=""
        :class="StateUser.avatar ? 'user-avatar' : 'sicon-user'">
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
      <template>
        <div class="header-dropdown">
          <p class="desktop-only" style="text-decoration: none !important;" href="javascript:;">
            {{ StateUser.name }}
          </p>
          <div class="header-menu border-0">
            <ul class="account-menu-ul">
              <li class="account-menu-li"><span class="account-list" @click.prevent="myOrders">
                {{ $t("account.orders") }}
              </span>
              </li>
              <li class="account-menu-li">
                <span class="account-list" @click="LogOut">{{ $t("account.log_out") }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <div class="header-userinfo d-none d-lg-block">
        <span class="d-inline-block font2 line-height-1"> </span>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import img from "~/static/images/blank.png";
export default {

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    ...mapGetters("language", ["getLang"]),
    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
  },
  methods: {
    ...mapActions("auth", ["LogOut"]),
    defalutAvatar(e) {
      e.target.src = img;
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    myOrders() {
      this.$router.push({ path: this.getLink("/account"), query: { tab: "orders" } });
    },
    checkURL(url) {
      if (url) {
        return url;
      } else {
        return "https://cdn-icons-png.flaticon.com/512/7855/7855599.png";
      }
    },
  },
};
</script>
<style>
.account-menu-ul{
  padding: 10px!important;
  margin-bottom: 10px;
}
</style>
