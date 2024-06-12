export const state = () => ({
  selectedLan: 'en',
  isAr: false
})

// getters
export const getters = {
  getLan: state => {
    return state.selectedLan;
  },
  getIsAr: state => {
    return state.isAr;
  }
}

// mutations
export const mutations = {
  setLan: (state, payload) => {
    state.selectedLan = payload;
    state.isAr = payload === 'ar'; // Set isAr based on the selected language
  }
}

// actions
export const actions = {
  // Call this action from your component's created hook to set the language based on the URL
  setLanguageFromURL({ commit }) {
    // Check if running on the client side
    if (process.client) {
      const path = window.location.pathname; // Get the current path from the URL
      const isArabic = path.includes('/ar'); // Check if "/ar" is in the path

      if (isArabic) {
        commit('setLan', 'ar'); // Set language to 'ar' and isAr to true
      } else {
        commit('setLan', 'en'); // Set language to 'en' and isAr to false
      }
    }
  }
}
