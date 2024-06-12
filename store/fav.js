import Api from '~/api';

export const state = () => ({
  count: 0,
  list: [],
  total: 0,
});

export const getters = {
  getWishlistCounts: state => {
    return state.count;
  },
  getWishlistList: state => {
    return state.list;
  },
  getWishlistTotal: state => {
    return state.total
  }
};

export const actions = {
  fetchWishlist: async function ({ commit }) {
    if (localStorage.getItem('tokenEnded') == '1') {
      let washList = JSON.parse(localStorage.getItem('wash')) || [];
      commit('UPDATE_WISHLIST', washList);
      return;
    };
    const response = await Api.get('wishlist');
    await commit('UPDATE_WISHLIST', response.data.Wishlist);
  },

  addToWishlist: async function ({ commit, state }, payload) {

    if (localStorage.getItem('tokenEnded') == 1) {
      let washList = JSON.parse(localStorage.getItem('wash')) || [];

      for (let i = 0; i < washList.length; i++) {
        if (washList[i].id == payload.id) {
          this._vm.$notify({
            group: 'WishListNotify',
            text: payload.sku + this.$i18n.t('alerts.alreadyInWishlist2'),
            type: 'success',
            data: payload
          });
          return;
        }

      }
      let concateWash = washList.concat([payload]);

      localStorage.setItem('wash', JSON.stringify(concateWash));
      commit('UPDATE_WISHLIST', JSON.parse(localStorage.getItem('wash')));
      this._vm.$notify({
        group: 'WishListNotify',
        text: this.$i18n.t('alerts.AddedToWishlist'),
        type: 'success',
        data: payload
      });
      return;
    }

    if (localStorage.getItem('tokenEnded') == '1') return;


    let wishlistItems = await Api.get('wishlist');


    for (let i = 0; i < wishlistItems.data.Wishlist.length; i++) {
      if (wishlistItems.data.Wishlist[i].id == payload.id) {
        this._vm.$notify({
          group: 'WishListNotify',
          text: payload.sku + this.$i18n.t('alerts.alreadyInWishlist2'),
          type: 'success',
          data: payload
        });
        return;
      }
    }

    let dataForm = { product_id: payload.id };
    await Api.post('wishlist', dataForm);
    this._vm.$notify({
      group: 'WishListNotify',
      text: this.$i18n.t('alerts.AddedToWishlist'),
      type: 'success',
      data: payload
    });
    const response = await Api.get('wishlist');
    await commit('UPDATE_WISHLIST', response.data.Wishlist);
  },

  removeFromWishlist: async function ({ commit }, payload) {
    if (localStorage.getItem('tokenEnded') == '1') {
      let washList = JSON.parse(localStorage.getItem('wash'));
      washList.splice(parseInt(payload.index), 1);

      localStorage.setItem('wash', JSON.stringify(washList));

      await commit('UPDATE_WISHLIST', washList);
    } else {
      await Api.post(`wishlist/${payload.product.id}`);

      const response = await Api.get('wishlist');
      this._vm.$notify({
        group: 'WishListNotify',
        type: 'success',
        text: this.$i18n.t('alerts.RemovedWishlist'),
        data: payload.product,
      });
      await commit('UPDATE_WISHLIST', response.data.Wishlist);
    }
  },

  afterLogOutWishlist: async function ({ commit }, payload) {
    await commit('RESET_WISHLIST', []);
  }
};

export const mutations = {
  UPDATE_WISHLIST: function (state, payload) {
    state.list = payload;
    state.count = payload.length;
  },
  RESET_WISHLIST: function (state, payload) {
    state.list = payload;
    state.count = 0;
    state.total = 0;
  }
};
