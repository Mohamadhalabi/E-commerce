<template>
  <div>
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      {{
        $t("account.change_password")
      }}
    </h3>
    <div class="account-content">
      <form action="#" class="custom-form" @submit.prevent="changePassword">
        <div class="row">
          <div class="col-md-8">
            <div class="form-group mb-3">
              <label for="acc-old-password">
                {{ $t("account.current_password") }}
                <span class="required">*</span>
              </label>
              <input
                id="acc-old-password"
                v-model="form.old_password"
                class="form-control"
                type="password"
                name="acc-old-password"
                required
              />
            </div>

            <div class="form-group mb-3">
              <label for="acc-password">
                {{ $t("account.new_password") }}
                <span class="required">*</span>
              </label>
              <input
                id="acc-password"
                v-model="form.password"
                class="form-control"
                type="password"
                name="acc-password"
                required
              />
            </div>

            <div class="form-group mb-0">
              <label for="acc-password-confirmation">
                {{ $t("account.confirm_new_password") }}
                <span class="required">*</span>
              </label>
              <input
                id="acc-password-confirmation"
                v-model="form.password_confirmation"
                class="form-control"
                type="password"
                name="acc-password-confirmation"
                required
              />
            </div>
          </div>
        </div>
        <div class="form-footer mb-0">
          <!-- <button type="submit" class="btn btn-sm text-light btn-warning">

          </button> -->
          <base-button-icon-1 :outline="true" style="width: 150px;" class="py-4"> {{ $t("account.change_password") }}</base-button-icon-1>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import Api from "~/api";
import { mapGetters } from "vuex";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";

export default {
  components: {
    BaseButtonIcon1
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "StateUser"]),
  },
  data: function () {
    return {
      form: {
        old_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },
  methods: {




    changePassword: function () {
      // this.$Progress.start();
      Api.post("/user/auth/change-password", this.form)
        .then((response) => {
          scrollTopHandler();
          this.$notify({
            group: "addProduct",
            type: "success",
            text: response.data.message,
          });
        }).catch((error) => {
          let errorObj = error.response.data.data;
          let message = "";
          if (Object.keys(errorObj).length) {
            message = error.response.data.data[Object.keys(errorObj)[0]][0];
          } else {
            message = error.response.data.message.password;
          }
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: message,
          });
        });


      // this.$Progress.finish();

    },




  },
};
</script>
