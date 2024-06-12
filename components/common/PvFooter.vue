<template>
  <div class="from-demo-17">
    <footer ref="footer" class="bgWorld footer bg-dark">
      <div class="container">
        <div class="footer-middle pt-0">
          <div class="row">
            <nuxt-link
              :to="getLink('/')"
            >
              <nuxt-img
                format="webp"
                loading="lazy"
                src="/images/logo-footer.png"
                alt="footer Logo"
                title="Techno lock footer logo"
                width="169"
                height="56"
                class="m-b-3 logo"
              />
            </nuxt-link>
          </div>
          <div class="row">
            <div class="col-lg-5 m-b-4">
              <h6 class="footer-desc text-white font-weight-normal" v-html="$t('footer.description')"/>
              <div class="row ls-0 footer-question">
                <div class="col-12">
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-sm-8 m-b-4 justify-content-center d-lg-flex">
              <div class="widget">
                <ul class="links">
                  <li>
                    <nuxt-link
                      :to="getLink('/about')"
                    >
                      {{ $t("footer.AboutUs") }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :to="getLink('/contact')"
                    >
                      {{ $t("footer.ContactUs") }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :to="getLink('/deliveryinfo')"
                    >
                      {{ $t("footer.DeliveryInfo") }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :to="getLink('/privacy-policy')"
                    >
                      {{ $t("footer.PrivacyPolicy") }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :to="getLink('/terms')"
                    >
                      {{ $t("footer.TermsAndConditions") }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link
                      :to="getLink('/return-policy')"
                    >
                      {{ $t("footer.ReturnPolicy") }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-3 col-sm-4 m-b-4">
              <div class="widget footer-widget-contact-info">
                <ul class="contact-info d-flex flex-column">
                  <li v-if="$settings.contact.address"
                      class="d-flex p-0 align-items-start">
                    <i class="icon-direction mx-2"/>
                    <a
                      href="https://www.google.com/maps/place/Techno+Lock+Keys+Trading+(+%D8%AA%D9%83%D9%86%D9%88+%D9%84%D9%88%D9%83+%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD+)%E2%80%AD/@25.3199127,55.407002,15z/data=!4m5!3m4!1s0x0:0xc1d5d1a7ec3407f9!8m2!3d25.3199127!4d55.407002?coh=164777&entry=tt&shorturl=1"
                      target="_blank"
                    >
                      <p class="m-0">{{ $settings.contact.address }}</p>
                    </a>
                  </li>
                  <li
                    v-for="phone in [
                      $settings.contact.phone_primary,
                    ]" :key="phone"
                    class="d-flex align-items-center"
                  >
                    <i class="icon-phone mx-2" />

                    <a :href="'tel:' + phone" class="d-inline-block"
                    > {{ phone }}</a>

                  </li>

                  <li
                    v-for="email in [
                      $settings.contact.email_primary,
                    ]" :key="email"
                    class="d-flex align-items-center"
                  >
                    <i class="icon-envolope mx-2" />
                    <a :href="`mailto:${email}`">{{ email }}</a>
                  </li>
                </ul>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="bg-dark">
        <div class="container">
          <div
            class="footer-bottom d-flex justify-content-between align-items-center flex-wrap"
          >
            <div >
              <p class="footer-copyright py-3 pr-4 mb-0">
                {{ $t("footer.copyrights") }}
                <a
                  style="color: #fff"
                  target="_blank"
                  href="https://tlkeys.com/"
                >{{ $t("footer.company_name") }}</a
                >
              </p>
            </div>

            <div class="payment-icons ">
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/dhl.png')"
                class="payment-icon" />
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/aramex.webp')"
                class="payment-icon" />
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/fedex.webp')"
                class="payment-icon" />
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/ups.webp')"
                class="payment-icon" />
            </div>

            <div class="payment-icons ">
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/paypal.webp')"
                class="payment-icon" />
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/stripe.webp')"
                class="payment-icon" />
              <span
                style="background-image: url('https://dev-srv.tlkeys.com/storage/images/shipping-methods/card.webp')"
                class="payment-icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters("language", ["getLang"]),
  },
  methods: {
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  }
};
</script>
<style scoped>
.bgWorld{
  background: #3c3c3c
  url("static/images/footer/world_map.webp")
  center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
