<template>
  <div>
    <nav class="navbar custom-top-header d-flex">
      <a class="customer-top-header-items d-flex align-items-center" href="#">
        <img src="images/fast-shipping.png" width="60" loading="lazy" />
        <span class="ml-lg-4">Fast and Reliable Shipping</span>
      </a>
      <a class="customer-top-header-items d-flex align-items-center" href="#">
        <img src="images/car-remote.png" width="30" loading="lazy" />
        <span class="ml-lg-4">High-quality unlocking remotes</span>
      </a>
      <a class="customer-top-header-items d-flex align-items-center" href="#">
        <img src="images/customer-service.png" loading="lazy" width="30" />
        <span class="ml-lg-4">24/7 customer support.</span>
      </a>
    </nav>

    <div style="box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);">
      <div class="container">
        <nav class="navbar customer-header bg-white">
          <nuxt-link class="customer-top-header-items " to="/">
            <img src="images/techno-lock-logo.png" loading="lazy" width="250" />
          </nuxt-link>
          <select class="form-select" Aria-label="Language">
            <option selected  >English</option>
            <option>Arabic</option>
          </select>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import UnlockRemoteServices from "~/pages/unlock-remote-services.vue";

export default {
  name: "PvCustomHeader",
  components: {UnlockRemoteServices}
}
</script>

<style scoped>
.custom-top-header{
  background-color: #2a3642;
  justify-content: space-evenly;
}
.customer-top-header-items{
  color: white;
}
</style>
