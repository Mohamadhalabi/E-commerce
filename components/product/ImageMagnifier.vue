<template>
  <div class="image-magnifier-container">
    <div class="image-magnifier-wrapper">
      <div class="image-magnifier-image">
        <img loading="lazy" :src="imageSrc" :alt="alt" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>


.image-magnifier-container {
  position: relative;
  display: none;
}

.image-magnifier-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.image-magnifier-image {
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  transition: transform 0.3s;
}

.image-magnifier-image img {
  width: 100%;
  height: 100%;
}

.image-magnifier-container:hover .image-magnifier-image {
  transform: scale(1.5);
}
</style>
