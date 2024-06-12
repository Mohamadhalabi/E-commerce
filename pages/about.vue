<template>
	<main class="main about">
		<nav
			aria-label="breadcrumb"
			class="breadcrumb-nav"
		>
			<div class="container">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<nuxt-link to="/">
							{{ $t('header.home') }}
						</nuxt-link>
					</li>
					<li
						class="breadcrumb-item active"
						aria-current="page"
					>{{ $t('common.aboutUs') }}</li>
				</ol>
			</div>
		</nav>
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-10 m-auto">
          <nuxt-img format="webp" src="/images/about-us/about-us-1.jpg" class="animated-image" />
        </div>
        <div class="content-column col-xl-7 col-lg-7 col-md-12 col-sm-12  mt-lg-3 m-auto p-5">
          <div class="sec-title">
            <span class="about-us-title">{{ $t('about.aboutTechnoLock') }}</span>
            <h2 class="about-us-h2 mt-1">{{  $t('about.creativeTeam') }}</h2>
          </div>
          <p class="about-us-p mb-2">
            {{ $t('about.securedBusiness') }}
          </p>
          <p class="about-us-p mb-2">
            {{ $t('about.WasEstablished') }}
          </p>
          <p class="about-us-p mb-2">
            {{ $t('about.hasBeenStriving') }}
          </p>
          <base-button-icon-1
            class="py-3 mt-lg-5 contactUsButton"
            :outline="true">
            <nuxt-link :to="getLink('/contact')" class="contactUsButton">
              {{ $t('about.contactUs')}}
            </nuxt-link>
          </base-button-icon-1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-lg-7 m-auto p-5">
          <span class="about-us-title">{{ $t('about.futureGoal')}}</span>
          <h2 class="about-us-h2 mt-1">{{ $t('about.weWantToLead') }}</h2>
          <p class="about-us-p mb-2">
            {{ $t('about.increaseMarket') }}
          </p>
          <p class="about-us-p mb-2">
            {{ $t('about.improveCustomer') }}
          </p>
          <p class="about-us-p mb-2">
            {{ $t('about.streamline') }}
          </p>
          <p class="about-us-p mb-2">
            {{ $t('about.imlpementEco') }}
          </p>
          <p class="about-us-p mb-2">
            {{ $t('about.FosterApostive') }}
          </p>
        </div>
        <div class="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-10 m-auto">
          <img src="../static/images/about-us/about-us-2.jpg" class="animated-image"  />
        </div>
      </div>
    </div>
    <div class="container-fluid about-us-second-section mt-5">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-12">
            <span class="about-us-title">{{ $t('about.whatweoffer') }}</span>
            <h2 class="about-us-h2 mt-1">{{ $t('about.ourComprehensive') }}</h2>
          </div>
          <div class="col-lg-12">
            <div class="row">
<!--              card one-->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    {{ $t('about.veryConvinent') }}
                  </h4>
                  <p class="about-us-services">
                    {{ $t('about.ourCompanyOffer') }}
                  </p>
                </div>
              </div>
<!--              card two -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    {{ $t('about.keyprogramming')}}
                  </h4>
                  <p class="about-us-services">
                    {{ $t('about.weAreSpecialist') }}
                  </p>
                </div>
              </div>
<!--              card 3 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    {{ $t('about.carKey') }}
                  </h4>
                  <p class="about-us-services">
                    {{ $t('about.weHaveTheExperience') }}
                  </p>
                </div>
              </div>
<!--              card 4 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    {{ $t('about.lostKey') }}
                  </h4>
                  <p class="about-us-services">
                    {{ $t('about.ifYouHave') }}
                  </p>
                </div>
              </div>
<!--              card 5 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    {{ $t('about.softwareUpdate')}}
                  </h4>
                  <p class="about-us-services">
                    {{ $t('about.weOfferSoftware') }}
                  </p>
                </div>
              </div>
<!--              card 6 -->
              <div class="col-lg-4 col-md-4 m-auto text-center">
                <div class="card rounded-3 shadow about-us-card p-5">
                  <h4 class="about-us-h4">
                    {{ $t('about.support') }}
                  </h4>
                  <p class="about-us-services">
                    {{ $t('about.weOfferSupport') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</main>
</template>

<script>
import BaseButtonIcon1 from "~/components/common/BaseButtonIcon1.vue";
import _about from 'static/sass/pages/_about.scss'
import {mapGetters} from "vuex";
export default {
  head() {
    return {
      title: this.$t('about.seoTitle'),
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/about',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: this.$t('about.seoDescription')
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
          content: this.$t('about.ogTitle'),
        },
        {
          name: "og:description",
          content: this.$t('about.ogDescription'),
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
            "description": this.$t('about.ogDescription'),
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
	components: {
    BaseButtonIcon1
	},
	computed: {
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
};
</script>
