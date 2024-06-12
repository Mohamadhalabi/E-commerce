<template>
  <main class="main">
    <div class="container login-container">
      <div class="row">
        <div class="col-lg-10 mx-auto">
          <div class="row">
            <div class="col-md-6 mx-auto">
              <pv-login />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import PvLogin from '~/components/auth/PvLogin';

export default {
  components: {
    PvLogin
  }
};
</script>
