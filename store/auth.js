import Api from '~/api';
import { pick, includes } from 'lodash';
import api from "~/api";

export const state = () => ({
  user: null,
  token: null,
  email: "",
});

export const getters = {
  isAuthenticated: (state) => !!state.user,
  StateUser: (state) => state.user,
  getToken: (state) => state.token,
  getEmail: (state) => state.email,
  preferredLanguage: (state) => state.user ? state.user.preferred_language : 'en',
};

export const actions = {
  ResetPasswordEmail: async function ({ commit }, payload) {
    await commit('SET_EMAIL', payload);
  },
  Register: async function ({ dispatch }, form) {
    form = pick(form, ['name', 'email', 'password', 'confirm_password']);
    await Api.post('user/auth/register', form);
    let user = pick(form, ['email', 'password']);
    await dispatch('LogIn', user);
  },

  LogIn: async function ({ commit, dispatch }, user) {
    user = pick(user, ['email', 'password']);
    user = await Api.post('user/auth/login', user).then((res) => {
      let u = pick(res.data.user, ['name', 'email', 'avatar','preferred_language']);
      let token = res.data.authorisation.token;
      commit('SET_USER', u);
      commit('SET_TOKEN', token);
      dispatch('compare/fetchList', null, { root: true });
      dispatch('shop/getCartList', null, { root: true });
      dispatch('fav/fetchWishlist', null, { root: true });

      let preffered_language = res.data.user.preffered_language;

      api.defaults.headers["Accept-Language"] = preffered_language;
      this.$i18n.locale = preffered_language;
      this.$cookies.set('locale',preffered_language,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      dispatch('language/updateLanguageCode', preffered_language, { root: true });

      this._vm.$notify({
        group: 'custom-notify',
        type: 'success',
        text: res.data.status
      });

      let currentPath = this.$router.currentRoute.fullPath;
      if (includes(currentPath, '/auth')) {
        if(preffered_language =="en"){
          this.$router.push(`/`);
        }
        else{
          this.$router.push(`/${preffered_language}`);
        }
      } else {
        this.$router.push({ path: currentPath, query: { logged_in: true } });
      }

    }).catch((err) => {
      this._vm.$notify({
        group: 'errorMessage',
        type: 'error',
        text: err.response.data.message[0]
      });
    });


  },

  LogOut: async function ({ commit }) {
    const response = await Api.post('user/auth/logout');
    await commit('LOGOUT');
    await this.$router.push('/auth/login');
    localStorage.setItem('tokenEnded', 1);
    await this._vm.$notify({
      group: 'addProduct',
      type: 'success',
      text: response.data.data.message
    });
  },
  // / forgot Password
  forgotPassword(_, email) {
    return Api.post('forget-password', { email });
  },
  // / reset Password
  resetPassword(_, data) {
    return Api.post('reset-password', data);
  },
  // / login with facebook
  loginWithFacebook(_, data) {
    return Api.post('user/auth/login-with-facebook', data);
  },
  // / login with facebook
  loginWithGoogle(_, data) {
    return Api.post('user/auth/login-with-google', data);
  },
  // / set user by token
  setUser({ commit }, data) {
    let u = pick(data.user, ['name', 'email', 'avatar']);
    const token = data.token;
    commit('SET_USER', u);
    commit('SET_TOKEN', token);
    this._vm.$notify({
      group: 'custom-notify',
      type: 'success',
      text: 'LogedIn'
    });
    this.$router.push('/account');

  },

  setNewData: async function ({ commit }) {
    let user = null;
    await Api.get('/user/profile').then((responce) => {
      user =responce.data.user_info;
    }).catch((error) => {
      console.log(error.data);
    })
    await commit('SET_USER', user);
  }
};

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user;
  },
  SET_EMAIL: function(state, email){
    state.email = email
  },

  SET_TOKEN: function (state, token) {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('tokenEnded', 0);
    localStorage.setItem('version', process.env.version);
    state.token = token;
  },

  LOGOUT: function (state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('card');
    localStorage.removeItem('tlkeys');
    localStorage.clear();
    delete Api.defaults.headers.common['Authorization'];
  },
};
