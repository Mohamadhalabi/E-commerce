<template>
  <div>
    <h3 class="account-sub-title d-md-block mt-0 pt-1 ml-1">
      {{ $t("account.wallet") }}
    </h3>
    <div class="row">
      <div class="col-md-3 col-12">
        <AutoComplate
          :placeholder="$t('home.orderBy')"
          :model="sortBy"
          :defulte-name="sortBy"
          :options="[
            { name: $t('home.newest'), value: 'oldest' },
            { name: $t('home.oldest'), value: 'newest' },
          ]"
          @setValue="sortBy = $event.value"
        />
      </div>
    </div>
    <div
      v-if="wallet.length != 0"
      class="table-container"
      style="overflow: scroll"
    >
      <table class="table table-striped mb-0 table-bordered" :class="{ 'text-right': getIsAr }">
        <thead>
          <tr style="background-color: #3e3e3e">
            <th class="wallet-table-header ">
              {{ $t("account.amount") }}
            </th>

            <th class="wallet-table-header ">
              {{ $t("account.status") }}
            </th>
            <th class="wallet-table-header ">
              {{ $t("account.order") }}
            </th>
            <th class="wallet-table-header ">
              {{ $t("orders.payment_method") }}
            </th>
            <th class="wallet-table-header ">
              Payment Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in wallet" :key="index">
            <td class="amount">
              <b> {{ item.amount }} $</b>
            </td>

            <td class="status">
              <b-badge :variant="statusItem(item)">
                {{ $t("orders." + item.status) }}
              </b-badge>
            </td>

            <td @click="goToOrder(item)" class="order">
              <a style="color: orange; cursor: pointer">{{ item.order }}</a>
            </td>

            <td class="payment_method">{{ $t("orders." + item.payment_method) }}</td>

            <td class="created_at_wallet">{{ item.created_at }}</td>

          </tr>
        </tbody>
      </table>

    </div>
    <b-pagination
          v-if="pageCount > 1"
          v-model="page"
          :total-rows="pageCount"
          :per-page="1"
          pills
          size="lg"
          @input="changePage(page)"
        />

    <div v-else-if="loadingOrders == true">
      <b-spinner variant="primary" label="Spinning" />
    </div>
    <div v-else-if="wallet.length == 0 && loadingOrders == false">
      <div class="address-box">
        {{ $t("common.noAnyData") }}
      </div>
      <nuxt-link to="/shop" class="btn btn-orange px-6 py-3 link-to-tab">
        {{ $t("account.go_shop") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>

import { scrollTopHandler } from "~/utils";
import { isEmpty } from "lodash";
import Api from "~/api";
import AutoComplate from "~/components/common/AutoComplate.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AutoComplate,
  },
  watch: {
    sortBy(newQuestion, oldQuestion) {
      this.getWallet();
    },
  },
  data: function () {
    return {
      loadingOrders: false,
      wallet: [],
      pageCount: 1,
      selectedPage: 1,
      sortBy: "newest",
      isEmpty,
      page: 1,
    };
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },
  created() {
    this.getWallet();

  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },

  methods: {
    getWallet () {
      this.loadingOrders = true;
      this.wallet = [];
      Api.get(`/user/wallet?page=${this.selectedPage}&sort=${this.sortBy}`)
        .then((response) => {
          this.wallet = response.data.wallet;
          this.pageCount = response.data.total_pages;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }))
        .finally(() => {
          this.loadingOrders = false;
        });
    },

    typeItem(item) {
      if (item.amount > 0 && item.status == "approve") {
        return "success";
      } else if (item.amount < 0 && item.status == "approve") {
        return "danger";
      } else if (item.status == "pending") {
        return "warning";
      }
    },

    statusItem(item) {
      if (item.status == "approve") {
        return "success";
      } else if (item.status == "pending") {
        return "primary";
      } else if (item.status == "cancelled") {
        return "danger";
      }
    },

    changePage(page) {
      this.selectedPage = page;
      scrollTopHandler();
      this.getWallet();
    },

    goToOrder(item) {
      this.$router.push({
        path: "/account",
        query: { tab: "order-info", id: item.order },
      });
    },
  },
};
</script>

<style scoped>
@media(max-width:400px){
  .table.table-striped td, .table.table-striped th {
     padding:5px !important;
  }
}
.wallet-table-header{
  color: white;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
}
.amount, .status, .order, .created_at_wallet, .payment_method{
  vertical-align: middle;
  text-align: center;
  border-bottom: 3px solid #dee2e6
}
.amount{
  color: #f52020;
  font-weight: bold;
}

</style>
