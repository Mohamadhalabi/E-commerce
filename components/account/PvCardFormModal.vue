<template>
  <div
  >
    <div class="modal-wrapper custom-modal-form">
      <div class="container">
        <div
          class="d-flex align-items-center justify-content-between mb-3"
          :class="{ 'flex-row-reverse': getIsAr }"
        >
          <h3 class="m-0 p-0">{{ $t("address.addCard") }}</h3>
        </div>

        <div class="card-form mb-3">
          <div class="card-list">
            <div class="card-form__inner">
              <div class="row" :class="{ 'text-right': getIsAr }">
                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label for="cardNumber" class="card-input__label">
                      {{ $t("address.cardNumber") }}</label
                    >
                    <input
                      :id="inputFields.cardNumber"
                      type="tel"
                      title="Number"
                      class="form-control"
                      :value="valueFields.cardNumber"
                      data-card-field
                      autocomplete="off"
                      :maxlength="cardNumberMaxLength"
                      @input="changeNumber"
                    />
                  </div>
                </div>

                <div class="col-12 col-md-6">
                  <div class="form-group">
                    <label for="cardName" class="card-input__label">
                      {{ $t("address.cardHolder") }}
                    </label>
                    <input
                      :id="inputFields.cardName"
                      v-letter-only
                      type="text"
                      title="Name"
                      class="form-control"
                      :value="valueFields.cardName"
                      data-card-field
                      autocomplete="off"
                      @input="changeName"
                    />
                  </div>
                </div>

                <div class="col-4">
                  <div class="form-group">
                    <label
                      for="cardMonth"
                      class="card-input__label"
                      aria-label="Expiration Date"
                    >{{ $t("address.mounth") }}</label
                    >
                    <select
                      :id="inputFields.cardMonth"
                      v-model="valueFields.cardMonth"
                      class="form-control"
                      aria-label="Card Month"
                      :title="$t('address.mounth')"
                      data-card-field
                    >
                      <option value disabled selected>
                        {{ $t("address.mounth") }}
                      </option>
                      <option
                        v-for="n in 12"
                        :key="n"
                        :value="n < 10 ? `0${n}` : n"
                        :disabled="n < minCardMonth"
                      >
                        {{ generateMonthValue(n) }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-4">
                  <div class="form-group">
                    <label
                      for="cardYear"
                      class="card-input__label"
                      aria-label="Expiration Date"
                    >{{ $t("address.year") }}</label
                    >
                    <select
                      :id="inputFields.cardYear"
                      v-model="valueFields.cardYear"
                      class="form-control"
                      aria-label="Card year"
                      :title="$t('address.year')"
                      data-card-field
                    >
                      <option value disabled selected>
                        {{ $t("address.year") }}
                      </option>
                      <option
                        v-for="(n, $index) in 12"
                        :key="n"
                        :value="$index + minCardYear"
                      >
                        {{ $index + minCardYear }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-4">
                  <div class="form-group">
                    <div class="card-input">
                      <label
                        for="cardCvv"
                        class="card-input__label"
                        aria-label="Card CVV"
                      >CVV</label
                      >
                      <input
                        :id="inputFields.cardCvv"
                        v-number-only
                        type="tel"
                        title="CVV"
                        class="form-control"
                        maxlength="4"
                        :value="valueFields.cardCvv"
                        data-card-field
                        autocomplete="off"
                        @input="changeCvv"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <base-button-icon-1 :outline="true" :disabled="loadingAddCard" style="width: 80px;"   class="py-3 px-2"  @click="submit" >
                <span v-if="!loadingAddCard">{{ $t("common.save") }}</span>
                <b-spinner v-else variant="orange"
                /></base-button-icon-1>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <vue-paycard class="mb-2" :has-random-backgrounds="false" :value-fields="valueFields" />-->
  </div>
</template>

<script>
// import VuePaycard from "vue-paycard";

import { scrollTopHandler } from "~/utils";
import Api from "~/api";
import { mapGetters } from "vuex";
import BaseButtonIcon1 from '../common/BaseButtonIcon1.vue';

export default {
  components: {
    // VuePaycard,
    BaseButtonIcon1,
  },
  directives: {
    "number-only": {
      bind(el) {
        function checkValue(event) {
          event.target.value = event.target.value.replace(/[^0-9]/g, "");
          if (event.charCode >= 48 && event.charCode <= 57) {
            return true;
          }
          event.preventDefault();
        }

        el.addEventListener("keypress", checkValue);
      },
    },
    "letter-only": {
      bind(el) {
        function checkValue(event) {
          if (event.charCode >= 48 && event.charCode <= 57) {
            event.preventDefault();
          }
          return true;
        }

        el.addEventListener("keypress", checkValue);
      },
    },
  },
  props: {
    valueFields: {
      type: Object,
      default: {
        cardName: "",
        cardNumber: "",
        cardMonth: null,
        cardYear: null,
        cardCvv: null,
      },
    },
    inputFields: {
      type: Object,
      default: {
        cardNumber: "v-card-number",
        cardName: "v-card-name",
        cardMonth: "v-card-month",
        cardYear: "v-card-year",
        cardCvv: "v-card-cvv",
      },
    },
    labels: {
      type: Object,
      default: {
        cardName: "Full Name",
        cardHolder: "Card Holder",
        cardMonth: "MM",
        cardYear: "YY",
        cardExpires: "Expires",
        cardCvv: "CVV",
      },
    },
    isCardNumberMasked: {
      type: Boolean,
      default: true,
    },
    hasRandomBackgrounds: {
      type: Boolean,
      default: true,
    },
    backgroundImage: {
      type: [String, Number],
      default: "",
    },
    setType: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    loadingAddCard: false,
    valueFields: {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      default: 0,
    },
    minCardYear: new Date().getFullYear(),
    mainCardNumber: "",
    cardNumberMaxLength: 19,
    generatedType: "",
  }),
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),

    minCardMonth() {
      if (this.valueFields.cardYear === this.minCardYear) {
        return new Date().getMonth() + 1;
      }
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.valueFields.cardMonth < this.minCardMonth) {
        this.valueFields.cardMonth = "";
      }
    },
  },
  methods: {
    submit: function () {
      // this.$Progress.start();
      this.loadingAddCard = true;
      let dataForm = {
        card_name: this.valueFields.cardName,
        card_number: this.valueFields.cardNumber,
        expiry_month: this.valueFields.cardMonth,
        expiry_year: this.valueFields.cardYear,
        card_cvc: this.valueFields.cardCvv,
      };
      Api.post("/card/create", dataForm)
        .then((response) => {
          // scrollTopHandler();
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.data,
          });
          this.dataForm = {
            card_name: "",
            card_number: "",
            expiry_month: "",
            expiry_year: "",
            card_cvc: "",
            default: 0,
          };
          (this.valueFields = {
            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            default: 0,
          }),
            this.$emit("close");
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
        })
        .finally(() => {
          this.$emit("cardAdded",true)
          this.loadingAddCard = false;
        });

      // this.$Progress.finish();
    },
    changeName(e) {
      this.valueFields.cardName = e.target.value;
      this.$emit("input-card-name", this.valueFields.cardName);
    },
    changeType(val) {
      this.generatedType = val;
    },
    changeNumber(e) {
      this.valueFields.cardNumber = e.target.value;
      const value = this.valueFields.cardNumber.replace(/\D/g, "");
      // american express, 15 digits
      if (/^3[47]\d{0,13}$/.test(value)) {
        this.valueFields.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 17;
      } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
        // diner's club, 14 digits
        this.valueFields.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{6})/, "$1 $2 ");
        this.cardNumberMaxLength = 16;
      } else if (/^62[0-9]\d*/.test(value)) {
        this.valueFields.cardNumber = value
          .replace(/(\d{6})/, "$1 ")
          .replace(/(\d{6}) (\d{7})/, "$1 $2 ")
          .replace(/(\d{6}) (\d{7}) (\d{6})/, "$1 $2 $3 ")
          .replace(/(\d{5}) (\d{5}) (\d{5}) (\d{4})/, "$1 $2 $3 $4");
        this.cardNumberMaxLength = 21;
      } else if (/^\d{0,16}$/.test(value)) {
        // regular cc number, 16 digits
        this.valueFields.cardNumber = value
          .replace(/(\d{4})/, "$1 ")
          .replace(/(\d{4}) (\d{4})/, "$1 $2 ")
          .replace(/(\d{4}) (\d{4}) (\d{4})/, "$1 $2 $3 ");
        this.cardNumberMaxLength = 19;
      }

      if (e.inputType == "deleteContentBackward") {
        const lastChar = this.valueFields.cardNumber.substring(
          this.valueFields.cardNumber.length,
          this.valueFields.cardNumber.length - 1
        );

        if (lastChar == " ") {
          this.valueFields.cardNumber = this.valueFields.cardNumber.substring(
            0,
            this.valueFields.cardNumber.length - 1
          );
        }
      }
      this.$emit("input-card-number", this.valueFields.cardNumber);
    },
    changeMonth() {
      this.$emit("input-card-month", this.valueFields.cardMonth);
    },
    changeYear() {
      this.$emit("input-card-year", this.valueFields.cardYear);
    },
    changeCvv(e) {
      this.valueFields.cardCvv = e.target.value;
      this.$emit("input-card-cvv", this.valueFields.cardCvv);
    },
    generateMonthValue(n) {
      return n < 10 ? `0${n}` : n;
    },
    toggleMask() {
      this.isCardNumberMasked = !this.isCardNumberMasked;
      if (this.isCardNumberMasked) {
        this.maskCardNumber();
      } else {
        this.unMaskCardNumber();
      }
    },
    maskCardNumber() {
      this.valueFields.cardNumberNotMask = this.valueFields.cardNumber;
      this.mainCardNumber = this.valueFields.cardNumber;
      const arr = this.valueFields.cardNumber.split("");
      arr.forEach((element, index) => {
        if (index > 4 && index < 14 && element.trim() !== "") {
          arr[index] = "*";
        }
      });
      this.valueFields.cardNumber = arr.join("");
    },
    unMaskCardNumber() {
      this.valueFields.cardNumber = this.mainCardNumber;
    },
  },
};
</script>
<style scope>
</style>
