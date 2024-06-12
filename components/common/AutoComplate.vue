<template>
  <multiselect
  v-model="selecteVal"
  class="multiselectClass"
  :options="options"
  :placeholder="placeholder"
  :label="itemText"
  :show-labels="false"
  :searchable="true"
  @input="updateValueAction"
    />
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect
  },
  props: {
    options: [],
    itemText: {
      type: String,
      default: 'name',
      required: false
    },
    placeholder: {
      type: String,
      default: null,
      required: false
    },
    defulteName: {
      type: String,
      default: null,
      required: false
    },
    value: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      selecteVal: null,
      initialvalue: this.value

    };
  },
  watch:{
    defulteName(newval){
      this.countryData()
    }
  },
  created() {
    this.countryData()
  },
  methods: {
    updateValueAction(val) {
      this.$emit('setValue', val)
    },
    countryData(){
      if (!this.defulteName) {
        this.selecteVal = this.initialvalue
      } else {
        this.selecteVal = {name: this.defulteName, value: this.initialvalue}
      }
    }
  }
};
</script>
<!--<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>-->
<style>
.multiselectClass .multiselect__option--highlight {
  background-color: #f07905;
}

.multiselectClass .multiselect__option--selected.multiselect__option--highlight {
  background-color: #f07905;
}

.multiselect__content-wrapper .multiselect__element {
  padding: 0 !important
}

.multiselect__content-wrapper {
}

</style>
