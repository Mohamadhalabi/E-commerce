<template>
  <div class="widget-body pb-0">
    <ul class="config-swatch-list">
      <li
        v-for="(item,index) in items"
        :key="`color-filter${ index}`"
        :class="{active: isActive(item.slug)}"
      >
        <a
          :style="{backgroundColor: item.hex}"
          @click="filterQuery(item.slug)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SliderToggle',
  props: {
    'items': Array,
    'group': String
  },
  methods: {
    filterQuery(slug) {
      this.$emit('filter-query', {type: this.group, slug: slug});
    },
    isActive(slug) {
      return (
        this.$route.query[this.group] &&
        this.$route.query[this.group].split(',').includes(slug)
      );
    }
  }
};
</script>

<style scoped>

</style>
