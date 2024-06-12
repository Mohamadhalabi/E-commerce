<template>
  <main class="main contact-two">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <br />
          <h2>{{ message}}</h2>
          <br />

          <pv-veify-mail-success v-if="this.success" />

          <pv-verify-mail-un-success v-if="!this.success && this.success != null" />

          <nuxt-link
            :to="getLink('/')">
            <base-button-icon-1 :outline="true" class="py-4 px-5">{{
              $t("verify.goToShop")
            }}</base-button-icon-1>
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "~/api";
import PvVeifyMailSuccess from "~/components/auth/PvVeifyMailSuccess.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import PvVerifyMailUnSuccess from '~/components/auth/PvVerifyMailUnSuccess.vue';

export default {
  components: { BaseButtonIcon1, PvVeifyMailSuccess, PvVerifyMailUnSuccess  },
  mounted() {
    this.submitVerfiy();
  },
  props: {
    items: {},
  },
  data: function () {
    return {
      success:null,
      message:''
    };
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    ...mapActions("auth", ["LogIn"]),
    ...mapMutations("auth", ["SET_USER", "SET_TOKEN"]),
    ...mapActions("auth", ["LogIn"]),
    ...mapMutations("auth", ["SET_USER", "SET_TOKEN"]),
    ...mapActions("shop", ["afterLogOutCart", "getCartList", "addToCart"]),
    ...mapActions("compare", ["afterLogOutCompare", "fetchList", "addToList"]),
    ...mapActions("fav", [
      "afterLogOutWishlist",
      "fetchWishlist",
      "addToWishlist",
    ]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    submitVerfiy() {
      let query = this.$route.query;
      let me = this;

      Api.post("/user/auth/verfiy-mail", query)
        .then(function (response) {

          me.success= true;
          me.message= response.data.message;
          localStorage.setItem("tokenEnded", 0);
          me.SET_TOKEN(response.data.token);
          me.SET_USER(response.data.user);
        })
        .catch((error) => {
          me.success= false;
          me.message= error.response.data.message;
        });
    }
  }
};
</script>
<style  scoped>
/** * Extracted from: SweetAlert * Modified by: Istiak Tridip */
</style>
