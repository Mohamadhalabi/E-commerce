import Api from '~/api';
import { pick } from 'lodash';
import { commit } from "lodash/seq";

export const state = () => ({
  cartCount: 0,
  cartList: [],
  cartProductsPrice: 0,
  cartTotalDiscount: 0,
  cartPaymentPrice: 0,
  cartCurrency: null,
  dispaly: false,
  productStatus: null,
  productSku:"",
  displayOutOfStock: false,
  outOfStockList: [],
});

export const getters = {
  ProductStatus: state => {
    return state.productStatus
  },
  ProductSKU: state => {
    return state.productSku
  },
  cartCount: state => {
    return state.cartCount;
  },
  cartList: state => {
    return state.cartList;
  },

  displayOutOfStock: state => {
    return state.displayOutOfStock
  },
  outOfStockList: state => {
    return state.outOfStockList
  },
  cartProductsPrice: state => {
    return state.cartProductsPrice;
  },

  cartTotalDiscount: state => {
    return state.cartTotalDiscount;
  },

  cartPaymentPrice: state => {
    return state.cartPaymentPrice;
  },

  cartCurrency: state => {
    return state.cartCurrency;
  },

  getDisplay: state => {
    return state.dispaly;
  }
};

export const actions = {
  getCartList: async function ({ commit, dispatch }) {

    dispatch('UPDATE_CART_ACTION')

    if (localStorage.getItem('tokenEnded') == '1') {
      let cartList = JSON.parse(localStorage.getItem('card')) || [];
      let totalPrice = {
        currency: cartList[0] ? cartList[0]['price']['currency'] : null,
        value: 0
      };
      for (let index = 0; index < cartList.length; index++) {

        let quantity = parseFloat(cartList[index]['quantity']);
        let price = 0;
        if (parseFloat(cartList[index]['sale_price']['value']) <= parseFloat(cartList[index]['price']['value'])) {
          price = parseFloat(cartList[index]['sale_price']['value']);
        } else {
          price = parseFloat(cartList[index]['price']['value']);
        }
        totalPrice.value += price * quantity;
      }
      totalPrice.value = totalPrice.value.toString();

      let response = {
        discount_value: totalPrice,
        dolar_price: totalPrice,
        products: cartList,
        total: totalPrice,
        total_before_coupon: totalPrice
      };

      commit('UPDATE_CART', response);

    } else {
      let response = await Api.get('cart');
      await commit('UPDATE_CART', response.data);
    }
  },

  addToCart: async function ({ commit }, payload) {
    if (localStorage.getItem('tokenEnded') == 1) {
      if (!payload['quantity']) {
        payload['quantity'] = 1;
      }

      let cartListCheck = JSON.parse(localStorage.getItem('card')) || [];

      cartListCheck.forEach((item, index) => {

        if (item.slug == payload.slug) {

          cartListCheck.splice(index, 1);
          if(process.client)
          localStorage.setItem('card', JSON.stringify(cartListCheck));
        }
      })

      let cartList = JSON.parse(localStorage.getItem('card')) || [];
      let concateCard = cartList.concat([payload]);


      if(process.client)
      localStorage.setItem('card', JSON.stringify(concateCard));

      let totalPrice = {
        currency: concateCard[0]['price']['currency'],
        value: 0
      };

      for (let index = 0; index < concateCard.length; index++) {
        totalPrice.value += parseFloat(concateCard[index]['price']['value']) * parseFloat(concateCard[index]['quantity']);
      }
      totalPrice.value = totalPrice.value.toString();

      let response = {
        discount_value: totalPrice,
        dolar_price: totalPrice,
        products: concateCard,
        total: totalPrice,
        total_before_coupon: totalPrice
      };
      commit('UPDATE_CART', response);

      this._vm.$notify({
        group: 'addProduct',
        text: this.$i18n.t('alerts.addedToCart'),
        type: 'success',
        data: payload,
      });
      return;
    }
    if (localStorage.getItem('tokenEnded') == '1') return;

    payload.product = payload.sku;
    payload.quantity = payload.quantity || 1;
    let product = pick(payload, ['product', 'quantity', 'short_title', 'price', 'serial_number', 'gallery','cover_model']);

    Api.post('cart', product)
      .then(() => {
        let response = Api.get('cart');
        this._vm.$notify({
          group: 'addProduct',
          text: this.$i18n.t('alerts.addedToCart'),
          data: payload,
          type: 'success',
          position: 'top right',
        });
        response.then((res) => {
          commit('UPDATE_CART', res.data);
        });

      })
      .catch((error) => {
        let message = error.response.data.message;
        commit('UPDATE_PRODUCT_STATUS', error.response.data.message); // Add this line to update productStatus
        commit('UPDATE_PRODUCT_SKU', error.response.data.data.product_sku); // Add this line to update productStatus
        this._vm.$notify({
          group: 'errorMessage',
          text: message
        });
      });

  },

  changeQuantity: async function ({ commit, state }, payload) {
    if (localStorage.getItem('tokenEnded') == '1') {
      let product = payload.product;
      let cardItems = JSON.parse(localStorage.getItem('card')) || [];
      for (let item of cardItems) {
        if (item.slug == product.slug) {
          item.quantity = payload.quantity;
        }
      }

      let response = {
        discount_value: 0,
        dolar_price: 0,
        products: cardItems,
        total: state.cartPaymentPrice,
        total_before_coupon: 0
      };
      commit('UPDATE_CART', response);

      return;
    }

    let dataForm = {
      cart_id: payload.product.cart_id,
      quantity: payload.quantity
    };

    await commit('toggleDispaly');
    const res = await Api.post('cart/change-quantity', dataForm);
    let response = await Api.get('cart');
    await commit('UPDATE_CART', response.data);
    await commit('toggleDispaly');

  },

  clearCart: async function ({ commit }, payload) {
    if (localStorage.getItem("tokenEnded") === '1') {
      // Clear the cart in local storage
      if (process.client) {
        localStorage.removeItem('card');
      }
      // Reset the cart in the state
      commit('RESET_CART', []);
      // Notify the user
      // this._vm.$notify({
      //   group: 'addProduct',
      //   type: 'success',
      //   text: 'Your cart has been cleared',
      // });
    } else {
      // If the user is logged in, clear the cart on the server side
      try {
        await Api.post(`cart/empty/${payload.StateUser.id}`);
        // Reset the cart in the state
        commit('RESET_CART', []);
        // Notify the user
        this._vm.$notify({
          group: 'addProduct',
          type: 'success',
          text: this.$i18n.t('alerts.CartCleared'),
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error clearing cart on the server', error);
      }
    }
  },

  removeFromCart: async function ({ commit }, payload) {
    if (localStorage.getItem('tokenEnded') == '1') {
      let cartList = JSON.parse(localStorage.getItem('card'));
      cartList.splice(parseInt(payload.index), 1);
      if(process.client)
      localStorage.setItem('card', JSON.stringify(cartList));

      let totalPrice = {
        currency: cartList[0] ? cartList[0]['price']['currency'] : 0,
        value: 0
      };
      if (cartList.length == 0) {
        localStorage.removeItem('card');

        let response = {
          discount_value: {},
          dolar_price: {},
          products: [],
          total: {},
          total_before_coupon: {}
        };
        commit('UPDATE_CART', response);
        return;


      }
      for (let index = 0; index < cartList.length; index++) {
        totalPrice.value += parseFloat(cartList[index]['price']['value']) * parseFloat(cartList[index]['quantity']);
      }
      totalPrice.value = totalPrice.value.toString();
      let response = {
        discount_value: totalPrice,
        dolar_price: totalPrice,
        products: cartList,
        total: totalPrice,
        total_before_coupon: totalPrice
      };
      commit('UPDATE_CART', response);
      this._vm.$notify({
        group: 'addProduct',
        type: 'success',
        text: this.$i18n.t('alerts.RemovedFromCart'),
        data: payload.product
      });


    } else {
      await Api.post(`cart/${payload.product.cart_id}`);
      this._vm.$notify({
        group: 'addProduct',
        type: 'success',
        text: this.$i18n.t('alerts.RemovedFromCart'),
        data: payload.product,
      });
      let response = await Api.get('cart');
      await commit('UPDATE_CART', response.data);
    }
  },

  afterLogOutCart: async function ({ commit }, payload) {
    await commit('RESET_CART', []);
  },

  UPDATE_CART_ACTION: async function (state, payload) {
    let results = {
      products: [],
      total: 0,
      currency: '$'
    };
    //
    let cartCount = 0;
    payload = JSON.parse(localStorage.getItem('card'));
    let products = [];
    let currency = localStorage.getItem('currency') || "USD";
    for (let index = 0; index < payload.length; index++) {
      let item = payload[index];


      if (payload[index].price.currency != currency) {

        item = await Api.get(`products/${payload[index].slug}`).then((response) => {
          return response.data.product;
        })

        results.currency = item.price.currency
        item.quantity = payload[index]['quantity']
        item.cover_model = payload[index]['cover_model']
        item.serial_number = payload[index]['serial_number'];
        products.push(item)

      } else {
        item = payload[index];
        results.currency = item.price.currency
        item.quantity = payload[index]['quantity']
        products.push(item)
      }
    }

    if(process.client)
    localStorage.setItem('card', JSON.stringify(products));
    await commit('UPDATE_CART', products);

  }


};

export const mutations = {
  toggleDispaly: function (state) {
    state.dispaly = !state.dispaly;
  },

  UPDATE_PRODUCT_STATUS: function (state, newStatus) {
    state.productStatus = newStatus;
  },
  UPDATE_PRODUCT_SKU: function (state, newStatus) {
    state.productSku = newStatus;
  },
  UPDATE_CART: function (state, payload) {

    let countOutOfStock = 0;

    let OutOfStockSku = [];

    let results = {
      products: [],
      total: 0,
      currency: '$'
    };

    let cartCount = 0;
    for (let index = 0; index < payload.products.length; index++) {
      let currency = localStorage.getItem('currency') || "USD";
      cartCount = index +1



      let item = payload.products[index];
      results.currency = item.price.currency
      item.quantity = payload.products[index]['quantity']
      let price = parseFloat(item.price.value);
      if (parseFloat(item.price.value) > parseFloat(item.sale_price.value)) {
        price = parseFloat(item.sale_price.value);
      }


      if (item.offers != null && item.offers.length != 0) {
        for (let offer of item.offers) {

          if (offer.from <= item.quantity && offer.to >= item.quantity) {
            price = offer.price.value;
          }
        }
      }
      if(item.quantity > item.stock){
        countOutOfStock++
        OutOfStockSku.push(item.sku)
      }

      // item.sale_price['value']=price;
      item.priceitem = price;
      results.products.push(item);
      results.total += (price * item.quantity);
    }

    // items in the cart out of stock
    state.displayOutOfStock = countOutOfStock > 0;
    state.outOfStockList = OutOfStockSku;

    if(process.client)
    localStorage.setItem('card', JSON.stringify(results.products));

    state.cartCount = cartCount;
    state.cartList = results.products;
    state.cartCurrency = results.currency;
    state.cartProductsPrice = results.total;
    state.cartTotalDiscount = 0;
    state.cartPaymentPrice = results.total;
  },

  RESET_CART: function (state, payload) {
    state.cartCount = 0;
    state.cartList = payload;
    state.cartProductsPrice = 0;
    state.cartTotalDiscount = 0;
    state.cartPaymentPrice = 0;

  }


};
