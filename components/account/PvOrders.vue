<template>
  <div class="order-content">
    <h3 class="account-sub-title d-md-block mt-0 pt-1 ml-1">
      {{
        $t("account.orders")
      }}
    </h3>
    <div class="row">
      <div class="col-md-3 col-12">
        <label>Order Status:</label>
        <AutoComplate
          placeholder="Order Status"
          :model="statusSorting"
          :defulte-name="statusSorting"
          :options="[
            { name: 'All', value: 'All'},
            { name: 'On Hold', value: 'On Hold' },
            { name: 'Pending Payment', value: 'Pending' },
            { name: 'Processing', value: 'Processing' },
            { name: 'Completed', value: 'Completed' },
            { name: 'Refunded', value: 'Refunded' },
            { name: 'Failed', value: 'Failed' },

          ]"
          @setValue="statusSorting = $event.value"
        />
      </div>
      <div class="col-md-3 col-12">
        <label>Payment Method:</label>
        <AutoComplate
          placeholder="Payment Method"
          :model="paymentMethodSorting"
          :defulte-name="paymentMethodSorting"
          :options="[
            { name: 'All', value: 'All'},
            { name: 'Paypal', value: 'Paypal'},
            { name: 'Transfer', value: 'Transfer' },
            { name: 'Credit / Debit Card', value: 'stripe' },
          ]"
          @setValue="paymentMethodSorting = $event.value"
        />
      </div>
      <div class="col-md-3 col-12">
        <label>Payment status:</label>
        <AutoComplate
          placeholder="Payment Status"
          :model="paymentStatusSorting"
          :defulte-name="paymentStatusSorting"
          :options="[
            { name: 'All', value: 'All'},
            { name: 'Paid', value: 'paid'},
            { name: 'Unpaid', value: 'unpaid' },
          ]"
          @setValue="paymentStatusSorting = $event.value"
        />
      </div>
      <div class="col-md-3 col-12">
        <label>Shipping Method:</label>
        <AutoComplate
          placeholder="Shipping Method"
          :model="shippingMethodSorting"
          :defulte-name="shippingMethodSorting"
          :options="[
            { name: 'All', value: 'All'},
            { name: 'Dhl', value: 'dhl'},
            { name: 'Aramex', value: 'aramex' },
            { name: 'Ups', value: 'ups' },
            { name: 'Fedex', value: 'fedex' },

          ]"
          @setValue="shippingMethodSorting = $event.value"
        />
      </div>
      <div class="col-md-3 col-12 mt-lg-2">
        <label>Date:</label>
        <div class="input-group" data-provide="datepicker">
          <input type="date" class="form-control"
                 @change="DateSorting($event)"
                 style="min-height: 50px"
                 @setValue="date = $event.value"
          >
        </div>
<!--        <AutoComplate-->
<!--          placeholder="Shipping Method"-->
<!--          :model="shippingMethodSorting"-->
<!--          :defulte-name="shippingMethodSorting"-->
<!--          :options="[-->
<!--            { name: 'All', value: 'All'},-->
<!--            { name: 'Dhl', value: 'dhl'},-->
<!--            { name: 'Aramex', value: 'aramex' },-->
<!--            { name: 'Ups', value: 'ups' },-->
<!--            { name: 'Fedex', value: 'fedex' },-->

