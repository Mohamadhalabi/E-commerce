<template>
  <main class="main skeleton-body">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        class="breadcrumb-nav"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t('shop.home') }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active">
            Terms And Conditions
          </li>
        </ol>
      </nav>
      <div class="about_section mt-32">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <div class="about_content">
                <h1 class="h1-terms-and-conditions">{{ $t('terms.title')}}</h1>
                <h3>Definition</h3>
                <p class="terms-and-conditions">
                  {{ $t('terms.theseTerms')}}
                </p>
                <h3>{{ $t('terms.acceptanceTerms') }}</h3>
                <p class="terms-and-conditions">
                  {{ $t('terms.byUsing')}}
                </p>
                <h3>{{ $t('terms.services') }}</h3>
                <p class="terms-and-conditions">
                  {{ $t('terms.ourWebsite')}}
                </p>
                <h3>{{ $t('terms.userAccount') }}</h3>
                <ul class="terms-and-conditions">
                  <li>
                    {{$t('terms.youMayNeed')}}
                  </li>
                  <li>
                    {{ $t('terms.youAre')}}
                  </li>
                  <li>
                    {{ $t('terms.youMust')}}
                  </li>
                </ul>
                <h3>{{ $t('terms.purchase') }}</h3>
                <ul class="terms-and-conditions">
                  <li>
                    {{ $t('terms.whenMaking')}}
                  </li>
                  <li>
                    {{ $t('terms.allSales')}}
                  </li>
                  <li>
                    {{ $t('terms.prices')}}
                  </li>
                </ul>
                <h3>{{ $t('terms.intellectual')}}</h3>
                <ul class="terms-and-conditions">
                  <li>
                    {{ $t('terms.allContent')}}
                  </li>
                  <li>
                    {{ $t('terms.YouMayNot')}}
                  </li>
                </ul>
                <h3>{{ $t('terms.privacy') }}</h3>
                <ul class="terms-and-conditions">
                  <li>
                    {{ $t('terms.weCollect')}}
                  </li>
                  <li>
                    {{ $t('terms.ByUsing')}}
                  </li>
                </ul>
                <h3>{{ $t('terms.Contact') }}</h3>
                <p class="terms-and-conditions">
                  {{ $t('terms.IfYouHave')}} <a href="mailto:info@tlkeys.com">{{$t('terms.email')}}</a>
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
export default {
  name: "terms",
  head() {
    return {
      title: "Techno Lock Keys Trading | Automotive Locksmith Services",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/terms',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Explore our concise terms for locksmith services. Trust Techno Lock Keys for security with integrity and professionalism."
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
                  "Friday",
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
}
</script>

<style>
.h1-terms-and-conditions{
  font-size: 36px;
}
.terms-and-conditions{
  color: #757575;
  font-size: 16px;
  line-height: 30px;
  text-align: left;

}
ul.terms-and-conditions{
  list-style-type: circle;
  padding-left: 15px;
}
</style>
