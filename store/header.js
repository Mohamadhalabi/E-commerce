export const state = () => ({
  currency: "USD"
})

export const getters = {
  getCurrency: state => {
    return state.currency;
  },
};
export const mutations = {
  changeCurrency: (state, currency) => {
    state.currency = currency
  }
}
