//state
export const state = () => ({
    orderId: null,
})

//getters
export const getters = {
    getLan: state => {
        return state.orderId;
    },


}

//mutations
export const mutations = {
    setOrderId: (state, payload) => {
        state.selectedLan = payload;
    }
}
