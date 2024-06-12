// store/language.js
export const state = () => ({
  languageCode: 'en' // Default language code
})

export const mutations = {
  setLanguageCode(state, code) {
    state.languageCode = code
  }
}

export const actions = {
  updateLanguageCode({ commit }, code) {
    commit('setLanguageCode',code)
  }
}

export const getters = {
  getLang: state => {
    return state.languageCode;
  }
}
