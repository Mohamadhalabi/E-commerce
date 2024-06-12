<template>
  <div class="d-flex attributes-table">
    <div class="attribute-table">
      <div
        class="pr-2 pl-2 w-100"
        :style="{
        width: '100%'
      }"
        v-for="(group, index) in groupedAttributeNames"
        :key="index"
      >
        <table class="table table-striped table-bordered">
          <tbody>
          <tr v-for="attributeName in group" :key="attributeName">
            <th class="attribute-table-header">{{ attributeName }}</th>
            <td class="attribute-table-td">
              <span
                v-for="(attributeValue, j) in product.attributes[attributeName]"
                :key="j"
              >
                {{ attributeValue + (j === product.attributes[attributeName].length - 1 ? '' : ', ') }}
              </span>
              <span v-if="attributeName === 'weight'">
              {{product.weight}} KG
            </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  computed: {
    attributeNames() {
      return Object.keys(this.product.attributes);
    },
    groupSize() {
      let count = this.attributeNames.length / 2;
      return Math.ceil(count);
    },
    groupedAttributeNames() {
      const result = [];
      if (this.attributeNames.length > 0) {
        for (let i = 0; i < this.attributeNames.length; i += this.groupSize) {
          result.push(this.attributeNames.slice(i, i + this.groupSize));
        }
        // Check if there are groups in the result
        if (result.length > 0) {
          if (result[1] && result[1].length) {
            let FirstTable = result[0].length;
            let SecondTable = result[1].length;
            if (FirstTable - SecondTable === 1) {
              result[1].push("weight");
            } else {
              result[0].push("weight");
            }
          } else {
            result[0].push("weight");
          }
        }
      } else {
        result[0] = ["weight"];
      }
      return result;
    },
  },
};
</script>
<style>
.attributes-table{
  margin-top: -15px;
}
.attribute-table{
  display: flex;
}
@media screen and (max-width: 767px){
  .attribute-table{
    display: flow;
  }
  .table.table-striped{
    margin-bottom: 0;
  }
}
.attribute-table-header{
  width: 50%;
  background-color: #f9f9f9
}
.attribute-table-td{
  background-color: #ffffff
}
</style>
