<template>
  <!-- <div
    v-lazy:background-image="image"
    class="shop-banner banner banner-5 mb-3 w-100 boxed-slide boxed-slide-1 rounded-5 shadow bg-white"
    style="
    object-fit: contain;
      background-color: #f1f1f3;
      background-size: 100% auto;
      background-position: center center;
      background-repeat: no-repeat;
    "
  ></div> -->
  <div v-if="this.path !='/car-remote-and-transponder-key'">
    <img loading="lazy" :src="image" width="1374" height="474"  alt="" class="rounded-5 shadow mb-4 banners">
  </div>
</template>
<script>
import * as https from "https";

export default {
  data: function () {
    return {
      path: '',
    };
  },
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  created() {
    this.path = this.$route.path
  },
  computed: {
    https() {
      return https;
    },
  },
};
</script>
<style>
@media screen and (max-width: 767px){
  .banners{
    display: none;
  }
}
img.banners{
  max-height: 474px;
}
</style>
