export const state = () => ({
  currency: 'USD'  // Default currency, will be overridden in nuxtServerInit or created() lifecycle hook
});

export const getters = {
  currency: state => state.currency
};

export const mutations = {
  setCurrencyValue: (state, currency) => {
    state.currency = currency;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const currency = app.$getCurrency(); // Get currency from cookies
    commit('setCurrencyValue', currency);
  },
  setCurrency({ commit }, currency) {
    commit('setCurrencyValue', currency);
    this.$setCurrency(currency);  // Set currency in cookies
  }
};
