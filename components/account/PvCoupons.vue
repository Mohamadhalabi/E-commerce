<template>
  <div>
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      {{
        $t("account.coupons")
      }}
    </h3>
    <!--
    <div v-if="coupons.length != 0">
      <div class="row" :class="{ 'text-right': getIsAr }">
        <div
          v-for="(coupon, index) in coupons"
          :key="index"
          class="col-lg-6 mb-3 d-flex w-100"
        >



          <div
            :class="`couponClass ${
              coupon.is_available ? ` border-warning ` : ` border-danger `
            }`"
          >
          </div>



        </div>
      </div>
    </div>




  </div> -->

    <section v-if="coupons.length != 0" id="labels">
      <div class="row">
        <div
          v-for="(coupon, index) in coupons"
          :key="index"
          class="col-sm-6 col-md-4 mb-3 col-equal position-relative"
        >
          <span  style="z-index: 10; top:0px; left: 0px;" class="ava text-center position-absolute mx-5 my-2 " v-if="coupon.used == 0">
            {{ $t("common.notAvailable") }}
          </span>
          <span
           style="z-index: 10; top:0px; left: 0px;"
            class="ava text-center position-absolute mx-5 my-2"
            v-if="coupon.used != 0"
            >{{ $t("common.available") }}</span
          >
          <div
            :class="{ notAvailable: coupon.used == 0 }"
            style="border: 3px dashed #ff7618"
            class="dl py-5 bg-light rounded-5 shadow position-relative"
          >
            <div class="brand mt-2 text-center">

              <h2>{{ coupon.coupon_type }}</h2>
            </div>

            <div class="text-center bg-white">
              <h3 :class="{ 'off-animatin': coupon.used > 0 }" class="m-0">
                {{ coupon.discount }}
                <span v-text="coupon.discount_type == 'Amount' ? '$' : '%'" />
                <span class="d-block">off</span>
              </h3>
            </div>

            <div class="px-4">
              <p class="mb-0 mt-3">
                <b style="color: #ff7618"
                  >{{ $t("coupon.Thenumberofusesavailable") }} : </b
                >{{ coupon.used }}
              </p>
              <p class="mb-0">
                <b style="color: #ff7618"
                  >{{ $t("coupon.count_available") }} : </b
                >{{ coupon.count_available }}
              </p>
            </div>

            <div class="px-4">
              <p class="mb-0">
                <b style="color: #ff7618">{{ $t("coupon.ends_at") }} : </b
                >{{ coupon.ends_at }}
              </p>
            </div>

            <div class="px-4">
              <p class="mb-0" v-if="coupon.orders.length > 0">
                <b>{{ $t("coupon.orders") }} </b>
                <b-badge
                  variant="warning"
                  class="text-light mr-1 ml-1 cursor-pointer"
                  @click="goToOrder(order)"
                  v-for="(order, index) in coupon.orders"
                  :key="index"
                  >{{ order }}
                </b-badge>
              </p>
            </div>

            <h6 class=" mt-3 mb-0 w-100 text-center">{{ $t('common.couponCode') }}</h6>

            <div
              class="border mt-1 rounded-5 mx-3 bg-white py-3 px-4 d-flex align-items-center justify-content-between"
            >

              <!-- <h5 class="mb-0">
                {{ coupon.coupon_code }}
              </h5> -->
              <input readonly id="couponCode" class="w-100 text-center" :value="coupon.coupon_code" type="text" :placeholder="coupon.coupon_code">

              <copy-button :code="coupon.coupon_code" :useCounter="coupon.used"></copy-button>

             <!--  <div class="d-flex align-items-center flex-column">

                <span
                  v-if="!isCopied"
                  @click="handleCopy"
                  :class="{ poiter: coupon.used > 0 }"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 96 960 960"
                    width="25"
                  >
                    <path
                      d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z"
                    />
                  </svg>
                </span>

                <span
                  @click="handleCopy"
                  v-if="isCopied"
                  :class="{ poiter: coupon.used > 0 }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 96 960 960"
                    width="25"
                  >
                    <path
                      d="M294 814 70 590l43-43 181 181 43 43-43 43Zm170 0L240 590l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z"
                    />
                  </svg>
                </span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-else-if="loadingOrders == true">
      <b-spinner variant="primary" label="Spinning" />
    </div>

    <div
      class="d-flex align-items-center flex-column"
      v-else-if="coupons.length == 0 && loadingOrders == false"
    >
      <div class="address-box s text-center">
        {{ $t("common.noCoupons") }}
      </div>
      <nuxt-link to="/shop">
        <base-button-icon-1 class="py-4" style="width: 150px" :outline="true">
          {{ $t("account.go_shop") }}
        </base-button-icon-1>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { scrollTopHandler } from "~/utils";
import { isEmpty } from "lodash";
import Api from "~/api";
import { mapGetters } from "vuex";
import BaseButtonIcon1 from "../common/BaseButtonIcon1.vue";
import CopyButton from '../common/CopyButton.vue'

export default {
  components: { BaseButtonIcon1, CopyButton },
  data: function () {
    return {
      loadingOrders: false,
      coupons: [],
      isEmpty,


    };
  },

  created() {
    this.getCoupons();
  },

  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[
        this.$i18n.locale
      ],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    };
  },

  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
    isCopied() {
      return this.copied;
    },
  },


  methods: {
    handleCopy() {
      this.copied = !this.copied;
      setTimeout(() => {
        this.copied=false
      },1000)
    },

    getCoupons: function () {
      this.coupons = [];
      this.loadingOrders = true;
      Api.get("/user/coupons")
        .then((response) => {
          this.coupons = response.data.coupons;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }))
        .finally(() => {
          this.loadingOrders = false;
        });
    },

    goToOrder(item) {
      this.$router.push({
        path: "/account",
        query: { tab: "order-info", id: item },
      });
    },
  },
};
</script>
<style>
.notAvailable {
  border: 3px dashed #ff0f0f !important;
  opacity: 0.5 !important;
}
#couponCode{
  border: none;
  outline: none;
}
#couponCode:focus{
  outline: none !important;
}


</style>
