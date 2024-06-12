<template>

  <div
    class="position-relative download-item d-flex flex-column mb-0 mt-md-1 mt-0"
    @click="goToDowmload(product.slug)"
  >
    <div class="download2">
      <img
        loading="lazy"
        class="download-page "
        style=""
        :src="product.image.l.url"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    product: Object,
  },
  methods: {
    goToDowmload(slug) {
      this.$router.push(`downloads/${slug}`);
    },
  },
};
</script>
<style>
.dowmloadItem {
  /* border: 10px solid #dcdcdc; */
  /* margin-bottom: 40px; */
  cursor: pointer;
  /* overflow: hidden; */
}
.dowmloadItem::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: inline-block;
  border: 1px solid rgb(217, 217, 217);
  height: 100%;
  box-shadow: 0px 0px 7px 3px #dcdcdc;
}
.download-page{
  cursor: pointer;
}
img.download-page{
  width: 85%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  transition: all .2s ease-in-out;
}
img.download-page:hover{
  transform: scale(0.96);
}
.download2{
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 10px;

}
</style>
