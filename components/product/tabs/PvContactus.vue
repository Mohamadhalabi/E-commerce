<template>
  <div>
    <div class="contact-two">
      <div class="row ">
        <div class="col-md-8">
          <h3 style="color:#777775">
            {{ $t('contact.sendMessage') }}
          </h3>

          <div class="row">
            <div class="col-lg-6">
              <div class="form-group required-field pb-0">
                <label
                  for="contact-name"
                  class="mb-0"
                >{{ $t('contact.name') }}</label>
                <input
                  id="contact-name"
                  v-model="dataForm.name"
                  type="text"
                  class="form-control"
                  name="contact-name"
                  required
                >
                <pv-error :error-msg="errorMsg.name"/>
              </div>

              <div class="form-group required-field pb-0">
                <label
                  for="contact-email"
                  class="mb-0"
                >{{ $t('contact.email') }}</label>
                <input
                  id="contact-email"
                  v-model="dataForm.email"
                  type="email"
                  class="form-control"
                  name="contact-email"
                  required
                >
                <pv-error :error-msg="errorMsg.email"/>
              </div>

              <div class="form-group">
                <label
                  for="contact-subject"
                  class="mb-0"
                >{{ $t('contact.subject') }}</label>
                <input
                  id="contact-subject"
                  v-model="dataForm.subject"
                  type="text"
                  class="form-control"
                  name="contact-subject"
                >
                <pv-error :error-msg="errorMsg.subject"/>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="form-group required-field pb-0 mb-0">
                <label
                  for="contact-message"
                  class="mb-0"
                >{{ $t('contact.message') }}</label>
                <textarea
                  id="contact-message"
                  v-model="dataForm.message"
                  cols="30"
                  rows="1"
                  class="form-control"
                  name="contact-message"
                  required
                />
                <pv-error :error-msg="errorMsg.message"/>
              </div>
<!--              <recaptcha/>-->
<!--              <b v-if="this.token==''" class="text-danger">{{ $t('common.pleaseCheckRecaptch') }}</b>-->

              <div class="form-footer">
                <button
                  class="btn btn-primary"
                  @click="sendMessage"
                >
                  {{ $t('contact.sendMessage') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <h3 style="color:#777775">
            {{ $t('contact.contactUs') }}
          </h3>

          <div class="contact-info">
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-phone"/>
              </div>
              <div class="porto-sicon-description">
                <a href="tel:+4733378901">
                {{ $settings.contact.phone_primary }}
                </a>
              </div>
            </div>
            <div class="porto-sicon-box  d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-envelope"/>
              </div>
              <div class="porto-sicon-description">
                <a :href="'mailto:' + $settings.contact.email_primary">{{ $settings.contact.email_primary }}</a><br>
                <a :href="'mailto:' + $settings.contact.email_secondary">{{ $settings.contact.email_secondary }}</a>
              </div>
            </div>
            <div class="porto-sicon-box  d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-location-arrow"/>
              </div>
              <div class="porto-sicon-description">
                Address :{{ $settings.contact.address }}
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

export default {
  components: {
    PvError
  },
  props: {
    typeContact: {
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
        name: '',
        email: '',
        subject: '',
        message: '',
        type: this.typeContact,
        model_id: this.modelId
      },
      errorMsg: {
        name: [],
        email: [],
        subject: [],
        message: []

      },
      token: null,
    };
  },
  methods: {
    async sendMessage() {
      // try {
      //   this.token = await this.$recaptcha.getResponse()
      // } catch (Ex) {
      //   this.token = ''
      // }
      // if (this.token != '') {
      //   this.$Progress.start();
        Api.post('/contact-us', this.dataForm)
          .then(response => {
            this.dataForm.name = '',
              this.dataForm.email = '',
              this.dataForm.subject = '',
              this.dataForm.message = '';
            this.errorMsg = {
              name: [],
              email: [],
              subject: [],
              message: []

            };

            this.$notify({
              group: 'custom-notify',
              type: 'success',
              text: response.data.message
            });
            // this.$Progress.finish();
          })
          .catch((err) => {
            this.$Progress.fail();
            this.errorMsg = err.response.data.data;
          });
      // }
    }
  }
};
</script>
