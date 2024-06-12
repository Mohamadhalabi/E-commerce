<template>
   <div >
    <pv-compare-table>

    </pv-compare-table>
  </div>
</template>

<script>
import PvCompareTable from '~/components/common/PvCompareTable.vue'
export default {
  components: {
    PvCompareTable,
  },
  head() {
    return {
      titleTemplate: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
      title: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
    }
  },

};
</script>

