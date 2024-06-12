import createPersistedState from 'vuex-persistedstate';

export default function({store}) {
  let storage = localStorage.getItem('tlkeys');

  window.onNuxtReady(() => {
    createPersistedState({
      key: 'tlkeys',
      paths: ['auth', 'cart', 'wishlist']
    })(store);
  });
}
