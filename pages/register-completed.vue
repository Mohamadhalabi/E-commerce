<template>
  <div class="container">
    <div class="row my-5 py-4">
      <div class="col text-center">
        <pv-success />
        <h1 class="text-success">{{$t('auth.thanks_for_registering')}}</h1>
        <h3 class="text-grey">{{$t('auth.thanks_for_registering_sub_title')}}</h3>
        <div class="col-md-4 offset-md-4  px-md-4  col-12">
          <div class="row">
            <div class="col text-center">
              <nuxt-link class="w-100 mx-3" style="color: #ff6800 !important;" to="/">
                <base-button-icon-1 :outline="true" class="w-100 py-4">
                  {{ $t('header.home') }}
                </base-button-icon-1>
              </nuxt-link>
            </div>
            <div class="col">
              <nuxt-link class="w-100 mx-3" style="color: #ff6800 !important;" to="/auth/login">
                <base-button-icon-1 :outline="true" class="w-100 py-4">
                  {{ $t('login.title') }}
                </base-button-icon-1>
              </nuxt-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PvSuccess from "~/components/common/PvSuccess.vue";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";

export default {
  components: {PvSuccess,BaseButtonIcon1}
}
</script>

<style scoped>

</style>

