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
            {{ $t('deliveryinfo.DeliveryInfo') }}
          </li>
        </ol>
      </nav>
      <div class="about_section mt-lg-2">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12">
              <h1 class="delivery-info-h1"> {{ $t('deliveryinfo.DeliveryInfo') }}</h1>
              <div class="about_content">
                <h2 class="delivery-info-h2 mb-1">{{ $t('deliveryinfo.addToCart') }}</h2>
                <p>
                  {{ $t('deliveryinfo.firstStep') }}
                </p>
                <h2>
                  {{ $t('deliveryinfo.processing') }}
                </h2>
                <p>
                  {{ $t('deliveryinfo.itTakes') }}
                </p>
                <h2>
                  {{ $t('deliveryinfo.shipping') }}
                </h2>
                <ul class="custom-list">
                  <li class="custom-list-item">
                    {{$t('deliveryinfo.shippingTime')}}
                  </li>
                  <li class="custom-list-item">
                    {{ $t('deliveryinfo.emailShipping') }}
                  </li>
                  <li class="custom-list-item">
                    {{ $t('deliveryinfo.makeSure') }}
                  </li>
                  <li class="custom-list-item">
                    {{ $t('deliveryinfo.pleaseNote') }}
                  </li>
                </ul>
                <h3>
                  {{ $t('deliveryinfo.ShippingProcess') }}
                </h3>
                <div>
                  <h4>
                    {{ $t('deliveryinfo.OrderConfirmation')}}:
                  </h4>
                  <p class="shipping-process">
                    {{ $t('deliveryinfo.storeVerify') }}
                  </p>
                  <h4>
                    {{ $t('deliveryinfo.Packaging') }}:
                  </h4>
                  <p class="shipping-process">
                    {{ $t('deliveryinfo.packed') }}
                  </p>
                  <h4>
                    {{ $t('deliveryinfo.shippingService') }}
                  </h4>
                  <p class="shipping-process">
                    {{ $t('deliveryinfo.reliable') }}
                  </p>
                  <h4>
                    {{ $t('deliveryinfo.shippmentTracking') }}
                  </h4>
                  <p class="shipping-process">
                    {{ $t('deliveryinfo.customers') }}
                  </p>
                  <h4>
                  {{ $t('deliveryinfo.reciept') }}
                  </h4>
                  <p class="shipping-process">
                    {{ $t('deliveryinfo.mustVerify') }}
                  </p>
                  <h4>
                    {{ $t('deliveryinfo.addressingIssue') }}:
                  </h4>
                  <p class="shipping-process">
                    {{ $t('deliveryinfo.InCase') }}
                  </p>

                </div>

                <h2>
                  {{ $t('deliveryinfo.Delivery') }}
                </h2>
                <p>
                  {{ $t('deliveryinfo.youWill') }}
                </p>
                <p>
                  {{ $t('deliveryinfo.weAreComitted') }}
                </p>
                <h3>
                 {{ $t('deliveryinfo.deliveryFees') }}
                </h3>
                <p>
                  {{ $t('deliveryinfo.OnlineStore') }}
                </p>
                <h3>
                  {{ $t('deliveryinfo.freeDelivery') }}
                </h3>
                <p>
                  {{ $t('deliveryinfo.theStoreMight') }}
                </p>
                <p>
                  {{ $t('deliveryinfo.toFindOut') }}
                </p>
                <h3>
                  {{ $t('deliveryinfo.deliveryTime') }}
                </h3>
                <h4>
                  {{ $t('deliveryinfo.localDelivery') }}
                </h4>
                <p class="shipping-process">
                  {{ $t('deliveryinfo.localDeliveryTime') }}
                </p>
                <h4>
                  {{ $t('deliveryinfo.internationalDelivery') }}
                </h4>
                <p class="shipping-process">
                  {{ $t('deliveryinfo.internationalDeliveryTime') }}
                </p>
                <p class="">
                  {{ $t('deliveryinfo.PleaseNote') }}
                </p>
                <p class="">
                  {{ $t('deliveryinfo.checkSpam') }}
                </p>
                <p class="">
                  <a href="/">tlkeys.com</a>
                  {{ $t('deliveryinfo.willNot') }}
                </p>
                <p>
                  {{ $t('deliveryinfo.ifYouHaveAnyQuestion') }}
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
  name: "deliveryinfo",
  head() {
    return {
      title: this.$t('deliveryinfo.seoTitle'),
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/deliveryinfo',
        },
      ],
      meta: [
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: this.$t('deliveryinfo.seoDescription'),
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
          content:  this.$t('deliveryinfo.ogTitle'),
        },
        {
          name: "og:description",
          content: this.$t('deliveryinfo.ogDescription'),
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
            "description": this.$t('deliveryinfo.ogTitle'),
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
}
</script>

<style scoped>
.about_content p , .about_content ul{
  color: #757575;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
}
.about_content ul{
  list-style-type: circle;
  padding: 15px;
}
.note{
  color: red;
}
.delivery-info-h1{
  font-size: 36px;
  font-weight: 500;
}
.delivery-info-h2{
  font-weight: normal;
  font-size: 26px;
}
</style>
