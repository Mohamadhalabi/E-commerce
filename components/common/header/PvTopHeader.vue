<template>
  <div class="row top-header">
    <div class="d-none d-lg-flex col-lg-6 ">
      <div class="top-notice-container top-n" :class="{'text-right': getIsAr}">
        <p class="mb-auto mt-auto welcome-text">{{$t('common.WelcomeTo')}}
          <span class="second-top-notice">{{$t('common.tlkeys')}}</span>
        </p>
      </div>
    </div>
    <div class="col-6 col-md-6 col-sm-6 col-lg-3">
      <div class="d-flex align-items-center justify-content-lg-center">
        <div class="header-dropdown m-0" style="margin-top: 3px!important;">
          <a class="header-icons" href="javascript:;">{{ currency }}</a>
          <div class="header-menu text-center">
            <ul>
              <li
                v-for="currency in availableCurrencies"
                :key="currency"
                @click="setCurrency(currency)">
                <a href="javascript:;">{{ currency }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="header-dropdown m-0">

          <a
            v-if="currentLocale.code ==='de'"
            href="javascript:;">DE</a>
          <a
            v-if="currentLocale.code ==='ru'"
            href="javascript:;">RU</a>
          <a href="javascript:;" v-if="currentLocale.code !='de' && currentLocale.code !='ru'" >{{
              currentLocale.shortName
            }}</a>
          <div class="header-menu">
            <ul>
              <li
                v-for="locale in availableLocales"
                :key="locale[0]"
                style="cursor: pointer"
                @click="setLocale(locale[0])"
              >
                <a href="javascript:;"
                   style="padding-left: 10px">
                  <img :src="locale[1].flag" alt="Flag" width="25px">
                  {{ locale[1].language}}</a>
              </li>
            </ul>
          </div>
        </div>


        <div class="header-about-contact">
          <nuxt-link :to="getLink('/about')">
            {{ $t("header.about") }}
          </nuxt-link>
        </div>
        <div class="header-about-contact">
          <nuxt-link :to="getLink('/contact')">
            {{ $t("header.contact") }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-6 col-sm-6 col-lg-1 d-flex mt-auto mb-auto ml-auto mr-lg-1 justify-content-end">
      <div class="whatsapp-icon ml-2 mr-2" @click="sendWhatsAppMessage">
        <i class="fab fa-whatsapp"></i>
      </div>

      <div class="map-icon ml-2 mr-2" @click="openGoogleMap">
        <i class="fa fa-map-marker"></i>
      </div>

      <div class="phone-icon ml-2 mr-2" @click="makePhoneCall">
        <i class="fa fa-phone"></i>
      </div>
      <pv-social-icons class="social-icons ml-2"/>
    </div>
  </div>


</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import PvSocialIcons from "~/components/common/PvSocialIcons.vue";
import api from "~/api";

export default {
  components: {
    PvSocialIcons

  },
  computed:{
    ...mapGetters("currency", ["currency"]),
    ...mapGetters("language", ["getLang"]),
    availableCurrencies() {
      return this.$settings.currencies.filter((i) => i !== this.currency);
    },
    currentLocale() {
      return this.$i18n.locales.find((i) => i.code === this.$i18n.locale);
    },
    availableLocales() {
      const currentLocale = this.$i18n.locale;
      const locales = Object.entries(this.$settings.languages);
      return locales.filter(([locale,]) => locale !== currentLocale);
    }

  },
  methods: {
    ...mapMutations("rtlStore", ["setLan"]),
    ...mapMutations('currency', ['setCurrencyValue']),
    ...mapActions("language",["updateLanguageCode"]),

    setCurrency(currency) {
      api.defaults.headers["currency"] = currency;
      this.$cookies.set('currency',currency,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.setCurrencyValue(currency)
      this.$nuxt.refresh();
    },
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
    setLocale(locale) {
      api.defaults.headers["Accept-Language"] = locale;
      this.$i18n.setLocale(locale);
      this.$i18n.locale = locale;
      this.$cookies.set('locale',locale,{
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      });
      this.updateLanguageCode(locale)
    },
    sendWhatsAppMessage() {
      // Replace '1234567890' with the desired WhatsApp number
      const whatsappNumber = '+971504429045';
      const whatsappMessage = 'Hello';

      // Create the WhatsApp link
      const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

      // Open the WhatsApp link
      window.location.href = whatsappLink;
    },

    openGoogleMap() {
      // Replace 'https://www.google.com/maps' with the desired Google Maps link
      const mapLink = 'https://www.google.com/maps/place/Techno+Lock+Keys+Trading+(+%D8%AA%D9%83%D9%86%D9%88+%D9%84%D9%88%D9%83+%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9+%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD+)%E2%80%AD/@25.3199127,55.407002,15z/data=!4m5!3m4!1s0x0:0xc1d5d1a7ec3407f9!8m2!3d25.3199127!4d55.407002?coh=164777&entry=tt&shorturl=1';

      // Open the Google Maps link
      window.location.href = mapLink;
    },

    makePhoneCall() {
      // Replace '1234567890' with the desired phone number
      const phoneNumber = '+971504429045';

      // Create the phone call link
      const phoneLink = `tel:${phoneNumber}`;

      // Open the phone call link
      window.location.href = phoneLink;
    },
  },
  mounted() {
    const currency = this.$cookies.get('currency');
    if(currency !== undefined){
      this.setCurrencyValue(currency);
    }
  }
}
</script>
<style scoped>
.whatsapp-icon ,.map-icon, .phone-icon{
  font-size: 16px;
}
@media screen and (max-width: 350px){
  .top-header{
    display: inline-block;
    text-align: center;
  }
}
</style>
