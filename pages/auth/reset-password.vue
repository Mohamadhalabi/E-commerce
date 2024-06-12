<template>
  <main class="main">
    <div class="container reset-password-container">
      <div class="row ">
        <div class="col-lg-6 mx-auto offset-lg-3">
          <div
            style="
              border-top: 3px solid #ff832d;
              border-left: 1px solid #aaa;
              border-right: 1px solid #aaa;
              border-bottom: 1px solid #aaa;
            "
            class="feature-box rounded-2 shadow"
          >
            <div  class="feature-box-content">
              <form action="#" class="mb-0" @submit.prevent="resetPassword">
               <div class="form-group ">
                 <label>
                    {{ $t("forgotPassword.createNewPassword") }}
                  </label>
               </div>
                <div class="form-group mb-0">
                  <label for="password" class="font-weight-normal">{{
                    $t("common.password")
                  }}</label>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                  />
                </div>
                <div class="form-group mb-0">
                  <label
                    for="password_confirmation"
                    class="font-weight-normal"
                    >{{ $t("common.confirmPassword") }}</label
                  >
                  <input
                    id="password_confirmation"
                    v-model="password_confirmation"
                    type="password"
                    class="form-control"
                    name="password_confirmation"
                    required
                  />
                </div>
                <div class="form-footer mb-0 d-flex align-items-center justify-content-between w-100">
                  <nuxt-link to="/auth/login">
                    {{ $t("forgotPassword.clickHereToLogIn") }}
                  </nuxt-link>

                  <!-- <button
                    type="submit"
                    class="btn btn-md btn-primary form-footer-right font-weight-normal text-transform-none mr-0"
                  >
                    {{ $t("forgotPassword.resetPassword") }}
                  </button> -->
                  <base-button-icon-1
                    type="submit"
                    :outline="true"
                    class="py-3"
                    style="width: 150px"
                    >{{
                      $t("forgotPassword.resetPassword")
                    }}</base-button-icon-1
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import {mapActions} from "vuex";
export default {
  components: {
    BaseButtonIcon1,
  },
  data() {
    return {
      password: "",
      password_confirmation: "",
      message: "",
      errors: {},
    };
  },
  head() {
    return {
      title: this.$t("forgotPassword.title"),
    };
  },
  methods: {
    ...mapActions('auth', ['LogIn']),

    resetPassword() {
      const data = {
        password: this.password,
        password_confirmation: this.password_confirmation,
        token: this.$route.query.token,
      };

      this.$store
        .dispatch('auth/resetPassword', data)
        .then((res) => {
          this.message = res.data.message;
          // Log in the user after successfully resetting the password
          const user = { email: this.$route.query.email, password: this.password };
          return this.LogIn(user);
        })
        .then(() => {
          // Redirect or perform any additional actions after logging in
          this.$router.push('/');
          this.$notify({
            group: 'custom-notify',
            type: 'success',
            text: this.$t('common.passwordUpdatedSuccessfully'),
          });
        })
        .catch((error) => {
          this.errors = error.response.data.data;
          this.$notify({
            group: 'errorMessage',
            type: 'error',
            text: this.$t('common.failedToChangeThePassword'),
          });
        });
    }
  }
};
</script>
