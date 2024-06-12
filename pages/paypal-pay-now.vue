<template>
  <main>
    <nav aria-label="breadcrumb" class="breadcrumb-nav container product-breadcrumb mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link to="/">
            {{ $t("products.home") }}
          </nuxt-link>
        </li>
        <li class="breadcrumb-item">
          Paypal Payment
        </li>
      </ol>
    </nav>
    <h1 class="paypal-h1">For custom <b>Paypal</b> payment, please type the amount below, then press pay now.</h1>
    <div class="form-container">
      <div class="row payment-row" style="border: 1px solid #e8e8e8">
        <div class="col-lg-5 payment-form">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <div class="input-group">
              <input type="number" name="amount" class="form-control payment-input" placeholder="$0.00" aria-label="Amount" aria-describedby="pay-now-btn">
            </div>
            <input type="hidden" name="cmd" value="_xclick">
            <input type="hidden" name="business" value="info@tlkeys.com">
            <input type="hidden" name="item_name" value="Pay">
            <input type="hidden" name="item_number" value="1">
            <input type="hidden" name="no_shipping" value="0">
            <input type="hidden" name="no_note" value="1">
            <input type="hidden" name="currency_code" value="USD">
            <input type="hidden" name="lc" value="AU">
            <input type="hidden" name="bn" value="PP-BuyNowBF">
            <base-button-icon1 class="mt-lg-2 py-3 w-75" >Pay now</base-button-icon1>
          </form>
        </div>
        <div class="col-lg-6 ml-auto">
          <img alt="paypal wallet" class="paypal-wallet m-auto" border="0" src="../static/images/paypal-wallet.jpg">
          <p style="font-size:22px;color:black;line-height:30px">PayPal is the safer, easier way for payment </p>
        </div>
        <p class="we-understand">We understand the importance of security when it comes to your payment. That's why we have implemented stringent measures to ensure the utmost protection for your financial information</p>
        <p class="completed-order-note">*Once you have completed the payment, we kindly request that you get in touch with us. </p>
      </div>
    </div>
  </main>
</template>
<script>
import BaseButtonIcon1 from '~/components/common/BaseButtonIcon1.vue';
import PvProduct from "~/components/product/card/PvProduct.vue";
export default {
  components: {PvProduct, BaseButtonIcon1},
  head() {
    return {
      title: "Techno Lock Keys Trading | Paypal Payments",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/',
        },
      ],
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          name: 'description',
          content: "Techno Lock Keys provides a wide range of auto keys, remotes, diagnostics, cutting machines, programming devices, Fobs, transponder keys, and emulators"
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
}
</script>
<style>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;
  margin-bottom:100px;
}

input.form-control.payment-input{
  width: 300px;
  border-radius:7px!important;
  font-size:18px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin-bottom: 20px;
}

@media screen and (max-width: 993px){
  input.form-control.payment-input{
    width: auto;
    margin-top:0px;
  }
}
.paypal-h1{
  text-align:center;
  color:black;
  margin-left:auto;
  margin-right:auto;
  width: fit-content;
  font-size: 28px;
}
@media screen and (max-width: 550px){
  h1.paypal-h1{
    font-size:20px!important;
  }
}
p.completed-order-note{
  font-size:16px;
  color:red;
  margin-left:auto;
  margin-right:auto;
}
@media screen and (min-width: 1300px){
  .payment-row{
    padding:50px;
    width:50%;
  }
}
@media screen and (max-width:1300px){
  .payment-row{
    padding:20px;
    width:80%;
  }
}
.payment-form{
  margin-top:50px;
}
@media screen and (max-width:1500px){
  .we-understand{
    margin-top:25px;
  }
}
</style>
