<template>
   <div>
     <nav aria-label="breadcrumb" class="mb-3 breadcrumb-nav">
              <div class="container">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <nuxt-link to="/">
                      {{ $t("wishlist.home") }}
                    </nuxt-link>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {{ $t("compare.title") }}
                  </li>
                </ol>
              </div>
            </nav>
      <pv-compare-table></pv-compare-table>
   </div>
</template>
<script>
import PvCompareTable from '~/components/common/PvCompareTable.vue'
export default {
  components: {
    PvCompareTable,
  },
}
</script>

