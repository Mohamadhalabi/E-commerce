<template>
  <div>
    <div class="contact-two">
      <div
        class="row "
        style="justify-content: center;"
      >
        <div class="col-12">
          <h2 class="contact-title">
            {{$t('contact.leave')}} <strong> {{$t('contact.ticket')}}</strong>
          </h2>

          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <label
                  for="contact-subject"
                  class="mb-0"
                >{{$t('contact.subject')}}</label>

                <input
                  id="contact-subject"
                  v-model="dataForm.subject"
                  type="text"
                  class="form-control"
                  name="contact-subject"
                >
                <pv-error :error-msg="errorMsg.subject" />
              </div>
            </div>

            <div class="col-lg-12">
              <div class="form-group required-field pb-0 mb-0">
                <label
                  for="contact-message"
                  class="mb-0"
                >{{$t('contact.message')}}</label>
                <vue-editor v-model="dataForm.details" />
              </div>
              <div class="form-footer">
                <button
                  class="btn btn-primary"
                  @click="sendMessage"
                >
                  {{$t('contact.sendTicket')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '~/api';
import PvError from '~/components/common/ErrorMessage.vue';
import {scrollTopHandler} from '~/utils';
export default {
  components: {
    PvError
  },
  props: {
    typeSupport: {
      type: String,
      default: null
    },
    modelId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dataForm: {
        subject: '',
        details: '',
        type: this.typeSupport,
        model_id: this.modelId
      },
      errorMsg: {
        name: [],
        details: []
      }
    };
  },
  methods: {
    sendMessage() {
      Api.post('/tickets/create', this.dataForm)
        .then(response => {
          this.dataForm.subject = '',
          this.dataForm.details = '';
          this.errorMsg = {
            name: [],
            details: []
          };
          scrollTopHandler();
          this.$notify({
            group: 'custom-notify',
            type: 'success',
            text: response.data.message
          });

        })
        .catch((err) => {
          this.errorMsg = err.response.data.data;
          console.log(this.errorMsg);
        });
    }
  }
};
</script>