<!--          ]"-->
<!--          @setValue="shippingMethodSorting = $event.value"-->
<!--        />-->
      </div>

      <div class="col-md-3 col-12 mt-lg-2">
        <label>Products:</label>
        <AutoComplate
          placeholder="Products"
          :model="ProductsArray"
          :defulte-name="ProductsArray"
          :options="productOptions"
          @setValue="productsSorting = $event.value"
        />
      </div>

      <div class="col-md-3 col-12 mt-lg-2">
        <label>Has Coupon:</label>
        <AutoComplate
          placeholder="Coupon"
          :model="hasCouponSorting"
          :defulte-name="hasCouponSorting"
          :options="[
            { name: 'All', value: 'All'},
            { name: 'Yes', value: 'Yes'},
            { name: 'No', value: 'No' },
          ]"
          @setValue="hasCouponSorting = $event.value"
        />
      </div>

      <div class="col-md-3 col-12 mt-lg-2">
        <label>Free Shipping</label>
        <AutoComplate
          placeholder="Free shipping"
          :model="hasFreeShippingSorting"
          :defulte-name="hasFreeShippingSorting"
          :options="[
            { name: 'All', value: 'All'},
            { name: 'Yes', value: 'Yes'},
            { name: 'No', value: 'No' },
          ]"
          @setValue="hasFreeShippingSorting = $event.value"
        />
      </div>
    </div>

    <div v-if="orders.length != 0" class="ordersList">
      <div class="table-responsive">
        <table class="table table-striped table-bordered" style="margin-bottom: 1rem;">
          <thead style="vertical-align: middle;text-align: center">
          <tr style="background-color: #3e3e3e">
            <th class="order-table-header">#</th>
            <th class="order-table-header">{{ $t("orders.orderId") }}</th>
            <th class="order-table-header">{{ $t("orders.orderDate") }}</th>
            <th class="order-table-header">{{ $t("orders.orderStatus") }}</th>
            <th class="order-table-header">{{ $t("orders.total") }}</th>
            <th class="order-table-header">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td class="created_at">{{index + 1}}</td>
            <td class="order_id">#{{ order.order_id }}</td>
            <td class="created_at">{{ order.created_at }}</td>
            <td class="order_status ">
                <span
                  :class="{
                    'text-success': order.status === 'Completed',
                    'text-info': order.status === 'Pending Payment' || order.status === 'On hold',
                    'text-danger': order.status === 'Canceled' || order.status === 'Refunded' || order.status === 'Failed',
                    'order-processing': order.status === 'Processing'
                  }"
                >
                  <i
                    :class="{
                      'fa fa-check': order.status === 'Completed',
                      'fa fa-hourglass-start':  order.status === 'Pending Payment' || order.status === 'On hold',
                      'fa fa-times-circle': order.status === 'Canceled' || order.status === 'Refunded' || order.status === 'Failed',
                      'fa fa-exclamation-triangle': order.status === 'On hold',
                      'fa fa-spinner':order.status === 'Processing'
                    }"
                  /> {{ order.status }}
                </span>
            </td>
            <td class="order_total">
              {{ order.total.value + order.total.currency }}
            </td>
            <td class="order_details">
              <button
                @click="changeTab('order-info', order)"
                :class="$route.query.tab === 'order-info' ? 'active' : 'btn btn-link py-sm-3 py-1 px-sm-4 px-1 order-details'"
              >
                {{ $t("account.orderDetils") }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <b-pagination
        v-if="total_pages > 1"
        v-model="page"
        :total-rows="total_pages"
        :per-page="1"
        pills
        size="lg"
        @input="changePage(page)"
      />
    </div>
    <div v-else-if="loadingOrders == true">
      <b-spinner variant="primary" label="Spinning" />
    </div>
    <div v-else-if="orders.length == 0 && loadingOrders == false">
      <div class="address-box">
        {{ $t("common.noAnyData") }}
      </div>
      <nuxt-link
        :to="getLink('/shop')"
        class="btn btn-orange px-6 py-3 link-to-tab">
        {{ $t("account.go_shop") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Api from "~/api";

import {mapActions, mapGetters} from "vuex";
import { scrollTopHandler } from "~/utils";
import BaseButtonIcon1 from '../common/BaseButtonIcon1.vue';
import AutoComplate from "~/components/common/AutoComplate.vue";

export default {
  components: {
    AutoComplate,
  },
  computed: {
    ...mapGetters("language", ["getLang"]),
    productOptions() {
      const options = [
        { name: 'All', value: 'All'},
        // Other static options
      ];
      this.productsArray.forEach((product) => {
        options.push({ name: product, value: product });
      });

      return options;
    }
  },
  watch: {
    statusSorting(newQuestion, oldQuestion) {
      this.getOrders();
    },
    paymentMethodSorting(){
      this.getOrders();
    },
    paymentStatusSorting(){
      this.getOrders()
    },
    shippingMethodSorting(){
      this.getOrders()
    },
    productsSorting(){
      this.getOrders()
    },
    hasCouponSorting(){
      this.getOrders()
    },
    hasFreeShippingSorting(){
      this.getOrders()
    },
    date(){
      this.getOrders()
    }

  },
  data() {
    return {
      statusSorting: 'All',
      paymentMethodSorting: 'All',
      paymentStatusSorting: 'All',
      shippingMethodSorting: 'All',
      productsSorting: 'All',
      hasCouponSorting: 'All',
      hasFreeShippingSorting: 'All',
      loadingOrders: false,
      date: '',
      orders: [],
      total_pages: 1,
      page: 1,
      selectedPage: 1,
      productsArray: [],
    };
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },
  created() {
    this.getOrders();
    this.getCartList();
  },

  methods: {
    ...mapActions("shop", ["getCartList"]),
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    DateSorting(event){
      const value = event.target.value;
      this.date = value;
    },
    getOrders() {
      this.loadingOrders = true;
      Api.get(`/user/orders?page=${this.selectedPage}&status=${this.statusSorting}&payment_method=${this.paymentMethodSorting}&payment_status=${this.paymentStatusSorting}
      &shipping_method=${this.shippingMethodSorting}&product=${this.productsSorting}&coupon=${this.hasCouponSorting}&free_shipping=${this.hasFreeShippingSorting}&date=${this.date}`)
        .then((response) => {
          this.total_pages = response.data.total_pages;
          this.orders = response.data.orders;

          const uniqueProducts = new Set(); // Create a Set to store unique products

          this.orders.forEach((order) => {
            order.products.forEach((product) => {
              uniqueProducts.add(product); // Add each products to the Set
            });
          });
          this.productsArray = Array.from(uniqueProducts); // Convert the Set back to an array

        })
        .catch((error) => ({ error: JSON.stringify(error) }))
        .finally(() => {
          this.loadingOrders = false;
        });
    },
    changeTab(query, item) {
      scrollTopHandler();
      this.$router.push({
        path: "/account",
        query: { tab: query, id: item.order_id },
      });
    },
    changePage(page) {
      this.selectedPage = page;
      this.getOrders();
      // this.queryFilter.page = page;
      scrollTopHandler();
    },
  },
};
</script>

<style>
.ordersList .card-body {
  padding: 0;
}
.order-table-header{
  font-weight: 900;
  font-size: 14px;
  color: white;
}
td.created_at{
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
  border-bottom: 3px solid #dee2e6
}
td.order_id{
  color: #556b2f ;
  text-align: center;
  vertical-align: middle;
  border-bottom: 3px solid #dee2e6
}
td.order_status{
  text-align: center;
  vertical-align: middle;
  border-bottom: 3px solid #dee2e6
}
.text-info{
  color: #34426A!important;
}
.text-danger{
  color: #f52020!important;
}
td.order_total{
  color: #f52020;
  text-align: center;
  vertical-align: middle!important;
  font-weight: bold;
  border-bottom: 3px solid #dee2e6
}
.order-details{
  background-color: #f07905;
  color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.order-details:hover{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
td.order_details{
  text-align: center;
  vertical-align: middle;
  border-bottom: 3px solid #dee2e6
}
.order-processing{
  color: #f07905;
}
</style>

