<template>
    <span v-if="errorMsg.length > 0" class="errorValication">{{errorMsg[0]}}</span>
</template>

<script>
export default {
  props: {
    errorMsg: {
      type: Array,
       default: () => ([])
    }
  }
};
</script>
