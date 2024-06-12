<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              {{ $t("common.home") }}
            </nuxt-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ $t("common.dashboard") }}
          </li>
        </ol>
      </div>
    </nav>

    <div class="container">
      <h1 class="h1-download">{{ $t("header.downloads") }}</h1>
      <div class="row">
        <div
          v-for="(product, index) in downloads"
          :key="product.sku"
          class="col-lg-3 col-md-4 col-sm-6 col-6  mb-2 col-equal download"
        >
          <pv-card
            :product="product"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Api from "~/api";
import PvCard from "~/components/downloads/PvCard";
import { scrollTopHandler } from "~/utils";
export default {
  head() {
    return {
      title: "Downloads | Techno Lock Keys Trading",
      link: [
        {
          rel: 'canonical',
          href: 'https://www.tlkeys.com/downloads',
        },
      ],
      meta: [
        { hid: 'description', name: 'description', content: "Discover all the necessary download files at Techno lock Keys, a premier wholesale distributor. Techno lock Keys is recognized as one of the top distributors." },
        { charset: "utf-8" },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "Techno Lock Keys",
        },
        {
          hid: "og:description",
          name: "og:description",
          content: "Discover all the necessary download files at Techno lock Keys, a premier wholesale distributor. Techno lock Keys is recognized as one of the top distributors.",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Downloads | Techno Lock Keys Trading",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: "website",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: "www.tlkeys.com/downloads",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.$settings.seo.meta_image.l.url,
        },
        {
          hid: "og:image:alt",
          name: "og:image:alt",
          content: this.$settings.seo.meta_image.l.alt,
        },
        {
          hid: "og:image:height",
          name: "og:image:height",
          content: "627",
        },
        {
          hid: "og:image:width",
          name: "og:image:width",
          content: "1200",
        },
        // {
        //   hid: "twitter:card",
        //   name: "twitter:card",
        //   content: "summary_large_image",
        // },
        // {
        //   hid: "twitter:site",
        //   name: "twitter:site",
        //   content: `@${(this.$settings.social_media.twitter || '').split("/").pop()}`,
        // },
        // {
        //   hid: "twitter:creator",
        //   name: "twitter:creator",
        //   content: `@${(this.$settings.social_media.twitter || '').split("/").pop()}`,
        // },
        // {
        //   hid: "twitter:title",
        //   name: "twitter:title",
        //   content: JSON.parse(this.$settings.seo.meta_title)[this.$i18n.locale],
        // },
        // {
        //   hid: "twitter:description",
        //   name: "twitter:description",
        //   content: JSON.parse(this.$settings.seo.meta_description)[this.$i18n.locale],
        // },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        },
        // {
        //   rel: "shortcut icon",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
        // {
        //   rel: "apple-touch-icon",
        //   sizes: "180x180",
        //   href: "https://dev-srv.tlkeys.com/storage/images/seo/favicon-tlkeys.png",
        // },
        {
          "http-equiv": "content-language",
          content: this.$i18n.locale,
        },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      script: [
        { type: 'application/ld+json', json: this.structuredData },
        { type: 'application/ld+json', json: this.structuredData2 },
        { type: 'application/ld+json', json: this.structuredData3 },
        { type: 'application/ld+json', json: this.structuredData4 },
      ]
    }
  },
  components: {
    // pvPagination,
    PvCard,
  },
  data: function () {
    return {
      downloads: null,
      totalCount: 2,
      pageCount: 1,
      page: 1,
      itemsPerPage: 6,
      loaded: false,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.tlkeys.com"
        },{
          "@type": "ListItem",
          "position": 2,
          "name": "Downloads",
          "item": "https://www.tlkeys.com/downloads"
        },
        ]
      },
      structuredData2: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Techno Lock Keys",
        "url": "https://www.tlkeys.com",
        "sameAs" : [ "https://www.facebook.com/technolockkeys_world/",
          "https://twitter.com/techno_lock",
          "https://www.instagram.com/technolock/",
          "https://www.youtube.com/channel/UC40E3nDQ52h8d-jGbCJeepg",
          "https://api.whatsapp.com/send?phone=971504429045"]
      },
      structuredData3:{
        "@context": "https://schema.org",
        "@type" : "Website",
        "url" : "https://www.tlkeys.com",
        "name" : "Techno Lock Keys Trading",
      },
      structuredData4:{
        "@context": "https://schema.org",
        "@type" : "WebPage",
        "name" : "Download Update Locksmith Free Technical Software | Techno Lock Keys",
        "creator": {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url" : "https://www.tlkeys.com",
          "logo" : this.$settings.seo.meta_image.l.url,
          "name": "Techno Lock Keys"
        },
      },
    };
  },
  watch: {
    $route: function () {
      this.getDownloads();
    },
  },
  created: function () {
    this.getDownloads();
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getDownloads();
    },
    getDownloads: function () {
      this.loaded = false;

      let params = {
        page: this.$route.query.page ? this.$route.query.page : this.page,
        per_page: this.itemsPerPage,
      };

      Api.get(`downloads?page=${this.page}`, {
        params: { ...params },
      })
        .then((response) => {
          this.downloads = response.data.result;
          this.pageCount = response.data.total_pages;

          this.loaded = true;
          scrollTopHandler();
        })
        .catch((error) => ({ error: JSON.stringify(error) }));
    },
  },
};
</script>

<style>
.selectPageClass a {
  background: #f07905 !important ;
  color: #fff !important;
}
@media screen and (max-width: 575px) {
  .download {
    margin-left: auto;
    margin-right: auto;
  }
}
.h1-download{
  font-size: 36px;
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, #892118, #ff6800) 1;
  border-image-slice: 1;
  padding-left: 0;
  width: fit-content;
}
</style>
