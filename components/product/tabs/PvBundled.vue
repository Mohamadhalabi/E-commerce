<template>
  <div>
    <div v-if="loadedData">
      <pv-collection
        v-if="bundled.length > 0"
        :products="bundled"
        :collection-title="''"
      />
    </div>
    <div v-else style="text-align: center;">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>
<script>
import PvCollection from '~/components/product/card/PvCollection';
export default {
  components: {
    PvCollection
  },
  props: {
    bundled: {
      type: Array,
      default: () => [],
      require: false
    }
  },
  data() {
    return {
      loadedData: false
    };
  },
  created() {
    setTimeout(() => {
      this.loadedData = true;
    }, 500);
  }
};
</script>
