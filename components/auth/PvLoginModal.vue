<template>
  <div class="modal-wrapper login-popup">
    <pv-login :inside-modal="true" />

    <button
      title="Close (Esc)"
      type="button"
      class="close-btn bg-light shadow-sm  position-absolute"
      @click="$emit('close')"
    >
      ×
    </button>
  </div>
</template>

<script>
import PvLogin from '~/components/auth/PvLogin';

export default {
  components: {
    PvLogin
  }
};
</script>
<style scoped>
.close-btn{
  border: none !important;
  border-radius: 50%;
  top: 10px;
  right: 10px;
}
</style>
