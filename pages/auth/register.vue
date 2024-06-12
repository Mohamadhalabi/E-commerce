<template>
  <main class="main">
    <div class="container login-container">
      <pv-register />
    </div>
  </main>
</template>

<script>
import PvRegister from '~/components/auth/PvRegister';

export default {
  components: {
    PvRegister
  }
};
</script>
