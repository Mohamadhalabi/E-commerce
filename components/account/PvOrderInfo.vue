<template>
  <div class="order-content ordersDiatlsConatiner">
    <h3 class="account-sub-title  d-md-block mt-0 pt-1 ml-1">
      <i class="sicon-basket align-middle mr-3 pr-1"/>{{
        $t("account.orderDetils")
      }}
    </h3>

    <div class="ordersList rounded">


      <div v-if="order" class="ordersList ordersDiatls rounded">
        <b-card class="pa-0 rounded">
          <b-card-header class="pa-0 rounded">
            <div class="row justify-content-between">
              <div class="col-12 col-md-10">
                <span class="text-warning"
                ><i
                  style="
                      border: 1px solid rgb(219, 219, 219);
                      background: rgb(255, 255, 255);
                      height: 45px;
                      width: 45px;
                      text-align: center;
                      display: inline-block;
                      margin: auto;
                      line-height: 45px;
                      border-radius: 50%;
                    "
                  class="fa fa-box fa-lg"
                  orange
                /></span>
                <label
                  class="orderId"
                  style="position: relative; top: 5px; left: 10px"
                >{{ $t("orders.orderId") }}<br/>
                  <span style="font-weight: 400">{{
                      order.order_id
                    }}</span></label
                >
                <span
                  class="d-md-inline-block d-none orderCargo"
                  style="
                    height: 35px;
                    position: relative;
                    top: 7px;
                    left: 15px;
                    border-left: 1px solid #aaa;
                  "
                />
                <label style="position: relative; left: 10px; top: 6px"
                >{{ $t("orders.cargoCompany") }}<br/>
                  <span
                    style="font-weight: 400"
                    v-text="
                      order.shipping_method
                        ? order.shipping_method
                        : $t('common.notAvailable')
                    "
                  /></label>

                <span
                  v-if="order.created_at"
                  class="d-md-inline-block d-none orderCargo"
                  style="
                    height: 35px;
                    position: relative;
                    top: 7px;
                    left: 15px;
                    border-left: 1px solid #aaa;
                  "
                />
                <label style="position: relative; left: 10px; top: 6px"
                >{{ $t("orders.created_at") }}<br/>
                  <span
                    style="font-weight: 400"
                    @click="window.open('#', '_blank')"
                    v-text="order.created_at"
                  /></label>

                <span
                  v-if="order.weight || order.type == 'pin_code'"
                  class="d-md-inline-block d-none orderCargo"
                  style="
                    height: 35px;
                    position: relative;
                    top: 7px;
                    left: 15px;
                    border-left: 1px solid #aaa;
                  "
                />

                <label
                  class="orderId"
                  style="position: relative; top: 5px; left: 10px"
                >{{ $t("orders.orderStatus") }}<br/>

                  <label
                    v-if="order.status == 'Completed'"
                    class="text-success mb-1"
                  >
                    <i class="fa fa-check"/> {{ order.status }}
                  </label>
                  <label
                    v-else-if="order.status == 'Processing'"
                    class="text-warning mb-1"
                  >
                    <i class="fa fa-hourglass-start"/> {{ order.status }}
                  </label>
                  <label
                    v-else-if="order.status == 'Pending Payment'"
                    class="text-warning mb-1"
                  >
                    <i class="fa fa-spinner"/> {{ order.status }}
                  </label>
                  <label
                    v-else-if="order.status == 'Canceled'"
                    class="text-danger mb-1"
                  >
                    <i class="fa fa-times-circle"/> {{ order.status }}
                  </label>
                  <label
                    v-else-if="order.status == 'Refunded'"
                    class="text-danger mb-1"
                  >
                    <i class="fa fa-times-circle"/> {{ order.status }}
                  </label>
                  <label
                    v-else-if="order.status == 'Failed'"
                    class="text-danger mb-1"
                  >
                    <i class="fa fa-exclamation"/> {{ order.status }}
                  </label>
                  <label
                    v-else-if="order.status == 'On hold'"
                    class="text-warning mb-1"
                  >
                    <i class="fa fa-exclamation-triangle"/> {{ order.status }}
                  </label>
                </label>

                <span
                  v-if="order.weight && order.weight != 0"
                  class="d-md-inline-block d-none orderCargo"
                  style="
                    height: 35px;
                    position: relative;
                    top: 7px;
                    left: 15px;
                    border-left: 1px solid #aaa;
                  "
                />

                <label
                  v-if="order.weight && order.weight != 0"
                  style="position: relative; left: 10px; top: 6px"
                >{{ $t("orders.weight") }}<br/>
                  <span style="font-weight: 400" v-text="`${order.weight} KG`"
                  /></label>
              </div>

              <div
                v-if="order.type == 'order'"
                class="col-12 col-md-2 text-right"
              >
                <a
                  target="_blank"
                  style="text-decoration: none"
                  :href="`${order.print}`"
                  class="btn btn-warning text-light py-2 mt-1 px-3"
                >
                  <i class="sicon-printer"/>
                  {{ $t("orders.download") }}
                </a>
              </div>
            </div>
            <div class="col-12" :if="order.status != 'Failed'">

              <div class="bs-stepper">
                <div class="bs-stepper-header " role="tablist">
                  <!-- your steps here -->
                  <div class="step  ">
                  <span class="step-trigger">
                    <span :class="`bs-stepper-circle ${order.order_status >= 1 ? 'bg-warning' : ''}` " ><i class="fa fa-clock"></i></span>
                    <span class="bs-stepper-label">{{$t('orders.on_hold')}}</span>
                  </span>
                  </div>
                  <div :class="`line ${order.order_status > 1 ? 'bg-warning' : ''}` "></div>


                  <div class="step  ">
            <span class="step-trigger" role="tab1">
              <span :class="`bs-stepper-circle ${order.order_status > 1 ? 'bg-warning' : ''}`"><i class="fa fa-box"></i></span>
              <span class="bs-stepper-label">{{$t('orders.processing')}}</span>
            </span>
                  </div>
                  <div :class="`line ${order.order_status > 2 ? 'bg-warning' : ''}`"></div>
                  <div class="step">
            <span class="step-trigger" role="tab2">
              <span :class="`bs-stepper-circle ${order.order_status > 2 ? 'bg-warning' : ''}`"><i class="fa fa-check"></i></span>
              <span class="bs-stepper-label"> {{$t('orders.complete')}}</span>
            </span>
                  </div>
                </div>

              </div>
            </div>
          </b-card-header>

          <b-card-text class="p-0 rounded">
            <div class="m-4 p-2">
              <p v-if="order.note && order.type == 'order'" class="w-100">
                <b>{{ $t("orders.note") }} : </b>{{ order.note }}
              </p>
            </div>

            <div class="m-4 p-2">
              <div class="row">
                <div
                  v-for="(product, index) in order_products"
                  :key="product.id"
                  class="col-12"
                >
                  <div
                    style="border: 1px solid #dbe3e5; border-radius: 5px"
                    class="p-2 mb-2"
                  >
                    <div v-if="!product.brand" class="row px-2 py-2">
                      <div class="col-2 m-auto">
                        <nuxt-link :to="getLink(`/products/${product.slug}`)">
                          <img
                            loading="lazy"
                            :src="product.gallery[0]['l']['url']"
                            class="d-inline-block border-0 img-thumbnail"
                            width="100%"
                          />
                        </nuxt-link>
                      </div>
                      <div
                        class="col-10 m-auto"
                      >
                        <h4
                          v-if="product.title"
                          style="cursor: pointer;font-size: 18px"
                          @click="$router.push(`/products/${product.slug}`)"
                        >
                          {{ product.title }}
                        </h4>
                        <p class="sku-color mb-0" style="font-size: 14px;">
                          {{ $t("products.sku") }} : {{ product.sku }}
                        </p>
                        <h6 v-if="product.price" class="mt-1 mb-0 price-color" style="font-size: 16px">
                          {{ $t("products.PRICE") }} : {{ product.price.value }}
                          {{ product.price.currency }}
                        </h6>
                        <p>
                          <div
                            :class="{
                            'category-list': wrapper,
                            'text-right': getIsAr,
                          }"
                            :style="!wrapper ? 'display: inline-block;' : ''"
                          >
                            <nuxt-link
                              id="categoryLink"
                              :to="getLink('/'+product.categories[product.categories.length - 1].slug)"
                            >
                              <p class="m-0 font-weight-bold">
                                {{ product.categories[product.categories.length - 1].name }}
                              </p>
                            </nuxt-link>
                          </div>
                        </p>
                        <h6 v-if="product.quantity" class="m-0 mt-1">
                          {{ $t("orders.quantity") }} :
                          {{ product.quantity }}
                        </h6>
                        <h6
                          v-if="
                            product.serial_numbers &&
                            product.serial_numbers.length != 0
                          "
                        >
                          {{ $t("products.serial_numbers") }} :
                          <b-badge
                            variant="warning"
                            class="text-light mr-1"
                            v-for="(
                              serial_number, index
                            ) in product.serial_numbers"
                            v-text="serial_number"
                            :key="index"
                          />
                        </h6>
                        <h6 v-else-if="order.type == 'pin_code'" class="mb-1">
                          {{
                            `${product["brand"]} ${product["serial_number"]}`
                          }}
                        </h6>
                      </div>
                    </div>
                    <div v-else class="px-2">
                      <div class="row">
                        <div class="col-6">
                          <p class="mb-1">
                            <b>{{ $t("orders.serialNumber") }} : </b>
                            <span>{{ product.serial_number }}</span>
                          </p>
                        </div>
                        <div class="col-6">
                          <p class="mb-1">
                            <b>{{ $t("orders.ContactChannel") }} : </b>
                            <span>{{ product.contact_channel }}</span>
                          </p>
                          <p class="mb-1">
                            <b>{{ $t("orders.ContactValue") }} : </b>
                            <span>{{ product.contact_value }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div v-if="order.type == 'order'" class="col-md-6 col-sm-12">
                  <b-card class="pa-0" style="border-radius: 5px">
                    <b-card-header class="pa-0">
                      {{ $t("orders.deliveryInformation") }}
                    </b-card-header>
                    <b-card-text v-if="order.type == 'order'" class="px-4 py-2">
                      <div class="mt-1">
                        <p
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span>{{ $t("orders.cargoCompany") }} </span>
                          <b class="float-right text-capitalize">{{
                              order.shipping_method
                                ? order.shipping_method
                                : $t("common.notAvailable")
                            }}</b>
                        </p>
                        <p
                          v-if="order.tracking_no"
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span>{{ $t("orders.tracking_no") }} </span>
                          <b class="float-right">{{ order.tracking_no }}</b>
                        </p>
                        <p
                          v-if="order.address.country"
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span>{{ $t("orders.country") }} </span>
                          <b class="float-right">{{ order.address.country }}</b>
                        </p>
                        <p
                          v-if="order.address.city"
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span>{{ $t("orders.city") }} </span>
                          <b class="float-right">{{ order.address.city }}</b>
                        </p>
                        <p
                          v-if="order.address.phone"
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span>{{ $t("orders.phone") }} </span>
                          <b class="float-right">{{ order.address.phone }}</b>
                        </p>
                        <p
                          v-if="order.address.postal_code"
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span>{{ $t("orders.postal_code") }} </span>
                          <b class="float-right">{{
                              order.address.postal_code
                            }}</b>
                        </p>
                        <p v-if="order.address.address" class="pb-0">
                          <span>{{ $t("orders.address") }} </span>
                          <b class="float-right">{{ order.address.address }}</b>
                        </p>
                      </div>
                    </b-card-text>
                    <b-card-text v-else class="px-4 py-2">
                      <p class="text-center mt-3">
                        {{ $t("common.notAvailable") }}
                      </p>
                    </b-card-text>
                  </b-card>
                </div>

                <div
                  :class="
                    order.type == 'order'
                      ? 'col-md-6  col-sm-12'
                      : 'col-md-12  col-sm-12'
                  "
                >
                  <b-card class="pa-0" style="border-radius: 5px">
                    <b-card-header class="pa-0" style="text-transform: unset">
                      <div class="row">
                        <span class="col">{{
                            $t("orders.paymentInformation")
                          }}</span>
                        <span
                          v-if="order.payment_method"
                          class="col text-right text-black-50"
                        >{{ $t("orders.payment_method") }} :
                          {{ order.payment_method }}</span
                        >
                      </div>
                    </b-card-header>
                    <b-card-text class="px-4 py-2">
                      <div class="mt-1">
                        <p
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                        >
                          <span v-if="order.type == 'order'"
                          >{{ $t("orders.productTotal") }}
                          </span>
                          <span v-if="order.type == 'pin_code'"
                          >{{ $t("orders.pin_code") }}
                          </span>

                          <b class="float-right">{{
                              `${order.sub_total.value} ${order.sub_total.currency}`
                            }}</b>
                        </p>

                        <p
                          v-if="order.coupon_value.value > 0"
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3 text-success"
                        >
                          <span class="font-weight-bold"
                          >{{ $t("orders.coupon") }}
                            <b v-if="order.coupon"> ({{ order.coupon }} )</b>
                          </span>
                          <b class="float-right">{{
                              `${order.coupon_value.value} ${order.coupon_value.currency}`
                            }}</b>
                        </p>
                        <p
                          style="border-bottom: 1px solid #f5f5f5"
                          class="mb-1 pb-3"
                          v-if="order.type == 'order'"
                        >
                          <span>{{ $t("orders.shippingAmount") }} </span>
                          <b
                            v-if="order.shipping.value != 0"
                            class="float-right"
                          >{{
                              `${order.shipping.value} ${order.shipping.currency}`
                            }}</b
                          >
                          <b
                            v-if="order.shipping.value == 0"
                            class="float-right text-danger"
                          >{{ $t("orders.free_shipping") }}</b
                          >
                        </p>
                        <p class="mb-1 text-dark">
                          <b>{{ $t("orders.total") }} </b>
                          <b class="float-right">{{
                              `${order.total.value} ${order.shipping.currency}`
                            }}</b>
                        </p>
                      </div>
                    </b-card-text>
                  </b-card>
                </div>
                <div class="col-sm-12">
                  <b-card class="pa-0" style="border-radius: 5px">
                    <b-card-header class="pa-0">
                      <div class="row">
                        <span class="col">{{
                            $t("orders.paymentHistory")
                          }}</span>
                        <span class="text-right col">{{
                            order.payment_status
                          }}</span>
                      </div>
                    </b-card-header>
                      <div class="row">
                        <div class="col">
                          <table class="w-100 table table-striped table-hover">
                            <thead style="">
                            <tr class="text-center bg-warning text-light">
                              <th class="py-4 px-1">
                                {{ $t("orders.paymentMethod") }}
                              </th>
                              <th class="py-4 px-1">
                                {{ $t("orders.details") }}
                              </th>
                              <th class="py-4 px-1">
                                {{ $t("orders.status") }}
                              </th>
                              <th class="py-4 px-1">
                                {{ $t("orders.created_at") }}
                              </th>
                              <th class="py-4 px-1 text-right pr-3">
                                {{ $t("orders.amount") }}
                              </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                              v-for="(payment, index) in payment_history"
                              :key="index"
                              class="text-center"
                            >
                              <td class="py-4 px-1">
                                {{ $t("orders." + payment.payment_method) }}
                              </td>
                              <td v-if="payment.details" class="py-4 px-1">
                                <a
                                  target="_blank"
                                  style="font-size: 10px"
                                  :href="payment.details.strip_link"
                                >{{ payment.details.strip_link }}</a
                                >
                              </td>
                              <td v-else class="py-4 px-1">
                                <span>{{ $t("orders.noInfo") }}</span>
                              </td>
                              <td class="py-4 px-1">
                                {{ payment.status }}
                              </td>
                              <td class="py-4 px-1">
                                {{ payment.created_at }}
                              </td>

                              <td class="py-4 px-1 text-right pr-3">
                                  <span
                                    v-if="payment.amount.value > 0"
                                    class="text-success"
                                  >
                                    {{
                                      `${payment.amount.value} ${payment.amount.currency}`
                                    }}</span
                                  >
                                <span
                                  v-if="payment.amount.value < 0"
                                  class="text-danger"
                                >
                                    {{
                                    `${payment.amount.value} ${payment.amount.currency}`
                                  }}</span
                                >
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                  </b-card>
                </div>
              </div>
            </div>
          </b-card-text>
        </b-card>
      </div>

      <b-modal
        id="modal-form-invice"
        ref="modal"
        title="Enter your email to which the invoice will be sent"
        hide-footer
      >
        <b-form-group
          label="Email"
          label-for="email-input"
          invalid-feedback="Email is required"
        >
          <b-form-input v-model="email" required/>
          <pv-error :error-msg="errorMsg.email"/>
        </b-form-group>
        <button
          class="btn btn-primary float-right py-3 px-3"
          @click="sendInvoice"
        >
          {{ $t("contact.sendTicket") }}
        </button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Api from "~/api";

import PvError from "~/components/common/ErrorMessage.vue";
import {mapGetters} from "vuex";

export default {
  components: {
    PvError,
  },
  data() {
    return {
      email: "",
      order: null,

      order_products: [],
      payment_history: null,
      errorMsg: {
        email: [],
      },
    };
  },
  created() {

    this.getOrderInfo();

  },
  head() {
    return {
      titleTemplate: `${this.$t("account.orderDetils")} ${this.$route.query.id}`,
      title: `${this.$t("account.orderDetils")} ${this.$route.query.id}`
    }
  },
  computed:{
    ...mapGetters("language", ["getLang"])
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    getOrderInfo() {
      // this.$Progress.start();
      Api.get(`/user/orders/${this.$route.query.id}`)
        .then((response) => {
          this.order = response.data.order;

          if (response.data.order_products.length > 0) {
            this.order_products = response.data.order_products;
          } else {
            this.order_products.push(response.data.order_products);
          }
          this.payment_history = response.data.payment_history;
          // this.$Progress.finish();
        })
        .catch((error) => ({error: JSON.stringify(error)}));
    },
    sendInvoice() {
      Api.post(`/user/orders/send_invoice/${this.$route.query.id}`, {
        email: this.email,
      })
        .then((response) => {
          this.$notify({
            group: "custom-notify",
            type: "success",
            text: response.data.message,
          });

          this.$bvModal.hide("modal-form-invice");
        })
        .catch((err) => {
          this.errorMsg = err.response.data.data;
        });
    },
  },
};
</script>

<style>
.ordersList .card-body {
  padding: 0;
}
.bg-warning{
  background-color: #f07905!important;
}
.btn-warning:hover{
  background-color: #f07905!important;
}
</style>

