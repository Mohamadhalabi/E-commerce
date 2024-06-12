<template>
  <main class="main contact-two">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("common.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("products.contactus") }}
          </li>
        </ol>
      </div>
    </nav>

    <div id="map">
      <div />
      <iframe
        :src="$settings.contact.google_map_iframe"
        width="100%"
        height="100%"
        frameborder="0"
      />
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h2 class="contact-title" :class="getIsAr ? 'text-right' : ''">
            {{ $t("contact.leave")
            }}<strong> {{ $t("contact.message") }}</strong>
          </h2>

          <form action="#" @submit.prevent="sendMessage">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group required-field">
                  <label for="contact-name">{{ $t("contact.name") }}</label>
                  <input
                    id="contact-name"
                    v-model="dataForm.name"
                    type="text"
                    class="form-control"
                    name="contact-name"
                    required
                  />
                </div>

                <div class="form-group required-field">
                  <label for="contact-email">{{ $t("contact.email") }}</label>
                  <input
                    id="contact-email"
                    v-model="dataForm.email"
                    type="email"
                    class="form-control"
                    name="contact-email"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="contact-subject">{{
                    $t("contact.subject")
                  }}</label>
                  <input
                    id="contact-subject"
                    v-model="dataForm.subject"
                    type="text"
                    class="form-control"
                    name="contact-subject"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group required-field mb-0">
                  <label for="contact-message">{{
                    $t("contact.message")
                  }}</label>
                  <textarea
                    id="contact-message"
                    v-model="dataForm.message"
                    cols="30"
                    rows="1"
                    class="form-control"
                    name="contact-message"
                    required
                  />
                </div>
                <div class="form-footer">
                  <base-button-icon-1
                    class="w-50 py-4 px-0"
                    type="submit"
                    :outline="true"
                    style="margin-top: 25px"
                  >
                    <span class="mx-1" style="color: white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        viewBox="0 96 960 960"
                        width="25"
                        fill="#ffffff"
                      >
                        <path
                          d="M120 896V256l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0V346v457Z"
                        />
                      </svg>
                    </span>
                    {{ $t("contact.sendMessage") }}</base-button-icon-1
                  >
                </div>
              </div>
            </div>
          </form>
        </div>

        <div class="col-md-4">
          <h2 class="contact-title" :class="getIsAr ? 'text-right' : ''">
            {{ $t("contact.contact") }}
            <strong>{{ $t("contact.details") }}</strong>
          </h2>
          <br>
          <div class="contact-info">
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fas fa-mobile-alt mobile-phone" />
              </div>
              <div class="porto-sicon-description p-3">
                {{ $settings.contact.whatsapp }}<br />
              </div>
            </div>
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-envelope" />
              </div>
              <div class="porto-sicon-description p-3">
                {{ $settings.contact.email_primary }}<br />
              </div>
            </div>
            <div class="porto-sicon-box d-flex align-items-center">
              <div class="porto-icon">
                <i class="fa fa-location-arrow" />
              </div>
              <div class="porto-sicon-description p-3">
                {{ $settings.contact.address }}
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 text-center">
          <h3>{{ $t("contact.ourBranches") }}</h3>
        </div>
        <div class="col-lg-6 col-md-6 col-12 m-auto">
          <div>
            <b-card-group deck>
              <b-card
                header="United Arab Emirates"
                header-tag="header"
              >
                <b-card-text>
                  <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 m-auto">
                      <img src="../static/images/flags/uae-flag.webp" class="m-auto m-lg-3" width="200px" />
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-12 col-12 mt-2">
                      <p class="text-center">{{ $t("contact.address") }}:{{ $t("contact.uaeAddress") }}</p>
                      <p class="text-center">{{ $t("contact.Mobile") }}: <a href="tel:+97150429045">+971 50 442 9045</a></p>
                    </div>
                  </div>
                </b-card-text>
              </b-card>

            </b-card-group>
          </div>
        </div>


        <div class="col-lg-6 col-md-6 col-12 m-auto">
          <div>
            <b-card-group deck>
              <b-card
                header="Saudi Arabia"
                header-tag="header"
              >
                <b-card-text>
                  <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 m-auto">
                      <img src="../static/images/flags/Flag_of_Saudi_Arabia.gif" class="m-auto m-lg-3" width="200px" />
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-12 col-12 mt-2">
                      <p class="text-center">{{ $t("contact.address") }}:{{ $t("contact.ksaAddress") }}</p>
                      <p class="text-center">{{ $t("contact.Mobile") }}: <a href="tel:00966505953232">+966 50 595 3232</a></p>
                    </div>
                  </div>
                </b-card-text>
              </b-card>

            </b-card-group>
          </div>
        </div>


        <div class="col-lg-6 col-md-6 col-12 mt-2">
          <div>
            <b-card-group deck>
              <b-card
                header="United States of America"
                header-tag="header"
              >
                <b-card-text>
                  <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 m-auto ">
                      <img src="../static/images/flags/usa-flag.webp" class="m-auto m-lg-3" width="200px" />
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-12 col-12 mt-2">
                      <p class="text-center">{{ $t("contact.address") }}:{{ $t("contact.usaAddress") }}</p>
                      <p class="text-center">{{ $t("contact.Mobile") }}: <a href="tel:0019734624473">+1973 46 244 73</a></p>
                    </div>
                  </div>
                </b-card-text>
              </b-card>

            </b-card-group>
          </div>
        </div>

        <div class="col-lg-6 col-md-6 col-12 mt-2">
          <div>
            <b-card-group deck>
              <b-card
                header="Turkey"
                header-tag="header"
              >
                <b-card-text>
                  <div class="row">
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6 m-auto">
                      <img src="../static/images/flags/turkey-flag.webp" class="m-auto m-lg-3" width="200px" />
                    </div>
                    <div class="col-xl-9 col-lg-8 col-md-12 col-12 mt-2">
                      <p class="text-center">{{ $t("contact.address") }}:{{ $t("contact.turkeyAddress") }}</p>
                      <p class="text-center">{{ $t("contact.Mobile") }}: <a href="tel:00905355847446">+90 553 146 84 75</a></p>
                    </div>
                  </div>
                </b-card-text>
              </b-card>
            </b-card-group>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Api from "~/api";
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import _contactTwo from 'static/sass/pages/_contact-two.scss'
export default {
  components: {
    BaseButtonIcon1,
  },

  head() {
    return {
      title: this.$t('contact.seoTitle'),
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/contact',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: this.$t('contact.seoDescription'),
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          name: "og:title",
          content: this.$t('contact.ogTitle'),
        },
        {
          name: "og:description",
          content: this.$t('contact.ogDescription')
        },
        {
          name: "og:url",
          content: "https://www.tlkeys.com",
        },
        {
          name: "og:image",
          content: "https://dev-srv.tlkeys.com/storage/images/seo/og-image.jpg",
        },
        {
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          name: "og:image:height",
          content: "627",
        },
        {
          name: "og:image:width",
          content: "1200",
        },
        // {
        //   name: "twitter:card",
        //   content: "summary",
        // },
        // {
        //   name: "twitter:site",
        //   content: `${this.$settings.social_media.twitter}`,
        // },
        // {
        //   name: "twitter:title",
        //   content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        // },
        // {
        //   name: "twitter:description",
        //   content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        // },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
      ],
      script: [
        { type: 'application/ld+json', json: {
            "@context": "http://schema.org/",
            "@type": "Organization",
            "name": "Techno Lock Keys Trading",
            "url": "https://www.tlkeys.com/",
            "image": "https://www.tlkeys.com/tlk-logo.png",
            "description": this.$t('contact.ogDescription'),
            "address": {
              "@type": "PostalAddress",
              "streetAddress": this.$t('contact.uaeAddress'),
              "addressCountry": "AE"
            },
            "telephone": "+971 6 542 1313",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "8:00",
                "closes": "18:00"
              }
            ],
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Paypal",
            "sameAs": [
              "https://www.facebook.com/technolockkeys_world/",
              "https://twitter.com/techno_lock",
              "https://api.whatsapp.com/send?phone=971504429045"
            ]
          }
        },
        { type: 'application/ld+json', json: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.tlkeys.com",
            "logo": this.$settings.website.system_logo_black.l.url
          }
        }
      ]
    }
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      dataForm: {
        name: "",
        email: "",
        subject: "",
        message: "",
        type: this.typeContact,
        model_id: this.modelId,
      },
      token: null,
    };
  },
  methods: {
    sendMessage: async function () {
        Api.post("/contact-us", this.dataForm)
          .then((response) => {
            (this.dataForm.name = ""),
              (this.dataForm.email = ""),
              (this.dataForm.subject = ""),
              (this.dataForm.message = "");
            this.errorMsg = {
              name: [],
              email: [],
              subject: [],
              message: [],
            };

            this.$notify({
              group: "custom-notify",
              type: "success",
              text: response.data.message,
            });
          })
          .catch((err) => {
            this.errorMsg = err.response.data.data;

            this.$notify({
              group: "errorMessage",
              type: "error",
              text: err.response.data.data.message[0],
            });
          });
    },
  },
  computed: {
    ...mapGetters("rtlStore", ["getIsAr"]),
  },
};
</script>
<style scoped>
@media screen and (min-width: 993px){
  .card{
    min-height: 200px;
    max-height: 200px;
  }
}
.card{
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
