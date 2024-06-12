<template>
  <div class="deleteConverFilog">
    <b-modal
      id="modalConfirmDelete"
      class="deleteConverFilog"
      hide-footer
    >
    <div>
      <p>
        {{ $t('common.areDelete') }}
      </p>
      <p class="mb-0" style="text-align: center">
            <base-button-icon-1
              style="width: 90px"
              class="p-3 mx-1"
              @click="confirmDelete"
            >
              <span
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 96 960 960"
                  width="20"
                  fill="#fff"
                >
                  <path
                    d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"
                  />
                </svg></span>
              {{ $t("common.delete") }}
            </base-button-icon-1>

            <base-button-icon-1
              style="width: 90px"
              class="p-3 mx-1"
              :outline="true"
              @click="hideDialog"
            >
              {{ $t("common.cancel") }}</base-button-icon-1
            >
          </p>
    </div>
    </b-modal>
  </div>
</template>
<script>
import Api from '~/api';
import BaseButtonIcon1 from './BaseButtonIcon1.vue';
export default {
  props: {
    api: {
      type: String,
      require: true
    }
  },
  components: {
    BaseButtonIcon1,
  },
  methods: {
    hideDialog() {
      this.$bvModal.hide('modalConfirmDelete');
    },
    confirmDelete() {

      Api.post(this.api)
        .then(response => {
          this.$notify({
            group: 'custom-notify',
            type: 'success',
            text: response.data.message
          });
          this.$emit('close');
          this.$bvModal.hide('modalConfirmDelete');
        })
        .catch(error => ({error: JSON.stringify(error)}));
    }
  }
};
</script>

<style scoprd>
.modal-dialog{
      max-width: 500px;
}
.modal-header{
    padding: 0 20px;
    height: 50px;
  }
.modal-content{
    border-radius: 10px !important;
  }
</style>
