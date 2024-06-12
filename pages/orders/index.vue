<template>
  <main class="main">
    <div
      class="text-left"
    >
      <div class="container">
        <h3>
          {{$t('orders.muOrder')}}
        </h3>

        <div class="ordersList">
          <b-card
            v-for="(order , index ) in orders"
            :key="index"
            class="pa-0"
          >
            <b-card-header class="pa-0">
              <div class="row justify-content-between">
                <div class="col-2">
                  <h6 class="mb-0">
                    {{$t('orders.orderDate')}}
                  </h6>
                  <label style="font-weight:400">{{order.created_at}}</label>
                </div>
                <div class="col-2">
                  <h6 class="mb-0">
                    {{$t('orders.orderStatus')}}
                  </h6>
                  <label style="font-weight:400">{{order.status}}</label>
                </div>
                <div class="col-2">
                  <h6 class="mb-0">
                    {{$t('orders.receiver')}}
                  </h6>
                  <label style="font-weight:400">-</label>
                </div>
                <div class="col-2">
                  <h6 class="mb-0">
                    {{$t('orders.total')}}
                  </h6>
                  <label
                    style="font-weight:400"
                    class="text-warning"
                  >{{order.total.value + order.total.currency}}</label>
                </div>
                <div class="col-2">
                  <button
                    class="btn btn-orange py-2 px-5"
                    @click="$router.push(`/orders/${ order.order_id}`)"
                  >
                    {{$t('orders.detalis')}}
                  </button>
                </div>
              </div>
            </b-card-header>
            <b-card-text class="pa-0">
              <div
                class="mx-4 my-4"
                style="border:1px solid #dbe3e5"
              >
                <div class="row px-5 py-5">
                  <div class="col-6">
                    <p
                      v-if="order.status=='Completed'"
                      class="text-success mb-1"
                    >
                      <i class="fa fa-check" /> {{order.status}}
                    </p>
                    <p
                      v-else-if="order.status=='Pending Payment'"
                      class="text-warning mb-1"
                    >
                      <i class="fa fa-spinner" /> {{order.status}}
                    </p>
                    <p
                      v-else-if="order.status=='Processing'"
                      class="text-warning mb-1"
                    >
                      <i class="fa fa-hourglass-start" /> {{order.status}}
                    </p>
                    <p
                      v-else-if="order.status=='Canceled'"
                      class="text-danger mb-1"
                    >
                      <i class="fa fa-times-circle" /> {{order.status}}
                    </p>
                    <p
                      v-else-if="order.status=='On hold'"
                      class="text-warning mb-1"
                    >
                      <i class="fa fa-exclamation-triangle" /> {{order.status}}
                    </p>
                  </div>
                  <div class="col-6">

                    <img
                      v-for="(image , indexImage) in order.images"
                      :key="indexImage"
                      :src="image.s.url"
                      class="d-inline-block img-thumbnail mx-auto mt-1"
                      width="50"
                    />

                  </div>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <b-card
          v-for="(order , index ) in orders"
          :key="index"
          class="pa-0"
        >
          <b-card-header class="pa-0">
            <div class="row justify-content-between">
              <div class="col-2">
                <h6 class="mb-0">
                  {{$t('orders.orderDate')}}
                </h6>
                <label style="font-weight:400">{{order.created_at}}</label>
              </div>
              <div class="col-2">
                <h6 class="mb-0">
                  {{$t('orders.orderStatus')}}
                </h6>
                <label style="font-weight:400">{{order.status}}</label>
              </div>
              <div class="col-2">
                <h6 class="mb-0">
                  {{$t('orders.receiver')}}
                </h6>
                <label style="font-weight:400"></label>
              </div>
              <div class="col-2">
                <h6 class="mb-0">
                  {{$t('orders.total')}}
                </h6>
                <label
                  style="font-weight:400"
                  class="text-warning"
                >{{order.total.value + order.total.currency}}</label>
              </div>
              <div class="col-2">
                <button
                  class="btn btn-orange py-2"
                  @click="$router.push(`/orders/${ order.order_id}`)"
                >
                  {{$t('orders.detalis')}}
                </button>
              </div>
            </div>
          </b-card-header>
          <b-card-text class="pa-0">
            <div
              class="mx-4 my-4"
              style="border:1px solid #dbe3e5"
            >
              <div class="row px-5 py-5">
                <div class="col-6">
                  <p
                    v-if="order.status=='Completed'"
                    class="text-success mb-1"
                  >
                    <i class="fa fa-check" /> {{order.status}}
                  </p>
                  <p
                    v-else-if="order.status=='Pending Payment'"
                    class="text-warning mb-1"
                  >
                    <i class="fa fa-spinner" /> {{order.status}}
                  </p>
                  <p
                    v-else-if="order.status=='Canceled'"
                    class="text-danger mb-1"
                  >
                    <i class="fa fa-times-circle" /> {{order.status}}
                  </p>
                  <p
                    v-else-if="order.status=='On hold'"
                    class="text-warning mb-1"
                  >
                    <i class="fa fa-exclamation-triangle" /> {{order.status}}
                  </p>
                </div>
                <div class="col-6">
                  <img
                    src="https://tlk.esg-s.com/storage/facetofacce.png"
                    class="d-inline-block img-thumbnail mx-auto mt-1"
                    width="50"
                  >
                  <img
                    src="https://tlk.esg-s.com/storage/facetofacce.png"
                    class="d-inline-block img-thumbnail mx-auto mt-1"
                    width="50"
                  >
                </div>
              </div>
            </div>
          </b-card-text>

          <!-- <b-card-text>A second paragraph of text in the card.</b-card-text> -->
        </b-card>
      </div>
    </div>
    </div>
  </main>
</template>

<script>
import Api from '~/api';
export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      Api.get('/user/orders')
        .then(response => {
          this.orders = response.data.orders;
        })
        .catch(error => ({error: JSON.stringify(error)}));
    }
  }
};
</script>

<style>
    .ordersList .card-body {
        padding: 0;
    }
</style>
