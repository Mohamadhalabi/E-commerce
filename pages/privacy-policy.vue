<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link :to="getLink('/')">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            Privacy Policy
          </li>
        </ol>
      </nav>
      <div class="about_section mb-5 mt-lg-2">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1 class="delivery-info-h1">{{ $t('privacypolicy.title')}}</h1>
                <p>
                  {{ $t('privacypolicy.creditDebit') }}
                </p>
                <p>
                  {{ $t('privacypolicy.websitePolicies')}} <a href="/terms">{{ $t('privacypolicy.TermsAndConditions') }}</a> {{ $t('privacypolicy.mayBeChanged') }}<br>
                  {{ $t('privacypolicy.therfore')}}.<br>
                  {{ $t('privacypolicy.modifications') }}
                </p>
                <p>
                  {{ $t('privacypolicy.someOfTheAd') }}.<br>
                  {{ $t('privacypolicy.thirdParties') }}.<br>
                  {{ $t('privacypolicy.pleaseRemember')}}<br>
                  {{ $t('privacypolicy.theInformation')}}<br>
                </p>

                <p>
                  {{ $t('privacypolicy.weRespect') }}
                </p>

                <p>
                  {{ $t('privacypolicy.theinfocollected') }}
                </p>
                <p>
                  {{ $t('privacypolicy.weDontShare')}}
                </p>
                <p>
                  {{ $t('privacypolicy.wePrioritize')}}
                </p>
                <p>
                  {{ $t('privacypolicy.at') }} <a href="/">tlkeys.com</a>, {{ $t('privacypolicy.WeAre')}}.
                </p>
                <p>
                  {{ $t('privacypolicy.weEncourage')}}
                </p>
                <p>
                  {{ $t('privacypolicy.PleasebeAware') }} <a href="/">tlkeys.com</a> {{ $t('privacypolicy.mayContain')}}
                </p>
                <p>
                  {{ $t('privacypolicy.WhenYouAccess')}}
                </p>
                <p>
                  {{ $t('privacypolicy.ifyouchoose')}}
                </p>
                <p>
                  {{ $t('privacypolicy.yourPrivacy')}} <a href="/">tlkeys.com</a>, {{ $t('privacypolicy.doNotHesitate') }} <a href="/contact">{{ $t('privacypolicy.contactUs') }}</a>. {{$t('privacypolicy.ThankYouFor')}}.
                </p>
                <p>
                  {{ $t('privacypolicy.ifYouHaveAny')}} <a href="/contact">{{ $t('privacypolicy.contactUs') }}</a> {{ $t('privacypolicy.viaThe') }} <a href="mailto:info@tlkeys.com">{{ $t('privacypolicy.email') }}</a> {{$t('privacypolicy.or')}} <a href="tel:+971504429045"> {{$t('privacypolicy.phoneNumber')}}</a> .
                </p>
                <p>
                  {{ $t('privacypolicy.trust')}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "privacy-policy",
  head() {
    return {
      title: "Privacy Assurance at Techno Lock Keys - Your Trusted Locksmith Partner",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/privacy-policy',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Explore our commitment to your privacy. Techno Lock Keys ensures the security of your information, your trusted locksmith choice."
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
          content: "Techno Lock Keys Trading | Automotive Locksmith Services",
        },
        {
          name: "og:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
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
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:site",
          content: `${this.$settings.social_media.twitter}`,
        },
        {
          name: "twitter:title",
          content: 'Techno Lock Keys Trading | Automotive Locksmith Services',
        },
        {
          name: "twitter:description",
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
        },
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
            "description": "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Industrial No. 5, behind Maliah Road., shop No. 8",
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
  computed:{
    ...mapGetters("language", ["getLang"]),
  },
  methods:{
    getLink(route) {
      if (this.getLang === 'en') {
        return route; // Return the route as is without the language parameter
      } else {
        return `/${this.getLang}${route}`; // Include the language parameter
      }
    },
  }
}
</script>

<style scoped>
.about_content p {
  color: #757575;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
}
.delivery-info-h1{
  font-size: 36px;
  font-weight: 500;
}
.privacy-policy {
  color: #757575;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
}
</style>
