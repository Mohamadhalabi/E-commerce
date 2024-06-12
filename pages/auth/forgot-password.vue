<template>
  <main class="main">
    <div class="container reset-password-container">
      <div class="text-center" style="color: red;">
        <p style="font-size: 18px;">If you encounter any issues with resetting your password, please don't hesitate to reach out to us on WhatsApp for assistance.</p>
        <p style="font-size: 18px;">إذا واجهت أي مشكلة في إعادة تعيين كلمة المرور، فلا تتردد في الاتصال بنا على واتساب للحصول على المساعدة.</p>
        <button @click="contactUs" style="border: 0;background-color: transparent">
          <img src="../../static/images/whatsapp-icon.webp" class="mb-1" width="60" height="60" style="display: inline" />
        </button>
      </div>
      <div class="row">
        <div class="col-lg-6 offset-lg-3">
          <div style="border-top: 3px solid #ff832d;   border-left: 1px solid #aaa; border-right: 1px solid #aaa; border-bottom: 1px solid #aaa;" class="feature-box   rounded-2 shadow">
            <div class="feature-box-content">
              <form class="mb-0" @submit.prevent="forgotPassword">
                <p>
                  {{ $t("forgotPassword.subText") }}
                </p>
                <div class="form-group mb-0">
                  <label for="reset-email" class="font-weight-normal">{{
                    $t("common.email")
                  }}</label>
                  <input
                    id="reset-email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    name="reset-email"
                    required
                  />
                </div>
                <div
                  class="form-footer mb-0 d-felx align-items-center justify-content-between"
                >
                  <nuxt-link to="/auth/login" class="m-0 p-0">
                    {{ $t("forgotPassword.clickHere") }}
                  </nuxt-link>
                  <base-button-icon-1 type="submit" class="p-2" :outline="true">{{
                    $t("forgotPassword.resetPassword")
                  }}</base-button-icon-1>
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
import {mapGetters} from "vuex";

export default {
  components: { BaseButtonIcon1 },
  computed: {
    ...mapGetters("auth", ["getEmail"]),
  },
  data() {
    return {
      email: "",
      errors: {},
    };
  },
  head() {
    return {
      title: this.$t("forgotPassword.title"),
    };
  },
  mounted() {
    this.email = this.getEmail
  },
  methods: {
    contactUs(){
      window.open(
        `https://api.whatsapp.com/send?phone=971504429045&text=I Have a problem with resetting my password`,
        "_blank"
      );
    },
    forgotPassword() {
      this.$store
        .dispatch("auth/forgotPassword", this.email)
        .then((res) => {
          /*   this.message = res.data.message;
        this.$modal.show('success');  */
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: res.data.message+'',
          });
        })
        .catch((error) => {
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: error.response.data.data.email +'',
          });

          /* this.errors = error.response.data.data;
        this.$modal.show('error'); */
        });
    },
  },
};
</script>
