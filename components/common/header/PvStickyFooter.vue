<template>
  <div class="from-demo-17">
    <div class="sticky-navbar">
      <div class="sticky-info">
        <nuxt-link to="/">
          <i class="icon-home" /> {{$t('header.home')}}
        </nuxt-link>
      </div>
      <div class="sticky-info">
        <nuxt-link to="/shop">
          <i class="icon-bars" /> {{$t('header.categories')}}
        </nuxt-link>
      </div>
      <div class="sticky-info">
        <a @click="goToWishlist()">
          <i class="icon-wishlist-2" /> {{$t('header.wishlists')}}
        </a>
      </div>
      <div class="sticky-info">
        <a @click="goToAccount">
          <i class="icon-user-2" /> {{$t('header.account')}}
        </a>
      </div>
      <div class="sticky-info">
        <a @click="goToCart">
          <i class="icon-shopping-cart position-relative">
            <span class="cart-count badge-circle">
              {{totalCount}}
            </span>
          </i> {{$t('header.cart')}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {scrollTopHandler} from '~/utils';

export default {
  computed: {
    ...mapGetters('shop', ['totalCount'])
  },
  methods: {
    openLoginModal: function() {
      if(this.$route.path !== '/auth/login') {
       /*  this.$modal.show(
          () => import('~/components/auth/PvLoginModal'), {},
          {width: '525', height: 'auto', adaptive: true}
        ); */
        this.$router.push('/auth/login')

      } else {
        scrollTopHandler();
        setTimeout(function() {
          document.getElementById('login-email').focus();
        }, 500);
      }
    },
    goToWishlist() {
      if(localStorage.getItem('tokenEnded') == 1) {
        this.openLoginModal();
      } else {
        this.$router.push('/wishlist');
      }
    },
    goToCart() {
      if(localStorage.getItem('tokenEnded') == 1) {
        this.openLoginModal();
      } else {
        this.$router.push('/cart');
      }
    },
    goToAccount() {
      if(localStorage.getItem('tokenEnded') == 1) {
        this.openLoginModal();
      } else {
        this.$router.push('/account');
      }
    }
  }
};
</script>
