<template >

   <table id="offerTable"  class=" w-md-50 w-sm-100 shadow rounded-10" >
      <thead>
        <tr>
          <th class="text-center">{{ $t("products.FROM") }}</th>
          <th class="text-center">{{ $t("products.TO") }}</th>
          <th class="text-center">{{ $t("products.PRICE") }}</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="(offer, index) in product.offers" :key="index">
          <td>{{ offer.from }}</td>
          <td>
            <span v-if="offer.to === 10000">
              More than {{offer.from}}
            </span>
            <span v-else>
              {{ offer.to }}
            </span>
          </td>
          <td class="price-color-offer">{{ offer.price.currency + offer.price.value }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.rounded-10{
  border-radius: 10px !important;
}

#offerTable {
   border-collapse: collapse;

  overflow: hidden;
}

#offerTable td{
  padding: 8px;
}

#offerTable tr:nth-child(even){background-color: #f2f2f2;}

#offerTable tr:hover {background-color: #ddd;}

#offerTable th {
  padding: 8px;
  text-align: left;
  background-color: #3e3e3e;
  color: white;
}
#offerTable{
  width: 100%;
}
@media screen and (min-width: 1200px){
  #offerTable{
    width: 40%;
  }
}
</style>
