<template>
  <div class="container">
    <div class="row my-5 py-4">
      <div class="col-md-8 mx-auto d-flex  align-items-center flex-column">
        <div class="">

          <pv-success v-if="successBool == 'true'"></pv-success>
          <PvVerifyMailUnSuccess v-if="successBool  != 'true'"></PvVerifyMailUnSuccess>
          <h3 v-if="!message"> {{ $t("checkout.thankYouForYourOrder") }}</h3>
          <h3 v-if="message" class="text-danger"> {{ message }}</h3>
          <h5 class="text-center">{{ $t("checkout.yourOrderId") }} : {{ getOrderId }}</h5>
        </div>


        <div class="d-flex align-items-center  justify-content-between w-50 ">
          <nuxt-link class="w-100 mx-3" style="color: #ff6800 !important;" to="/">
            <base-button-icon-1 :outline="true" class="w-100 py-4">
              {{ $t('header.home') }}
            </base-button-icon-1>
          </nuxt-link>


          <base-button-icon-1
            @click="myOrders"
            :outline="true"
            class="py-4 mx-3 w-100"
          >{{ $t('dashboard.myOrders') }}
          </base-button-icon-1
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import PvSuccess from "~/components/common/PvSuccess.vue";

import PvVerifyMailUnSuccess from "~/components/auth/PvVerifyMailUnSuccess.vue";
import {mapGetters, mapMutations} from 'vuex';

export default {
  components: {
    BaseButtonIcon1,
    PvSuccess,
    PvVerifyMailUnSuccess,
  },
  data() {
    return {
      orderId: null,
      successBoll: null,
      messageError: null
    };
  },
  // created() {
  //   this.$Progress.finish();
  // },
  // beforeCreate() {
  //   this.$Progress.start();
  //
  // },
  head() {
    return {
      // titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      // title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale]
    }
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
    getOrderId() {
      return this.$route.query.orderId;
    },
    successBool() {
      return this.$route.query.success;
    },
    message() {
      return this.$route.query.message;
    }
  },
  methods: {
    myOrders() {
      this.$router.push({path: "/account", query: {tab: "orders"}});
    },
  },
  mounted() {
    // this.RESET_CART();
  },
};
</script>

<style scoped>
</style>
