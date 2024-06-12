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
            {{ $t('return.short_title') }}
          </li>
        </ol>
      </nav>
      <div class="about_section mt-3">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1>{{ $t('return.title') }}</h1>
                <p style="color:red">
                  {{ $t('return.note')}}
                </p>
                <span class="policy">{{ $t('return.eligibility')}}</span><br>
                <ul class="privacy-policy-list">
                  <li>{{ $t('return.yourItem')}}</li>
                  <li>{{ $t('return.TheItem')}}</li>
                  <li>{{ $t('return.ToComplete')}}</li>
                  <li>{{ $t('return.IfYou')}}</li>
                </ul>
                <span class="policy">{{ $t('return.Partial')}}</span><br>
                <ul class="privacy-policy-list">
                  <li>{{$t('return.anyItem')}}</li>
                  <li>{{$t('return.anyItemThat')}}</li>
                  <li>{{$t('return.onceYour')}}</li>
                  <li>{{$t('return.WeWill')}}</li>
                  <li>
                    {{ $t('return.IfYouAre')}}
                  </li>
                </ul>
                <span class="policy">{{ $t('return.LateOr')}}</span>
                <p>
                  {{ $t('return.ifYouHave')}}
                </p>
                <p>
                  {{ $t('return.ifyouhavedone')}}
                </p>
                <span class="policy">{{ $t('return.nonexchangable') }}</span><br>
                <ul class="privacy-policy-list">
                  <li>{{ $t('return.damageorabused')}}</li>
                  <li>{{ $t('return.ifthecustomer')}}</li>
                  <li>{{$t('return.itemscanbe')}}</li>
                </ul>
                <span class="policy">
                  {{ $t('return.Shipping')}}
                       </span>
                <p>
                  {{ $t('return.dependingon')}}
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
  name: "return-policy",
  head() {
    return {
      title: "Techno Lock Keys Trading | Return Policy",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/return-policy',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Explore Techno Lock Keys' return policy for locksmith solutions. Enjoy secure products and hassle-free returns. Your satisfaction is our priority."
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
    ...mapGetters("language", ["getLang"])
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
  color: #5c5c5c;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
  margin: 15px 0 25px 0;
}

.policy{
  font-size:20px!important;
  color:#3E444A!important;
  text-transform: capitalize;
  font-family: sans-serif;
  font-style: normal!important;
  font-weight:600;
}

.privacy-policy-list{
  font-size:16px;
  margin: 15px 0 25px 23px;
  list-style-type: circle
}
.privacy-policy-list li{
  padding:3px;
}

.about_content a{
  color:#da8b50!important;
  transition: 0.3s;
}
.about_content a:hover{
  color:#c05817!important;
}
.return-refund-policy{
  font-size: 36px;
}
</style>
