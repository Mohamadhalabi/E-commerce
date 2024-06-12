<template>
  <div :class="{ container: insideModal }" class="registerFoem">
    <div v-if="insideModal" class="heading mb-1">
      <h2 class="title">
        {{ $t("auth.register") }}
      </h2>
    </div>
    <div class="col-lg-9 col-md-9 ml-auto mr-auto">
      <form id="registerForm"
        action="#"
        :class="{ 'mb-0': insideModal }"
        @submit.prevent="submit"
      >
        <div class="row" :class="{ 'text-right': getIsAr }">
          <div
            class="col-12 d-flex align-items-center mb-3 justify-content-center"
          >
            <div class="profile-avatar profileAvatarRegister position-relative">
              <a href="javascript:;" class="rounded-5">
                <img
                  loading="lazy"
                  style="object-fit: cover"
                  :src="avatarLink"
                  width="150"
                  height="150"
                  alt="Avatar"
                />
                <b-form-file
                  v-model="avatar"
                  class="avatarClass"
                  plain
                  @change="onFileChange"
                />

                <span class="edit-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 96 960 960"
                    width="28"
                    fill="#7c7c7a"
                  >
                    <path
                      d="M303 753h60l230-230-60-60-230 230v60Zm310-250 40-40q8-8 8.5-19.5T654 424l-21-21q-8-8-19.5-8.5T594 402l-41 41 60 60ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div class="col-lg-12 col-md-12" style="display: contents">
            <div class="col-lg-6 col-md-6 pr-3">
              <label for="register-name">
                {{ $t("auth.fullName") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-name"
                v-model="form.name"
                class="form-input form-wide"
                type="text"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.name" />
            </div>

            <div class="col-lg-6 col-md-6">
              <label for="register-email">
                {{ $t("auth.emailAddress") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-email"
                v-model="form.email"
                class="form-input form-wide"
                type="email"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.email" />
            </div>

            <div class="col-lg-6 col-md-6">
              <label for="register-password">
                {{ $t("auth.password") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-password"
                v-model="form.password"
                class="form-input form-wide"
                type="password"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.password" />
            </div>

            <div class="col-lg-6 col-md-6">
              <label for="register-confirm-password">
                {{ $t("auth.confirmPassword") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-confirm-password"
                v-model="form.confirm_password"
                class="form-input form-wide"
                type="password"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.confirm_password" />
            </div>

            <div class="col-lg-6 col-md-6 mb-2">
              <label>
                {{ $t("orders.country") }}
              </label>
              <span class="required">*</span>
              <AutoComplate
                v-model="form.country_id"
                :options="countries"
                @setValue="
                  $event
                    ? (form.country_id = $event.id)
                    : (form.country_id = null)
                "
              />

              <pv-error :error-msg="errorMsg.country_id" />
            </div>


            <div class="col-lg-6 col-md-6">
              <label for="register-confirm-password">
                {{ $t("orders.city") }}
                <span class="required">*</span>
              </label>
              <input
                id="register-confirm-password"
                v-model="form.city"
                class="form-input form-wide"
                type="text"
                :class="{ 'mb-2': insideModal }"
                required
              />
              <pv-error :error-msg="errorMsg.city" />
            </div>

            <div class="col-lg-6 col-md-6">
              <label for="acc-phone">
                {{ $t("account.phone") }}
                <span class="required">*</span>
              </label>
<!--              <VuePhoneNumberInput-->
<!--                @update="typePhoneNum"-->
<!--                :default-country-code="countryCode"-->
<!--                v-model="form.mobile"-->
<!--              />-->
              <input
                v-model="form.mobile"
                class="form-input form-wide"
                type="text"
                :class="{'mb-2':insideModal}" />
            </div>
            <pv-error :error-msg="errorMsg.mobile" />

            <div class="col-lg-6 col-md-6">
                <div>
                  <label> State </label>
                  <input
                    v-model="form.state"
                    class="form-input form-wide"
                    type="text"
                    :class="{ 'mb-2': insideModal }"
                  />
                  <pv-error :error-msg="errorMsg.state" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div>
                  <label>
                    {{ $t("auth.street") }}
                  </label>
                  <input
                    v-model="form.street"
                    class="form-input form-wide"
                    type="text"
                    :class="{ 'mb-2': insideModal }"
                  />
                  <pv-error :error-msg="errorMsg.street" />
                </div>
              </div>
            <div class="col-lg-6 col-md-6">
              <label>
                {{ $t("auth.postalCode") }}
              </label>
              <input
                v-model="form.postal_code"
                class="form-input form-wide"
                type="text"
                :class="{ 'mb-2': insideModal }"
              />
              <pv-error :error-msg="errorMsg.postal_code" />
            </div>
            <div class="col-lg-12">
              <label>
                {{ $t("auth.address") }}
              </label>
              <span class="required">*</span>
              <input
                v-model="form.address"
                class="form-input form-wide"
                type="text"
                :class="{ 'mb-2': insideModal }"
              />
              <pv-error :error-msg="errorMsg.address" />
            </div>

            <div class="col-lg-6 col-md-6 pl-3">
              <label> {{ $t("auth.companyName") }} </label>
              <input
                id="register-company_name"
                v-model="form.company_name"
                class="form-input form-wide"
                type="text"
                :class="{ 'mb-2': insideModal }"
              />
              <pv-error :error-msg="errorMsg.company_name" />
            </div>
            <div class="col-lg-6">
              <label>
                {{ $t("auth.website") }}
              </label>
              <input
                id="register-website_url"
                v-model="form.website_url"
                class="form-input form-wide"
                type="text"
                :class="{ 'mb-2': insideModal }"
              />
              <pv-error :error-msg="errorMsg.website_url" />
            </div>
            <div class="col-lg-12 col-md-12 pl-3 mb-3">
              <label>{{ $t("auth.Language")}}</label>
              <AutoComplate
                placeholder="Preferred Language"
                :model="form.PreferredLanguage"
                :allow-empty="false"
                :options="[
                  { name: 'English', value: 'en'},
                  { name: 'French', value: 'fr' },
                  { name: 'Spanish', value: 'es' },
                  { name: 'German', value: 'de' },
                  { name: 'Russian', value: 'ru' },
                  ]"
                @setValue="form.PreferredLanguage = $event.value"
              />
              <pv-error :error-msg="errorMsg.company_name" />
            </div>
          </div>

          <div class="col-lg-12">
            <b-alert v-if="alertMessage != ''" show :variant="alertClass"
              ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
              <span>{{ alertMessage }}</span></b-alert
            >
<!--            <recaptcha />-->
            <b v-if="this.token == ''" class="text-danger text-left w-100">{{
              $t("common.pleaseCheckRecaptch")
            }}</b>

            <div class="mt-1 col-lg-9 col-md-12 mr-auto ml-auto">
              <base-button-icon-1
                :outline="true"
                :class="insideModal ? 'btn-block' : 'w-100'"
                class="py-4 register-button"
                >{{ $t("auth.register") }}</base-button-icon-1
              >

              <nuxt-link to="/auth/login">
                <base-button-icon-1 class="py-4 w-100 mt-1">
                  <i class="icon-action-undo"></i>
                  {{ $t("auth.loginInstead") }}</base-button-icon-1
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AutoComplate from "~/components/common/AutoComplate.vue";
import PvError from "~/components/common/ErrorMessage.vue";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import Api from "~/api";

export default {
  components: {
    AutoComplate,
    PvError,
    BaseButtonIcon1,
  },
  props: {
    insideModal: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      phoneFormated: null,
      avatar: null,
      avatarLink: "https://tlkeys.com/static/images/user.png",
      companyInfoSecrion: true,
      form: {
        name: "",
        email: "",
        password: "",
        mobile: "",
        city: "",
        confirm_password: "",
        country_id: null,
        state: "",
        street: "",
        address: null,
        postal_code: "",
        company_name: "",
        website_url: "",
        PreferredLanguage:"",
      },
      alertMessage: "",
      alertClass: "",
      errorMsg: [],
      countries: [],
      token: null,
    };
  },
  created() {
    this.getCountries();
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    availableLocales() {
      const currentLocale = this.$i18n.locale;
      const locales = Object.entries(this.$settings.languages);
      return locales.filter(([locale,]) => locale !== currentLocale);
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions("auth", ["LogIn"]),
    submit: async function () {
      await this.Register(this.form);
    },

    async Register() {
      let formData = new FormData(document.getElementById('registerForm'));
    formData.append("mobile", this.form.mobile);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("city", this.form.city);
      formData.append("password", this.form.password);
      formData.append("confirm_password", this.form.confirm_password);
      formData.append("country_id", this.form.country_id);
      formData.append("state", this.form.state);
      formData.append("street", this.form.street);
      formData.append("address", this.form.address);
      formData.append("postal_code", this.form.postal_code);
      formData.append("company_name", this.form.company_name);
      formData.append("website_url", this.form.website_url);
      formData.append("avatar", this.avatar);
      formData.append("language", this.form.PreferredLanguage);

      Api.post("/user/auth/register", formData)
        .then((response) => {
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.data.message,
          });
          const user = { email: this.form.email, password: this.form.password };
          return this.LogIn(user);
        })
        .catch((error) => {
          let errorObj = error.response.data.data;
          let message = "";
          if (Object.keys(errorObj).length) {
            message = error.response.data.data[Object.keys(errorObj)[0]][0];
          } else {
            message = error.response.data.message;
          }
          this.$notify({
            group: "errorMessage",
            type: "error",
            text: message,
          });
        });
    },

    getCountries() {
      Api.post("/countries")
        .then((response) => {
          this.countries = response.data.result;
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file == undefined) {
        this.avatarLink;
      } else {
        this.avatarLink = URL.createObjectURL(file);

      }
    },
  },
};
</script>
<style>
button.noselect.py-4.register-button.outline.w-100{
  background-color: #25262b;
  color: white;
}
.input-tel__input , .country-selector__input {
  min-height: 50px!important;
}
</style>
