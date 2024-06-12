<template>
  <nuxt-img
    loading="lazy"
    format="webp"
    :src="image[size].url"
    :class="className"
    :alt="image[size].alt + (size != 'l' ? ' - thumbnail' : '')"
    :width="image[size].width"
    :height="image[size].height"
    :open_graph="image[size].open_graph"
    :scal="image[size].scal"
    :description="image[size].description"

  />
</template>

<script>
export default {
  props: {
    className: String,
    image: Object,
    size: {
      type: String,
      default: 'l'
    }
  }
};
</script>
