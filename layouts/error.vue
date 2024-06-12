<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div  class="main">
    <p v-if="$fetchState.pending">
      Loading...
    </p>
    <div  v-if="this.show_error">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav"
      >
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <nuxt-link
                to="/"
                class="router-link-active"
              >
                Home
              </nuxt-link>
            </li>
            <li
              aria-current="page"
              class="breadcrumb-item active"
            >
              404
            </li>
          </ol>
        </div>
      </nav>
      <div class="container">
        <div class="container">
          <div class="row romnn">
            <img
              src="~/static/images/notfound.jpg"
              alt="404 page not found image"
            >

            <div
              class="buttonn"
              style="position: absolute;
    display: flex;
    list-style: none;"
            >
              <li class="nav-item">
                <nuxt-link
                  to="/"
                  class="nav-link btn btn-warning"
                  style="margin: auto 10px;color: #fff;padding: 10px;"
                >
                  Proceed to Home Page
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  to="/contact"
                  class="nav-link btn btn-warning"
                  style="margin: auto 10px;color: #fff;padding: 10px;"
                >
                  Contact Us
                </nuxt-link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '~/api';

export default {
  props: {
    error: {
      type: Object,
      default: () => {
      }
    }
  },
  data(){
    return {
      show_error:false
    }
  },
  async fetch() {
    // this.$Progress.start();

    if(this.error.statusCode == 404) {
      const currentUrl = window.location.href;
      api.post('redirect', {url: currentUrl}).then((res) => {
        // this.$Progress.finish();
        window.location.replace(res.data.new_route);

      }).catch(()=>{
        this.$Progress.fail();
        this.show_error =true;
      });

    }
  }
};
</script>
