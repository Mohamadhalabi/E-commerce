<template>
  <div :class="{ container: insideModal }">
    <div v-if="insideModal" class="heading mb-1">
      <h2 class="title">
        {{ $t("login.title") }}
      </h2>
    </div>

    <form
      action="#"
      :class="{ 'text-right': getIsAr }"
      @submit.prevent="submit"
    >
      <label for="login-email">
        {{ $t("common.email") }}
        <span class="required">*</span>
      </label>
      <input
        id="login-email"
        v-model="form.email"
        type="email"
        class="form-input form-wide"
        :class="{ 'mb-2': insideModal }"
        required
      />

      <label for="login-password">
        {{ $t("common.password") }}
        <span class="required">*</span>
      </label>
      <input
        id="login-password"
        v-model="form.password"
        type="password"
        class="form-input form-wide"
        :class="{ 'mb-2': insideModal }"
        required
      />
<!--      <recaptcha />-->
      <b v-if="this.token == ''" class="text-danger">{{
        $t("common.pleaseCheckRecaptch")
      }}</b>
      <div
        class="form-footer d-flex align-items-center justify-content-between"
        :class="{ 'flex-row-reverse': getIsAr }"
      >
        <div
          class="custom-control custom-checkbox m-0 p-0 d-flex align-items-center"
        >
          <input id="remember-me" type="checkbox" class="mx-1" />
          <label class="m-0" for="remember-me">
            {{ $t("login.rememberMe") }}
          </label>
        </div>
        <nuxt-link to="/auth/forgot-password" class="forget-password text-dark">
          <a @click="ResetPasswordEmail(form.email)">
          {{ $t("login.forgotPassword") }}
          </a>
        </nuxt-link>
      </div>

      <div class="text-center">
        <!--  <button
          type="submit"
          class="btn btn-warning btn-md text-light"
          :class="insideModal ? 'btn-block' : 'w-100'"
        >
          {{ $t("login.title") }}
        </button> -->

        <base-button-icon-1
          :outline="true"
          class="py-4 mb-2"
          type="submit"
          style="background-color: #25262b; border-color: #25262b"
          :class="insideModal ? 'btn-block' : 'w-100'"
          >{{ $t("login.title") }}
        </base-button-icon-1>
        <!-- <nuxt-link to="/auth/register" class="btn btn-dark btn-md mt-1 w-100">
          {{ $t("login.registerNow") }}
        </nuxt-link> -->

        <nuxt-link to="/auth/register">
          <base-button-icon-1 :outline="false" class="py-4 w-100">
            {{ $t("login.registerNow") }}
          </base-button-icon-1>
        </nuxt-link>
      </div>
    </form>

<!--    <div-->
<!--      v-if="-->
<!--        $settings.login_setting.google.enable ||-->
<!--        $settings.login_setting.facebook.enable-->
<!--      "-->
<!--      class="login-choice text-center mt-2"-->
<!--    >-->
<!--      <span>{{ $t("login.orSignInWith") }}</span>-->
<!--    </div>-->

<!--    <SocialLogin />-->
<!--    <div v-if="loadedBtn" style="text-align: center !important">-->
<!--      <div class="spinner-border text-primary" role="status">-->
<!--        <span class="sr-only">{{ $t("common.loading") }}</span>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style>
.signup-buttons svg {
  width: 20px !important;
  left: 0 !important;
}
</style>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
// import SocialLogin from "./SocialLogin.vue";
// import { ReCaptchaOptions } from "@nuxtjs/recaptcha";

export default {
  components: { BaseButtonIcon1 },
  props: {
    insideModal: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      form: {
        email: "",
        password: "",
      },
      token: null,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.loadedBtn = false;
    // }, 5000);

    this.afterLogOutCompare();
    this.afterLogOutCart();
    this.afterLogOutWishlist();

    this.getCartList();
    this.fetchList();
    this.fetchWishlist();
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
  methods: {
    test(){
      alert("TEST")
    },
    ...mapActions("auth", ["LogIn","ResetPasswordEmail"]),
    ...mapMutations("auth", ["SET_USER", "SET_TOKEN"]),
    ...mapActions("shop", ["afterLogOutCart", "getCartList", "addToCart"]),
    ...mapActions("compare", ["afterLogOutCompare", "fetchList", "addToList"]),
    ...mapActions("fav", [
      "afterLogOutWishlist",
      "fetchWishlist",
      "addToWishlist",
    ]),

    submit: async function () {
      // try {
      //   this.token = await this.$recaptcha.getResponse();
      // } catch (Ex) {
      //   this.token = "";
      // }
      // if (this.token != "") {
        this.$auth.loginWith("local", {
            data: this.form,
          })
          .then((res) => {
            localStorage.setItem("tokenEnded", 0);
            this.SET_TOKEN(res.data.authorisation.token);
            this.SET_USER(res.data.user);
            this.fetchDatafronLocalStorage();
            this.$notify({
              group: "addProduct",
              type: "success",
              text: res.data.message,
            });

            // if (this.$route.fullPath == "/auth/login") {
              this.$router.push("/");
            // }
            // this.$modal.hideAll();
          })
          .catch((err) => {
            this.$notify({
              group: "errorMessage",
              type: "error",
              text: err.response.data.message,
            });
          })
          // .finally(() => {
          //   this.isLoading = false;
          // });
      // }
    },
    fetchDatafronLocalStorage() {
      let cartListLocalStorge = JSON.parse(localStorage.getItem("card"));
      if (cartListLocalStorge && cartListLocalStorge.length > 0) {
        for (let index = 0; index < cartListLocalStorge.length; index++) {
          this.addToCart(cartListLocalStorge[index]);
        }
        localStorage.removeItem("card");
      }

      let washListLocalStorge = JSON.parse(localStorage.getItem("wash"));
      if (washListLocalStorge && washListLocalStorge.length > 0) {
        for (let index = 0; index < washListLocalStorge.length; index++) {
          this.addToWishlist(washListLocalStorge[index]);
        }
        localStorage.removeItem("wash");
      }

      let compareListLocalStorge = JSON.parse(localStorage.getItem("compare"));
      if (compareListLocalStorge && compareListLocalStorge.length > 0) {
        for (let index = 0; index < compareListLocalStorge.length; index++) {
          this.addToList(compareListLocalStorge[index]);
        }
        localStorage.removeItem("compare");
      }

      this.getCartList();
      this.fetchList();
      this.fetchWishlist();
    },
  },
};
</script>
