<template>
  <main class="main">
    <div
      class="text-left"
    >
      <div class="container">
        <h3>
          {{$t('orders.orderDetails')}}
        </h3>

        
      </div>
    </div>
  </main>
</template>

<script>
import Api from '~/api';
export default {
  data() {
    return {
      order: null,
      order_products: [],
      payment_history: null
    };
  },
  created() {
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      Api.get(`/user/orders/${this.$route.params.id}`)
        .then(response => {
          this.order = response.data.order;
          //   order_products

          if(response.data.order_products.length > 0) {
            this.order_products = response.data.order_products;
          } else {
            this.order_products.push(response.data.order_products);
          }
          this.payment_history = response.data.payment_history;
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
